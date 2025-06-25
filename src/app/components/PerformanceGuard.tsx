// PerformanceGuard.tsx
'use client'
import { useState, useEffect } from 'react'

export default function PerformanceGuard({ children }: { children: React.ReactNode }) {
  const [enableHighPerf, setEnableHighPerf] = useState(false)
  
  useEffect(() => {
    // Check device capabilities
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i
      .test(navigator.userAgent)
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
    const isLowPower = navigator.hardwareConcurrency < 4 || deviceMemory < 4
    
    // Enable high performance mode only if not a low-end mobile device
    setEnableHighPerf(!isMobile && !isLowPower)
  }, [])

  return enableHighPerf ? <>{children}</> : null
}