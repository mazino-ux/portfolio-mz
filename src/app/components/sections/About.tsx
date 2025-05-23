'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, Code, Cpu, Server } from 'lucide-react'

const skills = [
  { name: 'Frontend', icon: <Code className="h-6 w-6" />, items: ['React', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind CSS'] },
  { name: 'Backend', icon: <Server className="h-6 w-6" />, items: ['Node.js', 'Spring Boot', 'Python', 'REST/GraphQL', 'Microservices'] },
  { name: 'Mobile', icon: <Cpu className="h-6 w-6" />, items: ['Flutter', 'Dart', 'SwiftUI'] },
  { name: 'DevOps', icon: <Briefcase className="h-6 w-6" />, items: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Nginx'] },
]

export default function About() {
  return (
    <section id="about" className="relative z-0 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-dark dark:text-light">About Me</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-primary-500" />
          <p className="mt-4 max-w-3xl text-dark/60 dark:text-light/60">
            Elite Full-Stack Engineer with 3+ years of experience architecting high-traffic SaaS platforms and enterprise-grade systems.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-80 w-full overflow-hidden rounded-xl md:h-96"
          >
            <Image
              src="/assets/images/profile.jpg"
              alt="Trinity Ogwezi"
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-primary-500/10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-dark dark:text-light">
              Why I Deliver <span className="text-primary-500">Fire</span>
            </h3>
            <div className="mt-6 space-y-4 text-dark/70 dark:text-light/70">
              <p>
                <strong>Full-Stack Alchemist:</strong> Turn vague requirements into bulletproof systems—from WebSocket clusters to React hydration strategies.
              </p>
              <p>
                <strong>Metrics-Driven:</strong> Every commit ties to a business KPI: latency, revenue, or user growth.
              </p>
              <p>
                <strong>Architectural Visionary:</strong> Preempt bottlenecks before they exist. Built a self-healing API gateway that auto-scales during traffic spikes.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="rounded-lg border border-dark/10 bg-light/50 p-4 backdrop-blur-sm dark:border-light/10 dark:bg-dark/50"
                >
                  <div className="flex items-center gap-2 text-primary-500">
                    {skill.icon}
                    <h4 className="font-medium">{skill.name}</h4>
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {skill.items.map((item, i) => (
                      <li
                        key={i}
                        className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-600 dark:text-primary-400"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}