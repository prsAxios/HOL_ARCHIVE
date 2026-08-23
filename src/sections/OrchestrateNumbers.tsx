import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap-config'
import './OrchestrateNumbers.css'

interface AutoScrollingTextProps {
  text: string
  color?: string
}

function AutoScrollingText({ text, color }: AutoScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollDuration, setScrollDuration] = useState(25)
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const checkScroll = () => {
      const containerHeight = container.clientHeight
      const firstChild = track.firstElementChild as HTMLElement
      const textHeight = firstChild ? firstChild.offsetHeight : 0

      if (textHeight > containerHeight) {
        setShouldScroll(true)
        const pixelsPerSecond = 32
        const duration = textHeight / pixelsPerSecond
        setScrollDuration(duration)
      } else {
        setShouldScroll(false)
      }
    }

    checkScroll()

    const resizeObserver = new ResizeObserver(() => {
      checkScroll()
    })
    resizeObserver.observe(container)
    resizeObserver.observe(track)
    if (track.firstElementChild) {
      resizeObserver.observe(track.firstElementChild)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [text])

  return (
    <div
      ref={containerRef}
      className="auto-scroll-container"
      style={{
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        minHeight: 0,
      }}
    >
      <div
        ref={trackRef}
        className={`auto-scroll-track ${shouldScroll ? 'is-animating' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          animationDuration: `${scrollDuration}s`,
          animationPlayState: 'running',
        }}
      >
        <div style={{ paddingBottom: '32px' }}>
          <p className="folder-body" style={{ color, margin: 0 }}>
            {text}
          </p>
        </div>
        {shouldScroll && (
          <div style={{ paddingBottom: '32px' }}>
            <p className="folder-body" style={{ color, margin: 0 }}>
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const SLIDES = [
  {
    num: '01',
    tabTitle: '01 Hospitality',
    title: 'WHAT WE ORCHESTRATE',
    body: 'H.O.L. Archive operates across three distinct execution environments. Each environment carries its own rhythm, pressure, dependencies, and operational demands. A private gathering moves differently from a multi-day destination celebration. A hospitality-intensive ecosystem requires different attention than an execution-intensive production. Rather than forcing a single framework across every project, we build systems around the environment itself. Our approach begins by understanding movement, communication, timing, responsibility, and pressure before execution ever begins. Because the quality of an experience is rarely determined by what happens in front of people. It is determined by everything happening behind them. Through structured planning, controlled communication, and environment-specific execution frameworks, we create operational ecosystems designed around how each environment naturally behaves. Because different environments require different forms of leadership. And seamless execution is not created through a formula. It is created through understanding',
    bg: '#0b0b0b',
    text: '#F4F1EC',
    accent: '#E50914',
  },
  {
    num: '02',
    tabTitle: '02 Movement',
    title: 'CATEGORY A: LUXURY TIER EXPERIENCES',
    body: 'Growth is exciting. Growth is also demanding. As projects become larger, communication expands, responsibilities multiply, timelines overlap, and operational gaps become increasingly visible. What once worked for a small team often struggles under greater scale. This environment demands structure. Not more activity. Not more people. Just stronger systems. H.O.L. Archive provides the operational frameworks, execution discipline, and backend support required to maintain clarity as complexity increases. Our role is to strengthen communication, create accountability, simplify coordination, and ensure that growth never comes at the cost of operational stability. Because scale does not create pressure. Unstructured scale does. And as environments grow, the difference between movement and progress becomes increasingly important. Typical Environments - Growing event companies- Production agencies- Experiential marketing projects- Brand activations- Corporate event ecosystems- Large-scale public events- Multi-vendor productions- Execution teams managing multiple projects simultaneously',
    bg: '#E50914',
    text: '#F4F1EC',
    accent: '#F4F1EC',
  },
  {
    num: '03',
    tabTitle: '03 Communication',
    title: 'CATEGORY B: SCALABLE EVENT & BACKEND SUPPORT',
    body: 'Growth is exciting. Growth is also demanding. As projects become larger, communication expands, responsibilities multiply, timelines overlap, and operational gaps become increasingly visible. What once worked for a small team often struggles under greater scale. This environment demands structure. Not more activity. Not more people. Just stronger systems. H.O.L. Archive provides the operational frameworks, execution discipline, and backend support required to maintain clarity as complexity increases. Our role is to strengthen communication, create accountability, simplify coordination, and ensure that growth never comes at the cost of operational stability. Because scale does not create pressure. Unstructured scale does. And as environments grow, the difference between movement and progress becomes increasingly important. Typical Environments - Growing event companies- Production agencies- Experiential marketing projects- Brand activations- Corporate event ecosystems- Large-scale public events- Multi-vendor productions- Execution teams managing multiple projects simultaneously',
    bg: '#1a2e1a',
    text: '#F4F1EC',
    accent: '#C2AE6D',
  },
  {
    num: '04',
    tabTitle: '04 Control',
    title: 'CATEGORY C: DESTINATION & MULTI-DAY OPERATIONS',
    body: 'Some environments are defined by movement. People move. Teams move. Vendors move. Timelines shift. Locations change. And with every movement, new variables emerge. Unlike static environments, these ecosystems require continuity across changing conditions while maintaining the same level of control from beginning to end. The challenge is not movement itself. The challenge is maintaining alignment while everything around you is moving. H.O.L. Archive develops operational frameworks designed to support extended timelines, layered logistics, hospitality dependencies, transportation flows, accommodation coordination, and evolving execution requirements across multiple touchpoints. Our role is to create stability within movement. To ensure that transitions remain seamless, communication remains synchronized, and execution remains consistent regardless of changing locations, schedules, or circumstances. Because successful multi-day environments are not built through constant reaction. They are built through preparation, foresight, and operational continuity. Typical Environments - Destination wedding ecosystems- Multi-day celebrations- Resort-based event experiences- Multi-venue productions- Travel-intensive gatherings- Large-format hospitality programs- Festival-style event environments- Extended guest experience journeys',
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

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia(container)

      mm.add({
        isDesktop: '(min-width: 1025px)',
        isTablet: '(min-width: 769px) and (max-width: 1024px)',
        isMobile: '(max-width: 768px)',
      }, (context) => {
        const { isTablet, isMobile } = context.conditions as any

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

        cards.forEach((card, i) => {
          gsap.set(card, {
            x: isMobile ? 0 : i * offsetX,
            y: i * offsetY,
            scale: 1 - i * scaleOffset,
            zIndex: 40 - i * 10,
            transformOrigin: 'center center',
            force3D: true,
          })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${window.innerHeight * 3}`,
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        })

        tl.to(cards[0], {
          x: '-125vw',
          rotate: -8,
          opacity: 0,
          ease: 'power3.inOut',
        })

        tl.to(cards[1], {
          x: '-125vw',
          rotate: -8,
          opacity: 0,
          ease: 'power3.inOut',
        })

        tl.to(cards[2], {
          x: '-125vw',
          rotate: -8,
          opacity: 0,
          ease: 'power3.inOut',
        })

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
                  WebkitTextStroke: `2px ${isLight ? 'rgba(11,11,11,0.06)' : 'rgba(244,241,236,0.05)'
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

                <AutoScrollingText
                  text={slide.body}
                  color={isLight ? 'rgba(11,11,11,0.6)' : 'rgba(244,241,236,0.65)'}
                />
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
