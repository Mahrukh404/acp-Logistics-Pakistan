import './OurAdvantages.css'

const advantages = [
  {
    title: '21+ YEARS OF EXPERIENCE',
    description:
      'Decades of expertise in global shipping, import, export, and freight operations.',
  },
  {
    title: 'GLOBAL LOGISTICS NETWORK',
    description:
      'Strong international connections for smooth and reliable cargo movement across borders.',
  },
  {
    title: 'SAFE & SECURE CARGO HANDLING',
    description:
      'Professional handling and transportation to keep your cargo protected throughout its journey.',
  },
  {
    title: '24/7 DEDICATED SUPPORT',
    description:
      'Responsive customer assistance whenever you need updates, guidance, or shipment support.',
  },
  {
    title: 'ROUTE OPTIMIZATION',
    description:
      "Smart route planning to save clients' time and reduce transportation costs.",
  },
  {
    title: 'END-TO-END LOGISTICS SOLUTIONS',
    description:
      'Complete support from shipping and transportation to customs clearance and final delivery.',
  },
]

function OurAdvantages() {
  return (
    <section
      className="our-advantages relative mb-16 bg-white py-20 text-[#131950] lg:mb-24 lg:py-32"
      id="advantages"
      aria-labelledby="our-advantages-title"
    >
      <div className="our-advantages__layout mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-8 px-[clamp(28px,6vw,88px)] lg:grid-cols-12 lg:gap-12 max-[640px]:px-5">
        <div className="our-advantages__title-wrap h-fit min-w-0 self-start lg:col-span-5">
          <h2
            className="section-display-heading our-advantages__heading m-0 flex flex-col uppercase"
            id="our-advantages-title"
          >
            <span>OUR KEY</span>
            <span className="whitespace-nowrap">ADVANTAGES</span>
          </h2>
        </div>

        <div className="our-advantages__list flex min-w-0 flex-col lg:col-span-7">
          {advantages.map((advantage, index) => (
            <article
              className="our-advantages__card"
              key={advantage.title}
            >
              <span className="our-advantages__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="our-advantages__copy">
                <h3 className="our-advantages__card-title">{advantage.title}</h3>
                <p className="our-advantages__description">
                  {advantage.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurAdvantages