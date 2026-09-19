import { Router } from 'express'
import { db } from '../db'
import { requireAuth, AuthenticatedRequest } from '../auth'
import {
  SOFT_SKILLS_LIST,
  SOFT_SKILL_TESTS_BANK,
  ALL_SOFT_SKILL_TOPICS,
  SOFT_SKILLS_MAP
} from '../../src/data/softSkills/index'
import { SKILL_CHECK_BANK } from '../data/skillCheckBank'
import type { CodingLanguage, SoftSkillId } from '../../src/types'

export const pathRouter = Router()

// GET /api/paths - Primary Paths
pathRouter.get('/', (_req, res) => {
  res.json({
    paths: [
      {
        id: 'code',
        title: 'Code',
        tagline: 'Build your coding abilities',
        description: 'Master programming from beginner syntax to advanced algorithms through step-by-step lessons, interactive practice, quizzes, and 150 gamified challenge sectors.',
        icon: 'Code2',
        route: '/code',
        badge: '9 Languages',
        featureList: ['Step-by-Step Lessons', 'Monaco Code Runner', 'Interactive Quizzes', '150 Game Sectors']
      },
      {
        id: 'soft_skills',
        title: 'Soft Skills',
        tagline: 'Build your professional skills',
        description: 'Learn and test essential professional skills across 9 leadership, communication, problem-solving, and workplace competencies.',
        icon: 'TrendingUp',
        route: '/soft-skills',
        badge: '9 Core Disciplines',
        featureList: ['9 Skill Tracks', 'Beginner to Advanced Progression', 'Workplace Scenarios', 'Dedicated Skill Tests']
      }
    ]
  })
})

// POST /api/paths/onboarding
pathRouter.post('/onboarding', requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const { selectedPath, experienceLevel, selectedLanguage } = req.body

  const stmt = db.prepare(`
    INSERT INTO user_onboarding (user_id, selected_path, experience_level, intro_completed, updated_at)
    VALUES (?, ?, ?, 1, datetime('now'))
    ON CONFLICT(user_id) DO UPDATE SET
      selected_path = excluded.selected_path,
      experience_level = excluded.experience_level,
      intro_completed = 1,
      updated_at = datetime('now')
  `)
  stmt.run(userId, selectedPath || 'code', experienceLevel || 'just_starting')

  db.prepare(`
    UPDATE users SET
      selected_path = COALESCE(?, selected_path),
      experience_level = COALESCE(?, experience_level),
      selected_language = COALESCE(?, selected_language),
      intro_completed = 1
    WHERE id = ?
  `).run(selectedPath || null, experienceLevel || null, selectedLanguage || null, userId)

  const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
  res.json({ success: true, user: updatedUser })
})

// -------------------------------------------------------------
// CODE SKILL CHECK
// -------------------------------------------------------------
pathRouter.get('/skill-check/:language', (req, res) => {
  const lang = req.params.language as CodingLanguage
  const assessment = SKILL_CHECK_BANK[lang] || SKILL_CHECK_BANK.python
  res.json({ assessment })
})

pathRouter.post('/skill-check/:language/submit', requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const lang = req.params.language as CodingLanguage
  const { quizAnswers, codingPassed } = req.body

  const assessment = SKILL_CHECK_BANK[lang] || SKILL_CHECK_BANK.python
  let correctQuizzes = 0

  assessment.quizzes.forEach((q, idx) => {
    if (quizAnswers && quizAnswers[idx] === q.correctOptionIndex) {
      correctQuizzes++
    }
  })

  const quizScore = Math.round((correctQuizzes / assessment.quizzes.length) * 100)
  const codeScore = codingPassed ? 100 : 40
  const overallScore = Math.round(quizScore * 0.4 + codeScore * 0.6)

  let currentLevel = 'Novice'
  if (overallScore >= 90) currentLevel = 'Master'
  else if (overallScore >= 75) currentLevel = 'Proficient'
  else if (overallScore >= 55) currentLevel = 'Intermediate'

  const strengths: string[] = []
  const improvements: string[] = []

  if (quizScore >= 66) strengths.push('Solid theoretical and syntax fundamentals')
  else improvements.push('Review language syntax rules and core data types')

  if (codingPassed) strengths.push('Accurate algorithmic problem solving and execution')
  else improvements.push('Practice function writing, return values, and edge cases')

  const recordId = `sc_${userId}_${lang}_${Date.now()}`
  const insertStmt = db.prepare(`
    INSERT INTO skill_check_results (id, user_id, language, overall_score, quiz_score, coding_score, current_level, strengths_json, improvements_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  insertStmt.run(
    recordId,
    userId,
    lang,
    overallScore,
    quizScore,
    codeScore,
    currentLevel,
    JSON.stringify(strengths),
    JSON.stringify(improvements)
  )

  const xpReward = overallScore >= 80 ? 200 : 100
  db.prepare('UPDATE users SET total_xp = total_xp + ? WHERE id = ?').run(xpReward, userId)

  res.json({
    success: true,
    result: {
      overallScore,
      quizScore,
      codingScore,
      currentLevel,
      strengths,
      improvements,
      xpRewarded: xpReward
    }
  })
})

// -------------------------------------------------------------
// SOFT SKILLS LEARNING ENDPOINTS
// -------------------------------------------------------------
pathRouter.get('/soft-skills/topics', requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const progressRows = db.prepare('SELECT * FROM soft_skills_progress WHERE user_id = ?').all(userId) as any[]

  const progressMap: Record<string, any> = {}
  progressRows.forEach((r) => {
    progressMap[r.topic_id] = {
      completed: r.lesson_completed === 1,
      quizScore: r.quiz_score
    }
  })

  res.json({
    skills: SOFT_SKILLS_LIST,
    progress: progressMap
  })
})

pathRouter.get('/soft-skills/progress', requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const progressRows = db.prepare('SELECT topic_id, lesson_completed, quiz_score FROM soft_skills_progress WHERE user_id = ? AND lesson_completed = 1').all(userId) as any[]

  const completedTopics = progressRows.map(r => r.topic_id)
  const totalTopics = Object.keys(ALL_SOFT_SKILL_TOPICS).length || 27
  const learningProgressPercent = Math.round((completedTopics.length / totalTopics) * 100)

  res.json({
    progress: {
      completedTopics,
      learningProgressPercent,
      totalTopics
    }
  })
})

pathRouter.post('/soft-skills/complete-topic', requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const { topicId, quizScore = 100 } = req.body

  if (!topicId) {
    return res.status(400).json({ error: 'topicId is required' })
  }

  const stmt = db.prepare(`
    INSERT INTO soft_skills_progress (user_id, topic_id, lesson_completed, quiz_score, completed_at)
    VALUES (?, ?, 1, ?, datetime('now'))
    ON CONFLICT(user_id, topic_id) DO UPDATE SET
      lesson_completed = 1,
      quiz_score = MAX(quiz_score, excluded.quiz_score),
      completed_at = datetime('now')
  `)
  stmt.run(userId, topicId, quizScore)

  const xpReward = 80
  db.prepare('UPDATE users SET total_xp = total_xp + ? WHERE id = ?').run(xpReward, userId)

  res.json({ success: true, xpRewarded: xpReward })
})

pathRouter.post('/soft-skills/:topicId/complete', requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const topicId = req.params.topicId
  const { quizScore = 100 } = req.body

  const stmt = db.prepare(`
    INSERT INTO soft_skills_progress (user_id, topic_id, lesson_completed, quiz_score, completed_at)
    VALUES (?, ?, 1, ?, datetime('now'))
    ON CONFLICT(user_id, topic_id) DO UPDATE SET
      lesson_completed = 1,
      quiz_score = MAX(quiz_score, excluded.quiz_score),
      completed_at = datetime('now')
  `)
  stmt.run(userId, topicId, quizScore)

  const xpReward = 80
  db.prepare('UPDATE users SET total_xp = total_xp + ? WHERE id = ?').run(xpReward, userId)

  res.json({ success: true, xpRewarded: xpReward })
})

// -------------------------------------------------------------
// DEDICATED SOFT SKILLS TESTING ENDPOINTS
// -------------------------------------------------------------
pathRouter.get('/soft-skills/test/:skillId', (req, res) => {
  const skillId = req.params.skillId as SoftSkillId
  const exam = SOFT_SKILL_TESTS_BANK[skillId] || SOFT_SKILL_TESTS_BANK.communication
  res.json({ exam })
})

pathRouter.post('/soft-skills/test/:skillId/submit', requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const skillId = req.params.skillId as SoftSkillId
  const { answers } = req.body

  const exam = SOFT_SKILL_TESTS_BANK[skillId] || SOFT_SKILL_TESTS_BANK.communication
  let correctCount = 0

  exam.questions.forEach((q, idx) => {
    if (answers && answers[idx] === q.correctOptionIndex) {
      correctCount++
    }
  })

  const totalQuestions = exam.questions.length
  const accuracyPercent = Math.round((correctCount / totalQuestions) * 100)
  const overallScore = accuracyPercent

  let currentLevel = 'Developing'
  if (overallScore >= 90) currentLevel = 'Executive Master'
  else if (overallScore >= 75) currentLevel = 'Strategic Practitioner'
  else if (overallScore >= 60) currentLevel = 'Proficient Practitioner'

  // Dynamic feedback tailored to the specific skill
  const skillMeta = SOFT_SKILLS_MAP[skillId] || SOFT_SKILLS_MAP.communication
  const strengths: string[] = []
  const areasToImprove: string[] = []
  const recommendations: string[] = []

  if (overallScore >= 80) {
    strengths.push(`Exceptional mastery of ${skillMeta.name} principles and practical scenarios`)
    strengths.push('High precision in evaluating collaborative workplace trade-offs')
    recommendations.push(`Mentor peers on ${skillMeta.name} and lead high-visibility cross-functional initiatives`)
  } else if (overallScore >= 60) {
    strengths.push(`Solid foundational grasp of ${skillMeta.name} best practices`)
    areasToImprove.push('Deepen understanding of high-stakes multi-stakeholder edge cases')
    recommendations.push(`Complete advanced ${skillMeta.name} lessons and practice scenario walkthroughs`)
  } else {
    areasToImprove.push(`Review core ${skillMeta.name} frameworks and practical conflict resolution`)
    areasToImprove.push('Practice applying objective criteria rather than emotional reactions')
    recommendations.push(`Complete the Beginner & Intermediate ${skillMeta.name} learning curriculum`)
  }

  const recordId = `sst_${userId}_${skillId}_${Date.now()}`
  const insertStmt = db.prepare(`
    INSERT INTO soft_skill_check_results (id, user_id, difficulty, overall_score, level, strong_skills_json, improve_skills_json)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  insertStmt.run(
    recordId,
    userId,
    skillId,
    overallScore,
    currentLevel,
    JSON.stringify(strengths),
    JSON.stringify(areasToImprove)
  )

  const xpReward = overallScore >= 70 ? 150 : 80
  db.prepare('UPDATE users SET total_xp = total_xp + ? WHERE id = ?').run(xpReward, userId)

  res.json({
    success: true,
    result: {
      skillId,
      overallScore,
      accuracyPercent,
      totalQuestions,
      correctCount,
      currentLevel,
      strengths,
      areasToImprove,
      recommendations,
      xpRewarded: xpReward
    }
  })
})

// -------------------------------------------------------------
// UNIFIED TELEMETRY FOR DASHBOARD (2 CORE PATHS: CODE + SOFT SKILLS)
// -------------------------------------------------------------
pathRouter.get('/analytics/paths-summary', requireAuth, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any

  // 1. Code Journey
  const activeLang = (user?.selected_language || 'python') as CodingLanguage
  const langProgress = db.prepare('SELECT * FROM user_language_progress WHERE user_id = ? AND language = ?').get(userId, activeLang) as any
  const totalLessons = 35

  const codeJourney = {
    started: (langProgress?.learning_progress_percent || 0) > 0,
    activeLanguage: activeLang,
    learningMasteryPercent: langProgress?.learning_progress_percent || 0,
    completedLessons: langProgress?.completed_lessons_count || 0,
    totalLessons
  }

  // 2. Skill Check
  const latestSkillCheck = db.prepare('SELECT * FROM skill_check_results WHERE user_id = ? ORDER BY assessed_at DESC LIMIT 1').get(userId) as any
  const skillCheck = {
    started: !!latestSkillCheck,
    activeLanguage: (latestSkillCheck?.language || activeLang) as CodingLanguage,
    codingSkillScore: latestSkillCheck?.overall_score || langProgress?.overall_skill_score || 50,
    quizScore: latestSkillCheck?.quiz_score || 0,
    codingScore: latestSkillCheck?.coding_score || 0,
    assessedLevel: latestSkillCheck?.current_level || 'Novice',
    strengths: latestSkillCheck ? JSON.parse(latestSkillCheck.strengths_json || '[]') : [],
    improvements: latestSkillCheck ? JSON.parse(latestSkillCheck.improvements_json || '[]') : []
  }

  // 3. Soft Skills Journey
  const softSkillsProgress = db.prepare('SELECT * FROM soft_skills_progress WHERE user_id = ?').all(userId) as any[]
  const totalSoftSkillTopics = Object.keys(ALL_SOFT_SKILL_TOPICS).length || 27
  const completedCount = softSkillsProgress.filter(p => p.lesson_completed === 1).length
  const avgQuiz = softSkillsProgress.length > 0
    ? Math.round(softSkillsProgress.reduce((acc, p) => acc + (p.quiz_score || 0), 0) / softSkillsProgress.length)
    : 0

  const softSkillJourney = {
    started: completedCount > 0,
    learningProgressPercent: Math.round((completedCount / totalSoftSkillTopics) * 100),
    completedTopicsCount: completedCount,
    totalTopicsCount: totalSoftSkillTopics,
    avgQuizScore: avgQuiz
  }

  // 4. Soft Skill Check
  const latestSoftCheck = db.prepare('SELECT * FROM soft_skill_check_results WHERE user_id = ? ORDER BY assessed_at DESC LIMIT 1').get(userId) as any
  const softSkillCheck = {
    started: !!latestSoftCheck,
    overallScore: latestSoftCheck?.overall_score || (completedCount > 0 ? 75 : 0),
    assessedLevel: latestSoftCheck?.level || (completedCount > 0 ? 'Proficient Practitioner' : 'Not Assessed'),
    strongSkills: latestSoftCheck ? JSON.parse(latestSoftCheck.strong_skills_json || '[]') : ['Active Listening', 'BLUF Clarity'],
    skillsToImprove: latestSoftCheck ? JSON.parse(latestSoftCheck.improve_skills_json || '[]') : ['Executive Persuasion']
  }

  res.json({
    summary: {
      codeJourney,
      skillCheck,
      softSkillJourney,
      softSkillCheck
    }
  })
})
