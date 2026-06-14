import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import en from './locales/en'
import uz from './locales/uz'
import ru from './locales/ru'
import Navbar from './Navbar'
import FooterComp from './components/Footer'

const langs = { en, uz, ru }

function SparkleIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" />
    </svg>
  )
}

function LogoutModal({ t, onConfirm, onCancel }) {
  const [closing, setClosing] = useState(false)
  const [loading, setLoading] = useState(false)

  const close = (cb) => { setClosing(true); setTimeout(cb, 220) }
  const handleCancel   = () => close(onCancel)
  const handleBackdrop = (e) => { if (e.target === e.currentTarget && !loading) handleCancel() }
  const handleConfirm  = () => { setLoading(true); setTimeout(() => close(onConfirm), 1200) }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-6 ${closing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdrop}
    >
      <div className={`w-full max-w-sm ${closing ? 'modal-box-exit' : 'modal-box-enter'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-3xl px-6 py-7 shadow-2xl">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17l5-5-5-5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">{t.logoutTitle}</h2>
          <p className="text-gray-400 dark:text-gray-400 text-sm text-center mt-2 leading-relaxed px-2">{t.logoutDesc}</p>
          <div className="flex gap-3 mt-7">
            <button onClick={handleCancel} disabled={loading}
              className="flex-1 py-3.5 rounded-2xl border-2 border-gray-100 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.97] transition-all duration-150 disabled:opacity-50">
              {t.logoutCancel}
            </button>
            <button onClick={handleConfirm} disabled={loading}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 text-white font-bold text-sm shadow-lg shadow-red-200 hover:from-red-800 hover:to-red-600 active:scale-[0.97] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-90">
              {loading ? (
                <>
                  <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  <span>{t.logoutConfirm}...</span>
                </>
              ) : t.logoutConfirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── English from Zero – Course sections modal ── */
const ENGLISH_SECTIONS = [
  {
    id: 'grammar',
    title: 'Grammatika A1 dan C2 gacha',
    desc: "Boshlang'ichdan yuqori darajagacha",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 7h6M9 11h4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'grammar-test',
    title: 'Mavzulashtirilgan grammatika testi',
    desc: "Mavzu bo'yicha bilimingizni sinab ko'ring",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'vocabulary',
    title: "Lug'at testi",
    desc: "So'z boyligingizni oshiring",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'level',
    title: 'Daraja testi',
    desc: "O'z darajangizni aniqlang",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="2" fill="white"/>
      </svg>
    ),
  },
]

function EnglishCourseModal({ onClose, onNavigate }) {
  const [closing, setClosing] = useState(false)

  const close = () => { setClosing(true); setTimeout(onClose, 220) }
  const navigate = (dest) => { setClosing(true); setTimeout(() => { onClose(); onNavigate?.(dest) }, 220) }

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center px-5 ${closing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      role="dialog"
      aria-modal="true"
      aria-label="Ingliz tili 0 dan – bo'lim tanlash"
    >
      <div className={`w-full max-w-md ${closing ? 'modal-box-exit' : 'modal-box-enter'}`}>
        <div
          className="rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #b91c1c 0%, #dc2626 45%, #ef4444 100%)' }}
        >
          {/* ── Header ── */}
          <div className="relative px-7 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.18)' }}>
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Yopish"
              className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center active:scale-90 transition-all duration-150 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.18)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h2 className="text-[20px] font-extrabold text-white leading-tight">
              Ingliz tili 0 dan
            </h2>
            <p className="text-white/70 text-sm font-medium mt-1">
              Quyidagi bo'limlardan birini tanlang
            </p>
          </div>

          {/* ── Options ── */}
          <div className="px-5 py-5 flex flex-col gap-3">
            {ENGLISH_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  if (section.id === 'grammar')      navigate('grammar-levels')
                  if (section.id === 'grammar-test') navigate('topic-grammar')
                  if (section.id === 'vocabulary')   navigate('vocab-test')
                }}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left group transition-all duration-200 hover:scale-[1.018] active:scale-[0.988] focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.22)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.22)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                  e.currentTarget.style.boxShadow = ''
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.22)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                }}
              >
                {/* Icon box */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  {section.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span className="block text-[14px] font-bold text-white leading-tight">
                    {section.title}
                  </span>
                  <span className="block text-[11.5px] font-medium text-white/65 mt-0.5">
                    {section.desc}
                  </span>
                </div>

                {/* Arrow */}
                <svg
                  className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                >
                  <path d="M9 18l6-6-6-6" stroke="white" strokeOpacity="0.6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>

          {/* ── Footer ── */}
          <div className="px-7 pb-6">
            <p className="text-center text-white/40 text-[11px] font-medium">
              Batafsil ma'lumot uchun ustozga murojaat qiling
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── IELTS sections (left-panel list) ── */
const IELTS_SECTIONS = [
  {
    id: 'listening',
    title: 'Listening',
    desc: "Tinglash va audio materiallar",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 18v-6a9 9 0 0118 0v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'reading',
    title: 'Reading',
    desc: "Matn o'qish va tushunish",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'writing',
    title: 'Writing',
    desc: "Yozma nutq va insho",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'speaking',
    title: 'Speaking',
    desc: "Og'zaki nutq va suhbat",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19v4M8 23h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

/* ── IELTS right-panel content per section ── */
const IELTS_CONTENT = {
  listening: {
    title: 'Listening',
    subtitle: "Tinglash ko'nikmasi",
    accentColor: '#dc2626',
    panelBg: '#fff1f2',
    borderColor: '#fecaca',
    hoverBg: '#ffe4e6',
    items: [
      {
        id: 'listening-practice-tests',
        label: 'Practice Tests',
        desc: "To'liq sinov testlari",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M9 11l3 3L22 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'listening-podcasts',
        label: 'Podcasts',
        desc: "Audio materiallar bilan mashq",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M3 18v-6a9 9 0 0118 0v6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'listening-video-lessons',
        label: 'Video Lessons',
        desc: "Video darslar orqali o'rganing",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/>
            <polygon points="10,8 16,12 10,16" fill={c}/>
          </svg>
        ),
      },
    ],
  },
  reading: {
    title: 'Reading',
    subtitle: "O'qish ko'nikmasi",
    accentColor: '#dc2626',
    panelBg: '#fff1f2',
    borderColor: '#fecaca',
    hoverBg: '#ffe4e6',
    items: [
      {
        id: 'reading-passages',
        label: 'Passages',
        desc: "IELTS uslubidagi o'qish matnlari",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'reading-articles',
        label: 'Articles',
        desc: "Maqola va essaylar",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h12" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'reading-video-lessons',
        label: 'Video Lessons',
        desc: "Video darslar orqali o'rganing",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/>
            <polygon points="10,8 16,12 10,16" fill={c}/>
          </svg>
        ),
      },
    ],
  },
  writing: {
    title: 'Writing',
    subtitle: "Yozish ko'nikmasi",
    accentColor: '#dc2626',
    panelBg: '#fff1f2',
    borderColor: '#fecaca',
    hoverBg: '#ffe4e6',
    items: [
      {
        id: 'writing-practice',
        label: 'Practice',
        desc: "Yozish mashqlari va topshiriqlar",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 20h9" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'writing-ai-checker',
        label: 'AI Checker',
        desc: "AI yordamida yozishni tekshiring",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 4l.7 2.3L22 7l-2.3.7L19 10l-.7-2.3L16 7l2.3-.7Z" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'writing-video-lessons',
        label: 'Video Lessons',
        desc: "Video darslar orqali o'rganing",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/>
            <polygon points="10,8 16,12 10,16" fill={c}/>
          </svg>
        ),
      },
    ],
  },
  speaking: {
    title: 'Speaking',
    subtitle: "Gapirish ko'nikmasi",
    accentColor: '#dc2626',
    panelBg: '#fff1f2',
    borderColor: '#fecaca',
    hoverBg: '#ffe4e6',
    items: [
      {
        id: 'speaking-practice',
        label: 'Practice',
        desc: "Part 1, Part 2, Part 3 bo'yicha mashq",
        action: 'speaking-popup',
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19v4M8 23h8" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        id: 'speaking-video-lessons',
        label: 'Video Lessons',
        desc: "Video darslar orqali o'rganing",
        icon: (c) => (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/>
            <polygon points="10,8 16,12 10,16" fill={c}/>
          </svg>
        ),
      },
    ],
  },
}

/* ── Speaking Practice popup (Part 1 / 2 / 3) ── */
const SPEAKING_PARTS = [
  {
    id: 'part-1',
    num: '1',
    label: 'Part 1',
    desc: "Shaxsiy mavzular haqida suhbat",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: 'part-2',
    num: '2',
    label: 'Part 2',
    desc: "Uzun nutq – cue card bo'yicha",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 10h18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 14h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'part-3',
    num: '3',
    label: 'Part 3',
    desc: "Abstrakt mavzular muhokamasi",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

function SpeakingPracticePopup({ onClose, onNavigate }) {
  const [closing, setClosing] = useState(false)
  const close = () => { setClosing(true); setTimeout(onClose, 200) }

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-5"
      style={{ backgroundColor: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      role="dialog"
      aria-modal="true"
      aria-label="Speaking Practice"
    >
      <div className={`w-full max-w-[320px] ${closing ? 'popup-exit' : 'popup-enter'}`}>
        <div className="rounded-[22px] overflow-hidden shadow-2xl" style={{ background: 'white' }}>

          {/* ── Popup header ── */}
          <div
            className="relative px-5 pt-5 pb-4"
            style={{ background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
          >
            <button
              onClick={close}
              aria-label="Yopish"
              className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 focus:outline-none active:scale-90"
              style={{ background: 'rgba(255,255,255,0.2)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.32)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Icon */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19v4M8 23h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h3 className="text-[17px] font-extrabold text-white leading-tight">Speaking Practice</h3>
            <p className="text-white/65 text-[12px] font-medium mt-0.5">Bo'limni tanlang</p>
          </div>

          {/* ── Parts list ── */}
          <div className="px-4 py-4 flex flex-col gap-2.5">
            {SPEAKING_PARTS.map((part, idx) => (
              <button
                key={part.id}
                onClick={() => onNavigate?.(part.id)}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left focus:outline-none active:scale-[0.97] group"
                style={{
                  background: '#fff5f5',
                  border: '1.5px solid #fecdd3',
                  transition: 'background 170ms, border-color 170ms, box-shadow 170ms',
                  animationDelay: `${idx * 60}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffe4e6'
                  e.currentTarget.style.borderColor = '#dc2626'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(220,38,38,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff5f5'
                  e.currentTarget.style.borderColor = '#fecdd3'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Numbered badge */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', boxShadow: '0 3px 10px rgba(220,38,38,0.35)' }}
                >
                  {part.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span className="block text-[13.5px] font-bold leading-tight" style={{ color: '#0f172a' }}>
                    {part.label}
                  </span>
                  <span className="block text-[11px] font-medium mt-0.5" style={{ color: '#94a3b8' }}>
                    {part.desc}
                  </span>
                </div>

                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  className="flex-shrink-0 opacity-25 group-hover:opacity-60 transition-opacity duration-200">
                  <path d="M9 18l6-6-6-6" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>

          <div className="pb-2" />
        </div>
      </div>
    </div>
  )
}

function IELTSModal({ onClose, onNavigate }) {
  const [closing, setClosing] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [panelVisible, setPanelVisible] = useState(false)
  const [contentKey, setContentKey] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)
  const [speakingPopup, setSpeakingPopup] = useState(false)
  const [speakingPopupClosing, setSpeakingPopupClosing] = useState(false)

  // Track popup open state in a ref so the stable Escape handler can read it
  const speakingPopupRef = useRef(false)
  useEffect(() => { speakingPopupRef.current = speakingPopup }, [speakingPopup])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const close = () => { setClosing(true); setTimeout(onClose, 220) }

  const closeSpeakingPopup = () => {
    setSpeakingPopupClosing(true)
    setTimeout(() => { setSpeakingPopup(false); setSpeakingPopupClosing(false) }, 200)
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'Escape') return
      if (speakingPopupRef.current) closeSpeakingPopup()
      else close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleSectionClick = (sectionId) => {
    if (activeSection === sectionId) return
    setContentKey(k => k + 1)
    setActiveSection(sectionId)
    if (!panelVisible) {
      requestAnimationFrame(() => requestAnimationFrame(() => setPanelVisible(true)))
    }
  }

  const handleItemClick = (item) => {
    if (item.action === 'speaking-popup') {
      setSpeakingPopup(true)
    } else {
      onNavigate?.(item.id)
    }
  }

  const content = activeSection ? IELTS_CONTENT[activeSection] : null
  const activeIcon = activeSection ? IELTS_SECTIONS.find(s => s.id === activeSection)?.icon : null

  const rightPanelStyle = isMobile && activeSection
    ? {
        flex: 1,
        overflow: 'hidden',
        opacity: panelVisible ? 1 : 0,
        transform: panelVisible ? 'translateX(0)' : 'translateX(12px)',
        transition: 'opacity 300ms ease 80ms, transform 280ms cubic-bezier(0.4,0,0.2,1) 60ms',
      }
    : isMobile
    ? {
        overflow: 'hidden',
        maxHeight: panelVisible ? '440px' : '0px',
        opacity: panelVisible ? 1 : 0,
        transition: 'max-height 400ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease 80ms',
      }
    : {
        width: '320px',
        flexShrink: 0,
        overflow: 'hidden',
        opacity: panelVisible ? 1 : 0,
        transition: 'opacity 320ms ease 120ms',
      }

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 ${closing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) close() }}
        role="dialog"
        aria-modal="true"
        aria-label="IELTS – bo'lim tanlash"
      >
        {/* Outer shell: overflow:hidden clips right panel; maxWidth expands to reveal it on desktop */}
        <div
          className={closing ? 'modal-box-exit' : 'modal-box-enter'}
          style={{
            width: '100%',
            maxWidth: !isMobile && panelVisible ? '740px' : '420px',
            transition: 'max-width 380ms cubic-bezier(0.4,0,0.2,1)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 32px 64px -12px rgba(0,0,0,0.55)',
          }}
        >
          {/* Inner flex: row on desktop, col on mobile */}
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile && !activeSection ? 'column' : 'row',
              alignItems: 'stretch',
              maxHeight: '88vh',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {/* ─────────── LEFT PANEL ─────────── */}
            <div
              style={{
                background: 'linear-gradient(160deg, #7f1d1d 0%, #b91c1c 55%, #dc2626 100%)',
                width: isMobile && activeSection ? '72px' : isMobile ? '100%' : '420px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header */}
              {isMobile && activeSection ? (
                <div className="flex items-center justify-center py-3 px-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
                  <button
                    onClick={close}
                    aria-label="Yopish"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 focus:outline-none active:scale-90"
                    style={{ background: 'rgba(255,255,255,0.18)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="relative px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
                  <button
                    onClick={close}
                    aria-label="Yopish"
                    className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 focus:outline-none active:scale-90"
                    style={{ background: 'rgba(255,255,255,0.18)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </button>

                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                    style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.28)' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="10" r="8" stroke="white" strokeWidth="2"/>
                      <path d="M8 10l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 18h10M12 18v3" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                    </svg>
                  </div>

                  <h2 className="text-[20px] font-extrabold text-white leading-tight">IELTS</h2>
                  <p className="text-white/60 text-[13px] font-medium mt-0.5">Bo'limni tanlang</p>
                </div>
              )}

              {/* Section list */}
              <div className={`${isMobile && activeSection ? 'px-2' : 'px-4'} py-4 flex flex-col gap-2 flex-1`}>
                {IELTS_SECTIONS.map((section) => {
                  const isActive = activeSection === section.id
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full flex items-center focus:outline-none active:scale-[0.98] ${isMobile && activeSection ? 'justify-center p-2 rounded-xl' : 'gap-3.5 px-4 py-3.5 rounded-2xl text-left'}`}
                      style={{
                        background: isActive ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.1)',
                        border: `1.5px solid ${isActive ? 'rgba(255,255,255,0.48)' : 'rgba(255,255,255,0.14)'}`,
                        boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.18)' : 'none',
                        transform: isActive ? 'scale(1.012)' : 'scale(1)',
                        transition: 'background 200ms, border-color 200ms, box-shadow 200ms, transform 200ms',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.17)'
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                        }
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isActive ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.13)',
                          border: `1px solid ${isActive ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.18)'}`,
                          transition: 'background 200ms, border-color 200ms',
                        }}
                      >
                        {section.icon}
                      </div>

                      {!(isMobile && activeSection) && (
                        <>
                          <div className="flex-1 min-w-0">
                            <span className="block text-[13.5px] font-bold text-white leading-tight">{section.title}</span>
                            <span className="block text-[11px] font-medium text-white/50 mt-0.5 truncate">{section.desc}</span>
                          </div>

                          {isActive ? (
                            <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ background: 'rgba(255,255,255,0.28)' }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-35">
                              <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Footer */}
              {!(isMobile && activeSection) && (
                <div className="px-6 pb-5 pt-2">
                  <p className="text-center text-white/28 text-[10.5px] font-medium">
                    Batafsil ma'lumot uchun ustozga murojaat qiling
                  </p>
                </div>
              )}
            </div>

            {/* ─────────── RIGHT PANEL ─────────── */}
            <div style={rightPanelStyle}>
              {content && (
                <div
                  key={contentKey}
                  className="panel-content-in"
                  style={{
                    background: content.panelBg,
                    display: 'flex',
                    flexDirection: 'column',
                    width: isMobile ? '100%' : '320px',
                    minHeight: isMobile && !activeSection ? 'auto' : '100%',
                    borderLeft: isMobile && !activeSection ? 'none' : '1px solid rgba(0,0,0,0.07)',
                    borderTop: isMobile && !activeSection ? `2px solid ${content.borderColor}` : 'none',
                  }}
                >
                  {/* Panel header */}
                  <div className="px-5 pt-5 pb-4 flex items-center gap-3"
                    style={{ borderBottom: `1px solid ${content.borderColor}` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: content.accentColor, boxShadow: `0 4px 14px ${content.accentColor}55` }}>
                      {activeIcon}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-extrabold leading-tight" style={{ color: '#0f172a' }}>
                        {content.title}
                      </h3>
                      <p className="text-[11px] font-semibold mt-0.5" style={{ color: content.accentColor + 'bb' }}>
                        {content.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Panel items */}
                  <div className="px-4 py-4 flex flex-col gap-2.5">
                    {content.items.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left focus:outline-none active:scale-[0.97] group"
                        style={{
                          background: 'white',
                          border: `1.5px solid ${content.borderColor}`,
                          transition: 'background 180ms, border-color 180ms, box-shadow 180ms',
                          animationDelay: `${idx * 55}ms`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = content.hoverBg
                          e.currentTarget.style.borderColor = content.accentColor
                          e.currentTarget.style.boxShadow = `0 4px 18px ${content.accentColor}22`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white'
                          e.currentTarget.style.borderColor = content.borderColor
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${content.accentColor}14`, border: `1px solid ${content.accentColor}28` }}
                        >
                          {item.icon(content.accentColor)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="block text-[13px] font-bold leading-tight" style={{ color: '#0f172a' }}>
                            {item.label}
                          </span>
                          <span className="block text-[11px] font-medium mt-0.5" style={{ color: '#94a3b8' }}>
                            {item.desc}
                          </span>
                        </div>

                        {/* Special badge for speaking-popup items */}
                        {item.action === 'speaking-popup' ? (
                          <div className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full"
                            style={{ background: `${content.accentColor}18`, border: `1px solid ${content.accentColor}30` }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill={content.accentColor}>
                              <polygon points="5 3 19 12 5 21 5 3"/>
                            </svg>
                            <span className="text-[10px] font-bold" style={{ color: content.accentColor }}>Start</span>
                          </div>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            className="flex-shrink-0 opacity-25 group-hover:opacity-60 transition-opacity duration-200">
                            <path d="M9 18l6-6-6-6" stroke={content.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pb-3" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Speaking Practice popup ── */}
      {speakingPopup && (
        <SpeakingPracticePopup
          onClose={closeSpeakingPopup}
          onNavigate={onNavigate}
        />
      )}
    </>
  )
}

/* ── Course card icons ── */
function EnglishFromZeroIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="16" fill="rgba(255,255,255,0.2)"/>
      <path d="M14 16h24v4H14z" fill="white" opacity="0.9"/>
      <path d="M14 22h18v3H14z" fill="white" opacity="0.7"/>
      <path d="M14 28h20v3H14z" fill="white" opacity="0.7"/>
      <path d="M14 34h14v3H14z" fill="white" opacity="0.5"/>
      <circle cx="38" cy="35" r="7" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.5"/>
      <path d="M35 35l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IELTSIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="16" fill="rgba(255,255,255,0.2)"/>
      <circle cx="26" cy="22" r="10" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M20 22l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 36h20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19 39h14" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M26 32v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function MultilevelIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="16" fill="rgba(255,255,255,0.2)"/>
      <rect x="13" y="34" width="8" height="6" rx="2" fill="white" opacity="0.6"/>
      <rect x="22" y="28" width="8" height="12" rx="2" fill="white" opacity="0.75"/>
      <rect x="31" y="20" width="8" height="20" rx="2" fill="white" opacity="0.95"/>
      <path d="M17 30l9-7 9-6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
    </svg>
  )
}

const COURSES = [
  {
    key: 'zero',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)',
    shadow: 'rgba(185,28,28,0.4)',
    badge: 'A1 → B2',
    badgeBg: 'rgba(255,255,255,0.22)',
    icon: <EnglishFromZeroIcon />,
    title: 'Ingliz tili 0 dan',
    desc: 'Noldan boshlab ingliz tilini o\'rganing. Alifbo, so\'zlashuv va grammatika.',
    tag: 'Boshlang\'ich',
    tagColor: '#fecaca',
    tagText: '#b91c1c',
  },
  {
    key: 'ielts',
    gradient: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
    shadow: 'rgba(153,27,27,0.4)',
    badge: 'Band 6–8',
    badgeBg: 'rgba(255,255,255,0.22)',
    icon: <IELTSIcon />,
    title: 'IELTS',
    desc: "Xalqaro IELTS imtihoniga tayyorgarlik. Listening, Reading, Writing, Speaking.",
    tag: 'Sertifikat',
    tagColor: '#fecaca',
    tagText: '#991b1b',
  },
  {
    key: 'multi',
    gradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)',
    shadow: 'rgba(127,29,29,0.4)',
    badge: 'A1 – C2',
    badgeBg: 'rgba(255,255,255,0.22)',
    icon: <MultilevelIcon />,
    title: 'Multilevel',
    desc: "Barcha darajalar uchun. O'z darajangizda davom eting va yuqoriga ko'taring.",
    tag: 'Barcha darajalar',
    tagColor: '#fecaca',
    tagText: '#7f1d1d',
  },
]

function CourseCard({ course, idx, onClick }) {
  return (
    <div
      className={`course-card card-shimmer card-${idx + 1} rounded-3xl p-5 flex flex-col gap-3 cursor-pointer`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.() }}
      style={{
        background: course.gradient,
        boxShadow: `0 12px 32px ${course.shadow}`,
        minHeight: 178,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>{course.icon}</div>
        <span
          className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
          style={{ background: course.badgeBg }}
        >
          {course.badge}
        </span>
      </div>

      {/* Title & desc */}
      <div className="flex-1">
        <h3 className="text-white font-extrabold text-lg leading-tight">{course.title}</h3>
        <p className="text-white font-bold text-[13px] mt-1 leading-relaxed">{course.desc}</p>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
          style={{ background: course.badgeBg }}
        >
          {course.tag}
        </span>
        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <div className="footer-anim w-full px-5 pb-10 pt-2">
      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
      >

        {/* ── Contact section ── */}
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: '1px solid #fecaca' }}>

          {/* Header row */}
          <div className="flex items-center gap-3 mb-1.5">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(220,38,38,0.1)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.38 2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-[15px] leading-tight">Biz bilan bog'lanish</h3>
              <p className="text-gray-400 text-xs mt-0.5 leading-tight">Savollaringiz bo'lsa aloqaga chiqing</p>
            </div>
          </div>

          {/* Clickable phone link */}
          <a
            href="tel:+998901234567"
            className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 active:scale-[0.98] group"
            style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#ffe4e6' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff1f2' }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(220,38,38,0.1)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#dc2626">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
            </div>
            <span className="text-gray-900 font-semibold text-sm tracking-wide">+998 90 123 45 67</span>
            <svg className="ml-auto opacity-30 group-hover:opacity-60 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#9ca3af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── Social Media ── */}
        <div className="px-5 pt-5 pb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3.5" style={{ color: '#9ca3af' }}>
            Ijtimoiy tarmoqlar
          </p>

          {/* Primary: Telegram + Instagram (with labels) */}
          <div className="flex gap-2.5 mb-2.5">
            <a
              href="https://t.me/teacher_tolib"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffe4e6' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff1f2' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#dc2626" style={{ flexShrink: 0 }}>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-gray-700 text-xs font-semibold">Telegram</span>
            </a>

            <a
              href="https://instagram.com/teacher_tolib"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffe4e6' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff1f2' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#dc2626" style={{ flexShrink: 0 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span className="text-gray-700 text-xs font-semibold">Instagram</span>
            </a>
          </div>

          {/* Secondary: YouTube + TikTok */}
          <div className="flex gap-2.5">
            <a
              href="https://youtube.com/@teacher_tolib"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffe4e6' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff1f2' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#dc2626" style={{ flexShrink: 0 }}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="text-gray-700 text-xs font-semibold">YouTube</span>
            </a>

            <a
              href="https://tiktok.com/@teacher_tolib"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffe4e6' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff1f2' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="#dc2626" style={{ flexShrink: 0 }}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/>
              </svg>
              <span className="text-gray-700 text-xs font-semibold">TikTok</span>
            </a>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div style={{ borderTop: '1px solid #fecaca' }} className="px-5 py-3.5">
          <p className="text-center text-gray-400 text-xs tracking-wide">Teacher Tolib © 2026</p>
        </div>

      </div>
    </div>
  )
}

/* ── Section label ── */
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-[3px] h-5 rounded-full" style={{ background: '#dc2626' }} />
      <span className="text-gray-500 text-[11px] font-black uppercase tracking-[0.18em]">{children}</span>
    </div>
  )
}

/* ── About section ── */
function AboutSection() {
  return (
    <section id="about" className="relative z-10 px-5 py-12">
      <div className="mx-auto w-full max-w-[520px]">
        <SectionLabel>Ustoz haqida</SectionLabel>
        <div className="rounded-3xl overflow-hidden" style={{ background: 'white', border: '1px solid #fecaca', boxShadow: '0 2px 12px rgba(220,38,38,0.08)' }}>
          <div className="px-6 pt-7 pb-5 flex items-center gap-4" style={{ borderBottom: '1px solid #fecaca' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl" style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)', border: '2px solid #fca5a5' }}>
              <span className="text-2xl font-black text-white select-none">T</span>
            </div>
            <div>
              <h2 className="text-gray-900 font-extrabold text-[18px] leading-tight">Teacher Tolib</h2>
              <p className="text-gray-500 text-[13px] mt-0.5 font-medium">Ingliz tili muallimi · IELTS Coach</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                <span className="text-[11px] font-semibold" style={{ color: '#16a34a' }}>Online dars beradi</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3" style={{ borderBottom: '1px solid #fecaca' }}>
            {[
              { num: '5+',    label: 'Yil tajriba'  },
              { num: '1200+', label: "O'quvchilar"   },
              { num: '98%',   label: 'Muvaffaqiyat'  },
            ].map((s, i) => (
              <div key={s.label} className="py-4 text-center" style={{ borderRight: i < 2 ? '1px solid #fecaca' : 'none' }}>
                <span className="block text-gray-900 font-black text-[22px] leading-none">{s.num}</span>
                <span className="block text-gray-400 text-[10.5px] font-medium mt-1.5">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="px-6 pt-5 pb-4">
            <p className="text-gray-600 text-[13px] leading-[1.75]">
              Ingliz tilini professional darajada o'qitaman. IELTS va umumiy ingliz tili kurslarini
              muvaffaqiyatli olib boraman. 5 yildan ortiq tajribam bilan 1200 dan ziyod o'quvchiga
              ingliz tilini o'rgatdim va ularni maqsadlariga yetkazishga yordam berdim.
            </p>
          </div>

          <div className="px-5 pb-5 flex gap-2.5">
            <a href="https://t.me/teacher_tolib" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ffe4e6' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff1f2' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-gray-700 text-xs font-semibold">Telegram</span>
            </a>
            <a href="https://instagram.com/teacher_tolib" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ffe4e6' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff1f2' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span className="text-gray-700 text-xs font-semibold">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Courses section ── */
const SECTION_COURSES = [
  {
    key: 'zero',
    path: '/english-from-zero',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)',
    shadow: 'rgba(185,28,28,0.4)',
    badge: 'A1 → B2',
    icon: <EnglishFromZeroIcon />,
    title: 'Ingliz tili 0 dan',
    desc: "Noldan boshlab ingliz tilini o'rganing. Grammatika va so'zlashuv.",
    tag: "Boshlang'ich",
  },
  {
    key: 'ielts',
    path: '/ielts',
    gradient: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
    shadow: 'rgba(153,27,27,0.4)',
    badge: 'Band 6–8',
    icon: <IELTSIcon />,
    title: 'IELTS',
    desc: "Xalqaro IELTS imtihoniga tayyorgarlik. 4 ko'nikma.",
    tag: 'Sertifikat',
  },
  {
    key: 'multi',
    path: '/multilevel',
    gradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)',
    shadow: 'rgba(127,29,29,0.4)',
    badge: 'A1 – C2',
    icon: <MultilevelIcon />,
    title: 'Multilevel',
    desc: "Barcha darajalar uchun. O'z darajangizda davom eting.",
    tag: 'Barcha darajalar',
  },
]

function CoursesSection() {
  const navigate = useNavigate()
  return (
    <section id="courses" className="relative z-10 px-5 py-12">
      <div className="mx-auto w-full max-w-[520px]">
        <SectionLabel>Kurslarimiz</SectionLabel>
        <p className="text-gray-500 text-[13px] font-medium mb-5 -mt-2">O'zingizga mos kursni tanlang</p>
        <div className="flex flex-col gap-3">
          {SECTION_COURSES.map((course) => (
            <div
              key={course.key}
              className="course-card rounded-3xl p-5 flex flex-col gap-3 cursor-pointer active:scale-[0.98] transition-transform duration-150"
              onClick={() => navigate(course.path)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(course.path) }}
              style={{ background: course.gradient, boxShadow: `0 12px 32px ${course.shadow}`, minHeight: 160 }}
            >
              <div className="flex items-start justify-between">
                {course.icon}
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: 'rgba(255,255,255,0.22)' }}>
                  {course.badge}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-extrabold text-lg leading-tight">{course.title}</h3>
                <p className="text-white/85 text-[13px] mt-1 leading-relaxed">{course.desc}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: 'rgba(255,255,255,0.22)' }}>
                  {course.tag}
                </span>
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Results section ── */
const IELTS_SCORES = [
  { name: 'Jasur T.',   score: '7.5', module: 'Academic' },
  { name: 'Nilufar X.', score: '7.0', module: 'General'  },
  { name: 'Bobur A.',   score: '6.5', module: 'Academic' },
  { name: 'Zulfiya K.', score: '8.0', module: 'Academic' },
  { name: 'Sherzod M.', score: '6.0', module: 'General'  },
]

function ResultsSection() {
  return (
    <section id="results" className="relative z-10 px-5 py-12">
      <div className="mx-auto w-full max-w-[520px]">
        <SectionLabel>Natijalar</SectionLabel>
        <p className="text-gray-500 text-[13px] font-medium mb-5 -mt-2">O'quvchilarimizning yutuqlari</p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              num: '300+', label: 'IELTS sertifikat',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="8" stroke="#dc2626" strokeWidth="2"/>
                  <path d="M8 10l3 3 5-5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 18h10M12 18v3" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
                </svg>
              ),
            },
            {
              num: '6.8', label: "O'rtacha ball",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 20V10M12 20V4M6 20v-6" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
            {
              num: '98%', label: 'Muvaffaqiyat',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl px-2 py-4 text-center" style={{ background: 'white', border: '1px solid #fecaca', boxShadow: '0 1px 6px rgba(220,38,38,0.07)' }}>
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <span className="block text-gray-900 font-black text-[20px] leading-none">{stat.num}</span>
              <span className="block text-gray-400 text-[10px] font-medium mt-1.5 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ background: 'white', border: '1px solid #fecaca', boxShadow: '0 2px 12px rgba(220,38,38,0.08)' }}>
          <div className="px-5 pt-5 pb-3" style={{ borderBottom: '1px solid #fecaca' }}>
            <h3 className="text-gray-900 font-bold text-[14px]">So'nggi IELTS natijalari</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Talabalarimizning real natijalari</p>
          </div>
          <div className="px-4 py-3 flex flex-col gap-2">
            {IELTS_SCORES.map(s => (
              <div key={s.name} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl" style={{ background: '#fef2f2' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(220,38,38,0.12)' }}>
                  <span className="text-red-700 font-bold text-[12px]">{s.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-gray-900 font-semibold text-[13px] truncate">{s.name}</span>
                  <span className="block text-gray-400 text-[11px]">{s.module}</span>
                </div>
                <div className="px-2.5 py-1 rounded-xl flex-shrink-0" style={{ background: 'rgba(220,38,38,0.10)', border: '1px solid rgba(220,38,38,0.22)' }}>
                  <span className="font-black text-[13px]" style={{ color: '#dc2626' }}>Band {s.score}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pb-2" />
        </div>
      </div>
    </section>
  )
}

/* ── Donate section ── */
function DonateSection() {
  const [copied, setCopied] = useState(false)

  const copyCard = () => {
    navigator.clipboard?.writeText('8600123456789012').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="donate" className="relative z-10 px-5 pt-12 pb-4">
      <div className="mx-auto w-full max-w-[520px]">
        <SectionLabel>Donat</SectionLabel>
        <p className="text-gray-500 text-[13px] font-medium mb-5 -mt-2">Ustozni qo'llab-quvvatlang</p>

        <div className="rounded-3xl px-5 py-5 mb-3 flex items-start gap-4" style={{ background: '#fff1f2', border: '1px solid #fecaca', boxShadow: '0 2px 10px rgba(220,38,38,0.07)' }}>
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(220,38,38,0.12)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-extrabold text-[15px] leading-tight">Yordamingiz muhim</h3>
            <p className="text-gray-600 text-[12.5px] mt-1.5 leading-relaxed">
              Sizning yordamingiz yangi darslar, materiallar va platformani rivojlantirishga sarf qilinadi.
            </p>
          </div>
        </div>

        {/* Bank card visual */}
        <div className="rounded-3xl p-5 mb-3 relative overflow-hidden select-none" style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 55%, #ef4444 100%)', boxShadow: '0 20px 48px rgba(185,28,28,0.55)' }}>
          <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full opacity-[0.08]" style={{ border: '28px solid white' }} />
          <div className="absolute top-8 -right-2 w-24 h-24 rounded-full opacity-[0.07]" style={{ border: '20px solid white' }} />

          <div className="w-9 h-[27px] rounded-lg mb-5 relative z-10" style={{ background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)', boxShadow: '0 2px 8px rgba(245,158,11,0.5)' }} />

          <div className="relative z-10 mb-4">
            <p className="text-white/45 text-[9.5px] font-semibold uppercase tracking-[0.2em] mb-1">Karta raqami</p>
            <p className="text-white font-black text-[19px] tracking-[0.2em] leading-none">8600 1234 5678 9012</p>
          </div>

          <div className="flex items-end justify-between relative z-10">
            <div>
              <p className="text-white/45 text-[9px] uppercase tracking-[0.15em]">Karta egasi</p>
              <p className="text-white font-bold text-[13px] mt-0.5 tracking-wide">TOLIB O.</p>
            </div>
            <div className="text-right">
              <p className="text-white/45 text-[9px] uppercase tracking-[0.15em]">Muddati</p>
              <p className="text-white font-bold text-[13px] mt-0.5">12/27</p>
            </div>
          </div>
        </div>

        <button
          onClick={copyCard}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.97] font-bold text-[14px]"
          style={{
            background: copied ? 'rgba(74,222,128,0.12)' : '#fff1f2',
            border: `1.5px solid ${copied ? 'rgba(74,222,128,0.4)' : '#fecaca'}`,
            color: copied ? '#16a34a' : '#dc2626',
          }}
          onMouseEnter={e => { if (!copied) e.currentTarget.style.background = '#ffe4e6' }}
          onMouseLeave={e => { if (!copied) e.currentTarget.style.background = '#fff1f2' }}
        >
          {copied ? (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: '#16a34a' }}>Nusxalandi!</span>
            </>
          ) : (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Karta raqamini nusxalash
            </>
          )}
        </button>

        <p className="text-center text-gray-400 text-[11px] mt-3 mb-2">
          Har qanday miqdordagi yordam qabul qilinadi · Rahmat!
        </p>
      </div>
    </section>
  )
}

export default function HomePage({ user, lang, setLang, dark, setDark, onLogout }) {
  const t = langs[lang]?.home || langs['en'].home
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [fading, setFading] = useState(false)

  const handleStart = () => {
    setFading(true)
    setTimeout(() => navigate('/courses'), 340)
  }

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col relative overflow-x-hidden">

      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} onLogout={() => setShowModal(true)} />

      {/* Aurora background */}
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      {/* ── HERO ── */}
      <div
        className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 text-center gap-0 pt-20 ${fading ? 'hero-fade-out' : ''}`}
        style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 40%, #dc2626 70%, #ef4444 100%)' }}
      >
        <div className="fu-1">
          <div className="float-bob w-20 h-20 sm:w-28 sm:h-28 bg-white/20 rounded-3xl flex items-center justify-center border-2 border-white/40 mb-5 sm:mb-8 shadow-2xl shadow-black/20">
            <span className="text-3xl sm:text-5xl font-extrabold text-white">
              {user?.firstName?.[0]?.toUpperCase() || '?'}
            </span>
          </div>
        </div>

        <h1 className="fu-2 text-[2.2rem] sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
          {t.greeting},
        </h1>
        <h2 className="fu-3 text-[2.2rem] sm:text-5xl md:text-6xl font-extrabold text-white mt-1 sm:mt-2 mb-5 sm:mb-8 drop-shadow-lg">
          {user?.firstName || ''}!
        </h2>

        <div className="fu-4 bg-white/15 backdrop-blur-sm border border-white/30 rounded-3xl px-5 sm:px-8 py-4 sm:py-5 shadow-2xl w-full max-w-[min(100%,22rem)] sm:max-w-sm">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
            <div className="sparkle-spin" style={{ animationDelay: '0.3s' }}><SparkleIcon size={12} /></div>
            <div className="sparkle-spin"><SparkleIcon size={22} /></div>
            <div className="sparkle-spin" style={{ animationDelay: '1.1s' }}><SparkleIcon size={12} /></div>
          </div>
          <p className="text-white font-semibold text-sm sm:text-base leading-snug text-center">
            {t.welcome}
            <span
              className="block mt-1 font-black text-xl sm:text-2xl tracking-tight teacher-tolib-shine"
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #fecaca 40%, #ffffff 70%, #fecaca 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'teacherShine 2.4s linear infinite, teacherPop 0.6s cubic-bezier(0.22,1,0.36,1) both',
                filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.5))',
              }}
            >
              Teacher Tolib
            </span>
          </p>
        </div>

        <button
          onClick={handleStart}
          className="fu-5 mt-5 sm:mt-7 px-8 sm:px-12 py-3 sm:py-4 bg-white dark:bg-gray-100 text-red-600 font-bold text-sm sm:text-lg rounded-2xl shadow-2xl hover:shadow-xl hover:bg-red-50 active:scale-[0.97] transition-all duration-200"
        >
          {t.startBtn}
        </button>

      </div>

      {showModal && (
        <LogoutModal t={t} onConfirm={onLogout} onCancel={() => setShowModal(false)} />
      )}
    </div>
  )
}
