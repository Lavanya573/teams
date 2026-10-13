import { motion, useSpring } from 'framer-motion'
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
  const pointerX = useSpring(0, { stiffness: 120, damping: 20 })
  const pointerY = useSpring(0, { stiffness: 120, damping: 20 })
  const moveObject = (event) => {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 18)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 18)
  }
  const resetObject = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

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
        <motion.div
          className="cta-object"
          aria-hidden="true"
          style={reduced ? undefined : { x: pointerX, y: pointerY }}
          onPointerMove={moveObject}
          onPointerLeave={resetObject}
        >
          <span className="co-ring co-a" />
          <span className="co-ring co-b" />
          <span className="co-orb" />
        </motion.div>
      </div>
    </motion.section>
  )
}
