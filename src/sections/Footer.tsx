import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap-config'

const COLS = 50
const ROWS = 13

// ── Pixel-art coordinates [col, row] ─────────────────────────────────
// HOL  — 5×5 letters, rows 1-5, centered in 50 cols (origin col 17)
// ARCHIVE — 5×5 letters, rows 7-11, centered in 50 cols (origin col 5)
const LOGO_COORDS: [number, number][] = [
  // ── H (origin 17,1) ──────────────────────────────────────────────
  [17,1],[21,1],[17,2],[21,2],
  [17,3],[18,3],[19,3],[20,3],[21,3],
  [17,4],[21,4],[17,5],[21,5],
  // ── O (origin 23,1) ──────────────────────────────────────────────
  [24,1],[25,1],[26,1],
  [23,2],[27,2],[23,3],[27,3],[23,4],[27,4],
  [24,5],[25,5],[26,5],
  // ── L (origin 29,1) ──────────────────────────────────────────────
  [29,1],[29,2],[29,3],[29,4],
  [29,5],[30,5],[31,5],[32,5],[33,5],
  // ── A (origin 5,7) ───────────────────────────────────────────────
  [6,7],[7,7],[8,7],
  [5,8],[9,8],
  [5,9],[6,9],[7,9],[8,9],[9,9],
  [5,10],[9,10],[5,11],[9,11],
  // ── R (origin 11,7) ──────────────────────────────────────────────
  [11,7],[12,7],[13,7],[14,7],
  [11,8],[15,8],
  [11,9],[12,9],[13,9],[14,9],
  [11,10],[14,10],
  [11,11],[15,11],
  // ── C (origin 17,7) ──────────────────────────────────────────────
  [18,7],[19,7],[20,7],[21,7],
  [17,8],[17,9],[17,10],
  [18,11],[19,11],[20,11],[21,11],
  // ── H (origin 23,7) ──────────────────────────────────────────────
  [23,7],[27,7],[23,8],[27,8],
  [23,9],[24,9],[25,9],[26,9],[27,9],
  [23,10],[27,10],[23,11],[27,11],
  // ── I (origin 29,7) ──────────────────────────────────────────────
  [29,7],[30,7],[31,7],[32,7],[33,7],
  [31,8],[31,9],[31,10],
  [29,11],[30,11],[31,11],[32,11],[33,11],
  // ── V (origin 35,7) ──────────────────────────────────────────────
  [35,7],[39,7],[35,8],[39,8],
  [36,9],[38,9],[36,10],[38,10],
  [37,11],
  // ── E (origin 41,7) ──────────────────────────────────────────────
  [41,7],[42,7],[43,7],[44,7],[45,7],
  [41,8],
  [41,9],[42,9],[43,9],[44,9],
  [41,10],
  [41,11],[42,11],[43,11],[44,11],[45,11],
]

const LOGO_SET = new Set(LOGO_COORDS.map(([c, r]) => `${c},${r}`))

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>(new Array(COLS * ROWS).fill(null))

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Info columns
      const cols = Array.from(footerRef.current?.querySelectorAll('.f-col') ?? [])
      if (cols.length) {
        gsap.fromTo(cols,
          { y: 36, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
          }
        )
      }

      // Collect logo dots, sorted bottom→top for build-in
      const inOrder = [...LOGO_COORDS]
        .sort((a, b) => b[1] - a[1] || a[0] - b[0])
        .map(([c, r]) => dotRefs.current[r * COLS + c])
        .filter((el): el is HTMLDivElement => el !== null)

      // Same dots top→bottom for build-out
      const outOrder = [...LOGO_COORDS]
        .sort((a, b) => a[1] - b[1] || a[0] - b[0])
        .map(([c, r]) => dotRefs.current[r * COLS + c])
        .filter((el): el is HTMLDivElement => el !== null)

      if (!inOrder.length) return

      gsap.set(inOrder, { scale: 0, opacity: 0 })

      const tl = gsap.timeline({ repeat: -1 })

      // Build in — bottom to top
      tl.to(inOrder, {
        scale: 1, opacity: 1,
        duration: 0.26, stagger: 0.018, ease: 'back.out(1.7)',
      })
      // Hold
      .to({}, { duration: 1.8 })
      // Build out — top to bottom
      .to(outOrder, {
        scale: 0, opacity: 0,
        duration: 0.16, stagger: 0.012, ease: 'power2.in',
      })
      // Pause before repeat
      .to({}, { duration: 0.9 })

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 92%',
        once: true,
        onEnter: () => tl.play(),
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      id="footer"
      style={{ backgroundColor: '#111111', overflow: 'hidden' }}
    >
      {/* Red top rule */}
      <div style={{ width: '100%', height: '2px', backgroundColor: '#E50914' }} />

      {/* Info columns */}
      <div style={{
        padding: '88px clamp(24px, 5vw, 80px) 72px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '56px',
        maxWidth: '1400px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(244,241,236,0.07)',
      }}>
        <div className="f-col" style={{ opacity: 0 }}>
          <p style={LBL}>GLOBAL HQ</p>
          <h3 style={CITY}>Mumbai</h3>
          <p style={BODY}>Lower Parel<br />Maharashtra, India</p>
        </div>

        <div className="f-col" style={{ opacity: 0 }}>
          <p style={LBL}>CONNECT</p>
          <p style={{ ...BODY, lineHeight: 2.4 }}>
            hello@holarchive.com<br />
            +91 7977217008<br />
            <span style={{ color: '#F4F1EC', borderBottom: '1px solid #C2AE6D', paddingBottom: '1px', cursor: 'pointer' }}>
              Instagram
            </span>
          </p>
        </div>

        <div className="f-col" style={{ opacity: 0 }}>
          <p style={LBL}>SERVICES</p>
          <p style={{ ...BODY, lineHeight: 2.4 }}>
            Luxury Tier Events<br />
            Scalable Backend Support<br />
            Destination Operations
          </p>
        </div>

        <div className="f-col" style={{ opacity: 0 }}>
          <p style={LBL}>©2026 H.O.L. ARCHIVE</p>
          <p style={{ ...BODY, opacity: 0.4, maxWidth: '200px', lineHeight: 1.8 }}>
            Hospitality Operations & Logistics.<br />All rights reserved.
          </p>
        </div>
      </div>

      {/* Dot grid */}
      <div
        ref={gridRef}
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          const isLogo = LOGO_SET.has(`${col},${row}`)
          return (
            <div key={i} style={{ aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                ref={el => { dotRefs.current[i] = el }}
                style={{
                  width: '36%', height: '36%',
                  borderRadius: '50%',
                  backgroundColor: isLogo ? '#F4F1EC' : 'rgba(244,241,236,0.08)',
                  flexShrink: 0,
                }}
              />
            </div>
          )
        })}
      </div>
    </footer>
  )
}

const LBL: React.CSSProperties = {
  fontSize: '11px', letterSpacing: '0.4em', color: '#C2AE6D',
  marginBottom: '22px', textTransform: 'uppercase', fontFamily: 'Jost, sans-serif', fontWeight: 400,
}
const CITY: React.CSSProperties = {
  fontSize: '38px', fontWeight: 300, color: '#F4F1EC',
  marginBottom: '12px', fontFamily: 'Jost, sans-serif', letterSpacing: '-0.02em',
}
const BODY: React.CSSProperties = {
  fontSize: '15px', color: 'rgba(244,241,236,0.45)',
  lineHeight: 1.85, fontFamily: 'Jost, sans-serif', fontWeight: 300,
}
