import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, lenisInstance } from '../lib/gsap-config'
import { useTheme } from '../context/ThemeContext'
import { useIsMobile } from '../hooks/use-mobile'

/* Isometric cube geometry */
const CS  = 36
const SX  = 40
const SY  = 20
const N_CUBES_COUNT = 10

const SVG_PAD = 16
const SVG_W   = SX * N_CUBES_COUNT + CS * 2 + SVG_PAD * 2
const SVG_H   = SY * N_CUBES_COUNT + CS * 3 + SVG_PAD * 2

function cubeFaces(cx: number, cy: number, s: number) {
  const hw = s
  const qh = s * 0.5
  const top = [
    `${cx},${cy - qh}`,
    `${cx + hw},${cy}`,
    `${cx},${cy + qh}`,
    `${cx - hw},${cy}`,
  ].join(' ')
  const left = [
    `${cx - hw},${cy}`,
    `${cx},${cy + qh}`,
    `${cx},${cy + qh * 3}`,
    `${cx - hw},${cy + qh * 2}`,
  ].join(' ')
  const right = [
    `${cx},${cy + qh}`,
    `${cx + hw},${cy}`,
    `${cx + hw},${cy + qh * 2}`,
    `${cx},${cy + qh * 3}`,
  ].join(' ')
  return { top: `M${top}Z`, left: `M${left}Z`, right: `M${right}Z` }
}

const CUBES = Array.from({ length: N_CUBES_COUNT }, (_, i) => {
  const cx = SVG_PAD + CS + SX * i
  const cy = SVG_H - SVG_PAD - CS * 1.5 - SY * i
  return cubeFaces(cx, cy, CS)
})

/* Step data */
const STEPS = [
  { num: '00', title: 'Every successful execution begins long before the event itself.', desc: 'At H.O.L. Archive, our process is built around understanding before execution, structure before movement, and clarity before decisions.' },
  { num: '01', title: 'INQUIRE',    desc: 'Every partnership begins with curiosity.' },
  { num: '02', title: 'UNDERSTAND', desc: 'Great execution starts with understanding, not assumptions.' },
  { num: '03', title: 'ANALYSE',   desc: 'We observe the environment before shaping the solution.' },
  { num: '04', title: 'DISCUSS',   desc: 'Perspective creates clarity.' },
  { num: '05', title: 'STRUCTURE', desc: 'Complexity becomes manageable when given a framework.' },
  { num: '06', title: 'REFINE',    desc: 'Every strong plan improves through thoughtful iteration.' },
  { num: '07', title: 'ALIGN',     desc: 'Shared understanding creates operational confidence.' },
  { num: '08', title: 'FINALISE',  desc: 'The direction is established and the path becomes clear.' },
  { num: '09', title: 'CONFIRM',   desc: 'Preparation ends. Execution begins.' },
]

const N = STEPS.length

export default function Process() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isMobile = useIsMobile()
  const sectionRef  = useRef<HTMLElement>(null)
  const cubeRefs    = useRef<(SVGGElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const faceTop    = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.03)'
  const faceLeft   = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.07)'
  const faceRight  = isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.11)'
  const strokeGold = isDark ? 'rgba(194,174,109,0.60)' : 'rgba(194,174,109,0.50)'
  const strokeSub  = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.09)'

  useEffect(() => {
    const checkAndRefresh = () => {
      if (document.body.classList.contains('hol-ready')) { ScrollTrigger.refresh(); return true }
      return false
    }
    if (checkAndRefresh()) return
    const observer = new MutationObserver(() => { if (checkAndRefresh()) observer.disconnect() })
    observer.observe(document.body, { attributes: true })
    const t = setTimeout(() => ScrollTrigger.refresh(), 3000)
    return () => { observer.disconnect(); clearTimeout(t) }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cubes    = cubeRefs.current.filter(Boolean) as SVGGElement[]
    const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[]
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.set(cubes,    { opacity: 0, scale: reduced ? 1 : 0.82, transformOrigin: '50% 50%' })
      gsap.set(contents, { opacity: 0, y: reduced ? 0 : 30 })
      if (cubes[0])    gsap.set(cubes[0],    { opacity: 1, scale: 1 })
      if (contents[0]) gsap.set(contents[0], { opacity: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'process-trigger', trigger: section, start: 'top top',
          end: () => `+=${N * (isMobile ? 380 : 640)}`,
          pin: true, anticipatePin: 1, scrub: 1.6, invalidateOnRefresh: true,
          onUpdate(self) {
            const raw = self.progress * (N - 1)
            const activeIndex = Math.round(raw)
            const line = document.getElementById('proc-line')
            if (line) line.style.width = `${self.progress * 100}%`
            STEPS.forEach((_, i) => {
              const dot = document.getElementById(`proc-dot-${i}`)
              if (!dot) return
              const inner = dot.querySelector('.dot-inner') as HTMLElement | null
              const isActive = activeIndex === i
              const isPast   = raw > i + 0.35
              if (isActive) {
                dot.style.borderColor = 'var(--hol-gold,#C2AE6D)'
                dot.style.backgroundColor = 'var(--hol-bg)'
                dot.style.transform = 'scale(1.55) translateY(-50%)'
                if (inner) inner.style.backgroundColor = 'var(--hol-gold,#C2AE6D)'
              } else if (isPast) {
                dot.style.borderColor = 'var(--hol-gold,#C2AE6D)'
                dot.style.backgroundColor = 'var(--hol-gold,#C2AE6D)'
                dot.style.transform = 'scale(1) translateY(-50%)'
                if (inner) inner.style.backgroundColor = 'transparent'
              } else {
                dot.style.borderColor = 'var(--hol-border)'
                dot.style.backgroundColor = 'var(--hol-bg)'
                dot.style.transform = 'scale(1) translateY(-50%)'
                if (inner) inner.style.backgroundColor = 'transparent'
              }
            })
          },
        },
      })

      const dt = 1 / (N - 1)
      STEPS.forEach((_, i) => {
        const pos = i * dt
        if (i > 0) {
          tl.to(cubes[i],   { opacity: 1, scale: 1, duration: dt * 0.44, ease: 'power2.out' }, pos - dt * 0.22)
          tl.fromTo(contents[i], { opacity: 0, y: reduced ? 0 : 30 }, { opacity: 1, y: 0, duration: dt * 0.38, ease: 'power2.out' }, pos - dt * 0.22)
        }
        if (i < N - 1) {
          tl.to(contents[i], { opacity: 0, y: reduced ? 0 : -30, duration: dt * 0.36, ease: 'power2.in' }, pos + dt * 0.64)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isDark, isMobile])

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        position: 'relative', width: '100%', height: '100vh', minHeight: '580px',
        overflow: 'hidden', backgroundColor: 'var(--hol-bg)',
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
        transition: 'background-color 0.4s ease',
      }}
    >
      <style>{`
        #process { box-sizing: border-box; will-change: transform; }

        .proc-header {
          padding: clamp(90px, 8vh, 120px) clamp(20px, 5vw, 72px) 0;
          flex-shrink: 0;
        }
        .proc-title {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(42px, 7vw, 96px);
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: var(--hol-text);
          text-transform: uppercase;
          margin: 0;
          user-select: none;
        }

        .proc-canvas {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: flex-end;
          padding: 0 clamp(20px,5vw,72px);
          gap: 0;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          max-width: 100%;
        }

        .proc-stair-col {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          height: 100%;
          overflow: visible;
        }
        .proc-stair-svg {
          width: 100%;
          max-width: clamp(200px, 44vw, 580px);
          height: auto;
          display: block;
          overflow: visible;
        }

        .proc-content-col {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          padding-bottom: clamp(48px, 7vh, 90px);
          padding-left: clamp(12px, 2.5vw, 40px);
          box-sizing: border-box;
          overflow: hidden;
          min-width: 0;
        }
        .proc-content-inner {
          position: relative;
          min-height: 220px;
          width: 100%;
        }
        .proc-step-card {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          will-change: transform, opacity;
        }
        .proc-step-label {
          font-family: 'Sora', sans-serif;
          font-weight: 500;
          font-size: clamp(9px, 0.72vw, 11px);
          letter-spacing: 0.30em;
          text-transform: uppercase;
          color: var(--hol-gold, #C2AE6D);
          display: block;
          margin-bottom: 14px;
        }
        .proc-step-title {
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: clamp(24px, 3vw, 56px);
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: var(--hol-text);
          margin: 0 0 16px;
          text-transform: uppercase;
        }
        .proc-step-title--intro {
          text-transform: none;
          font-size: clamp(14px, 1.5vw, 24px);
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.45;
        }
        .proc-step-desc {
          font-family: 'Sora', sans-serif;
          font-weight: 300;
          font-size: clamp(11px, 0.9vw, 14.5px);
          color: var(--hol-muted);
          line-height: 1.75;
          margin: 0;
          max-width: 400px;
        }

        .proc-timeline {
          flex-shrink: 0;
          width: 100%;
          padding: 0 clamp(20px,5vw,72px) clamp(20px,3.5vh,44px);
          box-sizing: border-box;
          position: relative;
          z-index: 10;
        }
        .proc-timeline-track {
          position: relative;
          width: 100%;
          height: 1px;
        }
        .proc-track-bg {
          position: absolute;
          inset: 0;
          background: var(--hol-border);
        }
        .proc-track-fill {
          position: absolute;
          left: 0; top: 0;
          height: 1px;
          width: 0%;
          background: var(--hol-gold, #C2AE6D);
          will-change: width;
        }
        .proc-dots-row {
          position: absolute;
          top: 0; left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 4;
        }
        .proc-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1.5px solid var(--hol-border);
          background: var(--hol-bg);
          cursor: pointer;
          padding: 0;
          outline: none;
          position: relative;
          transform: translateY(-50%);
          transition: border-color 0.28s ease, background-color 0.28s ease, transform 0.28s ease;
          will-change: transform, border-color, background-color;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .proc-dot:focus-visible { box-shadow: 0 0 0 2px var(--hol-gold,#C2AE6D); }
        .dot-inner {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: transparent;
          pointer-events: none;
          transition: background-color 0.28s ease;
        }
        .proc-dot-tip {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          font-family: 'Sora', sans-serif;
          font-size: 9px; font-weight: 600;
          color: var(--hol-gold, #C2AE6D);
          background: var(--hol-bg);
          border: 1px solid var(--hol-border);
          padding: 3px 7px;
          border-radius: 3px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.22s ease, transform 0.22s ease;
          z-index: 20;
        }
        .proc-dot:hover .proc-dot-tip { opacity: 1; transform: translateX(-50%) translateY(0); }

        .stair-top, .stair-left, .stair-right { transition: fill 0.35s ease, stroke 0.35s ease; }

        /* Mobile */
        @media (max-width: 767px) {
          .proc-header {
            padding: clamp(72px,12vh,100px) clamp(18px,5vw,36px) 0;
          }
          .proc-title { font-size: clamp(36px,10vw,52px); }

          /* Canvas: vertical stack, never wider than the screen */
          .proc-canvas {
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: none !important;
            padding: 0 clamp(18px,5vw,36px);
            gap: 0;
            width: 100%;
            overflow: hidden;
          }

          /* Staircase row — fixed height, centred */
          .proc-stair-col {
            flex: 0 0 auto !important;
            width: 100% !important;
            height: 22vh;
            min-height: 100px;
            max-height: 180px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }
          .proc-stair-svg {
            width: auto !important;
            max-width: none !important;
            height: 100%;
          }

          /* Content row — fills remaining space, fully within viewport */
          .proc-content-col {
            flex: 1 !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            padding-left: 0 !important;
            padding-right: 0 !important;
            padding-bottom: 0 !important;
            padding-top: 20px !important;
            overflow: hidden;
          }
          .proc-content-inner {
            width: 100% !important;
            min-height: 180px !important;
            max-width: 100% !important;
            overflow: hidden;
            padding: 0 4px !important;
          }
          .proc-step-card {
            width: 100% !important;
            box-sizing: border-box;
            padding: 8px 0 !important;
          }

          /* Typography */
          .proc-step-label { font-size: 10px; letter-spacing: 0.22em; margin-bottom: 16px !important; }
          .proc-step-title { font-size: clamp(22px,6.5vw,32px); margin-bottom: 18px !important; }
          .proc-step-title--intro { font-size: clamp(13px,3.5vw,17px); margin-bottom: 16px !important; }
          .proc-step-desc { font-size: 13px; max-width: 100% !important; line-height: 1.85 !important; }

          /* Timeline */
          .proc-timeline {
            padding-left: clamp(18px,5vw,36px);
            padding-right: clamp(18px,5vw,36px);
            padding-bottom: clamp(24px,4vh,36px);
            padding-top: 12px !important;
          }
        }


        /* Tablet */
        @media (min-width: 768px) and (max-width: 1199px) {
          .proc-canvas { grid-template-columns: 1.1fr 0.9fr; }
          .proc-stair-svg { max-width: clamp(200px,38vw,420px); }
          .proc-step-title { font-size: clamp(20px,2.5vw,40px); }
        }

        /* Wide */
        @media (min-width: 1600px) {
          .proc-stair-svg { max-width: 640px; }
          .proc-step-title { font-size: clamp(40px,2.8vw,64px); }
        }
      `}</style>

      <div className="proc-header">
        <h2 className="proc-title">Our<br />Process</h2>
      </div>

      <div className="proc-canvas">
        <div className="proc-stair-col">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="proc-stair-svg"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <defs>
              <filter id="proc-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {CUBES.map((faces, i) => (
              <g key={i} ref={el => { cubeRefs.current[i] = el }} style={{ opacity: 0 }}>
                <path d={faces.top}   className="stair-top"   fill={faceTop}   stroke={strokeGold} strokeWidth="0.85" />
                <path d={faces.left}  className="stair-left"  fill={faceLeft}  stroke={strokeSub}  strokeWidth="0.70" />
                <path d={faces.right} className="stair-right" fill={faceRight} stroke={strokeGold} strokeWidth="0.85" filter="url(#proc-glow)" />
              </g>
            ))}
          </svg>
        </div>

        <div className="proc-content-col">
          <div className="proc-content-inner">
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={el => { contentRefs.current[i] = el }}
                className="proc-step-card"
                style={{ opacity: 0, transform: 'translateY(30px)' }}
              >
                <span className="proc-step-label">Step {step.num}&nbsp;/&nbsp;{(N - 1).toString().padStart(2, '0')}</span>
                <h3 className={`proc-step-title${i === 0 ? ' proc-step-title--intro' : ''}`}>{step.title}</h3>
                <p className="proc-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="proc-timeline">
        <div className="proc-timeline-track">
          <div className="proc-track-bg" />
          <div id="proc-line" className="proc-track-fill" />
          <div className="proc-dots-row">
            {STEPS.map((step, i) => {
              const frac = i / (N - 1)
              return (
                <button
                  key={i}
                  id={`proc-dot-${i}`}
                  className="proc-dot"
                  onClick={() => {
                    const trigger = ScrollTrigger.getById('process-trigger')
                    if (!trigger) return
                    const target = trigger.start + frac * (trigger.end - trigger.start)
                    if (lenisInstance) { lenisInstance.scrollTo(target, { duration: 1.2 }) }
                    else { window.scrollTo({ top: target, behavior: 'smooth' }) }
                  }}
                  aria-label={`Go to step ${step.num}: ${step.title}`}
                >
                  <div className="dot-inner" />
                  <span className="proc-dot-tip">{step.num}&nbsp;/&nbsp;{step.title.length > 16 ? `${step.title.slice(0, 16)}...` : step.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
