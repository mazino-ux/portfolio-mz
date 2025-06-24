'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, Code, Cpu, Server, Scan } from 'lucide-react'
import QRCode from 'react-qr-code'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const SkillSphere = ({ color }: { color: string }) => {
  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial
        color={new THREE.Color(color)}
        metalness={0.7}
        roughness={0.2}
        emissive={new THREE.Color(color)}
        emissiveIntensity={0.3}
      />
    </Sphere>
  )
}

export const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SkillSphere color="#10b981" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elite Full-Stack Engineer with 3+ years of experience architecting high-traffic SaaS platforms
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Profile image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-square w-full max-w-md mx-auto lg:col-span-1"
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border-2 border-primary/50">
              <Image
                src="/assets/images/profile.jpg"
                alt="Trinity Ogwezi"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-background p-2 rounded-lg shadow-lg border border-primary/20">
              <QRCode 
                value="https://triniportfolio.vercel.app" 
                size={100}
                bgColor="transparent"
                fgColor="currentColor"
                className="text-foreground"
              />
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Scan className="h-3 w-3" />
                <span>Scan to visit</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-12">
            {/* Expertise section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8">
                Why I Deliver <span className="text-primary">Excellence</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Full-Stack Mastery',
                    description: 'From pixel-perfect UIs to scalable backend systems, I bridge the entire stack with clean, maintainable code.'
                  },
                  {
                    title: 'Performance Obsessed',
                    description: 'Every decision is measured against real user metrics. I optimize for speed, efficiency, and scalability.'
                  },
                  {
                    title: 'Future-Proof Solutions',
                    description: 'I architect systems that evolve gracefully, anticipating growth and technological shifts.'
                  },
                  {
                    title: 'User-Centric Design',
                    description: 'I combine technical excellence with intuitive UX principles to create delightful experiences.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-background/80 backdrop-blur-sm border rounded-xl hover:shadow-md transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8">Technical Expertise</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { 
                    name: 'Frontend', 
                    icon: <Code className="h-6 w-6" />, 
                    items: ['React', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind CSS'],
                    color: '#3b82f6'
                  },
                  { 
                    name: 'Backend', 
                    icon: <Server className="h-6 w-6" />, 
                    items: ['Node.js', 'Spring Boot', 'Python', 'GraphQL', 'Microservices'],
                    color: '#10b981'
                  },
                  { 
                    name: 'Mobile', 
                    icon: <Cpu className="h-6 w-6" />, 
                    items: ['Flutter', 'Dart', 'SwiftUI'],
                    color: '#8b5cf6'
                  },
                  { 
                    name: 'DevOps', 
                    icon: <Briefcase className="h-6 w-6" />, 
                    items: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Nginx'],
                    color: '#ec4899'
                  }
                ].map((skill, index) => (
                  <div 
                    key={index}
                    className="p-6 border rounded-lg hover:shadow-md transition-shadow"
                    style={{ 
                      borderLeftColor: skill.color,
                      borderLeftWidth: '4px'
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="p-3 rounded-lg" 
                        style={{ backgroundColor: `${skill.color}20` }}
                      >
                        {skill.icon}
                      </div>
                      <h4 className="font-medium text-xl">{skill.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span 
                          key={i}
                          className="text-sm px-3 py-1 rounded-full bg-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}