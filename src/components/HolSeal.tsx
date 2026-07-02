import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap-config'

interface HolSealProps {
  size?: number
  animate?: boolean   // entry animation
  className?: string
  style?: React.CSSProperties
}

const GOLD  = '#C2AE6D'
const GOLD2 = 'rgba(194,174,109,0.35)'
const GOLD3 = 'rgba(194,174,109,0.12)'

export default function HolSeal({ size = 180, animate = true, style }: HolSealProps) {
  const sealRef  = useRef<SVGSVGElement>(null)
  const outerRef = useRef<SVGGElement>(null)

  /* ── Entry animation ── */
  useEffect(() => {
    if (!animate || !sealRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.fromTo(
      sealRef.current,
      { autoAlpha: 0, scale: 0.82, rotation: -12 },
      {
        autoAlpha: 1, scale: 1, rotation: 0,
        duration: 1.1,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        delay: 0.6,
      }
    )
  }, [animate])

  /* ── Hover: outer ring spins faster, seal lifts ── */
  useEffect(() => {
    const seal  = sealRef.current
    const outer = outerRef.current
    if (!seal || !outer) return

    let rotation = 0
    let speed    = 0.04     // deg per frame idle
    let target   = 0.04
    let raf: number

    const tick = () => {
      speed    += (target - speed) * 0.04   // lerp toward target speed
      rotation += speed
      outer.setAttribute('transform', `rotate(${rotation} 100 100)`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const enter = () => { target = 0.55 }
    const leave = () => { target = 0.04 }

    /* gate behind hover-capable devices (Emil principle) */
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (mq.matches) {
      seal.addEventListener('mouseenter', enter)
      seal.addEventListener('mouseleave', leave)
    } else {
      seal.addEventListener('touchstart', enter, { passive: true })
      seal.addEventListener('touchend', leave, { passive: true })
    }

    return () => {
      cancelAnimationFrame(raf)
      seal.removeEventListener('mouseenter', enter)
      seal.removeEventListener('mouseleave', leave)
      seal.removeEventListener('touchstart', enter)
      seal.removeEventListener('touchend', leave)
    }
  }, [])

  /* ── Scale on hover via CSS (Emil: only transform) ── */
  const hoverStyle = `
    .hol-seal {
      cursor: default;
      will-change: transform, opacity;
      transition: transform 220ms cubic-bezier(0.23,1,0.32,1),
                  filter 220ms ease;
    }
    @media (hover: hover) and (pointer: fine) {
      .hol-seal:hover {
        transform: scale(1.06);
        filter: drop-shadow(0 0 18px rgba(194,174,109,0.45));
      }
    }
    .hol-seal:active {
      transform: scale(1.06);
      filter: drop-shadow(0 0 18px rgba(194,174,109,0.45));
    }
  `

  return (
    <>
      <style>{hoverStyle}</style>
      <svg
        ref={sealRef}
        className="hol-seal"
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: animate ? 0 : 1, ...style }}
      >
        {/* ── Circular text path ── */}
        <defs>
          <path
            id="arcPath"
            d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          />
        </defs>

        {/* Outer glow fill */}
        <circle cx="100" cy="100" r="96" fill={GOLD3} />

        {/* Outer decorative ring — this group rotates */}
        <g ref={outerRef}>
          {/* Outer circle */}
          <circle cx="100" cy="100" r="96" stroke={GOLD2} strokeWidth="1" />

          {/* Tick marks around outer ring */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle  = (i * 10 * Math.PI) / 180
            const isMaj  = i % 3 === 0
            const r1     = 96
            const r2     = r1 - (isMaj ? 7 : 4)
            const x1     = 100 + r1 * Math.cos(angle)
            const y1     = 100 + r1 * Math.sin(angle)
            const x2     = 100 + r2 * Math.cos(angle)
            const y2     = 100 + r2 * Math.sin(angle)
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={GOLD}
                strokeWidth={isMaj ? 1.2 : 0.6}
                opacity={isMaj ? 0.7 : 0.35}
              />
            )
          })}

          {/* Dashed ring */}
          <circle
            cx="100" cy="100" r="86"
            stroke={GOLD}
            strokeWidth="0.6"
            strokeDasharray="2.5 5"
            opacity="0.4"
          />
        </g>

        {/* Static inner ring */}
        <circle cx="100" cy="100" r="74" stroke={GOLD} strokeWidth="1.2" opacity="0.6" />
        <circle cx="100" cy="100" r="68" stroke={GOLD} strokeWidth="0.5" opacity="0.25" />

        {/* Circular "ARCHIVE · HOL · ARCHIVE · HOL ·" text */}
        <text
          fontFamily="Sora, sans-serif"
          fontWeight="300"
          fontSize="9"
          letterSpacing="3.5"
          fill={GOLD}
          opacity="0.75"
        >
          <textPath href="#arcPath" startOffset="0%">
            ARCHIVE&nbsp;·&nbsp;HOL&nbsp;·&nbsp;ARCHIVE&nbsp;·&nbsp;HOL&nbsp;·&nbsp;ARCHIVE&nbsp;·&nbsp;HOL&nbsp;·
          </textPath>
        </text>

        {/* 4-point star decorations */}
        {[0, 90, 180, 270].map(deg => {
          const rad = (deg * Math.PI) / 180
          const cx  = 100 + 58 * Math.cos(rad)
          const cy  = 100 + 58 * Math.sin(rad)
          return (
            <g key={deg} transform={`translate(${cx} ${cy})`} opacity="0.5">
              <line x1="0" y1="-4" x2="0" y2="4" stroke={GOLD} strokeWidth="0.8" />
              <line x1="-4" y1="0" x2="4" y2="0" stroke={GOLD} strokeWidth="0.8" />
              <line x1="-2.5" y1="-2.5" x2="2.5" y2="2.5" stroke={GOLD} strokeWidth="0.5" />
              <line x1="2.5" y1="-2.5" x2="-2.5" y2="2.5" stroke={GOLD} strokeWidth="0.5" />
            </g>
          )
        })}

        {/* HOL monogram */}
        <text
          x="100" y="111"
          textAnchor="middle"
          fontFamily="Sora, sans-serif"
          fontWeight="700"
          fontSize="44"
          letterSpacing="-1"
          fill={GOLD}
        >
          HOL
        </text>

        {/* Underline accent */}
        <line x1="62" y1="118" x2="138" y2="118" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />
      </svg>
    </>
  )
}


