import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/home', { replace: true })
  }, [navigate])

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#9CA3AF] flex items-center justify-center font-mono text-xs">
      Calibrating APEX Platform...
    </div>
  )
}

export default OnboardingPage
