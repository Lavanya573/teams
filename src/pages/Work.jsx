import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSeo } from '../hooks/useSeo'
import { categories, projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import CtaBand from '../components/CtaBand'
import TextReveal from '../components/TextReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Work() {
  useSeo({
    title: 'Work | Teamworks Creative Solutions',
    description: 'Selected work across 3D walkthroughs, TVC films, AI innovation, branding, websites and digital marketing.',
    path: '/work',
  })
  const [params, setParams] = useSearchParams()
  const reduced = usePrefersReducedMotion()
  const active = categories.includes(params.get('category')) ? params.get('category') : 'All Work'
  const list = useMemo(
    () => (active === 'All Work' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )
  const choose = (c) => (c === 'All Work' ? setParams({}) : setParams({ category: c }))

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <TextReveal as="h1" className="display" text="Selected Work." />
          <p className="lead">
            These are clearly labelled concept projects. Approved client case studies can be added in <code>src/data/projects.js</code>.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter work by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={active === c && !reduced ? 'has-pill' : ''}
                aria-pressed={active === c}
                onClick={() => choose(c)}
              >
                {active === c && !reduced && (
                  <motion.span
                    className="filter-pill"
                    layoutId="work-filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span className="filter-label">{c}</span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{list.length} project{list.length === 1 ? '' : 's'} shown</p>

          <motion.div layout={!reduced} className="work-grid work-grid-page">
            <AnimatePresence mode="popLayout">
              {list.map((p, index) => (
                <motion.div
                  key={p.slug}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <ProjectCard project={p} ratio="16 / 10" delay={index * 0.04} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length === 0 && <p className="muted">No projects in this category yet.</p>}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
