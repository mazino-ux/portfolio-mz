'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAccentColor } from '@/config/theme'

const quotes = [
  {
    quote: "The best way to predict the future is to create it.",
    author: "Abraham Lincoln",
    verse: "Proverbs 16:3 - Commit to the Lord whatever you do, and he will establish your plans."
  },
  {
    quote: "Whatever you are, be a good one.",
    author: "Abraham Lincoln",
    verse: "Colossians 3:23 - Whatever you do, work at it with all your heart, as working for the Lord."
  },
  {
    quote: "I walk slowly, but I never walk backward.",
    author: "Abraham Lincoln",
    verse: "Philippians 3:14 - I press on toward the goal for the prize of the upward call of God in Christ Jesus."
  }
]

export const SkeletonLoader = () => {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { accentColor } = useAccentColor()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-2xl px-8 py-12 text-center"
      >
        <div className="relative">
          {/* Animated 3D book */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="relative w-24 h-32 perspective-1000">
              <div 
                className="absolute w-full h-full rounded-lg shadow-lg transform rotate-y-20 origin-left transition-all duration-1000 animate-pulse"
                style={{ backgroundColor: `${accentColor}10` }}
              />
              <div 
                className="absolute w-full h-full rounded-lg shadow-lg transform -rotate-y-5 origin-right transition-all duration-1000 animate-pulse"
                style={{ backgroundColor: `${accentColor}20` }}
              />
              <div 
                className="absolute w-full h-full rounded-lg shadow-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}30` }}
              >
                <div 
                  className="w-8 h-8 rounded-full animate-pulse"
                  style={{ backgroundColor: `${accentColor}50` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-20">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 
                className="text-3xl font-bold"
                style={{ color: accentColor }}
              >
                {quotes[currentQuote].quote}
              </h3>
              <p className="text-muted-foreground">
                — {quotes[currentQuote].author}
              </p>
              <p className="text-sm italic text-muted-foreground/80">
                {quotes[currentQuote].verse}
              </p>
            </motion.div>

            {/* Loading animation */}
            <div className="flex justify-center pt-8">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      delay: i * 0.2
                    }}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}