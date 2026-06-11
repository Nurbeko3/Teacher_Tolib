import { useNavigate } from 'react-router-dom'

export default function PageLayout({ children, dark }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-500 dark:from-gray-950 dark:via-red-950 dark:to-gray-900 flex flex-col relative overflow-hidden">

      {/* Aurora background */}
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          background: dark ? 'rgba(17,24,39,0.88)' : 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors focus:outline-none active:scale-[0.96]"
          aria-label="Orqaga"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-sm font-semibold">Orqaga</span>
        </button>

        {/* Logo — navigates to home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 focus:outline-none active:scale-[0.96] transition-transform group"
          aria-label="Bosh sahifa"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-white font-bold text-[13px] group-hover:opacity-80 transition-opacity">Teacher Tolib</span>
        </button>
      </header>

      {/* Page content */}
      <div className="relative z-10 flex-1 flex flex-col pt-[56px]">
        {children}
      </div>
    </div>
  )
}
