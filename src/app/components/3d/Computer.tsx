// src/components/3d/Computer.tsx
'use client'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const Computer = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.2
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      <mesh>
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[3.5, 0.2, 2]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  )
}