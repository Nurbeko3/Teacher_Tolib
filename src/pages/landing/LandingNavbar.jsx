import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../api'
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

/* Used only if the backend course list hasn't loaded yet (or is empty). */
const LESSONS_FALLBACK = [
  { key: 'zero',  path: '/english-from-zero' },
  { key: 'ielts', path: '/ielts' },
  { key: 'multi', path: '/multilevel' },
]

const LANG_LABELS = { uz: 'UZ', en: 'EN', ru: 'RU' }
const PROFILE_COPY = {
  uz: { learn: 'O‘rganish', profile: 'Profil', logout: 'Chiqish' },
  en: { learn: 'Learn', profile: 'Profile', logout: 'Log out' },
  ru: { learn: 'Обучение', profile: 'Профиль', logout: 'Выйти' },
}

export default function LandingNavbar({ lang, setLang, user, onLogout }) {
  const navigate = useNavigate()
  const t        = (langs[lang] || langs.en).landing.nav
  const tCourses = (langs[lang] || langs.en).courses

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [langOpen,  setLangOpen]  = useState(false)
  const [lessonsOpen,       setLessonsOpen]       = useState(false)
  const [lessonsMobileOpen, setLessonsMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [courses, setCourses] = useState([])

  const menuRef    = useRef(null)
  const langRef    = useRef(null)
  const lessonsRef = useRef(null)
  const profileRef = useRef(null)
  const profileCopy = PROFILE_COPY[lang] || PROFILE_COPY.en

  /* All courses currently on the main /courses page — kept in sync so the
     Lessons dropdown always mirrors it, including admin-added courses. */
  useEffect(() => {
    api.getCourses().then(setCourses).catch(() => {})
  }, [])

  useEffect(() => {
    const h = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const lessonsItems = courses.length
    ? courses.map((c) => ({ key: c.id, title: c.title, path: `/courses/${c.id}` }))
    : LESSONS_FALLBACK.map((c) => ({ key: c.key, title: tCourses[c.key]?.title || c.key, path: c.path }))

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

  /* ── outside-click for lessons dropdown ── */
  useEffect(() => {
    const h = (e) => {
      if (lessonsRef.current && !lessonsRef.current.contains(e.target)) setLessonsOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  /* ── escape key ── */
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setLangOpen(false)
        setLessonsOpen(false)
        setProfileOpen(false)
      }
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
          {NAV_LINKS.filter((l) => l.id === 'about').map((link) => (
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

          {/* Lessons dropdown */}
          <div ref={lessonsRef} className="relative">
            <button
              onClick={() => setLessonsOpen((o) => !o)}
              aria-expanded={lessonsOpen}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 focus:outline-none whitespace-nowrap"
              style={{
                color:      lessonsOpen ? 'white' : 'rgba(255,255,255,0.7)',
                background: lessonsOpen ? 'rgba(255,255,255,0.07)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color      = 'white'
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={(e) => {
                if (!lessonsOpen) {
                  e.currentTarget.style.color      = 'rgba(255,255,255,0.7)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {t.lessons}
              <svg
                width="11" height="11" viewBox="0 0 24 24" fill="none"
                style={{ transition: 'transform 0.2s', transform: lessonsOpen ? 'rotate(180deg)' : 'none' }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <AnimatePresence>
              {lessonsOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{    opacity: 0, scale: 0.95, y: -6 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 w-56 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    top:            'calc(100% + 8px)',
                    background:     'rgba(15,15,15,0.95)',
                    backdropFilter: 'blur(20px)',
                    border:         '1px solid rgba(255,255,255,0.1)',
                    boxShadow:      '0 16px 40px rgba(0,0,0,0.6)',
                  }}
                >
                  {lessonsItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => { setLessonsOpen(false); navigate(item.path) }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-[13px] font-medium transition-colors duration-150 focus:outline-none"
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
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF0000' }} />
                      {item.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.filter((l) => l.id !== 'about').map((link) => (
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

          {user ? (
            <div ref={profileRef} className="relative hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-white focus:outline-none"
                style={{
                  background: profileOpen ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-red-600 font-black text-xs">
                  {(user.firstName || user.phone || 'U').charAt(0).toUpperCase()}
                </span>
                <span className="hidden md:block max-w-24 truncate text-[12.5px] font-bold">
                  {user.firstName || profileCopy.profile}
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  style={{ transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl p-2 shadow-2xl"
                    style={{ background: 'rgba(15,15,15,.97)', border: '1px solid rgba(255,255,255,.12)' }}
                  >
                    <div className="px-3 py-2.5 border-b border-white/10">
                      <p className="truncate text-sm font-bold text-white">{user.firstName} {user.lastName}</p>
                      <p className="truncate text-[11px] text-white/45">{user.phone}</p>
                    </div>
                    <button onClick={() => { setProfileOpen(false); navigate('/learn') }}
                      className="mt-1 w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-white hover:bg-white/10">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/20 text-red-400">▶</span>
                      {profileCopy.learn}
                    </button>
                    <button onClick={() => { setProfileOpen(false); navigate('/profile') }}
                      className="w-full px-4 py-2.5 text-left text-sm text-white/75 hover:text-white hover:bg-white/[0.06] transition-colors">
                      {profileCopy.profile}
                    </button>
                    <button onClick={() => { setProfileOpen(false); onLogout?.() }}
                      className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-white/65 hover:bg-white/10 hover:text-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">↗</span>
                      {profileCopy.logout}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/auth')}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-[13px] text-white transition-all duration-200 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.8"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              {t.login}
            </motion.button>
          )}

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
                    {NAV_LINKS.filter((l) => l.id === 'about').map((link, idx) => (
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

                    {/* Lessons accordion */}
                    <motion.button
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0  }}
                      transition={{ delay: 0.04 }}
                      onClick={() => setLessonsMobileOpen((o) => !o)}
                      aria-expanded={lessonsMobileOpen}
                      className="w-full flex items-center justify-between text-left px-5 py-3 text-[13.5px] font-medium transition-colors duration-150 focus:outline-none"
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
                      {t.lessons}
                      <svg
                        width="11" height="11" viewBox="0 0 24 24" fill="none"
                        style={{ transition: 'transform 0.2s', transform: lessonsMobileOpen ? 'rotate(180deg)' : 'none' }}
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.button>
                    {lessonsMobileOpen && (
                      <div className="pb-1">
                        {lessonsItems.map((item) => (
                          <button
                            key={item.key}
                            onClick={() => { setLessonsMobileOpen(false); setMenuOpen(false); navigate(item.path) }}
                            className="w-full flex items-center gap-2.5 pl-9 pr-5 py-2.5 text-left text-[12.5px] font-medium transition-colors duration-150 focus:outline-none"
                            style={{ color: 'rgba(255,255,255,0.6)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color      = 'white'
                              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color      = 'rgba(255,255,255,0.6)'
                              e.currentTarget.style.background = 'transparent'
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF0000' }} />
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}

                    {NAV_LINKS.filter((l) => l.id !== 'about').map((link, idx) => (
                      <motion.button
                        key={link.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0  }}
                        transition={{ delay: (idx + 1) * 0.04 }}
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
                      onClick={() => {
                        setMenuOpen(false)
                        if (user) navigate('/learn')
                        else navigate('/auth')
                      }}
                      className="w-full py-2.5 rounded-xl font-bold text-[13.5px] text-white transition-all duration-200 active:scale-[0.97]"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border:     '1px solid rgba(255,255,255,0.18)',
                      }}
                    >
                      {user ? profileCopy.learn : t.login}
                    </button>
                    {user && (
                      <button
                        onClick={() => { setMenuOpen(false); navigate('/profile') }}
                        className="w-full py-3 rounded-xl font-bold text-sm text-white border border-white/15"
                      >
                        {profileCopy.profile}
                      </button>
                    )}
                    {user && (
                      <button
                        onClick={() => { setMenuOpen(false); onLogout?.() }}
                        className="mt-2 w-full py-2 text-xs font-semibold text-white/55 hover:text-white"
                      >
                        {profileCopy.logout}
                      </button>
                    )}
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
