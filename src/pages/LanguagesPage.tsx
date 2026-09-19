import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { BookOpen, Gamepad2, ArrowRight, Sparkles, Trophy } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '../../server/data/languages'
import { TechLogo } from '../components/ui/TechLogo'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'
import { useGame } from '../contexts/GameContext'
import { api } from '../lib/api'

export const LanguagesPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { playClick } = useAudio()
  const { setActiveLanguage } = useGame()
  const [langStats, setLangStats] = useState<Record<string, any>>({})

  useEffect(() => {
    if (user) {
      api.get<{ languages: any[] }>('/user/languages').then(res => {
        const map: Record<string, any> = {}
        res.languages?.forEach(l => { map[l.language] = l })
        setLangStats(map)
      }).catch(() => {})
    }
  }, [user])

  const handleSelectLanguage = (langId: any) => {
    playClick()
    setActiveLanguage(langId)
    navigate(`/learn/${langId}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] shadow-xl space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5B842]/30 bg-[#E5B842]/10 text-[11px] font-mono font-bold text-[#FDE68A]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5B842]" />
          <span>PROGRAMMING LANGUAGES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold  text-white">
          Choose Your Coding Track
        </h1>
        <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xl">
          Each language includes interactive lessons, runnable challenges, quizzes, and 150 gamified levels.
        </p>
      </div>

      {/* Language Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUPPORTED_LANGUAGES.map((lang, idx) => {
          const stats = langStats[lang.id] || {
            learning_progress_percent: 0,
            game_progress_percent: 0,
            overall_skill_score: 50,
            completed_levels_count: 0
          }

          return (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.35 }}
              className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#121620] hover:bg-[#161B26] hover:border-[#E5B842]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#161B26] border border-white/10 flex items-center justify-center p-2 group-hover:scale-105 transition-transform shadow-sm">
                    <TechLogo language={lang.id} size={32} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-[#E5B842]/30 bg-[#E5B842]/15 text-[#FDE68A]">
                    {lang.badgeTitle}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-[#FDE68A] transition-colors">
                    {lang.name}
                  </h2>
                  <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2 leading-relaxed">
                    {lang.tagline}
                  </p>
                </div>

                {/* Progress */}
                <div className="space-y-2.5 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#9CA3AF] flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-[#E5B842]" />
                      <span>Skill Rating</span>
                    </span>
                    <span className="text-white font-bold">{Math.round(stats.overall_skill_score)}%</span>
                  </div>

                  <div className="w-full bg-[#0B0E14] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#D4AF37] to-[#FDE68A] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, stats.learning_progress_percent)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-1 font-mono">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#E5B842]" />
                      {lang.totalLessons} Lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Gamepad2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {lang.totalLevels} Sectors
                    </span>
                  </div>
                </div>
              </div>

              {/* Enter Button */}
              <button
                type="button"
                onClick={() => handleSelectLanguage(lang.id)}
                className="mt-6 w-full py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Select Language</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default LanguagesPage
