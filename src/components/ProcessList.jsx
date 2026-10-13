import { motion } from 'framer-motion'
import { process } from '../config/site'
import { easeOut, viewportOnce } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function ProcessList() {
  const reduced = usePrefersReducedMotion()

  return (
    <ol className="process-list">
      {process.map((step, i) => (
        <motion.li
          key={step.title}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, delay: i * 0.08, ease: easeOut }}
        >
          <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
