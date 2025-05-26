// src/components/3d/effects/ScrollEffects.tsx
'use client'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

export const ScrollEffects = () => {
  const { scrollYProgress } = useScroll()
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, viewport.height * 0.5])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = y.get()
    }
  })

  return (
    <group ref={groupRef}>
      {/* Add your WebGL elements here */}
      <mesh position={[0, 0, -5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#0ee7b7" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}