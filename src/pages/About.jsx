import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { company, asset, coreValues } from '../config/site'
import { services } from '../data/services'
import ClientLogos from '../components/ClientLogos'
import CtaBand from '../components/CtaBand'
import FaqList from '../components/FaqList'
import AboutProcess from '../components/AboutProcess'
import TextReveal from '../components/TextReveal'
import AnimatedSection from '../components/AnimatedSection'
import ImageReveal from '../components/ImageReveal'
import CountUp from '../components/CountUp'
import { easeOut, viewportOnce } from '../motion/variants'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function About() {
  const reduced = usePrefersReducedMotion()
  useSeo({
    title: 'About Us | Teamworks Creative Solutions',
    description: 'Since 2001, Teamworks has helped businesses build impactful brands through creativity, strategy and innovation from Hyderabad.',
    path: '/about-us',
  })
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <TextReveal as="h1" className="display" text={`Building brands in Hyderabad since ${company.since}.`} />
          <p className="lead">
            Since {company.since}, Teamworks has been helping businesses build impactful brands through creativity, strategy and innovation.
          </p>
        </div>
      </section>

      <AnimatedSection className="section-tight">
        <div className="container intro-grid">
          <div>
            <h2 className="h2">One team for strategy, design, production and growth.</h2>
            <p className="body-lg">
              We are a full-service creative and digital marketing agency specializing in 3D walkthroughs, TVC films, SEO services, digital marketing and branding, UI/UX design, AI innovation and digital experiences that drive business growth and brand visibility.
            </p>
            <p className="body-lg">
              Our approach combines creative design, advanced technology and data-driven marketing to build strong brand presence, attract the right audience and generate measurable results.
            </p>
          </div>
          <ImageReveal>
            <figure className="framed">
              <img src={asset('service-branding.webp')} alt="Teamworks branding project preview" loading="lazy" decoding="async" />
            </figure>
          </ImageReveal>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section section-warm" aria-labelledby="ab-numbers">
        <div className="container">
          <h2 id="ab-numbers" className="h3 section-title">Teamworks in numbers</h2>
          <dl className="stat-row big">
            {company.stats.map((s) => (
              <div key={s.label}><dt>{s.label}</dt><dd><CountUp value={s.value} /></dd></div>
            ))}
          </dl>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="ab-values">
        <div className="container">
          <p className="about-kicker">Our core values</p>
          <h2 id="ab-values" className="h2 section-title">The principles behind our work.</h2>
          <ul className="core-values-list">
            {coreValues.map((value) => (
              <li key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="ab-timeline">
        <div className="container split">
          <div className="split-sticky"><h2 id="ab-timeline" className="h2">Our journey.</h2></div>
          <ol className="timeline">
            <motion.li
              initial={reduced ? false : { opacity: 0, x: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, ease: easeOut }}
            >
              <span className="year">{company.since}</span>
              <p>Teamworks begins helping businesses build impactful brands from Hyderabad.</p>
            </motion.li>
            <motion.li
              initial={reduced ? false : { opacity: 0, x: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.12, ease: easeOut }}
            >
              <span className="year">Today</span>
              <p>A full-service creative and digital agency with 25+ years of experience, 1000+ projects delivered and 100+ global clients.</p>
            </motion.li>
          </ol>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section section-warm" aria-labelledby="ab-process">
        <div className="container">
          <div className="about-process-heading">
            <p className="about-kicker">Our process</p>
            <h2 id="ab-process" className="h2">Our proven framework.</h2>
            <p className="body-lg">A four-step approach that takes your vision from discovery to a high-performing reality.</p>
          </div>
          <AboutProcess />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section section-soft" aria-labelledby="ab-cap">
        <div className="container">
          <h2 id="ab-cap" className="h2 section-title">Creative capabilities.</h2>
          <ul className="capability-list">
            {services.map((s, index) => (
              <motion.li
                key={s.slug}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, delay: index * 0.06, ease: easeOut }}
              >
                <Link to={`/services/${s.slug}`}>{s.title}</Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="ab-clients">
        <div className="container">
          <h2 id="ab-clients" className="h3 section-title">Trusted by leading brands worldwide</h2>
          <ClientLogos />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section section-warm" aria-labelledby="ab-faq">
        <div className="container split">
          <div className="split-sticky">
            <p className="about-kicker">FAQ</p>
            <h2 id="ab-faq" className="h2">Got questions?</h2>
            <p className="body-lg">Everything you need to know about working with Teamworks Creative Solutions. Can&apos;t find your answer? Reach out directly.</p>
            <Link to="/contact" className="link-arrow">Contact us</Link>
          </div>
          <FaqList />
        </div>
      </AnimatedSection>

      <CtaBand title="Want to talk about a project?" text="Tell us what you are planning and we will guide you to the right strategy." cta="Discuss your project" />
    </>
  )
}
