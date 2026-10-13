import { clients } from '../data/clients'
import { asset } from '../config/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function ClientLogos() {
  const reduced = usePrefersReducedMotion()
  const groups = reduced ? [false] : [false, true]
  return (
    <div
      className={`client-marquee ${reduced ? 'is-static' : ''}`}
      role="region"
      aria-label="Trusted client brands"
      tabIndex={0}
    >
      <div className="client-marquee-track">
        {groups.map((duplicate) => (
          <ul className="client-marquee-group" key={duplicate ? 'duplicate' : 'original'} aria-hidden={duplicate || undefined}>
            {clients.map((client) => (
              <li key={client.name}>
                <img src={asset(client.file)} alt={duplicate ? '' : client.name} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
