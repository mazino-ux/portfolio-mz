'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  words: string[]
  delay?: number
}

export const Typewriter = ({ words, delay = 100 }: TypewriterProps) => {
  const [currentWord, setCurrentWord] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const type = () => {
      const word = words[currentIndex % words.length]
      
      if (isDeleting) {
        setCurrentWord(word.substring(0, currentWord.length - 1))
      } else {
        setCurrentWord(word.substring(0, currentWord.length + 1))
      }

      if (!isDeleting && currentWord === word) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => prev + 1)
      }
    }

    const timeout = setTimeout(type, isDeleting ? delay / 2 : delay)
    return () => clearTimeout(timeout)
  }, [currentWord, currentIndex, isDeleting, words, delay])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-primary"
    >
      {currentWord}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.span>
  )
}