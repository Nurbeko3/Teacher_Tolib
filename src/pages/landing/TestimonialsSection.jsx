import { Reveal } from './shared'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const AVATAR_COLORS = [
  'linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)',
  'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)',
  'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)',
  'linear-gradient(135deg, #be123c 0%, #f43f5e 100%)',
  'linear-gradient(135deg, #9f1239 0%, #dc2626 100%)',
  'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)',
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ item, colorIdx }) {
  return (
    <div
      className="flex-shrink-0 mx-3"
      style={{ width: 308 }}
    >
      <div
        className="rounded-3xl p-6 flex flex-col h-full"
        style={{
          background: 'white',
          border: '1.5px solid #fecaca',
          boxShadow: '0 4px 18px rgba(220,38,38,0.08)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
          minHeight: 200,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow   = '0 12px 36px rgba(220,38,38,0.18)'
          e.currentTarget.style.transform   = 'translateY(-4px)'
          e.currentTarget.style.borderColor = '#fca5a5'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow   = '0 4px 18px rgba(220,38,38,0.08)'
          e.currentTarget.style.transform   = 'none'
          e.currentTarget.style.borderColor = '#fecaca'
        }}
      >
        <Stars count={item.rating} />
        <p className="mt-4 text-[13.5px] text-gray-600 leading-relaxed flex-1">
          &ldquo;{item.quote}&rdquo;
        </p>
        <div
          className="flex items-center gap-3 mt-5 pt-4"
          style={{ borderTop: '1px solid #fee2e2' }}
        >
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: AVATAR_COLORS[colorIdx % AVATAR_COLORS.length] }}
          >
            <span className="text-white font-bold text-[14px]">
              {item.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[13.5px] text-gray-900 truncate">{item.name}</p>
            <p className="text-[11.5px] text-gray-400 truncate">{item.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection({ lang }) {
  const t = (langs[lang] || langs.en).landing.testimonials

  /* 4 copies → translateX(-50%) seamlessly loops 2 full sets */
  const quadrupled = [...t.items, ...t.items, ...t.items, ...t.items]

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 py-20 overflow-hidden"
      style={{ background: '#fff8f8' }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: '40%', height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.35) 50%, transparent 100%)',
        }}
      />

      {/* Section header */}
      <Reveal className="text-center max-w-2xl mx-auto mb-12 px-5">
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

      {/* ── Carousel ── */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #fff8f8 0%, transparent 100%)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #fff8f8 0%, transparent 100%)' }}
        />

        <div
          className="marquee-wrap overflow-hidden py-4"
          style={{ '--marquee-speed': '36s' }}
        >
          <div className="marquee-track">
            {quadrupled.map((item, i) => (
              <TestimonialCard key={i} item={item} colorIdx={i % t.items.length} />
            ))}
          </div>
        </div>
      </div>

      {/* Rating summary strip */}
      <Reveal className="mt-10 px-5">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="font-black text-gray-900 text-[15px]">5.0</span>
          <span className="text-gray-400 text-[13px]">·</span>
          <span className="text-gray-500 text-[13px]">1,200+ {t.students || 'students'}</span>
        </div>
      </Reveal>
    </section>
  )
}
