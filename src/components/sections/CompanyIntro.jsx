import { useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '../../animations/gsap.js'
import './CompanyIntro.css'

function CompanyIntro() {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const context = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.fromTo(
          panelRef.current,
          {
            y: () => (window.innerWidth <= 640 ? 52 : 92),
            scale: () => (window.innerWidth <= 640 ? 0.95 : 0.92),
          },
          {
            y: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 92%',
              end: 'top 18%',
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          },
        )
      }
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      className="company-intro"
      id="about"
      ref={sectionRef}
      aria-labelledby="company-intro-title"
    >
      <div className="company-intro__panel-motion" ref={panelRef}>
        <div className="company-intro__panel">
          <div className="company-intro__topbar">
            <span className="company-intro__eyebrow">ABOUT US</span>
            <span className="company-intro__brand">acp LOGISTICS PAKISTAN</span>
          </div>

          <div className="company-intro__divider" aria-hidden="true" />

          <div className="company-intro__body">
            <h2 className="company-intro__title" id="company-intro-title">
              ACP LOGISTICS
            </h2>

            <div className="company-intro__description">
              <p>
                Since 2005, ACP Logistics has been providing dependable freight
                forwarding and logistics solutions to businesses worldwide,
                helping cargo move efficiently, safely, and reliably across
                international borders.
              </p>
              <a className="company-intro__cta" href="/contact">
                <span>LEARN MORE</span>
                <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2.7} />
              </a>
            </div>
          </div>

          <div className="company-intro__marquee" aria-label=" since 2005">
            <div className="company-intro__marquee-track" aria-hidden="true">
              <div className="company-intro__marquee-group">
                <span> SINCE 2005</span>
                <span className="company-intro__marquee-dot" />
                <span> SINCE 2005</span>
                <span className="company-intro__marquee-dot" />
              </div>
              <div className="company-intro__marquee-group">
                <span> SINCE 2005</span>
                <span className="company-intro__marquee-dot" />
                <span> SINCE 2005</span>
                <span className="company-intro__marquee-dot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyIntro