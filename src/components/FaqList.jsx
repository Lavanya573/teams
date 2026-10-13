import { motion } from 'framer-motion'
import { faqs } from '../config/site'
import { easeOut, viewportOnce } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function FaqList() {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <motion.details
          key={f.q}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
        >
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </motion.details>
      ))}
    </div>
  )
}
