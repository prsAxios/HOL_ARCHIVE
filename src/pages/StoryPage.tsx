import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap, SplitText } from '../lib/gsap-config'
import Footer from '../sections/Footer'
import { useTheme } from '../context/ThemeContext'

export default function StoryPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  const [scrollProgress, setScrollProgress] = useState(0)

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

      // 5. Scroll Reveals for headings (split words/chars) & paragraphs (split lines)
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
            src="/images/The_Story.jpeg"
            alt="The Story"
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
              fontWeight: 100,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: 'var(--hol-text)',
              marginBottom: '28px',
              textTransform: 'uppercase',
              transition: 'color 0.4s ease',
            }}
          >
            The Story
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

          {/* Section 1: Foundation */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>



            <div style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: 'var(--hol-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px', transition: 'color 0.4s ease' }}>
              <p className="animate-paragraph" style={{ margin: 0 }}>
                H.O.L. ARCHIVE was built around the understanding that seamless experiences are never created by chance. Every smooth movement, every timely transition, every calm environment, and every uninterrupted flow is the result of observation, structure, preparation, and operational intelligence.
              </p>
            </div>
          </section>

          {/* Section 2: Systems */}
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
                Before an event becomes visible, it first exists inside systems.
              </h3>

            </div>

            <div style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: 'var(--hol-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '12px', transition: 'color 0.4s ease' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', borderLeft: '1px solid var(--hol-border)', transition: 'border-color 0.4s ease' }}>

                <p className="animate-paragraph" style={{ margin: 0 }}>Inside documents.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Inside movement maps.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Inside hospitality structures.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Inside communication layers.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Inside timelines.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Inside contingency thinking.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Inside coordination frameworks designed to function under pressure.</p>
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
              "At H.O.L., we do not focus on decoration as the measure of success."
            </blockquote>
          </section>

          {/* Section 4: Focus & Rhythm */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '40px',


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
                Rhythm & Focus
              </h3>
            </div>

            <div style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: 'var(--hol-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '12px', transition: 'color 0.4s ease' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px', borderLeft: '1px solid var(--hol-border)', transition: 'border-color 0.4s ease', color: 'var(--hol-muted)', fontWeight: 300 }}>
                <p className="animate-paragraph" style={{ margin: 0 }}>We focus on rhythm.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Continuity.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Clarity.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Controlled environments.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Invisible precision.</p>
              </div>



            </div>


            <p
              className='animate-paragraph'
              style={{
                margin: '24px 0 0',
                width: '100%',
                gridColumn: '1 / -1',
                fontSize: 'clamp(14px, 1.1vw, 17px)',
                fontWeight: 200,
                color: 'var(--hol-muted)',
                lineHeight: 1.8,
                transition: 'color 0.4s ease',
              }}
            >
              Because true backend management is not recognized by how much activity is happening.
              It is recognized by how little confusion is felt.
              The smoother the experience feels,
              the stronger the structure behind it.
              Every briefing sheet, operational note, logistics layout, manpower structure, and execution
              framework exists for one reason:
              to transform complexity into calmness.
            </p>

          </section>

          {/* Section 5: Ecosystem & Execution with CTA */}
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              paddingTop: '64px',
              borderTop: '1px solid var(--hol-border)',
              transition: 'border-color 0.4s ease',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <h3
                className="animate-heading"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 'clamp(28px, 4.5vw, 48px)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: 'var(--hol-text)',
                  margin: 0,
                  textTransform: 'uppercase',
                  transition: 'color 0.4s ease',
                }}
              >
                H.O.L. ARCHIVE exists in the space between vision and reality.
              </h3>
            </div>

            <div style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', fontWeight: 200, color: 'var(--hol-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px', transition: 'color 0.4s ease' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', borderLeft: '1px solid var(--hol-border)', transition: 'border-color 0.4s ease' }}>
                <p className="animate-paragraph" style={{ margin: 0 }}>Where expectations are translated into movement.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Where planning becomes coordination.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Where pressure becomes discipline.</p>
                <p className="animate-paragraph" style={{ margin: 0 }}>Where large scale environments become controlled ecosystems.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px', paddingTop: '20px', borderTop: '1px solid var(--hol-border)', transition: 'border-color 0.4s ease' }}>
                <div>

                  <span className="animate-paragraph" style={{ display: 'block', fontSize: '15px', color: 'var(--hol-text)', marginTop: '4px' }}>Not through noise.<br />Through structure.</span>
                </div>
                <div>

                  <span className="animate-paragraph" style={{ display: 'block', fontSize: '15px', color: 'var(--hol-text)', marginTop: '4px' }}>Not through visibility.<br />Through precision.</span>
                </div>
              </div>

              <p className="animate-paragraph" style={{ margin: '16px 0 0', fontStyle: 'italic', color: 'red', fontWeight: 300, fontSize: 'clamp(15px, 1.2vw, 19px)' }}>
                The best execution is rarely noticed. And that is exactly the point.
              </p>
            </div>

          </section>

        </div>
      </main>




      {/* Reused Website Footer */}
      <Footer />
    </motion.div>
  )
}
