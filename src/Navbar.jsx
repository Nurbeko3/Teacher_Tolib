import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import en from './locales/en'
import uz from './locales/uz'
import ru from './locales/ru'

const langs = { en, uz, ru }

/* ── Course labels shown in header left side ── */
const COURSE_LABELS = [
  { key: 'zero', dot: '#f87171', light: '#b91c1c', dark: '#fca5a5' },
  { key: 'ielts', dot: '#f87171', light: '#b91c1c', dark: '#fca5a5' },
  { key: 'multi', dot: '#f87171', light: '#b91c1c', dark: '#fca5a5' },
]

const COURSE_LABEL_KEYS = ['zero', 'ielts', 'multi']

const NAV_ITEMS_BASE = [
  {
    id: 'about',
    labelKey: 'about',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'courses',
    labelKey: 'courses',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'results',
    labelKey: 'results',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'donate',
    labelKey: 'donate',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Navbar({ dark, setDark, onLogout, lang = 'uz', setLang }) {
  const t = (langs[lang] || langs.uz).nav
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const menuRef = useRef(null)
  const btnRef  = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* Close on Escape */
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); btnRef.current?.focus() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  const NAV_ROUTES = {
    about:   '/about-teacher',
    courses: '/courses',
    results: '/results',
    donate:  '/donate',
  }

  const handleNavItem = (id) => {
    setMenuOpen(false)
    const route = NAV_ROUTES[id]
    if (route) navigate(route)
  }

  /* ── Adaptive color helpers ──
     onRedBg = true only on homepage before scrolling (red hero behind navbar)
     everywhere else (other pages OR homepage scrolled) → bg is white/dark → red icons
  ── */
  const isHome   = location.pathname === '/'
  const onRedBg  = isHome && !scrolled   // red hero visible → white icons
  const showBg   = scrolled || !isHome   // show frosted glass header bg

  const iconStroke = onRedBg ? 'white'     : (dark ? 'white'     : '#dc2626')
  const iconBg     = onRedBg ? 'rgba(255,255,255,0.2)'         : (dark ? 'rgba(220,38,38,0.2)' : 'rgba(220,38,38,0.08)')
  const iconBorder = onRedBg ? 'rgba(255,255,255,0.35)'        : (dark ? 'rgba(220,38,38,0.3)' : 'rgba(220,38,38,0.15)')
  const barColor   = onRedBg ? 'white'     : (dark ? 'white'     : '#dc2626')
  const btnBg      = onRedBg ? 'rgba(255,255,255,0.18)'        : (dark ? 'rgba(55,65,81,0.7)'  : 'rgba(243,244,246,0.85)')
  const btnBorder  = onRedBg ? 'rgba(255,255,255,0.3)'         : (dark ? 'rgba(75,85,99,0.6)'  : 'rgba(209,213,219,0.7)')
  const btnHover   = onRedBg ? 'rgba(255,255,255,0.28)'        : (dark ? 'rgba(75,85,99,0.8)'  : 'rgba(229,231,235,0.95)')

  const labelColor = (item) =>
    onRedBg ? 'rgba(255,255,255,0.92)' : (dark ? item.dark : item.light)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        showBg
          ? {
              background: dark ? 'rgba(17,24,39,0.92)' : 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
              borderBottom: dark ? '1px solid rgba(55,65,81,0.5)' : '1px solid rgba(220,38,38,0.12)',
            }
          : undefined
      }
    >
      <div className="flex items-center justify-between px-4 py-3">

        {/* ── Left: Logo (clickable → home) ── */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 sm:gap-2.5 select-none min-w-0 focus:outline-none active:scale-[0.97] transition-transform"
          aria-label="Bosh sahifa"
        >
          {/* Icon */}
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 flex-shrink-0"
            style={{
              background: iconBg,
              border: `1px solid ${iconBorder}`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"
                stroke={iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"
                stroke={iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* 3 course labels stacked */}
          <div className="flex flex-col gap-[3px] min-w-0">
            {COURSE_LABELS.map((item, idx) => {
              const tCourses = (langs[lang] || langs.uz).courses
              const label = tCourses[item.key]?.title || item.key
              return (
                <span
                  key={item.key}
                  className={`flex items-center gap-1.5 ${idx === 2 ? 'hidden xs:flex' : ''}`}
                >
                  <span
                    className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full flex-shrink-0"
                    style={{ background: onRedBg ? 'rgba(255,255,255,0.7)' : item.dot }}
                  />
                  <span
                    className="text-[10px] sm:text-[11px] font-bold leading-none tracking-tight whitespace-nowrap transition-colors duration-300"
                    style={{ color: labelColor(item) }}
                  >
                    {label}
                  </span>
                </span>
              )
            })}
          </div>
        </button>

        {/* ── Right: Hamburger ── */}
        <div ref={menuRef} className="relative">
          <button
            ref={btnRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95"
            style={{
              background: menuOpen ? btnHover : btnBg,
              border: `1px solid ${btnBorder}`,
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = btnHover }}
            onMouseLeave={(e) => { e.currentTarget.style.background = menuOpen ? btnHover : btnBg }}
          >
            {/* 3 bars → X with correct transform order: translate THEN rotate */}
            <span className="flex flex-col gap-[5px] items-center justify-center" style={{ width: 18, height: 16 }}>
              <span
                style={{
                  display: 'block',
                  height: 2,
                  width: 18,
                  borderRadius: 2,
                  background: barColor,
                  transformOrigin: 'center',
                  transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
                  transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
                }}
              />
              <span
                style={{
                  display: 'block',
                  height: 2,
                  width: 18,
                  borderRadius: 2,
                  background: barColor,
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                style={{
                  display: 'block',
                  height: 2,
                  width: 18,
                  borderRadius: 2,
                  background: barColor,
                  transformOrigin: 'center',
                  transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
                  transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
                }}
              />
            </span>
          </button>

          {/* ── Dropdown menu ── */}
          {menuOpen && (
            <div
              role="menu"
              aria-label="Asosiy menyu"
              className="absolute top-14 right-0 w-60 rounded-2xl shadow-2xl overflow-hidden border border-red-100 dark:border-gray-700 bg-white dark:bg-gray-800 nav-menu-enter"
            >
              {/* Navigation items */}
              <nav className="py-1.5">
                {NAV_ITEMS_BASE.map((item) => (
                  <button
                    key={item.id}
                    role="menuitem"
                    onClick={() => handleNavItem(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-700/60 active:bg-red-100 dark:active:bg-gray-700 transition-colors duration-150 focus:outline-none focus:bg-red-50 dark:focus:bg-gray-700/60"
                  >
                    <span className="text-red-400 dark:text-gray-500 flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium">{t[item.labelKey]}</span>
                  </button>
                ))}
              </nav>

              <div className="mx-4 border-t border-red-100 dark:border-gray-700" />

              {/* Language switcher */}
              {setLang && (
                <div className="px-4 py-3 flex items-center gap-2">
                  {['uz', 'en', 'ru'].map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setMenuOpen(false) }}
                      className="flex-1 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-150 focus:outline-none active:scale-95"
                      style={{
                        background: lang === l ? '#dc2626' : 'transparent',
                        color: lang === l ? 'white' : '#9ca3af',
                        border: lang === l ? '1.5px solid #dc2626' : '1.5px solid #e5e7eb',
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}

              <div className="mx-4 border-t border-red-100 dark:border-gray-700" />

              <div className="py-1.5">
                {/* Dark Mode */}
                <button
                  role="menuitem"
                  onClick={() => setDark((d) => !d)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-gray-700/60 active:bg-red-100 transition-colors duration-150 focus:outline-none focus:bg-red-50 dark:focus:bg-gray-700/60"
                >
                  <span className="text-red-400 dark:text-gray-500 flex-shrink-0">
                    {dark ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-medium">{dark ? t.lightMode : t.darkMode}</span>
                  <div
                    className="ml-auto w-9 h-5 rounded-full flex items-center px-0.5 flex-shrink-0 transition-colors duration-300"
                    style={{ background: dark ? '#ef4444' : '#d1d5db' }}
                  >
                    <div
                      className="w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                      style={{ transform: dark ? 'translateX(16px)' : 'translateX(0)' }}
                    />
                  </div>
                </button>

                {/* Logout */}
                <button
                  role="menuitem"
                  onClick={() => { setMenuOpen(false); onLogout?.() }}
                  disabled={!onLogout}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 focus:outline-none ${
                    onLogout
                      ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 active:bg-red-100 focus:bg-red-50'
                      : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <span className="flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-sm font-medium">{t.logout}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
