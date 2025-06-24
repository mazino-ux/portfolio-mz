'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'clickable'>('default')
  const cursorSize = {
    default: 24,
    link: 48,
    clickable: 64
  }[hoverState]

  const cursorX = useMotionValue(position.x)
  const cursorY = useMotionValue(position.y)
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX - cursorSize / 2)
      cursorY.set(e.clientY - cursorSize / 2)
      
      const target = e.target as HTMLElement
      if (target.tagName === 'A') {
        setHoverState('link')
      } else if (target.tagName === 'BUTTON' || target.classList.contains('clickable')) {
        setHoverState('clickable')
      } else {
        setHoverState('default')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [cursorSize, cursorX, cursorY])

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference",
        "flex items-center justify-center text-xs font-bold",
        {
          'bg-primary': hoverState === 'default',
          'bg-emerald-400': hoverState === 'link',
          'bg-amber-400': hoverState === 'clickable'
        }
      )}
      style={{
        width: cursorSize,
        height: cursorSize,
        x: springX,
        y: springY
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
  )
}