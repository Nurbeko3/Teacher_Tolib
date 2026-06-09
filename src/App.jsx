import { useState, useEffect } from 'react'
import AuthPage from './AuthPage'
import HomePage from './HomePage'
import GrammarLevelsPage from './pages/GrammarLevelsPage'
import TopicGrammarPage from './pages/TopicGrammarPage'
import UnitTestPage from './pages/UnitTestPage'
import VocabTestPage from './pages/VocabTestPage'
import VocabTopicPage from './pages/VocabTopicPage'

function App() {
  const [user, setUserRaw]  = useState(() => {
    try { const s = localStorage.getItem('et_session'); return s ? JSON.parse(s) : null }
    catch { return null }
  })
  const [page, setPage]         = useState(null)   // null | 'grammar-levels' | 'topic-grammar' | 'unit-test' | 'vocab-test' | 'vocab-topic'
  const [pageParams, setPageParams] = useState({})
  const [homeView, setHomeView] = useState('hero') // passed as initialView to HomePage
  const [lang, setLangRaw] = useState(() => localStorage.getItem('et_lang') || 'en')
  const [dark, setDarkRaw] = useState(() => localStorage.getItem('et_dark') === 'true')

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

  const handleLogout = () => { setUser(null); setPage(null); setPageParams({}); setHomeView('hero') }

  /* Central navigate: navigate('page-id') or navigate('page-id', { key: val }) */
  const navigate = (id, params = {}) => { setPage(id); setPageParams(params) }

  /* Shared props for all sub-pages */
  const navProps = { dark, setDark, onLogout: handleLogout }

  if (user) {
    if (page === 'grammar-levels') {
      return (
        <GrammarLevelsPage
          {...navProps}
          onBack={() => { setHomeView('courses'); setPage(null) }}
          onNavigate={navigate}
        />
      )
    }

    if (page === 'topic-grammar') {
      return (
        <TopicGrammarPage
          {...navProps}
          onBack={() => { setHomeView('courses'); setPage(null) }}
          onNavigate={navigate}
        />
      )
    }

    if (page === 'unit-test') {
      return (
        <UnitTestPage
          {...navProps}
          level={pageParams.level}
          unit={pageParams.unit}
          onBack={() => navigate('topic-grammar')}
        />
      )
    }

    if (page === 'vocab-test') {
      return (
        <VocabTestPage
          {...navProps}
          onBack={() => { setHomeView('courses'); setPage(null) }}
          onNavigate={navigate}
        />
      )
    }

    if (page === 'vocab-topic') {
      return (
        <VocabTopicPage
          {...navProps}
          topic={pageParams.topic}
          label={pageParams.label}
          emoji={pageParams.emoji}
          onBack={() => navigate('vocab-test')}
        />
      )
    }

    return (
      <HomePage
        user={user}
        lang={lang}
        setLang={setLang}
        dark={dark}
        setDark={setDark}
        onLogout={handleLogout}
        onNavigate={navigate}
        initialView={homeView}
      />
    )
  }

  return (
    <AuthPage
      onSuccess={setUser}
      lang={lang}
      setLang={setLang}
      dark={dark}
      setDark={setDark}
    />
  )
}

export default App
