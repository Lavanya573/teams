import { Link, useParams } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { getProject, projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import CtaBand from '../components/CtaBand'
import TextReveal from '../components/TextReveal'
import AnimatedSection from '../components/AnimatedSection'
import ImageReveal from '../components/ImageReveal'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  useSeo({
    title: project ? `${project.title} | Teamworks Work` : 'Project not found | Teamworks',
    description: project ? project.overview : 'This project could not be found.',
    path: `/work/${slug}`,
  })
  if (!project) return <NotFound />

  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).concat(
    projects.filter((p) => p.slug !== project.slug && p.category !== project.category),
  ).slice(0, 2)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="crumbs">
            <Link to="/work">Work</Link> / <span aria-current="page">{project.category}</span>
          </nav>
          <TextReveal as="h1" className="display" text={project.title} />
          {project.concept && (
            <p className="notice">Concept project. This is an illustrative brief, not completed client work.</p>
          )}
        </div>
      </section>

      <AnimatedSection className="section-tight">
        <div className="container">
          <ImageReveal>
            <figure className="project-hero">
              <img src={project.image} alt={`${project.title} — ${project.category}`} />
            </figure>
          </ImageReveal>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-tight">
        <div className="container split">
          <dl className="meta-list">
            <div><dt>Category</dt><dd><Link to={`/work?category=${encodeURIComponent(project.category)}`}>{project.category}</Link></dd></div>
            <div><dt>Service</dt><dd><Link to={`/services/${project.service}`}>View service</Link></dd></div>
            <div><dt>Deliverables</dt><dd>{project.deliverables.join(', ')}</dd></div>
          </dl>
          <div className="prose">
            <h2 className="h3">Overview</h2>
            <p className="body-lg">{project.overview}</p>
            <h2 className="h3">Challenge</h2>
            <p className="body-lg">{project.challenge}</p>
            <h2 className="h3">Creative approach</h2>
            <p className="body-lg">{project.approach}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="pd-related">
        <div className="container">
          <h2 id="pd-related" className="h2 section-title">More work.</h2>
          <div className="work-grid">
            {related.map((p) => (<ProjectCard key={p.slug} project={p} />))}
          </div>
        </div>
      </AnimatedSection>

      <CtaBand />
    </>
  )
}
