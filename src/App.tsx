import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router'
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
import FaqDetailPage from './pages/FaqDetailPage'
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
  const navigationType = useNavigationType()
  const previousPathnameRef = useRef(location.pathname)

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll_pos_${location.pathname}`, window.scrollY.toString())
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Save scroll position when route changes (SPA navigation)
  useEffect(() => {
    const previousPath = previousPathnameRef.current
    previousPathnameRef.current = location.pathname

    // Save scroll position of previous route before changing
    if (previousPath !== location.pathname) {
      sessionStorage.setItem(`scroll_pos_${previousPath}`, window.scrollY.toString())
    }
  }, [location.pathname])

  useEffect(() => {
    const restoreScroll = () => {
      const savedScroll = sessionStorage.getItem(`scroll_pos_${location.pathname}`)
      if (savedScroll !== null) {
        const y = parseFloat(savedScroll)
        // Disable Lenis temporarily for immediate scroll restoration
        if (lenisInstance) {
          lenisInstance.stop()
        }
        window.scrollTo(0, y)
        // Re-enable Lenis after scroll is restored
        setTimeout(() => {
          if (lenisInstance) {
            lenisInstance.start()
            lenisInstance.scrollTo(y, { immediate: true })
          }
        }, 100)
      } else {
        // No saved position, scroll to top
        if (lenisInstance) {
          lenisInstance.stop()
        }
        window.scrollTo(0, 0)
        setTimeout(() => {
          if (lenisInstance) {
            lenisInstance.start()
            lenisInstance.scrollTo(0, { immediate: true })
          }
        }, 100)
      }
    }

    if (navigationType === 'POP') {
      // Back navigation: restore scroll position
      restoreScroll()
    } else if (location.hash) {
      // Hash navigation: scroll to hash
      try {
        const isCta = location.hash === '#vision-cta'
        const selector = isCta ? '#vision' : location.hash
        const target = document.querySelector(selector)
        if (target) {
          if (lenisInstance) {
            lenisInstance.stop()
          }
          const rect = target.getBoundingClientRect()
          let y = rect.top + window.scrollY
          if (isCta) {
            y += 3450
          }
          window.scrollTo(0, y)
          setTimeout(() => {
            if (lenisInstance) {
              lenisInstance.start()
              lenisInstance.scrollTo(y, { immediate: true })
            }
          }, 100)
        }
      } catch (e) {
        console.error('Invalid selector for location.hash', e)
        restoreScroll()
      }
    } else {
      // Forward navigation: scroll to top
      if (lenisInstance) {
        lenisInstance.stop()
      }
      window.scrollTo(0, 0)
      setTimeout(() => {
        if (lenisInstance) {
          lenisInstance.start()
          lenisInstance.scrollTo(0, { immediate: true })
        }
      }, 100)
    }
  }, [location.pathname, navigationType, location.hash])

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
          <Route
            path="/faq/:slug"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <FaqDetailPage />
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
