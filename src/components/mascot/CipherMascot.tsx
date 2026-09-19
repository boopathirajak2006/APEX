import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { MascotMood } from '../../types'
import { soundEngine } from '../../lib/audio'
import { Bot } from 'lucide-react'

interface CipherMascotProps {
  mood?: MascotMood
  message?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  interactive?: boolean
  showSpeechBubble?: boolean
  className?: string
  onMascotClick?: () => void
}

const SIZE_CONFIGS = {
  sm: {
    characterSize: 'w-14 h-16 sm:w-16 sm:h-18',
    bubbleMax: 'max-w-xs',
    fontSize: 'text-xs',
    padding: 'p-2.5 sm:p-3',
  },
  md: {
    characterSize: 'w-24 h-28 sm:w-28 sm:h-32',
    bubbleMax: 'max-w-sm sm:max-w-md',
    fontSize: 'text-xs sm:text-sm',
    padding: 'p-3.5 sm:p-4',
  },
  lg: {
    characterSize: 'w-32 h-36 sm:w-40 sm:h-44',
    bubbleMax: 'max-w-md sm:max-w-lg',
    fontSize: 'text-sm',
    padding: 'p-4 sm:p-5',
  },
  xl: {
    characterSize: 'w-44 h-48 sm:w-56 sm:h-64',
    bubbleMax: 'max-w-lg sm:max-w-xl',
    fontSize: 'text-base',
    padding: 'p-5 sm:p-6',
  },
}

export const CipherMascot: React.FC<CipherMascotProps> = ({
  mood = 'idle',
  message,
  size = 'md',
  interactive = true,
  showSpeechBubble = true,
  className = '',
  onMascotClick,
}) => {
  const [typedMessage, setTypedMessage] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const config = SIZE_CONFIGS[size]

  useEffect(() => {
    if (!message) {
      setTypedMessage('')
      return
    }

    setTypedMessage('')
    let currentIdx = 0
    const interval = setInterval(() => {
      if (currentIdx < message.length) {
        setTypedMessage(message.substring(0, currentIdx + 1))
        currentIdx++
      } else {
        clearInterval(interval)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [message])

  const getRobotImage = () => {
    switch (mood) {
      case 'celebrating':
      case 'level_unlocked':
      case 'achievement_unlocked':
      case 'excited':
        return '/mascot/robot_celebrating.png'
      case 'thinking':
      case 'confused':
        return '/mascot/robot_thinking.png'
      case 'happy':
      case 'speaking':
      case 'encouraging':
      case 'disappointed_supportive':
      case 'idle':
      default:
        return '/mascot/robot_idle.png'
    }
  }

  const handleClick = () => {
    if (interactive) {
      soundEngine.playClick()
      if (onMascotClick) onMascotClick()
    }
  }

  return (
    <div className={`relative inline-flex items-center gap-3 sm:gap-5 ${className}`}>
      {/* Robot Character Only (Isolated Floating Animation, Zero Card Box) */}
      <motion.div
        animate={{
          y: isHovered ? -10 : [0, -7, 0],
          rotate: mood === 'celebrating' ? [0, -3, 3, 0] : 0,
        }}
        transition={{
          y: { repeat: Infinity, duration: 3.4, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 1.2 },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className={`relative select-none flex-shrink-0 flex items-center justify-center ${
          interactive ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
        }`}
      >
        <img
          src={getRobotImage()}
          alt="Byte AI Companion"
          className={`${config.characterSize} object-contain object-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] filter transition-all duration-300 pointer-events-auto`}
          onError={(e) => {
            const target = e.target as HTMLElement
            target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* Interactive Speech Bubble with Typewriter Effect */}
      {showSpeechBubble && message && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            className={`relative ${config.padding} rounded-2xl sm:rounded-3xl border border-blue-500/25 bg-gradient-to-b from-[#0d1738]/95 to-[#080f26]/95 backdrop-blur-xl shadow-2xl text-slate-100 ${config.bubbleMax} ${config.fontSize}`}
          >
            {/* Speech Bubble Arrow */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-blue-500/25" />
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-7 border-t-transparent border-b-7 border-b-transparent border-r-7 border-r-[#0d1738]" />

            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded-lg bg-blue-500/20 text-cyan-300 flex-shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>

              <div className="flex-1 font-medium leading-relaxed text-slate-200">
                <span>{typedMessage}</span>
                {typedMessage.length < message.length && (
                  <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle" />
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
