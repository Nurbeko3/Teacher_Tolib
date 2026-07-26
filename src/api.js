const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.message || `API error ${res.status}`)
  }
  return res.json()
}

export const api = {
  // Courses
  getCourses:    ()         => req('GET',    '/courses'),
  addCourse:     (data)     => req('POST',   '/courses', data),
  updateCourse:  (id, data) => req('PUT',    `/courses/${id}`, data),
  deleteCourse:  (id)       => req('DELETE', `/courses/${id}`),

  // Lessons
  getLessons:            ()         => req('GET',    '/lessons'),
  getLessonsByCourse:    (courseId) => req('GET',    `/lessons/course/${courseId}`),
  addLesson:             (data)     => req('POST',   '/lessons', data),
  updateLesson:          (id, data) => req('PUT',    `/lessons/${id}`, data),
  deleteLesson:          (id)       => req('DELETE', `/lessons/${id}`),
  deleteLessonsByCourse: (courseId) => req('DELETE', `/lessons/course/${courseId}`),

  // Subitems
  getSubitems:           ()         => req('GET',    '/subitems'),
  getSubitemsByLesson:   (lessonId) => req('GET',    `/subitems/lesson/${lessonId}`),
  addSubitem:            (data)     => req('POST',   '/subitems', data),
  updateSubitem:         (id, data) => req('PUT',    `/subitems/${id}`, data),
  deleteSubitem:         (id)       => req('DELETE', `/subitems/${id}`),
  deleteSubitemsByLesson:(lessonId) => req('DELETE', `/subitems/lesson/${lessonId}`),

  // Profile
  getProfile:  ()     => req('GET', '/profile'),
  saveProfile: (data) => req('PUT', '/profile', data),

  // Donate
  getDonate:  ()     => req('GET', '/donate'),
  saveDonate: (data) => req('PUT', '/donate', data),

  // Donations (donor entries received via the public Donate page)
  getDonations:    ()     => req('GET',    '/donations'),
  addDonation:     (data) => req('POST',   '/donations', data),
  deleteDonation:  (id)   => req('DELETE', `/donations/${id}`),

  // Results
  getResults:   ()         => req('GET',    '/results'),
  addResult:    (data)     => req('POST',   '/results', data),
  updateResult: (id, data) => req('PUT',    `/results/${id}`, data),
  deleteResult: (id)       => req('DELETE', `/results/${id}`),

  // Testimonials
  getTestimonials:    ()         => req('GET',    '/testimonials'),
  addTestimonial:     (data)     => req('POST',   '/testimonials', data),
  updateTestimonial:  (id, data) => req('PUT',    `/testimonials/${id}`, data),
  deleteTestimonial:  (id)       => req('DELETE', `/testimonials/${id}`),

  // Users
  getUsers:   ()         => req('GET',    '/users'),
  addUser:    (data)     => req('POST',   '/users', data),
  updateUser: (id, data) => req('PUT',    `/users/${id}`, data),
  deleteUser: (id)       => req('DELETE', `/users/${id}`),

  // Grammar levels (Topic Grammar Test)
  getGrammarLevels:         ()         => req('GET',    '/grammar-levels'),
  getGrammarLevelsByLesson: (lessonId) => req('GET',    `/grammar-levels/lesson/${lessonId}`),
  addGrammarLevel:          (data)     => req('POST',   '/grammar-levels', data),
  updateGrammarLevel:       (id, data) => req('PUT',    `/grammar-levels/${id}`, data),
  deleteGrammarLevel:       (id)       => req('DELETE', `/grammar-levels/${id}`),

  // Grammar units
  getGrammarUnits:         ()         => req('GET',    '/grammar-units'),
  getGrammarUnitsByLesson: (lessonId) => req('GET',    `/grammar-units/lesson/${lessonId}`),
  getGrammarUnitsByLevel:  (levelId)  => req('GET',    `/grammar-units/level/${levelId}`),
  addGrammarUnit:          (data)     => req('POST',   '/grammar-units', data),
  updateGrammarUnit:       (id, data) => req('PUT',    `/grammar-units/${id}`, data),
  deleteGrammarUnit:       (id)       => req('DELETE', `/grammar-units/${id}`),

  // Grammar questions
  getGrammarQuestions:       ()        => req('GET',    '/grammar-questions'),
  getGrammarQuestionsByUnit: (unitId)  => req('GET',    `/grammar-questions/unit/${unitId}`),
  addGrammarQuestion:        (data)    => req('POST',   '/grammar-questions', data),
  updateGrammarQuestion:     (id, data)=> req('PUT',    `/grammar-questions/${id}`, data),
  deleteGrammarQuestion:     (id)      => req('DELETE', `/grammar-questions/${id}`),

  // Vocab topics (Vocabulary Test)
  getVocabTopics:         ()         => req('GET',    '/vocab-topics'),
  getVocabTopicsByLesson: (lessonId) => req('GET',    `/vocab-topics/lesson/${lessonId}`),
  addVocabTopic:          (data)     => req('POST',   '/vocab-topics', data),
  updateVocabTopic:       (id, data) => req('PUT',    `/vocab-topics/${id}`, data),
  deleteVocabTopic:       (id)       => req('DELETE', `/vocab-topics/${id}`),

  // Vocab questions
  getVocabQuestions:        ()         => req('GET',    '/vocab-questions'),
  getVocabQuestionsByTopic: (topicId)  => req('GET',    `/vocab-questions/topic/${topicId}`),
  addVocabQuestion:         (data)     => req('POST',   '/vocab-questions', data),
  updateVocabQuestion:      (id, data) => req('PUT',    `/vocab-questions/${id}`, data),
  deleteVocabQuestion:      (id)       => req('DELETE', `/vocab-questions/${id}`),

  // Socials
  getSocials:    ()         => req('GET',    '/socials'),
  addSocial:     (data)     => req('POST',   '/socials', data),
  updateSocial:  (id, data) => req('PUT',    `/socials/${id}`, data),
  deleteSocial:  (id)       => req('DELETE', `/socials/${id}`),

  // OTP (Eskiz SMS phone verification)
  sendOtp:   (phone)       => req('POST', '/otp/send', { phone }),
  verifyOtp: (phone, code) => req('POST', '/otp/verify', { phone, code }),

  // Video lessons (YouTube tutorials)
  getVideoLessons:           ()         => req('GET',    '/video-lessons'),
  getVideoLessonsByCategory: (category) => req('GET',    `/video-lessons/category/${category}`),
  addVideoLesson:            (data)     => req('POST',   '/video-lessons', data),
  updateVideoLesson:         (id, data) => req('PUT',    `/video-lessons/${id}`, data),
  deleteVideoLesson:         (id)       => req('DELETE', `/video-lessons/${id}`),
}
