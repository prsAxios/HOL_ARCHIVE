import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { PROJECTS } from '../data/projects'
import { useTheme } from '../context/ThemeContext'

const ACCENT = '#C2AE6D'

export default function OurWork() {
  const mountRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Scroll hijack prevention state
  const [isInteractive, setIsInteractive] = useState(false)

  useEffect(() => {
    if (!mountRef.current || globeRef.current) return

    let globeInstance: any = null
    const isMobile = window.innerWidth < 768
    let resizeObserver: ResizeObserver | null = null

    const applySize = () => {
      if (!mountRef.current || !globeInstance) return
      const w = mountRef.current.offsetWidth
      const h = mountRef.current.offsetHeight
      if (w > 0 && h > 0) {
        globeInstance.width(w).height(h)
      }
    }

    const onWindowResize = () => applySize()

    async function init() {
      const GlobeGL = (await import('globe.gl')).default
      const globe = (GlobeGL as any)()(mountRef.current!)
      globeInstance = globe
      globeRef.current = globe

      globe
        .width(mountRef.current!.offsetWidth || mountRef.current!.clientWidth || window.innerWidth)
        .height(mountRef.current!.offsetHeight || mountRef.current!.clientHeight || Math.round(window.innerHeight * 0.75))
        /* Globe appearance */
        .globeImageUrl(
          isDark
            ? 'https://unpkg.com/three-globe/example/img/earth-night.jpg'
            : 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
        )
        .backgroundImageUrl('')
        .backgroundColor('rgba(0,0,0,0)')
        /* Atmosphere */
        .showAtmosphere(true)
        .atmosphereColor('#C2AE6D')
        .atmosphereAltitude(isMobile ? 0.08 : 0.12)
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
                background-color: ${isDark ? '#111' : '#FFF'};
                border: 1px solid ${isDark ? 'rgba(194, 174, 109, 0.35)' : 'rgba(194, 174, 109, 0.5)'};
                color: ${isDark ? '#F4F1EC' : '#111'};
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
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
                    <span style="font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: ${ACCENT}; font-family: Sora, sans-serif; font-weight: 600;">
                      ${d.city}, ${d.country}
                    </span>
                    <span style="font-size: 9px; color: ${isDark ? 'rgba(244,241,236,0.3)' : 'rgba(0,0,0,0.4)'}; font-family: Sora, sans-serif;">${d.year}</span>
                  </div>
                  <p style="font-family: Sora, sans-serif; font-weight: 600; font-size: 13px; color: ${isDark ? '#F4F1EC' : '#111'}; margin: 0 0 3px; line-height: 1.2;">${d.title}</p>
                  <p style="font-family: Sora, sans-serif; font-weight: 300; font-size: 11px; color: ${isDark ? 'rgba(244,241,236,0.5)' : 'rgba(0,0,0,0.6)'}; margin: 0 0 10px;">${d.subtitle}</p>
                  
                  <!-- CTA Buttons -->
                  <div style="display: flex; gap: 6px;">
                    <button class="view-btn" style="
                      flex: 1; padding: 7px 0;
                      background-color: ${ACCENT}; color: #111;
                      border: none; border-radius: 4px;
                      font-family: Sora, sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 0.05em; cursor: pointer;
                    ">View Details →</button>
                    <button class="close-btn" style="
                      padding: 7px 10px;
                      background-color: transparent; color: ${isDark ? 'rgba(244,241,236,0.4)' : 'rgba(0,0,0,0.5)'};
                      border: 1px solid ${isDark ? 'rgba(244,241,236,0.12)' : 'rgba(0,0,0,0.15)'}; border-radius: 4px;
                      font-family: Sora, sans-serif; font-size: 11px; cursor: pointer;
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
                  border-top: 6px solid ${isDark ? 'rgba(194, 174, 109, 0.35)' : 'rgba(194, 174, 109, 0.5)'};
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

      // Capped pixel ratio to prevent GPU crash on mobile high-DPI screens
      const renderer = globe.renderer()
      if (renderer) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2.0))
      }

      /* Auto-rotate */
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.4
      globe.controls().enableZoom = true
      globe.controls().minDistance = 150
      globe.controls().maxDistance = 500

      /* Initial camera position */
      globe.pointOfView({ lat: 20, lng: 20, altitude: 2.5 }, 0)
      // Setup ResizeObserver to correct canvas size whenever the container gets a real size
      resizeObserver = new ResizeObserver(() => applySize())
      if (mountRef.current) resizeObserver.observe(mountRef.current)

      // Force immediate resize pass after a tick (handles async layout)
      setTimeout(applySize, 100)
      setTimeout(applySize, 500)
    }

    init()

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
      if (resizeObserver) resizeObserver.disconnect()
      if (globeInstance) {
        if (globeInstance.controls()) {
          globeInstance.controls().enabled = false
        }
        // Deep unmount cleanup of ThreeJS resources to prevent WebGL/GPU memory crashes
        const renderer = globeInstance.renderer()
        const scene = globeInstance.scene()
        if (renderer) {
          renderer.dispose()
        }
        if (scene) {
          scene.traverse((object: any) => {
            if (object.geometry) object.geometry.dispose()
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((m: any) => m.dispose())
              } else {
                object.material.dispose()
              }
            }
          })
        }
        globeInstance._destructor?.()
      }
      globeRef.current = null
      if (mountRef.current) mountRef.current.innerHTML = ''
    }
  }, [isDark]) // Re-init map when theme flips to load correct globe texture

  return (
    <section
      id="our-work"
      style={{
        backgroundColor: 'var(--hol-bg)',
        padding: 'clamp(60px,8vw,100px) 0 0',
        transition: 'background-color 0.4s ease'
      }}
    >
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

        <h2 style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 700,
          fontSize: 'clamp(32px, 5vw, 72px)',
          letterSpacing: '-0.03em', lineHeight: 1.05,
          color: 'var(--hol-text)', margin: 0,
        }}>
          Signature Work
        </h2>

      </div>

      {/* Globe Container Wrapper with custom pointer-events scroll management */}
      <div
        onMouseEnter={() => setIsInteractive(true)}
        onMouseLeave={() => setIsInteractive(false)}
        onClick={() => setIsInteractive(true)}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(500px, 75vh, 860px)',
          pointerEvents: 'auto'
        }}
      >
        <div
          ref={mountRef}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: isInteractive ? 'auto' : 'none',
            willChange: 'transform'
          }}
        />
      </div>

    </section>
  )
}

