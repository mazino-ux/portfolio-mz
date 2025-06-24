'use client'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

// Create context for accent color
import { createContext, useContext, useState } from 'react'

type AccentColorContextType = {
  accentColor: string
  setAccentColor: (color: string) => void
}

const AccentColorContext = createContext<AccentColorContextType>({
  accentColor: '#10b981',
  setAccentColor: () => {}
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [accentColor, setAccentColor] = useState('#10b981')
  
  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </AccentColorContext.Provider>
  )
}

export const useAccentColor = () => useContext(AccentColorContext)