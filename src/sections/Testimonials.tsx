// Testimonials — infinite bidirectional marquee

const TESTIMONIALS = [
  {
    quote: "Rony and his team orchestrated our daughter's wedding with a level of precision I've never witnessed. Every detail — from the arrival choreography to the final farewell — was flawlessly executed.",
    author: "Priya Mehta",
    role: "Mother of the Bride",
    event: "The Grand Mehta Wedding, Udaipur",
    rating: 5,
  },
  {
    quote: "We entrusted H.O.L. Archive with our annual leadership summit and they delivered beyond every expectation. The logistics were invisible — as they should be. Our guests only experienced perfection.",
    author: "Arjun Singhania",
    role: "Chairman, Singhania Group",
    event: "Global Leadership Summit, Dubai",
    rating: 5,
  },
  {
    quote: "What sets Archive apart is their absolute calm under pressure. When an unforeseen challenge arose the morning of our gala, they resolved it before a single guest arrived. Truly masterful.",
    author: "Nadia Al-Farsi",
    role: "Director of Events",
    event: "Heritage Gala, Abu Dhabi",
    rating: 5,
  },
  {
    quote: "The Archive team transformed our vision into something we could never have imagined alone. The operational intelligence behind the aesthetic is what makes them exceptional in this industry.",
    author: "Kavya Reddy",
    role: "Bride",
    event: "Reddy – Iyer Celebration, Hyderabad",
    rating: 5,
  },
  {
    quote: "I've worked with event teams across three continents. H.O.L. Archive is in a category of their own. They brought dignity, discretion, and extraordinary execution to every moment.",
    author: "James Worthington",
    role: "Private Client",
    event: "Destination Milestone, Maldives",
    rating: 5,
  },
]

// Triple for seamless infinite scroll
const TRACK_A = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]
const TRACK_B = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#E50914">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestiCard({ data }: { data: typeof TESTIMONIALS[0] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 'clamp(300px, 35vw, 440px)',
        backgroundColor: 'var(--hol-card)',
        border: '1px solid var(--hol-border)',
        padding: 'clamp(24px, 2.5vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      }}
    >
      <Stars count={data.rating} />
      <p style={{
        fontSize: 'clamp(14px, 1.2vw, 17px)',
        fontWeight: 300,
        lineHeight: 1.7,
        color: 'var(--hol-text)',
        fontFamily: 'Jost, sans-serif',
        flex: 1,
        marginBottom: '24px',
        fontStyle: 'italic',
      }}>
        "{data.quote}"
      </p>
      <div style={{ borderTop: '1px solid var(--hol-border)', paddingTop: '16px' }}>
        <p style={{
          fontSize: '14px', fontWeight: 500, color: 'var(--hol-text)',
          fontFamily: 'Jost, sans-serif', marginBottom: '3px',
        }}>{data.author}</p>
        <p style={{
          fontSize: '12px', color: 'var(--hol-muted)', fontFamily: 'Jost, sans-serif', marginBottom: '5px',
        }}>{data.role}</p>
        <p style={{
          fontSize: '11px', color: 'var(--hol-gold)', fontFamily: 'Jost, sans-serif',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>{data.event}</p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: 'var(--hol-bg)',
        padding: 'clamp(72px, 10vw, 120px) 0',
        borderTop: '1px solid var(--hol-border)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .testi-row { will-change: transform; }
        .testi-row:hover { animation-play-state: paused; }
      `}</style>

      {/* Heading */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(48px, 6vw, 72px)',
        padding: '0 24px',
      }}>
        <p style={{
          fontSize: '13px', letterSpacing: '0.3em', color: 'var(--hol-gold)',
          textTransform: 'uppercase', fontFamily: 'Jost, sans-serif', marginBottom: '14px',
        }}>
          Client Voices
        </p>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 300,
          letterSpacing: '-0.02em', lineHeight: 1.15,
          color: 'var(--hol-text)', fontFamily: 'Jost, sans-serif',
        }}>
          From our clients.
        </h2>
      </div>

      {/* Row 1 — left-to-right */}
      <div style={{ width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
        <div
          className="testi-row"
          style={{
            display: 'flex',
            gap: '20px',
            width: 'max-content',
            animation: 'marquee-left 48s linear infinite',
            padding: '8px 0',
          }}
        >
          {TRACK_A.map((t, i) => <TestiCard key={i} data={t} />)}
        </div>
      </div>

      {/* Row 2 — right-to-left */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <div
          className="testi-row"
          style={{
            display: 'flex',
            gap: '20px',
            width: 'max-content',
            animation: 'marquee-right 54s linear infinite',
            padding: '8px 0',
          }}
        >
          {TRACK_B.map((t, i) => <TestiCard key={i} data={t} />)}
        </div>
      </div>
    </section>
  )
}
