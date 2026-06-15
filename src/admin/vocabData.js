const KEYS = {
  topics:    'et_vocab_topics',
  questions: 'et_vocab_questions',
}

const read = (key, def) => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : def } catch { return def }
}
const write = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

export const genVocabId = () => `vt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`

const DEFAULT_TOPICS = [
  { id: 'vt_animals',        lessonId: 'l_zero_3', emoji: '🐶', label: 'Animals',        order: 0  },
  { id: 'vt_school',         lessonId: 'l_zero_3', emoji: '🏫', label: 'School',         order: 1  },
  { id: 'vt_university',     lessonId: 'l_zero_3', emoji: '🎓', label: 'University',     order: 2  },
  { id: 'vt_travel',         lessonId: 'l_zero_3', emoji: '✈️', label: 'Travel',         order: 3  },
  { id: 'vt_food',           lessonId: 'l_zero_3', emoji: '🍔', label: 'Food',           order: 4  },
  { id: 'vt_health',         lessonId: 'l_zero_3', emoji: '👨‍⚕️', label: 'Health',   order: 5  },
  { id: 'vt_jobs',           lessonId: 'l_zero_3', emoji: '💼', label: 'Jobs',           order: 6  },
  { id: 'vt_home',           lessonId: 'l_zero_3', emoji: '🏠', label: 'Home',           order: 7  },
  { id: 'vt_clothes',        lessonId: 'l_zero_3', emoji: '👕', label: 'Clothes',        order: 8  },
  { id: 'vt_shopping',       lessonId: 'l_zero_3', emoji: '🛍', label: 'Shopping',       order: 9  },
  { id: 'vt_sports',         lessonId: 'l_zero_3', emoji: '⚽', label: 'Sports',         order: 10 },
  { id: 'vt_technology',     lessonId: 'l_zero_3', emoji: '💻', label: 'Technology',     order: 11 },
  { id: 'vt_environment',    lessonId: 'l_zero_3', emoji: '🌍', label: 'Environment',    order: 12 },
  { id: 'vt_entertainment',  lessonId: 'l_zero_3', emoji: '🎬', label: 'Entertainment',  order: 13 },
  { id: 'vt_transportation', lessonId: 'l_zero_3', emoji: '🚗', label: 'Transportation', order: 14 },
]

export const getVocabTopics = (lessonId) => {
  const all = read(KEYS.topics, null)
  if (all) return all.filter(t => t.lessonId === lessonId).sort((a, b) => a.order - b.order)
  write(KEYS.topics, DEFAULT_TOPICS)
  return DEFAULT_TOPICS.filter(t => t.lessonId === lessonId)
}

export const saveVocabTopics = (lessonId, updated) => {
  const all = read(KEYS.topics, [])
  const others = all.filter(t => t.lessonId !== lessonId)
  write(KEYS.topics, [...others, ...updated])
}

export const deleteVocabTopic = (topicId) => {
  write(KEYS.topics, read(KEYS.topics, []).filter(t => t.id !== topicId))
  write(KEYS.questions, read(KEYS.questions, []).filter(q => q.topicId !== topicId))
}

export const getVocabQuestions = (topicId) => {
  return read(KEYS.questions, []).filter(q => q.topicId === topicId).sort((a, b) => a.order - b.order)
}

export const saveVocabQuestion = (q) => {
  const all = read(KEYS.questions, [])
  const idx = all.findIndex(x => x.id === q.id)
  if (idx >= 0) all[idx] = q
  else all.push(q)
  write(KEYS.questions, all)
}

export const deleteVocabQuestion = (questionId) => {
  write(KEYS.questions, read(KEYS.questions, []).filter(q => q.id !== questionId))
}

export const countVocabQuestions = (topicId) =>
  read(KEYS.questions, []).filter(q => q.topicId === topicId).length
