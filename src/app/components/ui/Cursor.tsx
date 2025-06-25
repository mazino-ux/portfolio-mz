'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useAccentColor } from '@/config/theme'
import { cn } from '@/lib/utils'

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'clickable'>('default')
  const { accentColor } = useAccentColor()
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.closest('a')) {
        setHoverState('link')
      } else if (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('clickable')) {
        setHoverState('clickable')
      } else {
        setHoverState('default')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorX, cursorY])

  const cursorSize = {
    default: 24,
    link: 48,
    clickable: 64
  }[hoverState]

  const cursorColor = {
    default: accentColor,
    link: '#3b82f6',
    clickable: '#10b981'
  }[hoverState]

  return (
    <>
      <motion.div
        className={cn(
          "fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference",
          "flex items-center justify-center text-xs font-bold",
          "will-change-transform"
        )}
        style={{
          width: cursorSize,
          height: cursorSize,
          x: springX,
          y: springY,
          backgroundColor: cursorColor,
        }}
        animate={{
          scale: [1, 0.9, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut'
        }}
      >
        {hoverState === 'link' && 'View'}
        {hoverState === 'clickable' && 'Click'}
      </motion.div>
      {/* Debug: show position coordinates */}
      <div
        style={{
          position: 'fixed',
          left: position.x + 10,
          top: position.y + 10,
          pointerEvents: 'none',
          zIndex: 9999,
          color: '#fff',
          fontSize: 10,
          background: 'rgba(0,0,0,0.4)',
          padding: '2px 4px',
          borderRadius: 4,
          userSelect: 'none'
        }}
      >
        x: {position.x}, y: {position.y}
      </div>
    </>
  )
}