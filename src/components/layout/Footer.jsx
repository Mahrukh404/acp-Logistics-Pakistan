import { useRef } from 'react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import './Footer.css'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.12 })
  const prefersReducedMotion = useReducedMotion()

  const handleNavClick = (event, href) => {
    if (href.startsWith('/') && !href.startsWith('//') && !href.includes('#')) {
      event.preventDefault()
      window.history.pushState(null, '', href)
      window.dispatchEvent(new Event('popstate'))
      window.scrollTo(0, 0)
    }
  }

  // Motion variants for smooth staggered column entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.08,
      },
    },
  }

  const columnVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <footer
      className="site-footer"
      ref={footerRef}
      aria-labelledby="site-footer-title"
    >
      {/* Background Video Layer */}
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

      {/* Top luminous decorative accent border */}
      <div className="site-footer__top-accent" aria-hidden="true" />

      <motion.div
        className="site-footer__inner"
        variants={containerVariants}
        initial="hidden"
        animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
      >
        <div className="site-footer__columns">
          {/* Column 1: Clean ACP Brand Logo (No extra text or green box) */}
          <motion.div className="site-footer__brand-column" variants={columnVariants}>
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
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.nav
            className="site-footer__navigation"
            aria-label="Footer navigation"
            variants={columnVariants}
          >
            <h2 className="site-footer__heading">Navigation</h2>
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
                      size={14}
                      strokeWidth={2}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Column 3: Contact */}
          <motion.address className="site-footer__contact" variants={columnVariants}>
            <h2 className="site-footer__heading">Contact</h2>
            <div className="site-footer__contact-items">
              <div className="site-footer__contact-item">
                <span className="site-footer__contact-icon">
                  <Mail size={15} aria-hidden="true" />
                </span>
                <span>Awan@acplogs.com</span>
              </div>
              <div className="site-footer__contact-item">
                <span className="site-footer__contact-icon">
                  <Phone size={15} aria-hidden="true" />
                </span>
                <span>+92-41-8738133</span>
              </div>
            </div>
          </motion.address>

          {/* Column 4: Location */}
          <motion.address className="site-footer__address" variants={columnVariants}>
            <h2 className="site-footer__heading">Location</h2>
            <div className="site-footer__address-box">
              <div className="site-footer__address-info">
                <p>
                  P-31, Chenab Market, Madina Town, Faisalabad, Punjab, Pakistan
                </p>
              </div>
            </div>
          </motion.address>
        </div>
      </motion.div>

      {/* Marquee signature banner */}
      <div
        className="site-footer__signature"
        role="group"
        aria-label="Start your Journey with acp Logistics Today."
      >
        <div className="site-footer__signature-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="site-footer__signature-group" key={copy}>
              <span className="site-footer__signature-lockup">
                {[0, 1, 2, 3, 4].map((layer) => (
                  <span
                    className={`site-footer__signature-line site-footer__signature-line--${layer}`}
                    key={layer}
                  >
                    <span>Start your Journey with</span>
                    <strong>acp</strong>
                    <span className="site-footer__signature-light">
                      Logistics
                    </span>
                    <span>Today.</span>
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p>© {new Date().getFullYear()} ACP Logistics LTD. All Rights Reserved.</p>
          <p className="site-footer__legal-tag">
            Operating Since 2005 • Pakistan & International Supply Chains
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer