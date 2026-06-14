import { useOutletContext } from 'react-router-dom'
import IELTSSectionPage from './IELTSSectionPage'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const ITEMS = [
  {
    id: 'passages',
    path: '/ielts/reading/passages',
    label: 'Passages',
    descKey: 'passages',
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'articles',
    path: '/ielts/reading/articles',
    label: 'Articles',
    descKey: 'articles',
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h12" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'video-lessons',
    path: '/ielts/reading/video-lessons',
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

export default function ReadingPage() {
  const ctx = useOutletContext() || {}
  const lang = ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  const items = ITEMS.map(item => ({
    ...item,
    desc: t.sectionDescs?.reading?.[item.descKey] || item.descKey,
  }))

  return (
    <IELTSSectionPage
      title="Reading"
      subtitle={t.sectionSkills?.reading}
      accentColor="#dc2626"
      panelBg="#fff1f2"
      borderColor="#fecaca"
      hoverBg="#ffe4e6"
      items={items}
      backPath="/ielts"
    />
  )
}
