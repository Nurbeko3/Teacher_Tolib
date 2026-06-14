const KEYS = {
  courses:  'et_admin_courses',
  profile:  'et_admin_profile',
  donate:   'et_admin_donate',
  results:  'et_admin_results',
  lessons:  'et_admin_lessons',
  subitems: 'et_admin_subitems',
}

const DEFAULTS = {
  courses: [
    {
      id: 'zero',
      title: 'English from Zero',
      desc: 'Learn English from scratch. Alphabet, conversation and grammar.',
      badge: 'Beginner',
      level: 'A1 → B2',
      gradient: 'linear-gradient(135deg,#b91c1c,#ef4444)',
    },
    {
      id: 'ielts',
      title: 'IELTS Preparation',
      desc: 'Preparation for the international IELTS exam. Listening, Reading, Writing, Speaking.',
      badge: 'Certificate',
      level: 'Band 6–8',
      gradient: 'linear-gradient(135deg,#991b1b,#dc2626)',
    },
    {
      id: 'multi',
      title: 'Multilevel',
      desc: 'All levels supported. Continue at your current level and advance further.',
      badge: 'All Levels',
      level: 'A1 – C2',
      gradient: 'linear-gradient(135deg,#7f1d1d,#b91c1c)',
    },
  ],
  profile: {
    name: 'Teacher Tolib',
    role: 'English Teacher · IELTS Coach',
    experience: '6',
    ieltsScore: '8.0',
    cefrLevel: 'C2',
    bio: 'I use an innovative approach to teaching English. I am ready to share all my knowledge, having helped over 1200 students achieve their goals.',
    phone: '+998 99 123 45 67',
    telegram: '@teacher_tolib',
    image: null,
  },
  donate: {
    cardNumber: '5614 6818 1203 4217',
    cardHolder: 'TEACHER TOLIB',
    cardType: 'Uzcard',
    message: 'Your support helps create new lessons and materials for students.',
  },
  results: [
    {
      id: 'sample_1',
      name: 'Ezoza Khamrakulova',
      overall: '7.0',
      listening: '7.5',
      reading: '7.0',
      writing: '6.5',
      speaking: '6.5',
      comment: 'Ezoza completed the IELTS course and achieved an overall band of 7.0. She performed exceptionally well in the Listening section.',
      image: null,
    },
    {
      id: 'sample_2',
      name: 'Durdona Abduganiyeva',
      overall: '8.0',
      listening: '8.5',
      reading: '8.0',
      writing: '7.5',
      speaking: '7.0',
      comment: 'Durdona completed the IELTS course and achieved an overall band of 8.0 — a very high result across all sections.',
      image: null,
    },
  ],
  lessons: [
    { id: 'l_zero_1', courseId: 'zero',  title: 'Grammar A1 to C2',    description: 'From beginner to advanced level.', image: null, order: 0 },
    { id: 'l_zero_2', courseId: 'zero',  title: 'Topic Grammar Test',  description: 'Test your knowledge by topic.', image: null, order: 1 },
    { id: 'l_zero_3', courseId: 'zero',  title: 'Vocabulary Test',     description: 'Expand your word bank.', image: null, order: 2 },
    { id: 'l_zero_4', courseId: 'zero',  title: 'Level Test',          description: 'Find out your English level. You will be directed to the right course based on your result.', image: null, order: 3 },
    { id: 'l_ielts_1', courseId: 'ielts', title: 'Listening',          description: 'Practice with real IELTS listening tests and audio exercises.', image: null, order: 0 },
    { id: 'l_ielts_2', courseId: 'ielts', title: 'Reading',            description: 'Improve reading speed and comprehension for IELTS exams.', image: null, order: 1 },
    { id: 'l_ielts_3', courseId: 'ielts', title: 'Writing',            description: 'Master Task 1 and Task 2 essay writing techniques.', image: null, order: 2 },
    { id: 'l_ielts_4', courseId: 'ielts', title: 'Speaking',           description: 'Build fluency and confidence for the IELTS speaking test.', image: null, order: 3 },
    { id: 'l_multi_1', courseId: 'multi', title: 'A1 Basics',          description: 'Absolute beginner content: alphabet, numbers, simple words.', image: null, order: 0 },
    { id: 'l_multi_2', courseId: 'multi', title: 'A2 Elementary',      description: 'Basic grammar, simple sentences and everyday vocabulary.', image: null, order: 1 },
    { id: 'l_multi_3', courseId: 'multi', title: 'B1 Intermediate',    description: 'Develop your grammar and start speaking more fluently.', image: null, order: 2 },
    { id: 'l_multi_4', courseId: 'multi', title: 'B2 Upper',           description: 'Advanced topics, complex grammar and academic vocabulary.', image: null, order: 3 },
  ],
  subitems: [
    { id: 'si_zero_a1', lessonId: 'l_zero_1', courseId: 'zero', badge: 'A1', title: 'Beginner',          description: 'For complete beginners. Alphabet, greetings, and simple sentences.', order: 0 },
    { id: 'si_zero_a2', lessonId: 'l_zero_1', courseId: 'zero', badge: 'A2', title: 'Elementary',        description: 'Everyday topics: family, work, home. Basic grammar and conversations.', order: 1 },
    { id: 'si_zero_b1', lessonId: 'l_zero_1', courseId: 'zero', badge: 'B1', title: 'Intermediate',      description: 'Intermediate level. Travel, work, education. Starting to speak freely.', order: 2 },
    { id: 'si_zero_b2', lessonId: 'l_zero_1', courseId: 'zero', badge: 'B2', title: 'Upper Intermediate', description: 'Complex topics: social, cultural, professional. IELTS 5.5–6.5.', order: 3 },
    { id: 'si_zero_c1', lessonId: 'l_zero_1', courseId: 'zero', badge: 'C1', title: 'Advanced',          description: 'Academic and professional level. Complex tasks, academic writing and speech.', order: 4 },
    { id: 'si_zero_c2', lessonId: 'l_zero_1', courseId: 'zero', badge: 'C2', title: 'Proficient',        description: 'Near native level. Free and precise communication on any topic.', order: 5 },
  ],
}

const read = (key, def) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : def
  } catch { return def }
}
const write = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

const OLD_ZERO_TITLES = ['Alphabet', 'Greetings', 'Numbers', 'Daily Conversation']

const migrateAndGetLessons = () => {
  const stored = read(KEYS.lessons, null)
  if (!stored) return DEFAULTS.lessons
  const hasOldZero = stored.some(l => l.courseId === 'zero' && OLD_ZERO_TITLES.includes(l.title))
  if (hasOldZero) {
    const nonZero = stored.filter(l => l.courseId !== 'zero')
    const newData = [...nonZero, ...DEFAULTS.lessons.filter(l => l.courseId === 'zero')]
    write(KEYS.lessons, newData)
    return newData
  }
  return stored
}

export const db = {
  getCourses:  () => read(KEYS.courses, DEFAULTS.courses),
  saveCourses: (v) => write(KEYS.courses, v),

  getProfile:  () => ({ ...DEFAULTS.profile, ...read(KEYS.profile, {}) }),
  saveProfile: (v) => write(KEYS.profile, v),

  getDonate:   () => ({ ...DEFAULTS.donate, ...read(KEYS.donate, {}) }),
  saveDonate:  (v) => write(KEYS.donate, v),

  getResults:  () => read(KEYS.results, DEFAULTS.results),
  saveResults: (v) => write(KEYS.results, v),

  getLessons:  () => migrateAndGetLessons(),
  saveLessons: (v) => write(KEYS.lessons, v),
  getLessonsByCourse: (courseId) => {
    const all = migrateAndGetLessons()
    return all.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order)
  },
  deleteLessonsByCourse: (courseId) => {
    const all = migrateAndGetLessons()
    write(KEYS.lessons, all.filter(l => l.courseId !== courseId))
  },

  getSubitems:  () => read(KEYS.subitems, DEFAULTS.subitems),
  saveSubitems: (v) => write(KEYS.subitems, v),
  getSubitemsByLesson: (lessonId) => {
    const all = read(KEYS.subitems, DEFAULTS.subitems)
    return all.filter(s => s.lessonId === lessonId).sort((a, b) => a.order - b.order)
  },
  deleteSubitemsByLesson: (lessonId) => {
    const all = read(KEYS.subitems, DEFAULTS.subitems)
    write(KEYS.subitems, all.filter(s => s.lessonId !== lessonId))
  },
}

export const genId = () => `item_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
