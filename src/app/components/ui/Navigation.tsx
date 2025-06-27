'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
// import { usePathname } from 'next/navigation'
import { Menu, X, Palette } from 'lucide-react'
import { useAccentColor } from '@/config/theme'
import { NAV_LINKS } from '@/config/constants'
import { ThemeToggle } from './ThemeToggle'

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const { accentColor } = useAccentColor()

  useEffect(() => {
    if (isOpen) {
      gsap.from(menuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.out'
      })
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(menuRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power3.in',
      onComplete: onClose
    })
  }

  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md p-8"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <button 
        onClick={handleClose}
        className="absolute top-8 right-8 p-2"
        aria-label="Close menu"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="h-full flex flex-col justify-center items-center gap-12">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-4xl font-bold relative group"
            onClick={handleClose}
          >
            <span className="relative z-10">{link.name}</span>
            <span 
              className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500 ease-out"
              style={{ backgroundColor: accentColor }}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

const ColorDroplet = ({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) => {
  const dropletRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (active && dropletRef.current) {
      gsap.to(dropletRef.current, {
        scale: 1.2,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      })
    } else if (dropletRef.current) {
      gsap.to(dropletRef.current, {
        scale: 1,
        duration: 0.3
      })
    }
  }, [active])

  return (
    <div
      ref={dropletRef}
      onClick={onClick}
      className="w-8 h-8 rounded-full cursor-pointer relative overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: color,
        clipPath: 'polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)',
        transform: active ? 'scale(1.2)' : 'scale(1)'
      }}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

const ColorPalette = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { accentColor, setAccentColor, themeColors } = useAccentColor()
  const paletteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && paletteRef.current) {
      gsap.from(paletteRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: 'back.out'
      })
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-muted/50 transition-colors"
        aria-label="Color palette"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <div 
          ref={paletteRef}
          className="absolute top-12 right-0 bg-background/90 backdrop-blur-md p-3 rounded-xl shadow-lg flex gap-3"
        >
          {themeColors.map((color) => (
            <ColorDroplet
              key={color.value}
              color={color.value}
              active={accentColor === color.value}
              onClick={() => {
                setAccentColor(color.value)
                setIsOpen(false)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const { accentColor } = useAccentColor()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
    }
  }, [])

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="relative group">
              <span 
                className="text-3xl font-bold block transition-transform duration-300 group-hover:scale-110"
                style={{ color: accentColor }}
              >
                TO
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-2 text-sm font-medium group"
                >
                  <span className="relative z-10 block transition-all duration-300 group-hover:text-primary">
                    {link.name}
                  </span>
                  <span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 ease-out group-hover:w-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ColorPalette />
              <ThemeToggle />
              <button
                className="md:hidden p-2 rounded-full hover:bg-muted/50 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}