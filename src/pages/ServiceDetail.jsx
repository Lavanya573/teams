import { Link, useParams } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { getService, services } from '../data/services'
import { projects } from '../data/projects'
import { company } from '../config/site'
import Button from '../components/Button'
import ProcessList from '../components/ProcessList'
import CtaBand from '../components/CtaBand'
import TextReveal from '../components/TextReveal'
import AnimatedSection from '../components/AnimatedSection'
import ImageReveal from '../components/ImageReveal'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  useSeo({
    title: service ? `${service.title} | Teamworks Creative Solutions` : 'Service not found | Teamworks',
    description: service ? service.short : 'This service page could not be found.',
    path: `/services/${slug}`,
  })
  if (!service) return <NotFound />

  const related = projects.filter((p) => p.service === service.slug)
  const idx = services.findIndex((s) => s.slug === service.slug)
  const next = services[(idx + 1) % services.length]

  return (
    <>
      <section className="page-hero">
        <div className="container service-hero">
          <div>
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link to="/services">Services</Link> / <span aria-current="page">{service.title}</span>
            </nav>
            <TextReveal as="h1" className="display service-title" text={service.headline} />
            <p className="lead">{service.intro}</p>
            <div className="hero-actions">
              <Button to="/contact" sweep>Start a project</Button>
              <Button to={`/work?category=${encodeURIComponent(service.categoryLabel)}`} variant="ghost">See related work</Button>
            </div>
          </div>
          <ImageReveal>
            <figure className="service-hero-media">
              <img src={service.image} alt={`${service.title} at Teamworks`} />
            </figure>
          </ImageReveal>
        </div>
      </section>

      <nav className="section-jump" aria-label="On this page">
        <div className="container">
          <a href="#deliver">What we deliver</a>
          <a href="#sd-process">How we work</a>
          {related.length > 0 && <a href="#sd-work">Related work</a>}
        </div>
      </nav>

      <AnimatedSection className="section-tight" id="deliver">
        <div className="container two-col">
          <div>
            <h2 className="h3">What we deliver</h2>
            <ul className="tick-list large">
              {service.delivers.map((d) => (<li key={d}>{d}</li>))}
            </ul>
          </div>
          <div>
            <h2 className="h3">Where it applies</h2>
            <ul className="tick-list large">
              {service.applications.map((d) => (<li key={d}>{d}</li>))}
            </ul>
            {service.slug === '3d-walkthroughs' && (
              <p className="note">
                Looking for an interactive tour? See our{' '}
                <a href={company.external.virtualTour} target="_blank" rel="noopener noreferrer">360° Virtual Tour</a>.
              </p>
            )}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section section-warm" aria-labelledby="sd-process" id="sd-process">
        <div className="container split">
          <div className="split-sticky"><h2 className="h2">How we work.</h2></div>
          <ProcessList />
        </div>
      </AnimatedSection>

      {related.length > 0 && (
        <AnimatedSection className="section" aria-labelledby="sd-work" id="sd-work">
          <div className="container">
            <div className="section-head">
              <h2 className="h2">Related work.</h2>
              <Button to={`/work?category=${encodeURIComponent(service.categoryLabel)}`} variant="ghost">
                View all work
              </Button>
            </div>
            <div className="related-work-list">
              {related.map((project) => (
                <Link key={project.slug} to={`/work/${project.slug}`} className="related-work-link">
                  <span>
                    <span className="related-work-category">{project.category} · {project.concept ? 'Concept project' : 'Selected work'}</span>
                    <span className="related-work-title">{project.title}</span>
                  </span>
                  <span className="related-work-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      <section className="section-tight">
        <div className="container next-link">
          <span>Next service</span>
          <Link to={`/services/${next.slug}`} className="h3">{next.title}</Link>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
