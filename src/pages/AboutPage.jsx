import { useEffect, useRef, useState } from 'react'
import {
  Globe2,
  Handshake,
  ShieldCheck,
} from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.js'
import './AboutPage.css'

const reasons = [
  {
    number: '01',
    title: 'Global Reach',
    description:
      'Our extensive logistics network connects businesses with international markets through reliable and cost-effective transportation solutions. We coordinate shipments across borders to support smooth cargo movement and efficient global trade.',
    icon: Globe2,
    tag: 'Worldwide Coverage',
  },
  {
    number: '02',
    title: 'Trusted Expertise',
    description:
      'With over two decades of industry experience, we understand the complexities of international shipping and freight management. Our team approaches every shipment with professionalism, precision, and attention to detail.',
    icon: ShieldCheck,
    tag: '20+ Years Legacy',
  },
  {
    number: '03',
    title: 'Customer-Focused Solutions',
    description:
      'We recognize that every business has unique logistics requirements. That is why we focus on flexible shipping options, responsive communication, and practical solutions that align with our clients’ operational needs.',
    icon: Handshake,
    tag: 'Tailored Execution',
  },
]

const goals = [
  {
    number: '01',
    title: 'ENSURE',
    subtitle: 'Service Quality & Deadlines',
    description:
      'We strive to meet agreed deadlines and maintain high service standards across international transportation operations, ensuring reliable and efficient cargo movement.',
  },
  {
    number: '02',
    title: 'HANDLE',
    subtitle: 'Customs & Global Complexities',
    description:
      'We manage customs procedures and logistics complexities to simplify international shipping, allowing our clients to focus on their core business activities.',
  },
  {
    number: '03',
    title: 'OPTIMIZE',
    subtitle: 'Cost & Route Efficiency',
    description:
      'We aim to offer flexible rates and optimized transportation routes that help reduce logistics costs, improve operational efficiency, and support business profitability.',
  },
]

const facts = [
  {
    value: '+20',
    count: 20,
    prefix: '+',
    title: '20+ Years of Experience',
    description:
      'Since 2005, we have been building industry knowledge and experience in international transportation and freight forwarding.',
    highlight: 'Industry Pioneer Since 2005',
  },
  {
    value: '24/7',
    isSupport: true,
    title: '24/7 Client Support',
    description:
      'We remain committed to assisting clients across different time zones and helping them coordinate their logistics requirements.',
    highlight: 'Continuous Global Watch',
  },
  {
    value: 'GLOBAL',
    isGlobal: true,
    title: 'Global Shipping Connectivity',
    description:
      'We connect businesses with international markets through coordinated freight forwarding and transportation solutions, supporting cross-border trade and supply chain operations.',
    highlight: 'Cross-Border Network',
  },
]

const COMMITMENT_PARAGRAPH_1 =
  'To deliver reliable, customer-focused logistics solutions built on trust, transparency and professional excellence.'

const COMMITMENT_PARAGRAPH_2 =
  'We are committed to ensuring safe cargo handling, efficient global transportation and door-to-door solutions through every step of the logistics journey.'

function AboutPage() {
  const pageRef = useRef(null)
  const videoRef = useRef(null)
  const [activeReason, setActiveReason] = useState(0)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    // Using gsap.matchMedia for safe, responsive, and leak-free animations
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Hero Reveal Timeline (Faithful to Reference Image 1)
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTl
        .fromTo(
          page.querySelectorAll('.about-hero-anim'),
          { autoAlpha: 0, y: 35 },
          { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 },
        )
        .fromTo(
          page.querySelector('.about-hero__line'),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: 'expo.out' },
          '-=0.6',
        )
        .fromTo(
          page.querySelectorAll('.about-hero__narrative p'),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.14, ease: 'power2.out' },
          '-=0.4',
        )

      // Parallax on full-screen hero background video
      const heroVideo = page.querySelector('.about-hero__video')
      if (heroVideo) {
        gsap.to(heroVideo, {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // 2. Why Choose ACP Logistics — Large Navy-Blue Rounded Panel Reveal
      gsap.fromTo(
        page.querySelector('.about-why-panel'),
        { autoAlpha: 0, y: 50, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-why',
            start: 'top 82%',
            once: true,
          },
        },
      )

      // Stagger feature reason bars entrance
      gsap.fromTo(
        page.querySelectorAll('.about-reason-bar'),
        { autoAlpha: 0, y: 35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-why__bars',
            start: 'top 82%',
            once: true,
          },
        },
      )

      // 3. Our Goals Cards (Guaranteed identical vertical alignment)
      gsap.fromTo(
        page.querySelectorAll('.about-goal-card'),
        { autoAlpha: 0, y: 55, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-goals__grid',
            start: 'top 80%',
            once: true,
          },
        },
      )

      // Stagger goal watermarks gently
      gsap.fromTo(
        page.querySelectorAll('.about-goal-watermark'),
        { scale: 0.75, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.about-goals__grid',
            start: 'top 80%',
            once: true,
          },
        },
      )

      // 4. Our Commitment — same soft entrance as CEO message
      const commitSection = page.querySelector('.about-commitment')
      const commitBits = page.querySelectorAll('.about-commitment__anim')

      if (commitSection && commitBits.length > 0) {
        gsap.from(commitBits, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,visibility,opacity',
          scrollTrigger: {
            trigger: commitSection,
            start: 'top 88%',
            once: true,
          },
        })
      }

      // 5. Facts About Us Cards (Placed AFTER Our Commitment)
      gsap.fromTo(
        page.querySelectorAll('.about-fact-card'),
        { autoAlpha: 0, y: 65, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-facts__grid',
            start: 'top 82%',
            once: true,
          },
        },
      )

      // Animate +20 Count-Up
      const counterElement = page.querySelector('[data-count-target]')
      if (counterElement) {
        const target = Number(counterElement.dataset.countTarget || 20)
        const counterObj = { val: 0 }
        gsap.to(counterObj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate: () => {
            counterElement.textContent = `+${counterObj.val}`
          },
          scrollTrigger: {
            trigger: counterElement,
            start: 'top 85%',
            once: true,
          },
        })
      }

      gsap.fromTo(
        page.querySelectorAll('.about-fact-value'),
        { autoAlpha: 0.4, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.about-facts__grid',
            start: 'top 82%',
            once: true,
          },
        },
      )

      // Generic Headings Stagger
      gsap.utils.toArray('.about-section-heading-anim', page).forEach((heading) => {
        gsap.fromTo(
          heading,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // Interactive 3D Card Hover Effect for Goal & Fact cards
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
  }

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <main className="about-page" ref={pageRef}>
      {/* ============================================================== */}
      {/* 1. HERO — Recreated Reference Image 1 Composition              */}
      {/* Full-bleed video, ABOUT US, horizontal line, acp LOGISTICS     */}
      {/* ============================================================== */}
      <section
        className="about-hero"
        id="about-hero"
        aria-labelledby="about-hero-title"
      >
        <div className="about-hero__video-layer">
          {!videoError ? (
            <video
              ref={videoRef}
              className="about-hero__video"
              src="/videos/about_us.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/Containers-2.png"
              aria-hidden="true"
              tabIndex={-1}
              onError={() => setVideoError(true)}
            />
          ) : (
            <img
              className="about-hero__video about-hero__video-fallback"
              src="/images/Containers-2.png"
              alt="ACP Logistics Terminal Operations"
            />
          )}
          <div className="about-hero__scrim" aria-hidden="true" />
        </div>

        <div className="about-hero__container">
          {/* Top Row: ABOUT US on left, Brand Acronym and Title on right */}
          <div className="about-hero__top-row">
            <h1 id="about-hero-title" className="about-hero__title about-hero-anim">
              ABOUT US
            </h1>

            <div className="about-hero__brand-track">
              <div className="about-hero__brand-acronym about-hero-anim">
                <span>a.</span>
                <span>c.</span>
                <span>p.</span>
              </div>
              <div className="about-hero__brand-tag about-hero-anim">
                LOGISTICS PAKISTAN
              </div>
            </div>
          </div>

          {/* Animated Horizontal Line */}
          <div className="about-hero__line-wrap" aria-hidden="true">
            <div className="about-hero__line" />
          </div>

          {/* Narrative content below the line on the right side */}
          <div className="about-hero__bottom-row">
            <div className="about-hero__narrative">
              <h2 className="about-hero__narrative-lead about-hero-anim">
                IS A PROFESSIONAL LOGISTICS COMPANY WITH EXTENSIVE EXPERIENCE IN TRANSPORTATION AND SUPPLY-CHAIN MANAGEMENT.
              </h2>
              <div className="about-hero__narrative-body about-hero-anim">
                <p>
                  Since 2005, acp Logistics has been providing dependable freight
                  forwarding and logistics solutions to businesses worldwide. With
                  expertise in customs clearance, air freight, sea freight, and inland
                  transportation, we help our clients move cargo efficiently, securely,
                  and on schedule.
                </p>
                <p>
                  Committed to excellence, our team simplifies complex shipping
                  processes and delivers reliable solutions tailored to diverse business
                  needs across international supply chains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. WHY CHOOSE ACP LOGISTICS — Wrapped in Navy-Blue Container  */}
      {/* Using exact homepage About Us / Footer blue: #0b263c           */}
      {/* Topbar, 2-column header, 3 feature cards, marquee watermark    */}
      {/* ============================================================== */}
      <section
        className="about-why"
        id="about-why"
        aria-labelledby="about-why-title"
      >
        <div className="about-container about-container--wide">
          <div className="about-why-panel">
            {/* Topbar strip inside the panel matching Image 1 */}
            <div className="about-why-panel__topbar">
              <span className="about-why-panel__eyebrow">WHY US?</span>
              <span className="about-why-panel__brand-tag">ACP LOGISTICS PAKISTAN</span>
            </div>

            <div className="about-why-panel__divider" aria-hidden="true" />

            {/* Two-column heading & description header */}
            <div className="about-why__header about-section-heading-anim">
              <h2 id="about-why-title" className="about-why__title">
                WHY CHOOSE <span className="about-why__title-accent">ACP LOGISTICS?</span>
              </h2>
              <p className="about-why__header-desc">
                Tailored freight solutions backed by rigorous precision, global partnerships,
                and two decades of international supply chain leadership.
              </p>
            </div>

            {/* The 3 Feature Cards (Preserved light background, 3D tilt, hover effects) */}
            <div className="about-why__bars" role="region" aria-label="Key Advantages">
              {reasons.map(({ number, title, description, icon: Icon, tag }, index) => {
                const isActive = activeReason === index
                return (
                  <article
                    className={`about-reason-bar ${isActive ? 'is-active' : ''}`}
                    key={title}
                    onMouseEnter={() => setActiveReason(index)}
                    tabIndex={0}
                    onFocus={() => setActiveReason(index)}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="about-reason-bar__accent-line" aria-hidden="true" />

                    <div className="about-reason-bar__left">
                      <span className="about-reason-bar__number">{number}</span>
                      <div className="about-reason-bar__icon-box">
                        <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                    </div>

                    <div className="about-reason-bar__middle">
                      <div className="about-reason-bar__meta">
                        <span className="about-reason-bar__tag">{tag}</span>
                      </div>
                      <h3 className="about-reason-bar__title">{title}</h3>
                      <p className="about-reason-bar__desc">{description}</p>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Oversized Marquee Watermark at the bottom of the container */}
            <div className="about-why__marquee" aria-hidden="true">
              <div className="about-why__marquee-track">
                <div className="about-why__marquee-group">
                  <span>OPERATING SINCE 2005</span>
                  <span className="about-why__marquee-dot" />
                  <span>GLOBAL FREIGHT FORWARDING</span>
                  <span className="about-why__marquee-dot" />
                  <span>OPERATING SINCE 2005</span>
                  <span className="about-why__marquee-dot" />
                  <span>ACP LOGISTICS PAKISTAN</span>
                  <span className="about-why__marquee-dot" />
                </div>
                <div className="about-why__marquee-group">
                  <span>OPERATING SINCE 2005</span>
                  <span className="about-why__marquee-dot" />
                  <span>GLOBAL FREIGHT FORWARDING</span>
                  <span className="about-why__marquee-dot" />
                  <span>OPERATING SINCE 2005</span>
                  <span className="about-why__marquee-dot" />
                  <span>ACP LOGISTICS PAKISTAN</span>
                  <span className="about-why__marquee-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. OUR MAIN GOALS — Larger Cards, Identical Vertical Alignment */}
      {/* ============================================================== */}
      <section
        className="about-goals"
        id="about-goals"
        aria-labelledby="about-goals-title"
      >
        <div className="about-container about-container--wide">
          <div className="about-goals__header about-section-heading-anim">
            <h2 id="about-goals-title" className="about-goals__title">
              OUR MAIN GOALS
            </h2>
          </div>

          <div className="about-goals__grid" role="list">
            {goals.map(({ number, title, subtitle, description }) => (
              <article
                className="about-goal-card"
                key={title}
                role="listitem"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="about-goal-card__top">
                  <span className="about-goal-watermark" aria-hidden="true">
                    {number}
                  </span>
                  <span className="about-goal-card__badge">{subtitle}</span>
                </div>

                <div className="about-goal-card__body">
                  <h3 className="about-goal-card__heading">{title}</h3>
                  <p className="about-goal-card__paragraph">{description}</p>
                </div>

                <div className="about-goal-card__bottom-bar" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. OUR COMMITMENT — REORDERED: BEFORE FACTS ABOUT US           */}
      {/* 3D Dramatic Heading Entrance + Alphabet-by-Alphabet Scroll Fill*/}
      {/* ============================================================== */}
      <section
        className="about-commitment"
        id="about-commitment"
        aria-labelledby="about-commitment-title"
      >
        <div className="about-commitment__glow" aria-hidden="true" />
        <div className="about-commitment__orb about-commitment__orb--one" aria-hidden="true" />
        <div className="about-commitment__orb about-commitment__orb--two" aria-hidden="true" />

        <div className="about-commitment__inner">
          <h2
            id="about-commitment-title"
            className="about-commitment__title about-commitment__anim"
          >
            Our Commitment
          </h2>

          <p className="about-commitment__lead about-commitment__anim">
            {COMMITMENT_PARAGRAPH_1}
          </p>

          <p className="about-commitment__body about-commitment__anim">
            {COMMITMENT_PARAGRAPH_2}
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FACTS ABOUT US — REORDERED: AFTER OUR COMMITMENT            */}
      {/* Cards styled in exact footer navy #0b263c with white figures   */}
      {/* ============================================================== */}
      <section
        className="about-facts"
        id="about-facts"
        aria-labelledby="about-facts-title"
      >
        <div className="about-container about-container--wide">
          <div className="about-facts__header about-section-heading-anim">
            <h2 id="about-facts-title" className="about-facts__title">
              FACTS ABOUT US
            </h2>
          </div>

          <div className="about-facts__grid" role="list">
            {facts.map(({ value, count, isSupport, isGlobal, title, description, highlight }, index) => (
              <article
                className={`about-fact-card ${isGlobal ? 'about-fact-card--global' : ''}`}
                key={title}
                role="listitem"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="about-fact-card__hud">
                  <span className="about-fact-card__index">0{index + 1}</span>
                  <span className="about-fact-card__tag">
                    {highlight}
                  </span>
                </div>

                <div className="about-fact-card__number-wrap">
                  {count ? (
                    <div
                      className="about-fact-value about-fact-value--counter"
                      data-count-target={count}
                      aria-label={value}
                    >
                      +0
                    </div>
                  ) : isSupport ? (
                    <div
                      className="about-fact-value about-fact-value--support"
                      aria-label={value}
                    >
                      24/7
                    </div>
                  ) : (
                    <div
                      className="about-fact-value about-fact-value--global"
                      aria-label="Global Connectivity"
                    >
                      GLOBAL
                    </div>
                  )}
                </div>

                <div className="about-fact-card__content">
                  <h3 className="about-fact-card__title">{title}</h3>
                  <p className="about-fact-card__desc">{description}</p>
                </div>

                <div className="about-fact-card__glow" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
