import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap-config'
import HolSeal from '../components/HolSeal'

const ACCENT = '#C2AE6D'
const WORD_FS = 'clamp(40px, 7vw, 100px)'
const HOL_FS  = 'clamp(52px, 11vw, 150px)'

export default function BrandReveal() {
  const sectionRef = useRef<HTMLElement>(null)

  /* Word rows */
  const hWrap = useRef<HTMLDivElement>(null)
  const oWrap = useRef<HTMLDivElement>(null)
  const lWrap = useRef<HTMLDivElement>(null)

  /* Individual first-letter refs (for finale extraction) */
  const hLetter = useRef<HTMLSpanElement>(null)
  const oLetter = useRef<HTMLSpanElement>(null)
  const lLetter = useRef<HTMLSpanElement>(null)
  const hRest   = useRef<HTMLSpanElement>(null)
  const oRest   = useRef<HTMLSpanElement>(null)
  const lRest   = useRef<HTMLSpanElement>(null)

  /* Finale */
  const finaleRef  = useRef<HTMLDivElement>(null)
  const holRef     = useRef<HTMLSpanElement>(null)
  const archiveRef = useRef<HTMLSpanElement>(null)
  const tagRef     = useRef<HTMLParagraphElement>(null)
  const sealWrap   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([hWrap.current, oWrap.current, lWrap.current], { autoAlpha: 0 })
        gsap.set(finaleRef.current, { autoAlpha: 1 })
        return
      }

      /* â”€â”€ Initial state â”€â”€ */
      gsap.set([hWrap.current, oWrap.current, lWrap.current], { autoAlpha: 0, y: 60 })
      gsap.set(finaleRef.current, { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          anticipatePin: 1,
          scrub: 1.8,
        },
      })

      /* â”€â”€ 1. Hospitality in â”€â”€ */
      tl.to(hWrap.current, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' }, 0)

      /* â”€â”€ 2. Operations in â”€â”€ */
      tl.to(oWrap.current, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' }, 1.2)

      /* â”€â”€ 3. Logistics in â”€â”€ */
      tl.to(lWrap.current, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' }, 2.4)

      /* â”€â”€ Hold all 3 visible â”€â”€ */
      tl.to({}, { duration: 1 }, 3.4)

      /* â”€â”€ 4. Collapse: fade out the "rest" of each word â”€â”€ */
      tl.to([hRest.current, oRest.current, lRest.current], {
        autoAlpha: 0, x: 30, duration: 0.8, ease: 'power3.in', stagger: 0.08,
      }, 4.4)

      /* â”€â”€ 5. First letters scale up & converge to center â”€â”€ */
      tl.to([hLetter.current, oLetter.current, lLetter.current], {
        scale: 1.6, duration: 0.6, ease: 'power2.in',
      }, 4.4)

      tl.to(hWrap.current, { x: '18vw', y: '-2vh', duration: 0.8, ease: 'power4.inOut' }, 5.0)
      tl.to(oWrap.current, { x: '0vw',  y: '0vh',  duration: 0.8, ease: 'power4.inOut' }, 5.0)
      tl.to(lWrap.current, { x: '-18vw', y: '2vh', duration: 0.8, ease: 'power4.inOut' }, 5.0)

      /* Fade out word rows as finale fades in */
      tl.to([hWrap.current, oWrap.current, lWrap.current], {
        autoAlpha: 0, duration: 0.5, ease: 'power2.in',
      }, 5.6)

      /* â”€â”€ 6. HOL Archive lockup assembles â”€â”€ */
      tl.set(finaleRef.current, { autoAlpha: 1 }, 5.8)
      tl.set(holRef.current,     { autoAlpha: 0, scale: 1.4 }, 5.8)
      tl.set(archiveRef.current, { autoAlpha: 0, x: 40 }, 5.8)
      tl.set(tagRef.current,     { autoAlpha: 0, y: 16 }, 5.8)
      tl.set(sealWrap.current,   { autoAlpha: 0, scale: 0.6, rotation: -20 }, 5.8)

      tl.to(holRef.current, {
        autoAlpha: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)',
      }, 5.9)

      tl.to(archiveRef.current, {
        autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out',
      }, 6.4)

      tl.to(tagRef.current, {
        autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out',
      }, 6.9)

      tl.to(sealWrap.current, {
        autoAlpha: 1, scale: 1, rotation: 0,
        duration: 1.1, ease: 'back.out(1.4)',
      }, 7.0)

      /* Hold finale */
      tl.to({}, { duration: 2.5 }, 8.0)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const wordStyle: React.CSSProperties = {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700,
    fontSize: WORD_FS, lineHeight: 1, letterSpacing: '-0.02em',
  }

  return (
    <section
      ref={sectionRef}
      id="brand-reveal"
      style={{
        position: 'relative', width: '100%', height: '100vh',
        backgroundColor: 'var(--hol-bg)', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Stacked words */}
      <div style={{
        position: 'absolute',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        gap: 'clamp(6px, 1.2vw, 18px)',
        padding: '0 clamp(24px, 6vw, 80px)',
      }}>

        {/* Hospitality */}
        <div ref={hWrap} style={{ display: 'flex', alignItems: 'baseline' }}>
          <span ref={hLetter} style={{ ...wordStyle, color: ACCENT, display: 'inline-block' }}>H</span>
          <span ref={hRest}   style={{ ...wordStyle, color: 'var(--hol-text)', display: 'inline-block' }}>ospitality</span>
        </div>

        {/* Operations */}
        <div ref={oWrap} style={{ display: 'flex', alignItems: 'baseline' }}>
          <span ref={oLetter} style={{ ...wordStyle, color: ACCENT, display: 'inline-block' }}>O</span>
          <span ref={oRest}   style={{ ...wordStyle, color: 'var(--hol-text)', display: 'inline-block' }}>perations</span>
        </div>

        {/* Logistics */}
        <div ref={lWrap} style={{ display: 'flex', alignItems: 'baseline' }}>
          <span ref={lLetter} style={{ ...wordStyle, color: ACCENT, display: 'inline-block' }}>L</span>
          <span ref={lRest}   style={{ ...wordStyle, color: 'var(--hol-text)', display: 'inline-block' }}>ogistics</span>
        </div>
      </div>

      {/* Finale lockup â€” centered */}
      <div
        ref={finaleRef}
        style={{
          position: 'absolute',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.06em' }}>
          <span
            ref={holRef}
            style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700,
              fontSize: HOL_FS, lineHeight: 1, letterSpacing: '-0.03em',
              color: ACCENT, display: 'inline-block', willChange: 'transform, opacity',
            }}
          >
            HOL
          </span>
          <span
            ref={archiveRef}
            style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 300,
              fontSize: 'clamp(40px, 8vw, 110px)', lineHeight: 1, letterSpacing: '0.04em',
              color: 'var(--hol-text)', display: 'inline-block',
              marginLeft: '0.2em', willChange: 'transform, opacity',
            }}
          >
            Archive
          </span>
        </div>

        <p
          ref={tagRef}
          style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 300,
            fontSize: 'clamp(11px, 1vw, 14px)',
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--hol-muted)', margin: 'clamp(12px, 2vw, 24px) 0 0',
            willChange: 'transform, opacity',
          }}
        >
          Hospitality&nbsp;Â·&nbsp;Operations&nbsp;Â·&nbsp;Logistics
        </p>

        {/* Wax seal spins in last */}
        <div
          ref={sealWrap}
          style={{ marginTop: 'clamp(20px, 3vw, 36px)', willChange: 'transform, opacity' }}
        >
          <HolSeal size={120} animate={false} />
        </div>
      </div>
    </section>
  )
}

