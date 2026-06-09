import Navbar from '../Navbar'
import Footer from '../components/Footer'

const TOPICS = [
  { id: 'animals',        emoji: '🐶', label: 'Animals',        accent: '#34d399', bg: 'rgba(52,211,153,0.18)'  },
  { id: 'school',         emoji: '🏫', label: 'School',         accent: '#60a5fa', bg: 'rgba(96,165,250,0.18)'  },
  { id: 'university',     emoji: '🎓', label: 'University',     accent: '#c084fc', bg: 'rgba(192,132,252,0.18)' },
  { id: 'travel',         emoji: '✈️', label: 'Travel',         accent: '#67e8f9', bg: 'rgba(103,232,249,0.18)' },
  { id: 'food',           emoji: '🍔', label: 'Food',           accent: '#fb923c', bg: 'rgba(251,146,60,0.18)'  },
  { id: 'health',         emoji: '👨‍⚕️', label: 'Health',      accent: '#4ade80', bg: 'rgba(74,222,128,0.18)'  },
  { id: 'jobs',           emoji: '💼', label: 'Jobs',           accent: '#fbbf24', bg: 'rgba(251,191,36,0.18)'  },
  { id: 'home',           emoji: '🏠', label: 'Home',           accent: '#f472b6', bg: 'rgba(244,114,182,0.18)' },
  { id: 'clothes',        emoji: '👕', label: 'Clothes',        accent: '#a78bfa', bg: 'rgba(167,139,250,0.18)' },
  { id: 'shopping',       emoji: '🛍', label: 'Shopping',       accent: '#f87171', bg: 'rgba(248,113,113,0.18)' },
  { id: 'sports',         emoji: '⚽', label: 'Sports',         accent: '#86efac', bg: 'rgba(134,239,172,0.18)' },
  { id: 'technology',     emoji: '💻', label: 'Technology',     accent: '#93c5fd', bg: 'rgba(147,197,253,0.18)' },
  { id: 'environment',    emoji: '🌍', label: 'Environment',    accent: '#6ee7b7', bg: 'rgba(110,231,183,0.18)' },
  { id: 'entertainment',  emoji: '🎬', label: 'Entertainment',  accent: '#fca5a5', bg: 'rgba(252,165,165,0.18)' },
  { id: 'transportation', emoji: '🚗', label: 'Transportation', accent: '#fde68a', bg: 'rgba(253,230,138,0.18)' },
]

function TopicCard({ topic, idx, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left focus:outline-none group transition-all duration-200 active:scale-[0.98]"
      style={{
        background: 'rgba(255,255,255,0.10)',
        border: '1.5px solid rgba(255,255,255,0.16)',
        opacity: 0,
        animation: `cardSlideUp 0.48s cubic-bezier(0.34,1.46,0.64,1) both ${0.06 + idx * 0.055}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = topic.bg
        e.currentTarget.style.borderColor = topic.accent + '55'
        e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.14)`
        e.currentTarget.style.transform = 'scale(1.02)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.10)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
        e.currentTarget.style.boxShadow = ''
        e.currentTarget.style.transform = ''
      }}
    >
      {/* Emoji icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
        style={{ background: topic.bg, border: `1px solid ${topic.accent}44` }}
      >
        {topic.emoji}
      </div>

      {/* Label */}
      <span className="flex-1 text-white font-bold text-[15px]">{topic.label}</span>

      {/* Arrow */}
      <svg
        className="flex-shrink-0 opacity-35 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all duration-200"
        width="16" height="16" viewBox="0 0 24 24" fill="none"
      >
        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

export default function VocabTestPage({ dark, setDark, onBack, onLogout, onNavigate }) {
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

          {/* Icon + title */}
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
            style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-white font-extrabold text-xl sm:text-2xl leading-tight fu-1">
            Lug'at Testi
          </h1>
          <p className="text-white/60 text-sm mt-1 fu-2">
            Lug'at mavzusini tanlang va bilimlaringizni sinab ko'ring
          </p>
        </div>

        {/* Topics section */}
        <div className="px-5 mx-auto w-full max-w-2xl">
          {/* Section label */}
          <p
            className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Mavzu tanlang
          </p>

          {/* Topic cards */}
          <div className="flex flex-col gap-2.5">
            {TOPICS.map((topic, idx) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                idx={idx}
                onClick={() => onNavigate?.('vocab-topic', { topic: topic.id, label: topic.label, emoji: topic.emoji })}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  )
}
