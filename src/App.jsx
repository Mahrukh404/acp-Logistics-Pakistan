import Header from './components/navigation/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/hero/Hero.jsx'
import CompanyIntro from './components/sections/CompanyIntro.jsx'
import CEOQuote from './components/sections/CEOQuote.jsx'
import OurAdvantages from './components/sections/OurAdvantages.jsx'
import ServicesIntro from './components/sections/ServicesIntro.jsx'
import './App.css'

function App() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  )
}

export default App
