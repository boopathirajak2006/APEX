import type { CodingLanguage, QuizQuestion, CodingChallenge } from '../../src/types'

export interface LanguageSkillAssessment {
  language: CodingLanguage
  title: string
  quizzes: QuizQuestion[]
  codingChallenge: CodingChallenge
}

export const SKILL_CHECK_BANK: Record<CodingLanguage, LanguageSkillAssessment> = {
  python: {
    language: 'python',
    title: 'Python Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-py-01',
        question: 'What will be the output of `print([x**2 for x in range(4) if x % 2 == 0])`?',
        codeSnippet: 'print([x**2 for x in range(4) if x % 2 == 0])',
        options: ['[0, 4]', '[0, 1, 4, 9]', '[4]', '[0, 2]'],
        correctOptionIndex: 0,
        explanation: 'range(4) produces 0, 1, 2, 3. The even numbers are 0 and 2. Their squares are 0 and 4.'
      },
      {
        id: 'sc-py-02',
        question: 'What is the key difference between a Python List and a Python Tuple?',
        options: [
          'Lists are immutable, Tuples are mutable',
          'Lists are mutable, Tuples are immutable',
          'Tuples can only store numbers',
          'Lists use parentheses ()'
        ],
        correctOptionIndex: 1,
        explanation: 'Lists can be modified in-place after creation (mutable), whereas Tuples cannot (immutable).'
      },
      {
        id: 'sc-py-03',
        question: 'Which dictionary method safely retrieves a key value with a default fallback if the key does not exist?',
        options: ['dict.find(key, default)', 'dict.get(key, default)', 'dict.fetch(key)', 'dict.lookup(key)'],
        correctOptionIndex: 1,
        explanation: 'dict.get(key, default) avoids KeyError exceptions by returning the default value.'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-py',
      title: 'Even Squares Filter',
      slug: 'even-squares-filter',
      instruction: 'Write a Python function `solution(nums)` that takes a list of integers and returns the sum of the squares of all even numbers. Call `print(solution([1, 2, 3, 4]))`.',
      starterCode: 'def solution(nums):\n    # Write your solution here\n    pass\n\nprint(solution([1, 2, 3, 4]))\n',
      testCases: [
        {
          id: 'tc-sc-py-1',
          input: '[1, 2, 3, 4]',
          expectedOutput: '20'
        },
        {
          id: 'tc-sc-py-2',
          input: '[2, 4, 6]',
          expectedOutput: '56'
        }
      ],
      xpReward: 150
    }
  },
  javascript: {
    language: 'javascript',
    title: 'JavaScript Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-js-01',
        question: 'What is the output of `console.log(typeof null)` in JavaScript?',
        codeSnippet: 'console.log(typeof null);',
        options: ['"null"', '"object"', '"undefined"', '"number"'],
        correctOptionIndex: 1,
        explanation: 'typeof null returning "object" is a historic legacy behavior in JavaScript.'
      },
      {
        id: 'sc-js-02',
        question: 'Which array method returns a new array with all elements that pass the test implemented by the provided function?',
        options: ['map()', 'filter()', 'reduce()', 'find()'],
        correctOptionIndex: 1,
        explanation: 'filter() creates a shallow copy of an array filtered down to elements that pass the test.'
      },
      {
        id: 'sc-js-03',
        question: 'What will `console.log([1, 2, 3] + [4, 5, 6])` evaluate to?',
        options: ['[1, 2, 3, 4, 5, 6]', '"1,2,34,5,6"', 'NaN', 'Error'],
        correctOptionIndex: 1,
        explanation: 'The + operator coerces arrays into strings ("1,2,3" + "4,5,6") resulting in "1,2,34,5,6".'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-js',
      title: 'Sum of Evens Multiplier',
      slug: 'sum-of-evens-multiplier',
      instruction: 'Write a JavaScript function `solution(arr)` that filters even numbers, multiplies each by 3, and returns the total sum. Call `console.log(solution([1, 2, 3, 4]));`.',
      starterCode: 'function solution(arr) {\n  // Write your solution here\n}\n\nconsole.log(solution([1, 2, 3, 4]));\n',
      testCases: [
        {
          id: 'tc-sc-js-1',
          input: '[1, 2, 3, 4]',
          expectedOutput: '18'
        }
      ],
      xpReward: 150
    }
  },
  typescript: {
    language: 'typescript',
    title: 'TypeScript Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-ts-01',
        question: 'What is the purpose of the `unknown` type compared to `any` in TypeScript?',
        options: [
          '`unknown` is identical to `any`',
          '`unknown` is type-safe because you must perform type checking or casting before performing operations on it',
          '`unknown` only allows string values',
          '`unknown` is deprecated'
        ],
        correctOptionIndex: 1,
        explanation: 'unknown enforces defensive type-narrowing before accessing properties.'
      },
      {
        id: 'sc-ts-02',
        question: 'Which keyword creates a new type by picking a set of properties from an existing interface?',
        options: ['Omit<T, K>', 'Pick<T, K>', 'Extract<T, U>', 'Exclude<T, U>'],
        correctOptionIndex: 1,
        explanation: 'Pick<T, K> constructs a type by picking specific property keys K from T.'
      },
      {
        id: 'sc-ts-03',
        question: 'What does the `readonly` modifier on an array property accomplish?',
        options: [
          'Hides the array from other files',
          'Prevents mutations (push, pop, index assignment) to the array',
          'Makes the array run faster',
          'Converts the array to a string'
        ],
        correctOptionIndex: 1,
        explanation: 'ReadonlyArray<T> disallows mutating array methods.'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-ts',
      title: 'Typed Formatter',
      slug: 'typed-formatter',
      instruction: 'Create a function `solution(name: string, score: number): string` that returns `${name} scored ${score} pts`. Call `console.log(solution("Cipher", 95));`.',
      starterCode: 'function solution(name: string, score: number): string {\n  // Write your solution here\n  return "";\n}\n\nconsole.log(solution("Cipher", 95));\n',
      testCases: [
        {
          id: 'tc-sc-ts-1',
          input: '"Cipher", 95',
          expectedOutput: 'Cipher scored 95 pts'
        }
      ],
      xpReward: 150
    }
  },
  cpp: {
    language: 'cpp',
    title: 'C++ Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-cpp-01',
        question: 'Which smart pointer in modern C++ (C++11+) provides exclusive ownership of a dynamically allocated resource?',
        options: ['std::shared_ptr', 'std::unique_ptr', 'std::weak_ptr', 'std::auto_ptr'],
        correctOptionIndex: 1,
        explanation: 'std::unique_ptr ensures single ownership and automatically deallocates memory when it goes out of scope.'
      },
      {
        id: 'sc-cpp-02',
        question: 'What is the time complexity of looking up a key in a `std::unordered_map` on average?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
        correctOptionIndex: 2,
        explanation: 'std::unordered_map is implemented with a hash table, providing O(1) average lookup.'
      },
      {
        id: 'sc-cpp-03',
        question: 'What does the `const` keyword on a member function declaration `void print() const;` signify?',
        options: [
          'The function runs at compile time',
          'The function guarantees it will not modify any non-mutable member variables of the class object',
          'The function cannot take parameters',
          'The function returns a constant integer'
        ],
        correctOptionIndex: 1,
        explanation: 'const member functions cannot modify class member variables.'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-cpp',
      title: 'C++ Max Finder',
      slug: 'cpp-max-finder',
      instruction: 'Output the maximum of two numbers 45 and 90.',
      starterCode: '// Write your solution code here\n',
      testCases: [
        {
          id: 'tc-sc-cpp-1',
          input: '',
          expectedOutput: '90'
        }
      ],
      xpReward: 150
    }
  },
  java: {
    language: 'java',
    title: 'Java Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-java-01',
        question: 'Which keyword in Java prevents a method from being overridden by subclasses?',
        options: ['static', 'final', 'abstract', 'private'],
        correctOptionIndex: 1,
        explanation: 'The final keyword on a method prevents method overriding.'
      },
      {
        id: 'sc-java-02',
        question: 'What is the difference between `==` and `.equals()` when comparing two String objects in Java?',
        options: [
          '`==` compares content, `.equals()` compares memory reference',
          '`==` compares memory reference, `.equals()` compares character sequence content',
          'They are identical',
          '`==` converts strings to uppercase'
        ],
        correctOptionIndex: 1,
        explanation: '== tests object identity (reference equality), while .equals() tests value equality.'
      },
      {
        id: 'sc-java-03',
        question: 'Which interface in the Java Collections Framework allows storing unique elements without duplicates?',
        options: ['List', 'Set', 'Map', 'Queue'],
        correctOptionIndex: 1,
        explanation: 'Set implementations (like HashSet, TreeSet) contain no duplicate elements.'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-java',
      title: 'Java Array Accumulator',
      slug: 'java-array-accumulator',
      instruction: 'Output the sum of integers 10, 20, 30.',
      starterCode: '// Write your solution code here\n',
      testCases: [
        {
          id: 'tc-sc-java-1',
          input: '',
          expectedOutput: '60'
        }
      ],
      xpReward: 150
    }
  },
  rust: {
    language: 'rust',
    title: 'Rust Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-rust-01',
        question: 'What is the core ownership rule in Rust regarding mutable and immutable references?',
        options: [
          'You can have unlimited mutable references at the same time',
          'You can have either one mutable reference OR any number of immutable references, but not both at once',
          'References cannot be passed to functions',
          'Rust does not support references'
        ],
        correctOptionIndex: 1,
        explanation: 'Rust\'s borrow checker enforces the aliasing XOR mutability rule to prevent data races.'
      },
      {
        id: 'sc-rust-02',
        question: 'Which enum in Rust is used for error handling with success and failure states?',
        options: ['Option<T>', 'Result<T, E>', 'Either<L, R>', 'Status<T>'],
        correctOptionIndex: 1,
        explanation: 'Result<T, E> has variants Ok(T) and Err(E).'
      },
      {
        id: 'sc-rust-03',
        question: 'What does the `?` operator do when placed after an expression returning a Result?',
        options: [
          'Prints a question mark',
          'Unwraps the Ok value or immediately returns the Err from the enclosing function',
          'Ignores the error',
          'Retries the operation 3 times'
        ],
        correctOptionIndex: 1,
        explanation: 'The ? operator is syntactic sugar for early error propagation.'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-rust',
      title: 'Rust Vector Sum',
      slug: 'rust-vector-sum',
      instruction: 'Output the product of 7 and 8.',
      starterCode: '// Write your solution code here\n',
      testCases: [
        {
          id: 'tc-sc-rust-1',
          input: '',
          expectedOutput: '56'
        }
      ],
      xpReward: 150
    }
  },
  sql: {
    language: 'sql',
    title: 'SQL Database Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-sql-01',
        question: 'Which SQL statement retrieves all unique values from a column named `country` in a table named `customers`?',
        options: [
          'SELECT DISTINCT country FROM customers;',
          'SELECT UNIQUE country FROM customers;',
          'SELECT DIFFERENT country FROM customers;',
          'SELECT ALL country FROM customers;'
        ],
        correctOptionIndex: 0,
        explanation: 'SELECT DISTINCT filters out duplicate rows in the result set.'
      },
      {
        id: 'sc-sql-02',
        question: 'Which JOIN returns all records from the left table and matched records from the right table?',
        options: ['INNER JOIN', 'LEFT JOIN (LEFT OUTER JOIN)', 'RIGHT JOIN', 'CROSS JOIN'],
        correctOptionIndex: 1,
        explanation: 'LEFT JOIN keeps all rows from the left table regardless of right table matches.'
      },
      {
        id: 'sc-sql-03',
        question: 'What is the purpose of a database Index in SQL?',
        options: [
          'To encrypt column data',
          'To speed up data retrieval queries at the cost of additional write storage and slower INSERT/UPDATEs',
          'To enforce primary key uniqueness only',
          'To compress the database file size'
        ],
        correctOptionIndex: 1,
        explanation: 'Indexes (B-Trees) accelerate SELECT lookups from O(N) full table scans to O(log N).'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-sql',
      title: 'SQL Query Simulation',
      slug: 'sql-query-sim',
      instruction: 'Output the number of orders with status "COMPLETED" given total count 42.',
      starterCode: '-- Write your SQL query / solution code here\n',
      testCases: [
        {
          id: 'tc-sc-sql-1',
          input: '',
          expectedOutput: '42'
        }
      ],
      xpReward: 150
    }
  },
  c: {
    language: 'c',
    title: 'C Programming Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-c-01',
        question: 'What is the purpose of the `&` operator when passed to `scanf("%d", &num)`?',
        options: ['Bitwise AND', 'Address-of operator to pass the memory location of num', 'Logical AND', 'Dereference operator'],
        correctOptionIndex: 1,
        explanation: 'scanf requires pointers (addresses) to store input directly into the variable memory location.'
      },
      {
        id: 'sc-c-02',
        question: 'Which standard library function dynamically allocates uninitialized memory in C?',
        options: ['malloc()', 'calloc()', 'realloc()', 'free()'],
        correctOptionIndex: 0,
        explanation: 'malloc() allocates raw uninitialized memory bytes of specified size on the heap.'
      },
      {
        id: 'sc-c-03',
        question: 'What character terminates strings in standard C?',
        options: ['\\n', '\\0 (null byte)', ';', 'EOF'],
        correctOptionIndex: 1,
        explanation: 'C strings are null-terminated character arrays ending with the byte 0 (\\0).'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-c',
      title: 'C Pointer Output',
      slug: 'c-pointer-output',
      instruction: 'Output the value 100.',
      starterCode: '// Write your solution code here\n',
      testCases: [
        {
          id: 'tc-sc-c-1',
          input: '',
          expectedOutput: '100'
        }
      ],
      xpReward: 150
    }
  },
  html: {
    language: 'html',
    title: 'HTML5 Semantic Web Diagnostic Assessment',
    quizzes: [
      {
        id: 'sc-html-01',
        question: 'Which HTML5 semantic element is most appropriate for a standalone, distributable piece of content like a blog post or news article?',
        options: ['<section>', '<article>', '<div>', '<aside>'],
        correctOptionIndex: 1,
        explanation: '<article> represents self-contained, independently syndicatable or reusable compositions.'
      },
      {
        id: 'sc-html-02',
        question: 'What does the `alt` attribute on an `<img>` tag provide?',
        options: [
          'Image animation speed',
          'Alternative text for screen readers and search engines when images fail to render',
          'Image alignment to left or right',
          'High definition image URL'
        ],
        correctOptionIndex: 1,
        explanation: 'alt text is critical for accessibility (WCAG) and SEO indexing.'
      },
      {
        id: 'sc-html-03',
        question: 'Which meta tag configuration ensures proper mobile-responsive viewport scaling?',
        options: [
          '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '<meta name="responsive" content="true">',
          '<meta name="mobile" content="scale">',
          '<meta name="screen" content="all">'
        ],
        correctOptionIndex: 0,
        explanation: 'width=device-width, initial-scale=1.0 matches the viewport to the device screen size.'
      }
    ],
    codingChallenge: {
      id: 'sc-challenge-html',
      title: 'HTML Heading Counter',
      slug: 'html-heading-counter',
      instruction: 'Output the count of standard heading level tags in HTML (h1 through h6). (Output 6).',
      starterCode: '<!-- Write your HTML / solution code here -->\n',
      testCases: [
        {
          id: 'tc-sc-html-1',
          input: '',
          expectedOutput: '6'
        }
      ],
      xpReward: 150
    }
  }
}
