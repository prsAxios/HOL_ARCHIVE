import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap-config'

/* ── Isometric math ─────────────────────────────────────────────── */
const ISO = Math.PI / 6
const S   = 24
const W   = 1.1
const H   = 1.6
const D   = 1.0

function iso(x: number, y: number, z: number): [number, number] {
  return [
    (x - z) * Math.cos(ISO) * S,
    (x + z) * Math.sin(ISO) * S - y * S,
  ]
}
function pt([x, y]: [number, number]) { return `${x.toFixed(2)},${y.toFixed(2)}` }

function stepPaths(i: number) {
  const x0 = i * W, x1 = (i + 1) * W
  const y0 = i * H, y1 = (i + 1) * H
  const fbl = iso(x0, y0, D), fbr = iso(x1, y0, D)
  const ftl = iso(x0, y1, D), ftr = iso(x1, y1, D)
  const bbr = iso(x1, y0, 0), btr = iso(x1, y1, 0)
  const btl = iso(x0, y1, 0)
  return [
    `M${pt(ftl)} L${pt(ftr)} L${pt(btr)} L${pt(btl)} Z`,
    `M${pt(fbl)} L${pt(fbr)} L${pt(ftr)} L${pt(ftl)} Z`,
    `M${pt(fbr)} L${pt(bbr)} L${pt(btr)} L${pt(ftr)} Z`,
  ]
}

function computeViewBox() {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (let i = 0; i < 10; i++) {
    [
      iso(i*W, i*H, 0), iso(i*W, i*H, D),
      iso(i*W, (i+1)*H, 0), iso(i*W, (i+1)*H, D),
      iso((i+1)*W, i*H, 0), iso((i+1)*W, i*H, D),
      iso((i+1)*W, (i+1)*H, 0), iso((i+1)*W, (i+1)*H, D),
    ].forEach(([x, y]) => {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x)
      y0 = Math.min(y0, y); y1 = Math.max(y1, y)
    })
  }
  const p = 12
  return `${x0-p} ${y0-p} ${x1-x0+p*2} ${y1-y0+p*2}`
}
const VIEWBOX = computeViewBox()

/* ── Step data ──────────────────────────────────────────────────── */
const STEPS = [
  { num:'01', title:'Initial Inquiry',     desc:'Submit your event details through our contact form. We review every brief with care and respond within 24 hours.' },
  { num:'02', title:'Discovery Call',      desc:'A focused consultation where we understand your vision, guest profile, location preferences, and operational requirements.' },
  { num:'03', title:'Concept Design',      desc:'Our creative team develops a bespoke event concept — theme, spatial layout, aesthetic direction — tailored to your identity.' },
  { num:'04', title:'Venue Scouting',      desc:'We source and inspect venues that align with your concept — considering capacity, acoustics, access, and luxury quotient.' },
  { num:'05', title:'Vendor Curation',     desc:'We handpick caterers, florists, AV specialists, photographers, and entertainment from our verified luxury network.' },
  { num:'06', title:'Budget Planning',     desc:'Transparent cost architecture. Every line item is accounted for — no surprises, no hidden fees, pure operational clarity.' },
  { num:'07', title:'Operations Brief',    desc:'A master operations document is created: run-of-show, vendor contacts, contingency plans, and floor diagrams.' },
  { num:'08', title:'Pre-Event Logistics', desc:'Ground team mobilises 48–72 hours prior. Venue setup, equipment checks, guest list coordination, and dry runs.' },
  { num:'09', title:'Event Execution',     desc:'Our on-ground team manages every moment — guest flow, vendor coordination, timeline adherence, and real-time problem solving.' },
  { num:'10', title:'Post-Event Archive',  desc:'Every event is documented, photographed, and archived. A detailed debrief ensures each future event exceeds the last.' },
]

const N = STEPS.length

export default function Process() {
  const sectionRef  = useRef<HTMLElement>(null)
  const groupRefs   = useRef<(SVGGElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const groups   = groupRefs.current.filter(Boolean) as SVGGElement[]
    const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[]

    /* ── Set initial state ── */
    gsap.set(groups, { opacity: 0, scale: 0.88, transformOrigin: '50% 50%' })

    /* Step 0 visible immediately */
    if (groups[0])   gsap.set(groups[0],   { opacity: 1, scale: 1 })
    if (contents[0]) gsap.set(contents[0], { opacity: 1, y: 0 })

    /* ── Single scrubbed timeline ── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${N * 650}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.6,
        onUpdate(self) {
          /* Step track — driven directly from scroll progress */
          const raw = self.progress * (N - 1)
          STEPS.forEach((_, i) => {
            const dot  = document.getElementById(`step-dot-${i}`)
            const line = document.getElementById(`step-line-${i}`)
            if (dot) {
              const active = Math.round(raw) === i
              const past   = raw > i + 0.5
              dot.style.backgroundColor = past || active ? 'var(--hol-gold)' : 'var(--hol-border)'
              dot.style.transform = active ? 'scale(1.6)' : 'scale(1)'
            }
            if (line) {
              const fill = Math.min(1, Math.max(0, raw - i))
              line.style.transform = `scaleX(${fill})`
            }
          })
        },
      },
    })

    const dt = 1 / (N - 1)   // timeline fraction per step

    STEPS.forEach((_, i) => {
      const pos = i * dt

      if (i > 0) {
        /* Stair block appears */
        tl.to(groups[i],
          { opacity: 1, scale: 1, duration: dt * 0.35, ease: 'power2.out' },
          pos
        )
        /* Content fades in */
        tl.to(contents[i],
          { opacity: 1, y: 0, duration: dt * 0.3, ease: 'power2.out' },
          pos
        )
      }

      /* Step 0 content fades out when step 1 comes in */
      /* All content fades out before next step (except last) */
      if (i < N - 1) {
        tl.to(contents[i],
          { opacity: 0, y: -18, duration: dt * 0.2, ease: 'power2.in' },
          pos + dt * 0.68
        )
      }
    })

  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        position: 'relative', width: '100%', height: '100vh',
        overflow: 'hidden', backgroundColor: '#0D0D0D',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      backgroundColor: 'var(--hol-bg)',
      }}
    >
      {/* Heading */}
      <div style={{
        position: 'absolute', top: 'clamp(32px, 5vh, 56px)',
        left: 'clamp(40px, 6vw, 80px)', zIndex: 10,
      }}>
        <h2 style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700,
          fontSize: 'clamp(22px, 3vw, 42px)',
          letterSpacing: '-0.03em', color: 'var(--hol-text)', margin: 0,
        }}>Our Process</h2>
      </div>

      {/* Content grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', width: '100%',
        padding: '0 clamp(40px, 6vw, 80px)',
        gap: 'clamp(32px, 5vw, 80px)',
        marginTop: '48px',
      }}>

        {/* Left: 3D staircase */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg
            viewBox={VIEWBOX}
            style={{ width: '100%', maxWidth: 460, height: 'auto' }}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <style>{`
                .stair-top   { fill: var(--hol-border); stroke: var(--hol-text); stroke-opacity: 0.55; }
                .stair-front { fill: var(--hol-border); stroke: var(--hol-text); stroke-opacity: 0.28; }
                .stair-right { fill: var(--hol-border); stroke: var(--hol-gold); stroke-opacity: 0.45; }
              `}</style>
            </defs>
            {STEPS.map((_, i) => {
              const [top, front, right] = stepPaths(i)
              return (
                <g key={i} ref={el => { groupRefs.current[i] = el }}>
                  <path d={top}   className="stair-top"   strokeWidth="0.8" />
                  <path d={front} className="stair-front" strokeWidth="0.8" />
                  <path d={right} className="stair-right" strokeWidth="0.8" />
                </g>
              )
            })}
          </svg>
        </div>

        {/* Right: step content */}
        <div style={{ position: 'relative', minHeight: 220 }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={el => { contentRefs.current[i] = el }}
              style={{
                position: 'absolute', top: 0, left: 0, width: '100%',
                willChange: 'transform, opacity',
                opacity: 0,
                transform: 'translateY(28px)',
              }}
            >
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 300,
                fontSize: 'clamp(9px, 0.8vw, 11px)',
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: 'var(--hol-gold)', margin: '0 0 14px',
              }}>
                Step {step.num} / {N.toString().padStart(2, '0')}
              </p>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                fontSize: 'clamp(22px, 2.8vw, 44px)',
                letterSpacing: '-0.03em', lineHeight: 1.1,
                color: 'var(--hol-text)', margin: '0 0 20px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 300,
                fontSize: 'clamp(13px, 1vw, 15px)',
                color: 'var(--hol-muted)',
                lineHeight: 1.85, margin: 0, maxWidth: '400px',
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step track */}
      <div style={{
        position: 'absolute', bottom: 'clamp(24px, 4vh, 44px)',
        left: 'clamp(40px, 6vw, 80px)', right: 'clamp(40px, 6vw, 80px)',
        display: 'flex', alignItems: 'center',
      }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div
              id={`step-dot-${i}`}
              style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                backgroundColor: 'var(--hol-border)',
                transition: 'background-color 0.25s, transform 0.25s',
              }}
            />
            {i < N - 1 && (
              <div style={{ flex: 1, height: 1, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--hol-border)' }} />
                <div
                  id={`step-line-${i}`}
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'var(--hol-gold)',
                    transformOrigin: 'left', transform: 'scaleX(0)',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
