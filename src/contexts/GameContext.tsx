import React, { createContext, useContext, useState, useEffect } from 'react'
import type { CodingLanguage } from '../types'
import confetti from 'canvas-confetti'
import { useAudio } from './AudioContext'

interface GameContextType {
  activeLanguage: CodingLanguage
  setActiveLanguage: (lang: CodingLanguage) => void
  triggerConfetti: () => void
  awardXpNotification: (amount: number, reason?: string) => void
  addXp: (amount: number, reason?: string) => void
  activeToast: { amount: number; reason: string } | null
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeLanguage, setActiveLanguageState] = useState<CodingLanguage>('python')
  const [activeToast, setActiveToast] = useState<{ amount: number; reason: string } | null>(null)
  const { playXpTally } = useAudio()

  const setActiveLanguage = (lang: CodingLanguage) => {
    setActiveLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('apex_active_lang', lang)
    }
  }

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('apex_active_lang') || localStorage.getItem('coderealm_active_lang')) : null
    if (saved) {
      setActiveLanguageState(saved as CodingLanguage)
    }
  }, [])

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5B842', '#D4AF37', '#FDE68A', '#38bdf8', '#10b981'],
      })
    } catch (e) {
      // safe fallback if canvas not available
    }
  }

  const awardXpNotification = (amount: number, reason: string = 'Milestone Complete') => {
    playXpTally()
    setActiveToast({ amount, reason })
    triggerConfetti()
    setTimeout(() => {
      setActiveToast(null)
    }, 3500)
  }

  const addXp = (amount: number, reason: string = 'Milestone Complete') => {
    awardXpNotification(amount, reason)
  }

  return (
    <GameContext.Provider
      value={{
        activeLanguage,
        setActiveLanguage,
        triggerConfetti,
        awardXpNotification,
        addXp,
        activeToast,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
