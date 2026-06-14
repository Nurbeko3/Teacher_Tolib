import { useOutletContext } from 'react-router-dom'
import IELTSPlaceholderPage from '../IELTSPlaceholderPage'
import en from '../../../locales/en'
import uz from '../../../locales/uz'
import ru from '../../../locales/ru'

const langs = { en, uz, ru }

export default function WritingAIChecker() {
  const ctx = useOutletContext() || {}
  const lang = ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  return (
    <IELTSPlaceholderPage
      title="AI Checker"
      desc={t.sectionDescs?.writing?.aiChecker}
      accentColor="#dc2626"
      backPath="/ielts/writing"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 4l.7 2.3L22 7l-2.3.7L19 10l-.7-2.3L16 7l2.3-.7Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  )
}
