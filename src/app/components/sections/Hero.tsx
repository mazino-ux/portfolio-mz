// src/components/sections/Hero.tsx
'use client'
import { motion } from 'framer-motion'
import { Typewriter } from '../ui/Typewriter'
import { Button } from '../ui/Button'
import { Scene } from '../3d/Scene'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
      
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Trinity Ogwezi
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-medium mb-8">
            <Typewriter 
              words={[
                'Senior Full-Stack Engineer',
                'Next.js Specialist',
                'TypeScript Expert',
                'SaaS Architect'
              ]}
            />
          </h2>
          
          <p className="text-lg md:text-xl mb-12">
            Building high-performance web applications with cutting-edge technologies
            and delivering exceptional user experiences.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button variant="secondary">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="block text-sm">Scroll Down</span>
        </motion.div>
      </div>
    </section>
  )
}