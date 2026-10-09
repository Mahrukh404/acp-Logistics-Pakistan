import { useLayoutEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { gsap } from '../animations/gsap.js'
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

function ServicesPage() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const sections = gsap.utils.toArray(
        '[data-service-section]',
        pageRef.current,
      )

      sections.forEach((section) => {
        const copy = section.querySelector('[data-service-copy]')
        const image = section.querySelector('[data-service-image]')
        const direction = section.dataset.direction === 'reverse' ? -1 : 1

        gsap.fromTo(
          copy,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          },
        )

        gsap.fromTo(
          image,
          {
            clipPath:
              direction === 1
                ? 'inset(0 100% 0 0)'
                : 'inset(0 0 0 100%)',
            scale: 1.08,
          },
          {
            clipPath: 'inset(0 0 0 0)',
            scale: 1,
            duration: 1.05,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              once: true,
            },
          },
        )
      })
    }, pageRef)

    return () => media.revert()
  }, [])

  return (
    <main className="services-page" ref={pageRef}>
      <header className="services-page__intro">
        <p className="services-page__eyebrow">ACP LOGISTICS / OUR SERVICES</p>
        <h1>Moving business forward, across every border.</h1>
        <p className="services-page__lead">
          From the first mile to the final handoff, explore practical logistics
          support shaped around your cargo and your business.
        </p>
        <a className="services-page__scroll" href="#service-01">
          Explore our services
          <ArrowDown aria-hidden="true" size={16} />
        </a>
      </header>

      <div className="services-page__list">
        {services.map((service, index) => {
          const number = String(index + 1).padStart(2, '0')
          const reverse = index % 2 === 1

          return (
            <article
              className={`service-feature${reverse ? ' service-feature--reverse' : ''}`}
              data-service-section
              data-direction={reverse ? 'reverse' : 'forward'}
              id={`service-${number}`}
              key={service.title}
              aria-labelledby={`service-title-${number}`}
            >
              <div className="service-feature__image-wrap">
                <img
                  className="service-feature__image"
                  data-service-image
                  src={service.image}
                  alt={`${service.title} logistics`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="service-feature__image-number" aria-hidden="true">
                  {number} / {String(services.length).padStart(2, '0')}
                </span>
              </div>

              <div className="service-feature__copy" data-service-copy>
                <p className="service-feature__eyebrow">
                  <span>{number}</span>
                  <span>ACP LOGISTICS / FREIGHT SOLUTIONS</span>
                </p>
                <h2 id={`service-title-${number}`}>{service.title}</h2>
                <p className="service-feature__description">
                  {serviceDescriptions[index]}
                </p>
                <a
                  className="service-feature__cta"
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                >
                  <span>Enquire About This Service</span>
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.7} />
                </a>
              </div>
            </article>
          )
        })}
      </div>

      <section className="services-page__closing">
        <p className="services-page__eyebrow">LET'S MOVE FORWARD</p>
        <h2>Have a shipment in mind?</h2>
        <a href="/contact">
          Talk to our team
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </section>
    </main>
  )
}

export default ServicesPage
