async function runTests() {
  console.log('--- Testing OAuth Endpoints ---')

  // Test 1: Health check
  const healthRes = await fetch('http://localhost:4000/api/health')
  const healthData = await healthRes.json()
  console.log('1. Health check:', healthData.status === 'ok' ? 'PASSED' : 'FAILED')

  // Test 2: Auth config endpoint
  const configRes = await fetch('http://localhost:4000/api/auth/config')
  const configData = await configRes.json()
  console.log('2. Auth config endpoint:', typeof configData.googleClientId === 'string' ? 'PASSED' : 'FAILED', configData)

  // Test 3: Unconfigured Google Start should redirect with clean auth_error asking for GOOGLE_CLIENT_ID only
  const googleRes = await fetch('http://localhost:4000/api/auth/google/start', { redirect: 'manual' })
  const googleLocation = googleRes.headers.get('location')
  const googleCorrectError = googleLocation?.includes('GOOGLE_CLIENT_ID') && !googleLocation?.includes('GOOGLE_CLIENT_SECRET')
  console.log('3. Google start unconfigured redirect (GOOGLE_CLIENT_ID only):', googleCorrectError ? 'PASSED' : 'FAILED', googleLocation)

  // Test 4: Unconfigured GitHub Start should redirect with clean auth_error
  const githubRes = await fetch('http://localhost:4000/api/auth/github/start', { redirect: 'manual' })
  const githubLocation = githubRes.headers.get('location')
  console.log('4. GitHub start unconfigured redirect:', githubLocation?.includes('auth_error') ? 'PASSED' : 'FAILED', githubLocation)

  // Test 5: Verify Google ID token verification rejects invalid token
  const verifyRes = await fetch('http://localhost:4000/api/auth/google/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: 'invalid-google-credential' })
  })
  const verifyData = await verifyRes.json()
  console.log('5. Google token verification rejection:', verifyRes.status === 401 ? 'PASSED' : 'FAILED', verifyData)

  // Test 6: Verify email + password auth remains functional
  const loginRes = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'nonexistent@example.com', password: 'wrongpassword' })
  })
  const loginData = await loginRes.json()
  console.log('6. Email login validation:', loginRes.status === 401 ? 'PASSED' : 'FAILED', loginData)

  console.log('--- All OAuth Backend Tests Completed ---')
}

runTests().catch(console.error)
