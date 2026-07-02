import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap-config'

const WORD_FS = 'clamp(36px, 6vw, 85px)'

export default function BrandReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const folderContainerRef = useRef<HTMLDivElement>(null)
  const folderImgRef = useRef<HTMLImageElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const archivedTextRef = useRef<HTMLDivElement>(null)

  /* Word wrappers & letter refs for convergence */
  const hWrapRef = useRef<HTMLDivElement>(null)
  const oWrapRef = useRef<HTMLDivElement>(null)
  const lWrapRef = useRef<HTMLDivElement>(null)

  const hLetterRef = useRef<HTMLSpanElement>(null)
  const oLetterRef = useRef<HTMLSpanElement>(null)
  const lLetterRef = useRef<HTMLSpanElement>(null)

  const hRestRef = useRef<HTMLSpanElement>(null)
  const oRestRef = useRef<HTMLSpanElement>(null)
  const lRestRef = useRef<HTMLSpanElement>(null)

  const [isMobile, setIsMobile] = useState(false)

  // Track responsive screen state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ── GSAP ANIMATION TIMELINE ──
  useEffect(() => {
    const section = sectionRef.current
    const folderContainer = folderContainerRef.current
    const folderImg = folderImgRef.current
    const logo = logoRef.current

    if (!section || !folderContainer || !folderImg || !logo) return

    // Word wrappers
    const hWrap = hWrapRef.current
    const oWrap = oWrapRef.current
    const lWrap = lWrapRef.current

    // Suffix rest blocks
    const hRest = hRestRef.current
    const oRest = oRestRef.current
    const lRest = lRestRef.current

    // Individual character spans
    const hFirst = hLetterRef.current
    const oFirst = oLetterRef.current
    const lFirst = lLetterRef.current

    const hChars = hRest?.querySelectorAll('.char-span')
    const oChars = oRest?.querySelectorAll('.char-span')
    const lChars = lRest?.querySelectorAll('.char-span')

    const getFlightTargets = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w < 768) {
        // Mobile: moves from top text column down to the folder opening
        return {
          hX: 0, hY: h * 0.33 + 10,
          oX: 0, oY: h * 0.33 - 35,
          lX: 0, lY: h * 0.33 - 80,
        }
      } else {
        // Desktop: moves from left text column to right folder opening
        return {
          hX: w * 0.33, hY: 25,
          oX: w * 0.33, oY: -35,
          lX: w * 0.33, lY: -95,
        }
      }
    }

    const ctx = gsap.context(() => {
      // Initial resets
      gsap.set([hFirst, oFirst, lFirst, hChars, oChars, lChars], { opacity: 0, y: 35 })
      gsap.set(folderContainer, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.6 })
      gsap.set(logo, { opacity: 0, scale: 0.8 })
      gsap.set(archivedTextRef.current, { opacity: 0, y: 15 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerWidth < 768 ? 2500 : 4500}`,
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1. Hospitality entry (letter by letter)
      tl.to(hFirst, { opacity: 1, y: 0, duration: 0.3 }, 0)
      if (hChars && hChars.length > 0) {
        tl.to(hChars, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, 0.1)
      }

      // 2. Operations entry (letter by letter)
      tl.to(oFirst, { opacity: 1, y: 0, duration: 0.3 }, 0.7)
      if (oChars && oChars.length > 0) {
        tl.to(oChars, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, 0.8)
      }

      // 3. Logistics entry (letter by letter)
      tl.to(lFirst, { opacity: 1, y: 0, duration: 0.3 }, 1.4)
      if (lChars && lChars.length > 0) {
        tl.to(lChars, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, 1.5)
      }

      // Hold state
      tl.to({}, { duration: 0.4 })

      // 4. Folder canvas fades in and scales up
      tl.to(folderContainer, { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' }, '+=0.1')
      tl.to(logo, { opacity: 0.85, scale: 1, duration: 0.7, ease: 'power2.out' }, '<')

      // 5. Folder glows/pulses softly to receive papers
      tl.to(folderImg, {
        filter: 'drop-shadow(0 0 25px #a8b8c8) drop-shadow(0 15px 30px rgba(0,0,0,0.5))',
        duration: 0.7,
        ease: 'power2.inOut',
      })

      // 6. Fly the ENTIRE words into the folder mouth opening
      tl.to(hWrap, { 
        x: () => getFlightTargets().hX, 
        y: () => getFlightTargets().hY, 
        scale: 0.1, 
        opacity: 0, 
        duration: 1.1, 
        ease: 'power2.inOut' 
      }, '>-0.1')
      tl.to(oWrap, { 
        x: () => getFlightTargets().oX, 
        y: () => getFlightTargets().oY, 
        scale: 0.1, 
        opacity: 0, 
        duration: 1.1, 
        ease: 'power2.inOut' 
      }, '<')
      tl.to(lWrap, { 
        x: () => getFlightTargets().lX, 
        y: () => getFlightTargets().lY, 
        scale: 0.1, 
        opacity: 0, 
        duration: 1.1, 
        ease: 'power2.inOut' 
      }, '<')

      // 7. Folder glow returns to normal
      tl.to(folderImg, {
        filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.45))',
        duration: 0.7,
        ease: 'power2.inOut',
      }, '>-0.1')

      // 8. Center the Folder and scale it up showing the Logo flat on the front
      tl.to(folderContainer, { 
        x: () => (window.innerWidth < 768 ? '0' : '-16vw'), 
        y: () => (window.innerWidth < 768 ? '-20vh' : '0'), 
        scale: 1.35, 
        duration: 1.0, 
        ease: 'power2.inOut' 
      }, '>-0.1')
      tl.to(logo, { opacity: 1.0, duration: 1.0, ease: 'power2.inOut' }, '<')
      tl.to(archivedTextRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '>-0.3')

      // Cushion hold at the end of the section scroll
      tl.to({}, { duration: 1.5 })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [isMobile])

  // Helper to render a word letter-by-letter
  const renderWord = (
    word: string,
    wordWrapRef: React.RefObject<HTMLDivElement | null>,
    charClass: string,
    letterRef: React.RefObject<HTMLSpanElement | null>,
    restRef: React.RefObject<HTMLSpanElement | null>
  ) => {
    const firstLetter = word[0]
    const rest = word.slice(1)

    const wordStyle: React.CSSProperties = {
      fontFamily: 'Sora, sans-serif',
      fontWeight: 700,
      fontSize: WORD_FS,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
    }

    return (
      <div
        ref={wordWrapRef}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          willChange: 'transform, opacity',
        }}
      >
        <span
          ref={letterRef}
          className={`${charClass} first-letter`}
          style={{ ...wordStyle, color: '#A8B8C8', display: 'inline-block' }}
        >
          {firstLetter}
        </span>
        <span
          ref={restRef}
          className={`${charClass} rest-letters`}
          style={{ ...wordStyle, color: 'var(--hol-text)', display: 'inline-block' }}
        >
          {rest.split('').map((char, index) => (
            <span
              key={index}
              className="char-span"
              style={{ display: 'inline-block', willChange: 'transform, opacity' }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="brand-reveal"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--hol-bg)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Google Fonts Sora Loader ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');
      `}</style>
      {/* ── Main Container: Split Column Layout on Desktop, Staggered on Mobile ── */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '1440px',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left Column: Stacked Words */}
        <div
          ref={textColRef}
          style={{
            position: 'absolute',
            left: isMobile ? '50%' : '15%',
            top: isMobile ? '28%' : '50%',
            transform: isMobile ? 'translate(-50%, -50%)' : 'translate(0, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 'clamp(8px, 1.5vw, 24px)',
            padding: '0 clamp(16px, 5vw, 60px)',
            zIndex: 20,
            width: isMobile ? '90%' : 'auto',
          }}
        >
          {renderWord('Hospitality', hWrapRef, 'h-char', hLetterRef, hRestRef)}
          {renderWord('Operations', oWrapRef, 'o-char', oLetterRef, oRestRef)}
          {renderWord('Logistics', lWrapRef, 'l-char', lLetterRef, lRestRef)}
        </div>

        {/* Right Column: Flat Folder Icon, Logo Overlay & Text below */}
        <div
          ref={folderContainerRef}
          style={{
            position: 'absolute',
            left: isMobile ? '50%' : '66%',
            top: isMobile ? '70%' : '50%',
            width: isMobile ? '310px' : '520px',
            pointerEvents: 'none',
            zIndex: 15,
            willChange: 'transform, opacity',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(20px, 3vh, 48px)', // Spacing between folder and the text below
          }}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            {/* The Folder Image */}
            <img
              ref={folderImgRef}
              src="/images/folder_icon.png"
              alt="Archive Folder"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.45))',
                willChange: 'filter',
              }}
            />
            {/* Logo overlay mapped precisely on the front cover flap with 3D perspective skew */}
            <div
              ref={logoRef}
              style={{
                position: 'absolute',
                left: '52%',
                top: '51%',
                width: '32%',
                height: '32%',
                backgroundImage: 'url("/images/Logo/HOL_MAIN_LOGO.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // Rotate and skew to match folder flap's exact 3D tilt
                transform: 'translate(-50%, -50%) rotate(-10deg) skewY(-5deg) skewX(2deg)',
                opacity: 0.85,
                willChange: 'opacity, transform',
              }}
            />
          </div>

          {/* Big Bold text below the folder */}
          <div
            ref={archivedTextRef}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(28px, 4.5vw, 64px)',
              fontWeight: 400, // Extra Bold
              letterSpacing: '-0.02em',
              color: 'var(--hol-text)',
              textAlign: 'center',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              width: '100%',
              willChange: 'opacity, transform',
            }}
          >
            HOL <span style={{ color: '#A8B8C8' }}>Archived</span>
          </div>
        </div>
      </div>
    </section>
  )
}
