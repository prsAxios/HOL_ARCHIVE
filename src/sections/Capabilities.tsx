import { useEffect, useRef, useState } from 'react'
import { gsap, SplitText } from '../lib/gsap-config'
import { useIsMobile } from '../hooks/use-mobile'

const services: { label: string; detail: string }[] = [
  { label: 'Hospitality Management',  detail: 'Ensuring every guest experiences unparalleled care and attention' },
  { label: 'Operational Excellence',  detail: 'Precision planning and execution of complex event timelines' },
  { label: 'Global Logistics',        detail: 'Expert transport, venue setup, and supply chain management' },
  { label: 'Aesthetic Curation',      detail: 'Designing cohesive visual narratives that reflect your legacy' },
  { label: 'Destination Planning',    detail: 'Navigating international venues and local vendor networks' },
  { label: 'Financial Strategy',      detail: 'Meticulous budget management and value optimization' },
  { label: 'Vendor Orchestration',    detail: 'Curating and managing world-class creative partners' },
  { label: 'Legacy Documentation',    detail: 'Ensuring your celebration is immortalized through fine art' },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow
      gsap.fromTo('.cap-eyebrow',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: '.cap-eyebrow', start: 'top 88%' } }
      )

      // Heading words
      const split = new SplitText(headingRef.current!, { type: 'words' })
      gsap.set(headingRef.current, { autoAlpha: 1 })
      gsap.fromTo(
        split.words,
        { y: 80, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1,
          duration: 0.85, stagger: 0.07, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 84%' },
        }
      )

      // Sub-text
      gsap.fromTo('.cap-sub',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out',
          scrollTrigger: { trigger: '.cap-sub', start: 'top 88%' } }
      )

      // Service grid: each item clips in from bottom
      gsap.fromTo(
        Array.from(gridRef.current!.children),
        { clipPath: 'inset(0 0 100% 0)', autoAlpha: 0 },
        {
          clipPath: 'inset(0 0 0% 0)',
          autoAlpha: 1,
          duration: 0.75,
          stagger: { amount: 0.7, from: 'start' },
          ease: 'expo.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--hol-bg)',
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        borderTop: '1px solid var(--hol-border)',
      }}
    >
      <img
        src="/wedding_project_royal_banquet.png"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0, opacity: 0.1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: '80px',
            paddingBottom: '32px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          <div style={{ flex: '1 1 600px' }}>
            <p
              className="cap-eyebrow"
              style={{
                fontSize: '14px',
                letterSpacing: '0.3em',
                color: 'var(--hol-muted)',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontFamily: 'Jost, sans-serif',
                opacity: 0,
              }}
            >
              Mastery in Motion
            </p>
            <h2
              ref={headingRef}
              style={{
                fontSize: 'clamp(36px, 7.5vw, 108px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: 'var(--hol-text)',
                marginBottom: '28px',
                fontFamily: 'Jost, sans-serif',
                opacity: 0,
              }}
            >
              Our Services
            </h2>
            <p
              className="cap-sub"
              style={{
                fontSize: 'clamp(22px, 1.8vw, 28px)',
                fontWeight: 300,
                lineHeight: 1.7,
                color: '#444444',
                maxWidth: '700px',
                fontFamily: 'Jost, sans-serif',
                opacity: 0,
              }}
            >
              From initial logistical mapping to the final hospitality touch, we
              provide a seamless orchestration that ensures your celebration
              is executed with uncompromising precision.
            </p>
          </div>
        </div>

        <ul
          ref={gridRef}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '1px',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
          }}
        >
          {services.map((service, i) => (
            <ServiceItem key={service.label} index={i} {...service} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServiceItem({ label, detail, index }: { label: string; detail: string; index: number }) {
  const isMobile = useIsMobile()
  const [hovered, setHovered] = useState(false)

  return (
    <li
      style={{
        backgroundColor: hovered ? 'var(--hol-card)' : 'var(--hol-bg-alt)',
        padding: isMobile ? '32px 24px' : '40px 48px',
        display: 'flex',
        gap: isMobile ? '16px' : '24px',
        alignItems: 'flex-start',
        minHeight: '160px',
        transition: 'background-color 0.35s ease',
        clipPath: 'inset(0 0 100% 0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          flex: '0 0 auto',
          fontSize: '14px',
          letterSpacing: '0.1em',
          color: 'var(--hol-faintest)',
          fontVariantNumeric: 'tabular-nums',
          paddingTop: '6px',
          fontFamily: 'Jost, sans-serif',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ flex: '1 1 0%' }}>
        <h3
          style={{
            fontSize: 'clamp(20px, 2.4vw, 38px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: 'var(--hol-text)',
            marginBottom: '12px',
            fontFamily: 'Jost, sans-serif',
          }}
        >
          {label}
        </h3>
        <p
          style={{
            fontSize: '19px',
            lineHeight: 1.6,
            color: 'var(--hol-muted)',
            margin: 0,
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
          }}
        >
          {detail}
        </p>
      </div>
    </li>
  )
}


