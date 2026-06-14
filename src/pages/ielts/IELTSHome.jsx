import { useNavigate, useOutletContext } from 'react-router-dom'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const CARD_KEYS = [
  {
    id: 'listening',
    path: '/ielts/listening',
    bg: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)',
    shadow: 'rgba(185,28,28,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 18v-6a9 9 0 0118 0v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'reading',
    path: '/ielts/reading',
    bg: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
    shadow: 'rgba(153,27,27,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'writing',
    path: '/ielts/writing',
    bg: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)',
    shadow: 'rgba(127,29,29,0.4)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'speaking',
    path: '/ielts/speaking',
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
  const ctx = useOutletContext() || {}
  const lang = ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  return (
    <div className="px-5 pt-8 pb-6 max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="font-extrabold text-2xl sm:text-3xl leading-tight" style={{ color: '#dc2626' }}>{t.homeTitle}</h1>
        <p className="text-sm mt-1" style={{ color: '#6b7280' }}>{t.homeSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CARD_KEYS.map((card) => {
          const section = t.sections[card.id] || {}
          return (
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
                <span className="block text-white font-extrabold text-[17px] leading-tight">{section.title || card.id}</span>
                <span className="block text-white/70 text-[12.5px] mt-0.5">{section.desc}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-60">
                <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          )
        })}
      </div>
    </div>
  )
}
