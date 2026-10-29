import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import './Footer.css'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/privacy#terms' },
]

function Footer() {
  const handleNavClick = (event, href) => {
    if (!href.startsWith('/') || href.startsWith('//')) return

    event.preventDefault()
    const [, hash] = href.split('#')
    window.history.pushState(null, '', href)
    window.dispatchEvent(new Event('popstate'))

    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }

    window.scrollTo(0, 0)
  }

  return (
    <footer className="site-footer" aria-labelledby="site-footer-title">
      <div className="site-footer__video-layer" aria-hidden="true">
        <video
          className="site-footer__video"
          src="/videos/footerf.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="site-footer__video-scrim" />
      </div>

      <div className="site-footer__top-accent" aria-hidden="true" />

      <div className="site-footer__inner">
        <div className="site-footer__columns">
          <div className="site-footer__brand-column">
            <a
              className="site-footer__brand"
              href="/"
              id="site-footer-title"
              aria-label="ACP Logistics home"
              onClick={(e) => handleNavClick(e, '/')}
            >
              <img
                className="site-footer__logo"
                src="/images/logo-transparent.png"
                alt="ACP Logistics Pakistan"
                draggable="false"
              />
            </a>
            <p className="site-footer__tagline">
              Freight forwarding and supply-chain solutions across Pakistan and
              international trade lanes — reliable since 2005.
            </p>
            <a
              className="site-footer__brand-cta"
              href="/contact"
              onClick={(e) => handleNavClick(e, '/contact')}
            >
              Request a Quote
              <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} />
            </a>
          </div>

          <nav className="site-footer__navigation" aria-label="Footer navigation">
            <h2 className="site-footer__heading">Company</h2>
            <ul>
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="site-footer__nav-link"
                  >
                    <span>{label}</span>
                    <ArrowUpRight
                      className="site-footer__nav-arrow"
                      aria-hidden="true"
                      size={13}
                      strokeWidth={2}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <h2 className="site-footer__heading">Contact</h2>
            <div className="site-footer__contact-items">
              <a className="site-footer__contact-item" href="mailto:Inquire@acplogs.com">
                <span className="site-footer__contact-icon">
                  <Mail size={14} aria-hidden="true" />
                </span>
                <span>Inquire@acplogs.com</span>
              </a>
              <a className="site-footer__contact-item" href="tel:+92418738133">
                <span className="site-footer__contact-icon">
                  <Phone size={14} aria-hidden="true" />
                </span>
                <span>+92-41-8738133</span>
              </a>
              <a
                className="site-footer__contact-item"
                href="https://wa.me/923009660045"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="site-footer__contact-icon">
                  <MessageCircle size={14} aria-hidden="true" />
                </span>
                <span>WhatsApp: 03009660045</span>
              </a>
            </div>
          </div>

          <address className="site-footer__address">
            <h2 className="site-footer__heading">Head Office</h2>
            <div className="site-footer__address-box">
              <span className="site-footer__contact-icon" aria-hidden="true">
                <MapPin size={14} />
              </span>
              <div className="site-footer__address-info">
                <p>
                  P-31, Chenab Market, Madina Town, Faisalabad, Punjab, Pakistan
                </p>
              </div>
            </div>
          </address>
        </div>
      </div>

      <div className="site-footer__divider" aria-hidden="true" />

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} ACP Logistics LTD. All rights reserved.
          </p>

          <nav className="site-footer__legal" aria-label="Legal">
            {legalLinks.map(({ label, href }, index) => (
              <span className="site-footer__legal-item" key={label}>
                {index > 0 ? (
                  <span className="site-footer__legal-sep" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <a href={href} onClick={(e) => handleNavClick(e, href)}>
                  {label}
                </a>
              </span>
            ))}
          </nav>

          <p className="site-footer__legal-tag">
            Operating since 2005 · Pakistan &amp; International Supply Chains
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
