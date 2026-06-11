import { useNavigate } from 'react-router-dom'
import Navbar from '../../Navbar'
import Footer from '../../components/Footer'

const SECTIONS = [
  {
    id: 'grammar-levels',
    path: '/english-from-zero/grammar-levels',
    title: 'Grammatika A1 dan C2 gacha',
    desc: "Boshlang'ichdan yuqori darajagacha",
    gradient: 'linear-gradient(135deg, #166534 0%, #22c55e 100%)',
    shadow: 'rgba(22,101,52,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 7h6M9 11h4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'topic-grammar',
    path: '/english-from-zero/topic-grammar',
    title: "Mavzulashtirilgan grammatika testi",
    desc: "Mavzu bo'yicha bilimingizni sinab ko'ring",
    gradient: 'linear-gradient(135deg, #065f46 0%, #34d399 100%)',
    shadow: 'rgba(6,95,70,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'vocab-test',
    path: '/english-from-zero/vocab-test',
    title: "Lug'at testi",
    desc: "So'z boyligingizni oshiring",
    gradient: 'linear-gradient(135deg, #14532d 0%, #4ade80 100%)',
    shadow: 'rgba(20,83,45,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'level-test',
    path: '/english-from-zero/level-test',
    title: 'Daraja testi',
    desc: "O'z darajangizni aniqlang",
    gradient: 'linear-gradient(135deg, #15803d 0%, #86efac 100%)',
    shadow: 'rgba(21,128,61,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="2" fill="white"/>
      </svg>
    ),
  },
]

export default function EnglishFromZeroPage({ lang, setLang, dark, setDark, onLogout }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-500 dark:from-gray-950 dark:via-green-950 dark:to-gray-900 flex flex-col relative overflow-hidden">
      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} onLogout={onLogout} />

      {/* Aurora */}
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="px-5 pt-20 pb-4 mx-auto w-full max-w-[520px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 active:scale-[0.97]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Orqaga</span>
          </button>

          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-white font-extrabold text-xl sm:text-2xl leading-tight">Ingliz tili 0 dan</h1>
              <p className="text-white/60 text-sm mt-0.5">Bo'limni tanlang va boshlang</p>
            </div>
          </div>
        </div>

        {/* Section cards */}
        <div className="flex flex-col gap-3 mx-auto w-[92%] sm:w-auto sm:max-w-[520px]">
          {SECTIONS.map((section, idx) => (
            <div
              key={section.id}
              onClick={() => navigate(section.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(section.path) }}
              className={`efz-card-${idx + 1} rounded-3xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.012] active:scale-[0.988]`}
              style={{ background: section.gradient, boxShadow: `0 10px 28px ${section.shadow}` }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)' }}>
                {section.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-extrabold text-[15px] leading-tight">{section.title}</h3>
                <p className="text-white/70 text-[12.5px] font-medium mt-0.5">{section.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-60">
                <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  )
}
