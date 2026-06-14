import { useOutletContext } from 'react-router-dom'
import IELTSSectionPage from './IELTSSectionPage'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const ITEMS = [
  {
    id: 'practice-tests',
    path: '/ielts/listening/practice-tests',
    label: 'Practice Tests',
    descKey: 'practiceTests',
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'podcasts',
    path: '/ielts/listening/podcasts',
    label: 'Podcasts',
    descKey: 'podcasts',
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 18v-6a9 9 0 0118 0v6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'video-lessons',
    path: '/ielts/listening/video-lessons',
    label: 'Video Lessons',
    descKey: 'videoLessons',
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/>
        <polygon points="10,8 16,12 10,16" fill={c}/>
      </svg>
    ),
  },
]

export default function ListeningPage() {
  const ctx = useOutletContext() || {}
  const lang = ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  const items = ITEMS.map(item => ({
    ...item,
    desc: t.sectionDescs?.listening?.[item.descKey] || item.descKey,
  }))

  return (
    <IELTSSectionPage
      title="Listening"
      subtitle={t.sectionSkills?.listening}
      accentColor="#dc2626"
      panelBg="#fff1f2"
      borderColor="#fecaca"
      hoverBg="#ffe4e6"
      items={items}
      backPath="/ielts"
    />
  )
}
