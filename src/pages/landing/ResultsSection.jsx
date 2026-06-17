import { Reveal, AnimatedCounter } from './shared'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

export default function ResultsSection({ lang }) {
  const t = (langs[lang] || langs.uz).landing.results

  const CARDS = [
    {
      kind: 'counter', value: 1200, suffix: '+', label: t.students,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      kind: 'counter', value: 90, suffix: '+', label: t.highResults,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      kind: 'badge', label: t.ieltsStories,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="10" r="8" stroke="white" strokeWidth="2"/>
          <path d="M8 10l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      kind: 'badge', label: t.cefrAchievements,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M18 20V10M12 20V4M6 20v-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="results" className="relative scroll-mt-24 px-5 sm:px-8 py-20">
      <div className="mx-auto w-full max-w-[1140px]">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#dc2626' }}>{t.label}</p>
          <h2 className="font-black text-[1.9rem] sm:text-4xl text-gray-900 leading-tight">{t.title}</h2>
          <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">{t.subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07}>
              <div
                className="h-full rounded-3xl px-5 py-8 flex flex-col items-center text-center gap-3"
                style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)', boxShadow: '0 10px 28px rgba(220,38,38,0.3)' }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  {c.icon}
                </div>
                {c.kind === 'counter' && (
                  <span className="font-black text-white text-[26px] leading-none">
                    <AnimatedCounter value={c.value} suffix={c.suffix} />
                  </span>
                )}
                <span className={`text-white font-bold leading-tight ${c.kind === 'counter' ? 'text-[12.5px] text-white/85' : 'text-[14px]'}`}>
                  {c.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
