import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import EditorialTextBlock from '../components/EditorialTextBlock'
import { scrollTo } from '../lib/gsap-config'

const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.15,
    },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export default function FounderPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Clear temporary backgrounds when this page finishes entering
    const timer = setTimeout(() => {
      document.body.style.backgroundColor = ''
      document.documentElement.style.backgroundColor = ''
    }, 1000)
    return () => {
      clearTimeout(timer)
      document.body.style.backgroundColor = ''
      document.documentElement.style.backgroundColor = ''
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--hol-bg)',
        color: 'var(--hol-text)',
        position: 'relative',
        overflowX: 'hidden',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
      className="font-sans"
    >
      {/* ── Google Fonts Roman Serif Loader ── */}
      <style>{`
        .editorial-letter {
          font-family: 'Sora', sans-serif;
          font-weight: 500;
          color: var(--hol-text);
          line-height: 0.75;
          letter-spacing: -0.04em;
          transition: color 0.4s ease;
          font-size: clamp(280px, 80vh, 900px);
        }
      `}</style>



      {/* ── Main Layout Container ── */}
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[1440px] mx-auto px-8 md:px-[6vw] py-28 md:py-40 flex flex-col items-center"
      >
        {/* Back Button */}
        <div className="w-full flex justify-start mb-8 md:mb-12">
          <button
            onClick={() => {
              navigate('/#vision-cta')
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Sora, sans-serif',
              fontWeight: 300,
              fontSize: '13px',
              letterSpacing: '0.14em',
              color: 'var(--hol-muted)',
              textTransform: 'uppercase',
              padding: 0,
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hol-text)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--hol-muted)'}
          >
            ← Back
          </button>
        </div>

        {/* ── SECTION R: FOUNDER NOTES (ROOTS) ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12 items-start w-full mb-20 md:mb-32 z-10">
          <div className="md:col-span-6 md:col-start-1 flex justify-center md:justify-end md:pr-8">
            <motion.div
              variants={letterVariants}
              className="editorial-letter select-none"
            >
              R
            </motion.div>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex justify-center md:justify-start">
            <EditorialTextBlock
              num="01"
              title="ROOTS"
              body={
                <>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>Every founder has a beginning.</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>Rony’s just happened to start in a kitchen.</p>
                  <p style={{ margin: 0 }}>Like many students pursuing Hotel Management, he entered the world of hospitality because he enjoyed cooking. The plan seemed simple enough: learn the craft, understand the industry, and build a career around creating experiences for people.</p>
                  <p style={{ margin: 0 }}>What he didn’t realise was that his attention was constantly drifting away from the food.</p>
                  <p style={{ margin: 0 }}>While others focused on what was being served, he found himself fascinated by everything happening behind it.</p>
                  <div style={{ paddingLeft: '12px', borderLeft: '1px solid var(--hol-border)', display: 'flex', flexDirection: 'column', gap: '6px', transition: 'border-color 0.4s ease' }}>
                    <p style={{ margin: 0 }}>The conversations.</p>
                    <p style={{ margin: 0 }}>The movement.</p>
                    <p style={{ margin: 0 }}>The timing.</p>
                    <p style={{ margin: 0 }}>The invisible forces holding everything together.</p>
                    <p style={{ margin: 0 }}>The hundreds of decisions quietly working together to create a single experience.</p>
                  </div>
                  <p style={{ margin: 0 }}>Looking back, it was probably the first sign that management was always going to win that battle.</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>Hospitality introduced him to people.</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>Management gave him a reason to stay.</p>
                  <p style={{ margin: 0 }}>That curiosity eventually led him towards an MBA in Events, where something he had unknowingly carried since childhood finally started making sense. He was fascinated by celebrations—not simply the joy of them, but the complexity behind them. The idea that hundreds of moving parts, expectations, emotions, and personalities could somehow come together to create happiness for someone else was endlessly interesting.</p>
                  <p style={{ margin: 0 }}>Somewhere between curiosity and a few viewings of <em>Band Baaja Baaraat</em>, a career path quietly began to reveal itself.</p>
                </>
              }
            />
          </div>
        </div>

        {/* ── SECTION O: VISION STATEMENT (OBSERVATION) ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12 items-start w-full md:-mt-[60px] mb-20 md:mb-32 z-20">
          <div className="md:col-span-6 md:col-start-7 flex justify-center md:justify-start md:pl-8">
            <motion.div
              variants={letterVariants}
              className="editorial-letter select-none"
            >
              O
            </motion.div>
          </div>
          <div className="md:col-span-6 md:col-start-1 flex justify-center md:justify-start md:row-start-1">
            <EditorialTextBlock
              num="02"
              title="OBSERVATION"
              body={
                <>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>Over the years, every chapter contributed something different.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ margin: 0 }}><strong style={{ color: 'var(--hol-text)', fontWeight: 500 }}>Wedding Genie</strong> introduced him to the pursuit of perfection.</p>
                    <p style={{ margin: 0 }}><strong style={{ color: 'var(--hol-text)', fontWeight: 500 }}>Bindra Hospitality Services</strong> taught him leadership, ownership, and the reality that responsibility often arrives before confidence.</p>
                    <p style={{ margin: 0 }}><strong style={{ color: 'var(--hol-text)', fontWeight: 500 }}>Genpact</strong> showed him the value of systems, diplomacy, and managing people with patience and professionalism.</p>
                    <p style={{ margin: 0 }}><strong style={{ color: 'var(--hol-text)', fontWeight: 500 }}>The Event Casa</strong> expanded his understanding of execution at scale. It taught him that details are rarely small, consistency is often underestimated, and the difference between good and exceptional usually exists in the things most people never notice.</p>
                  </div>
                  <p style={{ margin: 0 }}>More importantly, it revealed what sustained focus and disciplined thinking could achieve.</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>What distinguishes Rony today is not where he has worked.</p>
                  <p style={{ margin: 0 }}>Many professionals have worked across hospitality, operations, logistics, and events.</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>What distinguishes him is the way he observes them.</p>
                  <div style={{ paddingLeft: '12px', borderLeft: '1px solid var(--hol-border)', display: 'flex', flexDirection: 'column', gap: '6px', transition: 'border-color 0.4s ease' }}>
                    <p style={{ margin: 0 }}>While others see functions, he sees relationships.</p>
                    <p style={{ margin: 0 }}>While others see events, he sees ecosystems.</p>
                    <p style={{ margin: 0 }}>While others celebrate outcomes, he studies the systems that quietly produced them.</p>
                  </div>
                </>
              }
            />
          </div>
        </div>

        {/* ── SECTION N: ARCHIVE PHILOSOPHY (KNOWLEDGE) ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12 items-start w-full md:-mt-[60px] mb-20 md:mb-32 z-30">
          <div className="md:col-span-6 md:col-start-1 flex justify-center md:justify-end md:pr-8">
            <motion.div
              variants={letterVariants}
              className="editorial-letter select-none"
            >
              N
            </motion.div>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex justify-center md:justify-start">
            <EditorialTextBlock
              num="03"
              title="KNOWLEDGE"
              body={
                <>
                  <p style={{ margin: 0 }}>For nearly a decade, he has been observing how people organise, communicate, lead, recover, and execute under pressure. With every project, one realization became impossible to ignore.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderLeft: '1px solid var(--hol-border)', paddingLeft: '12px', transition: 'border-color 0.4s ease' }}>
                    <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>The event may last a few days.</p>
                    <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>The knowledge behind it often disappears the moment it ends.</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ margin: 0 }}>• Every challenge solved.</p>
                    <p style={{ margin: 0 }}>• Every operational breakthrough.</p>
                    <p style={{ margin: 0 }}>• Every lesson learned.</p>
                    <p style={{ margin: 0 }}>• Every system improved.</p>
                  </div>
                  <p style={{ margin: 0 }}>Too often, they remain with individuals instead of becoming part of the industry’s collective intelligence.</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>That observation became the foundation of H.O.L Archive.</p>
                  <p style={{ margin: 0 }}>Not simply as a company, but as a long-term vision.</p>
                  <p style={{ margin: 0 }}>A place where operational knowledge is preserved instead of forgotten. Where experience is documented instead of disappearing.</p>
                </>
              }
            />
          </div>
        </div>

        {/* ── SECTION Y: FUTURE THINKING (YESTERDAY TO TOMORROW) ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12 items-start w-full md:-mt-[60px] z-40">
          <div className="md:col-span-6 md:col-start-7 flex justify-center md:justify-start md:pl-8">
            <motion.div
              variants={letterVariants}
              className="editorial-letter select-none"
            >
              Y
            </motion.div>
          </div>
          <div className="md:col-span-6 md:col-start-1 flex justify-center md:justify-start md:row-start-1">
            <EditorialTextBlock
              num="04"
              title="YESTERDAY TO TOMORROW"
              body={
                <>
                  <p style={{ margin: 0 }}>Where systems become stronger because lessons are shared. Where the industry can learn not only from success, but from preparation, process, and continuous refinement.</p>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)' }}>The vision of H.O.L Archive is simple.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ margin: 0, color: 'var(--hol-text)', fontWeight: 500 }}>To transform experience into knowledge.</p>
                    <p style={{ margin: 0, color: 'var(--hol-text)', fontWeight: 500 }}>Knowledge into systems.</p>
                    <p style={{ margin: 0, color: 'var(--hol-text)', fontWeight: 500 }}>And systems into better execution for everyone who builds experiences for others.</p>
                  </div>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--hol-text)', marginTop: '8px' }}>Because every event eventually comes to an end.</p>
                  <p style={{ margin: 0, fontWeight: 500, color: '#E50914' }}>The knowledge behind it shouldn’t.</p>
                </>
              }
            />
          </div>
        </div>


      </motion.div>

      {/* ── Editorial Footer ── */}
      <footer
        style={{
          borderTop: '1px solid var(--hol-border)',
          padding: '48px 24px',
          textAlign: 'center',
          fontFamily: 'Sora, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--hol-muted)',
          transition: 'border-color 0.4s ease, color 0.4s ease',
        }}
      >
        H.O.L Archive © {new Date().getFullYear()} — Proprietary System
      </footer>
    </motion.div>
  )
}

