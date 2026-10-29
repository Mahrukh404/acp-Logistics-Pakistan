import { useLayoutEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { gsap } from '../../animations/gsap.js'
import './Hero.css'

function Hero() {
  const sectionRef = useRef(null)
  const scrollContentRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 75, damping: 24, mass: 0.5 })
  const smoothY = useSpring(pointerY, { stiffness: 75, damping: 24, mass: 0.5 })
  const contentX = useTransform(smoothX, [-0.5, 0.5], [-4, 4])
  const contentY = useTransform(smoothY, [-0.5, 0.5], [-3, 3])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const animItems = section.querySelectorAll('.hero-anim')
    const scrollCue = section.querySelector('.hero-section__scroll')

    if (prefersReducedMotion) {
      gsap.set([animItems, scrollCue], { clearProps: 'visibility,opacity,transform' })
      return undefined
    }

    const context = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTl
        .from(animItems, {
          autoAlpha: 0,
          y: 35,
          duration: 0.85,
          stagger: 0.14,
          clearProps: 'transform',
        })
        .from(
          scrollCue,
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'transform',
          },
          '-=0.35',
        )

      gsap.fromTo(
        scrollContentRef.current,
        { y: 0 },
        {
          y: () => (window.innerWidth <= 640 ? -72 : -118),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () =>
              window.innerWidth <= 640 ? 'bottom 25%' : 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      )
    }, section)

    return () => {
      context.revert()
      gsap.set([animItems, scrollCue], { clearProps: 'visibility,opacity,transform' })
    }
  }, [prefersReducedMotion])

  const handlePointerMove = (event) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      className="hero-section"
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="hero-section__scrim" aria-hidden="true" />

      <div className="hero-section__scroll-content" ref={scrollContentRef}>
        <motion.div
          className="hero-section__content"
          style={prefersReducedMotion ? undefined : { x: contentX, y: contentY }}
        >
          <p className="hero-section__statement hero-anim">ACP Logistics</p>

          <h1 className="hero-section__title hero-anim" id="hero-title">
            Freight Forwarding
            <br />&amp; Global Cargo Solutions
          </h1>

          <p className="hero-section__tagline hero-anim">
            Across Borders, Beyond Expectations
          </p>

          <div className="hero-section__actions hero-anim">
            <a className="hero-button hero-button--primary" href="/services">
              Explore Our Services
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
            <a className="hero-button hero-button--secondary" href="/contact">
              Get a Quote
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
          </div>
        </motion.div>
      </div>

      <a className="hero-section__scroll" href="#about">
        <span>Scroll to explore</span>
        <span className="hero-section__scroll-line" aria-hidden="true">
          <ArrowDown size={14} strokeWidth={1.6} />
        </span>
      </a>
    </section>
  )
}

export default Hero
