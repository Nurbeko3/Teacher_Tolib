import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'

export default function PageLayout({ children, dark, backPath, lang = 'uz' }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (backPath) navigate(backPath)
    else navigate(-1)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: dark ? '#111827' : 'white' }}>

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
          background: dark ? 'rgba(17,24,39,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: dark ? '1px solid rgba(55,65,81,0.5)' : '1px solid rgba(220,38,38,0.15)',
        }}
      >
        {/* Back button */}
        <BackButton onClick={handleBack} lang={lang} />

        {/* Logo — navigates to home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 focus:outline-none active:scale-[0.96] transition-transform group"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-[13px] group-hover:opacity-80 transition-opacity" style={{ color: '#dc2626' }}>Teacher Tolib</span>
        </button>
      </header>

      {/* Page content */}
      <div className="relative z-10 flex-1 flex flex-col pt-[56px]">
        {children}
      </div>
    </div>
  )
}
