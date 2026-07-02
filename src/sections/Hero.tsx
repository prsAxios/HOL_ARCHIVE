import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap-config'

// Color phases using theme variables for direct, clean transitions
const PHASES = [
  'var(--hol-white)', // White
  'var(--hol-red)',   // Red
  'var(--hol-gold)',  // Gold
  'var(--hol-black)', // Black
]

export default function Hero() {
  const headRef    = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const phaseIdx   = useRef(0)

  // Text entrance
  useEffect(() => {
    const lines = headRef.current?.querySelectorAll<HTMLElement>('.hero-line') ?? []
    gsap.fromTo(lines,
      { y: 52, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.14, ease: 'expo.out', delay: 0.25 }
    )
  }, [])

  // Logo: fade-in → color cycle → coin-toss loop
  useEffect(() => {
    const logoEl = logoRef.current
    if (!logoEl) return

    // Initial fade-in
    gsap.fromTo(logoEl, { autoAlpha: 0, scale: 0.7 }, {
      autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.8,
    })

    // Apply first phase immediately
    logoEl.style.backgroundColor = PHASES[0]

    // Color phase cycle every 3.5 s
    const cycleInterval = setInterval(() => {
      phaseIdx.current = (phaseIdx.current + 1) % PHASES.length
      logoEl.style.backgroundColor = PHASES[phaseIdx.current]
    }, 3500)

    // Coin-toss loop (starts after entrance)
    function toss() {
      const spins    = (2 + Math.floor(Math.random() * 3)) * 360
      const duration = 0.9 + Math.random() * 2.2
      const pause    = 0.8 + Math.random() * 1.6
      gsap.to(logoEl, {
        rotateY: `+=${spins}`,
        transformPerspective: 700,
        duration,
        ease: 'power1.inOut',
        delay: pause,
        onComplete: toss,
      })
    }
    const t = setTimeout(toss, 2200)

    return () => { clearInterval(cycleInterval); clearTimeout(t) }
  }, [])

  return (
    <>
      <div style={{
        position: 'relative', width: '100%', height: '100vh',
        minHeight: '600px', backgroundColor: 'var(--hol-bg)', overflow: 'hidden',
      }}>
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px', backgroundColor: '#E50914', zIndex: 30,
        }} />

        {/* ── Center Logo ── */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}>
          <div
            ref={logoRef}
            style={{
              display: 'block',
              width: 'clamp(110px, 14vw, 200px)',
              aspectRatio: '1 / 1',
              opacity: 0,
              backgroundColor: PHASES[0],
              maskImage: "url('/images/Logo/HOL_MAIN_LOGO.png')",
              WebkitMaskImage: "url('/images/Logo/HOL_MAIN_LOGO.png')",
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              transition: 'background-color 2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        {/* Bottom-left text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'flex-end',
          padding: '0 clamp(24px, 6vw, 80px) clamp(48px, 8vh, 100px)',
        }}>
          <div ref={headRef}>
            {['Hospitality', 'Operations', 'Logistics'].map((word, i) => (
              <p key={word} className="hero-line" style={{
                fontFamily: 'Sora, sans-serif', fontWeight: 700,
                fontSize: 'clamp(24px, 7vw, 87px)',
                lineHeight: 1.0, letterSpacing: '-0.03em',
                color: i === 0 ? 'var(--hol-text)' : 'var(--hol-muted)',
                margin: 0, opacity: 0, userSelect: 'none',
              }}>
                {word}
              </p>
            ))}
          </div>
        </div>


        <div style={{
          position: 'absolute', bottom: '20px',
          right: 'clamp(20px, 4vw, 56px)', zIndex: 20,
        }}>
          <span style={{
            fontSize: '10px', letterSpacing: '0.22em',
            color: 'var(--hol-faint)', fontFamily: 'Sora, sans-serif',
            textTransform: 'uppercase',
          }}>Scroll Down</span>
        </div>
      </div>
    </>
  )
}

