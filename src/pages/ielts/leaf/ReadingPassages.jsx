import IELTSPlaceholderPage from '../IELTSPlaceholderPage'

export default function ReadingPassages() {
  return (
    <IELTSPlaceholderPage
      title="Passages"
      desc="IELTS uslubidagi o'qish matnlari va savollar bilan mashq qiling."
      accentColor="#7c3aed"
      backPath="/ielts/reading"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  )
}
