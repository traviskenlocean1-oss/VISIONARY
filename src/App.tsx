import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import VLogo from './components/VLogo'

function IntroScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 2000)
    const t2 = setTimeout(() => onDone(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <motion.div
        className="absolute left-0 right-0 top-0"
        style={{ height: '50%', background: '#000' }}
        animate={phase === 'out' ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute left-0 right-0 bottom-0"
        style={{ height: '50%', background: '#000' }}
        animate={phase === 'out' ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
        style={{ zIndex: 10 }}
        animate={phase === 'out' ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <VLogo size={64} showText={false} />
        </motion.div>
        <motion.p
          className="text-[11px] font-bold uppercase"
          style={{ color: '#E1E0CC' }}
          initial={{ opacity: 0, letterSpacing: '0.15em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Visionary Web Studio
        </motion.p>
        <div
          className="relative overflow-hidden"
          style={{ width: 120, height: 1, background: 'rgba(96,165,250,0.2)' }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{ background: '#3b82f6' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const [showIntro] = useState(() => !sessionStorage.getItem('vws-intro'))
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  const handleIntroDone = () => {
    sessionStorage.setItem('vws-intro', '1')
  }

  return (
    <div
      className="bg-black min-h-screen"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `radial-gradient(700px at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.07), transparent 80%)`,
        }}
      />

      {showIntro && <IntroScreen onDone={handleIntroDone} />}

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  )
}
