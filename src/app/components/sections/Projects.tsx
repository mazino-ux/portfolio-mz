'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'V-Tickets Platform',
    description: 'Event management SaaS platform handling 500K+ users with Next.js and TypeScript',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query'],
    image: '/assets/images/vtickets.jpg',
    link: 'https://vtickets.site',
    github: 'https://github.com/mazino-ux/vtickets',
  },
  {
    title: 'CitiGuide Mobile App',
    description: 'Flutter/SwiftUI app with Supabase backend for city exploration',
    tags: ['Flutter', 'SwiftUI', 'Supabase', 'Geolocation'],
    image: '/assets/images/citiguide.jpg',
    link: '#',
    github: '#',
  },
  {
    title: 'Notification Engine',
    description: 'Node.js + MongoDB system handling 10K+ concurrent WebSocket connections',
    tags: ['Node.js', 'WebSockets', 'MongoDB', 'Redis'],
    image: '/assets/images/notification-engine.jpg',
    link: '#',
    github: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative z-0 py-20 bg-light/50 dark:bg-dark/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-dark dark:text-light">Featured Projects</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-primary-500" />
          <p className="mt-4 max-w-3xl text-dark/60 dark:text-light/60">
            Selection of projects demonstrating my technical capabilities and problem-solving approach.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-xl border border-dark/10 bg-light shadow-lg transition-all hover:shadow-xl dark:border-light/10 dark:bg-dark/50"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark dark:text-light">{project.title}</h3>
                <p className="mt-2 text-dark/70 dark:text-light/70">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-600 dark:text-primary-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-dark/70 hover:text-dark dark:text-light/70 dark:hover:text-light"
                  >
                    <Github className="h-4 w-4" />
                    Code
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