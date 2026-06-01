import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap-config'

const PANELS = [
  {
    num: '01',
    label: '(HA)',
    title: 'H.O.L.\nArchive',
    body: 'Large scale celebrations require more than coordination. They demand timing, discretion, structure, and complete environmental control behind the scenes.',
    features: ['Premium event ecosystems', 'Precision at every layer'],
    bg: '#111111',
    color: '#F4F1EC',
  },
  {
    num: '02',
    label: '(LT)',
    title: 'Luxury Tier\nExperiences',
    body: 'H.O.L. ARCHIVE supports premium event ecosystems through hospitality alignment, movement management, backend communication frameworks, and controlled operational flow designed for high pressure environments.',
    features: ['Celebrity functions', 'Luxury wedding ecosystems'],
    bg: '#E50914',
    color: '#F4F1EC',
  },
  {
    num: '03',
    label: '(SS)',
    title: 'Scalable\nSupport',
    body: 'As event companies expand, H.O.L. ARCHIVE provides structured backend support — from communication structures and workforce alignment to scheduling frameworks and on-ground supervision.',
    features: ['Growing event companies', 'Production agencies'],
    bg: '#F4F1EC',
    color: '#111111',
  },
  {
    num: '04',
    label: '(DO)',
    title: 'Destination\nOperations',
    body: 'Destination celebrations involve layered movement across locations, hospitality structures, transportation systems, accommodation coordination, and continuous timeline management over multiple days.',
    features: ['Destination weddings', 'Multi-venue celebrations'],
    bg: '#C2AE6D',
    color: '#111111',
  },
  {
    num: '05',
    label: '(BF)',
    title: 'Built For\nEvery Scale',
    body: 'From celebrity functions and high-profile gatherings to multi-vendor production environments — our systems adapt to your scale, execution demand, and the precision your vision deserves.',
    features: ['Multi-vendor environments', 'Hospitality productions'],
    bg: '#8E8A84',
    color: '#F4F1EC',
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
          <PanelContent panel={panel} />
        </div>
      ))}
    </section>
  )
}

type Panel = typeof PANELS[number]

function PanelContent({ panel }: { panel: Panel }) {
  const isLight = panel.color === '#111111'
  const divider = isLight ? 'rgba(17,17,17,0.14)' : 'rgba(244,241,236,0.14)'
  const featureColor = isLight ? 'rgba(17,17,17,0.45)' : 'rgba(244,241,236,0.45)'
  const featureLine = isLight ? 'rgba(17,17,17,0.3)' : 'rgba(244,241,236,0.3)'
  const bodyColor = isLight ? 'rgba(17,17,17,0.65)' : 'rgba(244,241,236,0.65)'
  const numColor = isLight ? 'rgba(17,17,17,0.08)' : 'rgba(244,241,236,0.08)'
  const labelColor = isLight ? 'rgba(17,17,17,0.18)' : 'rgba(244,241,236,0.18)'

  return (
    <div
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
      }}
    >
      {/* Watermark label */}
      <span
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '11px', letterSpacing: '0.4em',
          color: labelColor, fontFamily: 'Jost, sans-serif',
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
            fontFamily: 'Jost, sans-serif', fontWeight: 300,
            lineHeight: 1, letterSpacing: '-0.03em',
            color: panel.color, margin: 0, whiteSpace: 'pre-line',
          }}
        >
          {panel.title}
        </h2>
        <span
          style={{
            fontSize: 'clamp(52px, 13vw, 210px)',
            fontFamily: 'Jost, sans-serif', fontWeight: 300,
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
        <p
          style={{
            fontSize: 'clamp(13px, 1.15vw, 18px)',
            fontFamily: 'Jost, sans-serif', fontWeight: 300,
            lineHeight: 1.75, color: bodyColor, margin: 0,
          }}
        >
          {panel.body}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
          {panel.features.map(f => (
            <p
              key={f}
              style={{
                fontSize: '11px', letterSpacing: '0.2em',
                color: featureColor, fontFamily: 'Jost, sans-serif',
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
