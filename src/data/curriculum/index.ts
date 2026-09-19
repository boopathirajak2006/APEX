import type { LanguageCurriculumData, CurriculumTopic, CurriculumCategory } from './types'
import { ALL_PYTHON_TOPICS, PYTHON_CATEGORIES } from '../python/curriculum'
import { C_TOPICS, C_CATEGORIES } from './languages/cCurriculum'
import { CPP_TOPICS, CPP_CATEGORIES } from './languages/cppCurriculum'
import { HTML_TOPICS, HTML_CATEGORIES } from './languages/htmlCurriculum'
import { JAVA_TOPICS, JAVA_CATEGORIES } from './languages/javaCurriculum'
import { JS_TOPICS, JS_CATEGORIES } from './languages/jsCurriculum'
import { RUST_TOPICS, RUST_CATEGORIES } from './languages/rustCurriculum'
import { SQL_TOPICS, SQL_CATEGORIES } from './languages/sqlCurriculum'
import { TS_TOPICS, TS_CATEGORIES } from './languages/tsCurriculum'

// Helper to convert PythonTopic to CurriculumTopic format
const pythonCurriculumTopics: CurriculumTopic[] = ALL_PYTHON_TOPICS.map(t => ({
  ...t,
  language: 'python',
  hint: t.hint || t.notes
}))

const pythonCategories: CurriculumCategory[] = PYTHON_CATEGORIES

export const CURRICULA_REGISTRY: Record<string, LanguageCurriculumData> = {
  python: {
    language: 'python',
    name: 'Python',
    tagline: 'Versatile, high-level, and beginner-friendly',
    icon: '🐍',
    categories: pythonCategories,
    topics: pythonCurriculumTopics.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'Python tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'Official Python 3.7.0 Tutorial by Guido van Rossum'
      }
    })),
    topicMap: Object.fromEntries(pythonCurriculumTopics.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'Python tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'Official Python 3.7.0 Tutorial by Guido van Rossum'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'Python tutorial.docx',
      sourceSection: 'Python 3.7.0 Documentation',
      sourceTopic: 'Python Programming',
      subject: 'code',
      authorOrOrigin: 'Official Python 3.7.0 Tutorial by Guido van Rossum'
    }
  },
  c: {
    language: 'c',
    name: 'C',
    tagline: 'Foundational systems & procedural computing',
    icon: '🔤',
    categories: C_CATEGORIES,
    topics: C_TOPICS.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'c tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'C Programming for the Absolute Beginner by Michael Vine'
      }
    })),
    topicMap: Object.fromEntries(C_TOPICS.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'c tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'C Programming for the Absolute Beginner by Michael Vine'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'c tutorial.docx',
      sourceSection: 'C Programming for the Absolute Beginner',
      sourceTopic: 'C Programming',
      subject: 'code',
      authorOrOrigin: 'C Programming for the Absolute Beginner by Michael Vine'
    }
  },
  cpp: {
    language: 'cpp',
    name: 'C++',
    tagline: 'Extreme performance, systems & game engines',
    icon: '⚙️',
    categories: CPP_CATEGORIES,
    topics: CPP_TOPICS.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'c++ tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'C++ Tutorial (Standard C++)'
      }
    })),
    topicMap: Object.fromEntries(CPP_TOPICS.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'c++ tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'C++ Tutorial (Standard C++)'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'c++ tutorial.docx',
      sourceSection: 'C++ Programming Tutorial',
      sourceTopic: 'C++ Programming',
      subject: 'code',
      authorOrOrigin: 'C++ Tutorial (Standard C++)'
    }
  },
  html: {
    language: 'html',
    name: 'HTML',
    tagline: 'The structural foundation of the World Wide Web',
    icon: '🌐',
    categories: HTML_CATEGORIES,
    topics: HTML_TOPICS.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'html tutorial.docx',
        sourceSection: `Section: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'HTML Comprehensive Specification Tutorial'
      }
    })),
    topicMap: Object.fromEntries(HTML_TOPICS.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'html tutorial.docx',
        sourceSection: `Section: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'HTML Comprehensive Specification Tutorial'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'html tutorial.docx',
      sourceSection: 'HTML Tutorial',
      sourceTopic: 'HTML Web Development',
      subject: 'code',
      authorOrOrigin: 'HTML Comprehensive Specification Tutorial'
    }
  },
  java: {
    language: 'java',
    name: 'Java',
    tagline: 'Robust object-oriented enterprise backbone',
    icon: '☕',
    categories: JAVA_CATEGORIES,
    topics: JAVA_TOPICS.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'java tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'Introduction to Programming Using Java by David J. Eck'
      }
    })),
    topicMap: Object.fromEntries(JAVA_TOPICS.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'java tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'Introduction to Programming Using Java by David J. Eck'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'java tutorial.docx',
      sourceSection: 'Introduction to Programming Using Java',
      sourceTopic: 'Java Programming',
      subject: 'code',
      authorOrOrigin: 'Introduction to Programming Using Java by David J. Eck'
    }
  },
  javascript: {
    language: 'javascript',
    name: 'JavaScript',
    tagline: 'Universal interactive language of the modern web',
    icon: '⚡',
    categories: JS_CATEGORIES,
    topics: JS_TOPICS.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'javascript tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'JavaScript from Beginner to Professional by Laurence Lars Svekis'
      }
    })),
    topicMap: Object.fromEntries(JS_TOPICS.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'javascript tutorial.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'JavaScript from Beginner to Professional by Laurence Lars Svekis'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'javascript tutorial.docx',
      sourceSection: 'JavaScript from Beginner to Professional',
      sourceTopic: 'JavaScript Programming',
      subject: 'code',
      authorOrOrigin: 'JavaScript from Beginner to Professional by Laurence Lars Svekis'
    }
  },
  rust: {
    language: 'rust',
    name: 'Rust',
    tagline: 'Memory safety without garbage collection',
    icon: '🦀',
    categories: RUST_CATEGORIES,
    topics: RUST_TOPICS.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'rust.docx',
        sourceSection: `Module: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'Comprehensive Rust by Martin Geisler'
      }
    })),
    topicMap: Object.fromEntries(RUST_TOPICS.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'rust.docx',
        sourceSection: `Module: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'Comprehensive Rust by Martin Geisler'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'rust.docx',
      sourceSection: 'Comprehensive Rust Course',
      sourceTopic: 'Rust Systems Programming',
      subject: 'code',
      authorOrOrigin: 'Comprehensive Rust by Martin Geisler'
    }
  },
  sql: {
    language: 'sql',
    name: 'SQL',
    tagline: 'Standard query language for relational data',
    icon: '🗄️',
    categories: SQL_CATEGORIES,
    topics: SQL_TOPICS.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'sql.docx',
        sourceSection: `Section: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'SQL Basics by Dr. Sanjeev Verma'
      }
    })),
    topicMap: Object.fromEntries(SQL_TOPICS.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'sql.docx',
        sourceSection: `Section: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'SQL Basics by Dr. Sanjeev Verma'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'sql.docx',
      sourceSection: 'SQL Basics Course',
      sourceTopic: 'SQL Relational Database',
      subject: 'code',
      authorOrOrigin: 'SQL Basics by Dr. Sanjeev Verma'
    }
  },
  typescript: {
    language: 'typescript',
    name: 'TypeScript',
    tagline: 'Type-safe JavaScript at enterprise scale',
    icon: '🔷',
    categories: TS_CATEGORIES,
    topics: TS_TOPICS.map(t => ({
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'TypeScript.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'TypeScript Notes for Professionals'
      }
    })),
    topicMap: Object.fromEntries(TS_TOPICS.map(t => [t.id, {
      ...t,
      sourceMetadata: t.sourceMetadata || {
        sourceFile: 'TypeScript.docx',
        sourceSection: `Chapter: ${t.category}`,
        sourceTopic: t.title,
        subject: 'code',
        authorOrOrigin: 'TypeScript Notes for Professionals'
      }
    }])),
    sourceMetadata: {
      sourceFile: 'TypeScript.docx',
      sourceSection: 'TypeScript Notes for Professionals',
      sourceTopic: 'TypeScript Programming',
      subject: 'code',
      authorOrOrigin: 'TypeScript Notes for Professionals'
    }
  }
}

export function getCurriculumByLanguage(language: string = 'python'): LanguageCurriculumData {
  const normalized = language.toLowerCase()
  return CURRICULA_REGISTRY[normalized] || CURRICULA_REGISTRY.python
}

export function getCurriculumTopic(language: string, topicId: string): CurriculumTopic | undefined {
  const curriculum = getCurriculumByLanguage(language)
  return curriculum.topicMap[topicId] || curriculum.topics[0]
}

export function searchLanguageTopics(language: string, query: string): CurriculumTopic[] {
  const curriculum = getCurriculumByLanguage(language)
  if (!query.trim()) return curriculum.topics
  const q = query.toLowerCase()
  return curriculum.topics.filter(
    t =>
      t.title.toLowerCase().includes(q) ||
      t.introduction.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  )
}
