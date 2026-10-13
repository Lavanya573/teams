import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { services } from '../data/services'
import { company } from '../config/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact'
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const initialValues = { name: '', email: '', phone: '+91 ', service: '', subject: '', website: '' }

export default function ContactModal({ open, onClose }) {
  const reduced = usePrefersReducedMotion()
  const dialogRef = useRef(null)
  const formRef = useRef(null)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
    setServerError('')
    const frame = window.requestAnimationFrame(() => formRef.current?.querySelector('input')?.focus())

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const controls = [...(dialogRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled)') || [])]
      if (!controls.length) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [open, onClose])

  const set = (name) => (event) => setValues((current) => ({ ...current, [name]: event.target.value }))

  const onSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Enter your name.'
    if (!values.email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!emailRe.test(values.email.trim())) nextErrors.email = 'Enter a valid email address.'
    if (values.phone.trim().length < 7) nextErrors.phone = 'Enter a phone number.'
    if (!values.service) nextErrors.service = 'Choose a service.'
    if (values.subject.trim().length < 10) nextErrors.subject = 'Add at least 10 characters.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      formRef.current?.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus()
      return
    }

    setStatus('submitting')
    setServerError('')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: values.service,
          message: values.subject,
          website: values.website,
          source: 'website-contact-popup',
        }),
      })
      if (!response.ok) {
        let message = ''
        try { message = (await response.json()).error || '' } catch { /* ignore */ }
        throw new Error(message || `Request failed (${response.status})`)
      }
      setStatus('success')
    } catch (error) {
      setServerError(error.message)
      setStatus('error')
    }
  }

  const field = (name) => ({
    id: `popup-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `popup-${name}-error` : undefined,
  })
  const error = (name) => errors[name] && <span className="field-error" id={`popup-${name}-error`}>{errors[name]}</span>

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-modal-backdrop"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
        >
          <motion.div
            ref={dialogRef}
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-description"
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <header className="contact-modal-header">
              <div>
                <h2 id="contact-modal-title">Let&apos;s Work Together</h2>
                <p id="contact-modal-description">Tell us about your project and we&apos;ll get back to you shortly.</p>
              </div>
              <button type="button" className="contact-modal-close" aria-label="Close enquiry form" onClick={onClose}>
                <span aria-hidden="true">×</span>
              </button>
            </header>

            {status === 'success' ? (
              <div className="contact-modal-success" role="status">
                <h3>Thank you, {values.name.split(' ')[0] || 'there'}.</h3>
                <p>We&apos;ve received your enquiry and will reply to {values.email} soon.</p>
                <button type="button" className="btn btn-primary" onClick={onClose}>Close</button>
              </div>
            ) : (
              <form ref={formRef} className="contact-modal-form" onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label htmlFor="popup-name">Name <span aria-hidden="true">*</span></label>
                  <input type="text" autoComplete="name" required {...field('name')} />
                  {error('name')}
                </div>
                <div className="field">
                  <label htmlFor="popup-email">Email <span aria-hidden="true">*</span></label>
                  <input type="email" autoComplete="email" required {...field('email')} />
                  {error('email')}
                </div>
                <div className="field">
                  <label htmlFor="popup-phone">Phone Number <span aria-hidden="true">*</span></label>
                  <input type="tel" autoComplete="tel" required {...field('phone')} />
                  {error('phone')}
                </div>
                <div className="field">
                  <label htmlFor="popup-service">Services Looking For <span aria-hidden="true">*</span></label>
                  <select required {...field('service')}>
                    <option value="">Choose a service</option>
                    {services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  {error('service')}
                </div>
                <div className="field">
                  <label htmlFor="popup-subject">Subject <span aria-hidden="true">*</span></label>
                  <input type="text" required {...field('subject')} />
                  {error('subject')}
                </div>
                <div className="hp" aria-hidden="true">
                  <label htmlFor="popup-website">Leave this field empty</label>
                  <input type="text" tabIndex={-1} autoComplete="off" {...field('website')} />
                </div>
                {status === 'error' && (
                  <p className="form-error" role="alert">
                    We could not send your enquiry: {serverError}. Please try again, or email{' '}
                    <a href={`mailto:${company.email}`}>{company.email}</a>.
                  </p>
                )}
                <button className="btn btn-primary btn-sweep contact-modal-submit" type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}