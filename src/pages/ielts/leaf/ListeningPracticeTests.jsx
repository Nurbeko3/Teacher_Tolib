import IELTSPlaceholderPage from '../IELTSPlaceholderPage'

export default function ListeningPracticeTests() {
  return (
    <IELTSPlaceholderPage
      title="Practice Tests"
      desc="To'liq IELTS Listening sinov testlari. Haqiqiy imtihon sharoitida mashq qiling."
      accentColor="#2563eb"
      backPath="/ielts/listening"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  )
}
