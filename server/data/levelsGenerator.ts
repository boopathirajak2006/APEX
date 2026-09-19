import { GameLevel, DifficultyLevel, CodingLanguage, QuizQuestion, CodingChallenge } from '../../src/types'

// Boss level definitions
const BOSS_LEVELS: Record<number, { title: string; bossName: string }> = {
  10: { title: 'The Gatekeeper of Syntax', bossName: 'Byte Golem' },
  20: { title: 'The Maze of Branching Logic', bossName: 'Conditional Sphinx' },
  30: { title: 'The Infinite Spiral', bossName: 'Loop Leviathan' },
  40: { title: 'The Data Sanctum', bossName: 'Structure Titan' },
  50: { title: 'The Grand Core Pinnacle', bossName: 'Cyber Grandmaster Overlord' },
}

interface LevelTemplate {
  topic: string
  subtopic: string
  quizPrompts: { q: string; opts: string[]; correct: number; exp: string }[]
  challenge: {
    title: string
    instruction: string
    starterCode: (lang: CodingLanguage) => string
    testInput: string
    expectedOutput: string
  }
}

// Generate topic variations for the 50 levels in each difficulty
function getTopicForLevel(difficulty: DifficultyLevel, levelNum: number): LevelTemplate {
  if (difficulty === 'beginner') {
    const topics = [
      {
        topic: 'Output & Print Syntax',
        subtopic: 'Console Streams & Character Escapes',
        quizPrompts: [
          { q: 'What character is used to escape special characters in string literals?', opts: ['\\', '/', '#', '&'], correct: 0, exp: 'The backslash \\ is standard escape character.' },
          { q: 'Which statement properly prints two words separated by a space?', opts: ['print("Hello" + " " + "World")', 'print("Hello","World")', 'Both are correct', 'Neither'], correct: 2, exp: 'Both approaches produce "Hello World".' },
          { q: 'What is printed by: print(2 + 3 * 2)?', opts: ['10', '8', '12', 'Error'], correct: 1, exp: 'Operator precedence: multiplication happens before addition (2 + 6 = 8).' },
        ],
        challenge: {
          title: 'Hello Arena',
          instruction: 'Write code to output "Arena Level Ready".',
          starterCode: (lang) => lang === 'python' ? '# Write code to output Arena Level Ready\n' : '// Write code to output Arena Level Ready\n',
          testInput: '',
          expectedOutput: 'Arena Level Ready'
        }
      },
      {
        topic: 'Variables & State',
        subtopic: 'Dynamic Binding & Memory Slots',
        quizPrompts: [
          { q: 'Which data type is best suited for storing True or False?', opts: ['String', 'Integer', 'Boolean', 'Float'], correct: 2, exp: 'Booleans represent binary truth values.' },
          { q: 'What will be the value of x after: x = 10; x = x + 5; x = x * 2?', opts: ['20', '30', '15', '25'], correct: 1, exp: '10 + 5 = 15; 15 * 2 = 30.' },
          { q: 'Which identifier is invalid in standard syntax?', opts: ['_score', 'player1', 'total_xp', '9th_level'], correct: 3, exp: 'Variable identifiers cannot start with a digit.' },
        ],
        challenge: {
          title: 'Energy Multiplier',
          instruction: 'Given `base = 12` and `factor = 3`, calculate and print their product.',
          starterCode: (lang) => lang === 'python' ? 'base = 12\nfactor = 3\n# Calculate and print product\n' : 'const base = 12;\nconst factor = 3;\n// Calculate and print product\n',
          testInput: '',
          expectedOutput: '36'
        }
      },
      {
        topic: 'Conditionals & Gates',
        subtopic: 'Threshold Checks & Boolean Logic',
        quizPrompts: [
          { q: 'Which logical operator returns true only if BOTH operands are true?', opts: ['OR', 'AND', 'NOT', 'XOR'], correct: 1, exp: 'AND requires both conditions to be true.' },
          { q: 'What is the outcome of: not (5 > 2)?', opts: ['True', 'False', 'None', 'Error'], correct: 1, exp: '5 > 2 is True, so not True is False.' },
          { q: 'Which branch executes if all prior `if` and `elif` checks evaluate to false?', opts: ['finally', 'else', 'default', 'pass'], correct: 1, exp: 'The else block acts as the fallback catch-all.' },
        ],
        challenge: {
          title: 'Power Threshold Gate',
          instruction: 'Check if `power = 85` is greater than or equal to 75. If so, print "Access Granted", else print "Access Denied".',
          starterCode: (lang) => lang === 'python' ? 'power = 85\n# Check threshold and print Access Granted / Access Denied\n' : 'const power = 85;\n// Check threshold and print Access Granted / Access Denied\n',
          testInput: '',
          expectedOutput: 'Access Granted'
        }
      },
      {
        topic: 'Looping Mechanics',
        subtopic: 'Iteration Counters & Accumulators',
        quizPrompts: [
          { q: 'Which keyword immediately stops and exits a loop?', opts: ['continue', 'pass', 'break', 'return'], correct: 2, exp: 'break exits the loop immediately.' },
          { q: 'Which keyword skips the rest of the current iteration and jumps to the next?', opts: ['skip', 'continue', 'next', 'pass'], correct: 1, exp: 'continue jumps to the next loop cycle.' },
          { q: 'What danger exists with while loops that have no exit condition?', opts: ['Syntax Error', 'Infinite Loop', 'Stack Overflow', 'Memory Freeze'], correct: 1, exp: 'Without termination, the loop will run infinitely.' },
        ],
        challenge: {
          title: 'Sum Accumulator',
          instruction: 'Sum the numbers from 1 to 5 inclusive (1+2+3+4+5) and print the total.',
          starterCode: (lang) => lang === 'python' ? '# Sum 1 to 5 and print total\n' : '// Sum 1 to 5 and print total\n',
          testInput: '',
          expectedOutput: '15'
        }
      }
    ]
    return topics[(levelNum - 1) % topics.length]
  } else if (difficulty === 'medium') {
    const topics = [
      {
        topic: 'Arrays & Lists Matrix',
        subtopic: 'Index Slicing & Mutable Collections',
        quizPrompts: [
          { q: 'What is the index of the first element in 0-indexed arrays?', opts: ['0', '1', '-1', 'null'], correct: 0, exp: 'Arrays are 0-indexed in modern languages.' },
          { q: 'What method appends an element to the end of a list in Python?', opts: ['push()', 'add()', 'append()', 'insert()'], correct: 2, exp: 'append() adds an item to the end of a Python list.' },
          { q: 'What is the time complexity of looking up an array item by index?', opts: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correct: 0, exp: 'Direct index access in arrays is O(1) constant time.' },
        ],
        challenge: {
          title: 'Max Element Finder',
          instruction: 'Given an array `[14, 55, 32, 89, 4]`, find and print the maximum value.',
          starterCode: (lang) => lang === 'python' ? 'nums = [14, 55, 32, 89, 4]\n# Find and print max element\n' : 'const nums = [14, 55, 32, 89, 4];\n// Find and print max element\n',
          testInput: '',
          expectedOutput: '89'
        }
      },
      {
        topic: 'Key-Value Hash Maps',
        subtopic: 'Dictionary Lookups & Hash Collisions',
        quizPrompts: [
          { q: 'What is the average time complexity of key lookup in a Hash Table?', opts: ['O(1)', 'O(n)', 'O(n log n)', 'O(k)'], correct: 0, exp: 'Hash table lookups average O(1).' },
          { q: 'Can dictionary keys be mutable objects like lists in Python?', opts: ['Yes', 'No', 'Only if empty', 'Depends on OS'], correct: 1, exp: 'Keys must be immutable and hashable.' },
          { q: 'Which method returns all keys in a dictionary in Python?', opts: ['keys()', 'getAllKeys()', 'listKeys()', 'items()'], correct: 0, exp: 'dict.keys() returns a view of all dictionary keys.' },
        ],
        challenge: {
          title: 'Inventory Tally',
          instruction: 'Create an inventory dictionary `{"gems": 5, "potions": 12}`. Print the total count of potions.',
          starterCode: (lang) => lang === 'python' ? 'inv = {"gems": 5, "potions": 12}\n# Print total count of potions\n' : 'const inv = { gems: 5, potions: 12 };\n// Print total count of potions\n',
          testInput: '',
          expectedOutput: '12'
        }
      }
    ]
    return topics[(levelNum - 1) % topics.length]
  } else {
    // Advanced
    const topics = [
      {
        topic: 'Object-Oriented Architecture',
        subtopic: 'Polymorphism, Inheritance & Encapsulation',
        quizPrompts: [
          { q: 'Which OOP principle hides internal object state and only exposes safe methods?', opts: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'], correct: 1, exp: 'Encapsulation bundles data with methods and restricts direct access.' },
          { q: 'What keyword refers to the current instance in Python classes?', opts: ['this', 'self', 'me', 'instance'], correct: 1, exp: 'Python uses explicit `self` parameter.' },
          { q: 'What design pattern ensures a class has only one single active instance?', opts: ['Factory', 'Observer', 'Singleton', 'Adapter'], correct: 2, exp: 'The Singleton pattern restricts instantiation to a single object.' },
        ],
        challenge: {
          title: 'Hero Class Factory',
          instruction: 'Write a class `Hero` with property `name = "Cipher"` and method `get_power()` returning `100`. Print the power of an instance.',
          starterCode: (lang) => lang === 'python' ? '# Define class Hero and print power of instance\n' : '// Define class Hero and print power of instance\n',
          testInput: '',
          expectedOutput: '100'
        }
      },
      {
        topic: 'Recursion & Dynamic Programming',
        subtopic: 'Base Cases, Call Stacks & Memoization',
        quizPrompts: [
          { q: 'What happens if a recursive function lacks a valid base case?', opts: ['Returns 0', 'Stack Overflow Error', 'Infinite Loop', 'Compiler warning'], correct: 1, exp: 'Without a base case, recursion exceeds maximum call stack depth.' },
          { q: 'What technique caches previously computed subproblem results in DP?', opts: ['Garbage Collection', 'Memoization', 'Virtualization', 'Pointers'], correct: 1, exp: 'Memoization stores results of expensive function calls.' },
          { q: 'What is the space complexity of naive recursive Fibonacci of N?', opts: ['O(1)', 'O(N)', 'O(2^N)', 'O(N^2)'], correct: 1, exp: 'Maximum call stack depth is proportional to N.' },
        ],
        challenge: {
          title: 'Factorial Engine',
          instruction: 'Compute the factorial of 5 (5 * 4 * 3 * 2 * 1) and print the result.',
          starterCode: (lang) => lang === 'python' ? '# Compute factorial of 5 and print result\n' : '// Compute factorial of 5 and print result\n',
          testInput: '',
          expectedOutput: '120'
        }
      }
    ]
    return topics[(levelNum - 1) % topics.length]
  }
}

/**
 * Generates all 50 levels for a specific difficulty and language
 */
export function generateLevelsForDifficulty(language: CodingLanguage, difficulty: DifficultyLevel): GameLevel[] {
  const levels: GameLevel[] = []

  for (let levelNum = 1; levelNum <= 50; levelNum++) {
    const isBoss = BOSS_LEVELS[levelNum] !== undefined
    const bossMeta = BOSS_LEVELS[levelNum]
    const template = getTopicForLevel(difficulty, levelNum)

    const levelTitle = isBoss
      ? `BOSS: ${bossMeta.title}`
      : `Level ${levelNum}: ${template.topic}`

    const quizzes: QuizQuestion[] = template.quizPrompts.map((qp, qIdx) => ({
      id: `gq-${language}-${difficulty}-${levelNum}-${qIdx + 1}`,
      question: `[Level ${levelNum}] ${qp.q}`,
      options: qp.opts,
      correctOptionIndex: qp.correct,
      explanation: qp.exp,
      hint: `Recall concepts related to ${template.subtopic}.`
    }))

    const challenge: CodingChallenge = {
      id: `gc-${language}-${difficulty}-${levelNum}`,
      title: `${template.challenge.title} (Level ${levelNum})`,
      slug: `level-${levelNum}-challenge`,
      instruction: template.challenge.instruction,
      starterCode: template.challenge.starterCode(language),
      testCases: [
        {
          id: `tc-${language}-${difficulty}-${levelNum}-1`,
          input: template.challenge.testInput,
          expectedOutput: template.challenge.expectedOutput
        }
      ],
      xpReward: isBoss ? 250 : 50 + (levelNum * 2)
    }

    levels.push({
      id: `lvl-${language}-${difficulty}-${levelNum}`,
      levelNumber: levelNum,
      difficulty,
      language,
      title: levelTitle,
      isBoss,
      bossName: bossMeta?.bossName,
      quizzes,
      challenge,
      xpReward: isBoss ? 350 : 80 + (levelNum * 3),
      requiredStarsToUnlock: levelNum === 1 ? 0 : (levelNum - 1) * 2
    })
  }

  return levels
}

/**
 * Cache and retrieve game levels for all difficulties
 */
const levelsCache: Record<string, GameLevel[]> = {}

export function getGameLevels(language: CodingLanguage, difficulty: DifficultyLevel): GameLevel[] {
  const cacheKey = `${language}-${difficulty}`
  if (!levelsCache[cacheKey]) {
    levelsCache[cacheKey] = generateLevelsForDifficulty(language, difficulty)
  }
  return levelsCache[cacheKey]
}

export function getGameLevelById(language: CodingLanguage, difficulty: DifficultyLevel, levelNumber: number): GameLevel | undefined {
  const levels = getGameLevels(language, difficulty)
  return levels.find(l => l.levelNumber === levelNumber)
}
