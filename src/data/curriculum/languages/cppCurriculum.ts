import type { CurriculumCategory, CurriculumTopic } from '../types'

export const CPP_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'cpp-basics',
    title: 'C++ Foundations & Streams',
    description: 'Program structure, namespaces, iostream, references, and modern functions.',
    level: 'beginner',
    icon: '⚙️',
    topicIds: ['cpp-intro', 'cpp-variables', 'cpp-references', 'cpp-functions']
  },
  {
    id: 'cpp-oop',
    title: 'Object-Oriented Programming',
    description: 'Classes, constructors, encapsulation, inheritance, and virtual polymorphism.',
    level: 'intermediate',
    icon: '🏛️',
    topicIds: ['cpp-classes', 'cpp-constructors', 'cpp-inheritance', 'cpp-polymorphism']
  },
  {
    id: 'cpp-advanced',
    title: 'Templates, STL & Modern C++',
    description: 'Generic templates, Standard Template Library (vector, map), and exception handling.',
    level: 'advanced',
    icon: '🚀',
    topicIds: ['cpp-templates', 'cpp-stl-vector', 'cpp-exceptions']
  }
]

export const CPP_TOPICS: CurriculumTopic[] = [
  {
    id: 'cpp-intro',
    language: 'cpp',
    title: 'C++ Program Structure & std::cout',
    slug: 'cpp-intro',
    category: 'C++ Foundations & Streams',
    categoryId: 'cpp-basics',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 8,
    prerequisites: [],
    introduction: 'C++ was created by Bjarne Stroustrup in 1979 at Bell Labs as an extension of C providing object-oriented programming, strong type safety, and zero-cost abstractions.',
    explanation: `C++ uses the standard I/O stream library \`<iostream>\` with stream insertion (\`<<\`) and extraction (\`>>\`) operators.

### Core Elements:
1. **\`#include <iostream>\`**: Provides console stream classes (\`std::cin\`, \`std::cout\`, \`std::cerr\`).
2. **Namespaces (\`namespace std\`):** Groups standard library identifiers to avoid symbol collisions.
3. **Stream Insertion (\`std::cout << ...\`):** Chains typed values directly to standard output.
4. **\`std::endl\` vs \`'\\n'\`:** \`\\n\` appends a newline; \`std::endl\` appends a newline and explicitly flushes the output stream.`,
    syntax: `#include <iostream>

int main() {
    std::cout << "Hello from APEX C++ Engine!" << std::endl;
    return 0;
}`,
    syntaxBreakdown: `• #include <iostream> : Standard input/output stream header
• std::cout : Standard character output stream object
• << : Stream insertion operator directing text into console
• std::endl : Newline manipulator + stream buffer flush`,
    codeExamples: [
      {
        title: 'Chaining Stream Output',
        code: `#include <iostream>

int main() {
    int year = 2026;
    std::cout << "APEX C++ Core: " << year << " Active" << std::endl;
    return 0;
}`,
        explanation: 'Chains string literals and integer variables in a single cout expression.',
        output: 'APEX C++ Core: 2026 Active'
      }
    ],
    practicalExamples: [
      {
        title: 'Diagnostic Header Banner',
        code: `#include <iostream>

int main() {
    std::cout << "===========================" << std::endl;
    std::cout << "   SYSTEM INITIALIZED      " << std::endl;
    std::cout << "===========================" << std::endl;
    return 0;
}`,
        explanation: 'Outputs formatted system telemetry status.',
        output: '===========================\n   SYSTEM INITIALIZED      \n==========================='
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using printf format specifiers inside std::cout (e.g. cout << "%d", x).',
        correction: 'Chain values directly with `<<`: `std::cout << x;`.',
        explanation: '`std::cout` is type-safe and detects types automatically via overloaded `<<` operators.'
      },
      {
        mistake: 'Forgetting `using namespace std;` or `std::` prefix.',
        correction: 'Prefix standard symbols with `std::` or declare `using namespace std;`.',
        explanation: 'C++ standard library classes reside in the `std` namespace.'
      }
    ],
    keyPoints: [
      'C++ is an extension of C with OOP and generic programming capabilities.',
      'iostream provides type-safe stream I/O via std::cout and std::cin.',
      'Insertion operator << chains variables without manual format specifiers.'
    ],
    hint: {
      summary: 'std::cout << "Text" << std::endl; prints type-safe output in C++.',
      keyRules: [
        '#include <iostream> for streams.',
        'Use `<<` to insert data into cout.',
        'Use std::endl or "\\n" for newlines.'
      ],
      cheatsheetMarkdown: `\`\`\`cpp
#include <iostream>
int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-cpp-intro-1',
        title: 'Stream Chaining',
        instruction: 'Print "Core Speed: " followed by int speed = 100 and " MHz".',
        starterCode: `#include <iostream>

int main() {
    int speed = 100;
    // Output "Core Speed: 100 MHz"
    
    return 0;
}`,
        solutionCode: `#include <iostream>

int main() {
    int speed = 100;
    std::cout << "Core Speed: " << speed << " MHz" << std::endl;
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-cpp-intro-1',
        question: 'Which header file is required to use `std::cout` and `std::cin` in C++?',
        options: ['<stdio.h>', '<iostream>', '<conio.h>', '<stream.h>'],
        correctOptionIndex: 1,
        explanation: '<iostream> defines standard stream objects in C++.'
      },
      {
        id: 'q-cpp-intro-2',
        question: 'What is the stream insertion operator in C++?',
        options: ['>>', '<<', '::', '->'],
        correctOptionIndex: 1,
        explanation: '`<<` inserts data into an output stream.'
      },
      {
        id: 'q-cpp-intro-3',
        question: 'What is the primary difference between `std::endl` and `\'\\n\'`?',
        options: [
          'std::endl flushes the output buffer in addition to printing a newline',
          'std::endl only works on Windows',
          '\\n is not supported in C++',
          'They are bitwise identical'
        ],
        correctOptionIndex: 0,
        explanation: 'std::endl writes a newline and calls flush() on the stream.'
      },
      {
        id: 'q-cpp-intro-4',
        question: 'Who created the C++ programming language?',
        options: ['Dennis Ritchie', 'Bjarne Stroustrup', 'James Gosling', 'Ken Thompson'],
        correctOptionIndex: 1,
        explanation: 'Bjarne Stroustrup created C++ at Bell Labs.'
      },
      {
        id: 'q-cpp-intro-5',
        question: 'Why is `std::cout` considered safer than C\'s `printf`?',
        options: [
          'It is type-safe and deduces types at compile time without format string mismatches',
          'It cannot run out of memory',
          'It runs in the GPU',
          'It is encrypted'
        ],
        correctOptionIndex: 0,
        explanation: 'cout uses overloaded operators matching exact types, preventing runtime specifier mismatches.'
      }
    ],
    codingChallenge: {
      id: 'cpp-ch-intro',
      title: 'C++ Stream Output',
      slug: 'cpp-stream-output',
      instruction: 'Print "C++ Engine Status: 100% Ready".',
      starterCode: `#include <iostream>

int main() {
    // Print "C++ Engine Status: 100% Ready"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-cpp-intro-1',
          input: '',
          expectedOutput: 'C++ Engine Status: 100% Ready'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'cpp-variables'
  },
  {
    id: 'cpp-variables',
    language: 'cpp',
    title: 'Data Types, auto & Type Inference',
    slug: 'cpp-variables',
    category: 'C++ Foundations & Streams',
    categoryId: 'cpp-basics',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 10,
    prerequisites: ['cpp-intro'],
    introduction: 'Modern C++ (C++11 and beyond) pairs strongly-typed primitives with powerful automatic type inference using `auto`.',
    explanation: `C++ supports fundamental primitives (\`int\`, \`double\`, \`char\`, \`bool\`, \`std::string\`) alongside modern type deduction.

### Modern C++ Type Deductions:
• \`auto\`: Deduces variable type automatically from initialization expression at compile time:
  \`auto count = 42;       // int\`
  \`auto pi = 3.14159;     // double\`
  \`auto text = "APEX";    // const char*\`
• \`bool\`: Native boolean type (\`true\` / \`false\`).
• \`std::string\`: Dynamic string class in \`<string>\` supporting \`+\` concatenation, \`.length()\`, and value equality \`==\`.`,
    syntax: `#include <iostream>
#include <string>

auto id = 101;
std::string name = "Aria";
bool active = true;

std::cout << name << " [ID: " << id << "]" << std::endl;`,
    syntaxBreakdown: `• auto : Compile-time type inference keyword
• std::string : Standard dynamic string object class
• bool : Native boolean type`,
    codeExamples: [
      {
        title: 'Modern Type Deduction and Strings',
        code: `#include <iostream>
#include <string>

int main() {
    auto score = 98.5;
    std::string rank = "Apex Master";
    std::cout << "Rank: " << rank << " (Score: " << score << ")" << std::endl;
    return 0;
}`,
        explanation: 'Uses auto for double deduction and std::string for text manipulation.',
        output: 'Rank: Apex Master (Score: 98.5)'
      }
    ],
    practicalExamples: [
      {
        title: 'String Concatenation',
        code: `#include <iostream>
#include <string>

int main() {
    std::string first = "Fast ";
    std::string second = "Forward";
    std::string full = first + second;
    std::cout << full << " [Len: " << full.length() << "]" << std::endl;
    return 0;
}`,
        explanation: 'Concatenates strings and inspects length.',
        output: 'Fast Forward [Len: 12]'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Declaring `auto x;` without an initializer expression.',
        correction: 'Always provide an initializer: `auto x = 10;`.',
        explanation: '`auto` requires an initializer so the compiler can deduce the type.'
      }
    ],
    keyPoints: [
      'auto deduces types at compile time with zero runtime overhead.',
      'std::string provides safe dynamic string manipulation.',
      'bool supports true and false natively.'
    ],
    hint: {
      summary: 'auto infers types from initializers; std::string handles dynamic strings with + concatenation.',
      keyRules: [
        'auto requires an immediate initializer.',
        'std::string uses == for content comparison.',
        '#include <string> for std::string.'
      ],
      cheatsheetMarkdown: `\`\`\`cpp
auto x = 5; // int
std::string s = "APEX";
bool ok = true;
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-cpp-var-1',
        title: 'Auto String Formatting',
        instruction: 'Create std::string greeting = "Hello " and auto name = std::string("Cipher"). Print concatenated "Hello Cipher".',
        starterCode: `#include <iostream>
#include <string>

int main() {
    // Concatenate and print "Hello Cipher"
    
    return 0;
}`,
        solutionCode: `#include <iostream>
#include <string>

int main() {
    std::string greeting = "Hello ";
    auto name = std::string("Cipher");
    std::cout << greeting + name << std::endl;
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-cpp-var-1',
        question: 'When does the `auto` keyword deduce variable types in C++?',
        options: ['At runtime dynamically', 'At compile time statically', 'In the preprocessor', 'During linking'],
        correctOptionIndex: 1,
        explanation: 'auto is resolved entirely at compile time with zero runtime performance cost.'
      },
      {
        id: 'q-cpp-var-2',
        question: 'How do you compare the content of two `std::string` objects in C++?',
        options: ['strcmp(s1, s2)', 's1 == s2', 's1.equals(s2)', 's1 === s2'],
        correctOptionIndex: 1,
        explanation: 'std::string overloads the `==` operator to compare character contents directly.'
      },
      {
        id: 'q-cpp-var-3',
        question: 'What is the boolean literal in C++ representing true condition?',
        options: ['TRUE', '1', 'true', 'yes'],
        correctOptionIndex: 2,
        explanation: 'C++ has native boolean keywords `true` and `false`.'
      },
      {
        id: 'q-cpp-var-4',
        question: 'Which method returns the number of characters in a `std::string`?',
        options: ['.length() (or .size())', '.count()', '.len()', '.strlen()'],
        correctOptionIndex: 0,
        explanation: 'std::string provides .length() and .size() returning character count.'
      },
      {
        id: 'q-cpp-var-5',
        question: 'Can you write `auto x;` without assigning an initial value?',
        options: ['Yes, defaults to 0', 'No, causes compilation error', 'Only in global scope', 'Only if static'],
        correctOptionIndex: 1,
        explanation: 'auto requires an initializer expression to infer the type.'
      }
    ],
    codingChallenge: {
      id: 'cpp-ch-vars',
      title: 'String Interpolation Output',
      slug: 'cpp-string-output',
      instruction: 'Create `std::string msg = "Mission Completed"`. Print "Status: Mission Completed".',
      starterCode: `#include <iostream>
#include <string>

int main() {
    std::string msg = "Mission Completed";
    // Output "Status: Mission Completed"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-cpp-var-1',
          input: '',
          expectedOutput: 'Status: Mission Completed'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'cpp-references'
  },
  {
    id: 'cpp-references',
    language: 'cpp',
    title: 'References vs Pointers & Const Correctness',
    slug: 'cpp-references',
    category: 'C++ Foundations & Streams',
    categoryId: 'cpp-basics',
    level: 'beginner',
    order: 3,
    estimatedMinutes: 10,
    prerequisites: ['cpp-variables'],
    introduction: 'A reference in C++ is an alias for an existing variable, providing pointer performance with cleaner, safer syntax.',
    explanation: `References cannot be NULL and must be bound to a variable upon declaration.

### References vs Pointers:
• **Reference (\`int &ref = x\`):** An alternative name for \`x\`. Modifying \`ref\` modifies \`x\` directly without dereferencing \`*\`. Cannot be reseated to another variable.
• **Pass-by-Reference:** Functions take parameters like \`void modify(int &num)\` to mutate arguments directly.
• **Pass-by-Const-Reference (\`const std::string &str\`):** Avoids expensive object copies while preventing mutation.`,
    syntax: `int original = 10;
int &ref = original; // ref is an alias for original

ref = 50; // original is now 50
std::cout << original << std::endl; // 50`,
    syntaxBreakdown: `• type &name = target : Creates reference alias bound to target
• const type &name : Read-only reference avoiding copy overhead`,
    codeExamples: [
      {
        title: 'Pass by Reference Function',
        code: `#include <iostream>

void doubleValue(int &val) {
    val *= 2;
}

int main() {
    int num = 25;
    doubleValue(num);
    std::cout << "Doubled: " << num << std::endl;
    return 0;
}`,
        explanation: 'val is a reference to num, so doubling val doubles num in caller.',
        output: 'Doubled: 50'
      }
    ],
    practicalExamples: [
      {
        title: 'Efficient Const Reference Passing',
        code: `#include <iostream>
#include <string>

void printHeader(const std::string &title) {
    std::cout << "--- " << title << " ---" << std::endl;
}

int main() {
    std::string text = "Telemetry Diagnostic";
    printHeader(text);
    return 0;
}`,
        explanation: 'Passes title by const reference with zero string copying.',
        output: '--- Telemetry Diagnostic ---'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Declaring an uninitialized reference: `int &ref;`.',
        correction: 'Always bind a reference on declaration: `int &ref = myVar;`.',
        explanation: 'References cannot exist without referencing an initial object.'
      }
    ],
    keyPoints: [
      'References cannot be null and cannot be rebound after initialization.',
      'Pass by reference allows in-place mutation without pointer syntax.',
      'Pass by const reference (const T&) is the standard C++ pattern for passing large objects.'
    ],
    hint: {
      summary: 'int &ref = x makes ref an alias for x; use const T& to pass large objects without copying.',
      keyRules: [
        'References must be initialized on declaration.',
        'No dereferencing syntax needed for references.',
        'Use const T& for read-only parameters.'
      ],
      cheatsheetMarkdown: `\`\`\`cpp
void swap(int &a, int &b) {
    int t = a; a = b; b = t;
}
void readOnly(const std::string &s) { /* cannot mutate s */ }
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-cpp-ref-1',
        title: 'Mutate via Reference',
        instruction: 'Create a function `void addTen(int &n)` that adds 10. Call on `int score = 40` and print "Score: 50".',
        starterCode: `#include <iostream>

// Define addTen

int main() {
    int score = 40;
    // Call and print "Score: 50"
    
    return 0;
}`,
        solutionCode: `#include <iostream>

void addTen(int &n) {
    n += 10;
}

int main() {
    int score = 40;
    addTen(score);
    std::cout << "Score: " << score << std::endl;
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-cpp-ref-1',
        question: 'Can a C++ reference be `NULL` under normal valid code?',
        options: ['Yes, always', 'No, references must always bind to a valid existing object', 'Only if static', 'Only in templates'],
        correctOptionIndex: 1,
        explanation: 'References must refer to a valid object upon declaration and cannot be null.'
      },
      {
        id: 'q-cpp-ref-2',
        question: 'Why is `const std::string &str` widely used as a function parameter in C++?',
        options: [
          'It forces dynamic heap allocation',
          'It avoids expensive string copying while guaranteeing the function will not mutate the string',
          'It converts string to integer',
          'It encrypts the string'
        ],
        correctOptionIndex: 1,
        explanation: 'const T& passes by reference (zero copy) with compile-time immutability.'
      },
      {
        id: 'q-cpp-ref-3',
        question: 'Can a reference in C++ be rebound to point to another variable after creation?',
        options: [
          'Yes, using rebind operator',
          'No, assignment to a reference modifies the referenced object, not the binding',
          'Only if marked dynamic',
          'Yes, with pointers'
        ],
        correctOptionIndex: 1,
        explanation: 'A reference remains permanently bound to the object it was initialized with.'
      },
      {
        id: 'q-cpp-ref-4',
        question: 'What is the syntax to declare a reference to variable `int count = 5;`?',
        options: ['int *ref = count;', 'int &ref = count;', 'ref<int> = count;', 'int &&ref = count;'],
        correctOptionIndex: 1,
        explanation: '`int &ref = count;` declares an lvalue reference alias.'
      },
      {
        id: 'q-cpp-ref-5',
        question: 'What happens when you modify a reference `ref = 100;`?',
        options: [
          'The address changes to 100',
          'The original variable referred to is modified to 100',
          'A new variable is allocated',
          'Undefined behavior'
        ],
        correctOptionIndex: 1,
        explanation: 'Operations on a reference directly affect the underlying referenced variable.'
      }
    ],
    codingChallenge: {
      id: 'cpp-ch-references',
      title: 'Reference Incrementor',
      slug: 'cpp-reference-incrementor',
      instruction: 'Create a function `void increment(int &val)` that increments val by 5. Test with int num = 15 and print "Result: 20".',
      starterCode: `#include <iostream>

// Implement increment function

int main() {
    int num = 15;
    // Call and print "Result: 20"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-cpp-ref-1',
          input: '',
          expectedOutput: 'Result: 20'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'cpp-classes'
  },
  {
    id: 'cpp-classes',
    language: 'cpp',
    title: 'Classes, Objects & Encapsulation',
    slug: 'cpp-classes',
    category: 'Object-Oriented Programming',
    categoryId: 'cpp-oop',
    level: 'intermediate',
    order: 4,
    estimatedMinutes: 12,
    prerequisites: ['cpp-references'],
    introduction: 'Classes are user-defined blueprints combining state (member variables) and behavior (member functions) with access protection.',
    explanation: `C++ classes support three access specifiers:
• \`public\`: Members accessible from anywhere.
• \`private\`: Members accessible only within the class (default in \`class\`).
• \`protected\`: Members accessible within the class and derived child classes.

### Constructors & Destructors:
• **Constructor:** Member function with identical name to class called upon instantiation to initialize fields.
• **Destructor (\`~ClassName()\`):** Called automatically when object goes out of scope to release resources (RAII pattern).`,
    syntax: `class Player {
private:
    int health;
public:
    Player(int h) : health(h) {} // Constructor initializer list
    
    int getHealth() const { return health; }
    void takeDamage(int dmg) { health -= dmg; }
};`,
    syntaxBreakdown: `• class ClassName { ... }; : Declares class (ends with semicolon)
• private / public : Access specifiers
• : health(h) : Member initializer list for fast field construction
• const after member function : Guarantees function will not modify member fields`,
    codeExamples: [
      {
        title: 'Class with Methods and Encapsulation',
        code: `#include <iostream>
#include <string>

class Server {
private:
    std::string name;
    int connections;
public:
    Server(std::string n) : name(n), connections(0) {}
    
    void connect() { connections++; }
    void printStatus() const {
        std::cout << name << " Active: " << connections << std::endl;
    }
};

int main() {
    Server s("APEX-US-EAST");
    s.connect();
    s.connect();
    s.printStatus();
    return 0;
}`,
        explanation: 'Encapsulates connections count behind connect() and printStatus() methods.',
        output: 'APEX-US-EAST Active: 2'
      }
    ],
    practicalExamples: [
      {
        title: 'RAII Resource Management',
        code: `#include <iostream>

class Tracker {
public:
    Tracker() { std::cout << "[INIT] System Ready" << std::endl; }
    ~Tracker() { std::cout << "[CLEANUP] System Closed" << std::endl; }
};

int main() {
    {
        Tracker t;
    } // Destructor called automatically here
    return 0;
}`,
        explanation: 'Demonstrates RAII: constructor runs on entry, destructor runs automatically on scope exit.',
        output: '[INIT] System Ready\n[CLEANUP] System Closed'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting the semicolon after class definition `class Foo { ... };`.',
        correction: 'Always terminate class declaration with `};`.',
        explanation: 'Class declarations are statements in C++ syntax.'
      }
    ],
    keyPoints: [
      'Classes default to private access; structs default to public access.',
      'Constructors initialize members; member initializer lists (: field(val)) are preferred.',
      'Destructors (~Name) manage deterministic cleanup.'
    ],
    hint: {
      summary: 'Classes bundle fields and methods; private hides data, public exposes interface.',
      keyRules: [
        'Class declaration ends with `};`.',
        'Use member initializer lists: Class(int x) : field(x) {}',
        'Mark getters as const.'
      ],
      cheatsheetMarkdown: `\`\`\`cpp
class Box {
private:
    int size;
public:
    Box(int s) : size(s) {}
    int getSize() const { return size; }
};
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-cpp-cls-1',
        title: 'Create Counter Class',
        instruction: 'Create class `Counter` with private `int count = 0`, method `void increment()`, and `int getCount() const`. Test with 2 increments and print "Count: 2".',
        starterCode: `#include <iostream>

// Define Counter class

int main() {
    // Instantiate, increment twice, print "Count: 2"
    
    return 0;
}`,
        solutionCode: `#include <iostream>

class Counter {
private:
    int count;
public:
    Counter() : count(0) {}
    void increment() { count++; }
    int getCount() const { return count; }
};

int main() {
    Counter c;
    c.increment();
    c.increment();
    std::cout << "Count: " << c.getCount() << std::endl;
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-cpp-cls-1',
        question: 'What is the default member access specifier in a C++ `class` if none is declared?',
        options: ['public', 'private', 'protected', 'package'],
        correctOptionIndex: 1,
        explanation: 'In C++, class members default to private; struct members default to public.'
      },
      {
        id: 'q-cpp-cls-2',
        question: 'What is the purpose of a destructor (`~ClassName()`) in C++?',
        options: [
          'To create a new instance',
          'To execute cleanup code when an object is destroyed or goes out of scope',
          'To duplicate objects',
          'To reset variables to 0'
        ],
        correctOptionIndex: 1,
        explanation: 'Destructors handle deterministic resource deallocation (RAII).'
      },
      {
        id: 'q-cpp-cls-3',
        question: 'What does marking a member function `const` (e.g. `int getVal() const;`) guarantee?',
        options: [
          'The function runs at compile time',
          'The function will not modify any non-mutable member variables of the instance',
          'The function cannot be called',
          'The return value is a constant integer'
        ],
        correctOptionIndex: 1,
        explanation: 'const member functions promise not to alter the object\'s internal state.'
      },
      {
        id: 'q-cpp-cls-4',
        question: 'What is the syntax for a constructor member initializer list?',
        options: [
          'ClassName(int a) : member(a) {}',
          'ClassName(int a) { this.member = a }',
          'ClassName(int a) -> member(a) {}',
          'ClassName(int a) [member = a] {}'
        ],
        correctOptionIndex: 0,
        explanation: 'Colon followed by `field(value)` initializes member variables directly upon construction.'
      },
      {
        id: 'q-cpp-cls-5',
        question: 'What character must terminate a C++ class declaration?',
        options: ['; (semicolon)', '. (period)', '} (closing brace)', 'None'],
        correctOptionIndex: 0,
        explanation: 'C++ class declarations require a terminating semicolon `};`.'
      }
    ],
    codingChallenge: {
      id: 'cpp-ch-classes',
      title: 'Rectangle Area Method',
      slug: 'cpp-rectangle-method',
      instruction: 'Create `class Rectangle` with private `w, h` and public `int area() const`. Create Rectangle(4, 5) and print "Area: 20".',
      starterCode: `#include <iostream>

// Implement Rectangle class

int main() {
    // Instantiate Rectangle(4, 5) and print "Area: 20"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-cpp-cls-1',
          input: '',
          expectedOutput: 'Area: 20'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'cpp-templates'
  },
  {
    id: 'cpp-templates',
    language: 'cpp',
    title: 'Templates & Generic Programming',
    slug: 'cpp-templates',
    category: 'Templates, STL & Modern C++',
    categoryId: 'cpp-advanced',
    level: 'advanced',
    order: 5,
    estimatedMinutes: 14,
    prerequisites: ['cpp-classes'],
    introduction: 'Templates enable generic programming, allowing functions and classes to operate with generic types without duplicating code.',
    explanation: `C++ generates concrete machine code at compile time for every type instantiated with a template (monomorphization).

### Function Templates:
\`\`\`cpp
template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}
\`\`\`

### Class Templates:
Used to build generic containers (e.g. Pair, Stack, Vector):
\`\`\`cpp
template <typename T>
class Storage {
private:
    T item;
public:
    Storage(T val) : item(val) {}
    T get() const { return item; }
};
\`\`\``,
    syntax: `template <typename T>
T add(T a, T b) {
    return a + b;
}

int i = add<int>(5, 10);
double d = add<double>(2.5, 3.5);`,
    syntaxBreakdown: `• template <typename T> : Declares generic type parameter T
• add<int>(...) : Explicit template instantiation with int type
• Compiler generates separate optimized functions for each type`,
    codeExamples: [
      {
        title: 'Generic Pair Container',
        code: `#include <iostream>
#include <string>

template <typename K, typename V>
class KeyValue {
public:
    K key;
    V value;
    KeyValue(K k, V v) : key(k), value(v) {}
    void print() const {
        std::cout << key << ": " << value << std::endl;
    }
};

int main() {
    KeyValue<std::string, int> userAge("Aria", 25);
    userAge.print();
    return 0;
}`,
        explanation: 'Generic KeyValue class working with string keys and integer values.',
        output: 'Aria: 25'
      }
    ],
    practicalExamples: [
      {
        title: 'Generic Swap Function',
        code: `#include <iostream>

template <typename T>
void customSwap(T &a, T &b) {
    T temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    customSwap(x, y);
    std::cout << "x: " << x << ", y: " << y << std::endl;
    return 0;
}`,
        explanation: 'Swaps any type using template generics.',
        output: 'x: 2, y: 1'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting template function definitions in a .cpp file instead of the header file.',
        correction: 'Place template definitions in header files so the compiler can instantiate them during compilation.',
        explanation: 'Templates must be visible to every translation unit that instantiates them.'
      }
    ],
    keyPoints: [
      'Templates provide zero-overhead type-agnostic code reuse.',
      'template <typename T> declares generic type parameters.',
      'Instantiation happens at compile time with full type safety.'
    ],
    hint: {
      summary: 'template <typename T> creates generic functions and classes.',
      keyRules: [
        'template <typename T> prefix.',
        'Define templates in header files.',
        'Types resolved at compile time with zero overhead.'
      ],
      cheatsheetMarkdown: `\`\`\`cpp
template <typename T>
T minVal(T a, T b) {
    return (a < b) ? a : b;
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-cpp-tmpl-1',
        title: 'Generic Multiply',
        instruction: 'Create template function `T multiply(T a, T b)` that returns a * b. Call multiply(3, 4) and print "Result: 12".',
        starterCode: `#include <iostream>

// Define template multiply

int main() {
    // Call and print "Result: 12"
    
    return 0;
}`,
        solutionCode: `#include <iostream>

template <typename T>
T multiply(T a, T b) {
    return a * b;
}

int main() {
    std::cout << "Result: " << multiply(3, 4) << std::endl;
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-cpp-tmpl-1',
        question: 'What keyword declares a generic type parameter in a C++ template header?',
        options: ['typename (or class)', 'generic', 'type', 'var'],
        correctOptionIndex: 0,
        explanation: '`template <typename T>` or `template <class T>` declares generic types.'
      },
      {
        id: 'q-cpp-tmpl-2',
        question: 'When is code generated for a template function in C++?',
        options: ['At compile time for each type instantiated', 'At runtime by a JIT compiler', 'During interpretation', 'At OS startup'],
        correctOptionIndex: 0,
        explanation: 'C++ templates are instantiated and specialized at compile time.'
      },
      {
        id: 'q-cpp-tmpl-3',
        question: 'Why are template definitions typically placed in header files (.h/.hpp)?',
        options: [
          'Because the compiler needs access to the complete definition to instantiate the template for specific types in any translation unit',
          'To make the file smaller',
          'Because .cpp files cannot contain C++ code',
          'To encrypt the algorithms'
        ],
        correctOptionIndex: 0,
        explanation: 'The compiler must see the full template body to generate code for instantiated types.'
      },
      {
        id: 'q-cpp-tmpl-4',
        question: 'What is the performance cost of C++ templates compared to hand-written type-specific code?',
        options: [
          'Zero runtime overhead (identical native machine code)',
          '50% slower due to type lookups',
          'Requires dynamic memory allocation',
          'Double stack overhead'
        ],
        correctOptionIndex: 0,
        explanation: 'Templates generate specialized native machine code with zero abstraction penalty.'
      },
      {
        id: 'q-cpp-tmpl-5',
        question: 'How do you explicitly call a template function `printVal` with `double` type?',
        options: ['printVal<double>(3.14)', 'printVal(double: 3.14)', 'printVal.double(3.14)', 'printVal->double(3.14)'],
        correctOptionIndex: 0,
        explanation: 'Explicit template instantiation uses angle brackets: `func<Type>(args)`.'
      }
    ],
    codingChallenge: {
      id: 'cpp-ch-templates',
      title: 'Generic Max Function',
      slug: 'cpp-generic-max',
      instruction: 'Create template function `T getMax(T a, T b)`. Call `getMax(42, 17)` and print "Max: 42".',
      starterCode: `#include <iostream>

// Define template getMax

int main() {
    // Print "Max: 42"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-cpp-tmpl-1',
          input: '',
          expectedOutput: 'Max: 42'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'cpp-stl-vector'
  },
  {
    id: 'cpp-stl-vector',
    language: 'cpp',
    title: 'Standard Template Library: std::vector',
    slug: 'cpp-stl-vector',
    category: 'Templates, STL & Modern C++',
    categoryId: 'cpp-advanced',
    level: 'advanced',
    order: 6,
    estimatedMinutes: 14,
    prerequisites: ['cpp-templates'],
    introduction: 'The Standard Template Library (STL) provides robust, high-performance generic data structures and algorithms, with `std::vector` being the premier dynamic array.',
    explanation: `\`std::vector<T>\` manages dynamic contiguous heap memory automatically.

### Key \`std::vector\` Methods:
• \`push_back(val)\`: Appends an element to the end.
• \`size()\`: Returns current number of elements.
• \`operator[]\` & \`.at(index)\`: Element access.
• **Range-based for loop:** \`for (const auto &item : vec)\` iterates effortlessly.`,
    syntax: `#include <iostream>
#include <vector>

std::vector<int> nums = {10, 20, 30};
nums.push_back(40);

for (int n : nums) {
    std::cout << n << " ";
}`,
    syntaxBreakdown: `• std::vector<T> : Dynamic array container
• .push_back(val) : Appends item with automatic capacity reallocation
• for (auto x : vec) : Range-based for loop iteration`,
    codeExamples: [
      {
        title: 'Vector Dynamic Growth and Sum',
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> data;
    data.push_back(100);
    data.push_back(200);
    data.push_back(300);
    
    int sum = 0;
    for (int v : data) sum += v;
    std::cout << "Vector Sum: " << sum << " (Count: " << data.size() << ")" << std::endl;
    return 0;
}`,
        explanation: 'Demonstrates dynamic expansion and range-based summation.',
        output: 'Vector Sum: 600 (Count: 3)'
      }
    ],
    practicalExamples: [
      {
        title: 'Filtered Vector Processing',
        code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores = {45, 92, 78, 88, 60};
    int passedCount = 0;
    for (int s : scores) {
        if (s >= 70) passedCount++;
    }
    std::cout << "Passed count: " << passedCount << std::endl;
    return 0;
}`,
        explanation: 'Filters and counts items in an STL vector.',
        output: 'Passed count: 3'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using [] out of bounds without checking vector size.',
        correction: 'Check `index < vec.size()` or use `vec.at(index)` which throws std::out_of_range exception.',
        explanation: 'Operator [] does not perform bounds checking in release mode for performance reasons.'
      }
    ],
    keyPoints: [
      'std::vector is the default dynamic array in modern C++.',
      'push_back() dynamically doubles capacity when filled.',
      'Iterate cleanly using range-based for loops.'
    ],
    hint: {
      summary: 'std::vector<T> is a resizable dynamic array; use push_back() and range-for.',
      keyRules: [
        '#include <vector>',
        'vec.push_back(item); to append.',
        'for (const auto &item : vec) to iterate.'
      ],
      cheatsheetMarkdown: `\`\`\`cpp
#include <vector>
std::vector<int> v = {1, 2, 3};
v.push_back(4);
int sz = v.size(); // 4
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-cpp-vec-1',
        title: 'Append and Sum Vector',
        instruction: 'Create `std::vector<int> v = {5, 10}`. Push back 15. Sum and print "Total: 30".',
        starterCode: `#include <iostream>
#include <vector>

int main() {
    // Vector operations
    
    return 0;
}`,
        solutionCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {5, 10};
    v.push_back(15);
    int total = 0;
    for (int x : v) total += x;
    std::cout << "Total: " << total << std::endl;
    return 0;
}`
      }
    ],
    quizzes: [
      {
        id: 'q-cpp-vec-1',
        question: 'Which method adds a new element to the end of a `std::vector` in C++?',
        options: ['.append()', '.push_back()', '.add()', '.insert_last()'],
        correctOptionIndex: 1,
        explanation: '.push_back() appends an element to the end of an STL vector.'
      },
      {
        id: 'q-cpp-vec-2',
        question: 'How is elements memory laid out inside a `std::vector`?',
        options: ['Contiguously on the heap', 'In fragmented linked list nodes', 'In a binary tree', 'On the stack only'],
        correctOptionIndex: 0,
        explanation: 'std::vector guarantees contiguous heap storage, ensuring cache locality.'
      },
      {
        id: 'q-cpp-vec-3',
        question: 'What is the modern C++ syntax to iterate over all items in a vector `v` without copying elements?',
        options: [
          'for (const auto &item : v)',
          'for (item in v)',
          'foreach (item of v)',
          'v.loop(item)'
        ],
        correctOptionIndex: 0,
        explanation: '`for (const auto &item : v)` iterates by const reference with zero copying.'
      },
      {
        id: 'q-cpp-vec-4',
        question: 'What exception is thrown by `vec.at(100)` when accessing an invalid index?',
        options: ['std::out_of_range', 'std::bad_alloc', 'NullPointerException', 'IndexError'],
        correctOptionIndex: 0,
        explanation: '.at() performs bounds checking and throws std::out_of_range if index >= size().'
      },
      {
        id: 'q-cpp-vec-5',
        question: 'Which header file provides `std::vector`?',
        options: ['<vector>', '<array>', '<list>', '<stl.h>'],
        correctOptionIndex: 0,
        explanation: '<vector> defines the std::vector class template.'
      }
    ],
    codingChallenge: {
      id: 'cpp-ch-stl-vector',
      title: 'Vector Count Multiplier',
      slug: 'cpp-vector-multiplier',
      instruction: 'Create a vector with `{2, 4, 6}`. Multiply each element by 2 and print "Sum: 24".',
      starterCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {2, 4, 6};
    // Multiply each by 2 and print "Sum: 24"
    
    return 0;
}`,
      testCases: [
        {
          id: 'tc-cpp-vec-1',
          input: '',
          expectedOutput: 'Sum: 24'
        }
      ],
      xpReward: 50
    },
    xpReward: 50
  }
]
