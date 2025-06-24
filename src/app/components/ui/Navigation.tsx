'use client'
import { useState} from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/config/constants'
import { Button } from './Button'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'

// Move MobileMenu outside of Navigation so it's defined before use
const MobileMenu = ({ activeSection }: { activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-40 pt-20 px-6"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xl py-3 px-4 rounded-lg ${
                      activeSection === sectionId
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/80 hover:bg-muted/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 10)
    
    // Update active section based on scroll position
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveSection(section.id)
      }
    })
  })

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="relative group">
            <motion.span 
              className="text-3xl font-bold text-primary"
              whileHover={{ scale: 1.1 }}
            >
              TO
            </motion.span>
            <motion.span 
              className="absolute -bottom-1 left-0 h-0.5 bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: activeSection === '' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium"
                >
                  <motion.span
                    className={`block ${activeSection === sectionId ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {link.name}
                  </motion.span>
                  {activeSection === sectionId && (
                    <motion.span 
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-primary"
                      layoutId="nav-underline"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden md:flex">
              <a href="/resume.pdf" download>Resume</a>
            </Button>
            <MobileMenu activeSection={activeSection} />
          </div>
        </div>
      </div>
    </header>
  )
}