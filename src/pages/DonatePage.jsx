import { useState } from 'react'
import PageLayout from '../components/PageLayout'

export default function DonatePage({ dark }) {
  const [copied, setCopied] = useState(false)

  const copyCard = () => {
    navigator.clipboard?.writeText('8600123456789012').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <PageLayout dark={dark}>
      <section className="px-5 py-8 mx-auto w-full max-w-[520px]">
        <h2 className="text-white font-extrabold text-xl sm:text-2xl mb-1">Donat</h2>
        <p className="text-white/60 text-[13px] font-medium mb-6">Ustozni qo'llab-quvvatlang</p>

        <div className="rounded-3xl px-5 py-5 mb-3 flex items-start gap-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.18)' }}>
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.18)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-extrabold text-[15px] leading-tight">Yordamingiz muhim</h3>
            <p className="text-white/65 text-[12.5px] mt-1.5 leading-relaxed">
              Sizning yordamingiz yangi darslar, materiallar va platformani rivojlantirishga sarf qilinadi.
            </p>
          </div>
        </div>

        {/* Bank card visual */}
        <div className="rounded-3xl p-5 mb-3 relative overflow-hidden select-none" style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 55%, #ef4444 100%)', boxShadow: '0 20px 48px rgba(185,28,28,0.55)' }}>
          <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full opacity-[0.08]" style={{ border: '28px solid white' }} />
          <div className="absolute top-8 -right-2 w-24 h-24 rounded-full opacity-[0.07]" style={{ border: '20px solid white' }} />

          <div className="w-9 h-[27px] rounded-lg mb-5 relative z-10" style={{ background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)', boxShadow: '0 2px 8px rgba(245,158,11,0.5)' }} />

          <div className="relative z-10 mb-4">
            <p className="text-white/45 text-[9.5px] font-semibold uppercase tracking-[0.2em] mb-1">Karta raqami</p>
            <p className="text-white font-black text-[19px] tracking-[0.2em] leading-none">8600 1234 5678 9012</p>
          </div>

          <div className="flex items-end justify-between relative z-10">
            <div>
              <p className="text-white/45 text-[9px] uppercase tracking-[0.15em]">Karta egasi</p>
              <p className="text-white font-bold text-[13px] mt-0.5 tracking-wide">TOLIB O.</p>
            </div>
            <div className="text-right">
              <p className="text-white/45 text-[9px] uppercase tracking-[0.15em]">Muddati</p>
              <p className="text-white font-bold text-[13px] mt-0.5">12/27</p>
            </div>
          </div>
        </div>

        <button
          onClick={copyCard}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.97] font-bold text-[14px]"
          style={{
            background: copied ? 'rgba(74,222,128,0.22)' : 'rgba(255,255,255,0.18)',
            border: `1.5px solid ${copied ? 'rgba(74,222,128,0.45)' : 'rgba(255,255,255,0.28)'}`,
            color: 'white',
          }}
          onMouseEnter={e => { if (!copied) e.currentTarget.style.background = 'rgba(255,255,255,0.26)' }}
          onMouseLeave={e => { if (!copied) e.currentTarget.style.background = copied ? 'rgba(74,222,128,0.22)' : 'rgba(255,255,255,0.18)' }}
        >
          {copied ? (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: '#86efac' }}>Nusxalandi!</span>
            </>
          ) : (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Karta raqamini nusxalash
            </>
          )}
        </button>

        <p className="text-center text-white/35 text-[11px] mt-3 mb-2">
          Har qanday miqdordagi yordam qabul qilinadi · Rahmat!
        </p>
      </section>
    </PageLayout>
  )
}
