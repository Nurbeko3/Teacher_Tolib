import PageLayout from '../components/PageLayout'

const IELTS_SCORES = [
  { name: 'Jasur T.',   score: '7.5', module: 'Academic' },
  { name: 'Nilufar X.', score: '7.0', module: 'General'  },
  { name: 'Bobur A.',   score: '6.5', module: 'Academic' },
  { name: 'Zulfiya K.', score: '8.0', module: 'Academic' },
  { name: 'Sherzod M.', score: '6.0', module: 'General'  },
]

export default function ResultsPage({ dark }) {
  return (
    <PageLayout dark={dark}>
      <section className="px-5 py-8 mx-auto w-full max-w-[520px]">
        <h2 className="text-white font-extrabold text-xl sm:text-2xl mb-1">Natijalar</h2>
        <p className="text-white/60 text-[13px] font-medium mb-6">O'quvchilarimizning yutuqlari</p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              num: '300+', label: 'IELTS sertifikat',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="8" stroke="white" strokeWidth="2"/>
                  <path d="M8 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 18h10M12 18v3" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
                </svg>
              ),
            },
            {
              num: '6.8', label: "O'rtacha ball",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 20V10M12 20V4M6 20v-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
            {
              num: '98%', label: 'Muvaffaqiyat',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl px-2 py-4 text-center" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.16)' }}>
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <span className="block text-white font-black text-[20px] leading-none">{stat.num}</span>
              <span className="block text-white/50 text-[10px] font-medium mt-1.5 leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.16)' }}>
          <div className="px-5 pt-5 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <h3 className="text-white font-bold text-[14px]">So'nggi IELTS natijalari</h3>
            <p className="text-white/50 text-[11px] mt-0.5">Talabalarimizning real natijalari</p>
          </div>
          <div className="px-4 py-3 flex flex-col gap-2">
            {IELTS_SCORES.map(s => (
              <div key={s.name} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <span className="text-white font-bold text-[12px]">{s.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-white font-semibold text-[13px] truncate">{s.name}</span>
                  <span className="block text-white/50 text-[11px]">{s.module}</span>
                </div>
                <div className="px-2.5 py-1 rounded-xl flex-shrink-0" style={{ background: 'rgba(74,222,128,0.18)', border: '1px solid rgba(74,222,128,0.32)' }}>
                  <span className="font-black text-[13px]" style={{ color: '#86efac' }}>Band {s.score}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pb-2" />
        </div>
      </section>
    </PageLayout>
  )
}
