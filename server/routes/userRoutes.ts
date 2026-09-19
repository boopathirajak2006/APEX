import { Router, Response } from 'express'
import { db } from '../db'
import { authenticateJWT, AuthRequest } from '../auth'

const router = Router()

// POST /api/user/onboarding (Saves onboarding choices: experience level, goals, starting language)
router.post('/onboarding', authenticateJWT, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  const { experienceLevel, learningGoals, selectedLanguage } = req.body

  try {
    const goalsJson = JSON.stringify(learningGoals || [])

    // Update user onboarding choices
    db.prepare(`
      UPDATE users 
      SET experience_level = ?, learning_goals = ?, selected_language = ?
      WHERE id = ?
    `).run(experienceLevel || 'beginner', goalsJson, selectedLanguage || 'python', userId)

    // Set starting difficulty based on experience level
    let startingDifficulty = 'beginner'
    if (experienceLevel === 'confident') startingDifficulty = 'medium'
    if (experienceLevel === 'expert') startingDifficulty = 'advanced'

    db.prepare(`
      UPDATE user_language_progress
      SET current_difficulty = ?
      WHERE user_id = ? AND language = ?
    `).run(startingDifficulty, userId, selectedLanguage || 'python')

    const updatedUser: any = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    delete updatedUser.password_hash
    updatedUser.learning_goals = learningGoals || []

    return res.json({ success: true, user: updatedUser })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to save onboarding responses' })
  }
})

// GET /api/user/languages (Fetch progress for all languages)
router.get('/languages', authenticateJWT, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  try {
    const progressList = db.prepare('SELECT * FROM user_language_progress WHERE user_id = ?').all(userId)
    return res.json({ languages: progressList })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch languages' })
  }
})

// PUT /api/user/select-language (Switch active language)
router.put('/select-language', authenticateJWT, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id
  const { language } = req.body

  if (!language) return res.status(400).json({ error: 'Language is required' })

  try {
    db.prepare('UPDATE users SET selected_language = ? WHERE id = ?').run(language, userId)
    return res.json({ success: true, selectedLanguage: language })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to select language' })
  }
})

export default router
