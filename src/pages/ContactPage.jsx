import { useState } from 'react'
import {
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import './ContactPage.css'

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  const handleCardMouseMove = (e) => {
    if (prefersReducedMotion) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

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
          service: '',
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
      <div className="contact-page__ambient" aria-hidden="true">
        <div className="contact-page__ambient-orb contact-page__ambient-orb--1" />
        <div className="contact-page__ambient-orb contact-page__ambient-orb--2" />
      </div>

      <motion.header
        className="contact-page__intro"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1>Contact Us</h1>
        <p className="contact-page__intro-lead">
          Tell us what you’re moving and how we can help. Our team coordinates across international
          borders to deliver dependable, tailored freight solutions for your business.
        </p>
      </motion.header>

      <div className="contact-page__content">
        <aside className="contact-details" aria-labelledby="contact-details-title">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="contact-page__eyebrow">HERE TO HELP</p>
            <h2 id="contact-details-title">Talk to our team</h2>
            <p className="contact-details__intro">
              Reach out directly or send us a message using the form. We look
              forward to discussing your freight requirements and providing practical solutions.
            </p>
          </motion.div>

          <address className="contact-details__list">
            <motion.a
              href="mailto:Inquire@acplogs.com"
              className="contact-card contact-card--interactive"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <div className="contact-details__icon contact-details__icon--email">
                <Mail aria-hidden="true" size={20} />
              </div>
              <div className="contact-card__info">
                <span className="contact-details__label">Email Us</span>
                <span className="contact-details__value">Inquire@acplogs.com</span>
              </div>
            </motion.a>

            <motion.a
              href="tel:+92418738133"
              className="contact-card contact-card--interactive"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
            >
              <div className="contact-details__icon contact-details__icon--phone">
                <Phone aria-hidden="true" size={20} />
              </div>
              <div className="contact-card__info">
                <span className="contact-details__label">Call Direct</span>
                <span className="contact-details__value">+92-41-8738133</span>
              </div>
            </motion.a>

            <motion.a
              href="https://wa.me/923009660045"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card--interactive"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="contact-details__icon contact-details__icon--whatsapp">
                <MessageCircle aria-hidden="true" size={20} />
              </div>
              <div className="contact-card__info">
                <span className="contact-details__label">WhatsApp</span>
                <span className="contact-details__value">03009660045</span>
              </div>
            </motion.a>

            <motion.div
              tabIndex={0}
              role="region"
              aria-label="Location"
              className="contact-card contact-card--interactive"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
            >
              <div className="contact-details__icon contact-details__icon--location">
                <MapPin aria-hidden="true" size={20} />
              </div>
              <div className="contact-card__info">
                <span className="contact-details__label">Location</span>
                <span className="contact-details__value">
                  P-31, Chenab Market, Madina Town, Faisalabad, Punjab, Pakistan
                </span>
              </div>
            </motion.div>
          </address>

          <div className="contact-assurance-card">
            <div className="contact-assurance-card__icon">
              <ShieldCheck size={20} aria-hidden="true" />
            </div>
            <div className="contact-assurance-card__body">
              <strong>Reliable Response Guaranteed</strong>
              <p>
                Our logistics coordinators monitor enquiries continuously across global time zones.
              </p>
            </div>
          </div>
        </aside>

        <motion.section
          className="contact-form-panel"
          aria-labelledby="contact-form-title"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          <div className="contact-form-panel__top-accent" aria-hidden="true" />

          <div className="contact-form-panel__heading">
            <p className="contact-page__eyebrow">START A CONVERSATION</p>
            <h2 id="contact-form-title">Send us an enquiry</h2>
            <p className="contact-form-panel__subtitle">
              Fill out your shipping parameters below and our freight specialists will reach out promptly.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="contact-full-name">
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  minLength={2}
                  maxLength={100}
                  required
                  onInput={(event) => event.currentTarget.setCustomValidity('')}
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-email">
                  Email Address <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-subject">
                Subject <span>(optional)</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Enter a subject"
                maxLength={180}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-message">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Enter your message"
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
              <div
                className={`contact-form__status contact-form__status--${status.type}`}
                role={status.type === 'error' ? 'alert' : 'status'}
                aria-live={status.type === 'error' ? 'assertive' : 'polite'}
              >
                {status.message}
              </div>
            )}

            <div className="contact-form__footer-row">
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
                    <span>Sending Enquiry…</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </>
                )}
              </button>

              <span className="contact-form__required-note">
                Fields marked with <em>*</em> are required.
              </span>
            </div>
          </form>
        </motion.section>
      </div>
    </main>
  )
}

export default ContactPage
