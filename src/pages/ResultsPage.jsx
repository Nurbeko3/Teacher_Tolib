import PageLayout from '../components/PageLayout'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const langs = { en, uz, ru }

/* ── Fallback static data ── */
const STUDENTS = [
  {
    name: "Ezoza Khamrakulova",
    overall: 7.0,
    listening: 7.5, reading: 7.0, writing: 6.5, speaking: 6.5,
    comment: "Ezoza completed our standard IELTS course and achieved an overall band of 7.0. She performed exceptionally well in the Listening section.",
  },
  {
    name: "Mehrinoz Davronova",
    overall: 7.0,
    listening: 8.5, reading: 6.5, writing: 6.5, speaking: 6.0,
    comment: "Mehrinoz achieved an outstanding 8.5 in the Listening section of the IELTS exam. Overall band: 7.0.",
  },
  {
    name: "Ruxshona G'afurova",
    overall: 7.0,
    listening: 8.0, reading: 7.5, writing: 7.0, speaking: 6.0,
    comment: "Ruxshona completed the course and achieved an overall IELTS band of 7.0, with strong results in Listening and Reading.",
  },
  {
    name: "Zuhra Holiqova",
    overall: 7.5,
    listening: 7.0, reading: 8.5, writing: 6.5, speaking: 7.5,
    comment: "Zuhra studied in our standard IELTS group and scored 7.5 overall. She stood out with an 8.5 in Reading.",
  },
  {
    name: "Durdona Abduganiyeva",
    overall: 8.0,
    listening: 8.5, reading: 8.0, writing: 7.5, speaking: 7.0,
    comment: "Durdona completed the IELTS course and achieved an overall band of 8.0 — a very high result across all sections.",
  },
]

const getAdminResults = () => {
  try {
    const raw = localStorage.getItem('et_admin_results')
    if (!raw) return null
    const arr = JSON.parse(raw)
    return Array.isArray(arr) && arr.length > 0 ? arr : null
  } catch { return null }
}

/* ── Normalize score to number ── */
const num = (v) => parseFloat(v) || 0

/* ── IELTS certificate visual placeholder ── */
function CertPlaceholder({ name, dark }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const bg = dark ? '#1f2937' : '#f9fafb'
  const border = dark ? 'rgba(55,65,81,0.6)' : '#e5e7eb'
  return (
    <div className="rounded-xl overflow-hidden relative" style={{ background: bg, border: `1px solid ${border}`, minHeight: 148 }}>
      <div className="flex items-center justify-between px-3 pt-2.5 pb-2" style={{ borderBottom: `1px solid ${border}` }}>
        <span className="font-black text-[13px] tracking-widest" style={{ color: '#dc2626' }}>IELTS</span>
        <div className="w-8 h-10 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: dark ? '#374151' : '#e5e7eb', border: `1px solid ${border}` }}>
          <span className="text-[9px] font-bold" style={{ color: '#9ca3af' }}>{initials}</span>
        </div>
      </div>
      <div className="px-3 py-2 flex flex-col gap-1.5">
        {[85, 65, 75, 55, 70, 60].map((w, i) => (
          <div key={i} style={{ height: 5, background: dark ? (i % 2 === 0 ? '#374151' : '#2d3748') : (i % 2 === 0 ? '#e5e7eb' : '#ececec'), borderRadius: 3, width: `${w}%` }} />
        ))}
      </div>
      <div className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ border: '2px solid rgba(220,38,38,0.5)', background: 'rgba(220,38,38,0.07)' }}>
        <span className="text-[6.5px] font-black leading-none text-center" style={{ color: '#dc2626' }}>IELTS{'\n'}TRF</span>
      </div>
    </div>
  )
}

/* ── Sub-score row ── */
function SubScore({ icon, label, value, dark }) {
  const bg = dark ? '#1f2937' : 'white'
  const border = dark ? 'rgba(55,65,81,0.6)' : '#fecaca'
  return (
    <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl min-w-0"
      style={{ background: bg, border: `1.5px solid ${border}` }}>
      <span style={{ color: '#dc2626', flexShrink: 0 }}>{icon}</span>
      <span className="font-bold text-[10px] truncate flex-1 min-w-0" style={{ color: '#dc2626' }}>{label}</span>
      <span className="font-bold text-[10px] flex-shrink-0" style={{ color: '#dc2626' }}>{value}</span>
    </div>
  )
}

/* ── Student card ── */
function StudentCard({ student, dark }) {
  const cardBg = dark ? '#1f2937' : 'white'
  const cardBorder = dark ? 'rgba(55,65,81,0.6)' : '#fecaca'
  const commentBg = dark ? 'rgba(253,230,138,0.08)' : '#fffbeb'
  const commentBorder = dark ? 'rgba(253,230,138,0.2)' : '#fde68a'
  const commentText = dark ? '#9ca3af' : '#6b7280'

  const overall  = num(student.overall)
  const listening = num(student.listening)
  const reading  = num(student.reading)
  const writing  = num(student.writing)
  const speaking = num(student.speaking)

  return (
    <div className="rounded-3xl overflow-hidden w-full"
      style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, boxShadow: '0 4px 20px rgba(220,38,38,0.1)' }}>
      <div className="p-3 pb-0">
        <CertPlaceholder name={student.name} dark={dark} />
      </div>

      <div className="px-3 pt-3 pb-3.5">

        {/* Name + optional photo */}
        <div className="flex items-center gap-2 mb-1.5">
          {student.image && (
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: '#fecaca' }}>
              <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
            </div>
          )}
          <p className="font-extrabold text-[14px] leading-tight flex-1 min-w-0" style={{ color: '#dc2626' }}>
            {student.name}
          </p>
        </div>

        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-3"
          style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)' }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
            <line x1="1" y1="1" x2="23" y2="23" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[9.5px] font-black tracking-widest" style={{ color: '#dc2626' }}>OFFLINE</span>
        </div>

        <div className="rounded-2xl py-3 text-center mb-3"
          style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)', boxShadow: '0 4px 14px rgba(185,28,28,0.4)' }}>
          <p className="text-white/70 text-[9px] font-black uppercase tracking-[0.18em] mb-0.5">Overall Band Score</p>
          <p className="text-white font-black text-[34px] leading-none">{overall.toFixed(1)}</p>
        </div>

        <div className="grid grid-cols-2 gap-1 mb-3">
          <SubScore label="Listening" value={listening || '—'} dark={dark} icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626">
              <path d="M3 18v-6a9 9 0 0118 0v6"/>
              <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z"/>
              <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/>
            </svg>
          }/>
          <SubScore label="Reading" value={reading || '—'} dark={dark} icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
          }/>
          <SubScore label="Writing" value={writing || '—'} dark={dark} icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626">
              <path d="M12 20h9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          }/>
          <SubScore label="Speaking" value={speaking || '—'} dark={dark} icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
              <path d="M19 10v2a7 7 0 01-14 0v-2" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="19" x2="12" y2="23" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
              <line x1="8" y1="23" x2="16" y2="23" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }/>
        </div>

        {student.comment && (
          <div className="rounded-2xl px-3 py-2.5" style={{ background: commentBg, border: `1px solid ${commentBorder}` }}>
            <div className="flex items-center gap-1.5 mb-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[9.5px] font-black uppercase tracking-wider" style={{ color: '#d97706' }}>Teacher's Comments</span>
            </div>
            <p className="text-[11px] leading-relaxed line-clamp-3" style={{ color: commentText }}>{student.comment}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ResultsPage({ dark = false, lang = 'uz' }) {
  const t = (langs[lang] || langs.uz).results
  const subText = dark ? '#9ca3af' : '#6b7280'
  const cardBg = dark ? '#1f2937' : 'white'
  const cardBorder = dark ? 'rgba(55,65,81,0.6)' : '#fecaca'

  const adminResults = getAdminResults()
  const students = adminResults ?? STUDENTS

  const STATS = [
    { num: '300+', label: t.stats.certificates },
    { num: '98%',  label: t.stats.success },
  ]

  return (
    <PageLayout dark={dark} backPath="/" lang={lang}>
      <div className="pb-8 mx-auto w-full max-w-[1200px]">

        {/* ── Hero header ── */}
        <div className="text-center px-5 pt-6 pb-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)', boxShadow: '0 4px 16px rgba(220,38,38,0.4)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="white"/>
            </svg>
            <span className="text-white font-black text-[12px] tracking-wide">Success Stories</span>
          </div>

          <h1 className="font-black text-[26px] sm:text-[30px] leading-tight mb-2" style={{ color: '#dc2626' }}>
            {t.heroTitle}
          </h1>
          <p className="text-[13.5px] leading-relaxed max-w-xs mx-auto" style={{ color: subText }}>
            {t.heroDesc}
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-3 px-4 mb-6">
          {STATS.map(stat => (
            <div key={stat.label} className="rounded-2xl py-4 text-center"
              style={{ background: cardBg, border: `1.5px solid ${cardBorder}`, boxShadow: '0 2px 10px rgba(220,38,38,0.07)' }}>
              <span className="block font-black text-[22px] leading-none mb-1" style={{ color: '#dc2626' }}>{stat.num}</span>
              <span className="block text-[10px] font-semibold leading-tight" style={{ color: subText }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Mobile: carousel, Desktop: 4-col grid ── */}
        <div
          className="flex lg:grid lg:grid-cols-4 gap-4 px-4 pb-2 overflow-x-auto lg:overflow-x-visible"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
        >
          {students.map((s, i) => (
            <div key={s.id ?? s.name ?? i} className="flex-shrink-0 lg:flex-shrink w-[252px] lg:w-auto" style={{ scrollSnapAlign: 'start' }}>
              <StudentCard student={s} dark={dark} />
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] mt-4 px-4" style={{ color: subText }}>
          {t.verified}
        </p>
      </div>
    </PageLayout>
  )
}
