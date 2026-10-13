import { motion } from 'framer-motion'
import { clipReveal, viewportOnce } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function ImageReveal({ className = '', children, ...rest }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      className={`image-reveal ${className}`}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'show'}
      viewport={viewportOnce}
      variants={clipReveal}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
