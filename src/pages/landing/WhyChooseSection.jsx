import { Reveal, StaggerGroup, StaggerItem } from './shared'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const ITEM_KEYS = ['ielts', 'speaking', 'grammar', 'vocabulary', 'cefr', 'strategies', 'feedback', 'progress']

/* ── Per-card icon (small, inside content area) ── */
const ICONS = {
  ielts: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="10" r="8" stroke="white" strokeWidth="2"/>
      <path d="M8 10l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  speaking: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  grammar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  vocabulary: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cefr: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M18 20V10M12 20V4M6 20v-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  strategies: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  feedback: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  progress: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 3v18h18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14l4-4 3 3 5-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

/* ── Per-card illustrations (SVG art, no text dependency) ── */
const ILLUSTRATIONS = {

  /* IELTS Test Report Form */
  ielts: (
    <svg viewBox="0 0 160 110" fill="none" className="w-full h-full">
      <circle cx="145" cy="18" r="32" fill="rgba(220,38,38,0.06)"/>
      <circle cx="18"  cy="96" r="24" fill="rgba(220,38,38,0.05)"/>
      {/* Paper */}
      <rect x="30" y="10" width="100" height="90" rx="7" fill="white" stroke="#fca5a5" strokeWidth="1.5"/>
      {/* Red header */}
      <rect x="30" y="10" width="100" height="26" rx="7" fill="#dc2626"/>
      <rect x="30" y="26" width="100" height="10" fill="#dc2626"/>
      {/* "IELTS" label bar */}
      <rect x="52" y="19" width="56" height="5" rx="2.5" fill="rgba(255,255,255,0.75)"/>
      {/* Big score */}
      <rect x="56" y="46" width="30" height="22" rx="4" fill="#fef2f2"/>
      <rect x="60" y="50" width="22" height="14" rx="2" fill="#dc2626"/>
      {/* Score dots / bars representing 7.5 */}
      <rect x="63" y="53" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.8)"/>
      <rect x="63" y="59" width="10" height="3" rx="1.5" fill="rgba(255,255,255,0.5)"/>
      {/* Right badge */}
      <circle cx="110" cy="57" r="14" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5"/>
      <rect x="104" y="54" width="12" height="2.5" rx="1.25" fill="#dc2626"/>
      <rect x="106" y="59" width="8" height="2.5" rx="1.25" fill="#fca5a5"/>
      {/* Bottom lines */}
      <rect x="38" y="82" width="84" height="2.5" rx="1.25" fill="#fecaca"/>
      <rect x="38" y="88" width="60" height="2" rx="1" fill="#fee2e2"/>
      <rect x="38" y="94" width="72" height="2" rx="1" fill="#fef2f2"/>
    </svg>
  ),

  /* Microphone + sound waves */
  speaking: (
    <svg viewBox="0 0 160 110" fill="none" className="w-full h-full">
      {/* Outer waves */}
      <path d="M42 28 Q28 55 42 82" stroke="#fecaca" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 18 Q10 55 30 92" stroke="#fee2e2" strokeWidth="2" strokeLinecap="round"/>
      <path d="M118 28 Q132 55 118 82" stroke="#fecaca" strokeWidth="2" strokeLinecap="round"/>
      <path d="M130 18 Q150 55 130 92" stroke="#fee2e2" strokeWidth="2" strokeLinecap="round"/>
      {/* Inner waves */}
      <path d="M52 36 Q42 55 52 74" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M108 36 Q118 55 108 74" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Mic capsule */}
      <rect x="66" y="14" width="28" height="46" rx="14" fill="#dc2626"/>
      {/* Mic grille lines */}
      <rect x="72" y="26" width="16" height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)"/>
      <rect x="72" y="33" width="16" height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)"/>
      <rect x="72" y="40" width="16" height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)"/>
      {/* Mic stand arm */}
      <path d="M80 60 C80 72 80 78 80 84" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round"/>
      {/* Base */}
      <path d="M64 84 Q80 90 96 84" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),

  /* Open book */
  grammar: (
    <svg viewBox="0 0 160 110" fill="none" className="w-full h-full">
      {/* Book shadow */}
      <ellipse cx="80" cy="104" rx="58" ry="5" fill="rgba(220,38,38,0.08)"/>
      {/* Book cover */}
      <rect x="12" y="18" width="136" height="82" rx="6" fill="#b91c1c"/>
      {/* Spine */}
      <rect x="70" y="18" width="20" height="82" rx="2" fill="#991b1b"/>
      {/* Left page */}
      <rect x="18" y="23" width="52" height="72" rx="3" fill="white"/>
      {/* Left text lines */}
      <rect x="26" y="34" width="36" height="2.5" rx="1.25" fill="#fecaca"/>
      <rect x="26" y="40" width="28" height="2" rx="1"    fill="#fee2e2"/>
      <rect x="26" y="46" width="34" height="2.5" rx="1.25" fill="#fecaca"/>
      <rect x="26" y="52" width="24" height="2" rx="1"    fill="#fee2e2"/>
      <rect x="26" y="58" width="32" height="2.5" rx="1.25" fill="#fecaca"/>
      <rect x="26" y="64" width="20" height="2" rx="1"    fill="#fee2e2"/>
      <rect x="26" y="70" width="30" height="2.5" rx="1.25" fill="#fecaca"/>
      <rect x="26" y="76" width="26" height="2" rx="1"    fill="#fee2e2"/>
      <rect x="26" y="82" width="36" height="2.5" rx="1.25" fill="#fecaca"/>
      {/* Right page */}
      <rect x="90" y="23" width="52" height="72" rx="3" fill="white"/>
      {/* Right text lines */}
      <rect x="98" y="34" width="36" height="2.5" rx="1.25" fill="#fecaca"/>
      <rect x="98" y="40" width="26" height="2" rx="1"    fill="#fee2e2"/>
      {/* Highlighted grammar rule */}
      <rect x="98" y="46" width="36" height="9" rx="3" fill="#fecaca"/>
      <rect x="101" y="49" width="20" height="2.5" rx="1.25" fill="#dc2626"/>
      <rect x="98" y="59" width="30" height="2.5" rx="1.25" fill="#fecaca"/>
      <rect x="98" y="65" width="22" height="2" rx="1"    fill="#fee2e2"/>
      <rect x="98" y="71" width="34" height="2.5" rx="1.25" fill="#fecaca"/>
      <rect x="98" y="77" width="18" height="2" rx="1"    fill="#fee2e2"/>
      <rect x="98" y="83" width="28" height="2.5" rx="1.25" fill="#fecaca"/>
    </svg>
  ),

  /* Stacked flashcards */
  vocabulary: (
    <svg viewBox="0 0 160 110" fill="none" className="w-full h-full">
      {/* Back card */}
      <g transform="rotate(-8 80 60)">
        <rect x="28" y="22" width="104" height="64" rx="8" fill="#fca5a5"/>
      </g>
      {/* Mid card */}
      <g transform="rotate(-3 80 60)">
        <rect x="28" y="22" width="104" height="64" rx="8" fill="#fee2e2"/>
      </g>
      {/* Front card */}
      <rect x="28" y="22" width="104" height="64" rx="8" fill="white" stroke="#fca5a5" strokeWidth="1.5"/>
      {/* "Word" label bar */}
      <rect x="40" y="36" width="80" height="8" rx="4" fill="#dc2626"/>
      {/* Translation lines */}
      <rect x="44" y="52" width="72" height="3" rx="1.5" fill="#fecaca"/>
      <rect x="50" y="59" width="60" height="3" rx="1.5" fill="#fee2e2"/>
      <rect x="44" y="66" width="72" height="3" rx="1.5" fill="#fecaca"/>
      {/* Star badge top-right */}
      <circle cx="120" cy="30" r="11" fill="#dc2626"/>
      <polygon points="120,23 122,28 128,28 123,32 125,38 120,34 115,38 117,32 112,28 118,28" fill="white"/>
    </svg>
  ),

  /* CEFR level staircase bars */
  cefr: (
    <svg viewBox="0 0 160 110" fill="none" className="w-full h-full">
      {/* Axes */}
      <line x1="18" y1="10" x2="18" y2="92" stroke="#fecaca" strokeWidth="1.5"/>
      <line x1="18" y1="92" x2="152" y2="92" stroke="#fecaca" strokeWidth="1.5"/>
      {/* A1 */}
      <rect x="24" y="80" width="16" height="12" rx="3" fill="#fecaca"/>
      {/* A2 */}
      <rect x="44" y="70" width="16" height="22" rx="3" fill="#fca5a5"/>
      {/* B1 */}
      <rect x="64" y="58" width="16" height="34" rx="3" fill="#f87171"/>
      {/* B2 */}
      <rect x="84" y="46" width="16" height="46" rx="3" fill="#ef4444"/>
      {/* C1 */}
      <rect x="104" y="32" width="16" height="60" rx="3" fill="#dc2626"/>
      {/* C2 */}
      <rect x="124" y="16" width="16" height="76" rx="3" fill="#b91c1c"/>
      {/* Star at top of C2 */}
      <circle cx="132" cy="12" r="9" fill="#7f1d1d"/>
      <polygon points="132,6 133.5,10 138,10 134.5,12.5 135.5,17 132,14.5 128.5,17 129.5,12.5 126,10 130.5,10"
        fill="white"/>
    </svg>
  ),

  /* Bullseye / target + arrow */
  strategies: (
    <svg viewBox="0 0 160 110" fill="none" className="w-full h-full">
      {/* Rings */}
      <circle cx="80" cy="58" r="48" fill="#fef2f2" stroke="#fee2e2" strokeWidth="1.5"/>
      <circle cx="80" cy="58" r="36" fill="#fee2e2" stroke="#fecaca" strokeWidth="1.5"/>
      <circle cx="80" cy="58" r="24" fill="#fecaca" stroke="#fca5a5" strokeWidth="1.5"/>
      <circle cx="80" cy="58" r="12" fill="#dc2626"/>
      <circle cx="80" cy="58" r="5"  fill="white"/>
      {/* Arrow shaft */}
      <line x1="130" y1="8" x2="87" y2="51" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round"/>
      {/* Arrow fletching */}
      <path d="M130 8 L122 14 L132 18 Z" fill="#b91c1c"/>
      {/* Arrow tip */}
      <circle cx="85" cy="53" r="3" fill="#7f1d1d"/>
    </svg>
  ),

  /* Teacher + student chat bubbles */
  feedback: (
    <svg viewBox="0 0 160 110" fill="none" className="w-full h-full">
      {/* Teacher bubble */}
      <rect x="10" y="10" width="110" height="54" rx="14" fill="#dc2626"/>
      <path d="M24 64 L14 84 L46 64 Z" fill="#dc2626"/>
      {/* Text lines in teacher bubble */}
      <rect x="24" y="26" width="82" height="3.5" rx="1.75" fill="rgba(255,255,255,0.45)"/>
      <rect x="24" y="35" width="66" height="3.5" rx="1.75" fill="rgba(255,255,255,0.45)"/>
      <rect x="24" y="44" width="76" height="3.5" rx="1.75" fill="rgba(255,255,255,0.45)"/>
      {/* Checkmark badge */}
      <circle cx="130" cy="37" r="16" fill="white" stroke="#fca5a5" strokeWidth="1.5"/>
      <path d="M122 37 L128 43 L140 28" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Student reply bubble */}
      <rect x="52" y="74" width="98" height="30" rx="10" fill="white" stroke="#fca5a5" strokeWidth="1.5"/>
      <rect x="64" y="83" width="66" height="3" rx="1.5" fill="#fecaca"/>
      <rect x="64" y="91" width="48" height="3" rx="1.5" fill="#fee2e2"/>
    </svg>
  ),

  /* Progress line chart */
  progress: (
    <svg viewBox="0 0 160 110" fill="none" className="w-full h-full">
      {/* Grid */}
      <line x1="18" y1="10" x2="18" y2="92" stroke="#fecaca" strokeWidth="1"/>
      <line x1="18" y1="92" x2="152" y2="92" stroke="#fecaca" strokeWidth="1"/>
      <line x1="18" y1="72" x2="152" y2="72" stroke="#fee2e2" strokeWidth="1" strokeDasharray="4 4"/>
      <line x1="18" y1="52" x2="152" y2="52" stroke="#fee2e2" strokeWidth="1" strokeDasharray="4 4"/>
      <line x1="18" y1="32" x2="152" y2="32" stroke="#fee2e2" strokeWidth="1" strokeDasharray="4 4"/>
      {/* Area fill */}
      <path d="M30 84 L60 74 L90 60 L120 42 L148 22 L148 92 L30 92 Z"
        fill="rgba(220,38,38,0.09)"/>
      {/* Line */}
      <polyline
        points="30,84 60,74 90,60 120,42 148,22"
        stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Data points */}
      <circle cx="30"  cy="84" r="4" fill="white" stroke="#dc2626" strokeWidth="2"/>
      <circle cx="60"  cy="74" r="4" fill="white" stroke="#dc2626" strokeWidth="2"/>
      <circle cx="90"  cy="60" r="4" fill="white" stroke="#dc2626" strokeWidth="2"/>
      <circle cx="120" cy="42" r="4" fill="white" stroke="#dc2626" strokeWidth="2"/>
      {/* Top point with glow ring */}
      <circle cx="148" cy="22" r="10" fill="rgba(220,38,38,0.14)" stroke="#dc2626" strokeWidth="1"/>
      <circle cx="148" cy="22" r="5"  fill="#dc2626"/>
      <circle cx="148" cy="22" r="2"  fill="white"/>
    </svg>
  ),
}

export default function WhyChooseSection({ lang }) {
  const t = (langs[lang] || langs.en).landing.why

  return (
    <section id="why" className="relative scroll-mt-24 px-5 sm:px-8 py-20">
      <div className="mx-auto w-full max-w-[1140px]">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-[11px] font-black uppercase tracking-[0.2em] mb-3"
            style={{ color: '#dc2626' }}
          >
            {t.label}
          </p>
          <h2 className="font-black text-[1.9rem] sm:text-4xl text-gray-900 leading-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">{t.subtitle}</p>
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEM_KEYS.map((key) => (
            <StaggerItem key={key}>
              <div
                className="h-full rounded-3xl overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  background: 'white',
                  border: '1.5px solid #fecaca',
                  boxShadow: '0 4px 16px rgba(220,38,38,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform   = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow   = '0 16px 32px rgba(220,38,38,0.18)'
                  e.currentTarget.style.borderColor = '#fca5a5'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform   = 'translateY(0)'
                  e.currentTarget.style.boxShadow   = '0 4px 16px rgba(220,38,38,0.06)'
                  e.currentTarget.style.borderColor = '#fecaca'
                }}
              >
                {/* ── Illustration header ── */}
                <div
                  className="w-full flex items-center justify-center overflow-hidden"
                  style={{
                    height: 128,
                    background: 'linear-gradient(145deg, #fff1f1 0%, #fef2f2 60%, #fee2e2 100%)',
                    borderBottom: '1px solid #fecaca',
                  }}
                >
                  <div style={{ width: 160, height: 110, flexShrink: 0 }}>
                    {ILLUSTRATIONS[key]}
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
                        boxShadow: '0 4px 10px rgba(220,38,38,0.28)',
                      }}
                    >
                      {ICONS[key]}
                    </div>
                    <h3 className="font-extrabold text-[14px] text-gray-900 leading-tight">
                      {t.items[key].title}
                    </h3>
                  </div>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed">
                    {t.items[key].desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
