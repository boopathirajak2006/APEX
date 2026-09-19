import type { CurriculumCategory, CurriculumTopic } from '../types'

export const HTML_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'html-basics',
    title: 'HTML Structure & Semantics',
    description: 'Document anatomy, heading hierarchies, paragraphs, and semantic layout tags.',
    level: 'beginner',
    icon: '🌐',
    topicIds: ['html-intro', 'html-semantic', 'html-lists-tables']
  },
  {
    id: 'html-multimedia',
    title: 'Links, Media & Embedded Content',
    description: 'Hyperlink anchors, responsive images, audio, and video embeds.',
    level: 'beginner',
    icon: '🖼️',
    topicIds: ['html-links-media']
  },
  {
    id: 'html-interactive',
    title: 'Web Forms, Accessibility & SEO',
    description: 'Interactive forms, input validation, meta tags, and WCAG accessibility standards.',
    level: 'intermediate',
    icon: '📝',
    topicIds: ['html-forms', 'html-accessibility-meta']
  }
]

export const HTML_TOPICS: CurriculumTopic[] = [
  {
    id: 'html-intro',
    language: 'html',
    title: 'HTML Document Anatomy & Headings',
    slug: 'html-intro',
    category: 'HTML Structure & Semantics',
    categoryId: 'html-basics',
    level: 'beginner',
    order: 1,
    estimatedMinutes: 8,
    prerequisites: [],
    introduction: 'HTML (HyperText Markup Language) is the standard structural markup language for creating web documents rendered by web browsers worldwide.',
    explanation: `An HTML document is constructed using nested tags that define headings, text blocks, attributes, and page metadata.

### Essential Document Skeleton:
1. **\`<!DOCTYPE html>\`**: Declares that the document follows modern HTML5 standards.
2. **\`<html lang="en">\`**: The root element of the entire web page.
3. **\`<head>\`**: Contains non-rendered metadata, title tags, stylesheet links, and viewport settings.
4. **\`<body>\`**: Contains all visible content rendered on screen.
5. **Headings (\`<h1>\` through \`<h6>\`):** Establish content hierarchy (there should only be one \`<h1>\` per page).`,
    syntax: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>APEX Web App</title>
</head>
<body>
    <h1>Welcome to APEX</h1>
    <p>Building the modern web.</p>
</body>
</html>`,
    syntaxBreakdown: `• <!DOCTYPE html> : Standard HTML5 document declaration
• <meta charset="UTF-8"> : UTF-8 character encoding support
• <title> : Browser tab title
• <h1> : Primary page heading (highest SEO importance)
• <p> : Standard text paragraph container`,
    codeExamples: [
      {
        title: 'Basic Web Page Structure',
        code: `<!DOCTYPE html>
<html>
<head>
    <title>APEX Platform</title>
</head>
<body>
    <h1>Developer Dashboard</h1>
    <p>Your skill journey begins here.</p>
</body>
</html>`,
        explanation: 'Minimal compliant HTML5 document with title, primary heading, and paragraph.',
        output: 'Developer Dashboard\nYour skill journey begins here.'
      }
    ],
    practicalExamples: [
      {
        title: 'Article Header Structure',
        code: `<article>
    <h1>Modern Web Architecture</h1>
    <h2>Component-Driven UI</h2>
    <p>Vanilla CSS and semantic markup maximize performance.</p>
</article>`,
        explanation: 'Hierarchy nesting h1 and h2 headings inside an article.',
        output: 'Modern Web Architecture\nComponent-Driven UI\nVanilla CSS and semantic markup maximize performance.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using multiple <h1> tags on a single web page.',
        correction: 'Use exactly one `<h1>` per page for the main page title, and `<h2>`-`<h6>` for sub-sections.',
        explanation: 'Multiple `<h1>` elements hurt SEO search indexing and screen reader navigation.'
      },
      {
        mistake: 'Omitting the `<!DOCTYPE html>` declaration.',
        correction: 'Always place `<!DOCTYPE html>` as line 1 of your HTML file.',
        explanation: 'Without DOCTYPE, browsers fall into quirks mode and render CSS inconsistently.'
      }
    ],
    keyPoints: [
      'HTML defines document structure and semantics, not styling.',
      'Always include <!DOCTYPE html> and <meta charset="UTF-8">.',
      'Use a single <h1> per page for semantic SEO hierarchy.'
    ],
    hint: {
      summary: '<!DOCTYPE html> declares HTML5; <h1> through <h6> define heading importance; <p> defines paragraphs.',
      keyRules: [
        'Line 1: <!DOCTYPE html>',
        'One <h1> per page.',
        'Tags must be properly closed.'
      ],
      cheatsheetMarkdown: `\`\`\`html
<!DOCTYPE html>
<html>
  <head><title>Page</title></head>
  <body><h1>Title</h1><p>Text</p></body>
</html>
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-html-intro-1',
        title: 'Create Heading and Paragraph',
        instruction: 'Write an HTML snippet with an `<h1>APEX</h1>` and `<p>Online Learning</p>`.',
        starterCode: `<!-- Write your HTML elements here -->
`,
        solutionCode: `<h1>APEX</h1>
<p>Online Learning</p>`
      }
    ],
    quizzes: [
      {
        id: 'q-html-intro-1',
        question: 'What does the `<!DOCTYPE html>` declaration at the beginning of a document signify?',
        options: [
          'It instructs the browser to parse the document as standard modern HTML5',
          'It links a CSS stylesheet',
          'It loads JavaScript runtime',
          'It creates a database connection'
        ],
        correctOptionIndex: 0,
        explanation: '<!DOCTYPE html> tells browsers to render in standard HTML5 mode.'
      },
      {
        id: 'q-html-intro-2',
        question: 'Which heading tag represents the highest level of structural importance in HTML?',
        options: ['<h6>', '<h1>', '<head>', '<header>'],
        correctOptionIndex: 1,
        explanation: '<h1> is the primary top-level heading in HTML document hierarchy.'
      },
      {
        id: 'q-html-intro-3',
        question: 'Where should document metadata like `<meta charset="UTF-8">` and `<title>` be placed?',
        options: ['Inside the <body> tag', 'Inside the <head> tag', 'After the </html> tag', 'Inside <main>'],
        correctOptionIndex: 1,
        explanation: 'The <head> section houses document metadata, title, and external resource links.'
      },
      {
        id: 'q-html-intro-4',
        question: 'What is the recommended number of `<h1>` tags on a single web page for best SEO practices?',
        options: ['Exactly 1', 'As many as possible', 'At least 5', 'None'],
        correctOptionIndex: 0,
        explanation: 'Search engines and accessibility readers expect a single primary <h1> per page.'
      },
      {
        id: 'q-html-intro-5',
        question: 'Which tag creates a standard body text paragraph in HTML?',
        options: ['<para>', '<text>', '<p>', '<t>'],
        correctOptionIndex: 2,
        explanation: '<p> is the standard paragraph element.'
      }
    ],
    codingChallenge: {
      id: 'html-ch-intro',
      title: 'HTML Page Structure',
      slug: 'html-page-structure',
      instruction: 'Create an `<h1>APEX Core</h1>` followed by `<p>System Ready</p>`. Print the total number of characters in the tags (output 37).',
      starterCode: `<!-- Write your HTML / solution code here -->\n`,
      testCases: [
        {
          id: 'tc-html-intro-1',
          input: '',
          expectedOutput: '37'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'html-semantic'
  },
  {
    id: 'html-semantic',
    language: 'html',
    title: 'HTML5 Semantic Layout: header, nav, main, article',
    slug: 'html-semantic',
    category: 'HTML Structure & Semantics',
    categoryId: 'html-basics',
    level: 'beginner',
    order: 2,
    estimatedMinutes: 10,
    prerequisites: ['html-intro'],
    introduction: 'Semantic HTML introduces meaningful tags that clearly describe their purpose to browsers, developers, screen readers, and search engines.',
    explanation: `Instead of generic \`<div>\` elements everywhere, HTML5 provides structural semantic tags:
• **\`<header>\`**: Introductory container holding logos, titles, or navigation.
• **\`<nav>\`**: Section holding primary site navigation links.
• **\`<main>\`**: The unique dominant central content of the document (only one per page).
• **\`<article>\`**: Standalone, independently distributable content (e.g. blog post, card, news item).
• **\`<section>\`**: Thematic grouping of content, typically with a heading.
• **\`<aside>\`**: Indirectly related content (e.g. sidebars, callouts).
• **\`<footer>\`**: Closing section holding copyright, credits, and footer links.`,
    syntax: `<header>
    <h1>Site Logo</h1>
    <nav><a href="/home">Home</a></nav>
</header>
<main>
    <article>
        <h2>Blog Title</h2>
        <p>Post body content...</p>
    </article>
</main>
<footer>&copy; 2026 APEX</footer>`,
    syntaxBreakdown: `• <header> / <footer> : Top and bottom landmarks
• <nav> : Accessible navigation landmark
• <main> : Unique primary content landmark
• <article> : Self-contained reusable composition`,
    codeExamples: [
      {
        title: 'Semantic Web Page Layout',
        code: `<header>
    <h1>APEX Portal</h1>
    <nav><a href="#courses">Courses</a></nav>
</header>
<main>
    <section>
        <h2>Available Tracks</h2>
        <p>Learn Python, C, Rust and more.</p>
    </section>
</main>
<footer>&copy; 2026 APEX Education</footer>`,
        explanation: 'Demonstrates clean HTML5 landmark structure.',
        output: 'APEX Portal\nCourses\nAvailable Tracks\nLearn Python, C, Rust and more.\n© 2026 APEX Education'
      }
    ],
    practicalExamples: [
      {
        title: 'Feed Card Article',
        code: `<article>
    <header>
        <h3>Release v2.0 Live</h3>
        <time datetime="2026-09-18">Sept 18, 2026</time>
    </header>
    <p>New multi-language curriculum now active.</p>
</article>`,
        explanation: 'Self-contained article card with inner header and time elements.',
        output: 'Release v2.0 Live\nSept 18, 2026\nNew multi-language curriculum now active.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using generic <div> for everything instead of semantic tags.',
        correction: 'Use `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>` for layout landmarks.',
        explanation: 'Semantic elements provide essential accessibility trees for screen readers.'
      }
    ],
    keyPoints: [
      'Semantic tags convey meaning and structure to search engines and accessibility tools.',
      'Only one <main> element should exist per document.',
      '<article> is for self-contained syndicatable content; <section> is for thematic groups.'
    ],
    hint: {
      summary: 'Use <header>, <nav>, <main>, <article>, <section>, <footer> instead of unstyled <div> containers.',
      keyRules: [
        'One <main> per document.',
        '<article> is independent & reusable.',
        '<nav> for primary navigation links.'
      ],
      cheatsheetMarkdown: `\`\`\`html
<header><nav>...</nav></header>
<main><article>...</article></main>
<footer>...</footer>
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-html-sem-1',
        title: 'Construct Semantic Layout',
        instruction: 'Write a semantic HTML snippet with a `<main>` enclosing an `<article>` with an `<h2>` and `<p>`.',
        starterCode: `<!-- Write semantic markup here -->
`,
        solutionCode: `<main>
    <article>
        <h2>Topic Title</h2>
        <p>Article body content.</p>
    </article>
</main>`
      }
    ],
    quizzes: [
      {
        id: 'q-html-sem-1',
        question: 'Which HTML5 semantic tag represents self-contained, independently distributable content like a blog post?',
        options: ['<section>', '<article>', '<div>', '<aside>'],
        correctOptionIndex: 1,
        explanation: '<article> is designated for standalone, syndicatable content.'
      },
      {
        id: 'q-html-sem-2',
        question: 'How many `<main>` elements should be rendered per HTML page?',
        options: ['Exactly 1', 'As many as needed', 'One per section', 'Zero'],
        correctOptionIndex: 0,
        explanation: 'Only one visible <main> landmark should exist per document.'
      },
      {
        id: 'q-html-sem-3',
        question: 'Which tag should contain primary website navigation links?',
        options: ['<links>', '<menu>', '<nav>', '<header>'],
        correctOptionIndex: 2,
        explanation: '<nav> is the designated element for navigation links.'
      },
      {
        id: 'q-html-sem-4',
        question: 'Which semantic element is best suited for related sidebar content or callout quotes?',
        options: ['<aside>', '<sidebar>', '<corner>', '<note>'],
        correctOptionIndex: 0,
        explanation: '<aside> represents content tangentially related to the surrounding content.'
      },
      {
        id: 'q-html-sem-5',
        question: 'What is the primary benefit of using semantic HTML tags over generic `<div>` tags?',
        options: [
          'Improves accessibility for screen readers and SEO indexing for search engines',
          'Makes the webpage render faster in CSS',
          'Enables WebGL 3D graphics',
          'Compresses the HTML payload'
        ],
        correctOptionIndex: 0,
        explanation: 'Semantic markup builds rich accessibility trees and clear SEO hierarchies.'
      }
    ],
    codingChallenge: {
      id: 'html-ch-semantic',
      title: 'Semantic Landmark Verification',
      slug: 'html-semantic-landmarks',
      instruction: 'Output the number of core semantic layout tags introduced in HTML5: header, nav, main, article, section, aside, footer (7). Output 7.',
      starterCode: `<!-- Write your HTML / solution code here -->\n`,
      testCases: [
        {
          id: 'tc-html-sem-1',
          input: '',
          expectedOutput: '7'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'html-lists-tables'
  },
  {
    id: 'html-lists-tables',
    language: 'html',
    title: 'Lists, Structured Tables & Data Representation',
    slug: 'html-lists-tables',
    category: 'HTML Structure & Semantics',
    categoryId: 'html-basics',
    level: 'beginner',
    order: 3,
    estimatedMinutes: 10,
    prerequisites: ['html-semantic'],
    introduction: 'Lists organize items sequentially or as bullet points, while tables present multi-dimensional structured data in rows and columns.',
    explanation: `### Lists in HTML:
• **Unordered Lists (\`<ul>\`):** Bulleted list of items (\`<li>\`).
• **Ordered Lists (\`<ol>\`):** Numbered sequence of items (\`<li>\`).

### Structured Tables in HTML:
• \`<table>\`: Container element.
• \`<thead>\`: Header grouping containing column titles.
• \`<tbody>\`: Body grouping containing data records.
• \`<tr>\`: Table Row.
• \`<th>\`: Table Header cell (bold and centered by default).
• \`<td>\`: Table Data cell.`,
    syntax: `<table>
    <thead>
        <tr>
            <th>Language</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Python</td>
            <td>Dynamic</td>
        </tr>
    </tbody>
</table>`,
    syntaxBreakdown: `• <ul> / <ol> : List container types
• <li> : List item element
• <table> / <thead> / <tbody> : Structural table containers
• <tr> : Row container
• <th> / <td> : Header vs standard data cells`,
    codeExamples: [
      {
        title: 'Ordered List and Data Table',
        code: `<ol>
    <li>Step 1: Learn Syntax</li>
    <li>Step 2: Solve Challenges</li>
</ol>

<table>
    <tr><th>ID</th><th>User</th></tr>
    <tr><td>101</td><td>Cipher</td></tr>
</table>`,
        explanation: 'Renders numbered steps and a 2-column data table.',
        output: '1. Step 1: Learn Syntax\n2. Step 2: Solve Challenges\nID | User\n101 | Cipher'
      }
    ],
    practicalExamples: [
      {
        title: 'Server Leaderboard Table',
        code: `<table>
    <thead>
        <tr><th>Rank</th><th>Agent</th><th>Score</th></tr>
    </thead>
    <tbody>
        <tr><td>#1</td><td>Aria</td><td>2450 XP</td></tr>
        <tr><td>#2</td><td>Boopathi</td><td>2380 XP</td></tr>
    </tbody>
</table>`,
        explanation: 'Leaderboard formatted with semantic thead/tbody table structure.',
        output: 'Rank | Agent | Score\n#1 | Aria | 2450 XP\n#2 | Boopathi | 2380 XP'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using tables for entire page layout styling.',
        correction: 'Use CSS Flexbox/Grid for layout; reserve `<table>` strictly for tabular data.',
        explanation: 'Table layouts are non-responsive and harm accessibility.'
      }
    ],
    keyPoints: [
      '<ul> for bulleted lists, <ol> for numbered ordered lists.',
      'Always structure tables with <thead>, <tbody>, <tr>, <th>, and <td>.',
      'Tables should only be used for tabular data, never page layout.'
    ],
    hint: {
      summary: '<ul> for bullets, <ol> for numbers; <table> uses <tr> for rows, <th> for headers, <td> for data.',
      keyRules: [
        'List items must be enclosed in <li>.',
        '<th> for column titles, <td> for values.',
        'Wrap table sections in <thead> and <tbody>.'
      ],
      cheatsheetMarkdown: `\`\`\`html
<ul><li>Item</li></ul>
<table>
  <tr><th>Head</th></tr>
  <tr><td>Data</td></tr>
</table>
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-html-lt-1',
        title: 'Create 2-Item List',
        instruction: 'Write an unordered list `<ul>` with two `<li>` items: "Code" and "Career".',
        starterCode: `<!-- Write list markup here -->
`,
        solutionCode: `<ul>
    <li>Code</li>
    <li>Career</li>
</ul>`
      }
    ],
    quizzes: [
      {
        id: 'q-html-lt-1',
        question: 'Which tag creates a numbered (ordered) list in HTML?',
        options: ['<ul>', '<ol>', '<dl>', '<nl>'],
        correctOptionIndex: 1,
        explanation: '<ol> creates an Ordered List (1, 2, 3...).'
      },
      {
        id: 'q-html-lt-2',
        question: 'What tag defines a table row in HTML?',
        options: ['<td>', '<th>', '<tr>', '<row>'],
        correctOptionIndex: 2,
        explanation: '<tr> stands for Table Row.'
      },
      {
        id: 'q-html-lt-3',
        question: 'What is the difference between `<th>` and `<td>` in HTML tables?',
        options: [
          '<th> is for table headers (bold & semantic); <td> is for standard data cells',
          '<th> is for table height',
          '<td> is deprecated',
          'They are completely identical'
        ],
        correctOptionIndex: 0,
        explanation: '<th> represents table headers; <td> represents regular table data.'
      },
      {
        id: 'q-html-lt-4',
        question: 'Which element is mandatory for every item inside a `<ul>` or `<ol>` list?',
        options: ['<p>', '<li>', '<item>', '<span>'],
        correctOptionIndex: 1,
        explanation: '<li> (List Item) is the required child tag for lists.'
      },
      {
        id: 'q-html-lt-5',
        question: 'Why should HTML tables NOT be used for general web page layout design?',
        options: [
          'They break responsive mobile design and impair screen reader accessibility',
          'They cannot display colors',
          'They are deleted in HTML5',
          'They require Python backend'
        ],
        correctOptionIndex: 0,
        explanation: 'CSS Grid/Flexbox provides responsive layouts; tables are exclusively for tabular datasets.'
      }
    ],
    codingChallenge: {
      id: 'html-ch-lists-tables',
      title: 'Table Cell Counter',
      slug: 'html-table-cell-counter',
      instruction: 'A 3x3 table with 1 header row (3 th) and 2 data rows (6 td) has 9 total cells. Output 9.',
      starterCode: `<!-- Write your HTML / solution code here -->\n`,
      testCases: [
        {
          id: 'tc-html-lt-1',
          input: '',
          expectedOutput: '9'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'html-links-media'
  },
  {
    id: 'html-links-media',
    language: 'html',
    title: 'Hyperlinks, Images & Embedded Media',
    slug: 'html-links-media',
    category: 'Links, Media & Embedded Content',
    categoryId: 'html-multimedia',
    level: 'beginner',
    order: 4,
    estimatedMinutes: 10,
    prerequisites: ['html-lists-tables'],
    introduction: 'Hyperlinks connect web documents across the Internet, while media elements embed images, audio tracks, and video players.',
    explanation: `### Hyperlinks with \`<a href="...">\`:
• \`href\`: Destination URL.
• \`target="_blank"\`: Opens the link in a new browser tab (always pair with \`rel="noopener noreferrer"\` for security).

### Responsive Images with \`<img src="..." alt="...">\`:
• \`src\`: Image source path.
• \`alt\`: Crucial alternative text description for screen readers and when images fail to load.

### Native Multimedia:
• \`<audio controls src="audio.mp3"></audio>\`
• \`<video controls width="640" src="video.mp4"></video>\``,
    syntax: `<a href="https://apex.edu" target="_blank" rel="noopener noreferrer">
    Visit APEX
</a>

<img src="/logo.svg" alt="APEX Platform Logo" width="200" height="50">

<video controls width="400">
    <source src="tutorial.mp4" type="video/mp4">
</video>`,
    syntaxBreakdown: `• <a href="..."> : Anchor element creating hyperlinks
• target="_blank" : Opens in new browser tab
• <img alt="..."> : Image tag with mandatory accessibility description
• <video controls> : Native video player with user controls`,
    codeExamples: [
      {
        title: 'Hyperlinks and Images',
        code: `<nav>
    <a href="/courses">All Courses</a>
</nav>
<img src="/assets/banner.png" alt="APEX Coding Banner" width="400">`,
        explanation: 'Renders navigation link and accessible image tag.',
        output: 'All Courses\n[Image: APEX Coding Banner]'
      }
    ],
    practicalExamples: [
      {
        title: 'Media Player Embed',
        code: `<figure>
    <video controls width="320">
        <source src="intro.mp4" type="video/mp4">
        Your browser does not support video.
    </video>
    <figcaption>Figure 1.1: System Architecture Demo</figcaption>
</figure>`,
        explanation: 'Accessible multimedia figure with caption.',
        output: '[Video Player: intro.mp4]\nFigure 1.1: System Architecture Demo'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Omitting the `alt` attribute on `<img>` tags.',
        correction: 'Always provide a descriptive `alt="..."` attribute on every image.',
        explanation: 'Missing alt text fails WCAG accessibility compliance and hurts image SEO.'
      },
      {
        mistake: 'Using target="_blank" without `rel="noopener noreferrer"`.',
        correction: 'Always add `rel="noopener noreferrer"` to external links.',
        explanation: 'Prevents security vulnerabilities where external pages access `window.opener`.'
      }
    ],
    keyPoints: [
      'The <a> tag creates links via href attribute.',
      '<img> is a self-closing void element and requires src and alt attributes.',
      '<video> and <audio> provide native browser media playback without plugins.'
    ],
    hint: {
      summary: '<a href="URL"> links pages; <img src="URL" alt="Description"> embeds images with alt text.',
      keyRules: [
        'Always include alt on <img>.',
        'target="_blank" requires rel="noopener noreferrer".',
        '<video controls> enables user playback.'
      ],
      cheatsheetMarkdown: `\`\`\`html
<a href="/path">Link</a>
<img src="pic.jpg" alt="Description">
<video controls src="v.mp4"></video>
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-html-media-1',
        title: 'Create Link with Alt Image',
        instruction: 'Create an anchor `<a href="/home">` enclosing `<img src="icon.png" alt="Home Icon">`.',
        starterCode: `<!-- Write linked image markup here -->
`,
        solutionCode: `<a href="/home">
    <img src="icon.png" alt="Home Icon">
</a>`
      }
    ],
    quizzes: [
      {
        id: 'q-html-media-1',
        question: 'Which attribute in an `<a>` tag specifies the destination link URL?',
        options: ['src', 'href', 'link', 'target'],
        correctOptionIndex: 1,
        explanation: 'href (Hypertext Reference) designates the target link URL.'
      },
      {
        id: 'q-html-media-2',
        question: 'Why is the `alt` attribute on an `<img>` tag considered mandatory for accessibility?',
        options: [
          'It provides text description for screen readers and displays when the image fails to load',
          'It accelerates image downloading',
          'It applies a CSS filter',
          'It changes image aspect ratio'
        ],
        correctOptionIndex: 0,
        explanation: 'alt text ensures visually impaired users and screen readers understand image content.'
      },
      {
        id: 'q-html-media-3',
        question: 'What security attribute must always accompany `target="_blank"` on external links?',
        options: ['rel="noopener noreferrer"', 'secure="true"', 'auth="bearer"', 'type="external"'],
        correctOptionIndex: 0,
        explanation: 'rel="noopener noreferrer" prevents reverse tab-nabbing security exploits.'
      },
      {
        id: 'q-html-media-4',
        question: 'Is the `<img>` element in HTML a self-closing (void) element?',
        options: ['Yes, it does not require a closing </img> tag', 'No, it must end with </img>', 'Only in XHTML', 'Only for PNGs'],
        correctOptionIndex: 0,
        explanation: '<img> is a void element containing only attributes and no child nodes.'
      },
      {
        id: 'q-html-media-5',
        question: 'Which attribute enables play/pause and volume controls on native `<video>` and `<audio>` tags?',
        options: ['controls', 'interactive', 'player="ui"', 'buttons="all"'],
        correctOptionIndex: 0,
        explanation: 'The boolean `controls` attribute displays the browser\'s native media UI.'
      }
    ],
    codingChallenge: {
      id: 'html-ch-links-media',
      title: 'Image Alt Validator',
      slug: 'html-image-alt-validator',
      instruction: 'Output "VALID_MEDIA_ELEMENT" confirming understanding of src and alt attributes.',
      starterCode: `<!-- Write your HTML / solution code here -->\n`,
      testCases: [
        {
          id: 'tc-html-media-1',
          input: '',
          expectedOutput: 'VALID_MEDIA_ELEMENT'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'html-forms'
  },
  {
    id: 'html-forms',
    language: 'html',
    title: 'Interactive Web Forms & Input Validation',
    slug: 'html-forms',
    category: 'Web Forms, Accessibility & SEO',
    categoryId: 'html-interactive',
    level: 'intermediate',
    order: 5,
    estimatedMinutes: 12,
    prerequisites: ['html-links-media'],
    introduction: 'Web forms collect user input—such as login credentials, search queries, and survey responses—and transmit it securely to backend servers.',
    explanation: `Forms use the \`<form>\` container with \`action\` (endpoint URL) and \`method\` (\`GET\` or \`POST\`).

### Essential Form Controls:
• \`<label for="email">\`: Accessible label linked to input by matching \`id\`.
• \`<input type="text">\` : Single line text.
• \`<input type="email">\` : Native email format validation.
• \`<input type="password">\` : Masked security input.
• \`<input type="checkbox">\` / \`<input type="radio">\` : Toggle and single-select choices.
• \`<select>\` & \`<option>\` : Dropdown selection.
• \`<textarea>\` : Multi-line text input.
• \`<button type="submit">\` : Triggers form submission.

### HTML5 Validation Attributes:
• \`required\`: Blocks submission if input is empty.
• \`minlength\` / \`maxlength\`: Enforces character boundaries.`,
    syntax: `<form action="/api/login" method="POST">
    <label for="user">Username:</label>
    <input type="text" id="user" name="username" required minlength="3">
    
    <label for="pass">Password:</label>
    <input type="password" id="pass" name="password" required>
    
    <button type="submit">Sign In</button>
</form>`,
    syntaxBreakdown: `• <form action="..." method="POST"> : Container directing submission to API
• <label for="id"> : Links text label to input ID for accessibility
• type="password" : Masks typed characters
• required : Browser client-side validation guard`,
    codeExamples: [
      {
        title: 'Accessible Registration Form',
        code: `<form action="/register" method="POST">
    <div>
        <label for="email">Email Address:</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div>
        <label for="pwd">Password:</label>
        <input type="password" id="pwd" name="password" required minlength="8">
    </div>
    <button type="submit">Create Account</button>
</form>`,
        explanation: 'Uses label associations and native HTML5 validation constraints.',
        output: 'Email Address: [______]\nPassword: [______]\n[Create Account]'
      }
    ],
    practicalExamples: [
      {
        title: 'Feedback Form with Textarea',
        code: `<form action="/feedback" method="POST">
    <label for="msg">Comments:</label>
    <textarea id="msg" name="comments" rows="4" cols="40" required></textarea>
    <button type="submit">Send Feedback</button>
</form>`,
        explanation: 'Multi-line comments input box.',
        output: 'Comments: [____\n____]\n[Send Feedback]'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Omitting <label> elements or failing to link them with `for="id"`.',
        correction: 'Always pair inputs with a `<label for="inputId">` sharing the exact input `id`.',
        explanation: 'Screen readers require explicit label-input associations to announce form fields.'
      },
      {
        mistake: 'Using GET method for passwords and sensitive forms.',
        correction: 'Always use `method="POST"` for sensitive data and authentication.',
        explanation: 'GET encodes parameters directly in the URL query string, exposing passwords in browser history and server logs.'
      }
    ],
    keyPoints: [
      'Forms submit data via GET (URL query) or POST (request body).',
      'Always associate labels with inputs using for="id".',
      'HTML5 native validation (required, type="email") enforces input hygiene before network submission.'
    ],
    hint: {
      summary: '<form action="URL" method="POST"> wraps inputs; link <label for="id"> to <input id="id">.',
      keyRules: [
        'Use method="POST" for sensitive forms.',
        'Pair every input with a <label>.',
        'Use required attribute for mandatory fields.'
      ],
      cheatsheetMarkdown: `\`\`\`html
<form method="POST">
  <label for="n">Name:</label>
  <input id="n" name="name" required>
  <button type="submit">Submit</button>
</form>
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-html-form-1',
        title: 'Create Login Form',
        instruction: 'Create a `<form>` with `<input type="email" required>` and `<button type="submit">Login</button>`.',
        starterCode: `<!-- Write login form here -->
`,
        solutionCode: `<form action="/login" method="POST">
    <input type="email" name="email" required>
    <button type="submit">Login</button>
</form>`
      }
    ],
    quizzes: [
      {
        id: 'q-html-form-1',
        question: 'Which HTTP method should be used on a login form submitting passwords?',
        options: ['GET', 'POST', 'PUT', 'TRACE'],
        correctOptionIndex: 1,
        explanation: 'POST sends sensitive data in the request body, preventing exposure in URLs.'
      },
      {
        id: 'q-html-form-2',
        question: 'How do you explicitly associate a `<label>` with an `<input>` element?',
        options: [
          'Match the label\'s `for` attribute with the input\'s `id` attribute',
          'Put them in the same div',
          'Give them the same class',
          'Use name attribute only'
        ],
        correctOptionIndex: 0,
        explanation: '`for="elementId"` on label binds directly to `id="elementId"` on the input.'
      },
      {
        id: 'q-html-form-3',
        question: 'Which HTML5 input type automatically validates that user input resembles a valid email structure?',
        options: ['type="text"', 'type="email"', 'type="mail"', 'type="address"'],
        correctOptionIndex: 1,
        explanation: 'type="email" triggers browser validation for "@" and domain structure.'
      },
      {
        id: 'q-html-form-4',
        question: 'What attribute prevents form submission if an input field is left empty?',
        options: ['mandatory="true"', 'required', 'validate="yes"', 'notnull'],
        correctOptionIndex: 1,
        explanation: 'The boolean `required` attribute blocks submission until value is entered.'
      },
      {
        id: 'q-html-form-5',
        question: 'Which element is used for multi-line text input in HTML forms?',
        options: ['<input type="multiline">', '<textarea>', '<textbox>', '<paragraph>'],
        correctOptionIndex: 1,
        explanation: '<textarea> provides a resizable multi-line text box.'
      }
    ],
    codingChallenge: {
      id: 'html-ch-forms',
      title: 'Form Input Counter',
      slug: 'html-form-input-counter',
      instruction: 'A form has email input, password input, and submit button (3 controls). Output 3.',
      starterCode: `<!-- Write your HTML / solution code here -->\n`,
      testCases: [
        {
          id: 'tc-html-form-1',
          input: '',
          expectedOutput: '3'
        }
      ],
      xpReward: 50
    },
    xpReward: 50,
    nextTopicId: 'html-accessibility-meta'
  },
  {
    id: 'html-accessibility-meta',
    language: 'html',
    title: 'Viewport Meta Tags, SEO & Accessibility (WCAG)',
    slug: 'html-accessibility-meta',
    category: 'Web Forms, Accessibility & SEO',
    categoryId: 'html-interactive',
    level: 'intermediate',
    order: 6,
    estimatedMinutes: 12,
    prerequisites: ['html-forms'],
    introduction: 'Modern web standards mandate mobile responsiveness through viewport meta tags and inclusive accessibility compliance (WCAG).',
    explanation: `### Viewport Meta Configuration:
To ensure mobile devices render pages at native device resolution rather than scaling down desktop pages, always include:
\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`

### Core Accessibility (a11y) & SEO Principles:
1. **ARIA Roles & Landmarks:** Use native semantic HTML first (\`<main>\`, \`<nav>\`, \`<button>\`) before adding ARIA attributes.
2. **Alt Text:** Descriptive \`alt="..."\` for every meaningful image.
3. **Form Labels:** Every interactive control must have an accessible name.
4. **Color Contrast:** Ensure text has at least 4.5:1 contrast ratio against backgrounds.
5. **Keyboard Navigability:** Interactive elements (\`<a>\`, \`<button>\`, \`<input>\`) must be focusable via \`Tab\` key.`,
    syntax: `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="APEX Skill Learning Platform">
    <title>APEX Platform</title>
</head>`,
    syntaxBreakdown: `• width=device-width : Matches viewport to device screen width
• initial-scale=1.0 : Sets initial 1:1 zoom ratio
• meta name="description" : Summarizes page content for search engine snippets`,
    codeExamples: [
      {
        title: 'Compliant HTML5 Head Section',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Master coding with APEX.">
    <title>APEX Learning</title>
</head>
<body>
    <main>
        <h1>Welcome</h1>
    </main>
</body>
</html>`,
        explanation: 'Full accessible and mobile-ready page header.',
        output: 'Welcome'
      }
    ],
    practicalExamples: [
      {
        title: 'Accessible Button with ARIA',
        code: `<button type="button" aria-label="Close modal dialog">
    &times;
</button>`,
        explanation: 'aria-label provides accessible name for icon-only buttons.',
        output: '[× (Close modal dialog)]'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using `<div onclick="...">` instead of `<button>`.',
        correction: 'Always use native `<button>` elements for click actions.',
        explanation: '`<div>` is not keyboard-accessible via Tab/Enter unless heavy custom ARIA and key listeners are added.'
      }
    ],
    keyPoints: [
      'The viewport meta tag is mandatory for mobile responsive web design.',
      'Native semantic elements provide built-in keyboard accessibility.',
      'Maintain proper heading hierarchies and meta descriptions for SEO.'
    ],
    hint: {
      summary: 'width=device-width, initial-scale=1.0 ensures mobile scaling; use native buttons and semantic tags for a11y.',
      keyRules: [
        'Always include viewport meta tag.',
        'Use <button> for actions, <a> for navigation.',
        'Provide aria-label for icon buttons.'
      ],
      cheatsheetMarkdown: `\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<button aria-label="Menu">☰</button>
\`\`\``
    },
    practiceTasks: [
      {
        id: 'pt-html-meta-1',
        title: 'Write Viewport Meta Tag',
        instruction: 'Write the standard mobile viewport `<meta>` tag with width=device-width and initial-scale=1.0.',
        starterCode: `<!-- Write viewport meta tag here -->
`,
        solutionCode: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
      }
    ],
    quizzes: [
      {
        id: 'q-html-meta-1',
        question: 'What is the purpose of `<meta name="viewport" content="width=device-width, initial-scale=1.0">`?',
        options: [
          'Ensures proper mobile responsive viewport scaling matching the device screen width',
          'Downloads mobile app automatically',
          'Enables camera access',
          'Compresses images'
        ],
        correctOptionIndex: 0,
        explanation: 'The viewport meta tag establishes proper 1:1 mobile scaling.'
      },
      {
        id: 'q-html-meta-2',
        question: 'Why should clickable actions use `<button>` instead of `<div onclick="...">`?',
        options: [
          '<button> elements are natively focusable and triggerable via Enter and Spacebar for keyboard accessibility',
          '<button> is faster to render',
          '<div> cannot have JavaScript attached',
          'Browser deletes unstyled divs'
        ],
        correctOptionIndex: 0,
        explanation: 'Native buttons provide out-of-the-box keyboard and screen reader accessibility.'
      },
      {
        id: 'q-html-meta-3',
        question: 'What attribute provides an accessible name for icon-only buttons (like a "×" close icon)?',
        options: ['aria-label="Close"', 'title="text"', 'alt="Close"', 'desc="Close"'],
        correctOptionIndex: 0,
        explanation: 'aria-label announces the button\'s purpose to assistive technologies.'
      },
      {
        id: 'q-html-meta-4',
        question: 'What is the minimum recommended WCAG color contrast ratio for normal body text against background?',
        options: ['1:1', '2:1', '4.5:1', '10:1'],
        correctOptionIndex: 2,
        explanation: 'WCAG 2.1 AA mandates a minimum 4.5:1 contrast ratio for normal text.'
      },
      {
        id: 'q-html-meta-5',
        question: 'Which meta tag in `<head>` provides search engines with a snippet summary for search results?',
        options: ['<meta name="description" content="...">', '<meta name="keywords" content="...">', '<meta name="summary">', '<meta name="search">'],
        correctOptionIndex: 0,
        explanation: '<meta name="description"> specifies the page preview snippet shown in search engine results.'
      }
    ],
    codingChallenge: {
      id: 'html-ch-accessibility',
      title: 'Accessibility Standard Output',
      slug: 'html-accessibility-standard',
      instruction: 'Output "WCAG_2.1_AA_COMPLIANT".',
      starterCode: `<!-- Write your HTML / solution code here -->\n`,
      testCases: [
        {
          id: 'tc-html-meta-1',
          input: '',
          expectedOutput: 'WCAG_2.1_AA_COMPLIANT'
        }
      ],
      xpReward: 50
    },
    xpReward: 50
  }
]
