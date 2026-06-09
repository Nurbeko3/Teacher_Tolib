import { useState, useRef, useEffect } from 'react'
import en from './locales/en'
import uz from './locales/uz'
import ru from './locales/ru'

const langs = { en, uz, ru }
const langOptions = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'uz', label: "O'Z", name: "O'zbek" },
  { code: 'ru', label: 'RU', name: 'Русский' },
]

export default function LoginPage({ onLogin }) {
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [step, setStep] = useState('form')
  const [exiting, setExiting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', level: '', phone: '+998' })
  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [done, setDone] = useState(false)
  const otpRefs = useRef([])
  const menuRef = useRef(null)
  const t = langs[lang].login

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const formatPhone = (raw) => {
    // Extract digits after country code 998
    const digits = raw.replace(/\D/g, '').slice(3).slice(0, 9)
    let result = '+998'
    if (digits.length > 0) result += ' ' + digits.slice(0, 2)
    if (digits.length > 2) result += ' ' + digits.slice(2, 5)
    if (digits.length > 5) result += ' ' + digits.slice(5, 7)
    if (digits.length > 7) result += ' ' + digits.slice(7, 9)
    return result
  }

  const handlePhoneChange = (e) => {
    const raw = e.target.value
    if (raw.length < 4) {
      setField('phone', '+998')
      return
    }
    setField('phone', formatPhone(raw))
  }

  const validate = () => {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = t.required
    if (!form.lastName.trim()) errs.lastName = t.required
    if (!form.level) errs.level = t.required
    const digits = form.phone.replace(/\D/g, '')
    // +998 + 9 digits = 12 total
    if (digits.length < 12) errs.phone = t.invalidPhone
    return errs
  }

  const handleConfirm = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setExiting(true)
      setTimeout(() => {
        setStep('otp')
        setExiting(false)
        setTimeout(() => otpRefs.current[0]?.focus(), 80)
      }, 360)
    }, 1500)
  }

  const handleOtp = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
    if (next.every((d) => d !== '')) {
      setDone(true)
      setTimeout(() => onLogin({ ...form, lang }), 500)
    }
  }

  const handleOtpKey = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = [...otp]
    pasted.split('').forEach((d, i) => { next[i] = d })
    setOtp(next)
    const focus = pasted.length < 6 ? pasted.length : 5
    otpRefs.current[focus]?.focus()
    if (pasted.length === 6) {
      setDone(true)
      setTimeout(() => onLogin({ ...form, lang }), 500)
    }
  }

  const setField = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-500 flex items-center justify-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white animate-pulse2 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-white animate-pulse2 pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 -right-16 w-48 h-48 rounded-full bg-red-400 opacity-30 animate-floatB pointer-events-none" />
      <div className="absolute bottom-1/4 -left-10 w-32 h-32 rounded-full bg-red-300 opacity-20 animate-floatA pointer-events-none" />

      {/* Hamburger menu */}
      <div ref={menuRef} className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-[5px] border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg"
          aria-label="Language menu"
        >
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>

        {menuOpen && (
          <div className="absolute top-14 left-0 bg-white rounded-2xl shadow-2xl overflow-hidden w-44 animate-slideDown border border-gray-100">
            <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{langs[lang].language}</p>
            </div>
            {langOptions.map((opt) => (
              <button
                key={opt.code}
                onClick={() => { setLang(opt.code); setMenuOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  lang === opt.code
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className={`text-xs font-extrabold w-7 ${lang === opt.code ? 'text-red-600' : 'text-gray-400'}`}>{opt.label}</span>
                <span className="text-sm font-medium">{opt.name}</span>
                {lang === opt.code && (
                  <span className="ml-auto">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Card */}
      <div className="w-full max-w-md mx-4 animate-cardEntrance">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-red-700 to-red-500 px-8 pt-8 pb-7 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
            <div className="absolute bottom-2 right-8 w-14 h-14 rounded-full bg-white/10" />
            <div className="relative">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 border border-white/30">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
              <p className="text-red-100 text-sm mt-0.5">{t.subtitle}</p>
            </div>
          </div>

          {/* Card body */}
          <div className="px-8 py-7 overflow-hidden">
            {/* FORM STEP */}
            {step === 'form' && (
              <div className={exiting ? 'animate-slideOut' : 'animate-slideIn'}>
                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.firstName}</label>
                    <input
                      type="text"
                      placeholder={t.firstNamePlaceholder}
                      value={form.firstName}
                      onChange={(e) => setField('firstName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-red-400 focus:bg-white ${
                        errors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.lastName}</label>
                    <input
                      type="text"
                      placeholder={t.lastNamePlaceholder}
                      value={form.lastName}
                      onChange={(e) => setField('lastName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm text-gray-800 placeholder-gray-300 transition-all duration-200 focus:border-red-400 focus:bg-white ${
                        errors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.level}</label>
                    <div className="relative">
                      <select
                        value={form.level}
                        onChange={(e) => setField('level', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm transition-all duration-200 focus:border-red-400 focus:bg-white appearance-none cursor-pointer ${
                          errors.level ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50'
                        } ${!form.level ? 'text-gray-300' : 'text-gray-800'}`}
                      >
                        <option value="" disabled>{t.levelPlaceholder}</option>
                        {Object.entries(t.levels).map(([key, val]) => (
                          <option key={key} value={key} className="text-gray-800">{val}</option>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {errors.level && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
                        {errors.level}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t.phone}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      maxLength={17}
                      className={`w-full px-4 py-3 rounded-xl border-2 outline-none text-sm text-gray-800 transition-all duration-200 focus:border-red-400 focus:bg-white tracking-wide ${
                        errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm button */}
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="mt-6 w-full py-3.5 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold rounded-xl text-base shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 hover:from-red-800 hover:to-red-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                        <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      <span className="opacity-90">{t.confirm}...</span>
                    </>
                  ) : (
                    t.confirm
                  )}
                </button>
              </div>
            )}

            {/* OTP STEP */}
            {step === 'otp' && (
              <div className="animate-slideIn">
                {/* Back button */}
                <button
                  onClick={() => {
                    setStep('form')
                    setOtp(['', '', '', '', '', ''])
                    setDone(false)
                  }}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors mb-5 group"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
                    <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium">{t.phone}</span>
                  <span className="text-sm text-red-400 font-semibold ml-1">{form.phone}</span>
                </button>

                <div className="text-center mb-7">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-red-100">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.38 2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">{t.otp.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{t.otp.subtitle}</p>
                  <p className="text-red-600 font-semibold text-sm mt-0.5">{form.phone}</p>
                </div>

                {/* OTP inputs */}
                <div className="flex gap-2.5 justify-center mb-7">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtp(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKey(i, e)}
                      onPaste={i === 0 ? handlePaste : undefined}
                      className={`w-11 h-13 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200 ${
                        done
                          ? 'border-green-400 bg-green-50 text-green-600'
                          : digit
                          ? 'border-red-400 bg-red-50 text-red-600 animate-otpPop'
                          : 'border-gray-200 bg-gray-50 text-gray-800 focus:border-red-400 focus:bg-red-50/30'
                      }`}
                      style={{ height: '52px' }}
                    />
                  ))}
                </div>

                <p className="text-center text-gray-400 text-sm">
                  {t.otp.resend}{' '}
                  <button
                    onClick={() => setOtp(['', '', '', '', '', ''])}
                    className="text-red-500 font-semibold hover:underline"
                  >
                    {t.otp.resendBtn}
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom tag */}
        <p className="text-center text-white/50 text-xs mt-5">Teacher Tolib © 2026</p>
      </div>
    </div>
  )
}
