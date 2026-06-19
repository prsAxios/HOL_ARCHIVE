import { useParams, useNavigate } from 'react-router'
import { PROJECTS } from '../data/projects'

const ACCENT = '#C2AE6D'

export default function ProjectDetail() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project  = PROJECTS.find(p => p.id === id)

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'var(--hol-bg)', fontFamily: 'Poppins, sans-serif', color: 'var(--hol-muted)' }}>
        Project not found.
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--hol-bg)', color: 'var(--hol-text)' }}>

      {/* Back */}
      <div style={{ padding: 'clamp(20px,3vw,36px) clamp(24px,6vw,80px)' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', fontWeight: 300,
            fontSize: '13px', letterSpacing: '0.14em',
            color: 'var(--hol-muted)', textTransform: 'uppercase', padding: 0,
          }}
        >
          â† Back
        </button>
      </div>

      {/* Hero photos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '4px',
        height: 'clamp(260px, 40vh, 520px)',
        padding: '0 clamp(24px,6vw,80px)',
      }}>
        {project.photos.map((src, i) => (
          <div key={i} style={{ overflow: 'hidden', borderRadius: i === 0 ? '12px 0 0 12px' : i === 2 ? '0 12px 12px 0' : '' }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '760px', margin: '0 auto',
        padding: 'clamp(40px,6vw,72px) clamp(24px,6vw,80px)',
      }}>
        {/* Meta row */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {[
            { label: 'City', value: `${project.city}, ${project.country}` },
            { label: 'Year', value: project.year },
            { label: 'Category', value: project.category },
          ].map(({ label, value }) => (
            <div key={label} style={{
              padding: '8px 16px',
              border: '1px solid var(--hol-border)',
              borderRadius: '100px',
            }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '11px',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--hol-muted)', marginRight: '8px',
              }}>{label}</span>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 500,
                color: ACCENT,
              }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700,
          fontSize: 'clamp(28px,4vw,52px)',
          letterSpacing: '-0.03em', lineHeight: 1.1,
          margin: '0 0 10px',
        }}>
          {project.title}
        </h1>

        <p style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 300,
          fontSize: '15px', color: ACCENT,
          letterSpacing: '0.04em', margin: '0 0 32px',
        }}>
          {project.subtitle}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--hol-border)', marginBottom: '32px' }} />

        {/* Description */}
        <p style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 300,
          fontSize: 'clamp(15px,1.2vw,18px)', lineHeight: 1.9,
          color: 'var(--hol-muted)', margin: 0,
        }}>
          {project.description}
        </p>

        {/* Inquire CTA */}
        <div style={{ marginTop: '48px' }}>
          <button
            onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200) }}
            style={{
              padding: '16px 36px',
              backgroundColor: 'var(--hol-text)', color: 'var(--hol-bg)',
              border: 'none', borderRadius: '100px',
              fontFamily: 'Poppins, sans-serif', fontWeight: 500,
              fontSize: '14px', letterSpacing: '0.08em',
              cursor: 'pointer',
            }}
          >
            Inquire About a Similar Event
          </button>
        </div>
      </div>
    </div>
  )
}

