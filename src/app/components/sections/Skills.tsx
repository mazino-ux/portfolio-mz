// Skills.tsx
'use client'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { useAccentColor } from '@/config/theme'
import { SKILLS } from '@/config/constants'

const SkillSphere = ({ 
  color, 
  active,
  isMobile,
  position = [0, 0, 0]
}: { 
  color: string; 
  active: boolean;
  isMobile: boolean;
  position?: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  // const targetScale = active ? 1.2 : 1
  const intensity = active ? 0.8 : 0.3
  const rotationSpeed = isMobile ? 0.01 : 0.02
  
  useFrame(( ) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
      <meshPhysicalMaterial
        color={new THREE.Color(color)}
        metalness={0.5}
        roughness={0.3}
        transmission={0.6}
        emissive={new THREE.Color(color)}
        emissiveIntensity={intensity}
        clearcoat={0.8}
      />
    </mesh>
  )
}

export const Skills = () => {
  const { isMobile } = useDeviceDetect()
  const [enable3D, setEnable3D] = useState(false)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const { accentColor } = useAccentColor()

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setEnable3D(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isMobile])

  const handleSkillClick = (skillName: string) => {
    setActiveSkill(activeSkill === skillName ? null : skillName)
  }

  return (
    <section id="skills" className="relative py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/10"
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
          <h2 className="text-4xl font-bold mb-4" style={{ color: accentColor }}>
            Technical Mastery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology stack for full-spectrum development
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ staggerChildren: 0.05 }}
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1"
          >
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                viewport={{ once: true }}
                className={`p-3 rounded-lg transition-all cursor-pointer border ${
                  activeSkill === skill.name
                    ? 'ring-2 ring-primary'
                    : 'border-muted/30 hover:bg-muted/10'
                }`}
                onClick={() => handleSkillClick(skill.name)}
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

          {enable3D ? (
            <motion.div
              className="w-full lg:w-[400px] h-[400px] rounded-xl border border-muted/20 shadow-lg relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={0.5} />
                <Suspense fallback={null}>
                  <SkillSphere 
                    color={SKILLS.find(s => s.name === activeSkill)?.color || accentColor} 
                    active={!!activeSkill}
                    isMobile={isMobile}
                  />
                  <OrbitControls 
                    enableZoom={!isMobile}
                    enablePan={!isMobile}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                </Suspense>
              </Canvas>
              
              {activeSkill && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-0 right-0 text-center bg-background/80 backdrop-blur-sm p-3 mx-4 rounded-lg"
                >
                  <h4 className="font-bold" style={{ color: accentColor }}>
                    {activeSkill}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Click to exit focus mode
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="bg-muted/10 border rounded-xl w-full h-64 flex items-center justify-center">
              <p className="text-muted-foreground">3D visualization disabled for performance</p>
            </div>
          )}
        </div>

        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-muted/10 border border-muted/20 rounded-xl p-6 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>
              {activeSkill} Expertise
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Key Projects</h4>
                <ul className="space-y-3">
                  {SKILLS.find(s => s.name === activeSkill)?.projects.map((project, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">▹</span>
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Achievements</h4>
                <ul className="space-y-3">
                  {SKILLS.find(s => s.name === activeSkill)?.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">▹</span>
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