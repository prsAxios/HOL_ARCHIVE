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
import { ScrollSmoother } from './lib/gsap-config'

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })
  const location = useLocation()

  useEffect(() => {
    if (window.innerWidth < 768) return
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.4,
      effects: true,
      ignoreMobileResize: true,
    })
    return () => smoother.kill()
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

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/founder" element={<FounderPage />} />
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
              <Preloader />
              <Header scrollRef={scrollRef} />
              <div id="smooth-wrapper">
                <div id="smooth-content">
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
                </div>
              </div>
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
