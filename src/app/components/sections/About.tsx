
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, Code, Cpu, Server, Scan } from 'lucide-react'
import QRCode from 'react-qr-code'
// import { Button } from '../ui/Button' 

const skills = [
  { 
    name: 'Frontend', 
    icon: <Code className="h-5 w-5" />, 
    items: ['React', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind CSS'],
    color: '#3b82f6'
  },
  { 
    name: 'Backend', 
    icon: <Server className="h-5 w-5" />, 
    items: ['Node.js', 'Spring Boot', 'Python', 'GraphQL', 'Microservices'],
    color: '#10b981'
  },
  { 
    name: 'Mobile', 
    icon: <Cpu className="h-5 w-5" />, 
    items: ['Flutter', 'Dart', 'SwiftUI'],
    color: '#8b5cf6'
  },
  { 
    name: 'DevOps', 
    icon: <Briefcase className="h-5 w-5" />, 
    items: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Nginx'],
    color: '#ec4899'
  }
]

export const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About <span className="text-primary">Me</span></h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Elite Full-Stack Engineer with 3+ years of experience architecting high-traffic SaaS platforms
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-square w-full max-w-md mx-auto lg:col-span-1"
          >
            <Image
              src="/assets/images/profile.jpg"
              alt="Trinity Ogwezi"
              fill
              className="rounded-xl object-cover shadow-2xl border-2 border-primary"
              priority
            />
            <div className="absolute -bottom-6 -right-6 bg-background p-2 rounded-lg shadow-lg border">
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

          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">
                Why I Deliver <span className="text-primary">Excellence</span>
              </h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-background border rounded-xl">
                  <h4 className="font-semibold text-lg mb-2">Full-Stack Mastery</h4>
                  <p className="text-muted-foreground">
                    From pixel-perfect UIs to scalable backend systems, I bridge the entire stack with clean, maintainable code.
                  </p>
                </div>

                <div className="p-6 bg-background border rounded-xl">
                  <h4 className="font-semibold text-lg mb-2">Performance Obsessed</h4>
                  <p className="text-muted-foreground">
                    Every decision is measured against real user metrics. I optimize for speed, efficiency, and scalability.
                  </p>
                </div>

                <div className="p-6 bg-background border rounded-xl">
                  <h4 className="font-semibold text-lg mb-2">Future-Proof Solutions</h4>
                  <p className="text-muted-foreground">
                    I architect systems that evolve gracefully, anticipating growth and technological shifts.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Technical Expertise</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    style={{ borderLeftColor: skill.color, borderLeftWidth: '4px' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="p-2 rounded-lg" 
                        style={{ backgroundColor: `${skill.color}20` }}
                      >
                        {skill.icon}
                      </div>
                      <h4 className="font-medium">{skill.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-muted"
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