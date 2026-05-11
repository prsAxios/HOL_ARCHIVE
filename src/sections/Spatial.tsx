import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Spatial() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  return (
    <section
      id="spatial"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/hero-interior.mp4"
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.6) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.4em',
            color: '#0a0a0a',
            textTransform: 'uppercase',
            marginBottom: '24px',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          Park Interiors &middot; Est. 2000
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(56px, 10vw, 140px)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#0a0a0a',
            maxWidth: '1200px',
            fontFamily: 'Playfair Display, serif',
            marginBottom: '32px',
          }}
        >
          Elevated Living
          <br />
          Through Artful Design
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            fontWeight: 300,
            lineHeight: 1.8,
            color: '#444444',
            maxWidth: '600px',
            marginBottom: '48px',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          Creating timeless residential and commercial spaces that harmonize 
          form, function, and the human spirit.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: hovered ? '#ffffff' : '#0a0a0a',
              backgroundColor: hovered ? '#0a0a0a' : 'transparent',
              border: '1px solid #0a0a0a',
              padding: '20px 48px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Explore Projects
          </button>
        </motion.div>
      </div>
    </section>
  )
}
