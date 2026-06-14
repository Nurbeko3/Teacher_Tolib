import Navbar from '../Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const langs = { en, uz, ru }

const LEVEL_NAMES = {
  a1: 'Beginner', a2: 'Elementary', b1: 'Intermediate',
  b2: 'Upper Intermediate', c1: 'Advanced', c2: 'Proficient',
}

export default function UnitTestPage({ dark, setDark, onBack, onLogout, level, unit, lang = 'uz', setLang }) {
  const levelCode  = (level || '').toUpperCase()
  const levelName  = LEVEL_NAMES[level] || ''
  const t = (langs[lang] || langs.uz).unitTest

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
        <div className="px-5 pt-20 pb-4">
          <BackButton onClick={onBack} className="mb-8" lang={lang} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-5 -mt-16">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
            style={{ background: 'rgba(220,38,38,0.1)', border: '1.5px solid rgba(220,38,38,0.25)' }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2"/>
              <path d="M12 8v4l3 3" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div
            className="text-center px-6 py-2 rounded-2xl mb-3"
            style={{ background: '#fff1f2', border: '1px solid #fecaca' }}
          >
            <span className="text-gray-900 font-extrabold text-lg">{levelCode} — Unit {unit}</span>
            {levelName ? <span className="text-gray-400 text-sm font-medium ml-2">({levelName})</span> : null}
          </div>

          <h1 className="text-gray-900 font-extrabold text-2xl text-center mb-3">
            {t.comingSoon}
          </h1>
          <p className="text-gray-500 text-sm text-center max-w-xs leading-relaxed">
            {t.comingSoonDesc}
          </p>
        </div>

        <div className="mt-8">
          <Footer dark={dark} lang={lang} animate={false} />
        </div>
      </div>
    </div>
  )
}
