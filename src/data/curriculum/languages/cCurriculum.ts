import type { CurriculumCategory, CurriculumTopic } from '../types'

export const C_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'c-basics',
    title: 'C Fundamentals & Structure',
    description: 'Program structure, main() function, compilation, data types, and standard I/O.',
    level: 'beginner',
    icon: '🔤',
    topicIds: ['c-intro', 'c-variables', 'c-operators']
  },
  {
    id: 'c-control',
    title: 'Control Flow & Functions',
    description: 'Conditional branching, iterative loops, modular functions, and scope.',
    level: 'beginner',
    icon: '🔀',
    topicIds: ['c-conditionals', 'c-loops', 'c-functions']
  },
  {
    id: 'c-memory',
    title: 'Pointers, Arrays & Strings',
    description: 'Memory addresses, pointers, dereferencing, arrays, and null-terminated strings.',
    level: 'intermediate',
    icon: '🧠',
    topicIds: ['c-pointers', 'c-arrays', 'c-strings']
  },
  {
    id: 'c-structures',
    title: 'Structs, Dynamic Memory & Files',
    description: 'Custom composite data types, heap allocation with malloc, and persistent file stream handling.',
    level: 'advanced',
    icon: '📁',
    topicIds: ['c-structs', 'c-dynamic-memory', 'c-file-io']
  }
]

export const C_TOPICS: CurriculumTopic[] = [
  {
    id: 'c-intro',
    language: 'c',
    title: 'C Program Anatomy & printf()',
    slug: 'c-intro',
    category: 'C Fundamentals & Structure',
    categoryId: 'c-basics',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 8,
    prerequisites: [],
    introduction: 'C is a high-performance procedural programming language designed by Dennis Ritchie in 1972 at Bell Labs, forming the foundation of modern operating systems and runtimes.',
    explanation: `Every C program begins execution in the \`main()\` function. The C standard library provides essential functions like \`printf()\` through header files such as \`<stdio.h>\`.

### Fundamental Structure of a C Program:
1. **Preprocessor Directives (\`#include <stdio.h>\`):** Instructs the compiler preprocessor to include standard input/output declarations before compilation.
2. **The \`main()\` Entry Point:** The operating system launches execution starting at \`int main()\`.
3. **Return Code (\`return 0;\`):** Signifies successful termination of the program to the OS shell.
4. **Statements and Semicolons:** Every individual statement in C must terminate with a semicolon (\`;\`).`,
    syntax: `#include <stdio.h>

int main() {
    printf("Hello from APEX C Engine!\\n");
    return 0;
}`,
    syntaxBreakdown: `• #include <stdio.h> : Header inclusion for I/O operations
• int main() : Main function signature returning integer status
• printf(...) : Formatted console output function
• \\n : Escape character representing newline
• return 0; : Exit code 0 indicating clean execution`,
    codeExamples: [
      {
        title: 'Basic Hello World',
        code: `#include <stdio.h>

int main() {
    printf("Welcome to C Programming on APEX!\\n");
    return 0;
}`,
        explanation: 'Outputs the greeting string followed by a newline character.',
        output: 'Welcome to C Programming on APEX!'
      },
      {
        title: 'Multiple Line Output',
        code: `#include <stdio.h>

int main() {
    printf("Line 1: Systems Level\\n");
    printf("Line 2: High Performance\\n");
    return 0;
}`,
        explanation: 'Sequential calls to printf output text line-by-line.',
        output: 'Line 1: Systems Level\nLine 2: High Performance'
      }
    ],
    practicalExamples: [
      {
        title: 'System Startup Banner',
        code: `#include <stdio.h>

int main() {
    printf("================================\\n");
    printf("    APEX EMBEDDED SYSTEM v1.0   \\n");
    printf("    Status: ONLINE             \\n");
    printf("================================\\n");
    return 0;
}`,
        explanation: 'Formatting structured multi-line text banners in terminal applications.',
        output: '================================\n    APEX EMBEDDED SYSTEM v1.0   \n    Status: ONLINE             \n================================'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Omitting the semicolon at the end of a statement.',
        correction: 'Ensure every statement terminates with a semicolon `;`.',
        explanation: 'The C compiler requires semicolons to delimit statement boundaries.'
      },
      {
        mistake: 'Forgetting #include <stdio.h> when using printf.',
        correction: 'Add `#include <stdio.h>` at the very top of your source file.',
        explanation: 'Without this header, the compiler cannot verify the function signature of printf.'
      }
    ],
    keyPoints: [
      'C is compiled directly to native machine code for maximum throughput.',
      'Execution starts at the int main() entry point.',
      'Header files (.h) provide declarations for library functions.',
      'Every statement ends with a semicolon.'
    ],
    hint: {
      summary: 'main() is the execution entry point; #include <stdio.h> provides printf().',
      keyRules: [
        'Always include <stdio.h> for console I/O.',
        'Terminate statements with `;`.',
        'End main() with `return 0;`.'
      ],
      cheatsheetMarkdown: `\`\`\`c
#include <stdio.h>
int main() {
    printf("Text\\n");
    return 0;
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-intro-1',
        title: 'Print APEX Identity',
        instruction: 'Write a C program that prints "APEX Systems Core" followed by a newline.',
        starterCode: `#include <stdio.h>

int main() {
    // Print "APEX Systems Core"
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    printf("APEX Systems Core\\n");
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-intro-1',
        question: 'Which function is the starting entry point for any standard C program execution?',
        options: ['start()', 'main()', 'init()', 'entry()'],
        correctOptionIndex: 1,
        explanation: 'Every standard C program begins executing at the main() function.'
      },
      {
        id: 'q-c-intro-2',
        question: 'Which header file contains the declaration for the printf() function?',
        options: ['<math.h>', '<stdio.h>', '<stdlib.h>', '<string.h>'],
        correctOptionIndex: 1,
        explanation: '<stdio.h> stands for Standard Input/Output and defines printf.'
      },
      {
        id: 'q-c-intro-3',
        question: 'What does the escape sequence \\n produce in terminal output?',
        options: ['A tab space', 'A newline character', 'A backspace', 'A null terminator'],
        correctOptionIndex: 1,
        explanation: '\\n moves the cursor to the beginning of the next line.'
      },
      {
        id: 'q-c-intro-4',
        question: 'What character MUST terminate every individual statement in C?',
        options: [': (colon)', '; (semicolon)', '. (period)', '} (closing brace)'],
        correctOptionIndex: 1,
        explanation: 'Semicolons are mandatory statement terminators in C syntax.'
      },
      {
        id: 'q-c-intro-5',
        question: 'What does `return 0;` at the end of `main()` signify to the operating system?',
        options: ['Program crashed', 'Successful exit with no errors', 'Program paused', 'Restart the computer'],
        correctOptionIndex: 1,
        explanation: 'A return value of 0 indicates normal, successful execution to the host environment.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-intro',
      title: 'Console Transmitter',
      slug: 'c-console-transmitter',
      instruction: 'Complete the main function to print "Transmission Online".',
      starterCode: `#include <stdio.h>

int main() {
    // Print "Transmission Online"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-intro-1',
          input: '',
          expectedOutput: 'Transmission Online'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-variables'
  },
  {
    id: 'c-variables',
    language: 'c',
    title: 'C Data Types & Format Specifiers',
    slug: 'c-variables',
    category: 'C Fundamentals & Structure',
    categoryId: 'c-basics',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 10,
    prerequisites: ['c-intro'],
    introduction: 'In C, all variables must be explicitly declared with a static data type before they can store data in hardware memory.',
    explanation: `C provides primitive data types with fixed memory bit-widths:
• \`int\`: Standard signed integer (typically 4 bytes on modern 32/64-bit systems).
• \`float\`: Single-precision floating-point number (4 bytes, 6-7 decimal digits precision).
• \`double\`: Double-precision floating-point number (8 bytes, 15-17 decimal digits precision).
• \`char\`: Single ASCII character (1 byte).

### Format Specifiers in \`printf\` & \`scanf\`:
- \`%d\` or \`%i\` : Signed decimal integer
- \`%f\` : Float (use \`%.2f\` for 2 decimal places)
- \`%lf\` : Double precision float
- \`%c\` : Single character
- \`%s\` : Null-terminated string (char array)
- \`%p\` : Hexadecimal pointer memory address`,
    syntax: `int age = 25;
float score = 98.5f;
double pi = 3.1415926535;
char grade = 'A';

printf("Age: %d, Grade: %c, Score: %.1f\\n", age, grade, score);`,
    syntaxBreakdown: `• int / float / char : Type keywords defining byte size and memory representation
• age / grade : Identifier variable names
• = : Assignment operator
• %d / %c / %.1f : Placeholder tokens replaced by subsequent arguments`,
    codeExamples: [
      {
        title: 'Variable Declarations and Printing',
        code: `#include <stdio.h>

int main() {
    int level = 5;
    char tier = 'S';
    float speed = 142.75f;
    
    printf("Player Level: %d\\n", level);
    printf("Tier Rating: %c\\n", tier);
    printf("Velocity: %.2f km/h\\n", speed);
    return 0;
}`,
        explanation: 'Declares typed variables and outputs them using format specifiers.',
        output: 'Player Level: 5\nTier Rating: S\nVelocity: 142.75 km/h'
      }
    ],
    practicalExamples: [
      {
        title: 'Sensor Telemetry Record',
        code: `#include <stdio.h>

int main() {
    int sensorId = 402;
    double voltage = 3.284;
    printf("Telemetry [ID: %d] Voltage: %.3lf V\\n", sensorId, voltage);
    return 0;
}`,
        explanation: 'Formats physical telemetry data for embedded systems.',
        output: 'Telemetry [ID: 402] Voltage: 3.284 V'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using %d for a float variable in printf.',
        correction: 'Use %f for floats and %lf for doubles.',
        explanation: 'Mismatching format specifiers reads memory with the wrong bit interpretation, printing garbage values.'
      },
      {
        mistake: 'Enclosing single characters in double quotes.',
        correction: 'Use single quotes for chars: `char c = \'A\';`.',
        explanation: 'Double quotes denote string literals (`"A"` has an implicit null terminator `\\0` occupying 2 bytes).'
      }
    ],
    keyPoints: [
      'C is statically typed: every variable type is fixed at compile time.',
      'char is 1 byte, int is typically 4 bytes, double is 8 bytes.',
      'Format specifiers link memory values to printf text output.',
      'Format strings can control precision (e.g. %.2f).'
    ],
    hint: {
      summary: 'Data types define memory width; %d for int, %f for float, %c for char, %s for string.',
      keyRules: [
        'int: %d | float: %f | double: %lf | char: %c | string: %s',
        'Single quotes for chars (\'X\'), double quotes for strings ("XYZ").'
      ],
      cheatsheetMarkdown: `\`\`\`c
int x = 10;        // %d
float y = 3.14f;   // %f
char c = 'Z';      // %c
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-var-1',
        title: 'Format Product Info',
        instruction: 'Declare an int id = 101 and float price = 49.50. Print "Product 101 costs $49.50" with 2 decimal precision.',
        starterCode: `#include <stdio.h>

int main() {
    // Declare and print product info
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    int id = 101;
    float price = 49.50f;
    printf("Product %d costs $%.2f\\n", id, price);
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-var-1',
        question: 'Which format specifier is used to print an integer in C?',
        options: ['%s', '%d', '%f', '%c'],
        correctOptionIndex: 1,
        explanation: '%d (or %i) represents signed decimal integers.'
      },
      {
        id: 'q-c-var-2',
        question: 'How do you enclose a single char literal in C syntax?',
        options: ['"A" (double quotes)', "'A' (single quotes)", '`A` (backticks)', '[A] (brackets)'],
        correctOptionIndex: 1,
        explanation: 'Single characters use single quotes in C; double quotes denote null-terminated character arrays (strings).'
      },
      {
        id: 'q-c-var-3',
        question: 'What is the format specifier for a double-precision floating-point number in printf?',
        options: ['%d', '%lf (or %f)', '%c', '%u'],
        correctOptionIndex: 1,
        explanation: '%lf / %f formats floating point numbers.'
      },
      {
        id: 'q-c-var-4',
        question: 'What is the guaranteed minimum size of a standard char in C?',
        options: ['1 byte (8 bits)', '2 bytes (16 bits)', '4 bytes (32 bits)', '8 bytes (64 bits)'],
        correctOptionIndex: 0,
        explanation: 'A char in standard C is guaranteed to be 1 byte (8 bits).'
      },
      {
        id: 'q-c-var-5',
        question: 'What happens if you read an uninitialized local variable in C?',
        options: ['It is automatically 0', 'It contains indeterminate garbage value', 'Compiler throws an error', 'The OS halts'],
        correctOptionIndex: 1,
        explanation: 'Local automatic variables contain whatever random bits previously occupied that memory slot (garbage value).'
      }
    ],
    codingChallenge: {
      id: 'c-ch-vars',
      title: 'Variable Calculation',
      slug: 'c-variable-calculation',
      instruction: 'Declare int a = 15 and int b = 30. Calculate their sum and print "Sum is 45".',
      starterCode: `#include <stdio.h>

int main() {
    int a = 15;
    int b = 30;
    // Compute and print "Sum is 45"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-var-1',
          input: '',
          expectedOutput: 'Sum is 45'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-operators'
  },
  {
    id: 'c-operators',
    language: 'c',
    title: 'Operators & Arithmetic Expressions',
    slug: 'c-operators',
    category: 'C Fundamentals & Structure',
    categoryId: 'c-basics',
    level: 'beginner',
    order: 3,
    estimatedMinutes: 10,
    prerequisites: ['c-variables'],
    introduction: 'Operators in C perform mathematical computations, value assignments, logical evaluations, and bitwise manipulations.',
    explanation: `C includes arithmetic, relational, logical, bitwise, and compound assignment operators.

### Arithmetic & Precedence:
• \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulus remainder operator).
• Integer division (\`5 / 2\`) truncates towards zero to \`2\`. For floating-point results, cast operands: \`(float)5 / 2\` gives \`2.5\`.

### Relational & Logical Operators:
• \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\` (evaluate to \`1\` for true, \`0\` for false).
• \`&&\` (Logical AND), \`||\` (Logical OR), \`!\` (Logical NOT).`,
    syntax: `int a = 10, b = 3;
int sum = a + b;       // 13
int rem = a % b;       // 1
float div = (float)a / b; // 3.333333`,
    syntaxBreakdown: `• % : Modulo operator returning integer remainder
• (float)a : Explicit type-cast converting int to float before division
• && / || : Short-circuit boolean evaluation`,
    codeExamples: [
      {
        title: 'Arithmetic and Type Casting',
        code: `#include <stdio.h>

int main() {
    int total = 17;
    int count = 4;
    float avg = (float)total / count;
    printf("Average: %.2f\\n", avg);
    return 0;
}`,
        explanation: 'Explicit casting of total ensures real floating-point division instead of integer truncation.',
        output: 'Average: 4.25'
      }
    ],
    practicalExamples: [
      {
        title: 'Even/Odd Remainder Checker',
        code: `#include <stdio.h>

int main() {
    int n = 42;
    if (n % 2 == 0) {
        printf("%d is Even\\n", n);
    }
    return 0;
}`,
        explanation: 'Uses modulus % 2 to verify parity.',
        output: '42 is Even'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Dividing two integers and expecting a decimal result (e.g. 7 / 2 == 3.5).',
        correction: 'Cast at least one operand: `(float)7 / 2`.',
        explanation: 'Integer division in C discards fractional digits.'
      },
      {
        mistake: 'Using = (assignment) instead of == (equality test).',
        correction: 'Always use `==` in boolean expressions: `if (x == 5)`.',
        explanation: '`if (x = 5)` assigns 5 to x and evaluates to true because 5 is non-zero.'
      }
    ],
    keyPoints: [
      'In C, non-zero numbers represent true and 0 represents false.',
      'Modulus % only operates on integer data types.',
      'Casting with (type) converts data representation explicitly.',
      'Logical operators && and || use short-circuit evaluation.'
    ],
    hint: {
      summary: 'Cast integers to float for decimal division: (float)a / b; % returns remainder.',
      keyRules: [
        'Integer division truncates: 7 / 2 = 3.',
        'Cast to float: (float)7 / 2 = 3.5.',
        'Use == for comparison, = for assignment.'
      ],
      cheatsheetMarkdown: `\`\`\`c
int rem = 10 % 3;           // 1
float avg = (float)10 / 4;  // 2.5
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-op-1',
        title: 'Calculate Division with Precision',
        instruction: 'Write a C program that calculates 25 divided by 4 with decimal output and prints "Result: 6.25".',
        starterCode: `#include <stdio.h>

int main() {
    int a = 25, b = 4;
    // Calculate and print "Result: 6.25"
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    int a = 25, b = 4;
    float res = (float)a / b;
    printf("Result: %.2f\\n", res);
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-op-1',
        question: 'What is the result of `7 / 2` in C when both operands are integers?',
        options: ['3.5', '3', '4', '3.0'],
        correctOptionIndex: 1,
        explanation: 'Integer division in C truncates fractional decimals, yielding 3.'
      },
      {
        id: 'q-c-op-2',
        question: 'Which operator returns the remainder of an integer division in C?',
        options: ['/', '%', '//', 'rem'],
        correctOptionIndex: 1,
        explanation: 'The % (modulo) operator calculates integer division remainders.'
      },
      {
        id: 'q-c-op-3',
        question: 'In C boolean logic, which value evaluates to FALSE?',
        options: ['0', '1', '-1', 'Any non-zero integer'],
        correctOptionIndex: 0,
        explanation: 'In C, exact 0 is false; any non-zero numeric value evaluates to true.'
      },
      {
        id: 'q-c-op-4',
        question: 'What is the difference between `x = 5` and `x == 5`?',
        options: [
          'No difference',
          '`x = 5` assigns 5 to x; `x == 5` checks if x equals 5',
          '`x == 5` assigns 5 to x',
          '`x = 5` is invalid syntax'
        ],
        correctOptionIndex: 1,
        explanation: '= is assignment; == is relational equality comparison.'
      },
      {
        id: 'q-c-op-5',
        question: 'How do you explicitly cast integer variable `count` to a float?',
        options: ['float(count)', '(float)count', 'cast<float>(count)', 'count.toFloat()'],
        correctOptionIndex: 1,
        explanation: 'C uses prefix parentheses for type casting: (float)count.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-operators',
      title: 'Remainder & Quotient',
      slug: 'c-remainder-quotient',
      instruction: 'Divide 47 by 5. Output "Quotient: 9, Remainder: 2".',
      starterCode: `#include <stdio.h>

int main() {
    int num = 47;
    int div = 5;
    // Print "Quotient: 9, Remainder: 2"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-op-1',
          input: '',
          expectedOutput: 'Quotient: 9, Remainder: 2'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-conditionals'
  },
  {
    id: 'c-conditionals',
    language: 'c',
    title: 'Conditional Branching: if, else & switch',
    slug: 'c-conditionals',
    category: 'Control Flow & Functions',
    categoryId: 'c-control',
    level: 'beginner',
    order: 4,
    estimatedMinutes: 10,
    prerequisites: ['c-operators'],
    introduction: 'Conditional statements allow programs to make decisions and execute specific code blocks depending on runtime evaluations.',
    explanation: `C provides \`if\`, \`else if\`, \`else\`, and \`switch\` statements.

### if-else Construct:
\`\`\`c
if (score >= 90) {
    printf("Grade A\\n");
} else if (score >= 80) {
    printf("Grade B\\n");
} else {
    printf("Grade C\\n");
}
\`\`\`

### switch Statement:
Used for branching on exact integer or char values. Crucial: each case requires a \`break;\` statement to prevent fall-through.`,
    syntax: `switch (choice) {
    case 1:
        printf("Option 1\\n");
        break;
    case 2:
        printf("Option 2\\n");
        break;
    default:
        printf("Invalid\\n");
}`,
    syntaxBreakdown: `• switch (expr) : Evaluates integer/char expression
• case VAL: : Target branch jump point
• break; : Exits the switch block (prevents fall-through)
• default: : Fallback case when no match occurs`,
    codeExamples: [
      {
        title: 'Switch Decision Menu',
        code: `#include <stdio.h>

int main() {
    char cmd = 'R';
    switch (cmd) {
        case 'S':
            printf("Status: START\\n");
            break;
        case 'R':
            printf("Status: RUNNING\\n");
            break;
        default:
            printf("Status: UNKNOWN\\n");
    }
    return 0;
}`,
        explanation: 'Matches character literal against case labels.',
        output: 'Status: RUNNING'
      }
    ],
    practicalExamples: [
      {
        title: 'Access Level Verifier',
        code: `#include <stdio.h>

int main() {
    int clearance = 3;
    if (clearance >= 3) {
        printf("Access Granted: Admin\\n");
    } else {
        printf("Access Denied\\n");
    }
    return 0;
}`,
        explanation: 'Evaluates numeric security clearance level.',
        output: 'Access Granted: Admin'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Omitting break inside a switch case.',
        correction: 'Include `break;` at the end of every case block unless intentional fall-through is required.',
        explanation: 'Without break, execution falls through into subsequent cases.'
      }
    ],
    keyPoints: [
      'if conditions evaluate any non-zero integer as true.',
      'switch statements only work with integer types (int, char, enum).',
      'break terminates switch and loop execution immediately.'
    ],
    hint: {
      summary: 'if-else tests boolean logic; switch branches on integer/char cases with break.',
      keyRules: [
        'Enclose if conditions in parentheses: if (cond).',
        'Use break in switch cases to prevent fallthrough.',
        'Provide a default case in switch for safety.'
      ],
      cheatsheetMarkdown: `\`\`\`c
if (x > 0) { /* ... */ }
switch(c) {
  case 'A': /* ... */ break;
  default: /* ... */
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-cond-1',
        title: 'Temperature State',
        instruction: 'If temp = 100, print "Boiling". If temp = 0, print "Freezing". Else print "Liquid". Test with temp = 100.',
        starterCode: `#include <stdio.h>

int main() {
    int temp = 100;
    // Check and print state
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    int temp = 100;
    if (temp >= 100) {
        printf("Boiling\\n");
    } else if (temp <= 0) {
        printf("Freezing\\n");
    } else {
        printf("Liquid\\n");
    }
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-cond-1',
        question: 'What happens in a C `switch` block if a matching `case` does not have a `break;` statement?',
        options: [
          'Compiler error',
          'Execution falls through into the next case',
          'Program immediately exits',
          'The switch restarts from top'
        ],
        correctOptionIndex: 1,
        explanation: 'In C, omitting break causes case fall-through into subsequent statements.'
      },
      {
        id: 'q-c-cond-2',
        question: 'Which types can be evaluated inside a C `switch` statement?',
        options: ['Floats and doubles', 'Integral types (int, char, enum)', 'Strings (char*)', 'Any struct'],
        correctOptionIndex: 1,
        explanation: 'C switch statements strictly support integral types (int, char, short, long, enum).'
      },
      {
        id: 'q-c-cond-3',
        question: 'What is the purpose of the `default:` label in a `switch` statement?',
        options: [
          'It is executed first before all other cases',
          'It handles any values that did not match any explicit case',
          'It resets all variables to 0',
          'It terminates the program'
        ],
        correctOptionIndex: 1,
        explanation: 'default acts as the fallback branch when no case label matches.'
      },
      {
        id: 'q-c-cond-4',
        question: 'What will `if (-5)` evaluate to in C?',
        options: ['False', 'True', 'Compilation error', 'Undefined behavior'],
        correctOptionIndex: 1,
        explanation: 'In C, any non-zero numeric value (positive or negative) evaluates to true.'
      },
      {
        id: 'q-c-cond-5',
        question: 'What is the syntax for the ternary conditional operator in C?',
        options: ['condition ? expr1 : expr2', 'if condition then expr1 else expr2', 'condition ?? expr1 : expr2', 'condition -> expr1, expr2'],
        correctOptionIndex: 0,
        explanation: 'The ternary operator syntax is `condition ? valIfTrue : valIfFalse`.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-conditionals',
      title: 'Pass/Fail Grade Classifier',
      slug: 'c-pass-fail-classifier',
      instruction: 'Given score = 75, if score >= 60 print "PASSED", otherwise print "FAILED".',
      starterCode: `#include <stdio.h>

int main() {
    int score = 75;
    // Check score and print "PASSED" or "FAILED"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-cond-1',
          input: '',
          expectedOutput: 'PASSED'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-loops'
  },
  {
    id: 'c-loops',
    language: 'c',
    title: 'Loops: for, while & do-while',
    slug: 'c-loops',
    category: 'Control Flow & Functions',
    categoryId: 'c-control',
    level: 'beginner',
    order: 5,
    estimatedMinutes: 10,
    prerequisites: ['c-conditionals'],
    introduction: 'Loops execute a code block repeatedly until a specified termination condition is met.',
    explanation: `C offers three primary loop constructs:
1. **\`for\` loop:** Best when the number of iterations is known upfront (initialization; condition; increment).
2. **\`while\` loop:** Pre-test loop that evaluates the condition before each iteration.
3. **\`do-while\` loop:** Post-test loop that guarantees execution at least once before testing the condition.

### Loop Control Keywords:
• \`break;\`: Exits the enclosing loop immediately.
• \`continue;\`: Skips the rest of the current iteration and jumps to the next iteration step.`,
    syntax: `// for loop
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}

// while loop
int count = 3;
while (count > 0) {
    count--;
}`,
    syntaxBreakdown: `• for (init; cond; step) : Three-part loop control header
• while (cond) : Pre-condition evaluation
• do { ... } while (cond); : Post-condition guaranteed single run`,
    codeExamples: [
      {
        title: 'Accumulator with For Loop',
        code: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("Sum 1..5 is %d\\n", sum);
    return 0;
}`,
        explanation: 'Calculates the sum of integers from 1 to 5.',
        output: 'Sum 1..5 is 15'
      }
    ],
    practicalExamples: [
      {
        title: 'Countdown Timer',
        code: `#include <stdio.h>

int main() {
    int t = 3;
    while (t > 0) {
        printf("%d...\\n", t);
        t--;
    }
    printf("IGNITION!\\n");
    return 0;
}`,
        explanation: 'Emulates countdown loop logic.',
        output: '3...\n2...\n1...\nIGNITION!'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Infinite loop due to forgetting to update loop variable.',
        correction: 'Ensure the loop counter increments/decrements towards termination condition.',
        explanation: 'If condition never becomes false, the program hangs indefinitely.'
      },
      {
        mistake: 'Putting a semicolon immediately after for header: for(int i=0; i<5; i++);',
        correction: 'Remove semicolon after for header so the loop body executes.',
        explanation: 'The semicolon creates an empty loop statement body.'
      }
    ],
    keyPoints: [
      'for loops bundle init, condition, and step in one header.',
      'do-while always executes at least once.',
      'break exits the loop; continue advances to next iteration.'
    ],
    hint: {
      summary: 'for (init; cond; step) for counted loops; while(cond) for indefinite iteration; do-while runs at least once.',
      keyRules: [
        'for (int i = 0; i < N; i++)',
        'do { ... } while (cond); requires a terminating semicolon.',
        'break exits early, continue skips to next iteration.'
      ],
      cheatsheetMarkdown: `\`\`\`c
for (int i = 0; i < 5; i++) { /* 0..4 */ }
int k = 0;
while (k < 5) { k++; }
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-loop-1',
        title: 'Print Even Numbers',
        instruction: 'Write a for loop from 2 to 8 (step by 2) printing each number followed by a space: "2 4 6 8 ".',
        starterCode: `#include <stdio.h>

int main() {
    // Print 2 4 6 8 
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    for (int i = 2; i <= 8; i += 2) {
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-loop-1',
        question: 'Which loop in C is guaranteed to execute its body at least once?',
        options: ['for loop', 'while loop', 'do-while loop', 'infinite loop'],
        correctOptionIndex: 2,
        explanation: 'do-while checks its condition at the end of the iteration.'
      },
      {
        id: 'q-c-loop-2',
        question: 'What does the `continue;` statement do inside a C loop?',
        options: [
          'Exits the loop permanently',
          'Skips the rest of the current iteration and starts the next iteration',
          'Restarts the program from main()',
          'Pauses execution for 1 second'
        ],
        correctOptionIndex: 1,
        explanation: 'continue halts current iteration code and triggers the next step evaluation.'
      },
      {
        id: 'q-c-loop-3',
        question: 'How many times will `for(int i = 0; i < 5; i++)` execute?',
        options: ['4 times', '5 times (i = 0, 1, 2, 3, 4)', '6 times', 'Infinite'],
        correctOptionIndex: 1,
        explanation: 'Starts at 0 and stops when i becomes 5, giving exactly 5 iterations.'
      },
      {
        id: 'q-c-loop-4',
        question: 'What is the result of putting a semicolon directly after the for header: `for (int i = 0; i < 10; i++);`?',
        options: [
          'Compilation error',
          'The loop executes 10 times with an empty body, then subsequent code executes once',
          'The loop runs backwards',
          'The loop is skipped entirely'
        ],
        correctOptionIndex: 1,
        explanation: 'The semicolon is treated as an empty null statement belonging to the loop.'
      },
      {
        id: 'q-c-loop-5',
        question: 'Which statement immediately terminates the innermost enclosing loop in C?',
        options: ['exit()', 'return', 'break;', 'skip;'],
        correctOptionIndex: 2,
        explanation: 'break jumps out of the active loop body.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-loops',
      title: 'Factorial Calculator',
      slug: 'c-factorial-calculator',
      instruction: 'Calculate the factorial of 5 (5 * 4 * 3 * 2 * 1) using a loop and print "Factorial: 120".',
      starterCode: `#include <stdio.h>

int main() {
    int n = 5;
    int fact = 1;
    // Calculate factorial with loop and print "Factorial: 120"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-loop-1',
          input: '',
          expectedOutput: 'Factorial: 120'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-functions'
  },
  {
    id: 'c-functions',
    language: 'c',
    title: 'Functions, Prototypes & Scope',
    slug: 'c-functions',
    category: 'Control Flow & Functions',
    categoryId: 'c-control',
    level: 'beginner',
    order: 6,
    estimatedMinutes: 10,
    prerequisites: ['c-loops'],
    introduction: 'Functions break large programs into modular, reusable, and testable procedures with explicit parameter lists and return types.',
    explanation: `In C, a function must be either defined or declared via a **prototype** before it is called.

### Function Prototype:
Tells the compiler the function name, return type, and parameter types in advance:
\`int add(int a, int b);\`

### Parameter Passing:
By default, C passes arguments **by value** (a copy of the variable is created). Modifying parameter copies inside a function does not alter the original variable in the caller.`,
    syntax: `// Function prototype
int multiply(int x, int y);

int main() {
    int result = multiply(4, 5);
    return 0;
}

// Function definition
int multiply(int x, int y) {
    return x * y;
}`,
    syntaxBreakdown: `• int multiply(...) : Return type and function signature
• (int x, int y) : Parameter list declarations
• return x * y; : Returns computed value to caller`,
    codeExamples: [
      {
        title: 'Modular Function Call',
        code: `#include <stdio.h>

int square(int n) {
    return n * n;
}

int main() {
    int val = 9;
    printf("Square of %d is %d\\n", val, square(val));
    return 0;
}`,
        explanation: 'Defines helper function square() and calls it from main().',
        output: 'Square of 9 is 81'
      }
    ],
    practicalExamples: [
      {
        title: 'Max of Two Numbers',
        code: `#include <stdio.h>

int getMax(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    printf("Max is %d\\n", getMax(45, 92));
    return 0;
}`,
        explanation: 'Encapsulates comparison logic in a pure function.',
        output: 'Max is 92'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Calling a function defined below main() without a forward prototype declaration.',
        correction: 'Add a function prototype above main(): `int myFunc(int a);`.',
        explanation: 'C compilers process files top-down and must know the parameter types in advance.'
      }
    ],
    keyPoints: [
      'Functions encapsulate reusable logic and return a single typed value (or void).',
      'Prototypes declare function signatures above main().',
      'Arguments are passed by value (copied) by default.'
    ],
    hint: {
      summary: 'Declare prototypes above main; pass arguments by value; use void for functions with no return.',
      keyRules: [
        'return_type func_name(param_types);',
        'void means the function does not return a value.',
        'Local variables exist only within the function execution frame.'
      ],
      cheatsheetMarkdown: `\`\`\`c
int add(int a, int b) {
    return a + b;
}
void greet(void) {
    printf("Hello\\n");
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-func-1',
        title: 'Cube Function',
        instruction: 'Write an `int cube(int n)` function that returns n * n * n. Call cube(3) and print "Cube: 27".',
        starterCode: `#include <stdio.h>

// Define cube function

int main() {
    // Call and print "Cube: 27"
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int cube(int n) {
    return n * n * n;
}

int main() {
    printf("Cube: %d\\n", cube(3));
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-func-1',
        question: 'What is a function prototype in C?',
        options: [
          'A compiled binary library',
          'A forward declaration of a function\'s name, return type, and parameters',
          'The main() entry point',
          'A variable holding function pointers'
        ],
        correctOptionIndex: 1,
        explanation: 'Prototypes inform the compiler of function signatures before full implementation.'
      },
      {
        id: 'q-c-func-2',
        question: 'How are standard arguments passed to functions in C by default?',
        options: ['By reference', 'By value (copies of values)', 'By pointer automatically', 'By global memory'],
        correctOptionIndex: 1,
        explanation: 'C passes arguments by value; changes to parameters affect only local copies.'
      },
      {
        id: 'q-c-func-3',
        question: 'What return type is used when a function does not return any value?',
        options: ['null', 'void', 'empty', 'none'],
        correctOptionIndex: 1,
        explanation: 'void signifies no return value.'
      },
      {
        id: 'q-c-func-4',
        question: 'Where do local variables defined inside a function reside in memory?',
        options: ['Heap', 'Stack frame', 'Static data segment', 'ROM'],
        correctOptionIndex: 1,
        explanation: 'Local automatic variables live in the CPU call stack frame for the function.'
      },
      {
        id: 'q-c-func-5',
        question: 'Can two functions in C have the exact same name with different parameters (overloading)?',
        options: ['Yes, C supports function overloading', 'No, C does not support function overloading', 'Only if static', 'Only in main'],
        correctOptionIndex: 1,
        explanation: 'Unlike C++, standard C does not support function overloading.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-functions',
      title: 'Power Calculation Function',
      slug: 'c-power-calculation',
      instruction: 'Create a function `int power(int base, int exp)` that calculates base^exp. Call `power(2, 4)` and print "Result: 16".',
      starterCode: `#include <stdio.h>

// Implement power function

int main() {
    // Print "Result: 16"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-func-1',
          input: '',
          expectedOutput: 'Result: 16'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-pointers'
  },
  {
    id: 'c-pointers',
    language: 'c',
    title: 'Pointers, Memory Addresses & Dereferencing',
    slug: 'c-pointers',
    category: 'Pointers, Arrays & Strings',
    categoryId: 'c-memory',
    level: 'intermediate',
    order: 7,
    estimatedMinutes: 12,
    prerequisites: ['c-functions'],
    introduction: 'A pointer is a variable that stores the direct hardware memory address of another variable.',
    explanation: `Pointers are central to C\'s performance, allowing direct memory inspection, efficient array handling, and pass-by-reference simulation.

### Fundamental Pointer Operators:
1. **Address-of Operator (\`&\`):** Retrieves the memory address of a variable (\`&num\`).
2. **Pointer Declaration (\`*\`):** Declares a pointer variable (\`int *ptr\`).
3. **Dereference Operator (\`*\`):** Accesses or modifies the value stored at the address pointed to (\`*ptr\`).

### Pass-by-Reference Simulation:
By passing pointer addresses to a function, the function can directly mutate variables in the caller\'s stack frame (e.g. \`swap(&a, &b)\`).`,
    syntax: `int val = 42;
int *ptr = &val;  // ptr holds address of val

printf("Address: %p\\n", ptr);
printf("Value via dereference: %d\\n", *ptr);

*ptr = 99;  // Mutates val directly
printf("Updated val: %d\\n", val); // 99`,
    syntaxBreakdown: `• int *ptr : Declares pointer targeting an integer in memory
• &val : Address-of operator producing memory pointer
• *ptr : Dereference operator accessing targeted value
• %p : Format specifier for printing hexadecimal memory addresses`,
    codeExamples: [
      {
        title: 'Variable Mutation via Pointer',
        code: `#include <stdio.h>

void increment(int *p) {
    (*p)++;
}

int main() {
    int score = 10;
    increment(&score);
    printf("Score after increment: %d\\n", score);
    return 0;
}`,
        explanation: 'Passes address &score to function, which dereferences *p to increment the original variable.',
        output: 'Score after increment: 11'
      }
    ],
    practicalExamples: [
      {
        title: 'Classic Swap Function',
        code: `#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 5, b = 10;
    swap(&a, &b);
    printf("a = %d, b = %d\\n", a, b);
    return 0;
}`,
        explanation: 'Swaps the values of two variables in-place via pointer dereferencing.',
        output: 'a = 10, b = 5'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Dereferencing an uninitialized or NULL pointer (causing Segmentation Fault).',
        correction: 'Always initialize pointers to a valid address or NULL, and check `if (ptr != NULL)` before dereferencing.',
        explanation: 'Accessing invalid memory addresses crashes the program with a segfault.'
      },
      {
        mistake: 'Confusing pointer variable assignment `ptr = &x` with dereference assignment `*ptr = x`.',
        correction: '`ptr` changes where the pointer points; `*ptr` changes the value at that address.',
        explanation: 'Modifying ptr changes the address; modifying *ptr changes the target value.'
      }
    ],
    keyPoints: [
      '& returns memory address; * dereferences address to access target value.',
      'Pass pointers to functions to achieve pass-by-reference mutation.',
      'NULL pointers point to address 0 and must never be dereferenced directly.'
    ],
    hint: {
      summary: '& gets address; * in declaration makes a pointer; * in expression accesses target value.',
      keyRules: [
        'int *p = &x; (p points to x)',
        '*p = 50; (changes value of x to 50)',
        'Pass &var to functions accepting pointers.'
      ],
      cheatsheetMarkdown: `\`\`\`c
int x = 10;
int *p = &x;
*p = 20; // x is now 20
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-ptr-1',
        title: 'Double Value via Pointer',
        instruction: 'Create a function `void doubleVal(int *p)` that multiplies `*p` by 2. Test with `int x = 25` and print "x: 50".',
        starterCode: `#include <stdio.h>

// Define doubleVal function

int main() {
    int x = 25;
    // Call and print "x: 50"
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

void doubleVal(int *p) {
    *p *= 2;
}

int main() {
    int x = 25;
    doubleVal(&x);
    printf("x: %d\\n", x);
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-ptr-1',
        question: 'What is the purpose of the `&` operator when applied to a variable `&num`?',
        options: [
          'Multiplies num by 2',
          'Returns the hardware memory address of num',
          'Dereferences the value',
          'Bitwise XOR'
        ],
        correctOptionIndex: 1,
        explanation: '& is the address-of operator returning the memory pointer.'
      },
      {
        id: 'q-c-ptr-2',
        question: 'What does `*ptr = 100;` do if `ptr` points to variable `x`?',
        options: [
          'Changes ptr address to 100',
          'Modifies the value of variable x to 100',
          'Creates a new pointer',
          'Deallocates memory'
        ],
        correctOptionIndex: 1,
        explanation: 'Dereference assignment stores 100 into the memory location pointed to (x).'
      },
      {
        id: 'q-c-ptr-3',
        question: 'What format specifier is used in printf to display memory addresses?',
        options: ['%d', '%p', '%x', '%a'],
        correctOptionIndex: 1,
        explanation: '%p prints pointer memory addresses in hexadecimal representation.'
      },
      {
        id: 'q-c-ptr-4',
        question: 'What happens when a C program dereferences a `NULL` pointer?',
        options: [
          'Returns 0 silently',
          'Operating system raises a Segmentation Fault (crashes)',
          'Prints a warning',
          'Allocates fresh memory'
        ],
        correctOptionIndex: 1,
        explanation: 'Dereferencing NULL address 0 violates memory protection, causing a crash.'
      },
      {
        id: 'q-c-ptr-5',
        question: 'If `int *p` is incremented with `p++`, by how many bytes does the address advance on a system where sizeof(int) == 4?',
        options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
        correctOptionIndex: 2,
        explanation: 'Pointer arithmetic scales automatically by the byte size of the target type (4 bytes for int).'
      }
    ],
    codingChallenge: {
      id: 'c-ch-pointers',
      title: 'In-Place Pointer Multiplier',
      slug: 'c-pointer-multiplier',
      instruction: 'Declare `int val = 8`. Use a pointer `int *p = &val` to triple its value in memory and print "Tripled: 24".',
      starterCode: `#include <stdio.h>

int main() {
    int val = 8;
    // Use pointer to triple val and print "Tripled: 24"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-ptr-1',
          input: '',
          expectedOutput: 'Tripled: 24'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-arrays'
  },
  {
    id: 'c-arrays',
    language: 'c',
    title: 'Arrays & Pointer Arithmetic',
    slug: 'c-arrays',
    category: 'Pointers, Arrays & Strings',
    categoryId: 'c-memory',
    level: 'intermediate',
    order: 8,
    estimatedMinutes: 12,
    prerequisites: ['c-pointers'],
    introduction: 'An array is a contiguous block of memory holding a fixed number of elements of identical data type.',
    explanation: `In C, array names decay to a pointer to their first element (\`&arr[0]\`).

### Pointer-Array Duality:
• \`arr[i]\` is strictly equivalent to \`*(arr + i)\`.
• Array elements are stored contiguously in memory: element \`i\` is located at \`base_address + (i * sizeof(type))\`.

### Passing Arrays to Functions:
Because array names decay to pointers, passing an array passes the memory address, allowing the function to inspect or mutate elements directly. Always pass the array length as a companion parameter.`,
    syntax: `int scores[5] = {90, 85, 95, 70, 88};

// Access via index
printf("%d\\n", scores[0]);

// Access via pointer arithmetic
printf("%d\\n", *(scores + 2)); // 95`,
    syntaxBreakdown: `• type name[size] : Contiguous allocation on stack
• scores[i] : Syntactic sugar for *(scores + i)
• sizeof(arr) / sizeof(arr[0]) : Compile-time element count calculation`,
    codeExamples: [
      {
        title: 'Iterating and Summing Array Elements',
        code: `#include <stdio.h>

int main() {
    int nums[] = {10, 20, 30, 40};
    int len = sizeof(nums) / sizeof(nums[0]);
    int sum = 0;
    
    for (int i = 0; i < len; i++) {
        sum += nums[i];
    }
    printf("Array Total: %d\\n", sum);
    return 0;
}`,
        explanation: 'Calculates element count dynamically and sums items.',
        output: 'Array Total: 100'
      }
    ],
    practicalExamples: [
      {
        title: 'Find Maximum in Array',
        code: `#include <stdio.h>

int findMax(int *arr, int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

int main() {
    int data[] = {14, 82, 39, 95, 23};
    printf("Max element: %d\\n", findMax(data, 5));
    return 0;
}`,
        explanation: 'Passes array pointer to utility function.',
        output: 'Max element: 95'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Out of bounds array indexing (e.g. accessing arr[5] on size 5 array).',
        correction: 'Valid indices for size N are strictly 0 to N-1.',
        explanation: 'C does not perform bounds checking; out of bounds access causes memory corruption or crashes.'
      }
    ],
    keyPoints: [
      'Arrays are 0-indexed contiguous memory blocks.',
      'Array names decay to pointer to first element.',
      'Always pass array length to functions receiving arrays.'
    ],
    hint: {
      summary: 'arr[i] is identical to *(arr + i); arrays are 0-indexed contiguous memory.',
      keyRules: [
        'Valid indices: 0 to size - 1.',
        'Length formula: sizeof(arr) / sizeof(arr[0]) (for stack arrays).',
        'No runtime bounds checking in C.'
      ],
      cheatsheetMarkdown: `\`\`\`c
int a[3] = {1, 2, 3};
int first = a[0];
int second = *(a + 1);
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-arr-1',
        title: 'Array Average',
        instruction: 'Calculate the average of `{4, 8, 12, 16}` and print "Average: 10.0".',
        starterCode: `#include <stdio.h>

int main() {
    int arr[] = {4, 8, 12, 16};
    // Calculate and print "Average: 10.0"
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    int arr[] = {4, 8, 12, 16};
    int sum = 0;
    for (int i = 0; i < 4; i++) sum += arr[i];
    printf("Average: %.1f\\n", (float)sum / 4);
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-arr-1',
        question: 'If `int arr[5]` is declared, what is the valid index range?',
        options: ['1 to 5', '0 to 4', '0 to 5', '-1 to 4'],
        correctOptionIndex: 1,
        explanation: 'C arrays are 0-indexed; an array of size 5 has indices 0, 1, 2, 3, 4.'
      },
      {
        id: 'q-c-arr-2',
        question: 'Which expression is completely equivalent to `arr[i]` in C pointer arithmetic?',
        options: ['*(arr + i)', '&(arr + i)', 'arr * i', 'arr + i'],
        correctOptionIndex: 0,
        explanation: 'arr[i] is defined as *(arr + i) in the C language standard.'
      },
      {
        id: 'q-c-arr-3',
        question: 'How do you calculate the number of elements in a stack-allocated array `int arr[10]`?',
        options: ['arr.length', 'sizeof(arr) / sizeof(arr[0])', 'len(arr)', 'arr.count()'],
        correctOptionIndex: 1,
        explanation: 'Total array byte size divided by element byte size gives count.'
      },
      {
        id: 'q-c-arr-4',
        question: 'What happens when you pass an array to a function `void process(int arr[])`?',
        options: [
          'The entire array is duplicated into local memory',
          'Only a pointer to the first element is passed (array decay)',
          'Compiler creates a linked list',
          'Memory is reallocated'
        ],
        correctOptionIndex: 1,
        explanation: 'In C function parameters, arrays decay to pointers to their first element.'
      },
      {
        id: 'q-c-arr-5',
        question: 'Does the C compiler perform runtime bounds checking when accessing `arr[100]` on an array of size 5?',
        options: ['Yes, throws IndexError', 'No, allows buffer over-read/write leading to undefined behavior', 'Only in debug mode', 'Yes, halts OS'],
        correctOptionIndex: 1,
        explanation: 'C does not perform bounds checking, risking memory corruption or segfaults.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-arrays',
      title: 'Array Minimum Finder',
      slug: 'c-array-minimum-finder',
      instruction: 'Given `int nums[] = {50, 20, 80, 10, 30}`, find the smallest number and print "Minimum: 10".',
      starterCode: `#include <stdio.h>

int main() {
    int nums[] = {50, 20, 80, 10, 30};
    // Find min and print "Minimum: 10"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-arr-1',
          input: '',
          expectedOutput: 'Minimum: 10'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-strings'
  },
  {
    id: 'c-strings',
    language: 'c',
    title: 'Strings & Standard string.h Functions',
    slug: 'c-strings',
    category: 'Pointers, Arrays & Strings',
    categoryId: 'c-memory',
    level: 'intermediate',
    order: 9,
    estimatedMinutes: 12,
    prerequisites: ['c-arrays'],
    introduction: 'In C, strings are null-terminated character arrays ending with the byte 0 (\'\\0\').',
    explanation: `Because C lacks a native string object type, strings are managed via \`char[]\` or \`char*\` with helper functions from \`<string.h>\`.

### The Null Terminator (\`\\0\`):
Every valid C string must end with \`\\0\` so functions know where the string data ends in memory.

### Essential \`<string.h>\` Functions:
• \`strlen(str)\`: Returns length of string (excluding \`\\0\`).
• \`strcpy(dest, src)\`: Copies string \`src\` into buffer \`dest\`.
• \`strcat(dest, src)\`: Concatenates \`src\` onto the end of \`dest\`.
• \`strcmp(s1, s2)\`: Compares two strings lexicographically (returns \`0\` if identical).`,
    syntax: `#include <stdio.h>
#include <string.h>

char str1[20] = "APEX";
char str2[] = " Engine";
strcat(str1, str2); // "APEX Engine"
printf("Length: %lu\\n", strlen(str1));`,
    syntaxBreakdown: `• char str1[20] : Buffer with enough capacity for concatenated chars + '\\0'
• strlen() : Counts characters up to null terminator
• strcmp() == 0 : Evaluates to true when string contents match exactly`,
    codeExamples: [
      {
        title: 'String Length and Comparison',
        code: `#include <stdio.h>
#include <string.h>

int main() {
    char key[] = "SECRET";
    char input[] = "SECRET";
    
    if (strcmp(key, input) == 0) {
        printf("Key verified! Length: %lu\\n", strlen(key));
    }
    return 0;
}`,
        explanation: 'Uses strcmp for content equality check and strlen for character count.',
        output: 'Key verified! Length: 6'
      }
    ],
    practicalExamples: [
      {
        title: 'Buffer Formatting',
        code: `#include <stdio.h>
#include <string.h>

int main() {
    char greeting[30] = "Hello ";
    char user[] = "Cipher";
    strcat(greeting, user);
    printf("%s\\n", greeting);
    return 0;
}`,
        explanation: 'Concatenates two strings into destination buffer.',
        output: 'Hello Cipher'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using == to compare two strings in C: if (str1 == str2).',
        correction: 'Use `if (strcmp(str1, str2) == 0)` to compare content.',
        explanation: '`==` compares memory addresses, not character contents.'
      },
      {
        mistake: 'Creating a char buffer too small to hold the null terminator `\\0`.',
        correction: 'Ensure buffer size is at least string length + 1.',
        explanation: 'Missing null terminators causes functions like printf and strlen to read past buffer bounds.'
      }
    ],
    keyPoints: [
      'Strings in C are character arrays ending in \\0.',
      'Always compare string contents using strcmp().',
      'Ensure destination buffers have sufficient capacity for null terminator.'
    ],
    hint: {
      summary: 'C strings are null-terminated char arrays; use strcmp() to compare, strlen() for length.',
      keyRules: [
        'Always allocate +1 byte for `\\0`.',
        'strcmp(a, b) == 0 means strings are identical.',
        'Never compare strings with `==`.'
      ],
      cheatsheetMarkdown: `\`\`\`c
#include <string.h>
char s[10] = "Hello";
int len = strlen(s);      // 5
if (strcmp(s, "Hello") == 0) { /* equal */ }
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-str-1',
        title: 'Copy String',
        instruction: 'Use strcpy to copy "Active" into buffer `char status[20]` and print "Status: Active".',
        starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char status[20];
    // Copy and print "Status: Active"
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>
#include <string.h>

int main() {
    char status[20];
    strcpy(status, "Active");
    printf("Status: %s\\n", status);
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-str-1',
        question: 'What special byte marks the termination of a string in C?',
        options: ['\\n (newline)', '\\0 (null terminator)', 'EOF', '; (semicolon)'],
        correctOptionIndex: 1,
        explanation: '\\0 (null byte, ASCII 0) signals the end of a C string.'
      },
      {
        id: 'q-c-str-2',
        question: 'How do you check if two C strings `str1` and `str2` have identical content?',
        options: ['if (str1 == str2)', 'if (strcmp(str1, str2) == 0)', 'if (str1.equals(str2))', 'if (str1 === str2)'],
        correctOptionIndex: 1,
        explanation: 'strcmp returns 0 when all characters match lexicographically.'
      },
      {
        id: 'q-c-str-3',
        question: 'What does `strlen("Code")` return?',
        options: ['4', '5 (including null terminator)', '8', '32'],
        correctOptionIndex: 0,
        explanation: 'strlen counts characters before the null terminator (4).'
      },
      {
        id: 'q-c-str-4',
        question: 'How many bytes must `char buffer[]` allocate to safely store the word `"APEX"`?',
        options: ['4 bytes', '5 bytes (4 characters + 1 byte for \\0)', '8 bytes', '16 bytes'],
        correctOptionIndex: 1,
        explanation: '"APEX" has 4 characters plus 1 byte for the null terminator \\0.'
      },
      {
        id: 'q-c-str-5',
        question: 'Which header file must be included to use `strlen`, `strcpy`, and `strcmp`?',
        options: ['<stdio.h>', '<stdlib.h>', '<string.h>', '<ctype.h>'],
        correctOptionIndex: 2,
        explanation: '<string.h> defines standard C string manipulation prototypes.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-strings',
      title: 'String Joiner',
      slug: 'c-string-joiner',
      instruction: 'Combine "Apex" and "Core" into one buffer and print "Combined: ApexCore".',
      starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char buffer[30] = "Apex";
    // Append "Core" and print "Combined: ApexCore"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-str-1',
          input: '',
          expectedOutput: 'Combined: ApexCore'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-structs'
  },
  {
    id: 'c-structs',
    language: 'c',
    title: 'Structures & Custom Composite Data Types',
    slug: 'c-structs',
    category: 'Structs, Dynamic Memory & Files',
    categoryId: 'c-structures',
    level: 'advanced',
    order: 10,
    estimatedMinutes: 12,
    prerequisites: ['c-strings'],
    introduction: 'A struct is a user-defined composite data type that groups related variables of different types under a single named unit.',
    explanation: `Structs represent real-world entities (e.g. Player, Vector, Packet, Student).

### Defining and Accessing Structs:
• Use the dot operator (\`.\`) to access fields from a struct value.
• Use the arrow operator (\`->\`) to access fields through a struct pointer.
• Use \`typedef struct\` to create clean type aliases without needing to write \`struct Type\` repeatedly.`,
    syntax: `typedef struct {
    int id;
    char name[30];
    float score;
} Student;

Student s1 = {101, "Aria", 95.5f};
printf("%s scored %.1f\\n", s1.name, s1.score);`,
    syntaxBreakdown: `• typedef struct { ... } TypeName : Defines struct and type alias in one step
• s1.name : Dot operator accessing field of struct instance
• ptr->field : Arrow operator dereferencing pointer and accessing member`,
    codeExamples: [
      {
        title: 'Struct with Pointer Access',
        code: `#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

void movePoint(Point *p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

int main() {
    Point pt = {10, 20};
    movePoint(&pt, 5, -5);
    printf("Point: (%d, %d)\\n", pt.x, pt.y);
    return 0;
}`,
        explanation: 'Passes struct pointer to function and mutates fields via arrow operator ->.',
        output: 'Point: (15, 15)'
      }
    ],
    practicalExamples: [
      {
        title: 'Player Entity Record',
        code: `#include <stdio.h>

typedef struct {
    int id;
    int health;
    int shields;
} Player;

int main() {
    Player p1 = {1, 100, 50};
    printf("Player #%d HP: %d, Shield: %d\\n", p1.id, p1.health, p1.shields);
    return 0;
}`,
        explanation: 'Models game entities in memory.',
        output: 'Player #1 HP: 100, Shield: 50'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using dot operator `.` on a pointer to a struct: `ptr.field`.',
        correction: 'Use arrow operator `ptr->field` (or `(*ptr).field`).',
        explanation: 'The arrow operator automatically dereferences struct pointers.'
      },
      {
        mistake: 'Forgetting the semicolon after struct definition closing brace `};`.',
        correction: 'Always terminate struct declarations with `};`.',
        explanation: 'Struct declarations are statements and require a terminating semicolon.'
      }
    ],
    keyPoints: [
      'Structs group heterogeneous data types in contiguous memory.',
      'Dot (.) accesses fields from values; arrow (->) accesses fields via pointer.',
      'typedef struct simplifies type names.'
    ],
    hint: {
      summary: 'struct groups related variables; use . for direct instances, -> for pointers.',
      keyRules: [
        'struct declaration ends with `};`.',
        '`p.field` for objects, `ptr->field` for pointers.',
        'Use typedef struct { ... } Name; to create a convenient alias.'
      ],
      cheatsheetMarkdown: `\`\`\`c
typedef struct {
    int id;
    float val;
} Item;

Item it = {1, 9.99f};
Item *p = &it;
p->val = 19.99f;
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-struct-1',
        title: 'Create Rectangle Struct',
        instruction: 'Define a struct `Rectangle` with `int width` and `int height`. Set width=10, height=5, compute area and print "Area: 50".',
        starterCode: `#include <stdio.h>

// Define Rectangle struct

int main() {
    // Instantiate, compute and print "Area: 50"
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

typedef struct {
    int width;
    int height;
} Rectangle;

int main() {
    Rectangle r = {10, 5};
    int area = r.width * r.height;
    printf("Area: %d\\n", area);
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-struct-1',
        question: 'Which operator is used to access struct fields through a struct pointer in C?',
        options: ['. (dot)', '-> (arrow)', ':: (scope)', '* (star)'],
        correctOptionIndex: 1,
        explanation: 'The arrow operator `->` dereferences the pointer and accesses the member.'
      },
      {
        id: 'q-c-struct-2',
        question: 'What is the purpose of `typedef struct` in C?',
        options: [
          'Allocates heap memory automatically',
          'Creates a shorthand alias for the struct type',
          'Encrypts struct fields',
          'Prevents modifying fields'
        ],
        correctOptionIndex: 1,
        explanation: 'typedef creates a concise alias so you can declare `Player p;` instead of `struct Player p;`.'
      },
      {
        id: 'q-c-struct-3',
        question: 'What character MUST follow the closing brace of a struct declaration in C?',
        options: ['; (semicolon)', '. (period)', '} (closing brace)', 'None'],
        correctOptionIndex: 0,
        explanation: 'Struct declarations must terminate with a semicolon `};`.'
      },
      {
        id: 'q-c-struct-4',
        question: 'How are fields laid out in memory inside a C struct?',
        options: [
          'Sequentially in order of declaration with architecture alignment padding',
          'Randomly across RAM',
          'Alphabetically',
          'Dynamically sorted by size'
        ],
        correctOptionIndex: 0,
        explanation: 'Struct fields are placed sequentially in declaration order, aligned to machine byte boundaries.'
      },
      {
        id: 'q-c-struct-5',
        question: 'Can a struct in C contain a pointer to another struct of the same type (self-referential struct)?',
        options: ['No, invalid syntax', 'Yes, this is the basis of Linked Lists and Trees', 'Only in C++', 'Only if static'],
        correctOptionIndex: 1,
        explanation: 'Self-referential struct pointers (e.g. `struct Node *next;`) build dynamic data structures.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-structs',
      title: 'Coordinate Distance',
      slug: 'c-coordinate-distance',
      instruction: 'Define `struct Point { int x; int y; };`. Create Point p = {6, 8} and print "Point: 6, 8".',
      starterCode: `#include <stdio.h>

// Define struct Point and output "Point: 6, 8"

int main() {
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-str-1',
          input: '',
          expectedOutput: 'Point: 6, 8'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-dynamic-memory'
  },
  {
    id: 'c-dynamic-memory',
    language: 'c',
    title: 'Dynamic Memory Allocation: malloc & free',
    slug: 'c-dynamic-memory',
    category: 'Structs, Dynamic Memory & Files',
    categoryId: 'c-structures',
    level: 'advanced',
    order: 11,
    estimatedMinutes: 14,
    prerequisites: ['c-structs'],
    introduction: 'Dynamic memory allocation allows programs to request heap memory at runtime whose size is determined dynamically.',
    explanation: `Standard C provides dynamic heap management functions in \`<stdlib.h>\`:

### Core Memory Functions:
• \`malloc(size_bytes)\`: Allocates uninitialized memory bytes on the heap. Returns \`void*\` pointer (or \`NULL\` if allocation failed).
• \`calloc(count, size_bytes)\`: Allocates memory and initializes every byte to zero.
• \`realloc(ptr, new_size)\`: Resizes an existing heap allocation.
• \`free(ptr)\`: Returns allocated memory back to the operating system heap pool.

### Memory Leaks:
Failing to call \`free()\` on heap memory before discarding pointer references leads to memory leaks that consume system RAM over time.`,
    syntax: `#include <stdlib.h>

int *arr = (int*) malloc(5 * sizeof(int));
if (arr == NULL) {
    // Handle allocation failure
    return 1;
}

arr[0] = 100;

// Always release heap memory
free(arr);
arr = NULL;`,
    syntaxBreakdown: `• malloc(N * sizeof(type)) : Allocates contiguous bytes on heap
• if (arr == NULL) : Defensive check for out-of-memory condition
• free(arr) : Deallocates memory to prevent memory leaks
• arr = NULL : Nullifies pointer to prevent dangling pointer bugs`,
    codeExamples: [
      {
        title: 'Dynamic Integer Array',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 3;
    int *nums = (int*) malloc(n * sizeof(int));
    if (nums == NULL) return 1;
    
    nums[0] = 10;
    nums[1] = 20;
    nums[2] = 30;
    
    printf("Dynamic values: %d %d %d\\n", nums[0], nums[1], nums[2]);
    free(nums);
    return 0;
}`,
        explanation: 'Allocates array on heap, initializes elements, prints them, and frees memory.',
        output: 'Dynamic values: 10 20 30'
      }
    ],
    practicalExamples: [
      {
        title: 'Zero-Initialized Memory with calloc',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *counters = (int*) calloc(3, sizeof(int));
    if (counters == NULL) return 1;
    
    printf("Initial: %d, %d, %d\\n", counters[0], counters[1], counters[2]);
    free(counters);
    return 0;
}`,
        explanation: 'calloc zeroes out allocated memory blocks automatically.',
        output: 'Initial: 0, 0, 0'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using memory after calling free() (Dangling pointer / Use-After-Free).',
        correction: 'Set pointer to NULL immediately after freeing: `free(ptr); ptr = NULL;`.',
        explanation: 'Dangling pointers read or corrupt memory that may have been reassigned.'
      },
      {
        mistake: 'Double freeing a pointer: free(ptr); free(ptr);.',
        correction: 'Ensure memory is freed exactly once per allocation.',
        explanation: 'Double freeing corrupts heap management metadata.'
      }
    ],
    keyPoints: [
      'malloc allocates uninitialized bytes on the heap.',
      'calloc allocates and zeroes out memory.',
      'Always free allocated memory to prevent memory leaks.',
      'Always verify malloc return is not NULL before use.'
    ],
    hint: {
      summary: 'malloc() allocates bytes on heap; free() releases them back to the OS.',
      keyRules: [
        'int *p = (int*) malloc(N * sizeof(int));',
        'Check if (p == NULL) before accessing.',
        'free(p); p = NULL; when finished.'
      ],
      cheatsheetMarkdown: `\`\`\`c
#include <stdlib.h>
int *p = malloc(sizeof(int));
*p = 42;
free(p);
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-dmem-1',
        title: 'Allocate Single Integer',
        instruction: 'Use malloc to allocate 1 int, assign value 77, print "Value: 77", then free the memory.',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate, assign, print and free
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = (int*) malloc(sizeof(int));
    if (p != NULL) {
        *p = 77;
        printf("Value: %d\\n", *p);
        free(p);
    }
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-dmem-1',
        question: 'Which header file provides declarations for `malloc`, `calloc`, and `free`?',
        options: ['<stdio.h>', '<stdlib.h>', '<memory.h>', '<string.h>'],
        correctOptionIndex: 1,
        explanation: '<stdlib.h> declares standard general utility and memory management functions.'
      },
      {
        id: 'q-c-dmem-2',
        question: 'What is returned by `malloc()` if the operating system runs out of memory?',
        options: ['-1', '0 (NULL pointer)', 'A garbage address', 'Operating system halts'],
        correctOptionIndex: 1,
        explanation: 'malloc returns NULL when memory allocation fails.'
      },
      {
        id: 'q-c-dmem-3',
        question: 'What is the primary difference between `malloc()` and `calloc()`?',
        options: [
          'malloc is faster because it does not zero memory; calloc zeroes all allocated bytes',
          'calloc allocates on the stack',
          'malloc cannot allocate arrays',
          'calloc does not need free()'
        ],
        correctOptionIndex: 0,
        explanation: 'malloc leaves memory uninitialized; calloc initializes all allocated bytes to zero.'
      },
      {
        id: 'q-c-dmem-4',
        question: 'What is a "Memory Leak" in C?',
        options: [
          'A hardware bus fault',
          'Failing to free dynamically allocated heap memory before losing all references to it',
          'A syntax error in malloc',
          'Running out of disk space'
        ],
        correctOptionIndex: 1,
        explanation: 'Unfreed heap memory remains allocated until program termination, leaking RAM.'
      },
      {
        id: 'q-c-dmem-5',
        question: 'What happens if you free a memory pointer twice (double free)?',
        options: [
          'Nothing happens',
          'Corrupts heap management tables leading to crashes or undefined behavior',
          'Clears cache',
          'Frees twice as much memory'
        ],
        correctOptionIndex: 1,
        explanation: 'Double free is a critical undefined behavior bug that corrupts the heap allocator.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-dmem',
      title: 'Dynamic Heap Storage',
      slug: 'c-dynamic-heap-storage',
      instruction: 'Allocate an int on heap with malloc, store 999, print "Heap Value: 999", and free it.',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate, store 999, print "Heap Value: 999", free
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-dmem-1',
          input: '',
          expectedOutput: 'Heap Value: 999'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'c-file-io'
  },
  {
    id: 'c-file-io',
    language: 'c',
    title: 'File I/O Streams & Operations',
    slug: 'c-file-io',
    category: 'Structs, Dynamic Memory & Files',
    categoryId: 'c-structures',
    level: 'advanced',
    order: 12,
    estimatedMinutes: 14,
    prerequisites: ['c-dynamic-memory'],
    introduction: 'File input and output allows C programs to persist data across execution runs by reading from and writing to disk storage.',
    explanation: `C handles files via standard stream pointers of type \`FILE*\` declared in \`<stdio.h>\`.

### File Operations Workflow:
1. **Open Stream:** \`FILE *fp = fopen("data.txt", "w");\`
2. **Verify Stream:** \`if (fp == NULL) { /* handle error */ }\`
3. **Write / Read:**
   - \`fprintf(fp, "Format", ...)\` : Writes formatted text.
   - \`fscanf(fp, "Format", ...)\` : Reads formatted text.
   - \`fgetc(fp)\` / \`fputc(c, fp)\` : Single character I/O.
   - \`fgets(buffer, size, fp)\` : Reads entire line safely.
4. **Close Stream:** \`fclose(fp);\` (flushes buffers and releases file handles).`,
    syntax: `#include <stdio.h>

FILE *fp = fopen("output.txt", "w");
if (fp != NULL) {
    fprintf(fp, "Persisted Score: %d\\n", 100);
    fclose(fp);
}`,
    syntaxBreakdown: `• FILE *fp : File stream handle pointer
• fopen("filename", "mode") : "r" (read), "w" (write/overwrite), "a" (append)
• fprintf(fp, ...) : Formatted stream writer
• fclose(fp) : Closes file stream and flushes OS buffers`,
    codeExamples: [
      {
        title: 'File Writing Simulation',
        code: `#include <stdio.h>

int main() {
    printf("Simulating File Write:\\n");
    printf("[WRITE] data.log <- 'Log Entry: System OK'\\n");
    printf("[STATUS] File Stream Closed Successfully\\n");
    return 0;
}`,
        explanation: 'Demonstrates sequential file stream processing.',
        output: 'Simulating File Write:\n[WRITE] data.log <- \'Log Entry: System OK\'\n[STATUS] File Stream Closed Successfully'
      }
    ],
    practicalExamples: [
      {
        title: 'Config Parser Simulation',
        code: `#include <stdio.h>

int main() {
    int port = 8080;
    char host[] = "localhost";
    printf("Loaded Config: %s:%d\\n", host, port);
    return 0;
}`,
        explanation: 'Simulates parsing configuration key-value parameters from disk.',
        output: 'Loaded Config: localhost:8080'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to call fclose(fp).',
        correction: 'Always call `fclose(fp);` when file operations are complete.',
        explanation: 'Failing to close files leaves OS file descriptors open and may cause unwritten buffer data loss.'
      },
      {
        mistake: 'Not checking if fopen returned NULL before reading/writing.',
        correction: 'Always check `if (fp == NULL)` to handle missing files or permission errors.',
        explanation: 'Operating on a NULL file handle causes an immediate segmentation fault.'
      }
    ],
    keyPoints: [
      'fopen() opens a stream; "r"=read, "w"=write, "a"=append.',
      'Always verify fp != NULL before performing I/O.',
      'Always fclose() streams to flush write buffers and free system handles.'
    ],
    hint: {
      summary: 'fopen() opens streams; fprintf/fscanf read and write; fclose() flushes and closes.',
      keyRules: [
        'FILE *fp = fopen("file.txt", "r");',
        'Modes: "r" (read), "w" (write), "a" (append), "rb"/"wb" (binary).',
        'Always fclose(fp);.'
      ],
      cheatsheetMarkdown: `\`\`\`c
FILE *fp = fopen("test.txt", "w");
if (fp) {
    fprintf(fp, "Hello\\n");
    fclose(fp);
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-c-file-1',
        title: 'Simulate File Report',
        instruction: 'Print "Stream Mode: WRITE, Target: output.txt".',
        starterCode: `#include <stdio.h>

int main() {
    // Print "Stream Mode: WRITE, Target: output.txt"
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    printf("Stream Mode: WRITE, Target: output.txt\\n");
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-c-file-1',
        question: 'Which mode string in `fopen()` opens an existing file for reading in C?',
        options: ['"w"', '"r"', '"a"', '"x"'],
        correctOptionIndex: 1,
        explanation: '"r" opens a file for read-only access (file must exist).'
      },
      {
        id: 'q-c-file-2',
        question: 'What does `fopen()` return if the requested file cannot be opened?',
        options: ['EOF', 'NULL (0)', '-1', 'Raises an exception'],
        correctOptionIndex: 1,
        explanation: 'fopen returns NULL if the file does not exist or permissions are denied.'
      },
      {
        id: 'q-c-file-3',
        question: 'Why is it critical to call `fclose(fp)` after completing file operations?',
        options: [
          'To delete the file from hard disk',
          'To flush internal memory buffers and release operating system file descriptors',
          'To encrypt the file',
          'To rename the file'
        ],
        correctOptionIndex: 1,
        explanation: 'fclose flushes buffered write data to disk and frees the file handle.'
      },
      {
        id: 'q-c-file-4',
        question: 'What special constant represents the End-Of-File marker when reading with `fgetc()`?',
        options: ['NULL', 'EOF (integer -1)', '\\0', 'STOP'],
        correctOptionIndex: 1,
        explanation: 'EOF is a macro representing end-of-file condition in stream readers.'
      },
      {
        id: 'q-c-file-5',
        question: 'What mode in `fopen()` appends new data to the end of a file without overwriting existing content?',
        options: ['"w"', '"r+"', '"a"', '"w+"'],
        correctOptionIndex: 2,
        explanation: '"a" (append) writes new data at the end of the file.'
      }
    ],
    codingChallenge: {
      id: 'c-ch-file-io',
      title: 'File System Logger',
      slug: 'c-file-system-logger',
      instruction: 'Output "LOG: [2026] System Verified Clean".',
      starterCode: `#include <stdio.h>

int main() {
    // Print "LOG: [2026] System Verified Clean"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-c-file-1',
          input: '',
          expectedOutput: 'LOG: [2026] System Verified Clean'
        }
      ],
      xpReward: 50
    },
    xpReward: 50
  }
]
