import { useOutletContext } from 'react-router-dom'
import IELTSPlaceholderPage from '../IELTSPlaceholderPage'
import en from '../../../locales/en'
import uz from '../../../locales/uz'
import ru from '../../../locales/ru'

const langs = { en, uz, ru }

export default function ListeningPodcasts() {
  const ctx = useOutletContext() || {}
  const lang = ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  return (
    <IELTSPlaceholderPage
      title="Podcasts"
      desc={t.sectionDescs?.listening?.podcasts}
      accentColor="#dc2626"
      backPath="/ielts/listening"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M3 18v-6a9 9 0 0118 0v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  )
}
