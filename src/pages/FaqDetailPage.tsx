import { useParams, useNavigate, Navigate } from 'react-router'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import faqData from '../data/faq.json'

export default function FaqDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const category = faqData.find((item) => item.slug === slug)

  if (!category) {
    return <Navigate to="/" replace />
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#000000' : '#FFFFFF',
        color: isDark ? '#FFFFFF' : '#1A1A1A',
        transition: 'background-color 0.4s ease, color 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflowX: 'hidden',
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {/* Background Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: 'clamp(250px, 30vw, 450px)',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          background: 'var(--hol-gold, #C2AE6D)',
          filter: 'blur(120px)',
          opacity: isDark ? 0.06 : 0.04,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '860px',
          zIndex: 1,
        }}
      >
        {/* Back navigation */}
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Sora', sans-serif",
            fontSize: '13px',
            fontWeight: 300,
            letterSpacing: '0.14em',
            color: 'var(--hol-gold, #C2AE6D)',
            textTransform: 'uppercase',
            padding: '0 0 32px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ← Back to FAQs
        </button>

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
            FAQ.SYS // DATA
          </span>
          <span style={{ fontSize: '12px', opacity: 0.6 }}>💾</span>
        </div>

        {/* Main Folder Content Body */}
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
            padding: 'clamp(32px, 5vw, 64px)',
            boxShadow: isDark
              ? '0 40px 100px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.4)'
              : '0 40px 100px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            marginTop: '-1px',
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {/* Category Title */}
          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(24px, 4vw, 38px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: isDark ? '#FFFFFF' : '#1A1A1A',
              margin: '0 0 40px 0',
              textTransform: 'none',
            }}
          >
            {category.title}
          </h1>

          {/* Questions/Answers List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {category.questions.map((qItem, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  borderTop: idx > 0 ? (isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)') : 'none',
                  paddingTop: idx > 0 ? '40px' : '0',
                  transition: 'border-color 0.4s ease',
                }}
              >
                {/* Numbered Indicator */}
                <span
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: 'var(--hol-gold, #C2AE6D)',
                    textTransform: 'uppercase',
                  }}
                >
                  Q{idx + 1}
                </span>

                {/* Sub-Question */}
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 'clamp(16px, 1.3vw, 19px)',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: isDark ? '#FFFFFF' : '#1A1A1A',
                    margin: 0,
                  }}
                >
                  {qItem.question}
                </h3>

                {/* Answer */}
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 'clamp(14px, 1vw, 15.5px)',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: isDark ? '#8E8A84' : '#555555',
                    margin: 0,
                    maxWidth: '760px',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {qItem.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Footer of card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '56px',
              paddingTop: '20px',
              borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
              fontSize: '10px',
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
    </motion.div>
  )
}
