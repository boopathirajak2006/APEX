async function testGoogleConfig() {
  console.log('--- Testing Google Client ID Configuration ---')

  // 1. Test Auth config endpoint
  const configRes = await fetch('http://localhost:4000/api/auth/config')
  const configData = await configRes.json()
  const expectedClientId = '245423053049-qb9cr5eh1bmdbq9kt0medeg613j5rhgt.apps.googleusercontent.com'
  const configMatches = configData.googleClientId === expectedClientId
  console.log('1. /api/auth/config googleClientId matches expected:', configMatches ? 'PASSED' : 'FAILED', configData.googleClientId)

  // 2. Test Google Start redirect URL
  const googleStartRes = await fetch('http://localhost:4000/api/auth/google/start', { redirect: 'manual' })
  const redirectLocation = googleStartRes.headers.get('location')
  const isGoogleAccountsAuth = redirectLocation?.startsWith('https://accounts.google.com/o/oauth2/v2/auth')
  const hasClientId = redirectLocation?.includes(`client_id=${encodeURIComponent(expectedClientId)}`) || redirectLocation?.includes(`client_id=${expectedClientId}`)
  const hasSelectAccount = redirectLocation?.includes('prompt=select_account')
  const hasCorrectScope = redirectLocation?.includes('scope=openid+email+profile') || redirectLocation?.includes('scope=openid%20email%20profile')

  console.log('2. /api/auth/google/start redirects to Google OAuth endpoint:', isGoogleAccountsAuth ? 'PASSED' : 'FAILED')
  console.log('   Includes real Google Client ID:', hasClientId ? 'PASSED' : 'FAILED')
  console.log('   Includes prompt=select_account:', hasSelectAccount ? 'PASSED' : 'FAILED')
  console.log('   Includes scope=openid email profile:', hasCorrectScope ? 'PASSED' : 'FAILED')
  console.log('   Full redirect URL:', redirectLocation)

  // 3. Test Email + Password Login
  const loginRes = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', password: 'wrong' })
  })
  const loginData = await loginRes.json()
  console.log('3. Email + Password login validation untouched:', loginRes.status === 401 ? 'PASSED' : 'FAILED', loginData)

  if (configMatches && isGoogleAccountsAuth && hasClientId && hasSelectAccount && hasCorrectScope) {
    console.log('--- ALL GOOGLE CONFIGURATION TESTS PASSED ---')
  } else {
    console.log('--- SOME TESTS FAILED ---')
  }
}

testGoogleConfig().catch(console.error)
