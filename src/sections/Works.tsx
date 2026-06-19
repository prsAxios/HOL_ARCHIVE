import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap-config'
import { rooms, type Room } from '../data/rooms'

interface WorksProps {
  scrollRef: React.RefObject<{ y: number; speed: number }>
  onSelectRoom: (id: string) => void
}

export default function Works({ onSelectRoom }: WorksProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading words split and stagger up
      const split = new SplitText('.works-heading', { type: 'words' })
      gsap.set('.works-heading', { autoAlpha: 1 })
      gsap.fromTo(
        split.words,
        { y: 80, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.works-heading', start: 'top 85%' },
        }
      )

      // Counter badge
      gsap.fromTo('.works-count',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: '.works-count', start: 'top 88%' } }
      )

      // Cards: clip-path reveal + text stagger
      gsap.utils.toArray<Element>('.room-card').forEach((card, i) => {
        const imgWrap = card.querySelector('.room-card-img-wrap')
        const meta    = card.querySelector('.room-card-meta')
        const delay   = (i % 2) * 0.12

        gsap.fromTo(
          imgWrap,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            ease: 'expo.out',
            delay,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )

        gsap.fromTo(
          meta,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'expo.out',
            delay: delay + 0.15,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )

        // Subtle parallax on the image itself
        const img = card.querySelector('.room-card-img')
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="works"
      style={{
        backgroundColor: 'var(--hol-bg-alt)',
        padding: '120px clamp(24px, 5vw, 80px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '80px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            paddingBottom: '32px',
          }}
        >
          <h2
            className="works-heading"
            style={{
              fontSize: 'clamp(32px, 7.5vw, 108px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--hol-text)',
              fontFamily: 'Poppins, sans-serif',
              opacity: 0,
            }}
          >
            Grand Celebrations
          </h2>
          <span
            className="works-count"
            style={{
              fontSize: '14px',
              letterSpacing: '0.2em',
              color: 'var(--hol-faint)',
              textTransform: 'uppercase',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '10px',
              opacity: 0,
            }}
          >
            ({rooms.length} Projects)
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 500px), 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
          }}
        >
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} onClick={() => onSelectRoom(room.id)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoomCard({ room, onClick }: { room: Room; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="room-card"
      onClick={onClick}
      style={{ cursor: 'pointer', textAlign: 'left', position: 'relative' }}
    >
      <div
        className="room-card-img-wrap"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/5',
          overflow: 'hidden',
          backgroundColor: 'var(--hol-text)',
          marginBottom: '32px',
          clipPath: 'inset(100% 0 0 0)',
        }}
      >
        <img
          className="room-card-img"
          src={room.img}
          alt={room.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            transition: 'background-color 0.6s ease',
            ...(hovered ? { backgroundColor: 'rgba(0,0,0,0.06)' } : {}),
          }}
        />
      </div>

      <div
        className="room-card-meta"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          opacity: 0,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div>
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '0.25em',
              color: 'var(--hol-faint)',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'block',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {room.id} &middot; {room.client}
          </span>
          <h3
            style={{
              fontSize: 'clamp(22px, 3vw, 38px)',
              fontWeight: 400,
              color: 'var(--hol-text)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {room.title}
          </h3>
        </div>
        <span
          style={{
            fontSize: '22px',
            color: 'var(--hol-text)',
            marginTop: '28px',
            display: 'inline-block',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'translateX(6px)' : 'translateX(0)',
          }}
        >
          &rarr;
        </span>
      </div>
    </div>
  )
}



