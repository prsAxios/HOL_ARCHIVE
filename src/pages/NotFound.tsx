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
        backgroundColor: 'var(--hol-bg)',
        color: 'var(--hol-text)',
        padding: '24px',
        textAlign: 'center',
        fontFamily: 'Jost, sans-serif'
      }}
    >
      <h1 
        style={{ 
          fontSize: 'clamp(100px, 18vw, 240px)', 
          fontWeight: 300, 
          margin: 0, 
          lineHeight: 1,
          fontFamily: 'Jost, sans-serif',
          opacity: 0.1
        }}
      >
        404
      </h1>
      <p 
        style={{ 
          fontSize: '22px', 
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
          fontSize: '16px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '16px 32px',
          border: '1px solid #0a0a0a',
          color: 'var(--hol-text)',
          textDecoration: 'none',
          transition: 'all 0.4s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--hol-text)';
          e.currentTarget.style.color = 'var(--hol-bg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--hol-text)';
        }}
      >
        Return Home
      </Link>
    </div>
  );
}

