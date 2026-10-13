import { useSeo } from '../hooks/useSeo'
import Button from '../components/Button'
import TextReveal from '../components/TextReveal'

export default function NotFound() {
  useSeo({ title: 'Page not found | Teamworks', description: 'This page could not be found.', path: '/404' })
  return (
    <section className="page-hero">
      <div className="container">
        <TextReveal as="h1" className="display" text="This page does not exist." />
        <p className="lead">The link may be old or mistyped. Try the homepage or tell us what you were looking for.</p>
        <div className="hero-actions">
          <Button to="/">Go to homepage</Button>
          <Button to="/contact" variant="ghost">Contact us</Button>
        </div>
      </div>
    </section>
  )
}
