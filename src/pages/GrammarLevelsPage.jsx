import { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../components/Footer'

const LEVELS = [
  {
    code: 'A1',
    name: 'Beginner',
    desc: "Ingliz tilini mutlaqo noldan boshlaydiganlar uchun. Alifbo, salomlashish, oddiy jumlalar.",
    gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    shadow: 'rgba(5,150,105,0.4)',
    badge: 'A1',
    badgeBg: 'rgba(255,255,255,0.22)',
  },
  {
    code: 'A2',
    name: 'Elementary',
    desc: "Oddiy kundalik mavzular: oila, ish, uy. Asosiy grammatika va so'zlashuvlar.",
    gradient: 'linear-gradient(135deg, #0891b2 0%, #67e8f9 100%)',
    shadow: 'rgba(8,145,178,0.4)',
    badge: 'A2',
    badgeBg: 'rgba(255,255,255,0.22)',
  },
  {
    code: 'B1',
    name: 'Intermediate',
    desc: "O'rta daraja. Sayohat, ish, ta'lim mavzulari. Erkin so'zlasha boshlash.",
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
    shadow: 'rgba(124,58,237,0.4)',
    badge: 'B1',
    badgeBg: 'rgba(255,255,255,0.22)',
  },
  {
    code: 'B2',
    name: 'Upper Intermediate',
    desc: "Murakkab mavzular: ijtimoiy, madaniy, kasbiy. IELTS 5.5–6.5 darajasi.",
    gradient: 'linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)',
    shadow: 'rgba(29,78,216,0.4)',
    badge: 'B2',
    badgeBg: 'rgba(255,255,255,0.22)',
  },
  {
    code: 'C1',
    name: 'Advanced',
    desc: "Ilmiy va professional daraja. Murakkab matnlar, akademik yozuv va nutq.",
    gradient: 'linear-gradient(135deg, #b45309 0%, #fbbf24 100%)',
    shadow: 'rgba(180,83,9,0.4)',
    badge: 'C1',
    badgeBg: 'rgba(255,255,255,0.22)',
  },
  {
    code: 'C2',
    name: 'Proficient',
    desc: "Ona tili darajasiga yaqin. Har qanday mavzuda erkin va aniq muloqot.",
    gradient: 'linear-gradient(135deg, #9f1239 0%, #fb7185 100%)',
    shadow: 'rgba(159,18,57,0.4)',
    badge: 'C2',
    badgeBg: 'rgba(255,255,255,0.22)',
  },
]

function LevelCard({ level, idx }) {
  return (
    <div
      className={`lcard-${idx + 1} rounded-3xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:scale-[1.012] active:scale-[0.988]`}
      style={{
        background: level.gradient,
        boxShadow: `0 10px 28px ${level.shadow}`,
      }}
    >
      {/* Level badge circle */}
      <div
        className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.35)' }}
      >
        <span className="text-white font-extrabold text-xl leading-none">{level.code}</span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-white font-extrabold text-[15px] leading-tight">{level.name}</h3>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: level.badgeBg }}
          >
            {level.badge}
          </span>
        </div>
        <p className="text-white/75 font-semibold text-[12px] leading-snug">{level.desc}</p>
      </div>

      {/* Arrow */}
      <svg className="flex-shrink-0 opacity-60" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function GrammarLevelsPage({ dark, setDark, onBack, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-500 dark:from-gray-950 dark:via-red-950 dark:to-gray-900 flex flex-col relative overflow-hidden">

      <Navbar dark={dark} setDark={setDark} onLogout={onLogout} />

      {/* Aurora background */}
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        {/* Page header */}
        <div className="px-5 pt-20 pb-3 mx-auto w-full max-w-2xl">
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
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 7h6M9 11h4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-white font-extrabold text-xl sm:text-2xl leading-tight">
              Grammatika A1 dan C2 gacha
            </h1>
            <p className="text-white/60 text-sm mt-1 fu-2">
              O'z darajangizni tanlang va boshlang
            </p>
          </div>
        </div>

        {/* Level cards */}
        <div className="flex flex-col gap-3 px-5 mt-3 max-w-2xl mx-auto w-full">
          {LEVELS.map((level, idx) => (
            <LevelCard key={level.code} level={level} idx={idx} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  )
}
