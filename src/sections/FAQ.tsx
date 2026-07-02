import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

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

function FAQItem({ q, a, isDark }: { q: string; a: string; isDark: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      style={{
        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
        transition: 'border-color 0.3s ease',
      }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '20px 8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          outline: 'none',
        }}
      >
        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            color: isOpen
              ? 'var(--hol-gold, #C2AE6D)'
              : isDark
                ? '#FFFFFF'
                : '#1A1A1A',
            transition: 'color 0.3s ease',
          }}
        >
          {q}
        </span>

        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isOpen ? 'var(--hol-gold, #C2AE6D)' : isDark ? '#666666' : '#999999'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 8px 24px 8px' }}>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(13px, 0.95vw, 14.5px)',
                  color: isDark ? '#8E8A84' : '#555555',
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: '760px',
                }}
              >
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="faq"
      style={{
        backgroundColor: isDark ? '#000000' : '#FFFFFF',
        color: isDark ? '#FFFFFF' : '#1A1A1A',
        padding: 'clamp(100px, 14vw, 160px) clamp(16px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      {/* Dynamic Background Glass Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: 'clamp(250px, 30vw, 450px)',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          background: 'var(--hol-gold, #C2AE6D)',
          filter: 'blur(120px)',
          opacity: isDark ? 0.07 : 0.05,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: 'clamp(280px, 35vw, 500px)',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          background: 'var(--hol-red, #E50914)',
          filter: 'blur(130px)',
          opacity: isDark ? 0.04 : 0.02,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Main Structural Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '860px',
          zIndex: 1,
        }}
      >
        {/* Precision "Half-In, Half-Out" Typography Watermark (Extruded 3D Style) */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(-110px, -15vw, -165px)',
            left: '50%',
            transform: 'translateX(-50%)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            lineHeight: 0.8,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(8rem, 16vw, 20rem)',
              letterSpacing: '-0.06em',
              textTransform: 'uppercase',
              color: isDark ? '#FFFFFF' : '#000000',
              textShadow: isDark
                ? '1px 1px 0px #E6E6E6, 2px 2px 0px #D9D9D9, 3px 3px 0px #CCCCCC, 4px 4px 0px #B3B3B3, 5px 5px 15px rgba(0, 0, 0, 0.9)'
                : '1px 1px 0px #1A1A1A, 2px 2px 0px #262626, 3px 3px 0px #333333, 4px 4px 0px #4D4D4D, 5px 5px 15px rgba(0, 0, 0, 0.15)',
              transition: 'color 0.4s ease, text-shadow 0.4s ease',
              display: 'block',
              willChange: 'transform, opacity',
            }}
          >
            FAQ
          </span>
        </div>

        {/* Folder Header Tab (Highly Specular Glass) */}
        <div
          style={{
            width: 'clamp(140px, 20vw, 220px)',
            height: '42px',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.12)',
            borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.12)',
            borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.12)',
            background: isDark
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%)',
            backdropFilter: 'blur(12px) saturate(140%)',
            WebkitBackdropFilter: 'blur(12px) saturate(140%)',
            boxShadow: isDark
              ? 'inset 0 1px 0 rgba(255,255,255,0.08)'
              : 'inset 0 1px 0 rgba(255,255,255,0.85)',
          }}
        >
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: isDark ? '#C2AE6D' : '#88743A',
              textTransform: 'uppercase',
            }}
          >
            FAQ.SYS
          </span>
          <span style={{ fontSize: '12px', opacity: 0.6 }}>⚙️</span>
        </div>

        {/* Glassmorphism Folder Container Body */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '24px',
            borderTopLeftRadius: '0px', // Connect cleanly with folder tab
            border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
            background: isDark
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 60%, rgba(255, 255, 255, 0.03) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0.3) 100%)',
            backdropFilter: 'blur(12px) saturate(140%)',
            WebkitBackdropFilter: 'blur(12px) saturate(140%)',
            padding: 'clamp(24px, 4vw, 48px)',
            boxShadow: isDark
              ? '0 40px 100px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.4)'
              : '0 40px 100px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            marginTop: '-1px', // Seamless connection
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
            willChange: 'transform, opacity',
          }}
        >
          {/* Top Decorative Graphic (Diagonal System Arrow) */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
              fontSize: '22px',
              fontWeight: 300,
              userSelect: 'none',
            }}
          >
            ↗
          </div>

          {/* FAQ Accordions List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} isDark={isDark} />
            ))}
          </div>

          {/* Bottom Row Badge & System Text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
              fontSize: '10px',
              fontFamily: "'Sora', sans-serif",
              color: isDark ? '#666666' : '#999999',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: 600,
                  color: isDark ? '#FFFFFF' : '#1A1A1A',
                }}
              >
                H
              </div>
              <span>HOL ARCHIVE // RECORDS</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span>SECURE_FILE_04.SYS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

