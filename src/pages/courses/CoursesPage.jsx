import { useNavigate } from 'react-router-dom'
import Navbar from '../../Navbar'
import Footer from '../../components/Footer'
import BackButton from '../../components/BackButton'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

function EnglishFromZeroIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="16" fill="rgba(255,255,255,0.2)"/>
      <path d="M14 16h24v4H14z" fill="white" opacity="0.9"/>
      <path d="M14 22h18v3H14z" fill="white" opacity="0.7"/>
      <path d="M14 28h20v3H14z" fill="white" opacity="0.7"/>
      <path d="M14 34h14v3H14z" fill="white" opacity="0.5"/>
      <circle cx="38" cy="35" r="7" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.5"/>
      <path d="M35 35l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IELTSIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="16" fill="rgba(255,255,255,0.2)"/>
      <circle cx="26" cy="22" r="10" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M20 22l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 36h20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19 39h14" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M26 32v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function MultilevelIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="16" fill="rgba(255,255,255,0.2)"/>
      <rect x="13" y="34" width="8" height="6" rx="2" fill="white" opacity="0.6"/>
      <rect x="22" y="28" width="8" height="12" rx="2" fill="white" opacity="0.75"/>
      <rect x="31" y="20" width="8" height="20" rx="2" fill="white" opacity="0.95"/>
      <path d="M17 30l9-7 9-6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
    </svg>
  )
}

const COURSE_KEYS = [
  {
    key: 'zero',
    path: '/english-from-zero',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)',
    shadow: 'rgba(185,28,28,0.4)',
    badge: 'A1 → B2',
    badgeBg: 'rgba(255,255,255,0.22)',
    icon: <EnglishFromZeroIcon />,
  },
  {
    key: 'ielts',
    path: '/ielts',
    gradient: 'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
    shadow: 'rgba(153,27,27,0.4)',
    badge: 'Band 6–8',
    badgeBg: 'rgba(255,255,255,0.22)',
    icon: <IELTSIcon />,
  },
  {
    key: 'multi',
    path: '/multilevel',
    gradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)',
    shadow: 'rgba(127,29,29,0.4)',
    badge: 'A1 – C2',
    badgeBg: 'rgba(255,255,255,0.22)',
    icon: <MultilevelIcon />,
  },
]

function CourseCard({ course, idx, onClick }) {
  return (
    <div
      className={`course-card card-shimmer card-${idx + 1} rounded-3xl p-5 flex flex-col gap-3 cursor-pointer`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.() }}
      style={{
        background: course.gradient,
        boxShadow: `0 12px 32px ${course.shadow}`,
        minHeight: 178,
      }}
    >
      <div className="flex items-start justify-between">
        <div>{course.icon}</div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
          style={{ background: course.badgeBg }}>
          {course.badge}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-extrabold text-lg leading-tight">{course.title}</h3>
        <p className="text-white font-bold text-[13px] mt-1 leading-relaxed">{course.desc}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
          style={{ background: course.badgeBg }}>
          {course.tag}
        </span>
        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function CoursesPage({ user, lang = 'uz', setLang, dark, setDark, onLogout }) {
  const navigate = useNavigate()
  const t = (langs[lang] || langs.uz).courses

  const courses = COURSE_KEYS.map((c) => ({
    ...c,
    title: t[c.key]?.title || c.key,
    desc: t[c.key]?.desc || '',
    tag: t[c.key]?.badge || '',
  }))

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: dark ? '#111827' : 'white' }}
    >
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
        <div className="px-5 pt-20 pb-2 mx-auto w-full max-w-[520px]">
          <BackButton className="mb-3" lang={lang} />
          <h2 className="font-extrabold text-xl sm:text-2xl" style={{ color: '#dc2626' }}>{t.title}</h2>
          <p className="text-sm mt-1" style={{ color: dark ? '#9ca3af' : '#6b7280' }}>{t.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3 mt-2 mx-auto w-[96%] sm:w-auto sm:max-w-[560px]">
          {courses.map((course, idx) => (
            <CourseCard
              key={course.key}
              course={course}
              idx={idx}
              onClick={() => navigate(course.path)}
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
