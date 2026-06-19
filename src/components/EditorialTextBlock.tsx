import { motion } from 'framer-motion'
import React from 'react'

interface EditorialTextBlockProps {
  num: string
  title: string
  body: string
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
        maxWidth: '320px',
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
            fontFamily: 'Poppins, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: '#8E8A84',
          }}
        >
          {num}
        </span>
        <div
          style={{
            height: '1px',
            width: '24px',
            backgroundColor: 'rgba(17, 17, 17, 0.15)',
          }}
        />
        <h3
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#111111',
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      <p
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: '1.85',
          color: '#555555',
          margin: 0,
          textAlign: 'left',
        }}
      >
        {body}
      </p>
    </motion.div>
  )
}
