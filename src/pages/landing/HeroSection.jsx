import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'
import teacherImgDefault from '../../assets/teacher.jpeg'
import { api } from '../../api'

const langs = { en, uz, ru }

export default function HeroSection({ onLogin, lang = 'en' }) {
  const t = (langs[lang] || langs.en).landing.hero
  const [heroImg, setHeroImg] = useState(teacherImgDefault)

  useEffect(() => {
    api.getProfile()
      .then(profile => { if (profile?.heroImage) setHeroImg(profile.heroImage) })
      .catch(() => {})
  }, [])

  const STATS = [
    { v: t.stat1v, l: t.stat1l },
    { v: t.stat2v, l: t.stat2l },
    { v: t.stat3v, l: t.stat3l },
  ]

  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ background: '#000000' }}
    >

      {/* ── Atmospheric background lighting ── */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.28, 0.48, 0.28] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute"
          style={{
            top: '-15%', left: '-10%',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,0,0.38) 0%, transparent 68%)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.18, 0.36, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute"
          style={{
            bottom: '-20%', right: '-8%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,0,0.32) 0%, transparent 68%)',
          }}
        />
        <motion.div
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 900, height: 420, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,0,0,0.14) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.035,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12 pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">

          {/* ───────── Left: copy ───────── */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.1 }}
              className="font-black tracking-tight"
              style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)', lineHeight: 1.08 }}
            >
              <span className="block text-white">{t.line1}</span>
              <span className="block">
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>{t.line2prefix}</span>
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FF0000 0%, #ff5555 55%, #FF0000 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 24px rgba(255,0,0,0.7))',
                  }}
                >
                  {t.line2accent}
                </span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-7 text-[15px] sm:text-[17px] leading-[1.78] max-w-xl mx-auto lg:mx-0"
              style={{ color: 'rgba(255,255,255,0.58)' }}
            >
              {t.desc}
            </motion.p>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.34 }}
              className="mt-10 flex justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.055, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onLogin}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[15px] text-white"
                style={{
                  background: 'linear-gradient(135deg, #b91c1c 0%, #FF0000 60%, #ff4444 100%)',
                  boxShadow: '0 0 32px rgba(255,0,0,0.55), 0 0 64px rgba(255,0,0,0.22), 0 8px 24px rgba(255,0,0,0.45)',
                  transition: 'box-shadow 0.3s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 48px rgba(255,0,0,0.75), 0 0 80px rgba(255,0,0,0.35), 0 10px 28px rgba(255,0,0,0.55)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 32px rgba(255,0,0,0.55), 0 0 64px rgba(255,0,0,0.22), 0 8px 24px rgba(255,0,0,0.45)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                  <path d="M12 8v4l2.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {t.cta}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-11 flex items-center gap-6 justify-center lg:justify-start flex-wrap"
            >
              {STATS.map((stat, i) => (
                <div key={i} className="flex items-center gap-5">
                  {i > 0 && (
                    <div
                      className="w-px h-9 flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.14)' }}
                    />
                  )}
                  <div>
                    <span className="block font-black text-[22px] text-white leading-none">
                      {stat.v}
                    </span>
                    <span
                      className="block text-[11px] font-semibold mt-1 uppercase tracking-wider"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {stat.l}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ───────── Right: teacher image ───────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.86, x: 32 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center">

              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 400, height: 400,
                  background: 'radial-gradient(circle, rgba(255,0,0,0.45) 0%, transparent 70%)',
                }}
              />

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div
                  className="rounded-full p-[3px] relative"
                  style={{
                    background: 'linear-gradient(135deg, #FF0000 0%, #ff6666 50%, #FF0000 100%)',
                    boxShadow: '0 0 32px rgba(255,0,0,0.9), 0 0 64px rgba(255,0,0,0.5), 0 0 100px rgba(255,0,0,0.25)',
                  }}
                >
                  <div
                    className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                  >
                    <img
                      src={heroImg}
                      alt="Teacher Tolib"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Floating badge — IELTS score */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="absolute -top-5 -right-8 px-3.5 py-2.5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <span className="block text-white font-black text-[14px] leading-tight">
                    IELTS 8.0
                  </span>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#FF0000"
                        style={{ filter: 'drop-shadow(0 0 3px rgba(255,0,0,0.7))' }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </motion.div>

                {/* Floating badge — student count */}
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
                  className="absolute -bottom-5 -left-10 px-3.5 py-2.5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <span
                    className="block text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {t.stat1l}
                  </span>
                  <span className="block text-white font-black text-[19px] leading-tight">
                    {t.stat1v}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
