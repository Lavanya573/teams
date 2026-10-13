import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { company } from '../config/site'
import { services } from '../data/services'
import { easeOut, viewportOnce } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Footer() {
  const reduced = usePrefersReducedMotion()
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07, ease: easeOut } }),
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <motion.div
          className="footer-brand"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={viewportOnce}
          variants={item}
          custom={0}
        >
          <Logo height={40} />
          <p>A Hyderabad-based creative and digital solutions company with 25+ years of excellence, helping brands grow through creativity and innovation.</p>
          <ul className="social" aria-label="Social media">
            {company.social.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
        </motion.div>

        <motion.nav
          aria-label="Quick links"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={viewportOnce}
          variants={item}
          custom={1}
        >
          <h2 className="footer-title">Quick links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/work">Work</Link></li>
            <li><Link to="/blog">Blogs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </motion.nav>

        <motion.nav
          aria-label="Services"
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={viewportOnce}
          variants={item}
          custom={2}
        >
          <h2 className="footer-title">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>
            ))}
          </ul>
        </motion.nav>

        <motion.div
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={viewportOnce}
          variants={item}
          custom={3}
        >
          <h2 className="footer-title">Contact</h2>
          <address>
            {company.address.map((l) => (<span key={l}>{l}<br /></span>))}
          </address>
          <p className="footer-contact">
            <a href={company.phoneHref}>{company.phone}</a><br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </motion.div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {company.name} Pvt. Ltd. All rights reserved.</p>
        <ul>
          <li><a href={company.external.privacy} target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          <li><Link to="/contact">Terms of Use</Link></li>
        </ul>
      </div>
    </footer>
  )
}
