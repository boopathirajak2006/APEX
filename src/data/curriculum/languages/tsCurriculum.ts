import type { CurriculumCategory, CurriculumTopic } from '../types'

export const TS_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'ts-basics',
    title: 'TypeScript Foundations & Types',
    description: 'Static type checking, type annotations, primitives, union types, and type narrowing.',
    level: 'beginner',
    icon: '🔷',
    topicIds: ['ts-intro', 'ts-unions-narrowing']
  },
  {
    id: 'ts-interfaces-functions',
    title: 'Interfaces, Objects & Typed Functions',
    description: 'Interfaces vs type aliases, optional fields, readonly modifiers, and typed function signatures.',
    level: 'intermediate',
    icon: '📐',
    topicIds: ['ts-interfaces', 'ts-functions']
  },
  {
    id: 'ts-generics-utility',
    title: 'Generics, Utility Types & Classes',
    description: 'Generic parameters (<T>), constraints, Pick, Omit, Partial, Record, and class access modifiers.',
    level: 'advanced',
    icon: '⚡',
    topicIds: ['ts-generics', 'ts-utility-types']
  }
]

export const TS_TOPICS: CurriculumTopic[] = [
  {
    id: 'ts-intro',
    language: 'typescript',
    title: 'TypeScript Overview & Type Annotations',
    slug: 'ts-intro',
    category: 'TypeScript Foundations & Types',
    categoryId: 'ts-basics',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 8,
    prerequisites: [],
    introduction: 'TypeScript is a strongly typed superset of JavaScript that compiles directly to clean, standard JavaScript while catching bugs at compile time.',
    explanation: `TypeScript adds static type annotations to variables, function parameters, and return types.

### Core Type System:
• **Primitives:** \`string\`, \`number\`, \`boolean\`, \`bigint\`, \`symbol\`, \`null\`, \`undefined\`.
• **Type Inference:** If an initial value is assigned, TypeScript infers the type automatically (\`let count = 42;\` is inferred as \`number\`).
• **Type Annotations (\`: type\`):** Explicitly specifies the required type: \`let user: string = "Aria";\`.
• **The \`any\` vs \`unknown\` Type:**
  - \`any\` disables type checking (avoid in strict TS).
  - \`unknown\` is type-safe: you must narrow its type before performing operations.`,
    syntax: `let username: string = "Aria";
let score: number = 95;
let isActive: boolean = true;

function greet(user: string): string {
    return "Hello, " + user;
}`,
    syntaxBreakdown: `• : string / : number : Explicit type annotations
• Type Inference : Automatic deduction from initial value
• Type Safety : Compile-time prevention of type mismatches`,
    codeExamples: [
      {
        title: 'Explicit Type Annotations and Output',
        code: `let agentName: string = "Cipher";
let level: number = 10;
let isLeader: boolean = true;

console.log(\`Agent: \${agentName} [Lvl: \${level}, Leader: \${isLeader}]\`);`,
        explanation: 'Strongly typed variable declarations compiled to clean JavaScript.',
        output: 'Agent: Cipher [Lvl: 10, Leader: true]'
      }
    ],
    practicalExamples: [
      {
        title: 'Safe unknown Type Narrowing',
        code: `function processValue(val: unknown) {
    if (typeof val === "string") {
        console.log("String uppercase: " + val.toUpperCase());
    } else if (typeof val === "number") {
        console.log("Number squared: " + (val * val));
    }
}

processValue("apex");
processValue(5);`,
        explanation: 'Uses typeof guards to safely operate on unknown values.',
        output: 'String uppercase: APEX\nNumber squared: 25'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `any` everywhere to bypass type errors.',
        correction: 'Use `unknown` with type guards or create explicit types/interfaces.',
        explanation: 'Overusing `any` eliminates the compile-time safety benefits of TypeScript.'
      }
    ],
    keyPoints: [
      'TypeScript is a static superset of JavaScript.',
      'Types are completely erased during compilation (zero runtime overhead).',
      'Prefer unknown over any for unverified inputs.'
    ],
    hint: {
      summary: 'TypeScript adds compile-time types; let x: number = 10; unknown is type-safe any.',
      keyRules: [
        'Types vanish at runtime (type erasure).',
        'Use strict type annotations on function parameters.',
        'Avoid `any`; use `unknown`.'
      ],
      cheatsheetMarkdown: `\`\`\`ts
let str: string = "Text";
let num: number = 42;
let ok: boolean = true;
let data: unknown;
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-ts-intro-1',
        title: 'Typed Function Signature',
        instruction: 'Create function `function add(a: number, b: number): number` and log `add(15, 25)` formatted as "Sum: 40".',
        starterCode: `// Write typed function
`,
        solutionCode: `function add(a: number, b: number): number {
    return a + b;
}
console.log("Sum: " + add(15, 25));`
      }
    ],
    quizzes: [
      {
        id: 'q-ts-intro-1',
        question: 'What happens to TypeScript type annotations during compilation by `tsc`?',
        options: [
          'They are completely stripped away (erased), outputting standard JavaScript',
          'They are converted into runtime memory checks',
          'They are stored in a database',
          'They become global variables'
        ],
        correctOptionIndex: 0,
        explanation: 'TypeScript employs type erasure: types exist only at compile time.'
      },
      {
        id: 'q-ts-intro-2',
        question: 'What is the primary difference between `unknown` and `any` in TypeScript?',
        options: [
          '`unknown` is type-safe because you must perform type-checking before performing operations, whereas `any` disables all type checking',
          '`unknown` only allows numbers',
          '`any` is faster',
          'They are identical'
        ],
        correctOptionIndex: 0,
        explanation: 'unknown enforces defensive narrowing before property access.'
      },
      {
        id: 'q-ts-intro-3',
        question: 'If you declare `let score = 100;` in TypeScript without a type annotation, what type does the compiler infer?',
        options: ['number', 'any', 'unknown', 'Object'],
        correctOptionIndex: 0,
        explanation: 'TypeScript automatically infers primitive `number` from the numeric literal 100.'
      },
      {
        id: 'q-ts-intro-4',
        question: 'What is the file extension for standard TypeScript source files?',
        options: ['.ts (and .tsx for JSX)', '.js', '.type', '.tsc'],
        correctOptionIndex: 0,
        explanation: '.ts is the standard extension (.tsx for React JSX).'
      },
      {
        id: 'q-ts-intro-5',
        question: 'What compiler command compiles TypeScript files to JavaScript?',
        options: ['tsc', 'npm ts', 'typecheck', 'compile-ts'],
        correctOptionIndex: 0,
        explanation: '`tsc` (TypeScript Compiler) compiles TS to JS.'
      }
    ],
    codingChallenge: {
      id: 'ts-ch-intro',
      title: 'TypeScript Engine Transmitter',
      slug: 'ts-engine-transmitter',
      instruction: 'Output "TypeScript Engine Online".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-ts-intro-1',
          input: '',
          expectedOutput: 'TypeScript Engine Online'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'ts-unions-narrowing'
  },
  {
    id: 'ts-unions-narrowing',
    language: 'typescript',
    title: 'Union Types, Literal Types & Type Narrowing',
    slug: 'ts-unions-narrowing',
    category: 'TypeScript Foundations & Types',
    categoryId: 'ts-basics',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 10,
    prerequisites: ['ts-intro'],
    introduction: 'Union types allow values to be one of several types, while type narrowing refines a broad union down to a specific concrete type.',
    explanation: `### Union Types (\`|\`):
• Combines multiple types: \`let id: string | number;\`
• **Literal Types:** Restricts values to exact string or number literals:
  \`type Status = "online" | "offline" | "busy";\`

### Type Narrowing Techniques:
1. **\`typeof\` Guards:** Checks \`"string"\`, \`"number"\`, \`"boolean"\`.
2. **Truthiness & Equality:** \`if (val !== null)\` or \`if (val === "admin")\`.
3. **\`in\` Operator:** \`if ("role" in user)\` for object property discrimination.
4. **\`instanceof\`:** \`if (err instanceof Error)\`.
5. **The \`never\` Type:** Represents values that should never occur (used in exhaustive switch checks).`,
    syntax: `type Result = "success" | "error";

function handleResult(res: Result) {
    if (res === "success") {
        console.log("Operation OK");
    } else {
        console.log("Operation Failed");
    }
}`,
    syntaxBreakdown: `• type A | B : Union type representing either A or B
• Literal types : Exact permitted values
• Control Flow Analysis : Automatic compiler type narrowing inside if blocks`,
    codeExamples: [
      {
        title: 'Union Type Narrowing with typeof',
        code: `function formatPadding(padding: number | string): string {
    if (typeof padding === "number") {
        return padding + "px";
    }
    return padding;
}

console.log(formatPadding(20));
console.log(formatPadding("1.5rem"));`,
        explanation: 'TypeScript narrows padding to number in if block, and string in else.',
        output: '20px\n1.5rem'
      }
    ],
    practicalExamples: [
      {
        title: 'Discriminated Union Pattern',
        code: `type NetworkState = 
    | { status: "loading" }
    | { status: "success"; data: string }
    | { status: "error"; message: string };

function renderState(state: NetworkState) {
    switch (state.status) {
        case "loading": return "Loading...";
        case "success": return "Data: " + state.data;
        case "error": return "Error: " + state.message;
    }
}

console.log(renderState({ status: "success", data: "APEX Payload" }));`,
        explanation: 'Uses status discriminator tag for safe exhaustive branching.',
        output: 'Data: APEX Payload'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to access a property specific to one union member without narrowing first.',
        correction: 'Use type guards (typeof, in, or discriminator tag) before accessing member properties.',
        explanation: 'TypeScript only allows accessing common properties shared by all union variants before narrowing.'
      }
    ],
    keyPoints: [
      'Union types (A | B) model values that can be one of several types.',
      'Type narrowing uses control flow analysis (typeof, in, instanceof) to refine types.',
      'Discriminated unions use a common literal property tag for safe state modeling.'
    ],
    hint: {
      summary: 'Union types: type A | B; use typeof, in, or discriminant tag to narrow.',
      keyRules: [
        'type Status = "active" | "inactive";',
        'typeof narrowing: if (typeof x === "string")',
        'Discriminated unions use a shared status tag.'
      ],
      cheatsheetMarkdown: `\`\`\`ts
type ID = string | number;
function printId(id: ID) {
    if (typeof id === "string") console.log(id.toUpperCase());
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-ts-un-1',
        title: 'Narrow Union Value',
        instruction: 'Write a function narrowing `val: string | number` to print "Value: 42".',
        starterCode: `// Write narrowing function
`,
        solutionCode: `function show(val: string | number) {
    console.log("Value: " + val);
}
show(42);`
      }
    ],
    quizzes: [
      {
        id: 'q-ts-un-1',
        question: 'What is a "Discriminated Union" in TypeScript?',
        options: [
          'A union of object types that all share a common single literal property (e.g. `status: "success" | "error"`) used for safe narrowing',
          'A banned type in strict mode',
          'A union of numbers only',
          'An enum'
        ],
        correctOptionIndex: 0,
        explanation: 'Discriminated unions use a common tag property for type-safe pattern matching.'
      },
      {
        id: 'q-ts-un-2',
        question: 'What type represents values that should NEVER occur in exhaustive type checking?',
        options: ['void', 'never', 'null', 'undefined'],
        correctOptionIndex: 1,
        explanation: 'The `never` type indicates an unreachable state in exhaustive narrowing.'
      },
      {
        id: 'q-ts-un-3',
        question: 'What operator creates a union type between `string` and `number`?',
        options: ['string & number', 'string | number', 'string + number', 'string || number'],
        correctOptionIndex: 1,
        explanation: '`|` (pipe) denotes union types in TypeScript.'
      },
      {
        id: 'q-ts-un-4',
        question: 'Which operator checks if a specific property exists on an object for type narrowing?',
        options: ['in (e.g. `if ("role" in user)`)', 'has', 'contains', 'exists'],
        correctOptionIndex: 0,
        explanation: 'The `in` operator checks property presence and narrows union types.'
      },
      {
        id: 'q-ts-un-5',
        question: 'What is a "Literal Type" in TypeScript?',
        options: [
          'A type that specifies exact permitted value literals (e.g. `type Direction = "North" | "South"`)',
          'Any string',
          'A comment',
          'A number'
        ],
        correctOptionIndex: 0,
        explanation: 'Literal types narrow primitive types to specific exact values.'
      }
    ],
    codingChallenge: {
      id: 'ts-ch-unions',
      title: 'Union Narrowing Evaluator',
      slug: 'ts-union-narrowing',
      instruction: 'Output "NARROWED_TYPE_SUCCESS: 100".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-ts-un-1',
          input: '',
          expectedOutput: 'NARROWED_TYPE_SUCCESS: 100'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'ts-interfaces'
  },
  {
    id: 'ts-interfaces',
    language: 'typescript',
    title: 'Interfaces, Object Types & readonly Modifiers',
    slug: 'ts-interfaces',
    category: 'Interfaces, Objects & Typed Functions',
    categoryId: 'ts-interfaces-functions',
    level: 'intermediate',
    order: 3,
    estimatedMinutes: 12,
    prerequisites: ['ts-unions-narrowing'],
    introduction: 'Interfaces define contracts for object shapes, supporting extension, optional properties, and immutability modifiers.',
    explanation: `### Defining Interfaces:
\`\`\`ts
interface User {
    readonly id: number;   // Cannot be mutated after creation
    name: string;
    email?: string;         // Optional property
}
\`\`\`

### Interface vs Type Alias:
• **\`interface\`**: Best for object contracts and OOP hierarchies; supports declaration merging and \`extends\`.
• **\`type\`**: Can represent primitives, unions (\`A | B\`), intersections (\`A & B\`), and tuples.`,
    syntax: `interface Agent {
    id: number;
    username: string;
    xp?: number;
}

interface SuperAgent extends Agent {
    clearanceLevel: number;
}`,
    syntaxBreakdown: `• interface Name { ... } : Object shape contract
• readonly prop : Prevents assignment after creation
• prop? : Optional property (type | undefined)
• extends : Inherits interface properties`,
    codeExamples: [
      {
        title: 'Interface Extension and Object Creation',
        code: `interface Profile {
    readonly id: number;
    username: string;
    badge?: string;
}

const user: Profile = {
    id: 101,
    username: "Cipher",
    badge: "Gold"
};

console.log(\`User #\${user.id}: \${user.username} [\${user.badge}]\`);`,
        explanation: 'Defines structured typed object adhering to Profile interface.',
        output: 'User #101: Cipher [Gold]'
      }
    ],
    practicalExamples: [
      {
        title: 'Readonly Array Immutability',
        code: `const scores: readonly number[] = [90, 85, 95];
// scores.push(100); // Compile error: push does not exist on readonly number[]
console.log("Readonly scores count: " + scores.length);`,
        explanation: 'Enforces compile-time array immutability.',
        output: 'Readonly scores count: 3'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to reassign a `readonly` property: `user.id = 200;`.',
        correction: 'Do not reassign readonly properties after object initialization.',
        explanation: 'readonly modifier enforces immutability at compile time.'
      }
    ],
    keyPoints: [
      'Interfaces declare object structural shapes.',
      'Optional properties (?) allow undefined values.',
      'readonly properties prevent mutation after initialization.'
    ],
    hint: {
      summary: 'interface Name { id: number; name?: string; readonly key: string; }; extends inherits.',
      keyRules: [
        'Use ? for optional fields.',
        'Use readonly for immutable fields.',
        'interface Child extends Parent to inherit shapes.'
      ],
      cheatsheetMarkdown: `\`\`\`ts
interface Config {
    readonly port: number;
    host?: string;
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-ts-if-1',
        title: 'Define User Interface',
        instruction: 'Create interface `Item` with `id: number, name: string`. Log "Item: Code [ID: 1]".',
        starterCode: `// Write interface and object
`,
        solutionCode: `interface Item { id: number; name: string; }
const it: Item = { id: 1, name: "Code" };
console.log(\`Item: \${it.name} [ID: \${it.id}]\`);`
      }
    ],
    quizzes: [
      {
        id: 'q-ts-if-1',
        question: 'What does the `?` symbol on an interface property `email?: string` indicate in TypeScript?',
        options: [
          'The property is optional (can be string or undefined)',
          'The property is encrypted',
          'The property is private',
          'The property is boolean'
        ],
        correctOptionIndex: 0,
        explanation: '`?` marks optional properties that do not need to be supplied on creation.'
      },
      {
        id: 'q-ts-if-2',
        question: 'What does the `readonly` modifier accomplish on an interface property?',
        options: [
          'Prevents property reassignment after initial object creation',
          'Hides property from console.log',
          'Makes the object run in web workers',
          'Converts string to number'
        ],
        correctOptionIndex: 0,
        explanation: 'readonly enforces immutability at compile time.'
      },
      {
        id: 'q-ts-if-3',
        question: 'Which keyword allows one interface to inherit all property definitions from another interface?',
        options: ['extends', 'implements', 'inherits', 'super'],
        correctOptionIndex: 0,
        explanation: '`interface Child extends Parent` inherits parent interface shapes.'
      },
      {
        id: 'q-ts-if-4',
        question: 'What is a key difference between `interface` and `type` alias in TypeScript?',
        options: [
          'Interfaces support declaration merging and extends; type aliases can define union/intersection primitives',
          'Interfaces only work with numbers',
          'type aliases are deleted in TypeScript 5',
          'There is zero difference'
        ],
        correctOptionIndex: 0,
        explanation: 'Interfaces focus on extensible object shapes; type aliases handle all types including unions.'
      },
      {
        id: 'q-ts-if-5',
        question: 'How do you define an index signature for an object with arbitrary string keys and number values?',
        options: ['[key: string]: number;', '{ * : number }', 'keyof string = number;', 'Map<string, number>'],
        correctOptionIndex: 0,
        explanation: '`[key: string]: number;` represents arbitrary string-keyed numeric maps.'
      }
    ],
    codingChallenge: {
      id: 'ts-ch-interfaces',
      title: 'Interface Shape Output',
      slug: 'ts-interface-shape',
      instruction: 'Output "INTERFACE_CONTRACT_SATISFIED".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-ts-if-1',
          input: '',
          expectedOutput: 'INTERFACE_CONTRACT_SATISFIED'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'ts-generics'
  },
  {
    id: 'ts-generics',
    language: 'typescript',
    title: 'Generics (<T>) & Type Constraints',
    slug: 'ts-generics',
    category: 'Generics, Utility Types & Classes',
    categoryId: 'ts-generics-utility',
    level: 'advanced',
    order: 4,
    estimatedMinutes: 14,
    prerequisites: ['ts-interfaces'],
    introduction: 'Generics allow writing flexible, reusable components that work with a variety of types while preserving complete type safety.',
    explanation: `### Generic Functions:
\`\`\`ts
function getFirst<T>(items: T[]): T {
    return items[0];
}
const n = getFirst<number>([10, 20]); // n is number
const s = getFirst(["A", "B"]);       // inferred as string
\`\`\`

### Generic Constraints with \`extends\`:
Constrains generic parameters to types that guarantee specific properties:
\`\`\`ts
interface HasLength { length: number; }
function logLength<T extends HasLength>(item: T): void {
    console.log("Length: " + item.length);
}
\`\`\``,
    syntax: `interface ApiResponse<T> {
    status: number;
    data: T;
}

const response: ApiResponse<string[]> = {
    status: 200,
    data: ["item1", "item2"]
};`,
    syntaxBreakdown: `• <T> : Generic type variable placeholder
• T extends Interface : Type constraint requiring T to satisfy interface
• ApiResponse<T> : Generic interface`,
    codeExamples: [
      {
        title: 'Generic Stack Data Structure',
        code: `class Stack<T> {
    private items: T[] = [];
    push(item: T) { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
}

const stack = new Stack<number>();
stack.push(10);
stack.push(20);
console.log("Popped: " + stack.pop());`,
        explanation: 'Generic Stack class working type-safely for numbers.',
        output: 'Popped: 20'
      }
    ],
    practicalExamples: [
      {
        title: 'Generic Key-Value Pair',
        code: `function pair<K, V>(k: K, v: V): [K, V] {
    return [k, v];
}

const p = pair("user_id", 404);
console.log(\`Key: \${p[0]}, Val: \${p[1]}\`);`,
        explanation: 'Returns typed tuple from generic pair function.',
        output: 'Key: user_id, Val: 404'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to access properties on unconstrained generic `T` (e.g. `item.length` on bare `T`).',
        correction: 'Add a constraint: `<T extends { length: number }>`.',
        explanation: 'The compiler cannot guarantee that unconstrained T has specific properties.'
      }
    ],
    keyPoints: [
      'Generics (<T>) capture argument types to guarantee type-safe returns.',
      'Type inference allows omitting <T> when arguments provide clear types.',
      'Constraints (<T extends Type>) restrict generics to supported shapes.'
    ],
    hint: {
      summary: 'function fn<T>(val: T): T; <T extends Base> constrains generic type.',
      keyRules: [
        '<T> declares generic type.',
        'T extends { prop: string } constrains T.',
        'Generics work on functions, interfaces, and classes.'
      ],
      cheatsheetMarkdown: `\`\`\`ts
function wrap<T>(item: T): { data: T } {
    return { data: item };
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-ts-gen-1',
        title: 'Generic Identity',
        instruction: 'Create generic identity `function id<T>(arg: T): T { return arg; }`. Log `id("APEX")`.',
        starterCode: `// Write generic identity
`,
        solutionCode: `function id<T>(arg: T): T { return arg; }
console.log("ID: " + id("APEX"));`
      }
    ],
    quizzes: [
      {
        id: 'q-ts-gen-1',
        question: 'Why are Generics (`<T>`) used in TypeScript instead of `any`?',
        options: [
          'Generics preserve the exact relationship between input and output types while enforcing full compile-time type safety',
          'Generics make code compile faster',
          'any is deprecated',
          'Generics are required for JavaScript'
        ],
        correctOptionIndex: 0,
        explanation: 'Generics track and preserve precise types across inputs, state, and return values.'
      },
      {
        id: 'q-ts-gen-2',
        question: 'How do you constrain a generic type `T` to only objects with an `id: number` property?',
        options: [
          '<T extends { id: number }>',
          '<T : { id: number }>',
          '<T implements { id: number }>',
          '<T where id = number>'
        ],
        correctOptionIndex: 0,
        explanation: '`<T extends Interface>` constrains generic types to matching shapes.'
      },
      {
        id: 'q-ts-gen-3',
        question: 'What is the return type of `function get<T>(val: T): T` when invoked as `get("Hello")`?',
        options: ['string', 'any', 'unknown', 'T'],
        correctOptionIndex: 0,
        explanation: 'TypeScript infers T as `string` from argument "Hello".'
      },
      {
        id: 'q-ts-gen-4',
        question: 'Can interfaces and classes be generic in TypeScript (e.g. `interface Repo<T>`)?',
        options: ['Yes, fully supported', 'No, only functions can be generic', 'Only in React', 'Only in Node.js'],
        correctOptionIndex: 0,
        explanation: 'Generics are supported across functions, interfaces, type aliases, and classes.'
      },
      {
        id: 'q-ts-gen-5',
        question: 'What is the default type parameter syntax for generics (e.g. default T to string)?',
        options: ['<T = string>', '<T : string>', '<T default string>', '<T -> string>'],
        correctOptionIndex: 0,
        explanation: '`<T = DefaultType>` specifies default generic type parameters.'
      }
    ],
    codingChallenge: {
      id: 'ts-ch-generics',
      title: 'Generic Container Simulator',
      slug: 'ts-generic-container',
      instruction: 'Output "GENERIC_PAYLOAD_RESOLVED: 42".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-ts-gen-1',
          input: '',
          expectedOutput: 'GENERIC_PAYLOAD_RESOLVED: 42'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'ts-utility-types'
  },
  {
    id: 'ts-utility-types',
    language: 'typescript',
    title: 'Built-in Utility Types: Pick, Omit, Partial & Record',
    slug: 'ts-utility-types',
    category: 'Generics, Utility Types & Classes',
    categoryId: 'ts-generics-utility',
    level: 'advanced',
    order: 5,
    estimatedMinutes: 14,
    prerequisites: ['ts-generics'],
    introduction: 'TypeScript provides powerful built-in utility types to transform, filter, and adapt existing types without rewriting schemas.',
    explanation: `### Essential Built-in Utility Types:
• **\`Partial<T>\`**: Makes all properties in \`T\` optional.
• **\`Required<T>\`**: Makes all properties in \`T\` mandatory.
• **\`Readonly<T>\`**: Makes all properties in \`T\` immutable.
• **\`Pick<T, K>\`**: Constructs a new type picking only keys \`K\` from \`T\`.
• **\`Omit<T, K>\`**: Constructs a new type omitting keys \`K\` from \`T\`.
• **\`Record<K, T>\`**: Constructs an object type with property keys \`K\` and values \`T\`.`,
    syntax: `interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

// Pick only id and name
type UserSummary = Pick<User, "id" | "name">;

// Omit role
type PublicUser = Omit<User, "role">;

// Partial update payload
type UpdateUserDto = Partial<User>;

// Key-value map
type UserMap = Record<string, User>;`,
    syntaxBreakdown: `• Pick<T, "k1" | "k2"> : Extracts specific property subset
• Omit<T, "k1"> : Removes specific property subset
• Partial<T> : Turns all fields into optional (?)
• Record<K, V> : Typed dictionary object`,
    codeExamples: [
      {
        title: 'Pick and Partial in API Handlers',
        code: `interface Mission {
    id: string;
    title: string;
    xpReward: number;
    completed: boolean;
}

type MissionSummary = Pick<Mission, "id" | "title">;
type MissionUpdate = Partial<Mission>;

const summary: MissionSummary = { id: "m1", title: "C Fundamentals" };
const update: MissionUpdate = { completed: true };

console.log(\`Mission \${summary.id} updated: \${update.completed}\`);`,
        explanation: 'Uses Pick for concise payloads and Partial for optional update fields.',
        output: 'Mission m1 updated: true'
      }
    ],
    practicalExamples: [
      {
        title: 'Record Dictionary Mapping',
        code: `type LanguageMap = Record<string, { lessons: number }>;
const catalog: LanguageMap = {
    python: { lessons: 24 },
    rust: { lessons: 10 }
};

console.log("Python lessons: " + catalog["python"].lessons);`,
        explanation: 'Enforces type-safe dictionary mapping with Record<K, V>.',
        output: 'Python lessons: 24'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using invalid property key strings inside Pick or Omit.',
        correction: 'Ensure keys exist on the target interface (TypeScript will flag invalid keys at compile time).',
        explanation: 'Pick<T, K> enforces that K extends keyof T.'
      }
    ],
    keyPoints: [
      'Pick extracts properties; Omit excludes properties.',
      'Partial makes fields optional; Required makes them mandatory.',
      'Record<K, V> defines type-safe key-value dictionaries.'
    ],
    hint: {
      summary: 'Pick<T, K> picks keys; Omit<T, K> omits keys; Partial<T> makes optional; Record<K, V> for maps.',
      keyRules: [
        'Pick<User, "id" | "name">',
        'Omit<User, "password">',
        'Record<string, number> for key-value maps.'
      ],
      cheatsheetMarkdown: `\`\`\`ts
type Mini = Pick<User, "id">;
type Safe = Omit<User, "secret">;
type Patch = Partial<User>;
type Dict = Record<string, number>;
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-ts-ut-1',
        title: 'Use Pick Utility',
        instruction: 'Create type `UserSummary = Pick<{id: number, name: string, secret: string}, "id" | "name">`. Print "Pick OK".',
        starterCode: `// Write utility type
`,
        solutionCode: `type UserSummary = Pick<{ id: number; name: string; secret: string }, "id" | "name">;
const u: UserSummary = { id: 1, name: "Aria" };
console.log("Pick OK: " + u.name);`
      }
    ],
    quizzes: [
      {
        id: 'q-ts-ut-1',
        question: 'Which utility type constructs a new type by choosing a specific set of keys from an existing type?',
        options: ['Pick<T, K>', 'Omit<T, K>', 'Extract<T, U>', 'Exclude<T, U>'],
        correctOptionIndex: 0,
        explanation: '`Pick<T, K>` constructs a type by picking specific properties K from T.'
      },
      {
        id: 'q-ts-ut-2',
        question: 'Which utility type constructs a type by removing specific keys from an existing type?',
        options: ['Omit<T, K>', 'Pick<T, K>', 'Partial<T>', 'Delete<T, K>'],
        correctOptionIndex: 0,
        explanation: '`Omit<T, K>` drops specified properties K from T.'
      },
      {
        id: 'q-ts-ut-3',
        question: 'What transformation does `Partial<User>` apply to an interface `User`?',
        options: [
          'Makes all properties of User optional (adds `?`)',
          'Makes all properties readonly',
          'Deletes half the properties',
          'Converts all values to strings'
        ],
        correctOptionIndex: 0,
        explanation: 'Partial<T> sets all properties in T as optional.'
      },
      {
        id: 'q-ts-ut-4',
        question: 'What is the purpose of `Record<string, number>` in TypeScript?',
        options: [
          'Constructs an object type whose property keys are strings and values are numbers',
          'Records audio in browser',
          'Creates a tuple',
          'Runs a database query'
        ],
        correctOptionIndex: 0,
        explanation: 'Record<K, V> constructs an object type with keys K and value type V.'
      },
      {
        id: 'q-ts-ut-5',
        question: 'Which utility type turns all optional properties in an interface into mandatory required properties?',
        options: ['Required<T>', 'Mandatory<T>', 'Complete<T>', 'Strict<T>'],
        correctOptionIndex: 0,
        explanation: '`Required<T>` removes optional `?` modifiers from all properties in T.'
      }
    ],
    codingChallenge: {
      id: 'ts-ch-utility-types',
      title: 'Utility Type Formatter',
      slug: 'ts-utility-formatter',
      instruction: 'Output "UTILITY_TYPES_VALIDATED: 100%".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-ts-ut-1',
          input: '',
          expectedOutput: 'UTILITY_TYPES_VALIDATED: 100%'
        }
      ],
      xpReward: 50
    },
    xpReward: 50
  }
]
