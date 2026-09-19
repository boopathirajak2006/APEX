import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, CheckCircle2, XCircle, Terminal, Cpu, Clock, Check } from 'lucide-react'
import type { CodingLanguage, TestCase, CodeExecutionResponse } from '../../types'
import { useAudio } from '../../contexts/AudioContext'

interface MonacoCodeEditorProps {
  language: CodingLanguage
  initialCode: string
  testCases?: TestCase[]
  onRun?: (code: string) => Promise<CodeExecutionResponse | null | void>
  isExecuting?: boolean
  readOnly?: boolean
  height?: string
  className?: string
}

export const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  language,
  initialCode,
  testCases = [],
  onRun,
  isExecuting = false,
  readOnly = false,
  height = '360px',
  className = '',
}) => {
  const [code, setCode] = useState<string>(initialCode || '')
  const [executionResult, setExecutionResult] = useState<CodeExecutionResponse | null>(null)
  const [activeTab, setActiveTab] = useState<'tests' | 'console'>('tests')
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number>(0)
  const { playClick, playCorrect, playWrong } = useAudio()

  // Keep internal code synchronized when initialCode changes (e.g. on problem / topic / language switch)
  useEffect(() => {
    setCode(initialCode || '')
    setExecutionResult(null)
  }, [initialCode, language])

  const getMonacoLang = (lang: CodingLanguage): string => {
    switch (lang) {
      case 'python':
        return 'python'
      case 'javascript':
        return 'javascript'
      case 'typescript':
        return 'typescript'
      case 'c':
        return 'c'
      case 'cpp':
        return 'cpp'
      case 'java':
        return 'java'
      case 'rust':
        return 'rust'
      case 'sql':
        return 'sql'
      case 'html':
        return 'html'
      default:
        return 'python'
    }
  }

  const handleRun = async () => {
    playClick()
    if (onRun) {
      const result = await onRun(code)
      if (result) {
        setExecutionResult(result)
        if (result.allTestsPassed) {
          playCorrect()
        } else {
          playWrong()
        }
      }
    }
  }

  const handleReset = () => {
    playClick()
    setCode(initialCode)
    setExecutionResult(null)
  }

  return (
    <div className={`flex flex-col rounded-3xl border border-white/10 bg-[#121620] overflow-hidden shadow-2xl ${className}`}>
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#0B0E14] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FDE68A] px-2.5 py-0.5 rounded-lg bg-[#E5B842]/15 border border-[#E5B842]/30">
            <Cpu className="w-3.5 h-3.5 text-[#E5B842]" />
            <span>{language.toUpperCase()}</span>
          </div>
        </div>

        {/* Editor Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#9CA3AF] hover:text-white hover:bg-[#161B26] transition-all"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleRun}
            disabled={isExecuting || readOnly}
            className={`flex items-center gap-2 px-5 py-2 btn-gold text-xs font-bold uppercase tracking-wider ${
              isExecuting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isExecuting ? 'animate-spin' : ''}`} />
            <span>{isExecuting ? 'Executing...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Monaco Code Editor Instance */}
      <div className="relative w-full" style={{ height }}>
        <Editor
          height="100%"
          language={getMonacoLang(language)}
          value={code}
          onChange={(val) => setCode(val || '')}
          theme="vs-dark"
          options={{
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            padding: { top: 14, bottom: 14 },
            readOnly,
          }}
        />
      </div>

      {/* Results & Test Cases Panel */}
      <div className="border-t border-white/10 bg-[#0B0E14] flex flex-col">
        {/* Output Tabs Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#121620]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('tests')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'tests'
                  ? 'bg-[#E5B842]/20 text-[#FDE68A] border border-[#E5B842]/40 shadow-sm'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Check className="w-3 h-3" />
              <span>Test Cases ({testCases.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('console')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'console'
                  ? 'bg-[#E5B842]/20 text-[#FDE68A] border border-[#E5B842]/40 shadow-sm'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>Console Stream</span>
            </button>
          </div>

          {executionResult && (
            <div className="flex items-center gap-2.5 text-xs">
              <span className="flex items-center gap-1 text-[#9CA3AF] font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#E5B842]" />
                {executionResult.executionTimeMs}ms
              </span>
              <span
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold font-mono ${
                  executionResult.allTestsPassed
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                }`}
              >
                {executionResult.allTestsPassed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ALL TESTS PASSED</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>TESTS FAILED</span>
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="p-4 max-h-52 overflow-y-auto font-mono text-xs">
          {activeTab === 'tests' ? (
            testCases.length > 0 ? (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 pb-1 overflow-x-auto">
                  {testCases.map((tc, idx) => {
                    const result = executionResult?.testResults?.find(t => t.testCaseId === tc.id)
                    const isPassed = result?.passed
                    const hasRun = result !== undefined

                    return (
                      <button
                        key={tc.id}
                        type="button"
                        onClick={() => setSelectedTestCaseIdx(idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] border transition-all ${
                          selectedTestCaseIdx === idx
                            ? 'bg-[#E5B842] text-black font-bold border-[#E5B842] shadow-sm'
                            : 'bg-[#161B26] border-white/10 text-[#CBD5E1] hover:text-white'
                        }`}
                      >
                        {hasRun && (
                          isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          )
                        )}
                        <span>Case {idx + 1}</span>
                      </button>
                    )
                  })}
                </div>

                {testCases[selectedTestCaseIdx] && (
                  <div className="p-4 rounded-2xl border border-white/10 bg-[#121620] space-y-2.5">
                    {testCases[selectedTestCaseIdx].input && (
                      <div>
                        <span className="text-[10px] font-mono text-[#E5B842] uppercase font-bold">Input:</span>
                        <div className="text-white bg-[#0B0E14] p-2.5 rounded-xl mt-1 border border-white/5">
                          {testCases[selectedTestCaseIdx].input}
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-mono text-[#E5B842] uppercase font-bold">Expected Output:</span>
                      <div className="text-emerald-400 bg-[#0B0E14] p-2.5 rounded-xl mt-1 border border-white/5">
                        {testCases[selectedTestCaseIdx].expectedOutput}
                      </div>
                    </div>
                    {executionResult?.testResults?.[selectedTestCaseIdx] && (
                      <div>
                        <span className="text-[10px] font-mono text-[#E5B842] uppercase font-bold">Actual Output:</span>
                        <div
                          className={`p-2.5 rounded-xl mt-1 border ${
                            executionResult.testResults[selectedTestCaseIdx].passed
                              ? 'text-emerald-300 bg-emerald-950/30 border-emerald-500/30'
                              : 'text-rose-300 bg-rose-950/30 border-rose-500/30'
                          }`}
                        >
                          {executionResult.testResults[selectedTestCaseIdx].actualOutput}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[#9CA3AF] text-center py-4">
                No specific unit test cases defined for this challenge. Click "Run Code" to test output.
              </div>
            )
          ) : (
            <div className="space-y-1.5 text-[#CBD5E1]">
              {executionResult ? (
                executionResult.runtimeError ? (
                  <div className="text-rose-400 p-3 rounded-xl bg-rose-950/30 border border-rose-500/30">
                    <span className="font-bold">Runtime Error: </span>
                    {executionResult.runtimeError}
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap leading-relaxed text-white bg-[#121620] p-3 rounded-xl border border-white/10">
                    {executionResult.output || '<No console output recorded>'}
                  </pre>
                )
              ) : (
                <div className="text-[#9CA3AF] italic py-3 text-center">
                  Console stream ready. Run your program to see output...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MonacoCodeEditor
