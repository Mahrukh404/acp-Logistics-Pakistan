import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { A11y, EffectFade, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import './ServicesIntro.css'

const services = [
  {
    title: 'Global Sea Logistics',
    image: '/images/sea_optimized.jpg',
    description:
      'Cost-effective and scalable sea freight solutions for large and bulk shipments.',
  },
  {
    title: 'Express Air Cargo',
    image: '/images/air_optimized.jpg',
    description:
      'Fast and reliable air freight services connecting your business to global markets.',
  },
  {
    title: 'Machinery Imports',
    image: '/images/machinery-import_optimized.jpg',
    description:
      'Reliable import solutions for industrial machinery, heavy equipment, and specialized cargo.',
  },
  {
    title: 'Warehousing',
    image: '/images/warehouse_optimized.jpg',
    description:
      'Secure warehousing and organized cargo storage to support your supply chain.',
  },
  {
    title: 'Customs Clearance',
    image: '/images/customer-clearance_optimized.jpg',
    description:
      'Efficient customs documentation and clearance support for smooth international shipments.',
  },
]

const copyVariants = {
  enter: ({ direction, reduceMotion }) => ({
    opacity: reduceMotion ? 1 : 0,
    x: reduceMotion ? 0 : direction * 24,
    y: reduceMotion ? 0 : direction * 12,
  }),
  center: ({ reduceMotion }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: reduceMotion ? 0 : 0.62,
      ease: [0.22, 0.68, 0, 1],
    },
  }),
  exit: ({ direction, reduceMotion }) => ({
    opacity: 0,
    x: reduceMotion ? 0 : direction * -20,
    y: reduceMotion ? 0 : direction * -8,
    transition: {
      duration: reduceMotion ? 0 : 0.34,
      ease: 'easeIn',
    },
  }),
}

const formatSlideNumber = (number) => String(number).padStart(2, '0')

function ServicesIntro() {
  const serviceLabelRef = useRef(null)
  const swiperRef = useRef(null)
  const previousIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const prefersReducedMotion = useReducedMotion()
  const serviceLabelInView = useInView(serviceLabelRef, {
    once: true,
    amount: 0.45,
  })
  const activeService = services[activeIndex]
  const motionState = { direction, reduceMotion: prefersReducedMotion }

  const handleSlideChange = (swiper) => {
    const nextIndex = swiper.realIndex
    setDirection(nextIndex >= previousIndexRef.current ? 1 : -1)
    previousIndexRef.current = nextIndex
    setActiveIndex(nextIndex)
  }

  return (
    <div className="services-layout" id="services">
      <aside className="services-layout__label-box">
        <motion.span
          ref={serviceLabelRef}
          className="services-layout__label"
          role="heading"
          aria-level={2}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={
            prefersReducedMotion || serviceLabelInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 14 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 1.9,
            delay: prefersReducedMotion ? 0 : 0.2,
            ease: 'easeOut',
          }}
        >
          OUR SERVICES
        </motion.span>
      </aside>

      <section className="services-intro" aria-label="ACP Logistics services">
        <Swiper
        className="services-intro__swiper"
        modules={[A11y, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        speed={prefersReducedMotion ? 0 : 900}
        keyboard={{ enabled: true, onlyInViewport: true }}
        threshold={8}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={handleSlideChange}
        a11y={{
          prevSlideMessage: 'Previous service',
          nextSlideMessage: 'Next service',
          firstSlideMessage: 'This is the first service',
          lastSlideMessage: 'This is the last service',
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide className="services-intro__slide" key={service.title}>
            <img
              className="services-intro__image"
              src={service.image}
              alt=""
              aria-hidden="true"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              onError={(event) => {
                event.currentTarget.dataset.failed = 'true'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="services-intro__scrim" aria-hidden="true" />

      <div className="services-intro__topline" aria-hidden="true">
        <span>ACP LOGISTICS / SERVICES</span>
        <span>GLOBAL FREIGHT NETWORK</span>
      </div>

      <div className="services-intro__copy-slot">
        <AnimatePresence initial={false} mode="wait" custom={motionState}>
          <motion.div
            className="services-intro__copy"
            key={activeService.title}
            custom={motionState}
            variants={copyVariants}
            initial="enter"
            animate="center"
            exit="exit"
            role="group"
            aria-label={`${formatSlideNumber(activeIndex + 1)}. ${activeService.title}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="services-intro__number">
              {formatSlideNumber(activeIndex + 1)}
            </span>
            <h2 className="services-intro__title" id="services-intro-title">
              {activeService.title}
            </h2>
            <p className="services-intro__description">
              {activeService.description}
            </p>
            <a
              className="services-intro__cta"
              href="#about"
              aria-label={`Explore ${activeService.title}`}
            >
              <span>Explore Service</span>
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.7} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="services-intro__footer">
        <div
          className="services-intro__counter"
          aria-label={`Slide ${activeIndex + 1} of ${services.length}`}
          aria-live="polite"
        >
          <span>{formatSlideNumber(activeIndex + 1)}</span>
          <span className="services-intro__counter-total">
            / {formatSlideNumber(services.length)}
          </span>
        </div>

        <div
          className="services-intro__progress"
          role="progressbar"
          aria-label="Service slider progress"
          aria-valuemin={1}
          aria-valuemax={services.length}
          aria-valuenow={activeIndex + 1}
        >
          <span
            className="services-intro__progress-fill"
            style={{ transform: `scaleX(${(activeIndex + 1) / services.length})` }}
          />
        </div>

        <div className="services-intro__navigation">
          <button
            className="services-intro__nav-button"
            type="button"
            aria-label="Previous service"
            title="Previous service"
            disabled={activeIndex === 0}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeft aria-hidden="true" size={19} strokeWidth={1.6} />
          </button>
          <button
            className="services-intro__nav-button"
            type="button"
            aria-label="Next service"
            title="Next service"
            disabled={activeIndex === services.length - 1}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRight aria-hidden="true" size={19} strokeWidth={1.6} />
          </button>
        </div>
      </div>
      </section>
    </div>
  )
}

export default ServicesIntro