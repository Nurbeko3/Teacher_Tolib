import { useNavigate } from 'react-router-dom'
import { Reveal, StaggerGroup, StaggerItem } from './shared'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const COURSE_KEYS = [
  { key: 'free',  gradient: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)', shadow: 'rgba(16,185,129,0.35)', free: true },
  { key: 'zero',  gradient: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)', shadow: 'rgba(185,28,28,0.35)' },
  { key: 'ielts', gradient: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)', shadow: 'rgba(153,27,27,0.35)' },
  { key: 'cefr',  gradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)', shadow: 'rgba(127,29,29,0.35)' },
]

function CourseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" fill="rgba(255,255,255,0.92)"/>
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" fill="rgba(255,255,255,0.65)"/>
    </svg>
  )
}

export default function CoursesSection({ lang }) {
  const navigate = useNavigate()
  const t = (langs[lang] || langs.en).landing.courses

  return (
    <section id="courses" className="relative scroll-mt-24 px-5 sm:px-8 py-20" style={{ background: '#fff8f8' }}>
      <div className="mx-auto w-full max-w-[1140px]">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: '#dc2626' }}>{t.label}</p>
          <h2 className="font-black text-[1.9rem] sm:text-4xl text-gray-900 leading-tight">{t.title}</h2>
          <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">{t.subtitle}</p>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COURSE_KEYS.map((c) => (
            <StaggerItem key={c.key}>
              <div
                className="course-card card-shimmer h-full rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden"
                style={{ background: c.gradient, boxShadow: `0 14px 34px ${c.shadow}`, minHeight: 220 }}
              >
                {c.free && (
                  <span
                    className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.22)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
                  >
                    FREE
                  </span>
                )}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  <CourseIcon />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-extrabold text-lg leading-tight">{t.items[c.key].title}</h3>
                  <p className="text-white/85 text-[13.5px] mt-2 leading-relaxed">{t.items[c.key].desc}</p>
                </div>
                <button
                  onClick={() => navigate(c.free ? '/auth' : '/auth')}
                  className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-[13px] text-white transition-all duration-200 active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.32)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                >
                  {t.learnMore}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
