import IELTSPlaceholderPage from '../IELTSPlaceholderPage'

export default function ListeningPodcasts() {
  return (
    <IELTSPlaceholderPage
      title="Podcasts"
      desc="Audio materiallar va podkastlar bilan tinglash ko'nikmasini oshiring."
      accentColor="#2563eb"
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
