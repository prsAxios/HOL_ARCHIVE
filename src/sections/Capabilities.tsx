import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/use-mobile'

const services: { label: string; detail: string }[] = [
  { label: 'Space Planning', detail: 'Strategic layout optimization for flow, function, and spatial harmony' },
  { label: 'Interior Styling', detail: 'Curated furniture, art, and accessories that tell your story' },
  { label: 'Material Selection', detail: 'Bespoke surfaces, textiles, and finishes sourced globally' },
  { label: 'Custom Furniture', detail: 'One-of-a-kind pieces designed and crafted for your space' },
  { label: 'Lighting Design', detail: 'Layered illumination plans that transform mood and atmosphere' },
  { label: 'Project Management', detail: 'End-to-end oversight from concept through final installation' },
  { label: '3D Visualization', detail: 'Photorealistic renders to experience your space before construction' },
  { label: 'Art Curation', detail: 'Handpicked artworks and installations for distinctive character' },
]

export default function Capabilities() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  return (
    <section
      id="capabilities"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/spatial-interior.mp4"
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.15,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px, 6vw, 80px)',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: '80px',
            paddingBottom: '32px',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ flex: '1 1 600px' }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: '11px',
                letterSpacing: '0.3em',
                color: '#666666',
                textTransform: 'uppercase',
                marginBottom: '20px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Excellence in Craft
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#0a0a0a',
                marginBottom: '28px',
                fontFamily: 'Playfair Display, serif',
              }}
            >
              Our Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                fontWeight: 300,
                lineHeight: 1.7,
                color: '#444444',
                maxWidth: '700px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              From conceptual sketches to the final installation, we provide 
              a comprehensive design service that ensures your vision is 
              brought to life with uncompromising quality.
            </motion.p>
          </div>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '1px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          {services.map((service, i) => (
            <BulletItem key={service.label} index={i} {...service} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function BulletItem({
  label,
  detail,
  index,
}: {
  label: string
  detail: string
  index: number
}) {
  const isMobile = useIsMobile()

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      style={{
        backgroundColor: '#ffffff',
        padding: isMobile ? '32px 24px' : '40px 48px',
        display: 'flex',
        gap: isMobile ? '16px' : '24px',
        alignItems: 'flex-start',
        minHeight: '160px',
      }}
    >
      <span
        style={{
          flex: '0 0 auto',
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: '#bbbbbb',
          fontVariantNumeric: 'tabular-nums',
          paddingTop: '6px',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ flex: '1 1 0%' }}>
        <h3
          style={{
            fontSize: 'clamp(20px, 1.8vw, 26px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            color: '#0a0a0a',
            marginBottom: '12px',
            fontFamily: 'Playfair Display, serif',
          }}
        >
          {label}
        </h3>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#666666',
            margin: 0,
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 300,
          }}
        >
          {detail}
        </p>
      </div>
    </motion.li>
  )
}
