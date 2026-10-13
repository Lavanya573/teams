import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const HeroScene = lazy(() => import('./HeroScene'))

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

export function SculptureFallback() {
  return (
    <div className="sculpture-fallback" aria-hidden="true">
      <span className="sf-ring sf-ring-a" />
      <span className="sf-ring sf-ring-b" />
      <span className="sf-ring sf-ring-c" />
      <span className="sf-core" />
      <span className="sf-shadow" />
    </div>
  )
}

export default function HeroVisual() {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const [compact, setCompact] = useState(false)
  const [supported] = useState(() => webglAvailable())

  useEffect(() => {
    const start = () => setReady(true)
    const id = 'requestIdleCallback' in window
      ? window.requestIdleCallback(start, { timeout: 600 })
      : window.setTimeout(start, 150)
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const fallback = <SculptureFallback />
  return (
    <div className="hero-visual" ref={wrapRef} role="img" aria-label="Abstract chrome and glass sculpture">
      {!supported || !ready ? (
        fallback
      ) : (
        <SceneBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <HeroScene active={visible} reduced={reduced} compact={compact} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  )
}
