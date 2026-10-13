import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { services } from '../data/services'
import ServiceProcess from '../components/ServiceProcess'
import FaqList from '../components/FaqList'
import CtaBand from '../components/CtaBand'
import TextReveal from '../components/TextReveal'
import AnimatedSection from '../components/AnimatedSection'

const markets = [
  ['Real Estate', 'Pre-launch visualization, sales centers and campaign films for developers and brokers.'],
  ['Healthcare', 'Trust-led identity, patient education and facility walkthroughs for hospitals and clinics.'],
  ['Education', 'Admission campaigns, campus films and brand systems for institutions of every scale.'],
  ['Hospitality', 'Property storytelling, immersive walkthroughs and seasonal campaigns for hotels and resorts.'],
  ['Retail', 'Packaging, in-store collateral and performance creative that moves products.'],
  ['Technology', 'Product narratives, explainer films and conversion-led websites for SaaS and platforms.'],
  ['Manufacturing', 'Factory films, capability decks and B2B brand systems that win serious contracts.'],
  ['Corporate Services', 'Investor-grade films, recruitment campaigns and identity work for professional firms.'],
]

export default function Services() {
  useSeo({
    title: 'Services | Teamworks Creative Solutions',
    description: '3D walkthroughs, TVC films, AI innovation, branding, website UI/UX design and digital marketing from Teamworks in Hyderabad.',
    path: '/services',
  })
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <TextReveal as="h1" className="display" text="Creative Solutions for Ambitious Brands." />
          <p className="lead">End-to-end creative and digital services, delivered by one experienced team in Hyderabad.</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <h2 className="h2 section-title">Services built to move your business forward.</h2>
          <div className="service-directory">
            {services.map((service, index) => (
              <AnimatedSection as="article" key={service.slug} className="service-directory-item" delay={index * 0.04}>
                <span className="service-directory-number">{String(index + 1).padStart(2, '0')}</span>
                <h3><Link to={`/services/${service.slug}`}>{service.title}</Link></h3>
                <p>{service.short}</p>
                <Link to={`/services/${service.slug}`} className="link-arrow">Explore {service.title}</Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="section section-warm" aria-labelledby="svc-markets">
        <div className="container">
          <h2 id="svc-markets" className="h2 section-title">Built for the markets you serve.</h2>
          <div className="market-grid">
            {markets.map(([name, description], index) => (
              <AnimatedSection as="article" key={name} className="market-item" delay={index * 0.04}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{name}</h3>
                <p>{description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="svc-process">
        <div className="container">
          <p className="about-kicker">Our process</p>
          <h2 id="svc-process" className="h2">How we deliver success.</h2>
          <ServiceProcess />
        </div>
      </AnimatedSection>

      <AnimatedSection className="section" aria-labelledby="svc-faq">
        <div className="container split">
          <div className="split-sticky"><h2 id="svc-faq" className="h2">Common questions.</h2></div>
          <FaqList />
        </div>
      </AnimatedSection>

      <CtaBand />
    </>
  )
}
