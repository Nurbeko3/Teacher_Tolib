import { useNavigate } from 'react-router-dom'

const PARTS = [
  {
    id: 'part-1',
    path: '/ielts/speaking/practice/part-1',
    label: 'Part 1',
    desc: 'Shaxsiy mavzular haqida suhbat',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: 'part-2',
    path: '/ielts/speaking/practice/part-2',
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
    path: '/ielts/speaking/practice/part-3',
    label: 'Part 3',
    desc: 'Abstrakt mavzular muhokamasi',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function SpeakingPracticePage() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-6 pb-6 max-w-xl mx-auto">
      <button
        onClick={() => navigate('/ielts/speaking')}
        className="flex items-center gap-2 mb-5 focus:outline-none active:scale-[0.97] transition-transform"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-medium">Orqaga</span>
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', boxShadow: '0 4px 16px rgba(220,38,38,0.4)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19v4M8 23h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-white font-extrabold text-xl leading-tight">Speaking Practice</h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: '#dc2626cc' }}>Bo'limni tanlang</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {PARTS.map((part) => (
          <button
            key={part.id}
            onClick={() => navigate(part.path)}
            className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left focus:outline-none active:scale-[0.97] group"
            style={{
              background: '#fff5f5',
              border: '1.5px solid #fecdd3',
              transition: 'background 170ms, border-color 170ms, box-shadow 170ms',
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', boxShadow: '0 3px 10px rgba(220,38,38,0.35)' }}>
              {part.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[13.5px] font-bold leading-tight" style={{ color: '#0f172a' }}>{part.label}</span>
              <span className="block text-[11px] font-medium mt-0.5" style={{ color: '#94a3b8' }}>{part.desc}</span>
            </div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              className="flex-shrink-0 opacity-25 group-hover:opacity-60 transition-opacity">
              <path d="M9 18l6-6-6-6" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
