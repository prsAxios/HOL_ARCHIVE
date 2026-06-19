import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { PROJECTS, type Project } from '../data/projects'

const ACCENT = '#C2AE6D'

export default function OurWork() {
  const mountRef  = useRef<HTMLDivElement>(null)
  const globeRef  = useRef<any>(null)
  const [active, setActive]     = useState<Project | null>(null)
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    if (!mountRef.current || globeRef.current) return

    async function init() {
      const GlobeGL = (await import('globe.gl')).default

      const globe = GlobeGL()(mountRef.current!)

      globeRef.current = globe

      globe
        .width(mountRef.current!.offsetWidth)
        .height(mountRef.current!.offsetHeight)
        /* Globe appearance */
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundImageUrl('')
        .backgroundColor('rgba(0,0,0,0)')
        /* Atmosphere */
        .showAtmosphere(true)
        .atmosphereColor('#C2AE6D')
        .atmosphereAltitude(0.12)
        /* HTML markers */
        .htmlElementsData(PROJECTS)
        .htmlElement((d: any) => {
          const el = document.createElement('div')
          el.innerHTML = `
            <div style="
              width:80px;
              border-radius:8px;
              overflow:visible;
              box-shadow:0 4px 18px rgba(0,0,0,0.6);
              border:2px solid #fff;
              cursor:pointer;
              background:#0d0d0d;
              font-family:Poppins,sans-serif;
              position:relative;
              transition:transform 0.2s ease;
            ">
              <img src="${d.photos[0]}" style="width:100%;height:52px;object-fit:cover;display:block;border-radius:6px 6px 0 0;" />
              <div style="padding:4px 6px 5px;background:#0d0d0d;border-radius:0 0 6px 6px;">
                <div style="font-size:9px;font-weight:600;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${d.city}</div>
                <div style="font-size:8px;font-weight:300;color:${ACCENT};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${d.category}</div>
              </div>
              <div style="position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid #fff;"></div>
            </div>
          `
          el.style.pointerEvents = 'auto'
          el.addEventListener('mouseenter', () => {
            ;(el.firstElementChild as HTMLElement).style.transform = 'scale(1.1)'
          })
          el.addEventListener('mouseleave', () => {
            ;(el.firstElementChild as HTMLElement).style.transform = 'scale(1)'
          })
          el.addEventListener('click', (e) => {
            e.stopPropagation()
            const rect = mountRef.current!.getBoundingClientRect()
            setPopupPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
            setActive(d as Project)
          })
          return el
        })
        .htmlLat((d: any) => d.lat)
        .htmlLng((d: any) => d.lng)
        .htmlAltitude(0.01)

      /* Auto-rotate */
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.4
      globe.controls().enableZoom = true
      globe.controls().minDistance = 150
      globe.controls().maxDistance = 500

      /* Initial camera position */
      globe.pointOfView({ lat: 20, lng: 20, altitude: 2.5 }, 0)

      /* Resize */
      const onResize = () => {
        if (!mountRef.current) return
        globe.width(mountRef.current.offsetWidth).height(mountRef.current.offsetHeight)
      }
      window.addEventListener('resize', onResize)

      return () => window.removeEventListener('resize', onResize)
    }

    init()

    return () => {
      if (globeRef.current) {
        globeRef.current._destructor?.()
        globeRef.current = null
      }
      if (mountRef.current) mountRef.current.innerHTML = ''
    }
  }, [])

  return (
    <section id="our-work" style={{ backgroundColor: '#0A0A0A', padding: 'clamp(60px,8vw,100px) 0 0' }}>

      {/* Heading */}
      <div style={{ textAlign: 'center', padding: '0 clamp(24px,5vw,72px)', marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          border: '1px solid rgba(194,174,109,0.3)', borderRadius: '100px',
          padding: '6px 18px', marginBottom: '20px',
        }}>
          <span style={{
            fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: ACCENT, fontFamily: 'Poppins, sans-serif',
          }}>Global Footprint</span>
        </div>
        <h2 style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700,
          fontSize: 'clamp(32px, 5vw, 72px)',
          letterSpacing: '-0.03em', lineHeight: 1.05,
          color: '#F4F1EC', margin: 0,
        }}>
          Signature Work
        </h2>
        <p style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 300,
          fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(244,241,236,0.5)',
          maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.7,
        }}>
          Precision executed across cities worldwide. Click a marker to explore each project.
        </p>
      </div>

      {/* Globe */}
      <div style={{ position: 'relative', width: '100%', height: 'clamp(500px, 75vh, 860px)' }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

        {active && (
          <PopupCard
            project={active}
            x={popupPos.x}
            y={popupPos.y}
            onClose={() => setActive(null)}
            onViewDetails={() => navigate(`/work/${active.id}`)}
          />
        )}
      </div>

    </section>
  )
}

/* â”€â”€ Popup card â”€â”€ */
function PopupCard({ project, x, y, onClose, onViewDetails }: {
  project: Project; x: number; y: number
  onClose: () => void; onViewDetails: () => void
}) {
  const W = 280, OFFSET = 16
  const mapEl = document.getElementById('our-work')?.querySelector('div[style]') as HTMLElement | null
  const mapW  = mapEl?.offsetWidth  ?? window.innerWidth
  const mapH  = mapEl?.offsetHeight ?? 500

  let left = x + OFFSET
  let top  = y - 80
  if (left + W > mapW - 8)  left = x - W - OFFSET
  if (top < 8)               top  = 8
  if (top + 320 > mapH)      top  = mapH - 328

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute', left, top, width: W, zIndex: 800,
        backgroundColor: '#111',
        border: '1px solid rgba(194,174,109,0.3)',
        borderRadius: '12px',
        boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        animation: 'popIn 0.22s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <style>{`@keyframes popIn{from{opacity:0;transform:scale(0.92) translateY(6px)}to{opacity:1;transform:none}}`}</style>

      <div style={{ display: 'flex', height: '110px', gap: '2px' }}>
        {project.photos.slice(0, 3).map((src, i) => (
          <div key={i} style={{ flex: 1, overflow: 'hidden' }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
            {project.city}, {project.country}
          </span>
          <span style={{ fontSize: '10px', color: 'rgba(244,241,236,0.3)', fontFamily: 'Poppins, sans-serif' }}>{project.year}</span>
        </div>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#F4F1EC', margin: '0 0 4px', lineHeight: 1.3 }}>{project.title}</p>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '12px', color: 'rgba(244,241,236,0.5)', margin: '0 0 14px' }}>{project.subtitle}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onViewDetails} style={{
            flex: 1, padding: '9px 0',
            backgroundColor: ACCENT, color: '#111',
            border: 'none', borderRadius: '6px',
            fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.06em', cursor: 'pointer',
          }}>View Details â†’</button>
          <button onClick={onClose} style={{
            padding: '9px 12px',
            backgroundColor: 'transparent', color: 'rgba(244,241,236,0.4)',
            border: '1px solid rgba(244,241,236,0.12)', borderRadius: '6px',
            fontFamily: 'Poppins, sans-serif', fontSize: '12px', cursor: 'pointer',
          }}>âœ•</button>
        </div>
      </div>
    </div>
  )
}

