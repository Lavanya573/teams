import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const steps = [
  {
    title: 'Understand',
    text: "We listen first — to your business, your audience and the gap you're closing. A short intake turns vague briefs into measurable objectives.",
  },
  {
    title: 'Plan',
    text: 'We shape the strategy, scope, schedule and channels around your goals before production begins.',
  },
  {
    title: 'Create',
    text: 'Directors, designers, animators, developers and marketers assemble around your brief.',
  },
  {
    title: 'Refine',
    text: 'Structured review rounds keep feedback focused. We protect the idea while sharpening the craft.',
  },
  {
    title: 'Launch',
    text: 'Files, formats, tracking and handover are rehearsed, not improvised, so day one performs.',
  },
  {
    title: 'Support',
    text: 'Post-launch iteration, performance reporting and creative refreshes keep the work earning its place.',
  },
]

export default function ServiceProcess() {
  const reduced = usePrefersReducedMotion()

  return (
    <ol className="service-process">
      {steps.map((step, index) => (
        <motion.li
          className="service-process-item"
          key={step.title}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="service-process-copy">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
          <span className="service-process-marker" aria-label={`Step ${String(index + 1).padStart(2, '0')}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.li>
      ))}
    </ol>
  )
}