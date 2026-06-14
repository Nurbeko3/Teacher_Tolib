import { useOutletContext } from 'react-router-dom'
import IELTSPlaceholderPage from '../IELTSPlaceholderPage'
import en from '../../../locales/en'
import uz from '../../../locales/uz'
import ru from '../../../locales/ru'

const langs = { en, uz, ru }

const CONFIGS = {
  listening: { accentColor: '#dc2626', backPath: '/ielts/listening' },
  reading:   { accentColor: '#dc2626', backPath: '/ielts/reading' },
  writing:   { accentColor: '#dc2626', backPath: '/ielts/writing' },
  speaking:  { accentColor: '#dc2626', backPath: '/ielts/speaking' },
}

const VideoIcon = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
    <polygon points="10,8 17,12 10,16" fill="white"/>
  </svg>
)

function useLang() {
  const ctx = useOutletContext() || {}
  return ctx.lang || 'uz'
}

export function ListeningVideoLessons() {
  const lang = useLang()
  const t = (langs[lang] || langs.uz).ielts
  return <IELTSPlaceholderPage title="Video Lessons" desc={t.sectionDescs?.listening?.videoLessons} {...CONFIGS.listening} icon={VideoIcon} />
}
export function ReadingVideoLessons() {
  const lang = useLang()
  const t = (langs[lang] || langs.uz).ielts
  return <IELTSPlaceholderPage title="Video Lessons" desc={t.sectionDescs?.reading?.videoLessons} {...CONFIGS.reading} icon={VideoIcon} />
}
export function WritingVideoLessons() {
  const lang = useLang()
  const t = (langs[lang] || langs.uz).ielts
  return <IELTSPlaceholderPage title="Video Lessons" desc={t.sectionDescs?.writing?.videoLessons} {...CONFIGS.writing} icon={VideoIcon} />
}
export function SpeakingVideoLessons() {
  const lang = useLang()
  const t = (langs[lang] || langs.uz).ielts
  return <IELTSPlaceholderPage title="Video Lessons" desc={t.sectionDescs?.speaking?.videoLessons} {...CONFIGS.speaking} icon={VideoIcon} />
}
