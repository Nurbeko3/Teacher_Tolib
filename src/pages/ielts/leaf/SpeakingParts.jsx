import IELTSPlaceholderPage from '../IELTSPlaceholderPage'

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

const descs = {
  1: 'Shaxsiy mavzular haqida savol-javob. Oila, ish, sevimli mashg\'ulotlar haqida gapiring.',
  2: 'Uzun nutq: cue card bo\'yicha 1-2 daqiqa gapiring.',
  3: 'Abstrakt mavzular bo\'yicha chuqur muhokama va fikr almashish.',
}

export function SpeakingPart1() {
  return <IELTSPlaceholderPage title="Part 1" desc={descs[1]} accentColor="#dc2626" backPath="/ielts/speaking/practice" icon={icons[1]} />
}
export function SpeakingPart2() {
  return <IELTSPlaceholderPage title="Part 2" desc={descs[2]} accentColor="#dc2626" backPath="/ielts/speaking/practice" icon={icons[2]} />
}
export function SpeakingPart3() {
  return <IELTSPlaceholderPage title="Part 3" desc={descs[3]} accentColor="#dc2626" backPath="/ielts/speaking/practice" icon={icons[3]} />
}
