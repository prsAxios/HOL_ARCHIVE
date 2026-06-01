import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap-config'

const CARDS = [
  {
    id: '001',
    letter: 'H',
    title: 'Hospitality',
    sub: 'Guest Experience Design',
    description: 'White-glove precision at every touchpoint. Bespoke event curation, elite concierge, and immersive atmospheres that define the art of welcome.',
    accent: '#E50914',
    deck: [
      '/images/team-6.jpg',
      '/images/team-4.jpg',
      '/images/team-2.jpg',
      '/images/team-1.jpg',
      '/images/rony.png',
    ],
  },
  {
    id: '002',
    letter: 'O',
    title: 'Operations',
    sub: 'Flawless Execution',
    description: 'Seamless coordination across every layer. Resource optimisation, real-time performance management, and operational frameworks built for scale.',
    accent: '#C2AE6D',
    deck: [
      '/images/team-8.jpg',
      '/images/team-7.jpg',
      '/images/team-5.jpg',
      '/images/team-3.jpg',
      '/images/pall2.jpg',
    ],
  },
  {
    id: '003',
    letter: 'L',
    title: 'Logistics',
    sub: 'End-to-End Precision',
    description: 'Global asset movement mastered. Supply-chain intelligence, precision scheduling and reliable delivery networks — always on time, every time.',
    accent: '#8E8A84',
    deck: [
      '/images/team-1.jpg',
      '/images/pall2.jpg',
      '/images/team-3.jpg',
      '/images/team-5.jpg',
      '/images/rony.png',
    ],
  },
]

// Initial stacked rotations for each image in the deck
const STACK_ROTS  = [-10, -5, 0, 5, 10]
const STACK_Y     = [18,  9,  0, -9, -18]
// Spread (hover) positions
const SPREAD_X    = [-220, -110, 0, 110, 220]
const SPREAD_ROTS = [-18, -9, 0, 9, 18]

function ServiceCard({ card, isActive }: { card: typeof CARDS[0]; isActive: boolean }) {
  const deckRef  = useRef<HTMLDivElement>(null)
  const hovered  = useRef(false)

  const spread = () => {
    if (hovered.current || !deckRef.current) return
    hovered.current = true
    const imgs = deckRef.current.querySelectorAll<HTMLElement>('.deck-img')
    gsap.to(imgs, {
      x: (_i: number) => SPREAD_X[_i],
      y: 0,
      rotation: (_i: number) => SPREAD_ROTS[_i],
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.04,
    })
  }

  const collapse = () => {
    if (!hovered.current || !deckRef.current) return
    hovered.current = false
    const imgs = deckRef.current.querySelectorAll<HTMLElement>('.deck-img')
    gsap.to(imgs, {
      x: 0,
      y: (_i: number) => STACK_Y[_i],
      rotation: (_i: number) => STACK_ROTS[_i],
      duration: 0.55,
      ease: 'power2.inOut',
      stagger: { each: 0.03, from: 'center' },
    })
  }

  return (
    <div
      onMouseEnter={spread}
      onMouseLeave={collapse}
      style={{
        flexShrink: 0,
        width: 'clamp(320px, 70vw, 1000px)',
        height: 'clamp(420px, 56vh, 700px)',
        backgroundColor: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    >
      {/* Accent letter watermark */}
      <span style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic', fontWeight: 200,
        fontSize: 'clamp(220px, 32vw, 420px)',
        color: 'transparent',
        WebkitTextStroke: `1px rgba(${card.accent === '#E50914' ? '229,9,20' : card.accent === '#C2AE6D' ? '194,174,109' : '142,138,132'},0.06)`,
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        zIndex: 0,
      }}>
        {card.letter}
      </span>

      {/* Image deck — centered */}
      <div
        ref={deckRef}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -54%)',
          zIndex: 2,
        }}
      >
        {card.deck.map((src, i) => (
          <div
            key={i}
            className="deck-img"
            style={{
              position: 'absolute',
              width:  'clamp(140px, 14vw, 210px)',
              height: 'clamp(180px, 18vw, 270px)',
              transform: `rotate(${STACK_ROTS[i]}deg) translateY(${STACK_Y[i]}px)`,
              translate: '-50% -50%',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
              zIndex: CARDS[0].deck.length - i,
            }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              onError={e => (e.currentTarget.parentElement!.style.opacity = '0')}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Accent colour strip at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px', backgroundColor: card.accent, zIndex: 10,
      }} />

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.55) 60%, transparent 100%)',
        padding: 'clamp(18px, 3vw, 32px)',
        paddingTop: 'clamp(56px, 8vw, 88px)',
        zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{
            fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: card.accent, fontFamily: 'Jost, sans-serif', fontWeight: 500,
          }}>#{card.id}</span>
          <div style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span style={{
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(244,241,236,0.35)', fontFamily: 'Jost, sans-serif',
          }}>{card.sub}</span>
        </div>
        <h3 style={{
          fontFamily: 'Jost, sans-serif', fontWeight: 200,
          fontSize: 'clamp(24px, 3vw, 44px)',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#F4F1EC', margin: '0 0 8px', lineHeight: 1.1,
        }}>{card.title}</h3>
        <p style={{
          fontFamily: 'Jost, sans-serif', fontWeight: 300,
          fontSize: 'clamp(12px, 0.95vw, 15px)', lineHeight: 1.75,
          color: 'rgba(244,241,236,0.45)', margin: 0, maxWidth: '380px',
        }}>{card.description}</p>
      </div>
    </div>
  )
}

export default function Services() {
  const wrapRef    = useRef<HTMLDivElement>(null) // overflow:hidden container
  const trackRef   = useRef<HTMLDivElement>(null) // flex row of cards
  const headRef    = useRef<HTMLDivElement>(null)
  const xPos       = useRef(0)
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const startScroll= useRef(0)
  const velX       = useRef(0)
  const lastX      = useRef(0)
  const lastT      = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)

  /* ── Heading GSAP entry ── */
  useEffect(() => {
    if (!headRef.current) return
    const lines = headRef.current.querySelectorAll<HTMLElement>('.svc-line')
    gsap.fromTo(lines,
      { y: 60, autoAlpha: 0 },
      {
        y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      }
    )
  }, [])

  /* ── Compute bounds ── */
  const getMaxX = () => {
    if (!wrapRef.current || !trackRef.current) return 0
    return -(trackRef.current.scrollWidth - wrapRef.current.clientWidth)
  }

  const clamp = (v: number) => Math.max(getMaxX(), Math.min(0, v))

  const setX = (val: number) => {
    xPos.current = val
    gsap.set(trackRef.current, { x: val })
    // update active index
    if (!trackRef.current) return
    const cardW = trackRef.current.scrollWidth / CARDS.length
    setActiveIdx(Math.min(CARDS.length - 1, Math.max(0, Math.round(-val / cardW))))
  }

  /* ── Pointer/touch drag ── */
  const beginDrag = (clientX: number) => {
    gsap.killTweensOf(trackRef.current)
    isDragging.current = true
    startX.current     = clientX
    startScroll.current= xPos.current
    velX.current       = 0
    lastX.current      = clientX
    lastT.current      = performance.now()
  }

  const moveDrag = (clientX: number) => {
    if (!isDragging.current) return
    const dx  = clientX - startX.current
    setX(clamp(startScroll.current + dx))
    const now = performance.now()
    const dt  = Math.max(1, now - lastT.current)
    velX.current = (clientX - lastX.current) / dt * 16
    lastX.current = clientX
    lastT.current = now
  }

  const endDrag = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const v = velX.current
    if (Math.abs(v) < 1) {
      snapToNearest()
      return
    }
    // Momentum: GSAP tween on an object then apply
    const obj = { v }
    gsap.to(obj, {
      v: 0,
      duration: 1.1,
      ease: 'power3.out',
      onUpdate() { setX(clamp(xPos.current + obj.v)) },
      onComplete: snapToNearest,
    })
  }

  const snapToNearest = () => {
    if (!trackRef.current) return
    const cardW = trackRef.current.scrollWidth / CARDS.length
    const idx   = Math.min(CARDS.length - 1, Math.max(0, Math.round(-xPos.current / cardW)))
    gsap.to(trackRef.current, {
      x: -idx * cardW,
      duration: 0.6,
      ease: 'power3.out',
      onUpdate: () => {
        xPos.current = gsap.getProperty(trackRef.current, 'x') as number
      },
    })
    setActiveIdx(idx)
  }

  const scrollTo = (idx: number) => {
    if (!trackRef.current) return
    const cardW = trackRef.current.scrollWidth / CARDS.length
    gsap.to(trackRef.current, {
      x: clamp(-idx * cardW),
      duration: 0.7,
      ease: 'power3.inOut',
      onUpdate: () => { xPos.current = gsap.getProperty(trackRef.current, 'x') as number },
    })
    setActiveIdx(idx)
  }

  return (
    <section id="services" style={{ backgroundColor: 'var(--hol-bg)', overflow: 'hidden' }}>

      {/* ── Heading ── */}
      <div ref={headRef} style={{
        padding: 'clamp(64px, 10vw, 120px) clamp(24px, 5vw, 72px) clamp(28px, 4vw, 48px)',
        overflow: 'hidden',
      }}>
        <div className="svc-line" style={{ overflow: 'hidden' }}>
          <h2 style={{
            fontFamily: 'Jost, sans-serif', fontWeight: 700,
            fontSize: 'clamp(40px, 7.5vw, 112px)',
            lineHeight: 1.0, letterSpacing: '-0.03em',
            margin: 0, color: 'var(--hol-text)',
          }}>
            Luxury Services,
          </h2>
        </div>
        <div className="svc-line" style={{ overflow: 'hidden' }}>
          <h2 style={{
            fontFamily: 'Jost, sans-serif', fontWeight: 300,
            fontSize: 'clamp(40px, 7.5vw, 112px)',
            lineHeight: 1.0, letterSpacing: '-0.03em',
            margin: 0, color: 'var(--hol-muted)',
          }}>
            crafted with precision.
          </h2>
        </div>
      </div>

      {/* ── Card strip ── */}
      <div
        ref={wrapRef}
        style={{ overflow: 'hidden', width: '100%', cursor: isDragging.current ? 'grabbing' : 'grab' }}
        onMouseDown={e => { beginDrag(e.clientX); e.currentTarget.style.cursor = 'grabbing' }}
        onMouseMove={e => moveDrag(e.clientX)}
        onMouseUp={e => { endDrag(); e.currentTarget.style.cursor = 'grab' }}
        onMouseLeave={() => endDrag()}
        onTouchStart={e => beginDrag(e.touches[0].clientX)}
        onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX) }}
        onTouchEnd={endDrag}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '4px',
            width: 'max-content',
            willChange: 'transform',
            userSelect: 'none',
          }}
        >
          {CARDS.map((card, i) => (
            <ServiceCard key={i} card={card} isActive={activeIdx === i} />
          ))}
          {/* trailing spacer so last card can centre */}
          <div style={{ flexShrink: 0, width: 'clamp(24px, 5vw, 72px)' }} />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: 'clamp(16px, 2.5vw, 28px) clamp(24px, 5vw, 72px)',
      }}>
        {/* Dot nav */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              style={{
                width: i === activeIdx ? '28px' : '6px',
                height: '6px', borderRadius: '3px', padding: 0, border: 'none',
                backgroundColor: i === activeIdx ? 'var(--hol-text)' : 'var(--hol-faintest)',
                cursor: 'pointer',
                transition: 'width 0.35s ease, background-color 0.3s',
              }}
            />
          ))}
        </div>

        <span style={{
          fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'var(--hol-faint)', fontFamily: 'Jost, sans-serif',
        }}>
          #{CARDS[activeIdx].id}
        </span>

        <span style={{
          fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--hol-faintest)', fontFamily: 'Jost, sans-serif',
        }}>
          {CARDS[activeIdx].title}
        </span>

        <div style={{ flex: 1 }} />

        {/* "See service" pill */}
        <button
          onClick={() => scrollTo(activeIdx)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '10px 20px', borderRadius: '100px',
            border: '1px solid var(--hol-border)',
            backgroundColor: 'transparent', cursor: 'pointer',
            fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--hol-text)', fontFamily: 'Jost, sans-serif',
            transition: 'background 0.25s, border-color 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--hol-text)'
            e.currentTarget.style.color = 'var(--hol-bg)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--hol-text)'
          }}
        >
          Explore
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            <line x1="1" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

    </section>
  )
}
