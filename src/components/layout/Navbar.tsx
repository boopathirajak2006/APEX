import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Flame,
  Volume2,
  VolumeX,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Layers,
  Code2,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useAudio } from '../../contexts/AudioContext'
import { useGame } from '../../contexts/GameContext'
import { SUPPORTED_LANGUAGES } from '../../../server/data/languages'
import type { CodingLanguage } from '../../types'
import { ApexLogo } from '../ui/ApexLogo'
import { TechLogo } from '../ui/TechLogo'

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const { isMuted, toggleMute, playClick } = useAudio()
  const { activeLanguage, setActiveLanguage } = useGame()
  const location = useLocation()
  const navigate = useNavigate()

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const activeLangMeta = SUPPORTED_LANGUAGES.find(l => l.id === activeLanguage) || SUPPORTED_LANGUAGES[0]

  const navLinks = [
    { label: 'Home', path: '/home', icon: Layers },
    { label: 'Code', path: '/code', icon: Code2 },
    { label: 'Soft Skills', path: '/soft-skills', icon: TrendingUp },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ]

  const handleLangSelect = (langId: CodingLanguage) => {
    playClick()
    setActiveLanguage(langId)
    setIsLangMenuOpen(false)

    // Immediate real-time navigation when on code routes
    if (location.pathname.startsWith('/code/learning') || location.pathname.startsWith('/learn')) {
      navigate(`/code/learning/${langId}`)
    } else if (location.pathname.startsWith('/code/game') || location.pathname.startsWith('/game')) {
      navigate(`/code/game/${langId}`)
    } else if (location.pathname.startsWith('/mode')) {
      navigate(`/mode/${langId}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0E14]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* APEX Official Brand Logo */}
        <Link
          to={user ? '/home' : '/login'}
          onClick={playClick}
          className="group flex-shrink-0"
        >
          <ApexLogo size="md" variant="gold" showTagline={true} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121620] p-1.5 rounded-2xl border border-white/5 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive =
              (link.path === '/home' && (location.pathname === '/home' || location.pathname === '/paths' || location.pathname === '/')) ||
              (link.path !== '/home' && location.pathname.startsWith(link.path))
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={playClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E5B842] text-[#0B0E14] font-bold shadow-[0_2px_15px_rgba(229,184,66,0.35)]'
                    : 'text-[#CBD5E1] hover:text-white hover:bg-[#1C2333]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right User & Control Strip */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { playClick(); setIsLangMenuOpen(prev => !prev) }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/10 bg-[#121620] hover:bg-[#181F2E] hover:border-[#E5B842]/40 text-xs font-semibold text-[#E5E7EB] transition-all shadow-sm"
            >
              <TechLogo language={activeLangMeta.id} size={18} />
              <span className="hidden sm:inline font-mono font-medium">{activeLangMeta.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#9CA3AF] transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2.5 w-52 rounded-2xl border border-white/10 bg-[#121620]/95 backdrop-blur-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3.5 py-1.5 text-[10px] font-mono uppercase text-[#E5B842] font-bold border-b border-white/10">
                  Select Language
                </div>
                <div className="max-h-60 overflow-y-auto p-1">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => handleLangSelect(lang.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${
                        activeLanguage === lang.id
                          ? 'bg-[#E5B842]/15 text-[#FDE68A] font-semibold border border-[#E5B842]/30'
                          : 'text-[#CBD5E1] hover:bg-[#181F2E] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <TechLogo language={lang.id} size={18} />
                        <span>{lang.name}</span>
                      </div>
                      {activeLanguage === lang.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5B842] shadow-[0_0_8px_#E5B842]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sound Mute Toggle */}
          <button
            type="button"
            onClick={() => { playClick(); toggleMute() }}
            className="p-2.5 rounded-xl border border-white/10 bg-[#121620] hover:bg-[#181F2E] hover:border-[#E5B842]/40 text-[#CBD5E1] hover:text-white transition-all shadow-sm"
            title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#E5B842]" />}
          </button>

          {user ? (
            <>
              {/* Streak Flame Pill */}
              <div
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#FDE68A] text-xs font-bold font-mono shadow-sm"
                title={`${user.currentStreak} Day Streak`}
              >
                <Flame className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                <span>{user.currentStreak}d</span>
              </div>

              {/* Player XP & Level */}
              <div className="flex items-center gap-2.5 pl-1">
                <div className="hidden md:flex flex-col items-end">
                  <div className="flex items-center gap-1 text-xs font-bold text-white font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>{user.totalXp || 0} XP</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#E5B842] font-semibold">
                    Level {user.level || 1}
                  </span>
                </div>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => { playClick(); setIsUserMenuOpen(prev => !prev) }}
                    className="w-9 h-9 rounded-xl border border-[#E5B842]/40 bg-gradient-to-tr from-[#161B26] to-[#242D40] flex items-center justify-center text-white hover:border-[#E5B842] transition-all shadow-md font-bold text-xs"
                  >
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      user.displayName ? user.displayName.charAt(0).toUpperCase() : user.username ? user.username.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4 text-[#E5B842]" />
                    )}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2.5 w-56 rounded-2xl border border-white/10 bg-[#121620]/95 backdrop-blur-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user.displayName || user.username}</p>
                        <p className="text-[11px] text-[#9CA3AF] font-mono truncate">{user.email || 'Member'}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => { playClick(); setIsUserMenuOpen(false) }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#E5E7EB] hover:bg-[#181F2E] hover:text-white transition-all"
                      >
                        <UserIcon className="w-4 h-4 text-[#E5B842]" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => { playClick(); setIsUserMenuOpen(false) }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#E5E7EB] hover:bg-[#181F2E] hover:text-white transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#E5B842]" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => { playClick(); logout(); setIsUserMenuOpen(false) }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-950/30 hover:text-rose-200 transition-all text-left mt-1"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              onClick={playClick}
              className="px-4 py-2 rounded-xl btn-gold text-xs font-bold"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(prev => !prev)}
            className="lg:hidden p-2.5 rounded-xl border border-white/10 bg-[#121620] text-[#CBD5E1]"
          >
            {isMobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileNavOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#121620] px-4 py-3 space-y-1.5 animate-in fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive =
              (link.path === '/home' && (location.pathname === '/home' || location.pathname === '/paths' || location.pathname === '/')) ||
              (link.path !== '/home' && location.pathname.startsWith(link.path))
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => { playClick(); setIsMobileNavOpen(false) }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#E5B842] text-[#0B0E14] font-bold'
                    : 'text-[#E5E7EB] hover:bg-[#181F2E] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}

export default Navbar
