import { useOutletContext } from 'react-router-dom'
import IELTSPlaceholderPage from '../IELTSPlaceholderPage'
import en from '../../../locales/en'
import uz from '../../../locales/uz'
import ru from '../../../locales/ru'

const langs = { en, uz, ru }

const icons = {
  1: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
    </svg>
  ),
  2: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 10h18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 14h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  3: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

function useLang() {
  const ctx = useOutletContext() || {}
  return ctx.lang || 'uz'
}

export function SpeakingPart1() {
  const lang = useLang()
  const t = (langs[lang] || langs.uz).ielts
  return <IELTSPlaceholderPage title="Part 1" desc={t.speaking?.parts?.part1?.desc} accentColor="#dc2626" backPath="/ielts/speaking/practice" icon={icons[1]} />
}
export function SpeakingPart2() {
  const lang = useLang()
  const t = (langs[lang] || langs.uz).ielts
  return <IELTSPlaceholderPage title="Part 2" desc={t.speaking?.parts?.part2?.desc} accentColor="#dc2626" backPath="/ielts/speaking/practice" icon={icons[2]} />
}
export function SpeakingPart3() {
  const lang = useLang()
  const t = (langs[lang] || langs.uz).ielts
  return <IELTSPlaceholderPage title="Part 3" desc={t.speaking?.parts?.part3?.desc} accentColor="#dc2626" backPath="/ielts/speaking/practice" icon={icons[3]} />
}
