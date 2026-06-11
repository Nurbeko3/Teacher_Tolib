import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../Navbar'

const SECTIONS = [
  {
    id: 'listening',
    path: '/ielts/listening',
    label: 'Listening',
    color: '#2563eb',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 18v-6a9 9 0 0118 0v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'reading',
    path: '/ielts/reading',
    label: 'Reading',
    color: '#7c3aed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'writing',
    path: '/ielts/writing',
    label: 'Writing',
    color: '#059669',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'speaking',
    path: '/ielts/speaking',
    label: 'Speaking',
    color: '#dc2626',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export { SECTIONS }

export default function IELTSLayout({ dark, setDark, onLogout }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 dark:from-gray-950 dark:via-blue-950 dark:to-gray-900 flex flex-col">
      <Navbar dark={dark} setDark={setDark} onLogout={onLogout} />

      <div className="flex flex-1 pt-16">
        {/* ── Sidebar (desktop) ── */}
        <aside
          className="hidden sm:flex flex-col w-[220px] flex-shrink-0"
          style={{
            background: 'linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)',
            borderRight: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {/* Back to courses */}
          <div className="px-4 pt-4 pb-2">
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-1.5 text-white/50 hover:text-white/90 transition-colors focus:outline-none text-[11.5px] font-semibold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              Kurslar
            </button>
          </div>

          {/* IELTS brand */}
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
            <button
              onClick={() => navigate('/ielts')}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.28)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="10" r="8" stroke="white" strokeWidth="2"/>
                  <path d="M8 10l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 18h10M12 18v3" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                </svg>
              </div>
              <div>
                <span className="block text-white font-extrabold text-[17px] leading-tight group-hover:opacity-90">IELTS</span>
                <span className="block text-white/50 text-[11px]">Bo'limni tanlang</span>
              </div>
            </button>
          </div>

          {/* Section nav */}
          <nav className="flex flex-col gap-1.5 px-3 py-4 flex-1">
            {SECTIONS.map((s) => (
              <NavLink
                key={s.id}
                to={s.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 focus:outline-none group ${
                    isActive
                      ? 'text-white'
                      : 'text-white/65 hover:text-white'
                  }`
                }
                style={({ isActive }) => ({
                  background: isActive ? 'rgba(255,255,255,0.22)' : 'transparent',
                  border: `1.5px solid ${isActive ? 'rgba(255,255,255,0.4)' : 'transparent'}`,
                })}
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'}>
                      {s.icon}
                    </span>
                    <span className="font-semibold text-[13.5px]">{s.label}</span>
                    {isActive && (
                      <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="px-5 pb-5">
            <p className="text-white/25 text-[10.5px] text-center">Batafsil uchun ustozga murojaat qiling</p>
          </div>
        </aside>

        {/* ── Mobile top back bar ── */}
        <div
          className="sm:hidden fixed top-16 left-0 right-0 z-40 flex items-center px-4 py-2"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.14)',
          }}
        >
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors focus:outline-none text-[12px] font-semibold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            Kurslar
          </button>
          <span className="mx-auto font-extrabold text-white text-[15px] tracking-wide">IELTS</span>
          <div className="w-[52px]" />
        </div>

        {/* ── Mobile bottom tab bar ── */}
        <nav
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
            borderTop: '1px solid rgba(255,255,255,0.14)',
          }}
        >
          {SECTIONS.map((s) => (
            <NavLink
              key={s.id}
              to={s.path}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 focus:outline-none"
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'rgba(255,255,255,0.45)',
                background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
              })}
            >
              {s.icon}
              <span className="text-[9px] font-bold">{s.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto pb-20 sm:pb-0 pt-10 sm:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
