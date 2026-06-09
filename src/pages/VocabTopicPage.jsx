import Navbar from '../Navbar'
import Footer from '../components/Footer'

export default function VocabTopicPage({ dark, setDark, onBack, onLogout, topic, label, emoji }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-500 dark:from-gray-950 dark:via-red-950 dark:to-gray-900 flex flex-col relative overflow-hidden">

      <Navbar dark={dark} setDark={setDark} onLogout={onLogout} />

      {/* Aurora */}
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <div className="px-5 pt-20 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 active:scale-[0.97]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Orqaga</span>
          </button>
        </div>

        {/* Placeholder */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 -mt-16">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 text-4xl"
            style={{ background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.3)' }}
          >
            {emoji || '📝'}
          </div>

          <div
            className="px-5 py-2 rounded-2xl mb-4"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <span className="text-white font-extrabold text-lg">
              {label || topic || 'Vocabulary'}
            </span>
          </div>

          <h1 className="text-white font-extrabold text-2xl text-center mb-3">
            Test tez orada!
          </h1>
          <p className="text-white/60 text-sm text-center max-w-xs leading-relaxed">
            Bu bo'lim hozirda tayyorlanmoqda. Tez orada to'liq lug'at testi qo'shiladi.
          </p>
        </div>

        <div className="mt-8">
          <Footer animate={false} />
        </div>
      </div>
    </div>
  )
}
