import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './shared'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'
import { api } from '../../api'

const langs = { en, uz, ru }

const FALLBACK_RESULTS = [
  { id: 1,  name: 'Jasur T.',    overall: 7.5, L: 8.0, R: 7.5, W: 7.0, S: 7.5, module: 'Academic', date: 'Nov 2024', img: null },
  { id: 2,  name: 'Zulfiya K.', overall: 8.0, L: 8.5, R: 8.0, W: 7.5, S: 8.0, module: 'Academic', date: 'Nov 2024', img: null },
  { id: 3,  name: 'Nilufar X.', overall: 7.0, L: 7.5, R: 7.0, W: 6.5, S: 7.0, module: 'General',  date: 'Oct 2024', img: null },
  { id: 4,  name: 'Alisher N.', overall: 8.5, L: 9.0, R: 8.5, W: 8.0, S: 8.5, module: 'Academic', date: 'Oct 2024', img: null },
  { id: 5,  name: 'Bobur A.',   overall: 6.5, L: 7.0, R: 6.5, W: 6.0, S: 6.5, module: 'Academic', date: 'Sep 2024', img: null },
  { id: 6,  name: 'Dilnoza R.', overall: 7.5, L: 8.0, R: 7.5, W: 7.0, S: 7.5, module: 'Academic', date: 'Sep 2024', img: null },
]

function mapResult(r) {
  return {
    id:     r.id,
    name:   r.name,
    overall: parseFloat(r.overall) || 0,
    L:      parseFloat(r.listening) || 0,
    R:      parseFloat(r.reading)   || 0,
    W:      parseFloat(r.writing)   || 0,
    S:      parseFloat(r.speaking)  || 0,
    module: r.module || 'Academic',
    date:   r.date   || '',
    img:    r.image  || null,
  }
}

/* band ≥ 8 → gold accent, ≥ 7 → red, else gray */
function bandAccent(score) {
  if (score >= 8)   return { color: '#b45309', bg: 'rgba(180,83,9,0.08)',  border: 'rgba(180,83,9,0.22)' }
  if (score >= 7)   return { color: '#FF0000', bg: 'rgba(255,0,0,0.07)',   border: 'rgba(255,0,0,0.22)'  }
  return              { color: '#6b7280', bg: 'rgba(107,114,128,0.07)', border: 'rgba(107,114,128,0.22)' }
}

/* ── Single IELTS result card ── */
function ResultCard({ result }) {
  const acc = bandAccent(result.overall)

  return (
    <div
      className="flex-shrink-0 mx-3 cursor-default select-none"
      style={{ width: 284 }}
    >
      <div
        className="rounded-[20px] overflow-hidden"
        style={{
          background: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.07)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.13), 0 0 0 2px ${acc.border}`
          e.currentTarget.style.transform  = 'translateY(-4px) scale(1.015)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)'
          e.currentTarget.style.transform  = 'none'
        }}
      >
        {/* ── IMAGE SLOT — always at the top ── */}
        <div className="w-full relative overflow-hidden" style={{ height: 158 }}>
          {result.img ? (
            <img
              src={result.img}
              alt={`${result.name} IELTS result`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2.5"
              style={{
                background: 'linear-gradient(145deg, #f3f3f3 0%, #ebebeb 100%)',
                borderBottom: '1.5px dashed rgba(0,0,0,0.11)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.07)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
                    stroke="rgba(0,0,0,0.25)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <circle cx="12" cy="13" r="4" stroke="rgba(0,0,0,0.25)" strokeWidth="1.6"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-bold" style={{ color: 'rgba(0,0,0,0.28)' }}>
                  IELTS Result
                </p>
                <p className="text-[9.5px] mt-0.5" style={{ color: 'rgba(0,0,0,0.18)' }}>
                  Screenshot here
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── IELTS header bar ── */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ background: '#111111' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: '#FF0000' }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-black text-[13px] tracking-[0.22em]" style={{ color: 'white' }}>
              IELTS
            </span>
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {result.module}
          </span>
        </div>

        {/* ── Score body ── */}
        <div className="px-5 py-3.5">
          {/* Band row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p
                className="text-[9px] font-bold uppercase tracking-[0.18em] mb-0.5"
                style={{ color: '#9ca3af' }}
              >
                Overall Band Score
              </p>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-black leading-none"
                  style={{ fontSize: 42, color: '#111111' }}
                >
                  {result.overall}
                </span>
                <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>/ 9.0</span>
              </div>
            </div>

            <div
              className="w-[50px] h-[50px] rounded-xl flex flex-col items-center justify-center flex-shrink-0"
              style={{ background: acc.bg, border: `1.5px solid ${acc.border}` }}
            >
              <span className="font-black text-[10px] leading-none" style={{ color: acc.color }}>Band</span>
              <span className="font-black text-[17px] leading-tight" style={{ color: acc.color }}>
                {result.overall}
              </span>
            </div>
          </div>

          {/* Sub-scores */}
          <div
            className="grid grid-cols-4 gap-1 rounded-xl px-2 py-2 mb-3"
            style={{ background: '#f7f7f7' }}
          >
            {[
              { label: 'L', val: result.L },
              { label: 'R', val: result.R },
              { label: 'W', val: result.W },
              { label: 'S', val: result.S },
            ].map(({ label, val }) => (
              <div key={label} className="text-center">
                <p className="text-[9px] font-black uppercase tracking-wider mb-0.5" style={{ color: '#9ca3af' }}>
                  {label}
                </p>
                <p className="font-black text-[12px]" style={{ color: '#111111' }}>
                  {val}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: acc.bg, border: `1px solid ${acc.border}` }}
              >
                <span className="font-black text-[10px]" style={{ color: acc.color }}>
                  {result.name[0]}
                </span>
              </div>
              <div>
                <p className="font-bold text-[11px]" style={{ color: '#111111' }}>{result.name}</p>
                <p className="text-[10px]" style={{ color: '#9ca3af' }}>{result.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke={acc.color} strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 4L12 14.01l-3-3" stroke={acc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[9.5px] font-bold" style={{ color: acc.color }}>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Carousel: static ≤3, auto-scroll >3, always draggable ── */
function Carousel({ results }) {
  const isAuto   = results.length > 3
  const trackRef = useRef(null)
  const rafRef   = useRef(null)
  const drag     = useRef({ active: false, startX: 0, scrollLeft: 0 })

  /* auto-scroll via rAF */
  useEffect(() => {
    if (!isAuto) return
    const el = trackRef.current
    if (!el) return
    const tick = () => {
      if (!drag.current.active) {
        el.scrollLeft += 0.6
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isAuto, results])

  /* mouse drag */
  const onMouseDown = (e) => {
    drag.current = { active: true, startX: e.pageX, scrollLeft: trackRef.current.scrollLeft }
    trackRef.current.style.cursor = 'grabbing'
  }
  const onMouseUp = () => {
    drag.current.active = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }
  const onMouseMove = (e) => {
    if (!drag.current.active) return
    e.preventDefault()
    const dx = e.pageX - drag.current.startX
    trackRef.current.scrollLeft = drag.current.scrollLeft - dx
    /* keep infinite loop aligned */
    const el = trackRef.current
    if (isAuto) {
      if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
    }
  }

  /* touch drag */
  const onTouchStart = (e) => {
    drag.current = { active: true, startX: e.touches[0].pageX, scrollLeft: trackRef.current.scrollLeft }
  }
  const onTouchMove = (e) => {
    if (!drag.current.active) return
    const dx = drag.current.startX - e.touches[0].pageX
    trackRef.current.scrollLeft = drag.current.scrollLeft + dx
    const el = trackRef.current
    if (isAuto) {
      if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
    }
  }
  const onTouchEnd = () => { drag.current.active = false }

  /* ≤ 3 — static centered grid */
  if (!isAuto) {
    return (
      <div
        ref={trackRef}
        className="flex justify-center gap-6 px-6 flex-wrap py-4"
        style={{ cursor: 'default' }}
      >
        {results.map(r => <ResultCard key={r.id} result={r} />)}
      </div>
    )
  }

  /* > 3 — infinite auto-scroll + drag */
  const doubled = [...results, ...results]
  return (
    <div
      ref={trackRef}
      className="results-carousel flex overflow-x-scroll py-4"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        cursor: 'grab',
        userSelect: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {doubled.map((r, i) => (
        <ResultCard key={`${r.id}-${i}`} result={r} />
      ))}
    </div>
  )
}

/* ── Section ── */
export default function IeltsResultsSection({ lang = 'en' }) {
  const t = (langs[lang] || langs.en).landing.ieltsResults
  const [results, setResults] = useState(FALLBACK_RESULTS)

  useEffect(() => {
    api.getResults()
      .then(data => {
        if (data && data.length > 0) setResults(data.map(mapResult))
      })
      .catch(() => {})
  }, [])

  return (
    <section
      id="results"
      className="relative overflow-hidden scroll-mt-20"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 40%, #f8f8f8 40%)',
      }}
    >
      {/* ── Top transition from black to light ── */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div
        className="relative z-10"
        style={{ background: '#f8f8f8', borderRadius: '32px 32px 0 0', overflow: 'hidden' }}
      >
        {/* Top neon separator */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '50%', height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.5) 50%, transparent 100%)',
          }}
        />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.018] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#000 1.2px, transparent 1.2px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 pt-16 pb-4">
          {/* Section header */}
          <Reveal className="text-center px-5 mb-12">
            <span
              className="inline-block text-[11px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-4"
              style={{
                color: '#FF0000',
                background: 'rgba(255,0,0,0.07)',
                border: '1px solid rgba(255,0,0,0.18)',
              }}
            >
              {t.label}
            </span>
            <h2
              className="font-black text-gray-900 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)' }}
            >
              {t.title}
            </h2>
            <p className="mt-3 text-gray-500 text-[15px] max-w-md mx-auto">
              {t.subtitle}
            </p>
          </Reveal>

          {/* ── Carousel ── */}
          <div className="relative">
            {/* Left fade edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, #f8f8f8 0%, transparent 100%)' }}
            />
            {/* Right fade edge */}
            <div
              className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(270deg, #f8f8f8 0%, transparent 100%)' }}
            />

            <Carousel results={results} />
          </div>

          {/* ── Stats strip ── */}
          <Reveal className="mt-10 mb-16 px-5">
            <div className="mx-auto max-w-2xl">
              <div
                className="grid grid-cols-3 rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                }}
              >
                {[
                  { v: '90+',   l: t.stat1 },
                  { v: '6.8',   l: t.stat2 },
                  { v: '100%',  l: t.stat3 },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="py-6 text-center relative"
                    style={{
                      background: 'white',
                      borderRight: i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                    }}
                  >
                    <span
                      className="block font-black text-[26px] leading-none"
                      style={{ color: '#FF0000' }}
                    >
                      {s.v}
                    </span>
                    <span className="block text-[11px] font-semibold text-gray-400 mt-1.5 leading-tight px-2">
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
