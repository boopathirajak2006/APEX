import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Lock,
  Star,
  Skull
} from 'lucide-react'
import type { CodingLanguage, DifficultyLevel } from '../types'
import { SUPPORTED_LANGUAGES } from '../../server/data/languages'
import { TechLogo } from '../components/ui/TechLogo'
import { api } from '../lib/api'
import { useAudio } from '../contexts/AudioContext'

export const GameMapPage: React.FC = () => {
  const { language = 'python', difficulty = 'beginner' } = useParams<{
    language: CodingLanguage
    difficulty: DifficultyLevel
  }>()
  const navigate = useNavigate()
  const { playClick } = useAudio()

  const [sectors, setSectors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const langMeta = SUPPORTED_LANGUAGES.find(l => l.id === language) || SUPPORTED_LANGUAGES[0]

  useEffect(() => {
    setLoading(true)
    const fetchMap = async () => {
      try {
        const res = await api.get<{ sectors: any[] }>(
          `/game/map/${language}/${difficulty}`
        )
        setSectors(res.sectors || [])
      } catch (err) {
        console.error('Failed to load map:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMap()
  }, [language, difficulty])

  const handleSelectLevel = (lvl: any) => {
    if (!lvl.unlocked) return
    playClick()
    navigate(`/game/${language}/${difficulty}/${lvl.levelNumber}`)
  }

  const totalStars = sectors.reduce((acc, s) => acc + (s.stars || 0), 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Map Header HUD */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] shadow-xl">
        <div className="space-y-3 text-center sm:text-left">
          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#161B26] border border-white/10 flex items-center justify-center p-2 shadow-sm">
              <TechLogo language={langMeta.id} size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold  text-white capitalize">
                  {langMeta.name} Game Arena
                </h1>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#E5B842]/15 text-[#FDE68A] uppercase border border-[#E5B842]/30">
                  {difficulty}
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF] font-mono mt-0.5">50 Progressive Coding Sectors</p>
            </div>
          </div>

          {/* Difficulty Switcher */}
          <div className="flex items-center gap-2 pt-1">
            {(['beginner', 'medium', 'advanced'] as DifficultyLevel[]).map((d) => (
              <Link
                key={d}
                to={`/game/${language}/${d}`}
                onClick={playClick}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-all ${
                  difficulty === d
                    ? 'bg-[#E5B842] text-[#0B0E14] shadow-md'
                    : 'bg-[#161B26] border border-white/10 text-[#9CA3AF] hover:text-white'
                }`}
              >
                {d}
              </Link>
            ))}
          </div>
        </div>

        {/* Stars Tally */}
        <div className="flex items-center gap-4 bg-[#161B26] p-4 rounded-2xl border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
            <Star className="w-6 h-6 fill-[#E5B842]" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#9CA3AF] font-bold">Stars Earned</div>
            <div className="text-2xl font-extrabold font-mono text-white">{totalStars} / 150</div>
          </div>
        </div>
      </div>

      {/* 50-Level Visual Progression Grid */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <span className="text-xs font-mono uppercase font-bold text-[#E5B842] tracking-wider">
            Sector 1 to 50 • Difficulty Map
          </span>
          <div className="flex items-center gap-4 text-xs text-[#9CA3AF] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B842] animate-pulse inline-block" /> Current
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" /> Locked
            </span>
          </div>
        </div>

        {/* Responsive Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm font-mono text-[#9CA3AF]">
            Loading sectors...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3.5 sm:gap-4">
            {sectors.map((lvl: any) => {
              const isCurrent = lvl.unlocked && !lvl.completed
              return (
                <motion.button
                  key={lvl.id || lvl.levelNumber}
                  type="button"
                  onClick={() => handleSelectLevel(lvl)}
                  disabled={!lvl.unlocked}
                  whileHover={lvl.unlocked ? { scale: 1.05 } : {}}
                  whileTap={lvl.unlocked ? { scale: 0.95 } : {}}
                  className={`relative aspect-square rounded-2xl border flex flex-col items-center justify-center p-2.5 transition-all ${
                  lvl.isBoss
                    ? lvl.completed
                      ? 'bg-gradient-to-br from-amber-950/60 to-[#121620] border-[#E5B842]/50'
                      : lvl.unlocked
                      ? 'bg-[#161B26] border-[#E5B842] shadow-[0_0_20px_rgba(229,184,66,0.3)] animate-pulse'
                      : 'bg-[#0B0E14]/60 border-white/5 opacity-40'
                    : lvl.completed
                    ? 'bg-emerald-950/30 border-emerald-500/40'
                    : isCurrent
                    ? 'bg-[#E5B842]/15 border-[#E5B842] shadow-[0_0_20px_rgba(229,184,66,0.25)] ring-1 ring-[#E5B842]'
                    : 'bg-[#0B0E14]/60 border-white/5 opacity-40 cursor-not-allowed'
                }`}
              >
                {lvl.isBoss && (
                  <div className="absolute -top-2 px-1.5 py-0.5 rounded-full bg-[#E5B842] text-[8px] font-mono font-bold text-black uppercase tracking-wider">
                    BOSS
                  </div>
                )}

                <div className="flex flex-col items-center">
                  {!lvl.unlocked ? (
                    <Lock className="w-4 h-4 text-[#64748B]" />
                  ) : lvl.isBoss ? (
                    <Skull className={`w-5 h-5 ${lvl.completed ? 'text-[#E5B842]' : 'text-white'}`} />
                  ) : (
                    <span className={`text-base font-extrabold font-mono ${lvl.completed ? 'text-emerald-300' : 'text-white'}`}>
                      {lvl.levelNumber}
                    </span>
                  )}

                  {lvl.unlocked && (
                    <div className="flex items-center gap-0.5 mt-1.5">
                      {[1, 2, 3].map((starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-3 h-3 ${
                            lvl.stars >= starIdx
                              ? 'fill-[#E5B842] text-[#E5B842]'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      )}
      </div>
    </div>
  )
}

export default GameMapPage
