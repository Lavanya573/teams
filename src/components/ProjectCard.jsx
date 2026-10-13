import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { easeOut } from '../motion/variants'
import { useFinePointer } from '../hooks/useFinePointer'
import { usePointerTilt } from '../hooks/usePointerTilt'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function ProjectCard({ project, ratio = project.ratio }) {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer()
  const tiltRef = usePointerTilt(fine && !reduced, 4)

  return (
    <motion.div
      className="project-card-wrap"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <Link to={`/work/${project.slug}`} className="project-card">
        <div ref={tiltRef} className="project-tilt">
          <figure style={{ aspectRatio: ratio }}>
            <img src={project.image} alt={`${project.title} — ${project.category}`} loading="lazy" decoding="async" />
            {project.concept && <span className="badge">Concept project</span>}
            <span className="project-veil" aria-hidden="true" />
          </figure>
          <div className="project-meta">
            <h3>{project.title}</h3>
            <p>
              {project.category}
              <span className="project-arrow" aria-hidden="true">→</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
