import { useNavigate } from 'react-router-dom'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const langs = { en, uz, ru }

export default function BackButton({ onClick, className = '', lang = 'uz' }) {
  const navigate = useNavigate()
  const t = langs[lang] || langs.uz
  const handleClick = onClick ?? (() => navigate(-1))

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 transition-colors active:scale-[0.97] focus:outline-none ${className}`}
      style={{ color: '#dc2626' }}
      onMouseEnter={e => { e.currentTarget.style.color = '#b91c1c' }}
      onMouseLeave={e => { e.currentTarget.style.color = '#dc2626' }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-sm font-medium">{t.common.back}</span>
    </button>
  )
}
