import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../hooks/use-mobile'
import { useTheme } from '../context/ThemeContext'
import { scrollTo } from '../lib/gsap-config'

interface HeaderProps {
  scrollRef: React.RefObject<{ y: number; speed: number }>
}

const navItems = ['Philosophy', 'Services', 'Team', 'Inquire']
const sectionIds = ['#about', '#services', '#team', '#footer']

export default function Header({ scrollRef: _scrollRef }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const isMobile = useIsMobile()
  const { theme, toggle: toggleTheme } = useTheme()

  const pillHover = theme === 'dark' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)'

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? Math.round((window.scrollY / total) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (musicPlaying) {
      audio.pause()
      setMusicPlaying(false)
    } else {
      try {
        await audio.play()
        setMusicPlaying(true)
      } catch {
        // autoplay blocked
      }
    }
  }

  const handleNavClick = (index: number) => {
    setIsMenuOpen(false)
    const target = document.querySelector(sectionIds[index])
    if (target) setTimeout(() => scrollTo(target), isMenuOpen ? 400 : 0)
  }

  return (
    <>
      <style>{`
        @keyframes hBar1 { 0%,100%{height:3px}  50%{height:14px} }
        @keyframes hBar2 { 0%,100%{height:12px} 50%{height:4px}  }
        @keyframes hBar3 { 0%,100%{height:6px}  50%{height:16px} }
        @keyframes hBar4 { 0%,100%{height:14px} 50%{height:5px}  }
      `}</style>

      <audio ref={audioRef} src="/music/ambient.mp3" loop preload="auto" />

      <header style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
        display: 'flex', alignItems: 'center',
        padding: isMobile ? '16px 20px' : '20px clamp(20px, 4vw, 56px)',
        pointerEvents: 'none',
      }}>

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            flex: 1, pointerEvents: 'auto',
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px', padding: 0,
          }}
        >
          <svg width={isMobile ? 22 : 26} height={isMobile ? 24 : 28}
            viewBox="0 0 56 60" fill="none" stroke="var(--hol-text)"
            strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <polyline points="3,58 3,22 28,3 53,22 53,58" />
            <polyline points="13,58 13,28 28,14 43,28 43,58" />
          </svg>
          {!isMobile && (
            <span style={{
              fontSize: '15px', fontWeight: 400, letterSpacing: '0.22em',
              color: 'var(--hol-text)', fontFamily: 'Jost, sans-serif',
            }}>HOL ARCHIVE</span>
          )}
        </button>

        {/* Center pill — desktop only */}
        {!isMobile && (
          <div style={{
            pointerEvents: 'auto', display: 'flex', alignItems: 'center',
            backgroundColor: 'var(--hol-pill-bg)', borderRadius: '100px',
            height: '48px', padding: '0 6px', gap: '2px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          }}>
            {/* Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                color: 'var(--hol-pill-text)', background: 'none', border: 'none',
                cursor: 'pointer', padding: '0 18px 0 14px', height: '100%',
                fontFamily: 'Jost, sans-serif', fontSize: '15px',
                letterSpacing: '0.04em', fontWeight: 300, borderRadius: '100px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = pillHover)}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                <span style={{ width: '18px', height: '1.5px', backgroundColor: 'var(--hol-pill-text)', display: 'block' }} />
                <span style={{ width: '13px', height: '1.5px', backgroundColor: 'var(--hol-pill-text)', display: 'block' }} />
              </span>
              Menu
            </button>

            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--hol-pill-divider)', flexShrink: 0 }} />

            {/* Music */}
            <button onClick={toggleMusic} style={{
              width: '40px', height: '40px', borderRadius: '50%',
              backgroundColor: musicPlaying ? 'rgba(194,174,109,0.18)' : 'transparent',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.3s ease', flexShrink: 0,
            }}
              onMouseEnter={e => { if (!musicPlaying) e.currentTarget.style.backgroundColor = pillHover }}
              onMouseLeave={e => { if (!musicPlaying) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {musicPlaying ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '18px' }}>
                  {[{ a: 'hBar1', d: '0s', h: '3px' }, { a: 'hBar2', d: '0.1s', h: '12px' },
                    { a: 'hBar3', d: '0.05s', h: '6px' }, { a: 'hBar4', d: '0.18s', h: '14px' }].map(({ a, d, h }) => (
                    <div key={a} style={{
                      width: '3px', height: h, borderRadius: '2px',
                      backgroundColor: 'var(--hol-gold)',
                      animation: `${a} 0.7s ease-in-out infinite`, animationDelay: d,
                    }} />
                  ))}
                </div>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke="var(--hol-pill-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
              )}
            </button>

            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--hol-pill-divider)', flexShrink: 0 }} />

            {/* Theme */}
            <button onClick={toggleTheme} style={{
              width: '40px', height: '40px', borderRadius: '50%',
              backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.3s ease', flexShrink: 0,
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = pillHover)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {theme === 'dark' ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke="var(--hol-pill-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="var(--hol-pill-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--hol-pill-divider)', flexShrink: 0 }} />

            <span className="hol-pill-scroll-pct" style={{
              color: 'var(--hol-pill-text)', fontFamily: 'Jost, sans-serif',
              fontSize: '14px', letterSpacing: '0.04em', padding: '0 16px',
              fontVariantNumeric: 'tabular-nums', minWidth: '52px',
              textAlign: 'center', fontWeight: 300,
            }}>
              {scrollProgress}%
            </span>
          </div>
        )}

        {/* Right */}
        <div style={{
          flex: 1, pointerEvents: 'auto',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px',
        }}>
          {isMobile ? (
            /* Mobile: hamburger circle only */
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              style={{
                width: '44px', height: '44px',
                backgroundColor: 'var(--hol-pill-bg)',
                borderRadius: '50%', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '5px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
              }}
            >
              <span style={{ width: '18px', height: '1.5px', backgroundColor: 'var(--hol-pill-text)', display: 'block' }} />
              <span style={{ width: '12px', height: '1.5px', backgroundColor: 'var(--hol-pill-text)', display: 'block', marginRight: '6px' }} />
            </button>
          ) : (
            <>
              <button style={{
                width: '46px', height: '46px', borderRadius: '50%',
                backgroundColor: 'transparent', border: '1px solid var(--hol-border)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--hol-text)'; e.currentTarget.style.background = 'rgba(128,128,128,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hol-border)'; e.currentTarget.style.background = 'transparent' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="var(--hol-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo('#footer')}
                style={{
                  backgroundColor: 'var(--hol-pill-bg)', color: 'var(--hol-pill-text)',
                  border: 'none', borderRadius: '100px', padding: '0 26px',
                  height: '46px', fontSize: '14px', letterSpacing: '0.06em',
                  fontFamily: 'Jost, sans-serif', cursor: 'pointer', fontWeight: 400, whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Get in touch
              </button>
            </>
          )}
        </div>
      </header>

      {/* Nav Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                backgroundColor: 'rgba(0,0,0,0.25)',
                backdropFilter: 'blur(6px)', zIndex: 101,
              }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(380px, 85vw)',
                backgroundColor: 'var(--hol-bg)',
                zIndex: 102, display: 'flex', flexDirection: 'column',
                padding: '44px 40px',
                borderLeft: '1px solid var(--hol-border)',
              }}
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  alignSelf: 'flex-end', background: 'none', border: 'none',
                  fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontFamily: 'Jost, sans-serif', color: 'var(--hol-faint)', cursor: 'pointer',
                  marginBottom: '56px',
                }}
              >
                Close
              </button>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {navItems.map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleNavClick(i)}
                    style={{
                      fontSize: 'clamp(34px, 5vw, 52px)',
                      fontFamily: 'Jost, sans-serif', color: 'var(--hol-text)',
                      background: 'none', border: 'none', textAlign: 'left',
                      cursor: 'pointer', fontWeight: 300,
                      letterSpacing: '-0.01em', lineHeight: 1.1, padding: 0,
                    }}
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>

              <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
                <p style={{
                  fontSize: '13px', letterSpacing: '0.22em', color: 'var(--hol-faintest)',
                  textTransform: 'uppercase', fontFamily: 'Jost, sans-serif', marginBottom: '10px',
                }}>Get in touch</p>
                <p style={{ fontSize: '17px', color: 'var(--hol-muted)', fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
                  hello@archiveco.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
