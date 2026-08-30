import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { gsap } from '../lib/gsap-config'

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<any>(null)
  const navigate = useNavigate()

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Calculate 1.5 aspect ratio dimensions to cover the viewport perfectly
  // without object-fit cropping, ensuring that percentages align with actual image pixels.
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight
      const vw = window.innerWidth
      const aspectRatio = 2528 / 1684
      let w = vw
      let h = vh

      if (vw / vh > aspectRatio) {
        w = vw
        h = vw / aspectRatio
      } else {
        h = vh
        w = vh * aspectRatio
      }

      setDimensions({ width: w, height: h })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Spring-like mouse parallax depth effect
  // Excluded from React rendering cycles to maintain a solid 60 FPS.
  useEffect(() => {
    // Check if the device has a mouse/pointer capability for hover
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasHover) return

    const innerEl = innerRef.current
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      // Normalise coordinates (-1 to 1)
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }

    let frameId: number
    const tick = () => {
      if (innerEl) {
        const progress = triggerRef.current ? triggerRef.current.progress : 0
        // Parallax fades out completely by 30% scroll progress to allow centering zoom
        const intensity = Math.max(0, 1 - progress / 0.3)

        const targetX = mouseX * 25 * intensity
        const targetY = mouseY * 15 * intensity

        // Lerp for smooth inertia
        currentX += (targetX - currentX) * 0.08
        currentY += (targetY - currentY) * 0.08

        innerEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    frameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
    }
  }, [])

  // Cinematic GSAP ScrollTrigger timeline
  useEffect(() => {
    const section = sectionRef.current
    const imageContainer = containerRef.current
    const cta = ctaRef.current
    const blackOverlay = overlayRef.current

    if (!section || !imageContainer || !cta || !blackOverlay || dimensions.width === 0) return

    // Clean initial styles
    gsap.set(blackOverlay, { opacity: 0 })
    gsap.set(cta, { opacity: 0, y: 24, display: 'none' })

    // Exact pupil coordinates from browser canvas pixel analysis
    const px = 0.48980
    const py = 0.518678

    // Center targeting translation math
    const tx = (0.5 - px) * dimensions.width
    const ty = (0.5 - py) * dimensions.height

    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=3500',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            triggerRef.current = self
          },
        },
      })

      // 0.2 – 0.95: Infinite portal zoom focusing on pupil center coordinates
      tl.to(imageContainer, {
        scale: 25,
        x: tx,
        y: ty,
        duration: 0.75,
        ease: 'power2.in',
      }, 0.2)

      // 0.2 – 0.8: Vignette and ambient atmospheric darkening increases
      tl.to(blackOverlay, {
        opacity: 0.6,
        duration: 0.6,
        ease: 'power1.inOut',
      }, 0.2)

      // 0.8 – 0.95: Transition to pure black background
      tl.to(blackOverlay, {
        opacity: 1.0,
        duration: 0.15,
        ease: 'power2.in',
      }, 0.8)

      // 0.90 – 0.95: CTA fades in and emerges from the darkness
      tl.set(cta, { display: 'flex' }, 0.9)
      tl.to(cta, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        ease: 'power3.out',
      }, 0.9)

      // 0.95 – 1.0: Scroll cushion / hold to allow CTA readability and interaction
      tl.to({}, { duration: 0.05 }) // empty tween to hold scroll state
    }, section)

    return () => context.revert()
  }, [dimensions])

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >

      {/* Top Left Section Indicator Tag */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(24px, 5vw, 80px)',
          top: 'clamp(100px, 12vh, 140px)',
          zIndex: 40,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5.5vw, 80px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            color: 'white',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          Vision
        </span>
      </div>


      {/* ── Image Zoom Wrapper ── */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: dimensions.width || '100%',
          height: dimensions.height || '100%',
          marginLeft: dimensions.width ? -dimensions.width / 2 : 0,
          marginTop: dimensions.height ? -dimensions.height / 2 : 0,
          transformOrigin: '48.9800% 51.8678%',
          willChange: 'transform',
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            willChange: 'transform',
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/Vision_Section.png"
            alt="Vision"
            style={{
              width: '100%',
              height: '110%',
              display: 'block',
              transform: 'scale(1.06)',
              transformOrigin: '48.9800% 51.8678%',
            }}
          />

          {/* Feather-blended black circle helper at the pupil center */}
          <div
            style={{
              position: 'absolute',
              left: '48.9780%',
              top: '56.8770%',
              width: '5.5379%',
              aspectRatio: '1 / 1',
              backgroundColor: '#d40303ff',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* ── Cinematic Ambient Vignette ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* ── Transition Black Overlay ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          zIndex: 10,
          pointerEvents: 'none',
          willChange: 'opacity',
        }}
      />

      {/* ── Luxury CTA Reveal Container ── */}
      <div
        ref={ctaRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 30,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E50914', // Red background
          padding: '24px',
          textAlign: 'center',
          willChange: 'opacity, transform',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            marginBottom: '24px',
            opacity: 0.85,
            background: 'url("/images/Logo/HOL_MAIN_LOGO.png") no-repeat center',
            backgroundSize: 'contain',
          }}
        />

        <p
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--hol-gold)',
            margin: '0 0 16px',
          }}
        >
          System Access
        </p>



        <button
          onClick={() => navigate('/founder')}
          style={{
            background: 'none',
            border: '1px solid var(--hol-gold)',
            color: 'var(--hol-gold)',
            fontFamily: 'Sora, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            padding: '16px 48px',
            borderRadius: '0px',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--hol-gold)'
            e.currentTarget.style.color = '#E50914'
            e.currentTarget.style.boxShadow = '0 0 25px rgba(194, 174, 109, 0.35)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'var(--hol-gold)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          CLICK TO KNOW MORE
        </button>
      </div>

    </section>
  )
}

