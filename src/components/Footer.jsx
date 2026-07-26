import { useState, useEffect } from 'react'
import { api } from '../api'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'
import { PLATFORMS, DEFAULT_SOCIALS } from '../socials'

const langs = { en, uz, ru }

function SocialIcon({ platform, size = 19, color = '#dc2626' }) {
  const p = PLATFORMS[platform] || PLATFORMS.other
  if (p.stroke) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d={p.path} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d={p.path}/>
    </svg>
  )
}

export default function Footer({ animate = true, dark = false, lang = 'uz' }) {
  const t = (langs[lang] || langs.uz).footer

  const [socials, setSocials] = useState(DEFAULT_SOCIALS)

  useEffect(() => {
    const refresh = () => api.getSocials().then(data => { if (data.length > 0) setSocials(data) }).catch(() => {})
    refresh()
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [])

  const cardBg     = dark ? '#1f2937' : 'white'
  const cardBorder = dark ? 'rgba(55,65,81,0.6)' : '#fecaca'
  const wrapBg     = dark ? '#111827' : '#fff1f2'
  const wrapBorder = dark ? 'rgba(55,65,81,0.5)' : '#fecaca'
  const iconBg     = dark ? 'rgba(220,38,38,0.15)' : '#fee2e2'
  const subText    = dark ? '#9ca3af' : '#6b7280'
  const hoverBg    = dark ? '#374151' : '#ffe4e6'

  const rows = []
  for (let i = 0; i < socials.length; i += 2) {
    rows.push(socials.slice(i, i + 2))
  }

  return (
    <div className={`${animate ? 'footer-anim' : ''} w-full px-5 pb-10 pt-2`}>
      <div className="rounded-3xl overflow-hidden" style={{ background: wrapBg, border: `1px solid ${wrapBorder}` }}>

        {/* ── Contact section ── */}
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: `1px solid ${wrapBorder}` }}>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.38 2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[15px] leading-tight" style={{ color: '#dc2626' }}>{t.contact}</h3>
              <p className="text-xs mt-0.5 leading-tight" style={{ color: subText }}>{t.contactDesc}</p>
            </div>
          </div>

          <a
            href="tel:+998901234567"
            className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 active:scale-[0.98] group"
            style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            onMouseEnter={e => { e.currentTarget.style.background = hoverBg }}
            onMouseLeave={e => { e.currentTarget.style.background = cardBg }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#dc2626">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
            </div>
            <span className="font-semibold text-sm tracking-wide" style={{ color: '#dc2626' }}>+998 90 123 45 67</span>
            <svg className="ml-auto opacity-40 group-hover:opacity-70 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#9ca3af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── Social Media (dynamic from admin) ── */}
        {socials.length > 0 && (
          <div className="px-5 pt-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3.5" style={{ color: subText }}>{t.social}</p>

            <div className="flex flex-col gap-2.5">
              {rows.map((row, ri) => (
                <div key={ri} className="flex gap-2.5">
                  {row.map(s => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
                      style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                      onMouseEnter={e => { e.currentTarget.style.background = hoverBg }}
                      onMouseLeave={e => { e.currentTarget.style.background = cardBg }}
                    >
                      <SocialIcon platform={s.platform} />
                      <span className="text-xs font-semibold" style={{ color: '#dc2626' }}>{s.label}</span>
                    </a>
                  ))}
                  {row.length === 1 && <div className="flex-1" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Copyright ── */}
        <div style={{ borderTop: `1px solid ${wrapBorder}` }} className="px-5 py-3.5">
          <p className="text-center text-xs tracking-wide" style={{ color: subText }}>{t.copyright}</p>
        </div>
      </div>
    </div>
  )
}
