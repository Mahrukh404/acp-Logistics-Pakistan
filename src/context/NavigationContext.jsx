import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const NavigationContext = createContext({
  pathname: '/',
  isNavigating: false,
  targetPath: null,
  navigate: () => {},
})

export const useNavigation = () => useContext(NavigationContext)

function normalizePath(path) {
  if (!path) return '/'
  const clean = path.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/'
  return clean
}

export function NavigationProvider({ children }) {
  const [pathname, setPathname] = useState(
    () => window.location.pathname.replace(/\/+$/, '') || '/',
  )
  const [isNavigating, setIsNavigating] = useState(false)
  const [targetPath, setTargetPath] = useState(null)
  const isTransitioningRef = useRef(false)

  const navigate = useCallback((href, options = {}) => {
    if (!href) return

    // If external or mailto or tel, allow normal behavior
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      window.location.href = href
      return
    }

    const currentFull = window.location.pathname + window.location.search + window.location.hash
    if (href === currentFull) {
      return
    }

    // Handle hash links on same page
    if (href.startsWith('#')) {
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
      return
    }

    // Don't queue multiple transitions
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const enterDuration = prefersReducedMotion ? 60 : 380

    setTargetPath(href)
    setIsNavigating(true)

    // Wait for the transition curtain to fully cover the viewport
    setTimeout(() => {
      window.history.pushState(null, '', href)
      setPathname(normalizePath(href))
      window.scrollTo(0, 0)

      // Allow the destination page component to mount and paint in background
      const holdTime = prefersReducedMotion ? 40 : 200
      setTimeout(() => {
        setIsNavigating(false)
        setTargetPath(null)
        // Allow exit animation to complete before unlocking navigation
        const exitDuration = prefersReducedMotion ? 60 : 420
        setTimeout(() => {
          isTransitioningRef.current = false
        }, exitDuration)
      }, holdTime)
    }, enterDuration)
  }, [])

  // Handle browser back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const nextPath = normalizePath(window.location.pathname)
      // When user clicks back/forward, animate transition as well
      if (nextPath !== pathname && !isTransitioningRef.current) {
        isTransitioningRef.current = true
        setIsNavigating(true)
        setTargetPath(window.location.pathname + window.location.search)

        setTimeout(() => {
          setPathname(nextPath)
          window.scrollTo(0, 0)

          setTimeout(() => {
            setIsNavigating(false)
            setTargetPath(null)
            setTimeout(() => {
              isTransitioningRef.current = false
            }, 400)
          }, 180)
        }, 360)
      } else {
        setPathname(nextPath)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [pathname])

  // Global click interceptor for internal links
  useEffect(() => {
    const handleGlobalClick = (event) => {
      // Ignore right clicks, modifier keys (Ctrl, Meta, Shift, Alt)
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      // Find closest anchor tag
      const anchor = event.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Don't intercept target="_blank", downloads, or external links
      if (
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        anchor.getAttribute('rel')?.includes('external')
      ) {
        return
      }

      // Check if it's an internal relative path starting with '/'
      if (href.startsWith('/') && !href.startsWith('//')) {
        event.preventDefault()
        navigate(href)
      }
    }

    document.addEventListener('click', handleGlobalClick, { capture: true })
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true })
  }, [navigate])

  return (
    <NavigationContext.Provider
      value={{
        pathname,
        isNavigating,
        targetPath,
        navigate,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
