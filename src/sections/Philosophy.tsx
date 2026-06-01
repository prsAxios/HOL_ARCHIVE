import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap-config'

const tags = ['Hospitality', 'Operations', 'Logistics']

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(quoteRef.current!, { type: 'lines' })

      gsap.set(quoteRef.current, { autoAlpha: 1 })
      gsap.fromTo(
        split.lines,
        { y: 80, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 88%' },
        }
      )

      gsap.fromTo(
        Array.from(tagsRef.current!.children),
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: tagsRef.current, start: 'top 90%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--hol-bg-alt)',
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        borderTop: '1px solid rgba(194, 174, 109, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '64px',
        }}
      >
        <p
          ref={quoteRef}
          style={{
            fontSize: 'clamp(22px, 5.5vw, 76px)',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--hol-text)',
            fontFamily: 'Jost, sans-serif',
            opacity: 0,
          }}
        >
          At Archive, we redefine luxury through the lens of operational
          precision. Every detail is curated, every moment preserved,
          and your celebration becomes a timeless legacy.
        </p>

        <div
          ref={tagsRef}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: 'var(--hol-muted)',
                padding: '12px 28px',
                border: '1px solid rgba(194, 174, 109, 0.2)',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                fontFamily: 'Jost, sans-serif',
                opacity: 0,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
