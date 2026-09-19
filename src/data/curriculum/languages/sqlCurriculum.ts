import type { CurriculumCategory, CurriculumTopic } from '../types'

export const SQL_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'sql-basics',
    title: 'Relational Model & DDL',
    description: 'Relational database concepts, tables, schemas, CREATE TABLE, and column constraints.',
    level: 'beginner',
    icon: '🗄️',
    topicIds: ['sql-intro', 'sql-ddl', 'sql-dml']
  },
  {
    id: 'sql-queries',
    title: 'Querying, Filtering & Sorting',
    description: 'SELECT statements, WHERE clause filtering, pattern matching with LIKE, and ORDER BY.',
    level: 'intermediate',
    icon: '🔍',
    topicIds: ['sql-select-filtering', 'sql-aggregates']
  },
  {
    id: 'sql-joins-adv',
    title: 'Relational Joins & Subqueries',
    description: 'Multi-table joins (INNER, LEFT, RIGHT), table aliasing, and complex relational logic.',
    level: 'advanced',
    icon: '🔗',
    topicIds: ['sql-joins']
  }
]

export const SQL_TOPICS: CurriculumTopic[] = [
  {
    id: 'sql-intro',
    language: 'sql',
    title: 'Relational Model & SELECT Statements',
    slug: 'sql-intro',
    category: 'Relational Model & DDL',
    categoryId: 'sql-basics',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 8,
    prerequisites: [],
    introduction: 'SQL (Structured Query Language) is the standard declarative domain-specific language for storing, querying, and managing structured data in Relational Database Management Systems (RDBMS).',
    explanation: `An RDBMS organizes information into 2-dimensional **Tables** (relations) composed of rows (records) and columns (fields/attributes).

### SQL Sublanguages:
1. **DQL (Data Query Language):** \`SELECT\` (retrieves records).
2. **DDL (Data Definition Language):** \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\` (defines table schemas).
3. **DML (Data Manipulation Language):** \`INSERT\`, \`UPDATE\`, \`DELETE\` (modifies rows).
4. **TCL (Transaction Control Language):** \`COMMIT\`, \`ROLLBACK\`, \`SAVEPOINT\`.

### Basic Query Syntax:
\`SELECT column1, column2 FROM table_name;\``,
    syntax: `SELECT name, email, total_xp 
FROM users 
WHERE total_xp > 100 
ORDER BY total_xp DESC;`,
    syntaxBreakdown: `• SELECT : Specifies columns to retrieve (or * for all columns)
• FROM table : Names source database table
• WHERE : Filters records meeting boolean criteria
• ORDER BY : Sorts output ascending (ASC) or descending (DESC)`,
    codeExamples: [
      {
        title: 'Retrieve All Active Users',
        code: `SELECT id, username, total_xp 
FROM users 
ORDER BY total_xp DESC 
LIMIT 5;`,
        explanation: 'Retrieves top 5 users ranked by XP.',
        output: 'id | username | total_xp\nusr_1 | Aria | 2450\nusr_2 | Boopathi | 2380'
      }
    ],
    practicalExamples: [
      {
        title: 'Distinct Value Query',
        code: `SELECT DISTINCT country FROM customers;`,
        explanation: 'Returns unique countries, eliminating duplicate entries.',
        output: 'country\nUSA\nIndia\nGermany'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `SELECT *` indiscriminately in high-volume production queries.',
        correction: 'Explicitly specify only required column names: `SELECT id, username FROM users;`.',
        explanation: '`SELECT *` transfers unnecessary network payload and bypasses column indexing optimizations.'
      }
    ],
    keyPoints: [
      'SQL is declarative: you describe what data you want, not step-by-step loops.',
      'Keywords in SQL are case-insensitive, but uppercase convention is standard.',
      'Semicolons terminate SQL statements.'
    ],
    hint: {
      summary: 'SELECT cols FROM table WHERE cond; DQL for queries, DDL for schemas, DML for data rows.',
      keyRules: [
        'SELECT col1, col2 FROM table;',
        'Use DISTINCT to filter duplicate rows.',
        'ORDER BY col DESC for descending sort.'
      ],
      cheatsheetMarkdown: `\`\`\`sql
SELECT * FROM products;
SELECT name, price FROM products WHERE price > 50;
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-sql-intro-1',
        title: 'Write SELECT Statement',
        instruction: 'Write a query selecting `username` and `xp` from table `learners`.',
        starterCode: `-- Write SQL query here
`,
        solutionCode: `SELECT username, xp FROM learners;`
      }
    ],
    quizzes: [
      {
        id: 'q-sql-intro-1',
        question: 'What does the acronym SQL stand for?',
        options: [
          'Structured Query Language',
          'Standard Quality Language',
          'Sequential Query Logic',
          'Server Query Link'
        ],
        correctOptionIndex: 0,
        explanation: 'SQL stands for Structured Query Language.'
      },
      {
        id: 'q-sql-intro-2',
        question: 'Which SQL sublanguage category includes `CREATE`, `ALTER`, and `DROP` commands?',
        options: ['DDL (Data Definition Language)', 'DML (Data Manipulation Language)', 'DQL', 'TCL'],
        correctOptionIndex: 0,
        explanation: 'DDL manages the structure and schema of database objects.'
      },
      {
        id: 'q-sql-intro-3',
        question: 'Which keyword eliminates duplicate rows from a query result set?',
        options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'FILTER'],
        correctOptionIndex: 1,
        explanation: '`SELECT DISTINCT` filters out duplicate rows.'
      },
      {
        id: 'q-sql-intro-4',
        question: 'What is a Primary Key in a relational database table?',
        options: [
          'A column (or set of columns) that uniquely identifies each row and cannot be NULL',
          'The first column created',
          'An encrypted password',
          'A foreign table link'
        ],
        correctOptionIndex: 0,
        explanation: 'Primary keys enforce row entity uniqueness and forbid NULL values.'
      },
      {
        id: 'q-sql-intro-5',
        question: 'Which clause in SQL sorts the returned query result set?',
        options: ['SORT BY', 'ORDER BY', 'GROUP BY', 'ARRANGE BY'],
        correctOptionIndex: 1,
        explanation: 'ORDER BY specifies column sorting order (ASC or DESC).'
      }
    ],
    codingChallenge: {
      id: 'sql-ch-intro',
      title: 'SQL Select Query Simulation',
      slug: 'sql-select-simulation',
      instruction: 'Output "SQL_QUERY_RECORDS: 100".',
      starterCode: `-- Write your SQL query / solution code here\n`,
      testCases: [
        {
          id: 'tc-sql-intro-1',
          input: '',
          expectedOutput: 'SQL_QUERY_RECORDS: 100'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'sql-ddl'
  },
  {
    id: 'sql-ddl',
    language: 'sql',
    title: 'Data Definition Language (DDL) & Table Constraints',
    slug: 'sql-ddl',
    category: 'Relational Model & DDL',
    categoryId: 'sql-basics',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 10,
    prerequisites: ['sql-intro'],
    introduction: 'DDL commands define and modify the schema structure, data types, and integrity constraints of database tables.',
    explanation: `### Core DDL Commands:
• \`CREATE TABLE table_name (...)\`: Creates a new table schema.
• \`ALTER TABLE table_name ADD column_name data_type\`: Modifies table columns.
• \`DROP TABLE table_name\`: Deletes the table and its data permanently.
• \`TRUNCATE TABLE table_name\`: Rapidly empties all rows while keeping the schema intact.

### Common Column Constraints:
• \`PRIMARY KEY\`: Uniquely identifies each record (implicitly \`UNIQUE\` and \`NOT NULL\`).
• \`NOT NULL\`: Forbids storing null empty values in the column.
• \`UNIQUE\`: Ensures all values in the column are distinct.
• \`CHECK (condition)\`: Enforces boolean validation rules (e.g. \`CHECK (age >= 18)\`).
• \`DEFAULT value\`: Fallback value if none is supplied during insert.`,
    syntax: `CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INT CHECK (age >= 16),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    syntaxBreakdown: `• CREATE TABLE : DDL schema definition command
• PRIMARY KEY : Identity constraint
• VARCHAR(N) : Variable character string with max length N
• CHECK (...) : Integrity validation constraint`,
    codeExamples: [
      {
        title: 'Table Creation with Constraints',
        code: `CREATE TABLE courses (
    course_id VARCHAR(10) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    credits INT DEFAULT 3
);`,
        explanation: 'Creates courses table with primary key and default value.',
        output: 'TABLE CREATED: courses'
      }
    ],
    practicalExamples: [
      {
        title: 'Altering an Existing Schema',
        code: `ALTER TABLE students ADD phone VARCHAR(15);`,
        explanation: 'Adds new column to existing table schema.',
        output: 'TABLE ALTERED: added column phone'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing DROP TABLE with DELETE FROM table.',
        correction: 'Use `DELETE` to remove specific rows; use `DROP` to delete the entire table structure.',
        explanation: '`DROP TABLE` deletes the table schema from the database dictionary.'
      }
    ],
    keyPoints: [
      'DDL commands (CREATE, ALTER, DROP) manage schema structure.',
      'Constraints guarantee database integrity at the storage engine level.',
      'PRIMARY KEY enforces unique, non-null record identification.'
    ],
    hint: {
      summary: 'CREATE TABLE defines schema; constraints include PRIMARY KEY, NOT NULL, UNIQUE, CHECK, DEFAULT.',
      keyRules: [
        'CREATE TABLE name (col TYPE CONSTRAINTS);',
        'ALTER TABLE name ADD col TYPE;',
        'DROP TABLE name removes schema and data.'
      ],
      cheatsheetMarkdown: `\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE
);
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-sql-ddl-1',
        title: 'Create Products Table',
        instruction: 'Write a `CREATE TABLE products (id INT PRIMARY KEY, title VARCHAR(50) NOT NULL);`.',
        starterCode: `-- Write CREATE TABLE statement
`,
        solutionCode: `CREATE TABLE products (
    id INT PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);`
      }
    ],
    quizzes: [
      {
        id: 'q-sql-ddl-1',
        question: 'Which constraint ensures that a column cannot contain duplicate values while allowing NULLs (unlike PRIMARY KEY)?',
        options: ['NOT NULL', 'UNIQUE', 'CHECK', 'FOREIGN KEY'],
        correctOptionIndex: 1,
        explanation: 'UNIQUE permits unique non-duplicate values (and typically one NULL depending on SQL dialect).'
      },
      {
        id: 'q-sql-ddl-2',
        question: 'What command deletes all rows in a table while retaining the table schema structure in the database?',
        options: ['DROP TABLE', 'TRUNCATE TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
        correctOptionIndex: 1,
        explanation: 'TRUNCATE TABLE removes all rows rapidly while preserving the schema.'
      },
      {
        id: 'q-sql-ddl-3',
        question: 'What is the purpose of the `CHECK` constraint in SQL?',
        options: [
          'Enforces a boolean validation rule on column values (e.g. `CHECK (price > 0)`)',
          'Checks network speed',
          'Verifies user password',
          'Backs up the database'
        ],
        correctOptionIndex: 0,
        explanation: 'CHECK constraints reject inserts or updates that violate the specified boolean condition.'
      },
      {
        id: 'q-sql-ddl-4',
        question: 'Which DDL command adds a new column to an existing table?',
        options: ['UPDATE TABLE', 'ALTER TABLE', 'MODIFY SCHEMA', 'INSERT COLUMN'],
        correctOptionIndex: 1,
        explanation: '`ALTER TABLE table_name ADD column_name TYPE` adds columns to existing tables.'
      },
      {
        id: 'q-sql-ddl-5',
        question: 'Can a single SQL table have more than one `PRIMARY KEY` constraint?',
        options: [
          'No, a table can only have one primary key (though it can be a composite key across multiple columns)',
          'Yes, up to 5 primary keys',
          'Unlimited primary keys',
          'Only in MySQL'
        ],
        correctOptionIndex: 0,
        explanation: 'A table has exactly one Primary Key, which may be simple (single column) or composite.'
      }
    ],
    codingChallenge: {
      id: 'sql-ch-ddl',
      title: 'DDL Schema Verifier',
      slug: 'sql-ddl-verifier',
      instruction: 'Output "SCHEMA_CONSTRAINTS_VERIFIED".',
      starterCode: `-- Write your SQL query / solution code here\n`,
      testCases: [
        {
          id: 'tc-sql-ddl-1',
          input: '',
          expectedOutput: 'SCHEMA_CONSTRAINTS_VERIFIED'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'sql-select-filtering'
  },
  {
    id: 'sql-select-filtering',
    language: 'sql',
    title: 'Query Filtering: WHERE, Operators, LIKE & BETWEEN',
    slug: 'sql-select-filtering',
    category: 'Querying, Filtering & Sorting',
    categoryId: 'sql-queries',
    level: 'intermediate',
    order: 3,
    estimatedMinutes: 12,
    prerequisites: ['sql-ddl'],
    introduction: 'The `WHERE` clause filters rows returned by queries using relational operators, pattern matching, and logical expressions.',
    explanation: `### WHERE Filtering Operators:
• Comparison: \`=\`, \`<>\` (or \`!=\`), \`<\`, \`>\`, \`<=\`, \`>=\`.
• Logical: \`AND\`, \`OR\`, \`NOT\`.
• Range: \`BETWEEN min AND max\` (inclusive).
• Set Inclusion: \`IN ('Val1', 'Val2')\`.
• Null Check: \`IS NULL\` and \`IS NOT NULL\` (never use \`= NULL\`).

### Pattern Matching with \`LIKE\`:
• \`%\`: Matches zero or more arbitrary characters (\`'A%'\` matches "Aria", "Apex").
• \`_\`: Matches exactly one single character (\`'U_'\` matches "US", "UK").`,
    syntax: `SELECT name, role, salary 
FROM employees 
WHERE salary BETWEEN 50000 AND 100000 
  AND department IN ('Engineering', 'Design') 
  AND name LIKE 'A%';`,
    syntaxBreakdown: `• WHERE condition : Filters rows before grouping or returning
• BETWEEN a AND b : Inclusive range filter
• IN (...) : Matches any item in list
• LIKE 'A%' : Wildcard prefix matching`,
    codeExamples: [
      {
        title: 'Filtering Active Engineering Users',
        code: `SELECT username, total_xp 
FROM users 
WHERE total_xp >= 1000 
  AND selected_language = 'python' 
ORDER BY total_xp DESC;`,
        explanation: 'Combines multiple WHERE conditions using logical AND.',
        output: 'username | total_xp\nBoopathi | 2380'
      }
    ],
    practicalExamples: [
      {
        title: 'Checking NULL Values',
        code: `SELECT id, name FROM users WHERE last_active_date IS NOT NULL;`,
        explanation: 'Filters records with valid active timestamps.',
        output: 'id | name\nusr_1 | Aria\nusr_2 | Boopathi'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Checking for null with `= NULL` (e.g. `WHERE email = NULL`).',
        correction: 'Always use `WHERE email IS NULL` (or `IS NOT NULL`).',
        explanation: 'In SQL three-valued logic, `NULL = NULL` evaluates to `UNKNOWN` (falsy).'
      }
    ],
    keyPoints: [
      'WHERE filters rows before result assembly.',
      'Use IS NULL / IS NOT NULL to test missing data.',
      'LIKE with % and _ enables substring pattern matching.'
    ],
    hint: {
      summary: 'WHERE filters rows; use AND/OR/NOT, BETWEEN a AND b, IN (...), LIKE "%a", IS NULL.',
      keyRules: [
        'Always use IS NULL (not = NULL).',
        'LIKE "%term%" for contains.',
        'BETWEEN is inclusive of boundaries.'
      ],
      cheatsheetMarkdown: `\`\`\`sql
SELECT * FROM users WHERE age >= 18 AND status = 'ACTIVE';
SELECT * FROM logs WHERE code IN (400, 404, 500);
SELECT * FROM users WHERE name LIKE 'A%';
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-sql-fil-1',
        title: 'Filter by Role',
        instruction: 'Write query: `SELECT * FROM members WHERE score > 80 AND role = "ADMIN";`.',
        starterCode: `-- Write filtered query
`,
        solutionCode: `SELECT * FROM members WHERE score > 80 AND role = 'ADMIN';`
      }
    ],
    quizzes: [
      {
        id: 'q-sql-fil-1',
        question: 'How do you check for missing/empty values in a column `phone` in SQL?',
        options: ['WHERE phone IS NULL', 'WHERE phone = NULL', 'WHERE phone == null', 'WHERE phone is empty'],
        correctOptionIndex: 0,
        explanation: '`IS NULL` is the only standard SQL expression to test for null values.'
      },
      {
        id: 'q-sql-fil-2',
        question: 'What does `WHERE name LIKE \'J%_n\'` match in SQL?',
        options: [
          'Any name starting with \'J\' and ending with \'n\' with at least 1 character in between',
          'Only exact name "J%_n"',
          'Any name with length 2',
          'Names containing percentages'
        ],
        correctOptionIndex: 0,
        explanation: '% matches zero or more characters; _ matches exactly 1 character.'
      },
      {
        id: 'q-sql-fil-3',
        question: 'Is the range in `WHERE age BETWEEN 20 AND 30` inclusive of 20 and 30?',
        options: [
          'Yes, both boundary values 20 and 30 are included (equivalent to age >= 20 AND age <= 30)',
          'No, 20 and 30 are excluded',
          'Only 20 is included',
          'Only 30 is included'
        ],
        correctOptionIndex: 0,
        explanation: 'SQL BETWEEN is inclusive on both lower and upper endpoints.'
      },
      {
        id: 'q-sql-fil-4',
        question: 'Which operator matches a value against a comma-separated list of items?',
        options: ['IN', 'CONTAINS', 'WITHIN', 'MATCH'],
        correctOptionIndex: 0,
        explanation: '`IN (\'A\', \'B\', \'C\')` checks membership in a list.'
      },
      {
        id: 'q-sql-fil-5',
        question: 'What does the logical operator `NOT` do in a `WHERE` clause?',
        options: [
          'Inverts the boolean truth value of a condition',
          'Deletes matching rows',
          'Sets values to null',
          'Halts query execution'
        ],
        correctOptionIndex: 0,
        explanation: 'NOT negates boolean evaluation.'
      }
    ],
    codingChallenge: {
      id: 'sql-ch-select-filtering',
      title: 'Filtered Result Counter',
      slug: 'sql-filtered-counter',
      instruction: 'Output "FILTERED_RECORDS: 42".',
      starterCode: `-- Write your SQL query / solution code here\n`,
      testCases: [
        {
          id: 'tc-sql-fil-1',
          input: '',
          expectedOutput: 'FILTERED_RECORDS: 42'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'sql-aggregates'
  },
  {
    id: 'sql-aggregates',
    language: 'sql',
    title: 'Aggregate Functions & GROUP BY / HAVING',
    slug: 'sql-aggregates',
    category: 'Querying, Filtering & Sorting',
    categoryId: 'sql-queries',
    level: 'intermediate',
    order: 4,
    estimatedMinutes: 12,
    prerequisites: ['sql-select-filtering'],
    introduction: 'Aggregate functions summarize multiple row values into a single metric, while `GROUP BY` partitions rows into categorized summary buckets.',
    explanation: `### Standard Aggregate Functions:
• \`COUNT(*)\`: Total row count.
• \`COUNT(column)\`: Count of non-null values in column.
• \`SUM(column)\`: Total arithmetic sum of numeric column.
• \`AVG(column)\`: Arithmetic average mean.
• \`MIN(column)\` & \`MAX(column)\`: Minimum and maximum values.

### GROUP BY & HAVING:
• \`GROUP BY category\`: Groups rows sharing common values.
• \`HAVING condition\`: Filters aggregated groups (unlike \`WHERE\`, which filters individual rows *before* aggregation).`,
    syntax: `SELECT department, COUNT(*) AS total_staff, AVG(salary) AS avg_sal 
FROM employees 
WHERE active = 1 
GROUP BY department 
HAVING COUNT(*) >= 5 
ORDER BY avg_sal DESC;`,
    syntaxBreakdown: `• COUNT(*) / AVG() : Aggregate summarizer functions
• AS alias : Renames result column header
• GROUP BY : Collapses rows by category key
• HAVING : Filters groups after aggregation`,
    codeExamples: [
      {
        title: 'Grouped XP Summary by Language',
        code: `SELECT selected_language, COUNT(*) AS users_count, AVG(total_xp) AS avg_xp 
FROM users 
GROUP BY selected_language 
HAVING COUNT(*) > 10;`,
        explanation: 'Calculates active learner count and average score per language track.',
        output: 'selected_language | users_count | avg_xp\npython | 45 | 1850.5\njava | 22 | 1420.0'
      }
    ],
    practicalExamples: [
      {
        title: 'Min / Max Price Calculation',
        code: `SELECT MIN(price) AS lowest, MAX(price) AS highest FROM products;`,
        explanation: 'Finds boundary price points.',
        output: 'lowest | highest\n9.99 | 499.00'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using aggregate functions inside a WHERE clause: `WHERE AVG(score) > 80`.',
        correction: 'Use the `HAVING` clause to filter by aggregate calculations: `HAVING AVG(score) > 80`.',
        explanation: 'WHERE executes before aggregation occurs; HAVING executes after aggregation.'
      }
    ],
    keyPoints: [
      'Aggregate functions collapse multiple rows into single summary metrics.',
      'WHERE filters rows before aggregation; HAVING filters groups after aggregation.',
      'Every non-aggregated column in the SELECT list must appear in the GROUP BY clause.'
    ],
    hint: {
      summary: 'COUNT, SUM, AVG, MIN, MAX summarize data; GROUP BY groups; HAVING filters aggregate groups.',
      keyRules: [
        'WHERE filters rows; HAVING filters aggregates.',
        'COUNT(*) counts all rows; COUNT(col) ignores NULLs.',
        'Columns in SELECT must be in GROUP BY or inside an aggregate.'
      ],
      cheatsheetMarkdown: `\`\`\`sql
SELECT category, COUNT(*), AVG(price)
FROM items
GROUP BY category
HAVING COUNT(*) > 3;
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-sql-agg-1',
        title: 'Count Users by Role',
        instruction: 'Write `SELECT role, COUNT(*) FROM accounts GROUP BY role;`.',
        starterCode: `-- Write GROUP BY query
`,
        solutionCode: `SELECT role, COUNT(*) FROM accounts GROUP BY role;`
      }
    ],
    quizzes: [
      {
        id: 'q-sql-agg-1',
        question: 'What is the critical difference between the `WHERE` clause and the `HAVING` clause in SQL?',
        options: [
          '`WHERE` filters individual rows before grouping/aggregation; `HAVING` filters aggregated groups after `GROUP BY`',
          '`WHERE` is for numbers only',
          '`HAVING` is faster than `WHERE`',
          'They are identical'
        ],
        correctOptionIndex: 0,
        explanation: 'WHERE filters pre-aggregation rows; HAVING filters post-aggregation group metrics.'
      },
      {
        id: 'q-sql-agg-2',
        question: 'What is the difference between `COUNT(*)` and `COUNT(column_name)`?',
        options: [
          '`COUNT(*)` counts all rows including nulls; `COUNT(column_name)` counts only non-null values in that column',
          '`COUNT(*)` only counts numbers',
          '`COUNT(column_name)` is deprecated',
          'There is no difference'
        ],
        correctOptionIndex: 0,
        explanation: 'COUNT(col) ignores null entries; COUNT(*) counts all table rows.'
      },
      {
        id: 'q-sql-agg-3',
        question: 'Which aggregate function calculates the mathematical average of a numeric column?',
        options: ['AVERAGE()', 'AVG()', 'MEAN()', 'SUM_DIV()'],
        correctOptionIndex: 1,
        explanation: 'AVG() computes the arithmetic mean.'
      },
      {
        id: 'q-sql-agg-4',
        question: 'If `SELECT dept, AVG(salary) FROM emp` is executed without a `GROUP BY dept` clause, what happens in standard SQL?',
        options: [
          'Causes a syntax/semantic error because `dept` is non-aggregated without a GROUP BY',
          'Groups automatically',
          'Calculates sum',
          'Deletes dept column'
        ],
        correctOptionIndex: 0,
        explanation: 'Non-aggregated columns in SELECT must be listed in GROUP BY.'
      },
      {
        id: 'q-sql-agg-5',
        question: 'Which keyword creates a temporary alias label for an aggregate expression column header in the result set?',
        options: ['AS (e.g. `COUNT(*) AS total`)', 'NAME', 'LABEL', 'TO'],
        correctOptionIndex: 0,
        explanation: '`AS alias_name` renames the output column header.'
      }
    ],
    codingChallenge: {
      id: 'sql-ch-aggregates',
      title: 'Aggregate Summary Counter',
      slug: 'sql-aggregate-counter',
      instruction: 'Output "TOTAL_USER_COUNT: 100".',
      starterCode: `-- Write your SQL query / solution code here\n`,
      testCases: [
        {
          id: 'tc-sql-agg-1',
          input: '',
          expectedOutput: 'TOTAL_USER_COUNT: 100'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'sql-joins'
  },
  {
    id: 'sql-joins',
    language: 'sql',
    title: 'Relational Joins: INNER, LEFT, RIGHT & Table Aliases',
    slug: 'sql-joins',
    category: 'Relational Joins & Subqueries',
    categoryId: 'sql-joins-adv',
    level: 'advanced',
    order: 5,
    estimatedMinutes: 14,
    prerequisites: ['sql-aggregates'],
    introduction: 'JOIN clauses combine columns from two or more tables based on a related common key column.',
    explanation: `### Primary Join Types:
• **\`INNER JOIN\`**: Returns only rows with matching values in both tables.
• **\`LEFT JOIN\` (LEFT OUTER JOIN)**: Returns ALL rows from the left table, plus matched rows from the right table (unmatched right columns are populated with \`NULL\`).
• **\`RIGHT JOIN\` (RIGHT OUTER JOIN)**: Returns ALL rows from the right table, plus matched rows from the left table.
• **\`FULL OUTER JOIN\`**: Returns all records when there is a match in either left or right table.

### Table Aliases:
Assign short shorthand prefixes (e.g. \`FROM users u JOIN orders o ON u.id = o.user_id\`).`,
    syntax: `SELECT u.username, o.order_id, o.amount 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id 
WHERE o.status = 'COMPLETED';`,
    syntaxBreakdown: `• FROM tableA aliasA : Left table declaration
• INNER JOIN tableB aliasB : Right table attachment
• ON a.key = b.foreign_key : Join predicate condition linking tables`,
    codeExamples: [
      {
        title: 'Inner Join Between Users and Progress',
        code: `SELECT u.username, p.language, p.overall_skill_score 
FROM users u 
INNER JOIN user_language_progress p ON u.id = p.user_id 
ORDER BY p.overall_skill_score DESC;`,
        explanation: 'Combines user profile details with skill score metrics.',
        output: 'username | language | overall_skill_score\nAria | python | 95\nBoopathi | python | 92'
      }
    ],
    practicalExamples: [
      {
        title: 'Left Join to Include Inactive Users',
        code: `SELECT u.username, o.order_id 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;`,
        explanation: 'Preserves all users even if they have zero orders (order_id will be NULL).',
        output: 'username | order_id\nAria | ORD_101\nGuest | NULL'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting the `ON` join predicate condition (causing an unintentional Cartesian product / CROSS JOIN).',
        correction: 'Always specify the joining keys: `JOIN orders o ON u.id = o.user_id`.',
        explanation: 'Missing join predicates multiplies every row of Table A by every row of Table B ($N \\times M$).'
      }
    ],
    keyPoints: [
      'INNER JOIN returns only matching intersections.',
      'LEFT JOIN keeps all left rows, filling missing right data with NULL.',
      'Always specify explicit ON join predicates.'
    ],
    hint: {
      summary: 'INNER JOIN returns matches only; LEFT JOIN keeps all left rows; link keys with ON a.id = b.a_id.',
      keyRules: [
        'INNER JOIN for exact matches.',
        'LEFT JOIN to preserve left table records.',
        'Use table aliases (u, o) for readability.'
      ],
      cheatsheetMarkdown: `\`\`\`sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-sql-join-1',
        title: 'Write Inner Join',
        instruction: 'Write query joining `customers c` and `orders o` on `c.id = o.cust_id`.',
        starterCode: `-- Write INNER JOIN query
`,
        solutionCode: `SELECT c.name, o.id 
FROM customers c 
INNER JOIN orders o ON c.id = o.cust_id;`
      }
    ],
    quizzes: [
      {
        id: 'q-sql-join-1',
        question: 'Which JOIN returns all records from the left table and matched records from the right table?',
        options: ['INNER JOIN', 'LEFT JOIN (LEFT OUTER JOIN)', 'RIGHT JOIN', 'CROSS JOIN'],
        correctOptionIndex: 1,
        explanation: 'LEFT JOIN preserves all rows from the left table, filling unmatched right columns with NULL.'
      },
      {
        id: 'q-sql-join-2',
        question: 'What happens if an `INNER JOIN` is executed and a row in the left table has no matching foreign key in the right table?',
        options: [
          'That row is excluded from the final query result set',
          'The right columns show NULL',
          'The query throws an error',
          'The table is deleted'
        ],
        correctOptionIndex: 0,
        explanation: 'INNER JOIN strictly outputs rows with verified matches in both tables.'
      },
      {
        id: 'q-sql-join-3',
        question: 'What is the purpose of the `ON` clause in an SQL JOIN statement?',
        options: [
          'It defines the join condition linking foreign key columns between the tables',
          'It turns on the database server',
          'It orders the columns',
          'It groups the data'
        ],
        correctOptionIndex: 0,
        explanation: 'The ON clause specifies the equality condition pairing records from both relations.'
      },
      {
        id: 'q-sql-join-4',
        question: 'What is a "Cartesian Product" (CROSS JOIN) in SQL?',
        options: [
          'Every row of Table A combined with every row of Table B ($N \\times M$ rows)',
          'An empty result set',
          'A sum of integers',
          'A table backup'
        ],
        correctOptionIndex: 0,
        explanation: 'A CROSS JOIN pairs each row of table A with all rows of table B.'
      },
      {
        id: 'q-sql-join-5',
        question: 'Why are table aliases (e.g. `FROM customers c`) useful in SQL queries?',
        options: [
          'Provides concise prefix notation (`c.name`, `o.id`) improving query readability and qualifying column origins',
          'Encrypts table names',
          'Allows table deletion',
          'Accelerates hard drives'
        ],
        correctOptionIndex: 0,
        explanation: 'Aliases clarify column ambiguity when multiple tables have identically named columns.'
      }
    ],
    codingChallenge: {
      id: 'sql-ch-joins',
      title: 'Relational Join Simulator',
      slug: 'sql-join-simulator',
      instruction: 'Output "RELATIONAL_JOIN_VERIFIED: 100%".',
      starterCode: `-- Write your SQL query / solution code here\n`,
      testCases: [
        {
          id: 'tc-sql-join-1',
          input: '',
          expectedOutput: 'RELATIONAL_JOIN_VERIFIED: 100%'
        }
      ],
      xpReward: 50
    },
    xpReward: 50
  }
]
