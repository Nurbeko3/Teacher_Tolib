import { useState, useRef, useEffect } from 'react'
import { api } from './api'
import en from './locales/en'
import uz from './locales/uz'
import ru from './locales/ru'
import Navbar from './Navbar'

const langs = { en, uz, ru }

const DEFAULT_ADMIN_PHONE = '998991231111'
const TELEGRAM_BOT_USERNAME = (import.meta.env.VITE_TELEGRAM_BOT_USERNAME || '').replace(/^@/, '')
const TELEGRAM_BOT_URL = TELEGRAM_BOT_USERNAME ? `https://t.me/${TELEGRAM_BOT_USERNAME}` : null

const genId = () => `u_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`

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
  const [adminPassword, setAdminPassword] = useState('')
  const [adminPasswordError, setAdminPasswordError] = useState('')
  const [isAdminPhone, setIsAdminPhone] = useState(false)

  const [reg, setReg]           = useState({ firstName: '', lastName: '', level: '', phone: '+998' })
  const [regErrors, setRegErrors] = useState({})

  const [otp, setOtp]           = useState(['', '', '', '', '', ''])
  const [otpDone, setOtpDone]   = useState(false)
  const [otpError, setOtpError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [pendingUser, setPendingUser] = useState(null)
  const [telegramLink, setTelegramLink] = useState(null)

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

  useEffect(() => {
    const digits = loginPhone.replace(/\D/g, '')
    if (digits.length !== 12) {
      setIsAdminPhone(false)
      return
    }
    // Default admin raqamida parol maydonini tarmoq javobini kutmasdan ko'rsatamiz.
    if (digits === DEFAULT_ADMIN_PHONE) setIsAdminPhone(true)
    let cancelled = false
    const timer = setTimeout(() => {
      api.checkAdminPhone(loginPhone)
        .then((result) => { if (!cancelled) setIsAdminPhone(Boolean(result.isAdmin)) })
        .catch(() => { if (!cancelled) setIsAdminPhone(false) })
    }, 250)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [loginPhone])

  const sendOtpTo = (phone, onError, flow = otpFlow) => {
    return api.sendOtp(phone, flow)
      .then((result) => {
        setResendCooldown(result.retryAfter ?? 60)
        return true
      })
      .catch((err) => {
        const message = String(err.message || '')
        const cooldown = message.match(/(\d+)\s*soniya/)
        if (cooldown) {
          setResendCooldown(Number(cooldown[1]))
          return true
        }
        onError(message)
        return false
      })
  }

  const beginTelegramLink = (user, flow, onError) => {
    return api.createTelegramLink(user.phone, flow)
      .then((link) => {
        setPendingUser(user)
        setOtpFlow(flow)
        setTelegramLink({ ...link, status: 'PENDING' })
        setLoading(false)
        goTo('telegram-link')
        window.open(link.botUrl, '_blank', 'noopener,noreferrer')
        return true
      })
      .catch((err) => {
        setLoading(false)
        onError(err.message)
        return false
      })
  }

  const handleLoginSubmit = async () => {
    const digits = loginPhone.replace(/\D/g, '')
    if (digits.length < 12) { setLoginError(t.invalidPhone); return }
    setLoginError('')

    setLoading(true)
    let adminDetected = isAdminPhone || digits === DEFAULT_ADMIN_PHONE
    try {
      const result = await api.checkAdminPhone(loginPhone)
      adminDetected = Boolean(result.isAdmin)
      setIsAdminPhone(adminDetected)
    } catch (error) {
      if (!adminDetected) {
        setLoading(false)
        setLoginError(error.message || "Admin telefoni tekshirilmadi. Qayta urinib ko'ring.")
        return
      }
    }

    if (adminDetected) {
      if (!adminPassword) {
        setLoading(false)
        setAdminPasswordError(t.passwordRequired)
        return
      }
      setAdminPasswordError('')
      try {
        const result = await api.adminLogin(loginPhone, adminPassword)
        setLoading(false)
        onSuccess(result.user)
      } catch (error) {
        setLoading(false)
        setAdminPasswordError(error.message || "Parol noto'g'ri.")
      }
      return
    }

    api.sendOtp(loginPhone, 'login')
          .then((result) => {
            setLoading(false)
            setResendCooldown(result.retryAfter ?? 60)
            setPendingUser({ phone: loginPhone })
            setOtpFlow('login')
            setOtp(['', '', '', '', '', ''])
            setOtpDone(false)
            setOtpError('')
            goTo('otp')
          })
          .catch((err) => {
            if (String(err.message).includes('ulanmagan')) {
              return beginTelegramLink({ phone: loginPhone }, 'login', setLoginError)
            }
            setLoading(false)
            setLoginError(err.message)
          })
  }

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  useEffect(() => {
    if (view !== 'telegram-link' || !telegramLink?.token || telegramLink.status !== 'PENDING') return
    let cancelled = false
    const checkStatus = async () => {
      try {
        const status = await api.getTelegramLinkStatus(telegramLink.token)
        if (cancelled) return
        if (status.connected) {
          const sent = await sendOtpTo(pendingUser.phone, setOtpError, otpFlow)
          if (!cancelled && sent) {
            setTelegramLink((current) => ({ ...current, status: 'CONNECTED' }))
            setOtp(['', '', '', '', '', ''])
            setOtpDone(false)
            goTo('otp')
          }
        } else if (status.status === 'EXPIRED') {
          setTelegramLink((current) => ({ ...current, status: 'EXPIRED' }))
        }
      } catch (err) {
        if (!cancelled) setOtpError(err.message)
      }
    }
    checkStatus()
    const timer = setInterval(checkStatus, 2500)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
    // sendOtpTo/goTo intentionally use the latest render state; adding them would
    // recreate the polling interval on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, telegramLink?.token, telegramLink?.status, pendingUser?.phone, otpFlow])

  const handleRegSubmit = () => {
    const errs = {}
    if (!reg.firstName.trim()) errs.firstName = t.required
    if (!reg.lastName.trim())  errs.lastName  = t.required
    if (!reg.level)            errs.level     = t.required
    const digits = reg.phone.replace(/\D/g, '')
    if (digits.length < 12)   errs.phone     = t.invalidPhone
    if (Object.keys(errs).length > 0) { setRegErrors(errs); return }

    setLoading(true)
    const userData = {
          id: genId(),
          firstName: reg.firstName, lastName: reg.lastName, level: reg.level, phone: reg.phone,
          role: 'USER', isActive: true, isPaid: false, premium: false,
          createdAt: new Date().toLocaleDateString('uz-UZ'), lastLogin: '—',
        }
    beginTelegramLink(
      userData,
      'register',
      (msg) => setRegErrors((e) => ({ ...e, phone: msg })),
    )
  }

  const verifyCode = (fullCode) => {
    setVerifying(true)
    setOtpError('')
    api.verifyOtp(
      pendingUser.phone,
      fullCode,
      otpFlow,
      otpFlow === 'register' ? pendingUser : undefined,
    )
      .then(({ user: authenticatedUser }) => {
        setVerifying(false)
        setOtpDone(true)
        setTimeout(() => onSuccess(authenticatedUser), 500)
      })
      .catch((err) => {
        setVerifying(false)
        setOtpError(err.message || "Kod noto'g'ri.")
        setOtp(['','','','','',''])
        otpRefs.current[0]?.focus()
      })
  }

  const handleOtpInput = (i, val) => {
    if (!/^\d?$/.test(val) || verifying) return
    const next = [...otp]; next[i] = val; setOtp(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
    if (next.every((d) => d !== '')) verifyCode(next.join(''))
  }
  const handleOtpKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }
  const handleOtpPaste = (e) => {
    e.preventDefault()
    if (verifying) return
    const p = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = [...otp]; p.split('').forEach((d, i) => { next[i] = d }); setOtp(next)
    otpRefs.current[Math.min(p.length, 5)]?.focus()
    if (p.length === 6) verifyCode(p)
  }
  const handleResend = () => {
    if (resendCooldown > 0 || !pendingUser) return
    setOtp(['','','','','',''])
    setOtpError('')
    sendOtpTo(pendingUser.phone, setOtpError, otpFlow)
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

                {isAdminPhone && (
                  <div className="mt-4">
                    <Field label={t.password} error={adminPasswordError}>
                      <input
                        type="password" value={adminPassword} placeholder={t.passwordPlaceholder}
                        onChange={(e) => { setAdminPassword(e.target.value); setAdminPasswordError('') }}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLoginSubmit() }}
                        className={inputClass(!!adminPasswordError)}
                        autoFocus
                      />
                    </Field>
                  </div>
                )}

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

                <div className="mb-5 rounded-2xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-sky-950/40">
                  <p className="text-sm font-semibold text-sky-800 dark:text-sky-200">{t.telegram.title}</p>
                  <p className="mt-1 text-xs leading-5 text-sky-700 dark:text-sky-300">{t.telegram.desc}</p>
                  {TELEGRAM_BOT_URL && (
                    <a
                      href={TELEGRAM_BOT_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-600"
                    >
                      {t.telegram.openBot}
                    </a>
                  )}
                </div>

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

            {/* ══ TELEGRAM LINK ══ */}
            {view === 'telegram-link' && (
              <div className={exiting ? 'animate-slideOut' : 'animate-slideIn'}>
                <button
                  onClick={() => goTo(otpFlow === 'login' ? 'login' : 'register', () => {
                    setTelegramLink(null)
                    setOtpError('')
                  })}
                  className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors mb-5 group"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium">{pendingUser?.phone}</span>
                </button>

                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-50 text-4xl dark:bg-sky-950/50">
                    {telegramLink?.status === 'EXPIRED' ? '⌛' : '✈️'}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {telegramLink?.status === 'EXPIRED' ? 'Havola muddati tugadi' : t.telegram.title}
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {telegramLink?.status === 'EXPIRED'
                      ? 'Xavfsizlik uchun yangi ulanish havolasini yarating.'
                      : 'Telegram ochilgach Start tugmasini bosing va shu telefon raqamini Contact tugmasi orqali yuboring. Sahifa ulanishni avtomatik aniqlaydi.'}
                  </p>

                  {otpError && <p className="mt-3 text-xs font-medium text-red-500">{otpError}</p>}

                  <a
                    href={telegramLink?.botUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3.5 font-bold text-white shadow-lg shadow-sky-100 transition hover:bg-sky-600 dark:shadow-none"
                  >
                    Telegram botni ochish
                  </a>
                  {telegramLink?.status === 'PENDING' && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                      <span className="spin inline-block h-4 w-4 rounded-full border-2 border-sky-200 border-t-sky-500" />
                      Botda tasdiqlashingiz kutilmoqda...
                    </div>
                  )}
                  {telegramLink?.status === 'EXPIRED' && (
                    <button
                      onClick={() => {
                        setLoading(true)
                        setOtpError('')
                        beginTelegramLink(pendingUser, otpFlow, setOtpError)
                      }}
                      disabled={loading}
                      className="mt-3 w-full rounded-xl border-2 border-sky-100 py-3 text-sm font-bold text-sky-600 transition hover:bg-sky-50 disabled:opacity-60 dark:border-sky-900 dark:hover:bg-sky-950"
                    >
                      Yangi havola yaratish
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ══ OTP ══ */}
            {view === 'otp' && (
              <div className={exiting ? 'animate-slideOut' : 'animate-slideIn'}>
                <button
                  onClick={() => goTo(otpFlow === 'login' ? 'login' : 'register', () => { setOtp(['','','','','','']); setOtpDone(false); setOtpError('') })}
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
                      <path d="M21.5 3.5L3.2 10.6c-1.25.5-1.24 1.2-.23 1.51l4.7 1.47 1.8 5.55c.22.62.11.87.76.87.5 0 .72-.23 1-.5l2.28-2.21 4.74 3.5c.87.48 1.5.23 1.72-.81L23.1 5.3c.32-1.3-.5-1.89-1.6-1.8z" stroke="#dc2626" strokeWidth="1.8" strokeLinejoin="round"/>
                      <path d="M7.67 13.58L19 6.43M9.47 19.13l.18-4.18L19 6.43" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t.otp.title}</h2>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">{t.otp.subtitle}</p>
                  <p className="text-red-600 font-semibold text-sm mt-0.5">{pendingUser?.phone}</p>
                </div>

                <div className="flex gap-1.5 sm:gap-2.5 justify-center mb-3">
                  {otp.map((digit, i) => (
                    <input key={i} ref={(el) => (otpRefs.current[i] = el)}
                      type="text" inputMode="numeric" maxLength={1} value={digit}
                      disabled={verifying}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKey(i, e)}
                      onPaste={i === 0 ? handleOtpPaste : undefined}
                      className={`w-9 sm:w-11 h-10 sm:h-[52px] text-center text-lg sm:text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200 dark:bg-gray-800 disabled:opacity-60 ${
                        otpDone ? 'border-green-400 bg-green-50 text-green-600 dark:bg-green-900/30'
                        : otpError ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/30'
                        : digit  ? 'border-red-400 bg-red-50 text-red-600 animate-otpPop dark:bg-red-900/30'
                                 : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:border-red-400'
                      }`}
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-center text-red-500 text-xs font-medium mb-4">{otpError}</p>
                )}
                {verifying && (
                  <p className="text-center text-gray-400 dark:text-gray-500 text-xs mb-4">Tekshirilmoqda...</p>
                )}

                <p className="text-center text-gray-400 dark:text-gray-500 text-sm">
                  {t.otp.resend}{' '}
                  {resendCooldown > 0 ? (
                    <span className="text-gray-400 dark:text-gray-500 font-semibold">{resendCooldown}s</span>
                  ) : (
                    <button onClick={handleResend} className="text-red-500 font-semibold hover:underline">
                      {t.otp.resendBtn}
                    </button>
                  )}
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
