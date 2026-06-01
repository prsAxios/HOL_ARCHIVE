import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap-config'
import { useIsMobile } from '../hooks/use-mobile'

const SERVICES = ['Weddings', 'Corporate', 'Galas', 'Destinations', 'Milestones', 'Celebrations']

export default function Hero() {
  const isMobile = useIsMobile()
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState(2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline fades in once
      if (headlineRef.current) {
        gsap.fromTo(
          Array.from(headlineRef.current.children),
          { y: 48, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.18, ease: 'expo.out', delay: 1.0 }
        )
      }

      // Logo: unlimited fade-in / fade-out loop
      if (logoRef.current) {
        gsap.set(logoRef.current, { autoAlpha: 0 })
        const tl = gsap.timeline({ repeat: -1 })
        tl.to(logoRef.current, { autoAlpha: 1, duration: 1.8, ease: 'sine.inOut' })
          .to(logoRef.current, { autoAlpha: 1, duration: 2.0 })          // hold
          .to(logoRef.current, { autoAlpha: 0, duration: 1.8, ease: 'sine.inOut' })
          .to(logoRef.current, { autoAlpha: 0, duration: 0.6 })           // brief pause
      }
    }, heroRef)
    return () => ctx.revert()
  }, [isMobile])

  return (
    <div
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: isMobile ? '600px' : '700px',
        backgroundColor: 'var(--hol-bg)',
        overflow: 'hidden',
      }}
    >
      {/* Red accent line — top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', backgroundColor: '#E50914', zIndex: 30 }} />

      {/* Center logo */}
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div ref={logoRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
          <svg
            width={isMobile ? 54 : 76}
            height={isMobile ? 58 : 82}
            viewBox="0 0 56 60"
            fill="none"
            stroke="var(--hol-text)"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <polyline points="3,58 3,22 28,3 53,22 53,58" />
            <polyline points="13,58 13,28 28,14 43,28 43,58" />
          </svg>

          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: isMobile ? '28px' : '42px',
              letterSpacing: '0.42em',
              color: 'var(--hol-text)',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              margin: 0,
              lineHeight: 1,
            }}>
              HOL
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
              <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--hol-gold)', display: 'inline-block' }} />
              <p style={{
                fontSize: isMobile ? '10px' : '12px',
                letterSpacing: '0.55em',
                color: 'var(--hol-gold)',
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                margin: 0,
                textTransform: 'uppercase',
              }}>
                ARCHIVE
              </p>
              <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--hol-gold)', display: 'inline-block' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Headline bottom-left */}
      <div
        ref={headlineRef}
        style={{
          position: 'absolute',
          bottom: isMobile ? '60px' : '52px',
          left: 'clamp(20px, 4vw, 56px)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 7vw, 88px)',
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: 'var(--hol-text)',
          opacity: 0,
          margin: 0,
        }}>
          Hospitality
        </p>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 7vw, 88px)',
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: 'var(--hol-muted)',
          opacity: 0,
          margin: 0,
        }}>
          Operations & Logistics
        </p>
      </div>

      {/* Service tags right */}
      <div style={{
        position: 'absolute',
        right: 'clamp(16px, 3.5vw, 52px)',
        top: '50%',
        transform: 'translateY(-50%)',
        display: isMobile ? 'none' : 'flex', flexDirection: 'column',
        alignItems: 'flex-end', gap: '10px',
        zIndex: 20,
      }}>
        {SERVICES.map((svc, i) => {
          const isActive = i === activeService
          const isNear = Math.abs(i - activeService) === 1
          return (
            <span
              key={svc}
              onClick={() => setActiveService(i)}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: isActive ? 500 : 300,
                letterSpacing: '0.04em',
                color: isActive
                  ? 'var(--hol-text)'
                  : isNear
                    ? 'var(--hol-muted)'
                    : 'var(--hol-faint)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: isActive ? '5px 14px' : isNear ? '4px 10px' : '3px 0',
                border: isActive
                  ? '1px solid var(--hol-border)'
                  : isNear
                    ? '1px solid rgba(194,174,109,0.15)'
                    : '1px solid transparent',
                borderRadius: '100px',
                whiteSpace: 'nowrap',
              }}
            >
              {svc}
            </span>
          )
        })}
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: '20px', left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 56px)', zIndex: 10,
      }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.06em', color: 'var(--hol-faintest)', fontFamily: 'Jost, sans-serif' }}>
          ©2026 HOL Archive
        </span>
        <span style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'var(--hol-faint)', fontFamily: 'Jost, sans-serif', textTransform: 'uppercase' }}>
          Scroll Down
        </span>
      </div>
    </div>
  )
}
