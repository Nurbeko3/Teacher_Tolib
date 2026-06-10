import IELTSPlaceholderPage from '../IELTSPlaceholderPage'

export default function WritingPractice() {
  return (
    <IELTSPlaceholderPage
      title="Practice"
      desc="Yozish mashqlari va topshiriqlar: Task 1 va Task 2 bo'yicha yozing."
      accentColor="#059669"
      backPath="/ielts/writing"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      }
    />
  )
}
