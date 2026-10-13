import { useState } from 'react'
import { Link } from 'react-router-dom'
import { logoSources, company } from '../config/site'

// Uses the ORIGINAL Teamworks logo file from the live site (or your local copy after `npm run fetch-assets`).
// It is never redrawn, recoloured, cropped or stretched: only the height is set, width stays automatic.
export default function Logo({ height = 38 }) {
  const [index, setIndex] = useState(0)
  const failed = index >= logoSources.length
  return (
    <Link to="/" className="logo" aria-label={`${company.short} home`}>
      {failed ? (
        <span className="logo-text">{company.short}</span>
      ) : (
        <img
          src={logoSources[index]}
          alt={company.short}
          height={height}
          style={{ height, width: 'auto' }}
          onError={() => setIndex((i) => i + 1)}
        />
      )}
    </Link>
  )
}
