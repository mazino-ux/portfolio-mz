export const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ] as const;
  
  export const SKILLS = [
    'Next.js', 'TypeScript', 'React', 'Node.js', 'Spring Boot',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Three.js',
    'Tailwind CSS', 'WebSockets', 'GraphQL', 'Flutter'
  ] as const;
  
  export const SOCIAL_LINKS = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/mazino-ux', 
      icon: 'github' 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/trinity-ogwezi', 
      icon: 'linkedin' 
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/TOgwezi75723', 
      icon: 'twitter' 
    },
    { 
      name: 'Email', 
      url: 'mailto:mazinoishioma@gmail.com', 
      icon: 'mail' 
    }
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