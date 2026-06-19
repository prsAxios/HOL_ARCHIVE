import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap-config'
import Footer from '../sections/Footer'
import MagneticButton from '../components/MagneticButton'

export default function WhyHolArchivePage() {
  const navigate = useNavigate()
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
        backgroundColor: '#0b0b0b',
        color: '#F4F1EC',
        minHeight: '100vh',
        overflowX: 'hidden',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
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

      {/* Back Button */}
      <div style={{ position: 'fixed', top: 'clamp(20px, 4vh, 40px)', left: 'clamp(24px, 5vw, 60px)', zIndex: 100 }}>
        <MagneticButton
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(11, 11, 11, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(244, 241, 236, 0.12)',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: '12px 28px',
            borderRadius: '100px',
            color: '#8E8A84',
            transition: 'border-color 0.3s ease, color 0.3s ease',
          }}
          className="hover:text-[#F4F1EC] hover:border-white/25"
        >
          ← Back
        </MagneticButton>
      </div>

      {/* 80vh Hero Area with Grid-Lines Placeholder */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          backgroundColor: '#0b0b0b',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'end',
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
            backgroundColor: '#eae7e1', // Neutral light background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform',
          }}
        >
          {/* Faint technical viewport lines for premium look */}
          <div style={{ position: 'absolute', top: '24px', bottom: '24px', left: '24px', right: '24px', border: '1px solid rgba(17,17,17,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '24px', right: '24px', height: '1px', backgroundColor: 'rgba(17,17,17,0.03)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: '50%', top: '24px', bottom: '24px', width: '1px', backgroundColor: 'rgba(17,17,17,0.03)', pointerEvents: 'none' }} />

          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(28px, 5vw, 64px)',
              fontWeight: 200,
              letterSpacing: '0.4em',
              color: 'rgba(17, 17, 17, 0.15)',
              userSelect: 'none',
              transform: 'translateX(0.2em)',
            }}
          >
            IMAGE
          </span>
        </div>

        {/* Cinematic bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0b0b0b 0%, rgba(11,11,11,0.4) 40%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Title and Description Overlay */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 24px 64px', zIndex: 10 }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(46px, 8.5vw, 110px)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: '#F4F1EC',
              marginBottom: '28px',
              textTransform: 'uppercase',
            }}
          >
            Why HOL Archive
          </h1>
          <p
            ref={descRef}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(15px, 1.3vw, 20px)',
              fontWeight: 200,
              color: '#8E8A84',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: 0,
            }}
          >
            Unlocking the operational blueprints and repeatable execution frameworks designed for high-pressure luxury production.
          </p>
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
            <span style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C2AE6D', fontWeight: 500 }}>
              01 // Knowledge
            </span>
            <h3
              className="animate-heading"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(28px, 4.5vw, 48px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#F4F1EC',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              The Library of Solved Problems
            </h3>
            <div className="animate-paragraph" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: '#8E8A84', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p>
                In high-end event production, details are customized, but logistics follow fundamental patterns. Every event is a temporary build, but the logic behind it is permanent. The HOL Archive compiles these patterns into structured, repeatable blueprints.
              </p>
              <p>
                By documenting spatial plans, workforce matrices, and communication channels, we ensure that past experience guides present execution. This repository guarantees that as operations scale, precision is never compromised.
              </p>
            </div>
          </section>

          {/* Section 2: Two-column layout */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '40px',
              paddingTop: '64px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E50914', fontWeight: 500 }}>
                02 // Core Systems
              </span>
              <h3
                className="animate-heading"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: '#F4F1EC',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Core Pillars of Execution
              </h3>
            </div>
            <div className="animate-paragraph" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: '#8E8A84', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h4 style={{ color: '#F4F1EC', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>1. Predictability</h4>
                <p style={{ margin: 0 }}>We remove on-ground assumptions by mapping out minute-by-minute runs-of-show and simulating guest flow pathways before any build begins.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <h4 style={{ color: '#F4F1EC', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>2. Reusability</h4>
                <p style={{ margin: 0 }}>Every custom logistical challenge is cataloged as a reusable blueprint, translating past spatial, technical, and communication workflows into future configurations.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <h4 style={{ color: '#F4F1EC', fontWeight: 500, fontSize: '15px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>3. Real-time Control</h4>
                <p style={{ margin: 0 }}>We set up backend structured channels and clear workforce responsibilities to keep teams in sync, permitting instant adjustments under intense pressure.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Pull Quote */}
          <section
            style={{
              padding: '64px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center',
            }}
          >
            <blockquote
              className="animate-quote"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(20px, 3.5vw, 36px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.35,
                color: '#C2AE6D',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              "The ultimate luxury is peace of mind, built on a foundation of absolute logic."
            </blockquote>
            <cite style={{ display: 'block', fontSize: '10px', letterSpacing: '0.25em', color: '#8E8A84', textTransform: 'uppercase', marginTop: '24px', notItalic: true, fontWeight: 300 }}>
              — HOL ARCHIVE BLUEPRINT
            </cite>
          </section>

          {/* Section 4: Operational Security */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C2AE6D', fontWeight: 500 }}>
                03 // Security
              </span>
              <h3
                className="animate-heading"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 'clamp(28px, 4.5vw, 48px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: '#F4F1EC',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Operational Security
              </h3>
            </div>
            <div className="animate-paragraph" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: '#8E8A84', lineHeight: 1.8 }}>
              <p>
                For production agencies, event coordinators, and high-profile clients, the HOL Archive acts as an insurance policy. It shifts the burden of coordination from human memory to an organized repository of technical specifications. When operations are guided by detailed plans rather than improvisation, creative agencies can focus completely on the design and storytelling of the experience.
              </p>
            </div>

            {/* Reused Custom Premium CTA */}
            <div className="animate-cta" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
              <MagneticButton
                onClick={() => navigate('/orchestrate')}
                style={{
                  background: 'rgba(244, 241, 236, 0.03)',
                  border: '1px solid rgba(244, 241, 236, 0.15)',
                  color: '#F4F1EC',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '16px 40px',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                className="hover:border-[#C2AE6D] hover:text-[#C2AE6D] hover:bg-[#C2AE6D]/5 hover:scale-[1.03]"
              >
                Orchestrate Now &nbsp; &rarr;
              </MagneticButton>
            </div>
          </section>

        </div>
      </main>

      {/* Reused Website Footer */}
      <Footer />
    </motion.div>
  )
}
