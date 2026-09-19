import { Router, Request, Response } from 'express'
import { runCodeInSandbox } from '../sandbox'
import { CodingLanguage } from '../../src/types'

const router = Router()

const handleRun = async (req: Request, res: Response) => {
  const { language, code, testCases, customInput } = req.body

  if (!code) {
    return res.status(400).json({ error: 'Code is required' })
  }

  try {
    const result = await runCodeInSandbox(
      (language || 'python') as CodingLanguage,
      code,
      testCases || [],
      customInput
    )

    return res.json(result)
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      output: '',
      executionTimeMs: 0,
      testResults: [],
      allTestsPassed: false,
      runtimeError: err.message || 'Execution failed'
    })
  }
}

// POST /api/code/run and POST /api/code/execute
router.post('/execute', handleRun)
router.post('/run', handleRun)

export default router
