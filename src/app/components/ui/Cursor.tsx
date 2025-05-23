'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-hover')
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference ${
        isHovering ? 'bg-white w-12 h-12' : 'bg-primary'
      }`}
      animate={{
        x: position.x - (isHovering ? 24 : 12),
        y: position.y - (isHovering ? 24 : 12),
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  )
}