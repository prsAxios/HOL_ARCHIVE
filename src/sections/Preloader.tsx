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
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Manage body scroll lock and ready classes
  useEffect(() => {
    if (done) {
      document.body.classList.add('hol-ready')
      document.body.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [done])

  // Fallback safety timeout to prevent locking the screen if video fails
  useEffect(() => {
    if (done) return

    const fallbackTimer = setTimeout(() => {
      console.warn('Loader video playback timed out. Skipping to website.')
      setIsVisible(false)
    }, 6000)

    return () => clearTimeout(fallbackTimer)
  }, [done])

  const handleVideoPlay = () => {
    setVideoLoaded(true)
  }

  const handleVideoEnded = () => {
    setIsVisible(false)
  }

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
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            src="/videos/Loader_video.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onPlay={handleVideoPlay}
            onEnded={handleVideoEnded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              backgroundColor: '#000000',
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
