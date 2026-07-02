import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const checkReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Preloader() {
  const skip = checkReducedMotion()
  const [done, setDone] = useState(skip)
  const [isVisible, setIsVisible] = useState(!skip)
  const [progress, setProgress] = useState(0)
  const [assetsLoaded, setAssetsLoaded] = useState(false)
  const startTimeRef = useRef<number>(Date.now())

  // Lock scrolling during preloader phase
  useEffect(() => {
    if (done) {
      document.body.classList.add('hol-ready')
      document.body.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [done])

  // Track if window and resource assets are fully loaded
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (document.readyState === 'complete') {
      setAssetsLoaded(true)
    } else {
      const handleLoad = () => setAssetsLoaded(true)
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  // Smooth loading progression over exactly 8 seconds
  useEffect(() => {
    if (done) return

    startTimeRef.current = Date.now()
    const targetDuration = 8000 // 8 seconds minimum wait time

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const currentPct = Math.min(100, (elapsed / targetDuration) * 100)
      setProgress(currentPct)

      if (currentPct >= 100) {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [done])

  // Hide the preloader ONLY after 8 seconds have passed AND all assets/DOM contents are rendered
  useEffect(() => {
    if (progress >= 100 && assetsLoaded) {
      const t = setTimeout(() => {
        setIsVisible(false)
      }, 500)
      return () => clearTimeout(t)
    }
  }, [progress, assetsLoaded])

  // Fallback safety timeout (12 seconds)
  useEffect(() => {
    if (done) return
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)
    return () => clearTimeout(fallbackTimer)
  }, [done])

  const handleExitComplete = () => {
    setDone(true)
  }

  if (done) return null

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#C2AE6D', // Dust Yellow
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '24px',
          }}
        >
          {/* Main Visual Group */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '480px', // Sized up container
          }}>
            {/* Enlarged Segmented Progress Bar */}
            <div style={{
              width: '100%',
              height: '44px', // Sized up height
              border: '3px solid #E50914', // Bolder Signature Red Outline
              borderRadius: '8px',
              padding: '4px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}>
              {Array.from({ length: 10 }).map((_, idx) => {
                const active = progress >= (idx + 1) * 10
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: '100%',
                      backgroundColor: '#E50914', // Signature Red Fill
                      borderRadius: '3px',
                      opacity: active ? 1 : 0,
                      transform: active ? 'scale(1)' : 'scale(0.85)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                )
              })}
            </div>

            {/* Sized Up Status Text */}
            <span style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(13px, 1.8vw, 16px)', // Enlarged font size
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#E50914', // Signature Red
              marginTop: '24px',
              textAlign: 'center',
              animation: 'pulseText 1.5s infinite ease-in-out',
            }}>
              {progress < 100
                ? 'Entering Archive...'
                : !assetsLoaded
                  ? 'Optimizing layouts...'
                  : 'System Ready'}
            </span>
          </div>

          <style>{`
            @keyframes pulseText {
              0%, 100% { opacity: 0.45; }
              50% { opacity: 1; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

