import { useEffect, useRef, useState } from 'react'
import { heroIntroState } from '../../animations/heroIntro.js'
import './CinematicPreloader.css'

const PRELOADER_SLIDES = [
  {
    id: 'ocean',
    image: '/images/sea_optimized.jpg',
    category: 'MARITIME LOGISTICS',
    title: 'Global Ocean Freight Solutions',
    description: 'Connecting international trade hubs with full container loads and scheduled vessel charters.',
    accent: 'Karachi • Gwadar • Global Trade Hubs',
    tag: 'EST. 2005',
  },
  {
    id: 'air',
    image: '/images/air_optimized.jpg',
    category: 'EXPRESS EXPEDITION',
    title: 'Worldwide Air Cargo Transit',
    description: 'Time-critical continental transport and rapid customs transit across major international destinations.',
    accent: 'Priority Air Routes • Continental Transit',
    tag: 'WORLDWIDE REACH',
  },
  {
    id: 'container',
    image: '/images/containers-yard.jpg',
    category: 'TERMINAL INFRASTRUCTURE',
    title: 'Intermodal Port & Drayage Services',
    description: 'Seamless terminal operations, secure bonded warehousing, and multi-modal container transport.',
    accent: 'FCL & LCL • Port Clearance • Secure Yards',
    tag: 'SECURED HANDLING',
  },
  {
    id: 'warehouse',
    image: '/images/warehouse_optimized.jpg',
    category: 'SUPPLY CHAIN NETWORKS',
    title: 'Integrated Warehousing & Distribution',
    description: 'Customized supply chain solutions, inventory management, and door-to-door cargo delivery.',
    accent: 'End-to-End Distribution • 20+ Years Legacy',
    tag: 'EXCELLENCE',
  },
]

function getStatusMessage(pct) {
  if (pct < 28) return 'INITIALIZING GLOBAL LOGISTICS MATRIX...'
  if (pct < 55) return 'SYNCHRONIZING MARITIME & AIR FREIGHT PROTOCOLS...'
  if (pct < 82) return 'VERIFYING CUSTOMS & TERMINAL CLEARANCES...'
  if (pct < 100) return 'FINALIZING SECURED FLEET DISPATCH...'
  return 'ALL SYSTEMS SYNCHRONIZED • WELCOME TO ACP'
}

export default function CinematicPreloader({ onFinish }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isReadyToExit, setIsReadyToExit] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const progressRef = useRef(0)
  const isMountedRef = useRef(true)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    isMountedRef.current = true
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Preload & decode slide images
    PRELOADER_SLIDES.forEach((slide) => {
      const img = new Image()
      img.src = slide.image
      if (img.decode) {
        img.decode().catch(() => {})
      }
    })

    // Advance slides periodically
    const slideInterval = setInterval(() => {
      if (!isMountedRef.current) return
      setCurrentSlideIndex((prev) => (prev + 1) % PRELOADER_SLIDES.length)
    }, prefersReducedMotion ? 900 : 850)

    // Smooth progress counter simulation synchronized with asset readiness
    const startTime = performance.now()
    const targetDuration = prefersReducedMotion ? 1200 : 2200

    let assetsReady = false

    // Asset readiness check
    const checkAssets = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready
        }
      } catch {
        // fallback
      }
      assetsReady = true
    }

    if (document.readyState === 'complete') {
      checkAssets()
    } else {
      window.addEventListener('load', checkAssets, { once: true })
    }

    const updateProgress = (now) => {
      if (!isMountedRef.current) return
      const elapsed = now - startTime
      const timeProgress = Math.min(elapsed / targetDuration, 1)

      // Eased progress (cubic ease out)
      const eased = 1 - Math.pow(1 - timeProgress, 3)
      let currentVal = Math.round(eased * 100)

      // Hold at 98% until min duration and assets ready
      if (currentVal >= 98 && (!assetsReady || elapsed < targetDuration)) {
        currentVal = 98
      }

      if (elapsed >= targetDuration && assetsReady) {
        currentVal = 100
      }

      progressRef.current = currentVal
      setProgress(currentVal)

      if (currentVal < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
      } else {
        setIsReadyToExit(true)
      }
    }

    animationFrameRef.current = requestAnimationFrame(updateProgress)

    // Absolute fallback timer (max 3.6s) to ensure site never hangs
    const safetyTimeout = setTimeout(() => {
      if (isMountedRef.current && progressRef.current < 100) {
        setProgress(100)
        setIsReadyToExit(true)
      }
    }, 3600)

    return () => {
      isMountedRef.current = false
      clearInterval(slideInterval)
      clearTimeout(safetyTimeout)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('load', checkAssets)
    }
  }, [])

  // Handle curtain exit sequence once 100% is reached
  useEffect(() => {
    if (!isReadyToExit) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const exitDelay = prefersReducedMotion ? 100 : 320

    const exitTimer = setTimeout(() => {
      setIsExiting(true)

      // Broadcast site revealed event for Hero and Header animations
      heroIntroState.readyToAnimate = true
      window.dispatchEvent(new CustomEvent('acp-site-revealed'))

      const finishDelay = prefersReducedMotion ? 200 : 950
      const finishTimer = setTimeout(() => {
        setHasFinished(true)
        if (onFinish) onFinish()
      }, finishDelay)

      return () => clearTimeout(finishTimer)
    }, exitDelay)

    return () => clearTimeout(exitTimer)
  }, [isReadyToExit, onFinish])

  if (hasFinished) return null

  const activeSlide = PRELOADER_SLIDES[currentSlideIndex]

  return (
    <div
      className={`cinematic-preloader${isExiting ? ' is-exiting' : ''}`}
      aria-label="Loading ACP Logistics Pakistan"
      role="status"
      aria-live="polite"
    >
      {/* Background Slideshow Layer */}
      <div className="cinematic-preloader__slides">
        {PRELOADER_SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex
          return (
            <div
              key={slide.id}
              className={`cinematic-preloader__slide${isActive ? ' is-active' : ''}`}
              aria-hidden={!isActive}
            >
              <img
                className="cinematic-preloader__image"
                src={slide.image}
                alt=""
                draggable="false"
              />
              <div className="cinematic-preloader__scrim" />
              <div className="cinematic-preloader__vignette" />
            </div>
          )
        })}
      </div>

      {/* Atmospheric Ambient Grid & Noise */}
      <div className="cinematic-preloader__ambient-grid" aria-hidden="true" />

      {/* Top Header Bar */}
      <header className="cinematic-preloader__header">
        <div className="cinematic-preloader__header-badge">
          <span className="cinematic-preloader__pulse-dot" />
          <span>ACP LOGISTICS PAKISTAN</span>
        </div>

        <div className="cinematic-preloader__brand-center">
          <img
            className="cinematic-preloader__logo"
            src="/images/logo-transparent.png"
            alt="ACP Logistics"
            draggable="false"
          />
        </div>

        <div className="cinematic-preloader__header-meta">
          <span>OPERATING SINCE 2005</span>
        </div>
      </header>

      {/* Center Dynamic Typography Showcase */}
      <main className="cinematic-preloader__center-showcase">
        <div className="cinematic-preloader__slide-meta" key={activeSlide.id}>
          <div className="cinematic-preloader__meta-tagline">
            <span className="cinematic-preloader__slide-index">
              0{currentSlideIndex + 1} // 0{PRELOADER_SLIDES.length}
            </span>
            <span className="cinematic-preloader__slide-category">
              {activeSlide.category}
            </span>
            <span className="cinematic-preloader__pill">{activeSlide.tag}</span>
          </div>

          <h1 className="cinematic-preloader__title">
            {activeSlide.title}
          </h1>

          <p className="cinematic-preloader__description">
            {activeSlide.description}
          </p>

          <div className="cinematic-preloader__accent-line">
            <span className="cinematic-preloader__accent-bullet" />
            <span>{activeSlide.accent}</span>
          </div>
        </div>
      </main>

      {/* Bottom Telemetry & Progress Control */}
      <footer className="cinematic-preloader__footer">
        <div className="cinematic-preloader__telemetry">
          <div className="cinematic-preloader__status">
            <span className="cinematic-preloader__radar" />
            <span className="cinematic-preloader__status-text">
              {getStatusMessage(progress)}
            </span>
          </div>

          <div className="cinematic-preloader__counter">
            <span className="cinematic-preloader__counter-num">
              {String(progress).padStart(2, '0')}
            </span>
            <span className="cinematic-preloader__counter-unit">%</span>
          </div>
        </div>

        {/* Slide Tracker Pips */}
        <div className="cinematic-preloader__tracker">
          {PRELOADER_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`cinematic-preloader__pip${
                index === currentSlideIndex ? ' is-active' : index < currentSlideIndex ? ' is-passed' : ''
              }`}
              title={slide.category}
            >
              <div className="cinematic-preloader__pip-fill" />
            </div>
          ))}
        </div>

        {/* Global Luminous Progress Line */}
        <div
          className="cinematic-preloader__progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="cinematic-preloader__progress-fill"
            style={{ width: `${progress}%` }}
          >
            <span className="cinematic-preloader__progress-glow" />
          </div>
        </div>
      </footer>

      {/* High-End Cinematic Dual Shutter Panels for Exit Reveal */}
      <div className="cinematic-preloader__shutter cinematic-preloader__shutter--top" aria-hidden="true" />
      <div className="cinematic-preloader__shutter cinematic-preloader__shutter--bottom" aria-hidden="true" />
    </div>
  )
}
