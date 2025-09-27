import { useState, useEffect, useLayoutEffect } from 'react'

export function useMediaQuery() {
  const [media, setMedia] = useState({ isMobile: false, isTablet: false, isNetbook: false, isDesktop: false })

  useLayoutEffect(() => {
    if (window !== undefined) {
      setMedia({
        isMobile: window.innerWidth < 640,
        isTablet: window.innerWidth < 1025,
        isNetbook: window.innerWidth < 1441,
        isDesktop: window.innerWidth >= 1441,
      })
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 640) {
        setMedia({ isMobile: true, isTablet: false, isNetbook: false, isDesktop: false })
      } else if (window.innerWidth < 1025) {
        setMedia({ isMobile: false, isTablet: true, isNetbook: false, isDesktop: false })
      } else if (window.innerWidth < 1441) {
        setMedia({ isMobile: false, isTablet: false, isNetbook: true, isDesktop: false })
      } else {
        setMedia({ isMobile: false, isTablet: false, isNetbook: false, isDesktop: true })
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return media
}