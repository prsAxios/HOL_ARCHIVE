import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { gsap, ScrollTrigger } from '../lib/gsap-config'
import { useTheme } from '../context/ThemeContext'

export default function ArchiveSection() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%', // Trigger when section top is 85% from viewport top
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        }
      })

      // Animate the entire content block (Title + Button) together
      // to guarantee perfect synchronisation and prevent visibility conflicts.
      tl.from(contentRef.current, {
        opacity: 0, 
        y: 50, 
        scale: 0.98, 
        duration: 1.2, 
        ease: 'power3.out'
      })
    }, sectionRef)

    // Refresh ScrollTrigger to correct any positioning discrepancies
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      ctx.revert()
      clearTimeout(t)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="archive"
      style={{
        backgroundColor: 'var(--hol-bg)',
        color: 'var(--hol-text)',
        height: '100dvh', // Full screen height like hero section
        width: '100%', // Full screen width
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        borderTop: '1px solid var(--hol-border)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div 
        ref={contentRef} 
        style={{ 
          textAlign: 'center', 
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(24px, 4vh, 48px)'
        }}
      >
        <h2
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(54px, 14vw, 170px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: 'var(--hol-text)',
            margin: 0,
            userSelect: 'none',
            transition: 'color 0.4s ease',
          }}
        >
          ARCHIVE
        </h2>
        <button
          onClick={() => navigate('/archive')}
          style={{
            background: 'none',
            border: '1px solid var(--hol-text)', // Highly visible border
            color: 'var(--hol-text)',
            fontFamily: 'Sora, sans-serif',
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: '14px 36px',
            borderRadius: '100px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#C2AE6D'
            e.currentTarget.style.color = '#C2AE6D'
            e.currentTarget.style.background = 'rgba(194, 174, 109, 0.05)'
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--hol-text)'
            e.currentTarget.style.color = 'var(--hol-text)'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'scale(1.0)'
          }}
        >
          Explore Catalog &rarr;
        </button>
      </div>
    </section>
  )
}

