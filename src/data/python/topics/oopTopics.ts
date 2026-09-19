import type { PythonTopic } from '../types'

export const OOP_TOPICS: PythonTopic[] = [
  {
    id: 'py-oop-intro',
    title: 'Python OOP Fundamentals',
    slug: 'python-oop-fundamentals',
    category: 'Python OOP',
    categoryId: 'oop',
    level: 'intermediate',
    order: 11,
    estimatedMinutes: 9,
    prerequisites: ['py-collections'],
    prevTopicId: 'py-collections',
    introduction: 'Explore Object-Oriented Programming (OOP) in Python: blueprints, state, behavior, and modular domain modeling.',
    explanation: `Object-Oriented Programming (OOP) is a paradigm based on the concept of "objects", which contain data (attributes/properties) and code (methods).

### Core Pillars of OOP:
1. **Encapsulation:** Bundling data and methods into classes while restricting direct external modification.
2. **Abstraction:** Hiding internal implementation complexities behind a clean interface.
3. **Inheritance:** Deriving new classes from parent classes to reuse and extend behavior.
4. **Polymorphism:** Allowing different classes to implement the same interface or method name differently.`,
    syntax: `class ClassName:
    # Class attributes and methods
    pass`,
    codeExamples: [
      {
        title: 'Basic Class and Object',
        code: 'class Drone:\n    status = "Active"\n\n    def launch(self):\n        return "Drone airborne"\n\nd1 = Drone()\nprint(d1.status)\nprint(d1.launch())',
        explanation: 'Drone is the class blueprint; d1 is an instantiated object.',
        output: 'Active\nDrone airborne'
      }
    ],
    practicalExamples: [
      {
        title: 'Modeling a Game Player',
        code: 'class Player:\n    def __init__(self, username, level=1):\n        self.username = username\n        self.level = level\n\n    def describe(self):\n        return f"Player {self.username} (Level {self.level})"\n\np = Player("Vance", 5)\nprint(p.describe())',
        explanation: 'Attributes represent player state, and describe() is a method acting on that state.',
        output: 'Player Vance (Level 5)'
      }
    ],
    commonMistakes: [
      {
        mistake: 'class User:\n    def greet():\n        print("Hello")',
        correction: 'class User:\n    def greet(self):\n        print("Hello")',
        explanation: 'Instance methods in Python must accept "self" as their first positional parameter.'
      }
    ],
    keyPoints: [
      'Classes act as blueprints; objects are live instances created from those blueprints.',
      'The 4 pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism.',
      'Self refers to the specific instance invoking the method.'
    ],
    notes: {
      summary: 'OOP organizes complex programs into modular objects containing state and behavior.',
      keyRules: [
        'Class names use PascalCase (e.g., BankAccount, DataStream).',
        'Instance methods must take "self" as the first argument.',
        'Use issubclass() and isinstance() to verify object hierarchies.'
      ],
      cheatsheetMarkdown: `### OOP Basics
\`\`\`python
class Server:
    def __init__(self, ip):
        self.ip = ip

s = Server("192.168.1.1")
print(s.ip)
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: OOP Fundamentals
- Paradigm based on Classes (blueprints) and Objects (instances).
- Encapsulation, Abstraction, Inheritance, Polymorphism.
- self refers to the instance.`
    },
    practiceTasks: [
      {
        id: 'pt-oop-1',
        title: 'Create Robot Class',
        instruction: 'Define a class Robot with an attribute model = "RX-9" and instantiate it as r1. Print r1.model.',
        starterCode: '# Define Robot and print\n',
        solutionCode: 'class Robot:\n    model = "RX-9"\n\nr1 = Robot()\nprint(r1.model)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-oop-1',
        question: 'What is a "class" in Object-Oriented Programming?',
        options: ['A database record', 'A blueprint for creating objects', 'A built-in data type like int', 'A loop construct'],
        correctOptionIndex: 1,
        explanation: 'A class is a blueprint or template that defines attributes and methods for objects created from it.'
      },
      {
        id: 'q-py-oop-2',
        question: 'Which of the following is NOT one of the 4 primary pillars of OOP?',
        options: ['Polymorphism', 'Compilation', 'Encapsulation', 'Inheritance'],
        correctOptionIndex: 1,
        explanation: 'The 4 pillars of OOP are Encapsulation, Abstraction, Inheritance, and Polymorphism. Compilation is a build step.'
      },
      {
        id: 'q-py-oop-3',
        question: 'What does the "self" parameter represent in a Python instance method?',
        options: ['The parent class', 'The current instance of the class', 'The global scope', 'A copy of the method'],
        correctOptionIndex: 1,
        explanation: '"self" refers to the specific instance of the object on which the method was called.'
      },
      {
        id: 'q-py-oop-4',
        question: 'What naming convention does PEP 8 specify for Python class names?',
        options: ['camelCase', 'snake_case', 'PascalCase (CapWords)', 'kebab-case'],
        correctOptionIndex: 2,
        explanation: 'PEP 8 specifies PascalCase / CapWords (e.g. UserProfile, PaymentGateway) for class names.'
      },
      {
        id: 'q-py-oop-5',
        question: 'Which built-in function checks if an object is an instance of a specified class?',
        options: ['typeof()', 'isinstance()', 'typecheck()', 'hasinstance()'],
        correctOptionIndex: 1,
        explanation: 'isinstance(obj, Class) returns True if obj is an instance of Class or a subclass thereof.'
      }
    ],
    codingChallenge: {
      id: 'c-py-oop-intro',
      title: 'Vehicle Blueprint',
      slug: 'vehicle-blueprint',
      instruction: 'Define a class Car with attribute wheels = 4 and a method honk(self) that returns "Beep beep!". Instantiate c = Car() and print c.honk().',
      starterCode: '# Define Car class and test instance\n',
      testCases: [
        {
          id: 'tc-oop-1',
          input: '',
          expectedOutput: 'Beep beep!'
        }
      ],
      xpReward: 60
    },
    xpReward: 120,
    nextTopicId: 'py-classes-objects'
  },
  {
    id: 'py-classes-objects',
    title: 'Python __init__ and self',
    slug: 'python-init-self',
    category: 'Python OOP',
    categoryId: 'oop',
    level: 'intermediate',
    order: 12,
    estimatedMinutes: 10,
    prerequisites: ['py-oop-intro'],
    prevTopicId: 'py-oop-intro',
    introduction: 'Master object constructors with __init__, instance vs class attributes, and instance methods.',
    explanation: `When a class is instantiated in Python, the \`__init__()\` constructor method is automatically invoked to initialize the newly created object's state.

### Instance vs Class Attributes:
- **Instance Attributes (\`self.x\`):** Unique to each specific instance.
- **Class Attributes:** Shared across all instances of the class.`,
    syntax: `class BankAccount:
    bank_name = "Apex Bank" # Class attribute

    def __init__(self, owner: str, balance: float = 0.0):
        self.owner = owner      # Instance attribute
        self.balance = balance  # Instance attribute

    def deposit(self, amount: float):
        self.balance += amount
        return self.balance`,
    codeExamples: [
      {
        title: 'Constructor with Defaults',
        code: 'class Account:\n    def __init__(self, user, balance=0):\n        self.user = user\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n\nacc = Account("Sarah", 100)\nacc.deposit(50)\nprint(f"{acc.user} balance: \${acc.balance}")',
        explanation: 'The __init__ method sets up the initial balance and user attributes.',
        output: 'Sarah balance: $150'
      }
    ],
    practicalExamples: [
      {
        title: 'Class vs Instance Attribute Difference',
        code: 'class Server:\n    active_connections = 0 # Class attribute\n\n    def __init__(self, hostname):\n        self.hostname = hostname # Instance attribute\n        Server.active_connections += 1\n\ns1 = Server("alpha")\ns2 = Server("beta")\nprint(f"Active servers: {Server.active_connections}")',
        explanation: 'Class attribute is modified through the class name and shared across all instances.',
        output: 'Active servers: 2'
      }
    ],
    commonMistakes: [
      {
        mistake: 'def __init__(name):\n    self.name = name',
        correction: 'def __init__(self, name):\n    self.name = name',
        explanation: '__init__ must accept "self" as its first parameter.'
      }
    ],
    keyPoints: [
      '__init__() is the constructor called automatically upon object creation.',
      'Instance attributes are stored on self; class attributes are defined directly in the class body.',
      'Always pass self explicitly in method definitions.'
    ],
    notes: {
      summary: '__init__ initializes state; self provides access to instance attributes and methods.',
      keyRules: [
        '__init__ should never return a value other than None.',
        'Use self.attribute to read or modify instance data.',
        'Class attributes are shared; mutable class attributes affect all instances.'
      ],
      cheatsheetMarkdown: `### __init__ and self
\`\`\`python
class Item:
    def __init__(self, name, price):
        self.name = name
        self.price = price

i = Item("Widget", 19.99)
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: __init__ and self
- __init__(self, ...): Constructor initializer.
- self: Reference to current object instance.
- Instance attributes: self.x = val
- Class attributes: defined in class body.`
    },
    practiceTasks: [
      {
        id: 'pt-init-1',
        title: 'Define Product Class',
        instruction: 'Create a Product class with __init__(self, title, price). Instantiate p = Product("Keyboard", 75) and print p.title.',
        starterCode: '# Define Product class\n',
        solutionCode: 'class Product:\n    def __init__(self, title, price):\n        self.title = title\n        self.price = price\n\np = Product("Keyboard", 75)\nprint(p.title)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-init-1',
        question: 'When is the __init__() method executed in Python?',
        options: [
          'When the Python script finishes',
          'Automatically whenever a new instance of the class is created',
          'Only when explicitly called via obj.__init__()',
          'During garbage collection'
        ],
        correctOptionIndex: 1,
        explanation: '__init__() is the constructor method called automatically when creating a new object.'
      },
      {
        id: 'q-py-init-2',
        question: 'What is the mandatory first argument for instance methods in Python?',
        options: ['cls', 'this', 'self', 'root'],
        correctOptionIndex: 2,
        explanation: 'By convention and Python design, "self" is the required first parameter of instance methods.'
      },
      {
        id: 'q-py-init-3',
        question: 'What happens if a method tries to return a non-None value inside __init__()?',
        options: ['It returns the value to the caller', 'Python raises a TypeError', 'It converts it to a string', 'It prints a warning'],
        correctOptionIndex: 1,
        explanation: '__init__() is forbidden from returning anything other than None and raises a TypeError if attempted.'
      },
      {
        id: 'q-py-init-4',
        question: 'Where are class attributes stored in Python?',
        options: [
          'Directly inside the class definition, shared across all instances',
          'Inside the __init__ method using self.x',
          'In global variables',
          'In a private database'
        ],
        correctOptionIndex: 0,
        explanation: 'Class attributes are declared in the class body outside any methods and shared across all instances.'
      },
      {
        id: 'q-py-init-5',
        question: 'Can you have default values for parameters in __init__()?',
        options: ['No, all parameters are mandatory in constructors', 'Yes, standard default parameter syntax applies', 'Only for string parameters', 'Only in Python 2'],
        correctOptionIndex: 1,
        explanation: '__init__() accepts default parameter values just like any standard Python function.'
      }
    ],
    codingChallenge: {
      id: 'c-py-init',
      title: 'Hero Stats Initializer',
      slug: 'hero-stats-initializer',
      instruction: 'Define a class Hero with __init__(self, name, hp=100) and a method status(self) that returns f"{self.name} has {self.hp} HP". Instantiate h = Hero("Aiden") and print h.status().',
      starterCode: '# Define Hero class and test\n',
      testCases: [
        {
          id: 'tc-init-1',
          input: '',
          expectedOutput: 'Aiden has 100 HP'
        }
      ],
      xpReward: 60
    },
    xpReward: 120,
    nextTopicId: 'py-inheritance'
  },
  {
    id: 'py-inheritance',
    title: 'Python Inheritance & super()',
    slug: 'python-inheritance',
    category: 'Python OOP',
    categoryId: 'oop',
    level: 'intermediate',
    order: 13,
    estimatedMinutes: 10,
    prerequisites: ['py-classes-objects'],
    prevTopicId: 'py-classes-objects',
    introduction: 'Extend existing classes, override methods, and delegate initialization using super().',
    explanation: `Inheritance allows a child (derived) class to inherit attributes and methods from a parent (base) class.

### Key Syntax:
\`\`\`python
class Parent:
    def greet(self):
        return "Hello from Parent"

class Child(Parent):
    def __init__(self, name):
        super().__init__() # Call parent constructor
        self.name = name
\`\`\`

### Multiple Inheritance & MRO:
Python supports multiple inheritance \`class C(A, B):\`. The Method Resolution Order (MRO) defines how method lookups proceed (accessible via \`Class.__mro__\`).`,
    syntax: `class Animal:
    def __init__(self, species):
        self.species = species

class Dog(Animal):
    def __init__(self, name):
        super().__init__("Canine")
        self.name = name`,
    codeExamples: [
      {
        title: 'Single Inheritance and super()',
        code: 'class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    def get_details(self):\n        return f"{self.name}: \${self.salary}"\n\nclass Manager(Employee):\n    def __init__(self, name, salary, department):\n        super().__init__(name, salary)\n        self.department = department\n\nm = Manager("Elena", 120000, "Engineering")\nprint(m.get_details())\nprint(f"Dept: {m.department}")',
        explanation: 'Manager inherits get_details from Employee and delegates constructor init to super().',
        output: 'Elena: $120000\nDept: Engineering'
      }
    ],
    practicalExamples: [
      {
        title: 'Method Overriding',
        code: 'class Shape:\n    def area(self):\n        return 0\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n\n    def area(self):\n        return self.w * self.h\n\nr = Rectangle(5, 8)\nprint(f"Area: {r.area()}")',
        explanation: 'Rectangle overrides the generic Shape.area() method with specific math.',
        output: 'Area: 40'
      }
    ],
    commonMistakes: [
      {
        mistake: 'class Child(Parent):\n    def __init__(self):\n        # Forgot super().__init__()\n        self.child_attr = 1',
        correction: 'class Child(Parent):\n    def __init__(self):\n        super().__init__()\n        self.child_attr = 1',
        explanation: 'Forgetting to call super().__init__() leaves parent attributes uninitialized.'
      }
    ],
    keyPoints: [
      'Inheritance promotes code reuse by deriving child classes from base classes.',
      'super() dynamically references parent methods and constructors.',
      'Child classes can override parent methods to provide specialized implementations.'
    ],
    notes: {
      summary: 'Inheritance establishes an "is-a" relationship between base and derived classes.',
      keyRules: [
        'Call super().__init__() in child constructors when extending state.',
        'isinstance(child_obj, ParentClass) returns True.',
        'issubclass(ChildClass, ParentClass) returns True.'
      ],
      cheatsheetMarkdown: `### Inheritance
\`\`\`python
class Base:
    def speak(self):
        return "..."

class Derived(Base):
    def speak(self):
        return "Hello!"
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Inheritance & super()
- class Child(Parent):
- super().__init__(*args) calls parent constructor.
- Method overriding: child replaces parent method.
- MRO: Method Resolution Order.`
    },
    practiceTasks: [
      {
        id: 'pt-inh-1',
        title: 'Create Subclass',
        instruction: 'Define class Device with brand="Apex". Define Phone(Device) with model="X". Instantiate p = Phone() and print p.brand, p.model.',
        starterCode: '# Define classes and print\n',
        solutionCode: 'class Device:\n    brand = "Apex"\n\nclass Phone(Device):\n    model = "X"\n\np = Phone()\nprint(p.brand, p.model)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-inh-1',
        question: 'How do you inherit from a class "Animal" in Python?',
        options: ['class Dog extends Animal:', 'class Dog inherits Animal:', 'class Dog(Animal):', 'class Dog implements Animal:'],
        correctOptionIndex: 2,
        explanation: 'Python uses parentheses after the class name to specify parent classes: class Dog(Animal):.'
      },
      {
        id: 'q-py-inh-2',
        question: 'What is the purpose of the super() function in Python?',
        options: [
          'To create a superuser account',
          'To call methods and constructors of the parent class',
          'To terminate class execution',
          'To make all methods public'
        ],
        correctOptionIndex: 1,
        explanation: 'super() gives you access to methods and constructor logic in a parent/sibling class.'
      },
      {
        id: 'q-py-inh-3',
        question: 'Does Python support Multiple Inheritance (inheriting from more than one class)?',
        options: ['No, only single inheritance is allowed', 'Yes, a class can inherit from multiple base classes class C(A, B):', 'Only in abstract base classes', 'Only in Python 2'],
        correctOptionIndex: 1,
        explanation: 'Python fully supports Multiple Inheritance with C3 Linearization / MRO.'
      },
      {
        id: 'q-py-inh-4',
        question: 'What does isinstance(Dog(), Animal) evaluate to if class Dog(Animal): is defined?',
        options: ['False', 'True', 'TypeError', 'None'],
        correctOptionIndex: 1,
        explanation: 'An instance of a subclass is also considered an instance of its parent class.'
      },
      {
        id: 'q-py-inh-5',
        question: 'What is Method Overriding in Python?',
        options: [
          'Defining multiple methods with different parameter counts in the same class',
          'A child class providing a specific implementation of a method already defined in its parent class',
          'Deleting a method from memory',
          'Renaming a method at runtime'
        ],
        correctOptionIndex: 1,
        explanation: 'Method overriding occurs when a subclass re-defines a method with the same name as in its superclass.'
      }
    ],
    codingChallenge: {
      id: 'c-py-inh',
      title: 'Polymorphic Sound Emitter',
      slug: 'polymorphic-sound-emitter',
      instruction: 'Define class Animal with a method speak(self) returning "Generic sound". Define Dog(Animal) overriding speak(self) to return "Woof!". Instantiate d = Dog() and print d.speak().',
      starterCode: '# Define Animal and Dog classes\n',
      testCases: [
        {
          id: 'tc-inh-1',
          input: '',
          expectedOutput: 'Woof!'
        }
      ],
      xpReward: 60
    },
    xpReward: 120,
    nextTopicId: 'py-magic-methods'
  },
  {
    id: 'py-magic-methods',
    title: 'Python Magic Methods (Dunder Methods)',
    slug: 'python-magic-methods',
    category: 'Python OOP',
    categoryId: 'oop',
    level: 'intermediate',
    order: 14,
    estimatedMinutes: 10,
    prerequisites: ['py-inheritance'],
    prevTopicId: 'py-inheritance',
    introduction: 'Harness Python special methods (__str__, __repr__, __len__, __eq__, __add__) for operator overloading and idiomatic object behavior.',
    explanation: `Magic methods (also called **dunder methods** for Double Underscore) allow custom objects to integrate with Python built-in operations (string conversions, length checks, arithmetic operators, comparisons).

### Common Dunder Methods:
- \`__str__(self)\`: User-friendly string representation (\`print(obj)\` or \`str(obj)\`).
- \`__repr__(self)\`: Developer debugging representation.
- \`__len__(self)\`: Returns length when \`len(obj)\` is called.
- \`__eq__(self, other)\`: Overloads the \`==\` equality operator.
- \`__add__(self, other)\`: Overloads the \`+\` addition operator.
- \`__getitem__(self, key)\`: Enables index access \`obj[key]\`.`,
    syntax: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)`,
    codeExamples: [
      {
        title: 'String Representation and Equality',
        code: 'class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\n    def __str__(self):\n        return f"\'{self.title}\' ({self.pages} pages)"\n\n    def __len__(self):\n        return self.pages\n\nb = Book("Apex Guide", 320)\nprint(b)\nprint(len(b))',
        explanation: '__str__ controls print output, and __len__ responds to the len() built-in.',
        output: "'Apex Guide' (320 pages)\n320"
      }
    ],
    practicalExamples: [
      {
        title: 'Operator Overloading (__add__)',
        code: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n\n    def __repr__(self):\n        return f"Point({self.x}, {self.y})"\n\np1 = Point(2, 4)\np2 = Point(3, 1)\nprint(p1 + p2)',
        explanation: '__add__ enables natural "+" arithmetic between custom Point instances.',
        output: 'Point(5, 5)'
      }
    ],
    commonMistakes: [
      {
        mistake: 'def __len__(self):\n    return "5"  # Returns string',
        correction: 'def __len__(self):\n    return 5    # Must return non-negative int',
        explanation: '__len__() must strictly return a non-negative integer.'
      }
    ],
    keyPoints: [
      'Dunder methods start and end with double underscores (e.g. __str__).',
      'They hook custom classes into Python syntax like print(), len(), +, ==, and [].',
      '__repr__ is for developers/debugging; __str__ is for human-readable output.'
    ],
    notes: {
      summary: 'Dunder methods enable operator overloading and natural integration with Python built-ins.',
      keyRules: [
        'Always implement __repr__ as fallback for __str__.',
        '__len__ must return a non-negative integer.',
        '__eq__ should compare attribute values for equality.'
      ],
      cheatsheetMarkdown: `### Dunder Methods Cheat Sheet
- \`__str__\`: Printable text \`str(x)\`
- \`__repr__\`: Dev representation
- \`__len__\`: Length \`len(x)\`
- \`__add__\`: Overload \`x + y\`
- \`__eq__\`: Overload \`x == y\``,
      downloadableMarkdown: `# APEX Python Notes: Magic Methods
- __init__: object initialization
- __str__ / __repr__: string formatting
- __len__: sequence length
- __add__, __sub__, __mul__: operator overloading`
    },
    practiceTasks: [
      {
        id: 'pt-magic-1',
        title: 'Implement __len__',
        instruction: 'Create a Team class with members list. Implement __len__(self) returning len(self.members). Instantiate with ["A", "B", "C"] and print len(team).',
        starterCode: '# Define Team and test len\n',
        solutionCode: 'class Team:\n    def __init__(self, members):\n        self.members = members\n    def __len__(self):\n        return len(self.members)\n\nt = Team(["A", "B", "C"])\nprint(len(t))'
      }
    ],
    quizzes: [
      {
        id: 'q-py-mag-1',
        question: 'Which magic method is called when you use the print() function on an object?',
        options: ['__print__()', '__str__()', '__display__()', '__output__()'],
        correctOptionIndex: 1,
        explanation: 'print() and str() invoke the object\'s __str__() method (falling back to __repr__ if not defined).'
      },
      {
        id: 'q-py-mag-2',
        question: 'Which dunder method overloads the addition (+) operator in Python?',
        options: ['__plus__', '__sum__', '__add__', '__combine__'],
        correctOptionIndex: 2,
        explanation: '__add__(self, other) overloads the "+" operator.'
      },
      {
        id: 'q-py-mag-3',
        question: 'What return type is mandatory for the __len__() method?',
        options: ['float', 'str', 'Non-negative integer', 'bool'],
        correctOptionIndex: 2,
        explanation: 'Python requires __len__() to return a non-negative integer (>= 0).'
      },
      {
        id: 'q-py-mag-4',
        question: 'What is the primary distinction between __str__ and __repr__?',
        options: [
          '__str__ is for informal readable output; __repr__ is unambiguous developer-oriented representation',
          '__str__ is for Python 2, __repr__ is for Python 3',
          '__repr__ only works on integers',
          'They are strictly identical with no difference'
        ],
        correctOptionIndex: 0,
        explanation: '__str__ produces human-friendly strings, while __repr__ produces explicit, unambiguous debug representations.'
      },
      {
        id: 'q-py-mag-5',
        question: 'Which dunder method is called when indexing an object like obj[key]?',
        options: ['__index__', '__getitem__', '__slice__', '__key__'],
        correctOptionIndex: 1,
        explanation: '__getitem__(self, key) handles indexing and key lookups for custom classes.'
      }
    ],
    codingChallenge: {
      id: 'c-py-magic',
      title: 'Cart Price Aggregator',
      slug: 'cart-price-aggregator',
      instruction: 'Define a class CartItem with attributes name and price. Implement __add__(self, other) to return the numerical sum of self.price + other.price. Instantiate i1 = CartItem("Book", 20), i2 = CartItem("Pen", 5), and print i1 + i2.',
      starterCode: '# Define CartItem with __add__\n',
      testCases: [
        {
          id: 'tc-mag-1',
          input: '',
          expectedOutput: '25'
        }
      ],
      xpReward: 60
    },
    xpReward: 120,
    nextTopicId: 'py-file-handling'
  }
]
