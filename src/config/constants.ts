export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' }
] as const;

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/mazino-ux', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/trinity-ogwezi', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/TOgwezi75723', icon: 'twitter' },
  { name: 'Email', url: 'mailto:mazinoishioma@gmail.com', icon: 'mail' }
] as const;

export const experiences = [
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
    company: 'Aptech',
    role: 'JavaScript Tutor',
    period: 'July 2024 - August 2024',
    highlights: [
      'Taught beginner JavaScript through 1-on-1 coaching',
      'Focused on core concepts like ES6 syntax, asynchronous programming, and DOM manipulation',
      'Facilitated hands-on projects including building interactive web applications'
    ],
    tech: ['JavaScript', 'ES6', 'DOM', 'Async Programming'],
    color: '#f59e0b'
  },
  {
    company: 'Think Thank Academy',
    role: 'Web Developer',
    period: 'Jul 2024',
    highlights: [
      'Designed and developed responsive advertisement website showcasing academy programs',
      'Collaborated with marketing team to align web content with enrollment goals'
    ],
    tech: ['BootStrap', 'JavaScript', 'CSS3', 'HTML5'],
    color: '#3b82f6'
  }
] as const;

export const projects = [
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
  }
] as const;

// NEW: Extended skills with details
export const SKILLS = [
  {
    name: 'Next.js',
    color: '#000000',
    projects: [
      'V-Tickets platform (500K+ users)',
      'Marketing sites with perfect Lighthouse scores',
      'Interactive portfolios with Three.js'
    ],
    achievements: [
      '42% bundle size reduction',
      '1.8s LCP improvement',
      'Perfect Lighthouse scores'
    ]
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    projects: [
      'Enterprise codebase migration',
      'Type-safe API contracts',
      'Complex state management systems'
    ],
    achievements: [
      '90%+ type coverage',
      '50% reduction in runtime errors',
      'Improved developer experience'
    ]
  },
  {
    name: 'React',
    color: '#61DAFB',
    projects: [
      'High-performance dashboards',
      'Real-time collaboration tools',
      'Interactive data visualizations'
    ],
    achievements: [
      'Optimized rendering performance',
      'Smooth 60fps animations',
      'Complex state management'
    ]
  },
  {
    name: 'Spring Boot',
    color: '#6DB33F',
    projects: [
      'Enterprise microservices architecture',
      'High-performance REST APIs',
      'AI integration projects'
    ],
    achievements: [
      '99.98% system reliability',
      '92% Redis cache hit rate',
      '10K+ RPM API handling'
    ]
  },
  {
    name: 'Node.js',
    color: '#339933',
    projects: [
      'Real-time notification services',
      'Scalable API gateways',
      'WebSocket implementations'
    ],
    achievements: [
      '99.9% notification delivery',
      '35% response time reduction',
      '3M+ monthly events processed'
    ]
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    projects: [
      'High-traffic SaaS application databases',
      'Analytics pipeline optimizations',
      'Distributed data systems'
    ],
    achievements: [
      '40% query performance improvement',
      'Efficient indexing strategies',
      'High-availability clusters'
    ]
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    projects: [
      'Financial transaction systems',
      'Geospatial data applications',
      'ACID-compliant databases'
    ],
    achievements: [
      'Complex query optimization',
      'Data integrity assurance',
      'Efficient replication'
    ]
  },
  {
    name: 'AWS',
    color: '#FF9900',
    projects: [
      'Serverless architectures',
      'Scalable infrastructure',
      'CI/CD pipelines'
    ],
    achievements: [
      '60% cost reduction',
      'Auto-scaling implementations',
      'High-availability systems'
    ]
  },
  {
    name: 'Docker',
    color: '#2496ED',
    projects: [
      'Containerized deployment pipelines',
      'Microservices orchestration',
      'CI/CD automation'
    ],
    achievements: [
      '60% faster deployments',
      '45% resource utilization improvement',
      'Zero-downtime updates'
    ]
  },
  {
    name: 'Three.js',
    color: '#049EF4',
    projects: [
      'Interactive 3D visualizations',
      'WebGL experiences',
      'AR/VR prototypes'
    ],
    achievements: [
      '60fps 3D rendering',
      'Optimized WebGL performance',
      'Immersive user experiences'
    ]
  }
] as const;