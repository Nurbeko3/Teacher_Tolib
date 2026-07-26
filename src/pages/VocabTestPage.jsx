import { useEffect, useState } from 'react'
import { api } from '../api'
import Navbar from '../Navbar'
import Footer from '../components/Footer'
import BackButton from '../components/BackButton'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const langs = { en, uz, ru }

const VOCAB_LESSON_ID = 'l_zero_3' // "Vocabulary Test"

const TOPIC_STYLES = [
  { accent: '#dc2626', bg: 'rgba(220,38,38,0.08)'  },
  { accent: '#b91c1c', bg: 'rgba(185,28,28,0.08)'  },
  { accent: '#991b1b', bg: 'rgba(153,27,27,0.08)'  },
  { accent: '#ef4444', bg: 'rgba(239,68,68,0.08)'  },
  { accent: '#f87171', bg: 'rgba(248,113,113,0.08)' },
  { accent: '#fca5a5', bg: 'rgba(252,165,165,0.08)' },
]

const FALLBACK_TOPICS = [
  { id: 'animals',        emoji: '🐶', label: 'Animals',        accent: '#dc2626', bg: 'rgba(220,38,38,0.08)'  },
  { id: 'school',         emoji: '🏫', label: 'School',         accent: '#b91c1c', bg: 'rgba(185,28,28,0.08)'  },
  { id: 'university',     emoji: '🎓', label: 'University',     accent: '#991b1b', bg: 'rgba(153,27,27,0.08)'  },
  { id: 'travel',         emoji: '✈️', label: 'Travel',         accent: '#ef4444', bg: 'rgba(239,68,68,0.08)'  },
  { id: 'food',           emoji: '🍔', label: 'Food',           accent: '#dc2626', bg: 'rgba(220,38,38,0.08)'  },
  { id: 'health',         emoji: '👨‍⚕️', label: 'Health',      accent: '#b91c1c', bg: 'rgba(185,28,28,0.08)'  },
  { id: 'jobs',           emoji: '💼', label: 'Jobs',           accent: '#7f1d1d', bg: 'rgba(127,29,29,0.08)'  },
  { id: 'home',           emoji: '🏠', label: 'Home',           accent: '#f87171', bg: 'rgba(248,113,113,0.08)' },
  { id: 'clothes',        emoji: '👕', label: 'Clothes',        accent: '#fca5a5', bg: 'rgba(252,165,165,0.08)' },
  { id: 'shopping',       emoji: '🛍', label: 'Shopping',       accent: '#dc2626', bg: 'rgba(220,38,38,0.08)'  },
  { id: 'sports',         emoji: '⚽', label: 'Sports',         accent: '#b91c1c', bg: 'rgba(185,28,28,0.08)'  },
  { id: 'technology',     emoji: '💻', label: 'Technology',     accent: '#991b1b', bg: 'rgba(153,27,27,0.08)'  },
  { id: 'environment',    emoji: '🌍', label: 'Environment',    accent: '#ef4444', bg: 'rgba(239,68,68,0.08)'  },
  { id: 'entertainment',  emoji: '🎬', label: 'Entertainment',  accent: '#dc2626', bg: 'rgba(220,38,38,0.08)'  },
  { id: 'transportation', emoji: '🚗', label: 'Transportation', accent: '#b91c1c', bg: 'rgba(185,28,28,0.08)'  },
]

function TopicCard({ topic, idx, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left focus:outline-none group transition-all duration-200 active:scale-[0.98]"
      style={{
        background: 'white',
        border: '1.5px solid #e5e7eb',
        opacity: 0,
        animation: `cardSlideUp 0.48s cubic-bezier(0.34,1.46,0.64,1) both ${0.06 + idx * 0.055}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = topic.bg
        e.currentTarget.style.borderColor = topic.accent + '55'
        e.currentTarget.style.boxShadow = `0 6px 20px rgba(220,38,38,0.1)`
        e.currentTarget.style.transform = 'scale(1.02)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'white'
        e.currentTarget.style.borderColor = '#e5e7eb'
        e.currentTarget.style.boxShadow = ''
        e.currentTarget.style.transform = ''
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
        style={{ background: topic.bg, border: `1px solid ${topic.accent}33` }}
      >
        {topic.emoji}
      </div>

      <span className="flex-1 font-bold text-[15px]" style={{ color: '#dc2626' }}>{topic.label}</span>

      <svg
        className="flex-shrink-0 opacity-30 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-200"
        width="16" height="16" viewBox="0 0 24 24" fill="none"
      >
        <path d="M9 18l6-6-6-6" stroke={topic.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

export default function VocabTestPage({ dark, setDark, onBack, onLogout, onNavigate, lang = 'uz', setLang }) {
  const t = (langs[lang] || langs.uz).vocabTest

  const [topics, setTopics] = useState(FALLBACK_TOPICS)

  useEffect(() => {
    api.getVocabTopicsByLesson(VOCAB_LESSON_ID)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTopics(data.map((topic, idx) => ({
            ...topic,
            accent: TOPIC_STYLES[idx % TOPIC_STYLES.length].accent,
            bg: TOPIC_STYLES[idx % TOPIC_STYLES.length].bg,
          })))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: dark ? '#111827' : 'white' }}>

      <Navbar dark={dark} setDark={setDark} onLogout={onLogout} lang={lang} setLang={setLang} />

      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora-dots" />
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
        <div className="px-5 pt-20 pb-4 mx-auto w-full max-w-2xl">
          <BackButton onClick={onBack} className="mb-4" lang={lang} />

          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
            style={{ background: 'rgba(220,38,38,0.1)', border: '1.5px solid rgba(220,38,38,0.25)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 20h9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-extrabold text-xl sm:text-2xl leading-tight fu-1" style={{ color: '#dc2626' }}>
            {t.title}
          </h1>
          <p className="text-gray-500 text-sm mt-1 fu-2">
            {t.desc}
          </p>
        </div>

        <div className="px-5 mx-auto w-full max-w-2xl">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: '#9ca3af' }}
          >
            {t.selectTopic}
          </p>

          <div className="flex flex-col gap-2.5">
            {topics.map((topic, idx) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                idx={idx}
                onClick={() => onNavigate?.('vocab-topic', { topic: topic.id, label: topic.label, emoji: topic.emoji })}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Footer dark={dark} lang={lang} />
        </div>
      </div>
    </div>
  )
}
