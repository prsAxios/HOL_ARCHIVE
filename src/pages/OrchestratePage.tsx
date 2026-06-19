import { useNavigate } from 'react-router'
import OrchestrateNumbers from '../sections/OrchestrateNumbers'

export default function OrchestratePage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh' }}>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed', top: 'clamp(16px, 3vh, 28px)', left: 'clamp(20px, 4vw, 48px)',
          zIndex: 100, background: 'none', border: '1px solid rgba(244,241,236,0.2)',
          color: 'rgba(244,241,236,0.7)', fontFamily: 'Poppins, sans-serif',
          fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
          padding: '10px 22px', borderRadius: '100px', cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#F4F1EC'; e.currentTarget.style.color = '#F4F1EC' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,241,236,0.2)'; e.currentTarget.style.color = 'rgba(244,241,236,0.7)' }}
      >
        ← Back
      </button>

      <OrchestrateNumbers />
    </div>
  )
}
