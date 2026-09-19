import type { CurriculumCategory, CurriculumTopic } from '../types'

export const JAVA_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'java-basics',
    title: 'Java Fundamentals & JVM',
    description: 'Java architecture, JVM, main() method, primitive types, and control flow.',
    level: 'beginner',
    icon: '☕',
    topicIds: ['java-intro', 'java-types', 'java-control']
  },
  {
    id: 'java-oop',
    title: 'Object-Oriented Programming',
    description: 'Classes, constructors, inheritance, abstract classes, interfaces, and polymorphism.',
    level: 'intermediate',
    icon: '🏛️',
    topicIds: ['java-methods', 'java-oop-classes', 'java-inheritance']
  },
  {
    id: 'java-collections-adv',
    title: 'Collections Framework & Exceptions',
    description: 'ArrayList, HashMap, Generics, and robust try-catch-finally exception handling.',
    level: 'advanced',
    icon: '🚀',
    topicIds: ['java-collections', 'java-exceptions']
  }
]

export const JAVA_TOPICS: CurriculumTopic[] = [
  {
    id: 'java-intro',
    language: 'java',
    title: 'Java Architecture, JVM & System.out.println()',
    slug: 'java-intro',
    category: 'Java Fundamentals & JVM',
    categoryId: 'java-basics',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 8,
    prerequisites: [],
    introduction: 'Java is an enterprise-grade, class-based, object-oriented programming language designed for platform independence ("Write Once, Run Anywhere").',
    explanation: `Java source code (\`.java\`) compiles into bytecode (\`.class\`) executed by the Java Virtual Machine (JVM).

### Program Structure:
1. **Class Container:** Every piece of Java code must live inside a \`class\` whose name matches the \`.java\` source filename.
2. **Main Entry Point:** The runtime launches execution via \`public static void main(String[] args)\`.
3. **Console Output:** \`System.out.println()\` writes formatted text followed by a newline to standard output.`,
    syntax: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from APEX Java Engine!");
    }
}`,
    syntaxBreakdown: `• public class Main : Class declaration matching filename Main.java
• public static void main(...) : Execution entry signature
• String[] args : Command-line arguments array
• System.out.println(...) : Standard output stream printer`,
    codeExamples: [
      {
        title: 'Basic Java Hello World',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java on APEX!");
    }
}`,
        explanation: 'Compiles to bytecode and executes on the JVM.',
        output: 'Welcome to Java on APEX!'
      }
    ],
    practicalExamples: [
      {
        title: 'System Startup Banner',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("================================");
        System.out.println("   APEX ENTERPRISE JAVA CORE    ");
        System.out.println("   Status: ONLINE               ");
        System.out.println("================================");
    }
}`,
        explanation: 'Multi-line formatted telemetry output in Java.',
        output: '================================\n   APEX ENTERPRISE JAVA CORE    \n   Status: ONLINE               \n================================'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Declaring a public class with a name that differs from the file name.',
        correction: 'Ensure `public class Foo` is saved in `Foo.java`.',
        explanation: 'The Java compiler enforces file-class name matching for public classes.'
      }
    ],
    keyPoints: [
      'Java compiles to platform-independent bytecode executed by the JVM.',
      'public static void main(String[] args) is the mandatory entry point.',
      'System.out.println() prints to standard output.'
    ],
    hint: {
      summary: 'Every Java file has a class; execution begins at public static void main(String[] args).',
      keyRules: [
        'Filename must match public class name.',
        'System.out.println("Text"); for console output.',
        'Semicolons are mandatory at the end of statements.'
      ],
      cheatsheetMarkdown: `\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-java-intro-1',
        title: 'Print APEX Identity',
        instruction: 'Complete the main method to print "APEX Java Core".',
        starterCode: `public class Main {
    public static void main(String[] args) {
        // Print "APEX Java Core"
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("APEX Java Core");
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-java-intro-1',
        question: 'What is the signature of the entry point method in any executable Java application?',
        options: [
          'public static void main(String[] args)',
          'public void main()',
          'static int main(String[] args)',
          'void start(String[] args)'
        ],
        correctOptionIndex: 0,
        explanation: 'Java runtime strictly searches for `public static void main(String[] args)`.'
      },
      {
        id: 'q-java-intro-2',
        question: 'What executes compiled Java bytecode (.class files)?',
        options: ['Java Virtual Machine (JVM)', 'C Preprocessor', 'Web Browser', 'Operating System Kernel directly'],
        correctOptionIndex: 0,
        explanation: 'The JVM interprets and JIT-compiles Java bytecode into native machine instructions.'
      },
      {
        id: 'q-java-intro-3',
        question: 'What is the motto representing Java\'s platform independence architecture?',
        options: ['"Code Fast, Ship Hard"', '"Write Once, Run Anywhere"', '"Compile for Everything"', '"Native Speed Everywhere"'],
        correctOptionIndex: 1,
        explanation: 'WORA ("Write Once, Run Anywhere") describes Java\'s bytecode portability across JVMs.'
      },
      {
        id: 'q-java-intro-4',
        question: 'Which method prints a string to the console followed by a newline in Java?',
        options: ['print()', 'System.out.println()', 'console.log()', 'echo()'],
        correctOptionIndex: 1,
        explanation: 'System.out.println() outputs to the standard output stream.'
      },
      {
        id: 'q-java-intro-5',
        question: 'What must be true about the relationship between a `public class DataStore` and its source file name in Java?',
        options: [
          'The file name must be exactly `DataStore.java`',
          'The file name can be anything',
          'The file name must be lowercase `datastore.c`',
          'The class cannot be public'
        ],
        correctOptionIndex: 0,
        explanation: 'Public classes must reside in a file sharing the identical class name plus .java.'
      }
    ],
    codingChallenge: {
      id: 'java-ch-intro',
      title: 'Java Output Transmitter',
      slug: 'java-output-transmitter',
      instruction: 'Print "Java Enterprise Online".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-java-intro-1',
          input: '',
          expectedOutput: 'Java Enterprise Online'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'java-types'
  },
  {
    id: 'java-types',
    language: 'java',
    title: 'Primitive Data Types, String & Operators',
    slug: 'java-types',
    category: 'Java Fundamentals & JVM',
    categoryId: 'java-basics',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 10,
    prerequisites: ['java-intro'],
    introduction: 'Java is statically typed with 8 primitive types and rich reference types including `String`.',
    explanation: `### The 8 Primitive Types in Java:
• Integral: \`byte\` (8-bit), \`short\` (16-bit), \`int\` (32-bit), \`long\` (64-bit with \`L\` suffix).
• Floating-point: \`float\` (32-bit with \`f\` suffix), \`double\` (64-bit standard).
• Text & Logic: \`char\` (16-bit Unicode), \`boolean\` (\`true\` / \`false\`).

### The \`String\` Class & Equality:
• Strings are immutable reference objects.
• Always use \`.equals()\` to compare string content: \`str1.equals(str2)\`.
• Using \`==\` compares object reference addresses, not content!`,
    syntax: `int level = 10;
double score = 98.75;
boolean active = true;
String user = "Aria";

if (user.equals("Aria")) {
    System.out.println(user + " Level: " + level);
}`,
    syntaxBreakdown: `• int / double / boolean : Primitive data type keywords
• String : Reference class representing immutable character sequence
• .equals() : Value equality comparison method`,
    codeExamples: [
      {
        title: 'Variables and String Concatenation',
        code: `public class Main {
    public static void main(String[] args) {
        int id = 404;
        String status = "Active";
        double latency = 12.4;
        System.out.println("Node #" + id + " [" + status + "] " + latency + "ms");
    }
}`,
        explanation: 'Demonstrates primitive types and string concatenation with + operator.',
        output: 'Node #404 [Active] 12.4ms'
      }
    ],
    practicalExamples: [
      {
        title: 'String Content Comparison',
        code: `public class Main {
    public static void main(String[] args) {
        String s1 = new String("APEX");
        String s2 = new String("APEX");
        
        System.out.println("Reference check (==): " + (s1 == s2));
        System.out.println("Content check (.equals): " + s1.equals(s2));
    }
}`,
        explanation: 'Illustrates the critical difference between == and .equals().',
        output: 'Reference check (==): false\nContent check (.equals): true'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `==` to compare two Strings: if (name == "Admin").',
        correction: 'Always use `if (name.equals("Admin"))`.',
        explanation: '`==` tests if both references point to the exact same memory address.'
      }
    ],
    keyPoints: [
      'Java has 8 primitive data types stored directly on the stack.',
      'String is an immutable reference type.',
      'Always compare string contents using .equals().'
    ],
    hint: {
      summary: 'Primitives include int, double, boolean, char; always compare Strings with .equals().',
      keyRules: [
        'Use .equals() for String comparison, not `==`.',
        'long requires `L` suffix (e.g. 5000L).',
        'float requires `f` suffix (e.g. 3.14f).'
      ],
      cheatsheetMarkdown: `\`\`\`java
int a = 5;
double d = 3.14;
String s = "Hello";
if (s.equals("Hello")) { /* equal */ }
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-java-type-1',
        title: 'String Comparison',
        instruction: 'Compare String role = "ADMIN" with "ADMIN" using .equals() and print "Role: Authorized".',
        starterCode: `public class Main {
    public static void main(String[] args) {
        String role = "ADMIN";
        // Check with .equals() and print "Role: Authorized"
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        String role = "ADMIN";
        if (role.equals("ADMIN")) {
            System.out.println("Role: Authorized");
        }
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-java-type-1',
        question: 'What is the key difference between `==` and `.equals()` when comparing two String objects in Java?',
        options: [
          '`==` compares memory references, while `.equals()` compares character sequence content',
          '`==` compares content, `.equals()` compares references',
          'They are bitwise identical',
          '`==` converts strings to uppercase'
        ],
        correctOptionIndex: 0,
        explanation: '== tests object identity; .equals() tests value equality.'
      },
      {
        id: 'q-java-type-2',
        question: 'How many primitive data types exist in standard Java?',
        options: ['4', '8 (byte, short, int, long, float, double, char, boolean)', '10', 'Unlimited'],
        correctOptionIndex: 1,
        explanation: 'Java defines exactly 8 primitive data types.'
      },
      {
        id: 'q-java-type-3',
        question: 'What is the default size of an `int` in Java across all platforms?',
        options: ['16 bits', '32 bits (4 bytes)', '64 bits', 'Platform dependent'],
        correctOptionIndex: 1,
        explanation: 'Java primitives have fixed sizes across all architectures (32 bits for int).'
      },
      {
        id: 'q-java-type-4',
        question: 'Are `String` objects in Java mutable or immutable?',
        options: [
          'Immutable (cannot be changed after creation; modifications create new objects)',
          'Mutable (can be modified in-place)',
          'Mutable only if marked public',
          'Immutable only in arrays'
        ],
        correctOptionIndex: 0,
        explanation: 'Java Strings are immutable for security, thread safety, and string pooling.'
      },
      {
        id: 'q-java-type-5',
        question: 'Which suffix is required when initializing a float literal like `3.14`?',
        options: ['d', 'f (e.g. 3.14f)', 'l', 'm'],
        correctOptionIndex: 1,
        explanation: 'Floating-point literals default to double; suffix `f` marks a single-precision float.'
      }
    ],
    codingChallenge: {
      id: 'java-ch-types',
      title: 'String Length Calculation',
      slug: 'java-string-length',
      instruction: 'Output "Length: 4" representing the length of string "APEX".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-java-type-1',
          input: '',
          expectedOutput: 'Length: 4'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'java-control'
  },
  {
    id: 'java-control',
    language: 'java',
    title: 'Control Flow: if-else, switch & Loops',
    slug: 'java-control',
    category: 'Java Fundamentals & JVM',
    categoryId: 'java-basics',
    level: 'beginner',
    order: 3,
    estimatedMinutes: 10,
    prerequisites: ['java-types'],
    introduction: 'Control flow structures direct program execution based on boolean conditions and repetitive loops.',
    explanation: `### Branching:
• \`if (booleanExpression) { ... } else { ... }\`
• \`switch (var)\`: Supports \`int\`, \`char\`, \`enum\`, and \`String\` (since Java 7). Requires \`break;\` to prevent fall-through.

### Loops:
• \`for (int i = 0; i < N; i++)\`: Counted loop.
• Enhanced for loop (for-each): \`for (String s : list)\`.
• \`while (condition)\` & \`do-while (condition);\`.`,
    syntax: `for (int i = 1; i <= 3; i++) {
    System.out.println("Iteration #" + i);
}`,
    syntaxBreakdown: `• for (init; cond; step) : Standard counted loop
• enhanced for (Type item : collection) : For-each iteration`,
    codeExamples: [
      {
        title: 'For-Each Loop on Array',
        code: `public class Main {
    public static void main(String[] args) {
        String[] languages = {"Python", "Java", "Rust"};
        for (String lang : languages) {
            System.out.println("Track: " + lang);
        }
    }
}`,
        explanation: 'Iterates through array elements cleanly without manual index tracking.',
        output: 'Track: Python\nTrack: Java\nTrack: Rust'
      }
    ],
    practicalExamples: [
      {
        title: 'Switch on String',
        code: `public class Main {
    public static void main(String[] args) {
        String mode = "PROD";
        switch (mode) {
            case "DEV":
                System.out.println("Debug logging ON");
                break;
            case "PROD":
                System.out.println("Production mode ACTIVE");
                break;
            default:
                System.out.println("Unknown mode");
        }
    }
}`,
        explanation: 'Demonstrates Java switch branching on String values.',
        output: 'Production mode ACTIVE'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using integers inside if conditions: `if (1)` (causes compiler error in Java).',
        correction: 'Java strictly requires boolean expressions: `if (x != 0)`.',
        explanation: 'Unlike C/C++, Java does not treat integers as boolean values.'
      }
    ],
    keyPoints: [
      'if conditions in Java must evaluate to a strict boolean type.',
      'Java switch statements support String values.',
      'Enhanced for-each loops simplify collection and array iteration.'
    ],
    hint: {
      summary: 'if requires boolean expressions; for-each loop: for(Type x : array).',
      keyRules: [
        'No `if (1)` in Java; must be `if (true)`.',
        'switch supports Strings and enums.',
        'Use break in switch cases.'
      ],
      cheatsheetMarkdown: `\`\`\`java
for (int i = 0; i < 5; i++) { /* ... */ }
for (String s : names) { /* ... */ }
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-java-ctl-1',
        title: 'Accumulate Array with Loop',
        instruction: 'Sum `{10, 20, 30}` with a loop and print "Sum: 60".',
        starterCode: `public class Main {
    public static void main(String[] args) {
        int[] nums = {10, 20, 30};
        // Sum and print "Sum: 60"
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        int[] nums = {10, 20, 30};
        int sum = 0;
        for (int n : nums) sum += n;
        System.out.println("Sum: " + sum);
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-java-ctl-1',
        question: 'Will `if (1)` compile in Java?',
        options: [
          'Yes, 1 evaluates to true',
          'No, Java requires a strict boolean expression (e.g. `if (x != 0)`)',
          'Only if wrapped in Integer',
          'Only in static methods'
        ],
        correctOptionIndex: 1,
        explanation: 'Java enforces type safety: if conditions must evaluate to boolean.'
      },
      {
        id: 'q-java-ctl-2',
        question: 'Can Java `switch` statements evaluate `String` variables?',
        options: ['Yes, supported since Java 7', 'No, only integers and chars', 'Only single letters', 'Only enums'],
        correctOptionIndex: 0,
        explanation: 'Java 7 introduced String switching.'
      },
      {
        id: 'q-java-ctl-3',
        question: 'What is the syntax for an enhanced for-each loop over an array `String[] items`?',
        options: ['for (String item : items)', 'for (item in items)', 'foreach (item of items)', 'loop(items)'],
        correctOptionIndex: 0,
        explanation: '`for (Type item : collection)` is the standard for-each syntax in Java.'
      },
      {
        id: 'q-java-ctl-4',
        question: 'Which statement immediately exits the current enclosing loop in Java?',
        options: ['stop;', 'break;', 'exit;', 'return 0;'],
        correctOptionIndex: 1,
        explanation: 'break jumps out of the innermost enclosing loop.'
      },
      {
        id: 'q-java-ctl-5',
        question: 'What does `continue;` do inside a Java loop body?',
        options: [
          'Exits the program',
          'Skips the remainder of the current iteration and begins the next iteration',
          'Restarts the JVM',
          'Decrements the counter'
        ],
        correctOptionIndex: 1,
        explanation: 'continue skips the rest of the loop block and starts the next iteration step.'
      }
    ],
    codingChallenge: {
      id: 'java-ch-control',
      title: 'Loop Output Multiplier',
      slug: 'java-loop-multiplier',
      instruction: 'Output "Multiplied: 100".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-java-ctl-1',
          input: '',
          expectedOutput: 'Multiplied: 100'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'java-methods'
  },
  {
    id: 'java-methods',
    language: 'java',
    title: 'Methods, Parameters & Overloading',
    slug: 'java-methods',
    category: 'Object-Oriented Programming',
    categoryId: 'java-oop',
    level: 'intermediate',
    order: 4,
    estimatedMinutes: 10,
    prerequisites: ['java-control'],
    introduction: 'Methods define reusable blocks of executable logic associated with a class or object instance.',
    explanation: `### Method Anatomy:
\`[accessModifier] [static] returnType methodName(paramList) { ... }\`

### Method Overloading:
In Java, multiple methods within the same class can share the exact same name as long as their parameter lists differ in count, types, or order (the return type alone cannot differentiate overloaded methods).`,
    syntax: `public class Calculator {
    // Overloaded method: 2 ints
    public static int add(int a, int b) {
        return a + b;
    }
    // Overloaded method: 3 ints
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
}`,
    syntaxBreakdown: `• static : Belongs to class rather than instance (called as Calculator.add())
• returnType : Type of value returned (or void)
• Method Overloading : Same method name with different parameter signatures`,
    codeExamples: [
      {
        title: 'Method Overloading in Action',
        code: `public class Main {
    public static int multiply(int a, int b) { return a * b; }
    public static double multiply(double a, double b) { return a * b; }
    
    public static void main(String[] args) {
        System.out.println("Int: " + multiply(4, 5));
        System.out.println("Double: " + multiply(2.5, 4.0));
    }
}`,
        explanation: 'The Java compiler resolves which overloaded method to invoke based on argument types.',
        output: 'Int: 20\nDouble: 10.0'
      }
    ],
    practicalExamples: [
      {
        title: 'Utility Validation Method',
        code: `public class Main {
    public static boolean isValidPort(int port) {
        return port >= 1 && port <= 65535;
    }
    public static void main(String[] args) {
        System.out.println("Port 8080 valid: " + isValidPort(8080));
    }
}`,
        explanation: 'Pure static validation method.',
        output: 'Port 8080 valid: true'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to overload methods differing ONLY in return type: int foo() and double foo().',
        correction: 'Ensure parameter count or types differ.',
        explanation: 'Return type is not part of the method signature used for dispatch resolution.'
      }
    ],
    keyPoints: [
      'static methods are called on the class without creating an instance.',
      'Method overloading requires different parameter counts or types.',
      'Java passes primitive arguments by value.'
    ],
    hint: {
      summary: 'Methods define behavior; overloading allows same name with different parameter lists.',
      keyRules: [
        'Overloading requires different parameters, not just return types.',
        'static methods belong to the class.',
        'Use void when returning no value.'
      ],
      cheatsheetMarkdown: `\`\`\`java
public static int add(int a, int b) { return a + b; }
public static int add(int a, int b, int c) { return a + b + c; }
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-java-mth-1',
        title: 'Define Square Method',
        instruction: 'Create static method `int square(int n)` returning n * n. Call square(6) and print "Square: 36".',
        starterCode: `public class Main {
    // Define square method
    
    public static void main(String[] args) {
        // Call and print "Square: 36"
    }
}`,
        solutionCode: `public class Main {
    public static int square(int n) {
        return n * n;
    }
    public static void main(String[] args) {
        System.out.println("Square: " + square(6));
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-java-mth-1',
        question: 'What constitutes a valid method signature for method overloading in Java?',
        options: [
          'Different parameter counts, types, or order',
          'Different return types only',
          'Different variable names in parameters',
          'Different access modifiers only'
        ],
        correctOptionIndex: 0,
        explanation: 'Overloading is determined strictly by parameter count, types, and sequence.'
      },
      {
        id: 'q-java-mth-2',
        question: 'What does the `static` keyword indicate on a Java method?',
        options: [
          'The method belongs to the class itself and can be called without instantiating an object',
          'The method cannot be called',
          'The method is executed on a background thread',
          'The method is immutable'
        ],
        correctOptionIndex: 0,
        explanation: 'Static methods belong to class metadata and require no instance reference.'
      },
      {
        id: 'q-java-mth-3',
        question: 'Can two methods in the same Java class differ ONLY by their return type (e.g. `int calc()` and `double calc()`)?',
        options: ['No, causes a compiler error', 'Yes, fully supported', 'Only if private', 'Only in interfaces'],
        correctOptionIndex: 0,
        explanation: 'Methods cannot be overloaded on return type alone.'
      },
      {
        id: 'q-java-mth-4',
        question: 'How are primitive arguments passed to Java methods?',
        options: ['By value (copies of values)', 'By reference', 'By pointer', 'By memory page'],
        correctOptionIndex: 0,
        explanation: 'Java is strictly pass-by-value for all argument parameters.'
      },
      {
        id: 'q-java-mth-5',
        question: 'What keyword represents absence of a return value in Java method declarations?',
        options: ['null', 'void', 'empty', 'none'],
        correctOptionIndex: 1,
        explanation: 'void signifies that the method returns no value.'
      }
    ],
    codingChallenge: {
      id: 'java-ch-methods',
      title: 'Power Method Function',
      slug: 'java-power-method',
      instruction: 'Output "Power: 64" (representing 4^3).',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-java-mth-1',
          input: '',
          expectedOutput: 'Power: 64'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'java-oop-classes'
  },
  {
    id: 'java-oop-classes',
    language: 'java',
    title: 'Classes, Objects, Encapsulation & this',
    slug: 'java-oop-classes',
    category: 'Object-Oriented Programming',
    categoryId: 'java-oop',
    level: 'intermediate',
    order: 5,
    estimatedMinutes: 12,
    prerequisites: ['java-methods'],
    introduction: 'Classes are blueprints for creating objects that encapsulate data fields with protective getters, setters, and business methods.',
    explanation: `### Encapsulation:
Hide fields with \`private\` access and provide controlled public getters and setters to protect internal state.

### The \`this\` Keyword:
Refers to the current object instance, commonly used in constructors to disambiguate parameters from instance variables:
\`this.name = name;\``,
    syntax: `public class Account {
    private String owner;
    private double balance;

    public Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public double getBalance() { return balance; }
}`,
    syntaxBreakdown: `• private : Restricts direct access from external classes
• Constructor : Initializes fields upon new Account(...) instantiation
• this.field : Differentiates instance member from constructor parameter`,
    codeExamples: [
      {
        title: 'Encapsulated Entity Class',
        code: `public class User {
    private String username;
    private int xp;

    public User(String username, int xp) {
        this.username = username;
        this.xp = xp;
    }

    public void addXp(int points) {
        if (points > 0) this.xp += points;
    }

    public int getXp() { return xp; }
}

public class Main {
    public static void main(String[] args) {
        User u = new User("Cipher", 100);
        u.addXp(50);
        System.out.println("User XP: " + u.getXp());
    }
}`,
        explanation: 'Encapsulates xp field with validation guard inside addXp().',
        output: 'User XP: 150'
      }
    ],
    practicalExamples: [
      {
        title: 'Constructing Bank Account Objects',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("[ACCOUNT] Created for user: Aria | Balance: $500.00");
    }
}`,
        explanation: 'Instantiates and tracks business domain objects.',
        output: '[ACCOUNT] Created for user: Aria | Balance: $500.00'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Making fields `public` allowing uncontrolled external mutation.',
        correction: 'Make fields `private` and provide public getter/setter methods.',
        explanation: 'Encapsulation preserves class invariants and business validation rules.'
      }
    ],
    keyPoints: [
      'Classes bundle fields and methods into an encapsulated unit.',
      'private hides state; public methods expose controlled interface.',
      'this refers to the invoking object instance.'
    ],
    hint: {
      summary: 'Keep fields private; initialize with constructors; access via getters and setters.',
      keyRules: [
        'private type field;',
        'public ClassName(...) { this.field = field; }',
        'public type getField() { return field; }'
      ],
      cheatsheetMarkdown: `\`\`\`java
public class Item {
    private int id;
    public Item(int id) { this.id = id; }
    public int getId() { return id; }
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-java-cls-1',
        title: 'Create Rectangle Class',
        instruction: 'Create class with private width, height and `int getArea()`. Calculate 10x5 and print "Area: 50".',
        starterCode: `public class Main {
    public static void main(String[] args) {
        // Print "Area: 50"
        
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Area: 50");
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-java-cls-1',
        question: 'What is the purpose of the `this` keyword in Java constructors?',
        options: [
          'Refers to the current object instance to distinguish fields from parameter names',
          'Creates a new thread',
          'Imports a package',
          'Destroys the object'
        ],
        correctOptionIndex: 0,
        explanation: 'this resolves naming collisions between parameter variables and class instance fields.'
      },
      {
        id: 'q-java-cls-2',
        question: 'Which access modifier ensures a variable cannot be accessed directly from classes outside its own definition?',
        options: ['public', 'private', 'protected', 'default'],
        correctOptionIndex: 1,
        explanation: 'private restricts member visibility exclusively to the defining class.'
      },
      {
        id: 'q-java-cls-3',
        question: 'What operator is used in Java to instantiate an object from a class blueprint?',
        options: ['malloc', 'new', 'create', 'alloc'],
        correctOptionIndex: 1,
        explanation: 'The `new` keyword allocates heap memory and invokes the constructor.'
      },
      {
        id: 'q-java-cls-4',
        question: 'What is the default return type of a Java constructor?',
        options: ['void', 'int', 'Constructors have no return type specified', 'Object'],
        correctOptionIndex: 2,
        explanation: 'Constructors have no return type and share the exact name of the class.'
      },
      {
        id: 'q-java-cls-5',
        question: 'Where are Java object instances allocated in memory when created with `new`?',
        options: ['On the heap memory', 'On the CPU register', 'In the BIOS', 'In the code segment'],
        correctOptionIndex: 0,
        explanation: 'All Java objects reside on the garbage-collected JVM heap.'
      }
    ],
    codingChallenge: {
      id: 'java-ch-classes',
      title: 'Object State Output',
      slug: 'java-object-state',
      instruction: 'Output "Agent: Aria [Level: 10]".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-java-cls-1',
          input: '',
          expectedOutput: 'Agent: Aria [Level: 10]'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'java-inheritance'
  },
  {
    id: 'java-inheritance',
    language: 'java',
    title: 'Inheritance, Interfaces & Polymorphism',
    slug: 'java-inheritance',
    category: 'Object-Oriented Programming',
    categoryId: 'java-oop',
    level: 'intermediate',
    order: 6,
    estimatedMinutes: 14,
    prerequisites: ['java-oop-classes'],
    introduction: 'Inheritance enables classes to inherit fields and methods from parent classes, while interfaces establish behavioral contracts for dynamic polymorphism.',
    explanation: `### Inheritance with \`extends\`:
• A subclass inherits non-private members of a superclass.
• \`super()\`: Invokes the parent class constructor.
• \`@Override\`: Annotation verifying that a subclass method correctly overrides a parent method.

### Interfaces with \`implements\`:
• An \`interface\` defines method signatures that implementing classes must fulfill.
• A class can implement multiple interfaces (supporting multiple inheritance of type).

### Polymorphism:
Superclass reference can hold any subclass instance: \`Shape s = new Circle();\`.`,
    syntax: `interface Playable {
    void play();
}

class Game implements Playable {
    @Override
    public void play() {
        System.out.println("Running APEX simulation...");
    }
}`,
    syntaxBreakdown: `• extends : Single class inheritance keyword
• implements : Interface contract realization keyword
• @Override : Compiler check for valid method overriding
• super() : Parent constructor delegation`,
    codeExamples: [
      {
        title: 'Polymorphic Interface Implementation',
        code: `interface Service {
    void execute();
}

class DatabaseService implements Service {
    @Override
    public void execute() {
        System.out.println("Connecting to Database: OK");
    }
}

public class Main {
    public static void main(String[] args) {
        Service svc = new DatabaseService();
        svc.execute();
    }
}`,
        explanation: 'Polymorphic reference invoking subclass overridden implementation.',
        output: 'Connecting to Database: OK'
      }
    ],
    practicalExamples: [
      {
        title: 'Superclass Constructor Delegation',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("[ENTITY] Subclass instantiated with super() parameters");
    }
}`,
        explanation: 'Demonstrates superclass initialization.',
        output: '[ENTITY] Subclass instantiated with super() parameters'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to extend multiple classes in Java: class C extends A, B.',
        correction: 'Java classes support single class inheritance; use multiple interfaces instead: `class C implements I1, I2`.',
        explanation: 'Java prohibits multiple class inheritance to avoid the diamond problem.'
      }
    ],
    keyPoints: [
      'Java supports single inheritance for classes (extends) and multiple for interfaces (implements).',
      '@Override ensures accurate method overriding.',
      'Polymorphism allows uniform handling of different subclasses through a common supertype.'
    ],
    hint: {
      summary: 'class Child extends Parent; class Impl implements Interface; @Override checks method overrides.',
      keyRules: [
        'Single class inheritance only.',
        'Multiple interface implementation supported.',
        'super() must be the first statement in child constructor.'
      ],
      cheatsheetMarkdown: `\`\`\`java
interface Runner { void run(); }
class Bot implements Runner {
    @Override
    public void run() { System.out.println("Running"); }
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-java-inh-1',
        title: 'Implement Interface',
        instruction: 'Create interface `Action` with `void perform()`. Implement and print "Action Performed".',
        starterCode: `public class Main {
    public static void main(String[] args) {
        // Output "Action Performed"
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Action Performed");
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-java-inh-1',
        question: 'Which keyword is used by a Java class to inherit from a superclass?',
        options: ['inherits', 'extends', 'implements', 'subclass'],
        correctOptionIndex: 1,
        explanation: 'extends denotes class inheritance in Java.'
      },
      {
        id: 'q-java-inh-2',
        question: 'Does Java permit a class to extend more than one parent class directly (multiple class inheritance)?',
        options: [
          'No, Java only supports single class inheritance (multiple interfaces are allowed)',
          'Yes, using comma separation',
          'Only if parent classes are abstract',
          'Only in Spring framework'
        ],
        correctOptionIndex: 0,
        explanation: 'Java avoids the diamond problem by allowing single class inheritance only.'
      },
      {
        id: 'q-java-inh-3',
        question: 'What is the purpose of the `@Override` annotation in Java?',
        options: [
          'Instructs compiler to verify that the method correctly overrides a method from a superclass or interface',
          'Makes the method run faster',
          'Hides the method from subclasses',
          'Allows the method to accept any parameter type'
        ],
        correctOptionIndex: 0,
        explanation: '@Override catches typo bugs where signatures fail to match parent declarations.'
      },
      {
        id: 'q-java-inh-4',
        question: 'What keyword invokes the parent class constructor from a subclass constructor?',
        options: ['parent()', 'super()', 'base()', 'this()'],
        correctOptionIndex: 1,
        explanation: 'super() delegates construction to the immediate superclass.'
      },
      {
        id: 'q-java-inh-5',
        question: 'What keyword is used by a class to fulfill an `interface` contract in Java?',
        options: ['extends', 'implements', 'uses', 'fulfills'],
        correctOptionIndex: 1,
        explanation: 'implements specifies that a class adheres to an interface contract.'
      }
    ],
    codingChallenge: {
      id: 'java-ch-inheritance',
      title: 'Polymorphic Dispatch Output',
      slug: 'java-polymorphic-dispatch',
      instruction: 'Output "POLYMORPHIC_DISPATCH_OK".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-java-inh-1',
          input: '',
          expectedOutput: 'POLYMORPHIC_DISPATCH_OK'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'java-collections'
  },
  {
    id: 'java-collections',
    language: 'java',
    title: 'Collections Framework: ArrayList & HashMap',
    slug: 'java-collections',
    category: 'Collections Framework & Exceptions',
    categoryId: 'java-collections-adv',
    level: 'advanced',
    order: 7,
    estimatedMinutes: 14,
    prerequisites: ['java-inheritance'],
    introduction: 'The Java Collections Framework provides standardized, type-safe data structures including dynamic lists, hash maps, and sets.',
    explanation: `### Essential Collections Classes in \`java.util.*\`:
• **\`ArrayList<T>\`**: Resizable dynamic array implementing the \`List<T>\` interface. Methods: \`.add()\`, \`.get(i)\`, \`.size()\`, \`.remove(i)\`.
• **\`HashMap<K, V>\`**: Hash table storing key-value pairs with $O(1)$ average lookups. Methods: \`.put(k, v)\`, \`.get(k)\`, \`.containsKey(k)\`.
• **\`HashSet<T>\`**: Set collection guaranteeing unique non-duplicate elements.`,
    syntax: `import java.util.ArrayList;
import java.util.HashMap;

ArrayList<String> tracks = new ArrayList<>();
tracks.add("Python");
tracks.add("Java");

HashMap<String, Integer> scores = new HashMap<>();
scores.put("Aria", 95);
scores.put("Boopathi", 98);`,
    syntaxBreakdown: `• <T> / <K, V> : Generic type parameters enforcing type safety
• .add() / .put() : Insertion methods
• .get() / .containsKey() : Retrieval methods`,
    codeExamples: [
      {
        title: 'ArrayList and HashMap Operations',
        code: `import java.util.ArrayList;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Alpha");
        list.add("Beta");
        
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Alpha", 100);
        
        System.out.println("List size: " + list.size());
        System.out.println("Alpha score: " + map.get("Alpha"));
    }
}`,
        explanation: 'Demonstrates list sizing and map lookup.',
        output: 'List size: 2\nAlpha score: 100'
      }
    ],
    practicalExamples: [
      {
        title: 'Iterating Map Entry Sets',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("User: Aria -> XP: 2450");
        System.out.println("User: Cipher -> XP: 2100");
    }
}`,
        explanation: 'Simulates map entry enumeration.',
        output: 'User: Aria -> XP: 2450\nUser: Cipher -> XP: 2100'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using primitive types in generics: `ArrayList<int>`.',
        correction: 'Use wrapper classes in generics: `ArrayList<Integer>`.',
        explanation: 'Java generics require reference types (Object subclasses); Java auto-boxes primitives to wrappers.'
      }
    ],
    keyPoints: [
      'ArrayList provides fast random access via dynamic arrays.',
      'HashMap provides O(1) key-value lookups.',
      'Generics (<T>) enforce compile-time type safety for collections.'
    ],
    hint: {
      summary: 'ArrayList<T> for resizable lists; HashMap<K,V> for key-value pairs; use wrapper classes (Integer, Double).',
      keyRules: [
        'ArrayList<Integer> not ArrayList<int>.',
        'list.add(val) and list.get(i).',
        'map.put(key, val) and map.get(key).'
      ],
      cheatsheetMarkdown: `\`\`\`java
ArrayList<String> list = new ArrayList<>();
list.add("A");
HashMap<String, Integer> map = new HashMap<>();
map.put("A", 1);
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-java-col-1',
        title: 'Populate ArrayList',
        instruction: 'Create an ArrayList with "Code" and "Career", print "Count: 2".',
        starterCode: `public class Main {
    public static void main(String[] args) {
        // Print "Count: 2"
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Count: 2");
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-java-col-1',
        question: 'Which collection class in Java provides an $O(1)$ average time complexity key-value store?',
        options: ['ArrayList', 'HashMap', 'LinkedList', 'TreeSet'],
        correctOptionIndex: 1,
        explanation: 'HashMap is implemented as a hash table providing O(1) average lookup and insertion.'
      },
      {
        id: 'q-java-col-2',
        question: 'Why is `ArrayList<int>` invalid syntax in Java?',
        options: [
          'Generics in Java require reference types (Object subclasses), so wrapper `ArrayList<Integer>` must be used',
          'int is deprecated',
          'ArrayList only stores Strings',
          'Java lacks lists'
        ],
        correctOptionIndex: 0,
        explanation: 'Type erasure in Java generics requires Object types; primitive types use wrapper classes.'
      },
      {
        id: 'q-java-col-3',
        question: 'Which method retrieves the number of elements in an `ArrayList`?',
        options: ['.length', '.size()', '.count()', '.capacity()'],
        correctOptionIndex: 1,
        explanation: '.size() returns the element count of a Java collection.'
      },
      {
        id: 'q-java-col-4',
        question: 'Which collection interface in Java guarantees no duplicate elements can exist?',
        options: ['List', 'Set (e.g. HashSet)', 'Map', 'Queue'],
        correctOptionIndex: 1,
        explanation: 'Set implementations guarantee mathematical set uniqueness.'
      },
      {
        id: 'q-java-col-5',
        question: 'Which method checks if a specific key exists inside a `HashMap`?',
        options: ['.contains()', '.containsKey(key)', '.hasKey(key)', '.exists(key)'],
        correctOptionIndex: 1,
        explanation: 'containsKey(key) returns true if the key mapping is present.'
      }
    ],
    codingChallenge: {
      id: 'java-ch-collections',
      title: 'Collection Map Multiplier',
      slug: 'java-collection-multiplier',
      instruction: 'Output "MAP_LOOKUP_SUCCESS: 42".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-java-col-1',
          input: '',
          expectedOutput: 'MAP_LOOKUP_SUCCESS: 42'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'java-exceptions'
  },
  {
    id: 'java-exceptions',
    language: 'java',
    title: 'Exception Handling: try, catch, finally & throw',
    slug: 'java-exceptions',
    category: 'Collections Framework & Exceptions',
    categoryId: 'java-collections-adv',
    level: 'advanced',
    order: 8,
    estimatedMinutes: 12,
    prerequisites: ['java-collections'],
    introduction: 'Java provides structured exception handling to intercept runtime errors, prevent crashes, and guarantee cleanup execution.',
    explanation: `### Exception Hierarchy:
• \`Throwable\` is parent to \`Error\` (JVM hardware/memory fatal conditions) and \`Exception\`.
• **Checked Exceptions:** Inherit from \`Exception\`; compiler mandates either handling with \`try-catch\` or declaring in method signature with \`throws\`.
• **Unchecked (Runtime) Exceptions:** Inherit from \`RuntimeException\` (e.g. \`NullPointerException\`, \`ArithmeticException\`).

### The \`finally\` Block:
Guaranteed to execute regardless of whether an exception was thrown or caught.`,
    syntax: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Error: Division by zero");
} finally {
    System.out.println("Cleanup executed");
}`,
    syntaxBreakdown: `• try { ... } : Protected execution block
• catch (Exception e) : Intercepts matching exception objects
• finally { ... } : Guaranteed execution cleanup block
• throw new Exception(...) : Explicitly triggers an exception`,
    codeExamples: [
      {
        title: 'Try-Catch with Finally',
        code: `public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Handled: Index out of bounds");
        } finally {
            System.out.println("Finally block complete");
        }
    }
}`,
        explanation: 'Intercepts array out-of-bounds error and runs finally cleanup.',
        output: 'Handled: Index out of bounds\nFinally block complete'
      }
    ],
    practicalExamples: [
      {
        title: 'Custom Validation Exception',
        code: `public class Main {
    public static void validateAge(int age) {
        if (age < 18) throw new IllegalArgumentException("Must be 18+");
        System.out.println("Access Granted");
    }
    public static void main(String[] args) {
        try {
            validateAge(20);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
        explanation: 'Throws IllegalArgumentException on invalid input validation.',
        output: 'Access Granted'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Catching generic Exception and silently swallowing errors: `catch(Exception e) {}`.',
        correction: 'Log the error or handle it specifically so bugs are not silently masked.',
        explanation: 'Empty catch blocks obscure the root cause of application failures.'
      }
    ],
    keyPoints: [
      'Checked exceptions must be caught or declared with throws.',
      'Unchecked exceptions inherit from RuntimeException.',
      'The finally block is guaranteed to execute for reliable cleanup.'
    ],
    hint: {
      summary: 'try catches errors in catch(Exception e); finally always executes.',
      keyRules: [
        'Checked exceptions require try-catch or throws.',
        'finally executes even if return occurs in try.',
        'Use throw new MyException() to trigger errors.'
      ],
      cheatsheetMarkdown: `\`\`\`java
try {
    // risky code
} catch (Exception e) {
    System.out.println(e.getMessage());
} finally {
    // cleanup
}
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-java-exc-1',
        title: 'Catch Arithmetic Exception',
        instruction: 'Catch division by zero and print "Caught: Arithmetic Error".',
        starterCode: `public class Main {
    public static void main(String[] args) {
        // Handle exception
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Caught: Arithmetic Error");
        }
    }
}`
      }
    ],
    quizzes: [
      {
        id: 'q-java-exc-1',
        question: 'When is the code inside a Java `finally` block guaranteed to execute?',
        options: [
          'Always, regardless of whether an exception occurred, was caught, or not caught',
          'Only when an exception is thrown',
          'Only when no exception is thrown',
          'Only on system shutdown'
        ],
        correctOptionIndex: 0,
        explanation: 'finally blocks execute deterministically after try/catch completion.'
      },
      {
        id: 'q-java-exc-2',
        question: 'What is a "Checked Exception" in Java?',
        options: [
          'An exception verified at compile time that must be handled with try-catch or declared with `throws`',
          'An error that cannot be caught',
          'A hardware memory crash',
          'A comment in code'
        ],
        correctOptionIndex: 0,
        explanation: 'Checked exceptions inherit directly from Exception and are enforced at compile time.'
      },
      {
        id: 'q-java-exc-3',
        question: 'Which superclass is the root parent of all unchecked runtime exceptions in Java?',
        options: ['RuntimeException', 'Throwable', 'Error', 'Thread'],
        correctOptionIndex: 0,
        explanation: 'Unchecked exceptions inherit from java.lang.RuntimeException.'
      },
      {
        id: 'q-java-exc-4',
        question: 'Which keyword in Java explicitly throws an exception instance?',
        options: ['raise', 'throw', 'throws', 'fire'],
        correctOptionIndex: 1,
        explanation: '`throw` instigates an exception (e.g. `throw new IllegalArgumentException();`).'
      },
      {
        id: 'q-java-exc-5',
        question: 'What keyword on a method signature declares that the method might propagate a checked exception to its caller?',
        options: ['throw', 'throws', 'declares', 'signals'],
        correctOptionIndex: 1,
        explanation: '`throws ExceptionName` on the method header advertises potential checked exceptions.'
      }
    ],
    codingChallenge: {
      id: 'java-ch-exceptions',
      title: 'Exception Safety Logger',
      slug: 'java-exception-safety',
      instruction: 'Output "EXCEPTION_HANDLED_CLEANLY".',
      starterCode: `// Write your solution code here\n`,
      testCases: [
        {
          id: 'tc-java-exc-1',
          input: '',
          expectedOutput: 'EXCEPTION_HANDLED_CLEANLY'
        }
      ],
      xpReward: 50
    },
    xpReward: 50
  }
]
