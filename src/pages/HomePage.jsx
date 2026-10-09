import { useLayoutEffect } from 'react'
import Hero from '../components/hero/Hero.jsx'
import CompanyIntro from '../components/sections/CompanyIntro.jsx'
import CEOQuote from '../components/sections/CEOQuote.jsx'
import OurAdvantages from '../components/sections/OurAdvantages.jsx'
import ServicesIntro from '../components/sections/ServicesIntro.jsx'

function HomePage() {
  useLayoutEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return

    document.getElementById(decodeURIComponent(targetId))?.scrollIntoView()
  }, [])

  return (
    <main>
      <div className="home-experience">
        <video
          className="home-experience__video"
          src="/videos/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <Hero />
        <CompanyIntro />
      </div>
      <OurAdvantages />
      <ServicesIntro />
      <CEOQuote />
    </main>
  )
}

export default HomePage
