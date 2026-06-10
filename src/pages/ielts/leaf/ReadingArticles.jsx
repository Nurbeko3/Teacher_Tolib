import IELTSPlaceholderPage from '../IELTSPlaceholderPage'

export default function ReadingArticles() {
  return (
    <IELTSPlaceholderPage
      title="Articles"
      desc="Maqola va essaylarni o'qib, tushunish ko'nikmasini rivojlantiring."
      accentColor="#7c3aed"
      backPath="/ielts/reading"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  )
}
