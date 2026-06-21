import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { PROJECTS } from '../data/projects'

const ACCENT = '#C2AE6D'

export default function OurWork() {
  const mountRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!mountRef.current || globeRef.current) return

    async function init() {
      const GlobeGL = (await import('globe.gl')).default
      const globe = (GlobeGL as any)()(mountRef.current!)
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
        /* HTML markers (Blinking Red Dots with Anchored Popup Cards) */
        .htmlElementsData(PROJECTS)
        .htmlElement((d: any) => {
          const el = document.createElement('div')
          el.innerHTML = `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px;">
              <!-- Pulsating outer ring -->
              <div class="pulse-dot-wrapper" style="
                position: absolute;
                width: 22px;
                height: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
              ">
                <div style="
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  background-color: #E50914;
                  opacity: 0.8;
                  animation: blink-pulse 1.8s infinite ease-out;
                  pointer-events: none;
                "></div>
                <!-- Solid inner center dot -->
                <div style="
                  position: absolute;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background-color: #E50914;
                  box-shadow: 0 0 8px #E50914, 0 0 16px #E50914;
                  transition: transform 0.2s ease;
                  pointer-events: none;
                "></div>
              </div>

              <!-- Anchored Popup Card -->
              <div class="globe-popup-card" style="
                position: absolute;
                bottom: 28px;
                left: 50%;
                transform: translateX(-50%);
                width: 260px;
                background-color: #111;
                border: 1px solid rgba(194, 174, 109, 0.35);
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.6);
                overflow: hidden;
                display: none;
                z-index: 1000;
              ">
                <!-- Image Grid -->
                <div style="display: flex; height: 90px; gap: 2px;">
                  <div style="flex: 1; overflow: hidden;">
                    <img src="${d.photos[0]}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                  </div>
                  <div style="flex: 1; overflow: hidden;">
                    <img src="${d.photos[1]}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                  </div>
                  <div style="flex: 1; overflow: hidden;">
                    <img src="${d.photos[2]}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                  </div>
                </div>
                
                <!-- Content -->
                <div style="padding: 12px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: ${ACCENT}; font-family: Poppins, sans-serif; font-weight: 600;">
                      ${d.city}, ${d.country}
                    </span>
                    <span style="font-size: 9px; color: rgba(244,241,236,0.3); font-family: Poppins, sans-serif;">${d.year}</span>
                  </div>
                  <p style="font-family: Poppins, sans-serif; font-weight: 600; font-size: 13px; color: #F4F1EC; margin: 0 0 3px; line-height: 1.2;">${d.title}</p>
                  <p style="font-family: Poppins, sans-serif; font-weight: 300; font-size: 11px; color: rgba(244,241,236,0.5); margin: 0 0 10px;">${d.subtitle}</p>
                  
                  <!-- CTA Buttons -->
                  <div style="display: flex; gap: 6px;">
                    <button class="view-btn" style="
                      flex: 1; padding: 7px 0;
                      background-color: ${ACCENT}; color: #111;
                      border: none; border-radius: 4px;
                      font-family: Poppins, sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 0.05em; cursor: pointer;
                    ">View Details →</button>
                    <button class="close-btn" style="
                      padding: 7px 10px;
                      background-color: transparent; color: rgba(244,241,236,0.4);
                      border: 1px solid rgba(244,241,236,0.12); border-radius: 4px;
                      font-family: Poppins, sans-serif; font-size: 11px; cursor: pointer;
                    ">✕</button>
                  </div>
                </div>

                <!-- Arrow indicator -->
                <div style="
                  position: absolute;
                  bottom: -6px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 0;
                  height: 0;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;
                  border-top: 6px solid rgba(194, 174, 109, 0.35);
                "></div>
              </div>
            </div>
          `
          el.style.pointerEvents = 'auto'

          const dot = el.querySelector('.pulse-dot-wrapper') as HTMLElement
          const card = el.querySelector('.globe-popup-card') as HTMLElement
          const closeBtn = el.querySelector('.close-btn') as HTMLElement
          const viewBtn = el.querySelector('.view-btn') as HTMLElement

          // Toggle card display on dot click
          dot.addEventListener('click', (e) => {
            e.stopPropagation()
            // Close all other open cards on the globe first
            const allCards = mountRef.current!.querySelectorAll('.globe-popup-card')
            allCards.forEach((c: any) => {
              if (c !== card) c.style.display = 'none'
            })
            card.style.display = card.style.display === 'block' ? 'none' : 'block'
          })

          // Close button click handler
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            card.style.display = 'none'
          })

          // View Details click handler
          viewBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            navigate(`/work/${d.id}`)
          })

          // Hover scale effect on inner center dot
          dot.addEventListener('mouseenter', () => {
            const inner = dot.querySelector('div:last-child') as HTMLElement
            if (inner) inner.style.transform = 'scale(1.4)'
          })
          dot.addEventListener('mouseleave', () => {
            const inner = dot.querySelector('div:last-child') as HTMLElement
            if (inner) inner.style.transform = 'scale(1)'
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
      <style>{`
        @keyframes blink-pulse {
          0% {
            transform: scale(0.3);
            opacity: 0.95;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>

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
      </div>

    </section>
  )
}
