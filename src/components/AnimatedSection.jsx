import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function AnimatedSection({
  as = 'section',
  children,
  className,
  delay = 0,
  amount,
  ...rest
}) {
  const reduced = usePrefersReducedMotion()
  const MotionTag = motion[as] || motion.section

  return (
    <MotionTag
      className={className}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'show'}
      viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
      variants={fadeUp}
      custom={delay}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
