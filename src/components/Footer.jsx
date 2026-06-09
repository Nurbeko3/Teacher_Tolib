export default function Footer({ animate = true }) {
  return (
    <div className={`${animate ? 'footer-anim' : ''} w-full px-5 pb-10 pt-2`}>
      <div
        className="rounded-3xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.16)' }}
      >
        {/* ── Contact section ── */}
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="flex items-center gap-3 mb-1.5">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.38 2 2 0 012.88 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] leading-tight">Biz bilan bog'lanish</h3>
              <p className="text-white/50 text-xs mt-0.5 leading-tight">Savollaringiz bo'lsa aloqaga chiqing</p>
            </div>
          </div>

          <a
            href="tel:+998901234567"
            className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 active:scale-[0.98] group"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">+998 90 123 45 67</span>
            <svg className="ml-auto opacity-40 group-hover:opacity-70 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── Social Media ── */}
        <div className="px-5 pt-5 pb-4">
          <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.14em] mb-3.5">Ijtimoiy tarmoqlar</p>

          <div className="flex gap-2.5 mb-2.5">
            <a href="https://t.me/teacher_tolib" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,158,217,0.25)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-white/85 text-xs font-semibold">Telegram</span>
            </a>
            <a href="https://instagram.com/teacher_tolib" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(225,48,108,0.25)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span className="text-white/85 text-xs font-semibold">Instagram</span>
            </a>
          </div>

          <div className="flex gap-2.5">
            <a href="https://youtube.com/@teacher_tolib" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,0,0,0.22)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="text-white/85 text-xs font-semibold">YouTube</span>
            </a>
            <a href="https://tiktok.com/@teacher_tolib" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/>
              </svg>
              <span className="text-white/85 text-xs font-semibold">TikTok</span>
            </a>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} className="px-5 py-3.5">
          <p className="text-center text-white/25 text-xs tracking-wide">Teacher Tolib © 2026</p>
        </div>
      </div>
    </div>
  )
}
