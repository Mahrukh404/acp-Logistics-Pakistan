import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap.js'
import './CEOQuote.css'

const quoteText =
  'ACP Logistics is a trusted freight forwarding and logistics company serving clients worldwide since 2005. Founded with a commitment to reliability and efficiency, we have spent over two decades helping businesses move cargo seamlessly across international borders.'

function CEOQuote() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const bits = section.querySelectorAll('.ceo-quote__anim')
    const cards = section.querySelectorAll('.ceo-quote__stat')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([bits, cards], { autoAlpha: 1, y: 0, scale: 1 })
      return undefined
    }

    const context = gsap.context(() => {
      gsap.from(bits, {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          once: true,
          toggleActions: 'play none none none',
        },
      })

      // Cards appear one-by-one with a clear pause between each
      gsap.from(cards, {
        autoAlpha: 0,
        y: 36,
        scale: 0.92,
        duration: 0.65,
        stagger: 0.45,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: section.querySelector('.ceo-quote__stats') || section,
          start: 'top 90%',
          once: true,
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => {
      context.revert()
      gsap.set([bits, cards], { clearProps: 'visibility,opacity,transform' })
    }
  }, [])

  return (
    <section
      className="ceo-quote"
      ref={sectionRef}
      aria-labelledby="ceo-quote-name"
    >
      <div className="ceo-quote__glow" aria-hidden="true" />
      <div className="ceo-quote__orb ceo-quote__orb--one" aria-hidden="true" />
      <div className="ceo-quote__orb ceo-quote__orb--two" aria-hidden="true" />

      <div className="ceo-quote__inner">
        <div className="ceo-quote__copy">
          <div className="ceo-quote__mark ceo-quote__anim" aria-hidden="true">
            <img src="/images/quotes.svg" alt="" width="48" height="36" />
          </div>

          <blockquote className="ceo-quote__text ceo-quote__anim">
            {quoteText}
          </blockquote>

          <div className="ceo-quote__stats" aria-label="Company highlights">
            <div className="ceo-quote__stat">
              <strong>2005</strong>
              <span>Founded</span>
            </div>
            <div className="ceo-quote__stat">
              <strong>20+</strong>
              <span>Years of trust</span>
            </div>
            <div className="ceo-quote__stat">
              <strong>Global</strong>
              <span>Trade coverage</span>
            </div>
          </div>
        </div>

        <figure className="ceo-quote__portrait ceo-quote__anim">
          <div className="ceo-quote__portrait-frame">
            <img
              className="ceo-quote__portrait-img"
              src="/images/ceo-shahzad-awan.png"
              alt="Shahzad Awan, CEO of ACP Logistics"
              width={559}
              height={550}
              loading="lazy"
              decoding="async"
            />
            <div className="ceo-quote__ceo-tag">
              <strong id="ceo-quote-name">Shahzad Awan</strong>
              <span>CEO, ACP Logistics</span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}

export default CEOQuote
