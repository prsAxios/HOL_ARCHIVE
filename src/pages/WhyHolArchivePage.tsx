import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap-config'
import Footer from '../sections/Footer'
import MagneticButton from '../components/MagneticButton'
import { useTheme } from '../context/ThemeContext'

export default function WhyHolArchivePage() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {
      // 1. Hero Placeholder Entrance
      gsap.fromTo(placeholderRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 1.6, ease: 'power3.out' }
      )

      // 2. Parallax Motion on Hero Placeholder
      gsap.to(placeholderRef.current, {
        yPercent: 12,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      // 3. Title Character Reveal using SplitText
      if (titleRef.current) {
        const titleSplit = new SplitText(titleRef.current, { type: 'chars' })
        gsap.fromTo(titleSplit.chars,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.03, delay: 0.3 }
        )
      }

      // 4. Hero Subtitle Line Reveal
      if (descRef.current) {
        const descSplit = new SplitText(descRef.current, { type: 'lines' })
        gsap.fromTo(descSplit.lines,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.08, delay: 0.7 }
        )
      }

      // 5. Scroll Reveals for headings & paragraphs
      const headings = page.querySelectorAll('.animate-heading')
      headings.forEach((heading) => {
        const split = new SplitText(heading as HTMLElement, { type: 'words,chars' })
        gsap.fromTo(split.chars,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.02,
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      const paragraphs = page.querySelectorAll('.animate-paragraph')
      paragraphs.forEach((para) => {
        const split = new SplitText(para as HTMLElement, { type: 'lines' })
        gsap.fromTo(split.lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.06,
            scrollTrigger: {
              trigger: para,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // 6. Reveal Pull Quotes
      const quotes = page.querySelectorAll('.animate-quote')
      quotes.forEach((quote) => {
        const split = new SplitText(quote as HTMLElement, { type: 'lines' })
        gsap.fromTo(split.lines,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: quote,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // 7. CTA Controls Reveal
      const ctas = page.querySelectorAll('.animate-cta')
      ctas.forEach((cta) => {
        gsap.fromTo(cta,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cta,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          }
        )
      })
    }, page)

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      ref={pageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        backgroundColor: 'var(--hol-bg)',
        color: 'var(--hol-text)',
        minHeight: '100vh',
        overflowX: 'hidden',
        fontFamily: "'Sora', sans-serif",
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      {/* ── Google Fonts Sora Loader ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');
      `}</style>
      {/* Reading Progress Indicator */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          backgroundColor: '#E50914',
          zIndex: 1000,
          transition: 'width 0.1s ease-out',
        }}
      />

      {/* 80vh Hero Area with Grid-Lines Placeholder */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          backgroundColor: 'var(--hol-bg)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'end',
          transition: 'background-color 0.4s ease',
        }}
      >
        <div
          ref={placeholderRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '115%',
            willChange: 'transform',
          }}
        >
          <img
            src="/images/why_hol.jpg"
            alt="Why We Orchestrate"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {/* Faint technical viewport lines for premium look */}
          <div style={{ position: 'absolute', top: '24px', bottom: '24px', left: '24px', right: '24px', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '24px', right: '24px', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: '50%', top: '24px', bottom: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        </div>

        {/* Cinematic bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isDark
              ? 'linear-gradient(to top, #0b0b0b 0%, rgba(11,11,11,0.4) 40%, transparent 100%)'
              : 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.4) 40%, transparent 100%)',
            pointerEvents: 'none',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Title and Description Overlay */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px 64px', zIndex: 10 }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(46px, 8.5vw, 110px)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: 'var(--hol-text)',
              marginBottom: '28px',
              textTransform: 'uppercase',
              transition: 'color 0.4s ease',
            }}
          >
            Why HOL Archive
          </h1>

        </div>
      </div>

      {/* Editorial Content Container */}
      <main
        style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '100px 24px 140px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(80px, 10vh, 140px)' }}>

          {/* Section 1: The Library of Solved Problems */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>


            <div className="animate-paragraph" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: 'var(--hol-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '20px', transition: 'color 0.4s ease' }}>
              <h1 style={{ margin: 0 }}>
                Most management companies focus on how an event appears.<br />
                H.O.L. focuses on how it functions.<br />
                Where many teams see the final outcome, we study the hundreds of invisible systems working
                behind it.<br />
                Because seamless experiences are never accidental.              </h1>

            </div>
          </section>

          {/* Section 2: Two-column layout */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '40px',
              paddingTop: '64px',
              borderTop: '1px solid var(--hol-border)',
              transition: 'border-color 0.4s ease',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <h3
                className="animate-heading"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: 'var(--hol-text)',
                  margin: 0,
                  textTransform: 'uppercase',
                  transition: 'color 0.4s ease',
                }}
              >
                They are built through:
              </h3>
            </div>
            <div className="animate-paragraph" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: 'var(--hol-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px', transition: 'color 0.4s ease' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h4 style={{ color: 'var(--hol-text)', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}>1. Observation</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--hol-border)', paddingTop: '16px', transition: 'border-color 0.4s ease' }}>
                <h4 style={{ color: 'var(--hol-text)', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}>2. Structure</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--hol-border)', paddingTop: '16px', transition: 'border-color 0.4s ease' }}>
                <h4 style={{ color: 'var(--hol-text)', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}>3. Timing</h4>

              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--hol-border)', paddingTop: '16px', transition: 'border-color 0.4s ease' }}>
                <h4 style={{ color: 'var(--hol-text)', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}>4. Communication
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--hol-border)', paddingTop: '16px', transition: 'border-color 0.4s ease' }}>
                <h4 style={{ color: 'var(--hol-text)', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}>5. Movement Control
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--hol-border)', paddingTop: '16px', transition: 'border-color 0.4s ease' }}>
                <h4 style={{ color: 'var(--hol-text)', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}>6. Operational Awareness
                </h4>
              </div>

            </div>
          </section>



          {/* Section 4: Operational Security */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                gap: '48px',
                fontSize: 'clamp(14px, 1.1vw, 17px)',
                fontWeight: 200,
                color: 'var(--hol-muted)',
                lineHeight: 1.8,
                transition: 'color 0.4s ease',
              }}
            >
              {/* Left Column: Narrative paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p className="animate-paragraph" style={{ margin: 0 }}>
                  Long before the day arrives, it is the process of understanding how an environment responds under pressure.
                  How guests navigate a journey. How hospitality is delivered. How operational ecosystems interact.
                  How disruptions influence continuity. How information moves across teams. How critical moments emerge
                  and evolve throughout delivery.
                </p>
                <p className="animate-paragraph" style={{ margin: 0 }}>
                  Every framework is designed to reduce complexity before event day arrives. Through contingency planning,
                  movement mapping, coordination frameworks, backend communication systems, and operational synchronization,
                  we build environments that remain stable, coordinated, and controlled—even when pressure escalates.
                </p>
                <p className="animate-paragraph" style={{ margin: 0, marginTop: '16px' }}>
                  H.O.L. understands both: the expectations of luxury, and the realities of on-ground operations.
                  That balance defines our approach. We do not operate like coordinators waiting for challenges to appear;
                  we operate through anticipation.
                </p>
                <p className="animate-paragraph" style={{ margin: 0 }}>
                  The strongest execution teams often go unnoticed during the experience itself because everything flows
                  exactly as it should.
                  <br />
                  And that is what H.O.L. was built to do.
                </p>
              </div>

              {/* Right Column: Principles & Warnings */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Section A: Luxury is: */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 className="animate-paragraph" style={{ color: 'var(--hol-text)', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}>
                    Because luxury is not only visual. Luxury is:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', borderLeft: '1px solid var(--hol-border)', transition: 'border-color 0.4s ease' }}>
                    <p className="animate-paragraph" style={{ margin: 0 }}>• Timing without disruption</p>
                    <p className="animate-paragraph" style={{ margin: 0 }}>• Movement without friction</p>
                    <p className="animate-paragraph" style={{ margin: 0 }}>• Hospitality without uncertainty</p>
                    <p className="animate-paragraph" style={{ margin: 0 }}>• Continuity without visible pressure</p>
                  </div>
                </div>

                {/* Section B: A refined setting means little if: */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 className="animate-paragraph" style={{ color: 'var(--hol-text)', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}>
                    A refined setting means little if:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', borderLeft: '1px solid var(--hol-border)', transition: 'border-color 0.4s ease' }}>
                    <p className="animate-paragraph" style={{ margin: 0 }}>• Timelines slip</p>
                    <p className="animate-paragraph" style={{ margin: 0 }}>• Vendor coordination weakens</p>
                    <p className="animate-paragraph" style={{ margin: 0 }}>• Guest transitions become disrupted</p>
                    <p className="animate-paragraph" style={{ margin: 0 }}>and communication breaks down.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Section 3: Pull Quote */}
          <section
            style={{
              padding: '64px 0',
              borderTop: '1px solid var(--hol-border)',
              borderBottom: '1px solid var(--hol-border)',
              textAlign: 'center',
              transition: 'border-color 0.4s ease',
            }}
          >
            <blockquote
              className="animate-quote"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 'clamp(20px, 3.5vw, 36px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.35,
                color: '#C2AE6D',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              We do not measure success by the number of projects we complete.
              <br />
              We measure it by the number of people who return.
              <br />
              Because in an industry driven by timelines, pressure, countless moving parts, and constant
              <br />
              change, repeat trust is the strongest form of appreciation.
              <br />
              Anyone can promise smooth execution.
              <br />
              The real measure of success is whether people choose to work with you again.
              That is the standard we hold ourselves to.
            </blockquote>

          </section>
        </div>
      </main>


      {/* Reused Website Footer */}
      <Footer />
    </motion.div>
  )
}
