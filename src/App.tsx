import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './sections/Header'
import BrandReveal from './sections/BrandReveal'
import Hero from './sections/Hero'
import AboutSection from './sections/AboutSection'
import Contact from './sections/Contact'
import FAQ from './sections/FAQ'
import Process from './sections/Process'
import Vision from './sections/Vision'
import OurWork from './sections/OurWork'
import OrchestratePage from './pages/OrchestratePage'
import FounderPage from './pages/FounderPage'
import StoryPage from './pages/StoryPage'
import WhyHolArchivePage from './pages/WhyHolArchivePage'
import ArchivePage from './pages/ArchivePage'
import ArchiveSection from './sections/ArchiveSection'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'
import ProjectDetail from './pages/ProjectDetail'
import { ThemeProvider } from './context/ThemeContext'
import { gsap, setLenis, ScrollTrigger, lenisInstance } from './lib/gsap-config'
import Lenis from 'lenis'

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })
  const location = useLocation()

  useEffect(() => {
    // Initialize Lenis smooth scroll unconditionally on all viewports
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    setLenis(lenis)

    // Connect Lenis to ScrollTrigger update events
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    // Sync GSAP's global ticker to drive Lenis scrolling requests
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    let prevY = window.scrollY
    const tick = () => {
      const y = window.scrollY
      scrollRef.current.y = y
      scrollRef.current.speed = y - prevY
      prevY = y
    }
    window.addEventListener('scroll', tick, { passive: true })
    return () => window.removeEventListener('scroll', tick)
  }, [])

  // Scroll Restoration on Route Change
  useEffect(() => {
    window.scrollTo(0, 0)
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    }
  }, [location.pathname])

  return (
    <ThemeProvider>
      <Preloader />
      {location.pathname !== '/archive' && <Header scrollRef={scrollRef} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/founder"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <FounderPage />
              </motion.div>
            }
          />
          <Route
            path="/story"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <StoryPage />
              </motion.div>
            }
          />
          <Route
            path="/why-hol-archive"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <WhyHolArchivePage />
              </motion.div>
            }
          />
          <Route
            path="/archive"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <ArchivePage />
              </motion.div>
            }
          />
          <Route
            path="/work/:id"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <ProjectDetail />
              </motion.div>
            }
          />
          <Route
            path="/orchestrate"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <OrchestratePage />
              </motion.div>
            }
          />
          <Route path="*" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <main>
                <Hero />
                <AboutSection />
                <BrandReveal />
                <OurWork />
                <Process />
                <Vision />
                <ArchiveSection />
                <FAQ />
                <Contact />
              </main>
              <Footer />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
