import { Link } from 'react-router'
import { useTheme } from '../context/ThemeContext'
import faqData from '../data/faq.json'

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
        {/* Typography Watermark */}
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

        {/* Folder Header Tab */}
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
            borderTopLeftRadius: '0px',
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
            marginTop: '-1px',
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
            willChange: 'transform, opacity',
          }}
        >
          {/* Top Decorative Arrow */}
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

          {/* FAQ Categories List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {faqData.map((category) => (
              <Link
                key={category.id}
                to={`/faq/${category.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px 8px',
                  borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                }}
                onMouseEnter={e => {
                  const title = e.currentTarget.querySelector('.faq-title') as HTMLElement
                  const arrow = e.currentTarget.querySelector('.faq-arrow') as SVGElement
                  if (title) title.style.color = 'var(--hol-gold, #C2AE6D)'
                  if (arrow) {
                    arrow.style.transform = 'translateX(4px)'
                    arrow.style.stroke = 'var(--hol-gold, #C2AE6D)'
                  }
                }}
                onMouseLeave={e => {
                  const title = e.currentTarget.querySelector('.faq-title') as HTMLElement
                  const arrow = e.currentTarget.querySelector('.faq-arrow') as SVGElement
                  if (title) title.style.color = isDark ? '#FFFFFF' : '#1A1A1A'
                  if (arrow) {
                    arrow.style.transform = 'translateX(0)'
                    arrow.style.stroke = isDark ? '#666666' : '#999999'
                  }
                }}
              >
                <span
                  className="faq-title"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 500,
                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                    color: isDark ? '#FFFFFF' : '#1A1A1A',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {category.title}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 600,
                      fontSize: '13px',
                      color: 'var(--hol-gold, #C2AE6D)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    [{category.questions.length}]
                  </span>

                  <svg
                    className="faq-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDark ? '#666666' : '#999999'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: 'transform 0.3s ease, stroke 0.3s ease' }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
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

