import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap-config'

const MEMBERS = [
  {
    index: '001',
    name: 'Rony',
    role: 'Founder & Director',
    description:
      'The strategic mind behind H.O.L. Archive. With over a decade of experience in luxury event operations, Rony architects systems that transform complex celebrations into seamless experiences.',
    image: '/images/rony.png',
  },
  {
    index: '002',
    name: 'Operations Lead',
    role: 'Head of Execution',
    description:
      'Precision in motion. Our operations lead ensures every layer of your event — from vendor coordination to on-ground logistics — runs with exactness and calm authority.',
    image: '/images/pall2.jpg',
  },
]

function CornerMarkers() {
  const arm = '18px'
  const stroke = '1px solid var(--hol-faintest)'
  const base: React.CSSProperties = {
    position: 'absolute', width: arm, height: arm, zIndex: 5, pointerEvents: 'none',
  }
  return (
    <>
      <div style={{ ...base, top: 10, left: 10, borderTop: stroke, borderLeft: stroke }} />
      <div style={{ ...base, top: 10, right: 10, borderTop: stroke, borderRight: stroke }} />
      <div style={{ ...base, bottom: 10, left: 10, borderBottom: stroke, borderLeft: stroke }} />
      <div style={{ ...base, bottom: 10, right: 10, borderBottom: stroke, borderRight: stroke }} />
    </>
  )
}

function MemberImage({ member }: { member: typeof MEMBERS[0] }) {
  return member.image ? (
    <img
      src={member.image}
      alt={member.name}
      onError={e => (e.currentTarget.style.display = 'none')}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  ) : (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: 'var(--hol-bg-alt)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 12,
    }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="var(--hol-faint)" strokeWidth="1" strokeLinecap="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
      <span style={{
        fontSize: '11px', letterSpacing: '0.22em', color: 'var(--hol-faintest)',
        textTransform: 'uppercase', fontFamily: 'Jost, sans-serif',
      }}>H.O.L. Archive</span>
    </div>
  )
}

function MemberText({ member, compact }: { member: typeof MEMBERS[0]; compact?: boolean }) {
  return (
    <div>
      <span style={{
        fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em',
        color: 'var(--hol-red)', fontFamily: 'Jost, sans-serif',
        display: 'block', marginBottom: compact ? '8px' : '18px',
      }}>
        {member.index}
      </span>
      <h2 style={{
        fontSize: compact ? 'clamp(28px, 6vw, 48px)' : 'clamp(36px, 4.5vw, 72px)',
        fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.025em',
        color: 'var(--hol-text)', fontFamily: 'Jost, sans-serif',
        margin: `0 0 ${compact ? '6px' : '10px'}`,
      }}>
        {member.name}
      </h2>
      <p style={{
        fontSize: '12px', letterSpacing: '0.18em', color: 'var(--hol-gold)',
        textTransform: 'uppercase', fontFamily: 'Jost, sans-serif',
        marginBottom: compact ? '12px' : '22px',
      }}>
        {member.role}
      </p>
      <p style={{
        fontSize: compact ? '14px' : 'clamp(14px, 1.3vw, 18px)',
        fontWeight: 300, lineHeight: 1.7, color: 'var(--hol-muted)',
        fontFamily: 'Jost, sans-serif',
        maxWidth: '420px', marginBottom: compact ? '20px' : '32px',
      }}>
        {member.description}
      </p>
      <button
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontSize: '12px', letterSpacing: '0.08em', color: 'var(--hol-text)',
          fontFamily: 'Jost, sans-serif', fontWeight: 400,
          padding: compact ? '8px 16px' : '10px 20px',
          border: '1px solid var(--hol-border)',
          background: 'transparent', cursor: 'pointer',
          transition: 'border-color 0.3s, background 0.3s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hol-gold)'
          ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(194,174,109,0.06)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--hol-border)'
          ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
        }}
      >
        Know more
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '20px', height: '20px', backgroundColor: 'var(--hol-border)',
          fontSize: '14px', lineHeight: 1,
        }}>+</span>
      </button>
    </div>
  )
}

function ProgressStrip({ total, active }: { total: number; active: number }) {
  return (
    <div style={{
      position: 'absolute', bottom: 12, left: 12, right: 12,
      display: 'flex', gap: '4px', zIndex: 6,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: '3px',
          backgroundColor: i <= active ? 'var(--hol-red)' : 'rgba(144,140,134,0.3)',
          transition: 'background-color 0.4s ease',
        }} />
      ))}
    </div>
  )
}

export default function Team() {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  const [activeIdx, setActiveIdx] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const img0Ref = useRef<HTMLDivElement>(null)
  const img1Ref = useRef<HTMLDivElement>(null)
  const text0Ref = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // GSAP — same animation on all screen sizes
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: 'team-pin',
      })

      gsap.set(img1Ref.current, { autoAlpha: 0 })
      gsap.set(text1Ref.current, { autoAlpha: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 0.7,
          onUpdate: self => setActiveIdx(self.progress < 0.5 ? 0 : 1),
        },
      })

      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
      tl.to(img0Ref.current,  { autoAlpha: 0, duration: 0.25, ease: 'power2.in' }, 0.38)
      tl.to(text0Ref.current, { autoAlpha: 0, y: -20, duration: 0.25, ease: 'power2.in' }, 0.38)
      tl.fromTo(img1Ref.current,  { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 0.58)
      tl.fromTo(text1Ref.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.58)
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile]) // re-init if layout switches orientation

  const pad = isMobile ? '20px clamp(16px, 4vw, 28px)' : 'clamp(40px, 5vw, 80px) clamp(32px, 4vw, 64px)'
  const textInset = isMobile ? '16px' : 'clamp(24px, 3vw, 48px)'

  return (
    <section
      ref={sectionRef}
      id="team"
      style={{ backgroundColor: 'var(--hol-bg)', borderTop: '1px solid var(--hol-border)' }}
    >
      <div
        ref={pinRef}
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
        }}
      >
        {/* IMAGE PANEL */}
        <div style={{
          flex: isMobile ? '0 0 55%' : '0 0 55%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--hol-bg-alt)',
        }}>
          <CornerMarkers />

          <div ref={img0Ref} style={{ position: 'absolute', inset: 0 }}>
            <MemberImage member={MEMBERS[0]} />
          </div>
          <div ref={img1Ref} style={{ position: 'absolute', inset: 0 }}>
            <MemberImage member={MEMBERS[1]} />
          </div>

          <ProgressStrip total={MEMBERS.length} active={activeIdx} />
        </div>

        {/* TEXT PANEL */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: pad,
          position: 'relative',
          backgroundColor: 'var(--hol-bg)',
          borderLeft: isMobile ? 'none' : '1px solid var(--hol-border)',
          borderTop: isMobile ? '1px solid var(--hol-border)' : 'none',
          overflow: 'hidden',
        }}>
          {/* Eyebrow */}
          <p style={{
            position: 'absolute',
            top: isMobile ? '12px' : 'clamp(28px, 4vw, 48px)',
            left: textInset,
            fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--hol-faint)', fontFamily: 'Jost, sans-serif', margin: 0,
          }}>
            The Team
          </p>

          {/* Member 0 */}
          <div ref={text0Ref} style={{
            position: 'absolute',
            top: '50%', transform: 'translateY(-50%)',
            left: textInset, right: textInset,
          }}>
            <MemberText member={MEMBERS[0]} compact={isMobile} />
          </div>

          {/* Member 1 */}
          <div ref={text1Ref} style={{
            position: 'absolute',
            top: '50%', transform: 'translateY(-50%)',
            left: textInset, right: textInset,
          }}>
            <MemberText member={MEMBERS[1]} compact={isMobile} />
          </div>

          {/* Progress row bottom */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '12px' : 'clamp(24px, 4vw, 44px)',
            left: textInset, right: textInset,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              {MEMBERS.map((m, i) => (
                <span key={i} style={{
                  fontSize: '10px', letterSpacing: '0.14em',
                  color: i === activeIdx ? 'var(--hol-text)' : 'var(--hol-faintest)',
                  textTransform: 'uppercase', fontFamily: 'Jost, sans-serif',
                  transition: 'color 0.3s',
                }}>
                  {m.index} {m.name}
                </span>
              ))}
            </div>
            <div style={{ height: '1px', backgroundColor: 'var(--hol-border)', position: 'relative' }}>
              <div
                ref={lineRef}
                style={{
                  position: 'absolute', left: 0, top: 0, height: '1px',
                  backgroundColor: 'var(--hol-red)', width: '100%',
                  transformOrigin: 'left center', transform: 'scaleX(0)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
