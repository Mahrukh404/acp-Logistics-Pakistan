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
      className="our-advantages relative isolate z-10 mb-16 bg-white py-20 text-[#131950] lg:mb-24 lg:py-32"
      id="advantages"
      aria-labelledby="our-advantages-title"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-8 px-[clamp(28px,6vw,88px)] lg:grid-cols-12 lg:gap-12 max-[640px]:px-5">
        <div
          className="h-fit min-w-0 self-start lg:col-span-5 lg:sticky lg:top-24 lg:z-10"
        >
          <h2
            className="our-advantages__heading m-0 flex flex-col uppercase"
            id="our-advantages-title"
          >
            <span>OUR</span>
            <span className="whitespace-nowrap">ADVANTAGES</span>
          </h2>
        </div>

        <div className="flex min-w-0 flex-col gap-6 pb-12 lg:col-span-7 lg:gap-8 lg:pb-20 max-[640px]:gap-4">
          {advantages.map((advantage) => (
            <article
              className="grid min-h-[224px] grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-center gap-8 rounded-2xl bg-[#F4F5F8] px-10 py-9 max-[1100px]:gap-6 max-[1100px]:px-8 max-[900px]:min-h-[200px] max-[640px]:min-h-0 max-[640px]:grid-cols-1 max-[640px]:gap-4 max-[640px]:px-6 max-[640px]:py-7"
              key={advantage.title}
            >
              <h3 className="m-0 max-w-[18ch] font-sans text-[clamp(18px,2vw,24px)] font-bold uppercase leading-tight text-[#131950]">
                {advantage.title}
              </h3>
              <p className="m-0 max-w-[38ch] justify-self-end text-right font-sans text-base leading-7 text-[#131950] max-[640px]:justify-self-stretch max-[640px]:text-left">
                {advantage.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurAdvantages