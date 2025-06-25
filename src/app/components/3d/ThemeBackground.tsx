'use client'
// import { useTheme } from 'next-themes'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'
import { useSpring, animated } from '@react-spring/web'
import { PaletteIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAccentColor } from '@/config/theme'

const LiquidThemeSphere = ({ 
  color, 
  active, 
  onClick 
}: { 
  color: string; 
  active: boolean; 
  onClick: () => void 
}) => {
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
  // const { theme } = useTheme()
  const [showPalette, setShowPalette] = useState(false)
  const { accentColor, setAccentColor, themeColors } = useAccentColor()
  
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
            {themeColors.map((color) => (
              <div 
                key={color.value}
                className="water-drop w-12 h-12 cursor-pointer rounded-full overflow-hidden"
                onClick={() => {
                  setAccentColor(color.value)
                  setShowPalette(false)
                }}
              >
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <LiquidThemeSphere 
                    color={color.value} 
                    active={accentColor === color.value}
                    onClick={() => {}}
                  />
                </Canvas>
              </div>
            ))}
          </div>
        </animated.div>
      </div>
      
      <Canvas className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {themeColors.map((color, i) => (
          <LiquidThemeSphere 
            key={i}
            color={color.value}
            active={accentColor === color.value}
            onClick={() => {}}
          />
        ))}
      </Canvas>
    </>
  )
}