import React from 'react'

interface ApexLogoProps {
  variant?: 'gold' | 'color' | 'white'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showTagline?: boolean
  iconOnly?: boolean
  className?: string
  textClassName?: string
}

export const ApexLogo: React.FC<ApexLogoProps> = ({
  variant = 'gold',
  size = 'md',
  showTagline = true,
  iconOnly = false,
  className = '',
  textClassName = '',
}) => {
  // Dimensions
  const iconSizes = {
    sm: { w: 26, h: 26 },
    md: { w: 36, h: 36 },
    lg: { w: 48, h: 48 },
    xl: { w: 64, h: 64 },
  }

  const { w, h } = iconSizes[size] || iconSizes.md

  // Color scheme definitions
  const isGold = variant === 'gold'
  const isColor = variant === 'color'

  const gradIdA = `apexGradA_${variant}_${size}`
  const gradIdOrbit = `apexGradOrbit_${variant}_${size}`
  const gradIdStar = `apexGradStar_${variant}_${size}`

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Scalable Vector Icon */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]"
      >
        <defs>
          {isGold ? (
            <>
              <linearGradient id={gradIdA} x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="80%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
              <linearGradient id={gradIdOrbit} x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id={gradIdStar} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </>
          ) : isColor ? (
            <>
              <linearGradient id={gradIdA} x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="45%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id={gradIdOrbit} x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
              <linearGradient id={gradIdStar} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0E7FF" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </>
          ) : (
            <>
              <linearGradient id={gradIdA} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id={gradIdOrbit} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id={gradIdStar} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
            </>
          )}
        </defs>

        {/* 4-Point Star in Top Right */}
        <path
          d="M74 15 C74 18, 77 21, 80 21 C77 21, 74 24, 74 27 C74 24, 71 21, 68 21 C71 21, 74 18, 74 15 Z"
          fill={`url(#${gradIdStar})`}
        />

        {/* Dynamic Stylized Apex 'A' */}
        <path
          d="M48 14 C50 10, 54 10, 56 14 L85 75 C87 79, 84 84, 79 84 L67 84 C64 84, 61 82, 59 79 L52 64 L40 64 L33 79 C31 82, 28 84, 25 84 L13 84 C8 84, 5 79, 7 75 L36 14 Z M46 44 L41 54 L51 54 Z"
          fill={`url(#${gradIdA})`}
          fillRule="evenodd"
        />

        {/* Orbital Loop Swoosh */}
        <path
          d="M28 66 C42 58, 68 46, 88 51 C92 52, 92 57, 87 59 C73 64, 50 71, 32 74 C26 75, 24 70, 28 66 Z"
          fill={`url(#${gradIdOrbit})`}
          opacity="0.95"
        />
      </svg>

      {/* Wordmark and Tagline */}
      {!iconOnly && (
        <div className={`flex flex-col ${textClassName}`}>
          <div className="flex items-center tracking-[0.22em] font-extrabold ">
            <span
              className={`leading-none ${
                size === 'sm'
                  ? 'text-base'
                  : size === 'md'
                  ? 'text-xl sm:text-2xl'
                  : size === 'lg'
                  ? 'text-2xl sm:text-3xl'
                  : 'text-3xl sm:text-4xl'
              } ${
                isGold
                  ? 'bg-gradient-to-r from-[#FFF0C2] via-[#F5B838] to-[#D4AF37] bg-clip-text text-transparent'
                  : isColor
                  ? 'text-white'
                  : 'text-white'
              }`}
            >
              APEX
            </span>
          </div>
          {showTagline && (
            <span
              className={`tracking-[0.18em] uppercase font-medium mt-0.5 ${
                size === 'sm'
                  ? 'text-[8px]'
                  : size === 'md'
                  ? 'text-[10px]'
                  : size === 'lg'
                  ? 'text-[11px]'
                  : 'text-xs'
              } ${
                isGold
                  ? 'text-[#C9A96E]'
                  : isColor
                  ? 'text-cyan-300/90'
                  : 'text-slate-400'
              }`}
            >
              Learn · Practice · Grow
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ApexLogo
