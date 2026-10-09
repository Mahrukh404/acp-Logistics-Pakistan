import { useState } from 'react'
import { ArrowUpRight, LoaderCircle, Mail, MapPin, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import services from '../data/services.js'
import './ContactPage.css'

function ContactPage() {
  const initialService = new URLSearchParams(window.location.search).get('service')
  const selectedService = services.some(
    (service) => service.title === initialService,
  )
    ? initialService
    : ''
  const [service, setService] = useState(selectedService)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const fullName = form.elements.fullName.value.trim()
    const email = form.elements.email.value.trim()
    const subject = form.elements.subject.value.trim()
    const message = form.elements.message.value.trim()

    form.elements.fullName.setCustomValidity(
      fullName ? '' : 'Please enter your full name.',
    )
    form.elements.message.setCustomValidity(
      message ? '' : 'Please enter a message.',
    )

    if (!form.reportValidity()) return

    setStatus(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          service,
          subject,
          message,
          website: form.elements.website.value,
        }),
      })

      let result
      try {
        result = await response.json()
      } catch {
        setStatus({
          type: 'error',
          message:
            'We could not confirm delivery. Please try again or contact us by phone.',
        })
        return
      }

      if (!response.ok || result.success !== true) {
        setStatus({
          type: 'error',
          message:
            result.error ||
            'Your message could not be delivered. Please try again shortly.',
        })
        return
      }

      setStatus({
        type: 'success',
        message: 'Thank you. Your enquiry has been delivered to our team.',
      })
      form.reset()
      setService(selectedService)
    } catch {
      setStatus({
        type: 'error',
        message:
          'We could not reach our message service. Please try again or contact us by phone.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="contact-page">
      <motion.header
        className="contact-page__intro"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.65 }}
      >
        <p className="contact-page__eyebrow">ACP LOGISTICS / CONTACT</p>
        <h1>Let’s discuss your logistics needs.</h1>
        <p>
          Tell us what you’re moving and how we can help. Our team will be in
          touch to discuss the right next step for your business.
        </p>
      </motion.header>

      <div className="contact-page__content">
        <aside className="contact-details" aria-labelledby="contact-details-title">
          <div>
            <p className="contact-page__eyebrow">HERE TO HELP</p>
            <h2 id="contact-details-title">Talk to our team</h2>
            <p className="contact-details__intro">
              Reach out directly or send us a message using the form. We look
              forward to hearing from you.
            </p>
          </div>

          <address className="contact-details__list">
            <a href="mailto:Awan@acplogs.com">
              <span className="contact-details__icon">
                <Mail aria-hidden="true" size={18} />
              </span>
              <span>
                <span className="contact-details__label">Email</span>
                <span className="contact-details__value">Awan@acplogs.com</span>
              </span>
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
            <a href="tel:+92418738133">
              <span className="contact-details__icon">
                <Phone aria-hidden="true" size={18} />
              </span>
              <span>
                <span className="contact-details__label">Phone</span>
                <span className="contact-details__value">+92-41-8738133</span>
              </span>
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
            <div className="contact-details__address">
              <span className="contact-details__icon">
                <MapPin aria-hidden="true" size={18} />
              </span>
              <span>
                <span className="contact-details__label">Office</span>
                <span className="contact-details__value">
                  P-31, Chenab Market, Madina Town, Faisalabad, Punjab, Pakistan
                </span>
              </span>
            </div>
          </address>
        </aside>

        <section className="contact-form-panel" aria-labelledby="contact-form-title">
          <div className="contact-form-panel__heading">
            <p className="contact-page__eyebrow">START A CONVERSATION</p>
            <h2 id="contact-form-title">Send us an enquiry</h2>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="contact-full-name">Full Name <span aria-hidden="true">*</span></label>
                <input
                  id="contact-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                  onInput={(event) => event.currentTarget.setCustomValidity('')}
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-service">Service of Interest</label>
              <select
                id="contact-service"
                name="service"
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="">General enquiry</option>
                {services.map((item) => (
                  <option value={item.title} key={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-subject">Subject <span>(optional)</span></label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                maxLength={180}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                minLength={10}
                maxLength={5000}
                required
                onInput={(event) => event.currentTarget.setCustomValidity('')}
              />
            </div>

            <div className="contact-form__honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {status && (
              <p
                className={`contact-form__status contact-form__status--${status.type}`}
                role={status.type === 'error' ? 'alert' : 'status'}
                aria-live={status.type === 'error' ? 'assertive' : 'polite'}
              >
                {status.message}
              </p>
            )}

            <button
              className="contact-form__submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    className="contact-form__spinner"
                    aria-hidden="true"
                    size={17}
                  />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <ArrowUpRight aria-hidden="true" size={18} />
                </>
              )}
            </button>
            <p className="contact-form__required-note">
              Fields marked with * are required.
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}

export default ContactPage
