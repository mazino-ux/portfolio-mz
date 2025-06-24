'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, Suspense, useState } from 'react'
import { Badge } from '../ui/Badge'
import { cn } from '@/lib/utils'

const experiences = [
  {
    company: 'V-Tickets',
    role: 'Frontend Engineer',
    period: 'Nov 2024 - Present',
    highlights: [
      'Reduced initial bundle size by 42% through Next.js lazy loading, improving LCP by 1.8s',
      'Architected TailwindCSS system achieving 95%+ CLS scores across 120+ page templates',
      'Cut heap usage by 35% via React.memo and useEffect optimizations',
      'Boosted location-based conversions by 22% with geolocation-aware event discovery'
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'WebSockets'],
    color: '#6366f1'
  },
  {
    company: 'Confidential Client',
    role: 'AI Backend Engineer',
    period: '2025',
    highlights: [
      'Developed Spring Boot microservice with DeepSeek AI handling 100+ daily queries at <1.2s latency',
      'Reduced customer service tickets by 25% through context-aware dialogue flows',
      'Achieved 92% cache hit rate during traffic spikes with Redis TTL implementation'
    ],
    tech: ['Spring Boot', 'DeepSeek AI', 'Redis', 'Node.js', 'Microservices'],
    color: '#10b981'
  },
  {
    company: 'Think Thank Academy',
    role: 'Web Developer',
    period: 'Jul 2024',
    highlights: [
      'Designed and developed responsive advertisement website showcasing academy programs',
      'Implemented interactive elements increasing engagement metrics by 40%',
      'Collaborated with marketing team to align web content with enrollment goals'
    ],
    tech: ['Next.js', 'JavaScript', 'CSS3', 'HTML5'],
    color: '#3b82f6'
  },
  {
    company: 'Freelance',
    role: 'JavaScript Tutor',
    period: '2023 - Present',
    highlights: [
      'Taught beginner JavaScript through 1-on-1 coaching',
      'Focused on core concepts like ES6 syntax, asynchronous programming, and DOM manipulation',
      'Facilitated hands-on projects including building interactive web applications'
    ],
    tech: ['JavaScript', 'ES6', 'DOM', 'Async Programming'],
    color: '#f59e0b'
  }
]

const ParticleBackground = () => {
  const particlesRef = useRef<THREE.Points>(null)
  const { scrollYProgress } = useScroll()
  const { viewport } = useThree()
  
  const y = useTransform(scrollYProgress, [0, 1], [0, viewport.height * 0.5])
  // const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.2, 0])

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += delta * 0.05
      particlesRef.current.rotation.y += delta * 0.025
      particlesRef.current.position.y = y.get()
    }
  })

  const particles = new Float32Array(1500)
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

const ExperienceCard = ({ 
  exp, 
  index,
  activeCard,
  setActiveCard 
}: {
  exp: typeof experiences[0]
  index: number
  activeCard: number | null
  setActiveCard: (index: number | null) => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isActive = activeCard === index

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative bg-background/80 backdrop-blur-sm p-8 rounded-xl border shadow-lg overflow-hidden transition-all duration-300",
        isActive ? "border-primary/50 shadow-primary/10" : "border-border"
      )}
      onMouseEnter={() => setActiveCard(index)}
      onMouseLeave={() => setActiveCard(null)}
      onFocus={() => setActiveCard(index)}
      onBlur={() => setActiveCard(null)}
    >
      {/* Animated highlight bar */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1 bg-primary"
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      
      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <h3 className="text-2xl font-bold">{exp.company}</h3>
          <div className="flex flex-col md:items-end mt-2 md:mt-0">
            <span className="text-primary font-medium">{exp.role}</span>
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
              <span className="text-primary mr-2">▹</span>
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

export const Experience= () => {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // const yBg = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacityBg = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.2, 0])

  return (
    <section 
      id="experience" 
      className="relative py-32 overflow-hidden"
      ref={containerRef}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <ParticleBackground />
            <Preload all />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      {/* Animated background elements */}
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
              Professional <span className="text-primary">Experience</span>
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
      
      {/* Floating tech bubbles (appear when cards are hovered) */}
      {activeCard !== null && (
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
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