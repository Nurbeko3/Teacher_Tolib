import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom'
import en from './locales/en'
import uz from './locales/uz'
import ru from './locales/ru'

const _langs = { en, uz, ru }

import AuthPage from './AuthPage'
import HomePage from './HomePage'
import LandingPage from './pages/landing/LandingPage'
import CoursesPage from './pages/courses/CoursesPage'
import CourseDetailPage from './pages/courses/CourseDetailPage'
import EnglishFromZeroPage from './pages/english-from-zero/EnglishFromZeroPage'
import MultilevelPage from './pages/multilevel/MultilevelPage'
import AboutTeacherPage from './pages/AboutTeacherPage'
import ResultsPage from './pages/ResultsPage'
import DonatePage from './pages/DonatePage'

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

// Admin
import { api as adminApi } from './admin/adminData'
import AdminLayout from './admin/AdminLayout'
import AdminCourses from './admin/pages/AdminCourses'
import AdminCourseDetail from './admin/pages/AdminCourseDetail'
import AdminProfile from './admin/pages/AdminProfile'
import AdminDonate from './admin/pages/AdminDonate'
import AdminResults from './admin/pages/AdminResults'
import AdminTestimonials from './admin/pages/AdminTestimonials'
import AdminUsers from './admin/pages/AdminUsers'
import AdminSocials from './admin/pages/AdminSocials'
import AdminLessonDetail from './admin/pages/AdminLessonDetail'
import AdminTopicGrammarDetail from './admin/pages/AdminTopicGrammarDetail'
import AdminVocabTestDetail from './admin/pages/AdminVocabTestDetail'
import AdminVideoLessons from './admin/pages/AdminVideoLessons'

const ADMIN_PHONE = '998991231111'
const isAdminUser = (u) => u?.role === 'SUPER_ADMIN' && u?.phone?.replace(/\D/g, '') === ADMIN_PHONE

/* ── Admin lesson router: picks the right detail page by lesson title ── */
function AdminLessonRouter() {
  const { pathname } = useLocation()
  const lessonId = pathname.split('/').pop()
  const [lessonTitle, setLessonTitle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getLessons()
      .then(lessons => {
        const lesson = lessons.find(l => l.id === lessonId)
        setLessonTitle(lesson?.title || '')
      })
      .catch(() => setLessonTitle(''))
      .finally(() => setLoading(false))
  }, [lessonId])

  if (loading) return <div className="p-8 text-gray-400">Loading...</div>
  if (lessonTitle === 'Topic Grammar Test') return <AdminTopicGrammarDetail />
  if (lessonTitle === 'Vocabulary Test') return <AdminVocabTestDetail />
  return <AdminLessonDetail />
}

/* ── Router-aware wrappers for grammar/vocab pages ── */

function GrammarLevelsRoute({ pageProps }) {
  const navigate = useNavigate()
  return (
    <GrammarLevelsPage
      {...pageProps}
      onBack={() => navigate(-1)}
      onNavigate={() => {}}
    />
  )
}

function TopicGrammarRoute({ pageProps }) {
  const navigate = useNavigate()
  return (
    <TopicGrammarPage
      {...pageProps}
      onBack={() => navigate(-1)}
      onNavigate={(id, params) => {
        if (id === 'unit-test') navigate('/english-from-zero/unit-test', { state: params })
      }}
    />
  )
}

function UnitTestRoute({ pageProps }) {
  const navigate = useNavigate()
  const { state } = useLocation()
  return (
    <UnitTestPage
      {...pageProps}
      level={state?.level}
      unit={state?.unit}
      onBack={() => navigate(-1)}
    />
  )
}

function VocabTestRoute({ pageProps }) {
  const navigate = useNavigate()
  return (
    <VocabTestPage
      {...pageProps}
      onBack={() => navigate(-1)}
      onNavigate={(id, params) => {
        if (id === 'vocab-topic') navigate('/english-from-zero/vocab-topic', { state: params })
      }}
    />
  )
}

function VocabTopicRoute({ pageProps }) {
  const navigate = useNavigate()
  const { state } = useLocation()
  return (
    <VocabTopicPage
      {...pageProps}
      topic={state?.topic}
      label={state?.label}
      emoji={state?.emoji}
      onBack={() => navigate(-1)}
    />
  )
}

function LevelTestPlaceholder({ pageProps }) {
  const tLevel = (_langs[pageProps.lang] || _langs.uz).englishFromZero.sections.level
  return (
    <IELTSPlaceholderPage
      title={tLevel.title}
      desc={tLevel.desc}
      accentColor="#16a34a"
      lang={pageProps.lang}
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

  const handleAuthSuccess = (u) => {
    setUser(u)
    if (isAdminUser(u)) navigate('/admin', { replace: true })
    else navigate('/', { replace: true })
  }

  const navProps  = { dark, setDark, onLogout: handleLogout }
  const pageProps = { ...navProps, lang, setLang }

  return (
    <Routes>
      {/* ── Public landing / auth ── */}
      <Route
        path="/"
        element={
          user
            ? <HomePage user={user} {...pageProps} />
            : <LandingPage lang={lang} setLang={setLang} />
        }
      />
      <Route
        path="/auth"
        element={
          user
            ? <Navigate to={isAdminUser(user) ? '/admin' : '/'} replace />
            : <AuthPage onSuccess={handleAuthSuccess} lang={lang} setLang={setLang} dark={dark} setDark={setDark} />
        }
      />

      {/* ── Everything below requires login ── */}
      <Route element={user ? <Outlet /> : <Navigate to="/auth" replace />}>
        {/* ── Admin (SUPER_ADMIN only) ── */}
        <Route
          path="/admin"
          element={
            isAdminUser(user)
              ? <AdminLayout onLogout={handleLogout} />
              : <Navigate to="/" replace />
          }
        >
          <Route index element={<Navigate to="/admin/courses" replace />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/:courseId" element={<AdminCourseDetail />} />
          <Route path="courses/:courseId/:lessonId" element={<AdminLessonRouter />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="donate"  element={<AdminDonate />} />
          <Route path="results" element={<AdminResults />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="video-lessons" element={<AdminVideoLessons />} />
          <Route path="users"   element={<AdminUsers />} />
          <Route path="socials" element={<AdminSocials />} />
        </Route>

        {/* ── Standalone nav pages ── */}
        <Route path="/about-teacher" element={<AboutTeacherPage dark={dark} lang={lang} />} />
        <Route path="/results"       element={<ResultsPage dark={dark} lang={lang} />} />
        <Route path="/donate"        element={<DonatePage dark={dark} lang={lang} />} />

        {/* ── Course selection ── */}
        <Route path="/courses"
          element={<CoursesPage user={user} {...pageProps} />}
        />
        <Route path="/courses/:courseId" element={<CourseDetailPage {...pageProps} />} />

        {/* ── English from Zero ── */}
        <Route path="/english-from-zero" element={<EnglishFromZeroPage {...pageProps} />} />
        <Route path="/english-from-zero/grammar-levels" element={<GrammarLevelsRoute pageProps={pageProps} />} />
        <Route path="/english-from-zero/topic-grammar" element={<TopicGrammarRoute pageProps={pageProps} />} />
        <Route path="/english-from-zero/unit-test" element={<UnitTestRoute pageProps={pageProps} />} />
        <Route path="/english-from-zero/vocab-test" element={<VocabTestRoute pageProps={pageProps} />} />
        <Route path="/english-from-zero/vocab-topic" element={<VocabTopicRoute pageProps={pageProps} />} />
        <Route path="/english-from-zero/level-test" element={<LevelTestPlaceholder pageProps={pageProps} />} />

        {/* ── Multilevel ── */}
        <Route path="/multilevel" element={<MultilevelPage {...pageProps} />} />

        {/* ── IELTS ── */}
        <Route path="/ielts" element={<IELTSLayout {...pageProps} />}>
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
      </Route>

      {/* ── Catch-all: dashboard if logged in, landing otherwise ── */}
      <Route path="*" element={user ? <HomePage user={user} {...pageProps} /> : <Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
