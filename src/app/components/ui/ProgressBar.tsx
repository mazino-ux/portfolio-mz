'use client'
import { useEffect, useState } from 'react'
import { useAccentColor } from '@/config/theme'

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0)
  const { accentColor } = useAccentColor()

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const totalScroll = docHeight - windowHeight
      const scrollProgress = (scrollTop / totalScroll) * 100
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-background/20">
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`,
          backgroundColor: accentColor
        }}
      />
    </div>
  )
}