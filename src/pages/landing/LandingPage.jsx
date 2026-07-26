import { useNavigate } from 'react-router-dom'
import LandingNavbar from './LandingNavbar'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import IeltsResultsSection from './IeltsResultsSection'
import WhyChooseSection from './WhyChooseSection'
import CoursesSection from './CoursesSection'
import TestimonialsSection from './TestimonialsSection'
import FAQSection from './FAQSection'
import Footer from '../../components/Footer'
import { Reveal } from './shared'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

export default function LandingPage({ lang, setLang, user, onLogout }) {
  const navigate = useNavigate()
  const t = (langs[lang] || langs.en).landing.footerCta

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LandingNavbar lang={lang} setLang={setLang} user={user} onLogout={onLogout} />

      <main className="flex-1">
        <HeroSection onLogin={() => navigate(user ? '/learn' : '/auth')} lang={lang} />
        <AboutSection lang={lang} />
        <IeltsResultsSection lang={lang} />
        <TestimonialsSection lang={lang} />
        <WhyChooseSection lang={lang} />
        <CoursesSection lang={lang} />
        <FAQSection lang={lang} />

        {/* ── Final CTA banner ── */}
        <section className="relative px-5 sm:px-8 py-16">
          <Reveal className="mx-auto w-full max-w-[900px]">
            <div
              className="rounded-[32px] px-8 sm:px-14 py-12 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 45%, #dc2626 75%, #ef4444 100%)', boxShadow: '0 24px 60px rgba(220,38,38,0.4)' }}
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10" style={{ border: '36px solid white' }} />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-[0.08]" style={{ border: '30px solid white' }} />
              <h2 className="relative z-10 font-black text-2xl sm:text-3xl text-white leading-tight">{t.title}</h2>
              <p className="relative z-10 mt-3 text-white/80 text-[14.5px] sm:text-[15px] max-w-md mx-auto">{t.subtitle}</p>
              <button
                onClick={() => navigate(user ? '/learn' : '/auth')}
                className="relative z-10 mt-7 px-8 py-3.5 rounded-2xl font-bold text-[15px] bg-white text-red-600 transition-all duration-200 active:scale-95 hover:bg-red-50"
              >
                {t.button}
              </button>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer dark={false} lang={lang} />
    </div>
  )
}
