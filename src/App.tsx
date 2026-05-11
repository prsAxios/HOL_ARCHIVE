import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router'
import Header from './sections/Header'
import Spatial from './sections/Spatial'
import Philosophy from './sections/Philosophy'
import Works from './sections/Works'
import Team from './sections/Team'
import Capabilities from './sections/Capabilities'
import Hero from './sections/Hero'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'
import RoomDetail from './pages/RoomDetail'

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null)

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleSelectRoom = (id: string) => setCurrentRoomId(id)
  const handleBack = () => {
    setCurrentRoomId(null)
    setTimeout(() => {
      document.querySelector('#works')?.scrollIntoView({ behavior: 'auto' })
    }, 0)
  }

  return (
    <Routes>
      <Route path="*" element={
        <>
          <Preloader />
          <Header scrollRef={scrollRef} />
          {currentRoomId ? (
            <div style={{ backgroundColor: '#ffffff' }}>
              <RoomDetail roomId={currentRoomId} onBack={handleBack} />
            </div>
          ) : (
            <main>
              <Spatial />
              <Philosophy />
              <Works scrollRef={scrollRef} onSelectRoom={handleSelectRoom} />
              <Team />
              <Capabilities />
              <Hero />
            </main>
          )}
          <Footer />
        </>
      } />
    </Routes>
  )
}

export default App
