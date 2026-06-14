import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, genId } from '../adminData'
import {
  PageHeader, Field, Modal, ConfirmModal,
  btnPrimary, btnGhost, btnSm, btnSmDanger, inputCls, textareaCls, Empty,
} from '../AdminUI'

const GRADIENTS = [
  { label: 'Red',      value: 'linear-gradient(135deg,#b91c1c,#ef4444)' },
  { label: 'Dark Red', value: 'linear-gradient(135deg,#991b1b,#dc2626)' },
  { label: 'Crimson',  value: 'linear-gradient(135deg,#7f1d1d,#b91c1c)' },
  { label: 'Orange',   value: 'linear-gradient(135deg,#c2410c,#f97316)' },
  { label: 'Purple',   value: 'linear-gradient(135deg,#4c1d95,#7c3aed)' },
  { label: 'Blue',     value: 'linear-gradient(135deg,#1e3a8a,#2563eb)' },
  { label: 'Green',    value: 'linear-gradient(135deg,#14532d,#16a34a)' },
  { label: 'Teal',     value: 'linear-gradient(135deg,#134e4a,#0d9488)' },
]

function CourseModal({ course, onSave, onClose }) {
  const isNew = !course
  const [form, setForm] = useState(
    course
      ? { ...course }
      : { id: genId(), title: '', desc: '', badge: '', level: '', gradient: GRADIENTS[0].value }
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <Modal title={isNew ? 'Add Course' : 'Edit Course'} onClose={onClose}>
      <div className="space-y-4">
        <Field label="Course Title *">
          <input value={form.title} onChange={e => set('title', e.target.value)}
            className={inputCls} placeholder="e.g. IELTS Preparation" autoFocus />
        </Field>

        <Field label="Description">
          <textarea value={form.desc} onChange={e => set('desc', e.target.value)}
            rows={3} className={textareaCls} placeholder="Short course description..." />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Badge">
            <input value={form.badge} onChange={e => set('badge', e.target.value)}
              className={inputCls} placeholder="e.g. Certificate" />
          </Field>
          <Field label="Level">
            <input value={form.level} onChange={e => set('level', e.target.value)}
              className={inputCls} placeholder="e.g. Band 6–8" />
          </Field>
        </div>

        <Field label="Card Color">
          <div className="flex gap-2 flex-wrap mt-1">
            {GRADIENTS.map(g => (
              <button key={g.value} onClick={() => set('gradient', g.value)} title={g.label}
                className={`w-8 h-8 rounded-lg border-2 transition-all duration-150 ${
                  form.gradient === g.value ? 'border-gray-800 scale-110 shadow-md' : 'border-transparent hover:scale-105'
                }`}
                style={{ background: g.value }}
              />
            ))}
          </div>
        </Field>

        {/* Preview */}
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Preview</p>
          <div className="rounded-2xl p-4 text-white" style={{ background: form.gradient }}>
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20">{form.badge || 'Badge'}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/20">{form.level || 'Level'}</span>
            </div>
            <h3 className="font-extrabold text-lg leading-tight">{form.title || 'Course Title'}</h3>
            <p className="text-white/80 text-xs mt-1 leading-relaxed">{form.desc || 'Description...'}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button onClick={() => { if (form.title.trim()) onSave(form) }} className={btnPrimary}>
          {isNew ? 'Add Course' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

export default function AdminCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState(db.getCourses)
  const [modal,   setModal]   = useState(null)
  const [delId,   setDelId]   = useState(null)

  const allLessons = db.getLessons()
  const lessonCount = (courseId) => allLessons.filter(l => l.courseId === courseId).length

  const persist = (updated) => { db.saveCourses(updated); setCourses(updated) }

  const handleSave = (form) => {
    const exists = courses.some(c => c.id === form.id)
    persist(exists ? courses.map(c => c.id === form.id ? form : c) : [...courses, form])
    setModal(null)
  }

  const handleDelete = () => {
    persist(courses.filter(c => c.id !== delId))
    db.deleteLessonsByCourse(delId)
    setDelId(null)
  }

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle={`${courses.length} course categor${courses.length !== 1 ? 'ies' : 'y'}`}
        action={
          <button onClick={() => setModal({ type: 'add' })} className={btnPrimary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Course
          </button>
        }
      />

      {courses.length === 0 ? (
        <Empty message="No courses yet. Click 'Add Course' to get started." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map(course => {
            const count = lessonCount(course.id)
            return (
              <div key={course.id}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer group"
                style={{ background: course.gradient }}
                onClick={() => navigate(`/admin/courses/${course.id}`)}
              >
                {/* Gradient card body */}
                <div className="p-5 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10" style={{ border: '24px solid white' }} />
                  <div className="absolute bottom-2 -right-2 w-16 h-16 rounded-full opacity-[0.07]" style={{ border: '14px solid white' }} />

                  {/* Badge + level */}
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/20 text-white uppercase tracking-wider">
                      {course.badge || 'Course'}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white/80">
                      {course.level || '—'}
                    </span>
                  </div>

                  {/* Book icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-3 relative z-10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <h3 className="font-black text-[17px] text-white leading-tight mb-1.5 relative z-10 group-hover:underline underline-offset-2">
                    {course.title}
                  </h3>
                  <p className="text-white/70 text-[12px] leading-relaxed line-clamp-2 relative z-10">
                    {course.desc || 'No description.'}
                  </p>

                  {/* Lesson count + arrow */}
                  <div className="flex items-center justify-between mt-4 relative z-10">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white">
                      {count} lesson{count !== 1 ? 's' : ''}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Actions bar */}
                <div className="bg-black/20 px-4 py-2.5 flex gap-2" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => setModal({ type: 'edit', data: course })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold transition-colors"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => setDelId(course.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/40 text-white/70 hover:text-white text-[11px] font-semibold transition-colors"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete
                  </button>
                  <span className="ml-auto text-white/40 text-[10px] flex items-center gap-1">
                    Click to manage lessons
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <CourseModal
          course={modal.type === 'edit' ? modal.data : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Course"
          message="Are you sure? This will also delete all lessons inside this course."
          onConfirm={handleDelete}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
