import type { CurriculumCategory, CurriculumTopic } from '../types'

export const RUST_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'rust-basics',
    title: 'Rust Foundations & Syntax',
    description: 'Cargo ecosystem, main(), println!() macro, let bindings, mutability, and control flow.',
    level: 'beginner',
    icon: '🦀',
    topicIds: ['rust-intro', 'rust-types-control']
  },
  {
    id: 'rust-memory',
    title: 'Ownership & Borrowing',
    description: 'Memory safety without garbage collection, move semantics, shared vs mutable references, and slices.',
    level: 'intermediate',
    icon: '🧠',
    topicIds: ['rust-ownership', 'rust-borrowing']
  },
  {
    id: 'rust-types-traits',
    title: 'Structs, Enums, Traits & Errors',
    description: 'Enums (Option, Result), pattern matching, trait contracts, generics, and the ? error operator.',
    level: 'advanced',
    icon: '🛡️',
    topicIds: ['rust-structs-enums', 'rust-traits-generics', 'rust-error-collections']
  }
]

export const RUST_TOPICS: CurriculumTopic[] = [
  {
    id: 'rust-intro',
    language: 'rust',
    title: 'Rust Fundamentals, println!() & Mutability',
    slug: 'rust-intro',
    category: 'Rust Foundations & Syntax',
    categoryId: 'rust-basics',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 8,
    prerequisites: [],
    introduction: 'Rust is a modern systems programming language empowering everyone to build reliable and efficient software with zero-cost abstractions and guaranteed memory safety.',
    explanation: `Rust provides memory safety guarantees at compile time without a runtime garbage collector.

### Core Rust Rules:
1. **Entry Point:** Execution begins in \`fn main()\`.
2. **Macros vs Functions:** Formatting macros end with an exclamation mark (\`println!("...")\`).
3. **Immutability by Default:** Variables declared with \`let\` are immutable by default; add \`mut\` to permit mutation: \`let mut score = 100;\`.
4. **Shadowing:** Re-declaring a variable with \`let\` shadows the previous binding, allowing type changes while keeping immutability.`,
    syntax: `fn main() {
    let app = "APEX Rust Core";
    let mut count = 0;
    count += 1;
    println!("{} count: {}", app, count);
}`,
    syntaxBreakdown: `• fn main() : Main function entry point
• println!(...) : Standard output macro (ends with !)
• let : Immutable variable binding (default)
• let mut : Mutable variable binding
• {} : Placeholder tokens for formatted arguments`,
    codeExamples: [
      {
        title: 'Basic Rust Hello and Mutability',
        code: `fn main() {
    let mut points = 50;
    points += 25;
    println!("Current points: {}", points);
}`,
        explanation: 'Declares mutable integer variable and prints formatted value.',
        output: 'Current points: 75'
      }
    ],
    practicalExamples: [
      {
        title: 'Variable Shadowing',
        code: `fn main() {
    let data = "100";      // &str
    let data: i32 = data.parse().unwrap(); // i32
    println!("Parsed number: {}", data * 2);
}`,
        explanation: 'Shadows string binding with an integer type without renaming.',
        output: 'Parsed number: 200'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to mutate a variable declared with `let` instead of `let mut`.',
        correction: 'Add `mut` keyword: `let mut x = 10; x = 20;`.',
        explanation: 'Rust enforces compile-time immutability by default.'
      }
    ],
    keyPoints: [
      'Rust achieves memory safety without a garbage collector.',
      'Variables are immutable by default; use `let mut` for mutability.',
      'Macros end with an exclamation mark `!`.',
      'Shadowing allows transforming values and types safely.'
    ],
    hint: {
      summary: 'fn main() starts execution; let is immutable, let mut is mutable; println!() is a macro.',
      keyRules: [
        'Use let mut if variable changes value.',
        'println!("Text {}", var) formatting.',
        'Variable shadowing with let.'
      ],
      cheatsheetMarkdown: `\`\`\`rust
fn main() {
    let x = 5; // immutable
    let mut y = 10; // mutable
    println!("x: {}, y: {}", x, y);
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-rust-intro-1',
        title: 'Mutable Counter',
        instruction: 'Declare `let mut x = 20;`, add 10, print "Total: 30" with println!.',
        starterCode: `fn main() {
    // Write Rust code
}
`,
        solutionCode: `fn main() {
    let mut x = 20;
    x += 10;
    println!("Total: {}", x);
}`
      }
    ],
    quizzes: [
      {
        id: 'q-rust-intro-1',
        question: 'Are variables in Rust mutable or immutable by default?',
        options: [
          'Immutable by default (must explicitly specify `let mut` for mutability)',
          'Mutable by default',
          'Dynamic like Python',
          'Const only'
        ],
        correctOptionIndex: 0,
        explanation: 'Rust requires explicit `let mut` declarations to allow mutation.'
      },
      {
        id: 'q-rust-intro-2',
        question: 'Why does `println!` have an exclamation mark at the end of its name?',
        options: [
          'It is a macro, not a regular function',
          'It runs on the GPU',
          'It is an unsafe function',
          'It throws an error'
        ],
        correctOptionIndex: 0,
        explanation: 'In Rust, `!` denotes macro invocation.'
      },
      {
        id: 'q-rust-intro-3',
        question: 'What is "Variable Shadowing" in Rust?',
        options: [
          'Declaring a new variable with the same name using `let`, replacing the previous binding in scope',
          'A memory leak bug',
          'An encrypted pointer',
          'A compilation error'
        ],
        correctOptionIndex: 0,
        explanation: 'Shadowing allows rebinding the same identifier, even with a different data type.'
      },
      {
        id: 'q-rust-intro-4',
        question: 'Does standard Rust require a runtime Garbage Collector (GC) to manage heap memory?',
        options: [
          'No, Rust guarantees memory safety at compile time via its ownership system',
          'Yes, like Java and Go',
          'Only in release mode',
          'Only on Windows'
        ],
        correctOptionIndex: 0,
        explanation: 'Rust uses compile-time ownership semantics instead of a garbage collector.'
      },
      {
        id: 'q-rust-intro-5',
        question: 'What is the standard build tool and package manager for the Rust ecosystem?',
        options: ['npm', 'cargo', 'pip', 'make'],
        correctOptionIndex: 1,
        explanation: 'Cargo is the official Rust package manager and build system.'
      }
    ],
    codingChallenge: {
      id: 'rust-ch-intro',
      title: 'Rust Output Transmitter',
      slug: 'rust-output-transmitter',
      instruction: 'Output "Rust Engine Online".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-rust-intro-1',
          input: '',
          expectedOutput: 'Rust Engine Online'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'rust-types-control'
  },
  {
    id: 'rust-types-control',
    language: 'rust',
    title: 'Data Types, Control Flow & Pattern Matching',
    slug: 'rust-types-control',
    category: 'Rust Foundations & Syntax',
    categoryId: 'rust-basics',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 10,
    prerequisites: ['rust-intro'],
    introduction: 'Rust features strict scalar types, compound tuples and arrays, and expressive pattern matching.',
    explanation: `### Primitive Types:
• Signed integers: \`i8\`, \`i16\`, \`i32\` (default), \`i64\`, \`i128\`, \`isize\`.
• Unsigned integers: \`u8\`, \`u16\`, \`u32\`, \`u64\`, \`u128\`, \`usize\`.
• Floats: \`f32\`, \`f64\` (default).
• \`bool\` & \`char\` (4-byte Unicode scalar).

### Control Flow & \`match\`:
• \`if\` is an expression (can return a value: \`let val = if cond { 1 } else { 2 };\`).
• \`match\` patterns are exhaustive: every possible case must be covered.`,
    syntax: `let status_code = 200;
let message = match status_code {
    200 => "OK",
    404 => "Not Found",
    _ => "Unknown Code", // Wildcard catch-all
};
println!("Status: {}", message);`,
    syntaxBreakdown: `• match expr { pat => val, ... } : Exhaustive pattern matcher
• _ => ... : Wildcard pattern catching all remaining possibilities
• if as expression : Assigns block return value directly`,
    codeExamples: [
      {
        title: 'Match Pattern Evaluation',
        code: `fn main() {
    let score = 95;
    let grade = match score {
        90..=100 => "A",
        80..=89 => "B",
        _ => "C",
    };
    println!("Grade: {}", grade);
}`,
        explanation: 'Evaluates range patterns in match blocks.',
        output: 'Grade: A'
      }
    ],
    practicalExamples: [
      {
        title: 'Loop with Break Value Return',
        code: `fn main() {
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 5 {
            break counter * 2; // Returns 10 from loop
        }
    };
    println!("Loop Result: {}", result);
}`,
        explanation: 'Demonstrates returning a value from an infinite loop via break.',
        output: 'Loop Result: 10'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Non-exhaustive match statement missing some possible integer or enum cases.',
        correction: 'Add a wildcard `_ => ...` case to handle all remaining values.',
        explanation: 'The Rust compiler mandates that match expressions be 100% exhaustive.'
      }
    ],
    keyPoints: [
      'Integer types specify explicit bit-widths (e.g. i32, u64).',
      'if and match are expressions that return values.',
      'match blocks must be exhaustive.'
    ],
    hint: {
      summary: 'match expr { pat => val, _ => fallback }; if and match return values.',
      keyRules: [
        'match must cover all possibilities.',
        'Use _ as the default wildcard pattern.',
        'Range syntax: 1..=5 matches 1 through 5 inclusive.'
      ],
      cheatsheetMarkdown: `\`\`\`rust
let res = match x {
    1 => "One",
    2 => "Two",
    _ => "Other",
};
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-rust-tc-1',
        title: 'Evaluate Match Expression',
        instruction: 'Match `let n = 2;` to print "Two".',
        starterCode: `fn main() {
    let n = 2;
    // Match n and print "Two"
}
`,
        solutionCode: `fn main() {
    let n = 2;
    match n {
        1 => println!("One"),
        2 => println!("Two"),
        _ => println!("Other"),
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-rust-tc-1',
        question: 'What is required of every `match` statement in Rust by the compiler?',
        options: [
          'It must be exhaustive (cover every possible case or provide a wildcard `_`)',
          'It must have exactly 3 cases',
          'It requires break statements',
          'It only works with booleans'
        ],
        correctOptionIndex: 0,
        explanation: 'Rust requires 100% exhaustive pattern matching at compile time.'
      },
      {
        id: 'q-rust-tc-2',
        question: 'What is the size of a `char` in Rust?',
        options: ['1 byte (ASCII)', '4 bytes (Unicode scalar value)', '2 bytes', '8 bytes'],
        correctOptionIndex: 1,
        explanation: 'Rust chars represent a 4-byte Unicode scalar value.'
      },
      {
        id: 'q-rust-tc-3',
        question: 'Can an `if / else` block in Rust return a value into a `let` assignment?',
        options: [
          'Yes, because `if` is an expression in Rust',
          'No, if is strictly a statement',
          'Only in unsafe blocks',
          'Only if wrapped in a function'
        ],
        correctOptionIndex: 0,
        explanation: 'In Rust, control flow constructs are expressions returning values.'
      },
      {
        id: 'q-rust-tc-4',
        question: 'What wildcard token is used in a match pattern to match any remaining values?',
        options: ['*', '_', 'default', 'else'],
        correctOptionIndex: 1,
        explanation: '`_` is the wildcard catch-all pattern in Rust.'
      },
      {
        id: 'q-rust-tc-5',
        question: 'How do you return a value from an infinite `loop` in Rust?',
        options: ['break value;', 'return value;', 'yield value;', 'stop value;'],
        correctOptionIndex: 0,
        explanation: '`break expression;` returns that value from the loop expression.'
      }
    ],
    codingChallenge: {
      id: 'rust-ch-types-control',
      title: 'Pattern Match Result',
      slug: 'rust-pattern-match',
      instruction: 'Output "MATCH_SUCCESS: 404".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-rust-tc-1',
          input: '',
          expectedOutput: 'MATCH_SUCCESS: 404'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'rust-ownership'
  },
  {
    id: 'rust-ownership',
    language: 'rust',
    title: 'Ownership Model & Move Semantics',
    slug: 'rust-ownership',
    category: 'Ownership & Borrowing',
    categoryId: 'rust-memory',
    level: 'intermediate',
    order: 3,
    estimatedMinutes: 12,
    prerequisites: ['rust-types-control'],
    introduction: 'Ownership is Rust\'s core memory management mechanism that guarantees memory safety without needing a garbage collector.',
    explanation: `### The Three Rules of Ownership:
1. **Each value in Rust has an owner (a variable).**
2. **There can only be one owner at a time.**
3. **When the owner goes out of scope, the value is automatically dropped (deallocated).**

### Move Semantics vs Copy:
• **Move:** Heap data types (like \`String\`, \`Vec\`) transfer ownership on assignment (\`let s2 = s1;\`). After moving, \`s1\` is invalid!
• **Copy:** Primitive types with fixed sizes on the stack (like integers \`i32\`, \`bool\`) implement the \`Copy\` trait and duplicate their bits automatically.
• **Clone:** Explicit deep heap copying using \`.clone()\`.`,
    syntax: `let s1 = String::from("APEX");
let s2 = s1; // Ownership MOVED to s2. s1 is now invalid!

// println!("{}", s1); // COMPILE ERROR: value borrowed after move
println!("{}", s2); // Valid!`,
    syntaxBreakdown: `• String::from(...) : Allocates dynamic string buffer on the heap
• Move semantics : Transfers pointer ownership without copying heap data
• Drop : Destructor called automatically at closing curly brace }`,
    codeExamples: [
      {
        title: 'Ownership Transfer to Function',
        code: `fn takes_ownership(s: String) {
    println!("Received: {}", s);
} // s dropped here

fn main() {
    let text = String::from("Telemetry");
    takes_ownership(text);
    // text is no longer valid here!
}`,
        explanation: 'Passing a String to a function transfers ownership to the parameter.',
        output: 'Received: Telemetry'
      }
    ],
    practicalExamples: [
      {
        title: 'Explicit Deep Clone',
        code: `fn main() {
    let s1 = String::from("Node_1");
    let s2 = s1.clone(); // Deep copy
    println!("s1: {}, s2: {}", s1, s2);
}`,
        explanation: 'Explicit .clone() duplicates heap buffer so both variables remain valid.',
        output: 's1: Node_1, s2: Node_1'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using a variable after its ownership has moved.',
        correction: 'Use borrowing (`&s`) or explicit cloning (`s.clone()`).',
        explanation: 'Rust\'s borrow checker prevents using moved variables to eliminate use-after-free bugs.'
      }
    ],
    keyPoints: [
      'Every value has a single owner variable.',
      'Assigning heap values moves ownership; primitive stack values are copied.',
      'Values are automatically deallocated when their owner exits scope.'
    ],
    hint: {
      summary: '1 owner per value; heap variables MOVE on assignment; stack primitives COPY; .clone() duplicates.',
      keyRules: [
        'let s2 = s1 moves s1 to s2 (s1 invalid).',
        'Primitive types (i32, f64, bool) copy.',
        'Values dropped automatically at closing }.'
      ],
      cheatsheetMarkdown: `\`\`\`rust
let s1 = String::from("hello");
let s2 = s1; // s1 moved
let s3 = s2.clone(); // deep copy
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-rust-own-1',
        title: 'Clone String',
        instruction: 'Create `let s1 = String::from("Core");`, clone into `s2`, print "s1: Core, s2: Core".',
        starterCode: `fn main() {
    // Write clone operations
}
`,
        solutionCode: `fn main() {
    let s1 = String::from("Core");
    let s2 = s1.clone();
    println!("s1: {}, s2: {}", s1, s2);
}`
      }
    ],
    quizzes: [
      {
        id: 'q-rust-own-1',
        question: 'What are the 3 core rules of Ownership in Rust?',
        options: [
          '1. Each value has an owner; 2. Only one owner at a time; 3. When owner exits scope, value is dropped',
          '1. All variables are pointers; 2. Heap is infinite; 3. Garbage collector runs every 10s',
          '1. Everything is mutable; 2. Types are dynamic; 3. Functions return null',
          '1. Rust uses C malloc; 2. Free is manual; 3. Pointers can be null'
        ],
        correctOptionIndex: 0,
        explanation: 'These 3 rules govern Rust\'s compile-time memory safety model.'
      },
      {
        id: 'q-rust-own-2',
        question: 'What happens when `let s2 = s1;` is executed on `let s1 = String::from("hello");`?',
        options: [
          'Ownership of the heap memory moves to s2, and s1 becomes invalid to use',
          'A deep copy of the string is created in memory',
          'Both s1 and s2 own the string simultaneously',
          'Compilation error'
        ],
        correctOptionIndex: 0,
        explanation: 'Heap types transfer ownership (move semantics), invalidating the source variable.'
      },
      {
        id: 'q-rust-own-3',
        question: 'Which of the following types implements the `Copy` trait in Rust?',
        options: ['String', 'Vec<i32>', 'i32 (primitive integer)', 'Box<u8>'],
        correctOptionIndex: 2,
        explanation: 'Simple stack-allocated types like i32 implement Copy and duplicate on assignment.'
      },
      {
        id: 'q-rust-own-4',
        question: 'How do you explicitly perform a deep duplication of heap data in Rust?',
        options: ['s.clone()', 's.copy()', 's.duplicate()', 'new s'],
        correctOptionIndex: 0,
        explanation: '`.clone()` creates an explicit deep copy of heap allocations.'
      },
      {
        id: 'q-rust-own-5',
        question: 'What happens to a value in Rust when its owner variable goes out of scope at a closing `}`?',
        options: [
          'Its destructor (`drop`) runs automatically and memory is immediately freed',
          'It stays allocated until the garbage collector runs',
          'It leaks into global memory',
          'It is compressed'
        ],
        correctOptionIndex: 0,
        explanation: 'Rust automatically frees memory when owner exits scope (RAII).'
      }
    ],
    codingChallenge: {
      id: 'rust-ch-ownership',
      title: 'Ownership Transfer Simulator',
      slug: 'rust-ownership-simulator',
      instruction: 'Output "OWNERSHIP_MOVE_VERIFIED".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-rust-own-1',
          input: '',
          expectedOutput: 'OWNERSHIP_MOVE_VERIFIED'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'rust-borrowing'
  },
  {
    id: 'rust-borrowing',
    language: 'rust',
    title: 'Borrowing, References & The Aliasing XOR Mutability Rule',
    slug: 'rust-borrowing',
    category: 'Ownership & Borrowing',
    categoryId: 'rust-memory',
    level: 'intermediate',
    order: 4,
    estimatedMinutes: 12,
    prerequisites: ['rust-ownership'],
    introduction: 'Borrowing allows accessing data through references without transferring ownership.',
    explanation: `### The Golden Borrowing Rule (Aliasing XOR Mutability):
At any given point in program execution, you can have:
• **EITHER any number of immutable references (\`&T\`)**
• **OR exactly one mutable reference (\`&mut T\`)**
• **NEVER both simultaneously!**

This rule completely eliminates data races, iterator invalidation, and dangling pointers at compile time.`,
    syntax: `let mut s = String::from("APEX");

// Immutable borrow (read-only)
let len = calculate_len(&s);

// Mutable borrow (read-write)
append_engine(&mut s);

fn calculate_len(s: &String) -> usize { s.len() }
fn append_engine(s: &mut String) { s.push_str(" Engine"); }`,
    syntaxBreakdown: `• &T : Shared read-only reference
• &mut T : Exclusive mutable reference
• Borrow Checker : Compile-time verification ensuring references are valid`,
    codeExamples: [
      {
        title: 'Borrowing for Read-Only Inspection',
        code: `fn print_len(s: &String) {
    println!("String '{}' has length {}", s, s.len());
}

fn main() {
    let text = String::from("Rustacean");
    print_len(&text);
    println!("Original text still valid: {}", text);
}`,
        explanation: 'Passes &text reference so main retains ownership.',
        output: 'String \'Rustacean\' has length 9\nOriginal text still valid: Rustacean'
      }
    ],
    practicalExamples: [
      {
        title: 'Mutable In-Place Mutation',
        code: `fn add_suffix(s: &mut String) {
    s.push_str("_OK");
}

fn main() {
    let mut status = String::from("SYSTEM");
    add_suffix(&mut status);
    println!("Updated: {}", status);
}`,
        explanation: 'Mutates string in place via exclusive mutable reference.',
        output: 'Updated: SYSTEM_OK'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Creating a mutable reference while immutable references are still in active use.',
        correction: 'Ensure immutable borrows have finished before creating a mutable borrow.',
        explanation: 'Simultaneous read and write references violates the borrow checker rules.'
      }
    ],
    keyPoints: [
      '&T allows multiple concurrent readers.',
      '&mut T grants exclusive single-writer access.',
      'References must always remain valid and never outlive the data they point to.'
    ],
    hint: {
      summary: '&T is shared read-only; &mut T is exclusive mutable. You can have many &T OR one &mut T.',
      keyRules: [
        'Borrowing with & does not take ownership.',
        'Only 1 mutable reference allowed at a time.',
        'References cannot outlive their owner.'
      ],
      cheatsheetMarkdown: `\`\`\`rust
fn inspect(s: &String) {} // read
fn mutate(s: &mut String) {} // write
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-rust-bor-1',
        title: 'Borrow Reference',
        instruction: 'Create `let s = String::from("Rust");`. Pass `&s` to a function and print "Length: 4".',
        starterCode: `fn main() {
    // Write borrow code
}
`,
        solutionCode: `fn get_len(s: &String) -> usize { s.len() }
fn main() {
    let s = String::from("Rust");
    println!("Length: {}", get_len(&s));
}`
      }
    ],
    quizzes: [
      {
        id: 'q-rust-bor-1',
        question: 'What is the core aliasing/mutability rule enforced by Rust\'s Borrow Checker?',
        options: [
          'You may have either any number of immutable references OR exactly one mutable reference at a time',
          'You can have unlimited mutable references at all times',
          'References cannot be passed to functions',
          'References must be freed with free()'
        ],
        correctOptionIndex: 0,
        explanation: 'The aliasing XOR mutability rule prevents all data races at compile time.'
      },
      {
        id: 'q-rust-bor-2',
        question: 'Does borrowing a variable with `&var` transfer ownership of the variable?',
        options: [
          'No, borrowing creates a reference while the original owner retains ownership',
          'Yes, ownership is transferred',
          'Only for Strings',
          'Only in loops'
        ],
        correctOptionIndex: 0,
        explanation: 'References borrow access without taking ownership.'
      },
      {
        id: 'q-rust-bor-3',
        question: 'What is the syntax to pass a mutable reference to variable `data`?',
        options: ['&mut data', 'mut &data', '*data', 'ref data'],
        correctOptionIndex: 0,
        explanation: '`&mut var` creates an exclusive mutable reference.'
      },
      {
        id: 'q-rust-bor-4',
        question: 'What critical bug does the rule "only one mutable reference at a time" prevent in concurrent code?',
        options: ['Data races (unsynchronized concurrent read/write)', 'Syntax errors', 'Out of memory errors', 'Compiler crashes'],
        correctOptionIndex: 0,
        explanation: 'Exclusive mutability eliminates data races by construction.'
      },
      {
        id: 'q-rust-bor-5',
        question: 'What happens if a function tries to return a reference to a local variable created inside the function?',
        options: [
          'The compiler rejects the code because the reference would dangle after the local variable is dropped',
          'It compiles and returns null',
          'The variable is moved to heap automatically',
          'The program crashes at runtime'
        ],
        correctOptionIndex: 0,
        explanation: 'Rust\'s lifetime checker rejects returning references to dropped stack variables.'
      }
    ],
    codingChallenge: {
      id: 'rust-ch-borrowing',
      title: 'Borrow Checker Validation',
      slug: 'rust-borrow-validation',
      instruction: 'Output "BORROW_CHECKER_VERIFIED".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-rust-bor-1',
          input: '',
          expectedOutput: 'BORROW_CHECKER_VERIFIED'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'rust-structs-enums'
  },
  {
    id: 'rust-structs-enums',
    language: 'rust',
    title: 'Structs, Enums & Option/Result Handling',
    slug: 'rust-structs-enums',
    category: 'Structs, Enums, Traits & Errors',
    categoryId: 'rust-types-traits',
    level: 'advanced',
    order: 5,
    estimatedMinutes: 14,
    prerequisites: ['rust-borrowing'],
    introduction: 'Rust enums are algebraic data types that can contain associated data, making `Option<T>` and `Result<T, E>` fundamental to robust error handling.',
    explanation: `### Structs & Methods:
• Define fields with \`struct Name { field: Type }\`.
• Methods are implemented in \`impl Name\` blocks taking \`&self\` or \`&mut self\`.

### \`Option<T>\` (No Nulls in Rust!):
• \`Some(T)\` : Holds a value.
• \`None\` : Represents absence of value.

### \`Result<T, E>\`:
• \`Ok(T)\` : Represents success holding return value.
• \`Err(E)\` : Represents failure holding error info.`,
    syntax: `struct Agent {
    name: String,
    level: u32,
}

impl Agent {
    fn greet(&self) {
        println!("Agent {} (Level {})", self.name, self.level);
    }
}`,
    syntaxBreakdown: `• struct Name { ... } : Named field composite type
• impl Name { fn method(&self) } : Method implementation block
• Option<T> : Some(val) | None
• Result<T, E> : Ok(val) | Err(err)`,
    codeExamples: [
      {
        title: 'Option Pattern Matching',
        code: `fn find_agent(id: u32) -> Option<&'static str> {
    if id == 1 { Some("Aria") } else { None }
}

fn main() {
    match find_agent(1) {
        Some(name) => println!("Found: {}", name),
        None => println!("Agent not found"),
    }
}`,
        explanation: 'Uses Option enum to handle missing values safely without null pointers.',
        output: 'Found: Aria'
      }
    ],
    practicalExamples: [
      {
        title: 'Result Error Handling',
        code: `fn divide(a: f64, b: f64) -> Result<f64, &'static str> {
    if b == 0.0 {
        Err("Division by zero")
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(res) => println!("Result: {}", res),
        Err(e) => println!("Error: {}", e),
    }
}`,
        explanation: 'Returns Result<T, E> for clean error handling.',
        output: 'Result: 5'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `.unwrap()` indiscriminately in production code.',
        correction: 'Use `match`, `if let`, or the `?` operator to handle errors gracefully.',
        explanation: 'Calling `.unwrap()` on a `None` or `Err` value causes the thread to panic and crash.'
      }
    ],
    keyPoints: [
      'Rust eliminates NullPointerException by replacing null with Option<T>.',
      'Result<T, E> models operations that can succeed (Ok) or fail (Err).',
      'impl blocks attach methods to structs.'
    ],
    hint: {
      summary: 'Option<T> has Some(v) and None; Result<T,E> has Ok(v) and Err(e); impl attaches methods.',
      keyRules: [
        'No null in Rust; use Option<T>.',
        'Handle Results with match or `?`.',
        'Methods take &self as first parameter.'
      ],
      cheatsheetMarkdown: `\`\`\`rust
let opt: Option<i32> = Some(10);
let res: Result<i32, String> = Ok(42);
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-rust-se-1',
        title: 'Handle Option with Match',
        instruction: 'Given `let val: Option<i32> = Some(42);`, match and print "Value: 42".',
        starterCode: `fn main() {
    let val: Option<i32> = Some(42);
    // Match and print "Value: 42"
}
`,
        solutionCode: `fn main() {
    let val: Option<i32> = Some(42);
    match val {
        Some(v) => println!("Value: {}", v),
        None => println!("None"),
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-rust-se-1',
        question: 'Does the standard Rust programming language have a `null` or `nil` keyword?',
        options: [
          'No, Rust completely replaces null with the type-safe `Option<T>` enum (`Some(T)` and `None`)',
          'Yes, identical to C',
          'Only in unsafe blocks',
          'Only for pointers'
        ],
        correctOptionIndex: 0,
        explanation: 'Rust eliminates the "billion dollar mistake" of null pointers using Option<T>.'
      },
      {
        id: 'q-rust-se-2',
        question: 'What are the two variants of the standard `Result<T, E>` enum in Rust?',
        options: ['Ok(T) and Err(E)', 'Success(T) and Failure(E)', 'True and False', 'Some(T) and None'],
        correctOptionIndex: 0,
        explanation: 'Result<T, E> has variants `Ok(T)` representing success and `Err(E)` for errors.'
      },
      {
        id: 'q-rust-se-3',
        question: 'What happens if you call `.unwrap()` on a `Result::Err` or `Option::None` value in Rust?',
        options: [
          'The thread panics and terminates execution immediately',
          'Returns 0 silently',
          'Retries the operation',
          'Logs a warning'
        ],
        correctOptionIndex: 0,
        explanation: 'unwrap() panics if the variant is Err or None.'
      },
      {
        id: 'q-rust-se-4',
        question: 'How are methods associated with a struct `struct Player` in Rust syntax?',
        options: ['Inside an `impl Player { ... }` block', 'Inside the struct definition directly', 'Using class syntax', 'Using functions only'],
        correctOptionIndex: 0,
        explanation: '`impl StructName { ... }` blocks contain method definitions.'
      },
      {
        id: 'q-rust-se-5',
        question: 'What parameter must an instance method in an `impl` block declare to read fields without taking ownership?',
        options: ['&self', 'this', 'self by value', 'super'],
        correctOptionIndex: 0,
        explanation: '`&self` borrows the instance immutably for method execution.'
      }
    ],
    codingChallenge: {
      id: 'rust-ch-structs-enums',
      title: 'Option Match Output',
      slug: 'rust-option-match',
      instruction: 'Output "OPTION_VALUE_PRESENT: 100".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-rust-se-1',
          input: '',
          expectedOutput: 'OPTION_VALUE_PRESENT: 100'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'rust-traits-generics'
  },
  {
    id: 'rust-traits-generics',
    language: 'rust',
    title: 'Traits, Generics & The ? Error Operator',
    slug: 'rust-traits-generics',
    category: 'Structs, Enums, Traits & Errors',
    categoryId: 'rust-types-traits',
    level: 'advanced',
    order: 6,
    estimatedMinutes: 14,
    prerequisites: ['rust-structs-enums'],
    introduction: 'Traits define shared behavior across types in Rust, similar to interfaces in other languages, and empower generic programming with zero runtime overhead.',
    explanation: `### Defining and Implementing Traits:
\`\`\`rust
trait Summarize {
    fn summarize(&self) -> String;
}

impl Summarize for Agent {
    fn summarize(&self) -> String {
        format!("Agent: {}", self.name)
    }
}
\`\`\`

### The \`?\` Error Propagation Operator:
When applied to a \`Result\` or \`Option\`, the \`?\` operator unwraps the \`Ok\` value or immediately returns the \`Err\` from the enclosing function:
\`let file = File::open("log.txt")?;\``,
    syntax: `fn print_summary<T: Summarize>(item: &T) {
    println!("{}", item.summarize());
}`,
    syntaxBreakdown: `• trait Name { ... } : Shared interface contract
• impl Trait for Type : Implementation block
• <T: Trait> : Trait bound constraining generic parameter
• ? operator : Early error propagation shortcut`,
    codeExamples: [
      {
        title: 'Generic Trait Implementation',
        code: `trait Describable {
    fn describe(&self) -> String;
}

struct Point { x: i32, y: i32 }
impl Describable for Point {
    fn describe(&self) -> String {
        format!("Point({}, {})", self.x, self.y)
    }
}

fn main() {
    let p = Point { x: 10, y: 20 };
    println!("{}", p.describe());
}`,
        explanation: 'Implements custom Describable trait on Point struct.',
        output: 'Point(10, 20)'
      }
    ],
    practicalExamples: [
      {
        title: 'Error Propagation with Question Mark (?)',
        code: `fn parse_number(s: &str) -> Result<i32, std::num::ParseIntError> {
    let num: i32 = s.trim().parse()?;
    Ok(num * 2)
}

fn main() {
    println!("Parsed: {:?}", parse_number(" 42 "));
}`,
        explanation: 'The ? operator forwards parsing errors automatically.',
        output: 'Parsed: Ok(84)'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using the `?` operator in a function that does not return a `Result` or `Option`.',
        correction: 'Ensure the enclosing function\'s return type is compatible with the error being propagated.',
        explanation: '`?` expands to an early return statement of `Err(e)`.'
      }
    ],
    keyPoints: [
      'Traits define shared behavior contracts.',
      'Generics (<T>) allow type-agnostic code with monomorphized native performance.',
      'The ? operator is syntactic sugar for early error returns.'
    ],
    hint: {
      summary: 'trait TraitName { fn method(&self); }; <T: Trait> sets bounds; ? propagates errors.',
      keyRules: [
        'Traits declare method signatures.',
        'Use #[derive(Debug)] for automatic printing.',
        '? operator unwraps Ok or returns Err early.'
      ],
      cheatsheetMarkdown: `\`\`\`rust
trait Greet { fn greet(&self); }
fn execute<T: Greet>(item: &T) { item.greet(); }
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-rust-tg-1',
        title: 'Implement Trait',
        instruction: 'Print "TRAIT_IMPLEMENTED: OK".',
        starterCode: `fn main() {
    // Print trait confirmation
}
`,
        solutionCode: `fn main() {
    println!("TRAIT_IMPLEMENTED: OK");
}`
      }
    ],
    quizzes: [
      {
        id: 'q-rust-tg-1',
        question: 'What does the `?` operator do when appended to a `Result` expression in Rust?',
        options: [
          'Unwraps the `Ok(val)` value or immediately returns the `Err(e)` from the enclosing function',
          'Prints a question mark to the console',
          'Retries the function 3 times',
          'Ignores the error silently'
        ],
        correctOptionIndex: 0,
        explanation: '`?` is the standard Rust idiom for ergonomic error propagation.'
      },
      {
        id: 'q-rust-tg-2',
        question: 'What is a "Trait" in the Rust programming language?',
        options: [
          'A contract defining a set of method signatures that types can implement (similar to interfaces)',
          'A hardware thread',
          'A pointer type',
          'A macro'
        ],
        correctOptionIndex: 0,
        explanation: 'Traits define shared behavior contracts across types.'
      },
      {
        id: 'q-rust-tg-3',
        question: 'How do you automatically implement common traits like `Debug`, `Clone`, and `PartialEq` on a struct?',
        options: ['#[derive(Debug, Clone, PartialEq)]', 'implements Debug', 'trait: Debug', 'auto Debug'],
        correctOptionIndex: 0,
        explanation: '`#[derive(...)]` attributes generate trait implementations automatically at compile time.'
      },
      {
        id: 'q-rust-tg-4',
        question: 'What is "Trait Bound" in Rust generics syntax `fn process<T: Summary>(item: T)`?',
        options: [
          'It restricts the generic type T to types that implement the `Summary` trait',
          'It sets array limits',
          'It frees memory',
          'It binds variables to global scope'
        ],
        correctOptionIndex: 0,
        explanation: 'Trait bounds constrain generic types to those providing specific capabilities.'
      },
      {
        id: 'q-rust-tg-5',
        question: 'How does Rust achieve zero runtime cost for generic template functions?',
        options: [
          'Via compile-time monomorphization (generating specialized native code for each concrete type used)',
          'Using dynamic type reflection',
          'Using a virtual machine',
          'By converting everything to void*'
        ],
        correctOptionIndex: 0,
        explanation: 'Monomorphization produces optimized native machine code identical to hand-written functions.'
      }
    ],
    codingChallenge: {
      id: 'rust-ch-traits-generics',
      title: 'Trait Implementation Output',
      slug: 'rust-trait-implementation',
      instruction: 'Output "TRAIT_DISPATCH_SUCCESS".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-rust-tg-1',
          input: '',
          expectedOutput: 'TRAIT_DISPATCH_SUCCESS'
        }
      ],
      xpReward: 50
    },
    xpReward: 50
  }
]
