import { Router, Response } from 'express'
import { db } from '../db'
import { authenticateJWT, AuthRequest } from '../auth'
import { getGameLevels, getGameLevelById } from '../data/levelsGenerator'
import { runCodeInSandbox } from '../sandbox'
import { CodingLanguage, DifficultyLevel } from '../../src/types'

const router = Router()

function calculateLevel(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1)
}

function updateSkillScore(userId: string, language: string) {
  const stats: any = db.prepare(`
    SELECT quiz_accuracy_percent, coding_accuracy_percent, learning_progress_percent, game_progress_percent
    FROM user_language_progress
    WHERE user_id = ? AND language = ?
  `).get(userId, language)

  if (stats) {
    const overallProgress = (stats.learning_progress_percent + stats.game_progress_percent) / 2
    const skillScore = Math.round(
      (0.50 * stats.coding_accuracy_percent) +
      (0.35 * stats.quiz_accuracy_percent) +
      (0.15 * overallProgress)
    )

    db.prepare(`
      UPDATE user_language_progress
      SET overall_skill_score = ?
      WHERE user_id = ? AND language = ?
    `).run(skillScore, userId, language)
  }
}

// GET /api/game/map/:language/:difficulty (Fetch all 50 levels with unlock & completion state)
router.get('/map/:language/:difficulty', authenticateJWT, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  const language = req.params.language as CodingLanguage
  const difficulty = req.params.difficulty as DifficultyLevel

  try {
    const allLevels = getGameLevels(language, difficulty)

    const userProgressList: any[] = db.prepare(`
      SELECT level_number, unlocked, completed, stars, best_quiz_score, coding_passed, attempts
      FROM game_level_progress
      WHERE user_id = ? AND language = ? AND difficulty = ?
    `).all(userId, language, difficulty)

    const progressMap = new Map(userProgressList.map(p => [p.level_number, p]))

    let cumulativeStars = 0
    userProgressList.forEach(p => { cumulativeStars += p.stars || 0 })

    const mappedLevels = allLevels.map(lvl => {
      const p = progressMap.get(lvl.levelNumber)
      const isLevel1 = lvl.levelNumber === 1
      const prevProgress = progressMap.get(lvl.levelNumber - 1)
      const isUnlocked = isLevel1 || (prevProgress && prevProgress.completed === 1) || (p && p.unlocked === 1)

      return {
        id: lvl.id,
        levelNumber: lvl.levelNumber,
        difficulty: lvl.difficulty,
        language: lvl.language,
        title: lvl.title,
        isBoss: lvl.isBoss,
        bossName: lvl.bossName,
        xpReward: lvl.xpReward,
        unlocked: Boolean(isUnlocked),
        completed: Boolean(p && p.completed === 1),
        stars: p ? p.stars : 0,
        bestQuizScore: p ? p.best_quiz_score : 0,
        codingPassed: Boolean(p && p.coding_passed === 1),
        attempts: p ? p.attempts : 0
      }
    })

    return res.json({
      language,
      difficulty,
      totalLevels: 50,
      totalStarsEarned: cumulativeStars,
      levels: mappedLevels
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch game map' })
  }
})

// GET /api/game/level/:language/:difficulty/:levelId (Fetch 3 quizzes + 1 coding challenge)
router.get('/level/:language/:difficulty/:levelId', authenticateJWT, (req: AuthRequest, res: Response) => {
  const language = req.params.language as CodingLanguage
  const difficulty = req.params.difficulty as DifficultyLevel
  const levelNum = parseInt(req.params.levelId, 10)

  if (isNaN(levelNum) || levelNum < 1 || levelNum > 50) {
    return res.status(400).json({ error: 'Level number must be between 1 and 50' })
  }

  const level = getGameLevelById(language, difficulty, levelNum)
  if (!level) {
    return res.status(404).json({ error: 'Level not found' })
  }

  return res.json({ level })
})

// POST /api/game/submit-level (Evaluates 3 quizzes + runs Monaco code against test cases)
router.post('/submit-level', authenticateJWT, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  const { language, difficulty, levelNumber, quizAnswers, code, timeTakenSeconds } = req.body

  const levelNum = parseInt(levelNumber, 10)
  const level = getGameLevelById(language as CodingLanguage, difficulty as DifficultyLevel, levelNum)

  if (!level) return res.status(404).json({ error: 'Level not found' })

  // 1. Evaluate Quizzes (exactly 3 questions)
  let quizCorrect = 0
  level.quizzes.forEach(q => {
    if (quizAnswers && quizAnswers[q.id] === q.correctOptionIndex) {
      quizCorrect++
    }
  })

  // 2. Evaluate Coding Challenge in Sandbox
  const codeResult = await runCodeInSandbox(
    language as CodingLanguage,
    code || '',
    level.challenge.testCases
  )

  const codingPassed = codeResult.allTestsPassed

  // 3. Compute Stars (0 to 3)
  // 1 Star: Passed coding challenge
  // 2 Stars: Passed coding + at least 2/3 quizzes
  // 3 Stars: Passed coding + 3/3 quizzes (Perfect Clear)
  let stars = 0
  if (codingPassed) {
    if (quizCorrect === 3) stars = 3
    else if (quizCorrect >= 2) stars = 2
    else stars = 1
  }

  const isLevelCompleted = codingPassed && stars >= 1

  try {
    // Record current level attempts and progress
    db.prepare(`
      INSERT INTO game_level_progress 
      (user_id, language, difficulty, level_number, unlocked, completed, stars, best_quiz_score, coding_passed, attempts, best_time_seconds, completed_at)
      VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, 1, ?, datetime('now'))
      ON CONFLICT(user_id, language, difficulty, level_number) DO UPDATE SET
        completed = max(completed, excluded.completed),
        stars = max(stars, excluded.stars),
        best_quiz_score = max(best_quiz_score, excluded.best_quiz_score),
        coding_passed = max(coding_passed, excluded.coding_passed),
        attempts = attempts + 1,
        best_time_seconds = CASE WHEN best_time_seconds = 0 THEN excluded.best_time_seconds ELSE min(best_time_seconds, excluded.best_time_seconds) END,
        completed_at = datetime('now')
    `).run(
      userId,
      language,
      difficulty,
      levelNum,
      isLevelCompleted ? 1 : 0,
      stars,
      quizCorrect,
      codingPassed ? 1 : 0,
      timeTakenSeconds || 45
    )

    // Unlock next level if completed
    if (isLevelCompleted && levelNum < 50) {
      db.prepare(`
        INSERT INTO game_level_progress
        (user_id, language, difficulty, level_number, unlocked, completed, stars, best_quiz_score, coding_passed, attempts)
        VALUES (?, ?, ?, ?, 1, 0, 0, 0, 0, 0)
        ON CONFLICT(user_id, language, difficulty, level_number) DO UPDATE SET unlocked = 1
      `).run(userId, language, difficulty, levelNum + 1)
    }

    let xpEarned = 0
    if (isLevelCompleted) {
      xpEarned = level.xpReward + (stars * 20)
      db.prepare('UPDATE users SET total_xp = total_xp + ? WHERE id = ?').run(xpEarned, userId)
    }

    const user: any = db.prepare('SELECT total_xp FROM users WHERE id = ?').get(userId)
    const newLevel = calculateLevel(user.total_xp)
    db.prepare('UPDATE users SET level = ? WHERE id = ?').run(newLevel, userId)

    // Update game completion stats
    const completedCount: any = db.prepare(`
      SELECT count(*) as cnt FROM game_level_progress
      WHERE user_id = ? AND language = ? AND difficulty = ? AND completed = 1
    `).get(userId, language, difficulty)

    const gameProgressPercent = Math.min(100, Math.round((completedCount.cnt / 50) * 100))

    db.prepare(`
      UPDATE user_language_progress
      SET completed_levels_count = ?, game_progress_percent = ?, xp_earned = xp_earned + ?
      WHERE user_id = ? AND language = ?
    `).run(completedCount.cnt, gameProgressPercent, xpEarned, userId, language)

    updateSkillScore(userId, language)

    return res.json({
      success: isLevelCompleted,
      levelCompleted: isLevelCompleted,
      stars,
      quizCorrect,
      totalQuizzes: 3,
      codingPassed,
      codeExecution: codeResult,
      xpEarned,
      nextLevelUnlocked: isLevelCompleted && levelNum < 50 ? levelNum + 1 : null,
      newTotalXp: user.total_xp,
      newLevel
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to submit level' })
  }
})

export default router
