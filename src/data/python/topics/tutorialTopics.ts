import type { PythonTopic } from '../types'

export const TUTORIAL_TOPICS: PythonTopic[] = [
  {
    id: 'py-intro',
    title: 'Python Introduction',
    slug: 'python-intro',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 6,
    prerequisites: [],
    introduction: 'Python is a high-level, interpreted, general-purpose programming language celebrated for its clean, readable syntax.',
    explanation: `Python was created by Guido van Rossum and released in 1991. It emphasizes code readability and allows developers to express concepts in fewer lines of code compared to languages like C++ or Java.

### Why Learn Python?
- **Readable & Concise:** Clean, English-like syntax makes programming intuitive.
- **Cross-Platform:** Runs seamlessly on Windows, macOS, Linux, and cloud servers.
- **Vast Ecosystem:** Dominates AI, Machine Learning, Data Science, Web Development, and Automation.
- **Interpreted:** Python executes line by line, enabling rapid prototyping and live testing.`,
    syntax: `# Python syntax uses indentation to define code blocks
def main():
    print("Welcome to APEX Python Track")`,
    codeExamples: [
      {
        title: 'Your First Python Line',
        code: 'print("Welcome to Python on APEX!")',
        explanation: 'The print() function outputs the string to standard output.',
        output: 'Welcome to Python on APEX!'
      },
      {
        title: 'Simple Math in Python',
        code: 'total = 25 + 75\nprint(total)',
        explanation: 'Python computes arithmetic expressions natively without boilerplate.',
        output: '100'
      }
    ],
    practicalExamples: [
      {
        title: 'System Greeting',
        code: 'app_name = "APEX Engine"\nversion = 3.12\nprint(f"Running {app_name} on Python {version}")',
        explanation: 'F-strings provide modern formatted output.',
        output: 'Running APEX Engine on Python 3.12'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Print("Hello World")',
        correction: 'print("Hello World")',
        explanation: 'Python keywords and built-in functions are strictly case-sensitive. Capitalized "Print" causes a NameError.'
      }
    ],
    keyPoints: [
      'Python was created in 1991 with a philosophy of readability and simplicity.',
      'It is an interpreted language that executes code sequentially.',
      'Python is whitespace-sensitive and uses indentation for code blocks.'
    ],
    notes: {
      summary: 'Python is an interpreted, high-level language with clean syntax, dynamic typing, and massive multi-domain industry adoption.',
      keyRules: [
        'Keywords are lowercase and case-sensitive.',
        'No semicolons are required at line ends.',
        'Indentations (typically 4 spaces) define blocks instead of curly braces.'
      ],
      cheatsheetMarkdown: `### Python Overview Cheat Sheet
- **File extension:** \`.py\`
- **Run command:** \`python filename.py\`
- **Comment:** \`# this is a comment\`
- **Output:** \`print("value")\``,
      downloadableMarkdown: `# APEX Python Notes: Introduction & Overview
- Python is created by Guido van Rossum (1991).
- Key design philosophy: Readability, simplicity, rapid development.
- Executes via Python Interpreter (CPython, PyPy).
- Standard output: print("text")`
    },
    practiceTasks: [
      {
        id: 'pt-intro-1',
        title: 'Print a Welcome Message',
        instruction: 'Print the string "Hello, Future Developer!" to the terminal.',
        starterCode: '# Write your print statement below\n',
        solutionCode: 'print("Hello, Future Developer!")'
      }
    ],
    quizzes: [
      {
        id: 'q-py-intro-1',
        question: 'Who created the Python programming language?',
        options: ['James Gosling', 'Guido van Rossum', 'Bjarne Stroustrup', 'Brendan Eich'],
        correctOptionIndex: 1,
        explanation: 'Python was created by Guido van Rossum in 1991.'
      },
      {
        id: 'q-py-intro-2',
        question: 'Which of the following describes Python execution model?',
        options: ['Compiled only to machine code', 'Interpreted line-by-line', 'Executed directly by BIOS', 'Compiled via V8 Engine'],
        correctOptionIndex: 1,
        explanation: 'Python is an interpreted language where bytecode is executed by the Python Virtual Machine (PVM).'
      },
      {
        id: 'q-py-intro-3',
        question: 'What is the correct file extension for Python files?',
        options: ['.pyt', '.pt', '.py', '.python'],
        correctOptionIndex: 2,
        explanation: 'Standard Python source files use the .py extension.'
      },
      {
        id: 'q-py-intro-4',
        question: 'How does Python define code blocks such as functions and loops?',
        options: ['Curly braces { }', 'Indentation with whitespace', 'Begin ... End keywords', 'Square brackets [ ]'],
        correctOptionIndex: 1,
        explanation: 'Python uses consistent whitespace indentation (conventionally 4 spaces) to delimit code blocks.'
      },
      {
        id: 'q-py-intro-5',
        question: 'Is Python case-sensitive?',
        options: ['Yes, variable "Score" is different from "score"', 'No, all variable names are normalized to uppercase', 'Only inside class definitions', 'Only when running on Windows'],
        correctOptionIndex: 0,
        explanation: 'Python is strictly case-sensitive for identifiers, function names, and keywords.'
      }
    ],
    codingChallenge: {
      id: 'c-py-intro',
      title: 'First Python Signal',
      slug: 'first-python-signal',
      instruction: 'Write a Python program that prints exactly the string "Python is ready." to the console.',
      starterCode: '# Print the exact required message\n',
      testCases: [
        {
          id: 'tc-intro-1',
          input: '',
          expectedOutput: 'Python is ready.'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-syntax'
  },
  {
    id: 'py-syntax',
    title: 'Python Syntax & Structure',
    slug: 'python-syntax',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 7,
    prerequisites: ['py-intro'],
    prevTopicId: 'py-intro',
    introduction: 'Master Python indentation rules, line continuation, and clean statement structure.',
    explanation: `Python syntax is designed to be clear and readable. Unlike languages that use curly brackets \`{}\` or semicolons \`;\` to delimit blocks, Python relies strictly on indentation.

### Indentation Rules
1. A block begins when indentation increases (e.g., after a colon \`:\`).
2. A block ends when indentation returns to the previous level.
3. You must use the same number of spaces in the same code block (standard is 4 spaces). Mixing tabs and spaces causes an \`IndentationError\`.`,
    syntax: `if 5 > 2:
    # 4 spaces indentation
    print("Five is greater than two!")`,
    codeExamples: [
      {
        title: 'Correct Indentation',
        code: 'if 10 > 5:\n    print("10 is greater than 5")\n    print("Indentation block active")',
        explanation: 'Both print calls are inside the if statement block.',
        output: '10 is greater than 5\nIndentation block active'
      }
    ],
    practicalExamples: [
      {
        title: 'Nested Code Blocks',
        code: 'x = 15\nif x > 10:\n    print("Greater than 10")\n    if x > 20:\n        print("Also greater than 20")\n    else:\n        print("Between 10 and 20")',
        explanation: 'Nested blocks each indent an additional 4 spaces.',
        output: 'Greater than 10\nBetween 10 and 20'
      }
    ],
    commonMistakes: [
      {
        mistake: 'if 5 > 2:\nprint("No indentation")',
        correction: 'if 5 > 2:\n    print("Indented 4 spaces")',
        explanation: 'Failing to indent after a colon results in an IndentationError.'
      }
    ],
    keyPoints: [
      'Indentation is mandatory in Python and defines scope.',
      'Standard indentation is 4 spaces per nesting level.',
      'A colon : indicates the start of a new indented block.'
    ],
    notes: {
      summary: 'Python syntax enforces indentation for scoping. Colons begin blocks, and blank lines separate logical sections.',
      keyRules: [
        'Never mix tabs and spaces.',
        'Use 4 spaces per indentation level.',
        'Lines can be broken with parentheses () or explicit backslash \\.'
      ],
      cheatsheetMarkdown: `### Python Syntax Cheatsheet
\`\`\`python
# Block syntax
if condition:
    do_something()
else:
    do_other()
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Syntax & Indentation
- Indentation denotes code blocks and hierarchy.
- Python raises IndentationError if indentation is mismatched.
- Do not mix tabs and spaces (PEP 8 recommends 4 spaces).`
    },
    practiceTasks: [
      {
        id: 'pt-syntax-1',
        title: 'Fix Indentation',
        instruction: 'Fix the indented block so that the code prints "Valid syntax".',
        starterCode: 'if True:\nprint("Valid syntax")',
        solutionCode: 'if True:\n    print("Valid syntax")'
      }
    ],
    quizzes: [
      {
        id: 'q-py-syn-1',
        question: 'What error is raised if an indented block is missing after an if statement in Python?',
        options: ['SyntaxWarning', 'IndentationError', 'NullPointerException', 'BlockMismatchException'],
        correctOptionIndex: 1,
        explanation: 'Python raises an IndentationError when an expected indented block is missing.'
      },
      {
        id: 'q-py-syn-2',
        question: 'What is the PEP 8 standard recommendation for indentation in Python?',
        options: ['1 Tab', '2 Spaces', '4 Spaces', '8 Spaces'],
        correctOptionIndex: 2,
        explanation: 'PEP 8 (the official Python style guide) recommends 4 spaces per indentation level.'
      },
      {
        id: 'q-py-syn-3',
        question: 'What character indicates the start of an indented block after a condition or loop?',
        options: [';', ':', '{', '->'],
        correctOptionIndex: 1,
        explanation: 'A colon : at the end of a header line (if, for, while, def, class) signals that an indented block follows.'
      },
      {
        id: 'q-py-syn-4',
        question: 'Which of the following is true about semicolons in Python?',
        options: ['They are mandatory at the end of every statement', 'They are optional and rarely used to separate multiple statements on one line', 'They cause a SyntaxError', 'They denote comments'],
        correctOptionIndex: 1,
        explanation: 'Semicolons are optional in Python and only occasionally used to separate multiple short statements on a single line.'
      },
      {
        id: 'q-py-syn-5',
        question: 'What happens if you mix tabs and spaces in Python 3 code?',
        options: ['Python automatically converts tabs to spaces', 'Python raises a TabError / IndentationError', 'The code executes 2x slower', 'It only causes a warning'],
        correctOptionIndex: 1,
        explanation: 'Python 3 disallows mixing tabs and spaces for indentation in the same file.'
      }
    ],
    codingChallenge: {
      id: 'c-py-syntax',
      title: 'Conditional Branch Syntax',
      slug: 'conditional-branch-syntax',
      instruction: 'Write an if-else statement checking if score = 85 is greater than or equal to 70. If so, print "Passed", otherwise print "Retry".',
      starterCode: 'score = 85\n# Write your if-else block below\n',
      testCases: [
        {
          id: 'tc-syn-1',
          input: '',
          expectedOutput: 'Passed'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-variables'
  },
  {
    id: 'py-variables',
    title: 'Python Variables & Types',
    slug: 'python-variables',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 3,
    estimatedMinutes: 8,
    prerequisites: ['py-syntax'],
    prevTopicId: 'py-syntax',
    introduction: 'Learn variable creation, dynamic typing, naming conventions, and multiple assignments.',
    explanation: `In Python, variables are created when you first assign a value to them using the assignment operator \`=\`. Python has no command for declaring a variable and uses **dynamic typing**, meaning types are inferred at runtime.

### Variable Naming Rules:
- Must begin with a letter or underscore \`_\`.
- Cannot start with a number.
- Can only contain alphanumeric characters and underscores (\`A-z\`, \`0-9\`, \`_\`).
- Variable names are case-sensitive (\`age\`, \`Age\`, and \`AGE\` are distinct).
- Cannot use Python reserved keywords (\`if\`, \`class\`, \`for\`, etc.).

### Python Conventions (PEP 8):
Use \`snake_case\` for variable and function names (e.g., \`user_score\`, \`max_attempts\`).`,
    syntax: `# Variable assignment
variable_name = value

# Multiple assignment
a, b, c = 1, 2, 3`,
    codeExamples: [
      {
        title: 'Assigning Variables',
        code: 'user_name = "Alex"\nuser_age = 24\nheight_meters = 1.82\nis_enrolled = True\n\nprint(user_name, user_age, height_meters, is_enrolled)',
        explanation: 'Python infers types: str, int, float, bool.',
        output: 'Alex 24 1.82 True'
      },
      {
        title: 'Dynamic Type Reassignment',
        code: 'data = 42\nprint(type(data))\ndata = "Apex"\nprint(type(data))',
        explanation: 'Variables can change types freely during execution.',
        output: "<class 'int'>\n<class 'str'>"
      }
    ],
    practicalExamples: [
      {
        title: 'Swapping Two Variables',
        code: 'x = 10\ny = 20\nx, y = y, x\nprint(f"x: {x}, y: {y}")',
        explanation: 'Python enables elegant tuple unpacking to swap variables without a temporary helper.',
        output: 'x: 20, y: 10'
      }
    ],
    commonMistakes: [
      {
        mistake: '2nd_score = 95',
        correction: 'second_score = 95',
        explanation: 'Variable names cannot start with a numerical digit.'
      },
      {
        mistake: 'user-name = "Alex"',
        correction: 'user_name = "Alex"',
        explanation: 'Hyphens are interpreted as subtraction operators. Use underscores instead.'
      }
    ],
    keyPoints: [
      'Variables are dynamically typed containers created upon assignment.',
      'Naming convention: snake_case for variables and functions.',
      'Multiple values can be assigned or swapped in a single line using tuple unpacking.'
    ],
    notes: {
      summary: 'Variables point to objects in memory. Dynamic typing enables reassignment across types without explicit declarations.',
      keyRules: [
        'Names cannot start with numbers.',
        'Use type() to inspect the runtime type of any variable.',
        'Avoid overriding built-in names like list, str, dict.'
      ],
      cheatsheetMarkdown: `### Variables Cheat Sheet
\`\`\`python
x = 5          # int
y = "John"     # str
z = 3.14       # float
flag = False   # bool

# Check type
print(type(x)) # <class 'int'>
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Variables & Dynamic Typing
- Assignment syntax: variable = value
- Dynamic Typing: type is resolved and bound at runtime.
- Naming rules: Letters, numbers, underscores; cannot begin with digit.
- Python idiomatic case: snake_case`
    },
    practiceTasks: [
      {
        id: 'pt-var-1',
        title: 'Assign and Print',
        instruction: 'Create two variables: city = "Tokyo" and year = 2026. Print both on one line separated by a space.',
        starterCode: '# Create variables and print\n',
        solutionCode: 'city = "Tokyo"\nyear = 2026\nprint(city, year)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-var-1',
        question: 'Which of the following is an invalid Python variable name?',
        options: ['_temp_value', 'player2_score', '2nd_player', 'total_amount$'],
        correctOptionIndex: 2,
        explanation: 'Variable names cannot begin with a number ("2nd_player"). Also "$" is an illegal character.'
      },
      {
        id: 'q-py-var-2',
        question: 'Which built-in function returns the data type of an object in Python?',
        options: ['typeof()', 'type()', 'datatype()', 'instanceof()'],
        correctOptionIndex: 1,
        explanation: 'type(variable) returns the class type of the object.'
      },
      {
        id: 'q-py-var-3',
        question: 'What is the output of: a, b = 5, 10; a, b = b, a; print(a, b)?',
        options: ['5 10', '10 5', '5 5', '10 10'],
        correctOptionIndex: 1,
        explanation: 'a, b = b, a performs atomic tuple unpacking, swapping the values to a=10, b=5.'
      },
      {
        id: 'q-py-var-4',
        question: 'What naming convention does PEP 8 recommend for Python variables?',
        options: ['camelCase', 'PascalCase', 'snake_case', 'kebab-case'],
        correctOptionIndex: 2,
        explanation: 'PEP 8 recommends snake_case (lowercase letters with underscores) for variable and function names.'
      },
      {
        id: 'q-py-var-5',
        question: 'In Python, what keyword is used to declare a variable as static/constant?',
        options: ['const', 'final', 'let', 'Python has no keyword for constants (by convention ALL_CAPS is used)'],
        correctOptionIndex: 3,
        explanation: 'Python does not enforce constants natively with keywords; developers use UPPER_SNAKE_CASE by convention.'
      }
    ],
    codingChallenge: {
      id: 'c-py-var',
      title: 'Profile Card Assembly',
      slug: 'profile-card-assembly',
      instruction: 'Define three variables: username = "ApexCoder", level = 10, and active = True. Print them together using formatted print(f"User: {username}, Level: {level}, Active: {active}").',
      starterCode: '# Define variables and print the formatted string\n',
      testCases: [
        {
          id: 'tc-var-1',
          input: '',
          expectedOutput: 'User: ApexCoder, Level: 10, Active: True'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-data-types'
  },
  {
    id: 'py-data-types',
    title: 'Python Built-in Data Types',
    slug: 'python-data-types',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 4,
    estimatedMinutes: 8,
    prerequisites: ['py-variables'],
    prevTopicId: 'py-variables',
    introduction: 'Explore fundamental Python data types: Numeric (int, float, complex), Text (str), Boolean (bool), and Sequence types.',
    explanation: `Python provides rich built-in data types divided into primary categories:

| Category | Type Names | Example |
| :--- | :--- | :--- |
| **Text** | \`str\` | \`"APEX"\` |
| **Numeric** | \`int\`, \`float\`, \`complex\` | \`42\`, \`3.14\`, \`2 + 3j\` |
| **Sequence** | \`list\`, \`tuple\`, \`range\` | \`[1, 2]\`, \`(1, 2)\`, \`range(5)\` |
| **Mapping** | \`dict\` | \`{"id": 101}\` |
| **Set** | \`set\`, \`frozenset\` | \`{1, 2, 3}\` |
| **Boolean** | \`bool\` | \`True\`, \`False\` |
| **Binary** | \`bytes\`, \`bytearray\` | \`b"Hello"\` |
| **None Type** | \`NoneType\` | \`None\` |

### Type Casting
You can convert explicitly between types using constructor functions: \`int()\`, \`float()\`, \`str()\`, \`bool()\`, \`list()\`.`,
    syntax: `# Type conversion
x = int(3.99)    # x becomes 3 (truncation)
y = float("4.5") # y becomes 4.5
z = str(100)     # z becomes "100"`,
    codeExamples: [
      {
        title: 'Inspecting Types & Casting',
        code: 'price_str = "49.95"\nprice = float(price_str)\nquantity = 3\ntotal = price * quantity\nprint(f"Total: \${total:.2f}")',
        explanation: 'Casting string to float enables arithmetic operations.',
        output: 'Total: $149.85'
      }
    ],
    practicalExamples: [
      {
        title: 'Boolean Truthiness in Python',
        code: 'print(bool(1))       # True\nprint(bool(0))       # False\nprint(bool(""))      # False (empty string)\nprint(bool("Apex"))  # True',
        explanation: 'Zero, empty sequences, and None evaluate to False in boolean context.',
        output: 'True\nFalse\nFalse\nTrue'
      }
    ],
    commonMistakes: [
      {
        mistake: 'result = "10" + 5',
        correction: 'result = int("10") + 5  # or "10" + str(5)',
        explanation: 'Python does not perform implicit string-to-number coercion. It raises TypeError: can only concatenate str to str.'
      }
    ],
    keyPoints: [
      'Python has built-in numeric, text, sequence, mapping, set, boolean, and binary types.',
      'Explicit conversion is done using int(), float(), str(), bool(), etc.',
      'In Python, integers have arbitrary precision and do not overflow standard word boundaries.'
    ],
    notes: {
      summary: 'Python types are objects. Python offers automatic garbage collection and arbitrary-precision integers.',
      keyRules: [
        'int() truncates floating point decimals toward zero.',
        'str() converts any valid object to its string representation.',
        'Empty collections and 0 evaluate to False.'
      ],
      cheatsheetMarkdown: `### Built-in Types Cheatsheet
- \`int\`: Whole numbers: \`10\`, \`-50\`
- \`float\`: Real numbers: \`3.14159\`
- \`str\`: Text: \`'single'\` or \`"double"\`
- \`bool\`: \`True\` or \`False\`
- \`None\`: Absence of value`,
      downloadableMarkdown: `# APEX Python Notes: Built-in Data Types
- str: UTF-8 Unicode text string.
- int: Arbitrary precision integer.
- float: 64-bit IEEE 754 floating point number.
- bool: Subtype of int (True=1, False=0).`
    },
    practiceTasks: [
      {
        id: 'pt-dt-1',
        title: 'Cast and Calculate',
        instruction: 'Given a string num_str = "120", cast it to an int, multiply by 2, and print the result.',
        starterCode: 'num_str = "120"\n# Convert and print result\n',
        solutionCode: 'num_str = "120"\nprint(int(num_str) * 2)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-dt-1',
        question: 'What is the result of float("3.5") * 2 in Python?',
        options: ['"3.53.5"', '7.0', '7', 'TypeError'],
        correctOptionIndex: 1,
        explanation: 'float("3.5") converts the string to 3.5, and 3.5 * 2 results in 7.0 (float).'
      },
      {
        id: 'q-py-dt-2',
        question: 'What does int(4.85) evaluate to in Python?',
        options: ['5', '4', '4.85', 'TypeError'],
        correctOptionIndex: 1,
        explanation: 'int() truncates the decimal part toward zero, giving 4.'
      },
      {
        id: 'q-py-dt-3',
        question: 'Which of the following evaluates to False in a boolean context in Python?',
        options: ['bool("False")', 'bool([0])', 'bool("")', 'bool(-1)'],
        correctOptionIndex: 2,
        explanation: 'An empty string "" is falsy. Non-empty strings like "False" and non-empty lists like [0] are truthy.'
      },
      {
        id: 'q-py-dt-4',
        question: 'What is the type of the value None in Python?',
        options: ['void', 'null', 'NoneType', 'undefined'],
        correctOptionIndex: 2,
        explanation: 'None is the single instance of the class NoneType.'
      },
      {
        id: 'q-py-dt-5',
        question: 'What is the result of "Python" * 3?',
        options: ['TypeError', '"PythonPythonPython"', '"Python 3"', '"9"'],
        correctOptionIndex: 1,
        explanation: 'Multiplying a string by an integer performs string repetition.'
      }
    ],
    codingChallenge: {
      id: 'c-py-dt',
      title: 'String to Number Arithmetic',
      slug: 'string-to-number-arithmetic',
      instruction: 'Given two string inputs a_str = "25" and b_str = "75", convert them to integers, calculate their sum, and print "Sum is 100".',
      starterCode: 'a_str = "25"\nb_str = "75"\n# Convert and print formatted sum\n',
      testCases: [
        {
          id: 'tc-dt-1',
          input: '',
          expectedOutput: 'Sum is 100'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-operators'
  },
  {
    id: 'py-operators',
    title: 'Python Operators & Expressions',
    slug: 'python-operators',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 5,
    estimatedMinutes: 8,
    prerequisites: ['py-data-types'],
    prevTopicId: 'py-data-types',
    introduction: 'Master Arithmetic, Comparison, Logical, Bitwise, Assignment, Identity, and Membership operators in Python.',
    explanation: `Operators perform operations on variables and values. Python supports:

### 1. Arithmetic Operators:
- Addition: \`+\`, Subtraction: \`-\`, Multiplication: \`*\`, Division: \`/\` (always returns float)
- Floor Division: \`//\` (truncates decimal), Modulus: \`%\` (remainder), Exponentiation: \`**\` (power)

### 2. Comparison & Logical Operators:
- Comparison: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- Logical: \`and\`, \`or\`, \`not\`

### 3. Identity & Membership:
- Identity: \`is\` (same memory address), \`is not\`
- Membership: \`in\` (element exists in collection), \`not in\``,
    syntax: `# Floor division & Modulus
quotient = 17 // 5  # 3
remainder = 17 % 5  # 2
power = 2 ** 8      # 256

# Membership check
"py" in "python"    # True`,
    codeExamples: [
      {
        title: 'Arithmetic Operations',
        code: 'print(10 / 3)   # Normal float division\nprint(10 // 3)  # Floor division\nprint(10 % 3)   # Modulus (remainder)\nprint(2 ** 4)   # 2 to the power of 4',
        explanation: 'Floor division returns an integer; ** is exponentiation.',
        output: '3.3333333333333335\n3\n1\n16'
      },
      {
        title: 'Membership & Identity Check',
        code: 'fruits = ["apple", "banana", "cherry"]\nprint("apple" in fruits)\nprint("mango" not in fruits)',
        explanation: 'The "in" operator searches sequences with clean readable syntax.',
        output: 'True\nTrue'
      }
    ],
    practicalExamples: [
      {
        title: 'Chained Comparison Expressions',
        code: 'score = 85\n# Python supports mathematical chaining: 70 <= score < 90\nif 70 <= score < 90:\n    print("Grade: B - Proficient")',
        explanation: 'Python allows chained comparisons without needing multiple "and" keywords.',
        output: 'Grade: B - Proficient'
      }
    ],
    commonMistakes: [
      {
        mistake: 'if a = 5:',
        correction: 'if a == 5:',
        explanation: 'A single "=" is assignment. Double "==" is comparison for equality.'
      },
      {
        mistake: 'result = 2 ^ 3  # expecting 8',
        correction: 'result = 2 ** 3  # 8',
        explanation: '"^" is the bitwise XOR operator in Python, not exponentiation.'
      }
    ],
    keyPoints: [
      '// performs floor division, % returns remainder, and ** computes exponentiation.',
      'Comparison operators support mathematical chaining (e.g. 1 < x < 10).',
      'Use "is" for identity comparison (e.g., x is None) and "==" for value equality.'
    ],
    notes: {
      summary: 'Operators form the basis of Python computations and conditional flow.',
      keyRules: [
        'Always check for None using "is None" rather than "== None".',
        'Exponentiation is ** (not ^).',
        'Division / always returns a float in Python 3.'
      ],
      cheatsheetMarkdown: `### Operators Quick Reference
- Power: \`x ** y\`
- Floor Div: \`x // y\`
- Modulo: \`x % y\`
- Identity: \`x is None\`
- Membership: \`x in list\``,
      downloadableMarkdown: `# APEX Python Notes: Operators & Expressions
- Arithmetic: +, -, *, /, //, %, **
- Logical: and, or, not
- Comparison: ==, !=, >, <, >=, <= (supports chaining)
- Identity: is, is not (memory object ID comparison)
- Membership: in, not in (iterable membership)`
    },
    practiceTasks: [
      {
        id: 'pt-op-1',
        title: 'Calculate Remainder and Power',
        instruction: 'Calculate 25 modulo 4 and print the result, then print 3 cubed (3 to the power 3).',
        starterCode: '# Write calculations\n',
        solutionCode: 'print(25 % 4)\nprint(3 ** 3)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-op-1',
        question: 'What is the value of 19 // 4 in Python?',
        options: ['4.75', '4', '5', '3'],
        correctOptionIndex: 1,
        explanation: '19 // 4 performs floor division, rounding down to 4.'
      },
      {
        id: 'q-py-op-2',
        question: 'Which operator is used for exponentiation (power) in Python?',
        options: ['^', '**', '^^', 'pow'],
        correctOptionIndex: 1,
        explanation: '** is the exponentiation operator in Python (e.g., 2 ** 3 = 8).'
      },
      {
        id: 'q-py-op-3',
        question: 'What is the difference between "==" and "is" in Python?',
        options: [
          '"==" compares memory addresses, while "is" compares values',
          '"==" checks value equality, while "is" checks object identity (same memory address)',
          'They are exact synonyms',
          '"is" is only for numbers'
        ],
        correctOptionIndex: 1,
        explanation: '"==" compares whether two objects have identical values; "is" tests whether two variables reference the exact same object in memory.'
      },
      {
        id: 'q-py-op-4',
        question: 'What does the expression 5 in [1, 2, 3, 4, 5] return?',
        options: ['Index 4', '5', 'True', 'False'],
        correctOptionIndex: 2,
        explanation: 'The membership operator "in" returns True if the item is in the iterable.'
      },
      {
        id: 'q-py-op-5',
        question: 'What is the output of not (5 > 2 and 3 < 1)?',
        options: ['True', 'False', 'None', 'SyntaxError'],
        correctOptionIndex: 0,
        explanation: '5 > 2 is True, 3 < 1 is False. True and False is False. not(False) is True.'
      }
    ],
    codingChallenge: {
      id: 'c-py-op',
      title: 'Power & Modulo Evaluator',
      slug: 'power-and-modulo-evaluator',
      instruction: 'Write a program that takes base = 2, exp = 5, and divisor = 7. Compute (base ** exp) % divisor and print "Result: <value>".',
      starterCode: 'base = 2\nexp = 5\ndivisor = 7\n# Calculate (2**5) % 7 and print formatted Result\n',
      testCases: [
        {
          id: 'tc-op-1',
          input: '',
          expectedOutput: 'Result: 4'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-strings'
  },
  {
    id: 'py-strings',
    title: 'Python Strings & Slicing',
    slug: 'python-strings',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 6,
    estimatedMinutes: 8,
    prerequisites: ['py-operators'],
    prevTopicId: 'py-operators',
    introduction: 'Master Python string methods, indexing, negative slicing, and f-string interpolation.',
    explanation: `Strings in Python are immutable sequences of Unicode characters.

### Slicing Syntax: \`string[start:stop:step]\`
- \`start\`: Starting index (inclusive, default 0).
- \`stop\`: Ending index (exclusive).
- \`step\`: Stride step (e.g., -1 reverses a string).

### Common String Methods:
- \`.lower()\`, \`.upper()\`, \`.strip()\`, \`.replace(old, new)\`, \`.split(sep)\`, \`.join(iterable)\`, \`.find(sub)\``,
    syntax: `# Slicing and Formatting
text = "APEX Platform"
first_four = text[0:4]       # "APEX"
reversed_text = text[::-1]    # "mroftalP XEPA"
formatted = f"Welcome to {text}"`,
    codeExamples: [
      {
        title: 'String Slicing',
        code: 'word = "Innovation"\nprint(word[0:3])    # First 3 letters\nprint(word[-4:])    # Last 4 letters\nprint(word[::-1])   # Reversed',
        explanation: 'Negative indices count backward from the end.',
        output: 'Inn\ntion\nnoitavonnI'
      },
      {
        title: 'String Methods & Join',
        code: 'tags = "python,coding,apex,growth"\ntags_list = tags.split(",")\nprint(tags_list)\nreconstructed = " | ".join(tags_list)\nprint(reconstructed)',
        explanation: 'split() parses delimited text into a list; join() merges it back.',
        output: "['python', 'coding', 'apex', 'growth']\npython | coding | apex | growth"
      }
    ],
    practicalExamples: [
      {
        title: 'Cleaning User Input',
        code: 'raw_email = "  User.Name@ApexDev.COM  "\nclean_email = raw_email.strip().lower()\nprint(f"Normalized: {clean_email}")',
        explanation: 'strip() cleans surrounding whitespace and lower() normalizes case.',
        output: 'Normalized: user.name@apexdev.com'
      }
    ],
    commonMistakes: [
      {
        mistake: 'name = "Apex"\nname[0] = "O"',
        correction: 'name = "O" + name[1:]',
        explanation: 'Strings are immutable in Python; you cannot mutate characters in place.'
      }
    ],
    keyPoints: [
      'Strings are immutable sequences of Unicode characters.',
      'Slicing uses [start:stop:step] with 0-based indexing.',
      'Use f-strings for concise, performant formatting.'
    ],
    notes: {
      summary: 'Strings are immutable. String operations return new string instances.',
      keyRules: [
        'Negative indexing: -1 is the last character.',
        '[::-1] is the idiomatic way to reverse a string.',
        'len(str) returns character count.'
      ],
      cheatsheetMarkdown: `### String Methods Cheat Sheet
- \`s.strip()\`: Removes leading/trailing whitespace
- \`s.split(",")\`: Splits string into list
- \`", ".join(list)\`: Joins list with separator
- \`f"{var}"\`: Formatted f-string`,
      downloadableMarkdown: `# APEX Python Notes: Strings & Slicing
- Immutable sequence of characters.
- Indexing: s[0] first, s[-1] last.
- Slicing: s[start:stop:step]
- Formatting: f"Hello {name}"`
    },
    practiceTasks: [
      {
        id: 'pt-str-1',
        title: 'Reverse a String',
        instruction: 'Given s = "Developer", print the reversed string using slicing.',
        starterCode: 's = "Developer"\n# Print reversed string\n',
        solutionCode: 's = "Developer"\nprint(s[::-1])'
      }
    ],
    quizzes: [
      {
        id: 'q-py-str-1',
        question: 'What is the output of "Python"[1:4] in Python?',
        options: ['"Pyt"', '"yth"', '"ytho"', '"P"'],
        correctOptionIndex: 1,
        explanation: 'Slice [1:4] starts at index 1 ("y") and stops before index 4 ("o"), giving "yth".'
      },
      {
        id: 'q-py-str-2',
        question: 'How do you reverse a string "Apex" in Python using slicing?',
        options: ['"Apex".reverse()', '"Apex"[::-1]', '"Apex"[0:-1]', 'reverse("Apex")'],
        correctOptionIndex: 1,
        explanation: 'Slice [::-1] uses a step of -1 to reverse the sequence.'
      },
      {
        id: 'q-py-str-3',
        question: 'Are Python strings mutable or immutable?',
        options: ['Mutable', 'Immutable', 'Mutable only inside functions', 'Immutable only when frozen'],
        correctOptionIndex: 1,
        explanation: 'Python strings are strictly immutable; modifying a string creates a new string object.'
      },
      {
        id: 'q-py-str-4',
        question: 'What does "  hello  ".strip() return?',
        options: ['"hello"', '"  hello"', '"hello  "', 'None'],
        correctOptionIndex: 0,
        explanation: '.strip() strips all leading and trailing whitespace.'
      },
      {
        id: 'q-py-str-5',
        question: 'Which syntax represents modern Python f-strings?',
        options: ['f"Value is {x}"', '"Value is %s" % x', '"Value is {}".format(x)', 'string.format("Value is {x}")'],
        correctOptionIndex: 0,
        explanation: 'f"Value is {x}" is Python 3.6+ f-string literal syntax.'
      }
    ],
    codingChallenge: {
      id: 'c-py-str',
      title: 'Domain Extractor',
      slug: 'domain-extractor',
      instruction: 'Given email = "engineer@apexplatform.com", use .split("@") to extract the domain part and print "Domain: apexplatform.com".',
      starterCode: 'email = "engineer@apexplatform.com"\n# Extract domain and print formatted output\n',
      testCases: [
        {
          id: 'tc-str-1',
          input: '',
          expectedOutput: 'Domain: apexplatform.com'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-conditions'
  },
  {
    id: 'py-conditions',
    title: 'Python Conditionals & Match',
    slug: 'python-conditionals',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 7,
    estimatedMinutes: 9,
    prerequisites: ['py-strings'],
    prevTopicId: 'py-strings',
    introduction: 'Control program flow with if, elif, else statements and modern Python 3.10+ match-case structural pattern matching.',
    explanation: `Conditional statements allow your code to branch and execute decisions based on boolean criteria.

### 1. If-Elif-Else Ladder
\`\`\`python
if condition1:
    # Executes if condition1 is True
elif condition2:
    # Executes if condition2 is True
else:
    # Fallback branch
\`\`\`

### 2. Ternary Conditional Operator
\`\`\`python
status = "Adult" if age >= 18 else "Minor"
\`\`\`

### 3. Match-Case (Python 3.10+)
Structural pattern matching replaces cumbersome if-elif chains:
\`\`\`python
match status_code:
    case 200:
        print("OK")
    case 404:
        print("Not Found")
    case _:
        print("Unknown Error")
\`\`\``,
    syntax: `# If-Elif-Else and Match-Case
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"`,
    codeExamples: [
      {
        title: 'Grade Classifier',
        code: 'score = 88\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C")',
        explanation: 'Evaluates top-to-bottom and exits after the first matching branch.',
        output: 'Grade: B'
      },
      {
        title: 'Match-Case Statement',
        code: 'command = "start"\nmatch command:\n    case "start":\n        print("Engine Running")\n    case "stop":\n        print("Engine Stopped")\n    case _:\n        print("Unknown Command")',
        explanation: 'Case _ serves as the wildcard default branch.',
        output: 'Engine Running'
      }
    ],
    practicalExamples: [
      {
        title: 'Ternary Conditional Expression',
        code: 'is_admin = True\naccess_level = "Full Access" if is_admin else "Guest Access"\nprint(access_level)',
        explanation: 'Single-line ternary evaluation: value_if_true if condition else value_if_false.',
        output: 'Full Access'
      }
    ],
    commonMistakes: [
      {
        mistake: 'else if score > 50:',
        correction: 'elif score > 50:',
        explanation: 'Python uses "elif", not "else if".'
      }
    ],
    keyPoints: [
      'Use if, elif, and else for branching logic.',
      'Ternary syntax: x = a if condition else b.',
      'match-case (Python 3.10+) provides pattern matching with wildcard case _.'
    ],
    notes: {
      summary: 'Decision-making in Python relies on if-elif-else blocks and match-case patterns.',
      keyRules: [
        'Colons : are required after if, elif, else, and case headers.',
        'elif is a single keyword in Python.',
        'case _ matches any unmatched value.'
      ],
      cheatsheetMarkdown: `### Conditionals Cheatsheet
\`\`\`python
if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("Zero")

# Ternary
msg = "Yes" if flag else "No"
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Conditionals & Match-Case
- if, elif, else flow control
- Ternary: val_true if cond else val_false
- Match-case: match val: case pattern: ... case _:`
    },
    practiceTasks: [
      {
        id: 'pt-cond-1',
        title: 'Even or Odd',
        instruction: 'Given n = 14, write an if-else check that prints "Even" if n % 2 == 0 else "Odd".',
        starterCode: 'n = 14\n# Write even/odd check\n',
        solutionCode: 'n = 14\nif n % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")'
      }
    ],
    quizzes: [
      {
        id: 'q-py-cnd-1',
        question: 'Which keyword is used in Python for "else if"?',
        options: ['elseif', 'else if', 'elif', 'elsif'],
        correctOptionIndex: 2,
        explanation: 'Python uses the keyword "elif" for else-if conditions.'
      },
      {
        id: 'q-py-cnd-2',
        question: 'What is the default wildcard pattern in a Python match-case block?',
        options: ['default:', 'case *:', 'case _:', 'otherwise:'],
        correctOptionIndex: 2,
        explanation: 'In Python match-case statements, "case _:" acts as the catch-all wildcard.'
      },
      {
        id: 'q-py-cnd-3',
        question: 'What is the value of: x = 10 if 5 > 2 else 20?',
        options: ['10', '20', 'True', '5'],
        correctOptionIndex: 0,
        explanation: 'Since 5 > 2 is True, the ternary expression returns the first value (10).'
      },
      {
        id: 'q-py-cnd-4',
        question: 'In which version was the match-case statement introduced in Python?',
        options: ['Python 3.6', 'Python 3.8', 'Python 3.10', 'Python 3.12'],
        correctOptionIndex: 2,
        explanation: 'PEP 634 introduced match-case structural pattern matching in Python 3.10.'
      },
      {
        id: 'q-py-cnd-5',
        question: 'What happens if no condition in an if-elif chain is True and there is no else clause?',
        options: ['Python raises an unhandled branch error', 'The entire statement block is skipped without error', 'Python executes the first branch', 'Returns None'],
        correctOptionIndex: 1,
        explanation: 'If no branch matches and no else exists, execution proceeds to the next statement.'
      }
    ],
    codingChallenge: {
      id: 'c-py-cond',
      title: 'Traffic Signal Controller',
      slug: 'traffic-signal-controller',
      instruction: 'Given signal = "green", write a conditional statement that prints "GO" for "green", "SLOW" for "yellow", and "STOP" for "red".',
      starterCode: 'signal = "green"\n# Write conditional statement\n',
      testCases: [
        {
          id: 'tc-cond-1',
          input: '',
          expectedOutput: 'GO'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-loops'
  },
  {
    id: 'py-loops',
    title: 'Python Loops & Iteration',
    slug: 'python-loops',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 8,
    estimatedMinutes: 9,
    prerequisites: ['py-conditions'],
    prevTopicId: 'py-conditions',
    introduction: 'Master while loops, for loops, range() sequences, loop control (break, continue), and loop else clauses.',
    explanation: `Python provides two primary loop constructs:

### 1. For Loops & \`range(start, stop, step)\`
Iterates over any iterable (list, string, dictionary, range):
\`\`\`python
for i in range(1, 6):
    print(i) # prints 1, 2, 3, 4, 5
\`\`\`

### 2. While Loops
Executes as long as a condition remains True:
\`\`\`python
count = 0
while count < 3:
    print(count)
    count += 1
\`\`\`

### Loop Controls:
- \`break\`: Exits the loop immediately.
- \`continue\`: Skips the current iteration to the next.
- \`else\` on loops: Executes only if the loop completed normally without hitting a \`break\`.`,
    syntax: `# For loop with range
for i in range(0, 10, 2):
    print(i) # 0, 2, 4, 6, 8

# While loop with break
while True:
    break`,
    codeExamples: [
      {
        title: 'Range-Based For Loop',
        code: 'total = 0\nfor n in range(1, 6):\n    total += n\nprint(f"Sum 1 to 5: {total}")',
        explanation: 'range(1, 6) produces numbers 1, 2, 3, 4, 5.',
        output: 'Sum 1 to 5: 15'
      },
      {
        title: 'Break and Continue',
        code: 'for i in range(1, 6):\n    if i == 3:\n        continue # Skip 3\n    print(i, end=" ")\nprint()',
        explanation: 'continue skips iteration 3.',
        output: '1 2 4 5'
      }
    ],
    practicalExamples: [
      {
        title: 'For-Else Search Pattern',
        code: 'numbers = [2, 4, 6, 8]\nfor n in numbers:\n    if n % 2 != 0:\n        print("Found odd number")\n        break\nelse:\n    print("All numbers are even")',
        explanation: 'The loop else executes because break was never encountered.',
        output: 'All numbers are even'
      }
    ],
    commonMistakes: [
      {
        mistake: 'while count < 5:\n    print(count)\n    # Forgot count += 1',
        correction: 'while count < 5:\n    print(count)\n    count += 1',
        explanation: 'Forgetting to update the loop counter creates an infinite loop.'
      }
    ],
    keyPoints: [
      'for loops iterate directly over sequences; range(start, stop, step) generates numeric sequences.',
      'break terminates loop, continue advances to the next iteration.',
      'Python loops support an optional else clause executed when no break occurred.'
    ],
    notes: {
      summary: 'Loops iterate through sequences and repeat actions efficiently.',
      keyRules: [
        'range(stop) starts at 0 and stops before stop.',
        'range(1, 5) produces 1, 2, 3, 4.',
        'Infinite loops can be stopped with break.'
      ],
      cheatsheetMarkdown: `### Loops Cheatsheet
\`\`\`python
# For
for item in [1, 2, 3]:
    pass

# While
while x > 0:
    x -= 1

# Enumerate
for idx, val in enumerate(["a", "b"]):
    print(idx, val)
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Loops & Iteration
- for var in iterable:
- while condition:
- range(start, stop, step)
- break (exit), continue (skip)`
    },
    practiceTasks: [
      {
        id: 'pt-loop-1',
        title: 'Print First 5 Multiples',
        instruction: 'Use a for loop with range() to print the first 5 multiples of 3 (3, 6, 9, 12, 15), each on a new line.',
        starterCode: '# Print multiples of 3\n',
        solutionCode: 'for i in range(1, 6):\n    print(i * 3)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-loop-1',
        question: 'What numbers does range(1, 5) generate in Python?',
        options: ['1, 2, 3, 4, 5', '1, 2, 3, 4', '0, 1, 2, 3, 4', '2, 3, 4, 5'],
        correctOptionIndex: 1,
        explanation: 'range(1, 5) starts at 1 and stops before 5 (exclusive stop).'
      },
      {
        id: 'q-py-loop-2',
        question: 'Which keyword immediately terminates a loop in Python?',
        options: ['stop', 'exit', 'break', 'return'],
        correctOptionIndex: 2,
        explanation: 'The "break" keyword immediately terminates the enclosing loop.'
      },
      {
        id: 'q-py-loop-3',
        question: 'When does the "else" block of a Python for loop execute?',
        options: [
          'Whenever the loop terminates via break',
          'Only when the loop completes all iterations without encountering a break',
          'Before the loop starts',
          'Whenever an error occurs in the loop'
        ],
        correctOptionIndex: 1,
        explanation: 'The loop else executes only if the loop completes normally without hitting a break.'
      },
      {
        id: 'q-py-loop-4',
        question: 'What is the output of range(0, 10, 3) converted to a list?',
        options: ['[0, 3, 6, 9]', '[3, 6, 9]', '[0, 3, 6, 9, 12]', '[0, 1, 2]'],
        correctOptionIndex: 0,
        explanation: 'With a step of 3, numbers generated up to 10 are 0, 3, 6, 9.'
      },
      {
        id: 'q-py-loop-5',
        question: 'Which built-in function returns both index and item when looping over a list?',
        options: ['index_of()', 'enumerate()', 'zip()', 'iterate()'],
        correctOptionIndex: 1,
        explanation: 'enumerate(iterable) yields (index, item) pairs during iteration.'
      }
    ],
    codingChallenge: {
      id: 'c-py-loop',
      title: 'Countdown Engine',
      slug: 'countdown-engine',
      instruction: 'Write a while loop starting from count = 3 down to 1 that prints each number, and then prints "Liftoff!".',
      starterCode: 'count = 3\n# Write while loop and Liftoff print\n',
      testCases: [
        {
          id: 'tc-loop-1',
          input: '',
          expectedOutput: '3\n2\n1\nLiftoff!'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-functions'
  },
  {
    id: 'py-functions',
    title: 'Python Functions & Scope',
    slug: 'python-functions',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 9,
    estimatedMinutes: 10,
    prerequisites: ['py-loops'],
    prevTopicId: 'py-loops',
    introduction: 'Define reusable code with def, return values, default arguments, *args, **kwargs, docstrings, and lambda functions.',
    explanation: `Functions are named blocks of reusable code defined with the \`def\` keyword.

### Function Features:
- **Parameters & Defaults:** Parameters can have default values.
- **Return Values:** Returns values using \`return\` (returns \`None\` if omitted).
- **Arbitrary Positional Arguments (\`*args\`):** Receives extra positional arguments as a tuple.
- **Arbitrary Keyword Arguments (\`**kwargs\`):** Receives extra named arguments as a dictionary.
- **Lambda Functions:** Anonymous single-line functions: \`lambda x, y: x + y\`.`,
    syntax: `def function_name(param1, param2=default_value):
    """Docstring explaining the function."""
    return result

# Lambda function
add = lambda a, b: a + b`,
    codeExamples: [
      {
        title: 'Function with Return Value',
        code: 'def calculate_area(width, height=10):\n    return width * height\n\nprint(calculate_area(5, 4))\nprint(calculate_area(7))  # Uses default height=10',
        explanation: 'Parameters with defaults are optional when calling the function.',
        output: '20\n70'
      },
      {
        title: '*args and **kwargs',
        code: 'def summary(*numbers, **details):\n    total = sum(numbers)\n    print(f"User: {details.get(\'user\')}, Total: {total}")\n\nsummary(10, 20, 30, user="Alex")',
        explanation: '*args gathers variable arguments as a tuple, **kwargs as a dict.',
        output: 'User: Alex, Total: 60'
      }
    ],
    practicalExamples: [
      {
        title: 'Lambda with Map & Filter',
        code: 'scores = [45, 82, 91, 63, 78]\npassed = list(filter(lambda s: s >= 70, scores))\nprint(f"Passed scores: {passed}")',
        explanation: 'Lambda functions provide inline filtering logic.',
        output: 'Passed scores: [82, 91, 78]'
      }
    ],
    commonMistakes: [
      {
        mistake: 'def append_to(item, target_list=[]):\n    target_list.append(item)\n    return target_list',
        correction: 'def append_to(item, target_list=None):\n    if target_list is None:\n        target_list = []\n    target_list.append(item)\n    return target_list',
        explanation: 'Mutable default arguments (like []) are shared across all calls. Use None as default.'
      }
    ],
    keyPoints: [
      'Define functions with def; lambda defines inline anonymous functions.',
      '*args collects extra positional arguments into a tuple; **kwargs collects keyword arguments into a dict.',
      'Avoid mutable default arguments (e.g. lists or dicts).'
    ],
    notes: {
      summary: 'Functions modularize code into reusable, testable units.',
      keyRules: [
        'Default arguments must follow non-default arguments in signatures.',
        'LEGB rule governs scope: Local -> Enclosing -> Global -> Built-in.',
        'Use type hints (def fn(x: int) -> int:) for clarity.'
      ],
      cheatsheetMarkdown: `### Functions Cheatsheet
\`\`\`python
def greet(name: str = "World") -> str:
    return f"Hello, {name}!"

# Lambda
sq = lambda x: x ** 2
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Functions & Scope
- def name(args): return val
- *args: variable positional args (tuple)
- **kwargs: variable keyword args (dict)
- Scope: LEGB (Local, Enclosing, Global, Built-in)`
    },
    practiceTasks: [
      {
        id: 'pt-fn-1',
        title: 'Define Square Function',
        instruction: 'Define a function square(n) that returns n ** 2, and print square(8).',
        starterCode: '# Define square function\n',
        solutionCode: 'def square(n):\n    return n ** 2\n\nprint(square(8))'
      }
    ],
    quizzes: [
      {
        id: 'q-py-fn-1',
        question: 'Which keyword is used to define a function in Python?',
        options: ['func', 'function', 'def', 'define'],
        correctOptionIndex: 2,
        explanation: 'Python uses the "def" keyword to define functions.'
      },
      {
        id: 'q-py-fn-2',
        question: 'What does *args receive inside a Python function?',
        options: ['A dictionary of keyword arguments', 'A tuple of positional arguments', 'A list of strings', 'An integer count'],
        correctOptionIndex: 1,
        explanation: '*args gathers variable extra positional arguments into a tuple.'
      },
      {
        id: 'q-py-fn-3',
        question: 'What is returned by a Python function that has no explicit return statement?',
        options: ['0', 'False', 'None', 'void'],
        correctOptionIndex: 2,
        explanation: 'In Python, functions without an explicit return statement return None by default.'
      },
      {
        id: 'q-py-fn-4',
        question: 'What is a lambda function in Python?',
        options: ['A recursive function', 'A multi-threaded function', 'A small anonymous single-expression function', 'A function from the math library'],
        correctOptionIndex: 2,
        explanation: 'Lambda functions are small anonymous functions restricted to a single expression.'
      },
      {
        id: 'q-py-fn-5',
        question: 'Why is def f(val, items=[]): dangerous in Python?',
        options: [
          'It causes a SyntaxError',
          'The default list is created once and shared across repeated calls, retaining mutations',
          'Lists cannot be default arguments in Python 3',
          'It runs 10x slower'
        ],
        correctOptionIndex: 1,
        explanation: 'Default arguments are evaluated once at function definition time, so mutable defaults like [] accumulate state across calls.'
      }
    ],
    codingChallenge: {
      id: 'c-py-fn',
      title: 'Power Multiplier Function',
      slug: 'power-multiplier-function',
      instruction: 'Define a function multiply_and_power(a, b, power=2) that returns (a * b) ** power. Call and print multiply_and_power(3, 4).',
      starterCode: '# Define function and print result\n',
      testCases: [
        {
          id: 'tc-fn-1',
          input: '',
          expectedOutput: '144'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-collections'
  },
  {
    id: 'py-collections',
    title: 'Python Collections (Lists, Tuples, Sets, Dictionaries)',
    slug: 'python-collections',
    category: 'Python Tutorial',
    categoryId: 'tutorial',
    level: 'beginner',
    order: 10,
    estimatedMinutes: 10,
    prerequisites: ['py-functions'],
    prevTopicId: 'py-functions',
    introduction: 'Master the 4 fundamental built-in Python data structures: Lists, Tuples, Sets, and Dictionaries.',
    explanation: `Python provides 4 core built-in collection data structures:

| Data Structure | Syntax | Ordered? | Mutable? | Duplicates? |
| :--- | :--- | :--- | :--- | :--- |
| **List** | \`[1, 2, 3]\` | Yes | Yes | Yes |
| **Tuple** | \`(1, 2, 3)\` | Yes | No (Immutable) | Yes |
| **Set** | \`{1, 2, 3}\` | No | Yes (add/remove) | No (Unique) |
| **Dictionary** | \`{"k": "v"}\` | Yes (3.7+) | Keys immutable, values mutable | Keys Unique |

### Key Operations:
- **List:** \`.append()\`, \`.insert()\`, \`.pop()\`, \`.sort()\`, list comprehensions \`[x*2 for x in items]\`
- **Tuple:** Packing/unpacking, immutable records
- **Set:** Union \`|\`, Intersection \`&\`, Difference \`-\`
- **Dict:** \`.keys()\`, \`.values()\`, \`.items()\`, \`.get(key, default)\``,
    syntax: `# List, Tuple, Set, Dict
my_list = [1, 2, 3]
my_tuple = (1, 2, 3)
my_set = {1, 2, 3}
my_dict = {"name": "Apex", "level": 1}`,
    codeExamples: [
      {
        title: 'List Comprehensions',
        code: 'numbers = [1, 2, 3, 4, 5]\nsquares = [n ** 2 for n in numbers if n % 2 != 0]\nprint(f"Odd squares: {squares}")',
        explanation: 'List comprehensions provide concise, fast declarative transformations.',
        output: 'Odd squares: [1, 9, 25]'
      },
      {
        title: 'Dictionary Manipulation',
        code: 'user = {"name": "Cipher", "score": 95}\nuser["rank"] = "Apex Master"\nprint(user.get("role", "Guest"))\nfor k, v in user.items():\n    print(f"{k}: {v}")',
        explanation: 'get() handles missing keys gracefully with optional defaults.',
        output: 'Guest\nname: Cipher\nscore: 95\nrank: Apex Master'
      }
    ],
    practicalExamples: [
      {
        title: 'Set Deduplication and Union',
        code: 'tags_a = {"python", "ai", "web"}\ntags_b = {"web", "cloud", "security"}\nall_tags = tags_a | tags_b\ncommon_tags = tags_a & tags_b\nprint(f"All: {sorted(list(all_tags))}")\nprint(f"Common: {sorted(list(common_tags))}")',
        explanation: 'Sets perform fast mathematical union and intersection operations.',
        output: "All: ['ai', 'cloud', 'python', 'security', 'web']\nCommon: ['web']"
      }
    ],
    commonMistakes: [
      {
        mistake: 'single_tuple = (5)  # produces int, not tuple',
        correction: 'single_tuple = (5,)  # note the trailing comma',
        explanation: 'A single-item tuple must have a trailing comma, otherwise Python treats parentheses as math grouping.'
      }
    ],
    keyPoints: [
      'Lists are ordered and mutable; Tuples are ordered and immutable.',
      'Sets store unique unordered elements and support set algebra (union, intersection).',
      'Dictionaries map unique hashable keys to arbitrary values.'
    ],
    notes: {
      summary: 'Lists, Tuples, Sets, and Dictionaries form the structural foundation of Python data manipulation.',
      keyRules: [
        'Dict keys and Set elements must be hashable/immutable.',
        'Use dict.get(key, default) to avoid KeyError.',
        'List comprehensions: [expr for item in iterable if condition].'
      ],
      cheatsheetMarkdown: `### Collections Quick Reference
- \`list\`: \`[1, 2, 3]\` (\`.append()\`, \`.pop()\`)
- \`tuple\`: \`(1, 2, 3)\` (read-only)
- \`set\`: \`{1, 2, 3}\` (\`.add()\`, \`.remove()\`)
- \`dict\`: \`{"k": "v"}\` (\`.get()\`, \`.items()\`)`,
      downloadableMarkdown: `# APEX Python Notes: Built-in Collections
- List: [a, b] - mutable sequence
- Tuple: (a, b) - immutable sequence
- Set: {a, b} - unique set
- Dict: {k: v} - key-value mapping`
    },
    practiceTasks: [
      {
        id: 'pt-col-1',
        title: 'Filter Even Numbers',
        instruction: 'Given numbers = [1, 2, 3, 4, 6, 7, 8], use a list comprehension to create a list of even numbers and print it.',
        starterCode: 'numbers = [1, 2, 3, 4, 6, 7, 8]\n# Create evens list and print\n',
        solutionCode: 'numbers = [1, 2, 3, 4, 6, 7, 8]\nevens = [n for n in numbers if n % 2 == 0]\nprint(evens)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-col-1',
        question: 'Which of the following Python data structures is immutable?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctOptionIndex: 3,
        explanation: 'Tuples are immutable; once created, their elements cannot be modified, added, or removed.'
      },
      {
        id: 'q-py-col-2',
        question: 'What is the syntax for creating a single-element tuple containing the integer 42?',
        options: ['(42)', '(42,)', 'tuple[42]', '{(42)}'],
        correctOptionIndex: 1,
        explanation: 'A single-item tuple requires a trailing comma: (42,).'
      },
      {
        id: 'q-py-col-3',
        question: 'What does len(set([1, 2, 2, 3, 3, 3, 4])) return in Python?',
        options: ['7', '4', '3', 'TypeError'],
        correctOptionIndex: 1,
        explanation: 'Converting to a set removes duplicates, leaving {1, 2, 3, 4}, which has length 4.'
      },
      {
        id: 'q-py-col-4',
        question: 'How do you safely retrieve a value from a dictionary d for key "age" without risking a KeyError?',
        options: ['d["age"]', 'd.get("age", None)', 'd.find("age")', 'd.read("age")'],
        correctOptionIndex: 1,
        explanation: 'd.get("age", default) returns the value or default/None if the key does not exist.'
      },
      {
        id: 'q-py-col-5',
        question: 'What is the output of [x * 2 for x in range(3)]?',
        options: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]', '[0, 2, 4, 6]'],
        correctOptionIndex: 0,
        explanation: 'range(3) is 0, 1, 2; multiplying each by 2 yields [0, 2, 4].'
      }
    ],
    codingChallenge: {
      id: 'c-py-col',
      title: 'Dictionary Inventory Aggregator',
      slug: 'dict-inventory-aggregator',
      instruction: 'Given inventory = {"chips": 15, "sensors": 8, "diodes": 27}, compute the sum of all item quantities and print "Total Inventory: <sum>".',
      starterCode: 'inventory = {"chips": 15, "sensors": 8, "diodes": 27}\n# Calculate sum and print\n',
      testCases: [
        {
          id: 'tc-col-1',
          input: '',
          expectedOutput: 'Total Inventory: 50'
        }
      ],
      xpReward: 50
    },
    xpReward: 100,
    nextTopicId: 'py-oop-intro'
  }
]
