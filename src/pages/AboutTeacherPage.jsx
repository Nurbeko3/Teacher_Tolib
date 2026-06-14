import { useEffect, useRef, useState } from 'react'
import PageLayout from '../components/PageLayout'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const langs = { en, uz, ru }

/* ── Count-up hook ── */
function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.floor(eased * target))
            if (p < 1) requestAnimationFrame(tick)
            else setValue(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}

/* ── Animated stat card ── */
function StatCard({ icon, value, suffix, label, delay, color, dark }) {
  const { value: count, ref } = useCountUp(value, 1400)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className="stat-card-in flex flex-col items-center gap-2 rounded-2xl px-3 py-5 cursor-default transition-all duration-300"
      style={{
        animationDelay: `${delay}ms`,
        background: hovered ? color.bgHover : (dark ? '#1f2937' : color.bg),
        border: `1.5px solid ${hovered ? color.border2 : (dark ? 'rgba(55,65,81,0.6)' : color.border)}`,
        boxShadow: hovered ? `0 8px 24px ${color.shadow}` : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered ? color.iconBgHover : color.iconBg,
          boxShadow: hovered ? `0 4px 12px ${color.shadow}` : 'none',
        }}
      >
        {icon(hovered ? 'white' : color.accent)}
      </div>
      <div className="text-center">
        <span className="block font-black text-[26px] leading-none" style={{ color: hovered ? 'white' : color.accent }}>
          {count}{suffix}
        </span>
        <span className="block text-[12px] font-semibold mt-1 leading-tight" style={{ color: hovered ? 'rgba(255,255,255,0.8)' : (dark ? '#9ca3af' : '#6b7280') }}>{label}</span>
      </div>
    </div>
  )
}

/* ── Fade-in wrapper ── */
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const ACHIEVEMENTS = [
  { label: 'IELTS Band 8.0', icon: '🎯' },
  { label: 'CEFR Certified', icon: '📜' },
  { label: 'Top Educator', icon: '🏆' },
  { label: '6 Years Pro', icon: '⭐' },
]

const SKILL_TAGS = ['IELTS Listening','IELTS Reading','IELTS Writing','IELTS Speaking','Grammar','Vocabulary','Pronunciation','Business English']

export default function AboutTeacherPage({ dark = false, lang = 'uz' }) {
  const t = (langs[lang] || langs.uz).about

  const STATS = [
    {
      value: 8, suffix: '.0', label: 'IELTS Band', delay: 0,
      color: { accent: '#dc2626', bg: '#fff1f2', bgHover: '#b91c1c', border: '#fecaca', border2: '#dc2626', iconBg: 'rgba(220,38,38,0.12)', iconBgHover: 'rgba(255,255,255,0.25)', shadow: 'rgba(220,38,38,0.25)' },
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="10" r="8" stroke={c} strokeWidth="2"/>
          <path d="M8 10l3 3 5-5" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 18h10M12 18v3" stroke={c} strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
        </svg>
      ),
    },
    {
      value: 69, suffix: '', label: 'CEFR Score', delay: 80,
      color: { accent: '#991b1b', bg: '#fff1f2', bgHover: '#991b1b', border: '#fecaca', border2: '#991b1b', iconBg: 'rgba(153,27,27,0.1)', iconBgHover: 'rgba(255,255,255,0.25)', shadow: 'rgba(153,27,27,0.25)' },
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 20V10M12 20V4M6 20v-6" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      value: 6, suffix: '+', label: t.statsYears, delay: 160,
      color: { accent: '#b91c1c', bg: '#fff1f2', bgHover: '#b91c1c', border: '#fecaca', border2: '#b91c1c', iconBg: 'rgba(185,28,28,0.1)', iconBgHover: 'rgba(255,255,255,0.25)', shadow: 'rgba(185,28,28,0.25)' },
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2v4M8 2v4M3 10h18" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="16" r="2" fill={c}/>
        </svg>
      ),
    },
    {
      value: 1200, suffix: '+', label: t.statsStudents, delay: 240,
      color: { accent: '#dc2626', bg: '#fff1f2', bgHover: '#dc2626', border: '#fecaca', border2: '#dc2626', iconBg: 'rgba(220,38,38,0.1)', iconBgHover: 'rgba(255,255,255,0.25)', shadow: 'rgba(220,38,38,0.25)' },
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke={c} strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      value: 90, suffix: '+', label: t.statsSuccess, delay: 320,
      color: { accent: '#7f1d1d', bg: '#fff1f2', bgHover: '#7f1d1d', border: '#fecaca', border2: '#7f1d1d', iconBg: 'rgba(127,29,29,0.1)', iconBgHover: 'rgba(255,255,255,0.25)', shadow: 'rgba(127,29,29,0.25)' },
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      value: 98, suffix: '%', label: 'Satisfaction', delay: 400,
      color: { accent: '#ef4444', bg: '#fff1f2', bgHover: '#ef4444', border: '#fecaca', border2: '#ef4444', iconBg: 'rgba(239,68,68,0.1)', iconBgHover: 'rgba(255,255,255,0.25)', shadow: 'rgba(239,68,68,0.25)' },
      icon: (c) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01l-3-3" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  const cardBg    = dark ? '#1f2937' : 'white'
  const cardBorder = dark ? 'rgba(55,65,81,0.6)' : '#fecaca'
  const subText   = dark ? '#9ca3af' : '#6b7280'
  const labelColor = dark ? '#6b7280' : '#9ca3af'

  return (
    <PageLayout dark={dark} lang={lang}>
      <style>{`
        @keyframes statCardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .stat-card-in { animation: statCardIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes heroPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.3); }
          50%      { box-shadow: 0 0 0 12px rgba(220,38,38,0); }
        }
        .avatar-pulse { animation: heroPulse 2.8s ease-in-out infinite; }
        @keyframes badgeFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        .badge-float { animation: badgeFloat 3s ease-in-out infinite; }
      `}</style>

      <div className="pb-10">

        {/* ── Hero banner ── */}
        <FadeIn delay={0}>
          <div className="relative overflow-hidden mx-4 mt-4 rounded-3xl"
            style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 45%, #dc2626 75%, #ef4444 100%)' }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10" style={{ border: '36px solid white' }} />
            <div className="absolute top-12 -right-4 w-28 h-28 rounded-full opacity-[0.07]" style={{ border: '22px solid white' }} />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-[0.06]" style={{ border: '28px solid white' }} />

            <div className="relative z-10 px-6 pt-8 pb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div
                  className="avatar-pulse w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.18)', border: '3px solid rgba(255,255,255,0.45)' }}
                >
                  <span className="text-4xl sm:text-5xl font-black text-white select-none">T</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                  <span className="text-[11px] font-bold text-white">{t.online}</span>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-white/60 text-[11px] font-bold uppercase tracking-[0.18em] mb-1">Professional English Educator</p>
                <h1 className="text-white font-black text-2xl sm:text-3xl leading-tight mb-1">Teacher Tolib</h1>
                <p className="text-white/75 text-[13px] font-medium mb-4">{t.subRole}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {ACHIEVEMENTS.map((a, i) => (
                    <span
                      key={a.label}
                      className="badge-float flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white"
                      style={{ background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.32)', animationDelay: `${i * 0.4}s` }}
                    >
                      <span>{a.icon}</span>
                      {a.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Headline ── */}
        <FadeIn delay={100} className="px-5 mt-7 mb-2">
          <h2 className="font-black text-2xl sm:text-3xl leading-snug" style={{ color: '#dc2626' }}>
            {t.tagline}
          </h2>
          <p className="text-[15px] leading-relaxed mt-2 max-w-sm" style={{ color: subText }}>
            {t.taglineDesc}
          </p>
        </FadeIn>

        {/* ── Stats grid ── */}
        <FadeIn delay={180} className="px-4 mt-6">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: '#dc2626' }}>
            {t.statsLabel}
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} dark={dark} />
            ))}
          </div>
        </FadeIn>

        {/* ── About card ── */}
        <FadeIn delay={260} className="px-4 mt-5">
          <div className="rounded-3xl overflow-hidden"
            style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, boxShadow: '0 4px 20px rgba(220,38,38,0.08)' }}>

            {/* About header */}
            <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.1)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#dc2626" strokeWidth="2"/>
                    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="font-extrabold text-[16px]" style={{ color: '#dc2626' }}>{t.aboutLabel}</span>
              </div>
              <p className="text-[15px] leading-[1.8]" style={{ color: subText }}>
                {t.bioDetail}
              </p>
            </div>

            {/* Skills */}
            <div className="px-5 pt-4 pb-4" style={{ borderBottom: `1px solid ${cardBorder}` }}>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] mb-3" style={{ color: labelColor }}>
                {t.skillsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILL_TAGS.map(skill => (
                  <span key={skill}
                    className="px-3 py-1.5 rounded-full text-[13px] font-bold transition-all duration-200"
                    style={{ background: dark ? 'rgba(220,38,38,0.12)' : '#fff1f2', color: '#b91c1c', border: `1px solid ${dark ? 'rgba(220,38,38,0.25)' : '#fecaca'}` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="px-5 pt-4 pb-5">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] mb-3" style={{ color: labelColor }}>
                {t.contactTitle}
              </p>
              <div className="flex gap-2.5">
                <a href="https://t.me/teacher_tolib" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 active:scale-[0.97]"
                  style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)', color: 'white', boxShadow: '0 4px 14px rgba(220,38,38,0.35)' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(220,38,38,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(220,38,38,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
                <a href="https://instagram.com/teacher_tolib" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-[15px] transition-all duration-200 active:scale-[0.97]"
                  style={{ background: dark ? 'rgba(220,38,38,0.12)' : '#fff1f2', color: '#dc2626', border: `1.5px solid ${cardBorder}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = dark ? '#374151' : '#ffe4e6'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = dark ? 'rgba(220,38,38,0.12)' : '#fff1f2'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </PageLayout>
  )
}
