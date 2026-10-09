import { lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/navigation/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))

function App() {
  const [pathname, setPathname] = useState(
    () => window.location.pathname.replace(/\/+$/, '') || '/',
  )

  useEffect(() => {
    const updatePath = () =>
      setPathname(window.location.pathname.replace(/\/+$/, '') || '/')

    window.addEventListener('popstate', updatePath)
    return () => window.removeEventListener('popstate', updatePath)
  }, [])

  const page =
    pathname === '/about' ? (
      <AboutPage />
    ) : pathname === '/services' ? (
      <ServicesPage />
    ) : pathname === '/contact' ? (
      <ContactPage />
    ) : pathname === '/' ? (
      <HomePage />
    ) : (
      <main className="not-found">
        <p>404 / Page not found</p>
        <a href="/">Return to home</a>
      </main>
    )

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="page-loading" aria-label="Loading page">
            <span>Loading</span>
          </main>
        }
      >
        {page}
      </Suspense>
      <Footer />
    </>
  )
}

export default App
