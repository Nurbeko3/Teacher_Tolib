import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Reveal, StaggerGroup, StaggerItem } from './shared'
import teacher2ImgDefault from '../../assets/teacher2.jpeg'
import { api } from '../../api'

const TEACHER_VIDEO = null

const ACHIEVEMENTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="10" r="8" stroke="#FF0000" strokeWidth="1.8"/>
        <path d="M8 10l3 3 5-5" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 18h10M12 18v3" stroke="#FF0000" strokeWidth="1.8" strokeLinecap="round" opacity="0.7"/>
      </svg>
    ),
    value: 'IELTS 8.0',
    label: 'Personal Band Score',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#FF0000" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="#FF0000" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    value: '6+ Years',
    label: 'Teaching Experience',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#FF0000" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="#FF0000" strokeWidth="1.8"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#FF0000" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    value: '1,200+',
    label: 'Students Taught',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#FF0000" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M22 4L12 14.01l-3-3" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: '90+',
    label: 'Successful Results',
  },
]

/* ── floating particles ── */
const PARTICLES = [
  { x: '10%',  y: '15%', size: 3,   delay: 0    },
  { x: '85%',  y: '20%', size: 2,   delay: 1.2  },
  { x: '20%',  y: '80%', size: 4,   delay: 0.6  },
  { x: '75%',  y: '75%', size: 2.5, delay: 1.8  },
  { x: '50%',  y: '10%', size: 2,   delay: 0.9  },
  { x: '90%',  y: '55%', size: 3,   delay: 2.1  },
]

function MediaCard() {
  const [TEACHER_PHOTO, setTeacherPhoto] = useState(teacher2ImgDefault)

  useEffect(() => {
    api.getProfile()
      .then(profile => { if (profile?.aboutImage) setTeacherPhoto(profile.aboutImage) })
      .catch(() => {})
  }, [])
  return (
    <div className="relative w-full" style={{ maxWidth: 460 }}>
      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-[32px] pointer-events-none"
        style={{
          inset: '-24px',
          background: 'radial-gradient(ellipse, rgba(255,0,0,0.38) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: '#FF0000',
            boxShadow: `0 0 ${p.size * 3}px rgba(255,0,0,0.8)`,
          }}
        />
      ))}

      {/* Main media card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full"
      >
        {/* Neon border frame */}
        <div
          className="rounded-[28px] p-[2px]"
          style={{
            background: 'linear-gradient(135deg, #FF0000 0%, rgba(255,0,0,0.45) 50%, #FF0000 100%)',
            boxShadow:
              '0 0 40px rgba(255,0,0,0.8), 0 0 80px rgba(255,0,0,0.4), 0 0 120px rgba(255,0,0,0.2)',
          }}
        >
          <div
            className="rounded-[26px] overflow-hidden relative"
            style={{
              background: 'linear-gradient(160deg, #1c0505 0%, #2a0808 45%, #1c0505 100%)',
              aspectRatio: '4/5',
            }}
          >
            {TEACHER_VIDEO ? (
              /* ── Video embed ── */
              <iframe
                src={TEACHER_VIDEO}
                title="Teacher Tolib"
                className="w-full h-full"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : TEACHER_PHOTO ? (
              /* ── Photo ── */
              <img
                src={TEACHER_PHOTO}
                alt="Teacher Tolib"
                className="w-full h-full object-cover"
              />
            ) : (
              /* ── Placeholder ── */
              <>
                {/* Grid lines decoration */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),' +
                      'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Center avatar */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,0,0,0.5) 0%, transparent 70%)',
                        transform: 'scale(1.5)',
                      }}
                    />
                    <div
                      className="relative w-32 h-32 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #7f1d1d 0%, #FF0000 100%)',
                        boxShadow: '0 0 40px rgba(255,0,0,0.7)',
                        border: '3px solid rgba(255,100,100,0.4)',
                      }}
                    >
                      <span className="text-6xl font-black text-white select-none">T</span>
                    </div>
                  </div>

                  <div className="text-center px-6">
                    <p className="text-white font-black text-[20px] tracking-wide">Teacher Tolib</p>
                    <p className="text-[13px] font-medium mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      English &amp; IELTS Coach
                    </p>
                  </div>

                  {/* Status badge */}
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80' }}
                    />
                    <span className="text-[12px] font-semibold" style={{ color: '#4ade80' }}>
                      Available for new students
                    </span>
                  </div>
                </div>

                {/* Corner decorations */}
                <div
                  className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,0,0,0.12)', border: '1px solid rgba(255,0,0,0.25)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"
                      stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"
                      stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Bottom band score chip */}
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,0,0,0.25)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#FF0000"
                        style={{ filter: 'drop-shadow(0 0 3px rgba(255,0,0,0.7))' }}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-black text-[14px]">Band 8.0</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Floating info chip — top left */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -top-4 -left-6 px-4 py-2.5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
          }}
        >
          <span className="block text-[10.5px] font-medium uppercase tracking-wider"
            style={{ color: 'rgba(255,255,255,0.5)' }}>Experience</span>
          <span className="block text-white font-black text-[18px] leading-tight">6+ Years</span>
        </motion.div>

        {/* Floating info chip — bottom right */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          className="absolute -bottom-4 -right-6 px-4 py-2.5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
          }}
        >
          <span className="block text-[10.5px] font-medium uppercase tracking-wider"
            style={{ color: 'rgba(255,255,255,0.5)' }}>Students</span>
          <span className="block text-white font-black text-[18px] leading-tight">1,200+</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden scroll-mt-20 py-24 lg:py-32 px-5 sm:px-8 lg:px-12"
      style={{ background: '#000000' }}
    >
      {/* ── Subtle background lighting ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute"
          style={{
            top: '30%', left: '-10%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute"
          style={{
            bottom: '10%', right: '-5%',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,0,0.25) 0%, transparent 70%)',
          }}
        />
        {/* Separator line at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '60%', height: 1,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.4) 50%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">

        {/* ── Section label ── */}
        <Reveal className="text-center mb-4">
          <span
            className="inline-block text-[11px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full"
            style={{
              color: '#FF0000',
              background: 'rgba(255,0,0,0.08)',
              border: '1px solid rgba(255,0,0,0.22)',
            }}
          >
            About Me
          </span>
        </Reveal>

        {/* ── Two-column grid ── */}
        <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Left: media card ── */}
          <Reveal delay={0.1} className="flex-1 w-full flex justify-center lg:justify-end">
            <MediaCard />
          </Reveal>

          {/* ── Right: content ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Main heading */}
            <Reveal delay={0.05}>
              <h2
                className="font-black leading-[1.08] tracking-tight text-white"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}
              >
                Meet{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FF0000 0%, #ff5555 55%, #FF0000 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(255,0,0,0.6))',
                  }}
                >
                  Teacher Tolib
                </span>
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.15}>
              <p
                className="mt-5 text-[15px] sm:text-[16px] leading-[1.82] max-w-lg mx-auto lg:mx-0"
                style={{ color: 'rgba(255,255,255,0.58)' }}
              >
                With over 6 years of hands-on teaching experience and a personal
                IELTS Band 8.0, Teacher Tolib has built a reputation for turning
                ambitious students into confident English speakers and high achievers.
                His structured, student-focused method has helped more than 1,200 learners
                across Uzbekistan reach their academic and professional goals — from
                mastering everyday conversation to securing their dream IELTS score.
              </p>
            </Reveal>

            {/* Divider */}
            <Reveal delay={0.2}>
              <div
                className="my-7 mx-auto lg:mx-0"
                style={{
                  width: 60, height: 2, borderRadius: 2,
                  background: 'linear-gradient(90deg, #FF0000, transparent)',
                  boxShadow: '0 0 12px rgba(255,0,0,0.5)',
                }}
              />
            </Reveal>

            {/* Achievements grid */}
            <StaggerGroup className="grid grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
              {ACHIEVEMENTS.map((a) => (
                <StaggerItem key={a.value}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      backdropFilter: 'blur(8px)',
                      transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background    = 'rgba(255,0,0,0.07)'
                      e.currentTarget.style.borderColor   = 'rgba(255,0,0,0.28)'
                      e.currentTarget.style.boxShadow     = '0 4px 24px rgba(255,0,0,0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background    = 'rgba(255,255,255,0.04)'
                      e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.09)'
                      e.currentTarget.style.boxShadow     = 'none'
                    }}
                  >
                    {/* Icon box */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(255,0,0,0.1)',
                        border: '1px solid rgba(255,0,0,0.22)',
                      }}
                    >
                      {a.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="block text-white font-black text-[16px] leading-tight">
                        {a.value}
                      </span>
                      <span
                        className="block text-[11px] font-medium mt-0.5 leading-tight"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        {a.label}
                      </span>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* CTA hint */}
            <Reveal delay={0.35}>
              <div className="mt-8 flex items-center gap-3 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-[14px] text-white"
                  style={{
                    background: 'linear-gradient(135deg, #b91c1c 0%, #FF0000 100%)',
                    boxShadow: '0 0 24px rgba(255,0,0,0.45), 0 4px 14px rgba(255,0,0,0.3)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                    <path d="M12 8v4l2.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Book a Trial Lesson
                </motion.button>

                <a
                  href="#courses"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-[14px] font-semibold transition-colors duration-200 flex items-center gap-1.5"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'white' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >
                  View Courses
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  )
}
