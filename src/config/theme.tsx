// theme.tsx
'use client'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'
import { createContext, useContext, useState, useEffect } from 'react'

const THEME_COLORS = [
  { name: 'Emerald', value: '#10b981' },
  { name: 'Sapphire', value: '#3b82f6' },
  { name: 'Amethyst', value: '#8b5cf6' },
  { name: 'Ruby', value: '#ef4444' },
  { name: 'Topaz', value: '#f59e0b' },
  { name: 'Onyx', value: '#1e293b' }
]

type AccentColorContextType = {
  accentColor: string
  setAccentColor: (color: string) => void
  themeColors: typeof THEME_COLORS
}

const AccentColorContext = createContext<AccentColorContextType>({
  accentColor: THEME_COLORS[0].value,
  setAccentColor: () => {},
  themeColors: THEME_COLORS
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [accentColor, setAccentColor] = useState('#10b981')

  useEffect(() => {
    // Set initial accent color from localStorage if available
    const savedColor = localStorage.getItem('accentColor')
    if (savedColor && THEME_COLORS.some(c => c.value === savedColor)) {
      setAccentColor(savedColor)
    }
  }, [])

  useEffect(() => {
    // Update CSS variables
    const hsl = hexToHSL(accentColor)
    document.documentElement.style.setProperty('--primary', hsl)
    document.documentElement.style.setProperty('--accent', accentColor)
    localStorage.setItem('accentColor', accentColor)
  }, [accentColor])

  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor, themeColors: THEME_COLORS }}>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </AccentColorContext.Provider>
  )
}

function hexToHSL(hex: string) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16)
    g = parseInt(hex[2] + hex[2], 16)
    b = parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16)
    g = parseInt(hex.slice(3, 5), 16)
    b = parseInt(hex.slice(5, 7), 16)
  }
  
  // Then convert RGB to HSL
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export const useAccentColor = () => useContext(AccentColorContext)