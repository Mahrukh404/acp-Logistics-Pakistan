import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import './Footer.css'

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.12 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <footer
      className="site-footer"
      id="contact"
      ref={footerRef}
      aria-labelledby="site-footer-title"
    >
      <motion.div
        className="site-footer__inner"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={
          prefersReducedMotion || isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 18 }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 0.9,
          ease: [0.22, 0.68, 0, 1],
        }}
      >
        <div className="site-footer__columns">
          <div className="site-footer__brand-column">
            <a
              className="site-footer__brand"
              href="#home"
              id="site-footer-title"
              aria-label="ACP Logistics home"
            >
              <img
                className="site-footer__logo"
                src="/images/logo-transparent.png"
                alt=""
                draggable="false"
              />
            </a>
          </div>

          <nav className="site-footer__navigation" aria-label="Footer navigation">
            <h2 className="site-footer__heading">Explore</h2>
            <ul>
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>
                    <span>{label}</span>
                    <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.7} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="site-footer__contact">
            <h2 className="site-footer__heading">Contact</h2>
            <a href="mailto:Awan@acplogs.com">Awan@acplogs.com</a>
            <a href="tel:+92418738133">+92-41-8738133</a>
          </address>

          <address className="site-footer__address">
            <h2 className="site-footer__heading">Address</h2>
            <p>
              P-31, Chenab Market, Madina Town, Faisalabad, Punjab, Pakistan
            </p>
          </address>
        </div>

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
          <p>Property of ACP Logistics LTD</p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer