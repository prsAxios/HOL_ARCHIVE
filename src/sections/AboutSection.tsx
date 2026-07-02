import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { gsap } from '../lib/gsap-config'

const PANELS = [
  {
    num: 'CTA',
    label: 'The Story',
    title: 'The \n Story',
    body: 'Large scale celebrations require more than coordination. They demand timing, discretion, structure, and complete environmental control behind the scenes.',
    features: ['Premium event ecosystems', 'Precision at every layer'],
    bg: '#111111',
    color: '#F4F1EC',
  },
  {
    num: 'CTA',
    label: 'Orchestrate',
    title: 'What we \n Orchestrate ! ',
    body: 'H.O.L. ARCHIVE supports premium event ecosystems through hospitality alignment, movement management, backend communication frameworks, and controlled operational flow designed for high pressure environments.',
    features: ['Celebrity functions', 'Luxury wedding ecosystems'],
    bg: '#E50914',
    color: '#F4F1EC',
  },
  {
    num: '',
    label: '',
    title: 'Why \n HOL Archive ?',
    body: '',
    features: [''],
    bg: '#F4F1EC',
    color: '#111111',
  },
] as const

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const p = panelRefs.current.filter(Boolean) as HTMLDivElement[]
      if (p.length === 0) return

      // Set initial state for all panels except the first one
      for (let i = 1; i < p.length; i++) {
        gsap.set(p[i], { yPercent: 100 })
      }

      // Safe stable height calculation using the container bounding client rectangle
      const stableHeight = containerRef.current?.getBoundingClientRect().height || window.innerHeight

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${stableHeight * p.length}`,
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
          pinType: 'transform',
          invalidateOnRefresh: true,
        },
      })

      // Build transitions based on actual panels length for all viewports (including mobile)
      for (let i = 0; i < p.length - 1; i++) {
        tl.to(p[i], { scale: 0.96, ease: 'none', duration: 1 }, i)
        tl.to(p[i + 1], { yPercent: 0, ease: 'none', duration: 1 }, i)
      }

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100dvh', // Dynamic viewport units to prevent address-bar resizing issues
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {/* ── Google Fonts Sora Loader ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');
      `}</style>
      {PANELS.map((panel, i) => (
        <div
          key={i}
          ref={el => { panelRefs.current[i] = el }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: i + 1,
            width: '100%',
            height: '100dvh', // Explicitly declare viewport height
          }}
        >
          <PanelContent panel={panel} index={i} />
        </div>
      ))}
    </section>
  )
}

type Panel = typeof PANELS[number]

function PanelContent({ panel, index }: { panel: Panel; index: number }) {
  const navigate = useNavigate()

  if (index === 1) {
    return (
      <div
        onClick={() => navigate('/orchestrate')}
        style={{
          height: '100dvh', // Dynamic viewport units to prevent address-bar resizing issues
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        <img
          src="/images/Why_we_orchestrate.jpeg"
          alt="Why We Orchestrate"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            zIndex: 0
          }}
        />

        {/* Left gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.4) 48%, transparent 72%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Text overlay — left */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 'clamp(20px, 6vw, 80px)',
          transform: 'translateY(-50%)',
          maxWidth: 'clamp(280px, 38vw, 520px)',
          zIndex: 2
        }}>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(32px, 7vw, 128px)',
            fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.03em',
            color: '#F4F1EC', margin: '0 0 clamp(12px, 2.5vh, 32px)',
            whiteSpace: 'pre-line',
          }}>{'What we Orchestrate'}</h2>

          {/* Slide to know indicator */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>


          </div>
        </div>

        <style>{`
          @keyframes slideBar {
            from { transform: scaleX(1); opacity: 0.4; }
            to   { transform: scaleX(1.6); opacity: 1; }
          }
        `}</style>
      </div>
    )
  }

  if (index === 0) {
    return (
      <div
        onClick={() => navigate('/story')}
        style={{
          height: '100dvh', // Dynamic viewport units to prevent address-bar resizing issues
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        <img
          src="/images/The_Story.jpeg"
          alt="The Story"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            zIndex: 0
          }}
        />

        {/* Left gradient fade so text is legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(11,11,11,0.82) 0%, rgba(11,11,11,0.45) 45%, transparent 72%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Text overlay — left side */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 'clamp(20px, 6vw, 80px)',
          transform: 'translateY(-50%)',
          maxWidth: 'clamp(280px, 38vw, 520px)',
          zIndex: 2
        }}>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(38px, 9vw, 148px)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#F4F1EC',
            margin: '0 0 clamp(12px, 2.5vh, 32px)',
            whiteSpace: 'pre-line',
          }}>The{'\n'}Story</h2>

          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(13px, 1.5vw, 22px)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'rgba(244,241,236,0.65)',
            margin: 0,
          }}>
            The event is only the surface.<br />
            The real story lies beneath it.
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            navigate('/story')
          }}
          style={{
            position: 'absolute', bottom: 'clamp(24px, 5vh, 60px)', left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(244,241,236,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(244,241,236,0.22)',
            color: '#F4F1EC',
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(10px, 1vw, 13px)',
            fontWeight: 300,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: '14px 36px',
            borderRadius: '100px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            zIndex: 3,
            transition: 'background 0.25s ease, border-color 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(244,241,236,0.18)'
            e.currentTarget.style.borderColor = 'rgba(244,241,236,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(244,241,236,0.08)'
            e.currentTarget.style.borderColor = 'rgba(244,241,236,0.22)'
          }}
        >
          Explore Story &rarr;
        </button>
      </div>
    )
  }

  const isLight = panel.color === '#111111'
  const divider = isLight ? 'rgba(17,17,17,0.14)' : 'rgba(244,241,236,0.14)'
  const featureColor = isLight ? 'rgba(17,17,17,0.45)' : 'rgba(244,241,236,0.45)'
  const featureLine = isLight ? 'rgba(17,17,17,0.3)' : 'rgba(244,241,236,0.3)'
  const bodyColor = isLight ? 'rgba(17,17,17,0.65)' : 'rgba(244,241,236,0.65)'
  const numColor = isLight ? 'rgba(17,17,17,0.08)' : 'rgba(244,241,236,0.08)'
  const labelColor = isLight ? 'rgba(17,17,17,0.18)' : 'rgba(244,241,236,0.18)'

  return (
    <div
      onClick={index === 2 ? () => navigate('/why-hol-archive') : undefined}
      style={{
        height: '100dvh', // Dynamic viewport units to prevent address-bar resizing issues
        backgroundColor: panel.bg,
        color: panel.color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(20px, 5vw, 80px)',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        cursor: index === 2 ? 'pointer' : 'default',
        width: '100%'
      }}
    >
      {/* Watermark label */}
      <span
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '11px', letterSpacing: '0.4em',
          color: labelColor, fontFamily: 'Sora, sans-serif',
          fontWeight: 300, userSelect: 'none', pointerEvents: 'none',
        }}
      >
        {panel.label}
      </span>

      {/* Title + number */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(12px, 3vw, 32px)' }}>
        <h2
          style={{
            fontSize: 'clamp(26px, 8vw, 140px)',
            fontFamily: 'Sora, sans-serif', fontWeight: 300,
            lineHeight: 1, letterSpacing: '-0.03em',
            color: panel.color, margin: 0, whiteSpace: 'pre-line',
          }}
        >
          {panel.title}
        </h2>
      </div>

      {/* Body + features — responsive grid (or centered button for index 2) */}
      {index === 2 ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate('/why-hol-archive')
            }}
            style={{
              background: 'rgba(17, 17, 17, 0.05)',
              border: '1px solid rgba(17, 17, 17, 0.15)',
              color: '#111111',
              fontFamily: 'Sora, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '12px 32px',
              borderRadius: '100px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(17, 17, 17, 0.12)'
              e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(17, 17, 17, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.15)'
            }}
          >
            Explore System &rarr;
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: 'clamp(12px, 3vw, 40px)',
            maxWidth: '900px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p
              style={{
                fontSize: 'clamp(12px, 1.15vw, 18px)',
                fontFamily: 'Sora, sans-serif', fontWeight: 300,
                lineHeight: 1.7, color: bodyColor, margin: 0,
              }}
            >
              {panel.body}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
            {panel.features.map(f => (
              <p
                key={f}
                style={{
                  fontSize: '11px', letterSpacing: '0.18em',
                  color: featureColor, fontFamily: 'Sora, sans-serif',
                  fontWeight: 300, margin: 0,
                  display: 'flex', alignItems: 'center', gap: '14px',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ width: '20px', height: '1px', backgroundColor: featureLine, flexShrink: 0, display: 'inline-block' }} />
                {f}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

