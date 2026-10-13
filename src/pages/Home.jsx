import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import Button from '../components/Button'
import HeroVisual from '../components/HeroVisual'
import ClientLogos from '../components/ClientLogos'
import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import ProcessList from '../components/ProcessList'
import FaqList from '../components/FaqList'
import CtaBand from '../components/CtaBand'
import TextReveal from '../components/TextReveal'
import AnimatedSection from '../components/AnimatedSection'
import ImageReveal from '../components/ImageReveal'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { company, asset } from '../config/site'
import { easeOut, stagger } from '../motion/variants'

export default function Home() {
  const reduced = usePrefersReducedMotion()
  useSeo({
    title: 'Teamworks | Creative Marketing Agency in Hyderabad',
    description: 'Teamworks is a creative agency in Hyderabad specializing in 3D walkthroughs, TVC films, AI innovation, branding, UI/UX design, and digital marketing.',
    path: '/',
  })

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <motion.div className="hero-copy" initial={reduced ? false : 'hidden'} animate="show" variants={stagger}>
            <TextReveal as="h1" id="hero-title" text="Ideas Beyond Imagination." className="hero-title" />
            <motion.p
              className="lead"
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.28, ease: easeOut } } }}
            >
              Where creativity, technology and strategy come together to build meaningful brand experiences.
            </motion.p>
            <motion.div
              className="hero-actions"
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.4, ease: easeOut } } }}
            >
              <Button to="/contact" sweep>Start a Project</Button>
              <Button to="/work" variant="ghost">Explore Our Work</Button>
            </motion.div>
            <motion.p
              className="hero-note"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, delay: 0.52 } } }}
            >
              Creative and digital agency in Hyderabad, building brands since {company.since}.
            </motion.p>
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: easeOut }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      <AnimatedSection className="section section-warm" aria-labelledby="intro-title">
        <div className="container intro-grid">
          <div>
            <h2 id="intro-title" className="h2">We build brands with 25+ years of creative experience.</h2>
            <p className="body-lg">
              Teamworks Creative Solutions brings strategy, design, production and digital marketing together for businesses that want sharper visibility, stronger stories and work that feels built for real audiences.
            </p>
            <p className="body-lg">
              Based in Hyderabad since {company.since}, we are a full-service creative and digital marketing agency covering 3D walkthroughs, TVC films, AI innovation, branding, UI/UX design and digital marketing.
            </p>
            <Link to="/about-us" className="link-arrow">About Us</Link>
          </div>
          <div className="intro-visual">
            <ImageReveal>
              <figure>
                <img src={asset('service-branding.webp')} alt="Teamworks branding project preview" loading="lazy" decoding="async" />
              </figure>
            </ImageReveal>
            <dl className="stat-row">
              {company.stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="clients-title">
        <div className="container">
          <h2 id="clients-title" className="h3 section-title">Trusted by leading brands worldwide</h2>
          <ClientLogos />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section section-soft" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <h2 id="services-title" className="h2">Six ways we help brands grow.</h2>
            <Button to="/services" variant="ghost">All services</Button>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} ratio="16 / 10" />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 id="work-title" className="h2">Selected Work.</h2>
              <p className="muted">Concept projects shown until approved case studies are added.</p>
            </div>
            <Button to="/work" variant="ghost">View All Work</Button>
          </div>
          <div className="work-grid">
            {projects.slice(0, 4).map((p) => (
              <ProjectCard key={p.slug} project={p} ratio="16 / 10" />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section section-warm" aria-labelledby="process-title">
        <div className="container split">
          <div className="split-sticky">
            <h2 id="process-title" className="h2">Our proven framework.</h2>
            <p className="body-lg">A four-step approach that takes your vision from discovery to a high-performing reality.</p>
          </div>
          <ProcessList />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="faq-title">
        <div className="container split">
          <div className="split-sticky">
            <h2 id="faq-title" className="h2">Got questions?</h2>
            <p className="body-lg">Everything you need to know about working with Teamworks. Can&apos;t find your answer? Reach out directly.</p>
            <Button to="/contact" variant="ghost">Contact us</Button>
          </div>
          <FaqList />
        </div>
      </AnimatedSection>

      <CtaBand />
    </>
  )
}
