import { useNavigate } from 'react-router-dom'

export default function IELTSSectionPage({ title, subtitle, accentColor, panelBg, borderColor, hoverBg, items, backPath }) {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-6 pb-6 max-w-xl mx-auto">
      {/* Header */}
      <button
        onClick={() => navigate(backPath || '/ielts')}
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
            <circle cx="12" cy="10" r="8" stroke="white" strokeWidth="2"/>
            <path d="M8 10l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-white font-extrabold text-xl leading-tight">{title}</h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: `${accentColor}cc` }}>{subtitle}</p>
        </div>
      </div>

      {/* Items */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: panelBg, border: `1.5px solid ${borderColor}` }}
      >
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center gap-3.5 px-4 py-4 text-left focus:outline-none active:scale-[0.98] transition-all duration-150 group"
            style={{
              borderBottom: idx < items.length - 1 ? `1px solid ${borderColor}` : 'none',
            }}
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              className="flex-shrink-0 opacity-25 group-hover:opacity-60 transition-opacity">
              <path d="M9 18l6-6-6-6" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
