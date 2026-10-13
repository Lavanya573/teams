import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { company } from '../config/site'
import { services } from '../data/services'
import Button from '../components/Button'
import TextReveal from '../components/TextReveal'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact'
const budgets = ['Not sure yet', 'Under ₹1 lakh', '₹1–5 lakh', '₹5–15 lakh', '₹15 lakh and above']
const timelines = ['Flexible', 'Within a month', '1–3 months', '3+ months']
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact() {
  useSeo({
    title: 'Contact | Teamworks Creative Solutions',
    description: 'Start a project with Teamworks. Call, email or send a project enquiry to our Hyderabad team.',
    path: '/contact',
  })
  const [params] = useSearchParams()
  const [values, setValues] = useState({
    name: '', email: '', phone: '', company: '', service: params.get('service') || '', message: '', budget: '', timeline: '', website: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!values.name.trim()) e.name = 'Enter your name.'
    if (!values.email.trim()) e.email = 'Enter your email address.'
    else if (!emailRe.test(values.email.trim())) e.email = 'Enter a valid email address, for example name@company.com.'
    if (!values.service) e.service = 'Choose the service you need.'
    if (values.message.trim().length < 10) e.message = 'Tell us a little about the project (at least 10 characters).'
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (status === 'submitting' || status === 'success') return // block repeat submissions
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0]
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('submitting')
    setServerError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, source: 'website-contact-form' }),
      })
      if (!res.ok) {
        let msg = ''
        try { msg = (await res.json()).error || '' } catch { /* ignore */ }
        throw new Error(msg || `Request failed (${res.status})`)
      }
      setStatus('success')
    } catch (err) {
      setServerError(err.message)
      setStatus('error')
    }
  }

  const field = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: set(name),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const err = (name) => errors[name] && <p className="field-error" id={`${name}-error`}>{errors[name]}</p>

  return (
    <section className="page-hero contact">
      <div className="container contact-grid">
        <div>
          <TextReveal as="h1" className="display" text="Let's Create Something Exceptional." />
          <p className="lead">Tell us about your project and our team will get back to you with the right strategy.</p>

          <dl className="contact-list">
            <div><dt>Email</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
            <div><dt>Phone</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div>
            <div><dt>Studio</dt><dd>{company.address.map((l) => (<span key={l}>{l}<br /></span>))}</dd></div>
            <div>
              <dt>Follow</dt>
              <dd className="social-inline">
                {company.social.map((s) => (<a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="form-card">
          {status === 'success' ? (
            <div role="status" className="form-success">
              <h2 className="h3">Thank you, {values.name.split(' ')[0] || 'there'}.</h2>
              <p className="body-lg">Your enquiry has been sent. We will reply to {values.email} soon.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={status === 'error' ? 'form-error' : undefined}>
              <div className="field">
                <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
                <input type="text" autoComplete="name" required {...field('name')} />
                {err('name')}
              </div>
              <div className="field">
                <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                <input type="email" autoComplete="email" required {...field('email')} />
                {err('email')}
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
                  <input type="tel" autoComplete="tel" {...field('phone')} />
                </div>
                <div className="field">
                  <label htmlFor="company">Company <span className="optional">(optional)</span></label>
                  <input type="text" autoComplete="organization" {...field('company')} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="service">Service required <span aria-hidden="true">*</span></label>
                <select required {...field('service')}>
                  <option value="">Choose a service</option>
                  {services.map((s) => (<option key={s.slug} value={s.title}>{s.title}</option>))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                {err('service')}
              </div>
              <div className="field">
                <label htmlFor="message">Project description <span aria-hidden="true">*</span></label>
                <textarea rows={5} required {...field('message')} />
                {err('message')}
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="budget">Budget range <span className="optional">(optional)</span></label>
                  <select {...field('budget')}>
                    <option value="">Select</option>
                    {budgets.map((b) => (<option key={b}>{b}</option>))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="timeline">Timeline <span className="optional">(optional)</span></label>
                  <select {...field('timeline')}>
                    <option value="">Select</option>
                    {timelines.map((t) => (<option key={t}>{t}</option>))}
                  </select>
                </div>
              </div>

              {/* honeypot: hidden from people, bots tend to fill it */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input type="text" tabIndex={-1} autoComplete="off" {...field('website')} />
              </div>

              {status === 'error' && (
                <p className="form-error" id="form-error" role="alert">
                  We could not send your enquiry: {serverError}. Please try again, or email us at{' '}
                  <a href={`mailto:${company.email}`}>{company.email}</a> or call <a href={company.phoneHref}>{company.phone}</a>.
                </p>
              )}

              <Button type="submit" variant="primary" sweep disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
              </Button>
              <p className="privacy-note">
                By sending this form you agree that we may contact you about your enquiry. See our{' '}
                <a href={company.external.privacy} target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
