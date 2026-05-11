import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/use-mobile'

export default function Team() {
  const isMobile = useIsMobile()

  return (
    <section id="team" style={{ padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', 
          gap: isMobile ? '48px' : '80px', 
          alignItems: 'center' 
        }}>
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ 
              fontSize: '11px', 
              textTransform: 'uppercase', 
              color: '#999999', 
              letterSpacing: '0.3em',
              marginBottom: '24px', 
              display: 'block',
              fontFamily: 'Outfit, sans-serif'
            }}>
              The Founder
            </span>
            <h2 style={{ 
              fontSize: 'clamp(36px, 6vw, 80px)', 
              fontFamily: 'Playfair Display, serif', 
              color: '#0a0a0a', 
              marginBottom: '32px',
              fontWeight: 300,
              lineHeight: 1.1
            }}>
              Ravi Parmar
            </h2>
            <p style={{ 
              fontSize: 'clamp(18px, 1.4vw, 24px)', 
              color: '#444444', 
              marginBottom: '40px', 
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 300,
              lineHeight: 1.6
            }}>
              A veteran in the architectural landscape with over 25 years of mastery, Ravi Parmar has redefined the standards of luxury living and commercial excellence.
            </p>
            <p style={{ 
              fontSize: '16px', 
              color: '#666666', 
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 300,
              lineHeight: 1.8,
              maxWidth: '600px'
            }}>
              As a Senior Architect, Ravi has curated an extensive portfolio featuring bespoke bungalows, high-end residential estates, and sophisticated retail spaces. His philosophy centers on structural integrity paired with timeless aesthetics, ensuring that every project—from a sprawling residence to a curated shop—stands as a testament to architectural heritage and modern innovation.
            </p>
          </motion.div>

          {/* Right: Placeholder Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', width: '100%', aspectRatio: '4/5', backgroundColor: '#f8f8f8', overflow: 'hidden' }}
          >
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#cccccc',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontFamily: 'Outfit, sans-serif'
            }}>
              [ Ravi Parmar Portrait ]
            </div>
            
            <img 
              src="/images/ravi-parmar.png" 
              alt="Ravi Parmar" 
              onError={(e) => e.currentTarget.style.display = 'none'}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                position: 'relative',
                zIndex: 1
              }} 
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
