import { motion } from 'framer-motion'
import { process } from '../config/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const points = [
  { x: '12%', y: '70%' },
  { x: '37%', y: '50%' },
  { x: '63%', y: '32%' },
  { x: '88%', y: '12%' },
]

export default function AboutProcess() {
  const reduced = usePrefersReducedMotion()

  return (
    <ol className="process-curve">
      <svg className="process-curve-line" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 300 C80 325 105 360 120 350 C210 345 280 230 370 250 C470 280 520 310 630 160 C720 40 790 50 880 60 C930 65 970 45 1000 30"
        />
        {[{ x: 120, y: 350 }, { x: 370, y: 250 }, { x: 630, y: 160 }, { x: 880, y: 60 }].map((point) => (
          <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="5" />
        ))}
      </svg>
      {process.map((step, index) => (
        <motion.li
          className="process-curve-step"
          key={step.title}
          style={{ '--point-x': points[index].x, '--point-y': points[index].y }}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="process-curve-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div className="process-curve-copy">
            <span className="process-curve-label">Step {String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}