import React from 'react'
import { Navigate } from 'react-router-dom'

export const CareerPathPage: React.FC = () => {
  return <Navigate to="/home" replace />
}

export default CareerPathPage
