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
  
  export const EXPERIENCES = [
    {
      company: 'V-Tickets',
      role: 'Frontend Engineer',
      period: 'Nov 2024 - Present',
      highlights: [
        'Implemented strategic lazy loading with Next.js dynamic imports',
        'Architected TailwindCSS utility-first styling system',
        'Built geolocation-aware event discovery'
      ],
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query']
    },
    {
      company: 'Confidential Client',
      role: 'Backend Engineer',
      period: '2025',
      highlights: [
        'Designed Node.js/Express notification service',
        'Integrated Firebase Cloud Messaging',
        'Implemented analytics dashboard'
      ],
      tech: ['Node.js', 'Express', 'MongoDB', 'Firebase']
    },
    {
      company: 'Think Thank Academy',
      role: 'Frontend Developer',
      period: 'Jul 2024',
      highlights: [
        'Built Next.js static site with 100/100 Lighthouse scores',
        'Optimized build pipeline',
        'Mentored junior developers'
      ],
      tech: ['Next.js', 'JavaScript', 'CSS3']
    }
  ] as const;
  
  export const PROJECTS = [
    {
      title: 'V-Tickets Platform',
      description: 'Event-driven ticketing system with Next.js and WebSockets',
      tags: ['Next.js', 'TypeScript', 'Node.js'],
      image: '/assets/images/vtickets.jpg',
      link: 'https://vtickets.site',
      github: 'https://github.com/mazino-ux/vtickets'
    },
    {
      title: 'CitiGuide Mobile App',
      description: 'Flutter/SwiftUI app for city exploration',
      tags: ['Flutter', 'SwiftUI', 'Supabase'],
      image: '/assets/images/citiguide.jpg',
      link: 'https://citiguide.app'
    }
  ] as const;