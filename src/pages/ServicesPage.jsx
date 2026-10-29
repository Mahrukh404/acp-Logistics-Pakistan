import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
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

const serviceMetaTags = [
  'GLOBAL OCEAN TRANSIT // CONTAINER LOGISTICS',
  'MULTIMODAL END-TO-END // FIRST TO LAST MILE',
  'PRIORITY AIR CARGO // EXPEDITED FREIGHT',
  'SECURE WAREHOUSING // INVENTORY & CROSS-DOCK',
  'CUSTOMS BROKERAGE // REGULATORY COMPLIANCE',
  'CONSOLIDATED FREIGHT // FULL & SHARED CAPACITY',
]

const DESKTOP_QUERY = '(min-width: 1025px) and (prefers-reduced-motion: no-preference)'

function getPanelIndexFromHash(hash) {
  if (!hash) return -1
  if (hash === '#top') return 0
  const match = hash.match(/^#service-(\d{2})$/)
  if (!match) return -1
  return Number(match[1])
}

function ServicesPage() {
  const pageRef = useRef(null)
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const progressFillRef = useRef(null)
  const activeCounterRef = useRef(null)
  const horizontalTriggerRef = useRef(null)
  const videoRef = useRef(null)
  const [videoError, setVideoError] = useState(false)
  const [activeSlide, setActiveSlide] = useState(1)
  const [videoReady, setVideoReady] = useState(false)

  const handleImageMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
  }, [])

  const handleImageMouseLeave = useCallback((e) => {
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }, [])

  // Load hero video after first paint so the page appears instantly
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const timer = window.setTimeout(() => setVideoReady(true), 150)
    return () => window.clearTimeout(timer)
  }, [])

  // Mobile / stacked layout: jump to #service-XX after page transition
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash === '#top') return undefined

    const isDesktopHorizontal = window.matchMedia(DESKTOP_QUERY).matches
    if (isDesktopHorizontal) return undefined

    const target = document.getElementById(hash.slice(1))
    if (!target) return undefined

    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 480)

    return () => window.clearTimeout(timer)
  }, [])

  useLayoutEffect(() => {
    const page = pageRef.current
    const stage = stageRef.current
    const track = trackRef.current
    if (!page || !stage || !track) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia()

      // -------------------------------------------------------------
      // 1. Fast hero entrance — content stays visible (no hide-first)
      // -------------------------------------------------------------
      if (!reduceMotion) {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        const heroWords = page.querySelectorAll('.service-hero__word')
        const heroLine = page.querySelector('.service-hero__accent-line')
        const heroSubtitle = page.querySelector('.service-hero__subtitle')
        const heroBadge = page.querySelector('.service-hero__tag-strip')

        if (heroBadge) {
          heroTl.from(heroBadge, { y: -12, duration: 0.45, clearProps: 'transform' })
        }

        if (heroWords.length > 0) {
          heroTl.from(
            heroWords,
            {
              y: 28,
              duration: 0.55,
              stagger: 0.08,
              clearProps: 'transform',
            },
            '-=0.2',
          )
        }

        if (heroLine) {
          heroTl.from(
            heroLine,
            { scaleX: 0, duration: 0.55, ease: 'expo.out', clearProps: 'transform' },
            '-=0.3',
          )
        }

        if (heroSubtitle) {
          heroTl.from(
            heroSubtitle,
            { y: 16, duration: 0.45, clearProps: 'transform' },
            '-=0.25',
          )
        }
      }

      // -------------------------------------------------------------
      // 2. Desktop Horizontal Scrub & Panel Transitions
      // -------------------------------------------------------------
      media.add(DESKTOP_QUERY, () => {
        const panels = gsap.utils.toArray('[data-service-panel]', track)

        const sizePanels = () => {
          const width = stage.clientWidth
          const height = stage.clientHeight
          panels.forEach((panel) => {
            panel.style.width = `${width}px`
            panel.style.height = `${height}px`
          })
        }

        sizePanels()

        const getScrollLength = () => Math.max(0, track.scrollWidth - stage.clientWidth)

        gsap.set(track, { x: 0 })
        if (progressFillRef.current) {
          gsap.set(progressFillRef.current, {
            width: `${100 / Math.max(panels.length, 1)}%`,
          })
        }

        const tween = gsap.to(track, {
          x: () => -getScrollLength(),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${getScrollLength()}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressFillRef.current) {
                const startWidth = 100 / Math.max(panels.length, 1)
                progressFillRef.current.style.width = `${startWidth + self.progress * (100 - startWidth)}%`
              }
              const currentIdx = Math.min(
                services.length,
                Math.max(1, Math.round(self.progress * (panels.length - 1)))
              )
              setActiveSlide(currentIdx)
            },
          },
        })

        horizontalTriggerRef.current = tween.scrollTrigger

        // Parallax depth on images inside service panels during horizontal scroll
        panels.forEach((panel, i) => {
          if (panel.dataset.panelType === 'intro') return
          const img = panel.querySelector('.service-panel__img')
          const heading = panel.querySelector('.service-panel__heading')
          const copy = panel.querySelector('.service-panel__copy-inner')

          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.12, xPercent: -6 },
              {
                scale: 1,
                xPercent: 6,
                ease: 'none',
                scrollTrigger: {
                  trigger: stage,
                  start: () => `top+=${Math.max(0, (i - 1) * stage.clientWidth)} top`,
                  end: () => `top+=${(i + 1) * stage.clientWidth} top`,
                  scrub: true,
                },
              }
            )
          }

          if (heading) {
            gsap.fromTo(
              heading,
              { y: 28 },
              {
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: stage,
                  start: () => `top+=${Math.max(0, (i - 0.7) * stage.clientWidth)} top`,
                  end: () => `top+=${i * stage.clientWidth} top`,
                  scrub: 1,
                },
              }
            )
          }

          if (copy) {
            gsap.fromTo(
              copy,
              { x: 25 },
              {
                x: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: stage,
                  start: () => `top+=${Math.max(0, (i - 0.8) * stage.clientWidth)} top`,
                  end: () => `top+=${i * stage.clientWidth} top`,
                  scrub: 1,
                },
              }
            )
          }
        })

        const scrollToPanel = (index) => {
          const trigger = horizontalTriggerRef.current
          if (!trigger || index < 0) return
          const clamped = Math.min(index, panels.length - 1)
          const top =
            trigger.start +
            (clamped / Math.max(panels.length - 1, 1)) * (trigger.end - trigger.start)
          window.scrollTo({ top, behavior: 'smooth' })
        }

        const onHashClick = (event) => {
          const link = event.target.closest('a[href^="#"]')
          if (!link || !page.contains(link)) return
          const index = getPanelIndexFromHash(link.getAttribute('href'))
          if (index < 0) return
          event.preventDefault()
          scrollToPanel(index)
        }

        page.addEventListener('click', onHashClick)

        const onResize = () => {
          sizePanels()
          ScrollTrigger.refresh()
        }

        window.addEventListener('resize', onResize)

        const applyHashScroll = () => {
          sizePanels()
          ScrollTrigger.refresh()
          const hashIndex = getPanelIndexFromHash(window.location.hash)
          if (hashIndex < 0 || !horizontalTriggerRef.current) return
          const trigger = horizontalTriggerRef.current
          const top =
            trigger.start +
            (hashIndex / Math.max(panels.length - 1, 1)) * (trigger.end - trigger.start)
          window.scrollTo({ top, behavior: 'auto' })
        }

        requestAnimationFrame(() => {
          applyHashScroll()
          // Page transition finishes a beat later — re-apply so hash lands correctly
          window.setTimeout(applyHashScroll, 520)
        })

        return () => {
          page.removeEventListener('click', onHashClick)
          window.removeEventListener('resize', onResize)
          horizontalTriggerRef.current = null
          panels.forEach((panel) => {
            panel.style.width = ''
            panel.style.height = ''
          })
        }
      })

      // -------------------------------------------------------------
      // 3. Mobile — light motion only (never hide content)
      // -------------------------------------------------------------
      media.add('(max-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray('[data-service-panel]', track)

        panels.forEach((panel) => {
          if (panel.dataset.panelType === 'intro') return
          const image = panel.querySelector('[data-service-image]')
          const copy = panel.querySelector('[data-service-copy]')

          if (image) {
            gsap.from(image, {
              y: 20,
              duration: 0.55,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: panel,
                start: 'top 90%',
                once: true,
              },
            })
          }

          if (copy) {
            gsap.from(copy, {
              y: 16,
              duration: 0.5,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: panel,
                start: 'top 90%',
                once: true,
              },
            })
          }
        })
      })

      // 4. Closing CTA — visible by default, soft entrance only
      const closingSection = page.querySelector('.services-page__closing')
      if (closingSection && !reduceMotion) {
        const closingBits = closingSection.querySelectorAll(
          '.services-page__closing-eyebrow, .services-page__closing-title, .services-page__closing-lead, .services-page__closing-btn',
        )

        gsap.from(closingBits, {
          y: 22,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: closingSection,
            start: 'top 88%',
            once: true,
          },
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="services-page" ref={pageRef}>
      <div className="services-stage" ref={stageRef}>
        <div className="services-track" ref={trackRef}>
          {/* ============================================================== */}
          {/* 1. HERO SECTION WITH CINEMATIC BACKGROUND VIDEO                */}
          {/* ============================================================== */}
          <section
            className="service-hero"
            data-service-panel
            data-panel-type="intro"
            id="top"
            aria-labelledby="services-hero-title"
          >
            <div className="service-hero__video-layer">
              {!videoError && videoReady ? (
                <video
                  ref={videoRef}
                  className="service-hero__video"
                  src="/videos/service_hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/images/sea_optimized.jpg"
                  aria-hidden="true"
                  tabIndex={-1}
                  onError={() => setVideoError(true)}
                />
              ) : (
                <img
                  className="service-hero__video service-hero__video-fallback"
                  src="/images/sea_optimized.jpg"
                  alt="ACP Logistics Ocean and Air Freight Network"
                />
              )}
              <div className="service-hero__scrim" aria-hidden="true" />
              <div className="service-hero__grid-mesh" aria-hidden="true" />
            </div>

            <div className="service-hero__content">
              <div className="service-hero__tag-strip" aria-hidden="true">
                <span className="service-hero__tag-dot" />
                <span className="service-hero__tag-text">
                  GLOBAL LOGISTICS &bull; FREIGHT FORWARDING &bull; EST. 2005
                </span>
              </div>

              <h1 className="service-hero__title" id="services-hero-title">
                <span className="service-hero__word-wrap">
                  <span className="service-hero__word">OUR</span>
                </span>{' '}
                <span className="service-hero__word-wrap">
                  <span className="service-hero__word">SERVICES</span>
                </span>
              </h1>

              <div className="service-hero__line-wrap" aria-hidden="true">
                <div className="service-hero__accent-line" />
              </div>

              <p className="service-hero__subtitle">
                Across borders, beyond expectations.
              </p>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 2. INDIVIDUAL SERVICE PANELS                                   */}
          {/* ============================================================== */}
          {services.map((service, index) => {
            const number = String(index + 1).padStart(2, '0')
            const metaTag = serviceMetaTags[index] || 'ACP LOGISTICS // FREIGHT SERVICES'

            return (
              <article
                className="service-panel"
                data-service-panel
                data-panel-type="service"
                id={`service-${number}`}
                key={service.title}
                aria-labelledby={`service-title-${number}`}
              >
                {/* Left Column: Image with Interactive 3D Tilt, Prominent Number & Title */}
                <div
                  className="service-panel__image"
                  data-service-image
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                >
                  <img
                    className="service-panel__img"
                    src={service.image}
                    alt={`${service.title} logistics`}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    decoding="async"
                  />
                  <div className="service-panel__image-scrim" aria-hidden="true" />

                  <div className="service-panel__image-topline" aria-hidden="true">
                    <span className="service-panel__image-badge">
                      <span className="service-panel__badge-dot" />
                      <span>{metaTag}</span>
                    </span>
                    <span className="service-panel__status-pill">OPERATIONAL</span>
                  </div>

                  <div className="service-panel__heading">
                    <span className="service-panel__number" aria-hidden="true">
                      {number}
                    </span>
                    <h2
                      className="service-panel__title"
                      id={`service-title-${number}`}
                    >
                      {service.title}
                    </h2>
                  </div>
                </div>

                {/* Right Column: Expanded Justified Description & Inquire CTA */}
                <div className="service-panel__copy" data-service-copy>
                  <div className="service-panel__copy-inner">
                    <div className="service-panel__copy-header" aria-hidden="true">
                      <div className="service-panel__copy-tag">
                        <span>SERVICE OVERVIEW</span>
                        <span className="service-panel__tag-sep">&bull;</span>
                        <span>0{index + 1} / 06</span>
                      </div>
                      <div className="service-panel__copy-loc">
                        <span>PAKISTAN &bull; WORLDWIDE</span>
                      </div>
                    </div>

                    <div className="service-panel__copy-rule" aria-hidden="true" />

                    <p className="service-panel__description">
                      {serviceDescriptions[index] || service.description}
                    </p>

                    <div className="service-panel__actions">
                      <a
                        className="service-panel__cta"
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        aria-label={`Enquire about ${service.title}`}
                      >
                        <span>Enquire about this service</span>
                        <ArrowUpRight aria-hidden="true" size={20} strokeWidth={2} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ============================================================== */}
        {/* DESKTOP PROGRESS HUD & SLIDE COUNTER                           */}
        {/* ============================================================== */}
        <div className="services-hud" aria-hidden="true">
          <div className="services-hud__counter" ref={activeCounterRef}>
            <span className="services-hud__counter-current">
              {String(activeSlide).padStart(2, '0')}
            </span>
            <span className="services-hud__counter-sep">/</span>
            <span className="services-hud__counter-total">
              {String(services.length).padStart(2, '0')}
            </span>
          </div>

          <div className="services-progressbar">
            <div className="services-progressbar__fill" ref={progressFillRef} />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CLOSING CTA SECTION ("Have a shipment in mind?")            */}
      {/* ============================================================== */}
      <section className="services-page__closing" aria-labelledby="closing-title">
        <div className="services-page__closing-content">
          <p className="services-page__closing-eyebrow">LET&apos;S MOVE FORWARD</p>
          <h2 id="closing-title" className="services-page__closing-title">
            Have a shipment in mind?
          </h2>
          <p className="services-page__closing-lead">
            We tailor end-to-end freight forwarding, storage, and customs logistics to your timeline and cargo.
          </p>
          <div className="services-page__closing-actions">
            <a className="services-page__closing-btn" href="/contact">
              <span>Talk to our team</span>
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
