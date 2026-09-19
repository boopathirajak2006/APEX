import type { PythonTopic } from '../types'

export const DSA_TOPICS: PythonTopic[] = [
  {
    id: 'py-dsa-arrays',
    title: 'Python DSA: Lists, Arrays & Big-O',
    slug: 'python-dsa-arrays',
    category: 'Data Structures & Algorithms',
    categoryId: 'dsa',
    level: 'advanced',
    order: 18,
    estimatedMinutes: 11,
    prerequisites: ['py-json-modules'],
    prevTopicId: 'py-json-modules',
    introduction: 'Analyze algorithmic complexity with Big-O notation and understand Python dynamic array memory allocation.',
    explanation: `In computer science, data structures organize data efficiently, and algorithms solve computational problems step-by-step.

### Big-O Complexity Overview:
- \`O(1)\` (Constant Time): Direct array index access \`arr[i]\`, dict lookup.
- \`O(log n)\` (Logarithmic): Binary search on sorted data.
- \`O(n)\` (Linear Time): Iterating across all $n$ elements.
- \`O(n log n)\` (Linearithmic): Merge Sort, Timsort (Python's built-in \`.sort()\`).
- \`O(n^2)\` (Quadratic): Nested loops (Bubble Sort).

### Python Lists as Dynamic Arrays:
Python lists are contiguous arrays of references that dynamically over-allocate capacity to provide amortized $O(1)$ append performance.`,
    syntax: `# Big-O Examples
x = items[0]          # O(1)
if target in items:   # O(n) linear search
items.sort()          # O(n log n) Timsort`,
    codeExamples: [
      {
        title: 'Two-Pointer Technique',
        code: 'def two_sum_sorted(numbers, target):\n    left, right = 0, len(numbers) - 1\n    while left < right:\n        current_sum = numbers[left] + numbers[right]\n        if current_sum == target:\n            return (left, right)\n        elif current_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return None\n\nres = two_sum_sorted([2, 7, 11, 15], 9)\nprint(f"Indices: {res}")',
        explanation: 'Two-pointer on sorted array achieves O(n) time and O(1) space.',
        output: 'Indices: (0, 1)'
      }
    ],
    practicalExamples: [
      {
        title: 'Prefix Sum Array',
        code: 'nums = [1, 2, 3, 4, 5]\nprefix = [0] * (len(nums) + 1)\nfor i in range(len(nums)):\n    prefix[i + 1] = prefix[i] + nums[i]\nprint(f"Prefix sums: {prefix}")',
        explanation: 'Prefix sums enable O(1) range sum queries.',
        output: 'Prefix sums: [0, 1, 3, 6, 10, 15]'
      }
    ],
    commonMistakes: [
      {
        mistake: 'for item in my_list:\n    my_list.insert(0, item)',
        correction: 'from collections import deque\nq = deque()\nq.appendleft(item)',
        explanation: 'list.insert(0, item) is O(n) because all elements must shift. Use collections.deque for O(1) prepends.'
      }
    ],
    keyPoints: [
      'Big-O measures how execution time or memory scales with input size n.',
      'Python list index lookup is O(1); search (in) is O(n).',
      'Two-pointer and sliding-window techniques optimize array algorithms.'
    ],
    notes: {
      summary: 'Understanding Big-O complexity is critical for high-performance software engineering.',
      keyRules: [
        'list.append() is amortized O(1).',
        'list.pop(0) is O(n); list.pop() is O(1).',
        'Python uses Timsort for sorted() with O(n log n) worst-case time.'
      ],
      cheatsheetMarkdown: `### Big-O Cheat Sheet
- \`arr[i]\`: $O(1)$
- \`arr.append(x)\`: $O(1)$
- \`x in list\`: $O(n)$
- \`x in set/dict\`: $O(1)$
- \`sorted(arr)\`: $O(n \\log n)$`,
      downloadableMarkdown: `# APEX Python Notes: DSA & Big-O
- O(1): Constant
- O(log n): Binary search
- O(n): Linear scan
- O(n log n): Efficient sort (Timsort)
- O(n^2): Quadratic nested loops`
    },
    practiceTasks: [
      {
        id: 'pt-dsa-1',
        title: 'Find Maximum Element',
        instruction: 'Write a function find_max(nums) that iterates through a list and returns the largest value. Print find_max([12, 45, 7, 89, 23]).',
        starterCode: '# Define find_max\n',
        solutionCode: 'def find_max(nums):\n    m = nums[0]\n    for n in nums:\n        if n > m:\n            m = n\n    return m\n\nprint(find_max([12, 45, 7, 89, 23]))'
      }
    ],
    quizzes: [
      {
        id: 'q-py-dsa-1',
        question: 'What is the time complexity of accessing an element by index in a Python list (e.g. arr[5])?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
        correctOptionIndex: 1,
        explanation: 'Array index access calculates the memory offset in constant O(1) time.'
      },
      {
        id: 'q-py-dsa-2',
        question: 'What sorting algorithm does Python\'s built-in sorted() and list.sort() use?',
        options: ['Quicksort', 'Heapsort', 'Timsort (hybrid Merge/Insertion sort)', 'Bubblesort'],
        correctOptionIndex: 2,
        explanation: 'Python uses Timsort, an adaptive, stable hybrid sorting algorithm designed by Tim Peters.'
      },
      {
        id: 'q-py-dsa-3',
        question: 'What is the worst-case time complexity of searching for an element in an unsorted list of size n?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n!)'],
        correctOptionIndex: 1,
        explanation: 'Searching an unsorted list requires checking every element in the worst case, giving O(n) linear time.'
      },
      {
        id: 'q-py-dsa-4',
        question: 'Why is list.pop(0) an O(n) operation in Python?',
        options: [
          'Because Python has to delete the memory block',
          'Because all subsequent elements in the contiguous array must be shifted left by one position',
          'Because it converts to a set',
          'It is actually O(1)'
        ],
        correctOptionIndex: 1,
        explanation: 'Removing the first item requires shifting all remaining n-1 elements left in contiguous memory.'
      },
      {
        id: 'q-py-dsa-5',
        question: 'Which data structure offers O(1) average time complexity for membership testing ("x in collection")?',
        options: ['list', 'tuple', 'set', 'linked list'],
        correctOptionIndex: 2,
        explanation: 'Sets and Dictionaries use hash tables providing O(1) average lookup time.'
      }
    ],
    codingChallenge: {
      id: 'c-py-dsa-arr',
      title: 'Running Sum Calculator',
      slug: 'running-sum-calculator',
      instruction: 'Define a function running_sum(nums) that transforms a list [1, 2, 3, 4] into running cumulative sums [1, 3, 6, 10] and print the result for [2, 4, 6].',
      starterCode: '# Define running_sum and print result\n',
      testCases: [
        {
          id: 'tc-dsa-1',
          input: '',
          expectedOutput: '[2, 6, 12]'
        }
      ],
      xpReward: 70
    },
    xpReward: 140,
    nextTopicId: 'py-dsa-stacks-queues'
  },
  {
    id: 'py-dsa-stacks-queues',
    title: 'Python DSA: Stacks & Queues',
    slug: 'python-dsa-stacks-queues',
    category: 'Data Structures & Algorithms',
    categoryId: 'dsa',
    level: 'advanced',
    order: 19,
    estimatedMinutes: 10,
    prerequisites: ['py-dsa-arrays'],
    prevTopicId: 'py-dsa-arrays',
    introduction: 'Implement Last-In-First-Out (LIFO) Stacks and First-In-First-Out (FIFO) Queues using lists and collections.deque.',
    explanation: `Stacks and Queues are sequential abstract data types:

### 1. Stack (LIFO - Last In, First Out)
- **Operations:** \`push\` (append), \`pop\` (remove last), \`peek\` (view last).
- **Use Cases:** Undo/redo systems, call stacks, syntax parsing (balanced brackets).

### 2. Queue (FIFO - First In, First Out)
- **Operations:** \`enqueue\` (append), \`dequeue\` (popleft).
- **Use Cases:** Task scheduling, breadth-first search (BFS), buffering.

In Python, use \`collections.deque\` (double-ended queue) for guaranteed $O(1)$ pushes and pops on both ends.`,
    syntax: `from collections import deque

# Stack
stack = []
stack.append(10)
top = stack.pop()

# Queue
q = deque()
q.append("Task A")
first = q.popleft()`,
    codeExamples: [
      {
        title: 'Balanced Parentheses with Stack',
        code: 'def is_valid_parentheses(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n    return len(stack) == 0\n\nprint(is_valid_parentheses("{[()]}"))\nprint(is_valid_parentheses("{[(])}"))',
        explanation: 'Stack verifies balanced opening and closing bracket pairs.',
        output: 'True\nFalse'
      }
    ],
    practicalExamples: [
      {
        title: 'Task Queue Processing with Deque',
        code: 'from collections import deque\n\ntasks = deque(["Process Logs", "Send Email", "Update DB"])\nwhile tasks:\n    current = tasks.popleft()\n    print(f"Executed: {current}")',
        explanation: 'popleft() removes tasks in FIFO order in O(1) time.',
        output: 'Executed: Process Logs\nExecuted: Send Email\nExecuted: Update DB'
      }
    ],
    commonMistakes: [
      {
        mistake: 'q = []\nq.pop(0) # Inefficient queue',
        correction: 'from collections import deque\nq = deque()\nq.popleft()',
        explanation: 'list.pop(0) is O(n). collections.deque.popleft() is O(1).'
      }
    ],
    keyPoints: [
      'Stack is LIFO (Last-In-First-Out); Queue is FIFO (First-In-First-Out).',
      'Use standard list append()/pop() for Stack.',
      'Use collections.deque for Queue with O(1) popleft().'
    ],
    notes: {
      summary: 'Stacks and Queues manage ordered task execution and state history.',
      keyRules: [
        'Deque provides thread-safe, memory efficient O(1) appends and pops.',
        'Peek top of stack using stack[-1].',
        'Check empty state with len(stack) == 0 or not stack.'
      ],
      cheatsheetMarkdown: `### Stack & Queue
\`\`\`python
from collections import deque

# Stack (LIFO)
s = []
s.append(1)
s.pop()

# Queue (FIFO)
q = deque()
q.append(1)
q.popleft()
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Stacks & Queues
- Stack: LIFO (append, pop)
- Queue: FIFO (append, popleft via deque)
- Applications: Bracket validation, undo history, BFS`
    },
    practiceTasks: [
      {
        id: 'pt-sq-1',
        title: 'Implement Stack Push and Pop',
        instruction: 'Push values 10, 20, 30 into a list stack, pop the top value, and print the remaining stack.',
        starterCode: '# Stack operations\n',
        solutionCode: 's = []\ns.append(10)\ns.append(20)\ns.append(30)\ns.pop()\nprint(s)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-sq-1',
        question: 'Which ordering principle describes a Stack data structure?',
        options: ['FIFO (First-In-First-Out)', 'LIFO (Last-In-First-Out)', 'Random access', 'Priority order'],
        correctOptionIndex: 1,
        explanation: 'A stack operates on LIFO (Last-In-First-Out) ordering.'
      },
      {
        id: 'q-py-sq-2',
        question: 'Which Python standard library module provides an optimized double-ended queue with O(1) pops at both ends?',
        options: ['queue.Stack', 'collections.deque', 'itertools.chain', 'sys.queue'],
        correctOptionIndex: 1,
        explanation: 'collections.deque is designed for O(1) appends and pops from both ends.'
      },
      {
        id: 'q-py-sq-3',
        question: 'What is the time complexity of deque.popleft() in Python?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
        correctOptionIndex: 1,
        explanation: 'deque is implemented as a doubly linked list of blocks, providing O(1) popleft operations.'
      },
      {
        id: 'q-py-sq-4',
        question: 'Which classic algorithmic problem is solved using a Stack?',
        options: ['Dijkstra\'s shortest path', 'Validating balanced parentheses and bracket syntax', 'Bubble sort', 'Binary search'],
        correctOptionIndex: 1,
        explanation: 'Validating nested, balanced parentheses is a classic stack application.'
      },
      {
        id: 'q-py-sq-5',
        question: 'What is the result of stack = [1, 2, 3]; stack.pop(); stack.append(4); print(stack[-1])?',
        options: ['3', '2', '4', '1'],
        correctOptionIndex: 2,
        explanation: 'After popping 3 and appending 4, the top of the stack is 4.'
      }
    ],
    codingChallenge: {
      id: 'c-py-sq',
      title: 'String Reversal via Stack',
      slug: 'string-reversal-via-stack',
      instruction: 'Define a function reverse_with_stack(text) that pushes characters onto a list stack and pops them to return the reversed string. Print reverse_with_stack("APEX").',
      starterCode: '# Define reverse_with_stack\n',
      testCases: [
        {
          id: 'tc-sq-1',
          input: '',
          expectedOutput: 'XEPA'
        }
      ],
      xpReward: 70
    },
    xpReward: 140,
    nextTopicId: 'py-dsa-searching-sorting'
  },
  {
    id: 'py-dsa-searching-sorting',
    title: 'Python DSA: Searching & Sorting Algorithms',
    slug: 'python-dsa-searching-sorting',
    category: 'Data Structures & Algorithms',
    categoryId: 'dsa',
    level: 'advanced',
    order: 20,
    estimatedMinutes: 11,
    prerequisites: ['py-dsa-stacks-queues'],
    prevTopicId: 'py-dsa-stacks-queues',
    introduction: 'Master Binary Search, Merge Sort, and Quick Sort algorithms with clean step-by-step recursive implementations.',
    explanation: `Searching and sorting are foundational computational operations:

### 1. Binary Search (\`O(log n)\`)
Finds a target in a **sorted array** by repeatedly dividing the search space in half.

### 2. Merge Sort (\`O(n log n)\`)
Divide-and-conquer algorithm that splits the array into halves, recursively sorts them, and merges sorted sub-arrays.

### 3. Quick Sort (\`O(n log n)\` average)
Selects a pivot, partitions elements into smaller and larger subsets, and recursively sorts partitions.`,
    syntax: `# Binary Search Algorithm
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    codeExamples: [
      {
        title: 'Binary Search Implementation',
        code: 'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23]\nidx = binary_search(primes, 13)\nprint(f"Found 13 at index: {idx}")',
        explanation: 'Binary search locates 13 in only 3 comparisons on this 9-element array.',
        output: 'Found 13 at index: 5'
      },
      {
        title: 'Recursive Merge Sort',
        code: 'def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    merged = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            merged.append(left[i]); i += 1\n        else:\n            merged.append(right[j]); j += 1\n    merged.extend(left[i:])\n    merged.extend(right[j:])\n    return merged\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))',
        explanation: 'Merge sort guarantees O(n log n) sorting performance.',
        output: '[3, 9, 10, 27, 38, 43, 82]'
      }
    ],
    practicalExamples: [
      {
        title: 'Bisect Module in Python',
        code: 'import bisect\n\ngrades = [60, 70, 80, 90]\nindex = bisect.bisect_left(grades, 80)\nprint(f"Insertion index: {index}")',
        explanation: 'The built-in bisect module provides fast binary search primitives.',
        output: 'Insertion index: 2'
      }
    ],
    commonMistakes: [
      {
        mistake: 'binary_search(unsorted_list, 10)',
        correction: 'binary_search(sorted(unsorted_list), 10)',
        explanation: 'Binary search strictly requires the input sequence to be sorted beforehand.'
      }
    ],
    keyPoints: [
      'Binary search achieves O(log n) time by halving search intervals.',
      'Merge sort divides array into halves and merges in O(n log n) time.',
      'Quick sort partitions around a pivot with O(n log n) average time.'
    ],
    notes: {
      summary: 'Binary search and divide-and-conquer sorting form core algorithmic building blocks.',
      keyRules: [
        'Always sort arrays before binary search.',
        'Merge sort uses O(n) extra space.',
        'Use the built-in bisect module for production binary search.'
      ],
      cheatsheetMarkdown: `### Search & Sort Cheat Sheet
- Binary Search: $O(\\log n)$
- Merge Sort: $O(n \\log n)$ guaranteed
- Quick Sort: $O(n \\log n)$ average
- Built-in \`bisect.bisect_left(arr, x)\``,
      downloadableMarkdown: `# APEX Python Notes: Searching & Sorting
- Binary Search: low <= high, mid = (low+high)//2
- Divide and conquer: Merge Sort
- Partitioning: Quick Sort`
    },
    practiceTasks: [
      {
        id: 'pt-sort-1',
        title: 'Binary Search Implementation',
        instruction: 'Run binary search for target = 7 on arr = [1, 3, 5, 7, 9] and print the found index.',
        starterCode: 'arr = [1, 3, 5, 7, 9]\n# Find index of 7\n',
        solutionCode: 'arr = [1, 3, 5, 7, 9]\ndef bs(a, t):\n    l, r = 0, len(a) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if a[m] == t: return m\n        elif a[m] < t: l = m + 1\n        else: r = m - 1\n    return -1\nprint(bs(arr, 7))'
      }
    ],
    quizzes: [
      {
        id: 'q-py-sort-1',
        question: 'What is the precondition for executing Binary Search on an array?',
        options: ['The array must have only even numbers', 'The array must be sorted', 'The array must have length < 100', 'The array must be a tuple'],
        correctOptionIndex: 1,
        explanation: 'Binary Search requires the array to be sorted in order to determine which half to eliminate.'
      },
      {
        id: 'q-py-sort-2',
        question: 'What is the time complexity of Binary Search on a list of size n?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
        correctOptionIndex: 2,
        explanation: 'Binary Search halves the search space at each step, giving O(log n) logarithmic complexity.'
      },
      {
        id: 'q-py-sort-3',
        question: 'What is the worst-case time complexity of Merge Sort?',
        options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'],
        correctOptionIndex: 1,
        explanation: 'Merge Sort guarantees O(n log n) time complexity in worst, average, and best cases.'
      },
      {
        id: 'q-py-sort-4',
        question: 'How many comparisons does Binary Search take at most to search a list of 1,000,000 elements?',
        options: ['~20 comparisons', '~1,000,000 comparisons', '~500,000 comparisons', '~1,000 comparisons'],
        correctOptionIndex: 0,
        explanation: 'log2(1,000,000) is approximately 20 comparisons.'
      },
      {
        id: 'q-py-sort-5',
        question: 'Which Python standard library module provides binary search and insertion utilities?',
        options: ['bisect', 'search', 'itertools', 'operator'],
        correctOptionIndex: 0,
        explanation: 'The "bisect" module provides bisection algorithms for sorted lists.'
      }
    ],
    codingChallenge: {
      id: 'c-py-dsa-sort',
      title: 'Target Locator',
      slug: 'target-locator',
      instruction: 'Define binary_search(arr, target) that returns the index of target in sorted arr, or -1 if absent. Call and print binary_search([10, 20, 30, 40, 50], 40).',
      starterCode: '# Define binary_search and test\n',
      testCases: [
        {
          id: 'tc-sort-1',
          input: '',
          expectedOutput: '3'
        }
      ],
      xpReward: 70
    },
    xpReward: 140,
    nextTopicId: 'py-libraries-numpy'
  }
]
