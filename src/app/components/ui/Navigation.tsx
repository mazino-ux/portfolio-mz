'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './Button'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border"
    >
      <div className="container flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold cursor-hover">
          Trinity<span className="text-primary">.</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative cursor-hover transition-colors hover:text-primary ${
                pathname === link.href ? 'text-primary' : 'text-foreground'
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 top-full mt-1 h-0.5 w-full bg-primary"
                />
              )}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/resume.pdf"
            download="Trinity-Ogwezi-Resume.pdf"
            tabIndex={-1}
            className="inline-block"
          >
            <Button variant="outline">
              Resume
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}