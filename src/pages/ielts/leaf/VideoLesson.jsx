import IELTSPlaceholderPage from '../IELTSPlaceholderPage'

const CONFIGS = {
  listening: { accentColor: '#2563eb', backPath: '/ielts/listening' },
  reading:   { accentColor: '#7c3aed', backPath: '/ielts/reading' },
  writing:   { accentColor: '#059669', backPath: '/ielts/writing' },
  speaking:  { accentColor: '#dc2626', backPath: '/ielts/speaking' },
}

const VideoIcon = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
    <polygon points="10,8 17,12 10,16" fill="white"/>
  </svg>
)

export function ListeningVideoLessons() {
  return <IELTSPlaceholderPage title="Video Lessons" desc="Listening bo'yicha video darslar orqali o'rganing." {...CONFIGS.listening} icon={VideoIcon} />
}
export function ReadingVideoLessons() {
  return <IELTSPlaceholderPage title="Video Lessons" desc="Reading bo'yicha video darslar orqali o'rganing." {...CONFIGS.reading} icon={VideoIcon} />
}
export function WritingVideoLessons() {
  return <IELTSPlaceholderPage title="Video Lessons" desc="Writing bo'yicha video darslar orqali o'rganing." {...CONFIGS.writing} icon={VideoIcon} />
}
export function SpeakingVideoLessons() {
  return <IELTSPlaceholderPage title="Video Lessons" desc="Speaking bo'yicha video darslar orqali o'rganing." {...CONFIGS.speaking} icon={VideoIcon} />
}
