import { useOutletContext } from 'react-router-dom'
import IELTSPlaceholderPage from '../IELTSPlaceholderPage'
import en from '../../../locales/en'
import uz from '../../../locales/uz'
import ru from '../../../locales/ru'

const langs = { en, uz, ru }

export default function ReadingArticles() {
  const ctx = useOutletContext() || {}
  const lang = ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  return (
    <IELTSPlaceholderPage
      title="Articles"
      desc={t.sectionDescs?.reading?.articles}
      accentColor="#dc2626"
      backPath="/ielts/reading"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  )
}
