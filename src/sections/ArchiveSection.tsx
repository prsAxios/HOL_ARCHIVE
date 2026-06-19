import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { gsap, ScrollTrigger } from '../lib/gsap-config'

export default function ArchiveSection() {
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        }
      })

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
      )

      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="archive"
      style={{
        backgroundColor: '#0b0b0b',
        color: '#F4F1EC',
        padding: 'clamp(80px, 12vh, 180px) 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '100%' }}>
        <h2
          ref={titleRef}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(54px, 14vw, 170px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#F4F1EC',
            margin: '0 0 clamp(24px, 5vh, 48px)',
            userSelect: 'none',
          }}
        >
          ARCHIVE
        </h2>
        <button
          ref={ctaRef}
          onClick={() => navigate('/archive')}
          style={{
            background: 'none',
            border: '1px solid rgba(244, 241, 236, 0.2)',
            color: '#F4F1EC',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: '12px 32px',
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
            e.currentTarget.style.borderColor = 'rgba(244, 241, 236, 0.2)'
            e.currentTarget.style.color = '#F4F1EC'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'scale(1.0)'
          }}
        >
          Explore Archive
        </button>
      </div>
    </section>
  )
}
