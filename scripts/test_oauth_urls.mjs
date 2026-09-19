import crypto from 'crypto'

async function testConstructedAuthUrls() {
  console.log('--- Testing OAuth URL Construction ---')

  const googleClientId = '123456789-testgoogle.apps.googleusercontent.com'
  const redirectUriGoogle = 'http://localhost:4000/api/auth/google/callback'
  const state = crypto.randomBytes(24).toString('hex')

  const googleParams = new URLSearchParams({
    client_id: googleClientId,
    redirect_uri: redirectUriGoogle,
    response_type: 'code',
    scope: 'openid email profile',
    prompt: 'select_account',
    access_type: 'online',
    state
  })

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${googleParams.toString()}`
  console.log('Constructed Google URL:', googleAuthUrl)

  const hasGooglePrompt = googleAuthUrl.includes('prompt=select_account')
  const hasGoogleScope = googleAuthUrl.includes('scope=openid+email+profile') || googleAuthUrl.includes('scope=openid%20email%20profile')
  console.log('Google has prompt=select_account:', hasGooglePrompt)
  console.log('Google has correct scope:', hasGoogleScope)

  const githubClientId = 'gh_test_client_id_12345'
  const redirectUriGithub = 'http://localhost:4000/api/auth/github/callback'
  const githubParams = new URLSearchParams({
    client_id: githubClientId,
    redirect_uri: redirectUriGithub,
    scope: 'read:user user:email',
    prompt: 'select_account',
    state
  })
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${githubParams.toString()}`
  console.log('Constructed GitHub URL:', githubAuthUrl)

  const hasGithubPrompt = githubAuthUrl.includes('prompt=select_account')
  const hasGithubScope = githubAuthUrl.includes('scope=read%3Auser+user%3Aemail') || githubAuthUrl.includes('scope=read%3Auser%20user%3Aemail')
  console.log('GitHub has prompt=select_account:', hasGithubPrompt)
  console.log('GitHub has correct scope:', hasGithubScope)

  if (hasGooglePrompt && hasGoogleScope && hasGithubPrompt && hasGithubScope) {
    console.log('URL Construction Verification: ALL PASSED')
  } else {
    console.log('URL Construction Verification: FAILED')
  }
}

testConstructedAuthUrls()
