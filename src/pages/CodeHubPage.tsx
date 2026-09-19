import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  BookOpen,
  Gamepad2,
  ArrowRight,
  Layers,
  Award,
  Zap,
  Code2,
  Terminal,
  ShieldCheck
} from 'lucide-react'
import { useAudio } from '../contexts/AudioContext'
import { useGame } from '../contexts/GameContext'
import { SUPPORTED_LANGUAGES } from '../../server/data/languages'
import { TechLogo } from '../components/ui/TechLogo'

export const CodeHubPage: React.FC = () => {
  const navigate = useNavigate()
  const { playClick, playCorrect } = useAudio()
  const { activeLanguage } = useGame()

  const activeLangMeta = SUPPORTED_LANGUAGES.find(l => l.id === activeLanguage) || SUPPORTED_LANGUAGES[0]

  const handleSelectLearn = () => {
    playCorrect()
    navigate(`/code/learning/${activeLanguage}`)
  }

  const handleSelectGame = () => {
    playClick()
    navigate(`/code/game/${activeLanguage}/beginner`)
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0B0E14] text-[#F5F5F7] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Top Header Card */}
        <div className="p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#121620] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B842]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#161B26] border border-[#E5B842]/30 flex items-center justify-center shadow-lg p-2.5 text-[#E5B842]">
                <Code2 className="w-9 h-9" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5B842]/30 bg-[#E5B842]/10 text-[10px] font-mono font-bold text-[#FDE68A] uppercase tracking-widest mb-1.5">
                  <Code2 className="w-3 h-3 text-[#E5B842]" />
                  <span>Code Track • {SUPPORTED_LANGUAGES.length} Languages</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold  text-white">
                  Coding Engine & Game Arena
                </h1>
                <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1 max-w-xl leading-relaxed">
                  Master programming from beginner syntax to advanced algorithms. Choose whether to follow the structured curriculum or battle through coding game sectors.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#161B26] px-4 py-3 rounded-2xl border border-white/10 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-[#0B0E14] border border-white/10 flex items-center justify-center p-1.5">
                <TechLogo language={activeLangMeta.id} size={24} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#9CA3AF] uppercase">Active Language</div>
                <div className="text-xs font-bold text-white">{activeLangMeta.name} Track</div>
              </div>
            </div>
          </div>
        </div>

        {/* The Two Main Options: LEARNING vs GAME */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* OPTION 1: LEARNING */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={handleSelectLearn}
            className="p-7 sm:p-9 rounded-3xl border border-[#E5B842]/40 bg-[#121620] shadow-xl hover:shadow-2xl hover:border-[#E5B842] transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#E5B842]/10 rounded-full blur-2xl group-hover:bg-[#E5B842]/20 transition-all pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E5B842]/15 border border-[#E5B842]/40 flex items-center justify-center text-[#E5B842]">
                  <BookOpen className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-[#E5B842]/20 border border-[#E5B842]/40 text-[11px] font-mono font-bold text-[#FDE68A] uppercase tracking-wider">
                  Option 1 • Learning
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold  text-white group-hover:text-[#FDE68A] transition-colors">
                  Structured Curriculum
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2.5 leading-relaxed">
                  Step-by-step progressive syllabus following Language $\to$ Category $\to$ Topic. Every topic is taught with a comprehensive 5-Tab system.
                </p>
              </div>

              {/* 5-Tab Feature Badges */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Layers className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>5-Tab Engine</span>
                  </span>
                  <span className="font-mono text-[#FDE68A] font-bold">Lesson • Hint • Practice • Quiz • Challenge</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Terminal className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Monaco Sandbox Runner</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">Live Execution</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Topic Mastery Unlock</span>
                  </span>
                  <span className="font-mono text-white font-bold">Sequential Progression</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#E5B842] group-hover:translate-x-1 transition-transform">
              <span>Start Learning ({activeLangMeta.name})</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* OPTION 2: GAME */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={handleSelectGame}
            className="p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] shadow-xl hover:border-[#E5B842]/60 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E5B842]/10 border border-[#E5B842]/20 flex items-center justify-center text-[#E5B842]">
                  <Gamepad2 className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono font-bold text-[#9CA3AF] uppercase tracking-wider">
                  Option 2 • Coding Game
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold  text-white group-hover:text-white transition-colors">
                  Coding Game Arena
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2.5 leading-relaxed">
                  Conquer 150 progressive challenge sectors across 3 difficulty tiers. Solve rapid code diagnostic trials and live Monaco sandbox challenges.
                </p>
              </div>

              {/* Game Feature Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Gamepad2 className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>3 Difficulty Worlds</span>
                  </span>
                  <span className="font-mono text-white font-bold">Beginner • Medium • Advanced</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Award className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>150 Conquest Sectors</span>
                  </span>
                  <span className="font-mono text-[#FDE68A] font-bold">3 Quizzes + 1 Challenge / Level</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Zap className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>XP & Star Progression</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">Gamified Rewards</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#CBD5E1] group-hover:text-white group-hover:translate-x-1 transition-transform">
              <span>Enter Coding Game ({activeLangMeta.name})</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CodeHubPage
