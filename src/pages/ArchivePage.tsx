import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ArchiveExplorer from '../components/ArchiveExplorer'
import { useTheme } from '../context/ThemeContext'

export default function ArchivePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        backgroundColor: isDark ? '#000000' : '#FFFFFF',
        color: isDark ? '#FFFFFF' : '#1A1A1A',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: "'Sora', sans-serif",
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}
    >
      <ArchiveExplorer />
    </motion.div>
  )
}

