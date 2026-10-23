import { useEffect, useState } from 'react'
import { useNavigation } from '../../context/NavigationContext.jsx'
import './PageTransition.css'

const ROUTE_DATA = {
  '/': {
    code: '01',
    label: 'HOME PORTAL',
    headline: 'Global Cargo Solutions',
    tagline: 'Across Borders, Beyond Expectations',
    accent: 'Connecting Continents • Reliable Logistics',
  },
  '/about': {
    code: '02',
    label: 'ABOUT ACP LOGISTICS',
    headline: 'Two Decades of Excellence',
    tagline: 'Providing Dependable Freight Forwarding Since 2005',
    accent: 'Trusted Global Network • Strategic Execution',
  },
  '/services': {
    code: '03',
    label: 'LOGISTICS PORTFOLIO',
    headline: 'Comprehensive Freight Services',
    tagline: 'Sea, Air, Warehousing, Port Drayage & Customs Clearance',
    accent: 'Tailored Freight • Global Scalability',
  },
  '/contact': {
    code: '04',
    label: 'GLOBAL INQUIRIES',
    headline: 'Connect with Logistics Specialists',
    tagline: 'Get Customized Quotes & Route Planning',
    accent: 'Direct Communication • Fast Turnaround',
  },
}

function getRouteInfo(pathname) {
  if (!pathname) return ROUTE_DATA['/']
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'
  return ROUTE_DATA[clean] || {
    code: 'NAV',
    label: 'ACP LOGISTICS',
    headline: 'Navigating Destination',
    tagline: 'Preparing Freight Route & Content',
    accent: 'ACP Logistics Pakistan',
  }
}

export default function PageTransition() {
  const { isNavigating, targetPath } = useNavigation()
  const [displayInfo, setDisplayInfo] = useState(() => getRouteInfo(window.location.pathname))

  useEffect(() => {
    if (targetPath) {
      setDisplayInfo(getRouteInfo(targetPath))
    }
  }, [targetPath])

  return (
    <aside
      className={`page-transition-curtain${isNavigating ? ' is-active' : ''}`}
      aria-hidden={!isNavigating}
      aria-live="assertive"
      role="status"
    >
      {/* Background Deep Luxury Panels */}
      <div className="page-transition-curtain__backdrop">
        <div className="page-transition-curtain__grid" />
        <div className="page-transition-curtain__glow" />
      </div>

      {/* Center Cinematic Route Transit Card */}
      <div className="page-transition-curtain__content">
        <div className="page-transition-curtain__badge">
          <span className="page-transition-curtain__badge-dot" />
          <span>{displayInfo.label}</span>
          <span className="page-transition-curtain__badge-code">{displayInfo.code}</span>
        </div>

        <div className="page-transition-curtain__logo-wrap">
          <img
            className="page-transition-curtain__logo"
            src="/images/logo-transparent.png"
            alt="ACP Logistics"
            draggable="false"
          />
        </div>

        <h2 className="page-transition-curtain__headline">
          {displayInfo.headline}
        </h2>

        <p className="page-transition-curtain__tagline">
          {displayInfo.tagline}
        </p>

        {/* Luminous Transit Scanner Beam */}
        <div className="page-transition-curtain__scanner">
          <div className="page-transition-curtain__beam" />
        </div>

        <div className="page-transition-curtain__meta">
          <span>{displayInfo.accent}</span>
        </div>
      </div>
    </aside>
  )
}
