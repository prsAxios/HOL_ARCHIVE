import { useEffect, useState } from 'react'

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 800)
    const t2 = setTimeout(() => setPhase('done'), 1800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--hol-bg-alt)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'reveal' ? 0 : 1,
        transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'reveal' ? 'none' : 'auto',
      }}
    >
      <span
        style={{
          fontSize: 'clamp(52px, 10vw, 140px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'var(--hol-gold)',
          fontFamily: 'Jost, sans-serif',
          transform: phase === 'loading' ? 'translateY(20px)' : 'translateY(0)',
          opacity: phase === 'loading' ? 0 : 1,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
        }}
      >
        HOL ARCHIVE
      </span>
    </div>
  )
}

