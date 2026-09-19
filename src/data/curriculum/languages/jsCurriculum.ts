import type { CurriculumCategory, CurriculumTopic } from '../types'

export const JS_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'js-basics',
    title: 'JavaScript Runtime & Essentials',
    description: 'Execution context, variables (let/const), primitive data types, and control flow.',
    level: 'beginner',
    icon: '⚡',
    topicIds: ['js-intro', 'js-operators-control', 'js-loops']
  },
  {
    id: 'js-functions-objects',
    title: 'Functions, Arrays & ES6 Classes',
    description: 'Arrow functions, closures, array methods (map/filter), object destructuring, and classes.',
    level: 'intermediate',
    icon: '📦',
    topicIds: ['js-functions', 'js-arrays-objects', 'js-classes']
  },
  {
    id: 'js-async-dom',
    title: 'Asynchronous JavaScript & DOM',
    description: 'Event loop, Promises, async/await, DOM tree manipulation, and event handling.',
    level: 'advanced',
    icon: '🌐',
    topicIds: ['js-async', 'js-dom']
  }
]

export const JS_TOPICS: CurriculumTopic[] = [
  {
    id: 'js-intro',
    language: 'javascript',
    title: 'JavaScript Introduction & console.log()',
    slug: 'js-intro',
    category: 'JavaScript Runtime & Essentials',
    categoryId: 'js-basics',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 8,
    prerequisites: [],
    introduction: 'JavaScript is the high-level, dynamic, multi-paradigm scripting language of the World Wide Web and modern full-stack runtimes.',
    explanation: `JavaScript runs inside browser engines (like V8) and Node.js.

### Variable Declarations:
• \`const\`: Declares block-scoped immutable bindings (use by default).
• \`let\`: Declares block-scoped mutable variables.
• \`var\`: Legacy function-scoped declaration (avoid in modern JS).

### Primitives & Dynamic Typing:
JavaScript primitives include \`string\`, \`number\`, \`bigint\`, \`boolean\`, \`undefined\`, \`null\`, and \`symbol\`. Variables are dynamically typed and inspected using \`typeof\`.`,
    syntax: `const appName = "APEX Engine";
let activeUsers = 42;
console.log(appName + " Users: " + activeUsers);`,
    syntaxBreakdown: `• const : Block-scoped non-reassignable binding
• let : Block-scoped reassignable variable
• console.log(...) : Outputs formatted stream to developer console`,
    codeExamples: [
      {
        title: 'Modern Variable Binding and Logging',
        code: `const platform = "APEX";
let status = "ONLINE";
console.log(\`Platform: \${platform} | Status: \${status}\`);`,
        explanation: 'Uses ES6 template literals for clean variable interpolation.',
        output: 'Platform: APEX | Status: ONLINE'
      }
    ],
    practicalExamples: [
      {
        title: 'Inspecting Data Types',
        code: `console.log(typeof 42);          // "number"
console.log(typeof "APEX");      // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (legacy JS quirk)`,
        explanation: 'Shows output of typeof across primitives.',
        output: 'number\nstring\nboolean\nundefined\nobject'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Reassigning a `const` variable (e.g. `const x = 1; x = 2;`).',
        correction: 'Use `let` if the variable requires reassignment.',
        explanation: 'Reassigning a const variable throws a TypeError.'
      }
    ],
    keyPoints: [
      'Prefer const by default; use let only when reassignment is required.',
      'Template literals (backticks `...`) allow ${expression} interpolation.',
      'typeof null returns "object" due to historic legacy JS behavior.'
    ],
    hint: {
      summary: 'const for constants, let for variables; console.log() for output; template literals use backticks.',
      keyRules: [
        'Do not use var in modern code.',
        'Use `Hello ${name}` for string interpolation.',
        'Check types with typeof.'
      ],
      cheatsheetMarkdown: `\`\`\`js
const name = "Aria";
let count = 0;
console.log(\`User: \${name}\`);
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-js-intro-1',
        title: 'Template Literal Output',
        instruction: 'Declare `const track = "JavaScript"`. Log `Track: ${track}`.',
        starterCode: `// Write JavaScript code
`,
        solutionCode: `const track = "JavaScript";
console.log(\`Track: \${track}\`);`
      }
    ],
    quizzes: [
      {
        id: 'q-js-intro-1',
        question: 'Which variable keyword should be used by default in modern JavaScript for values that are not reassigned?',
        options: ['var', 'const', 'let', 'static'],
        correctOptionIndex: 1,
        explanation: 'const creates block-scoped immutable bindings and prevents unintended reassignment.'
      },
      {
        id: 'q-js-intro-2',
        question: 'What is the output of `console.log(typeof null)` in JavaScript?',
        options: ['"null"', '"object"', '"undefined"', '"number"'],
        correctOptionIndex: 1,
        explanation: 'typeof null returning "object" is a historic legacy quirk in the original JavaScript implementation.'
      },
      {
        id: 'q-js-intro-3',
        question: 'Which syntax creates an ES6 template literal supporting variable interpolation?',
        options: [
          'Backticks `` `Hello ${name}` ``',
          'Double quotes `"Hello ${name}"`',
          'Single quotes `\'Hello ${name}\'`',
          'Parentheses `(Hello $name)`'
        ],
        correctOptionIndex: 0,
        explanation: 'Template literals are enclosed by backticks `` `...` ``.'
      },
      {
        id: 'q-js-intro-4',
        question: 'What scope do `let` and `const` variables have in JavaScript?',
        options: ['Function scope', 'Block scope ({ ... })', 'Global scope only', 'Module scope only'],
        correctOptionIndex: 1,
        explanation: 'let and const are block-scoped to the nearest enclosing curly braces.'
      },
      {
        id: 'q-js-intro-5',
        question: 'What error is thrown if you try to reassign a `const` variable?',
        options: ['SyntaxError', 'TypeError', 'ReferenceError', 'RangeError'],
        correctOptionIndex: 1,
        explanation: 'Reassigning a const variable throws `TypeError: Assignment to constant variable`.'
      }
    ],
    codingChallenge: {
      id: 'js-ch-intro',
      title: 'JavaScript Transmitter',
      slug: 'js-transmitter',
      instruction: 'Print "JavaScript Engine Online".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-js-intro-1',
          input: '',
          expectedOutput: 'JavaScript Engine Online'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'js-operators-control'
  },
  {
    id: 'js-operators-control',
    language: 'javascript',
    title: 'Operators, Strict Equality & Control Flow',
    slug: 'js-operators-control',
    category: 'JavaScript Runtime & Essentials',
    categoryId: 'js-basics',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 10,
    prerequisites: ['js-intro'],
    introduction: 'JavaScript features loose vs strict equality comparison and truthy/falsy evaluation rules.',
    explanation: `### Strict Equality (\`===\`) vs Loose Equality (\`==\`):
• \`===\` (Strict Equality): Checks both value and type without type coercion (\`5 === "5"\` is \`false\`).
• \`==\` (Loose Equality): Performs implicit type coercion (\`5 == "5"\` is \`true\`). Always use \`===\`!

### Falsy Values in JavaScript:
The following 8 values are strictly falsy:
\`false\`, \`0\`, \`-0\`, \`0n\`, \`""\` (empty string), \`null\`, \`undefined\`, \`NaN\`. Everything else (including \`[]\` and \`{}\`) is truthy!`,
    syntax: `const score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else {
    console.log("Grade: C");
}`,
    syntaxBreakdown: `• === : Strict equality comparing type and value
• !== : Strict inequality
• ?? : Nullish coalescing operator (checks null/undefined only)`,
    codeExamples: [
      {
        title: 'Strict Equality and Ternary Operator',
        code: `const val = 100;
const status = (val === 100) ? "PERFECT" : "RETRY";
console.log("Result: " + status);`,
        explanation: 'Evaluates ternary condition using strict equality.',
        output: 'Result: PERFECT'
      }
    ],
    practicalExamples: [
      {
        title: 'Nullish Coalescing (??)',
        code: `const userConfig = null;
const finalConfig = userConfig ?? "Default Settings";
console.log(finalConfig);`,
        explanation: 'Provides fallback when value is null or undefined.',
        output: 'Default Settings'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using loose equality `==` causing unexpected type coercion (e.g. `0 == ""` is true).',
        correction: 'Always use strict equality `===` and strict inequality `!==`.',
        explanation: 'Strict equality eliminates subtle coercion bugs.'
      }
    ],
    keyPoints: [
      'Always prefer === over == to prevent silent type conversions.',
      'Empty arrays [] and objects {} are truthy in JavaScript.',
      'The nullish coalescing operator ?? checks specifically for null/undefined.'
    ],
    hint: {
      summary: 'Use === for strict equality; falsy values: false, 0, "", null, undefined, NaN.',
      keyRules: [
        'Always use === and !==.',
        '[] and {} are truthy.',
        'Nullish coalescing: a ?? b'
      ],
      cheatsheetMarkdown: `\`\`\`js
if (x === 10) { /* ... */ }
const name = inputName ?? "Guest";
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-js-op-1',
        title: 'Strict Equality Check',
        instruction: 'If `const x = 50`, test if `x === 50` and print "Match: True".',
        starterCode: `const x = 50;
// Test and print "Match: True"
`,
        solutionCode: `const x = 50;
if (x === 50) {
    console.log("Match: True");
}`
      }
    ],
    quizzes: [
      {
        id: 'q-js-op-1',
        question: 'What does `5 === "5"` evaluate to in JavaScript?',
        options: ['true', 'false', 'NaN', 'TypeError'],
        correctOptionIndex: 1,
        explanation: 'Strict equality === verifies matching types; number !== string.'
      },
      {
        id: 'q-js-op-2',
        question: 'Which of the following values is TRUTHY in JavaScript boolean evaluation?',
        options: ['0', '"" (empty string)', '[] (empty array)', 'null'],
        correctOptionIndex: 2,
        explanation: 'All objects (including empty arrays `[]` and empty objects `{}`) evaluate to truthy.'
      },
      {
        id: 'q-js-op-3',
        question: 'What does the nullish coalescing operator `??` check for?',
        options: [
          'Only `null` and `undefined`',
          'All falsy values (including 0 and "")',
          'Only boolean false',
          'Only NaN'
        ],
        correctOptionIndex: 0,
        explanation: '`??` returns the right-hand operand only if the left-hand operand is null or undefined.'
      },
      {
        id: 'q-js-op-4',
        question: 'What will `console.log([1, 2] + [3, 4])` output in JavaScript due to type coercion?',
        options: ['[1, 2, 3, 4]', '"1,23,4"', 'NaN', 'Error'],
        correctOptionIndex: 1,
        explanation: 'The + operator coerces arrays to strings ("1,2" + "3,4") producing "1,23,4".'
      },
      {
        id: 'q-js-op-5',
        question: 'What is the ternary operator syntax in JavaScript?',
        options: ['condition ? exprIfTrue : exprIfFalse', 'if condition then a else b', 'condition ?? a : b', 'condition -> a | b'],
        correctOptionIndex: 0,
        explanation: 'The ternary conditional operator syntax is `condition ? valTrue : valFalse`.'
      }
    ],
    codingChallenge: {
      id: 'js-ch-operators',
      title: 'Conditional Grade Evaluator',
      slug: 'js-conditional-grade',
      instruction: 'If score = 88, output "PASSED_WITH_HONORS".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-js-op-1',
          input: '',
          expectedOutput: 'PASSED_WITH_HONORS'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'js-loops'
  },
  {
    id: 'js-loops',
    language: 'javascript',
    title: 'Loops: for, for...of, for...in & while',
    slug: 'js-loops',
    category: 'JavaScript Runtime & Essentials',
    categoryId: 'js-basics',
    level: 'beginner',
    order: 3,
    estimatedMinutes: 10,
    prerequisites: ['js-operators-control'],
    introduction: 'Loops iterate over sequences, iterable data structures, and object keys in JavaScript.',
    explanation: `### JavaScript Loop Varieties:
• \`for (let i = 0; i < N; i++)\`: Classic index-based loop.
• \`for (const item of iterable)\`: Iterates over values of arrays, strings, Sets, Maps.
• \`for (const key in object)\`: Iterates over enumerable keys/properties of an object.
• \`while (condition)\` & \`do...while (condition)\`.`,
    syntax: `const items = ["A", "B", "C"];
for (const item of items) {
    console.log(item);
}`,
    syntaxBreakdown: `• for (const item of array) : Iterates over elements directly
• for (const key in object) : Iterates over property keys`,
    codeExamples: [
      {
        title: 'for...of Iteration on Array',
        code: `const tools = ["Vite", "React", "Node"];
for (const tool of tools) {
    console.log("Tool: " + tool);
}`,
        explanation: 'Iterates array values cleanly.',
        output: 'Tool: Vite\nTool: React\nTool: Node'
      }
    ],
    practicalExamples: [
      {
        title: 'Object Key Enumeration with for...in',
        code: `const config = { host: "localhost", port: 5173 };
for (const key in config) {
    console.log(\`\${key} -> \${config[key]}\`);
}`,
        explanation: 'Enumerates object properties.',
        output: 'host -> localhost\nport -> 5173'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `for...in` on arrays when expecting element values.',
        correction: 'Use `for...of` to get array values; `for...in` returns string index keys ("0", "1").',
        explanation: '`for...of` accesses iterable values; `for...in` accesses property keys.'
      }
    ],
    keyPoints: [
      'Use for...of for arrays and iterables.',
      'Use for...in for object property keys.',
      'break exits loops; continue advances to next iteration.'
    ],
    hint: {
      summary: 'for...of iterates array values; for...in iterates object keys.',
      keyRules: [
        'for (const x of array) for values.',
        'for (const k in obj) for keys.',
        'Classic for (let i=0; i<N; i++) for index counts.'
      ],
      cheatsheetMarkdown: `\`\`\`js
for (const val of [1, 2, 3]) { console.log(val); }
for (const key in { a: 1, b: 2 }) { console.log(key); }
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-js-loop-1',
        title: 'Sum with for...of',
        instruction: 'Iterate over `[10, 20, 30]` with for...of and log "Sum: 60".',
        starterCode: `const nums = [10, 20, 30];
// Sum and log "Sum: 60"
`,
        solutionCode: `const nums = [10, 20, 30];
let sum = 0;
for (const n of nums) sum += n;
console.log("Sum: " + sum);`
      }
    ],
    quizzes: [
      {
        id: 'q-js-loop-1',
        question: 'Which loop construct is recommended to iterate directly over the values of an Array in modern JavaScript?',
        options: ['for...in', 'for...of', 'while...in', 'loop...of'],
        correctOptionIndex: 1,
        explanation: '`for...of` iterates directly over values of iterable objects like Arrays.'
      },
      {
        id: 'q-js-loop-2',
        question: 'What does `for (const key in object)` iterate over?',
        options: ['Object values', 'Enumerable property keys/names', 'Byte indices', 'Prototype functions only'],
        correctOptionIndex: 1,
        explanation: 'for...in iterates over the enumerable keys of an object.'
      },
      {
        id: 'q-js-loop-3',
        question: 'What happens if you use `for (const x of { a: 1, b: 2 })` on a plain JavaScript object?',
        options: [
          'Throws TypeError: object is not iterable',
          'Iterates keys automatically',
          'Iterates values',
          'Logs undefined'
        ],
        correctOptionIndex: 0,
        explanation: 'Plain JS objects do not implement the Symbol.iterator protocol.'
      },
      {
        id: 'q-js-loop-4',
        question: 'Which statement skips the rest of the current loop iteration and starts the next one?',
        options: ['break', 'continue', 'skip', 'pass'],
        correctOptionIndex: 1,
        explanation: 'continue skips the rest of the current iteration body.'
      },
      {
        id: 'q-js-loop-5',
        question: 'What loop is guaranteed to execute at least one time before evaluating its termination condition?',
        options: ['for', 'while', 'do...while', 'for...of'],
        correctOptionIndex: 2,
        explanation: 'do...while tests condition at the end of the iteration block.'
      }
    ],
    codingChallenge: {
      id: 'js-ch-loops',
      title: 'Loop Array Accumulator',
      slug: 'js-loop-accumulator',
      instruction: 'Multiply numbers [2, 3, 4] and print "Product: 24".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-js-loop-1',
          input: '',
          expectedOutput: 'Product: 24'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'js-functions'
  },
  {
    id: 'js-functions',
    language: 'javascript',
    title: 'Functions, Arrow Syntax & Closures',
    slug: 'js-functions',
    category: 'Functions, Arrays & ES6 Classes',
    categoryId: 'js-functions-objects',
    level: 'intermediate',
    order: 4,
    estimatedMinutes: 12,
    prerequisites: ['js-loops'],
    introduction: 'Functions in JavaScript are first-class citizens that can be assigned to variables, passed as callbacks, and return other functions (closures).',
    explanation: `### Arrow Functions (\`() => {}\`):
• Concise syntax with implicit returns for single expressions:
  \`const double = x => x * 2;\`
• Lexical \`this\` binding (arrow functions inherit \`this\` from their enclosing scope).

### Closures:
A closure is the combination of a function bundled together with references to its surrounding lexical environment. Inner functions retain access to outer function variables even after the outer function has returned.`,
    syntax: `// Arrow function with implicit return
const add = (a, b) => a + b;

// Closure factory
function makeCounter() {
    let count = 0;
    return () => ++count;
}
const counter = makeCounter();
console.log(counter()); // 1`,
    syntaxBreakdown: `• (args) => expr : Concise arrow function with implicit return
• Closure : Function retaining access to outer lexical scope variables`,
    codeExamples: [
      {
        title: 'Closure Counter Function',
        code: `function createMultiplier(factor) {
    return (x) => x * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("Double 5: " + double(5));
console.log("Triple 5: " + triple(5));`,
        explanation: 'Inner arrow functions close over the factor parameter.',
        output: 'Double 5: 10\nTriple 5: 15'
      }
    ],
    practicalExamples: [
      {
        title: 'Default Parameters and Rest Parameters',
        code: `const sumAll = (initial = 0, ...numbers) => {
    return numbers.reduce((acc, n) => acc + n, initial);
};

console.log("Sum: " + sumAll(10, 1, 2, 3));`,
        explanation: 'Uses default argument and rest parameter (...args).',
        output: 'Sum: 16'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using an arrow function as an object method when `this` access is needed.',
        correction: 'Use standard method syntax `method() { this.x; }`.',
        explanation: 'Arrow functions do not bind their own `this` context.'
      }
    ],
    keyPoints: [
      'Functions are first-class objects in JavaScript.',
      'Arrow functions inherit lexical `this`.',
      'Closures allow functions to maintain private persistent state.'
    ],
    hint: {
      summary: 'Arrow functions: (a, b) => a + b; Closures remember variables from their outer enclosing scope.',
      keyRules: [
        'Single expression arrow functions return implicitly.',
        'Arrow functions have lexical this.',
        'Rest parameters: (...args) collects remaining arguments.'
      ],
      cheatsheetMarkdown: `\`\`\`js
const sq = x => x * x;
const add = (a, b = 0) => a + b;
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-js-func-1',
        title: 'Arrow Function Multiply',
        instruction: 'Create arrow function `const mul = (a, b) => a * b`. Log `mul(6, 7)` formatted as "Result: 42".',
        starterCode: `// Write arrow function
`,
        solutionCode: `const mul = (a, b) => a * b;
console.log("Result: " + mul(6, 7));`
      }
    ],
    quizzes: [
      {
        id: 'q-js-func-1',
        question: 'What is a "Closure" in JavaScript?',
        options: [
          'A function that retains access to variables from its outer lexical scope even after the outer function has finished executing',
          'A method that closes the browser window',
          'A loop termination keyword',
          'A syntax error'
        ],
        correctOptionIndex: 0,
        explanation: 'Closures capture and preserve lexical scope environments.'
      },
      {
        id: 'q-js-func-2',
        question: 'How do arrow functions handle the `this` keyword in JavaScript?',
        options: [
          'They bind their own new this context dynamically',
          'They inherit `this` lexically from their enclosing parent scope',
          'this is always null in arrow functions',
          'this is set to window'
        ],
        correctOptionIndex: 1,
        explanation: 'Arrow functions capture `this` from the enclosing lexical context.'
      },
      {
        id: 'q-js-func-3',
        question: 'What is the return value of `const f = (x) => x * 3; f(4)`?',
        options: ['12', 'undefined', 'NaN', 'Error'],
        correctOptionIndex: 0,
        explanation: 'Single-expression arrow functions evaluate and return the expression implicitly.'
      },
      {
        id: 'q-js-func-4',
        question: 'Which syntax allows a JavaScript function to accept an indefinite number of arguments as an array?',
        options: ['...args (Rest parameter)', 'args[]', '*args', '&args'],
        correctOptionIndex: 0,
        explanation: 'Rest parameters `...args` gather remaining arguments into a true array.'
      },
      {
        id: 'q-js-func-5',
        question: 'What happens if a parameter with a default value `function test(x = 10)` is invoked as `test(undefined)`?',
        options: ['x becomes 10 (default value applies)', 'x becomes undefined', 'Throws error', 'x becomes 0'],
        correctOptionIndex: 0,
        explanation: 'Passing undefined triggers default parameter assignment.'
      }
    ],
    codingChallenge: {
      id: 'js-ch-functions',
      title: 'Closure Multiplier Engine',
      slug: 'js-closure-multiplier',
      instruction: 'Output "CLOSURE_CALC: 50".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-js-func-1',
          input: '',
          expectedOutput: 'CLOSURE_CALC: 50'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'js-arrays-objects'
  },
  {
    id: 'js-arrays-objects',
    language: 'javascript',
    title: 'Array Transforms (map, filter, reduce) & Destructuring',
    slug: 'js-arrays-objects',
    category: 'Functions, Arrays & ES6 Classes',
    categoryId: 'js-functions-objects',
    level: 'intermediate',
    order: 5,
    estimatedMinutes: 14,
    prerequisites: ['js-functions'],
    introduction: 'Modern functional array methods transform collections immutably, while destructuring extracts properties into named variables.',
    explanation: `### Core Functional Array Methods:
• \`map(fn)\`: Returns a new array with results of calling \`fn\` on every element.
• \`filter(fn)\`: Returns a new array containing only elements that pass the predicate test (\`true\`).
• \`reduce(fn, init)\`: Accumulates elements into a single aggregated value.

### Destructuring & Spread:
• Array destructuring: \`const [first, second] = [10, 20];\`
• Object destructuring: \`const { name, level } = user;\`
• Spread operator: \`const copy = [...arr, 99];\``,
    syntax: `const nums = [1, 2, 3, 4];
const evensDoubled = nums
    .filter(n => n % 2 === 0)
    .map(n => n * 2); // [4, 8]`,
    syntaxBreakdown: `• .map() : Transform 1-to-1
• .filter() : Filter by boolean predicate
• .reduce((acc, curr) => acc + curr, 0) : Aggregate sum
• { prop } = obj : Object property destructuring`,
    codeExamples: [
      {
        title: 'Chaining Filter, Map and Reduce',
        code: `const scores = [65, 80, 95, 40, 90];
const honorTotal = scores
    .filter(s => s >= 80)
    .map(s => s + 5)
    .reduce((sum, s) => sum + s, 0);

console.log("Honor Total: " + honorTotal);`,
        explanation: 'Filters high scores, adds bonus, and sums total.',
        output: 'Honor Total: 280'
      }
    ],
    practicalExamples: [
      {
        title: 'Object and Array Destructuring',
        code: `const player = { id: 101, username: "Cipher", rank: "Master" };
const { username, rank } = player;
console.log(\`\${username} is rank \${rank}\`);`,
        explanation: 'Extracts properties into local variables cleanly.',
        output: 'Cipher is rank Master'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mutating original arrays inside `.map()` or `.filter()`.',
        correction: 'Keep map/filter functions pure without side effects.',
        explanation: 'Functional methods should produce new data structures without modifying inputs.'
      }
    ],
    keyPoints: [
      'map, filter, and reduce create new arrays without mutating the source.',
      'Destructuring unpacks object properties and array elements cleanly.',
      'Spread operator (...) creates shallow copies of arrays and objects.'
    ],
    hint: {
      summary: 'map transforms, filter filters, reduce aggregates; destructuring unpacks values.',
      keyRules: [
        'map returns same length array.',
        'filter returns subset array.',
        'const { a, b } = obj unpacks keys.'
      ],
      cheatsheetMarkdown: `\`\`\`js
const doubled = [1, 2].map(x => x * 2); // [2, 4]
const evens = [1, 2, 3].filter(x => x % 2 === 0); // [2]
const sum = [1, 2].reduce((a, b) => a + b, 0); // 3
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-js-arr-1',
        title: 'Filter and Map Array',
        instruction: 'Given `[1, 2, 3, 4]`, filter evens, multiply each by 3, and log "Result: [6, 12]".',
        starterCode: `const nums = [1, 2, 3, 4];
// Transform and log "Result: [6, 12]"
`,
        solutionCode: `const nums = [1, 2, 3, 4];
const res = nums.filter(x => x % 2 === 0).map(x => x * 3);
console.log("Result: [" + res.join(", ") + "]");`
      }
    ],
    quizzes: [
      {
        id: 'q-js-arr-1',
        question: 'Which array method transforms every element and returns a new array of identical length?',
        options: ['filter()', 'map()', 'reduce()', 'forEach()'],
        correctOptionIndex: 1,
        explanation: 'map() returns a new array with the return value of the callback applied to each item.'
      },
      {
        id: 'q-js-arr-2',
        question: 'What is the return value of `[1, 2, 3, 4].reduce((sum, n) => sum + n, 10)`?',
        options: ['10', '20 (10 + 1 + 2 + 3 + 4)', '24', '40'],
        correctOptionIndex: 1,
        explanation: 'reduce starts with initial value 10 and accumulates 1+2+3+4 = 20.'
      },
      {
        id: 'q-js-arr-3',
        question: 'What does the spread operator `[...arr1, ...arr2]` do?',
        options: [
          'Creates a new concatenated shallow copy array containing elements of arr1 and arr2',
          'Multiplies the two arrays',
          'Sorts the arrays',
          'Deletes duplicates'
        ],
        correctOptionIndex: 0,
        explanation: 'Spread unpacks elements into a new array literal.'
      },
      {
        id: 'q-js-arr-4',
        question: 'How do you extract property `age` from object `const user = { name: "Aria", age: 25 }` using destructuring?',
        options: ['const { age } = user;', 'const [ age ] = user;', 'const age = user->age;', 'const { user.age } = user;'],
        correctOptionIndex: 0,
        explanation: '`const { age } = user;` unpacks the age property.'
      },
      {
        id: 'q-js-arr-5',
        question: 'Does the `.filter()` method mutate (modify) the original source array in JavaScript?',
        options: ['Yes', 'No, it returns a new filtered array', 'Only in strict mode', 'Only for numbers'],
        correctOptionIndex: 1,
        explanation: 'filter() is immutable and returns a fresh array.'
      }
    ],
    codingChallenge: {
      id: 'js-ch-arrays',
      title: 'Functional Array Multiplier',
      slug: 'js-functional-multiplier',
      instruction: 'Sum `[1, 2, 3, 4]` filtered for evens multiplied by 5 (2*5 + 4*5 = 30). Print "Total: 30".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-js-arr-1',
          input: '',
          expectedOutput: 'Total: 30'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'js-classes'
  },
  {
    id: 'js-classes',
    language: 'javascript',
    title: 'ES6 Classes, Inheritance & Prototypes',
    slug: 'js-classes',
    category: 'Functions, Arrays & ES6 Classes',
    categoryId: 'js-functions-objects',
    level: 'intermediate',
    order: 6,
    estimatedMinutes: 12,
    prerequisites: ['js-arrays-objects'],
    introduction: 'ES6 classes provide clean object-oriented syntax over JavaScript\'s underlying prototypal inheritance model.',
    explanation: `### Class Syntax:
• \`constructor(...)\`: Initializes instance fields upon \`new ClassName(...)\`.
• Methods are defined directly in the class body.
• \`extends\`: Inherits from a parent class.
• \`super(...)\`: Calls the parent class constructor.
• Private fields: Prefix field names with \`#\` (e.g. \`#secretKey\`).`,
    syntax: `class Agent {
    #id;
    constructor(name, id) {
        this.name = name;
        this.#id = id;
    }
    
    getDetails() {
        return \`\${this.name} [#\${this.#id}]\`;
    }
}`,
    syntaxBreakdown: `• class Name { ... } : ES6 class declaration
• constructor(...) : Instance initialization method
• #privateField : Hard private member encapsulation
• extends / super() : Prototypal inheritance syntax`,
    codeExamples: [
      {
        title: 'Class Inheritance with Extends and Super',
        code: `class User {
    constructor(username) {
        this.username = username;
    }
    greet() {
        return "Hello " + this.username;
    }
}

class Admin extends User {
    constructor(username, role) {
        super(username);
        this.role = role;
    }
    getRole() {
        return this.username + " is " + this.role;
    }
}

const admin = new Admin("Cipher", "RootAdmin");
console.log(admin.greet());
console.log(admin.getRole());`,
        explanation: 'Admin inherits greet() from User and extends with getRole().',
        output: 'Hello Cipher\nCipher is RootAdmin'
      }
    ],
    practicalExamples: [
      {
        title: 'Static Factory Method',
        code: `class Session {
    constructor(id) { this.id = id; }
    static createDefault() {
        return new Session("GUEST_001");
    }
}

const s = Session.createDefault();
console.log("Session ID: " + s.id);`,
        explanation: 'Static methods belong to class constructor.',
        output: 'Session ID: GUEST_001'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `this` in a subclass constructor before calling `super()`.',
        correction: 'Always invoke `super()` first in derived class constructors.',
        explanation: 'JavaScript requires super() before accessing `this` in subclass constructors.'
      }
    ],
    keyPoints: [
      'ES6 classes are syntactic sugar over prototypal inheritance.',
      'Use # prefix for true private class fields.',
      'Always call super() first in derived constructors.'
    ],
    hint: {
      summary: 'class A extends B { constructor() { super(); } }; #field for private members.',
      keyRules: [
        'Call super() before using `this` in subclasses.',
        'Methods do not need function keyword.',
        'Prefix private fields with #.'
      ],
      cheatsheetMarkdown: `\`\`\`js
class Animal {
    constructor(name) { this.name = name; }
    speak() { return \`\${this.name} speaks\`; }
}
class Dog extends Animal {
    speak() { return \`\${this.name} barks\`; }
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-js-cls-1',
        title: 'Create Rectangle Class',
        instruction: 'Create class `Rectangle` with constructor(w, h) and `getArea()`. Test with w=10, h=5, log "Area: 50".',
        starterCode: `// Define Rectangle class
`,
        solutionCode: `class Rectangle {
    constructor(w, h) { this.w = w; this.h = h; }
    getArea() { return this.w * this.h; }
}
const r = new Rectangle(10, 5);
console.log("Area: " + r.getArea());`
      }
    ],
    quizzes: [
      {
        id: 'q-js-cls-1',
        question: 'Which keyword creates class inheritance in modern JavaScript?',
        options: ['inherits', 'extends', 'implements', 'prototype'],
        correctOptionIndex: 1,
        explanation: '`class Child extends Parent` establishes class inheritance.'
      },
      {
        id: 'q-js-cls-2',
        question: 'What must be called before accessing `this` inside a subclass constructor in JavaScript?',
        options: ['super()', 'this.init()', 'parent()', 'Object.create()'],
        correctOptionIndex: 0,
        explanation: 'super() initializes the superclass instance before `this` is accessible.'
      },
      {
        id: 'q-js-cls-3',
        question: 'How are truly private class fields declared in modern JavaScript?',
        options: ['Prefix field name with # (e.g. `#password`)', 'private password', '_password only', 'const password'],
        correctOptionIndex: 0,
        explanation: '#field syntax creates private fields enforced by the JavaScript engine.'
      },
      {
        id: 'q-js-cls-4',
        question: 'What is the underlying inheritance mechanism behind ES6 classes in JavaScript?',
        options: ['Prototypal Inheritance', 'Classical C++ memory vtables', 'Direct RAM copying', 'Bytecode injection'],
        correctOptionIndex: 0,
        explanation: 'ES6 classes are syntactic sugar on top of JavaScript\'s prototype chain.'
      },
      {
        id: 'q-js-cls-5',
        question: 'How do you call a static method `calc()` defined on `class MathUtil`?',
        options: ['MathUtil.calc()', 'new MathUtil().calc()', 'MathUtil->calc()', 'calc.MathUtil()'],
        correctOptionIndex: 0,
        explanation: 'Static methods are invoked directly on the class identifier.'
      }
    ],
    codingChallenge: {
      id: 'js-ch-classes',
      title: 'Class Inheritance Output',
      slug: 'js-class-inheritance',
      instruction: 'Output "CLASS_INSTANCE_READY: Aria".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-js-cls-1',
          input: '',
          expectedOutput: 'CLASS_INSTANCE_READY: Aria'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'js-async'
  },
  {
    id: 'js-async',
    language: 'javascript',
    title: 'Asynchronous JavaScript: Promises & async/await',
    slug: 'js-async',
    category: 'Asynchronous JavaScript & DOM',
    categoryId: 'js-async-dom',
    level: 'advanced',
    order: 7,
    estimatedMinutes: 14,
    prerequisites: ['js-classes'],
    introduction: 'JavaScript uses a single-threaded Event Loop architecture to handle asynchronous I/O, API calls, and timers without blocking execution.',
    explanation: `### The Event Loop & Promises:
• **Promise States:** \`pending\` $\\rightarrow$ \`fulfilled\` (resolved) or \`rejected\`.
• **\`async / await\`**: Syntactic sugar making asynchronous promise code read synchronously.
• Functions marked \`async\` always return a Promise.
• \`await\` pauses execution inside an async function until the promise settles.`,
    syntax: `async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Fetch failed: " + err.message);
    }
}`,
    syntaxBreakdown: `• async function : Declares asynchronous function returning Promise
• await promise : Non-blocking wait for promise fulfillment
• try / catch : Standard synchronous error handling syntax for promises`,
    codeExamples: [
      {
        title: 'Async/Await Data Resolution',
        code: `const fetchTelemetry = () => new Promise(resolve => {
    resolve({ status: "ONLINE", latency: 24 });
});

async function main() {
    console.log("Connecting...");
    const data = await fetchTelemetry();
    console.log("Status: " + data.status + " (" + data.latency + "ms)");
}

main();`,
        explanation: 'Awaits promise resolution without callback hell.',
        output: 'Connecting...\nStatus: ONLINE (24ms)'
      }
    ],
    practicalExamples: [
      {
        title: 'Parallel Execution with Promise.all',
        code: `const p1 = Promise.resolve("Users Loaded");
const p2 = Promise.resolve("Scores Loaded");

Promise.all([p1, p2]).then(([r1, r2]) => {
    console.log(r1 + " & " + r2);
});`,
        explanation: 'Executes multiple promises concurrently.',
        output: 'Users Loaded & Scores Loaded'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `await` outside an `async` function (without ES module top-level await).',
        correction: 'Wrap `await` in an `async function` or use top-level await in ES modules.',
        explanation: '`await` keyword requires an asynchronous execution context.'
      },
      {
        mistake: 'Forgetting error handling (unhandled promise rejection).',
        correction: 'Always wrap `await` calls in `try...catch` blocks.',
        explanation: 'Unhandled promise rejections can crash Node.js processes.'
      }
    ],
    keyPoints: [
      'The Event Loop processes microtasks (Promises) before macrotasks (setTimeout).',
      'async functions always return a Promise.',
      'Use Promise.all() to run independent asynchronous tasks concurrently.'
    ],
    hint: {
      summary: 'async functions return Promises; await pauses inside async functions until resolved.',
      keyRules: [
        'Wrap await in try...catch.',
        'Use Promise.all([p1, p2]) for concurrent tasks.',
        'async functions always return a Promise.'
      ],
      cheatsheetMarkdown: `\`\`\`js
async function getData() {
    try {
        const res = await fetch("/api");
        return await res.json();
    } catch (e) {
        console.error(e);
    }
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-js-async-1',
        title: 'Resolve Promise Async',
        instruction: 'Create `const resolveTask = () => Promise.resolve("Done")`. Await in async function and print "Task: Done".',
        starterCode: `// Write async resolution
`,
        solutionCode: `const resolveTask = () => Promise.resolve("Done");
async function run() {
    const res = await resolveTask();
    console.log("Task: " + res);
}
run();`
      }
    ],
    quizzes: [
      {
        id: 'q-js-async-1',
        question: 'What does a function marked with the `async` keyword always return in JavaScript?',
        options: ['A Promise', 'A generator', 'A callback function', 'undefined'],
        correctOptionIndex: 0,
        explanation: 'async functions wrap their return value in a Promise automatically.'
      },
      {
        id: 'q-js-async-2',
        question: 'What does `await` do when placed before a Promise inside an `async` function?',
        options: [
          'Pauses execution of the async function in a non-blocking manner until the Promise settles',
          'Blocks the entire browser UI thread completely',
          'Cancels the Promise',
          'Retries the network request 3 times'
        ],
        correctOptionIndex: 0,
        explanation: 'await yields execution back to the Event Loop until the Promise fulfills.'
      },
      {
        id: 'q-js-async-3',
        question: 'Which method executes multiple promises concurrently and resolves when ALL of them complete?',
        options: ['Promise.all()', 'Promise.race()', 'Promise.any()', 'Promise.concat()'],
        correctOptionIndex: 0,
        explanation: 'Promise.all() waits for all promises in an iterable to fulfill.'
      },
      {
        id: 'q-js-async-4',
        question: 'How should errors be caught when using `async / await` syntax?',
        options: ['Inside standard `try...catch` blocks', 'With .catch() only', 'Using if (error)', 'Errors cannot be caught'],
        correctOptionIndex: 0,
        explanation: 'try...catch wraps await statements for clean synchronous-style error handling.'
      },
      {
        id: 'q-js-async-5',
        question: 'Which queue in the JavaScript Event Loop has higher priority: Microtask Queue (Promises) or Task Queue (setTimeout)?',
        options: [
          'Microtask Queue (Processes all Promise callbacks before next macrotask)',
          'Task Queue',
          'They have identical alternating priority',
          'Task Queue runs first'
        ],
        correctOptionIndex: 0,
        explanation: 'The Event Loop exhausts all microtasks (Promises) before picking the next macrotask.'
      }
    ],
    codingChallenge: {
      id: 'js-ch-async',
      title: 'Async Promise Resolution',
      slug: 'js-async-resolution',
      instruction: 'Output "PROMISE_RESOLVED_OK".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-js-async-1',
          input: '',
          expectedOutput: 'PROMISE_RESOLVED_OK'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'js-dom'
  },
  {
    id: 'js-dom',
    language: 'javascript',
    title: 'DOM Manipulation & Event Listeners',
    slug: 'js-dom',
    category: 'Asynchronous JavaScript & DOM',
    categoryId: 'js-async-dom',
    level: 'advanced',
    order: 8,
    estimatedMinutes: 12,
    prerequisites: ['js-async'],
    introduction: 'The Document Object Model (DOM) is the tree representation of an HTML document, enabling JavaScript to dynamically update UI elements and respond to user interactions.',
    explanation: `### Selecting Elements:
• \`document.querySelector(".btn")\`: Selects first matching element by CSS selector.
• \`document.querySelectorAll("p")\`: Selects all matching elements (NodeList).

### Modifying Elements:
• \`element.textContent = "New text"\`: Safely sets text without HTML parsing.
• \`element.classList.add("active")\` / \`.remove("hidden")\`: Modifies CSS classes.

### Event Handling:
• \`element.addEventListener("click", (event) => { ... })\`: Binds event handlers cleanly without inline HTML attributes.`,
    syntax: `const btn = document.querySelector("#submit-btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.textContent = "Submitted!";
    btn.classList.add("btn-success");
});`,
    syntaxBreakdown: `• document.querySelector() : CSS selector query
• addEventListener(event, callback) : Non-intrusive event binding
• e.preventDefault() : Prevents default browser form submission`,
    codeExamples: [
      {
        title: 'DOM Element Creation and Insertion',
        code: `console.log("Simulating DOM Manipulation:");
console.log("1. const item = document.createElement('li');");
console.log("2. item.textContent = 'New Skill Item';");
console.log("3. document.querySelector('#list').appendChild(item);");`,
        explanation: 'Standard DOM element lifecycle: create, configure, append.',
        output: 'Simulating DOM Manipulation:\n1. const item = document.createElement(\'li\');\n2. item.textContent = \'New Skill Item\';\n3. document.querySelector(\'#list\').appendChild(item);'
      }
    ],
    practicalExamples: [
      {
        title: 'Event Delegation Pattern',
        code: `console.log("Event Delegation Pattern: Single listener on parent <ul> intercepts child <li> clicks via e.target.");`,
        explanation: 'Attaching one listener to a parent container improves memory efficiency.',
        output: 'Event Delegation Pattern: Single listener on parent <ul> intercepts child <li> clicks via e.target.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `element.innerHTML = userInput` with untrusted data (XSS vulnerability).',
        correction: 'Use `element.textContent` for plain text to prevent Cross-Site Scripting (XSS).',
        explanation: 'innerHTML parses untrusted strings as HTML/scripts, creating severe security flaws.'
      }
    ],
    keyPoints: [
      'querySelector uses standard CSS selectors.',
      'Always prefer textContent over innerHTML for security.',
      'addEventListener supports multiple decoupled listeners per event.'
    ],
    hint: {
      summary: 'querySelector selects elements; textContent updates text; addEventListener binds events.',
      keyRules: [
        'Use document.querySelector("#id") or (".class").',
        'Use textContent to prevent XSS attacks.',
        'element.addEventListener("click", handler).'
      ],
      cheatsheetMarkdown: `\`\`\`js
const el = document.querySelector(".my-class");
el.textContent = "Updated";
el.addEventListener("click", () => alert("Clicked!"));
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-js-dom-1',
        title: 'Simulate Click Listener',
        instruction: 'Print "EVENT_BOUND: click -> #launch-btn".',
        starterCode: `// Log event binding
`,
        solutionCode: `console.log("EVENT_BOUND: click -> #launch-btn");`
      }
    ],
    quizzes: [
      {
        id: 'q-js-dom-1',
        question: 'Which method selects the FIRST element in the DOM matching a specified CSS selector string?',
        options: ['document.querySelector()', 'document.getElementById() only', 'document.findAll()', 'document.select()'],
        correctOptionIndex: 0,
        explanation: 'document.querySelector() returns the first element matching any standard CSS selector.'
      },
      {
        id: 'q-js-dom-2',
        question: 'Why should `textContent` be preferred over `innerHTML` when setting text from user input?',
        options: [
          'It prevents Cross-Site Scripting (XSS) attacks by treating content strictly as plain text without parsing HTML/scripts',
          'It runs faster in CSS',
          'innerHTML is deleted in ES6',
          'textContent converts text to uppercase'
        ],
        correctOptionIndex: 0,
        explanation: 'textContent eliminates XSS injection vectors by avoiding HTML markup execution.'
      },
      {
        id: 'q-js-dom-3',
        question: 'How do you attach a click event handler to a button element `btn` without inline HTML attributes?',
        options: [
          'btn.addEventListener("click", handler)',
          'btn.attachClick(handler)',
          'btn.onclick_listener(handler)',
          'document.bind("click", btn)'
        ],
        correctOptionIndex: 0,
        explanation: 'addEventListener is the W3C standard for non-intrusive event binding.'
      },
      {
        id: 'q-js-dom-4',
        question: 'What does `event.preventDefault()` do when called inside a form submission handler?',
        options: [
          'Prevents the default browser page reload and form submission action',
          'Closes the browser tab',
          'Clears all input values',
          'Stops the JavaScript runtime'
        ],
        correctOptionIndex: 0,
        explanation: 'preventDefault() stops the default browser action from triggering.'
      },
      {
        id: 'q-js-dom-5',
        question: 'Which property on an element allows adding, removing, and toggling CSS classes?',
        options: ['element.classList', 'element.classes', 'element.styleList', 'element.css'],
        correctOptionIndex: 0,
        explanation: 'element.classList provides helper methods: .add(), .remove(), .toggle(), .contains().'
      }
    ],
    codingChallenge: {
      id: 'js-ch-dom',
      title: 'DOM Event Simulator',
      slug: 'js-dom-simulator',
      instruction: 'Output "DOM_MUTATION_COMPLETE: 100%".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-js-dom-1',
          input: '',
          expectedOutput: 'DOM_MUTATION_COMPLETE: 100%'
        }
      ],
      xpReward: 50
    },
    xpReward: 50
  }
]
