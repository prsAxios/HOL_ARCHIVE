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
          backgroundColor: '#ffffff',
          color: '#0a0a0a',
          flexDirection: 'column',
          gap: '20px',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        <p style={{ fontSize: '20px' }}>Project not found.</p>
        <button
          onClick={onBack}
          style={{
            fontSize: '13px',
            letterSpacing: '0.14em',
            padding: '14px 32px',
            border: '1px solid #0a0a0a',
            backgroundColor: 'transparent',
            color: '#0a0a0a',
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
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px' }}>
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
            fontSize: '12px',
            letterSpacing: '0.2em',
            padding: '12px 24px',
            border: '1px solid #0a0a0a',
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: '#0a0a0a',
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontFamily: 'Outfit, sans-serif',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
          }}
        >
          &larr; Close
        </button>
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '32px' : 'clamp(40px, 6vw, 80px)',
            left: isMobile ? '20px' : 'clamp(24px, 5vw, 80px)',
            right: isMobile ? '20px' : 'clamp(24px, 5vw, 80px)',
            color: '#0a0a0a',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#666666',
              marginBottom: '16px',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Project {room.id} &middot; {room.client}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{
              fontSize: 'clamp(40px, 8vw, 120px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
              maxWidth: '1000px',
              fontFamily: 'Playfair Display, serif',
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
              fontSize: 'clamp(22px, 2.5vw, 36px)',
              fontWeight: 300,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              color: '#0a0a0a',
              marginBottom: isMobile ? '40px' : '64px',
              maxWidth: '800px',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            {room.tagline}
          </motion.p>

          <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}>
            {room.description.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: '18px',
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
              borderTop: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.3em',
                color: '#999999',
                textTransform: 'uppercase',
                marginBottom: '40px',
                fontFamily: 'Outfit, sans-serif',
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
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: '#0a0a0a',
                    paddingLeft: '32px',
                    position: 'relative',
                    fontFamily: 'Outfit, sans-serif',
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
                      backgroundColor: '#0a0a0a',
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
            border: '1px solid rgba(0,0,0,0.05)',
            padding: isMobile ? '32px' : '48px',
            backgroundColor: '#fafafa',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#999999',
              marginBottom: '16px',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Project Value
          </p>
          <p
            style={{
              fontSize: 'clamp(40px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#0a0a0a',
              marginBottom: '8px',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            {room.price}
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#666666',
              lineHeight: 1.6,
              marginBottom: '40px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 300,
            }}
          >
            {room.priceNote}
          </p>

          <div
            style={{
              borderTop: '1px solid rgba(0,0,0,0.08)',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
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
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#0a0a0a',
                backgroundColor: '#ffffff',
                border: '1px solid #0a0a0a',
                textAlign: 'center',
                fontFamily: 'Outfit, sans-serif',
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
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: hovered ? '#ffffff' : '#0a0a0a',
                backgroundColor: hovered ? '#0a0a0a' : 'transparent',
                border: '1px solid #0a0a0a',
                padding: '20px 32px',
                cursor: createReservation.isPending ? 'wait' : 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: 'Outfit, sans-serif',
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
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#999999',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
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
        fontSize: '14px',
        color: '#0a0a0a',
        fontFamily: 'Outfit, sans-serif',
      }}
    >
      <dt style={{ color: '#999999', fontWeight: 300 }}>{k}</dt>
      <dd style={{ margin: 0, fontWeight: 400 }}>{v}</dd>
    </div>
  )
}
