import { motion, useScroll, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function ScrollProgress() {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })

  if (reduced) return null

  return (
    <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
  )
}
