import React, { useRef, useEffect } from 'react'
import { gsap } from '../lib/gsap-config'

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  style?: React.CSSProperties
  className?: string
}

export default function MagneticButton({
  children,
  onClick,
  style,
  className,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      // Calculate offset from center of button
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)

      // Move button 35% of the distance to the mouse cursor
      gsap.to(button, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      // Elastic spring back to center
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.3)',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      style={{
        ...style,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={className}
    >
      {children}
    </button>
  )
}
