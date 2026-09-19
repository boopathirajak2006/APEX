import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
import { db } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'coderealm-super-secret-key-gamified-2026'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email?: string
    username: string
  }
}

export function generateToken(payload: { id: string; email?: string; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10)
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string
      email?: string
      username: string
    }

    // Verify user exists in database
    const user = db.prepare('SELECT id, email, username FROM users WHERE id = ?').get(decoded.id)
    if (!user) {
      return res.status(401).json({ error: 'User not found or session revoked' })
    }

    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export const requireAuth = authenticateJWT
export type AuthenticatedRequest = AuthRequest
