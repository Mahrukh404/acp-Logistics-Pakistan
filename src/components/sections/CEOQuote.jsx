import { useLayoutEffect, useRef } from 'react'
import { UserRound } from 'lucide-react'
import { gsap } from '../../animations/gsap.js'
import './CEOQuote.css'

const quoteText =
  'ACP Logistics a trusted freight forwarding and logistics company serving clients worldwide since 2005. Founded with a commitment to reliability and efficiency. We have spent over two decades helping businesses move cargo seamlessly across international borders.'

const quoteWords = quoteText.split(' ')

function CEOQuote() {
  const sectionRef = useRef(null)
  const quoteWordRefs = useRef([])
  const portraitRef = useRef(null)
  const identityRef = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            end: 'top 48%',
            toggleActions: 'play none none reverse',
          },
        })
        .fromTo(
          sectionRef.current,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        )
        .fromTo(
          quoteWordRefs.current,
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.014,
            ease: 'power2.out',
          },
          '-=0.24',
        )
        .fromTo(
          portraitRef.current,
          { autoAlpha: 0, y: 22, scale: 0.86 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: 'power3.out',
          },
          '-=0.18',
        )
        .fromTo(
          identityRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.22',
        )
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section
      className="ceo-quote"
      ref={sectionRef}
      aria-labelledby="ceo-quote-name"
    >
      <div className="ceo-quote__inner">
        <div className="ceo-quote__panel">
          <blockquote
            className="ceo-quote__text"
            aria-label={quoteText}
          >
            {quoteWords.map((word, index) => (
              <span
                className="ceo-quote__word"
                key={`${word}-${index}`}
                ref={(node) => {
                  if (node) quoteWordRefs.current[index] = node
                }}
                aria-hidden="true"
              >
                {word}
                {index < quoteWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </blockquote>
        </div>

        <figure className="ceo-quote__portrait-wrap" ref={portraitRef}>
          <div
            className="ceo-quote__portrait-placeholder"
            role="img"
            aria-label="Portrait of Shahzad Awan not provided"
          >
            <UserRound aria-hidden="true" size={42} strokeWidth={1.25} />
            <span>CEO portrait needed</span>
          </div>
        </figure>

        <div className="ceo-quote__identity" ref={identityRef}>
          <h2 id="ceo-quote-name">Shahzad Awan</h2>
          <p>CEO, ACP Logistics</p>
        </div>
      </div>
    </section>
  )
}

export default CEOQuote