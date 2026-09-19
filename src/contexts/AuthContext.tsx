import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User, ExperienceLevel, CodingLanguage, PathType } from '../types'
import { api } from '../lib/api'

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: (momentListener?: (notification: any) => void) => void
          renderButton: (parent: HTMLElement, options: any) => void
          disableAutoSelect: () => void
        }
        oauth2: {
          initTokenClient: (config: any) => {
            requestAccessToken: (overrideConfig?: any) => void
          }
          initCodeClient: (config: any) => {
            requestCode: () => void
          }
        }
      }
    }
  }
}

interface OnboardingSaveParams {
  selectedPath?: PathType
  pathReason?: string
  experienceLevel?: ExperienceLevel
  selectedLanguage?: CodingLanguage
  introCompleted?: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string, displayName?: string) => Promise<void>
  startGoogleOAuth: () => Promise<void>
  startGithubOAuth: () => void
  loginWithGoogleCredential: (credential: string, accessToken?: string) => Promise<void>
  savePathOnboarding: (data: OnboardingSaveParams) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
  updateUserLocally: (updated: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = 'apex_token'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null

    // Check if OAuth callback provided a token in the URL query string
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const urlToken = searchParams.get('token')
      if (urlToken) {
        localStorage.setItem(TOKEN_KEY, urlToken)
        // Clean URL to prevent token leaking in browser history
        searchParams.delete('token')
        const newSearch = searchParams.toString() ? `?${searchParams.toString()}` : ''
        window.history.replaceState({}, document.title, window.location.pathname + newSearch + window.location.hash)
        return urlToken
      }
    } catch {
      // ignore
    }

    return localStorage.getItem(TOKEN_KEY) || localStorage.getItem('coderealm_token')
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleAuthSuccess = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem(TOKEN_KEY, newToken)
  }

  const refreshUser = async () => {
    if (!token) {
      setUser(null)
      setIsLoading(false)
      return
    }

    try {
      const res = await api.get<{ user: User }>('/auth/me')
      setUser(res.user)
    } catch (err) {
      console.warn('Session expired or invalid, logging out.')
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string; user: User }>('/auth/login', { email, password })
    handleAuthSuccess(res.token, res.user)
  }

  const register = async (email: string, password: string, username: string, displayName?: string) => {
    const res = await api.post<{ token: string; user: User }>('/auth/register', { email, password, username, displayName })
    handleAuthSuccess(res.token, res.user)
  }

  const loginWithGoogleCredential = async (credential: string, accessToken?: string) => {
    const res = await api.post<{ token: string; user: User }>('/auth/google/verify', { credential, accessToken })
    handleAuthSuccess(res.token, res.user)
  }

  const startGoogleOAuth = async () => {
    try {
      // 1. Fetch Google Client ID from server config or client env
      let googleClientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || ''
      if (!googleClientId) {
        try {
          const configRes = await api.get<{ googleClientId: string }>('/auth/config')
          googleClientId = configRes.googleClientId
        } catch {
          // ignore
        }
      }

      if (!googleClientId) {
        // Redirect to start endpoint which returns clean descriptive error
        window.location.href = '/api/auth/google/start'
        return
      }

      // 2. If Google Identity Services SDK is available in window
      if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'openid email profile',
          prompt: 'select_account',
          callback: async (tokenResponse: any) => {
            if (tokenResponse.error) {
              console.error('Google OAuth popup error:', tokenResponse)
              throw new Error(tokenResponse.error_description || tokenResponse.error || 'Google authentication was cancelled.')
            }
            if (tokenResponse.access_token) {
              await loginWithGoogleCredential('', tokenResponse.access_token)
              window.location.href = '/home'
            }
          },
        })
        tokenClient.requestAccessToken({ prompt: 'select_account' })
        return
      }

      // 3. Fallback: Redirect to server-side Google OAuth flow with prompt=select_account
      window.location.href = '/api/auth/google/start'
    } catch (err: any) {
      console.error('Google OAuth initialization error:', err)
      // Fallback to server-side flow
      window.location.href = '/api/auth/google/start'
    }
  }

  const startGithubOAuth = () => {
    window.location.href = '/api/auth/github/start'
  }

  const savePathOnboarding = async (data: OnboardingSaveParams) => {
    const res = await api.post<{ success: boolean; user: User }>('/paths/onboarding', data)
    if (res.user) {
      setUser(res.user)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem('coderealm_token')
  }

  const updateUserLocally = (updated: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updated })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        startGoogleOAuth,
        startGithubOAuth,
        loginWithGoogleCredential,
        savePathOnboarding,
        logout,
        refreshUser,
        updateUserLocally,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
