import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap-config'

export default function Spatial() {
  const sectionRef = useRef<HTMLElement>(null)
  const aRef = useRef<HTMLSpanElement>(null)
  const rRef = useRef<HTMLSpanElement>(null)
  const cRef = useRef<HTMLSpanElement>(null)
  const aWordRef = useRef<HTMLDivElement>(null)
  const rWordRef = useRef<HTMLDivElement>(null)
  const cWordRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set everything invisible before timeline starts
      gsap.set(
        [aRef.current, rRef.current, cRef.current,
         aWordRef.current, rWordRef.current, cWordRef.current,
         taglineRef.current, ctaRef.current],
        { opacity: 0 }
      )

      const tl = gsap.timeline({ delay: 0.4 })

      // ── A: blasts in from the left ──────────────────────────────────────
      tl.fromTo(
        aRef.current,
        { x: '-70vw', scale: 1.6, filter: 'blur(32px)', opacity: 0 },
        { x: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.0, ease: 'expo.out' }
      )
      // "Artistry" rises in below A
      .fromTo(
        aWordRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        '-=0.25'
      )

      // ── R: drops from above ──────────────────────────────────────────────
      .fromTo(
        rRef.current,
        { y: '-60vh', scale: 1.5, filter: 'blur(32px)', opacity: 0 },
        { y: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.0, ease: 'expo.out' },
        '+=0.08'
      )
      // "Refinement"
      .fromTo(
        rWordRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        '-=0.25'
      )

      // ── C: blasts in from the right ──────────────────────────────────────
      .fromTo(
        cRef.current,
        { x: '70vw', scale: 1.6, filter: 'blur(32px)', opacity: 0 },
        { x: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.0, ease: 'expo.out' },
        '+=0.08'
      )
      // "Curation"
      .fromTo(
        cWordRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        '-=0.25'
      )

      // ── Tagline ───────────────────────────────────────────────────────────
      .fromTo(
        taglineRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out' },
        '+=0.15'
      )

      // ── CTA ───────────────────────────────────────────────────────────────
      .fromTo(
        ctaRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out' },
        '-=0.55'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="spatial"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        backgroundColor: 'var(--hol-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '96px',
      }}
    >
      {/* Letters row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 'clamp(12px, 3.5vw, 56px)',
          width: '100%',
          padding: '0 clamp(20px, 4vw, 64px)',
        }}
      >
        {/* A */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <span
            ref={aRef}
            style={{
              display: 'block',
              fontSize: 'clamp(150px, 24vw, 340px)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: 'var(--hol-text)',
              fontFamily: 'Jost, sans-serif',
              userSelect: 'none',
            }}
          >
            A
          </span>
          <div ref={aWordRef} style={{ textAlign: 'center' }}>
            <span style={wordStyle}>Artistry</span>
          </div>
        </div>

        {/* R */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <span
            ref={rRef}
            style={{
              display: 'block',
              fontSize: 'clamp(150px, 24vw, 340px)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: 'var(--hol-text)',
              fontFamily: 'Jost, sans-serif',
              userSelect: 'none',
            }}
          >
            R
          </span>
          <div ref={rWordRef} style={{ textAlign: 'center' }}>
            <span style={wordStyle}>Refinement</span>
          </div>
        </div>

        {/* C */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <span
            ref={cRef}
            style={{
              display: 'block',
              fontSize: 'clamp(150px, 24vw, 340px)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: 'var(--hol-text)',
              fontFamily: 'Jost, sans-serif',
              userSelect: 'none',
            }}
          >
            C
          </span>
          <div ref={cWordRef} style={{ textAlign: 'center' }}>
            <span style={wordStyle}>Curation</span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        style={{
          marginTop: 'clamp(36px, 5vw, 68px)',
          fontSize: 'clamp(19px, 1.6vw, 25px)',
          fontWeight: 300,
          color: 'rgba(10,10,10,0.4)',
          letterSpacing: '0.06em',
          textAlign: 'center',
          maxWidth: '480px',
          lineHeight: 1.85,
          fontFamily: 'Jost, sans-serif',
          padding: '0 24px',
        }}
      >
        Artistry in every detail. Refinement in every moment. Curation as a legacy.
      </p>

      {/* CTA */}
      <button
        ref={ctaRef}
        onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          marginTop: '40px',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.25em',
          color: hovered ? 'var(--hol-bg)' : 'var(--hol-text)',
          backgroundColor: hovered ? 'var(--hol-text)' : 'transparent',
          border: '1px solid #0a0a0a',
          padding: '18px 52px',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          textTransform: 'uppercase',
          fontFamily: 'Jost, sans-serif',
        }}
      >
        Explore The Portfolio
      </button>
    </section>
  )
}

const wordStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 'clamp(15px, 1.1vw, 18px)',
  fontWeight: 500,
  letterSpacing: '0.3em',
  color: 'var(--hol-gold)',
  textTransform: 'uppercase',
  fontFamily: 'Jost, sans-serif',
  whiteSpace: 'nowrap',
}
