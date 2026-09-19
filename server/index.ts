import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { initDatabase, db } from './db'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import learnRoutes from './routes/learnRoutes'
import gameRoutes from './routes/gameRoutes'
import codeRoutes from './routes/codeRoutes'
import analyticsRoutes from './routes/analyticsRoutes'
import { pathRouter } from './routes/pathRoutes'
import { hashPassword } from './auth'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '5mb' }))

// Initialize database
initDatabase()

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'APEX Platform Engine', timestamp: new Date().toISOString() })
})

// Register API routes
app.use('/api/auth', authRoutes)
app.use('/api/paths', pathRouter)
app.use('/api/user', userRoutes)
app.use('/api/learn', learnRoutes)
app.use('/api/game', gameRoutes)
app.use('/api/code', codeRoutes)
app.use('/api/analytics', analyticsRoutes)

// Serve production static frontend
const distPath = path.resolve(__dirname, '../dist')
app.use(express.static(distPath))

// SPA fallback for frontend client routing (Express 5 compatible)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' })
  }
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 APEX Unified Learning Platform running on http://localhost:${PORT}`)
})

