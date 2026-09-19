import type { TestCase, CodingLanguage, SourceMetadata } from '../../types'

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface CurriculumQuizQuestion {
  id: string
  question: string
  codeSnippet?: string
  options: string[]
  correctOptionIndex: number
  explanation: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  topic?: string
  sourceMetadata?: SourceMetadata
}

export interface CurriculumCodeExample {
  title: string
  code: string
  explanation: string
  output?: string
}

export interface CurriculumCommonMistake {
  mistake: string
  correction: string
  explanation: string
}

export interface CurriculumPracticeTask {
  id: string
  title: string
  instruction: string
  starterCode?: string
  solutionCode?: string
  hint?: string
  sourceMetadata?: SourceMetadata
}

export interface CurriculumChallenge {
  id: string
  title: string
  slug: string
  instruction: string
  starterCode: string
  solutionHint?: string
  testCases: TestCase[]
  xpReward: number
  sourceMetadata?: SourceMetadata
}

export interface CurriculumTopicHint {
  summary: string
  keyRules: string[]
  cheatsheetMarkdown: string
  downloadableMarkdown?: string
}

export interface CurriculumTopic {
  id: string
  language: CodingLanguage
  title: string
  slug: string
  category: string
  categoryId: string
  level: SkillLevel
  order: number
  estimatedMinutes: number
  prerequisites: string[]
  introduction: string
  explanation: string
  syntax: string
  syntaxBreakdown?: string
  codeExamples: CurriculumCodeExample[]
  practicalExamples: CurriculumCodeExample[]
  commonMistakes: CurriculumCommonMistake[]
  keyPoints: string[]
  hint: CurriculumTopicHint
  practiceTasks: CurriculumPracticeTask[]
  quizzes: CurriculumQuizQuestion[] // 5 to 10 topic-specific questions
  codingChallenge: CurriculumChallenge
  xpReward: number
  nextTopicId?: string
  prevTopicId?: string
  sourceMetadata?: SourceMetadata
}

export interface CurriculumCategory {
  id: string
  title: string
  description: string
  level: SkillLevel
  icon: string
  topicIds: string[]
}

export interface LanguageCurriculumData {
  language: CodingLanguage
  name: string
  tagline: string
  icon: string
  categories: CurriculumCategory[]
  topics: CurriculumTopic[]
  topicMap: Record<string, CurriculumTopic>
  sourceMetadata?: SourceMetadata
}
