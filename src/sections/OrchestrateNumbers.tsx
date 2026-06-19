import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap-config'
import './OrchestrateNumbers.css'

const SLIDES = [
  {
    num: '01',
    tabTitle: '01 Hospitality',
    title: 'Hospitality\nAlignment',
    body: 'Curating every guest touchpoint with deliberate warmth and precision.',
    bg: '#0b0b0b',
    text: '#F4F1EC',
    accent: '#E50914',
  },
  {
    num: '02',
    tabTitle: '02 Movement',
    title: 'Movement\nManagement',
    body: 'Orchestrating the flow of people, assets, and energy across every zone.',
    bg: '#E50914',
    text: '#F4F1EC',
    accent: '#F4F1EC',
  },
  {
    num: '03',
    tabTitle: '03 Communication',
    title: 'Communication\nFrameworks',
    body: 'Structured backend channels that keep every team in sync under pressure.',
    bg: '#1a2e1a',
    text: '#F4F1EC',
    accent: '#C2AE6D',
  },
  {
    num: '04',
    tabTitle: '04 Control',
    title: 'Operational\nControl',
    body: 'On-ground supervision and real-time decision frameworks for flawless execution.',
    bg: '#F4F1EC',
    text: '#0b0b0b',
    accent: '#E50914',
  },
]

export default function OrchestrateNumbers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) return

    const cards = Array.from(
      wrapper.querySelectorAll<HTMLElement>('.folder-card')
    )

    // Setup GSAP matchMedia
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia(container)

      mm.add({
        isDesktop: '(min-width: 1025px)',
        isTablet: '(min-width: 769px) and (max-width: 1024px)',
        isMobile: '(max-width: 768px)',
      }, (context) => {
        const { isDesktop, isTablet, isMobile } = context.conditions as any

        // Define stack offsets based on layout size
        let offsetX = 40
        let offsetY = 16
        let scaleOffset = 0.04

        if (isTablet) {
          offsetX = 24
          offsetY = 10
          scaleOffset = 0.03
        } else if (isMobile) {
          offsetX = 0
          offsetY = 24
          scaleOffset = 0.04
        }

        // Apply deterministic z-indices and initial stacked positions
        cards.forEach((card, i) => {
          gsap.set(card, {
            x: isMobile ? 0 : i * offsetX,
            y: i * offsetY,
            scale: 1 - i * scaleOffset,
            zIndex: 40 - i * 10, // Folder 01 = 40, Folder 02 = 30, Folder 03 = 20, Folder 04 = 10
            transformOrigin: 'center center',
            force3D: true,
          })
        })

        // Master Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${window.innerHeight * 3}`, // 3 full screen scrolls to slide 3 folders
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        })

        // Folder 01 slides left
        tl.to(cards[0], {
          x: '-125vw',
          rotate: -8,
          opacity: 0,
          ease: 'power3.inOut',
        })

        // Folder 02 slides left
        tl.to(cards[1], {
          x: '-125vw',
          rotate: -8,
          opacity: 0,
          ease: 'power3.inOut',
        })

        // Folder 03 slides left
        tl.to(cards[2], {
          x: '-125vw',
          rotate: -8,
          opacity: 0,
          ease: 'power3.inOut',
        })

        // Folder 04 shifts to center and expands slightly to become primary focus
        tl.to(cards[3], {
          x: 0,
          y: 0,
          scale: 1.02,
          ease: 'power3.out',
        })
      })

      ScrollTrigger.refresh()
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="orch-section">
      <div ref={wrapperRef} className="orch-stack-wrapper">
        {SLIDES.map((slide, i) => {
          const isLight = slide.bg === '#F4F1EC'
          return (
            <div
              key={i}
              className={`folder-card ${isLight ? 'is-light' : ''}`}
              style={{
                backgroundColor: slide.bg,
                color: slide.text,
              }}
            >
              {/* Folder Top Tab */}
              <div
                className={`folder-tab tab-${i}`}
                style={{
                  backgroundColor: slide.bg,
                  color: isLight ? 'rgba(11,11,11,0.6)' : 'rgba(244,241,236,0.6)',
                }}
              >
                {slide.tabTitle}
              </div>

              {/* Big Ghost number */}
              <span
                className="folder-ghost-number"
                style={{
                  WebkitTextStroke: `2px ${
                    isLight ? 'rgba(11,11,11,0.06)' : 'rgba(244,241,236,0.05)'
                  }`,
                  color: 'transparent',
                }}
              >
                {slide.num}
              </span>

              {/* Card Content */}
              <div className="folder-content">
                <span
                  className="folder-tag"
                  style={{
                    color: slide.accent,
                    border: `1px solid ${slide.accent}`,
                  }}
                >
                  {slide.num}
                </span>

                <h2 className="folder-title" style={{ color: slide.text }}>
                  {slide.title}
                </h2>

                <p
                  className="folder-body"
                  style={{
                    color: isLight ? 'rgba(11,11,11,0.6)' : 'rgba(244,241,236,0.65)',
                  }}
                >
                  {slide.body}
                </p>
              </div>

              {/* Bottom Right Counter */}
              <span className="folder-counter">
                {i + 1} / {SLIDES.length}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
