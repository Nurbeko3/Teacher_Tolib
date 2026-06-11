import PageLayout from '../components/PageLayout'

export default function AboutTeacherPage({ dark }) {
  return (
    <PageLayout dark={dark}>
      <section className="px-5 py-8 mx-auto w-full max-w-[520px]">
        <h2 className="text-white font-extrabold text-xl sm:text-2xl mb-6">Ustoz haqida</h2>

        <div className="rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)' }}>
          <div className="px-6 pt-7 pb-5 flex items-center gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.28) 0%,rgba(255,255,255,0.1) 100%)', border: '2px solid rgba(255,255,255,0.38)' }}>
              <span className="text-2xl font-black text-white select-none">T</span>
            </div>
            <div>
              <h2 className="text-white font-extrabold text-[18px] leading-tight">Teacher Tolib</h2>
              <p className="text-white/60 text-[13px] mt-0.5 font-medium">Ingliz tili muallimi · IELTS Coach</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                <span className="text-[11px] font-semibold" style={{ color: '#86efac' }}>Online dars beradi</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            {[
              { num: '5+',    label: 'Yil tajriba'  },
              { num: '1200+', label: "O'quvchilar"   },
              { num: '98%',   label: 'Muvaffaqiyat'  },
            ].map((s, i) => (
              <div key={s.label} className="py-4 text-center" style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                <span className="block text-white font-black text-[22px] leading-none">{s.num}</span>
                <span className="block text-white/50 text-[10.5px] font-medium mt-1.5">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="px-6 pt-5 pb-4">
            <p className="text-white/75 text-[13px] leading-[1.75]">
              Ingliz tilini professional darajada o'qitaman. IELTS va umumiy ingliz tili kurslarini
              muvaffaqiyatli olib boraman. 5 yildan ortiq tajribam bilan 1200 dan ziyod o'quvchiga
              ingliz tilini o'rgatdim va ularni maqsadlariga yetkazishga yordam berdim.
            </p>
          </div>

          <div className="px-5 pb-5 flex gap-2.5">
            <a href="https://t.me/teacher_tolib" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,158,217,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-white/80 text-xs font-semibold">Telegram</span>
            </a>
            <a href="https://instagram.com/teacher_tolib" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(225,48,108,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span className="text-white/80 text-xs font-semibold">Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
