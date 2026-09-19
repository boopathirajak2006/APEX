import { AuthProvider } from './contexts/AuthContext'
import { AudioProvider } from './contexts/AudioContext'
import { GameProvider } from './contexts/GameContext'
import { AppRoutes } from './routes'

export function App() {
  return (
    <AudioProvider>
      <AuthProvider>
        <GameProvider>
          <AppRoutes />
        </GameProvider>
      </AuthProvider>
    </AudioProvider>
  )
}

export default App
