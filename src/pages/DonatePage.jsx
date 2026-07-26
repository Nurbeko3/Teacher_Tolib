import { useState, useEffect } from 'react'
import { api } from '../api'
import PageLayout from '../components/PageLayout'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const langs = { en, uz, ru }

const DEFAULT_CFG = {
  cardNumber: '5614 6818 1203 4217',
  cardHolder: 'TEACHER TOLIB',
  cardType:   'Uzcard',
  message:    '',
}

const formatAmount = (raw) =>
  raw.replace(/\s/g, '').replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

/* ── Donor avatar ── */
function DonorAvatar({ name }) {
  const initials = name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['#dc2626','#b91c1c','#991b1b','#ef4444','#7f1d1d']
  const color  = colors[name.charCodeAt(0) % colors.length]
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
      style={{ background: color }}
    >
      {initials}
    </div>
  )
}

/* ── Single donor row ── */
function DonorRow({ d, dark, cardBg, cardBorder }) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-2xl"
      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
    >
      <DonorAvatar name={d.name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-[13px] truncate" style={{ color: '#dc2626' }}>{d.name}</span>
          {d.amount && (
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626' }}
            >
              {d.amount} so'm
            </span>
          )}
        </div>
        {d.message && (
          <p className="text-[12px] leading-snug mt-0.5 line-clamp-2" style={{ color: dark ? '#9ca3af' : '#6b7280' }}>
            "{d.message}"
          </p>
        )}
        <p className="text-[10px] mt-1" style={{ color: dark ? '#6b7280' : '#9ca3af' }}>{d.date}</p>
      </div>
    </div>
  )
}

export default function DonatePage({ dark = false, lang = 'uz' }) {
  const t = (langs[lang] || langs.uz).donate

  const [cfg,       setCfg]       = useState(DEFAULT_CFG)
  const [donations, setDonations] = useState([])
  const [copied,    setCopied]    = useState(false)
  const [name,      setName]      = useState('')
  const [amount,    setAmount]    = useState('')
  const [message,   setMessage]   = useState('')
  const [sent,      setSent]      = useState(false)
  const [sending,   setSending]   = useState(false)
  const [showAll,   setShowAll]   = useState(false)

  const refresh = () => {
    api.getDonate().then(data => setCfg({ ...DEFAULT_CFG, ...data })).catch(() => {})
    api.getDonations().then(setDonations).catch(() => {})
  }

  /* load config + donations from the backend on mount, and again when the
     tab regains focus (e.g. after the admin updates the card in another tab) */
  useEffect(() => {
    refresh()
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [])

  const cardBg     = dark ? '#1f2937' : 'white'
  const cardBorder = dark ? 'rgba(55,65,81,0.6)' : '#fecaca'
  const wrapBg     = dark ? 'rgba(31,41,55,0.8)' : '#fff1f2'
  const wrapBorder = dark ? 'rgba(55,65,81,0.5)' : '#fecaca'
  const inputBg    = dark ? '#374151' : 'white'
  const inputText  = dark ? '#f9fafb' : '#374151'
  const subText    = dark ? '#9ca3af' : '#6b7280'

  const cardRaw = cfg.cardNumber.replace(/\s/g, '')

  const copyCard = () => {
    navigator.clipboard?.writeText(cardRaw).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleAmount = (e) => setAmount(formatAmount(e.target.value))

  const handleSend = (e) => {
    e.preventDefault()
    if (!name.trim() || !amount || !message.trim()) return
    setSending(true)
    api.addDonation({ name: name.trim(), amount, message: message.trim() })
      .then(() => api.getDonations().then(setDonations))
      .finally(() => { setSending(false); setSent(true) })
  }

  const visibleDonors = showAll ? donations : donations.slice(0, 5)

  return (
    <PageLayout dark={dark} lang={lang}>
      <section className="px-4 py-6 mx-auto w-full max-w-[520px]">

        {/* ── Hero ── */}
        <div className="text-center mb-7">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg,#b91c1c,#ef4444)', boxShadow: '0 8px 24px rgba(220,38,38,0.4)' }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                fill="white" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-black text-[22px] leading-snug mb-2" style={{ color: '#dc2626' }}>
            {t.title}
          </h2>
          <p className="text-[13.5px] leading-relaxed max-w-[320px] mx-auto" style={{ color: subText }}>
            {cfg.message || t.desc}
          </p>
        </div>

        {/* ── Bank card ── */}
        <div className="rounded-3xl overflow-hidden mb-4"
          style={{ border: `1.5px solid ${cardBorder}`, boxShadow: '0 4px 20px rgba(220,38,38,0.1)' }}>

          <div className="px-5 pt-4 pb-3 text-center" style={{ background: wrapBg, borderBottom: `1px solid ${wrapBorder}` }}>
            <span className="text-[10.5px] font-black uppercase tracking-[0.22em]" style={{ color: '#dc2626' }}>
              {t.cardLabel}
            </span>
          </div>

          {/* Visual card */}
          <div className="mx-4 mt-4 mb-3 rounded-2xl p-5 relative overflow-hidden select-none"
            style={{ background: 'linear-gradient(135deg,#7f1d1d,#b91c1c 50%,#dc2626)', boxShadow: '0 12px 32px rgba(185,28,28,0.45)' }}>
            <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full opacity-[0.1]" style={{ border: '28px solid white' }} />
            <div className="absolute top-8 -right-2 w-20 h-20 rounded-full opacity-[0.07]" style={{ border: '18px solid white' }} />

            {/* Chip */}
            <div className="w-9 h-[26px] rounded-md mb-4 relative z-10"
              style={{ background: 'linear-gradient(135deg,#fde68a,#f59e0b)', boxShadow: '0 2px 8px rgba(245,158,11,0.5)' }} />

            {/* Card number */}
            <p className="text-white font-black text-[14px] sm:text-[20px] tracking-[0.15em] sm:tracking-[0.22em] leading-none mb-4 relative z-10 whitespace-nowrap">
              {cfg.cardNumber}
            </p>

            {/* Bottom info */}
            <div className="flex items-end justify-between relative z-10">
              <div>
                <p className="text-white/50 text-[8.5px] uppercase tracking-[0.15em]">{t.cardHolder}</p>
                <p
                  className="font-black text-[13px] mt-0.5 tracking-widest"
                  style={{
                    background: 'linear-gradient(90deg,#fde68a,#ffffff 35%,#fbbf24 55%,#ffffff 70%,#fde68a)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'teacherShine 2.2s linear infinite',
                    filter: 'drop-shadow(0 0 8px rgba(253,230,138,0.7))',
                  }}
                >
                  {cfg.cardHolder}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-[8.5px] uppercase tracking-[0.15em]">{t.cardType}</p>
                <p className="text-white font-bold text-[13px] mt-0.5">{cfg.cardType}</p>
              </div>
            </div>
          </div>

          {/* Copy button */}
          <div className="px-4 pb-4" style={{ background: dark ? '#1a2332' : 'transparent' }}>
            <button
              onClick={copyCard}
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2.5 font-bold text-[14px] transition-all duration-200 active:scale-[0.97]"
              style={{
                background: copied ? 'rgba(74,222,128,0.1)' : wrapBg,
                border: `1.5px solid ${copied ? 'rgba(74,222,128,0.45)' : wrapBorder}`,
                color: copied ? '#16a34a' : '#dc2626',
              }}
              onMouseEnter={e => { if (!copied) e.currentTarget.style.background = dark ? '#374151' : '#ffe4e6' }}
              onMouseLeave={e => { if (!copied) e.currentTarget.style.background = wrapBg }}
            >
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t.copied}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t.copyBtn}
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Donors list ── */}
        {donations.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="#dc2626"/>
                </svg>
                <span className="text-[11px] font-black uppercase tracking-[0.15em]" style={{ color: '#dc2626' }}>
                  Qo'llab-quvvatlaganlar
                </span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(220,38,38,0.1)', color: '#dc2626' }}
                >
                  {donations.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {visibleDonors.map((d) => (
                <DonorRow key={d.id} d={d} dark={dark} cardBg={cardBg} cardBorder={cardBorder} />
              ))}
            </div>

            {donations.length > 5 && (
              <button
                onClick={() => setShowAll(s => !s)}
                className="w-full mt-2 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-150"
                style={{ background: wrapBg, border: `1px solid ${wrapBorder}`, color: '#dc2626' }}
              >
                {showAll ? 'Yig\'ish ▲' : `Yana ${donations.length - 5} ta ko'rish ▼`}
              </button>
            )}
          </div>
        )}

        {/* ── Message form ── */}
        <div>
          <div className="text-center mb-5">
            <h3 className="font-black text-[20px]" style={{ color: '#dc2626' }}>{t.formTitle}</h3>
            <p className="text-[13px] mt-1 leading-relaxed max-w-[300px] mx-auto" style={{ color: subText }}>
              {t.formDesc}
            </p>
          </div>

          {sent ? (
            <div className="rounded-3xl px-6 py-10 text-center" style={{ background: wrapBg, border: `1.5px solid ${wrapBorder}` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg,#b91c1c,#ef4444)', boxShadow: '0 6px 20px rgba(220,38,38,0.4)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-black text-[18px] mb-1" style={{ color: '#dc2626' }}>{t.thankYou}</p>
              <p className="text-[13px]" style={{ color: subText }}>{t.thankYouDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex flex-col gap-3">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-[0.15em] mb-1.5" style={{ color: '#dc2626' }}>
                  {t.name}
                </label>
                <input
                  type="text" placeholder={t.namePlaceholder}
                  value={name} onChange={e => setName(e.target.value)} required
                  className="w-full px-4 py-3 rounded-2xl text-[14px] font-bold placeholder-gray-400 placeholder:font-normal outline-none transition-all duration-200"
                  style={{ background: inputBg, border: `1.5px solid ${cardBorder}`, color: inputText }}
                  onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.08)' }}
                  onBlur={e => { e.target.style.borderColor = cardBorder; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-[0.15em] mb-1.5" style={{ color: '#dc2626' }}>
                  {t.amount}
                </label>
                <input
                  type="text" inputMode="numeric" placeholder={t.amountPlaceholder}
                  value={amount} onChange={handleAmount} required
                  className="w-full px-4 py-3 rounded-2xl text-[14px] font-bold placeholder-gray-400 placeholder:font-normal outline-none transition-all duration-200"
                  style={{ background: inputBg, border: `1.5px solid ${cardBorder}`, color: inputText }}
                  onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.08)' }}
                  onBlur={e => { e.target.style.borderColor = cardBorder; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-[0.15em] mb-1.5" style={{ color: '#dc2626' }}>
                  {t.message}
                </label>
                <p className="text-[12px] mb-2 leading-snug" style={{ color: subText }}>{t.msgHint}</p>
                <textarea
                  placeholder={t.messagePlaceholder} rows={4}
                  value={message} onChange={e => setMessage(e.target.value)} required
                  className="w-full px-4 py-3 rounded-2xl text-[14px] font-bold placeholder-gray-400 placeholder:font-normal outline-none transition-all duration-200 resize-none"
                  style={{ background: inputBg, border: `1.5px solid ${cardBorder}`, color: inputText }}
                  onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.08)' }}
                  onBlur={e => { e.target.style.borderColor = cardBorder; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={!name.trim() || !amount || !message.trim() || sending}
                className="w-full py-4 rounded-2xl font-bold text-[15px] text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#b91c1c,#dc2626)', boxShadow: '0 6px 20px rgba(220,38,38,0.4)' }}
                onMouseEnter={e => { if (name.trim() && amount && message.trim()) e.currentTarget.style.boxShadow = '0 8px 28px rgba(220,38,38,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(220,38,38,0.4)' }}
              >
                {sending ? (
                  <>
                    <svg className="animate-spin" width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    {t.sending}
                  </>
                ) : (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t.sendBtn}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[11px] mt-6" style={{ color: subText }}>
          {t.footerNote}
        </p>
      </section>
    </PageLayout>
  )
}
