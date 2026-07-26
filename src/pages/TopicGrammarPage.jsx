import { useEffect, useState } from 'react'
import { api } from '../api'
import Navbar from '../Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const langs = { en, uz, ru }

const GRAMMAR_LESSON_ID = 'l_zero_2' // "Topic Grammar Test"

const LEVEL_STYLES = [
  { accent: '#dc2626', badgeBg: 'rgba(220,38,38,0.12)'  },
  { accent: '#b91c1c', badgeBg: 'rgba(185,28,28,0.12)'  },
  { accent: '#991b1b', badgeBg: 'rgba(153,27,27,0.12)'  },
  { accent: '#7f1d1d', badgeBg: 'rgba(127,29,29,0.12)'  },
  { accent: '#ef4444', badgeBg: 'rgba(239,68,68,0.12)'  },
  { accent: '#f87171', badgeBg: 'rgba(248,113,113,0.12)' },
]

const FALLBACK_LEVELS = [
  { badge: 'A1', title: 'Beginner' }, { badge: 'A2', title: 'Elementary' },
  { badge: 'B1', title: 'Intermediate' }, { badge: 'B2', title: 'Upper Intermediate' },
  { badge: 'C1', title: 'Advanced' }, { badge: 'C2', title: 'Proficient' },
].map((l) => ({
  ...l,
  units: Array.from({ length: 6 }, (_, u) => ({ id: `${l.badge}_u${u + 1}`, title: `Unit ${u + 1}`, subtitle: `${l.badge} — ${l.title}`, isPaid: u >= 3 })),
}))

function PaywallModal({ levelCode, unitNum, onClose, t }) {
  const [closing, setClosing] = useState(false)
  const close = () => { setClosing(true); setTimeout(onClose, 220) }

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end justify-center px-4 pb-6 sm:items-center ${closing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      role="dialog"
      aria-modal="true"
      aria-label={t.paywallTitle}
    >
      <div className={`w-full max-w-sm ${closing ? 'modal-box-exit' : 'modal-box-enter'}`}>
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(145deg, #1c0a0a 0%, #3b0f0f 50%, #1c0a0a 100%)', border: '1.5px solid rgba(220,38,38,0.25)' }}
        >
          <div className="relative px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(220,38,38,0.15)' }}>
            <button
              onClick={close}
              aria-label={t.cancel}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center active:scale-90 transition-all duration-150 focus:outline-none"
              style={{ background: 'rgba(220,38,38,0.15)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220,38,38,0.25)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(220,38,38,0.15)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
              style={{ background: 'rgba(220,38,38,0.2)', border: '1.5px solid rgba(220,38,38,0.4)' }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 11V7a4 4 0 018 0v4" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="16" r="1.5" fill="#f87171"/>
              </svg>
            </div>

            <div className="flex justify-center mb-3">
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: 'rgba(220,38,38,0.2)', color: '#f87171', border: '1px solid rgba(220,38,38,0.4)' }}
              >
                {levelCode} — Unit {unitNum}
              </span>
            </div>

            <h2 className="text-white font-extrabold text-[19px] text-center leading-tight">
              {t.paywallTitle}
            </h2>
            <p className="text-white/55 text-[13px] text-center mt-2 leading-relaxed px-2">
              {t.paywallDesc}
            </p>
          </div>

          <div className="px-6 py-4 flex flex-col gap-2.5">
            {(t.perks || []).map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(220,38,38,0.2)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white/70 text-[12.5px] font-medium">{perk}</span>
              </div>
            ))}
          </div>

          <div className="px-6 pb-6 flex flex-col gap-2.5 mt-1">
            <button
              onClick={close}
              className="w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all duration-150 active:scale-[0.97] text-white"
              style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)', boxShadow: '0 6px 20px rgba(220,38,38,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(220,38,38,0.55)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(220,38,38,0.4)' }}
            >
              {t.payBtn}
            </button>
            <button
              onClick={close}
              className="w-full py-3 rounded-2xl font-semibold text-sm text-white/60 hover:text-white/90 transition-colors duration-150 focus:outline-none"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LevelAccordion({ level, isOpen, onToggle, onFreeUnitClick, onLockedUnitClick, idx, t }) {
  const units = level.units
  const freeCount = units.filter(u => !u.isPaid).length
  const paidCount = units.length - freeCount

  return (
    <div
      className={`lcard-${idx + 1} rounded-3xl overflow-hidden`}
      style={{
        background: isOpen ? '#fff1f2' : 'white',
        border: `1.5px solid ${isOpen ? level.accent + '55' : '#e5e7eb'}`,
        boxShadow: isOpen ? `0 8px 32px rgba(220,38,38,0.1), 0 0 0 0.5px ${level.accent}22` : 'none',
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div
          className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isOpen ? level.accent + '18' : 'rgba(220,38,38,0.07)',
            border: `1.5px solid ${isOpen ? level.accent + '50' : 'rgba(220,38,38,0.18)'}`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={level.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={level.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[17px] leading-tight" style={{ color: level.accent }}>{level.code}</span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: level.badgeBg, color: level.accent, border: `1px solid ${level.accent}35` }}
            >
              {level.name}
            </span>
          </div>
          <span className="text-gray-400 text-xs font-medium mt-0.5 block">
            {freeCount} {t.free} · {paidCount} {t.paid}
          </span>
        </div>

        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
            opacity: 0.5,
          }}
        >
          <path d="M6 9l6 6 6-6" stroke="#6b7280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.32s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-5 pb-4 flex flex-col gap-2.5 pt-1">
            <div style={{ borderTop: '1px solid #fecaca', marginBottom: 4 }} />

            {units.map((unit, unitIdx) => {
              const locked = unit.isPaid
              return locked ? (
                <button
                  key={unit.id}
                  onClick={() => onLockedUnitClick(level.code, unit.title, unitIdx + 1)}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left focus:outline-none transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: '#f9fafb',
                    border: '1.5px solid #e5e7eb',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(220,38,38,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(220,38,38,0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f9fafb'
                    e.currentTarget.style.borderColor = '#e5e7eb'
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="11" width="14" height="10" rx="2" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 11V7a4 4 0 018 0v4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex-1">
                    <span className="text-gray-400 font-bold text-sm">{unit.title}</span>
                    <span className="block text-gray-300 text-[11px] font-medium mt-0.5">
                      {unit.subtitle || `${level.code} — ${level.name}`}
                    </span>
                  </div>

                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.25)' }}
                  >
                    {t.paidBadge}
                  </span>
                </button>
              ) : (
                <button
                  key={unit.id}
                  onClick={() => onFreeUnitClick(level.code, unit.title, unitIdx + 1)}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] focus:outline-none group"
                  style={{ background: '#fff1f2', border: '1.5px solid #fecaca' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffe4e6'
                    e.currentTarget.style.borderColor = level.accent + '55'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(220,38,38,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff1f2'
                    e.currentTarget.style.borderColor = '#fecaca'
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: level.badgeBg, border: `1px solid ${level.accent}35` }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M12 20h9" stroke={level.accent} strokeWidth="2" strokeLinecap="round"/>
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke={level.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex-1">
                    <span className="font-bold text-sm" style={{ color: level.accent }}>{unit.title}</span>
                    <span className="block text-gray-400 text-[11px] font-medium mt-0.5">
                      {unit.subtitle || `${level.code} — ${level.name}`}
                    </span>
                  </div>

                  <svg
                    className="flex-shrink-0 opacity-30 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-200"
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M9 18l6-6-6-6" stroke="#9ca3af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TopicGrammarPage({ dark, setDark, onBack, onLogout, onNavigate, lang = 'uz', setLang }) {
  const [openLevel,   setOpenLevel]   = useState(null)
  const [paywallInfo, setPaywallInfo] = useState(null)
  const [levels,      setLevels]      = useState(FALLBACK_LEVELS)

  const t = (langs[lang] || langs.uz).topicGrammar
  const toggle = (code) => setOpenLevel((prev) => (prev === code ? null : code))

  useEffect(() => {
    Promise.all([
      api.getGrammarLevelsByLesson(GRAMMAR_LESSON_ID),
      api.getGrammarUnitsByLesson(GRAMMAR_LESSON_ID),
    ])
      .then(([levelsData, unitsData]) => {
        if (!Array.isArray(levelsData) || levelsData.length === 0) return
        setLevels(levelsData.map(lv => ({
          badge: lv.badge,
          title: lv.title,
          units: unitsData.filter(u => u.levelId === lv.id).sort((a, b) => a.order - b.order),
        })))
      })
      .catch(() => {})
  }, [])

  const merged = levels.map((lv, idx) => ({
    code: lv.badge,
    name: lv.title,
    accent: LEVEL_STYLES[idx % LEVEL_STYLES.length].accent,
    badgeBg: LEVEL_STYLES[idx % LEVEL_STYLES.length].badgeBg,
    units: lv.units,
  }))

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: dark ? '#111827' : 'white' }}>

      <Navbar dark={dark} setDark={setDark} onLogout={onLogout} lang={lang} setLang={setLang} />

      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <div className="px-5 pt-20 pb-4 mx-auto w-full max-w-2xl">
          <BackButton onClick={onBack} className="mb-4" lang={lang} />

          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
            style={{ background: 'rgba(220,38,38,0.1)', border: '1.5px solid rgba(220,38,38,0.25)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 11l3 3L22 4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-extrabold text-xl sm:text-2xl leading-tight fu-1" style={{ color: '#dc2626' }}>
            {t.title}
          </h1>
          <p className="text-gray-500 text-sm mt-1 fu-2">
            {t.pageSubtitle}
          </p>
        </div>

        <div className="px-5 mx-auto w-full max-w-2xl flex flex-col gap-3 pb-6">
          {merged.map((level, idx) => (
            <LevelAccordion
              key={level.code}
              level={level}
              idx={idx}
              isOpen={openLevel === level.code}
              onToggle={() => toggle(level.code)}
              onFreeUnitClick={(code, title, num) => onNavigate?.('unit-test', { level: code.toLowerCase(), unit: num, unitTitle: title })}
              onLockedUnitClick={(code, _title, num) => setPaywallInfo({ levelCode: code, unitNum: num })}
              t={t}
            />
          ))}
        </div>

        <div className="mt-6">
          <Footer dark={dark} lang={lang} />
        </div>
      </div>

      {paywallInfo && (
        <PaywallModal
          levelCode={paywallInfo.levelCode}
          unitNum={paywallInfo.unitNum}
          onClose={() => setPaywallInfo(null)}
          t={t}
        />
      )}
    </div>
  )
}
