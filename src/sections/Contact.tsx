import { useState } from 'react'
import { trpc } from '@/providers/trpc'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '14px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 300,
  color: 'var(--hol-text)',
  backgroundColor: 'var(--hol-bg)',
  border: '1px solid var(--hol-border)',
  borderRadius: '4px',
  outline: 'none',
  appearance: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: 'Poppins, sans-serif',
  color: 'var(--hol-text)',
  display: 'block',
  marginBottom: '20px',
}

const sectionLabel: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 700,
  fontFamily: 'Poppins, sans-serif',
  color: 'var(--hol-text)',
  marginBottom: '12px',
  marginTop: '4px',
}

const REQUIREMENTS = [
  'Hospitality Management',
  'Operations Management',
  'Logistics Management',
  'Manpower Support',
  'Full Execution Support',
  'Destination Wedding Support',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [checked, setChecked] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: '', company: '', phone: '', email: '',
    eventType: '', location: '', dates: '', guestCount: '', servicetier: '', message: '',
  })

  const createConsultation = trpc.consultation.create.useMutation({
    onSuccess: () => { setSubmitted(true); setSubmitError(null) },
    onError: (err) => { setSubmitError(err.message || 'Something went wrong.') },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleCheck = (label: string) => {
    setChecked(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!formData.fullName || !formData.email) {
      setSubmitError('Please fill in Full Name and Email.')
      return
    }
    createConsultation.mutate({
      fullName: formData.fullName,
      email: formData.email,
      projectType: formData.eventType || 'General',
      budgetRange: formData.guestCount || 'Not specified',
      message: [formData.message, checked.length ? `Requirements: ${checked.join(', ')}` : ''].filter(Boolean).join('\n') || undefined,
    })
  }

  return (
    <section id="contact" style={{ backgroundColor: 'var(--hol-bg)', padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700,
          fontSize: 'clamp(24px, 3.5vw, 42px)',
          color: 'var(--hol-text)', margin: '0 0 12px',
          letterSpacing: '-0.02em',
        }}>
          Every successful event begins with operational clarity.
        </h2>
        <p style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 300,
          fontSize: 'clamp(13px, 1vw, 15px)', color: 'var(--hol-muted)',
          maxWidth: '620px', margin: '0 auto', lineHeight: 1.7,
        }}>
          Whether you're planning a luxury wedding, large-scale production, or destination event, H.O.L Archive is built to
          deliver structured execution, operational control, and seamless coordination from start to finish.
        </p>
      </div>

      {submitted ? (
        <div style={{
          maxWidth: '700px', margin: '0 auto', padding: '40px',
          border: '1px solid var(--hol-border)', borderRadius: '8px',
          fontFamily: 'Poppins, sans-serif', fontWeight: 300,
          fontSize: '18px', color: 'var(--hol-text)', lineHeight: 1.7, textAlign: 'center',
        }}>
          Thank you. Our team will review your inquiry and respond within 24â€“48 hours.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 260px',
          gap: '32px',
          maxWidth: '960px',
          margin: '0 auto',
          alignItems: 'start',
        }}>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {submitError && (
              <div style={{ color: '#d00', fontFamily: 'Poppins, sans-serif', fontSize: '13px', marginBottom: '12px' }}>
                {submitError}
              </div>
            )}

            {/* Basic Information */}
            <p style={sectionLabel}>Basic Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} style={inputStyle} />
              <input name="company" placeholder="Company / Planner Name" value={formData.company} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={inputStyle} />
              <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Project Information */}
            <p style={sectionLabel}>Project Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              <input name="eventType" placeholder="Type of Event" value={formData.eventType} onChange={handleChange} style={inputStyle} />
              <input name="location" placeholder="Event Location" value={formData.location} onChange={handleChange} style={inputStyle} />
              <input name="dates" placeholder="Event Dates" value={formData.dates} onChange={handleChange} style={inputStyle} />
              <input name="guestCount" placeholder="Estimated Guest Count" value={formData.guestCount} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Service Tier */}
            <p style={sectionLabel}>Services / Experiences Looking For</p>
            <div style={{ marginBottom: '24px' }}>
              <select
                name="servicetier"
                value={formData.servicetier}
                onChange={e => setFormData(prev => ({ ...prev, servicetier: e.target.value }))}
                style={{ ...inputStyle, color: formData.servicetier ? 'var(--hol-text)' : 'var(--hol-muted)' }}
              >
                <option value="">Select an experience</option>
                <option value="Luxury Tier Experiences">Luxury Tier Experiences</option>
                <option value="Scalable Event & Backend Support">Scalable Event &amp; Backend Support</option>
                <option value="Destination & Multi-Day Operations">Destination &amp; Multi-Day Operations</option>
              </select>
            </div>

            {/* Requirement Section */}
            <p style={sectionLabel}>Requirement Section</p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px 16px', marginBottom: '24px',
            }}>
              {REQUIREMENTS.map(req => (
                <label key={req} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 300,
                  fontSize: '13px', color: 'var(--hol-text)', cursor: 'pointer',
                }}>
                  <input
                    type="checkbox"
                    checked={checked.includes(req)}
                    onChange={() => toggleCheck(req)}
                    style={{ accentColor: '#C2AE6D', width: '14px', height: '14px', cursor: 'pointer' }}
                  />
                  {req}
                </label>
              ))}
            </div>

            {/* Message */}
            <p style={sectionLabel}>Message Box</p>
            <textarea
              name="message"
              placeholder="Tell us about your event requirements, challenges, or operational expectations."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              style={{ ...inputStyle, resize: 'vertical', marginBottom: '16px' }}
            />

            <button
              type="submit"
              disabled={createConsultation.isPending}
              style={{
                width: '100%', padding: '14px',
                backgroundColor: 'var(--hol-text)', color: 'var(--hol-bg)',
                border: 'none', borderRadius: '4px',
                fontFamily: 'Poppins, sans-serif', fontWeight: 500,
                fontSize: '14px', letterSpacing: '0.08em',
                cursor: createConsultation.isPending ? 'wait' : 'pointer',
                opacity: createConsultation.isPending ? 0.6 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {createConsultation.isPending ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </form>

          {/* Direct Contact sidebar */}
          <div style={{
            border: '1px solid var(--hol-border)',
            borderRadius: '8px',
            padding: '20px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--hol-text)', marginBottom: '16px' }}>
              Direct Contact
            </p>

            {[
              { icon: 'ðŸ“ž', label: 'Phone', value: '+91 XXXXX XXXXX' },
              { icon: 'âœ‰ï¸', label: 'Email', value: 'holarchives@gmail.com' },
              { icon: 'ðŸ“', label: 'Location', value: 'Mumbai, India\n(Operating across India)' },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ marginBottom: '14px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--hol-text)', margin: '0 0 2px' }}>
                  {icon} {label}
                </p>
                <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--hol-muted)', margin: 0, whiteSpace: 'pre-line' }}>
                  {value}
                </p>
              </div>
            ))}

            <p style={{
              fontSize: '11px', fontWeight: 300, color: 'var(--hol-muted)',
              lineHeight: 1.6, margin: '16px 0 0',
              borderTop: '1px solid var(--hol-border)', paddingTop: '14px',
            }}>
              Our team reviews every inquiry carefully to understand the operational requirements of your event.
              We typically respond within 24â€“48 hours.
            </p>
          </div>
        </div>
      )}

      {/* Footer tagline */}
      <p style={{
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif', fontWeight: 400,
        fontSize: 'clamp(20px, 3vw, 36px)',
        color: 'var(--hol-text)', marginTop: '60px',
        letterSpacing: '-0.01em',
      }}>
        Precision begins long before the event day.
      </p>
    </section>
  )
}

