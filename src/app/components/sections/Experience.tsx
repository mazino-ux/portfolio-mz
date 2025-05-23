'use client'
import { motion } from 'framer-motion'
import { Badge } from '../ui/Badge'

const experiences = [
  {
    company: 'V-Tickets',
    role: 'Frontend Engineer',
    period: 'Nov 2024 - Present',
    highlights: [
      'Implemented strategic lazy loading with Next.js dynamic imports, reducing initial bundle size by 42%',
      'Architected TailwindCSS utility-first styling system with CSS purging, achieving 95%+ CLS scores',
      'Built geolocation-aware event discovery using Intersection Observer API, increasing conversions by 22%',
      'Integrated 15+ RESTful endpoints with React Query, reducing API calls by 40%'
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'WebSockets']
  },
  {
    company: 'Confidential Client',
    role: 'Backend Engineer',
    period: '2025',
    highlights: [
      'Designed Node.js/Express notification service processing 3M+ monthly events with 99.98% reliability',
      'Integrated Firebase Cloud Messaging with custom prioritization logic',
      'Implemented analytics dashboard using MongoDB aggregations'
    ],
    tech: ['Node.js', 'Express', 'MongoDB', 'Firebase', 'Redis']
  },
  {
    company: 'Think Thank Academy',
    role: 'Frontend Developer',
    period: 'Jul 2024',
    highlights: [
      'Built Next.js static site with 100/100 Lighthouse scores',
      'Optimized build pipeline to achieve 0.5s page loads',
      'Mentored 2 junior developers on JavaScript best practices'
    ],
    tech: ['Next.js', 'JavaScript', 'CSS3', 'HTML5']
  }
]

export const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            Professional <span className="text-primary">Experience</span>
          </h2>
          
          <div className="grid gap-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border shadow-lg"
              >
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <h3 className="text-2xl font-bold">{exp.company}</h3>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <span className="text-primary font-medium">{exp.role}</span>
                    <span className="text-muted-foreground">{exp.period}</span>
                  </div>
                </div>
                
                <ul className="mb-6 space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, i) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}