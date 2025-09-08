import { useState, useEffect, useLayoutEffect } from 'react'

export function useMediaQuery() {
  const [media, setMedia] = useState({ isMobile: false, isTablet: false, isDesktop: false })

  useLayoutEffect(() => {
    if(window !== undefined) {
    setMedia({ isMobile: window.innerWidth < 640, isTablet: window.innerWidth < 1025, isDesktop: window.innerWidth >= 1025 })
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 640) {
        setMedia({ isMobile: true, isTablet: false, isDesktop: false })
      } else if (window.innerWidth < 1025) {
        setMedia({ isMobile: false, isTablet: true, isDesktop: false })
      } else {
        setMedia({ isMobile: false, isTablet: false, isDesktop: true })
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return media
}