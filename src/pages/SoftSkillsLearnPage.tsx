import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Sparkles,
  Check,
  X,
  Award,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Layers,
  Lightbulb,
  Users,
  CheckCircle2
} from 'lucide-react'
import { SoftSkillIcon } from '../components/ui/SoftSkillIcon'
import {
  SOFT_SKILLS_LIST,
  SOFT_SKILLS_MAP,
  ALL_SOFT_SKILL_TOPICS
} from '../data/softSkills/index'
import { useAudio } from '../contexts/AudioContext'
import { useGame } from '../contexts/GameContext'
import { api } from '../lib/api'
import type { SoftSkillId, SoftSkillMeta, SoftSkillTopic, SkillLevel } from '../types'

export const SoftSkillsLearnPage: React.FC = () => {
  const { skill: routeSkillId, topicId: routeTopicId } = useParams<{ skill?: SoftSkillId; topicId?: string }>()
  const navigate = useNavigate()
  const { awardXpNotification, triggerConfetti } = useGame()
  const { playClick, playCorrect, playWrong } = useAudio()

  // Selected Skill & Topic State
  const [selectedSkillId, setSelectedSkillId] = useState<SoftSkillId>(routeSkillId || 'communication')
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>('beginner')
  const [activeTopic, setActiveTopic] = useState<SoftSkillTopic | null>(null)

  // Progress State
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(new Set())

  // Active Topic UI State (Tabs: Lesson, Examples, Situations, Quiz)
  const [activeTab, setActiveTab] = useState<'lesson' | 'examples' | 'situations' | 'quiz'>('lesson')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false)
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number } | null>(null)

  const activeSkill: SoftSkillMeta = SOFT_SKILLS_MAP[selectedSkillId] || SOFT_SKILLS_LIST[0]

  // Fetch user completed topics
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get<{
          progress: { completedTopics: string[]; learningProgressPercent: number }
        }>('/paths/soft-skills/progress')
        if (res.progress?.completedTopics) {
          setCompletedTopicIds(new Set(res.progress.completedTopics))
        }
      } catch (e) {
        // Offline safe fallback
      }
    }
    fetchProgress()
  }, [])

  // Sync route params
  useEffect(() => {
    if (routeSkillId && SOFT_SKILLS_MAP[routeSkillId]) {
      setSelectedSkillId(routeSkillId)
    }
    if (routeTopicId) {
      const topic = ALL_SOFT_SKILL_TOPICS.find(t => t.id === routeTopicId)
      if (topic) {
        setActiveTopic(topic)
        setSelectedSkillId(topic.skillId)
        setSelectedLevel(topic.level)
      }
    }
  }, [routeSkillId, routeTopicId])

  // Filter topics for the active skill & level
  const levelTopics = activeSkill.topics.filter(t => t.level === selectedLevel)

  // Open a specific topic
  const handleOpenTopic = (topic: SoftSkillTopic) => {
    playClick()
    setActiveTopic(topic)
    setActiveTab('lesson')
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
    navigate(`/soft-skills/learning/${topic.skillId}/${topic.id}`, { replace: true })
  }

  // Handle quiz option selection
  const handleSelectQuizOption = (qId: string, optIdx: number) => {
    if (quizSubmitted) return
    playClick()
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }))
  }

  // Submit topic quiz
  const handleSubmitQuiz = async () => {
    if (!activeTopic) return
    playClick()

    let correctCount = 0
    activeTopic.quizzes.forEach(q => {
      if (quizAnswers[q.id] === q.correctOptionIndex) {
        correctCount++
      }
    })

    const total = activeTopic.quizzes.length
    const scorePct = Math.round((correctCount / total) * 100)
    setQuizSubmitted(true)
    setQuizScore({ correct: correctCount, total })

    const passed = scorePct >= 60

    if (passed) {
      playCorrect()
      triggerConfetti()
      awardXpNotification(activeTopic.xpReward, `Topic Mastered: ${activeTopic.title} (${scorePct}% Score)!`)
      setCompletedTopicIds(prev => new Set([...prev, activeTopic.id]))

      try {
        await api.post('/paths/soft-skills/complete-topic', {
          topicId: activeTopic.id,
          quizScore: scorePct
        })
      } catch (e) {}
    } else {
      playWrong()
    }
  }

  const totalTopicsCount = ALL_SOFT_SKILL_TOPICS.length
  const completedCount = completedTopicIds.size
  const overallPercent = Math.round((completedCount / (totalTopicsCount || 1)) * 100)

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0B0E14] text-[#F5F5F7] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        {/* Navigation Breadcrumb / Hero Top Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] shadow-xl relative overflow-hidden">
          <div className="flex items-start sm:items-center gap-5 flex-1 min-w-0">
            {/* Fixed Icon Area */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E5B842]/15 border border-[#E5B842]/30 flex-shrink-0 flex items-center justify-center text-[#E5B842] shadow-md">
              <SoftSkillIcon name={activeSkill.icon} className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5B842] font-bold">
                  Soft Skills Curriculum
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#161B26] border border-white/10 text-[#CBD5E1]">
                  {activeSkill.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {activeSkill.name} Mastery
              </h1>
              <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-2xl leading-relaxed">
                {activeSkill.description}
              </p>
            </div>
          </div>

          {/* Global Progress Card - Right aligned on desktop, stacks below on mobile */}
          <div className="w-full lg:w-auto flex-shrink-0 flex items-center gap-4 bg-[#161B26] px-5 py-3.5 rounded-2xl border border-white/10">
            <div>
              <div className="text-[10px] font-mono uppercase text-[#9CA3AF] font-bold">Global Progress</div>
              <div className="text-lg font-bold font-mono text-white">
                {completedCount} / {totalTopicsCount} <span className="text-xs text-[#E5B842]">({overallPercent}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Skills Horizontal Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-[#E5B842] tracking-wider">
              Select Skill Track:
            </span>
            <span className="text-xs text-[#9CA3AF] font-mono">
              9 Tracks Available
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-2.5">
            {SOFT_SKILLS_LIST.map(skill => {
              const isSelected = selectedSkillId === skill.id
              const skillCompleted = skill.topics.filter(t => completedTopicIds.has(t.id)).length
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => {
                    playClick()
                    setSelectedSkillId(skill.id)
                    setActiveTopic(null)
                    setSelectedLevel('beginner')
                    navigate(`/soft-skills/learning/${skill.id}`)
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 min-h-[125px] ${
                    isSelected
                      ? 'bg-[#E5B842]/20 border-[#E5B842] text-white shadow-lg ring-1 ring-[#E5B842]/50'
                      : 'bg-[#121620] border-white/10 text-[#CBD5E1] hover:bg-[#161B26] hover:border-white/20'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#161B26] border border-white/10 flex items-center justify-center text-[#E5B842] flex-shrink-0">
                    <SoftSkillIcon name={skill.icon} className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold leading-tight line-clamp-2 w-full text-center px-0.5">
                    {skill.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#9CA3AF]">
                    {skillCompleted}/{skill.topics.length} done
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Level Progression Tabs: Beginner -> Intermediate -> Advanced */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(level => {
            const isSel = selectedLevel === level
            return (
              <button
                key={level}
                type="button"
                onClick={() => {
                  playClick()
                  setSelectedLevel(level)
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition-all flex items-center gap-2 ${
                  isSel
                    ? 'btn-gold shadow-md'
                    : 'bg-[#121620] border border-white/10 text-[#CBD5E1] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{level} Level</span>
              </button>
            )
          })}
        </div>

        {/* Topics List or Active Topic Reader */}
        {!activeTopic ? (
          /* Level Topics Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levelTopics.map((topic, idx) => {
              const isCompleted = completedTopicIds.has(topic.id)
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  onClick={() => handleOpenTopic(topic)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group shadow-lg ${
                    isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-[#121620] border-white/10 hover:border-[#E5B842]/60 hover:bg-[#161B26]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#E5B842] px-2.5 py-1 rounded-full bg-[#E5B842]/10 border border-[#E5B842]/30">
                        {topic.level} • Module 0{idx + 1}
                      </span>
                      {isCompleted ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                          <Check className="w-4 h-4" />
                          <span>Mastered</span>
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-[#9CA3AF]">+{topic.xpReward} XP</span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold  text-white group-hover:text-[#FDE68A] transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-[#CBD5E1] mt-2 leading-relaxed">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1 text-xs text-[#9CA3AF]">
                      <div>• {topic.examples.length} Practical Case Studies</div>
                      <div>• {topic.practicalSituations.length} Workplace Scenarios</div>
                      <div>• {topic.quizzes.length} Knowledge Check Questions</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#E5B842] group-hover:translate-x-1 transition-transform">
                    <span>{isCompleted ? 'Review Topic' : 'Launch Topic'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          /* ACTIVE TOPIC READER (4 TABS) */
          <div className="space-y-6">
            {/* Topic Back & Title Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#121620] border border-white/10">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTopic(null)}
                  className="p-2 rounded-xl bg-[#161B26] border border-white/10 text-[#CBD5E1] hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] font-mono text-[#E5B842] uppercase font-bold">
                    {activeSkill.name} • {activeTopic.level} Level
                  </span>
                  <h2 className="text-xl font-bold text-white ">
                    {activeTopic.title}
                  </h2>
                </div>
              </div>

              {/* Topic Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => { playClick(); setActiveTab('lesson') }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'lesson' ? 'btn-gold' : 'bg-[#161B26] text-[#CBD5E1] border border-white/10 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>1. Lesson</span>
                </button>
                <button
                  type="button"
                  onClick={() => { playClick(); setActiveTab('examples') }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'examples' ? 'btn-gold' : 'bg-[#161B26] text-[#CBD5E1] border border-white/10 hover:text-white'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>2. Examples</span>
                </button>
                <button
                  type="button"
                  onClick={() => { playClick(); setActiveTab('situations') }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'situations' ? 'btn-gold' : 'bg-[#161B26] text-[#CBD5E1] border border-white/10 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>3. Workplace Scenarios</span>
                </button>
                <button
                  type="button"
                  onClick={() => { playClick(); setActiveTab('quiz') }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'quiz' ? 'btn-gold' : 'bg-[#161B26] text-[#CBD5E1] border border-white/10 hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>4. Quiz ({activeTopic.quizzes.length}Q)</span>
                </button>
              </div>
            </div>

            {/* Source Traceability Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-[#161B26] border border-white/10 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <BookOpen className="w-3.5 h-3.5 text-[#E5B842] flex-shrink-0" />
                <span className="text-[#9CA3AF]">Source Material:</span>
                <span className="text-[#E5B842] font-semibold truncate">
                  {activeTopic.sourceMetadata?.sourceFile || activeSkill.sourceMetadata?.sourceFile}
                </span>
                {activeTopic.sourceMetadata?.sourceSection && (
                  <>
                    <span className="text-white/30 hidden sm:inline">•</span>
                    <span className="text-[#CBD5E1] hidden sm:inline truncate max-w-sm">
                      {activeTopic.sourceMetadata.sourceSection}
                    </span>
                  </>
                )}
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] bg-[#E5B842]/10 border border-[#E5B842]/30 text-[#E5B842] font-semibold flex-shrink-0">
                100% Source-Grounded
              </span>
            </div>

            {/* TAB 1: LESSON THEORY & IMPORTANT POINTS */}
            {activeTab === 'lesson' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-7 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] space-y-6">
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#CBD5E1] leading-relaxed space-y-4 whitespace-pre-line ">
                    {activeTopic.explanation}
                  </div>

                  {/* Important Points Banner */}
                  <div className="p-5 rounded-2xl border border-[#E5B842]/30 bg-[#E5B842]/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#FDE68A]">
                      <Sparkles className="w-4 h-4 text-[#E5B842]" />
                      <span>Key Rules & Important Takeaways:</span>
                    </div>
                    <ul className="space-y-2">
                      {activeTopic.importantPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs text-[#E5E7EB]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B842] flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => { playClick(); setActiveTab('examples') }}
                      className="px-6 py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>Continue to Examples</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EXAMPLES */}
            {activeTab === 'examples' && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeTopic.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="p-6 rounded-3xl border border-white/10 bg-[#121620] space-y-4 shadow-lg flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B842]/15 border border-[#E5B842]/30 text-[10px] font-mono font-bold text-[#FDE68A] uppercase">
                          <Lightbulb className="w-3.5 h-3.5 text-[#E5B842]" />
                          <span>Case Study 0{exIdx + 1}</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{ex.title}</h3>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed bg-[#161B26] p-4 rounded-2xl border border-white/5">
                          "{ex.scenario}"
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 text-xs font-medium">
                        <span className="font-bold font-mono">Key Takeaway: </span>
                        {ex.takeaway}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => { playClick(); setActiveTab('lesson') }}
                    className="px-5 py-2.5 rounded-xl border border-white/10 bg-[#161B26] text-xs font-semibold text-[#CBD5E1] hover:text-white"
                  >
                    Back to Lesson
                  </button>
                  <button
                    type="button"
                    onClick={() => { playClick(); setActiveTab('situations') }}
                    className="px-6 py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Explore Workplace Scenarios</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: WORKPLACE SCENARIOS */}
            {activeTab === 'situations' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-4">
                  {activeTopic.practicalSituations.map((sit, sIdx) => (
                    <div key={sIdx} className="p-6 rounded-3xl border border-white/10 bg-[#121620] space-y-4 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#E5B842]" />
                        <span className="text-xs font-mono uppercase text-[#E5B842] font-bold">
                          Practical Workplace Situation 0{sIdx + 1}
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#161B26] border border-white/5 text-xs sm:text-sm text-white font-medium leading-relaxed">
                        <span className="text-[#9CA3AF] block text-[10px] font-mono uppercase mb-1">Situation:</span>
                        {sit.situation}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-4 rounded-2xl border border-[#E5B842]/30 bg-[#E5B842]/10 space-y-1">
                          <span className="font-bold text-[#FDE68A] font-mono uppercase text-[10px] block">
                            Recommended Action:
                          </span>
                          <p className="text-[#E5E7EB] leading-relaxed">{sit.recommendedAction}</p>
                        </div>
                        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-1">
                          <span className="font-bold text-emerald-400 font-mono uppercase text-[10px] block">
                            Why It Works:
                          </span>
                          <p className="text-[#CBD5E1] leading-relaxed">{sit.whyItWorks}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => { playClick(); setActiveTab('examples') }}
                    className="px-5 py-2.5 rounded-xl border border-white/10 bg-[#161B26] text-xs font-semibold text-[#CBD5E1] hover:text-white"
                  >
                    Back to Examples
                  </button>
                  <button
                    type="button"
                    onClick={() => { playClick(); setActiveTab('quiz') }}
                    className="px-6 py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Take Knowledge Check Quiz ({activeTopic.quizzes.length}Q)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: TOPIC QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-xl font-bold  text-white">
                        {activeTopic.title} Knowledge Check
                      </h3>
                      <p className="text-xs text-[#CBD5E1] mt-1">
                        Answer all {activeTopic.quizzes.length} scenario questions to verify topic mastery.
                      </p>
                    </div>
                    {quizScore && (
                      <div className="text-right">
                        <span className="text-xs font-mono uppercase text-[#9CA3AF]">Score</span>
                        <div className="text-2xl font-bold font-mono text-[#E5B842]">
                          {quizScore.correct} / {quizScore.total}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Questions List */}
                  <div className="space-y-6">
                    {activeTopic.quizzes.map((q, qIdx) => {
                      const selectedOpt = quizAnswers[q.id]
                      const isCorrect = selectedOpt === q.correctOptionIndex
                      return (
                        <div key={q.id} className="p-5 rounded-2xl bg-[#161B26] border border-white/5 space-y-3">
                          <div className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-[#E5B842]/15 text-[#E5B842] border border-[#E5B842]/30 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
                              0{qIdx + 1}
                            </span>
                            <h4 className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                              {q.question}
                            </h4>
                          </div>

                          {/* Options */}
                          <div className="grid grid-cols-1 gap-2 pt-2">
                            {q.options.map((opt, optIdx) => {
                              const isOptionSelected = selectedOpt === optIdx
                              let optionStyle = 'bg-[#121620] border-white/10 text-[#CBD5E1] hover:bg-[#1C2333]'

                              if (quizSubmitted) {
                                if (optIdx === q.correctOptionIndex) {
                                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                                } else if (isOptionSelected && !isCorrect) {
                                  optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-300'
                                }
                              } else if (isOptionSelected) {
                                optionStyle = 'bg-[#E5B842]/20 border-[#E5B842] text-white font-bold'
                              }

                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  disabled={quizSubmitted}
                                  onClick={() => handleSelectQuizOption(q.id, optIdx)}
                                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                                >
                                  <span>{opt}</span>
                                  {quizSubmitted && optIdx === q.correctOptionIndex && (
                                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                  )}
                                  {quizSubmitted && isOptionSelected && !isCorrect && (
                                    <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                                  )}
                                </button>
                              )
                            })}
                          </div>

                          {/* Explanation if submitted */}
                          {quizSubmitted && (
                            <div className="p-3.5 rounded-xl bg-[#121620] border border-white/10 text-xs text-[#CBD5E1] font-mono leading-relaxed mt-2">
                              <span className="font-bold text-[#E5B842]">Explanation: </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => { playClick(); setActiveTab('situations') }}
                      className="px-5 py-2.5 rounded-xl border border-white/10 bg-[#161B26] text-xs font-semibold text-[#CBD5E1] hover:text-white"
                    >
                      Back to Scenarios
                    </button>

                    {!quizSubmitted ? (
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(quizAnswers).length < activeTopic.quizzes.length}
                        className={`px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                          Object.keys(quizAnswers).length === activeTopic.quizzes.length
                            ? 'btn-gold shadow-lg cursor-pointer'
                            : 'bg-[#161B26] text-[#9CA3AF] border border-white/10 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit Knowledge Check</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          playClick()
                          setActiveTopic(null)
                        }}
                        className="px-7 py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                      >
                        <span>Return to Curriculum Map</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SoftSkillsLearnPage
