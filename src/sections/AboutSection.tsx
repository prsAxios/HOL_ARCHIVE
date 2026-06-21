import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { gsap, ScrollTrigger } from '../lib/gsap-config'

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
    num: 'CTA',
    label: 'Why HOL',
    title: 'Why \n HOL Archive ?',
    body: 'As event companies expand, H.O.L. ARCHIVE provides structured backend support — from communication structures and workforce alignment to scheduling frameworks and on-ground supervision.',
    features: ['Growing event companies', 'Production agencies'],
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

      gsap.set(p[1], { yPercent: 100 })
      gsap.set(p[2], { yPercent: 100 })
      gsap.set(p[3], { yPercent: 100 })
      gsap.set(p[4], { yPercent: 100 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      })

      tl.to(p[0], { scale: 0.96, ease: 'none', duration: 1 }, 0)
      tl.to(p[1], { yPercent: 0, ease: 'none', duration: 1 }, 0)

      tl.to(p[1], { scale: 0.96, ease: 'none', duration: 1 }, 1)
      tl.to(p[2], { yPercent: 0, ease: 'none', duration: 1 }, 1)

      tl.to(p[2], { scale: 0.96, ease: 'none', duration: 1 }, 2)
      tl.to(p[3], { yPercent: 0, ease: 'none', duration: 1 }, 2)

      tl.to(p[3], { scale: 0.96, ease: 'none', duration: 1 }, 3)
      tl.to(p[4], { yPercent: 0, ease: 'none', duration: 1 }, 3)

      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={containerRef}
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
    >
      {PANELS.map((panel, i) => (
        <div
          key={i}
          ref={el => { panelRefs.current[i] = el }}
          style={{ position: 'absolute', inset: 0, zIndex: i + 1 }}
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
        style={{ height: '100vh', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      >
        <img
          src="/images/Why_we_orchestrate.jpeg"
          alt="Why We Orchestrate"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Left gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.4) 48%, transparent 72%)',
          pointerEvents: 'none',
        }} />

        {/* Text overlay — left */}
        <div style={{
          position: 'absolute',
          top: '50%', left: 'clamp(32px, 6vw, 80px)',
          transform: 'translateY(-50%)',
          maxWidth: 'clamp(260px, 38vw, 520px)',
        }}>
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(42px, 9vw, 128px)',
            fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.03em',
            color: '#F4F1EC', margin: '0 0 clamp(16px, 2.5vh, 32px)',
            whiteSpace: 'pre-line',
          }}>{'What we Orchestrate'}</h2>


          {/* Slide to know indicator */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              display: 'flex', gap: '4px',
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: '28px', height: '2px',
                  background: i === 0 ? '#F4F1EC' : 'rgba(244,241,236,0.3)',
                  borderRadius: '2px',
                  animation: `slideBar 1.8s ease-in-out ${i * 0.2}s infinite alternate`,
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontSize: '11px',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(244,241,236,0.55)',
            }}>Slide to know</span>
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
        style={{ height: '100vh', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      >
        <img
          src="/images/The_Story.jpeg"
          alt="The Story"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Left gradient fade so text is legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(11,11,11,0.82) 0%, rgba(11,11,11,0.45) 45%, transparent 72%)',
          pointerEvents: 'none',
        }} />

        {/* Text overlay — left side */}
        <div style={{
          position: 'absolute',
          top: '50%', left: 'clamp(32px, 6vw, 80px)',
          transform: 'translateY(-50%)',
          maxWidth: 'clamp(260px, 38vw, 520px)',
        }}>


          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(56px, 11vw, 148px)',
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#F4F1EC',
            margin: '0 0 clamp(16px, 2.5vh, 32px)',
            whiteSpace: 'pre-line',
          }}>The{'\n'}Story</h2>

          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(15px, 1.5vw, 22px)',
            fontWeight: 300,
            lineHeight: 1.75,
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
            position: 'absolute', bottom: 'clamp(32px, 5vh, 60px)', left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(244,241,236,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(244,241,236,0.22)',
            color: '#F4F1EC',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(10px, 1vw, 13px)',
            fontWeight: 300,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: '14px 36px',
            borderRadius: '100px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
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
        height: '100vh',
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
      }}
    >
      {/* Watermark label */}
      <span
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '11px', letterSpacing: '0.4em',
          color: labelColor, fontFamily: 'Poppins, sans-serif',
          fontWeight: 300, userSelect: 'none', pointerEvents: 'none',
        }}
      >
        {panel.label}
      </span>

      {/* Title + number */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(16px, 3vw, 32px)' }}>
        <h2
          style={{
            fontSize: 'clamp(36px, 8.5vw, 140px)',
            fontFamily: 'Poppins, sans-serif', fontWeight: 300,
            lineHeight: 1, letterSpacing: '-0.03em',
            color: panel.color, margin: 0, whiteSpace: 'pre-line',
          }}
        >
          {panel.title}
        </h2>
        <span
          style={{
            fontSize: 'clamp(52px, 13vw, 210px)',
            fontFamily: 'Poppins, sans-serif', fontWeight: 300,
            lineHeight: 1, color: numColor, letterSpacing: '-0.04em',
            userSelect: 'none', flexShrink: 0, marginLeft: '16px',
          }}
        >
          {panel.num}
        </span>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: divider, marginBottom: 'clamp(16px, 3vw, 36px)' }} />

      {/* Body + features — responsive grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: 'clamp(16px, 3vw, 40px)',
          maxWidth: '900px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p
            style={{
              fontSize: 'clamp(13px, 1.15vw, 18px)',
              fontFamily: 'Poppins, sans-serif', fontWeight: 300,
              lineHeight: 1.75, color: bodyColor, margin: 0,
            }}
          >
            {panel.body}
          </p>
          {index === 2 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate('/why-hol-archive')
              }}
              style={{
                alignSelf: 'flex-start',
                background: 'rgba(17, 17, 17, 0.05)',
                border: '1px solid rgba(17, 17, 17, 0.15)',
                color: '#111111',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '10px 24px',
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
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
          {panel.features.map(f => (
            <p
              key={f}
              style={{
                fontSize: '11px', letterSpacing: '0.2em',
                color: featureColor, fontFamily: 'Poppins, sans-serif',
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
    </div>
  )
}

