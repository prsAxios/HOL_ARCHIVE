import { motion } from 'framer-motion'

const tags = ['Residential', 'Commercial', 'Hospitality']

export default function Philosophy() {
  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '160px clamp(24px, 5vw, 80px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
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
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#0a0a0a',
            fontFamily: 'Playfair Display, serif',
          }}
        >
          We believe great design is not about filling a space, but about
          revealing its potential — creating environments that inspire,
          comfort, and endure.
        </motion.p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: '#666666',
                padding: '12px 32px',
                border: '1px solid rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
