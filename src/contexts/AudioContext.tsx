import React, { createContext, useContext, useState, useEffect } from 'react'
import { soundEngine } from '../lib/audio'

interface AudioContextType {
  isMuted: boolean
  volume: number
  toggleMute: () => void
  setVolume: (vol: number) => void
  playClick: () => void
  playCorrect: () => void
  playWrong: () => void
  playLevelClear: () => void
  playXpTally: () => void
  playAchievement: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('coderealm_muted') === 'true' : false
  })
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('coderealm_volume') : null
    return saved ? parseFloat(saved) : 0.6
  })

  useEffect(() => {
    soundEngine.setMuted(isMuted)
    localStorage.setItem('coderealm_muted', String(isMuted))
  }, [isMuted])

  useEffect(() => {
    soundEngine.setVolume(volume)
    localStorage.setItem('coderealm_volume', String(volume))
  }, [volume])

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  const setVolume = (vol: number) => {
    setVolumeState(vol)
  }

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        volume,
        toggleMute,
        setVolume,
        playClick: () => soundEngine.playClick(),
        playCorrect: () => soundEngine.playCorrect(),
        playWrong: () => soundEngine.playWrong(),
        playLevelClear: () => soundEngine.playLevelClear(),
        playXpTally: () => soundEngine.playXpTally(),
        playAchievement: () => soundEngine.playAchievement(),
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
