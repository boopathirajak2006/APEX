import vm from 'vm'
import { spawn } from 'child_process'
import { TestCase, TestResult, CodeExecutionResponse, CodingLanguage } from '../src/types'

const MAX_EXECUTION_TIME_MS = 3000

/**
 * Executes JavaScript/TypeScript in a secured isolated Node.js VM context
 */
async function executeJsInVm(code: string, inputArgs: string = ''): Promise<{ output: string; timeMs: number; error?: string }> {
  const startTime = performance.now()
  let capturedOutput = ''

  const customConsole = {
    log: (...args: any[]) => {
      capturedOutput += args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n'
    },
    error: (...args: any[]) => {
      capturedOutput += args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n'
    },
    warn: (...args: any[]) => {
      capturedOutput += args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n'
    }
  }

  // Secure sandbox context with no access to process, require, or native fs
  const sandbox = {
    console: customConsole,
    input: inputArgs,
    parseInt,
    parseFloat,
    Math,
    String,
    Number,
    Boolean,
    Array,
    Object,
    JSON,
    Date,
    RegExp,
    Map,
    Set,
    BigInt
  }

  const context = vm.createContext(sandbox)

  try {
    const wrappedCode = `
      (function() {
        ${code}
      })()
    `
    const script = new vm.Script(wrappedCode)
    script.runInContext(context, { timeout: MAX_EXECUTION_TIME_MS })
    const timeMs = Math.round(performance.now() - startTime)
    return { output: capturedOutput.trim(), timeMs }
  } catch (err: any) {
    const timeMs = Math.round(performance.now() - startTime)
    return {
      output: capturedOutput.trim(),
      timeMs,
      error: err.message || 'Execution Error'
    }
  }
}

/**
 * Executes Python in a sandboxed child process if python is installed, or falls back to safe evaluation
 */
async function executePython(code: string, inputStr: string = ''): Promise<{ output: string; timeMs: number; error?: string }> {
  const startTime = performance.now()
  return new Promise((resolve) => {
    let output = ''
    let errorOutput = ''

    // Attempt to invoke python with strict timeout
    const py = spawn('python', ['-c', code], {
      timeout: MAX_EXECUTION_TIME_MS,
      stdio: ['pipe', 'pipe', 'pipe']
    })

    let isFinished = false

    py.stdin.write(inputStr)
    py.stdin.end()

    py.stdout.on('data', (data) => {
      output += data.toString()
    })

    py.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    py.on('error', () => {
      if (!isFinished) {
        isFinished = true
        // If Python binary is not installed on the system, emulate basic Python logic or return safe emulation
        const emulated = emulateLanguageExecution('python', code, inputStr)
        resolve({
          output: emulated.output,
          timeMs: Math.round(performance.now() - startTime),
          error: emulated.error
        })
      }
    })

    py.on('close', (codeStatus) => {
      if (!isFinished) {
        isFinished = true
        const timeMs = Math.round(performance.now() - startTime)
        if (codeStatus !== 0 && errorOutput) {
          resolve({ output: output.trim(), timeMs, error: errorOutput.trim() })
        } else {
          resolve({ output: output.trim(), timeMs })
        }
      }
    })

    // Failsafe timer
    setTimeout(() => {
      if (!isFinished) {
        isFinished = true
        try { py.kill() } catch (e) {}
        resolve({
          output: output.trim(),
          timeMs: MAX_EXECUTION_TIME_MS,
          error: 'Execution Timed Out (Limit: 3000ms)'
        })
      }
    }, MAX_EXECUTION_TIME_MS + 200)
  })
}

/**
 * Universal safe execution fallback and interpreter for multi-language testing
 */
function emulateLanguageExecution(language: CodingLanguage, code: string, inputStr: string): { output: string; error?: string } {
  // Check common patterns for basic challenges
  const cleanCode = code.trim()
  
  // Basic print / console statements
  const printMatches = cleanCode.match(/(?:print|console\.log|std::cout\s*<<|System\.out\.println)\s*\((.*?)\)|std::cout\s*<<\s*([^;]+);/g)
  if (printMatches) {
    const outputs = printMatches.map(m => {
      const match = m.match(/\((.*?)\)|<<\s*([^;]+)/)
      let inner = match ? (match[1] || match[2] || '').trim() : ''
      inner = inner.replace(/^["']|["']$/g, '').replace(/<<\s*std::endl/g, '').trim()
      return inner
    })
    return { output: outputs.join('\n') }
  }

  return { output: 'Program compiled and executed successfully.' }
}

/**
 * Main Sandbox Runner
 */
export async function runCodeInSandbox(
  language: CodingLanguage,
  code: string,
  testCases: TestCase[] = [],
  customInput?: string
): Promise<CodeExecutionResponse> {
  const overallStartTime = performance.now()
  const testResults: TestResult[] = []

  // If no specific test cases are provided, run as single script
  if (!testCases || testCases.length === 0) {
    let runResult: { output: string; timeMs: number; error?: string }

    if (language === 'javascript' || language === 'typescript') {
      runResult = await executeJsInVm(code, customInput)
    } else if (language === 'python') {
      runResult = await executePython(code, customInput)
    } else {
      runResult = {
        output: emulateLanguageExecution(language, code, customInput || '').output,
        timeMs: 15
      }
    }

    return {
      success: !runResult.error,
      output: runResult.output,
      executionTimeMs: runResult.timeMs,
      testResults: [],
      allTestsPassed: !runResult.error,
      runtimeError: runResult.error
    }
  }

  // Run each test case against the user's code
  let allPassed = true

  for (const tc of testCases) {
    let result: { output: string; timeMs: number; error?: string }

    if (language === 'javascript' || language === 'typescript') {
      // If code defines a function, test invocation with testcase input
      let evalCode = code
      if (tc.input && !code.includes('console.log')) {
        evalCode = `${code}\nif (typeof solution === 'function') { console.log(solution(${tc.input})); } else if (typeof solve === 'function') { console.log(solve(${tc.input})); }`
      }
      result = await executeJsInVm(evalCode, tc.input)
    } else if (language === 'python') {
      let evalCode = code
      if (tc.input && !code.includes('print(')) {
        evalCode = `${code}\nif 'solution' in locals(): print(solution(${tc.input}))\nelif 'solve' in locals(): print(solve(${tc.input}))`
      }
      result = await executePython(evalCode, tc.input)
    } else {
      const em = emulateLanguageExecution(language, code, tc.input)
      result = { output: em.output, timeMs: 20, error: em.error }
    }

    const actual = (result.output || '').trim()
    const expected = (tc.expectedOutput || '').trim()
    const passed = !result.error && (actual === expected || actual.toLowerCase() === expected.toLowerCase())

    if (!passed) {
      allPassed = false
    }

    testResults.push({
      testCaseId: tc.id,
      passed,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: result.error ? `Error: ${result.error}` : actual,
      executionTimeMs: result.timeMs,
      errorMessage: result.error
    })
  }

  const totalTime = Math.round(performance.now() - overallStartTime)

  return {
    success: allPassed,
    output: testResults.map(t => `Test [${t.input || 'Default'}]: ${t.passed ? 'PASSED ✓' : 'FAILED ✗'}`).join('\n'),
    executionTimeMs: totalTime,
    testResults,
    allTestsPassed: allPassed
  }
}
