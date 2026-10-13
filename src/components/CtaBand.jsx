import { motion } from 'framer-motion'
import Button from './Button'
import TextReveal from './TextReveal'
import { easeOut, viewportOnce } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function CtaBand({
  title = 'Have an idea worth building?',
  text = "Let's turn your next project into something remarkable.",
  cta = 'Start your project',
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.section
      className="cta-band"
      aria-labelledby="cta-title"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <div className="container cta-inner">
        <div>
          <TextReveal as="h2" id="cta-title" text={title} inView />
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: 0.12, ease: easeOut }}
          >
            {text}
          </motion.p>
          <Button to="/contact" sweep>{cta}</Button>
        </div>
        <div className="cta-object" aria-hidden="true">
          <span className="co-ring co-a" />
          <span className="co-ring co-b" />
          <span className="co-orb" />
        </div>
      </div>
    </motion.section>
  )
}
