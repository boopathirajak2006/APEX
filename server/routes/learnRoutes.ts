import { Router, Response } from 'express'
import { db } from '../db'
import { authenticateJWT, AuthRequest } from '../auth'
import { CURRICULA } from '../data/curricula'
import { SUPPORTED_LANGUAGES } from '../data/languages'
import { runCodeInSandbox } from '../sandbox'
import { CodingLanguage } from '../../src/types'

const router = Router()

// Helper to calculate user level from XP
function calculateLevel(xp: number): number {
  return Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1)
}

// Helper to recalculate skill score for a language
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

// GET /api/learn/languages
router.get('/languages', (_req, res: Response) => {
  return res.json({ languages: SUPPORTED_LANGUAGES })
})

// GET /api/learn/curriculum/:language
router.get('/curriculum/:language', authenticateJWT, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  const language = req.params.language as CodingLanguage
  const lessons = CURRICULA[language] || []

  try {
    const progressList: any[] = db.prepare(`
      SELECT lesson_id, completed, quiz_score, code_passed, mini_game_completed
      FROM lesson_progress
      WHERE user_id = ? AND language = ?
    `).all(userId, language)

    const progressMap = new Map(progressList.map(p => [p.lesson_id, p]))

    const curriculumWithProgress = lessons.map((lesson, idx) => {
      const p = progressMap.get(lesson.id)
      const isFirst = idx === 0
      const prevLesson = idx > 0 ? lessons[idx - 1] : null
      const prevProgress = prevLesson ? progressMap.get(prevLesson.id) : null
      const isUnlocked = isFirst || (prevProgress && prevProgress.completed === 1)

      return {
        ...lesson,
        unlocked: Boolean(isUnlocked),
        completed: Boolean(p && p.completed === 1),
        quizScore: p ? p.quiz_score : 0,
        codePassed: Boolean(p && p.code_passed === 1),
        miniGameCompleted: Boolean(p && p.mini_game_completed === 1)
      }
    })

    return res.json({ curriculum: curriculumWithProgress })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch curriculum' })
  }
})

// GET /api/learn/lesson/:language/:lessonId
router.get('/lesson/:language/:lessonId', authenticateJWT, (req: AuthRequest, res: Response) => {
  const language = req.params.language as CodingLanguage
  const lessonId = req.params.lessonId
  const lessons = CURRICULA[language] || []
  const lesson = lessons.find(l => l.id === lessonId)

  if (!lesson) {
    return res.status(404).json({ error: 'Lesson not found' })
  }

  return res.json({ lesson })
})

// POST /api/learn/submit-quiz
router.post('/submit-quiz', authenticateJWT, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  const { language, lessonId, answers } = req.body // answers: { [questionId]: selectedIndex }

  const lessons = CURRICULA[language as CodingLanguage] || []
  const lesson = lessons.find(l => l.id === lessonId)

  if (!lesson) return res.status(404).json({ error: 'Lesson not found' })

  let correctCount = 0
  const totalQuestions = lesson.quizzes?.length || 5

  lesson.quizzes?.forEach((q: any) => {
    if (answers[q.id] === q.correctOptionIndex) {
      correctCount++
    }
  })

  const quizAccuracy = Math.round((correctCount / (totalQuestions || 1)) * 100)
  const xpEarned = correctCount * 25
  const passed = correctCount >= Math.ceil(totalQuestions * 0.6) // 60% passing requirement

  try {
    // Record or update lesson progress
    db.prepare(`
      INSERT INTO lesson_progress (user_id, language, lesson_id, quiz_score, completed, completed_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(user_id, language, lesson_id) DO UPDATE SET 
        quiz_score = max(quiz_score, excluded.quiz_score),
        completed = max(completed, excluded.completed),
        completed_at = datetime('now')
    `).run(userId, language, lessonId, correctCount, passed ? 1 : 0)

    // Award XP
    db.prepare('UPDATE users SET total_xp = total_xp + ? WHERE id = ?').run(xpEarned, userId)
    const user: any = db.prepare('SELECT total_xp FROM users WHERE id = ?').get(userId)
    const newLevel = calculateLevel(user.total_xp)
    db.prepare('UPDATE users SET level = ? WHERE id = ?').run(newLevel, userId)

    // Update progress stats
    const totalInCurriculum = lessons.length
    const completedCount: any = db.prepare(`
      SELECT count(*) as cnt FROM lesson_progress
      WHERE user_id = ? AND language = ? AND completed = 1
    `).get(userId, language)

    const learningProgressPercent = Math.min(100, Math.round((completedCount.cnt / (totalInCurriculum || 1)) * 100))

    db.prepare(`
      UPDATE user_language_progress 
      SET completed_lessons_count = ?, learning_progress_percent = ?, xp_earned = xp_earned + ?
      WHERE user_id = ? AND language = ?
    `).run(completedCount.cnt, learningProgressPercent, xpEarned, userId, language)

    updateSkillScore(userId, language)

    return res.json({
      success: true,
      correctCount,
      totalQuestions,
      quizAccuracy,
      passed,
      xpEarned,
      newTotalXp: user.total_xp,
      newLevel
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Quiz submission failed' })
  }
})

// POST /api/learn/submit-code
router.post('/submit-code', authenticateJWT, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  const { language, lessonId, code } = req.body

  const lessons = CURRICULA[language as CodingLanguage] || []
  const lesson = lessons.find(l => l.id === lessonId)

  if (!lesson) return res.status(404).json({ error: 'Lesson not found' })

  try {
    const testCases = lesson.codingChallenge?.testCases || []
    const executionResult = await runCodeInSandbox(
      language as CodingLanguage,
      code,
      testCases
    )

    if (executionResult.allTestsPassed) {
      const xpReward = lesson.codingChallenge?.xpReward || 50

      db.prepare(`
        INSERT INTO lesson_progress (user_id, language, lesson_id, completed, code_passed, completed_at)
        VALUES (?, ?, ?, 1, 1, datetime('now'))
        ON CONFLICT(user_id, language, lesson_id) DO UPDATE SET 
          completed = 1,
          code_passed = 1,
          completed_at = datetime('now')
      `).run(userId, language, lessonId)

      const totalInCurriculum = lessons.length
      const completedCount: any = db.prepare(`
        SELECT count(*) as cnt FROM lesson_progress
        WHERE user_id = ? AND language = ? AND completed = 1
      `).get(userId, language)

      const learningProgressPercent = Math.min(100, Math.round((completedCount.cnt / (totalInCurriculum || 1)) * 100))

      db.prepare(`
        UPDATE user_language_progress
        SET completed_lessons_count = ?, learning_progress_percent = ?, xp_earned = xp_earned + ?
        WHERE user_id = ? AND language = ?
      `).run(completedCount.cnt, learningProgressPercent, xpReward, userId, language)

      db.prepare('UPDATE users SET total_xp = total_xp + ? WHERE id = ?').run(xpReward, userId)
      const user: any = db.prepare('SELECT total_xp FROM users WHERE id = ?').get(userId)
      const newLevel = calculateLevel(user.total_xp)
      db.prepare('UPDATE users SET level = ? WHERE id = ?').run(newLevel, userId)

      updateSkillScore(userId, language)

      return res.json({
        ...executionResult,
        xpEarned: xpReward,
        lessonCompleted: true,
        newTotalXp: user.total_xp,
        newLevel
      })
    }

    return res.json({
      ...executionResult,
      xpEarned: 0,
      lessonCompleted: false
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Code evaluation failed' })
  }
})

// POST /api/learn/complete-topic
router.post('/complete-topic', authenticateJWT, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  const { language = 'python', topicId } = req.body
  const xpReward = 50

  try {
    db.prepare(`
      INSERT INTO lesson_progress (user_id, language, lesson_id, completed, completed_at)
      VALUES (?, ?, ?, 1, datetime('now'))
      ON CONFLICT(user_id, language, lesson_id) DO UPDATE SET completed = 1, completed_at = datetime('now')
    `).run(userId, language, topicId)

    db.prepare('UPDATE users SET total_xp = total_xp + ? WHERE id = ?').run(xpReward, userId)
    db.prepare('UPDATE user_language_progress SET xp_earned = xp_earned + ? WHERE user_id = ? AND language = ?').run(xpReward, userId, language)

    return res.json({ success: true, xpEarned: xpReward })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to complete topic' })
  }
})

export default router
