import Navbar from '../Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const langs = { en, uz, ru }

const LEVEL_CODES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const LEVEL_NAMES = { A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficient' }
const LEVEL_STYLES = [
  { code: 'A1', gradient: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)', shadow: 'rgba(185,28,28,0.4)', badgeBg: 'rgba(255,255,255,0.22)' },
  { code: 'A2', gradient: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)', shadow: 'rgba(153,27,27,0.4)', badgeBg: 'rgba(255,255,255,0.22)' },
  { code: 'B1', gradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)', shadow: 'rgba(127,29,29,0.4)', badgeBg: 'rgba(255,255,255,0.22)' },
  { code: 'B2', gradient: 'linear-gradient(135deg, #9f1239 0%, #f43f5e 100%)', shadow: 'rgba(159,18,57,0.4)', badgeBg: 'rgba(255,255,255,0.22)' },
  { code: 'C1', gradient: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)', shadow: 'rgba(220,38,38,0.4)', badgeBg: 'rgba(255,255,255,0.22)' },
  { code: 'C2', gradient: 'linear-gradient(135deg, #881337 0%, #fb7185 100%)', shadow: 'rgba(136,19,55,0.4)', badgeBg: 'rgba(255,255,255,0.22)' },
]

function LevelCard({ style, name, desc, idx }) {
  return (
    <div
      className={`lcard-${idx + 1} rounded-3xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:scale-[1.012] active:scale-[0.988]`}
      style={{ background: style.gradient, boxShadow: `0 10px 28px ${style.shadow}` }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.22)', border: '1.5px solid rgba(255,255,255,0.35)' }}
      >
        <span className="text-white font-extrabold text-xl leading-none">{style.code}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-white font-extrabold text-[15px] leading-tight">{name}</h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: style.badgeBg }}>
            {style.code}
          </span>
        </div>
        <p className="text-white/75 font-semibold text-[12px] leading-snug">{desc}</p>
      </div>

      <svg className="flex-shrink-0 opacity-60" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function GrammarLevelsPage({ dark, setDark, onBack, onLogout, lang = 'uz', setLang }) {
  const t = (langs[lang] || langs.uz)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: dark ? '#111827' : 'white' }}>

      <Navbar dark={dark} setDark={setDark} onLogout={onLogout} lang={lang} setLang={setLang} />

      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <div className="px-5 pt-20 pb-3 mx-auto w-full max-w-2xl">
          <BackButton onClick={onBack} className="mb-4" lang={lang} />

          <div className="fu-1">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
              style={{ background: 'rgba(220,38,38,0.1)', border: '1.5px solid rgba(220,38,38,0.25)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 7h6M9 11h4" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="font-extrabold text-xl sm:text-2xl leading-tight" style={{ color: '#dc2626' }}>
              {t.englishFromZero.sections.grammar.title}
            </h1>
            <p className="text-sm mt-1 fu-2" style={{ color: dark ? '#9ca3af' : '#6b7280' }}>
              {t.grammar.subtitle2}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5 mt-3 max-w-2xl mx-auto w-full">
          {LEVEL_CODES.map((code, idx) => (
            <LevelCard
              key={code}
              style={LEVEL_STYLES[idx]}
              name={LEVEL_NAMES[code]}
              desc={t.grammar.levelDescs[code]}
              idx={idx}
            />
          ))}
        </div>

        <div className="mt-6">
          <Footer dark={dark} lang={lang} />
        </div>
      </div>
    </div>
  )
}
