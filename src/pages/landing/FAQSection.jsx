import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './shared'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

function ContactForm({ f }) {
  const [form, setForm]       = useState({ name: '', phone: '', message: '' })
  const [status, setStatus]   = useState('idle') // idle | sending | success

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handlePhone = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 12)
    let formatted = ''
    if (digits.length === 0) {
      formatted = ''
    } else {
      formatted = '+' + digits.slice(0, 3)
      if (digits.length > 3)  formatted += ' ' + digits.slice(3, 5)
      if (digits.length > 5)  formatted += ' ' + digits.slice(5, 8)
      if (digits.length > 8)  formatted += ' ' + digits.slice(8, 10)
      if (digits.length > 10) formatted += ' ' + digits.slice(10, 12)
    }
    setForm((p) => ({ ...p, phone: formatted }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) return
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    color: 'white',
    outline: 'none',
    width: '100%',
    padding: '12px 14px',
    fontSize: 14,
    transition: 'border-color 0.2s',
  }

  const onFocus = (e) => { e.target.style.borderColor = 'rgba(255,0,0,0.5)' }
  const onBlur  = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.12)' }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(255,0,0,0.15)', border: '1.5px solid rgba(255,0,0,0.35)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#ff4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="font-black text-white text-[17px]">{f.success}</p>
        <p className="mt-1 text-[13.5px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.successDesc}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {f.name}
          </label>
          <input
            type="text"
            placeholder={f.namePlaceholder}
            value={form.name}
            onChange={set('name')}
            onFocus={onFocus}
            onBlur={onBlur}
            style={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {f.phone}
          </label>
          <input
            type="tel"
            placeholder="+998 90 123 11 11"
            value={form.phone}
            onChange={handlePhone}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={17}
            style={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {f.message}
        </label>
        <textarea
          rows={4}
          placeholder={f.messagePlaceholder}
          value={form.message}
          onChange={set('message')}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{ ...inputStyle, resize: 'none' }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-1 w-full py-3.5 rounded-2xl font-bold text-[15px] text-white flex items-center justify-center gap-2 transition-opacity duration-200"
        style={{
          background: 'linear-gradient(135deg, #b91c1c 0%, #FF0000 60%, #ff4444 100%)',
          boxShadow: '0 0 24px rgba(255,0,0,0.4)',
          opacity: status === 'sending' ? 0.7 : 1,
        }}
      >
        {status === 'sending' ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
              <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            {f.sending}
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {f.send}
          </>
        )}
      </button>
    </form>
  )
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: isOpen ? 'rgba(255,0,0,0.06)' : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${isOpen ? 'rgba(255,0,0,0.35)' : 'rgba(255,255,255,0.1)'}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none"
      >
        <span className="font-bold text-[14.5px]" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            background: 'rgba(255,0,0,0.15)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="#ff4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="px-5 pb-4 text-[13.5px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection({ lang }) {
  const t = (langs[lang] || langs.en).landing.faq
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 px-5 sm:px-8 py-20 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Atmospheric orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute"
          style={{
            top: '-20%', right: '-10%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute"
          style={{
            bottom: '-15%', left: '-8%',
            width: 420, height: 420, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,0,0.25) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[760px]">
        <Reveal className="text-center mb-12">
          <p
            className="text-[11px] font-black uppercase tracking-[0.2em] mb-3"
            style={{ color: '#FF0000' }}
          >
            {t.label}
          </p>
          <h2
            className="font-black text-[1.9rem] sm:text-4xl leading-tight"
            style={{ color: 'white' }}
          >
            {t.title}
          </h2>
          <p
            className="mt-3 text-[15px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {t.subtitle}
          </p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {t.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <FAQItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>

        {/* ── Contact form ── */}
        <Reveal className="mt-14">
          <div
            className="rounded-3xl p-7 sm:p-9"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="text-center mb-7">
              <p className="font-black text-white text-[1.35rem] leading-tight">{t.form.title}</p>
              <p className="mt-1.5 text-[13.5px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{t.form.subtitle}</p>
            </div>
            <ContactForm f={t.form} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
