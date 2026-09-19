import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Target,
  TrendingUp,
  ArrowRight,
  ShieldCheck
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'
import { ApexLogo } from '../components/ui/ApexLogo'

export const AuthPage: React.FC<{ defaultIsSignUp?: boolean }> = ({ defaultIsSignUp = false }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, register, startGoogleOAuth, startGithubOAuth } = useAuth()
  const { playClick, playCorrect, playWrong } = useAudio()

  const [isSignUp, setIsSignUp] = useState(defaultIsSignUp)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(true)

  // Form fields
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')

  // Check for OAuth errors returned in the URL query string
  useEffect(() => {
    const authError = searchParams.get('auth_error')
    if (authError) {
      setErrorMessage(decodeURIComponent(authError))
      playWrong()
    }
  }, [searchParams])

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    playClick()
    setErrorMessage(null)

    if (isSignUp) {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.')
        playWrong()
        return
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.')
        playWrong()
        return
      }
    }

    setIsLoading(true)

    try {
      if (isSignUp) {
        const effectiveUsername = username.trim() || emailOrUsername.split('@')[0]
        const effectiveEmail = emailOrUsername.trim()
        const effectiveName = displayName.trim() || effectiveUsername
        await register(effectiveEmail, password, effectiveUsername, effectiveName)
      } else {
        await login(emailOrUsername.trim(), password)
      }
      playCorrect()
      navigate('/home')
    } catch (err: any) {
      playWrong()
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleClick = async () => {
    playClick()
    setIsLoading(true)
    setErrorMessage(null)
    try {
      await startGoogleOAuth()
    } catch (err: any) {
      setIsLoading(false)
      playWrong()
      setErrorMessage(err.message || 'Google authentication failed.')
    }
  }

  const handleGithubClick = () => {
    playClick()
    setIsLoading(true)
    setErrorMessage(null)
    try {
      startGithubOAuth()
    } catch (err: any) {
      setIsLoading(false)
      playWrong()
      setErrorMessage(err.message || 'GitHub authentication failed.')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0B0E14] text-[#F5F5F7] flex flex-col lg:flex-row relative overflow-hidden select-none">
      {/* LEFT HERO ARTWORK PANEL */}
      <div className="relative w-full lg:w-1/2 min-h-[320px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-10 overflow-hidden">
        {/* Background Image with Ambient Sunset Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: 'url(/apex-hero.jpg)',
          }}
        />
        {/* Dark subtle gradient overlay to ensure perfect contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/50 to-[#0B0E14]/70 lg:bg-gradient-to-r lg:from-transparent lg:via-[#0B0E14]/40 lg:to-[#0B0E14]" />

        {/* Top APEX Logo */}
        <div className="relative z-20">
          <ApexLogo size="lg" variant="gold" />
        </div>

        {/* Hero Copy at Bottom */}
        <div className="relative z-20 mt-auto pt-12 space-y-3 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B842]/15 border border-[#E5B842]/30 text-xs font-semibold text-[#FDE68A] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B842]" />
            <span>The Peak of Skill Mastery</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to <span className="gold-gradient-text">APEX</span>
          </h1>

          <p className="text-sm sm:text-base text-[#D1D5DB] font-normal leading-relaxed">
            Learn. Practice. Grow. Your journey to becoming a better innovator and technologist starts right here.
          </p>

          <div className="hidden sm:flex items-center gap-6 pt-4 text-xs text-[#9CA3AF] font-medium border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#E5B842]" />
              Secure Authentication
            </span>
            <span>•</span>
            <span>Structured Tracks</span>
            <span>•</span>
            <span>Real Code Trials</span>
          </div>
        </div>
      </div>

      {/* RIGHT AUTH CARD FORM PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-14 z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-[#121620] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          {/* Card Header */}
          <div className="space-y-1 mb-6 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {isSignUp ? 'Create Your Account' : 'Login to Your Account'}
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              {isSignUp ? 'Join APEX and start your learning journey' : 'Continue your learning journey'}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3.5 rounded-xl border border-rose-500/30 bg-rose-950/40 text-xs text-rose-300 flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Benefit Pills in Sign Up Mode */}
          {isSignUp && (
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="p-2.5 rounded-xl bg-[#161B26] border border-white/5 text-center">
                <BookOpen className="w-4 h-4 text-[#E5B842] mx-auto mb-1" />
                <div className="text-[11px] font-bold text-white">Learn</div>
                <div className="text-[9px] text-[#9CA3AF]">Step by step</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#161B26] border border-white/5 text-center">
                <Target className="w-4 h-4 text-[#E5B842] mx-auto mb-1" />
                <div className="text-[11px] font-bold text-white">Practice</div>
                <div className="text-[9px] text-[#9CA3AF]">Real challenges</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#161B26] border border-white/5 text-center">
                <TrendingUp className="w-4 h-4 text-[#E5B842] mx-auto mb-1" />
                <div className="text-[11px] font-bold text-white">Grow</div>
                <div className="text-[9px] text-[#9CA3AF]">Track progress</div>
              </div>
            </div>
          )}

          {/* Social 1-Click Auth (Google & GitHub) */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={isLoading}
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] hover:border-[#E5B842]/40 text-xs font-semibold text-[#E5E7EB] hover:text-white transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleGithubClick}
              disabled={isLoading}
              className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] hover:border-[#E5B842]/40 text-xs font-semibold text-[#E5E7EB] hover:text-white transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4 text-white fill-current flex-shrink-0" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wider">or continue with</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {/* Main Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Alex Vance"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-[#181F2E] text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#E5B842] focus:ring-1 focus:ring-[#E5B842] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">Username</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="alex_apex"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-[#181F2E] text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#E5B842] focus:ring-1 focus:ring-[#E5B842] transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">
                {isSignUp ? 'Email Address' : 'Email or Username'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={isSignUp ? 'email' : 'text'}
                  required
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder={isSignUp ? 'name@example.com' : 'Enter your email or username'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-[#181F2E] text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#E5B842] focus:ring-1 focus:ring-[#E5B842] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? 'Create a strong password' : 'Enter your password'}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-white/10 bg-[#181F2E] text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#E5B842] focus:ring-1 focus:ring-[#E5B842] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-[#D1D5DB] mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-white/10 bg-[#181F2E] text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#E5B842] focus:ring-1 focus:ring-[#E5B842] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password (in Login mode) */}
            {!isSignUp && (
              <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-white/20 bg-[#181F2E] text-[#E5B842] focus:ring-0 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Please contact administrator or re-register if you need password assistance.')}
                  className="hover:text-[#E5B842] transition-colors font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Gold Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 btn-gold flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider mt-2 cursor-pointer disabled:opacity-60"
            >
              <span>{isLoading ? 'Authenticating...' : isSignUp ? 'Sign Up' : 'Login'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Mode Switch Link */}
          <div className="text-center pt-5 mt-5 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                playClick()
                setIsSignUp((prev) => !prev)
                setErrorMessage(null)
              }}
              className="text-xs text-[#E5B842] hover:text-[#FDE68A] transition-colors font-medium cursor-pointer"
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthPage
