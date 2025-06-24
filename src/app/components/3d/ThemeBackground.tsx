'use client'
import { useTheme } from 'next-themes'
import { useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'
import { useSpring, animated } from '@react-spring/web'
import { PaletteIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAccentColor } from '@/config/theme'

const THEME_COLORS = [
  { name: 'Emerald', value: '#10b981' },
  { name: 'Sapphire', value: '#3b82f6' },
  { name: 'Amethyst', value: '#8b5cf6' },
  { name: 'Ruby', value: '#ef4444' },
  { name: 'Topaz', value: '#f59e0b' },
  { name: 'Onyx', value: '#1e293b' }
]

const LiquidThemeSphere = ({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) => {
  const meshRef = useRef<Mesh>(null)
  const targetScale = active ? 1.2 : 1
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <mesh 
      ref={meshRef} 
      onClick={onClick}
      position={[0, 0, 0]}
      scale={targetScale}
    >
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshPhysicalMaterial
        color={new Color(color)}
        transmission={0.8}
        roughness={0.1}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        ior={1.5}
      />
    </mesh>
  )
}

export const ThemeBackground = () => {
  const { theme, setTheme } = useTheme()
  const [showPalette, setShowPalette] = useState(false)
  const { accentColor, setAccentColor } = useAccentColor()
  
  const springs = useSpring({
    opacity: showPalette ? 1 : 0,
    transform: `translateY(${showPalette ? 0 : 20}px)`,
    config: { tension: 300, friction: 20 }
  })

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full w-12 h-12 shadow-lg"
          onClick={() => setShowPalette(!showPalette)}
        >
          <PaletteIcon className="w-5 h-5" />
        </Button>
        
        <animated.div 
          style={springs}
          className="absolute bottom-16 right-0 bg-background/80 backdrop-blur-md p-4 rounded-xl shadow-xl"
        >
          <div className="grid grid-cols-3 gap-3">
            {THEME_COLORS.map((color) => (
              <div 
                key={color.value}
                className="w-12 h-12 cursor-pointer"
                onClick={() => {
                  setAccentColor(color.value) // Set accent color only
                  setShowPalette(false)
                }}
              >
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <LiquidThemeSphere 
                    color={color.value} 
                    active={accentColor === color.value} // Use accentColor for active state
                    onClick={() => {}}
                  />
                </Canvas>
              </div>
            ))}
          </div>
        </animated.div>
      </div>
      
      <Canvas className="fixed inset-0 -z-10 opacity-20">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {THEME_COLORS.map((color, i) => (
          <LiquidThemeSphere 
            key={i}
            color={color.value}
            active={theme === color.name.toLowerCase()}
            onClick={() => setTheme(color.name.toLowerCase())} 
          />
        ))}
      </Canvas>
    </>
  )
}