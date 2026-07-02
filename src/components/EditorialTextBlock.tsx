import { motion } from 'framer-motion'
import React from 'react'

interface EditorialTextBlockProps {
  num: string
  title: string
  body: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export default function EditorialTextBlock({
  num,
  title,
  body,
  style,
  className,
}: EditorialTextBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '520px', // Fits full-width layouts perfectly
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: 'var(--hol-muted)',
            transition: 'color 0.4s ease',
          }}
        >
          {num}
        </span>
        <div
          style={{
            height: '1px',
            width: '24px',
            backgroundColor: 'var(--hol-border)',
            transition: 'background-color 0.4s ease',
          }}
        />
        <h3
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--hol-text)',
            margin: 0,
            transition: 'color 0.4s ease',
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: '1.85',
          color: 'var(--hol-muted)',
          margin: 0,
          textAlign: 'left',
          transition: 'color 0.4s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px', // spacing between paragraphs
        }}
      >
        {body}
      </div>
    </motion.div>
  )
}

