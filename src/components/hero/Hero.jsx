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

const heroContent = {
  hidden: {},
  visible: (reduceMotion) => ({
    transition: {
      delayChildren: reduceMotion ? 0 : 0.12,
      staggerChildren: reduceMotion ? 0 : 0.16,
    },
  }),
}

const heroItem = {
  hidden: (reduceMotion) => ({
    opacity: 0,
    y: reduceMotion ? 0 : 18,
  }),
  visible: (reduceMotion) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      ease: [0.22, 0.68, 0, 1],
    },
  }),
}

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
    if (prefersReducedMotion) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        scrollContentRef.current,
        { y: 0 },
        {
          y: () => (window.innerWidth <= 640 ? -72 : -118),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () =>
              window.innerWidth <= 640 ? 'bottom 25%' : 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      )
    }, sectionRef)

    return () => context.revert()
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
          variants={heroContent}
          initial="hidden"
          animate="visible"
          custom={prefersReducedMotion}
          style={prefersReducedMotion ? undefined : { x: contentX, y: contentY }}
        >
          <motion.p
            className="hero-section__eyebrow"
            variants={heroItem}
            custom={prefersReducedMotion}
          >
            ACP Logistics
          </motion.p>

          <motion.h1
            className="hero-section__title"
            id="hero-title"
            variants={heroItem}
            custom={prefersReducedMotion}
          >
            Freight Forwarding
            <br />&amp; Global Cargo Solutions
          </motion.h1>

          <motion.p
            className="hero-section__description"
            variants={heroItem}
            custom={prefersReducedMotion}
          >
            Across Borders, Beyond Expectations
          </motion.p>

          <motion.div
            className="hero-section__actions"
            variants={heroItem}
            custom={prefersReducedMotion}
          >
            <a className="hero-button hero-button--primary" href="#services">
              Explore Our Services
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
            <a className="hero-button hero-button--secondary" href="#contact">
              Get a Quote
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
            </a>
          </motion.div>
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