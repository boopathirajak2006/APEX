import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { BookOpen, Gamepad2, ArrowRight, Layers } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '../../server/data/languages'
import { TechLogo } from '../components/ui/TechLogo'
import type { CodingLanguage, DifficultyLevel } from '../types'
import { useAudio } from '../contexts/AudioContext'

export const ModePage: React.FC = () => {
  const { language = 'python' } = useParams<{ language: CodingLanguage }>()
  const navigate = useNavigate()
  const { playClick } = useAudio()

  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('beginner')

  const langMeta = SUPPORTED_LANGUAGES.find(l => l.id === language) || SUPPORTED_LANGUAGES[0]

  const difficulties: {
    id: DifficultyLevel
    badge: string
    desc: string
  }[] = [
    {
      id: 'beginner',
      badge: 'Tier 1',
      desc: 'Foundations • Sectors 1–50'
    },
    {
      id: 'medium',
      badge: 'Tier 2',
      desc: 'Algorithms • Sectors 51–100'
    },
    {
      id: 'advanced',
      badge: 'Tier 3',
      desc: 'Mastery • Sectors 101–150'
    },
  ]

  const handleLaunchGame = (diff: DifficultyLevel) => {
    playClick()
    navigate(`/game/${language}/${diff}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Language Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#161B26] border border-white/10 flex items-center justify-center p-3 shadow-md flex-shrink-0">
            <TechLogo language={langMeta.id} size={42} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold  text-white">
                {langMeta.name} Track
              </h1>
              <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-[#E5B842]/30 bg-[#E5B842]/15 text-[#FDE68A]">
                {langMeta.badgeTitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1 max-w-lg leading-relaxed">
              {langMeta.description}
            </p>
          </div>
        </div>
      </div>

      {/* Two Major Mode Selections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* MODE 1: LEARNING MODE */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] shadow-xl flex flex-col justify-between group hover:border-[#E5B842]/40 transition-all duration-300"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="p-3.5 rounded-2xl bg-[#E5B842]/15 text-[#E5B842] border border-[#E5B842]/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase text-[#E5B842] tracking-wider">
                Mode 1 • Structured
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold  text-white group-hover:text-[#FDE68A] transition-colors">
                Learning Curriculum
              </h2>
              <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2 leading-relaxed">
                Logically ordered syllabus from Beginner → Intermediate → Advanced. Includes interactive theory, code examples, trial quizzes, and Monaco sandbox challenges.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#161B26] space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-200">
                <span className="font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#E5B842]" />
                  <span>Curriculum Modules:</span>
                </span>
                <span className="font-mono text-[#FDE68A] font-bold">{langMeta.totalLessons} Lessons</span>
              </div>
              <p className="text-[11px] text-[#9CA3AF] font-mono leading-relaxed">
                Syntax • Variables • Conditionals • Loops • Functions • Data Structures • OOP
              </p>
            </div>
          </div>

          <Link
            to={`/learn/${language}`}
            onClick={playClick}
            className="mt-8 w-full py-3.5 btn-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Launch Learning Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* MODE 2: PLAY GAME MODE */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] shadow-xl flex flex-col justify-between group hover:border-[#E5B842]/40 transition-all duration-300"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="p-3.5 rounded-2xl bg-[#E5B842]/15 text-[#E5B842] border border-[#E5B842]/30">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase text-[#E5B842] tracking-wider">
                Mode 2 • Challenges
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold  text-white group-hover:text-[#FDE68A] transition-colors">
                Play Game Mode
              </h2>
              <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2 leading-relaxed">
                Conquer 150 sectors across 3 difficulty worlds. Every level challenges you with 3 Quiz trials and 1 Monaco coding challenge with automated verification.
              </p>
            </div>

            {/* Difficulty World Selector */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono text-[#E5B842] uppercase font-bold">
                Select Difficulty Tier:
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {difficulties.map((diff) => {
                  const isSel = selectedDifficulty === diff.id
                  return (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => {
                        playClick()
                        setSelectedDifficulty(diff.id)
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSel
                          ? 'bg-[#E5B842]/20 border-[#E5B842] text-white shadow-md'
                          : 'bg-[#161B26] border-white/10 text-[#CBD5E1] hover:bg-[#1C2333]'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-[#E5B842] uppercase font-bold">{diff.badge}</div>
                      <div className="text-xs font-bold capitalize mt-0.5 text-white">{diff.id}</div>
                      <div className="text-[10px] text-[#9CA3AF] font-mono">50 Lvls</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleLaunchGame(selectedDifficulty)}
            className="mt-8 w-full py-3.5 btn-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Enter {selectedDifficulty.toUpperCase()} World</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ModePage
