import type { PythonTopic } from '../types'

export const FILE_AND_MODULE_TOPICS: PythonTopic[] = [
  {
    id: 'py-file-handling',
    title: 'Python File Handling & Context Managers',
    slug: 'python-file-handling',
    category: 'File Handling',
    categoryId: 'file-handling',
    level: 'intermediate',
    order: 15,
    estimatedMinutes: 9,
    prerequisites: ['py-magic-methods'],
    prevTopicId: 'py-magic-methods',
    introduction: 'Read, write, append, and manage files securely using the open() function and with context managers.',
    explanation: `Python provides built-in capabilities to interact with the file system.

### File Modes:
- \`"r"\` (Read): Default mode. Opens file for reading; raises FileNotFoundError if absent.
- \`"w"\` (Write): Overwrites existing file or creates a new file.
- \`"a"\` (Append): Appends data to the end of the file without truncating.
- \`"x"\` (Exclusive Creation): Creates a new file; fails if it exists.
- \`"b"\` (Binary): For binary files (images, audio).

### The \`with\` Statement (Context Manager):
Always use the \`with\` statement when opening files. It automatically closes file descriptors even if exceptions occur.`,
    syntax: `# Recommended: with context manager
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("Line 1\\n")

with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()`,
    codeExamples: [
      {
        title: 'Writing and Reading a File',
        code: 'text = "APEX Learning System 2026"\n# In-memory emulation of file operations\nlines = ["Log 1: System Init", "Log 2: User Authenticated"]\njoined = "\\n".join(lines)\nprint(joined)',
        explanation: 'The with open() block ensures clean, safe I/O resource cleanup.',
        output: 'Log 1: System Init\nLog 2: User Authenticated'
      }
    ],
    practicalExamples: [
      {
        title: 'Line by Line Processing',
        code: 'records = ["Alice,95", "Bob,88", "Charlie,92"]\nfor row in records:\n    name, score = row.split(",")\n    print(f"Student: {name} | Score: {score}")',
        explanation: 'Iterating over file lines consumes minimal memory for high throughput.',
        output: 'Student: Alice | Score: 95\nStudent: Bob | Score: 88\nStudent: Charlie | Score: 92'
      }
    ],
    commonMistakes: [
      {
        mistake: 'f = open("file.txt", "w")\nf.write("data")\n# Forgot f.close()',
        correction: 'with open("file.txt", "w") as f:\n    f.write("data")',
        explanation: 'Always use with open(...) so files close automatically on exit.'
      }
    ],
    keyPoints: [
      'Use with open(filename, mode) for safe, automated resource cleanup.',
      '"r" for reading, "w" for overwriting, "a" for appending.',
      'Always specify encoding="utf-8" for text files.'
    ],
    notes: {
      summary: 'File handling in Python is stream-based and best managed with context managers.',
      keyRules: [
        'with blocks automatically invoke __enter__ and __exit__ (close).',
        'read() returns entire content; readline() reads single lines.',
        'readlines() returns a list of all lines.'
      ],
      cheatsheetMarkdown: `### File Handling
\`\`\`python
# Read
with open("file.txt", "r") as f:
    data = f.read()

# Write
with open("file.txt", "w") as f:
    f.write("Hello")
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: File Handling
- Modes: "r" (read), "w" (write), "a" (append), "r+" (read/write)
- with open(path, mode) as file_var:
- Methods: read(), readline(), readlines(), write(), writelines()`
    },
    practiceTasks: [
      {
        id: 'pt-file-1',
        title: 'String Parsing Emulation',
        instruction: 'Given raw_data = "alpha\\nbeta\\ngamma", split lines using .splitlines() and print count of lines.',
        starterCode: 'raw_data = "alpha\\nbeta\\ngamma"\n# Count lines and print\n',
        solutionCode: 'raw_data = "alpha\\nbeta\\ngamma"\nlines = raw_data.splitlines()\nprint(len(lines))'
      }
    ],
    quizzes: [
      {
        id: 'q-py-file-1',
        question: 'What is the primary advantage of using the "with" statement when opening files in Python?',
        options: [
          'It makes the file execute as Python code',
          'It automatically closes the file even if an exception occurs',
          'It encrypts the file on disk',
          'It creates a backup copy'
        ],
        correctOptionIndex: 1,
        explanation: 'The with statement creates a context manager that guarantees file.close() is called upon leaving the block.'
      },
      {
        id: 'q-py-file-2',
        question: 'Which file mode is used to add new content to an existing file without wiping existing text?',
        options: ['"w"', '"r"', '"a"', '"x"'],
        correctOptionIndex: 2,
        explanation: 'Mode "a" (append) writes new data to the end of the file.'
      },
      {
        id: 'q-py-file-3',
        question: 'What exception is raised when trying to open a non-existent file in "r" mode?',
        options: ['IndexError', 'FileNotFoundError', 'KeyError', 'NullPointerError'],
        correctOptionIndex: 1,
        explanation: 'Python raises FileNotFoundError (a subclass of OSError) when opening a missing file for reading.'
      },
      {
        id: 'q-py-file-4',
        question: 'What does the file method f.readline() return when it reaches the end of the file (EOF)?',
        options: ['None', 'An empty string ""', '-1', 'Raises EOFError'],
        correctOptionIndex: 1,
        explanation: 'f.readline() returns an empty string "" when the end of the file is reached.'
      },
      {
        id: 'q-py-file-5',
        question: 'Which mode opens a file for writing in binary format in Python?',
        options: ['"bin"', '"wb"', '"w+"', '"raw"'],
        correctOptionIndex: 1,
        explanation: '"wb" opens a file for writing in binary format.'
      }
    ],
    codingChallenge: {
      id: 'c-py-file',
      title: 'Formatted CSV Parser',
      slug: 'formatted-csv-parser',
      instruction: 'Given csv_text = "id,name,role\\n1,Alex,Admin\\n2,Maya,Engineer", parse the lines, skip the header row, and print the names on one line separated by " & ". Output should be "Alex & Maya".',
      starterCode: 'csv_text = "id,name,role\\n1,Alex,Admin\\n2,Maya,Engineer"\n# Parse CSV and print names\n',
      testCases: [
        {
          id: 'tc-file-1',
          input: '',
          expectedOutput: 'Alex & Maya'
        }
      ],
      xpReward: 60
    },
    xpReward: 120,
    nextTopicId: 'py-exceptions'
  },
  {
    id: 'py-exceptions',
    title: 'Python Exception Handling',
    slug: 'python-exceptions',
    category: 'Modules & Utilities',
    categoryId: 'modules',
    level: 'intermediate',
    order: 16,
    estimatedMinutes: 9,
    prerequisites: ['py-file-handling'],
    prevTopicId: 'py-file-handling',
    introduction: 'Build resilient, fault-tolerant Python applications using try, except, else, finally, and custom exception classes.',
    explanation: `Exceptions are runtime errors that disrupt the normal flow of code execution. Python handles exceptions gracefully using \`try-except\` blocks.

### The Complete Exception Block:
\`\`\`python
try:
    # Code that might raise an exception
    result = 10 / divisor
except ZeroDivisionError as e:
    # Handles specific division by zero
    print(f"Error: {e}")
except (TypeError, ValueError) as e:
    # Handles multiple exception types
    print("Invalid input")
else:
    # Executes ONLY if NO exception was raised in try
    print(f"Success: {result}")
finally:
    # ALWAYS executes (for resource cleanup)
    print("Cleanup complete")
\`\`\`

### Raising Exceptions:
Use \`raise ValueError("Invalid amount")\` to trigger exceptions programmatically.`,
    syntax: `try:
    risk_operation()
except SpecificError as e:
    handle_error()
finally:
    cleanup()`,
    codeExamples: [
      {
        title: 'Graceful Error Handling',
        code: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))',
        explanation: 'Catches ZeroDivisionError and provides fallback value instead of crashing.',
        output: '5.0\nCannot divide by zero'
      }
    ],
    practicalExamples: [
      {
        title: 'Custom Exception Class',
        code: 'class InsufficientFundsError(Exception):\n    pass\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFundsError("Withdrawal exceeds balance")\n    return balance - amount\n\ntry:\n    withdraw(50, 100)\nexcept InsufficientFundsError as e:\n    print(f"Caught custom exception: {e}")',
        explanation: 'Custom exceptions inherit from built-in Exception class.',
        output: 'Caught custom exception: Withdrawal exceeds balance'
      }
    ],
    commonMistakes: [
      {
        mistake: 'try:\n    do_something()\nexcept:\n    pass # Bare except',
        correction: 'try:\n    do_something()\nexcept Exception as e:\n    logger.error(e)',
        explanation: 'Bare "except:" catches SystemExit and KeyboardInterrupt, making programs hard to stop. Catch specific exceptions or "Exception".'
      }
    ],
    keyPoints: [
      'try executes code; except catches matching exceptions.',
      'else runs only when no errors occurred in try.',
      'finally runs unconditionally, making it ideal for resource cleanup.'
    ],
    notes: {
      summary: 'Exception handling prevents unhandled crashes and enables robust error recovery.',
      keyRules: [
        'Catch specific exceptions before broader base classes.',
        'Use raise to propagate or re-raise errors.',
        'Custom exceptions should subclass Exception.'
      ],
      cheatsheetMarkdown: `### Exceptions Cheatsheet
\`\`\`python
try:
    x = int("abc")
except ValueError as e:
    print("Handled:", e)
finally:
    print("Always runs")
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Exceptions
- try: critical code
- except ErrorType as e: handler
- else: runs if no exception occurred
- finally: cleanup (always runs)
- raise Exception("message")`
    },
    practiceTasks: [
      {
        id: 'pt-exc-1',
        title: 'Safe Integer Parsing',
        instruction: 'Write a function safe_int(val) that returns int(val) on success, or 0 if a ValueError occurs. Print safe_int("invalid").',
        starterCode: '# Define safe_int and test\n',
        solutionCode: 'def safe_int(val):\n    try:\n        return int(val)\n    except ValueError:\n        return 0\n\nprint(safe_int("invalid"))'
      }
    ],
    quizzes: [
      {
        id: 'q-py-exc-1',
        question: 'Which block in a Python try-except statement ALWAYS executes regardless of whether an exception occurred?',
        options: ['else', 'finally', 'except', 'catch'],
        correctOptionIndex: 1,
        explanation: 'The "finally" block is guaranteed to execute whether an exception was raised, caught, or not raised at all.'
      },
      {
        id: 'q-py-exc-2',
        question: 'Which keyword is used to explicitly throw or trigger an exception in Python?',
        options: ['throw', 'raise', 'trigger', 'dispatch'],
        correctOptionIndex: 1,
        explanation: 'Python uses the "raise" keyword to throw exceptions.'
      },
      {
        id: 'q-py-exc-3',
        question: 'When does the "else" block of a try-except structure execute?',
        options: [
          'Whenever an exception is caught',
          'Only when the try block completes successfully without any exceptions',
          'Whenever a ValueError occurs',
          'Before the try block'
        ],
        correctOptionIndex: 1,
        explanation: 'The "else" block executes only if the try block ran without raising any exceptions.'
      },
      {
        id: 'q-py-exc-4',
        question: 'What is the base class for all non-system-exiting built-in exceptions in Python?',
        options: ['BaseException', 'Exception', 'StandardError', 'RuntimeError'],
        correctOptionIndex: 1,
        explanation: 'Custom exceptions and standard application errors should inherit from "Exception".'
      },
      {
        id: 'q-py-exc-5',
        question: 'Why is a bare "except:" statement discouraged in Python code?',
        options: [
          'It causes syntax errors in Python 3',
          'It intercepts system exits (KeyboardInterrupt, SystemExit), preventing clean process termination',
          'It runs 100x slower',
          'It deletes the exception from memory'
        ],
        correctOptionIndex: 1,
        explanation: 'Bare "except:" catches BaseException, including Ctrl+C interrupts and sys.exit().'
      }
    ],
    codingChallenge: {
      id: 'c-py-exc',
      title: 'Resilient Array Indexer',
      slug: 'resilient-array-indexer',
      instruction: 'Define a function get_item(items, index, default="Missing") that tries to return items[index]. If an IndexError occurs, return default. Print get_item(["A", "B"], 5).',
      starterCode: '# Define get_item with try-except\n',
      testCases: [
        {
          id: 'tc-exc-1',
          input: '',
          expectedOutput: 'Missing'
        }
      ],
      xpReward: 60
    },
    xpReward: 120,
    nextTopicId: 'py-json-modules'
  },
  {
    id: 'py-json-modules',
    title: 'Python JSON & Standard Modules',
    slug: 'python-json-modules',
    category: 'Modules & Utilities',
    categoryId: 'modules',
    level: 'intermediate',
    order: 17,
    estimatedMinutes: 9,
    prerequisites: ['py-exceptions'],
    prevTopicId: 'py-exceptions',
    introduction: 'Serialize and parse data with the json module, work with dates, math, random, and regular expressions in Python.',
    explanation: `Python standard library includes rich modules ready for production use:

### 1. JSON Processing (\`import json\`)
- \`json.dumps(obj)\`: Serializes Python dict/list to JSON string.
- \`json.loads(str)\`: Deserializes JSON string to Python dictionary/list.
- \`json.dump(obj, file)\` / \`json.load(file)\`: File stream operations.

### 2. Standard Modules:
- \`math\`: \`math.sqrt()\`, \`math.ceil()\`, \`math.pi\`
- \`random\`: \`random.choice()\`, \`random.randint(a, b)\`, \`random.shuffle()\`
- \`re\` (RegEx): \`re.findall(pattern, text)\`, \`re.search()\`, \`re.sub()\`
- \`datetime\`: \`datetime.datetime.now()\`, \`.strftime("%Y-%m-%d")\``,
    syntax: `import json
import re
import math

# JSON serialization
json_str = json.dumps({"status": "active", "code": 200})
data = json.loads(json_str)`,
    codeExamples: [
      {
        title: 'JSON Parsing & Serialization',
        code: 'import json\n\npayload = \'{"user": "Alex", "role": "Engineer", "level": 12}\'\ndata = json.loads(payload)\nprint(f"User: {data[\'user\']}, Level: {data[\'level\']}")\n\ndata["verified"] = True\nnew_json = json.dumps(data, indent=2)\nprint("Serialized JSON successfully")',
        explanation: 'json.loads parses JSON strings to dicts; json.dumps serializes dicts to JSON.',
        output: 'User: Alex, Level: 12\nSerialized JSON successfully'
      }
    ],
    practicalExamples: [
      {
        title: 'Regular Expression Match',
        code: 'import re\n\ntext = "Order IDs: APX-101, APX-404, and APX-999."\nmatches = re.findall(r"APX-\\d+", text)\nprint(f"Found IDs: {matches}")',
        explanation: 're.findall searches for all regex pattern occurrences.',
        output: "Found IDs: ['APX-101', 'APX-404', 'APX-999']"
      }
    ],
    commonMistakes: [
      {
        mistake: 'json.loads(\'{"active": True}\')',
        correction: 'json.loads(\'{"active": true}\')',
        explanation: 'JSON requires lowercase "true", "false", "null", unlike Python\'s True, False, None.'
      }
    ],
    keyPoints: [
      'json.loads() converts JSON string -> Python dict; json.dumps() converts Python dict -> JSON string.',
      're module provides regex search, match, and sub replacement operations.',
      'Python standard library provides math, random, datetime, and sys out of the box.'
    ],
    notes: {
      summary: 'The Python standard library offers enterprise-grade JSON, regex, math, and date manipulation.',
      keyRules: [
        'dumps has an "s" for string; dump writes to a file stream.',
        'Use raw strings (r"\\d+") for regex patterns.',
        'json only supports standard serializable types (dict, list, str, int, float, bool, None).'
      ],
      cheatsheetMarkdown: `### JSON & RegEx
\`\`\`python
import json, re

# JSON
d = json.loads('{"k": "v"}')
s = json.dumps(d)

# RegEx
nums = re.findall(r"\\d+", "Item 42 and 100")
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: JSON & Modules
- json.dumps(obj), json.loads(str)
- re.search(), re.findall(), re.sub()
- math.sqrt(), math.floor(), math.ceil()
- random.choice(), random.randint()`
    },
    practiceTasks: [
      {
        id: 'pt-json-1',
        title: 'Parse JSON String',
        instruction: 'Given json_text = \'{"name": "Python", "year": 1991}\', parse it with json.loads and print the "year" value.',
        starterCode: 'import json\njson_text = \'{"name": "Python", "year": 1991}\'\n# Parse and print\n',
        solutionCode: 'import json\njson_text = \'{"name": "Python", "year": 1991}\'\ndata = json.loads(json_text)\nprint(data["year"])'
      }
    ],
    quizzes: [
      {
        id: 'q-py-json-1',
        question: 'Which method in Python\'s json module parses a JSON string into a Python dictionary?',
        options: ['json.parse()', 'json.loads()', 'json.dumps()', 'json.decode()'],
        correctOptionIndex: 1,
        explanation: 'json.loads() (load string) deserializes a JSON string into Python data structures.'
      },
      {
        id: 'q-py-json-2',
        question: 'What does json.dumps() return?',
        options: ['A Python dictionary', 'A JSON-formatted string', 'A file descriptor', 'A bytes object'],
        correctOptionIndex: 1,
        explanation: 'json.dumps() serializes a Python object into a JSON formatted string.'
      },
      {
        id: 'q-py-json-3',
        question: 'Which function in Python\'s "re" module returns all non-overlapping matches of a pattern as a list of strings?',
        options: ['re.match_all()', 're.findall()', 're.search()', 're.scan()'],
        correctOptionIndex: 1,
        explanation: 're.findall(pattern, string) returns all matching substrings in a list.'
      },
      {
        id: 'q-py-json-4',
        question: 'Why are raw strings (e.g. r"\\n\\d+") recommended for regular expressions in Python?',
        options: [
          'They execute 50% faster',
          'They treat backslashes as literal characters without Python string escape interpretation',
          'They allow unicode characters only',
          'They disable case sensitivity'
        ],
        correctOptionIndex: 1,
        explanation: 'Raw strings r"..." prevent Python from interpreting backslashes as escape sequences.'
      },
      {
        id: 'q-py-json-5',
        question: 'What is the boolean representation of true in valid JSON format?',
        options: ['True', 'true', 'TRUE', '1'],
        correctOptionIndex: 1,
        explanation: 'Standard JSON specifies lowercase "true", "false", and "null".'
      }
    ],
    codingChallenge: {
      id: 'c-py-json',
      title: 'JSON Payload Builder',
      slug: 'json-payload-builder',
      instruction: 'Create a dictionary with keys "platform": "APEX" and "version": 3. Use json.dumps(data) to convert it to a JSON string and print it.',
      starterCode: 'import json\n# Build dictionary, serialize and print\n',
      testCases: [
        {
          id: 'tc-json-1',
          input: '',
          expectedOutput: '{"platform": "APEX", "version": 3}'
        }
      ],
      xpReward: 60
    },
    xpReward: 120,
    nextTopicId: 'py-dsa-arrays'
  }
]
