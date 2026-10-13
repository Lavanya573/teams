// Vercel serverless function: POST /api/contact
// Sends the enquiry to your inbox through Resend (https://resend.com). Secrets stay on the server.
// Required environment variables (Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
// If they are missing the function returns 503, so the website shows an honest error instead of a fake success.

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  let body = req.body
  if (typeof body === 'string') { try { body = JSON.parse(body) } catch { body = {} } }
  body = body || {}

  if (body.website) return res.status(200).json({ ok: true }) // honeypot hit: pretend success, send nothing

  const { name, email, phone, company, service, message, budget, timeline } = body
  if (!name || !emailRe.test(String(email || '')) || !service || String(message || '').trim().length < 10) {
    return res.status(400).json({ error: 'Please complete all required fields.' })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return res.status(503).json({ error: 'The enquiry service is not configured yet' })
  }

  const html = `
    <h2>New website enquiry</h2>
    <p><b>Name:</b> ${esc(name)}</p>
    <p><b>Email:</b> ${esc(email)}</p>
    <p><b>Phone:</b> ${esc(phone)}</p>
    <p><b>Company:</b> ${esc(company)}</p>
    <p><b>Service:</b> ${esc(service)}</p>
    <p><b>Budget:</b> ${esc(budget)}</p>
    <p><b>Timeline:</b> ${esc(timeline)}</p>
    <p><b>Message:</b><br>${esc(message).replace(/\n/g, '<br>')}</p>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Website enquiry: ${service} (${name})`,
        html,
      }),
    })
    if (!r.ok) return res.status(502).json({ error: 'The email provider rejected the message' })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'Could not reach the email provider' })
  }
}
