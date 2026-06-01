// Clients — avatar stack + trust text + text-name marquee

const AVATARS = [
  '/images/team-1.jpg',
  '/images/rony.png',
  '/images/team-3.jpg',
  '/images/pall2.jpg',
  '/images/team-5.jpg',
]

// Company names with subtle typographic variation
const CLIENTS = [
  { name: 'The Knot',         weight: 300, italic: false  },
  { name: 'WeddingWire',      weight: 500, italic: false  },
  { name: 'Zola®',            weight: 200, italic: true   },
  { name: 'Brides',           weight: 600, italic: false  },
  { name: 'Vogue',            weight: 200, italic: true   },
  { name: 'Martha Stewart',   weight: 300, italic: false  },
  { name: 'Style Me Pretty',  weight: 400, italic: true   },
  { name: 'Bridebook',        weight: 500, italic: false  },
  { name: 'WedMeGood',        weight: 300, italic: false  },
  { name: 'Shaadi',           weight: 600, italic: false  },
  { name: 'Cvent',            weight: 200, italic: false  },
  { name: 'Eventbrite',       weight: 400, italic: true   },
]

const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS]

export default function Clients() {
  return (
    <section style={{
      width: '100%',
      backgroundColor: 'var(--hol-bg)',
      padding: 'clamp(72px, 10vw, 120px) 0',
      borderTop: '1px solid var(--hol-border)',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes marquee-clients {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .clients-track {
          animation: marquee-clients 44s linear infinite;
          will-change: transform;
        }
        .clients-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ── Centre: avatar stack + trust copy ── */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '20px',
        marginBottom: 'clamp(52px, 7vw, 88px)',
        padding: '0 24px',
      }}>

        {/* Overlapping avatars */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {AVATARS.map((src, i) => (
            <div
              key={i}
              style={{
                width:  'clamp(44px, 6vw, 60px)',
                height: 'clamp(44px, 6vw, 60px)',
                borderRadius: '50%',
                border: '3px solid var(--hol-bg)',
                overflow: 'hidden',
                marginLeft: i === 0 ? 0 : 'clamp(-14px, -2vw, -18px)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                flexShrink: 0,
                backgroundColor: 'var(--hol-bg-alt)',
                zIndex: AVATARS.length - i,
                position: 'relative',
              }}
            >
              <img
                src={src}
                alt=""
                onError={e => {
                  e.currentTarget.style.display = 'none'
                }}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  filter: 'grayscale(0.3)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Trust copy */}
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--hol-muted)',
          fontFamily: 'Jost, sans-serif',
          textAlign: 'center',
          lineHeight: 1.9,
          margin: 0,
          maxWidth: '340px',
        }}>
          Trusted by 200+ clients
          <br />
          &amp; powering luxury events worldwide
        </p>

        {/* Thin gold separator */}
        <div style={{
          width: '40px', height: '1px',
          backgroundColor: 'rgba(194,174,109,0.5)',
        }} />
      </div>

      {/* ── Marquee of client names ── */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <div
          className="clients-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(32px, 5vw, 72px)',
            width: 'max-content',
            padding: '0 36px',
          }}
        >
          {TRACK.map((client, i) => (
            <span
              key={i}
              style={{
                flexShrink: 0,
                fontFamily: 'Jost, sans-serif',
                fontSize: 'clamp(18px, 2.2vw, 30px)',
                fontWeight: client.weight,
                fontStyle: client.italic ? 'italic' : 'normal',
                color: 'var(--hol-text)',
                opacity: 0.55,
                letterSpacing: client.weight >= 500 ? '0.04em' : '0.01em',
                whiteSpace: 'nowrap',
                transition: 'opacity 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
            >
              {client.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
