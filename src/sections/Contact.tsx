import { useState } from 'react'
import { trpc } from '@/providers/trpc'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  fontSize: '14px',
  fontFamily: 'Sora, sans-serif',
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
  fontFamily: 'Sora, sans-serif',
  color: 'var(--hol-text)',
  display: 'block',
  marginBottom: '20px',
}

const sectionLabel: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 700,
  fontFamily: 'Sora, sans-serif',
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
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--hol-bg)',
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 6vw, 80px)',
        transition: 'background-color 0.4s ease'
      }}
    >

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: 'clamp(24px, 3.5vw, 42px)',
          color: 'var(--hol-text)', margin: '0 0 12px',
          letterSpacing: '-0.02em',
          transition: 'color 0.4s ease'
        }}>
          Every successful event begins with operational clarity.
        </h2>
        <p style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 300,
          fontSize: 'clamp(13px, 1vw, 15px)', color: 'var(--hol-muted)',
          maxWidth: '620px', margin: '0 auto', lineHeight: 1.7,
          transition: 'color 0.4s ease'
        }}>
          Whether you're planning a luxury wedding, large-scale production, or destination event, H.O.L Archive is built to
          deliver structured execution, operational control, and seamless coordination from start to finish.
        </p>
      </div>

      {submitted ? (
        <div style={{
          maxWidth: '700px', margin: '0 auto', padding: '40px',
          border: '1px solid var(--hol-border)', borderRadius: '8px',
          fontFamily: 'Sora, sans-serif', fontWeight: 300,
          fontSize: '18px', color: 'var(--hol-text)', lineHeight: 1.7, textAlign: 'center',
          transition: 'color 0.4s ease, border-color 0.4s ease'
        }}>
          Thank you. Our team will review your inquiry and respond within 24–48 hours.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 max-w-[960px] mx-auto items-start">
          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            {submitError && (
              <div style={{ color: '#d00', fontFamily: 'Sora, sans-serif', fontSize: '13px', marginBottom: '12px' }}>
                {submitError}
              </div>
            )}

            {/* Basic Information */}
            <p style={sectionLabel}>Basic Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
              <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} style={inputStyle} />
              <input name="company" placeholder="Company / Planner Name" value={formData.company} onChange={handleChange} style={inputStyle} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={inputStyle} />
              <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Project Information */}
            <p style={sectionLabel}>Project Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
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
                <option value="Others">Others</option>
              </select>
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
                fontFamily: 'Sora, sans-serif', fontWeight: 500,
                fontSize: '14px', letterSpacing: '0.08em',
                cursor: createConsultation.isPending ? 'wait' : 'pointer',
                opacity: createConsultation.isPending ? 0.6 : 1,
                transition: 'opacity 0.2s, background-color 0.4s ease, color 0.4s ease',
              }}
            >
              {createConsultation.isPending ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </form>

          {/* Direct Contact sidebar */}
          <div style={{
            border: '1px solid var(--hol-border)',
            borderRadius: '8px',
            padding: '24px 20px',
            fontFamily: 'Sora, sans-serif',
            width: '100%',
            transition: 'border-color 0.4s ease'
          }}>
            <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--hol-text)', marginBottom: '16px', transition: 'color 0.4s ease' }}>
              Direct Contact
            </p>

            {[
              { icon: 'call', label: 'Phone', value: '+91 88955 29383' },
              { icon: 'mail', label: 'Email', value: 'rony@gholarchive.com' },
              { icon: 'location_on', label: 'Location', value: 'Mumbai, India\n(Operating across India)' },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--hol-text)', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.4s ease' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--hol-red)' }}>{icon}</span>
                  {label}
                </p>
                <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--hol-muted)', margin: 0, paddingLeft: '24px', whiteSpace: 'pre-line', transition: 'color 0.4s ease' }}>
                  {value}
                </p>
              </div>
            ))}

            <p style={{
              fontSize: '11px', fontWeight: 300, color: 'var(--hol-muted)',
              lineHeight: 1.6, margin: '16px 0 0',
              borderTop: '1px solid var(--hol-border)', paddingTop: '14px',
              transition: 'color 0.4s ease, border-color 0.4s ease'
            }}>
              Our team reviews every inquiry carefully to understand the operational requirements of your event.
              We typically respond within 24–48 hours.
            </p>
          </div>
        </div>
      )}

      {/* Footer tagline */}
      <p style={{
        textAlign: 'center',
        fontFamily: 'Sora, sans-serif', fontWeight: 400,
        fontSize: 'clamp(20px, 3vw, 36px)',
        color: 'var(--hol-text)', marginTop: '60px',
        letterSpacing: '-0.01em',
        transition: 'color 0.4s ease'
      }}>
        Precision begins long before the event day.
      </p>
    </section>
  )
}

