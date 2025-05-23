'use client'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
// import * as random from 'maath/random/dist/maath-random.esm'

export const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += delta * 0.1
      particlesRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <Points ref={particlesRef} limit={5000}>
      <PointMaterial
        transparent
        color="#FF44CC"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}