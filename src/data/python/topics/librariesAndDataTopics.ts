import type { PythonTopic } from '../types'

export const LIBRARIES_AND_DATA_TOPICS: PythonTopic[] = [
  {
    id: 'py-libraries-numpy',
    title: 'Python NumPy & Vectorized Arrays',
    slug: 'python-numpy-arrays',
    category: 'Data Science & Libraries',
    categoryId: 'libraries',
    level: 'advanced',
    order: 21,
    estimatedMinutes: 10,
    prerequisites: ['py-dsa-searching-sorting'],
    prevTopicId: 'py-dsa-searching-sorting',
    introduction: 'Leverage NumPy ndarrays for high-performance vectorized mathematical operations in C-speed.',
    explanation: `NumPy (Numerical Python) is the foundational package for scientific computing in Python.

### Why NumPy over Standard Python Lists?
- **Speed:** NumPy arrays are stored in contiguous memory blocks with homogeneous types, processed via compiled C routines.
- **Vectorization:** Perform operations across millions of numbers without writing explicit Python \`for\` loops.
- **Multidimensional:** N-dimensional arrays (\`ndarray\`) with matrix algebra, broadcasting, and slicing.`,
    syntax: `import numpy as np

# 1D and 2D Array creation
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Vectorized math (no for loops needed)
doubled = arr * 2`,
    codeExamples: [
      {
        title: 'Vectorized Arithmetic & Aggregations',
        code: 'import numpy as np\n\ndata = np.array([10, 20, 30, 40, 50])\nprint("Mean:", np.mean(data))\nprint("Standard Deviation:", np.std(data))\nprint("Vectorized Multiply:", data * 1.5)',
        explanation: 'NumPy computes statistical summaries in compiled C time.',
        output: 'Mean: 30.0\nStandard Deviation: 14.142135623730951\nVectorized Multiply: [15. 30. 45. 60. 75.]'
      }
    ],
    practicalExamples: [
      {
        title: 'Boolean Masking & Filtering',
        code: 'import numpy as np\n\nscores = np.array([55, 78, 92, 64, 88, 45, 99])\npassed = scores[scores >= 70]\nprint("Passed scores:", passed)',
        explanation: 'Boolean indexing filters arrays with lightning speed.',
        output: 'Passed scores: [78 92 88 99]'
      }
    ],
    commonMistakes: [
      {
        mistake: 'a = [1, 2, 3]\na * 2  # Produces [1, 2, 3, 1, 2, 3]',
        correction: 'import numpy as np\na = np.array([1, 2, 3])\na * 2  # Produces array([2, 4, 6])',
        explanation: 'Multiplying a standard Python list duplicates items; multiplying a NumPy array performs vectorized numerical multiplication.'
      }
    ],
    keyPoints: [
      'NumPy arrays are homogeneous, contiguous memory blocks written in C.',
      'Vectorization replaces Python loops with fast SIMD operations.',
      'Supports multidimensional reshaping, boolean filtering, and linear algebra.'
    ],
    notes: {
      summary: 'NumPy is the backbone of the Python data science and machine learning ecosystem.',
      keyRules: [
        'Array elements must have the same dtype.',
        'Use broadcasting to operate across different array shapes.',
        'Common methods: np.zeros(), np.ones(), np.arange(), np.linspace().'
      ],
      cheatsheetMarkdown: `### NumPy Cheat Sheet
\`\`\`python
import numpy as np
a = np.array([1, 2, 3])
m = np.zeros((3, 3))
mean = np.mean(a)
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: NumPy
- ndarray: N-dimensional array
- Vectorized operations (SIMD)
- Slicing, boolean masking
- Stats: mean(), std(), sum(), max()`
    },
    practiceTasks: [
      {
        id: 'pt-np-1',
        title: 'Compute Array Mean',
        instruction: 'Create a numpy array with [10, 20, 30] and print its mean using np.mean().',
        starterCode: 'import numpy as np\n# Create array and print mean\n',
        solutionCode: 'import numpy as np\na = np.array([10, 20, 30])\nprint(np.mean(a))'
      }
    ],
    quizzes: [
      {
        id: 'q-py-np-1',
        question: 'Why are NumPy arrays significantly faster than standard Python lists for numerical computing?',
        options: [
          'They are compiled dynamically to JavaScript',
          'They store data in contiguous memory with homogeneous data types and execute in compiled C',
          'They compress data into zip files',
          'They run only in GPUs'
        ],
        correctOptionIndex: 1,
        explanation: 'Contiguous C-level memory storage and type homogeneity eliminate Python object pointer overhead.'
      },
      {
        id: 'q-py-np-2',
        question: 'What is the result of np.array([1, 2, 3]) + 5?',
        options: ['[1, 2, 3, 5]', 'array([6, 7, 8])', 'TypeError', 'array([5, 10, 15])'],
        correctOptionIndex: 1,
        explanation: 'Broadcasting adds the scalar 5 to each element in the array.'
      },
      {
        id: 'q-py-np-3',
        question: 'Which NumPy function generates 10 evenly spaced values between 0 and 1?',
        options: ['np.range(0, 1, 10)', 'np.linspace(0, 1, 10)', 'np.step(0, 1, 10)', 'np.split(0, 1, 10)'],
        correctOptionIndex: 1,
        explanation: 'np.linspace(start, stop, num) generates num evenly spaced numbers over the interval.'
      },
      {
        id: 'q-py-np-4',
        question: 'What property returns the dimensions of a NumPy array (e.g. (3, 4))?',
        options: ['arr.dim', 'arr.shape', 'arr.size', 'arr.length'],
        correctOptionIndex: 1,
        explanation: 'arr.shape returns a tuple representing the array dimensions.'
      },
      {
        id: 'q-py-np-5',
        question: 'What does scores[scores > 80] perform on a NumPy array?',
        options: ['Sorts the array', 'Boolean masking / filtering to select only elements greater than 80', 'Replaces elements with 80', 'Deletes the array'],
        correctOptionIndex: 1,
        explanation: 'Boolean indexing filters the array based on the truth value of the condition.'
      }
    ],
    codingChallenge: {
      id: 'c-py-np',
      title: 'NumPy Normalizer',
      slug: 'numpy-normalizer',
      instruction: 'Using numpy, create an array arr = np.array([10, 20, 30, 40, 50]), compute its sum with np.sum(arr), and print "Sum: 150".',
      starterCode: 'import numpy as np\narr = np.array([10, 20, 30, 40, 50])\n# Compute sum and print\n',
      testCases: [
        {
          id: 'tc-np-1',
          input: '',
          expectedOutput: 'Sum: 150'
        }
      ],
      xpReward: 70
    },
    xpReward: 140,
    nextTopicId: 'py-libraries-pandas'
  },
  {
    id: 'py-libraries-pandas',
    title: 'Python Pandas: DataFrames & Analysis',
    slug: 'python-pandas-dataframes',
    category: 'Data Science & Libraries',
    categoryId: 'libraries',
    level: 'advanced',
    order: 22,
    estimatedMinutes: 10,
    prerequisites: ['py-libraries-numpy'],
    prevTopicId: 'py-libraries-numpy',
    introduction: 'Manipulate tabular DataFrames, clean dirty datasets, and execute powerful aggregations with Pandas.',
    explanation: `Pandas is the premier Python library for tabular data manipulation.

### Core Structures:
1. **Series:** 1-dimensional labeled array.
2. **DataFrame:** 2-dimensional labeled tabular data structure with columns of potentially different types.

### Essential Operations:
- \`df.head()\`, \`df.info()\`, \`df.describe()\`
- Filtering: \`df[df["age"] > 21]\`
- Grouping: \`df.groupby("department")["salary"].mean()\`
- Handling nulls: \`df.dropna()\`, \`df.fillna(val)\``,
    syntax: `import pandas as pd

# Creating a DataFrame from a dictionary
df = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie"],
    "Score": [95, 82, 88]
})`,
    codeExamples: [
      {
        title: 'DataFrame Creation & Aggregation',
        code: 'import pandas as pd\n\ndata = {\n    "Product": ["Laptop", "Monitor", "Keyboard", "Mouse"],\n    "Category": ["Hardware", "Hardware", "Accessory", "Accessory"],\n    "Price": [1200, 300, 80, 40]\n}\ndf = pd.DataFrame(data)\nprint("Average Price by Category:")\nprint(df.groupby("Category")["Price"].mean())',
        explanation: 'groupby() aggregates categorical columns with SQL-like power.',
        output: 'Average Price by Category:\nCategory\nAccessory     60.0\nHardware     750.0\nName: Price, dtype: float64'
      }
    ],
    practicalExamples: [
      {
        title: 'Filtering & Adding Computed Columns',
        code: 'import pandas as pd\n\ndf = pd.DataFrame({"Name": ["A", "B"], "Salary": [60000, 90000]})\ndf["Tax"] = df["Salary"] * 0.2\nprint(df[["Name", "Tax"]])',
        explanation: 'Vectorized column addition modifies tables without loops.',
        output: '  Name      Tax\n0    A  12000.0\n1    B  18000.0'
      }
    ],
    commonMistakes: [
      {
        mistake: 'for row in df.iterrows():\n    # Slow loop over rows',
        correction: 'df["new_col"] = df["col_a"] * df["col_b"]  # Vectorized',
        explanation: 'Avoid looping through DataFrame rows; use vectorized column operations.'
      }
    ],
    keyPoints: [
      'DataFrames represent tabular spreadsheets with row and column labels.',
      'Supports reading CSV, Excel, JSON, and SQL directly.',
      'groupby() and aggregations provide relational analytical queries.'
    ],
    notes: {
      summary: 'Pandas provides powerful tools for structured data cleaning, ingestion, and analytics.',
      keyRules: [
        'loc uses label indexing; iloc uses integer position indexing.',
        'Use df.dropna() to remove missing values.',
        'df.to_csv("file.csv") exports tables directly.'
      ],
      cheatsheetMarkdown: `### Pandas Cheat Sheet
\`\`\`python
import pandas as pd
df = pd.read_csv("data.csv")
filtered = df[df["score"] > 80]
mean_val = df["price"].mean()
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Pandas
- Series: 1D labeled array
- DataFrame: 2D table
- Selection: loc (labels), iloc (positions)
- Groupby: df.groupby("col").mean()`
    },
    practiceTasks: [
      {
        id: 'pt-pd-1',
        title: 'Create Simple DataFrame',
        instruction: 'Create a DataFrame with columns "A": [1, 2], "B": [3, 4] and print df.shape.',
        starterCode: 'import pandas as pd\n# Create df and print shape\n',
        solutionCode: 'import pandas as pd\ndf = pd.DataFrame({"A": [1, 2], "B": [3, 4]})\nprint(df.shape)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-pd-1',
        question: 'What is the primary 2-dimensional tabular data structure in Pandas?',
        options: ['Series', 'Matrix', 'DataFrame', 'Panel'],
        correctOptionIndex: 2,
        explanation: 'A DataFrame is the standard 2-dimensional labeled data structure in Pandas.'
      },
      {
        id: 'q-py-pd-2',
        question: 'What is the difference between df.loc and df.iloc in Pandas?',
        options: [
          'loc uses label-based indexing; iloc uses integer position-based indexing',
          'loc is for numbers only; iloc is for strings',
          'loc is deprecated in Pandas 2.0',
          'There is no difference'
        ],
        correctOptionIndex: 0,
        explanation: 'df.loc indexes by row/column names; df.iloc indexes strictly by integer positions (0, 1, 2...).'
      },
      {
        id: 'q-py-pd-3',
        question: 'Which method returns descriptive statistical summaries (count, mean, std, min, max) of a DataFrame?',
        options: ['df.summary()', 'df.describe()', 'df.stats()', 'df.info()'],
        correctOptionIndex: 1,
        explanation: 'df.describe() computes count, mean, std, percentiles, min, and max for numeric columns.'
      },
      {
        id: 'q-py-pd-4',
        question: 'How do you read a CSV file into a Pandas DataFrame?',
        options: ['pd.open_csv("file.csv")', 'pd.read_csv("file.csv")', 'pd.load_csv("file.csv")', 'pd.import_csv("file.csv")'],
        correctOptionIndex: 1,
        explanation: 'pd.read_csv("path.csv") is the standard CSV ingestion function in Pandas.'
      },
      {
        id: 'q-py-pd-5',
        question: 'Which method is used to fill missing (NaN) values in a DataFrame with a substitute value?',
        options: ['df.replace_null()', 'df.fillna(value)', 'df.clean()', 'df.impute()'],
        correctOptionIndex: 1,
        explanation: 'df.fillna(value) replaces all NaN missing values with the provided substitute.'
      }
    ],
    codingChallenge: {
      id: 'c-py-pd',
      title: 'Sales Column Calculator',
      slug: 'sales-column-calculator',
      instruction: 'Create a DataFrame with data = {"Revenue": [100, 200], "Cost": [40, 80]}. Create a column "Profit" = Revenue - Cost, and print the total profit sum using df["Profit"].sum().',
      starterCode: 'import pandas as pd\ndata = {"Revenue": [100, 200], "Cost": [40, 80]}\n# Compute and print total profit\n',
      testCases: [
        {
          id: 'tc-pd-1',
          input: '',
          expectedOutput: '180'
        }
      ],
      xpReward: 70
    },
    xpReward: 140,
    nextTopicId: 'py-matplotlib'
  },
  {
    id: 'py-matplotlib',
    title: 'Python Matplotlib Data Visualization',
    slug: 'python-matplotlib-visualization',
    category: 'Data Science & Libraries',
    categoryId: 'libraries',
    level: 'advanced',
    order: 23,
    estimatedMinutes: 9,
    prerequisites: ['py-libraries-pandas'],
    prevTopicId: 'py-libraries-pandas',
    introduction: 'Render publication-grade charts, subplots, scatter plots, histograms, and bar charts using Matplotlib.',
    explanation: `Matplotlib is the foundational 2D plotting library for Python. Its \`pyplot\` module provides a state-based MATLAB-like plotting interface.

### Common Chart Types:
- **Line Plot (\`plt.plot(x, y)\`):** Trend analysis over continuous dimensions.
- **Scatter Plot (\`plt.scatter(x, y)\`):** Correlation between two variables.
- **Bar Chart (\`plt.bar(categories, values)\`):** Comparing categorical metrics.
- **Histogram (\`plt.hist(data, bins)\`):** Frequency distributions.
- **Pie Chart (\`plt.pie(values, labels)\`):** Proportional breakdowns.`,
    syntax: `import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [10, 25, 40, 55]

plt.plot(x, y, marker="o", color="gold")
plt.title("Growth Trajectory")
plt.xlabel("Month")
plt.ylabel("Active Users")
plt.show()`,
    codeExamples: [
      {
        title: 'Line Plot with Labels and Grid',
        code: 'import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [10, 20, 25, 30, 50]\n# Configure plot attributes\nprint("Plot configured: x=[1..5], y=[10..50], Title=\'APEX Metrics\'")',
        explanation: 'Plots are styled with markers, grid lines, and axis labels.',
        output: "Plot configured: x=[1..5], y=[10..50], Title='APEX Metrics'"
      }
    ],
    practicalExamples: [
      {
        title: 'Subplots Configuration',
        code: 'import matplotlib.pyplot as plt\n\n# fig, (ax1, ax2) = plt.subplots(1, 2)\nprint("Created 1x2 figure canvas with 2 subplots")',
        explanation: 'Subplots arrange multiple charts side-by-side on a single figure.',
        output: 'Created 1x2 figure canvas with 2 subplots'
      }
    ],
    commonMistakes: [
      {
        mistake: 'plt.plot([1, 2], [1, 2, 3])',
        correction: 'plt.plot([1, 2, 3], [10, 20, 30])',
        explanation: 'X and Y dimensions must match in length.'
      }
    ],
    keyPoints: [
      'matplotlib.pyplot provides procedural plotting functions.',
      'Supports markers, colors, line styles, titles, legends, and grid overlays.',
      'plt.savefig("chart.png") exports charts to image files.'
    ],
    notes: {
      summary: 'Matplotlib produces high-resolution data visualizations across multiple formats.',
      keyRules: [
        'Always label your X and Y axes.',
        'Use plt.clf() or plt.close() to clear canvases between figures.',
        'Pair with Seaborn for advanced statistical styling.'
      ],
      cheatsheetMarkdown: `### Matplotlib Cheat Sheet
\`\`\`python
import matplotlib.pyplot as plt
plt.plot(x, y)
plt.title("Title")
plt.xlabel("X")
plt.ylabel("Y")
plt.savefig("plot.png")
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Matplotlib
- plt.plot(): Line plot
- plt.scatter(): Scatter plot
- plt.bar(): Bar chart
- plt.hist(): Histogram
- plt.show(), plt.savefig()`
    },
    practiceTasks: [
      {
        id: 'pt-plt-1',
        title: 'Configure Plot Titles',
        instruction: 'Print "Plot initialized with title: Learning Progress".',
        starterCode: '# Print title confirmation\n',
        solutionCode: 'print("Plot initialized with title: Learning Progress")'
      }
    ],
    quizzes: [
      {
        id: 'q-py-plt-1',
        question: 'Which module in Matplotlib provides the standard MATLAB-style plotting interface?',
        options: ['matplotlib.charts', 'matplotlib.pyplot', 'matplotlib.graph', 'matplotlib.draw'],
        correctOptionIndex: 1,
        explanation: 'matplotlib.pyplot is the standard plotting module.'
      },
      {
        id: 'q-py-plt-2',
        question: 'Which function renders a scatter plot in Matplotlib?',
        options: ['plt.scatter()', 'plt.dots()', 'plt.point_plot()', 'plt.cluster()'],
        correctOptionIndex: 0,
        explanation: 'plt.scatter(x, y) plots individual data points as markers.'
      },
      {
        id: 'q-py-plt-3',
        question: 'How do you save a plotted figure to a PNG file on disk?',
        options: ['plt.save("plot.png")', 'plt.savefig("plot.png")', 'plt.write_image("plot.png")', 'plt.export("plot.png")'],
        correctOptionIndex: 1,
        explanation: 'plt.savefig("filename.png") exports the active figure to disk.'
      },
      {
        id: 'q-py-plt-4',
        question: 'Which function displays the active figure window interactively in the browser/GUI?',
        options: ['plt.render()', 'plt.display()', 'plt.show()', 'plt.view()'],
        correctOptionIndex: 2,
        explanation: 'plt.show() opens the graphical rendering window.'
      },
      {
        id: 'q-py-plt-5',
        question: 'Which function creates a multi-panel subplot grid in Matplotlib?',
        options: ['plt.grid_panels()', 'plt.subplots()', 'plt.canvas_split()', 'plt.divide()'],
        correctOptionIndex: 1,
        explanation: 'plt.subplots(nrows, ncols) returns a figure and an array of axes objects.'
      }
    ],
    codingChallenge: {
      id: 'c-py-plt',
      title: 'Visualization Configurator',
      slug: 'visualization-configurator',
      instruction: 'Write a python script that prints "Chart: Line, Points: 5, Color: Gold".',
      starterCode: '# Output chart configuration string\n',
      testCases: [
        {
          id: 'tc-plt-1',
          input: '',
          expectedOutput: 'Chart: Line, Points: 5, Color: Gold'
        }
      ],
      xpReward: 70
    },
    xpReward: 140,
    nextTopicId: 'py-ml-fundamentals'
  },
  {
    id: 'py-ml-fundamentals',
    title: 'Python Machine Learning Fundamentals',
    slug: 'python-machine-learning-fundamentals',
    category: 'Machine Learning',
    categoryId: 'ml',
    level: 'advanced',
    order: 24,
    estimatedMinutes: 12,
    prerequisites: ['py-matplotlib'],
    prevTopicId: 'py-matplotlib',
    introduction: 'Explore core statistical and predictive Machine Learning concepts: Linear Regression, Train/Test splitting, and Classification.',
    explanation: `Machine Learning (ML) trains mathematical algorithms to discover patterns in historical data and make automated predictions on unseen data.

### 1. Key Terminology:
- **Features ($X$):** Input variables used for prediction.
- **Target ($y$):** The output variable to be predicted.
- **Supervised Learning:** Training with labeled inputs and target outcomes (Regression, Classification).
- **Unsupervised Learning:** Discovering hidden patterns in unlabeled data (Clustering).

### 2. The ML Pipeline:
1. Data collection & preprocessing.
2. Train / Test Split (e.g. 80% train, 20% test).
3. Model training (\`model.fit(X_train, y_train)\`).
4. Evaluation (\`model.predict(X_test)\`, Accuracy, R² Score).`,
    syntax: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)`,
    codeExamples: [
      {
        title: 'Statistical Foundations (Mean, Median, Std)',
        code: 'import numpy as np\n\nspeeds = [86, 87, 88, 86, 87, 85, 86]\nprint("Mean:", np.mean(speeds))\nprint("Median:", np.median(speeds))\nprint("Std Dev:", round(float(np.std(speeds)), 2))',
        explanation: 'Descriptive statistics quantify central tendency and variance.',
        output: 'Mean: 86.42857142857143\nMedian: 86.0\nStd Dev: 0.9'
      }
    ],
    practicalExamples: [
      {
        title: 'Linear Regression Concept',
        code: 'x = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]  # y = 2x\nprint("Relationship: y = 2 * x (Linear Correlation: 1.0)")',
        explanation: 'Linear regression calculates the best-fitting line minimizing squared errors.',
        output: 'Relationship: y = 2 * x (Linear Correlation: 1.0)'
      }
    ],
    commonMistakes: [
      {
        mistake: 'model.fit(X_test, y_test)',
        correction: 'model.fit(X_train, y_train)',
        explanation: 'Always fit models on training data; evaluate on held-out test data to avoid data leakage.'
      }
    ],
    keyPoints: [
      'Supervised learning trains models on labeled input-output pairs.',
      'Train/Test split prevents overfitting and measures real-world generalization.',
      'Regression predicts continuous numbers; Classification predicts discrete categories.'
    ],
    notes: {
      summary: 'Machine Learning builds predictive mathematical models from data.',
      keyRules: [
        'Never evaluate models on the training dataset (data leakage).',
        'Use Scikit-Learn as the standard Python ML framework.',
        'Evaluate regression with RMSE/R2; evaluate classification with Accuracy/F1.'
      ],
      cheatsheetMarkdown: `### ML Workflow
\`\`\`python
# 1. Split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)
# 2. Fit
model.fit(X_tr, y_tr)
# 3. Predict
preds = model.predict(X_te)
\`\`\``,
      downloadableMarkdown: `# APEX Python Notes: Machine Learning
- Features (X) & Target (y)
- Supervised (Regression, Classification) vs Unsupervised (Clustering)
- train_test_split(test_size=0.2)
- model.fit(), model.predict()`
    },
    practiceTasks: [
      {
        id: 'pt-ml-1',
        title: 'Calculate Prediction',
        instruction: 'Given slope = 2 and intercept = 5, calculate predicted y for x = 10 (y = slope * x + intercept) and print result.',
        starterCode: '# Calculate linear prediction\n',
        solutionCode: 'slope = 2\nintercept = 5\nx = 10\nprint(slope * x + intercept)'
      }
    ],
    quizzes: [
      {
        id: 'q-py-ml-1',
        question: 'What is the primary purpose of splitting data into Training and Testing sets in Machine Learning?',
        options: [
          'To make the code run faster',
          'To evaluate how well the model generalizes to new, unseen data and prevent overfitting',
          'To compress the dataset',
          'Because Python requires it'
        ],
        correctOptionIndex: 1,
        explanation: 'Train/test split evaluates generalization performance on unseen data.'
      },
      {
        id: 'q-py-ml-2',
        question: 'What type of ML problem is predicting whether an incoming email is "Spam" or "Not Spam"?',
        options: ['Regression', 'Classification', 'Clustering', 'Dimensionality Reduction'],
        correctOptionIndex: 1,
        explanation: 'Predicting discrete categories is a Classification task.'
      },
      {
        id: 'q-py-ml-3',
        question: 'What type of ML problem is predicting the selling price of a house in dollars?',
        options: ['Regression', 'Classification', 'Clustering', 'Association'],
        correctOptionIndex: 0,
        explanation: 'Predicting a continuous numerical value is a Regression task.'
      },
      {
        id: 'q-py-ml-4',
        question: 'What is the standard Python library used for classical machine learning algorithms?',
        options: ['Django', 'Scikit-Learn (sklearn)', 'Flask', 'Pygame'],
        correctOptionIndex: 1,
        explanation: 'Scikit-Learn (sklearn) is the standard library for classical machine learning in Python.'
      },
      {
        id: 'q-py-ml-5',
        question: 'What does a high training accuracy combined with very low test accuracy indicate?',
        options: ['Underfitting', 'Overfitting (the model memorized the training data)', 'The model is perfect', 'Hardware error'],
        correctOptionIndex: 1,
        explanation: 'Overfitting occurs when a model memorizes training noise and fails to generalize to test data.'
      }
    ],
    codingChallenge: {
      id: 'c-py-ml',
      title: 'Linear Predictor Function',
      slug: 'linear-predictor-function',
      instruction: 'Define a function predict_value(x, slope=3.5, intercept=10.0) that computes and returns slope * x + intercept. Call and print predict_value(4).',
      starterCode: '# Define predict_value\n',
      testCases: [
        {
          id: 'tc-ml-1',
          input: '',
          expectedOutput: '24.0'
        }
      ],
      xpReward: 80
    },
    xpReward: 160
  }
]
