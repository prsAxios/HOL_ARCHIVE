import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap, SplitText } from '../lib/gsap-config'
import Footer from '../sections/Footer'
import { useTheme } from '../context/ThemeContext'
import OrchestrateNumbers from '../sections/OrchestrateNumbers'

export default function OrchestratePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  const [scrollProgress, setScrollProgress] = useState(0)

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {
      // 1. Hero Placeholder Entrance
      gsap.fromTo(placeholderRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 1.6, ease: 'power3.out' }
      )

      // 2. Parallax Motion on Hero Placeholder
      gsap.to(placeholderRef.current, {
        yPercent: 12,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      // 3. Title Character Reveal using SplitText
      if (titleRef.current) {
        const titleSplit = new SplitText(titleRef.current, { type: 'chars' })
        gsap.fromTo(titleSplit.chars,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.03, delay: 0.3 }
        )
      }

      // 4. Hero Subtitle Line Reveal
      if (descRef.current) {
        const descSplit = new SplitText(descRef.current, { type: 'lines' })
        gsap.fromTo(descSplit.lines,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.08, delay: 0.7 }
        )
      }
    }, page)

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      ref={pageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        backgroundColor: 'var(--hol-bg)',
        color: 'var(--hol-text)',
        minHeight: '100vh',
        overflowX: 'hidden',
        fontFamily: "'Sora', sans-serif",
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      {/* ── Google Fonts Sora Loader ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');
      `}</style>
      {/* Reading Progress Indicator */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          backgroundColor: '#E50914',
          zIndex: 1000,
          transition: 'width 0.1s ease-out',
        }}
      />

      {/* 80vh Hero Area with Grid-Lines Placeholder */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          backgroundColor: 'var(--hol-bg)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'end',
          transition: 'background-color 0.4s ease',
        }}
      >
        <div
          ref={placeholderRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '115%',
            willChange: 'transform',
          }}
        >
          <img
            src="/images/Why_we_orchestrate.jpeg"
            alt="Orchestrate"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Cinematic bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isDark
              ? 'linear-gradient(to top, #0b0b0b 0%, rgba(11,11,11,0.4) 40%, transparent 100%)'
              : 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.4) 40%, transparent 100%)',
            pointerEvents: 'none',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Title and Description Overlay */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px 64px', zIndex: 10 }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(46px, 8.5vw, 110px)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: 'var(--hol-text)',
              marginBottom: '28px',
              textTransform: 'uppercase',
              transition: 'color 0.4s ease',
            }}
          >
            Orchestrate
          </h1>

        </div>
      </div>

      {/* Main pinned stack section */}
      <OrchestrateNumbers />


      {/* Reused Website Footer */}
      <Footer />
    </motion.div>
  )
}

