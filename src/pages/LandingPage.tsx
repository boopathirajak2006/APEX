import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Gamepad2,
  BookOpen,
  Code2,
  Trophy,
  ArrowRight,
  Terminal,
  Zap,
  Sparkles
} from 'lucide-react'
import { CipherMascot } from '../components/mascot/CipherMascot'
import { CyberStarfield } from '../components/canvas/CyberStarfield'
import { SUPPORTED_LANGUAGES } from '../../server/data/languages'
import { TechLogo } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'

export const LandingPage: React.FC = () => {
  const { user } = useAuth()
  const { playClick } = useAudio()

  const features = [
    {
      icon: BookOpen,
      title: 'Structured Mastery Curricula',
      desc: 'Step-by-step interactive theory, code examples, trial quizzes, and sandbox exercises calibrated from Beginner to Advanced.',
      tag: 'Interactive Lessons'
    },
    {
      icon: Gamepad2,
      title: '150-Level Game Worlds',
      desc: '50 Beginner, 50 Medium, and 50 Advanced sectors per language. Every level tests you with 3 quiz trials and 1 Monaco coding challenge.',
      tag: 'Gamified Progression'
    },
    {
      icon: Terminal,
      title: 'Monaco Browser Sandbox',
      desc: 'Write real code in Monaco with automated unit test validation, isolated sandbox execution, and immediate feedback.',
      tag: 'Real Sandbox'
    },
    {
      icon: Trophy,
      title: 'Precision Skill Scoring',
      desc: 'Algorithmic scoring that independently weights quiz accuracy, coding accuracy, and progression for true competency tracking.',
      tag: 'Competency Matrix'
    }
  ]

  return (
    <div className="relative min-h-screen bg-[#050814] text-slate-100 overflow-hidden flex flex-col">
      <CyberStarfield />

      {/* Hero Section Container */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-10 pb-16 sm:pt-16 sm:pb-24 flex flex-col items-center text-center">
        {/* Robot Companion Greeting Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <CipherMascot
            mood="excited"
            message="Greetings, Coder! I am Byte, your AI coding companion. Ready to conquer interactive quests and level up your skills?"
            size="lg"
          />
        </motion.div>

        {/* StudioUI Style Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-[#091024]/80 text-xs font-semibold text-blue-300 backdrop-blur-md mb-6 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono uppercase tracking-wider text-[11px]">AI-POWERED GAMIFIED CODING REALM</span>
        </motion.div>

        {/* Master Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-white leading-[1.1]"
        >
          Master Real Code in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">Futuristic Universe</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6 max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal"
        >
          Embark on structured programming quests, solve challenges in the Monaco editor, level up your algorithmic score, and build an undeniable developer portfolio.
        </motion.p>

        {/* CTA Buttons - StudioUI Inspired Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to={user ? '/onboarding' : '/auth'}
            onClick={playClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 active:scale-95"
          >
            <span>{user ? 'Enter Command Universe' : 'Start Free Coding Quest'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/languages"
            onClick={playClick}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl border border-blue-900/30 bg-[#091024]/80 hover:bg-[#0d1736] text-sm font-semibold text-slate-200 hover:text-white hover:border-blue-500/40 transition-all backdrop-blur-md shadow-sm"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Explore 8+ Languages</span>
          </Link>
        </motion.div>

        {/* Language Grid Showcase - Clean StudioUI Card Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 w-full max-w-4xl"
        >
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              Supported Programming Domains
            </span>
            <span className="text-xs font-mono text-slate-400">1,200+ Total Trials</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <Link
                key={lang.id}
                to={`/learn/${lang.id}`}
                onClick={playClick}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-blue-900/25 bg-[#091024]/90 hover:bg-[#0d1736] hover:border-blue-500/40 transition-all text-left group shadow-lg"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0B0E14] border border-white/10 flex items-center justify-center p-1 group-hover:scale-105 transition-transform flex-shrink-0">
                  <TechLogo language={lang.id} size={20} />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors">{lang.name}</h2>
                  <p className="text-[10px] text-slate-400 font-mono">{lang.totalLevels} Sectors</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Core Features Showcase - Clean Layered Card Composition */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-20 border-t border-blue-900/20">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/30 text-[11px] font-mono font-bold text-blue-300">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>GAMEPLAY ENGINE</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white">
            Built for Serious Coders
          </h2>
          <p className="text-slate-400 text-sm">
            Engineered with deep gamification loops that transform computer science paradigms into thrilling gameplay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.title}
                className="p-6 sm:p-7 rounded-3xl border border-blue-900/25 bg-[#091024]/90 backdrop-blur-xl shadow-2xl flex flex-col justify-between transition-all hover:border-blue-500/40 hover:-translate-y-1 duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block mb-1">
                      {feat.tag}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1.5">{feat.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

