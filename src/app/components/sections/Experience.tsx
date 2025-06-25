'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Badge } from '../ui/Badge'
import { useAccentColor } from '@/config/theme'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { experiences } from '@/config/constants'
import { cn } from '@/lib/utils'

const ParticleBackground = () => {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += state.clock.getElapsedTime() * 0.05
      particlesRef.current.rotation.y += state.clock.getElapsedTime() * 0.025
    }
  })

  const particles = new Float32Array(500) // Reduced for performance
  for (let i = 0; i < particles.length; i += 3) {
    particles[i] = (Math.random() - 0.5) * 10
    particles[i + 1] = (Math.random() - 0.5) * 10
    particles[i + 2] = (Math.random() - 0.5) * 10
  }

  return (
    <Points ref={particlesRef} positions={particles}>
      <PointMaterial
        transparent
        color="#888"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

type ExperienceType = typeof experiences[number];

const ExperienceCard = ({ 
  exp, 
  index,
  activeCard,
  setActiveCard 
}: {
  exp: ExperienceType
  index: number
  activeCard: number | null
  setActiveCard: (index: number | null) => void
}) => {
  const { accentColor } = useAccentColor()
  const isActive = activeCard === index

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "card-glass p-8 rounded-xl overflow-hidden transition-all duration-300",
        isActive ? "border-primary/50 shadow-primary/10" : "border-border"
      )}
      onMouseEnter={() => setActiveCard(index)}
      onMouseLeave={() => setActiveCard(null)}
      onFocus={() => setActiveCard(index)}
      onBlur={() => setActiveCard(null)}
    >
      <motion.div
        className="absolute top-0 left-0 h-full w-1 origin-bottom"
        style={{ backgroundColor: accentColor }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h3 className="text-2xl font-bold">{exp.company}</h3>
          <div className="flex flex-col md:items-end mt-2 md:mt-0">
            <span className="font-medium" style={{ color: accentColor }}>{exp.role}</span>
            <span className="text-muted-foreground">{exp.period}</span>
          </div>
        </div>
        
        <ul className="mb-6 space-y-3">
          {exp.highlights.map((highlight, i) => (
            <motion.li 
              key={i} 
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isActive ? i * 0.05 : 0 }}
            >
              <span className="mr-2" style={{ color: accentColor }}>▹</span>
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((tech, i) => (
            <Badge 
              key={i} 
              variant="secondary"
              className="transition-all duration-300"
              style={{
                transform: isActive ? 'translateY(-2px)' : 'none',
                boxShadow: isActive ? `0 4px 6px -1px ${exp.color}20, 0 2px 4px -2px ${exp.color}20` : 'none'
              }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export const Experience = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  const { isMobile } = useDeviceDetect()
  const opacityBg = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.2, 0])

  return (
    <section 
      id="experience" 
      className="relative py-32 overflow-hidden"
      ref={containerRef}
    >
      {!isMobile && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <ParticleBackground />
          </Canvas>
        </div>
      )}
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background -z-20"
        style={{ opacity: opacityBg }}
      />
      
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-16 text-center"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-5xl font-bold mb-4">
              Professional <span style={{ color: 'var(--primary)' }}>Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My journey through impactful roles and measurable achievements
            </p>
          </motion.div>
          
          <div className="grid gap-8 max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                exp={exp}
                index={index}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {activeCard !== null && (
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [0, 1, 1.2],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{ 
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 8
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  )
}