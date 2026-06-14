import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db, genId } from '../adminData'
// db.getSubitemsByLesson used for subitem count badge
import {
  PageHeader, Field, Modal, ConfirmModal,
  btnPrimary, btnGhost, btnSm, btnSmDanger, inputCls, textareaCls, Empty, ImageUploader,
} from '../AdminUI'

/* ── Lesson form modal ── */
function LessonModal({ lesson, courseId, nextOrder, onSave, onClose }) {
  const isNew = !lesson
  const [form, setForm] = useState(
    lesson
      ? { ...lesson }
      : { id: genId(), courseId, title: '', description: '', image: null, order: nextOrder }
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <Modal title={isNew ? 'Add Lesson' : 'Edit Lesson'} onClose={onClose} wide>
      <div className="space-y-4">
        <ImageUploader
          value={form.image}
          onChange={v => set('image', v)}
          label="Lesson Cover (optional)"
          size={80}
        />

        <Field label="Lesson Title *">
          <input value={form.title} onChange={e => set('title', e.target.value)}
            className={inputCls} placeholder="e.g. Alphabet" autoFocus />
        </Field>

        <Field label="Description">
          <textarea value={form.description} onChange={e => set('description', e.target.value)}
            rows={3} className={textareaCls} placeholder="What will students learn in this lesson?" />
        </Field>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button
          onClick={() => { if (form.title.trim()) onSave(form) }}
          className={btnPrimary}
        >
          {isNew ? 'Add Lesson' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

/* ── Section icons for well-known lesson types ── */
const SECTION_ICONS = {
  'Grammar A1 to C2': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Topic Grammar Test': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Vocabulary Test': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 20h9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Level Test': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
      <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  ),
}

const DEFAULT_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 10h16M4 14h10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ── Lesson card row ── */
function LessonRow({ lesson, index, total, onEdit, onDelete, onMove, onOpen }) {
  const icon = SECTION_ICONS[lesson.title] || DEFAULT_ICON
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onOpen}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Icon / number */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#b91c1c,#ef4444)', boxShadow: '0 3px 10px rgba(220,38,38,0.3)' }}
        >
          {lesson.image ? (
            <img src={lesson.image} alt="" className="w-full h-full object-cover rounded-xl" />
          ) : icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-300">#{index + 1}</span>
            <h3 className="font-bold text-gray-900 text-[14px] leading-tight group-hover:text-red-600 transition-colors">{lesson.title}</h3>
          </div>
          {lesson.description && (
            <p className="text-gray-400 text-[12px] mt-1 leading-relaxed line-clamp-2">{lesson.description}</p>
          )}
        </div>

        {/* Open arrow */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 text-gray-300 group-hover:text-red-400 transition-colors mt-1">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Up / Down reorder */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <button
            onClick={() => onMove(lesson.id, 'up')}
            disabled={index === 0}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move up"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M18 15l-6-6-6 6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => onMove(lesson.id, 'down')}
            disabled={index === total - 1}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move down"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 px-4 pb-3 pt-0" onClick={e => e.stopPropagation()}>
        <button onClick={() => onEdit(lesson)} className={btnSm}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
        <button onClick={() => onDelete(lesson.id)} className={btnSmDanger}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}

export default function AdminCourseDetail() {
  const { courseId } = useParams()
  const navigate     = useNavigate()
  const subitemCount = (lessonId) => db.getSubitemsByLesson(lessonId).length

  const course  = db.getCourses().find(c => c.id === courseId)
  const [lessons, setLessons] = useState(() => db.getLessonsByCourse(courseId))
  const [modal,   setModal]   = useState(null)
  const [delId,   setDelId]   = useState(null)

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-400 font-medium mb-3">Course not found.</p>
        <button onClick={() => navigate('/admin/courses')} className={btnPrimary}>
          Back to Courses
        </button>
      </div>
    )
  }

  const persistLessons = (updated) => {
    const all = db.getLessons().filter(l => l.courseId !== courseId)
    db.saveLessons([...all, ...updated])
    setLessons(updated)
  }

  const handleSave = (form) => {
    const exists = lessons.some(l => l.id === form.id)
    const updated = exists
      ? lessons.map(l => l.id === form.id ? form : l)
      : [...lessons, { ...form, order: lessons.length }]
    updated.forEach((l, i) => { l.order = i })
    persistLessons(updated)
    setModal(null)
  }

  const handleDelete = () => {
    const updated = lessons.filter(l => l.id !== delId)
    updated.forEach((l, i) => { l.order = i })
    persistLessons(updated)
    setDelId(null)
  }

  const handleMove = (id, dir) => {
    const arr = [...lessons]
    const idx = arr.findIndex(l => l.id === id)
    if (dir === 'up' && idx > 0) {
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
    } else if (dir === 'down' && idx < arr.length - 1) {
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
    }
    arr.forEach((l, i) => { l.order = i })
    persistLessons(arr)
  }

  return (
    <div>
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-[12px] text-gray-400 mb-5">
        <button
          onClick={() => navigate('/admin/courses')}
          className="hover:text-red-600 transition-colors font-medium"
        >
          Courses
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-gray-700 font-semibold truncate">{course.title}</span>
      </nav>

      {/* ── Course header banner ── */}
      <div className="rounded-2xl overflow-hidden mb-6 relative" style={{ background: course.gradient }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.1]" style={{ border: '30px solid white' }} />
        <div className="relative z-10 px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/courses')}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
              title="Back"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-0.5">Course</p>
              <h1 className="text-white font-black text-[20px] leading-tight">{course.title}</h1>
              {course.desc && <p className="text-white/70 text-[12px] mt-0.5 line-clamp-1">{course.desc}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-white/70 text-[12px] font-medium">
              {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
            </span>
            <button onClick={() => setModal({ type: 'add' })} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-red-600 font-bold text-[13px] hover:bg-red-50 transition-colors shadow-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Add Lesson
            </button>
          </div>
        </div>
      </div>

      {/* ── Lessons list ── */}
      {lessons.length === 0 ? (
        <Empty message="No lessons yet. Click 'Add Lesson' to create the first one." />
      ) : (
        <div className="flex flex-col gap-3">
          {lessons.map((lesson, i) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              index={i}
              total={lessons.length}
              onEdit={l => setModal({ type: 'edit', data: l })}
              onDelete={id => setDelId(id)}
              onMove={handleMove}
              onOpen={() => navigate(`/admin/courses/${courseId}/${lesson.id}`)}
            />
          ))}
        </div>
      )}


      {modal && (
        <LessonModal
          lesson={modal.type === 'edit' ? modal.data : null}
          courseId={courseId}
          nextOrder={lessons.length}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Lesson"
          message="Are you sure you want to delete this lesson? This cannot be undone."
          onConfirm={handleDelete}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
