import { useEffect, useState } from 'react'
import { rooms } from '../data/rooms'
import { trpc } from '@/providers/trpc'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/use-mobile'

interface RoomDetailProps {
  roomId: string
  onBack: () => void
}

export default function RoomDetail({ roomId, onBack }: RoomDetailProps) {
  const room = rooms.find((r) => r.id === roomId)
  const [hovered, setHovered] = useState(false)
  const [reserveStatus, setReserveStatus] = useState<'idle' | 'reserved'>('idle')
  const isMobile = useIsMobile()

  const createReservation = trpc.reservation.create.useMutation({
    onSuccess: () => {
      setReserveStatus('reserved')
    },
  })

  const handleReserve = () => {
    if (!room) return
    createReservation.mutate({
      checkInDate: '',
      checkOutDate: '',
      guests: '1',
      roomType: room.title,
      roomId: room.id,
      fullName: 'Guest',
      email: 'guest@example.com',
    })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [roomId])

  if (!room) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--hol-bg)',
          color: 'var(--hol-text)',
          flexDirection: 'column',
          gap: '20px',
          fontFamily: 'Sora, sans-serif',
        }}
      >
        <p style={{ fontSize: '26px' }}>Project not found.</p>
        <button
          onClick={onBack}
          style={{
            fontSize: '17px',
            letterSpacing: '0.14em',
            padding: '14px 32px',
            border: '1px solid #0a0a0a',
            backgroundColor: 'transparent',
            color: 'var(--hol-text)',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          &larr; Back to projects
        </button>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--hol-bg)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Hero image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '60vh' : 'clamp(500px, 80vh, 900px)',
          minHeight: isMobile ? '400px' : '600px',
          overflow: 'hidden',
          backgroundColor: '#f8f8f8',
        }}
      >
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={room.img}
          alt={room.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.5) 100%)',
          }}
        />
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: isMobile ? '40px' : 'clamp(80px, 12vh, 120px)',
            left: isMobile ? '20px' : 'clamp(24px, 5vw, 80px)',
            fontSize: '16px',
            letterSpacing: '0.2em',
            padding: '12px 24px',
            border: '1px solid #0a0a0a',
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: 'var(--hol-text)',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontFamily: 'Sora, sans-serif',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
          }}
        >
          &larr; Close
        </button>
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '32px' : 'clamp(56px, 7.5vw, 108px)',
            left: isMobile ? '20px' : 'clamp(24px, 5vw, 80px)',
            right: isMobile ? '20px' : 'clamp(24px, 5vw, 80px)',
            color: 'var(--hol-text)',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontSize: '14px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--hol-muted)',
              marginBottom: '16px',
              fontFamily: 'Sora, sans-serif',
            }}
          >
            Project {room.id} &middot; {room.client}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{
              fontSize: 'clamp(56px, 9vw, 150px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
              maxWidth: '1000px',
              fontFamily: 'Sora, sans-serif',
            }}
          >
            {room.title}
          </motion.h1>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: isMobile ? '60px 20px' : '100px clamp(24px, 5vw, 80px) 120px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: isMobile ? '60px' : '100px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: description + features */}
        <div style={{ flex: '2 1 600px', minWidth: 0 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(30px, 3.2vw, 50px)',
              fontWeight: 300,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              color: 'var(--hol-text)',
              marginBottom: isMobile ? '40px' : '64px',
              maxWidth: '800px',
              fontFamily: 'Sora, sans-serif',
            }}
          >
            {room.tagline}
          </motion.p>

          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 300 }}>
            {room.description.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: '22px',
                  lineHeight: 1.8,
                  color: '#444444',
                  marginBottom: '24px',
                  maxWidth: '720px',
                }}
              >
                {p}
              </p>
            ))}
          </div>

          <div
            style={{
              marginTop: isMobile ? '60px' : '100px',
              paddingTop: '48px',
              borderTop: '1px solid var(--hol-border)',
            }}
          >
            <p
              style={{
                fontSize: '14px',
                letterSpacing: '0.3em',
                color: 'var(--hol-faint)',
                textTransform: 'uppercase',
                marginBottom: '40px',
                fontFamily: 'Sora, sans-serif',
              }}
            >
              Key Details
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '24px 60px',
              }}
            >
              {room.features.map((f) => (
                <li
                  key={f}
                  style={{
                    fontSize: '20px',
                    lineHeight: 1.6,
                    color: 'var(--hol-text)',
                    paddingLeft: '32px',
                    position: 'relative',
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 300,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '12px',
                      width: '12px',
                      height: '1px',
                      backgroundColor: 'var(--hol-text)',
                    }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: inquiry panel */}
        <aside
          style={{
            flex: '1 1 360px',
            minWidth: 0,
            position: isMobile ? 'relative' : 'sticky',
            top: isMobile ? '0' : '140px',
            border: '1px solid var(--hol-border)',
            padding: isMobile ? '32px' : '48px',
            backgroundColor: 'var(--hol-card)',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--hol-faint)',
              marginBottom: '16px',
              fontFamily: 'Sora, sans-serif',
            }}
          >
            Project Value
          </p>
          <p
            style={{
              fontSize: 'clamp(56px, 5.5vw, 80px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: 'var(--hol-text)',
              marginBottom: '8px',
              fontFamily: 'Sora, sans-serif',
            }}
          >
            {room.price}
          </p>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--hol-muted)',
              lineHeight: 1.6,
              marginBottom: '40px',
              fontFamily: 'Sora, sans-serif',
              fontWeight: 300,
            }}
          >
            {room.priceNote}
          </p>

          <div
            style={{
              borderTop: '1px solid var(--hol-border)',
              borderBottom: '1px solid var(--hol-border)',
              padding: '24px 0',
              margin: '0 0 40px',
              display: 'grid',
              gap: '16px',
            }}
          >
            <StatRow k="Size" v={room.sqm} />
            <StatRow k="Type" v={room.occupancy} />
            <StatRow k="Category" v={room.bed} />
          </div>

          {reserveStatus === 'reserved' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                width: '100%',
                padding: '20px',
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'var(--hol-text)',
                backgroundColor: 'var(--hol-bg)',
                border: '1px solid #0a0a0a',
                textAlign: 'center',
                fontFamily: 'Sora, sans-serif',
              }}
            >
              Inquiry submitted successfully.
            </motion.div>
          ) : (
            <button
              onClick={handleReserve}
              disabled={createReservation.isPending}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                width: '100%',
                fontSize: '16px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: hovered ? 'var(--hol-bg)' : 'var(--hol-text)',
                backgroundColor: hovered ? 'var(--hol-text)' : 'transparent',
                border: '1px solid #0a0a0a',
                padding: '20px 32px',
                cursor: createReservation.isPending ? 'wait' : 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: 'Sora, sans-serif',
                opacity: createReservation.isPending ? 0.6 : 1,
              }}
            >
              {createReservation.isPending ? 'Submitting...' : 'Request Info'}
            </button>
          )}
          
          <button
            onClick={onBack}
            style={{
              width: '100%',
              marginTop: '20px',
              fontSize: '14px',
              letterSpacing: '0.2em',
              color: 'var(--hol-faint)',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'Sora, sans-serif',
            }}
          >
            &larr; Back to collection
          </button>
        </aside>
      </div>
    </div>
  )
}

function StatRow({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '18px',
        color: 'var(--hol-text)',
        fontFamily: 'Sora, sans-serif',
      }}
    >
      <dt style={{ color: 'var(--hol-faint)', fontWeight: 300 }}>{k}</dt>
      <dd style={{ margin: 0, fontWeight: 400 }}>{v}</dd>
    </div>
  )
}



