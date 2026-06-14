import { useOutletContext } from 'react-router-dom'
import IELTSSectionPage from './IELTSSectionPage'
import en from '../../locales/en'
import uz from '../../locales/uz'
import ru from '../../locales/ru'

const langs = { en, uz, ru }

const ITEMS = [
  {
    id: 'practice',
    path: '/ielts/writing/practice',
    label: 'Practice',
    descKey: 'practice',
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'ai-checker',
    path: '/ielts/writing/ai-checker',
    label: 'AI Checker',
    descKey: 'aiChecker',
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 4l.7 2.3L22 7l-2.3.7L19 10l-.7-2.3L16 7l2.3-.7Z" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'video-lessons',
    path: '/ielts/writing/video-lessons',
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

export default function WritingPage() {
  const ctx = useOutletContext() || {}
  const lang = ctx.lang || 'uz'
  const t = (langs[lang] || langs.uz).ielts

  const items = ITEMS.map(item => ({
    ...item,
    desc: t.sectionDescs?.writing?.[item.descKey] || item.descKey,
  }))

  return (
    <IELTSSectionPage
      title="Writing"
      subtitle={t.sectionSkills?.writing}
      accentColor="#dc2626"
      panelBg="#fff1f2"
      borderColor="#fecaca"
      hoverBg="#ffe4e6"
      items={items}
      backPath="/ielts"
    />
  )
}
