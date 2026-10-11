import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.js'
import services from '../data/services.js'
import './ServicesPage.css'

const serviceDescriptions = [
  'acp Logistics provides reliable and cost-effective sea freight solutions for international and bulk shipments. We facilitate consolidated cargo and full container transportation to meet diverse business requirements. Our services include shipment coordination, documentation support, and efficient cargo movement, with a focus on operational reliability and cost optimization.',
  'From your door to their door, we handle every step. acp Logistics coordinates cargo collection, transportation, shipment handling, and final delivery to provide a seamless shipping experience. Our door-to-door solutions simplify logistics, streamline coordination, and offer dependable service from origin to destination.',
  'acp Logistics delivers efficient and dependable air freight solutions for time-sensitive international shipments. We connect businesses to global markets through coordinated cargo transportation, professional shipment handling, and documentation support. Our services prioritize timely delivery, operational efficiency, and reliable logistics tailored to your business requirements.',
  'acp Logistics offers organized warehousing solutions designed to support efficient supply chain operations. Our services facilitate secure cargo storage, inventory organization, and streamlined goods handling for import, export, and distribution activities. We emphasize operational efficiency, effective coordination, and dependable cargo management to support your business needs.',
  'acp Logistics provides professional customs clearance support for international import and export shipments. We assist with essential documentation and coordinate clearance procedures in accordance with applicable regulations. Our approach emphasizes accuracy, regulatory compliance, and efficient processing to help minimize avoidable delays and streamline international trade operations.',
  'acp Logistics provides flexible LCL and FCL shipping solutions tailored to diverse cargo volumes and business requirements. Less than Container Load (LCL) enables shared container space, while Full Container Load (FCL) offers dedicated container capacity. We coordinate shipment planning, cargo consolidation where applicable, and shipping documentation to deliver reliable and cost-effective freight solutions.',
]

const serviceCapabilities = [
  ['FCL & LCL Cargo', 'Bulk Ocean Shipments', 'Global Route Planning', 'Customs Documentation'],
  ['Origin Pick-Up', 'Intermodal Transit', 'Last-Mile Delivery', 'Real-Time Journey Updates'],
  ['Express Air Freight', 'Scheduled Global Flights', 'Charter Coordination', 'High-Priority Handling'],
  ['Secure Storage Facilities', 'Inventory Organization', 'Consolidation & Cross-Dock', 'Export & Import Warehousing'],
  ['Import & Export Clearance', 'Tariff & Duty Verification', 'Regulatory Compliance', 'Rapid Customs Filing'],
  ['Full Container Load (FCL)', 'Less than Container Load (LCL)', 'Shared Capacity Options', 'Direct Port-to-Port'],
]

function ServicesPage() {
  const pageRef = useRef(null)
  const progressFillRef = useRef(null)
  const [activeSection, setActiveSection] = useState(1)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia()

      // Desktop & Tablet with motion enabled
      media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        const sections = gsap.utils.toArray('[data-service-section]', pageRef.current)
        const listContainer = pageRef.current.querySelector('.services-page__list')

        // Hero Intro Animation
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        heroTl
          .fromTo(
            '.services-page__eyebrow',
            { autoAlpha: 0, y: -15 },
            { autoAlpha: 1, y: 0, duration: 0.6 }
          )
          .fromTo(
            '.services-page__intro h1',
            { autoAlpha: 0, y: 35 },
            { autoAlpha: 1, y: 0, duration: 0.85 },
            '-=0.3'
          )
          .fromTo(
            '.services-page__lead',
            { autoAlpha: 0, y: 25 },
            { autoAlpha: 1, y: 0, duration: 0.75 },
            '-=0.45'
          )
          .fromTo(
            '.services-page__nav-pills',
            { autoAlpha: 0, y: 15 },
            { autoAlpha: 1, y: 0, duration: 0.65 },
            '-=0.4'
          )
          .fromTo(
            '.services-page__scroll',
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            '-=0.3'
          )

        // Global Scroll Progress Bar
        if (progressFillRef.current && listContainer) {
          gsap.fromTo(
            progressFillRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: listContainer,
                start: 'top 80%',
                end: 'bottom 90%',
                scrub: 0.3,
              },
            }
          )
        }

        // Each Service Section Animation
        sections.forEach((section, idx) => {
          const numberEl = section.querySelector('[data-service-num]')
          const titleEl = section.querySelector('[data-service-title]')
          const descEl = section.querySelector('[data-service-desc]')
          const capabilitiesEl = section.querySelector('[data-service-capabilities]')
          const ctaEl = section.querySelector('[data-service-cta]')
          const imageWrap = section.querySelector('[data-service-image-wrap]')
          const imageInner = section.querySelector('[data-service-image]')
          const badgeEl = section.querySelector('[data-service-badge]')
          const isReverse = section.dataset.direction === 'reverse'

          // Active Section Tracking
          ScrollTrigger.create({
            trigger: section,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => setActiveSection(idx + 1),
            onEnterBack: () => setActiveSection(idx + 1),
          })

          // Image Entrance Mask / Reveal
          const clipStart = isReverse
            ? 'inset(0% 0% 0% 100%)'
            : 'inset(0% 100% 0% 0%)'

          gsap.fromTo(
            imageWrap,
            { clipPath: clipStart, autoAlpha: 0.7 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              autoAlpha: 1,
              duration: 1.15,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: section,
                start: 'top 76%',
                toggleActions: 'play none none none',
              },
            }
          )

          // Inner Image Smooth Parallax & Scale Settle
          gsap.fromTo(
            imageInner,
            { scale: 1.15, yPercent: -10 },
            {
              scale: 1,
              yPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          )

          // Badge Reveal over image
          if (badgeEl) {
            gsap.fromTo(
              badgeEl,
              { autoAlpha: 0, y: 15 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 70%',
                  toggleActions: 'play none none none',
                },
              }
            )
          }

          // Staggered Text / Copy Reveal
          const textElements = [numberEl, titleEl, descEl, capabilitiesEl, ctaEl].filter(Boolean)
          gsap.fromTo(
            textElements,
            { autoAlpha: 0, y: 35 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 74%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        // Closing CTA Section Entrance
        gsap.fromTo(
          '.services-page__closing-content',
          { autoAlpha: 0, y: 40, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.services-page__closing',
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Mobile & Small Screens (< 769px)
      media.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const sections = gsap.utils.toArray('[data-service-section]', pageRef.current)

        sections.forEach((section) => {
          const imageWrap = section.querySelector('[data-service-image-wrap]')
          const copy = section.querySelector('[data-service-copy]')

          gsap.fromTo(
            [imageWrap, copy],
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="services-page" ref={pageRef}>
      {/* Sticky Bottom Progress Bar (MVP Logistics Inspired) */}
      <div className="services-progress" aria-hidden="true">
        <div className="services-progress__bar">
          <div className="services-progress__fill" ref={progressFillRef} />
        </div>
        <div className="services-progress__meta">
          <span className="services-progress__label">ACP SERVICES FLOW</span>
          <span className="services-progress__counter">
            0{activeSection} / 0{services.length}
          </span>
        </div>
      </div>

      {/* Hero Intro Section */}
      <header className="services-page__intro" id="top">
        <div className="services-page__intro-inner">
          <p className="services-page__eyebrow">ACP LOGISTICS / OUR SERVICES</p>
          <h1>Moving business forward, across every border.</h1>
          <p className="services-page__lead">
            From the first mile to the final handoff, explore practical logistics
            support shaped around your cargo and your business.
          </p>

          {/* Quick-Jump Navigation Pills */}
          <nav className="services-page__nav-pills" aria-label="Services quick links">
            {services.map((service, index) => {
              const number = String(index + 1).padStart(2, '0')
              return (
                <a
                  className="services-page__nav-pill"
                  href={`#service-${number}`}
                  key={service.title}
                >
                  <span className="services-page__nav-pill-num">{number}</span>
                  <span className="services-page__nav-pill-title">{service.title}</span>
                </a>
              )
            })}
          </nav>

          <a className="services-page__scroll" href="#service-01">
            <span>Explore our services</span>
            <ArrowDown aria-hidden="true" size={16} />
          </a>
        </div>
      </header>

      {/* Service Showcase Sections */}
      <div className="services-page__list">
        {services.map((service, index) => {
          const number = String(index + 1).padStart(2, '0')
          const reverse = index % 2 === 1
          const capabilities = serviceCapabilities[index] || []

          return (
            <article
              className={`service-feature${reverse ? ' service-feature--reverse' : ''}`}
              data-service-section
              data-direction={reverse ? 'reverse' : 'forward'}
              id={`service-${number}`}
              key={service.title}
              aria-labelledby={`service-title-${number}`}
            >
              {/* Image Column with Mask Reveal & Parallax Container */}
              <div
                className="service-feature__image-wrap"
                data-service-image-wrap
              >
                <div className="service-feature__image-inner">
                  <img
                    className="service-feature__image"
                    data-service-image
                    src={service.image}
                    alt={`${service.title} logistics`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div
                  className="service-feature__image-badge"
                  data-service-badge
                  aria-hidden="true"
                >
                  <span className="service-feature__image-badge-number">{number}</span>
                  <span className="service-feature__image-badge-total">
                    / 0{services.length}
                  </span>
                  <span className="service-feature__image-badge-brand">ACP LOGISTICS</span>
                </div>
              </div>

              {/* Text & Content Column */}
              <div className="service-feature__copy" data-service-copy>
                <div className="service-feature__header" data-service-num>
                  <span className="service-feature__number">{number}</span>
                  <div className="service-feature__tag-wrap">
                    <span className="service-feature__tag-prefix">SERVICE HIGHLIGHT</span>
                    <span className="service-feature__tag-divider" aria-hidden="true" />
                    <span className="service-feature__tag-category">FREIGHT & SUPPLY CHAIN</span>
                  </div>
                </div>

                <h2 id={`service-title-${number}`} data-service-title>
                  {service.title}
                </h2>

                <p className="service-feature__description" data-service-desc>
                  {serviceDescriptions[index]}
                </p>

                {/* Scope & Key Capabilities (MVP Structure) */}
                {capabilities.length > 0 && (
                  <div className="service-feature__capabilities" data-service-capabilities>
                    <div className="service-feature__capabilities-label">
                      <span>KEY CAPABILITIES & SCOPE</span>
                    </div>
                    <ul className="service-feature__capabilities-list">
                      {capabilities.map((cap) => (
                        <li className="service-feature__capability-item" key={cap}>
                          <CheckCircle2 size={13} aria-hidden="true" className="service-feature__capability-icon" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="service-feature__actions" data-service-cta>
                  <a
                    className="service-feature__cta"
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                  >
                    <span className="service-feature__cta-text">Enquire About This Service</span>
                    <span className="service-feature__cta-icon-wrap" aria-hidden="true">
                      <ArrowUpRight size={17} strokeWidth={2} />
                    </span>
                  </a>
                  <a
                    className="service-feature__secondary-link"
                    href="/contact"
                  >
                    <span>General Consultation</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Closing CTA Section */}
      <section className="services-page__closing" aria-labelledby="closing-title">
        <div className="services-page__closing-content">
          <p className="services-page__closing-eyebrow">LET'S MOVE FORWARD</p>
          <h2 id="closing-title">Have a shipment in mind?</h2>
          <p className="services-page__closing-lead">
            Connect with our freight specialists in Karachi. We tailor end-to-end
            freight forwarding, storage, and customs logistics to your timeline and cargo.
          </p>
          <div className="services-page__closing-actions">
            <a className="services-page__closing-btn" href="/contact">
              <span>Talk to our team</span>
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
            </a>
            <a className="services-page__closing-back" href="#top">
              <span>Back to Top</span>
              <ArrowDown aria-hidden="true" size={15} style={{ transform: 'rotate(180deg)' }} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
