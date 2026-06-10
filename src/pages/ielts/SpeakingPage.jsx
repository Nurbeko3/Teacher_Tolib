import { useNavigate } from 'react-router-dom'

const ITEMS = [
  {
    id: 'practice',
    path: '/ielts/speaking/practice',
    label: 'Practice',
    desc: 'Part 1, Part 2, Part 3 bo\'yicha mashq',
    hasArrow: false,
    isCta: true,
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19v4M8 23h8" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'video-lessons',
    path: '/ielts/speaking/video-lessons',
    label: 'Video Lessons',
    desc: "Video darslar orqali o'rganing",
    isCta: false,
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/>
        <polygon points="10,8 16,12 10,16" fill={c}/>
      </svg>
    ),
  },
]

const accentColor = '#dc2626'
const panelBg = '#fff1f2'
const borderColor = '#fecdd3'
const hoverBg = '#ffe4e6'

export default function SpeakingPage() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-6 pb-6 max-w-xl mx-auto">
      <button
        onClick={() => navigate('/ielts')}
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
          style={{ background: accentColor, boxShadow: `0 4px 16px ${accentColor}66` }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19v4M8 23h8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-white font-extrabold text-xl leading-tight">Speaking</h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: `${accentColor}cc` }}>Gapirish ko'nikmasi</p>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: panelBg, border: `1.5px solid ${borderColor}` }}>
        {ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3.5 px-4 py-4 text-left focus:outline-none active:scale-[0.98] transition-all duration-150 group"
            style={{ borderBottom: idx < ITEMS.length - 1 ? `1px solid ${borderColor}` : 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}>
              {item.icon(accentColor)}
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[14px] font-bold leading-tight" style={{ color: '#0f172a' }}>{item.label}</span>
              <span className="block text-[11.5px] font-medium mt-0.5" style={{ color: '#94a3b8' }}>{item.desc}</span>
            </div>
            {item.isCta ? (
              <div className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill={accentColor}>
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span className="text-[10px] font-bold" style={{ color: accentColor }}>Start</span>
              </div>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                className="flex-shrink-0 opacity-25 group-hover:opacity-60 transition-opacity">
                <path d="M9 18l6-6-6-6" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
