import services from '../src/data/services.js'

const allowedServices = new Set(services.map(({ title }) => title))
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function respond(res, status, payload) {
  return res.status(status).json(payload)
}

function validate(body) {
  const fullName =
    typeof body.fullName === 'string' ? body.fullName.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const website = typeof body.website === 'string' ? body.website.trim() : ''

  if (website) return { spam: true }
  if (fullName.length < 2 || fullName.length > 100) {
    return { error: 'Enter a name between 2 and 100 characters.' }
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    return { error: 'Enter a valid email address.' }
  }
  if (service && !allowedServices.has(service)) {
    return { error: 'Choose one of the listed services.' }
  }
  if (
    subject.length > 180 ||
    /[\r\n]/.test(subject)
  ) {
    return { error: 'The subject must be 180 characters or fewer.' }
  }
  if (message.length < 10 || message.length > 5000) {
    return { error: 'Enter a message between 10 and 5000 characters.' }
  }

  return { fullName, email, service, subject, message }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return respond(res, 405, { error: 'Method not allowed.' })
  }

  if (!req.headers['content-type']?.includes('application/json')) {
    return respond(res, 415, { error: 'Submit the enquiry as JSON.' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return respond(res, 400, { error: 'The enquiry could not be read.' })
    }
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return respond(res, 400, { error: 'Enter your enquiry details.' })
  }

  if (Buffer.byteLength(JSON.stringify(body), 'utf8') > 10_000) {
    return respond(res, 413, { error: 'The enquiry is too large.' })
  }

  const validated = validate(body)
  if (validated.spam) {
    return respond(res, 400, { error: 'Unable to submit this enquiry.' })
  }
  if (validated.error) {
    return respond(res, 400, { error: validated.error })
  }

  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.CONTACT_TO_EMAIL
  const sender = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !recipient || !sender) {
    console.error('Contact form is missing its email delivery configuration.')
    return respond(res, 503, {
      error: 'Our message service is not available yet. Please contact us by phone.',
    })
  }

  const subject =
    validated.subject ||
    validated.service ||
    'General enquiry'
  const text = [
    'New enquiry from the ACP Logistics website',
    '',
    `Name: ${validated.fullName}`,
    `Email: ${validated.email}`,
    `Service: ${validated.service || 'General enquiry'}`,
    `Subject: ${validated.subject || 'Not provided'}`,
    '',
    'Message:',
    validated.message,
  ].join('\n')

  let providerResponse
  try {
    providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: validated.email,
        subject: `ACP Logistics enquiry: ${subject}`,
        text,
      }),
    })
  } catch (error) {
    console.error('Contact email provider request failed.', error)
    return respond(res, 502, {
      error: 'Message delivery is temporarily unavailable. Please try again.',
    })
  }

  if (!providerResponse.ok) {
    console.error(
      `Contact email provider returned HTTP ${providerResponse.status}.`,
    )
    return respond(res, 502, {
      error: 'Message delivery is temporarily unavailable. Please try again.',
    })
  }

  return respond(res, 200, { success: true })
}
