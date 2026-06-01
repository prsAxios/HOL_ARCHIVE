import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router'
import Header from './sections/Header'
import Philosophy from './sections/Philosophy'
import Services from './sections/Services'
import Team from './sections/Team'
import Capabilities from './sections/Capabilities'
import Hero from './sections/Hero'
import AboutSection from './sections/AboutSection'
import Clients from './sections/Clients'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'
import { ThemeProvider } from './context/ThemeContext'
import { ScrollSmoother, ScrollTrigger } from './lib/gsap-config'

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })

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
      <Routes>
        <Route path="*" element={
          <>
            <Preloader />
            <Header scrollRef={scrollRef} />
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <main>
                  <Hero />
                  <AboutSection />
                  <Philosophy />
                  <Services />
                  <Team />
                  <Capabilities />
                  <Clients />
                  <Testimonials />
                  <Contact />
                </main>
                <Footer />
              </div>
            </div>
          </>
        } />
      </Routes>
    </ThemeProvider>
  )
}

export default App
