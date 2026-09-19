import { Lesson, CodingLanguage } from '../../src/types'
import { CURRICULA_REGISTRY } from '../../src/data/curriculum/index'

function mapToBackendLessons(topics: any[] = []): (Lesson & any)[] {
  return topics.map(t => ({
    id: t.id,
    language: t.language as CodingLanguage,
    order: t.order,
    category: t.category,
    categoryId: t.categoryId,
    level: t.level,
    title: t.title,
    slug: t.slug,
    estimatedMinutes: t.estimatedMinutes,
    summary: t.introduction,
    theoryMarkdown: `${t.explanation}\n\n### Syntax Specification\n\`\`\`${t.language}\n${t.syntax}\n\`\`\``,
    codeExamples: t.codeExamples || [],
    practicalExamples: t.practicalExamples || [],
    commonMistakes: t.commonMistakes || [],
    keyPoints: t.keyPoints || [],
    hint: t.hint || t.notes,
    notes: t.notes || t.hint,
    practiceTasks: t.practiceTasks || [],
    quizzes: t.quizzes || [],
    codingChallenge: t.codingChallenge,
    xpReward: t.xpReward || 50,
    nextTopicId: t.nextTopicId,
    prevTopicId: t.prevTopicId
  }))
}

export const CURRICULA: Record<string, (Lesson & any)[]> = {
  python: mapToBackendLessons(CURRICULA_REGISTRY.python?.topics),
  c: mapToBackendLessons(CURRICULA_REGISTRY.c?.topics),
  cpp: mapToBackendLessons(CURRICULA_REGISTRY.cpp?.topics),
  html: mapToBackendLessons(CURRICULA_REGISTRY.html?.topics),
  htmlcss: mapToBackendLessons(CURRICULA_REGISTRY.html?.topics),
  java: mapToBackendLessons(CURRICULA_REGISTRY.java?.topics),
  javascript: mapToBackendLessons(CURRICULA_REGISTRY.javascript?.topics),
  rust: mapToBackendLessons(CURRICULA_REGISTRY.rust?.topics),
  sql: mapToBackendLessons(CURRICULA_REGISTRY.sql?.topics),
  typescript: mapToBackendLessons(CURRICULA_REGISTRY.typescript?.topics)
}
