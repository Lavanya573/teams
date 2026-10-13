import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { easeOut } from '../motion/variants'
import { useFinePointer } from '../hooks/useFinePointer'
import { usePointerTilt } from '../hooks/usePointerTilt'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function FlavorArt({ slug }) {
  if (slug === 'ai-innovation') {
    return (
      <svg className="flavor-svg" viewBox="0 0 120 64" aria-hidden="true">
        <line x1="18" y1="32" x2="60" y2="18" />
        <line x1="60" y1="18" x2="102" y2="32" />
        <line x1="18" y1="32" x2="60" y2="46" />
        <line x1="60" y1="46" x2="102" y2="32" />
        <circle cx="18" cy="32" r="4" />
        <circle cx="60" cy="18" r="4" />
        <circle cx="102" cy="32" r="4" />
        <circle cx="60" cy="46" r="4" />
      </svg>
    )
  }
  if (slug === 'digital-marketing') {
    return (
      <svg className="flavor-svg spark" viewBox="0 0 140 56" aria-hidden="true">
        <polyline points="6,46 28,38 46,42 68,22 90,28 112,12 134,16" fill="none" />
      </svg>
    )
  }
  if (slug === 'website-ui-ux-design') {
    return <span className="flavor-ui" aria-hidden="true"><i /><i /><i /></span>
  }
  if (slug === 'branding') {
    return <span className="flavor-layers" aria-hidden="true"><i /><i /></span>
  }
  return null
}

export default function ServiceCard({ service, className = '', ratio = '16 / 10', delay = 0 }) {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer()
  const tiltRef = usePointerTilt(fine && !reduced, 5)
  const flavor = `flavor-${service.slug}`

  return (
    <motion.div
      className={`service-card-wrap ${flavor}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: easeOut }}
    >
      <Link to={`/services/${service.slug}`} className={`service-card ${className}`}>
        <div ref={tiltRef} className="service-tilt">
          <figure style={{ aspectRatio: ratio }}>
            <img src={service.image} alt="" loading="lazy" decoding="async" />
            <span className="flavor-frame" aria-hidden="true" />
            <FlavorArt slug={service.slug} />
          </figure>
          <div className="service-card-body">
            <h3>{service.title}</h3>
            <p>{service.short}</p>
            <span className="link-arrow">Learn more</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
