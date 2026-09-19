/**
 * Domain Type Definitions for the APEX Platform
 * Focused on: CODE and SOFT SKILLS
 */

export type PathType =
  | 'code'
  | 'soft_skills'
  | 'code_journey'
  | 'soft_skill_journey'

export type CodingLanguage =
  | 'python'
  | 'c'
  | 'cpp'
  | 'html'
  | 'java'
  | 'javascript'
  | 'rust'
  | 'sql'
  | 'typescript'

export type SoftSkillId =
  | 'communication'
  | 'teamwork'
  | 'leadership'
  | 'problem_solving'
  | 'critical_thinking'
  | 'time_management'
  | 'presentation_skills'
  | 'interview_skills'
  | 'adaptability'

export type SoftSkillTopicId = SoftSkillId

export type DifficultyLevel = 'beginner' | 'medium' | 'advanced'
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export type ExperienceLevel =
  | 'just_starting'
  | 'know_basics'
  | 'comfortable'
  | 'advanced'

export type MascotMood =
  | 'idle'
  | 'speaking'
  | 'thinking'
  | 'listening'
  | 'curious'
  | 'happy'
  | 'excited'
  | 'encouraging'
  | 'confused'
  | 'celebrating'
  | 'disappointed_supportive'
  | 'lesson_complete'
  | 'level_unlocked'
  | 'achievement_unlocked'

export interface User {
  id: string
  email?: string
  username: string
  displayName: string
  avatarUrl?: string
  authProvider: 'google' | 'github' | 'email'
  experienceLevel?: ExperienceLevel
  selectedPath?: PathType
  pathReason?: string
  selectedLanguage: CodingLanguage
  introCompleted?: boolean
  totalXp: number
  level: number
  currentStreak: number
  maxStreak: number
  lastActiveDate: string
  createdAt: string
}

export interface PathMeta {
  id: PathType
  title: string
  subtitle: string
  tagline: string
  icon: string
  color: string
  accentColor: string
  gradient: string
  description: string
  targetRoute: string
  whyOptions: string[]
}

export interface ExperienceLevelMeta {
  id: ExperienceLevel
  title: string
  subtitle: string
  description: string
  icon: string
}

export interface SourceMetadata {
  sourceFile: string
  sourceSection: string
  sourceTopic: string
  subject: 'code' | 'soft_skills'
  authorOrOrigin?: string
}

export interface LanguageMeta {
  id: CodingLanguage
  name: string
  tagline: string
  icon: string
  color: string
  accentColor: string
  description: string
  popular: boolean
  totalLessons: number
  totalLevels: number
  badgeTitle: string
}

export interface QuizQuestion {
  id: string
  question: string
  codeSnippet?: string
  options: string[]
  correctOptionIndex: number
  explanation: string
  hint?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  topic?: string
  sourceMetadata?: SourceMetadata
}

export interface TestCase {
  id: string
  input: string
  expectedOutput: string
  description?: string
  isSecret?: boolean
}

export interface CodingChallenge {
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

export interface Lesson {
  id: string
  language: CodingLanguage
  order: number
  category: string
  title: string
  slug: string
  estimatedMinutes: number
  summary: string
  theoryMarkdown: string
  codeExamples: {
    title: string
    code: string
    explanation: string
  }[]
  quizzes: QuizQuestion[]
  codingChallenge: CodingChallenge
  xpReward: number
  sourceMetadata?: SourceMetadata
}

// ==========================================
// SOFT SKILLS DATA STRUCTURE
// ==========================================

export interface SoftSkillTopic {
  id: string
  skillId: SoftSkillId
  level: SkillLevel
  title: string
  order: number
  summary: string
  explanation: string
  examples: {
    title: string
    scenario: string
    takeaway: string
  }[]
  practicalSituations: {
    situation: string
    recommendedAction: string
    whyItWorks: string
  }[]
  importantPoints: string[]
  quizzes: QuizQuestion[] // 5-10 questions
  xpReward: number
  sourceMetadata?: SourceMetadata
}

export interface SoftSkillMeta {
  id: SoftSkillId
  name: string
  tagline: string
  icon: string
  color: string
  category: string
  description: string
  topics: SoftSkillTopic[]
  totalTopics: number
  sourceMetadata?: SourceMetadata
}

export interface SoftSkillTestExam {
  skillId: SoftSkillId
  title: string
  tagline: string
  icon: string
  description: string
  timeLimitMinutes: number
  questions: QuizQuestion[] // 10 questions
  sourceMetadata?: SourceMetadata
}

export interface SoftSkillTestResult {
  skillId: SoftSkillId
  overallScore: number
  accuracyPercent: number
  totalQuestions: number
  correctCount: number
  currentLevel: string
  strengths: string[]
  areasToImprove: string[]
  recommendations: string[]
  assessedAt?: string
}

// ==========================================
// GAME DATA STRUCTURE
// ==========================================

export interface GameLevel {
  id: string
  levelNumber: number // 1 to 50
  difficulty: DifficultyLevel
  language: CodingLanguage
  title: string
  isBoss: boolean
  bossName?: string
  quizzes: QuizQuestion[] // exactly 3
  challenge: CodingChallenge // exactly 1
  xpReward: number
  requiredStarsToUnlock: number
}

export interface LevelProgress {
  levelNumber: number
  difficulty: DifficultyLevel
  language: CodingLanguage
  unlocked: boolean
  completed: boolean
  stars: number
  bestQuizScore: number
  codingPassed: boolean
  attempts: number
  bestTimeSeconds?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'learning' | 'game' | 'streak' | 'coding' | 'soft_skills'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export interface CodeExecutionRequest {
  language: CodingLanguage
  code: string
  testCases?: TestCase[]
  customInput?: string
}

export interface TestResult {
  testCaseId: string
  passed: boolean
  input: string
  expectedOutput: string
  actualOutput: string
  executionTimeMs: number
  errorMessage?: string
}

export interface CodeExecutionResponse {
  success: boolean
  output: string
  executionTimeMs: number
  memoryUsedMb?: number
  testResults: TestResult[]
  allTestsPassed: boolean
  compileError?: string
  runtimeError?: string
}

// Unified Platform Telemetry Summary
export interface PathScoreSummary {
  codeJourney: {
    started: boolean
    activeLanguage: CodingLanguage
    learningMasteryPercent: number
    completedLessons: number
    totalLessons: number
  }
  skillCheck?: {
    started: boolean
    activeLanguage: CodingLanguage
    codingSkillScore: number
    quizScore: number
    codingScore: number
    assessedLevel: string
    strengths: string[]
    improvements: string[]
    assessedAt?: string
  }
  softSkillJourney: {
    started: boolean
    learningProgressPercent: number
    completedTopicsCount: number
    totalTopicsCount: number
    avgQuizScore: number
  }
  softSkillCheck: {
    started: boolean
    overallScore: number
    assessedLevel: string
    strongSkills: string[]
    skillsToImprove: string[]
    assessedAt?: string
  }
  careerPath?: any
  fieldTest?: any
}

export interface UserLanguageStats {
  language: CodingLanguage
  learningProgressPercent: number
  gameProgressPercent: number
  quizAccuracyPercent: number
  codingAccuracyPercent: number
  overallSkillScore: number
  completedLessonsCount: number
  completedLevelsCount: number
  currentLevel: number
  currentDifficulty: DifficultyLevel
  xpEarned: number
}

export interface UserAnalytics {
  overallSkillScore: number
  totalXp: number
  currentStreak: number
  maxStreak: number
  totalQuizzesAnswered: number
  quizAccuracy: number
  totalChallengesSolved: number
  codingAccuracy: number
  pathsSummary: PathScoreSummary
  languageStats: Record<CodingLanguage, UserLanguageStats>
  xpHistory: { date: string; xp: number }[]
  skillRadar: { subject: string; value: number; fullMark: number }[]
  streakHistory: { date: string; count: number }[]
}
