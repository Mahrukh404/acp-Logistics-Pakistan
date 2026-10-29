import { Component, lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/navigation/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="not-found">
          <p>Something went wrong loading this section.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid currentColor',
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </main>
      )
    }
    return this.props.children
  }
}

function App() {
  const [pathname, setPathname] = useState(
    () => window.location.pathname.replace(/\/+$/, '') || '/',
  )

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const updatePath = () =>
      setPathname(window.location.pathname.replace(/\/+$/, '') || '/')

    window.addEventListener('popstate', updatePath)
    return () => window.removeEventListener('popstate', updatePath)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const page =
    pathname === '/about' ? (
      <AboutPage />
    ) : pathname === '/services' ? (
      <ServicesPage />
    ) : pathname === '/contact' ? (
      <ContactPage />
    ) : pathname === '/privacy' ? (
      <PrivacyPage />
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
      <ErrorBoundary>
        <Suspense
          fallback={
            <main className="page-loading" aria-label="Loading page">
              <span>Loading</span>
            </main>
          }
        >
          {page}
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
