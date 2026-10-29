import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import services from '../../data/services.js'
import './ServicesIntro.css'

const AUTO_MS = 1800

function wrapIndex(index, length) {
  return ((index % length) + length) % length
}

function getCardStyle(offset, reduceMotion) {
  const abs = Math.abs(offset)

  if (reduceMotion) {
    return {
      opacity: offset === 0 ? 1 : 0,
      pointerEvents: offset === 0 ? 'auto' : 'none',
      zIndex: offset === 0 ? 8 : 0,
      transform: 'translate(-50%, -50%)',
    }
  }

  const translateX = offset * 58
  const translateZ = offset === 0 ? 140 : 40 - abs * 70
  const rotateY = offset * -32
  const scale = offset === 0 ? 1 : Math.max(0.68, 0.88 - abs * 0.08)
  const opacity = abs > 2 ? 0 : abs === 2 ? 0.42 : abs === 1 ? 0.78 : 1

  return {
    opacity,
    zIndex: 10 - abs,
    pointerEvents: offset === 0 ? 'auto' : 'none',
    transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
  }
}

function ServicesIntro() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const total = services.length
  const activeService = services[activeIndex]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    services.forEach(({ image }) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = image
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduceMotion || !isInView || total < 2) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, total))
    }, AUTO_MS)

    return () => window.clearInterval(timer)
  }, [isInView, reduceMotion, total])

  const goTo = (index) => setActiveIndex(wrapIndex(index, total))
  const goPrev = () => goTo(activeIndex - 1)
  const goNext = () => goTo(activeIndex + 1)

  return (
    <section
      className="services-showcase"
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
    >
      <div className="services-showcase__bg" aria-hidden="true">
        <img
          className="services-showcase__bg-image"
          src={activeService.image}
          alt=""
        />
        <div className="services-showcase__bg-scrim" />
      </div>
      <div className="services-showcase__glow" aria-hidden="true" />

      <header className="services-showcase__header">
        <p className="services-showcase__eyebrow">What we deliver</p>
        <h2 className="services-showcase__title" id="services-heading">
          Our Services
        </h2>
        <p className="services-showcase__lead">
          End-to-end freight solutions — every card moves into focus as we
          rotate through the network.
        </p>
      </header>

      <div className="services-showcase__stage">
        <div className="services-showcase__scene" aria-live="polite">
          {services.map((service, index) => {
            let offset = index - activeIndex
            if (offset > total / 2) offset -= total
            if (offset < -total / 2) offset += total

            return (
              <article
                className={`services-card${offset === 0 ? ' is-active' : ''}`}
                key={service.title}
                style={getCardStyle(offset, reduceMotion)}
                aria-hidden={offset !== 0}
              >
                <div className="services-card__media">
                  <img
                    src={service.image}
                    alt=""
                    loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div className="services-card__body">
                  <p className="services-card__layer">
                    Service {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="services-card__title">{service.title}</h3>
                  <p className="services-card__description">{service.description}</p>
                </div>
              </article>
            )
          })}
        </div>

        <button
          className="services-showcase__nav services-showcase__nav--prev"
          type="button"
          aria-label="Previous service"
          onClick={goPrev}
        >
          <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.8} />
        </button>
        <button
          className="services-showcase__nav services-showcase__nav--next"
          type="button"
          aria-label="Next service"
          onClick={goNext}
        >
          <ArrowRight aria-hidden="true" size={20} strokeWidth={1.8} />
        </button>
      </div>

      <div className="services-showcase__footer">
        <div className="services-showcase__dots" role="tablist" aria-label="Service slides">
          {services.map((service, index) => (
            <button
              key={service.title}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${service.title}`}
              className={`services-showcase__dot${index === activeIndex ? ' is-active' : ''}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <p className="services-showcase__counter" aria-live="polite">
          {String(activeIndex + 1).padStart(2, '0')}
          <span> / {String(total).padStart(2, '0')}</span>
        </p>

        <a
          className="services-showcase__cta"
          href={`/contact?service=${encodeURIComponent(activeService.title)}`}
        >
          <span>Explore {activeService.title}</span>
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
        </a>
      </div>
    </section>
  )
}

export default ServicesIntro
