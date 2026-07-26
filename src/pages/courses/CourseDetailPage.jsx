import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../Navbar'
import Footer from '../../components/Footer'
import BackButton from '../../components/BackButton'
import { api } from '../../api'
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnail } from '../../utils/youtube'

const copy = {
  uz: {
    lessons: 'Kurs darslari',
    choose: 'Videoni ko‘rish uchun darsni tanlang',
    empty: 'Bu kursga hali dars qo‘shilmagan.',
    noVideo: 'Bu dars uchun video hali joylanmagan.',
    loading: 'Kurs yuklanmoqda...',
    notFound: 'Kurs topilmadi.',
  },
  ru: {
    lessons: 'Уроки курса',
    choose: 'Выберите урок для просмотра видео',
    empty: 'В этом курсе пока нет уроков.',
    noVideo: 'Видео для этого урока ещё не добавлено.',
    loading: 'Загрузка курса...',
    notFound: 'Курс не найден.',
  },
  en: {
    lessons: 'Course lessons',
    choose: 'Select a lesson to watch its video',
    empty: 'No lessons have been added to this course yet.',
    noVideo: 'A video has not been added to this lesson yet.',
    loading: 'Loading course...',
    notFound: 'Course not found.',
  },
}

export default function CourseDetailPage({ lang = 'uz', setLang, dark, setDark, onLogout }) {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const t = copy[lang] || copy.uz
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([api.getCourses(), api.getLessonsByCourse(courseId)])
      .then(([courses, lessonList]) => {
        if (!active) return
        setCourse(courses.find(item => item.id === courseId) || null)
        setLessons(lessonList)
        const firstVideo = lessonList.find(item => extractYouTubeId(item.youtubeUrl))
        setSelectedId((firstVideo || lessonList[0])?.id || null)
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [courseId])

  const selectedLesson = useMemo(
    () => lessons.find(item => item.id === selectedId) || null,
    [lessons, selectedId],
  )
  const selectedVideoId = extractYouTubeId(selectedLesson?.youtubeUrl)

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white dark:bg-gray-950">
      <Navbar lang={lang} setLang={setLang} dark={dark} setDark={setDark} onLogout={onLogout} />

      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        <BackButton onClick={() => navigate('/courses')} className="mb-5" lang={lang} />

        {loading ? (
          <div className="py-24 text-center text-gray-400">{t.loading}</div>
        ) : !course ? (
          <div className="py-24 text-center text-gray-400">{t.notFound}</div>
        ) : (
          <>
            <section
              className="rounded-3xl overflow-hidden p-6 sm:p-8 text-white relative shadow-xl"
              style={{ background: course.gradient || 'linear-gradient(135deg,#991b1b,#ef4444)' }}
            >
              <div className="absolute -right-12 -top-16 w-52 h-52 rounded-full border-[38px] border-white/10" />
              <div className="relative max-w-2xl">
                <div className="flex gap-2 mb-4">
                  {course.badge && <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase">{course.badge}</span>}
                  {course.level && <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-bold">{course.level}</span>}
                </div>
                <h1 className="text-2xl sm:text-4xl font-black leading-tight">{course.title}</h1>
                {course.desc && <p className="mt-3 text-white/75 text-sm sm:text-base leading-relaxed">{course.desc}</p>}
              </div>
            </section>

            {lessons.length === 0 ? (
              <div className="mt-8 py-16 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 text-center text-gray-400">
                {t.empty}
              </div>
            ) : (
              <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-7 items-start">
                <section className="min-w-0">
                  <div className="aspect-video rounded-3xl overflow-hidden bg-gray-950 shadow-2xl ring-1 ring-black/5">
                    {selectedVideoId ? (
                      <iframe
                        key={selectedVideoId}
                        src={getYouTubeEmbedUrl(selectedVideoId, false)}
                        title={selectedLesson?.title || course.title}
                        className="w-full h-full"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center px-8">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5v14l11-7L8 5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-white/55 text-sm">{t.noVideo}</p>
                      </div>
                    )}
                  </div>

                  {selectedLesson && (
                    <div className="mt-5 px-1">
                      <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{selectedLesson.title}</h2>
                      {selectedLesson.description && (
                        <p className="mt-2 text-sm sm:text-base leading-7 text-gray-500 dark:text-gray-400">{selectedLesson.description}</p>
                      )}
                    </div>
                  )}
                </section>

                <aside className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="font-black text-gray-900 dark:text-white">{t.lessons}</h2>
                    <p className="text-xs text-gray-400 mt-1">{t.choose}</p>
                  </div>
                  <div className="p-2 max-h-[560px] overflow-y-auto">
                    {lessons.map((lesson, index) => {
                      const videoId = extractYouTubeId(lesson.youtubeUrl)
                      const selected = lesson.id === selectedId
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedId(lesson.id)}
                          className={`w-full text-left p-3 rounded-2xl flex gap-3 transition ${
                            selected
                              ? 'bg-red-50 dark:bg-red-950/40 ring-1 ring-red-100 dark:ring-red-900'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="w-24 aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 relative">
                            {videoId ? (
                              <img src={getYouTubeThumbnail(videoId)} alt="" className="w-full h-full object-cover" loading="lazy" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <span className="text-xs font-black">{String(index + 1).padStart(2, '0')}</span>
                              </div>
                            )}
                            {videoId && <div className="absolute inset-0 bg-black/15 flex items-center justify-center"><span className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-red-600">▶</span></div>}
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <p className={`text-[13px] font-bold leading-snug line-clamp-2 ${selected ? 'text-red-700 dark:text-red-300' : 'text-gray-800 dark:text-gray-100'}`}>
                              {lesson.title}
                            </p>
                            {lesson.description && <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{lesson.description}</p>}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </aside>
              </div>
            )}
          </>
        )}
      </main>

      <Footer dark={dark} lang={lang} />
    </div>
  )
}
