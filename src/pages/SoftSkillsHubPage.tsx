import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
  Layers,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  Brain
} from 'lucide-react'
import { useAudio } from '../contexts/AudioContext'
import { SOFT_SKILLS_LIST } from '../data/softSkills/index'

export const SoftSkillsHubPage: React.FC = () => {
  const navigate = useNavigate()
  const { playClick, playCorrect } = useAudio()

  const handleSelectLearn = () => {
    playCorrect()
    navigate('/soft-skills/learning')
  }

  const handleSelectTest = () => {
    playClick()
    navigate('/soft-skills/testing')
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
                <TrendingUp className="w-9 h-9" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5B842]/30 bg-[#E5B842]/10 text-[10px] font-mono font-bold text-[#FDE68A] uppercase tracking-widest mb-1.5">
                  <TrendingUp className="w-3 h-3 text-[#E5B842]" />
                  <span>Soft Skills Track • {SOFT_SKILLS_LIST.length} Core Disciplines</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold  text-white">
                  Professional & Leadership Skills Hub
                </h1>
                <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1 max-w-xl leading-relaxed">
                  Master the essential non-technical skills that multiply engineering impact: Communication, Teamwork, Leadership, Problem Solving, and Critical Thinking.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#E5B842] bg-[#161B26] px-4 py-2.5 rounded-2xl border border-white/10">
              <Sparkles className="w-4 h-4" />
              <span>APEX Certified Leadership</span>
            </div>
          </div>
        </div>

        {/* The Two Main Choices: LEARNING vs TESTING */}
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
                  Structured Soft Skills Learning
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2.5 leading-relaxed">
                  Topic-based progressive curriculum across 9 essential disciplines. Advance sequentially from Beginner $\to$ Intermediate $\to$ Advanced with real workplace situations.
                </p>
              </div>

              {/* Learning Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Layers className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>9 Skill Categories</span>
                  </span>
                  <span className="font-mono text-[#FDE68A] font-bold">Comprehensive Tracks</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Users className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Workplace Scenario Simulations</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">Practical Applications</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Topic Knowledge Checks</span>
                  </span>
                  <span className="font-mono text-white font-bold">5–10 Quizzes / Topic</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#E5B842] group-hover:translate-x-1 transition-transform">
              <span>Explore 9 Soft Skills</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* OPTION 2: TESTING */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={handleSelectTest}
            className="p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] shadow-xl hover:border-[#E5B842]/60 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#E5B842]/10 border border-[#E5B842]/20 flex items-center justify-center text-[#E5B842]">
                  <Award className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono font-bold text-[#9CA3AF] uppercase tracking-wider">
                  Option 2 • Testing
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold  text-white group-hover:text-white transition-colors">
                  Dedicated Skill Testing
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] mt-2.5 leading-relaxed">
                  Select a specific soft skill to take a focused 10-question diagnostic exam. Receive an in-depth scorecard with accuracy, strengths, and areas to improve.
                </p>
              </div>

              {/* Testing Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Brain className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Skill-Specific Question Banks</span>
                  </span>
                  <span className="font-mono text-white font-bold">10 Scenarios / Exam</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>In-Depth Score & Accuracy</span>
                  </span>
                  <span className="font-mono text-[#FDE68A] font-bold">Calculated Scorecards</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#161B26] border border-white/5">
                  <span className="text-[#CBD5E1] flex items-center gap-2 font-medium">
                    <Award className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Strengths & Growth Analysis</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">Personalized Reports</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#CBD5E1] group-hover:text-white group-hover:translate-x-1 transition-transform">
              <span>Select a Skill Test</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SoftSkillsHubPage
