import { useNavigate, useOutletContext } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

export default function IELTSPlaceholderPage({ title, desc, accentColor = '#2563eb', icon, backPath, lang: langProp }) {
  const navigate = useNavigate()
  const ctx = useOutletContext() || {}
  const lang = langProp || ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  return (
    <div className="px-4 pt-6 pb-6 max-w-xl mx-auto">
      <BackButton
        onClick={() => navigate(backPath || '/ielts')}
        className="mb-6"
        lang={lang}
      />

      <div className="flex flex-col items-center text-center gap-5 mt-10">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background: accentColor, boxShadow: `0 8px 28px ${accentColor}55` }}>
          {icon}
        </div>
        <div>
          <h1 className="font-extrabold text-2xl leading-tight" style={{ color: '#dc2626' }}>{title}</h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-xs mx-auto">{desc}</p>
        </div>
        <div className="mt-4 px-6 py-3 rounded-2xl"
          style={{ background: '#fff1f2', border: '1px solid #fecaca' }}>
          <p className="text-red-600 text-sm font-medium">{t.comingSoon}</p>
        </div>
      </div>
    </div>
  )
}
