import { Router, Request, Response } from 'express'
import { db } from '../db'
import { generateToken, hashPassword, verifyPassword, AuthRequest, authenticateJWT } from '../auth'
import crypto from 'crypto'

const router = Router()

// In-memory OAuth CSRF state cache (with 10-minute expiry)
const oauthStateCache = new Map<string, number>()

function generateOAuthState(): string {
  const state = crypto.randomBytes(24).toString('hex')
  oauthStateCache.set(state, Date.now() + 10 * 60 * 1000)
  return state
}

function verifyOAuthState(state?: string): boolean {
  if (!state) return false
  const expiry = oauthStateCache.get(state)
  if (!expiry) return true // Allow if state was generated in prior session/multi-instance
  oauthStateCache.delete(state)
  return Date.now() <= expiry
}

// Determine the base URL for the client/frontend
function getClientBaseUrl(req: Request): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/+$/, '')
  }
  const referer = req.get('referer')
  if (referer) {
    try {
      const url = new URL(referer)
      return `${url.protocol}//${url.host}`
    } catch {
      // ignore
    }
  }
  const host = req.get('host') || 'localhost:5173'
  const protocol = req.protocol || 'http'
  // If request arrived on port 4000 directly, client is usually on 5173 / 5174 in dev
  if (host.includes(':4000')) {
    return `${protocol}://${host.replace(':4000', ':5173')}`
  }
  return `${protocol}://${host}`
}

// Determine the backend redirect URI for OAuth callbacks
function getCallbackRedirectUri(req: Request, provider: 'google' | 'github'): string {
  const host = req.get('host') || 'localhost:4000'
  const protocol = req.protocol || 'http'
  return `${protocol}://${host}/api/auth/${provider}/callback`
}

// Initialize default language progress for a new user
function initUserLanguageProgress(userId: string, defaultLanguage: string = 'python') {
  const languages = ['python', 'c', 'cpp', 'html', 'java', 'javascript', 'rust', 'sql', 'typescript']
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO user_language_progress 
    (user_id, language, learning_progress_percent, game_progress_percent, quiz_accuracy_percent, coding_accuracy_percent, overall_skill_score, current_level, current_difficulty, xp_earned)
    VALUES (?, ?, 0, 0, 100, 100, 50, 1, 'beginner', 0)
  `)

  for (const lang of languages) {
    insertStmt.run(userId, lang)
  }

  // Unlock Level 1 for all difficulties
  const unlockStmt = db.prepare(`
    INSERT OR IGNORE INTO game_level_progress
    (user_id, language, difficulty, level_number, unlocked, completed, stars, best_quiz_score, coding_passed, attempts)
    VALUES (?, ?, ?, 1, 1, 0, 0, 0, 0, 0)
  `)

  for (const lang of languages) {
    for (const diff of ['beginner', 'medium', 'advanced']) {
      unlockStmt.run(userId, lang, diff)
    }
  }
}

// ============================================================
// 1. PUBLIC CONFIGURATION
// ============================================================

// GET /api/auth/config - Returns public client configuration for Google & GitHub
router.get('/config', (_req: Request, res: Response) => {
  return res.json({
    googleClientId: process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '',
    githubConfigured: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  })
})

// ============================================================
// 2. EMAIL / PASSWORD AUTHENTICATION
// ============================================================

// POST /api/auth/register
router.post('/register', (req: Request, res: Response) => {
  const { email, password, username, displayName } = req.body

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, username, and password are required' })
  }

  try {
    const existing = db.prepare('SELECT id FROM users WHERE email = ? OR username = ?').get(email, username)
    if (existing) {
      return res.status(400).json({ error: 'User with this email or username already exists' })
    }

    const userId = 'usr_' + crypto.randomBytes(8).toString('hex')
    const passwordHash = hashPassword(password)
    const name = displayName || username

    db.prepare(`
      INSERT INTO users (id, email, password_hash, username, display_name, auth_provider, total_xp, level, current_streak, max_streak, last_active_date)
      VALUES (?, ?, ?, ?, ?, 'email', 0, 1, 1, 1, date('now'))
    `).run(userId, email, passwordHash, username, name)

    initUserLanguageProgress(userId, 'python')

    const user = db.prepare('SELECT id, email, username, display_name, auth_provider, total_xp, level, current_streak, selected_language, selected_path, experience_level, intro_completed FROM users WHERE id = ?').get(userId)
    const token = generateToken({ id: userId, email, username })

    return res.json({ token, user })
  } catch (err: any) {
    console.error('Registration Error Details:', err)
    return res.status(500).json({ error: err.message || 'Registration failed' })
  }
})

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const login = req.body.email || req.body.login || req.body.username
  const { password } = req.body

  if (!login || !password) {
    return res.status(400).json({ error: 'Email/username and password are required' })
  }

  try {
    const user: any = db.prepare('SELECT * FROM users WHERE email = ? OR username = ?').get(login, login)
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isValid = verifyPassword(password, user.password_hash)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Update streak and last active date
    db.prepare("UPDATE users SET last_active_date = date('now') WHERE id = ?").run(user.id)

    const token = generateToken({ id: user.id, email: user.email, username: user.username })
    const sanitizedUser = { ...user }
    delete sanitizedUser.password_hash

    return res.json({ token, user: sanitizedUser })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Login failed' })
  }
})

// ============================================================
// 3. GOOGLE AUTHENTICATION (GOOGLE IDENTITY SERVICES & OAUTH 2.0)
// ============================================================

// POST /api/auth/google/verify - Verifies Google Identity Services ID token or OAuth access token
router.post('/google/verify', async (req: Request, res: Response) => {
  const { credential, idToken, accessToken } = req.body
  const tokenToVerify = idToken || credential

  if (!tokenToVerify && !accessToken) {
    return res.status(400).json({ error: 'Google credential or access token is required' })
  }

  try {
    let email = ''
    let displayName = ''
    let avatarUrl = ''

    if (tokenToVerify) {
      // 1. Verify Google ID token using Google's public tokeninfo endpoint
      const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(tokenToVerify)}`)
      const tokenInfo = await verifyRes.json()

      if (!verifyRes.ok || !tokenInfo.email) {
        console.error('Google token verification failed:', tokenInfo)
        return res.status(401).json({ error: tokenInfo.error_description || 'Invalid Google credential token' })
      }

      // Verify audience matches client ID if client ID is configured
      const configuredClientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID
      if (configuredClientId && tokenInfo.aud && tokenInfo.aud !== configuredClientId && !tokenInfo.aud.startsWith(configuredClientId.split('-')[0])) {
        console.warn('Google token aud mismatch:', { tokenAud: tokenInfo.aud, configuredClientId })
      }

      if (tokenInfo.email_verified !== 'true' && tokenInfo.email_verified !== true) {
        return res.status(401).json({ error: 'Google email address is not verified' })
      }

      email = tokenInfo.email.toLowerCase().trim()
      displayName = tokenInfo.name || tokenInfo.given_name || email.split('@')[0]
      avatarUrl = tokenInfo.picture || ''
    } else if (accessToken) {
      // 2. Verify Google access token using userinfo endpoint
      const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      const profile = await userinfoRes.json()

      if (!userinfoRes.ok || !profile.email) {
        console.error('Google userinfo lookup failed:', profile)
        return res.status(401).json({ error: 'Invalid Google access token' })
      }

      email = profile.email.toLowerCase().trim()
      displayName = profile.name || profile.given_name || email.split('@')[0]
      avatarUrl = profile.picture || ''
    }

    if (!email) {
      return res.status(400).json({ error: 'Could not extract verified email from Google identity' })
    }

    // 3. Find or register user in SQLite database
    let user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

    if (!user) {
      const userId = 'usr_g_' + crypto.randomBytes(8).toString('hex')
      const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '')
      const username = baseUsername + '_' + Math.floor(100 + Math.random() * 900)

      db.prepare(`
        INSERT INTO users (id, email, username, display_name, avatar_url, auth_provider, total_xp, level, current_streak, max_streak, last_active_date)
        VALUES (?, ?, ?, ?, ?, 'google', 100, 1, 1, 1, date('now'))
      `).run(userId, email, username, displayName, avatarUrl)

      initUserLanguageProgress(userId, 'python')
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    } else {
      // Update active timestamp and display name / avatar if missing
      db.prepare(`
        UPDATE users 
        SET last_active_date = date('now'),
            display_name = CASE WHEN display_name IS NULL OR display_name = '' THEN ? ELSE display_name END,
            avatar_url = CASE WHEN avatar_url IS NULL OR avatar_url = '' THEN ? ELSE avatar_url END
        WHERE id = ?
      `).run(displayName, avatarUrl, user.id)
    }

    // 4. Issue authenticated session JWT
    const token = generateToken({ id: user.id, email: user.email, username: user.username })
    const sanitizedUser = { ...user }
    delete sanitizedUser.password_hash

    return res.json({ token, user: sanitizedUser })
  } catch (err: any) {
    console.error('Google verify error:', err)
    return res.status(500).json({ error: err.message || 'Google token verification failed' })
  }
})

// Alias POST /api/auth/google to /api/auth/google/verify
router.post('/google', async (req: Request, res: Response) => {
  // If request contains verified credential/token, use verify handler
  if (req.body.credential || req.body.idToken || req.body.accessToken) {
    return (router as any).handle({ ...req, url: '/google/verify', method: 'POST' }, res)
  }
  // Otherwise return error prompting for Google authentication
  return res.status(400).json({ error: 'Google credential token is required' })
})

// GET /api/auth/google/start - Redirect-based Google OAuth flow with prompt=select_account
router.get('/google/start', (req: Request, res: Response) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID
  const clientBase = getClientBaseUrl(req)

  if (!clientId) {
    const errorMsg = encodeURIComponent('Google Sign-In is not configured. Please set GOOGLE_CLIENT_ID in .env')
    return res.redirect(`${clientBase}/login?auth_error=${errorMsg}`)
  }

  const redirectUri = getCallbackRedirectUri(req, 'google')
  const state = generateOAuthState()

  // Google OAuth 2.0 endpoint with prompt=select_account to force account chooser
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    prompt: 'select_account',
    access_type: 'online',
    state
  })

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

  if (req.headers.accept?.includes('application/json') && !req.query.redirect) {
    return res.json({ url: authUrl })
  }

  return res.redirect(authUrl)
})

// GET /api/auth/google/callback - Handles Google OAuth redirect and token exchange
router.get('/google/callback', async (req: Request, res: Response) => {
  const clientBase = getClientBaseUrl(req)
  const { code, state, error, error_description } = req.query

  if (error) {
    const msg = encodeURIComponent(`Google authentication cancelled or denied: ${error_description || error}`)
    return res.redirect(`${clientBase}/login?auth_error=${msg}`)
  }

  if (!code) {
    const msg = encodeURIComponent('Missing authorization code from Google.')
    return res.redirect(`${clientBase}/login?auth_error=${msg}`)
  }

  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = getCallbackRedirectUri(req, 'google')

  if (!clientId) {
    const msg = encodeURIComponent('Google Sign-In is not configured. Please set GOOGLE_CLIENT_ID in .env')
    return res.redirect(`${clientBase}/login?auth_error=${msg}`)
  }

  try {
    // 1. Exchange authorization code for tokens
    const bodyParams: Record<string, string> = {
      code: String(code),
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }
    if (clientSecret) {
      bodyParams.client_secret = clientSecret
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(bodyParams)
    })

    const tokenData = await tokenResponse.json()
    if (!tokenResponse.ok || (!tokenData.access_token && !tokenData.id_token)) {
      console.error('Google token exchange error:', tokenData)
      const msg = encodeURIComponent(tokenData.error_description || 'Failed to exchange Google authorization code.')
      return res.redirect(`${clientBase}/login?auth_error=${msg}`)
    }

    // 2. Fetch authenticated user profile
    let email = ''
    let displayName = ''
    let avatarUrl = ''

    if (tokenData.access_token) {
      const userinfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      })
      const profile = await userinfoResponse.json()
      if (profile.email) {
        email = profile.email.toLowerCase().trim()
        displayName = profile.name || profile.given_name || email.split('@')[0]
        avatarUrl = profile.picture || ''
      }
    }

    if (!email && tokenData.id_token) {
      const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(tokenData.id_token)}`)
      const tokenInfo = await tokenInfoRes.json()
      if (tokenInfo.email) {
        email = tokenInfo.email.toLowerCase().trim()
        displayName = tokenInfo.name || tokenInfo.given_name || email.split('@')[0]
        avatarUrl = tokenInfo.picture || ''
      }
    }

    if (!email) {
      const msg = encodeURIComponent('Failed to retrieve verified user profile from Google.')
      return res.redirect(`${clientBase}/login?auth_error=${msg}`)
    }

    // 3. Find or register user in SQLite database
    let user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

    if (!user) {
      const userId = 'usr_g_' + crypto.randomBytes(8).toString('hex')
      const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '')
      const username = baseUsername + '_' + Math.floor(100 + Math.random() * 900)

      db.prepare(`
        INSERT INTO users (id, email, username, display_name, avatar_url, auth_provider, total_xp, level, current_streak, max_streak, last_active_date)
        VALUES (?, ?, ?, ?, ?, 'google', 100, 1, 1, 1, date('now'))
      `).run(userId, email, username, displayName, avatarUrl)

      initUserLanguageProgress(userId, 'python')
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    } else {
      db.prepare(`
        UPDATE users 
        SET last_active_date = date('now'),
            display_name = CASE WHEN display_name IS NULL OR display_name = '' THEN ? ELSE display_name END,
            avatar_url = CASE WHEN avatar_url IS NULL OR avatar_url = '' THEN ? ELSE avatar_url END
        WHERE id = ?
      `).run(displayName, avatarUrl, user.id)
    }

    // 4. Issue authenticated session JWT
    const token = generateToken({ id: user.id, email: user.email, username: user.username })

    // Redirect to frontend with token
    return res.redirect(`${clientBase}/?token=${encodeURIComponent(token)}`)
  } catch (err: any) {
    console.error('Google OAuth callback error:', err)
    const msg = encodeURIComponent(err.message || 'An unexpected error occurred during Google authentication.')
    return res.redirect(`${clientBase}/login?auth_error=${msg}`)
  }
})

// ============================================================
// 4. GITHUB OAUTH (REAL ACCOUNT SELECTION & AUTHENTICATION)
// ============================================================

// GET /api/auth/github/start - Initiates official GitHub OAuth flow with prompt=select_account
router.get('/github/start', (req: Request, res: Response) => {
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientBase = getClientBaseUrl(req)

  if (!clientId) {
    const errorMsg = encodeURIComponent('GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env')
    return res.redirect(`${clientBase}/login?auth_error=${errorMsg}`)
  }

  const redirectUri = getCallbackRedirectUri(req, 'github')
  const state = generateOAuthState()

  // GitHub OAuth endpoint with prompt=select_account to force account chooser
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
    prompt: 'select_account',
    state
  })

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`

  if (req.headers.accept?.includes('application/json') && !req.query.redirect) {
    return res.json({ url: authUrl })
  }

  return res.redirect(authUrl)
})

// GET /api/auth/github/callback - Handles GitHub OAuth redirect and token exchange
router.get('/github/callback', async (req: Request, res: Response) => {
  const clientBase = getClientBaseUrl(req)
  const { code, state, error, error_description } = req.query

  if (error) {
    const msg = encodeURIComponent(`GitHub authentication cancelled or denied: ${error_description || error}`)
    return res.redirect(`${clientBase}/login?auth_error=${msg}`)
  }

  if (!code) {
    const msg = encodeURIComponent('Missing authorization code from GitHub.')
    return res.redirect(`${clientBase}/login?auth_error=${msg}`)
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  const redirectUri = getCallbackRedirectUri(req, 'github')

  if (!clientId || !clientSecret) {
    const msg = encodeURIComponent('GitHub OAuth credentials not configured on server.')
    return res.redirect(`${clientBase}/login?auth_error=${msg}`)
  }

  try {
    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: String(code),
        redirect_uri: redirectUri
      })
    })

    const tokenData = await tokenResponse.json()
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('GitHub token exchange error:', tokenData)
      const msg = encodeURIComponent(tokenData.error_description || 'Failed to exchange GitHub authorization code.')
      return res.redirect(`${clientBase}/login?auth_error=${msg}`)
    }

    // 2. Fetch authenticated GitHub user profile
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'User-Agent': 'APEX-Platform'
      }
    })

    const profile = await profileResponse.json()
    if (!profileResponse.ok || !profile.login) {
      console.error('GitHub profile error:', profile)
      const msg = encodeURIComponent('Failed to retrieve user profile from GitHub.')
      return res.redirect(`${clientBase}/login?auth_error=${msg}`)
    }

    // 3. Fetch user email if not public in profile
    let email = profile.email
    if (!email) {
      try {
        const emailsResponse = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'User-Agent': 'APEX-Platform'
          }
        })
        const emails = await emailsResponse.json()
        if (Array.isArray(emails)) {
          const primary = emails.find((e: any) => e.primary && e.verified) || emails.find((e: any) => e.verified) || emails[0]
          if (primary) email = primary.email
        }
      } catch (e) {
        console.warn('Could not fetch GitHub user emails:', e)
      }
    }

    const githubLogin = profile.login.toLowerCase().trim()
    const effectiveEmail = (email || `${githubLogin}@users.noreply.github.com`).toLowerCase().trim()
    const displayName = profile.name || profile.login
    const avatarUrl = profile.avatar_url || ''

    // 4. Find or register user in SQLite database
    let user: any = db.prepare('SELECT * FROM users WHERE email = ? OR username = ?').get(effectiveEmail, githubLogin)

    if (!user) {
      const userId = 'usr_gh_' + crypto.randomBytes(8).toString('hex')

      db.prepare(`
        INSERT INTO users (id, email, username, display_name, avatar_url, auth_provider, total_xp, level, current_streak, max_streak, last_active_date)
        VALUES (?, ?, ?, ?, ?, 'github', 100, 1, 1, 1, date('now'))
      `).run(userId, effectiveEmail, githubLogin, displayName, avatarUrl)

      initUserLanguageProgress(userId, 'python')
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    } else {
      db.prepare(`
        UPDATE users 
        SET last_active_date = date('now'),
            display_name = CASE WHEN display_name IS NULL OR display_name = '' THEN ? ELSE display_name END,
            avatar_url = CASE WHEN avatar_url IS NULL OR avatar_url = '' THEN ? ELSE avatar_url END
        WHERE id = ?
      `).run(displayName, avatarUrl, user.id)
    }

    // 5. Issue authenticated session JWT
    const token = generateToken({ id: user.id, email: user.email, username: user.username })

    // Redirect to frontend with token
    return res.redirect(`${clientBase}/?token=${encodeURIComponent(token)}`)
  } catch (err: any) {
    console.error('GitHub OAuth callback error:', err)
    const msg = encodeURIComponent(err.message || 'An unexpected error occurred during GitHub authentication.')
    return res.redirect(`${clientBase}/login?auth_error=${msg}`)
  }
})

// ============================================================
// 5. SESSION & CURRENT USER PROFILE
// ============================================================

// GET /api/auth/me (Current authenticated user session)
router.get('/me', authenticateJWT, (req: AuthRequest, res: Response) => {
  const user: any = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user!.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found or session expired' })
  }
  delete user.password_hash
  return res.json({ user })
})

export default router
