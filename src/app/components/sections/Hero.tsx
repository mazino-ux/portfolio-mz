'use client'
import { motion } from 'framer-motion'
import { Typewriter } from '../ui/Typewriter'
import { Button } from '../ui/Button'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { useAccentColor } from '@/config/theme'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

const HeroBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars
        radius={100}
        depth={50}
        count={2000} // Reduced for performance
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </Canvas>
  )
}

export const Hero = () => {
  const { isMobile } = useDeviceDetect()
  const { accentColor } = useAccentColor()

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {isMobile ? (
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background" />
      ) : (
        <div className="absolute inset-0">
          <HeroBackground />
        </div>
      )}
      
      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
            style={{ color: accentColor }}
          >
            Trinity Ogwezi
          </motion.h1>
          
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-6 sm:mb-8 text-foreground/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Typewriter 
              words={[
                'Senior Full-Stack Engineer',
                'Next.js Specialist',
                'TypeScript Expert',
                'SaaS Architect'
              ]}
              delay={100}
            />
          </motion.h2>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Building high-performance web applications with cutting-edge technologies
            and delivering exceptional user experiences.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button variant="default" size={isMobile ? "default" : "lg"}>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size={isMobile ? "default" : "lg"}>
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="block text-sm mb-2 text-muted-foreground">Scroll Down</span>
        <div className="w-4 h-8 border-2 rounded-full" style={{ borderColor: accentColor }}>
          <motion.div
            className="w-1 h-2 rounded-full mx-auto"
            style={{ backgroundColor: accentColor }}
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  )
}