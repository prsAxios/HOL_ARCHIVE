import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap-config'

const FAQS = [
  {
    q: 'What does HOL Archive do?',
    a: 'HOL Archive is a premium hospitality, operations, and logistics company specialising in luxury event execution. We handle every detail — from guest experience design and vendor coordination to on-ground logistics — ensuring your event is flawlessly delivered and permanently archived as a timeless memory.',
  },
  {
    q: 'What types of events do you manage?',
    a: 'We manage luxury weddings, destination celebrations, corporate galas, brand activations, private milestones, and large-scale productions. Whether it\'s an intimate 50-guest affair or a 1,000-delegate summit, our operational frameworks scale to match.',
  },
  {
    q: 'Which cities and countries do you operate in?',
    a: 'Our primary base is Mumbai, India, with active operations across Delhi, Jaipur, Dubai, Singapore, and London. We are equipped to mobilise globally for destination weddings and international events.',
  },
  {
    q: 'How far in advance should I reach out?',
    a: 'For luxury weddings and large-scale events, we recommend reaching out at least 6–12 months in advance. For corporate events and smaller productions, 2–3 months is typically sufficient. That said, we do accommodate urgent inquiries — contact us and we will assess feasibility.',
  },
  {
    q: 'What does "Archive" mean in HOL Archive?',
    a: 'Archive reflects our philosophy that every event we create should be worthy of permanent preservation. We don\'t just execute events — we curate experiences so meticulously crafted that they become timeless records. Each project is added to our archive as a testament to precision and luxury.',
  },
  {
    q: 'How do I start working with HOL Archive?',
    a: 'Submit an inquiry through our contact form with your event details — type, location, dates, and guest count. Our team reviews every inquiry carefully and responds within 24–48 hours to schedule an initial consultation.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<SVGSVGElement>(null)

  const toggle = () => {
    const body = bodyRef.current
    const inner = innerRef.current
    const chevron = chevronRef.current
    if (!body || !inner) return

    if (!open) {
      /* Open */
      const h = inner.offsetHeight
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        {
          height: h,
          opacity: 1,
          duration: 0.38,
          ease: 'power3.out',
          onComplete: () => gsap.set(body, { height: 'auto' }),
        }
      )
      gsap.to(chevron, { rotation: 180, duration: 0.3, ease: 'power3.out' })
    } else {
      /* Close */
      gsap.to(body, { height: 0, opacity: 0, duration: 0.28, ease: 'power3.in' })
      gsap.to(chevron, { rotation: 0, duration: 0.28, ease: 'power3.in' })
    }

    setOpen((o) => !o)
  }

  return (
    <div
      className="faq-glass-card"
      style={{
        zIndex: 2,
        position: 'relative',
        borderColor: open ? 'rgba(194, 174, 109, 0.45)' : undefined,
        boxShadow: open
          ? '0 12px 30px rgba(0, 0, 0, 0.12), 0 0 12px rgba(194, 174, 109, 0.08)'
          : undefined,
      }}
    >
      <button
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          padding: 'clamp(16px, 2vw, 24px) clamp(20px, 2.5vw, 32px)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(14px, 1.25vw, 17px)',
            color: open ? 'var(--hol-gold)' : 'var(--hol-text)',
            lineHeight: 1.4,
            transition: 'color 0.3s ease',
          }}
        >
          {q}
        </span>

        <svg
          ref={chevronRef}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? 'var(--hol-gold)' : 'var(--hol-muted)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            willChange: 'transform',
            transition: 'stroke 0.3s ease',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Collapsible body */}
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div ref={innerRef} style={{ padding: '0 clamp(20px, 2.5vw, 32px) clamp(18px, 2vw, 26px)' }}>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(13px, 1vw, 14.5px)',
              color: 'var(--hol-muted)',
              lineHeight: 1.8,
              margin: 0,
              maxWidth: '760px',
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        backgroundColor: 'var(--hol-bg)',
        padding: 'clamp(72px, 10vw, 120px) clamp(24px, 8vw, 120px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Glassmorphism Background Blobs ── */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '8%',
          width: 'clamp(200px, 25vw, 360px)',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          background: 'var(--hol-gold)',
          filter: 'blur(100px)',
          opacity: 0.07,
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'floatBlob1 24s infinite alternate ease-in-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '6%',
          width: 'clamp(240px, 30vw, 420px)',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          background: 'var(--hol-red)',
          filter: 'blur(110px)',
          opacity: 0.04,
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'floatBlob2 28s infinite alternate ease-in-out',
        }}
      />

      {/* Heading */}
      <h2
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 52px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: 'var(--hol-text)',
          textAlign: 'center',
          margin: '0 0 clamp(48px, 6vw, 80px)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        Frequently asked questions
      </h2>

      {/* Accordion List */}
      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {FAQS.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>

      {/* Glassmorphic Card Styling rules */}
      <style>{`
        .faq-glass-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
          border-radius: 14px;
          margin-bottom: 16px;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        [data-theme="dark"] .faq-glass-card {
          background: rgba(17, 17, 17, 0.25);
          border: 1px solid rgba(244, 241, 236, 0.06);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
        }

        html:not([data-theme="dark"]) .faq-glass-card {
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(17, 17, 17, 0.06);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
        }

        .faq-glass-card:hover {
          transform: translateY(-3px);
          border-color: var(--hol-gold);
          box-shadow: 0 12px 30px rgba(194, 174, 109, 0.08);
        }

        [data-theme="dark"] .faq-glass-card:hover {
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35), 0 0 15px rgba(194, 174, 109, 0.08);
        }

        @keyframes floatBlob1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.08); }
        }
        @keyframes floatBlob2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-30px, 45px) scale(1.12); }
        }
      `}</style>
    </section>
  )
}
