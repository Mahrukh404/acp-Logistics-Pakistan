import { useLayoutEffect, useRef } from 'react'
import {
  ArrowDown,
  Globe2,
  Handshake,
  Route,
  ShieldCheck,
} from 'lucide-react'
import { gsap } from '../animations/gsap.js'
import './AboutPage.css'

const reasons = [
  {
    title: 'Global Reach',
    description:
      'Our extensive logistics network connects businesses with international markets through reliable and cost-effective transportation solutions. We coordinate shipments across borders to support smooth cargo movement and efficient global trade.',
    icon: Globe2,
  },
  {
    title: 'Trusted Expertise',
    description:
      'With over two decades of industry experience, we understand the complexities of international shipping and freight management. Our team approaches every shipment with professionalism, precision, and attention to detail.',
    icon: ShieldCheck,
  },
  {
    title: 'Customer-Focused Solutions',
    description:
      'We recognize that every business has unique logistics requirements. That is why we focus on flexible shipping options, responsive communication, and practical solutions that align with our clients’ operational needs.',
    icon: Handshake,
  },
  {
    title: 'Reliable Service',
    description:
      'We prioritize efficient coordination, careful cargo handling, and timely shipment management. Our commitment is to make logistics simpler, more transparent, and dependable for every client.',
    icon: Route,
  },
]

const goals = [
  {
    title: 'Ensure',
    description:
      'We strive to meet agreed deadlines and maintain high service standards across international transportation operations, ensuring reliable and efficient cargo movement.',
  },
  {
    title: 'Handle',
    description:
      'We manage customs procedures and logistics complexities to simplify international shipping, allowing our clients to focus on their core business activities.',
  },
  {
    title: 'Optimize',
    description:
      'We aim to offer flexible rates and optimized transportation routes that help reduce logistics costs, improve operational efficiency, and support business profitability.',
  },
]

const facts = [
  {
    value: '20+',
    count: 20,
    title: 'Years of Experience',
    description:
      'Since 2005, we have been building industry knowledge and experience in international transportation and freight forwarding.',
  },
  {
    value: '24/7',
    title: 'Client Support',
    description:
      'We remain committed to assisting clients across different time zones and helping them coordinate their logistics requirements.',
  },
  {
    value: 'GLOBAL',
    title: 'Shipping Connectivity',
    description:
      'We connect businesses with international markets through coordinated freight forwarding and transportation solutions, supporting cross-border trade and supply chain operations.',
  },
]

function AboutPage() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const page = pageRef.current
      const overview = page.querySelector('[data-about-overview]')

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          overview.querySelectorAll('[data-about-intro]'),
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 },
        )
        .fromTo(
          overview.querySelector('[data-about-image]'),
          { clipPath: 'inset(0 100% 0 0)', scale: 1.08 },
          { clipPath: 'inset(0 0 0 0)', scale: 1, duration: 1.1 },
          '-=0.45',
        )

      gsap.utils
        .toArray('[data-about-reveal]', page)
        .forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 38 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 86%',
                once: true,
              },
            },
          )
        })

      gsap.utils
        .toArray('[data-about-stagger]', page)
        .forEach((group) => {
          gsap.fromTo(
            group.children,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.13,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 82%',
                once: true,
              },
            },
          )
        })

      gsap.utils
        .toArray('[data-about-count]', page)
        .forEach((number) => {
          const counter = { value: 0 }
          const target = Number(number.dataset.aboutCount)

          gsap.to(counter, {
            value: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { value: 1 },
            onUpdate: () => {
              number.textContent = `${counter.value}+`
            },
            scrollTrigger: {
              trigger: number,
              start: 'top 85%',
              once: true,
            },
          })
        })

      gsap.fromTo(
        page.querySelector('[data-about-support-value]'),
        { autoAlpha: 0, y: 36, clipPath: 'inset(0 0 100% 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0 0 0 0)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: page.querySelector('[data-about-support-value]'),
            start: 'top 85%',
            once: true,
          },
        },
      )
    }, pageRef)

    return () => media.revert()
  }, [])

  return (
    <main className="about-page" ref={pageRef}>
      <section
        className="about-overview"
        id="about-overview"
        data-about-overview
        aria-labelledby="about-title"
      >
        <div className="about-overview__heading">
          <p className="about-kicker" data-about-intro>
            ACP LOGISTICS / OUR STORY
          </p>
          <h1 id="about-title" data-about-intro>
            ABOUT <span>acp</span> LOGISTICS
          </h1>
          <p className="about-overview__subheading" data-about-intro>
            01. About Us
          </p>
        </div>

        <div className="about-overview__body">
          <div className="about-overview__image-frame" data-about-image>
            <img
              src="/images/sea_optimized.jpg"
              alt="Cargo ship carrying containers across the sea"
              fetchPriority="high"
              decoding="async"
            />
            <span className="about-overview__image-label">
              ACROSS BORDERS, BEYOND EXPECTATIONS
            </span>
          </div>
          <div className="about-overview__copy" data-about-intro>
            <span className="about-overview__index" aria-hidden="true">
              01
            </span>
            <p>
              Since 2005, acp Logistics has been providing dependable freight
              forwarding and logistics solutions to businesses worldwide. With
              expertise in customs clearance, air freight, sea freight, and
              inland transportation, we help our clients move cargo efficiently,
              securely, and on schedule. Through our global logistics network,
              industry knowledge, and customer-focused approach, we simplify
              complex shipping processes and deliver reliable solutions
              tailored to diverse business needs.
            </p>
            <a className="about-scroll-link" href="#about-why">
              Discover our approach
              <ArrowDown aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section
        className="about-why"
        id="about-why"
        aria-labelledby="about-why-title"
      >
        <div className="about-section-heading" data-about-reveal>
          <p className="about-kicker">02 / WHY CHOOSE ACP LOGISTICS?</p>
          <h2 id="about-why-title">
            Logistics built
            <br />
            around <span>your business.</span>
          </h2>
        </div>
        <div className="about-reasons" data-about-stagger>
          {reasons.map(({ title, description, icon: Icon }, index) => (
            <article className="about-reason" key={title}>
              <div className="about-reason__topline">
                <span className="about-reason__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
              </div>
              <div className="about-reason__content">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="about-reason__rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section
        className="about-goals"
        id="about-goals"
        aria-labelledby="about-goals-title"
      >
        <div className="about-centered-heading" data-about-reveal>
          <p className="about-kicker">03 / OUR PURPOSE</p>
          <h2 id="about-goals-title">OUR MAIN GOALS</h2>
        </div>
        <div className="about-goals__grid" data-about-stagger>
          {goals.map(({ title, description }, index) => (
            <article className="about-goal" key={title}>
              <span className="about-goal__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="about-goal__copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="about-goal__accent" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section
        className="about-facts"
        id="about-facts"
        aria-labelledby="about-facts-title"
      >
        <div className="about-centered-heading about-centered-heading--light" data-about-reveal>
          <p className="about-kicker">04 / EXPERIENCE & SERVICE</p>
          <h2 id="about-facts-title">acp LOGISTICS IN NUMBERS</h2>
        </div>
        <div className="about-facts__grid" data-about-stagger>
          {facts.map(({ value, count, title, description }, index) => (
            <article className="about-fact" key={title}>
              {count ? (
                <p className="about-fact__value" aria-label={value}>
                  <span data-about-count={count}>0+</span>
                </p>
              ) : (
                <p
                  className={`about-fact__value${index === 1 ? ' about-fact__value--support' : ' about-fact__value--global'}`}
                  data-about-support-value={index === 1 ? '' : undefined}
                >
                  {value}
                </p>
              )}
              <div className="about-fact__copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="about-fact__index" aria-hidden="true">
                0{index + 1}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="about-commitment"
        id="about-commitment"
        aria-labelledby="about-commitment-title"
      >
        <div className="about-commitment__heading" data-about-reveal>
          <p className="about-kicker">05 / OUR PROMISE</p>
          <h2 id="about-commitment-title">
            OUR
            <br />
            COMMITMENT
          </h2>
        </div>
        <div className="about-commitment__copy" data-about-reveal>
          <span className="about-commitment__mark" aria-hidden="true">
            “
          </span>
          <p>
            At acp Logistics, we believe logistics is about more than moving
            cargo — it is about building trust, maintaining reliability, and
            creating lasting business relationships. We are committed to
            delivering professional service, practical shipping solutions, and
            peace of mind at every stage of the transportation process. Our goal
            is to help businesses navigate global trade with confidence and move
            forward in an increasingly connected world.
          </p>
          <span className="about-commitment__signature">
            ACP LOGISTICS PAKISTAN
          </span>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
