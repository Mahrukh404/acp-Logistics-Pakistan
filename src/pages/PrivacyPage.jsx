import { useLayoutEffect } from 'react'
import './PrivacyPage.css'

const privacySections = [
  {
    title: 'Information We Collect',
    body: 'When you contact us through our website or enquiry forms, we may collect your name, email address, phone number, company details, and shipment-related information you choose to share so we can respond to your request.',
  },
  {
    title: 'How We Use Information',
    body: 'We use the information you provide to respond to enquiries, prepare quotations, coordinate logistics services, improve our communications, and meet operational or legal requirements related to freight forwarding and customs processes.',
  },
  {
    title: 'Data Sharing',
    body: 'We do not sell personal information. We may share necessary details with trusted operational partners, carriers, customs brokers, or service providers only when required to fulfil a shipment or enquiry, or where disclosure is required by law.',
  },
  {
    title: 'Data Security & Retention',
    body: 'We take reasonable administrative and technical measures to protect information shared with us. Enquiry and operational records are retained only as long as needed for business, compliance, and service follow-up purposes.',
  },
  {
    title: 'Your Choices',
    body: 'You may request updates to your contact details or ask us to remove non-essential enquiry information by emailing Inquire@acplogs.com. Some records may need to be retained where required for legitimate business or regulatory reasons.',
  },
]

const termsSections = [
  {
    title: 'Website Use',
    body: 'Content on this website is provided for general information about ACP Logistics services. While we aim to keep information accurate, service availability, routes, and timelines may change based on operational conditions.',
  },
  {
    title: 'Quotations & Services',
    body: 'Any quote, estimate, or service discussion initiated through this website is subject to confirmation, carrier conditions, documentation requirements, and applicable trade regulations at the time of booking.',
  },
  {
    title: 'Limitation',
    body: 'ACP Logistics is not liable for delays or disruptions caused by customs authorities, carriers, force majeure events, inaccurate customer documentation, or circumstances outside our reasonable control.',
  },
]

function PrivacyPage() {
  useLayoutEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return
    document.getElementById(decodeURIComponent(targetId))?.scrollIntoView()
  }, [])

  return (
    <main className="privacy-page">
      <header className="privacy-page__hero">
        <p className="privacy-page__eyebrow">Legal</p>
        <h1 className="privacy-page__title">Privacy Policy</h1>
        <p className="privacy-page__lead">
          This page explains how ACP Logistics LTD handles enquiry and contact
          information submitted through our website.
        </p>
        <p className="privacy-page__updated">Last updated: October 2026</p>
      </header>

      <div className="privacy-page__content">
        {privacySections.map(({ title, body }) => (
          <section className="privacy-page__section" key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}

        <section className="privacy-page__section" id="terms">
          <h2>Terms of Use</h2>
          <p>
            By using this website, you agree to the following terms related to
            ACP Logistics digital content and service enquiries.
          </p>
        </section>

        {termsSections.map(({ title, body }) => (
          <section className="privacy-page__section" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </section>
        ))}

        <section className="privacy-page__section">
          <h2>Contact</h2>
          <p>
            For privacy or legal questions, contact{' '}
            <a href="mailto:Inquire@acplogs.com">Inquire@acplogs.com</a> or call{' '}
            <a href="tel:+92418738133">+92-41-8738133</a>.
          </p>
        </section>
      </div>
    </main>
  )
}

export default PrivacyPage
