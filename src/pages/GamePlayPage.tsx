import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  HelpCircle,
  Code2,
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Award
} from 'lucide-react'
import type { CodingLanguage, DifficultyLevel, GameLevel } from '../types'
import { api } from '../lib/api'
import { useAudio } from '../contexts/AudioContext'
import { useGame } from '../contexts/GameContext'
import { MonacoCodeEditor } from '../components/editor/MonacoCodeEditor'

export const GamePlayPage: React.FC = () => {
  const { language = 'python', difficulty = 'beginner', levelId = '1' } = useParams<{
    language: CodingLanguage
    difficulty: DifficultyLevel
    levelId: string
  }>()
  const navigate = useNavigate()
  const { playClick, playCorrect, playWrong, playLevelClear } = useAudio()
  const { awardXpNotification, triggerConfetti } = useGame()

  const [level, setLevel] = useState<GameLevel | null>(null)
  const [activePhase, setActivePhase] = useState<'quizzes' | 'challenge'>('quizzes')
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false)
  const [isExecutingCode, setIsExecutingCode] = useState<boolean>(false)
  const [levelResult, setLevelResult] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    setLevelResult(null)
    setActivePhase('quizzes')
    setCurrentQuizIdx(0)
    setQuizAnswers({})
    setQuizAnswered(false)

    api.get<{ level: GameLevel }>(`/game/level/${language}/${difficulty}/${levelId}`)
      .then(res => {
        setLevel(res.level)
      })
      .catch(err => console.error('Failed to load level:', err))
      .finally(() => setIsLoading(false))
  }, [language, difficulty, levelId])

  const handleSelectQuizAnswer = (questionId: string, optionIdx: number) => {
    if (quizAnswered) return
    playClick()
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }))
    setQuizAnswered(true)

    const q = level?.quizzes[currentQuizIdx]
    if (q && optionIdx === q.correctOptionIndex) {
      playCorrect()
    } else {
      playWrong()
    }
  }

  const handleNextQuiz = () => {
    playClick()
    if (currentQuizIdx < 2) {
      setCurrentQuizIdx(prev => prev + 1)
      setQuizAnswered(false)
    } else {
      setActivePhase('challenge')
    }
  }

  const handleRunChallenge = async (code: string) => {
    if (!level) return null
    setIsExecutingCode(true)

    try {
      const res = await api.post('/game/submit-level', {
        language,
        difficulty,
        levelNumber: level.levelNumber,
        quizAnswers,
        code,
        timeTakenSeconds: 30
      })

      if (res.levelCompleted) {
        setLevelResult(res)
        playLevelClear()
        triggerConfetti()
        awardXpNotification(res.xpEarned, `Sector ${level.levelNumber} Conquered!`)
      }

      return res.codeExecution
    } catch (err) {
      console.error('Submission failed:', err)
      return null
    } finally {
      setIsExecutingCode(false)
    }
  }

  if (isLoading || !level) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-[#9CA3AF]">
        <div className="w-10 h-10 border-2 border-[#E5B842]/30 border-t-[#E5B842] rounded-full animate-spin" />
        <p className="text-xs font-mono">Initializing Sector Arena...</p>
      </div>
    )
  }

  const currentQ = level.quizzes[currentQuizIdx]

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl border border-white/10 bg-[#121620] shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            to={`/game/${language}/${difficulty}`}
            onClick={playClick}
            className="p-2.5 rounded-xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] text-[#9CA3AF] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold  text-white">
                Sector {level.levelNumber}
              </h1>
              {level.isBoss && (
                <span className="px-2 py-0.5 rounded-full bg-[#E5B842] text-[9px] font-mono font-bold text-black uppercase tracking-wider">
                  BOSS
                </span>
              )}
            </div>
            <p className="text-xs text-[#9CA3AF] font-mono capitalize">
              {language.toUpperCase()} • {difficulty} Arena
            </p>
          </div>
        </div>

        {/* Phase Pill Indicator */}
        <div className="flex items-center gap-1.5 bg-[#0B0E14] p-1.5 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => { playClick(); setActivePhase('quizzes') }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activePhase === 'quizzes'
                ? 'bg-[#E5B842] text-[#0B0E14] font-bold shadow-md'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Trial Quiz ({currentQuizIdx + 1}/3)</span>
          </button>

          <button
            type="button"
            onClick={() => { playClick(); setActivePhase('challenge') }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activePhase === 'challenge'
                ? 'bg-[#E5B842] text-[#0B0E14] font-bold shadow-md'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Sandbox</span>
          </button>
        </div>
      </div>

      {/* PHASE 1: Quizzes */}
      {activePhase === 'quizzes' && (
        <motion.div
          key={`quiz-${currentQuizIdx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#E5B842]">
            <span>Trial Quiz {currentQuizIdx + 1} of 3</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full ${
                    idx < currentQuizIdx
                      ? 'bg-emerald-400'
                      : idx === currentQuizIdx
                      ? 'bg-[#E5B842]'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = quizAnswers[currentQ.id] === optIdx
              let btnClass = 'bg-[#161B26] border-white/10 text-[#D1D5DB] hover:bg-[#1C2333] hover:text-white'

              if (quizAnswered) {
                if (optIdx === currentQ.correctOptionIndex) {
                  btnClass = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold'
                } else if (isSelected) {
                  btnClass = 'bg-rose-950/50 border-rose-500 text-rose-300'
                }
              } else if (isSelected) {
                btnClass = 'bg-[#E5B842]/20 border-[#E5B842] text-white font-bold'
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={quizAnswered}
                  onClick={() => handleSelectQuizAnswer(currentQ.id, optIdx)}
                  className={`p-4 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#0B0E14] border border-white/10 text-xs font-mono font-bold flex items-center justify-center">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {quizAnswered && optIdx === currentQ.correctOptionIndex && (
                    <Check className="w-4 h-4 text-emerald-400" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              disabled={!quizAnswered}
              onClick={handleNextQuiz}
              className="px-6 py-3 btn-gold text-xs font-bold uppercase tracking-wider disabled:opacity-40 flex items-center gap-2"
            >
              <span>{currentQuizIdx < 2 ? 'Next Trial' : 'Proceed to Code Sandbox'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* PHASE 2: Code Challenge */}
      {activePhase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-4 sm:p-5 rounded-2xl border border-[#E5B842]/30 bg-[#E5B842]/10 text-xs text-[#FDE68A]">
            <span className="font-bold uppercase tracking-wider block mb-1 text-white font-mono">
              Sector Challenge:
            </span>
            {level.challenge?.instruction || ''}
          </div>

          <MonacoCodeEditor
            language={language}
            initialCode={level.challenge?.starterCode || ''}
            testCases={level.challenge?.testCases || []}
            onRun={handleRunChallenge}
            isExecuting={isExecutingCode}
            height="340px"
          />
        </motion.div>
      )}

      {/* LEVEL RESULT VICTORY MODAL */}
      {levelResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#121620] border border-[#E5B842]/50 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#E5B842]/15 border-2 border-[#E5B842] flex items-center justify-center text-[#E5B842] shadow-[0_0_30px_rgba(229,184,66,0.3)]">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold  text-white">
                Sector Conquered!
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF]">
                You completed Sector {level.levelNumber} with {levelResult.stars} Stars!
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1.5 py-1">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-6 h-6 ${
                      levelResult.stars >= starIdx ? 'fill-[#E5B842] text-[#E5B842]' : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5B842]/20 text-[#FDE68A] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+{levelResult.xpEarned || 50} XP Awarded</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  playClick()
                  navigate(`/game/${language}/${difficulty}/${parseInt(levelId) + 1}`)
                }}
                className="flex-1 py-3 btn-gold text-xs font-bold uppercase tracking-wider"
              >
                Next Sector
              </button>

              <button
                type="button"
                onClick={() => {
                  playClick()
                  navigate(`/game/${language}/${difficulty}`)
                }}
                className="flex-1 py-3 rounded-xl border border-white/10 bg-[#161B26] text-xs font-bold text-white hover:bg-[#1C2333]"
              >
                Sector Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePlayPage
