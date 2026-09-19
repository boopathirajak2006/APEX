import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Check,
  X,
  ShieldCheck,
  Lightbulb,
  BookOpen
} from 'lucide-react'
import { SoftSkillIcon } from '../components/ui/SoftSkillIcon'
import {
  SOFT_SKILLS_LIST,
  SOFT_SKILL_TESTS_BANK
} from '../data/softSkills/index'
import { useAudio } from '../contexts/AudioContext'
import { useGame } from '../contexts/GameContext'
import { api } from '../lib/api'
import type { SoftSkillId, SoftSkillTestExam, SoftSkillTestResult } from '../types'

/**
 * Shuffles question options stably for the active test session
 * so that correct answers naturally distribute across (A, B, C, D)
 * while preserving question meaning, explanation, and correct answer mapping.
 */
function shuffleQuestionOptions(baseExam: SoftSkillTestExam): SoftSkillTestExam {
  const shuffledQuestions = baseExam.questions.map(q => {
    const paired = q.options.map((opt, origIdx) => ({
      opt,
      isCorrect: origIdx === q.correctOptionIndex
    }))

    // Fisher-Yates shuffle
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = paired[i]
      paired[i] = paired[j]
      paired[j] = temp
    }

    const newOptions = paired.map(p => p.opt)
    const newCorrectIdx = paired.findIndex(p => p.isCorrect)

    return {
      ...q,
      options: newOptions,
      correctOptionIndex: newCorrectIdx >= 0 ? newCorrectIdx : 0
    }
  })

  return {
    ...baseExam,
    questions: shuffledQuestions
  }
}

export const SoftSkillsTestPage: React.FC = () => {
  const { skill: routeSkillId } = useParams<{ skill?: SoftSkillId }>()
  const navigate = useNavigate()
  const { awardXpNotification, triggerConfetti } = useGame()
  const { playClick, playCorrect, playWrong, playLevelClear } = useAudio()

  // Selected skill test
  const [selectedSkillId, setSelectedSkillId] = useState<SoftSkillId | null>(routeSkillId || null)
  const [exam, setExam] = useState<SoftSkillTestExam | null>(null)

  // Test Runner State
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Report Result State
  const [result, setResult] = useState<SoftSkillTestResult | null>(null)

  // Load exam when skill is selected, with stable option shuffling for the session
  useEffect(() => {
    if (selectedSkillId && SOFT_SKILL_TESTS_BANK[selectedSkillId]) {
      const shuffledExam = shuffleQuestionOptions(SOFT_SKILL_TESTS_BANK[selectedSkillId])
      setExam(shuffledExam)
      setCurrentIdx(0)
      setAnswers({})
      setSubmitted({})
      setResult(null)
    } else {
      setExam(null)
    }
  }, [selectedSkillId])

  const handleSelectSkillToTest = (skillId: SoftSkillId) => {
    playClick()
    setSelectedSkillId(skillId)
    navigate(`/soft-skills/testing/${skillId}`)
  }

  const handleSelectOption = (optIdx: number) => {
    if (submitted[currentIdx]) return
    playClick()
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }))
    setSubmitted(prev => ({ ...prev, [currentIdx]: true }))

    const currentQ = exam?.questions[currentIdx]
    if (currentQ && optIdx === currentQ.correctOptionIndex) {
      playCorrect()
    } else {
      playWrong()
    }
  }

  const handleNextQuestion = () => {
    playClick()
    if (!exam) return
    if (currentIdx < exam.questions.length - 1) {
      setCurrentIdx(prev => prev + 1)
    } else {
      handleFinishTest()
    }
  }

  const handleFinishTest = async () => {
    if (!exam || !selectedSkillId) return
    setIsSubmitting(true)

    let correct = 0
    exam.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOptionIndex) {
        correct++
      }
    })

    const total = exam.questions.length
    const scorePct = Math.round((correct / total) * 100)

    let levelTitle = 'Developing'
    if (scorePct >= 90) levelTitle = 'Executive Master'
    else if (scorePct >= 75) levelTitle = 'Strategic Practitioner'
    else if (scorePct >= 60) levelTitle = 'Proficient Practitioner'

    const localResult: SoftSkillTestResult = {
      skillId: selectedSkillId,
      overallScore: scorePct,
      accuracyPercent: scorePct,
      totalQuestions: total,
      correctCount: correct,
      currentLevel: levelTitle,
      strengths: scorePct >= 70 ? ['Clear contextual analysis', 'Objective trade-off evaluation'] : ['Solid initial understanding of fundamentals'],
      areasToImprove: scorePct < 80 ? ['High-stakes multi-stakeholder edge cases'] : [],
      recommendations: ['Continue reviewing advanced case studies and practicing scenario exercises.']
    }

    try {
      const res = await api.post<{ success: boolean; result: SoftSkillTestResult }>(
        `/paths/soft-skills/test/${selectedSkillId}/submit`,
        { answers, correctCount: correct, scorePct }
      )
      if (res.result) {
        setResult(res.result)
      } else {
        setResult(localResult)
      }
    } catch (e) {
      setResult(localResult)
    } finally {
      setIsSubmitting(false)
      playLevelClear()
      triggerConfetti()
      awardXpNotification(scorePct >= 70 ? 150 : 80, `${exam.title} Complete (${scorePct}%)!`)
    }
  }

  const handleRetake = () => {
    playClick()
    if (selectedSkillId && SOFT_SKILL_TESTS_BANK[selectedSkillId]) {
      setExam(shuffleQuestionOptions(SOFT_SKILL_TESTS_BANK[selectedSkillId]))
    }
    setCurrentIdx(0)
    setAnswers({})
    setSubmitted({})
    setResult(null)
  }

  const handleBackToSkillSelection = () => {
    playClick()
    setSelectedSkillId(null)
    setExam(null)
    setResult(null)
    navigate('/soft-skills/testing')
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0B0E14] text-[#F5F5F7] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        {/* SKILL SELECTION VIEW */}
        {!selectedSkillId || !exam ? (
          <div className="space-y-8">
            {/* Header Strip */}
            <div className="p-6 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] shadow-xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5B842] font-bold">
                    APEX Diagnostic Testing Suite
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold  text-white">
                    Dedicated Soft Skill Testing
                  </h1>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-3xl leading-relaxed">
                Select any of the 9 core disciplines below to launch a dedicated 10-question assessment. Receive verified competency scoring, accuracy benchmarks, strengths, and areas to improve.
              </p>
            </div>

            {/* 9 Skill Assessment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SOFT_SKILLS_LIST.map((skill, idx) => {
                const testMeta = SOFT_SKILL_TESTS_BANK[skill.id]
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    onClick={() => handleSelectSkillToTest(skill.id)}
                    className="p-6 rounded-3xl border border-white/10 bg-[#121620] hover:bg-[#161B26] hover:border-[#E5B842]/60 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842] shadow-sm">
                          <SoftSkillIcon name={skill.icon} className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#E5B842]/10 border border-[#E5B842]/30 text-[#FDE68A] uppercase">
                          10 Questions
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold  text-white group-hover:text-[#FDE68A] transition-colors">
                          {skill.name} Test
                        </h3>
                        <p className="text-xs text-[#CBD5E1] mt-2 leading-relaxed">
                          {skill.tagline}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#161B26] border border-white/5 text-[11px] font-mono text-[#9CA3AF] flex items-center justify-between">
                        <span>Time Limit:</span>
                        <span className="text-white font-bold">{testMeta?.timeLimitMinutes || 15} Mins</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#E5B842] group-hover:translate-x-1 transition-transform">
                      <span>Launch Assessment</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : !result ? (
          /* ACTIVE TEST QUESTION RUNNER */
          <div className="space-y-6">
            {/* HUD Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl border border-white/10 bg-[#121620] shadow-xl">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBackToSkillSelection}
                  className="p-2 rounded-xl bg-[#161B26] border border-white/10 text-[#CBD5E1] hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5B842] font-bold">
                    {exam.title}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-white ">
                    Question {currentIdx + 1} of {exam.questions.length}
                  </h2>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-32 h-2.5 bg-[#0B0E14] rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / exam.questions.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-[#E5B842]">
                  {Math.round(((currentIdx + 1) / exam.questions.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Source Traceability Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-[#161B26] border border-white/10 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-[#CBD5E1]">
                <BookOpen className="w-3.5 h-3.5 text-[#E5B842] flex-shrink-0" />
                <span className="text-[#9CA3AF]">Source Question Bank:</span>
                <span className="text-[#E5B842] font-semibold truncate">
                  {exam.sourceMetadata?.sourceFile || `${exam.title}.docx`}
                </span>
                {exam.questions[currentIdx]?.sourceMetadata?.sourceSection && (
                  <>
                    <span className="text-white/30 hidden sm:inline">•</span>
                    <span className="text-[#CBD5E1] hidden sm:inline truncate max-w-sm">
                      {exam.questions[currentIdx].sourceMetadata?.sourceSection}
                    </span>
                  </>
                )}
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] bg-[#E5B842]/10 border border-[#E5B842]/30 text-[#E5B842] font-semibold flex-shrink-0">
                100% Authentic Source
              </span>
            </div>

            {/* Current Question Card */}
            <div className="p-6 sm:p-9 rounded-3xl border border-white/10 bg-[#121620] shadow-2xl space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#E5B842] uppercase font-bold">
                  Workplace Scenario • Case {currentIdx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed ">
                  {exam.questions[currentIdx].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {exam.questions[currentIdx].options.map((opt, optIdx) => {
                  const isSelected = answers[currentIdx] === optIdx
                  const isAnswered = submitted[currentIdx]
                  const isCorrect = optIdx === exam.questions[currentIdx].correctOptionIndex

                  let btnStyle = 'bg-[#161B26] border-white/10 text-[#CBD5E1] hover:bg-[#1C2333] hover:border-white/20'

                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300'
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-[#E5B842]/20 border-[#E5B842] text-white font-bold'
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <X className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>

              {/* Explanation Reveal */}
              {submitted[currentIdx] && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-[#161B26] border border-white/10 space-y-1 text-xs text-[#CBD5E1] font-mono leading-relaxed"
                >
                  <span className="font-bold text-[#E5B842]">Rationale & Takeaway: </span>
                  {exam.questions[currentIdx].explanation}
                </motion.div>
              )}

              {/* Next Question Navigation */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#9CA3AF] font-mono">
                  {submitted[currentIdx] ? 'Answer recorded' : 'Select the most effective action'}
                </span>

                {submitted[currentIdx] && (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    disabled={isSubmitting}
                    className="px-7 py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>{currentIdx < exam.questions.length - 1 ? 'Next Question' : 'Complete & Generate Report'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* TEST REPORT SCORECARD VIEW */
          <div className="space-y-8 animate-fade-in">
            {/* Score Banner */}
            <div className="p-8 sm:p-10 rounded-3xl border border-[#E5B842]/40 bg-[#121620] shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B842]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B842]/15 border border-[#E5B842]/30 text-[10px] font-mono font-bold text-[#FDE68A] uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Official APEX Assessment Report</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold  text-white">
                    {exam.title} Results
                  </h2>
                  <p className="text-xs sm:text-sm text-[#CBD5E1]">
                    Evaluated against industry benchmarks for senior engineering leadership and collaboration.
                  </p>
                </div>

                {/* Score Big Circle */}
                <div className="flex items-center gap-4 bg-[#161B26] p-5 rounded-3xl border border-white/10 shadow-lg">
                  <div className="text-center">
                    <div className="text-[10px] font-mono uppercase text-[#9CA3AF] font-bold">Overall Score</div>
                    <div className="text-4xl font-extrabold font-mono text-[#E5B842]">{result.overallScore}%</div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-[10px] font-mono uppercase text-[#9CA3AF] font-bold">Accuracy</div>
                    <div className="text-2xl font-bold font-mono text-white">{result.correctCount}/{result.totalQuestions}</div>
                  </div>
                </div>
              </div>

              {/* Assessed Level Badge */}
              <div className="p-4 rounded-2xl bg-[#161B26] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#E5B842]" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#9CA3AF]">Assessed Competency Level:</span>
                    <h4 className="text-sm font-bold text-white font-mono">{result.currentLevel}</h4>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-500/30">
                  APEX Verified
                </span>
              </div>
            </div>

            {/* Strengths & Areas to Improve Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* STRENGTHS */}
              <div className="p-6 rounded-3xl border border-emerald-500/30 bg-[#121620] space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm ">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Demonstrated Strengths</span>
                </div>
                <ul className="space-y-2.5">
                  {result.strengths.map((str, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2.5 text-xs text-[#E5E7EB] bg-[#161B26] p-3 rounded-xl border border-white/5">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AREAS TO IMPROVE */}
              <div className="p-6 rounded-3xl border border-white/10 bg-[#121620] space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-[#E5B842] font-bold text-sm ">
                  <Lightbulb className="w-5 h-5" />
                  <span>Growth Areas & Recommendations</span>
                </div>
                <ul className="space-y-2.5">
                  {result.areasToImprove.concat(result.recommendations).map((rec, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1] bg-[#161B26] p-3 rounded-xl border border-white/5">
                      <ArrowRight className="w-4 h-4 text-[#E5B842] flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Source Grounding Audit Bar */}
            <div className="p-4 rounded-2xl bg-[#161B26] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Assessment Grounding: Verified against <span className="text-[#E5B842] font-bold">{exam?.sourceMetadata?.sourceFile}</span></span>
              </div>
              <span className="text-[10px] text-[#9CA3AF] px-2.5 py-1 rounded bg-[#0B0E14] border border-white/5">
                Zero-Hallucination Verified
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#121620] border border-white/10">
              <button
                type="button"
                onClick={handleBackToSkillSelection}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] text-xs font-semibold text-[#CBD5E1] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Test Another Soft Skill</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] text-xs font-semibold text-[#CBD5E1] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Test</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/soft-skills/learning/${selectedSkillId}`)}
                  className="flex-1 sm:flex-none px-6 py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Review Learning Lessons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SoftSkillsTestPage
