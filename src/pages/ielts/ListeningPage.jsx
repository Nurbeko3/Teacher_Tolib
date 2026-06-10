import IELTSSectionPage from './IELTSSectionPage'

const ITEMS = [
  {
    id: 'practice-tests',
    path: '/ielts/listening/practice-tests',
    label: 'Practice Tests',
    desc: "To'liq sinov testlari",
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
    desc: 'Audio materiallar bilan mashq',
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
    desc: "Video darslar orqali o'rganing",
    icon: (c) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/>
        <polygon points="10,8 16,12 10,16" fill={c}/>
      </svg>
    ),
  },
]

export default function ListeningPage() {
  return (
    <IELTSSectionPage
      title="Listening"
      subtitle="Tinglash ko'nikmasi"
      accentColor="#2563eb"
      panelBg="#eff6ff"
      borderColor="#bfdbfe"
      hoverBg="#dbeafe"
      items={ITEMS}
      backPath="/ielts"
    />
  )
}
