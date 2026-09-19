import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { AuthPage } from '../pages/AuthPage'
import { PathSelectionPage } from '../pages/PathSelectionPage'
import { LanguagesPage } from '../pages/LanguagesPage'
import { ModePage } from '../pages/ModePage'
import { LearningPage } from '../pages/LearningPage'
import { GameMapPage } from '../pages/GameMapPage'
import { GamePlayPage } from '../pages/GamePlayPage'
import { SkillCheckPage } from '../pages/SkillCheckPage'
import { SoftSkillsHubPage } from '../pages/SoftSkillsHubPage'
import { SoftSkillsLearnPage } from '../pages/SoftSkillsLearnPage'
import { SoftSkillsTestPage } from '../pages/SoftSkillsTestPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ProfilePage } from '../pages/ProfilePage'
import { CodeHubPage } from '../pages/CodeHubPage'
import { useAuth } from '../contexts/AuthContext'
import { useGame } from '../contexts/GameContext'
import { Sparkles } from 'lucide-react'

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-[#9CA3AF] flex items-center justify-center font-mono text-xs">
        Authenticating APEX session...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Root Dispatcher: Authenticated users go straight to APEX Home
const RootDispatcher: React.FC = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-[#9CA3AF] flex items-center justify-center font-mono text-xs">
        Authenticating APEX session...
      </div>
    )
  }

  if (!user) {
    return <AuthPage defaultIsSignUp={false} />
  }

  return <Navigate to="/home" replace />
}

// XP Gamification Toast
const XpToastOverlay: React.FC = () => {
  const { activeToast } = useGame()

  if (!activeToast) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl border border-[#E5B842]/40 bg-[#121620]/95 backdrop-blur-2xl shadow-2xl text-[#FDE68A]">
        <div className="p-2.5 rounded-xl bg-[#E5B842]/20 text-[#E5B842] animate-bounce shadow-[0_0_15px_rgba(229,184,66,0.3)]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-base font-extrabold font-mono text-white">
            +{activeToast.amount} XP
          </span>
          <p className="text-xs text-[#CBD5E1] font-medium">{activeToast.reason}</p>
        </div>
      </div>
    </div>
  )
}

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0B0E14] text-[#F5F5F7] flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Entry & Authentication */}
            <Route path="/" element={<RootDispatcher />} />
            <Route path="/login" element={<AuthPage defaultIsSignUp={false} />} />
            <Route path="/signup" element={<AuthPage defaultIsSignUp={true} />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* APEX HOME / PATH SELECTION (ONLY CODE & SOFT SKILLS) */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <PathSelectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paths"
              element={
                <ProtectedRoute>
                  <PathSelectionPage />
                </ProtectedRoute>
              }
            />

            {/* ==========================================
                PILLAR 1: CODE PATH (LEARNING & GAME)
                ========================================== */}
            <Route
              path="/code"
              element={
                <ProtectedRoute>
                  <CodeHubPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/code/learning"
              element={
                <ProtectedRoute>
                  <LanguagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/code/learning/:language"
              element={
                <ProtectedRoute>
                  <LearningPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/code/learning/:language/:lessonId"
              element={
                <ProtectedRoute>
                  <LearningPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/code/game"
              element={
                <ProtectedRoute>
                  <LanguagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/code/game/:language"
              element={
                <ProtectedRoute>
                  <ModePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/code/game/:language/:difficulty"
              element={
                <ProtectedRoute>
                  <GameMapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/code/game/:language/:difficulty/:levelId"
              element={
                <ProtectedRoute>
                  <GamePlayPage />
                </ProtectedRoute>
              }
            />

            {/* Direct & Legacy Code Aliases */}
            <Route
              path="/languages"
              element={
                <ProtectedRoute>
                  <LanguagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mode/:language"
              element={
                <ProtectedRoute>
                  <ModePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn"
              element={
                <ProtectedRoute>
                  <LanguagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn/:language"
              element={
                <ProtectedRoute>
                  <LearningPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learn/:language/:lessonId"
              element={
                <ProtectedRoute>
                  <LearningPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:language/:difficulty"
              element={
                <ProtectedRoute>
                  <GameMapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:language/:difficulty/:levelId"
              element={
                <ProtectedRoute>
                  <GamePlayPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skill-check"
              element={
                <ProtectedRoute>
                  <SkillCheckPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skill-check/:language"
              element={
                <ProtectedRoute>
                  <SkillCheckPage />
                </ProtectedRoute>
              }
            />

            {/* ==========================================
                PILLAR 2: SOFT SKILLS PATH (LEARNING & TESTING)
                ========================================== */}
            <Route
              path="/soft-skills"
              element={
                <ProtectedRoute>
                  <SoftSkillsHubPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soft-skills/learning"
              element={
                <ProtectedRoute>
                  <SoftSkillsLearnPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soft-skills/learning/:skill"
              element={
                <ProtectedRoute>
                  <SoftSkillsLearnPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soft-skills/learning/:skill/:topicId"
              element={
                <ProtectedRoute>
                  <SoftSkillsLearnPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soft-skills/testing"
              element={
                <ProtectedRoute>
                  <SoftSkillsTestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soft-skills/testing/:skill"
              element={
                <ProtectedRoute>
                  <SoftSkillsTestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soft-skills/check"
              element={
                <ProtectedRoute>
                  <SoftSkillsTestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/soft-skills/:topicId"
              element={
                <ProtectedRoute>
                  <SoftSkillsLearnPage />
                </ProtectedRoute>
              }
            />

            {/* Core Command Center & Profile */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <XpToastOverlay />
      </div>
    </BrowserRouter>
  )
}

export default AppRoutes
