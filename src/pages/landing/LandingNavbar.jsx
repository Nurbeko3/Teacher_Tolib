import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const NAV_LINKS = [
  { id: 'about',   key: 'about'   },
  { id: 'results', key: 'results' },
  { id: 'why',     key: 'why'     },
  { id: 'courses', key: 'courses' },
  { id: 'faq',     key: 'faq'     },
]

const LANG_LABELS = { uz: 'UZ', en: 'EN', ru: 'RU' }

export default function LandingNavbar({ lang, setLang }) {
  const navigate = useNavigate()
  const t        = (langs[lang] || langs.en).landing.nav

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [langOpen,  setLangOpen]  = useState(false)

  const menuRef = useRef(null)
  const langRef = useRef(null)

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── outside-click for mobile menu ── */
  useEffect(() => {
    const h = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  /* ── outside-click for lang dropdown ── */
  useEffect(() => {
    const h = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  /* ── escape key ── */
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); setLangOpen(false) }
    }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background:              'rgba(0,0,0,0.72)',
        backdropFilter:          'blur(22px)',
        WebkitBackdropFilter:    'blur(22px)',
        borderBottom:            scrolled
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(255,255,255,0.04)',
        boxShadow:               scrolled
          ? '0 4px 32px rgba(0,0,0,0.5)'
          : 'none',
      }}
    >
      <div className="flex items-center px-5 sm:px-8 lg:px-12 py-3.5 mx-auto w-full max-w-[1280px]">

        {/* ── Logo ── */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 focus:outline-none flex-shrink-0"
        >
          {/* dot-grid icon, like inter.nation */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(255,0,0,0.15)',
              border:     '1px solid rgba(255,0,0,0.35)',
              boxShadow:  '0 0 14px rgba(255,0,0,0.2)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-black text-[15px] whitespace-nowrap tracking-tight text-white">
            Teacher{' '}
            <span style={{ color: '#FF0000', filter: 'drop-shadow(0 0 6px rgba(255,0,0,0.6))' }}>
              Tolib
            </span>
          </span>
        </motion.button>

        {/* ── Desktop center nav ── */}
        <nav className="hidden lg:flex items-center gap-0.5 mx-auto">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 focus:outline-none whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color      = 'white'
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color      = 'rgba(255,255,255,0.7)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {t[link.key]}
            </button>
          ))}
        </nav>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2 ml-auto lg:ml-0 flex-shrink-0">

          {/* Language selector — globe style */}
          <div ref={langRef} className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none"
              style={{
                color:      'rgba(255,255,255,0.7)',
                background: langOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color      = 'white'
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={(e) => {
                if (!langOpen) {
                  e.currentTarget.style.color      = 'rgba(255,255,255,0.7)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {/* Globe icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span className="text-[12px] font-bold uppercase tracking-wide">
                {LANG_LABELS[lang]}
              </span>
              <svg
                width="11" height="11" viewBox="0 0 24 24" fill="none"
                style={{ transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{    opacity: 0, scale: 0.95, y: -6 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 w-28 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    top:          'calc(100% + 8px)',
                    background:   'rgba(15,15,15,0.95)',
                    backdropFilter: 'blur(20px)',
                    border:       '1px solid rgba(255,255,255,0.1)',
                    boxShadow:    '0 16px 40px rgba(0,0,0,0.6)',
                  }}
                >
                  {['uz', 'en', 'ru'].map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false) }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-wide transition-colors duration-150 focus:outline-none"
                      style={{
                        color:      lang === l ? '#FF0000' : 'rgba(255,255,255,0.65)',
                        background: lang === l ? 'rgba(255,0,0,0.1)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (lang !== l) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                      }}
                      onMouseLeave={(e) => {
                        if (lang !== l) e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {LANG_LABELS[l]}
                      {lang === l && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#FF0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div
            className="hidden sm:block w-px h-5 flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          />

          {/* Login / CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/auth')}
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-[13px] text-white transition-all duration-200 focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border:     '1px solid rgba(255,255,255,0.18)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.16)'
              e.currentTarget.style.border     = '1px solid rgba(255,255,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.border     = '1px solid rgba(255,255,255,0.18)'
            }}
          >
            {/* User icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t.login}
          </motion.button>

          {/* Mobile hamburger */}
          <div ref={menuRef} className="relative lg:hidden">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border:     '1px solid rgba(255,255,255,0.14)',
              }}
            >
              <div className="flex flex-col gap-[4.5px] items-center justify-center"
                style={{ width: 15, height: 13 }}>
                <span style={{
                  display: 'block', height: 1.5, width: 15, borderRadius: 2,
                  background: 'white',
                  transformOrigin: 'center',
                  transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
                  transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                }} />
                <span style={{
                  display: 'block', height: 1.5, width: 15, borderRadius: 2,
                  background: 'white',
                  transition: 'opacity 0.2s',
                  opacity: menuOpen ? 0 : 1,
                }} />
                <span style={{
                  display: 'block', height: 1.5, width: 15, borderRadius: 2,
                  background: 'white',
                  transformOrigin: 'center',
                  transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
                  transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                }} />
              </div>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{    opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 w-60 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    top:            'calc(100% + 10px)',
                    background:     'rgba(10,10,10,0.96)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border:         '1px solid rgba(255,255,255,0.1)',
                    boxShadow:      '0 24px 48px rgba(0,0,0,0.7)',
                  }}
                >
                  <nav className="py-2">
                    {NAV_LINKS.map((link, idx) => (
                      <motion.button
                        key={link.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0  }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => scrollTo(link.id)}
                        className="w-full text-left px-5 py-3 text-[13.5px] font-medium transition-colors duration-150 focus:outline-none"
                        style={{ color: 'rgba(255,255,255,0.75)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color      = 'white'
                          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color      = 'rgba(255,255,255,0.75)'
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {t[link.key]}
                      </motion.button>
                    ))}
                  </nav>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

                  {/* Language */}
                  <div className="px-4 py-3 flex items-center gap-2">
                    {['uz', 'en', 'ru'].map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setMenuOpen(false) }}
                        className="flex-1 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-150 focus:outline-none"
                        style={{
                          background: lang === l ? '#FF0000' : 'rgba(255,255,255,0.06)',
                          color:      lang === l ? 'white'   : 'rgba(255,255,255,0.45)',
                          border:     lang === l ? '1px solid #FF0000' : '1px solid rgba(255,255,255,0.1)',
                          boxShadow:  lang === l ? '0 2px 10px rgba(255,0,0,0.4)' : 'none',
                        }}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

                  <div className="px-4 py-3">
                    <button
                      onClick={() => { navigate('/auth'); setMenuOpen(false) }}
                      className="w-full py-2.5 rounded-xl font-bold text-[13.5px] text-white transition-all duration-200 active:scale-[0.97]"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border:     '1px solid rgba(255,255,255,0.18)',
                      }}
                    >
                      {t.login}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
