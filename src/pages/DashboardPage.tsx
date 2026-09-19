import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Trophy,
  Flame,
  Sparkles,
  Zap,
  Code2,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Gamepad2,
  Award,
  Layers
} from 'lucide-react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'
import { api } from '../lib/api'
import type { PathScoreSummary } from '../types'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const { playClick } = useAudio()

  const [analytics, setAnalytics] = useState<any | null>(null)
  const [pathsSummary, setPathsSummary] = useState<PathScoreSummary | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      api.get('/analytics/dashboard'),
      api.get('/analytics/achievements'),
      api.get<{ summary: PathScoreSummary }>('/paths/analytics/paths-summary')
    ])
      .then(([dashRes, _achRes, pathsRes]) => {
        setAnalytics(dashRes)
        setPathsSummary(pathsRes.summary || null)
      })
      .catch(err => console.error('Failed to load dashboard:', err))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading || !analytics) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4 text-[#9CA3AF]">
        <div className="w-10 h-10 border-2 border-[#E5B842]/30 border-t-[#E5B842] rounded-full animate-spin" />
        <p className="text-sm font-mono text-[#9CA3AF]">Syncing APEX analytics & progress telemetry...</p>
      </div>
    )
  }

  const ps = pathsSummary

  // Recharts radar data for Code & Soft Skills
  const radarData = [
    { subject: 'Coding Mastery', score: ps?.codeJourney.learningMasteryPercent || 40 },
    { subject: 'Algorithms', score: analytics.codingAccuracy || 85 },
    { subject: 'Game Progress', score: 35 },
    { subject: 'Soft Skills', score: ps?.softSkillJourney.learningProgressPercent || 50 },
    { subject: 'Leadership', score: ps?.softSkillCheck.overallScore || 70 },
    { subject: 'Communication', score: 75 },
  ]

  // Activity chart mock data with gold palette
  const activityData = [
    { day: 'Mon', xp: 45, accuracy: 88 },
    { day: 'Tue', xp: 75, accuracy: 92 },
    { day: 'Wed', xp: 60, accuracy: 85 },
    { day: 'Thu', xp: 120, accuracy: 95 },
    { day: 'Fri', xp: 90, accuracy: 90 },
    { day: 'Sat', xp: 140, accuracy: 98 },
    { day: 'Sun', xp: 110, accuracy: 94 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Top Header Command Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#121620] shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5B842]/30 bg-[#E5B842]/10 text-xs font-mono font-bold text-[#FDE68A]">
              <Zap className="w-3.5 h-3.5 text-[#E5B842]" />
              <span>APEX UNIFIED TELEMETRY • CODE & SOFT SKILLS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold  text-white tracking-tight">
              {user?.displayName || user?.username || 'Learner'}’s Command Center
            </h1>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Real-time multi-vector telemetry tracking your programming curriculum mastery, sandbox coding accuracy, and executive soft skills assessments.
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-4 bg-[#161B26] p-4 rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-[#9CA3AF]">Overall Skill Index</div>
              <div className="text-2xl font-extrabold font-mono text-white">{analytics.overallSkillScore}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total XP */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#121620] shadow-lg space-y-2 hover:border-[#E5B842]/40 transition-all group">
          <div className="flex items-center justify-between text-[#9CA3AF] text-xs">
            <span className="font-medium">Total Experience</span>
            <div className="w-8 h-8 rounded-lg bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
            {user?.totalXp || 0} XP
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#E5B842] font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Level {user?.level || 1} Pioneer</span>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#121620] shadow-lg space-y-2 hover:border-[#F59E0B]/50 transition-all group">
          <div className="flex items-center justify-between text-[#9CA3AF] text-xs">
            <span className="font-medium">Daily Streak</span>
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
              <Flame className="w-4 h-4 fill-[#F59E0B]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F59E0B] tracking-tight">
            {user?.currentStreak || 1} <span className="text-sm font-sans font-medium text-[#9CA3AF]">Days</span>
          </div>
          <div className="text-xs text-[#9CA3AF] font-mono">
            Max streak: <span className="text-[#FDE68A] font-semibold">{user?.maxStreak || 1} days</span>
          </div>
        </div>

        {/* Coding Accuracy */}
        <div className="p-5 rounded-2xl border border-white/10 bg-[#121620] shadow-lg space-y-2 hover:border-[#E5B842]/50 transition-all group">
          <div className="flex items-center justify-between text-[#9CA3AF] text-xs">
            <span className="font-medium">Coding Accuracy</span>
            <div className="w-8 h-8 rounded-lg bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
            {analytics.codingAccuracy}%
          </div>
          <div className="text-xs text-[#E5B842] font-mono">
            {analytics.totalChallengesSolved} Challenges Solved
          </div>
        </div>

        {/* Soft Skills Score */}
        <div className="p-5 rounded-2xl border border-[#E5B842]/40 bg-[#161B26] space-y-2 shadow-lg hover:border-[#E5B842] transition-all group">
          <div className="flex items-center justify-between text-[#FDE68A] text-xs">
            <span className="font-semibold">Soft Skills Progress</span>
            <div className="w-8 h-8 rounded-lg bg-[#E5B842]/20 border border-[#E5B842]/40 flex items-center justify-center text-[#E5B842]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
            {ps?.softSkillJourney.learningProgressPercent || 0}%
          </div>
          <div className="text-xs text-[#FDE68A] font-mono font-medium">
            {ps?.softSkillJourney.completedTopicsCount || 0} / {ps?.softSkillJourney.totalTopicsCount || 27} Topics Mastered
          </div>
        </div>
      </div>

      {/* 2 PRIMARY TRACKS MASTERY OVERVIEW (CODE & SOFT SKILLS) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E5B842]/15 text-[#E5B842] border border-[#E5B842]/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold  text-white">
                Core Paths Progress
              </h2>
              <p className="text-xs text-[#9CA3AF]">
                Real-time progress tracking across Code and Soft Skills.
              </p>
            </div>
          </div>

          <Link
            to="/home"
            onClick={playClick}
            className="text-xs font-semibold text-[#E5B842] hover:text-[#FDE68A] flex items-center gap-1"
          >
            <span>Change Path</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TRACK 1: CODE */}
          <div className="p-7 rounded-3xl border border-white/10 bg-[#121620] shadow-xl flex flex-col justify-between space-y-5 hover:border-[#E5B842]/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Code Track</h3>
                    <p className="text-[11px] font-mono text-[#E5B842]">Language: {ps?.codeJourney.activeLanguage.toUpperCase() || 'PYTHON'}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E5B842]/15 text-[#FDE68A] text-[10px] font-mono font-bold uppercase">
                  Active
                </span>
              </div>

              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                Step-by-step interactive theory, runnable exercises, quizzes, and 150 gamified challenge sectors.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                  to={`/code/learning/${ps?.codeJourney.activeLanguage || 'python'}`}
                  onClick={playClick}
                  className="p-3 rounded-2xl bg-[#161B26] border border-white/5 hover:border-[#E5B842]/40 transition-all space-y-1 block"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <BookOpen className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Learning</span>
                  </div>
                  <p className="text-[10px] text-[#9CA3AF] font-mono">5-Tab System</p>
                </Link>

                <Link
                  to={`/code/game/${ps?.codeJourney.activeLanguage || 'python'}/beginner`}
                  onClick={playClick}
                  className="p-3 rounded-2xl bg-[#161B26] border border-white/5 hover:border-[#E5B842]/40 transition-all space-y-1 block"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Gamepad2 className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Game Arena</span>
                  </div>
                  <p className="text-[10px] text-[#9CA3AF] font-mono">150 Sectors</p>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                to="/code"
                onClick={playClick}
                className="w-full py-2.5 rounded-xl btn-gold text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Launch Code Track</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TRACK 2: SOFT SKILLS */}
          <div className="p-7 rounded-3xl border border-white/10 bg-[#121620] shadow-xl flex flex-col justify-between space-y-5 hover:border-[#E5B842]/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Soft Skills Track</h3>
                    <p className="text-[11px] font-mono text-[#E5B842]">9 Core Disciplines</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E5B842]/15 text-[#FDE68A] text-[10px] font-mono font-bold uppercase">
                  Active
                </span>
              </div>

              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                Elevate communication, leadership, teamwork, problem solving, and critical thinking with practical workplace simulations and diagnostic tests.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                  to="/soft-skills/learning"
                  onClick={playClick}
                  className="p-3 rounded-2xl bg-[#161B26] border border-white/5 hover:border-[#E5B842]/40 transition-all space-y-1 block"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <BookOpen className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Learning</span>
                  </div>
                  <p className="text-[10px] text-[#9CA3AF] font-mono">9 Topics • 3 Levels</p>
                </Link>

                <Link
                  to="/soft-skills/testing"
                  onClick={playClick}
                  className="p-3 rounded-2xl bg-[#161B26] border border-white/5 hover:border-[#E5B842]/40 transition-all space-y-1 block"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Award className="w-3.5 h-3.5 text-[#E5B842]" />
                    <span>Testing</span>
                  </div>
                  <p className="text-[10px] text-[#9CA3AF] font-mono">10-Q Skill Exams</p>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                to="/soft-skills"
                onClick={playClick}
                className="w-full py-2.5 rounded-xl btn-gold text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Launch Soft Skills Track</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS: Multi-Vector Radar & Activity Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activity Area Chart */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Learning Activity & Accuracy</h3>
              <p className="text-xs text-[#9CA3AF]">7-day telemetry tracking XP and test consistency</p>
            </div>
            <span className="text-xs font-mono text-[#E5B842] font-semibold">Weekly</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5B842" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E5B842" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#161B26',
                    border: '1px solid rgba(229, 184, 66, 0.3)',
                    borderRadius: '0.75rem',
                    color: '#F5F5F7',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#E5B842"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#goldGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Multi-Vector Radar</h3>
            <p className="text-xs text-[#9CA3AF]">Coding & Soft Skills balance</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#242D40" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#CBD5E1', fontSize: 10 }} />
                <PolarRadiusAxis stroke="#64748B" tick={{ fill: '#64748B', fontSize: 9 }} />
                <Radar name="Score" dataKey="score" stroke="#E5B842" fill="#E5B842" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
