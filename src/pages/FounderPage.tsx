import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import EditorialTextBlock from '../components/EditorialTextBlock'

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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        position: 'relative',
        overflowX: 'hidden',
      }}
      className="font-sans"
    >
      {/* ── Google Fonts Roman Serif Loader ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        
        .editorial-letter {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          color: #000000;
          line-height: 0.8;
          letter-spacing: -0.04em;
        }
      `}</style>



      {/* ── Main Layout Container ── */}
      <motion.div
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-5xl mx-auto px-6 py-28 md:py-40 flex flex-col items-center"
      >
        {/* ── SECTION R: FOUNDER NOTES ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full min-h-[350px] md:min-h-[450px] mb-12 md:mb-0 z-10">
          <div className="md:col-span-6 md:col-start-1 flex justify-center md:justify-end md:pr-12">
            <motion.div
              variants={letterVariants}
              className="editorial-letter text-[240px] md:text-[38vw] lg:text-[450px] select-none"
            >
              R
            </motion.div>
          </div>
          <div className="md:col-span-5 md:col-start-8 flex justify-center md:justify-start">
            <EditorialTextBlock
              num="01"
              title="Founder Notes"
              body="The pursuit of perfection is not about the absence of flaws, but the mastery of control. H.O.L. was conceived to bring a rigorous structural baseline to the ephemeral world of luxury experiences. We operate at the intersection of discipline and creative license, establishing communication frameworks that permit absolute expression under high pressure."
            />
          </div>
        </div>

        {/* ── SECTION O: VISION STATEMENT ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full min-h-[350px] md:min-h-[450px] md:-mt-[120px] mb-12 md:mb-0 z-20">
          <div className="md:col-span-6 md:col-start-7 flex justify-center md:justify-start md:pl-12">
            <motion.div
              variants={letterVariants}
              className="editorial-letter text-[240px] md:text-[38vw] lg:text-[450px] select-none"
            >
              O
            </motion.div>
          </div>
          <div className="md:col-span-5 md:col-start-2 flex justify-center md:justify-start md:row-start-1">
            <EditorialTextBlock
              num="02"
              title="Vision Statement"
              body="We believe in the clean division of space and time. Our vision is to elevate operational planning into an architectural discipline. By mapping pathways, monitoring flows, and automating logistics, we create an invisible but unshakeable foundation. The ultimate luxury is an experience that unfolds as if by magic, backed by flawless logic."
            />
          </div>
        </div>

        {/* ── SECTION N: ARCHIVE PHILOSOPHY ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full min-h-[350px] md:min-h-[450px] md:-mt-[120px] mb-12 md:mb-0 z-30">
          <div className="md:col-span-6 md:col-start-1 flex justify-center md:justify-end md:pr-12">
            <motion.div
              variants={letterVariants}
              className="editorial-letter text-[240px] md:text-[38vw] lg:text-[450px] select-none"
            >
              N
            </motion.div>
          </div>
          <div className="md:col-span-5 md:col-start-8 flex justify-center md:justify-start">
            <EditorialTextBlock
              num="03"
              title="Archive Philosophy"
              body="Every event is a temporary structure, but its design should be worthy of permanent memory. The Archive is our library of solved problems—a repository of spatial plans, technical blueprints, and operational runs-of-show. We treat each project not as a single performance, but as a case study in execution and precision."
            />
          </div>
        </div>

        {/* ── SECTION Y: FUTURE THINKING ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full min-h-[350px] md:min-h-[500px] md:-mt-[120px] z-40">
          <div className="md:col-span-6 md:col-start-7 flex justify-center md:justify-start md:pl-12">
            <motion.div
              variants={letterVariants}
              className="editorial-letter text-[240px] md:text-[38vw] lg:text-[450px] select-none"
            >
              Y
            </motion.div>
          </div>
          <div className="md:col-span-5 md:col-start-2 flex justify-center md:justify-start md:row-start-1">
            <EditorialTextBlock
              num="04"
              title="Future Thinking"
              body="The future of luxury belongs to those who control the invisible layers. As event scale increases and technology shifts, our focus remains on the structural code of hospitality. We are building the protocols, alignment matrices, and digital schedules that will define high-end production for the next generation."
            />
          </div>
        </div>
      </motion.div>

      {/* ── Editorial Footer ── */}
      <footer
        style={{
          borderTop: '1px solid rgba(17, 17, 17, 0.08)',
          padding: '48px 24px',
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8E8A84',
        }}
        className="mt-20 relative z-50"
      >
        H.O.L. Archive — Founder Manifesto — Rony
      </footer>
    </motion.div>
  )
}
