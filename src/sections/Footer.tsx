export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        padding: '120px clamp(24px, 5vw, 80px) 0',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Top: Office Info */}
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '80px',
          paddingBottom: '120px',
        }}
      >
        <OfficeColumn
          city="Thane"
          cityEn="BHIWANDI"
          address="Park Interiors Studio, Bhiwandi, Thane, Maharashtra, India"
          coords="19.2967° N, 73.0633° E"
          timezone="IST"
        />
        
        <div>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#999999',
              marginBottom: '32px',
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            CONNECT
          </p>
          <p style={{ fontSize: '18px', color: '#0a0a0a', lineHeight: 2, fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}>
            hello@parkinteriors.com
            <br />
            +91 (Your Phone Number)
            <br />
            <span style={{ borderBottom: '1px solid #0a0a0a' }}>Instagram</span>
          </p>
        </div>
      </div>

      {/* Bottom: Giant Wordmark */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0.8,
          paddingBottom: '0',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(100px, 20vw, 400px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: '#0a0a0a',
            whiteSpace: 'nowrap',
            transform: 'translateY(10%)',
            userSelect: 'none',
            fontFamily: 'Playfair Display, serif',
            opacity: 0.03,
          }}
        >
          PARK
        </span>
      </div>
    </footer>
  )
}

function OfficeColumn({
  city,
  cityEn,
  address,
  coords,
  timezone,
}: {
  city: string
  cityEn: string
  address: string
  coords: string
  timezone: string
}) {
  return (
    <div>
      <p
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          color: '#999999',
          marginBottom: '32px',
          textTransform: 'uppercase',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {cityEn}
      </p>
      <h3 style={{ fontSize: '32px', fontWeight: 400, color: '#0a0a0a', marginBottom: '16px', fontFamily: 'Playfair Display, serif' }}>
        {city}
      </h3>
      <p
        style={{
          fontSize: '15px',
          color: '#666666',
          lineHeight: 1.7,
          marginBottom: '16px',
          maxWidth: '300px',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 300,
        }}
      >
        {address}
      </p>
      <p
        style={{
          fontSize: '11px',
          letterSpacing: '0.05em',
          color: '#bbbbbb',
          fontVariantNumeric: 'tabular-nums',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {coords} &middot; {timezone}
      </p>
    </div>
  )
}
