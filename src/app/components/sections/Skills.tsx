'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three-stdlib'
import { FontLoader } from 'three-stdlib'
import { TextGeometry } from 'three-stdlib'
import { gsap } from 'gsap'
import helvetikerRegular from 'three/examples/fonts/helvetiker_regular.typeface.json'

type Skill = {
  name: string
  color: string
  icon?: string
}

export const Skills = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  // Unified skills list
  const skills: Skill[] = useMemo(() => [
    { name: 'Next.js', color: '#0000ab' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'React', color: '#61DAFB' },
    { name: 'Three.js', color: '#049EF4' },
    { name: 'Tailwind', color: '#06B6D4' },
    { name: 'Spring Boot', color: '#6DB33F' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Express', color: '#000000' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'MySQL', color: '#4479A1' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'CI/CD', color: '#2088FF' }
  ], [])

  useEffect(() => {
    // Detect theme preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setTheme(darkModeMediaQuery.matches ? 'dark' : 'light')
    
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    
    darkModeMediaQuery.addEventListener('change', handleThemeChange)
    return () => darkModeMediaQuery.removeEventListener('change', handleThemeChange)
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(theme === 'dark' ? 0x111111 : 0xf8f8f8)
    scene.fog = new THREE.Fog(theme === 'dark' ? 0x111111 : 0xf8f8f8, 2, 10)

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 8

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.shadowMap.enabled = true
    mount.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controlsRef.current = controls

    // Lights - adjusted for both themes
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.5 : 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, theme === 'dark' ? 1 : 1.2)
    directionalLight.position.set(2, 2, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x4ade80, 2, 10) // Green point light
    pointLight.position.set(0, 0, 3)
    scene.add(pointLight)

    // Create a torus knot as the central object
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16)
    const material = new THREE.MeshStandardMaterial({
      color: 0x4ade80, // Green color
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x14532d,
      emissiveIntensity: 0.3,
      wireframe: false
    })
    const torusKnot = new THREE.Mesh(geometry, material)
    scene.add(torusKnot)

    // Skill spheres orbiting the torus knot
    const spheres: THREE.Mesh[] = []
    const sphereGroup = new THREE.Group()
    scene.add(sphereGroup)

    // Font loader for skill names
    const fontLoader = new FontLoader()
    const font = fontLoader.parse(helvetikerRegular as never)

    skills.forEach((skill, i) => {
      const geometry = new THREE.SphereGeometry(0.25, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(skill.color),
        metalness: 0.5,
        roughness: 0.3,
        emissive: new THREE.Color(skill.color).multiplyScalar(0.3),
        emissiveIntensity: 0.5
      })

      const sphere = new THREE.Mesh(geometry, material)
      sphere.userData.skill = skill

      // Position in orbit around torus knot
      const angle = (i / skills.length) * Math.PI * 2
      const radius = 3.5
      sphere.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      )
      
      sphere.castShadow = true
      sphereGroup.add(sphere)
      spheres.push(sphere)

      // Add skill name text
      const textGeometry = new TextGeometry(skill.name, {
        font,
        size: 0.15,
        height: 0.02
      })
      const textMaterial = new THREE.MeshBasicMaterial({ 
        color: theme === 'dark' ? 0xffffff : 0x000000
      })
      const textMesh = new THREE.Mesh(textGeometry, textMaterial)
      
      textGeometry.computeBoundingBox()
      if (textGeometry.boundingBox) {
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x
        textMesh.position.x = -textWidth / 2
      }
      textMesh.position.copy(sphere.position)
      textMesh.position.y -= 0.5
      textMesh.visible = false
      textMesh.userData.isText = true
      sphere.userData.textMesh = textMesh
      sphereGroup.add(textMesh)
    })

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(spheres)

      if (intersects.length > 0) {
        const intersectedSphere = intersects[0].object as THREE.Mesh
        const skill = intersectedSphere.userData.skill as Skill
        setHoveredSkill(skill)
        
        spheres.forEach(s => {
          const material = s.material as THREE.MeshStandardMaterial
          if (s === intersectedSphere) {
            material.emissiveIntensity = 1.5
            material.color.setHex(0x4ade80) // Highlight with green
            s.scale.set(1.3, 1.3, 1.3)
            s.userData.textMesh.visible = true
          } else {
            material.emissiveIntensity = 0.5
            material.color.setStyle(s.userData.skill.color)
            s.scale.set(1, 1, 1)
            s.userData.textMesh.visible = false
          }
        })
      } else {
        setHoveredSkill(null)
        spheres.forEach(s => {
          const material = s.material as THREE.MeshStandardMaterial
          material.emissiveIntensity = 0.5
          material.color.setStyle(s.userData.skill.color)
          s.scale.set(1, 1, 1)
          s.userData.textMesh.visible = false
        })
      }
    }

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(spheres)
      
      if (intersects.length > 0) {
        const skill = intersects[0].object.userData.skill as Skill
        setActiveSkill(activeSkill?.name === skill.name ? null : skill)
        
        if (activeSkill?.name !== skill.name) {
          const targetPosition = new THREE.Vector3()
          intersects[0].object.getWorldPosition(targetPosition)
          targetPosition.multiplyScalar(0.5)
          
          gsap.to(camera.position, {
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z + 3,
            duration: 1,
            ease: 'power2.inOut'
          })
        } else {
          gsap.to(camera.position, {
            x: 0,
            y: 0,
            z: 8,
            duration: 1,
            ease: 'power2.inOut'
          })
        }
      }
    }

    mount.addEventListener('mousemove', onMouseMove)
    mount.addEventListener('click', onClick)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      
      // Rotate torus knot
      torusKnot.rotation.x += 0.005
      torusKnot.rotation.y += 0.01
      
      // Orbit spheres around torus knot
      if (!activeSkill) {
        sphereGroup.rotation.y += 0.005
      }
      
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      mount.removeEventListener('mousemove', onMouseMove)
      mount.removeEventListener('click', onClick)
      window.removeEventListener('resize', handleResize)
      mount.removeChild(renderer.domElement)
    }
  }, [activeSkill, skills, theme])

  return (
    <section id="skills" className="relative py-20 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-green-500/10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1
            }}
          />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-green-500">
            Technical Mastery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology stack for full-spectrum development
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Skills List - Unified */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ staggerChildren: 0.05 }}
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                viewport={{ once: true }}
                className={`p-3 rounded-lg transition-all cursor-pointer border ${
                  hoveredSkill?.name === skill.name
                    ? 'bg-green-500/10 border-green-500 shadow-lg'
                    : 'bg-background hover:bg-muted/10 border-muted/30'
                } ${
                  activeSkill?.name === skill.name
                    ? 'ring-2 ring-green-500'
                    : ''
                }`}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() =>
                  hoveredSkill?.name === skill.name && setHoveredSkill(null)
                }
                onClick={() =>
                  setActiveSkill(
                    activeSkill?.name === skill.name ? null : skill
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="font-medium text-sm sm:text-base">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Visualization */}
          <motion.div
            ref={mountRef}
            className="w-full lg:w-[400px] h-[400px] rounded-xl border border-muted/20 shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-0 right-0 text-center bg-background/80 backdrop-blur-sm p-3 mx-4 rounded-lg"
              >
                <h4 className="font-bold text-green-500">{activeSkill.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Click to exit focus mode
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Skill description panel */}
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-muted/10 border border-muted/20 rounded-xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-2 text-green-500">
              {activeSkill.name} Expertise
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Key Projects</h4>
                <ul className="space-y-2 text-sm">
                  {getSkillProjects(activeSkill.name).map((project, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500">▹</span>
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Achievements</h4>
                <ul className="space-y-2 text-sm">
                  {getSkillAchievements(activeSkill.name).map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function getSkillProjects(skillName: string): string[] {
  const projects: Record<string, string[]> = {
    'Next.js': [
      'V-Tickets platform (500K+ users)',
      'Marketing sites with perfect Lighthouse scores',
      'Interactive portfolios with Three.js'
    ],
    'Spring Boot': [
      'Enterprise microservices architecture',
      'High-performance REST APIs',
      'AI integration projects'
    ],
    'Node.js': [
      'Real-time notification services',
      'Scalable API gateways',
      'WebSocket implementations'
    ],
    'MongoDB': [
      'High-traffic SaaS application databases',
      'Analytics pipeline optimizations',
      'Distributed data systems'
    ],
    'Docker': [
      'Containerized deployment pipelines',
      'Microservices orchestration',
      'CI/CD automation'
    ]
  }

  return projects[skillName] || [
    'Production-grade implementations',
    'Performance-optimized solutions',
    'Scalable architecture designs'
  ]
}

function getSkillAchievements(skillName: string): string[] {
  const achievements: Record<string, string[]> = {
    'Next.js': [
      '42% bundle size reduction',
      '1.8s LCP improvement',
      'Perfect Lighthouse scores'
    ],
    'Spring Boot': [
      '99.98% system reliability',
      '92% Redis cache hit rate',
      '10K+ RPM API handling'
    ],
    'Node.js': [
      '99.9% notification delivery',
      '35% response time reduction',
      '3M+ monthly events processed'
    ],
    'MongoDB': [
      '40% query performance improvement',
      'Efficient indexing strategies',
      'High-availability clusters'
    ],
    'Docker': [
      '60% faster deployments',
      '45% resource utilization improvement',
      'Zero-downtime updates'
    ]
  }

  return achievements[skillName] || [
    'Production-proven implementations',
    'Measurable performance gains',
    'Enterprise-grade solutions'
  ]
}