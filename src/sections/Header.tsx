import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../hooks/use-mobile'

interface HeaderProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
}

const navItems = ['Projects', 'Team', 'Services', 'Contact']
const sectionIds = ['#works', '#team', '#capabilities', '#footer']

export default function Header({ scrollRef }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const rafRef = useRef<number>(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 50)
      setIsScrolled(y > 100)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  const handleNavClick = (index: number) => {
    setIsMenuOpen(false)
    const target = document.querySelector(sectionIds[index])
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' })
      }, isMenuOpen ? 500 : 0)
    }
  }

  const textColor = '#0a0a0a'
  const bgColor = isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'
  const borderColor = isScrolled ? 'rgba(0, 0, 0, 0.05)' : 'transparent'

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: isCompact ? '72px' : '96px',
          backgroundColor: bgColor,
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: `1px solid ${borderColor}`,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(24px, 5vw, 80px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            fontSize: isMobile ? '14px' : '18px',
            fontWeight: 300,
            letterSpacing: '0.3em',
            cursor: 'pointer',
            color: textColor,
            fontFamily: 'Outfit, sans-serif',
            zIndex: 102,
          }}
          onClick={() => {
            setIsMenuOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          PARK INTERIORS
        </div>

        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navItems.map((item, i) => (
              <NavItem
                key={item}
                label={item}
                onClick={() => handleNavClick(i)}
              />
            ))}
          </nav>
        )}
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ 
            color: textColor, 
            background: 'none', 
            border: 'none', 
            fontSize: '12px', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase',
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            zIndex: 102,
            padding: '8px'
          }}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(4px)',
                zIndex: 101,
              }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(320px, 80vw)',
                backgroundColor: '#ffffff',
                zIndex: 102,
                display: 'flex',
                flexDirection: 'column',
                padding: '40px',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '60px' }}>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '11px', 
                    letterSpacing: '0.2em', 
                    textTransform: 'uppercase', 
                    fontFamily: 'Outfit, sans-serif',
                    color: '#999999'
                  }}
                >
                  Close
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {navItems.map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleNavClick(i)}
                    style={{
                      fontSize: '24px',
                      fontFamily: 'Playfair Display, serif',
                      color: '#0a0a0a',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
              
              <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#bbbbbb', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>
                  Get in touch
                </p>
                <p style={{ fontSize: '14px', color: '#666666', fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}>
                  hello@parkinteriors.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function NavItem({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        padding: '8px 0',
        fontSize: '12px',
        fontWeight: 400,
        letterSpacing: '0.15em',
        color: '#0a0a0a',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${hovered ? '#0a0a0a' : 'transparent'}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        fontFamily: 'Outfit, sans-serif',
      }}
    >
      {label}
    </button>
  )
}
