import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import './Header.css'

const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32)

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)
  const menuTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.22, 0.68, 0, 1] }

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <a
          className="site-brand"
          href="#home"
          aria-label="ACP Logistics Pakistan home"
          onClick={closeMenu}
        >
          <img
            className="site-brand__logo"
            src="/images/logo-transparent.png"
            alt=""
            draggable="false"
          />
        </a>

        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigationLinks.map(({ label, href }) => (
            <a
              className="desktop-navigation__link"
              href={href}
              key={label}
              aria-label={label}
            >
              <span className="navigation-hover-label" aria-hidden="true">
                <span className="navigation-hover-label__inner">
                  <span className="navigation-hover-label__line">{label}</span>
                  <span className="navigation-hover-label__line navigation-hover-label__line--clone">
                    {label}
                  </span>
                </span>
              </span>
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="quote-button" href="#contact">
            <span>Get a Quote</span>
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" size={23} strokeWidth={1.7} />
            ) : (
              <Menu aria-hidden="true" size={23} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={menuTransition}
          >
            {navigationLinks.map(({ label, href }, index) => (
              <motion.a
                className="mobile-navigation__link"
                href={href}
                key={label}
                onClick={closeMenu}
                aria-label={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ ...menuTransition, delay: prefersReducedMotion ? 0 : index * 0.035 }}
              >
                <span className="mobile-navigation__index">0{index + 1}</span>
                <span className="navigation-hover-label" aria-hidden="true">
                  <span className="navigation-hover-label__inner">
                    <span className="navigation-hover-label__line">{label}</span>
                    <span className="navigation-hover-label__line navigation-hover-label__line--clone">
                      {label}
                    </span>
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
              </motion.a>
            ))}

            <a className="mobile-navigation__quote" href="#contact" onClick={closeMenu}>
              Get a Quote
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header