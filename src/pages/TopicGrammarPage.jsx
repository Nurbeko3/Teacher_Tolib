import { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../components/Footer'

const LEVELS = [
  { code: 'A1', name: 'Beginner',           accent: '#34d399', badge: 'rgba(52,211,153,0.2)'  },
  { code: 'A2', name: 'Elementary',         accent: '#67e8f9', badge: 'rgba(103,232,249,0.2)' },
  { code: 'B1', name: 'Intermediate',       accent: '#c084fc', badge: 'rgba(192,132,252,0.2)' },
  { code: 'B2', name: 'Upper Intermediate', accent: '#60a5fa', badge: 'rgba(96,165,250,0.2)'  },
  { code: 'C1', name: 'Advanced',           accent: '#fbbf24', badge: 'rgba(251,191,36,0.2)'  },
  { code: 'C2', name: 'Proficient',         accent: '#fb7185', badge: 'rgba(251,113,133,0.2)' },
]

const UNIT_COUNTS = { A1: 6, A2: 6, B1: 6, B2: 6, C1: 6, C2: 6 }
const FREE_UNITS  = 3   // first N units are free; the rest require payment

/* ── Payment required popup ── */
function PaywallModal({ levelCode, unitNum, onClose }) {
  const [closing, setClosing] = useState(false)
  const close = () => { setClosing(true); setTimeout(onClose, 220) }

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end justify-center px-4 pb-6 sm:items-center ${closing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      role="dialog"
      aria-modal="true"
      aria-label="To'lov talab qilinadi"
    >
      <div className={`w-full max-w-sm ${closing ? 'modal-box-exit' : 'modal-box-enter'}`}>
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(145deg, #1c1c2e 0%, #2d1b4e 50%, #1a1a2e 100%)', border: '1.5px solid rgba(255,255,255,0.12)' }}
        >
          {/* ── Header ── */}
          <div className="relative px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Yopish"
              className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center active:scale-90 transition-all duration-150 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Lock icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
              style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.25) 0%, rgba(245,158,11,0.15) 100%)', border: '1.5px solid rgba(251,191,36,0.35)' }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 11V7a4 4 0 018 0v4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="16" r="1.5" fill="#fbbf24"/>
              </svg>
            </div>

            {/* Unit badge */}
            <div className="flex justify-center mb-3">
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
              >
                {levelCode} — Unit {unitNum}
              </span>
            </div>

            <h2 className="text-white font-extrabold text-[19px] text-center leading-tight">
              To'lov talab qilinadi
            </h2>
            <p className="text-white/55 text-[13px] text-center mt-2 leading-relaxed px-2">
              Bu unit pullik kontent. Kirish uchun to'lovni amalga oshiring.
            </p>
          </div>

          {/* ── Perks list ── */}
          <div className="px-6 py-4 flex flex-col gap-2.5">
            {[
              "Barcha unitlarga to'liq kirish",
              'Interaktiv test savollari',
              'Natijalar va statistika',
              "O'qituvchi izohlari",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(52,211,153,0.2)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white/70 text-[12.5px] font-medium">{perk}</span>
              </div>
            ))}
          </div>

          {/* ── Buttons ── */}
          <div className="px-6 pb-6 flex flex-col gap-2.5 mt-1">
            <button
              onClick={close}
              className="w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all duration-150 active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', color: '#1c1c2e', boxShadow: '0 6px 20px rgba(251,191,36,0.35)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(251,191,36,0.5)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(251,191,36,0.35)' }}
            >
              To'lov qilish
            </button>
            <button
              onClick={close}
              className="w-full py-3 rounded-2xl font-semibold text-sm text-white/60 hover:text-white/90 transition-colors duration-150 focus:outline-none"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Single level accordion ── */
function LevelAccordion({ level, isOpen, onToggle, onFreeUnitClick, onLockedUnitClick, idx }) {
  const totalUnits = UNIT_COUNTS[level.code]
  const units      = Array.from({ length: totalUnits }, (_, i) => i + 1)

  return (
    <div
      className={`lcard-${idx + 1} rounded-3xl overflow-hidden`}
      style={{
        background: isOpen ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.10)',
        border: `1.5px solid ${isOpen ? level.accent + '55' : 'rgba(255,255,255,0.18)'}`,
        boxShadow: isOpen ? `0 8px 32px rgba(0,0,0,0.18), 0 0 0 0.5px ${level.accent}33` : 'none',
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* ── Header ── */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div
          className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isOpen ? level.accent + '30' : 'rgba(255,255,255,0.15)',
            border: `1.5px solid ${isOpen ? level.accent + '60' : 'rgba(255,255,255,0.25)'}`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={isOpen ? level.accent : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={isOpen ? level.accent : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-extrabold text-[17px] leading-tight">{level.code}</span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: level.badge, color: level.accent, border: `1px solid ${level.accent}44` }}
            >
              {level.name}
            </span>
          </div>
          <span className="text-white/50 text-xs font-medium mt-0.5 block">
            {FREE_UNITS} ta bepul · {totalUnits - FREE_UNITS} ta pullik
          </span>
        </div>

        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
            opacity: 0.7,
          }}
        >
          <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* ── Body ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.32s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-5 pb-4 flex flex-col gap-2.5 pt-1">
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 4 }} />

            {units.map((num) => {
              const locked = num > FREE_UNITS
              return locked ? (
                /* ── Locked unit ── */
                <button
                  key={num}
                  onClick={() => onLockedUnitClick(level.code, num)}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left focus:outline-none transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1.5px solid rgba(255,255,255,0.09)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(251,191,36,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(251,191,36,0.28)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                  }}
                >
                  {/* Lock icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="11" width="14" height="10" rx="2" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 11V7a4 4 0 018 0v4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex-1">
                    <span className="text-white/35 font-bold text-sm">Unit {num}</span>
                    <span className="block text-white/25 text-[11px] font-medium mt-0.5">
                      {level.code} — {level.name}
                    </span>
                  </div>

                  {/* Pullik badge */}
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
                  >
                    Pullik
                  </span>
                </button>
              ) : (
                /* ── Free unit ── */
                <button
                  key={num}
                  onClick={() => onFreeUnitClick(level.code, num)}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] focus:outline-none group"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1.5px solid rgba(255,255,255,0.16)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
                    e.currentTarget.style.borderColor = level.accent + '66'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.10)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: level.badge, border: `1px solid ${level.accent}44` }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M12 20h9" stroke={level.accent} strokeWidth="2" strokeLinecap="round"/>
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke={level.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex-1">
                    <span className="text-white font-bold text-sm">Unit {num}</span>
                    <span className="block text-white/45 text-[11px] font-medium mt-0.5">
                      {level.code} — {level.name}
                    </span>
                  </div>

                  <svg
                    className="flex-shrink-0 opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all duration-200"
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
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

/* ── Page ── */
export default function TopicGrammarPage({ dark, setDark, onBack, onLogout, onNavigate }) {
  const [openLevel,   setOpenLevel]   = useState(null)
  const [paywallInfo, setPaywallInfo] = useState(null) // { levelCode, unitNum } | null

  const toggle = (code) => setOpenLevel((prev) => (prev === code ? null : code))

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-500 dark:from-gray-950 dark:via-red-950 dark:to-gray-900 flex flex-col relative overflow-hidden">

      <Navbar dark={dark} setDark={setDark} onLogout={onLogout} />

      {/* Aurora */}
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        {/* Page header */}
        <div className="px-5 pt-20 pb-4 mx-auto w-full max-w-2xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 active:scale-[0.97]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Orqaga</span>
          </button>

          <div className="fu-1">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-white font-extrabold text-xl sm:text-2xl leading-tight">
              Mavzulashtirilgan grammatika testi
            </h1>
            <p className="text-white/60 text-sm mt-1 fu-2">
              Darajani va unitni tanlab test ishlang
            </p>
          </div>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-3 px-5 mt-1 mx-auto w-full max-w-2xl">
          {LEVELS.map((level, idx) => (
            <LevelAccordion
              key={level.code}
              level={level}
              idx={idx}
              isOpen={openLevel === level.code}
              onToggle={() => toggle(level.code)}
              onFreeUnitClick={(code, num) => onNavigate?.('unit-test', { level: code.toLowerCase(), unit: num })}
              onLockedUnitClick={(code, num) => setPaywallInfo({ levelCode: code, unitNum: num })}
            />
          ))}
        </div>

        <div className="mt-6">
          <Footer />
        </div>
      </div>

      {/* Paywall modal */}
      {paywallInfo && (
        <PaywallModal
          levelCode={paywallInfo.levelCode}
          unitNum={paywallInfo.unitNum}
          onClose={() => setPaywallInfo(null)}
        />
      )}
    </div>
  )
}
