'use client'

import { useFrame } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, Suspense } from 'react'

export const FloatingQuotes = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <QuoteText position={[-8, 3, -5]} rotation={[0, 0.5, 0]} color="#6366f1" />
        <QuoteText position={[5, -2, -8]} rotation={[0, -0.3, 0.1]} color="#10b981" />
        <QuoteText position={[-2, -4, -3]} rotation={[0.1, 0.2, -0.1]} color="#3b82f6" />
      </Suspense>
    </group>
  )
}

const QuoteText = ({ position, rotation, color }: { position: [number, number, number], rotation: [number, number, number], color: string }) => {
  return (
    <Text3D
      font="/fonts/helvetiker_regular.typeface.json"
      size={0.8}  // Slightly smaller for better performance
      height={0.05}  // Reduced depth
      position={position}
      rotation={rotation}
    >
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.2}
      />
      {'"'}
    </Text3D>
  )
}