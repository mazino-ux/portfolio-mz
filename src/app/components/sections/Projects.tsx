'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {  OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'
// import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

const ProjectCard3D = ({ image }: { image: string }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(image)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2.5, 1.5, 0.2]} />
      <meshStandardMaterial map={texture} roughness={0.4} metalness={0.3} />
    </mesh>
  )
}

const projects = [
  {
    title: 'V-Tickets Platform',
    description: 'Event management SaaS platform handling 500K+ users with Next.js and TypeScript',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query'],
    image: '/assets/images/vtickets.png',
    link: 'https://vtickets.site',
    github: 'https://github.com/mazino-ux/vtickets',
  },
  {
    title: 'CitiGuide Mobile App',
    description: 'Flutter/SwiftUI app with Supabase backend for city exploration',
    tags: ['Flutter', 'SwiftUI', 'Supabase', 'Geolocation'],
    image: '/assets/images/citiguide.png',
    link: '#',
    github: '#',
  },
  {
    title: 'Notification Engine',
    description: 'Node.js + MongoDB system handling 10K+ concurrent WebSocket connections',
    tags: ['Node.js', 'WebSockets', 'MongoDB', 'Redis'],
    image: '/assets/images/vtickets.png',
    link: '#',
    github: '#',
  },
]

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-background/10 to-background"
    >
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {projects.map((_, i) => (
            <Particle key={i} index={i} count={projects.length} />
          ))}
        </Canvas>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Selection of projects demonstrating technical capabilities and problem-solving approach
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 justify-center items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ y }}
              className="flex-1 min-w-[320px] max-w-md group relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-4xl flex flex-col"
            >
              <div className="h-48 relative">
                <div className="absolute inset-0 w-full h-full">
                  <Canvas
                    camera={{ position: [0, 0, 4], fov: 35 }}
                    dpr={[1.5, 2]}
                    gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                  >
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[5, 10, 7]} intensity={1.5} castShadow />
                    <pointLight position={[0, 5, 10]} intensity={1.2} />
                    <ProjectCard3D image={project.image} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
                  </Canvas>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center flex-1">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-base text-muted-foreground mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-accent transition-colors text-sm"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Particle = ({ index, count }: { index: number; count: number }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const angle = (index / count) * Math.PI * 2
  const radius = 5

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.position.x = Math.cos(angle + time * 0.2) * radius
      meshRef.current.position.y = Math.sin(angle + time * 0.3) * radius
      meshRef.current.position.z = Math.sin(time * 0.5) * 2
      meshRef.current.rotation.x = time * 0.2
      meshRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#0ee7b7" emissive="#0ee7b7" emissiveIntensity={0.5} />
    </mesh>
  )
}