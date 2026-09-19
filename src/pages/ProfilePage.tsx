import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Volume2,
  VolumeX,
  Sliders,
  LogOut,
  Shield,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Calendar,
  Mail,
  ShieldCheck
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { isMuted, toggleMute, volume, setVolume, playClick, playCorrect } = useAudio()

  const handleLogout = () => {
    playClick()
    logout()
    navigate('/')
  }

  const handleVolumeTest = (val: number) => {
    setVolume(val)
    if (!isMuted) {
      playClick()
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Profile Header Card (Matches 10 in Mockup) */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#121620] shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#161B26] via-[#242D40] to-[#E5B842]/30 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg border-2 border-[#E5B842]/40">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                ) : user?.displayName ? (
                  user.displayName.charAt(0).toUpperCase()
                ) : (
                  'A'
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#121620] flex items-center justify-center" title="Active">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold  text-white">
                  {user?.displayName || user?.username || 'APEX Innovator'}
                </h1>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border border-[#E5B842]/30 bg-[#E5B842]/10 text-[#FDE68A] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E5B842]" />
                  <span>Level {user?.level || 1}</span>
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] font-mono flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#E5B842]" />
                <span>{user?.email || `${user?.username || 'user'}@apex.learn`}</span>
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-white/5 bg-[#161B26] space-y-1.5 min-w-[200px] text-xs">
            <div className="text-[10px] font-mono uppercase text-[#E5B842] font-bold">Personal Info</div>
            <div className="text-[#CBD5E1] flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span className="capitalize">{user?.authProvider || 'Email'} Auth</span>
            </div>
            <div className="text-[#CBD5E1] flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span>Joined 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gamified Stats Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-white/10 bg-[#121620] space-y-1.5 hover:border-[#E5B842]/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#9CA3AF] text-xs font-mono">
            <span>Total XP Earned</span>
            <Sparkles className="w-4 h-4 text-[#E5B842]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">{user?.totalXp || 0} XP</div>
          <p className="text-[11px] text-[#E5B842] font-mono">Level {user?.level || 1} Innovator</p>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-[#121620] space-y-1.5 hover:border-[#F59E0B]/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#9CA3AF] text-xs font-mono">
            <span>Current Streak</span>
            <Flame className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#F59E0B]">{user?.currentStreak || 1} Days</div>
          <p className="text-[11px] text-[#9CA3AF] font-mono">Max Streak: {user?.maxStreak || 1}d</p>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-[#121620] space-y-1.5 hover:border-[#E5B842]/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#9CA3AF] text-xs font-mono">
            <span>Security Status</span>
            <ShieldCheck className="w-4 h-4 text-[#E5B842]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white capitalize">{user?.authProvider || 'Email'}</div>
          <p className="text-[11px] text-[#9CA3AF] font-mono">Encrypted Session</p>
        </div>
      </div>

      {/* Audio Synthesizer & Platform Settings */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Audio Feedback & Controls</h2>
              <p className="text-xs text-[#9CA3AF]">Interactive sound feedback calibrated for focus and milestone clarity</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Mute toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-[#0B0E14] hover:border-white/15 transition-all">
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-white">Audio Feedback Effects</h3>
              <p className="text-xs text-[#9CA3AF]">Harmonic chimes for clicks, trial successes, and achievements</p>
            </div>
            <button
              type="button"
              onClick={() => { playClick(); toggleMute() }}
              className={`p-3 rounded-xl border transition-all ${
                isMuted
                  ? 'bg-rose-950/30 border-rose-500/40 text-rose-400 hover:bg-rose-950/50'
                  : 'bg-[#E5B842]/15 border-[#E5B842]/40 text-[#FDE68A] hover:bg-[#E5B842]/25 shadow-md'
              }`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Master Volume */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-white/5 bg-[#0B0E14] hover:border-white/15 transition-all">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">Master Sound Volume</h3>
                <span className="text-xs font-mono font-bold text-[#E5B842]">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">Adjust procedural Web Audio API gain amplifier</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeTest(parseFloat(e.target.value))}
                className="w-40 sm:w-48 accent-[#E5B842] bg-[#161B26] cursor-pointer"
              />
              <button
                type="button"
                onClick={() => playCorrect()}
                className="px-3 py-1.5 rounded-xl border border-[#E5B842]/30 bg-[#E5B842]/10 text-xs font-mono text-[#FDE68A] hover:bg-[#E5B842]/20 transition-colors"
                title="Test Audio Chime"
              >
                Test Chime
              </button>
            </div>
          </div>
        </div>

        {/* Quick Navigate & Session Management */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/paths"
              onClick={playClick}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-gold text-xs font-bold"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Paths</span>
            </Link>
            <Link
              to="/dashboard"
              onClick={playClick}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-[#161B26] text-xs font-semibold text-[#CBD5E1] hover:text-white hover:border-[#E5B842]/40 transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>View Dashboard</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-rose-500/40 bg-rose-950/20 text-xs font-bold text-rose-300 hover:bg-rose-950/50 hover:border-rose-500 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
