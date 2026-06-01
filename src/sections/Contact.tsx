import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { useIsMobile } from '../hooks/use-mobile'

export default function Contact() {
  const isMobile = useIsMobile()
  const [submitHovered, setSubmitHovered] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '', email: '', projectType: 'Grand Wedding', budget: 'Under 100 Guests', message: '',
  })

  const createConsultation = trpc.consultation.create.useMutation({
    onSuccess: () => { setSubmitted(true); setSubmitError(null) },
    onError: (err) => { setSubmitError(err.message || 'Something went wrong.') },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!formData.name || !formData.email) { setSubmitError('Please fill in all required fields.'); return }
    createConsultation.mutate({
      fullName: formData.name, email: formData.email,
      projectType: formData.projectType, budgetRange: formData.budget,
      message: formData.message || undefined,
    })
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative', width: '100%', minHeight: '800px',
        backgroundColor: 'var(--hol-bg-alt)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
      }}
    >
      {/* Left brand panel */}
      <div style={{
        width: '100%', minHeight: isMobile ? '240px' : '420px',
        backgroundColor: 'var(--hol-bg-alt)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '24px',
        padding: '80px 40px',
      }}>
        <svg width="80" height="87" viewBox="0 0 56 60" fill="none"
          stroke="var(--hol-text)" strokeWidth="1.5"
          strokeLinecap="square" strokeLinejoin="miter">
          <polyline points="3,58 3,22 28,3 53,22 53,58" />
          <polyline points="13,58 13,28 28,14 43,28 43,58" />
        </svg>
        <span style={{
          fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 400,
          letterSpacing: '0.3em', color: 'var(--hol-text)',
          fontFamily: 'Jost, sans-serif', textTransform: 'uppercase',
        }}>
          ARCHIVE
        </span>
      </div>

      {/* Right: form */}
      <div style={{
        backgroundColor: 'var(--hol-bg-alt)', color: 'var(--hol-text)',
        padding: 'clamp(60px, 8vw, 120px) clamp(24px, 5vw, 80px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{ maxWidth: '560px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <p style={{
            fontSize: '14px', letterSpacing: '0.25em', color: 'var(--hol-faint)',
            textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'Jost, sans-serif',
          }}>
            Inquiries
          </p>
          <h3 style={{
            fontSize: 'clamp(28px, 5.5vw, 70px)', fontWeight: 300,
            letterSpacing: '-0.01em', lineHeight: 1.2,
            marginBottom: '48px', fontFamily: 'Jost, sans-serif',
          }}>
            Tell us about your vision.
          </h3>

          {submitted ? (
            <div style={{
              border: '1px solid var(--hol-border)', padding: '40px',
              fontSize: '20px', lineHeight: 1.6, color: 'var(--hol-text)',
              fontFamily: 'Jost, sans-serif', fontWeight: 300,
            }}>
              Thank you. Our principal architect of events will review your inquiry
              and reach out within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {submitError && (
                <div style={{
                  backgroundColor: '#fff0f0', padding: '16px', fontSize: '18px',
                  color: '#d00', marginBottom: '8px', fontFamily: 'Jost, sans-serif',
                }}>
                  {submitError}
                </div>
              )}
              <Field label="Full name" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
              <Field label="Email address" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <Row>
                <SelectField label="Event type" name="projectType" value={formData.projectType} onChange={handleChange}
                  options={['Grand Wedding', 'Destination Celebration', 'Corporate Gala', 'Private Milestone']} />
                <SelectField label="Guest count" name="budget" value={formData.budget} onChange={handleChange}
                  options={['Under 100 Guests', '100 - 250 Guests', '250 - 500 Guests', '500 Guests +', 'Confidential']} />
              </Row>
              <TextareaField label="Message (optional)" name="message"
                placeholder="Tell us about your celebration..." value={formData.message} onChange={handleChange} />
              <button
                type="submit"
                disabled={createConsultation.isPending}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  marginTop: '20px', padding: '20px 40px',
                  fontSize: '16px', fontWeight: 500, letterSpacing: '0.2em',
                  color: submitHovered ? 'var(--hol-bg)' : 'var(--hol-text)',
                  backgroundColor: submitHovered ? 'var(--hol-text)' : 'transparent',
                  border: '1px solid var(--hol-border)',
                  cursor: createConsultation.isPending ? 'wait' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  fontFamily: 'Jost, sans-serif',
                  opacity: createConsultation.isPending ? 0.6 : 1,
                }}
              >
                {createConsultation.isPending ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '32px' }}>
      {children}
    </div>
  )
}

const fieldBase: React.CSSProperties = {
  width: '100%', padding: '16px 0', fontSize: '20px',
  backgroundColor: 'transparent', color: 'var(--hol-text)',
  border: 'none', borderBottom: '1px solid var(--hol-border)',
  outline: 'none', fontFamily: 'Jost, sans-serif',
  letterSpacing: '0.01em', appearance: 'none', fontWeight: 300,
}

const labelBase: React.CSSProperties = {
  fontSize: '13px', letterSpacing: '0.2em', color: 'var(--hol-faint)',
  textTransform: 'uppercase', marginBottom: '8px', display: 'block',
  fontFamily: 'Jost, sans-serif',
}

function Field({ label, type, name, placeholder, value, onChange }: {
  label: string; type: string; name: string; placeholder?: string
  value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
        style={fieldBase}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'var(--hol-text)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'var(--hol-border)')}
      />
    </label>
  )
}

function SelectField({ label, name, options, value, onChange }: {
  label: string; name: string; options: string[]
  value?: string; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <select name={name} value={value} onChange={onChange}
        style={{ ...fieldBase, paddingRight: '20px' }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'var(--hol-text)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'var(--hol-border)')}
      >
        {options.map(opt => (
          <option key={opt} value={opt} style={{ color: 'var(--hol-text)', backgroundColor: 'var(--hol-bg)' }}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextareaField({ label, name, placeholder, value, onChange }: {
  label: string; name: string; placeholder?: string
  value?: string; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <textarea name={name} placeholder={placeholder} rows={3} value={value} onChange={onChange}
        style={{ ...fieldBase, resize: 'vertical', paddingTop: '16px' }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = 'var(--hol-text)')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'var(--hol-border)')}
      />
    </label>
  )
}

