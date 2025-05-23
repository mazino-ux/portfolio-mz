'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { Suspense } from 'react'
import { Computer } from './Computer'
import { Particles } from './Particles'

export const Scene = () => {
  return (
    <Canvas
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="pointer-events-none"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Computer />
        <Particles />
        <Preload all />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}