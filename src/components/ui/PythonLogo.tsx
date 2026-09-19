import React from 'react'

interface PythonLogoProps {
  className?: string
  size?: number | string
  variant?: 'color' | 'gold' | 'monochrome'
}

export const PythonLogo: React.FC<PythonLogoProps> = ({
  className = '',
  size = 28,
  variant = 'color'
}) => {
  if (variant === 'gold') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <path
          d="M63.85 1.05C49.9 1.05 38.6 3.4 33.3 8.32c-6.16 5.74-8.08 14.28-8.08 23.95v10.15h32.74v4.29H18.9c-9.67 0-18.2 1.92-23.94 8.08-5.74 6.16-7.27 15.65-7.27 28.98 0 13.06 2.05 22.8 7.79 28.54 5.99 5.99 15.1 7.53 25.04 7.53h7.93V104.9c0-11.23 9.4-20.63 20.63-20.63h32.74V51.53c0-11.49-9.66-20.37-21.14-20.37h-31.5V17.92c0-8.87 8.08-16.87 16.95-16.87h28.02zm-15.65 8.87a4.96 4.96 0 110 9.92 4.96 4.96 0 010-9.92z"
          fill="#E5B842"
        />
        <path
          d="M64.15 126.95c13.95 0 25.25-2.35 30.55-7.27 6.16-5.74 8.08-14.28 8.08-23.95V85.58H70.04V81.3h39.06c9.67 0 18.2-1.92 23.94-8.08 5.74-6.16 7.27-15.65 7.27-28.98 0-13.06-2.05-22.8-7.79-28.54-5.99-5.99-15.1-7.53-25.04-7.53h-7.93V23.1c0 11.23-9.4 20.63-20.63 20.63H45.96v32.74c0 11.49 9.66 20.37 21.14 20.37h31.5v13.24c0 8.87-8.08 16.87-16.95 16.87H64.15zm15.65-8.87a4.96 4.96 0 110-9.92 4.96 4.96 0 010-9.92z"
          fill="#D4AF37"
        />
      </svg>
    )
  }

  // Official dual-tone Python colors with clean geometry
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
    >
      <g>
        {/* Top Blue Snake */}
        <path
          d="M63.85 1.05C49.9 1.05 38.6 3.4 33.3 8.32c-6.16 5.74-8.08 14.28-8.08 23.95v10.15h32.74v4.29H18.9c-9.67 0-18.2 1.92-23.94 8.08-5.74 6.16-7.27 15.65-7.27 28.98 0 13.06 2.05 22.8 7.79 28.54 5.99 5.99 15.1 7.53 25.04 7.53h7.93V104.9c0-11.23 9.4-20.63 20.63-20.63h32.74V51.53c0-11.49-9.66-20.37-21.14-20.37h-31.5V17.92c0-8.87 8.08-16.87 16.95-16.87h28.02z"
          fill="url(#py-blue-grad)"
        />
        {/* Top Eye */}
        <circle cx="48.2" cy="14.8" r="4.96" fill="#0B0E14" />
        <circle cx="48.2" cy="14.8" r="2.5" fill="#F8FAFC" />

        {/* Bottom Yellow Snake */}
        <path
          d="M64.15 126.95c13.95 0 25.25-2.35 30.55-7.27 6.16-5.74 8.08-14.28 8.08-23.95V85.58H70.04V81.3h39.06c9.67 0 18.2-1.92 23.94-8.08 5.74-6.16 7.27-15.65 7.27-28.98 0-13.06-2.05-22.8-7.79-28.54-5.99-5.99-15.1-7.53-25.04-7.53h-7.93V23.1c0 11.23-9.4 20.63-20.63 20.63H45.96v32.74c0 11.49 9.66 20.37 21.14 20.37h31.5v13.24c0 8.87-8.08 16.87-16.95 16.87H64.15z"
          fill="url(#py-yellow-grad)"
        />
        {/* Bottom Eye */}
        <circle cx="79.8" cy="113.2" r="4.96" fill="#0B0E14" />
        <circle cx="79.8" cy="113.2" r="2.5" fill="#F8FAFC" />
      </g>

      <defs>
        <linearGradient id="py-blue-grad" x1="0" y1="0" x2="70" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#387EB8" />
          <stop offset="100%" stopColor="#255D8E" />
        </linearGradient>
        <linearGradient id="py-yellow-grad" x1="128" y1="128" x2="60" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE052" />
          <stop offset="100%" stopColor="#FFC331" />
        </linearGradient>
      </defs>
    </svg>
  )
}
export default PythonLogo
