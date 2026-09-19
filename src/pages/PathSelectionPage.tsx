import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Code2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Gamepad2,
  Award,
  CheckCircle2
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'

export const PathSelectionPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { playClick } = useAudio()

  const handleSelectPath = (route: string) => {
    playClick()
    navigate(route)
  }

  const paths = [
    {
      id: 'code',
      index: '01',
      title: 'Code',
      tagline: 'Build your coding abilities',
      description: 'Master programming from foundational syntax to advanced data structures and algorithms. Learn step-by-step through interactive lessons, real code execution in Monaco, quizzes, and 150 gamified challenge sectors.',
      icon: Code2,
      route: '/code',
      badge: '9 Languages • 150 Levels',
      modes: [
        { label: 'Learning Curriculum', icon: BookOpen, desc: 'Step-by-step 5-tab system (Lesson, Hint, Practice, Quiz, Challenge)' },
        { label: 'Coding Game Arena', icon: Gamepad2, desc: '150 conquest sectors across Beginner, Medium, and Advanced tiers' }
      ]
    },
    {
      id: 'soft_skills',
      index: '02',
      title: 'Soft Skills',
      tagline: 'Build your professional skills',
      description: 'Elevate non-technical leadership and workplace mastery across 9 essential disciplines: Communication, Teamwork, Leadership, Problem Solving, Critical Thinking, Time Management, and more.',
      icon: TrendingUp,
      route: '/soft-skills',
      badge: '9 Core Disciplines',
      modes: [
        { label: 'Structured Learning', icon: BookOpen, desc: 'Progressive levels (Beginner, Intermediate, Advanced) with workplace scenarios' },
        { label: 'Skill-Specific Testing', icon: Award, desc: 'Dedicated 10-question diagnostics with detailed competency scorecards' }
      ]
    }
  ]

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0B0E14] text-[#F5F5F7] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 z-10 relative animate-fade-in">
        {/* Welcome Greeting Strip */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#9CA3AF]">
              Welcome back, <span className="text-white font-bold">{user?.displayName || user?.username || 'Learner'}</span>!
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#E5B842] font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>APEX Active Session</span>
          </div>
        </div>

        {/* Hero Banner with Official APEX Style */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121620] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B842]/10 rounded-full blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
            style={{ backgroundImage: 'url(/apex-hero.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121620] via-[#121620]/90 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5B842] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>APEX Integrated Mastery</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold  text-white tracking-tight leading-tight">
              Build Skills. <br />
              <span className="gold-gradient-text">Master Your Future.</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed max-w-lg">
              Learn, practice, and evaluate with APEX — your premier platform for rigorous coding proficiency and high-impact professional soft skills.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSelectPath('/code')}
                className="px-6 py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Launch Code Track</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleSelectPath('/soft-skills')}
                className="px-6 py-3 rounded-2xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] hover:border-[#E5B842]/40 text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center gap-2"
              >
                <span>Soft Skills Track</span>
                <ArrowRight className="w-4 h-4 text-[#E5B842]" />
              </button>
            </div>
          </div>

          {/* Inspirational Quote Overlay */}
          <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-right max-w-xs z-10">
            <blockquote className="text-xs italic text-[#E5B842] font-serif">
              "Excellence is not an act, but a habit."
            </blockquote>
            <p className="text-[10px] text-[#9CA3AF] mt-1 font-mono">Coding Precision + Executive Communication</p>
          </div>
        </div>

        {/* Section Title */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold  text-white tracking-tight">
            Choose Your Learning Path
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Select one of the two core pillars of the APEX platform to begin.
          </p>
        </div>

        {/* 2 MAIN PATH SELECTION CARDS (CODE & SOFT SKILLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {paths.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                onClick={() => handleSelectPath(card.route)}
                className="group cursor-pointer relative flex flex-col justify-between p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] hover:bg-[#161B26] hover:border-[#E5B842]/60 transition-all duration-300 shadow-2xl hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Gold ambient hover accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#E5B842]/5 rounded-full blur-3xl group-hover:bg-[#E5B842]/15 transition-all pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-[#E5B842]/10 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842] group-hover:bg-[#E5B842]/20 group-hover:scale-105 transition-all shadow-md">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border border-[#E5B842]/30 bg-[#E5B842]/15 text-[#FDE68A] uppercase tracking-wider">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#9CA3AF] block font-semibold">
                      Track {card.index}
                    </span>
                    <h3 className="text-3xl font-bold  text-white group-hover:text-[#FDE68A] transition-colors mt-0.5">
                      {card.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#E5B842] mt-1">
                      {card.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mt-3">
                      {card.description}
                    </p>
                  </div>

                  {/* Mode Cards Showcase */}
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <span className="text-[11px] font-mono text-[#9CA3AF] uppercase font-bold tracking-wider">
                      Includes 2 Integrated Experiences:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {card.modes.map((mode, mIdx) => {
                        const ModeIcon = mode.icon
                        return (
                          <div key={mIdx} className="p-3.5 rounded-2xl bg-[#161B26] border border-white/5 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-bold text-white">
                              <ModeIcon className="w-4 h-4 text-[#E5B842]" />
                              <span>{mode.label}</span>
                            </div>
                            <p className="text-[11px] text-[#9CA3AF] leading-snug">
                              {mode.desc}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#CBD5E1] group-hover:text-white font-mono font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B842]" />
                    <span>Enter {card.title} Hub</span>
                  </span>
                  <div className="px-4 py-2 rounded-xl bg-[#161B26] group-hover:bg-[#E5B842] text-[#E5B842] group-hover:text-[#0B0E14] font-bold text-xs flex items-center gap-2 transition-all shadow-sm">
                    <span>Explore Track</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PathSelectionPage
