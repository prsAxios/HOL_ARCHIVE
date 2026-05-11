import { Link } from "react-router";

export default function NotFound() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        color: '#0a0a0a',
        padding: '24px',
        textAlign: 'center',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      <h1 
        style={{ 
          fontSize: 'clamp(80px, 15vw, 180px)', 
          fontWeight: 300, 
          margin: 0, 
          lineHeight: 1,
          fontFamily: 'Playfair Display, serif',
          opacity: 0.1
        }}
      >
        404
      </h1>
      <p 
        style={{ 
          fontSize: '18px', 
          fontWeight: 300, 
          letterSpacing: '0.05em',
          marginTop: '-20px',
          marginBottom: '40px'
        }}
      >
        The page you are looking for has been moved or does not exist.
      </p>
      <Link 
        to="/" 
        style={{
          fontSize: '12px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '16px 32px',
          border: '1px solid #0a0a0a',
          color: '#0a0a0a',
          textDecoration: 'none',
          transition: 'all 0.4s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0a0a0a';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#0a0a0a';
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
