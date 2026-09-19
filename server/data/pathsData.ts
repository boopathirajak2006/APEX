import type { PathMeta, ExperienceLevelMeta } from '../../src/types'

export const PATHS_METADATA: PathMeta[] = [
  {
    id: 'code_journey',
    title: 'Code Journey',
    subtitle: 'Step-by-Step Programming Mastery',
    tagline: 'Learn 1 Programming Language from Basics to Advanced',
    icon: '💻',
    color: 'from-blue-600 to-cyan-500',
    accentColor: '#38bdf8',
    gradient: 'rgba(56, 189, 248, 0.15)',
    description:
      'Master a chosen programming language sequentially through concept-by-concept theory, runnable code examples, practice quizzes, Monaco challenges, and optional mini-games.',
    targetRoute: '/learn',
    whyOptions: [
      'Academic Support',
      'Career Preparation',
      'Build My Own Projects',
      'Explore Programming',
      'Improve Problem Solving',
      'Learn for Fun'
    ]
  },
  {
    id: 'skill_check',
    title: 'Skill Check',
    subtitle: 'Diagnostic Coding Assessment',
    tagline: 'Test Coding Proficiency in 1 Language',
    icon: '⚡',
    color: 'from-amber-500 to-orange-500',
    accentColor: '#f59e0b',
    gradient: 'rgba(245, 158, 11, 0.15)',
    description:
      'Evaluate your current coding depth with timed algorithmic quizzes and Monaco coding tests. Receive an instant skill rating, strengths audit, and pinpoint improvement areas.',
    targetRoute: '/skill-check',
    whyOptions: [
      'Check My Current Level',
      'Find My Weak Areas',
      'Prepare for Interviews',
      'Track My Improvement',
      'Challenge Myself'
    ]
  },
  {
    id: 'career_path',
    title: 'Career Path',
    subtitle: 'Complete Field Roadmap',
    tagline: 'Learn All Skills Needed for a Tech Domain',
    icon: '🚀',
    color: 'from-emerald-500 to-teal-500',
    accentColor: '#10b981',
    gradient: 'rgba(16, 185, 129, 0.15)',
    description:
      'Choose an industry tech field (such as Data Analytics, Web Dev, or AI) and follow a comprehensive multi-skill curriculum from prerequisites to portfolio-ready capstones.',
    targetRoute: '/career',
    whyOptions: [
      'Academic Support',
      'Career Goal',
      'Job Preparation',
      'Build Skills for Industry',
      'Explore the Field',
      'Personal Interest'
    ]
  },
  {
    id: 'field_test',
    title: 'Field Test',
    subtitle: 'Multi-Skill Industry Exam',
    tagline: 'Measure Job Readiness Across an Entire Field',
    icon: '🎯',
    color: 'from-purple-600 to-indigo-500',
    accentColor: '#a855f7',
    gradient: 'rgba(168, 85, 247, 0.15)',
    description:
      'Test your composite readiness across all essential tools and methodologies required for your target field. Receive a comprehensive field competency report.',
    targetRoute: '/field-test',
    whyOptions: [
      'Check My Field Readiness',
      'Prepare for a Job',
      'Identify Skill Gaps',
      'Prepare for Interviews',
      'Measure My Knowledge',
      'Challenge Myself'
    ]
  },
  {
    id: 'soft_skill_journey',
    title: 'Soft Skill Journey',
    subtitle: 'Human & Leadership Growth',
    tagline: 'Build Essential Professional Capabilities',
    icon: '🌟',
    color: 'from-pink-500 to-rose-500',
    accentColor: '#ec4899',
    gradient: 'rgba(236, 72, 153, 0.15)',
    description:
      'Progressively master Communication, Leadership, Teamwork, Critical Thinking, and Workplace Adaptability with realistic situational scenarios and milestone check-ins.',
    targetRoute: '/soft-skills/learn',
    whyOptions: [
      'Academic Support',
      'Career Growth',
      'Improve Communication',
      'Become More Confident',
      'Prepare for Interviews',
      'Personal Development'
    ]
  },
  {
    id: 'soft_skill_check',
    title: 'Soft Skill Check',
    subtitle: 'Behavioral & Situational Assessment',
    tagline: 'Directly Test Your Professional Soft Skills',
    icon: '🏆',
    color: 'from-cyan-500 to-blue-600',
    accentColor: '#06b6d4',
    gradient: 'rgba(6, 182, 212, 0.15)',
    description:
      'Directly evaluate your interpersonal communication, problem solving, teamwork, and professional decision-making through adaptive difficulty tiers.',
    targetRoute: '/soft-skills/test',
    whyOptions: [
      'Know My Current Level',
      'Improve Weak Areas',
      'Prepare for Interviews',
      'Career Preparation',
      'Track My Growth',
      'Challenge Myself'
    ]
  }
]

export const EXPERIENCE_LEVELS: ExperienceLevelMeta[] = [
  {
    id: 'just_starting',
    title: "I'm just starting",
    subtitle: 'Zero or minimal background',
    description: 'Easiest onboarding pace, beginner-friendly guided practice, and foundational concepts.',
    icon: '🌱'
  },
  {
    id: 'know_basics',
    title: 'I know the basics',
    subtitle: 'Familiar with core concepts',
    description: 'Skip redundant introductions and dive into practical fundamentals and intermediate topics.',
    icon: '🌿'
  },
  {
    id: 'comfortable',
    title: "I'm comfortable",
    subtitle: 'Solid working experience',
    description: 'Moderate challenge level with applied problem solving, algorithmic puzzles, and real workflows.',
    icon: '🌳'
  },
  {
    id: 'advanced',
    title: "I'm advanced",
    subtitle: 'Deep expertise & high proficiency',
    description: 'Rigorous difficulty, edge cases, system optimization, and advanced architecture scenarios.',
    icon: '⚡'
  }
]
