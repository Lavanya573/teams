import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { easeOut } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function CountUp({ value }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.7 })
  const match = String(value).match(/[\d.]+/)
  const target = match ? Number(match[0]) : 0
  const suffix = match ? String(value).slice(match.index + match[0].length) : ''
  const decimals = match?.[0].split('.')[1]?.length || 0
  const count = useMotionValue(reduced ? target : 0)
  const display = useTransform(count, (latest) => `${Number(latest.toFixed(decimals))}${suffix}`)

  useEffect(() => {
    if (reduced) {
      count.set(target)
      return
    }
    if (!inView) return

    const controls = animate(count, target, { duration: 1.6, ease: easeOut })
    return () => controls.stop()
  }, [count, inView, reduced, target])

  return (
    <span ref={ref}>
      <motion.span aria-hidden="true">{display}</motion.span>
      <span className="sr-only">{String(value)}</span>
    </span>
  )
}
