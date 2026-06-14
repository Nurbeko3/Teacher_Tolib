import Navbar from '../../Navbar'
import Footer from '../../components/Footer'
import BackButton from '../../components/BackButton'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const LEVEL_STYLES = [
  { code: 'A1', label: 'Beginner',           color: '#ef4444', bg: 'rgba(239,68,68,0.08)',    border: 'rgba(239,68,68,0.22)'  },
  { code: 'A2', label: 'Elementary',         color: '#dc2626', bg: 'rgba(220,38,38,0.08)',    border: 'rgba(220,38,38,0.22)'  },
  { code: 'B1', label: 'Intermediate',       color: '#b91c1c', bg: 'rgba(185,28,28,0.08)',    border: 'rgba(185,28,28,0.22)'  },
  { code: 'B2', label: 'Upper Intermediate', color: '#991b1b', bg: 'rgba(153,27,27,0.08)',    border: 'rgba(153,27,27,0.22)'  },
  { code: 'C1', label: 'Advanced',           color: '#7f1d1d', bg: 'rgba(127,29,29,0.08)',    border: 'rgba(127,29,29,0.22)'  },
  { code: 'C2', label: 'Proficient',         color: '#f87171', bg: 'rgba(248,113,113,0.08)',  border: 'rgba(248,113,113,0.22)' },
]

export default function MultilevelPage({ lang = 'uz', setLang, dark, setDark, onLogout }) {
  const t = (langs[lang] || langs.uz).multilevel
  const subText = dark ? '#9ca3af' : '#6b7280'

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: dark ? '#111827' : 'white' }}>
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
          <BackButton className="mb-4" lang={lang} />

          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(220,38,38,0.1)', border: '1.5px solid rgba(220,38,38,0.25)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="font-extrabold text-xl sm:text-2xl leading-tight" style={{ color: '#dc2626' }}>{t.title}</h1>
              <p className="text-sm mt-0.5" style={{ color: subText }}>{t.subtitle2}</p>
            </div>
          </div>
        </div>

        {/* Level cards */}
        <div className="flex flex-col gap-2.5 mx-auto w-[92%] sm:w-auto sm:max-w-[520px]">
          {LEVEL_STYLES.map((level) => (
            <div
              key={level.code}
              className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.988]"
              style={{ background: dark ? 'rgba(31,41,55,0.8)' : level.bg, border: `1.5px solid ${dark ? 'rgba(55,65,81,0.6)' : level.border}` }}
            >
              <div className="w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                style={{ background: `${level.color}18`, border: `1.5px solid ${level.color}35` }}>
                <span className="font-extrabold text-[16px] leading-none" style={{ color: level.color }}>{level.code}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[14px] leading-tight" style={{ color: dark ? '#f9fafb' : level.color }}>{level.label}</h3>
                <p className="text-[12px] font-medium mt-0.5" style={{ color: subText }}>
                  {t.levelDescs?.[level.code]}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${level.color}18`, color: level.color }}>
                  {t.comingSoon}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Footer dark={dark} lang={lang} />
        </div>
      </div>
    </div>
  )
}
