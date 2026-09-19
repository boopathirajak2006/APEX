import { Achievement } from '../../src/types'

export const SYSTEM_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_transmission',
    title: 'First Transmission',
    description: 'Execute your first line of code in the cyber editor.',
    icon: '⚡',
    category: 'coding',
    rarity: 'common',
    xpReward: 50
  },
  {
    id: 'quiz_initiate',
    title: 'Quiz Initiate',
    description: 'Answer 10 quiz questions with 100% accuracy.',
    icon: '🧠',
    category: 'learning',
    rarity: 'common',
    xpReward: 100
  },
  {
    id: 'flame_keeper_3',
    title: 'Ignition Streak',
    description: 'Maintain an active daily coding streak for 3 days.',
    icon: '🔥',
    category: 'streak',
    rarity: 'rare',
    xpReward: 150
  },
  {
    id: 'flame_keeper_7',
    title: 'Cyber Flame',
    description: 'Maintain an active daily coding streak for 7 days.',
    icon: '🌟',
    category: 'streak',
    rarity: 'epic',
    xpReward: 300
  },
  {
    id: 'level_10_boss',
    title: 'Golem Vanquisher',
    description: 'Defeat Level 10 Boss: The Byte Golem.',
    icon: '🛡️',
    category: 'game',
    rarity: 'rare',
    xpReward: 200
  },
  {
    id: 'level_50_master',
    title: 'Apex Overlord',
    description: 'Conquer Level 50 and complete a full difficulty world.',
    icon: '👑',
    category: 'game',
    rarity: 'legendary',
    xpReward: 1000
  },
  {
    id: 'polyglot_apprentice',
    title: 'Polyglot Apprentice',
    description: 'Begin learning challenges across 3 or more programming languages.',
    icon: '🌐',
    category: 'special',
    rarity: 'epic',
    xpReward: 400
  },
  {
    id: 'speed_demon',
    title: 'Quantum Execution',
    description: 'Solve a coding challenge in under 30 seconds.',
    icon: '⏱️',
    category: 'coding',
    rarity: 'rare',
    xpReward: 150
  }
]
