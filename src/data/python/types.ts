import type { TestCase } from '../../types'

export type PythonSkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface PythonQuizQuestion {
  id: string
  question: string
  codeSnippet?: string
  options: string[]
  correctOptionIndex: number
  explanation: string
}

export interface PythonCodeExample {
  title: string
  code: string
  explanation: string
  output?: string
}

export interface PythonCommonMistake {
  mistake: string
  correction: string
  explanation: string
}

export interface PythonPracticeTask {
  id: string
  title: string
  instruction: string
  starterCode?: string
  solutionCode?: string
  hint?: string
}

export interface PythonChallenge {
  id: string
  title: string
  slug: string
  instruction: string
  starterCode: string
  solutionHint?: string
  testCases: TestCase[]
  xpReward: number
}

export interface PythonTopicNotes {
  summary: string
  keyRules: string[]
  cheatsheetMarkdown: string
  downloadableMarkdown?: string
}

export interface PythonTopic {
  id: string
  title: string
  slug: string
  category: string
  categoryId: string
  level: PythonSkillLevel
  order: number
  estimatedMinutes: number
  prerequisites: string[]
  introduction: string
  explanation: string
  syntax: string
  syntaxBreakdown?: string
  codeExamples: PythonCodeExample[]
  practicalExamples: PythonCodeExample[]
  commonMistakes: PythonCommonMistake[]
  keyPoints: string[]
  notes: PythonTopicNotes
  hint?: PythonTopicNotes
  practiceTasks: PythonPracticeTask[]
  quizzes: PythonQuizQuestion[] // 5 to 10 topic-specific questions
  codingChallenge: PythonChallenge
  xpReward: number
  nextTopicId?: string
  prevTopicId?: string
}

export interface PythonCategory {
  id: string
  title: string
  description: string
  level: PythonSkillLevel
  icon: string
  topicIds: string[]
}
