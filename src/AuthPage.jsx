import { useState, useRef } from 'react'
import en from './locales/en'
import uz from './locales/uz'
import ru from './locales/ru'
import Navbar from './Navbar'

const langs = { en, uz, ru }

const ADMIN_PHONE = '998991231111'

// ── localStorage mock ──
const getUsers  = () => JSON.parse(localStorage.getItem('et_users') || '{}')
const findUser  = (phone) => getUsers()[phone] || null
const saveUser  = (phone, data) => {
  const all = getUsers(); all[phone] = data
  localStorage.setItem('et_users', JSON.stringify(all))
}

// ── Phone formatter ──
const formatPhone = (raw) => {
  const digits = raw.replace(/\D/g, '').slice(3).slice(0, 9)
  let r = '+998'
  if (digits.length > 0) r += ' ' + digits.slice(0, 2)
  if (digits.length > 2) r += ' ' + digits.slice(2, 5)
  if (digits.length > 5) r += ' ' + digits.slice(5, 7)
  if (digits.length > 7) r += ' ' + digits.slice(7, 9)
  return r
}

// ── Shared card header ──
function CardHeader({ t }) {
  return (
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
  )
}

function FieldError({ msg }) {
  if (!msg) return null
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
        <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {msg}
    </p>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
      <FieldError msg={error} />
    </div>
  )
}

export default function AuthPage({ onSuccess, lang, setLang, dark, setDark }) {
  const [view, setView]         = useState('login')
  const [otpFlow, setOtpFlow]   = useState('login')
  const [exiting, setExiting]   = useState(false)
  const [loading, setLoading]   = useState(false)

  const [loginPhone, setLoginPhone] = useState('+998')
  const [loginError, setLoginError] = useState('')

  const [reg, setReg]           = useState({ firstName: '', lastName: '', level: '', phone: '+998' })
  const [regErrors, setRegErrors] = useState({})

  const [otp, setOtp]           = useState(['', '', '', '', '', ''])
  const [otpDone, setOtpDone]   = useState(false)
  const [pendingUser, setPendingUser] = useState(null)

  const otpRefs = useRef([])
  const t = langs[lang].login

  const goTo = (nextView, cb) => {
    setExiting(true)
    setTimeout(() => { setExiting(false); setView(nextView); if (cb) cb() }, 340)
  }

  const handlePhone = (raw, setter, clearErr) => {
    if (raw.length < 4) { setter('+998'); return }
    setter(formatPhone(raw))
    if (clearErr) clearErr()
  }

  const handleLoginSubmit = () => {
    const digits = loginPhone.replace(/\D/g, '')
    if (digits.length < 12) { setLoginError(t.invalidPhone); return }

    // Super admin check — only exact phone number
    if (digits === ADMIN_PHONE) {
      setLoginError('')
      setLoading(true)
      setTimeout(() => {
        onSuccess({ phone: loginPhone, role: 'SUPER_ADMIN', firstName: 'Admin', lastName: '' })
      }, 1000)
      return
    }

    const user = findUser(loginPhone)
    if (!user) { setLoginError(t.notRegistered || 'Phone not registered.'); return }
    setLoginError('')
    setLoading(true)
    setTimeout(() => { onSuccess({ ...user, role: 'USER' }) }, 1500)
  }

  const handleRegSubmit = () => {
    const errs = {}
    if (!reg.firstName.trim()) errs.firstName = t.required
    if (!reg.lastName.trim())  errs.lastName  = t.required
    if (!reg.level)            errs.level     = t.required
    const digits = reg.phone.replace(/\D/g, '')
    if (digits.length < 12)   errs.phone     = t.invalidPhone
    if (Object.keys(errs).length > 0) { setRegErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const userData = { firstName: reg.firstName, lastName: reg.lastName, level: reg.level, phone: reg.phone }
      saveUser(reg.phone, userData)
      setPendingUser(userData)
      setOtpFlow('register')
      setOtp(['', '', '', '', '', ''])
      setOtpDone(false)
      goTo('otp')
    }, 1200)
  }

  const handleOtpInput = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]; next[i] = val; setOtp(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
    if (next.every((d) => d !== '')) {
      setOtpDone(true)
      setTimeout(() => goTo('login', () => {
        setOtp(['','','','','',''])
        setOtpDone(false)
        setLoginPhone(pendingUser?.phone || '+998')
        setLoginError('')
      }), 600)
    }
  }
  const handleOtpKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = [...otp]; p.split('').forEach((d, i) => { next[i] = d }); setOtp(next)
    otpRefs.current[Math.min(p.length, 5)]?.focus()
    if (p.length === 6) {
      setOtpDone(true)
      setTimeout(() => goTo('login', () => {
        setOtp(['','','','','',''])
        setOtpDone(false)
        setLoginPhone(pendingUser?.phone || '+998')
        setLoginError('')
      }), 600)
    }
  }

  const inputClass = (hasErr) =>
    `w-full px-4 py-3 rounded-xl border-2 outline-none text-sm text-gray-800 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 transition-all duration-200 focus:border-red-400 focus:bg-white dark:focus:bg-gray-700 ${
      hasErr
        ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
        : 'border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
    }`

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-500 dark:from-gray-950 dark:via-red-950 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">

      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} onLogout={null} />

      {/* Aurora background */}
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-3 sm:mx-4 animate-cardEntrance mt-14 sm:mt-16">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
          <CardHeader t={t} />

          <div className="px-5 sm:px-8 py-5 sm:py-7 overflow-hidden">

            {/* ══ LOGIN ══ */}
            {view === 'login' && (
              <div className={exiting ? 'animate-slideOut' : 'animate-slideIn'}>
                <p className="text-gray-400 dark:text-gray-500 text-sm mb-5">{t.loginDesc}</p>

                <Field label={t.phone} error={loginError}>
                  <input
                    type="tel" value={loginPhone} maxLength={17}
                    onChange={(e) => handlePhone(e.target.value, setLoginPhone, () => setLoginError(''))}
                    className={inputClass(!!loginError)}
                  />
                </Field>

                <button
                  onClick={handleLoginSubmit} disabled={loading}
                  className="mt-6 w-full py-3.5 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold rounded-xl text-base shadow-lg shadow-red-200 hover:from-red-800 hover:to-red-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-80 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><svg className="spin" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg><span>{t.login}...</span></>
                  ) : t.login}
                </button>

                <div className="mt-5 text-center">
                  <span className="text-gray-400 dark:text-gray-500 text-sm">{t.noAccount} </span>
                  <button onClick={() => goTo('register')} className="text-red-500 font-semibold text-sm hover:underline">
                    {t.registerLink}
                  </button>
                </div>
              </div>
            )}

            {/* ══ REGISTER ══ */}
            {view === 'register' && (
              <div className={exiting ? 'animate-slideOut' : 'animate-slideIn'}>
                <button onClick={() => goTo('login')}
                  className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors mb-5 group"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
                    <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium">{t.login}</span>
                </button>

                <div className="space-y-4">
                  <Field label={t.firstName} error={regErrors.firstName}>
                    <input type="text" placeholder={t.firstNamePlaceholder} value={reg.firstName}
                      onChange={(e) => { setReg(r => ({ ...r, firstName: e.target.value })); setRegErrors(e => ({ ...e, firstName: '' })) }}
                      className={inputClass(!!regErrors.firstName)} />
                  </Field>

                  <Field label={t.lastName} error={regErrors.lastName}>
                    <input type="text" placeholder={t.lastNamePlaceholder} value={reg.lastName}
                      onChange={(e) => { setReg(r => ({ ...r, lastName: e.target.value })); setRegErrors(e => ({ ...e, lastName: '' })) }}
                      className={inputClass(!!regErrors.lastName)} />
                  </Field>

                  <Field label={t.level} error={regErrors.level}>
                    <div className="relative">
                      <select value={reg.level}
                        onChange={(e) => { setReg(r => ({ ...r, level: e.target.value })); setRegErrors(e => ({ ...e, level: '' })) }}
                        className={`${inputClass(!!regErrors.level)} appearance-none cursor-pointer ${!reg.level ? 'text-gray-300 dark:text-gray-600' : ''}`}
                      >
                        <option value="" disabled className="dark:bg-gray-800">{t.levelPlaceholder}</option>
                        {Object.entries(t.levels).map(([k, v]) => (
                          <option key={k} value={k} className="text-gray-800 dark:text-gray-100 dark:bg-gray-800">{v}</option>
                        ))}
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Field>

                  <Field label={t.phone} error={regErrors.phone}>
                    <input type="tel" value={reg.phone} maxLength={17}
                      onChange={(e) => handlePhone(e.target.value, (v) => setReg(r => ({ ...r, phone: v })), () => setRegErrors(e => ({ ...e, phone: '' })))}
                      className={inputClass(!!regErrors.phone)} />
                  </Field>
                </div>

                <button
                  onClick={handleRegSubmit} disabled={loading}
                  className="mt-6 w-full py-3.5 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold rounded-xl text-base shadow-lg shadow-red-200 hover:from-red-800 hover:to-red-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-80 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><svg className="spin" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg><span>{t.register}...</span></>
                  ) : t.register}
                </button>
              </div>
            )}

            {/* ══ OTP ══ */}
            {view === 'otp' && (
              <div className={exiting ? 'animate-slideOut' : 'animate-slideIn'}>
                <button
                  onClick={() => goTo(otpFlow === 'login' ? 'login' : 'register', () => { setOtp(['','','','','','']); setOtpDone(false) })}
                  className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors mb-5 group"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
                    <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-red-400">{pendingUser?.phone}</span>
                </button>

                <div className="text-center mb-7">
                  <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-red-100 dark:border-red-800">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.38 2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t.otp.title}</h2>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{t.otp.subtitle}</p>
                  <p className="text-red-600 font-semibold text-sm mt-0.5">{pendingUser?.phone}</p>
                </div>

                <div className="flex gap-1.5 sm:gap-2.5 justify-center mb-7">
                  {otp.map((digit, i) => (
                    <input key={i} ref={(el) => (otpRefs.current[i] = el)}
                      type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKey(i, e)}
                      onPaste={i === 0 ? handleOtpPaste : undefined}
                      className={`w-9 sm:w-11 h-10 sm:h-[52px] text-center text-lg sm:text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200 dark:bg-gray-800 ${
                        otpDone ? 'border-green-400 bg-green-50 text-green-600 dark:bg-green-900/30'
                        : digit  ? 'border-red-400 bg-red-50 text-red-600 animate-otpPop dark:bg-red-900/30'
                                 : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:border-red-400'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-center text-gray-400 dark:text-gray-500 text-sm">
                  {t.otp.resend}{' '}
                  <button onClick={() => setOtp(['','','','','',''])} className="text-red-500 font-semibold hover:underline">
                    {t.otp.resendBtn}
                  </button>
                </p>
              </div>
            )}

          </div>
        </div>
        <p className="text-center text-white/40 text-xs mt-5">Teacher Tolib © 2026</p>
      </div>
    </div>
  )
}
