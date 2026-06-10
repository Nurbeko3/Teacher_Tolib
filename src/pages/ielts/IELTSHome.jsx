import { useNavigate } from 'react-router-dom'

const CARDS = [
  {
    path: '/ielts/listening',
    label: 'Listening',
    desc: 'Tinglash va audio materiallar',
    color: '#2563eb',
    bg: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    shadow: 'rgba(37,99,235,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 18v-6a9 9 0 0118 0v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    path: '/ielts/reading',
    label: 'Reading',
    desc: "Matn o'qish va tushunish",
    color: '#7c3aed',
    bg: 'linear-gradient(135deg, #5b21b6 0%, #8b5cf6 100%)',
    shadow: 'rgba(124,58,237,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    path: '/ielts/writing',
    label: 'Writing',
    desc: 'Yozma nutq va insho',
    color: '#059669',
    bg: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
    shadow: 'rgba(5,150,105,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    path: '/ielts/speaking',
    label: 'Speaking',
    desc: "Og'zaki nutq va suhbat",
    color: '#dc2626',
    bg: 'linear-gradient(135deg, #991b1b 0%, #ef4444 100%)',
    shadow: 'rgba(220,38,38,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19v4M8 23h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function IELTSHome() {
  const navigate = useNavigate()

  return (
    <div className="px-5 pt-8 pb-6 max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="text-white font-extrabold text-2xl sm:text-3xl leading-tight">IELTS tayyorgarlik</h1>
        <p className="text-white/60 text-sm mt-1">Quyidagi bo'limlardan birini tanlang</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CARDS.map((card) => (
          <button
            key={card.path}
            onClick={() => navigate(card.path)}
            className="flex items-center gap-4 p-5 rounded-2xl text-left focus:outline-none active:scale-[0.97] transition-transform duration-150"
            style={{ background: card.bg, boxShadow: `0 10px 28px ${card.shadow}` }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)' }}>
              {card.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-white font-extrabold text-[17px] leading-tight">{card.label}</span>
              <span className="block text-white/70 text-[12.5px] mt-0.5">{card.desc}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-60">
              <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
