import type { PythonTopic, PythonCategory } from './types'
import { TUTORIAL_TOPICS } from './topics/tutorialTopics'
import { OOP_TOPICS } from './topics/oopTopics'
import { FILE_AND_MODULE_TOPICS } from './topics/fileAndModulesTopics'
import { DSA_TOPICS } from './topics/dsaTopics'
import { LIBRARIES_AND_DATA_TOPICS } from './topics/librariesAndDataTopics'

// Combine all structured topics in progressive sequential order
export const ALL_PYTHON_TOPICS: PythonTopic[] = [
  ...TUTORIAL_TOPICS,
  ...OOP_TOPICS,
  ...FILE_AND_MODULE_TOPICS,
  ...DSA_TOPICS,
  ...LIBRARIES_AND_DATA_TOPICS
]

// Ensure consistent sequential linkage across all topics
for (let i = 0; i < ALL_PYTHON_TOPICS.length; i++) {
  ALL_PYTHON_TOPICS[i].order = i + 1
  if (i > 0) {
    ALL_PYTHON_TOPICS[i].prevTopicId = ALL_PYTHON_TOPICS[i - 1].id
  }
  if (i < ALL_PYTHON_TOPICS.length - 1) {
    ALL_PYTHON_TOPICS[i].nextTopicId = ALL_PYTHON_TOPICS[i + 1].id
  }
}

export const PYTHON_CATEGORIES: PythonCategory[] = [
  {
    id: 'tutorial',
    title: 'Python Tutorial & Basics',
    description: 'Foundations, syntax, variables, data types, operators, strings, conditionals, loops, functions, and collections.',
    level: 'beginner',
    icon: '📘',
    topicIds: TUTORIAL_TOPICS.map(t => t.id)
  },
  {
    id: 'oop',
    title: 'Python OOP & Classes',
    description: 'Object-Oriented Programming, __init__, self, inheritance, method overriding, polymorphism, and dunder methods.',
    level: 'intermediate',
    icon: '🧩',
    topicIds: OOP_TOPICS.map(t => t.id)
  },
  {
    id: 'file-handling',
    title: 'File Handling & Modules',
    description: 'File reading and writing with context managers, exceptions, JSON parsing, and regular expressions.',
    level: 'intermediate',
    icon: '📁',
    topicIds: FILE_AND_MODULE_TOPICS.map(t => t.id)
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Big-O notation, Dynamic Arrays, Stacks, Queues, Binary Search, and Merge Sort.',
    level: 'advanced',
    icon: '⚡',
    topicIds: DSA_TOPICS.map(t => t.id)
  },
  {
    id: 'libraries',
    title: 'Data Science & Machine Learning',
    description: 'Vectorized NumPy arrays, Pandas DataFrames, Matplotlib visualization, and ML model training.',
    level: 'advanced',
    icon: '📊',
    topicIds: LIBRARIES_AND_DATA_TOPICS.map(t => t.id)
  }
]

export const PYTHON_TOPIC_MAP: Record<string, PythonTopic> = Object.fromEntries(
  ALL_PYTHON_TOPICS.map(t => [t.id, t])
)

export function getPythonTopic(idOrSlug: string): PythonTopic | undefined {
  return ALL_PYTHON_TOPICS.find(t => t.id === idOrSlug || t.slug === idOrSlug)
}

export function searchPythonTopics(query: string): PythonTopic[] {
  if (!query.trim()) return ALL_PYTHON_TOPICS
  const q = query.toLowerCase()
  return ALL_PYTHON_TOPICS.filter(
    t =>
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.introduction.toLowerCase().includes(q) ||
      t.keyPoints.some(k => k.toLowerCase().includes(q))
  )
}
