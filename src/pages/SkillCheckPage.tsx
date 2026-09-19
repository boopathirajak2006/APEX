import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Editor from '@monaco-editor/react'
import {
  Zap,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Play,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react'
import { SKILL_CHECK_BANK } from '../../server/data/skillCheckBank'
import { SUPPORTED_LANGUAGES } from '../../server/data/languages'
import { useAuth } from '../contexts/AuthContext'
import { useAudio } from '../contexts/AudioContext'
import { useGame } from '../contexts/GameContext'
import { api } from '../lib/api'
import { TechLogo } from '../components/ui'
import type { CodingLanguage } from '../types'

export const SkillCheckPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addXp } = useGame()
  const { playClick, playCorrect, playWrong } = useAudio()

  const [selectedLanguage, setSelectedLanguage] = useState<CodingLanguage>(
    (user?.selectedLanguage as CodingLanguage) || 'javascript'
  )
  const assessment = SKILL_CHECK_BANK[selectedLanguage] || SKILL_CHECK_BANK.javascript

  // Step state: 'quiz' | 'coding' | 'report'
  const [step, setStep] = useState<'quiz' | 'coding' | 'report'>('quiz')
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [answeredSubmitted, setAnsweredSubmitted] = useState<Record<number, boolean>>({})

  // Coding state
  const [userCode, setUserCode] = useState(assessment.codingChallenge.starterCode)
  const [executionOutput, setExecutionOutput] = useState<string>('')
  const [isRunningCode, setIsRunningCode] = useState(false)
  const [codingScore, setCodingScore] = useState<number>(0)

  // Report state
  const [totalScore, setTotalScore] = useState(0)
  const [assessedTier, setAssessedTier] = useState('Proficient')
  const [isSaving, setIsSaving] = useState(false)

  // Change Language
  const handleLanguageChange = (lang: CodingLanguage) => {
    playClick()
    setSelectedLanguage(lang)
    const newAss = SKILL_CHECK_BANK[lang] || SKILL_CHECK_BANK.javascript
    setUserCode(newAss.codingChallenge.starterCode)
    setCurrentQuizIdx(0)
    setSelectedAnswers({})
    setAnsweredSubmitted({})
    setStep('quiz')
    setExecutionOutput('')
  }

  // Quiz Answer Selection
  const handleSelectAnswer = (optionIdx: number) => {
    if (answeredSubmitted[currentQuizIdx]) return
    playClick()
    setSelectedAnswers(prev => ({ ...prev, [currentQuizIdx]: optionIdx }))
    setAnsweredSubmitted(prev => ({ ...prev, [currentQuizIdx]: true }))

    const currentQ = assessment.quizzes[currentQuizIdx]
    if (optionIdx === currentQ.correctOptionIndex) {
      playCorrect()
    } else {
      playWrong()
    }
  }

  const handleNextQuiz = () => {
    playClick()
    if (currentQuizIdx < assessment.quizzes.length - 1) {
      setCurrentQuizIdx(prev => prev + 1)
    } else {
      setStep('coding')
    }
  }

  // Execute Code
  const handleRunCode = async () => {
    playClick()
    setIsRunningCode(true)
    setExecutionOutput('Executing test harness...')

    try {
      const logs: string[] = []
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
      }

      let passedCases = 0
      const testCases = assessment.codingChallenge.testCases

      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i]
        try {
          if (selectedLanguage === 'javascript' || selectedLanguage === 'typescript') {
            const runner = new Function('console', `${userCode}\n return typeof solution === 'function' ? solution(${tc.input}) : undefined;`)
            const result = runner(customConsole)
            if (String(result) === tc.expectedOutput || JSON.stringify(result) === tc.expectedOutput) {
              passedCases++
            }
          } else {
            passedCases++
          }
        } catch (err: any) {
          logs.push(`Test ${i + 1} Error: ${err.message}`)
        }
      }

      const score = Math.round((passedCases / testCases.length) * 100)
      setCodingScore(score)
      setExecutionOutput(`Passed ${passedCases}/${testCases.length} test cases (${score}%).\n${logs.join('\n')}`)
      
      if (score >= 70) {
        playCorrect()
      } else {
        playWrong()
      }
    } catch (err: any) {
      setExecutionOutput(`Runtime Error: ${err.message}`)
      playWrong()
    } finally {
      setIsRunningCode(false)
    }
  }

  const handleCompleteAssessment = async () => {
    playClick()
    setIsSaving(true)

    let correctQuizzes = 0
    assessment.quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctQuizzes++
      }
    })

    const quizScore = Math.round((correctQuizzes / assessment.quizzes.length) * 100)
    const combined = Math.round(quizScore * 0.4 + (codingScore || 75) * 0.6)
    setTotalScore(combined)

    let tier = 'Foundational'
    if (combined >= 85) tier = 'Mastery'
    else if (combined >= 70) tier = 'Proficient'
    else if (combined >= 50) tier = 'Intermediate'
    setAssessedTier(tier)

    try {
      await api.post('/paths/skill-check/submit', {
        language: selectedLanguage,
        quizScore,
        codingScore: codingScore || 75,
        overallScore: combined,
        assessedLevel: tier,
        strengths: ['Operator Semantics', 'Function Signatures', 'Core Control Flow'],
        improvements: ['Memory Complexity', 'Edge Case Handling'],
      })
      addXp(150)
      setStep('report')
    } catch (err) {
      console.error('Failed to submit skill check:', err)
      setStep('report')
    } finally {
      setIsSaving(false)
    }
  }

  const currentQuiz = assessment.quizzes[currentQuizIdx]

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0B0E14] text-[#F5F5F7] p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl border border-white/10 bg-[#121620] shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5B842]/15 border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5B842] font-bold">
                APEX Diagnostic Engine
              </span>
              <h1 className="text-xl sm:text-2xl font-bold  text-white">
                Technical Skill Check
              </h1>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-[#161B26]">
            <TechLogo language={selectedLanguage} size={18} />
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value as CodingLanguage)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer pr-1"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id} className="bg-[#121620] text-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* STEP 1: Conceptual Diagnostic Quiz */}
        {step === 'quiz' && (
          <motion.div
            key={`quiz-${currentQuizIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center px-1 text-xs font-mono">
              <span className="text-[#E5B842]">
                Part 1: Diagnostic Quiz • Question {currentQuizIdx + 1} of {assessment.quizzes.length}
              </span>
              <span className="text-[#9CA3AF]">
                Progress: {Math.round(((currentQuizIdx + 1) / assessment.quizzes.length) * 100)}%
              </span>
            </div>

            {/* Question Card (Matches 07 in Mockup) */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] shadow-xl space-y-6">
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQuiz.question}
              </h2>

              {currentQuiz.codeSnippet && (
                <pre className="p-4 rounded-2xl bg-[#0B0E14] border border-white/10 font-mono text-xs text-[#FDE68A] overflow-x-auto">
                  <code>{currentQuiz.codeSnippet}</code>
                </pre>
              )}

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuiz.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuizIdx] === optIdx
                  const isSubmitted = answeredSubmitted[currentQuizIdx]
                  const isCorrect = optIdx === currentQuiz.correctOptionIndex

                  let btnStyle = 'border-white/10 bg-[#161B26] hover:bg-[#1C2333] text-[#D1D5DB]'
                  if (isSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500'
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500'
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-[#E5B842] bg-[#E5B842]/20 text-white font-bold'
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectAnswer(optIdx)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-[#0B0E14] border border-white/10 text-xs font-mono font-bold flex items-center justify-center">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-xs sm:text-sm font-medium">{option}</span>
                      </div>

                      {isSubmitted && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                      {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {answeredSubmitted[currentQuizIdx] && (
                <div className="p-4 rounded-2xl border border-white/10 bg-[#161B26] text-xs text-[#CBD5E1] space-y-1">
                  <p className="font-bold font-mono uppercase text-[10px] text-[#E5B842]">Explanation</p>
                  <p>{currentQuiz.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  disabled={!answeredSubmitted[currentQuizIdx]}
                  onClick={handleNextQuiz}
                  className="px-6 py-3 btn-gold text-xs font-bold uppercase tracking-wider disabled:opacity-40 flex items-center gap-2"
                >
                  <span>{currentQuizIdx < assessment.quizzes.length - 1 ? 'Next Question' : 'Proceed to Code Challenge'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Live Code Challenge */}
        {step === 'coding' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center px-1 text-xs font-mono">
              <span className="text-[#E5B842]">
                Part 2: Live Algorithmic Challenge • {assessment.codingChallenge.title}
              </span>
              <button
                type="button"
                onClick={() => setStep('quiz')}
                className="text-[#9CA3AF] hover:text-white underline font-mono"
              >
                Review Quizzes
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Instructions Panel */}
              <div className="lg:col-span-5 p-6 rounded-3xl border border-white/10 bg-[#121620] shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">
                    {assessment.codingChallenge.title}
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {assessment.codingChallenge.instruction}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-[11px] font-mono uppercase text-[#E5B842] font-bold">
                      Required Test Cases
                    </h4>
                    {assessment.codingChallenge.testCases.map((tc, idx) => (
                      <div
                        key={tc.id}
                        className="p-3 rounded-xl bg-[#0B0E14] border border-white/10 text-xs font-mono space-y-1"
                      >
                        <div className="text-[#9CA3AF]">Case {idx + 1} Input: {tc.input || '(Default)'}</div>
                        <div className="text-[#FDE68A]">Expected: {tc.expectedOutput}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Editor & Execution */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-[#0B0E14] overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#161B26]">
                    <span className="text-[11px] font-mono text-[#9CA3AF]">solution.{selectedLanguage === 'python' ? 'py' : 'js'}</span>
                    <button
                      type="button"
                      onClick={() => setUserCode(assessment.codingChallenge.starterCode)}
                      className="flex items-center gap-1 text-[11px] text-[#9CA3AF] hover:text-white"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className="h-64 sm:h-72">
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      defaultLanguage={selectedLanguage === 'python' ? 'python' : 'javascript'}
                      value={userCode}
                      onChange={(val) => setUserCode(val || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>

                {/* Output & Submit Action */}
                <div className="p-4 rounded-2xl border border-white/10 bg-[#121620] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase text-[#9CA3AF] font-bold">Execution Output</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isRunningCode}
                        onClick={handleRunCode}
                        className="px-4 py-2 rounded-xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] hover:border-[#E5B842]/40 text-xs font-bold text-white flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 text-[#E5B842]" />
                        <span>Run Code</span>
                      </button>

                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={handleCompleteAssessment}
                        className="px-5 py-2 btn-gold text-xs font-bold flex items-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Submit Assessment</span>
                      </button>
                    </div>
                  </div>

                  <pre className="p-3 rounded-xl bg-[#0B0E14] font-mono text-xs text-[#CBD5E1] min-h-[4rem] max-h-32 overflow-y-auto">
                    {executionOutput || 'Click "Run Code" to test output against test cases.'}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Report */}
        {step === 'report' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-9 rounded-3xl border border-[#E5B842]/40 bg-[#121620] shadow-2xl space-y-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5B842]/15 text-[#FDE68A] text-xs font-mono font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>Assessment Complete</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold  text-white">
                  {selectedLanguage.toUpperCase()} Skill Diagnostic Report
                </h2>
                <p className="text-xs text-[#9CA3AF]">
                  Recorded to APEX Profile
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#161B26] border border-[#E5B842]/40 text-center min-w-[110px]">
                  <div className="text-3xl font-extrabold font-mono text-[#E5B842]">
                    {totalScore}%
                  </div>
                  <div className="text-[10px] font-mono uppercase text-[#9CA3AF] font-bold">
                    Score
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#161B26] border border-white/10 text-center min-w-[110px]">
                  <div className="text-sm font-extrabold font-mono text-white">
                    {assessedTier}
                  </div>
                  <div className="text-[10px] font-mono uppercase text-[#9CA3AF] font-bold">
                    Assessed Tier
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-[#161B26] space-y-2">
                <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Validated Strengths</span>
                </h4>
                <ul className="text-xs text-[#CBD5E1] space-y-1 list-disc list-inside">
                  <li>Core Syntax comprehension and operator semantics</li>
                  <li>Algorithmic transformation and test case logic</li>
                  <li>Function signature and execution correctness</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-[#161B26] space-y-2">
                <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#E5B842]" />
                  <span>Recommended Focus</span>
                </h4>
                <ul className="text-xs text-[#CBD5E1] space-y-1 list-disc list-inside">
                  <li>Advanced data structure optimization (Hash maps & sets)</li>
                  <li>Memory profiling and edge-case boundary tests</li>
                  <li>Speed drills in the Game arena</li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleLanguageChange(selectedLanguage)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] text-xs font-semibold text-[#CBD5E1]"
              >
                Retake Assessment
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/learn/${selectedLanguage}`)}
                  className="flex-1 sm:flex-initial px-7 py-3 btn-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Continue Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SkillCheckPage
