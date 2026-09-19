import React from 'react'

export type TechLanguageId =
  | 'python'
  | 'c'
  | 'cpp'
  | 'java'
  | 'javascript'
  | 'js'
  | 'typescript'
  | 'ts'
  | 'html'
  | 'htmlcss'
  | 'css'
  | 'rust'
  | 'sql'
  | 'web_dev'

interface TechLogoProps {
  language: string
  className?: string
  size?: number | string
}

export const TechLogo: React.FC<TechLogoProps> = ({
  language,
  className = '',
  size = 24
}) => {
  const norm = (language || '').toLowerCase().trim()

  // PYTHON BRAND LOGO
  if (norm === 'python') {
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
          d="M63.85 1.05C49.9 1.05 38.6 3.4 33.3 8.32c-6.16 5.74-8.08 14.28-8.08 23.95v10.15h32.74v4.29H18.9c-9.67 0-18.2 1.92-23.94 8.08-5.74 6.16-7.27 15.65-7.27 28.98 0 13.06 2.05 22.8 7.79 28.54 5.99 5.99 15.1 7.53 25.04 7.53h7.93V104.9c0-11.23 9.4-20.63 20.63-20.63h32.74V51.53c0-11.49-9.66-20.37-21.14-20.37h-31.5V17.92c0-8.87 8.08-16.87 16.95-16.87h28.02z"
          fill="#387EB8"
        />
        <circle cx="48.2" cy="14.8" r="4.5" fill="#FFFFFF" />
        <path
          d="M64.15 126.95c13.95 0 25.25-2.35 30.55-7.27 6.16-5.74 8.08-14.28 8.08-23.95V85.58H70.04V81.3h39.06c9.67 0 18.2-1.92 23.94-8.08 5.74-6.16 7.27-15.65 7.27-28.98 0-13.06-2.05-22.8-7.79-28.54-5.99-5.99-15.1-7.53-25.04-7.53h-7.93V23.1c0 11.23-9.4 20.63-20.63 20.63H45.96v32.74c0 11.49 9.66 20.37 21.14 20.37h31.5v13.24c0 8.87-8.08 16.87-16.95 16.87H64.15z"
          fill="#FFE052"
        />
        <circle cx="79.8" cy="113.2" r="4.5" fill="#FFFFFF" />
      </svg>
    )
  }

  // JAVASCRIPT BRAND LOGO
  if (norm === 'javascript' || norm === 'js') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <rect width="128" height="128" rx="16" fill="#F7DF1E" />
        <path
          d="M34.8 107.5c6.5 3.8 14.1 6.1 20.8 6.1 14.5 0 23.2-7.3 23.2-22.8V35h-15.8v55.8c0 7.8-3.9 10.9-10.4 10.9-4.7 0-9.2-1.6-12.7-3.9l-5.1 9.7zm49.5-2.2c8.2 4.7 18.2 7.7 27.6 7.7 16.8 0 26.1-8.5 26.1-22.1 0-13.4-8.8-19.3-21.7-24.8l-4.5-1.9c-8.1-3.5-12.2-6.5-12.2-11.8 0-5.2 4.3-9.2 11.2-9.2 6.6 0 12.3 2.5 16.5 5.5l5.2-10.8c-5.8-4-13.7-6.5-22.1-6.5-15.6 0-25.1 8.8-25.1 21.6 0 13.5 8.9 19.8 20.8 24.8l4.4 1.9c8.8 3.7 13.3 7 13.3 12.6 0 5.8-5.1 10.1-12.7 10.1-8.5 0-15.5-3.6-20.5-7.5l-6 10.9z"
          fill="#000000"
        />
      </svg>
    )
  }

  // TYPESCRIPT BRAND LOGO
  if (norm === 'typescript' || norm === 'ts') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <rect width="128" height="128" rx="16" fill="#3178C6" />
        <path
          d="M26.5 54.8h37.2v11.8H48.8v46.9H34.9V66.6H26.5V54.8zm45.3 43.8c7 3.8 15.6 6.1 23.6 6.1 14.3 0 22.3-6.9 22.3-17.8 0-10.7-7.5-15.4-18.5-19.8l-3.8-1.5c-6.9-2.8-10.4-5.2-10.4-9.4 0-4.2 3.7-7.4 9.6-7.4 5.6 0 10.5 2 14.1 4.4l4.4-8.6c-4.9-3.2-11.7-5.2-18.9-5.2-13.3 0-21.4 7-21.4 17.3 0 10.8 7.6 15.8 17.8 19.8l3.8 1.5c7.5 3 11.3 5.6 11.3 10.1 0 4.6-4.3 8.1-10.8 8.1-7.3 0-13.2-2.9-17.5-6l-5.1 8.8z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }

  // C BRAND LOGO
  if (norm === 'c') {
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
          d="M115.4 30.5L67.1 2.6c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.5c-1.9 1.1-3.1 3.2-3.1 5.4v55.8c0 2.2 1.2 4.3 3.1 5.4l48.3 27.9c1.9 1.1 4.3 1.1 6.2 0l48.3-27.9c1.9-1.1 3.1-3.2 3.1-5.4V35.9c0-2.2-1.2-4.3-3.1-5.4z"
          fill="#659AD2"
        />
        <path
          d="M64 96c-17.7 0-32-14.3-32-32s14.3-32 32-32c10.8 0 20.3 5.4 26 13.6l-11.8 7.7C74.6 47.9 69.6 45 64 45c-10.5 0-19 8.5-19 19s8.5 19 19 19c5.6 0 10.6-2.9 14.2-7.3l11.8 7.7C84.3 90.6 74.8 96 64 96z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }

  // C++ BRAND LOGO
  if (norm === 'cpp' || norm === 'c++') {
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
          d="M115.4 30.5L67.1 2.6c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.5c-1.9 1.1-3.1 3.2-3.1 5.4v55.8c0 2.2 1.2 4.3 3.1 5.4l48.3 27.9c1.9 1.1 4.3 1.1 6.2 0l48.3-27.9c1.9-1.1 3.1-3.2 3.1-5.4V35.9c0-2.2-1.2-4.3-3.1-5.4z"
          fill="#00599C"
        />
        <path
          d="M56 94c-16.6 0-30-13.4-30-30s13.4-30 30-30c10.1 0 19 5.1 24.4 12.8l-11 7.2C65.9 48.8 61.2 46 56 46c-9.9 0-18 8.1-18 18s8.1 18 18 18c5.2 0 9.9-2.8 13.4-7.9l11 7.2C75 88.9 66.1 94 56 94z"
          fill="#FFFFFF"
        />
        <path d="M86 59h6v-6h4v6h6v4h-6v6h-4v-6h-6v-4zM104 59h6v-6h4v6h6v4h-6v6h-4v-6h-6v-4z" fill="#004482" />
        <path d="M85 58h6v-6h4v6h6v4h-6v6h-4v-6h-6v-4zM103 58h6v-6h4v6h6v4h-6v6h-4v-6h-6v-4z" fill="#FFFFFF" />
      </svg>
    )
  }

  // JAVA BRAND LOGO
  if (norm === 'java') {
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
          d="M48.2 92.5c18.5 1.5 35.6-3.8 35.6-3.8s-4.6 3.2-12.8 5.4c-11.8 3.1-28.5 2.8-37.2-.8 0 0 4.1 1.7 14.4-.8zm-4.7 12.6c23.2 1.5 45.4-3.5 45.4-3.5s-5.8 4.2-16.3 6.9c-15.1 3.9-36.4 3.5-47.5-1 0 0 5.3 2.1 18.4-2.4zm44.2-34.6c4.6 4.3 1.3 8.3-4.8 11.6 8.3-4.1 14.8-10.4 7.6-17.7-8.8-8.9-24.8-8.6-34.9-17.9-6.3-5.8-5.3-13.8-3.4-21.7-6.2 8.3-6.4 20.3.8 28.1 10.3 11 25.8 12.4 34.7 17.6zm-17.8-49.8c5.4 6.3 4.2 12.9-1.2 18.4 6.8-5.2 10.5-12.8 5.7-19.9-6.1-9.1-23.7-11.9-22.1-24.2-5.4 8.7-2.6 18.5 5.5 23.4 4.5 2.7 8.9 4.8 12.1 2.3z"
          fill="#E76F00"
        />
        <path
          d="M78.6 77.8c11.5-8.5 6.2-16.7 6.2-16.7s-1.8 5.1-9.9 8.8c-10.2 4.7-25.5 5.6-37.4 1.1 0 0 6.6 2.3 20.6 1.8 9.3-.3 15.3-1.6 20.5 5zm-33.1 40.8c27.6 1.8 54.3-4.2 54.3-4.2s-6.9 5.1-19.5 8.3c-18 4.6-43.6 4.2-56.9-1.2 0 0 6.3 2.5 22.1-2.9z"
          fill="#5382A1"
        />
      </svg>
    )
  }

  // HTML / HTML5 BRAND LOGO
  if (norm === 'html' || norm === 'html5') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <path d="M19.2 11.2l9.1 101.9 35.7 9.9 35.6-9.9 9.2-101.9H19.2z" fill="#E44D26" />
        <path d="M64 19.4v95.1l28.6-7.9 7.4-82.7L64 19.4z" fill="#F16529" />
        <path
          d="M64 45.4H47.1l-1.2-13.6H64V19.4H31.7l3.6 40.8H64V45.4zm0 29.8H49.8l-1.1-12.7H34.8l2.3 26.3H64v-13.6zm0 24.6l-14.8-4-1-10.9H34.4l1.9 21.6 27.7 7.7V99.8zm0-54.4h16.9l1.2-13.6H64V19.4h32.3l-3.6 40.8H64V45.4zm0 29.8h14.2l-1.3 14.8-12.9 3.5V107l27.7-7.7 2.4-27.1h-30.1v2z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }

  // CSS / CSS3 BRAND LOGO
  if (norm === 'css' || norm === 'css3' || norm === 'htmlcss') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <path d="M19.2 11.2l9.1 101.9 35.7 9.9 35.6-9.9 9.2-101.9H19.2z" fill="#1572B6" />
        <path d="M64 19.4v95.1l28.6-7.9 7.4-82.7L64 19.4z" fill="#33A9DC" />
        <path
          d="M64 46.1h18.2l-1.7 18.9H64v14.1h15.2l-1.6 17.6-13.6 3.7V114l27.1-7.5 3.9-43.6H64V46.1zm0-26.7v14.1h34.6l1.3-14.1H64zM64 46.1H45.8l1.7-18.9H64V13.1H32.8L28.9 56.7H64V46.1zm0 33H48.8l1.6 17.6 13.6 3.7V114l-27.1-7.5-2.2-24.8H48l.9 10.7 15.1 4V79.1z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }

  // RUST BRAND LOGO
  if (norm === 'rust') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <circle cx="64" cy="64" r="58" fill="#CE412B" />
        <path
          d="M64 18c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm14.2 64.6l-9.1-13.7c4.6-1.5 7.6-5.4 7.6-10.4 0-7.2-5.7-11.5-15.6-11.5H46.5v43h10.4V76.8h2.9l8.6 12.8h9.8v-7zm-17.5-21.2h-4.2V54.2h4.2c4.1 0 6.6 1.8 6.6 4.6 0 2.8-2.5 4.6-6.6 4.6z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }

  // SQL BRAND LOGO
  if (norm === 'sql') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
      >
        <rect width="128" height="128" rx="16" fill="#00758F" />
        <ellipse cx="64" cy="36" rx="42" ry="14" fill="#E97B00" />
        <path
          d="M22 36v26c0 7.7 18.8 14 42 14s42-6.3 42-14V36c0 7.7-18.8 14-42 14S22 43.7 22 36z"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <path
          d="M22 62v26c0 7.7 18.8 14 42 14s42-6.3 42-14V62c0 7.7-18.8 14-42 14S22 69.7 22 62z"
          fill="#FFFFFF"
          opacity="0.75"
        />
        <path
          d="M22 88v12c0 7.7 18.8 14 42 14s42-6.3 42-14V88c0 7.7-18.8 14-42 14S22 95.7 22 88z"
          fill="#FFFFFF"
          opacity="0.6"
        />
      </svg>
    )
  }

  // WEB DEV / DEFAULT
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
    >
      <rect width="128" height="128" rx="16" fill="#E5B842" />
      <path
        d="M36 44l-20 20 20 20M92 44l20 20-20 20M72 32L56 96"
        stroke="#0B0E14"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default TechLogo
