import { motion } from 'framer-motion'
import { easeOut } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function TextReveal({
  text,
  as = 'h1',
  className,
  id,
  delay = 0,
  inView = false,
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = motion[as] || motion.h1
  const words = String(text).split(' ')

  if (reduced) {
    const Static = as === 'h1' ? 'h1' : as === 'h2' ? 'h2' : as === 'p' ? 'p' : as
    const El = Static
    return <El id={id} className={className}>{text}</El>
  }

  return (
    <Tag
      id={id}
      className={`${className || ''} text-reveal`}
      aria-label={text}
      initial="hidden"
      animate={inView ? undefined : 'show'}
      whileInView={inView ? 'show' : undefined}
      viewport={inView ? { once: true, amount: 0.4 } : undefined}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word-mask">
          <motion.span
            className="word"
            variants={{
              hidden: { y: '108%' },
              show: {
                y: 0,
                transition: { duration: 0.7, delay: delay + i * 0.07, ease: easeOut },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
