import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'
import { services } from '../data/services'
import { company } from '../config/site'
import { easeOut } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function NavItem({ to, end, children }) {
  return (
    <NavLink to={to} end={end} className="nav-link">
      {({ isActive }) => (
        <>
          {children}
          {isActive && (
            <motion.span className="nav-line" layoutId="nav-line" transition={{ duration: 0.32, ease: easeOut }} />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef(null)
  const drawerRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) drawerRef.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (!open) return
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const items = [toggleRef.current, ...drawerRef.current.querySelectorAll('a')].filter(Boolean)
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      className={`site-header ${scrolled || open ? 'is-scrolled' : ''}`}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <div className="container header-inner">
        <Logo />

        <nav className="nav-desktop" aria-label="Primary">
          <NavItem to="/" end>Home</NavItem>
          <NavItem to="/about-us">About Us</NavItem>
          <div className="has-menu">
            <NavItem to="/services" end>Services</NavItem>
            <div className="menu" role="group" aria-label="Services">
              {services.map((s) => (
                <NavLink key={s.slug} to={`/services/${s.slug}`}>{s.title}</NavLink>
              ))}
              <a href={company.external.virtualTour} target="_blank" rel="noopener noreferrer">360° Virtual Tour</a>
            </div>
          </div>
          <NavItem to="/work">Work</NavItem>
          <NavItem to="/blog">Blogs</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </nav>

        <div className="header-actions">
          <Button to="/contact" className="btn-sm header-cta">Start a project</Button>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="bars" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={drawerRef}
            className="drawer open"
            initial={reduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: easeOut }}
          >
            <nav aria-label="Mobile">
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/about-us">About Us</NavLink>
              <NavLink to="/services" end>Services</NavLink>
              <ul className="drawer-sub">
                {services.map((s) => (
                  <li key={s.slug}><NavLink to={`/services/${s.slug}`}>{s.title}</NavLink></li>
                ))}
              </ul>
              <NavLink to="/work">Work</NavLink>
              <NavLink to="/blog">Blogs</NavLink>
              <a href={company.external.virtualTour} target="_blank" rel="noopener noreferrer">360° Virtual Tour</a>
              <Button to="/contact" className="drawer-cta" onClick={() => setOpen(false)}>
                Start a project
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
