import { useNavigate } from 'react-router-dom'

export default function IELTSPlaceholderPage({ title, desc, accentColor = '#2563eb', icon }) {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-6 pb-6 max-w-xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 focus:outline-none active:scale-[0.97] transition-transform"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-medium">Orqaga</span>
      </button>

      <div className="flex flex-col items-center text-center gap-5 mt-10">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background: accentColor, boxShadow: `0 8px 28px ${accentColor}55` }}>
          {icon}
        </div>
        <div>
          <h1 className="text-white font-extrabold text-2xl leading-tight">{title}</h1>
          <p className="text-white/60 text-sm mt-2 leading-relaxed max-w-xs mx-auto">{desc}</p>
        </div>
        <div className="mt-4 px-6 py-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <p className="text-white/70 text-sm font-medium">Tez orada mavjud bo'ladi</p>
        </div>
      </div>
    </div>
  )
}
