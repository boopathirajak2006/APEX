import type { CareerFieldId, QuizQuestion } from '../../src/types'

export interface FieldTestExam {
  fieldId: CareerFieldId
  title: string
  topics: string[]
  questions: QuizQuestion[]
}

export const FIELD_TESTS_BANK: Record<CareerFieldId, FieldTestExam> = {
  data_analytics: {
    fieldId: 'data_analytics',
    title: 'Data Analytics Field Competency Exam',
    topics: ['Excel Modeling', 'SQL Architecture', 'Python & Pandas', 'Business Statistics', 'Data Visualization', 'Power BI & Dashboards'],
    questions: [
      {
        id: 'ft-da-01',
        question: 'Which SQL Window function assigns a unique sequential integer to rows within a partition starting at 1?',
        options: ['RANK()', 'ROW_NUMBER()', 'DENSE_RANK()', 'NTILE()'],
        correctOptionIndex: 1,
        explanation: 'ROW_NUMBER() guarantees unique sequential numbers without ties.'
      },
      {
        id: 'ft-da-02',
        question: 'In Pandas, what is the most efficient way to compute the grouped mean of multiple columns?',
        options: ['Using a for loop over rows', 'df.groupby("category")[["sales", "profit"]].mean()', 'Iterating with iterrows()', 'df.apply(lambda)'],
        correctOptionIndex: 1,
        explanation: 'Vectorized groupby operations in Pandas run in compiled C/Cython for maximum throughput.'
      },
      {
        id: 'ft-da-03',
        question: 'What is the primary danger of using a Pearson correlation coefficient on non-linear data?',
        options: [
          'It will crash the script',
          'It measures only linear relationships and can report near-zero correlation even when a strong non-linear relationship exists',
          'It returns negative numbers only',
          'It requires binary data'
        ],
        correctOptionIndex: 1,
        explanation: 'Pearson correlation only captures linear covariance; non-linear curves (e.g. parabolas) require Spearman or non-linear metrics.'
      },
      {
        id: 'ft-da-04',
        question: 'In Power BI data modeling, why is a Star Schema generally preferred over a deeply nested Snowflake Schema?',
        options: [
          'It uses fewer table files',
          'It simplifies DAX calculations, minimizes table joins, and optimizes VertiPaq in-memory engine query performance',
          'It is required by Microsoft',
          'It prevents data duplication entirely'
        ],
        correctOptionIndex: 1,
        explanation: 'Star Schemas provide the fastest aggregation performance in column-store engines.'
      },
      {
        id: 'ft-da-05',
        question: 'When analyzing customer churn, why is standard Classification Accuracy a dangerous metric if 98% of users do not churn?',
        options: [
          'Because a naive model predicting "Nobody Churns" achieves 98% accuracy while catching zero churners',
          'Accuracy is illegal to report in finance',
          'Churn data is always corrupted',
          'Accuracy only works on continuous numbers'
        ],
        correctOptionIndex: 0,
        explanation: 'The accuracy paradox on imbalanced datasets hides the failure of the model to detect the rare positive class.'
      }
    ]
  },
  web_dev: {
    fieldId: 'web_dev',
    title: 'Full-Stack Web Engineering Competency Exam',
    topics: ['Frontend Architecture', 'TypeScript & State', 'Node.js & APIs', 'Database Design', 'Web Security (OWASP)', 'Performance & CI/CD'],
    questions: [
      {
        id: 'ft-wd-01',
        question: 'What causes "prop drilling" in React, and what is the standard architectural remedy for global application state?',
        options: [
          'Using too many CSS files; fix by using inline styles',
          'Passing state down through deeply nested components that do not need it; fix using Context API, Zustand, or Redux',
          'Rendering lists without keys; fix by using index',
          'Using arrow functions in render'
        ],
        correctOptionIndex: 1,
        explanation: 'Global state managers or React Context allow deeply nested child components to consume state directly.'
      },
      {
        id: 'ft-wd-02',
        question: 'How does the JavaScript Event Loop handle Promise microtasks versus setTimeout macrotasks?',
        options: [
          'setTimeout callbacks run before all microtasks',
          'The microtask queue is completely drained after the current synchronous stack finishes and before the next macrotask is dequeued',
          'They run concurrently on multiple CPU cores',
          'Promises are converted to threads'
        ],
        correctOptionIndex: 1,
        explanation: 'Microtasks (Promises, queueMicrotask) have priority and run immediately after the current call stack clears.'
      },
      {
        id: 'ft-wd-03',
        question: 'Which HTTP response header prevents clickjacking attacks by forbidding the page from being rendered inside an <iframe>?',
        options: ['X-Frame-Options: DENY (or Content-Security-Policy frame-ancestors)', 'Access-Control-Allow-Origin', 'Strict-Transport-Security', 'Cache-Control'],
        correctOptionIndex: 0,
        explanation: 'X-Frame-Options: DENY and CSP frame-ancestors \'none\' prevent unauthorized frame embedding.'
      },
      {
        id: 'ft-wd-04',
        question: 'In PostgreSQL / SQLite, what is the N+1 query problem in ORMs and how is it resolved?',
        options: [
          'A calculation bug; resolved by rebooting',
          'Executing 1 query to fetch parent records and N separate queries for child records; resolved via eager loading (JOINs / preloading)',
          'Adding 1 extra column to every table',
          'A memory leak in JavaScript'
        ],
        correctOptionIndex: 1,
        explanation: 'Eager loading with JOINs fetches related data in a single round-trip query.'
      }
    ]
  },
  ai_ml: {
    fieldId: 'ai_ml',
    title: 'AI & Machine Learning Competency Exam',
    topics: ['Mathematics & Optimization', 'Classical ML', 'Deep Learning & PyTorch', 'Computer Vision & NLP', 'LLMs & RAG Architectures'],
    questions: [
      {
        id: 'ft-ai-01',
        question: 'What is the primary difference between L1 Regularization (Lasso) and L2 Regularization (Ridge)?',
        options: [
          'L1 penalizes sum of squared weights, L2 penalizes absolute weights',
          'L1 penalizes absolute weights and induces sparsity (feature selection), while L2 penalizes squared weights and shrinks coefficients evenly',
          'L1 is only for trees, L2 is for neural nets',
          'They are mathematically identical'
        ],
        correctOptionIndex: 1,
        explanation: 'L1 regularization produces sparse feature weights with exact zeros.'
      },
      {
        id: 'ft-ai-02',
        question: 'In Transformer architectures, what is the mathematical formula for Scaled Dot-Product Attention?',
        options: [
          'Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V',
          'Attention(Q, K, V) = Q * K * V',
          'Attention(Q, K, V) = sigmoid(Q + K) * V',
          'Attention(Q, K, V) = norm(Q - K) * V'
        ],
        correctOptionIndex: 0,
        explanation: 'The scaled dot product divides by sqrt(d_k) to prevent vanishing gradients in the softmax.'
      },
      {
        id: 'ft-ai-03',
        question: 'When implementing a vector search retrieval pipeline (RAG), what metric is standard for measuring embedding proximity?',
        options: ['Cosine Similarity / Dot Product', 'Euclidean Manhattan Index', 'Dice Loss', 'Chi-Square'],
        correctOptionIndex: 0,
        explanation: 'Cosine similarity measures angular alignment between normalized embedding vectors.'
      }
    ]
  },
  cyber_security: {
    fieldId: 'cyber_security',
    title: 'Cyber Security & Defensive Architecture Exam',
    topics: ['Network Protocols', 'System Hardening', 'OWASP Top 10', 'Penetration Testing', 'Incident Response (SOC)'],
    questions: [
      {
        id: 'ft-cs-01',
        question: 'What is the security risk of storing sensitive JWT session tokens in browser localStorage instead of HttpOnly cookies?',
        options: [
          'localStorage has a 5MB limit',
          'Any Cross-Site Scripting (XSS) vulnerability allows malicious scripts to access and exfiltrate localStorage tokens',
          'Cookies are faster to read',
          'localStorage requires HTTPS'
        ],
        correctOptionIndex: 1,
        explanation: 'HttpOnly cookies cannot be read by client-side JavaScript, protecting tokens from XSS theft.'
      },
      {
        id: 'ft-cs-02',
        question: 'In Zero Trust architecture, what is the foundational operational principle?',
        options: [
          'Trust everyone inside the corporate VPN',
          'Never Trust, Always Verify: Explicitly authenticate and authorize every request based on all available data points',
          'Disable all firewalls',
          'Use single-factor passwords'
        ],
        correctOptionIndex: 1,
        explanation: 'Zero Trust assumes breach and verifies identity, device health, and context on every interaction.'
      }
    ]
  },
  cloud: {
    fieldId: 'cloud',
    title: 'Cloud Infrastructure & SRE Competency Exam',
    topics: ['Cloud Architecture', 'Containers & Kubernetes', 'Infrastructure as Code', 'CI/CD Pipelines', 'Observability & SRE'],
    questions: [
      {
        id: 'ft-cld-01',
        question: 'What is the difference between a Blue/Green deployment and a Canary deployment?',
        options: [
          'Blue/Green switches 100% traffic between identical environments; Canary routes a small percentage (e.g. 5%) of traffic to test new versions gradually',
          'Blue/Green is only for databases',
          'Canary requires two cloud providers',
          'There is no difference'
        ],
        correctOptionIndex: 0,
        explanation: 'Canary deployments expose updates to small user subsets before full rollout.'
      },
      {
        id: 'ft-cld-02',
        question: 'Why should Kubernetes Pods define both "liveness" and "readiness" probes with different configurations?',
        options: [
          'To consume more CPU',
          'Liveness probes restart crashed/deadlocked containers; Readiness probes remove unhealthy containers from receiving traffic until ready',
          'Liveness is for frontend, Readiness is for backend',
          'They are interchangeable'
        ],
        correctOptionIndex: 1,
        explanation: 'Readiness prevents sending traffic to initializing services without unnecessarily killing them.'
      }
    ]
  },
  ui_ux: {
    fieldId: 'ui_ux',
    title: 'UI/UX Product Design Competency Exam',
    topics: ['User Research', 'Information Architecture', 'Design Systems', 'Figma Prototyping', 'Usability & Accessibility (WCAG)'],
    questions: [
      {
        id: 'ft-ux-01',
        question: 'What is Fitts\'s Law in interaction design, and how does it influence UI button placement?',
        options: [
          'The time to acquire a target depends on distance to and size of the target; actionable buttons should be adequately large and placed within easy reach',
          'Colors should always be pastel',
          'Text must never exceed 10 words',
          'Images should be square'
        ],
        correctOptionIndex: 0,
        explanation: 'Fitts\'s Law dictates that larger, closer targets are faster and easier for users to click/tap.'
      },
      {
        id: 'ft-ux-02',
        question: 'What is the difference between Skeuomorphism and Flat/Neo-brutalist design paradigms?',
        options: [
          'Skeuomorphism mimics real-world physical textures (leather, metallic bevels); Flat design emphasizes digital-first minimalist typography and solid shapes',
          'Flat design uses 3D models',
          'Skeuomorphism was invented in 2024',
          'There is no visual difference'
        ],
        correctOptionIndex: 0,
        explanation: 'Skeuomorphic interfaces simulate physical material properties, whereas flat design uses minimal 2D abstractions.'
      }
    ]
  },
  data_science: {
    fieldId: 'data_science',
    title: 'Data Science & Statistical Modeling Exam',
    topics: ['Statistical Inference', 'Predictive Pipelines', 'Experimentation & A/B Testing', 'Big Data (Spark)', 'Executive Communication'],
    questions: [
      {
        id: 'ft-ds-01',
        question: 'What is the variance-bias tradeoff in statistical learning?',
        options: [
          'High bias leads to underfitting (oversimplified models); high variance leads to overfitting (capturing noise); optimal models minimize the sum of both',
          'Variance is only measured on test data',
          'Bias means the data was collected illegally',
          'Models should always maximize variance'
        ],
        correctOptionIndex: 0,
        explanation: 'Balancing bias (model rigidity) and variance (sensitivity to training fluctuations) optimizes generalization.'
      },
      {
        id: 'ft-ds-02',
        question: 'Why is A/B test "peeking" (checking p-values continuously and stopping early when significant) statistically invalid without corrections?',
        options: [
          'It inflates Type I False Positive error rates dramatically beyond the nominal 5% alpha threshold',
          'It makes the database slower',
          'It changes user behavior',
          'It violates privacy laws'
        ],
        correctOptionIndex: 0,
        explanation: 'Repeated testing on accumulating data inflates false positive rates unless using sequential testing bounds.'
      }
    ]
  }
}
