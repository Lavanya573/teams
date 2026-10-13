import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Logo from './components/Logo'
import ScrollToTop from './components/ScrollToTop'
import ScrollProgress from './components/ScrollProgress'
import ContactModal from './components/ContactModal'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Work from './pages/Work'
import Blog from './pages/Blog'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { pageFade } from './motion/variants'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

export default function App() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const [showIntro, setShowIntro] = useState(() => !reduced)
  const [contactOpen, setContactOpen] = useState(false)
  const closeContact = useCallback(() => setContactOpen(false), [])

  useEffect(() => {
    const openContact = () => setContactOpen(true)
    window.addEventListener('teamworks:contact-open', openContact)
    return () => window.removeEventListener('teamworks:contact-open', openContact)
  }, [])

  useEffect(() => {
    if (!showIntro) return
    const timer = window.setTimeout(() => {
      setShowIntro(false)
    }, 1600)
    return () => window.clearTimeout(timer)
  }, [showIntro])

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="brand-intro"
            className="brand-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          >
            <motion.div
              className="brand-intro-inner"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="brand-logo-wrap"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              >
                <Logo height={56} />
              </motion.div>
              <motion.span
                className="brand-word"
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
              >
                TEAMWORKS
              </motion.span>
              <motion.span
                className="brand-sub"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              >
                CREATIVE SOLUTIONS
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`app-shell ${showIntro ? 'intro-active' : ''}`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <ScrollProgress />
        <ScrollToTop />
        <Header />
        <main id="main" tabIndex={-1}>
          <motion.div
            key={location.pathname}
            initial={reduced ? false : pageFade.initial}
            animate={pageFade.animate}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/work" element={<Work />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </main>
        <Footer />
      </div>
      <ContactModal open={contactOpen} onClose={closeContact} />
    </>
  )
}
