'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertTriangle, Info } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type NotificationType = 'success' | 'error' | 'warning' | 'info'

const Notification3D = ({ type }: { type: NotificationType }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  }[type]

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.7}
        metalness={0.3}
      />
    </mesh>
  )
}

export const Notification = ({
  type,
  message,
  duration = 5000,
  onClose
}: {
  type: NotificationType
  message: string
  duration?: number
  onClose?: () => void
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const Icon = {
    success: Check,
    error: X,
    warning: AlertTriangle,
    info: Info
  }[type]

  const bgColor = {
    success: 'bg-emerald-500/90',
    error: 'bg-red-500/90',
    warning: 'bg-amber-500/90',
    info: 'bg-blue-500/90'
  }[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-20 right-6 z-50 p-4 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-3 ${bgColor} border border-white/10`}
        >
          <div className="w-8 h-8">
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Notification3D type={type} />
            </Canvas>
          </div>
          <div className="text-white">
            <span><Icon /></span>
            <p className="font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}