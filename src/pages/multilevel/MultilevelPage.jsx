import { useNavigate } from 'react-router-dom'
import Navbar from '../../Navbar'
import Footer from '../../components/Footer'

const LEVELS = [
  { code: 'A1', label: 'Beginner',           desc: "Mutlaqo noldan boshlash",              color: '#34d399', bg: 'rgba(52,211,153,0.15)',  border: 'rgba(52,211,153,0.3)'  },
  { code: 'A2', label: 'Elementary',         desc: "Asosiy kundalik so'zlashuv",            color: '#67e8f9', bg: 'rgba(103,232,249,0.15)', border: 'rgba(103,232,249,0.3)' },
  { code: 'B1', label: 'Intermediate',       desc: "Erkin so'zlasha boshlash",              color: '#c084fc', bg: 'rgba(192,132,252,0.15)', border: 'rgba(192,132,252,0.3)' },
  { code: 'B2', label: 'Upper Intermediate', desc: "Murakkab mavzular, IELTS 5.5–6.5",     color: '#60a5fa', bg: 'rgba(96,165,250,0.15)',  border: 'rgba(96,165,250,0.3)'  },
  { code: 'C1', label: 'Advanced',           desc: "Professional va akademik daraja",       color: '#fbbf24', bg: 'rgba(251,191,36,0.15)',  border: 'rgba(251,191,36,0.3)'  },
  { code: 'C2', label: 'Proficient',         desc: "Ona tili darajasiga yaqin",             color: '#fb7185', bg: 'rgba(251,113,133,0.15)', border: 'rgba(251,113,133,0.3)' },
]

export default function MultilevelPage({ lang, setLang, dark, setDark, onLogout }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 dark:from-gray-950 dark:via-purple-950 dark:to-gray-900 flex flex-col relative overflow-hidden">
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
            onClick={() => navigate('/courses')}
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
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-white font-extrabold text-xl sm:text-2xl leading-tight">Multilevel</h1>
              <p className="text-white/60 text-sm mt-0.5">O'z darajangizni tanlang</p>
            </div>
          </div>
        </div>

        {/* Level cards */}
        <div className="flex flex-col gap-2.5 mx-auto w-[92%] sm:w-auto sm:max-w-[520px]">
          {LEVELS.map((level, idx) => (
            <div
              key={level.code}
              className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.988]"
              style={{
                background: level.bg,
                border: `1.5px solid ${level.border}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="w-13 h-13 w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                style={{ background: `${level.color}22`, border: `1.5px solid ${level.color}44` }}>
                <span className="font-extrabold text-[16px] leading-none" style={{ color: level.color }}>{level.code}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-[14px] leading-tight">{level.label}</h3>
                <p className="text-white/55 text-[12px] font-medium mt-0.5">{level.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${level.color}22`, color: level.color }}>
                  Tez orada
                </span>
              </div>
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
