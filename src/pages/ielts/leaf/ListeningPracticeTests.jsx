import { useOutletContext } from 'react-router-dom'
import IELTSPlaceholderPage from '../IELTSPlaceholderPage'
import en from '../../../locales/en'
import uz from '../../../locales/uz'
import ru from '../../../locales/ru'

const langs = { en, uz, ru }

export default function ListeningPracticeTests() {
  const ctx = useOutletContext() || {}
  const lang = ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  return (
    <IELTSPlaceholderPage
      title="Practice Tests"
      desc={t.sectionDescs?.listening?.practiceTests}
      accentColor="#dc2626"
      backPath="/ielts/listening"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  )
}
