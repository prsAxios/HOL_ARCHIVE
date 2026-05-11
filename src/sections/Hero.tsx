import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { trpc } from '@/providers/trpc'
import { motion } from 'framer-motion'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;

void main() {
  vec2 coord = gl_FragCoord.xy / resolution;
  vec2 st = coord;
  coord *= 10.0;

  float len;
  for (int i = 0; i < 5; i++) {
    len = length(vec2(coord.x, coord.y));
    coord.x += cos(coord.y + sin(len)) + cos(time * 0.07) * 0.2;
    coord.y += sin(coord.x + cos(len)) + sin(time * 0.1);
  }

  len *= cos(len * 0.4);
  len -= 10.0;

  for (float i = 0.0; i < 5.0; i++) {
    len += 1.0 / abs(mod(st.x, 0.09 * i) * 200.0) * 1.0;
  }

  float r = cos(len + 0.2) * 0.4 + 0.95;
  float g = cos(len + 0.1) * 0.4 + 0.95;
  float b = cos(len - 0.05) * 0.45 + 0.95;

  vec3 color = vec3(r, g, b);
  color = smoothstep(0.1, 0.9, color);

  gl_FragColor = vec4(color, 1.0);
}
`

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const uniformsRef = useRef<{ resolution: THREE.Uniform; time: THREE.Uniform }>({
    resolution: new THREE.Uniform(new THREE.Vector2(1, 1)),
    time: new THREE.Uniform(0),
  })

  const [submitHovered, setSubmitHovered] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Residential',
    budget: 'Under ₹25 Lakhs',
    message: '',
  })

  const createConsultation = trpc.consultation.create.useMutation({
    onSuccess: () => {
      setSubmitted(true)
      setSubmitError(null)
    },
    onError: (err) => {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvasHostRef.current
    if (!canvas || !host) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        resolution: uniformsRef.current.resolution,
        time: uniformsRef.current.time,
      },
      depthTest: false,
      depthWrite: false,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handleResize = () => {
      const rect = host.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      renderer.setSize(w, h, false)
      uniformsRef.current.resolution.value.set(w, h)
    }
    handleResize()

    const ro = new ResizeObserver(handleResize)
    ro.observe(host)

    let rafId: number
    const startTime = performance.now()
    const animate = () => {
      uniformsRef.current.time.value = (performance.now() - startTime) / 1000
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.name || !formData.email) {
      setSubmitError('Please fill in all required fields.')
      return
    }

    createConsultation.mutate({
      fullName: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      budgetRange: formData.budget,
      message: formData.message || undefined,
    })
  }

  return (
    <section
      id="footer"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '800px',
        backgroundColor: '#ffffff',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Left: shader */}
      <div
        ref={canvasHostRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '420px',
          overflow: 'hidden',
          backgroundColor: '#fafafa',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(40px, 6vw, 80px)',
            left: 'clamp(40px, 6vw, 80px)',
            right: 'clamp(40px, 6vw, 80px)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(48px, 6vw, 88px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#0a0a0a',
              marginBottom: '24px',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Start Your
            <br />
            Legacy
          </motion.h2>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: '#666666',
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Park Interiors &middot; Bespoke Consultation
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div
        style={{
          backgroundColor: '#ffffff',
          color: '#0a0a0a',
          padding: 'clamp(60px, 8vw, 120px) clamp(24px, 5vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '560px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: '#999999',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Inquiries
          </p>
          <h3
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              marginBottom: '48px',
              fontFamily: 'Playfair Display, serif',
            }}
          >
            Tell us about your vision.
          </h3>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                border: '1px solid #0a0a0a',
                padding: '40px',
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#0a0a0a',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 300,
              }}
            >
              Thank you. Our principal designer will review your inquiry and reach out within 24 hours.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
            >
              {submitError && (
                <div
                  style={{
                    backgroundColor: '#fff0f0',
                    padding: '16px',
                    fontSize: '14px',
                    color: '#d00',
                    marginBottom: '8px',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  {submitError}
                </div>
              )}
              <Field label="Full name" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
              <Field label="Email address" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <Row>
                <SelectField
                  label="Project type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  options={[
                    'Residential',
                    'Commercial',
                    'Hospitality',
                    'Bespoke Furniture',
                  ]}
                />
                <SelectField
                  label="Budget range"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  options={[
                    'Under ₹25 Lakhs',
                    '₹25L - ₹75 Lakhs',
                    '₹75L - ₹2 Crores',
                    '₹2 Crores +',
                    'Confidential',
                  ]}
                />
              </Row>
              <TextareaField
                label="Message (optional)"
                name="message"
                placeholder="Tell us about your space..."
                value={formData.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={createConsultation.isPending}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  marginTop: '20px',
                  padding: '20px 40px',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  color: submitHovered ? '#ffffff' : '#0a0a0a',
                  backgroundColor: submitHovered ? '#0a0a0a' : 'transparent',
                  border: '1px solid #0a0a0a',
                  cursor: createConsultation.isPending ? 'wait' : 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  fontFamily: 'Outfit, sans-serif',
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
        gap: '32px',
      }}
    >
      {children}
    </div>
  )
}

const fieldBase: React.CSSProperties = {
  width: '100%',
  padding: '16px 0',
  fontSize: '16px',
  backgroundColor: 'transparent',
  color: '#0a0a0a',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
  outline: 'none',
  fontFamily: 'Outfit, sans-serif',
  letterSpacing: '0.01em',
  appearance: 'none',
  fontWeight: 300,
}

const labelBase: React.CSSProperties = {
  fontSize: '10px',
  letterSpacing: '0.2em',
  color: '#999999',
  textTransform: 'uppercase',
  marginBottom: '8px',
  display: 'block',
  fontFamily: 'Outfit, sans-serif',
}

function Field({
  label,
  type,
  name,
  placeholder,
  min,
  value,
  onChange,
}: {
  label: string
  type: string
  name: string
  placeholder?: string
  min?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
        value={value}
        onChange={onChange}
        style={fieldBase}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#0a0a0a')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.1)')}
      />
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string
  name: string
  options: string[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{ ...fieldBase, paddingRight: '20px' }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#0a0a0a')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.1)')}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: '#0a0a0a', backgroundColor: '#fff' }}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextareaField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <label style={{ display: 'block' }}>
      <span style={labelBase}>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={onChange}
        style={{ ...fieldBase, resize: 'vertical', paddingTop: '16px' }}
        onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#0a0a0a')}
        onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.1)')}
      />
    </label>
  )
}
