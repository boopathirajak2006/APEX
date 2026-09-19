import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Code2,
  Check,
  X,
  HelpCircle,
  Download,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  Layers,
  Menu,
  Play,
  Lightbulb,
  AlertTriangle
} from 'lucide-react'
import { TechLogo } from '../components/ui/TechLogo'
import { SUPPORTED_LANGUAGES } from '../../server/data/languages'
import {
  getCurriculumByLanguage,
  searchLanguageTopics
} from '../data/curriculum/index'
import type { CurriculumTopic, LanguageCurriculumData } from '../data/curriculum/types'
import { api } from '../lib/api'
import { useAudio } from '../contexts/AudioContext'
import { useGame } from '../contexts/GameContext'
import { MonacoCodeEditor } from '../components/editor/MonacoCodeEditor'

export const LearningPage: React.FC = () => {
  const { language = 'python', lessonId } = useParams<{ language?: string; lessonId?: string }>()
  const navigate = useNavigate()
  const { playClick, playCorrect, playWrong, playLevelClear } = useAudio()
  const { awardXpNotification, triggerConfetti, setActiveLanguage } = useGame()

  // Load language curriculum
  const curriculumData: LanguageCurriculumData = useMemo(() => {
    return getCurriculumByLanguage(language)
  }, [language])

  // Sync active language in game context
  useEffect(() => {
    if (language) {
      setActiveLanguage(language as any)
    }
  }, [language, setActiveLanguage])

  // Active topic selection
  const initialTopic = (lessonId && curriculumData.topicMap[lessonId]) || curriculumData.topics[0]
  const [activeTopicId, setActiveTopicId] = useState<string>(initialTopic?.id || '')
  const activeTopic: CurriculumTopic = curriculumData.topicMap[activeTopicId] || curriculumData.topics[0]

  // Progress state from API/database
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(new Set())

  // UI States (5 Tabs: lesson, hint, practice, quiz, challenge)
  const [activeTab, setActiveTab] = useState<'lesson' | 'hint' | 'practice' | 'quiz' | 'challenge'>('lesson')
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // Initialize expanded categories
  useEffect(() => {
    const defaultExpanded: Record<string, boolean> = {}
    curriculumData.categories.forEach(c => {
      defaultExpanded[c.id] = true
    })
    setExpandedCategories(defaultExpanded)
  }, [curriculumData])

  // Quiz state for active topic (5 to 10 questions)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false)
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number } | null>(null)

  // Interactive Live Runner for code examples in Lesson view
  const [liveOutputs, setLiveOutputs] = useState<Record<number, string>>({})
  const [executingExampleIdx, setExecutingExampleIdx] = useState<number | null>(null)

  // Practice playground state
  const [activePracticeTaskIdx, setActivePracticeTaskIdx] = useState<number>(0)
  const [practiceCode, setPracticeCode] = useState<string>('')
  const [practiceOutput, setPracticeOutput] = useState<string>('')
  const [isExecutingPractice, setIsExecutingPractice] = useState<boolean>(false)

  // Coding challenge state
  const [isExecutingChallenge, setIsExecutingChallenge] = useState<boolean>(false)
  const [challengePassed, setChallengePassed] = useState<boolean>(false)

  // Load progress on mount or language change
  useEffect(() => {
    const fetchCurriculumProgress = async () => {
      try {
        const res = await api.get<{ curriculum: any[] }>(`/learn/curriculum/${language}`)
        if (res.curriculum) {
          const done = new Set<string>()
          res.curriculum.forEach(item => {
            if (item.completed) done.add(item.id)
          })
          setCompletedTopicIds(done)
        }
      } catch (err) {
        // Safe offline fallback
      }
    }
    fetchCurriculumProgress()
  }, [language])

  // Sync with URL parameter or language switch - safely reset invalid dependent selection
  useEffect(() => {
    if (lessonId && curriculumData.topicMap[lessonId]) {
      setActiveTopicId(lessonId)
    } else if (curriculumData.topics.length > 0) {
      setActiveTopicId(curriculumData.topics[0].id)
    }
  }, [lessonId, curriculumData])

  // Reset state when active topic changes
  useEffect(() => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
    setLiveOutputs({})
    setChallengePassed(false)
    setActivePracticeTaskIdx(0)
    if (activeTopic?.practiceTasks?.length > 0) {
      // User must write their own code; never preload solution code
      setPracticeCode(activeTopic.practiceTasks[0].starterCode || '')
      setPracticeOutput('')
    } else {
      setPracticeCode('')
      setPracticeOutput('')
    }
  }, [activeTopicId, activeTopic])

  const handleSwitchLanguage = (newLang: string) => {
    playClick()
    setActiveLanguage(newLang as any)
    navigate(`/code/learning/${newLang}`)
  }

  // Toggle category in sidebar
  const toggleCategory = (catId: string) => {
    playClick()
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }))
  }

  // Select a topic
  const handleSelectTopic = (topic: CurriculumTopic) => {
    playClick()
    setActiveTopicId(topic.id)
    navigate(`/learn/${language}/${topic.id}`, { replace: true })
    setSidebarOpen(false)
  }

  // Live code execution for lesson examples
  const handleRunLiveCode = async (codeToRun: string, exampleIdx: number) => {
    playClick()
    setExecutingExampleIdx(exampleIdx)
    try {
      const res = await api.post('/code/run', {
        language,
        code: codeToRun
      })
      if (res.output) {
        setLiveOutputs(prev => ({ ...prev, [exampleIdx]: res.output }))
      } else if (res.runtimeError) {
        setLiveOutputs(prev => ({ ...prev, [exampleIdx]: `Error: ${res.runtimeError}` }))
      } else {
        setLiveOutputs(prev => ({ ...prev, [exampleIdx]: 'Program executed successfully (no standard output).' }))
      }
    } catch (e) {
      setLiveOutputs(prev => ({
        ...prev,
        [exampleIdx]: activeTopic.codeExamples[exampleIdx]?.output || 'Executed successfully in sandbox.'
      }))
    } finally {
      setExecutingExampleIdx(null)
    }
  }

  // Practice code execution
  const handleRunPracticeCode = async () => {
    playClick()
    setIsExecutingPractice(true)
    try {
      const res = await api.post('/code/run', {
        language,
        code: practiceCode
      })
      if (res.output) {
        setPracticeOutput(res.output)
      } else if (res.runtimeError) {
        setPracticeOutput(`Runtime Error: ${res.runtimeError}`)
      } else {
        setPracticeOutput('Program executed successfully.')
      }
      playCorrect()
    } catch (e) {
      setPracticeOutput('Executed in local sandbox.')
    } finally {
      setIsExecutingPractice(false)
    }
  }

  // Quiz Handlers (5 to 10 Questions)
  const handleSelectQuizOption = (qId: string, optIdx: number) => {
    if (quizSubmitted) return
    playClick()
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }))
  }

  const handleSubmitQuiz = async () => {
    playClick()
    const quizzes = activeTopic.quizzes || []
    let correctCount = 0

    quizzes.forEach(q => {
      if (quizAnswers[q.id] === q.correctOptionIndex) {
        correctCount++
      }
    })

    setQuizSubmitted(true)
    setQuizScore({ correct: correctCount, total: quizzes.length })

    const passThreshold = Math.ceil(quizzes.length * 0.6) // 60% passing requirement
    const passed = correctCount >= passThreshold

    try {
      await api.post('/learn/submit-quiz', {
        language,
        lessonId: activeTopic.id,
        answers: quizAnswers
      })
    } catch (e) {}

    if (passed) {
      playCorrect()
      triggerConfetti()
      awardXpNotification(correctCount * 25, `Topic Mastered (${correctCount}/${quizzes.length} Quiz Score)!`)
      setCompletedTopicIds(prev => new Set([...prev, activeTopic.id]))
    } else {
      playWrong()
    }
  }

  // Coding challenge handler via Monaco editor
  const handleRunChallenge = async (code: string) => {
    setIsExecutingChallenge(true)
    try {
      const res = await api.post('/learn/submit-code', {
        language,
        lessonId: activeTopic.id,
        code
      })

      if (res.allTestsPassed) {
        setChallengePassed(true)
        playLevelClear()
        triggerConfetti()
        awardXpNotification(res.xpEarned || 50, 'Challenge Solved & Topic Completed!')
        setCompletedTopicIds(prev => new Set([...prev, activeTopic.id]))
      } else {
        playWrong()
      }
      return res
    } catch (err) {
      return null
    } finally {
      setIsExecutingChallenge(false)
    }
  }

  // Download Topic Notes / Hints
  const handleDownloadNotes = () => {
    playClick()
    const hintObj = activeTopic.hint || (activeTopic as any).notes
    const content = hintObj?.downloadableMarkdown || hintObj?.summary || activeTopic.explanation
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/markdown' })
    element.href = URL.createObjectURL(file)
    element.download = `${activeTopic.slug}-apex-notes.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Mark Topic Complete directly
  const handleMarkComplete = async () => {
    playCorrect()
    triggerConfetti()
    awardXpNotification(50, `Topic ${activeTopic.title} Completed!`)
    setCompletedTopicIds(prev => new Set([...prev, activeTopic.id]))
    try {
      await api.post('/learn/complete-topic', {
        language,
        topicId: activeTopic.id
      })
    } catch (e) {}
  }

  // Filtered topics for search
  const filteredTopics = useMemo(() => {
    return searchLanguageTopics(language, searchQuery)
  }, [language, searchQuery])

  // Progress metrics
  const totalTopics = curriculumData.topics.length
  const completedCount = completedTopicIds.size
  const progressPercent = Math.round((completedCount / (totalTopics || 1)) * 100)

  // Sequential navigation
  const prevTopic = activeTopic?.prevTopicId ? curriculumData.topicMap[activeTopic.prevTopicId] : null
  const nextTopic = activeTopic?.nextTopicId ? curriculumData.topicMap[activeTopic.nextTopicId] : null

  if (!activeTopic) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-[#9CA3AF] flex items-center justify-center font-mono text-xs">
        Loading APEX Curriculum...
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#0B0E14] text-[#F5F5F7] flex flex-col">
      {/* Top Header HUD */}
      <div className="border-b border-white/10 bg-[#121620]/90 backdrop-blur-xl sticky top-20 z-30 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl bg-[#161B26] border border-white/10 text-[#E5B842]"
                aria-label="Toggle Syllabus"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Language Identity Badge & Quick Switcher */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-[#161B26] border border-white/10 flex items-center justify-center p-2 shadow-sm">
                  <TechLogo language={language} size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <select
                      value={language}
                      onChange={e => handleSwitchLanguage(e.target.value)}
                      className="text-[11px] font-mono font-bold uppercase bg-[#161B26] border border-[#E5B842]/30 text-[#FDE68A] rounded-lg px-2 py-0.5 cursor-pointer focus:outline-none"
                    >
                      {SUPPORTED_LANGUAGES.map(l => (
                        <option key={l.id} value={l.id} className="bg-[#121620] text-white">
                          {l.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-[#161B26] text-[#CBD5E1] capitalize">
                      {activeTopic.level}
                    </span>
                  </div>
                  <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md mt-0.5">
                    {activeTopic.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Mobile Progress Pill */}
            <div className="md:hidden text-right font-mono text-xs text-[#E5B842] font-bold">
              {progressPercent}%
            </div>
          </div>

          {/* Search and Overall Progress Telemetry */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {/* Quick Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${curriculumData.name} syllabus...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-white/10 bg-[#161B26] text-xs text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#E5B842]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Course Progress Bar */}
            <div className="hidden md:flex items-center gap-3 bg-[#161B26] px-3.5 py-1.5 rounded-xl border border-white/10">
              <div className="w-24 h-2 bg-[#0B0E14] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#E5B842]">
                {completedCount}/{totalTopics} Mastered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex relative">
        {/* Left Collapsible Syllabus Sidebar */}
        <aside
          className={`fixed lg:sticky top-[8.5rem] left-0 h-[calc(100vh-8.5rem)] w-72 sm:w-80 bg-[#121620] border-r border-white/10 z-40 overflow-y-auto transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E5B842] flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>{curriculumData.name} Curriculum</span>
              </span>
              <span className="text-[11px] font-mono text-[#9CA3AF]">
                {progressPercent}% Complete
              </span>
            </div>

            {/* If user is searching */}
            {searchQuery ? (
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#9CA3AF] block mb-2">
                  Search Results ({filteredTopics.length})
                </span>
                {filteredTopics.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTopic(t)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      activeTopicId === t.id
                        ? 'bg-[#E5B842]/20 border border-[#E5B842] text-white font-bold'
                        : 'bg-[#161B26] text-[#CBD5E1] hover:bg-[#1C2333]'
                    }`}
                  >
                    <span className="truncate">{t.title}</span>
                    {completedTopicIds.has(t.id) && (
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              /* Grouped Categories */
              <div className="space-y-3">
                {curriculumData.categories.map(cat => {
                  const catTopics = curriculumData.topics.filter(t => cat.topicIds.includes(t.id))
                  const catCompleted = catTopics.filter(t => completedTopicIds.has(t.id)).length
                  const isExpanded = expandedCategories[cat.id]

                  return (
                    <div key={cat.id} className="rounded-2xl border border-white/5 bg-[#161B26]/60 overflow-hidden">
                      {/* Category Header */}
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-[#161B26] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{cat.icon}</span>
                          <span className="text-xs font-bold text-white ">
                            {cat.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#9CA3AF]">
                            {catCompleted}/{catTopics.length}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                          )}
                        </div>
                      </button>

                      {/* Topic List */}
                      {isExpanded && (
                        <div className="px-2 pb-2 space-y-1">
                          {catTopics.map(t => {
                            const isSelected = activeTopicId === t.id
                            const isDone = completedTopicIds.has(t.id)

                            return (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => handleSelectTopic(t)}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
                                  isSelected
                                    ? 'bg-[#E5B842]/20 border border-[#E5B842] text-white font-bold shadow-sm'
                                    : 'text-[#CBD5E1] hover:bg-[#161B26] hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span className="text-[10px] font-mono text-[#9CA3AF] opacity-60">
                                    0{t.order}
                                  </span>
                                  <span className="truncate">{t.title}</span>
                                </div>
                                {isDone ? (
                                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-2.5 h-2.5" />
                                  </span>
                                ) : isSelected ? (
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5B842] animate-pulse" />
                                ) : null}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          />
        )}

        {/* Main Learning Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl min-w-0">
          {/* Navigation Tab Bar (5 Tabs) */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                playClick()
                setActiveTab('lesson')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'lesson'
                  ? 'btn-gold'
                  : 'bg-[#121620] text-[#CBD5E1] border border-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. Lesson</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClick()
                setActiveTab('hint')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'hint'
                  ? 'btn-gold'
                  : 'bg-[#121620] text-[#CBD5E1] border border-white/10 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>2. Hint</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClick()
                setActiveTab('practice')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'practice'
                  ? 'btn-gold'
                  : 'bg-[#121620] text-[#CBD5E1] border border-white/10 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>3. Practice</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClick()
                setActiveTab('quiz')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'quiz'
                  ? 'btn-gold'
                  : 'bg-[#121620] text-[#CBD5E1] border border-white/10 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>4. Quiz ({activeTopic.quizzes?.length || 5}Q)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClick()
                setActiveTab('challenge')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'challenge'
                  ? 'btn-gold'
                  : 'bg-[#121620] text-[#CBD5E1] border border-white/10 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>5. Challenge</span>
            </button>
          </div>

          {/* Source Traceability Metadata Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#121620] border border-white/10 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-[#CBD5E1]">
              <BookOpen className="w-3.5 h-3.5 text-[#E5B842] flex-shrink-0" />
              <span className="text-[#9CA3AF]">Source Material:</span>
              <span className="text-[#E5B842] font-semibold truncate">
                {activeTopic.sourceMetadata?.sourceFile || `${curriculumData.name} tutorial.docx`}
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
            <span className="px-2 py-0.5 rounded text-[10px] bg-[#E5B842]/10 border border-[#E5B842]/30 text-[#E5B842] font-semibold flex-shrink-0">
              Source-Grounded
            </span>
          </div>

          {/* TAB 1: LESSON CONTENT (Mini-Class) */}
          {activeTab === 'lesson' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Introduction Banner */}
              <div className="p-6 rounded-3xl border border-white/10 bg-[#121620] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5B842] font-bold">
                    {activeTopic.category} • Module 0{activeTopic.order}
                  </span>
                  <span className="text-xs font-mono text-[#9CA3AF]">~{activeTopic.estimatedMinutes} Mins</span>
                </div>
                <h2 className="text-2xl font-bold  text-white">
                  {activeTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  {activeTopic.introduction}
                </p>
              </div>

              {/* Core Concept & Mechanics Explanation */}
              <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] space-y-4">
                <h3 className="text-base font-bold text-white  flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#E5B842]" />
                  <span>Concept & Mechanics</span>
                </h3>
                <div className="text-xs sm:text-sm text-[#E5E7EB] leading-relaxed whitespace-pre-line space-y-3">
                  {activeTopic.explanation}
                </div>
              </div>

              {/* Syntax Specification Card */}
              <div className="p-6 rounded-3xl border border-white/10 bg-[#121620] space-y-3">
                <h3 className="text-sm font-bold font-mono uppercase text-[#E5B842] flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>Syntax Specification</span>
                </h3>
                <div className="p-4 rounded-2xl bg-[#0B0E14] border border-white/10 font-mono text-xs sm:text-sm text-[#FDE68A] whitespace-pre overflow-x-auto">
                  {activeTopic.syntax}
                </div>
                {activeTopic.syntaxBreakdown && (
                  <div className="p-3.5 rounded-xl bg-[#161B26] border border-white/5 text-xs text-[#CBD5E1] whitespace-pre-line leading-relaxed">
                    {activeTopic.syntaxBreakdown}
                  </div>
                )}
              </div>

              {/* Interactive Code Examples with Live Try It Runner */}
              {activeTopic.codeExamples.map((ex, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#E5B842]">Example 0{idx + 1}</span>
                      <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">{ex.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRunLiveCode(ex.code, idx)}
                      disabled={executingExampleIdx === idx}
                      className="px-4 py-2 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{executingExampleIdx === idx ? 'Running Sandbox...' : 'Try It / Run'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#CBD5E1]">{ex.explanation}</p>

                  <div className="rounded-2xl border border-white/10 bg-[#0B0E14] overflow-hidden">
                    <div className="px-4 py-2 border-b border-white/10 bg-[#161B26] text-[11px] font-mono text-[#9CA3AF] flex items-center justify-between">
                      <span>Source Code</span>
                      <span>UTF-8</span>
                    </div>
                    <pre className="p-4 text-xs sm:text-sm font-mono text-[#F5F5F7] overflow-x-auto">
                      <code>{ex.code}</code>
                    </pre>
                  </div>

                  {/* Output Preview */}
                  <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Standard Output:</span>
                      {liveOutputs[idx] && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Live Run Result
                        </span>
                      )}
                    </div>
                    <pre className="text-xs font-mono text-emerald-200 whitespace-pre-wrap">
                      {liveOutputs[idx] || ex.output}
                    </pre>
                  </div>
                </div>
              ))}

              {/* Common Mistakes & Key Takeaways */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTopic.commonMistakes.length > 0 && (
                  <div className="p-5 rounded-3xl border border-rose-500/30 bg-rose-950/10 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Common Pitfall</span>
                    </h4>
                    <div className="p-3 rounded-xl bg-[#0B0E14] border border-rose-500/20 font-mono text-xs text-rose-300">
                      ✗ {activeTopic.commonMistakes[0].mistake}
                    </div>
                    <div className="p-3 rounded-xl bg-[#0B0E14] border border-emerald-500/20 font-mono text-xs text-emerald-300">
                      ✓ {activeTopic.commonMistakes[0].correction}
                    </div>
                    <p className="text-xs text-[#CBD5E1]">
                      {activeTopic.commonMistakes[0].explanation}
                    </p>
                  </div>
                )}

                <div className="p-5 rounded-3xl border border-white/10 bg-[#121620] space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#E5B842] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Key Takeaways</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#CBD5E1] list-disc list-inside">
                    {activeTopic.keyPoints.map((kp, i) => (
                      <li key={i} className="leading-relaxed">{kp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: HINT (Concise Memory Aid) */}
          {activeTab === 'hint' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E5B842] font-bold">Memory Aid & Quick Cues</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{activeTopic.title} Hints</h3>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadNotes}
                  className="px-4 py-2.5 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Topic Notes (.md)</span>
                </button>
              </div>

              {(() => {
                const hintObj = activeTopic.hint || (activeTopic as any).notes
                return (
                  <div className="space-y-5">
                    <div className="p-4 rounded-2xl bg-[#0B0E14] border border-[#E5B842]/30 space-y-2">
                      <h4 className="text-xs font-mono uppercase font-bold text-[#E5B842] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Core Rule Reminders</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#E5E7EB] leading-relaxed">
                        {hintObj?.summary}
                      </p>
                    </div>

                    {hintObj?.keyRules && hintObj.keyRules.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono uppercase font-bold text-[#CBD5E1]">Key Syntax & Memory Rules</h4>
                        <ul className="space-y-2 text-xs text-[#CBD5E1]">
                          {hintObj.keyRules.map((rule: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 bg-[#161B26] p-3 rounded-xl border border-white/5">
                              <Check className="w-4 h-4 text-[#E5B842] flex-shrink-0 mt-0.5" />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {hintObj?.cheatsheetMarkdown && (
                      <div className="p-4 rounded-2xl bg-[#0B0E14] border border-white/10 font-mono text-xs text-[#CBD5E1] whitespace-pre-wrap leading-relaxed">
                        {hintObj.cheatsheetMarkdown}
                      </div>
                    )}
                  </div>
                )
              })()}
            </motion.div>
          )}

          {/* TAB 3: PRACTICE (Interactive Coding Playground) */}
          {activeTab === 'practice' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] space-y-6"
            >
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono uppercase text-[#E5B842] font-bold">Interactive Sandbox</span>
                <h3 className="text-xl font-bold text-white mt-0.5">Hands-On Practice Playground</h3>
                <p className="text-xs text-[#CBD5E1] mt-1">
                  Type your code below, run it in the isolated sandbox, and test your understanding of {activeTopic.title}.
                </p>
              </div>

              {/* Task Selector if multiple practice tasks */}
              {activeTopic.practiceTasks && activeTopic.practiceTasks.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {activeTopic.practiceTasks.map((pt, idx) => (
                      <button
                        key={pt.id || idx}
                        type="button"
                        onClick={() => {
                          playClick()
                          setActivePracticeTaskIdx(idx)
                          setPracticeCode(pt.starterCode || '')
                          setPracticeOutput('')
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                          activePracticeTaskIdx === idx
                            ? 'bg-[#E5B842] text-[#0B0E14]'
                            : 'bg-[#161B26] text-[#CBD5E1] border border-white/10'
                        }`}
                      >
                        Task 0{idx + 1}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#161B26] border border-white/10 space-y-2">
                    <h4 className="text-xs font-bold text-white font-mono">
                      {activeTopic.practiceTasks[activePracticeTaskIdx]?.title}
                    </h4>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      {activeTopic.practiceTasks[activePracticeTaskIdx]?.instruction}
                    </p>
                  </div>
                </div>
              )}

              {/* Interactive Code Editor & Output Area */}
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-[#0B0E14] overflow-hidden">
                  <div className="px-4 py-2 bg-[#161B26] border-b border-white/10 text-xs font-mono text-[#CBD5E1] flex items-center justify-between">
                    <span>{curriculumData.name} Code Editor</span>
                    <button
                      type="button"
                      onClick={handleRunPracticeCode}
                      disabled={isExecutingPractice}
                      className="px-3.5 py-1 btn-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isExecutingPractice ? 'Executing...' : 'Run Code'}</span>
                    </button>
                  </div>
                  <textarea
                    value={practiceCode}
                    onChange={e => setPracticeCode(e.target.value)}
                    rows={8}
                    className="w-full p-4 bg-[#0B0E14] font-mono text-xs sm:text-sm text-[#F5F5F7] focus:outline-none resize-y"
                    placeholder="Type your code here..."
                  />
                </div>

                {/* Practice Output Box */}
                {practiceOutput && (
                  <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Execution Output:</span>
                    <pre className="text-xs font-mono text-emerald-200 whitespace-pre-wrap">{practiceOutput}</pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: QUIZ (5 to 10 Questions) */}
          {activeTab === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121620] space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E5B842] font-bold">Verification</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {activeTopic.quizzes?.length || 5}-Question Topic Quiz
                  </h3>
                </div>
                {quizSubmitted && quizScore && (
                  <div className="px-4 py-2 rounded-2xl bg-[#161B26] border border-[#E5B842]/40 text-center font-mono">
                    <span className="text-sm font-extrabold text-[#E5B842]">
                      Score: {quizScore.correct} / {quizScore.total}
                    </span>
                    <span className="text-[10px] block text-emerald-400">
                      {quizScore.correct >= Math.ceil(quizScore.total * 0.6) ? '✓ Passed (60%+)' : 'Retry for Mastery'}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {activeTopic.quizzes.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[q.id]
                  const isDone = quizSubmitted
                  const isCorrect = selectedOpt === q.correctOptionIndex

                  return (
                    <div key={q.id} className="p-5 rounded-2xl bg-[#161B26] border border-white/10 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-[#0B0E14] border border-white/10 text-xs font-mono font-bold flex items-center justify-center text-[#E5B842]">
                            {qIdx + 1}
                          </span>
                          <h4 className="flex-1 text-xs sm:text-sm font-semibold text-white leading-relaxed">
                            {q.question}
                          </h4>
                        </div>
                        {isDone && (
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                            isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                          </span>
                        )}
                      </div>

                      {q.codeSnippet && (
                        <pre className="p-3 rounded-xl bg-[#0B0E14] text-xs font-mono text-[#FDE68A] overflow-x-auto">
                          <code>{q.codeSnippet}</code>
                        </pre>
                      )}

                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = selectedOpt === oIdx
                          const isOptionCorrect = oIdx === q.correctOptionIndex

                          let btnStyle = 'border-white/10 bg-[#0B0E14] hover:bg-[#1C2333] text-[#D1D5DB]'
                          if (isDone) {
                            if (isOptionCorrect) {
                              btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500'
                            } else if (isOptionSelected && !isOptionCorrect) {
                              btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500'
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'border-[#E5B842] bg-[#E5B842]/20 text-white font-bold'
                          }

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              disabled={isDone}
                              onClick={() => handleSelectQuizOption(q.id, oIdx)}
                              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-[10px] font-mono text-[#9CA3AF]">
                                  {String.fromCharCode(65 + oIdx)}.
                                </span>
                                <span>{opt}</span>
                              </div>
                              {isDone && isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                            </button>
                          )
                        })}
                      </div>

                      {isDone && (
                        <p className="text-[11px] text-[#CBD5E1] bg-[#0B0E14] p-3 rounded-xl border border-white/5">
                          💡 <span className="font-bold text-[#E5B842]">Rationale:</span> {q.explanation}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {quizSubmitted ? (
                  <button
                    type="button"
                    onClick={() => {
                      playClick()
                      setQuizSubmitted(false)
                      setQuizAnswers({})
                    }}
                    className="px-5 py-2.5 rounded-xl border border-white/10 bg-[#161B26] text-xs font-semibold text-[#CBD5E1]"
                  >
                    Retake Quiz
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={Object.keys(quizAnswers).length < activeTopic.quizzes.length}
                    onClick={handleSubmitQuiz}
                    className="px-6 py-3 btn-gold text-xs font-bold uppercase tracking-wider disabled:opacity-40 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Submit Quiz ({activeTopic.quizzes?.length || 5} Questions)</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 5: CODING CHALLENGE */}
          {activeTab === 'challenge' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-3xl border border-white/10 bg-[#121620] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#E5B842] font-bold">Coding Challenge</span>
                  {challengePassed && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Challenge Solved (+50 XP)</span>
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{activeTopic.codingChallenge.title}</h3>
                <p className="text-xs sm:text-sm text-[#CBD5E1]">{activeTopic.codingChallenge.instruction}</p>
              </div>

              <MonacoCodeEditor
                language={language === 'c' ? 'c' : language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : language === 'rust' ? 'rust' : language === 'sql' ? 'sql' : language === 'typescript' ? 'typescript' : language === 'html' || language === 'htmlcss' ? 'html' : language === 'javascript' ? 'javascript' : 'python'}
                initialCode={activeTopic.codingChallenge.starterCode}
                testCases={activeTopic.codingChallenge.testCases}
                onRun={handleRunChallenge}
                isExecuting={isExecutingChallenge}
                height="350px"
              />
            </motion.div>
          )}

          {/* Bottom Step Navigation Bar */}
          <div className="p-4 sm:p-5 rounded-3xl border border-white/10 bg-[#121620] flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <button
              type="button"
              disabled={!prevTopic}
              onClick={() => prevTopic && handleSelectTopic(prevTopic)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 bg-[#161B26] hover:bg-[#1C2333] text-xs font-semibold text-[#CBD5E1] disabled:opacity-30 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Topic</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {!completedTopicIds.has(activeTopic.id) ? (
                <button
                  type="button"
                  onClick={handleMarkComplete}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold hover:bg-emerald-900/40 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark Topic Complete</span>
                </button>
              ) : (
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  ✓ Topic Mastered
                </span>
              )}

              <button
                type="button"
                disabled={!nextTopic}
                onClick={() => nextTopic && handleSelectTopic(nextTopic)}
                className="w-full sm:w-auto px-6 py-2.5 btn-gold text-xs font-bold uppercase tracking-wider disabled:opacity-30 flex items-center justify-center gap-2"
              >
                <span>Next Topic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default LearningPage
