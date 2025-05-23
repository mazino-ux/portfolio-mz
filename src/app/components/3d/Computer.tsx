'use client'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

useGLTF.preload('/assets/models/computer.glb')

export const Computer = () => {
  const computer = useGLTF('/assets/models/computer.glb')
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
        <hemisphereLight intensity={0.15} groundColor="black" />
        <pointLight intensity={1} position={[0, 3, 0]} />
        <primitive
          object={computer.scene}
          scale={0.75}
          position={[0, -1.5, 0]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </mesh>
    </group>
  )
}