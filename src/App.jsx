import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import AuthPage from './AuthPage'
import HomePage from './HomePage'
import CoursesPage from './pages/courses/CoursesPage'
import EnglishFromZeroPage from './pages/english-from-zero/EnglishFromZeroPage'
import MultilevelPage from './pages/multilevel/MultilevelPage'

// Grammar / Vocab pages (standalone full-screen)
import GrammarLevelsPage from './pages/GrammarLevelsPage'
import TopicGrammarPage from './pages/TopicGrammarPage'
import UnitTestPage from './pages/UnitTestPage'
import VocabTestPage from './pages/VocabTestPage'
import VocabTopicPage from './pages/VocabTopicPage'

// IELTS pages
import IELTSLayout from './pages/ielts/IELTSLayout'
import IELTSHome from './pages/ielts/IELTSHome'
import ListeningPage from './pages/ielts/ListeningPage'
import ReadingPage from './pages/ielts/ReadingPage'
import WritingPage from './pages/ielts/WritingPage'
import SpeakingPage from './pages/ielts/SpeakingPage'
import SpeakingPracticePage from './pages/ielts/SpeakingPracticePage'
import ListeningPracticeTests from './pages/ielts/leaf/ListeningPracticeTests'
import ListeningPodcasts from './pages/ielts/leaf/ListeningPodcasts'
import { ListeningVideoLessons, ReadingVideoLessons, WritingVideoLessons, SpeakingVideoLessons } from './pages/ielts/leaf/VideoLesson'
import ReadingPassages from './pages/ielts/leaf/ReadingPassages'
import ReadingArticles from './pages/ielts/leaf/ReadingArticles'
import WritingPractice from './pages/ielts/leaf/WritingPractice'
import WritingAIChecker from './pages/ielts/leaf/WritingAIChecker'
import { SpeakingPart1, SpeakingPart2, SpeakingPart3 } from './pages/ielts/leaf/SpeakingParts'
import IELTSPlaceholderPage from './pages/ielts/IELTSPlaceholderPage'

/* ── Router-aware wrappers for grammar/vocab pages ── */

function GrammarLevelsRoute({ navProps }) {
  const navigate = useNavigate()
  return (
    <GrammarLevelsPage
      {...navProps}
      onBack={() => navigate('/english-from-zero')}
      onNavigate={() => {}}
    />
  )
}

function TopicGrammarRoute({ navProps }) {
  const navigate = useNavigate()
  return (
    <TopicGrammarPage
      {...navProps}
      onBack={() => navigate('/english-from-zero')}
      onNavigate={(id, params) => {
        if (id === 'unit-test') navigate('/english-from-zero/unit-test', { state: params })
      }}
    />
  )
}

function UnitTestRoute({ navProps }) {
  const navigate = useNavigate()
  const { state } = useLocation()
  return (
    <UnitTestPage
      {...navProps}
      level={state?.level}
      unit={state?.unit}
      onBack={() => navigate('/english-from-zero/topic-grammar')}
    />
  )
}

function VocabTestRoute({ navProps }) {
  const navigate = useNavigate()
  return (
    <VocabTestPage
      {...navProps}
      onBack={() => navigate('/english-from-zero')}
      onNavigate={(id, params) => {
        if (id === 'vocab-topic') navigate('/english-from-zero/vocab-topic', { state: params })
      }}
    />
  )
}

function VocabTopicRoute({ navProps }) {
  const navigate = useNavigate()
  const { state } = useLocation()
  return (
    <VocabTopicPage
      {...navProps}
      topic={state?.topic}
      label={state?.label}
      emoji={state?.emoji}
      onBack={() => navigate('/english-from-zero/vocab-test')}
    />
  )
}

function LevelTestPlaceholder({ navProps }) {
  const navigate = useNavigate()
  return (
    <IELTSPlaceholderPage
      title="Daraja testi"
      desc="O'z ingliz tili darajangizni aniqlang. Natijaga qarab mos kursga yo'naltirilasiz."
      accentColor="#16a34a"
      backPath="/english-from-zero"
      icon={
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
          <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="2" fill="white"/>
        </svg>
      }
    />
  )
}

/* ── Main app ── */

function AppRoutes() {
  const [user, setUserRaw] = useState(() => {
    try { const s = localStorage.getItem('et_session'); return s ? JSON.parse(s) : null }
    catch { return null }
  })
  const [lang, setLangRaw] = useState(() => localStorage.getItem('et_lang') || 'en')
  const [dark, setDarkRaw] = useState(() => localStorage.getItem('et_dark') === 'true')

  const navigate = useNavigate()

  const setUser = (u) => {
    setUserRaw(u)
    if (u) localStorage.setItem('et_session', JSON.stringify(u))
    else   localStorage.removeItem('et_session')
  }
  const setLang = (l) => { setLangRaw(l); localStorage.setItem('et_lang', l) }
  const setDark = (fn) => {
    setDarkRaw((prev) => {
      const next = typeof fn === 'function' ? fn(prev) : fn
      localStorage.setItem('et_dark', String(next))
      return next
    })
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  if (!user) {
    return (
      <AuthPage
        onSuccess={(u) => { setUser(u); navigate('/') }}
        lang={lang}
        setLang={setLang}
        dark={dark}
        setDark={setDark}
      />
    )
  }

  const navProps = { dark, setDark, onLogout: handleLogout }
  const pageProps = { ...navProps, lang, setLang }

  return (
    <Routes>
      {/* ── Hero ── */}
      <Route path="/"
        element={<HomePage user={user} {...pageProps} />}
      />

      {/* ── Course selection ── */}
      <Route path="/courses"
        element={<CoursesPage user={user} {...pageProps} />}
      />

      {/* ── English from Zero ── */}
      <Route path="/english-from-zero" element={<EnglishFromZeroPage {...pageProps} />} />
      <Route path="/english-from-zero/grammar-levels" element={<GrammarLevelsRoute navProps={navProps} />} />
      <Route path="/english-from-zero/topic-grammar" element={<TopicGrammarRoute navProps={navProps} />} />
      <Route path="/english-from-zero/unit-test" element={<UnitTestRoute navProps={navProps} />} />
      <Route path="/english-from-zero/vocab-test" element={<VocabTestRoute navProps={navProps} />} />
      <Route path="/english-from-zero/vocab-topic" element={<VocabTopicRoute navProps={navProps} />} />
      <Route path="/english-from-zero/level-test" element={<LevelTestPlaceholder navProps={navProps} />} />

      {/* ── Multilevel ── */}
      <Route path="/multilevel" element={<MultilevelPage {...pageProps} />} />

      {/* ── IELTS ── */}
      <Route path="/ielts" element={<IELTSLayout {...navProps} />}>
        <Route index element={<IELTSHome />} />

        <Route path="listening" element={<ListeningPage />} />
        <Route path="listening/practice-tests" element={<ListeningPracticeTests />} />
        <Route path="listening/podcasts" element={<ListeningPodcasts />} />
        <Route path="listening/video-lessons" element={<ListeningVideoLessons />} />

        <Route path="reading" element={<ReadingPage />} />
        <Route path="reading/passages" element={<ReadingPassages />} />
        <Route path="reading/articles" element={<ReadingArticles />} />
        <Route path="reading/video-lessons" element={<ReadingVideoLessons />} />

        <Route path="writing" element={<WritingPage />} />
        <Route path="writing/practice" element={<WritingPractice />} />
        <Route path="writing/ai-checker" element={<WritingAIChecker />} />
        <Route path="writing/video-lessons" element={<WritingVideoLessons />} />

        <Route path="speaking" element={<SpeakingPage />} />
        <Route path="speaking/practice" element={<SpeakingPracticePage />} />
        <Route path="speaking/practice/part-1" element={<SpeakingPart1 />} />
        <Route path="speaking/practice/part-2" element={<SpeakingPart2 />} />
        <Route path="speaking/practice/part-3" element={<SpeakingPart3 />} />
        <Route path="speaking/video-lessons" element={<SpeakingVideoLessons />} />
      </Route>

      {/* ── Catch-all → home ── */}
      <Route path="*" element={<HomePage user={user} {...pageProps} />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
