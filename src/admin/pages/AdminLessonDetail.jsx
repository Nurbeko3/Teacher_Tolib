import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, genId } from '../adminData'
import {
  Field, Modal, ConfirmModal,
  btnPrimary, btnGhost, btnSm, btnSmDanger, inputCls, textareaCls, Empty,
} from '../AdminUI'

/* ── Add/Edit subitem modal ── */
function SubitemModal({ item, lessonId, courseId, nextOrder, onSave, onClose }) {
  const isNew = !item
  const [form, setForm] = useState(
    item
      ? { ...item }
      : { id: genId(), lessonId, courseId, badge: '', title: '', description: '', order: nextOrder }
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <Modal title={isNew ? 'Add Level' : 'Edit Level'} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Badge *" hint="e.g. A1, B2, C1">
            <input
              value={form.badge}
              onChange={e => set('badge', e.target.value)}
              className={inputCls}
              placeholder="A1"
              autoFocus
            />
          </Field>
          <div className="col-span-2">
            <Field label="Title *" hint="e.g. Beginner">
              <input
                value={form.title}
                onChange={e => set('title', e.target.value)}
                className={inputCls}
                placeholder="Beginner"
              />
            </Field>
          </div>
        </div>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            rows={3}
            className={textareaCls}
            placeholder="Short description of what this level covers..."
          />
        </Field>

        {/* Preview */}
        {(form.badge || form.title) && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Preview</p>
            <div className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-[#1a1a2e] border border-white/10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-red-700 to-red-500">
                <span className="text-white font-black text-[13px]">{form.badge || '—'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-[14px]">{form.title || 'Title'}</p>
                {form.description && (
                  <p className="text-white/50 text-[11px] mt-0.5 line-clamp-1">{form.description}</p>
                )}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button
          onClick={() => { if (form.badge.trim() && form.title.trim()) onSave(form) }}
          className={btnPrimary}
          disabled={!form.badge.trim() || !form.title.trim()}
        >
          {isNew ? 'Add Level' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

/* ── Level card row ── */
function SubitemRow({ item, index, total, onEdit, onDelete, onMove }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 p-4">
        {/* Badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#b91c1c,#ef4444)', boxShadow: '0 3px 10px rgba(220,38,38,0.25)' }}
        >
          <span className="text-white font-black text-[13px]">{item.badge}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-[14px] leading-tight">{item.title}</h3>
          {item.description && (
            <p className="text-gray-400 text-[12px] mt-0.5 leading-relaxed line-clamp-2">{item.description}</p>
          )}
        </div>

        {/* Reorder */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <button
            onClick={() => onMove(item.id, 'up')}
            disabled={index === 0}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M18 15l-6-6-6 6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => onMove(item.id, 'down')}
            disabled={index === total - 1}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 px-4 pb-3 pt-0">
        <button onClick={() => onEdit(item)} className={btnSm}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className={btnSmDanger}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}

export default function AdminLessonDetail() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()

  const [course,  setCourse]  = useState(null)
  const [lesson,  setLesson]  = useState(null)
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)
  const [delId,   setDelId]   = useState(null)

  useEffect(() => {
    Promise.all([
      api.getCourses(),
      api.getLessons(),
      api.getSubitemsByLesson(lessonId),
    ]).then(([courses, lessons, subitems]) => {
      setCourse(courses.find(c => c.id === courseId) || null)
      setLesson(lessons.find(l => l.id === lessonId) || null)
      setItems(subitems)
    }).finally(() => setLoading(false))
  }, [courseId, lessonId])

  if (loading) return <div className="p-8 text-gray-400">Loading...</div>

  if (!course || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-400 font-medium mb-3">Section not found.</p>
        <button onClick={() => navigate(-1)} className={btnPrimary}>Go Back</button>
      </div>
    )
  }

  const refreshItems = () => api.getSubitemsByLesson(lessonId).then(setItems)

  const handleSave = async (form) => {
    const exists = items.some(s => s.id === form.id)
    if (exists) {
      await api.updateSubitem(form.id, form)
    } else {
      await api.addSubitem({ ...form, order: items.length })
    }
    await refreshItems()
    setModal(null)
  }

  const handleDelete = async () => {
    await api.deleteSubitem(delId)
    await refreshItems()
    setDelId(null)
  }

  const handleMove = async (id, dir) => {
    const arr = [...items]
    const idx = arr.findIndex(s => s.id === id)
    if (dir === 'up' && idx > 0) [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
    else if (dir === 'down' && idx < arr.length - 1) [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
    arr.forEach((s, i) => { s.order = i })
    await Promise.all(arr.map(s => api.updateSubitem(s.id, s)))
    setItems([...arr])
  }

  return (
    <div>
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 text-[12px] text-gray-400 mb-5 flex-wrap">
        <button onClick={() => navigate('/admin/courses')} className="hover:text-red-600 transition-colors font-medium">
          Courses
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <button onClick={() => navigate(`/admin/courses/${courseId}`)} className="hover:text-red-600 transition-colors font-medium">
          {course.title}
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-gray-700 font-semibold truncate">{lesson.title}</span>
      </nav>

      {/* ── Header banner ── */}
      <div className="rounded-2xl overflow-hidden mb-6 relative" style={{ background: course.gradient }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.1]" style={{ border: '30px solid white' }} />
        <div className="relative z-10 px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/admin/courses/${courseId}`)}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-0.5">{course.title}</p>
              <h1 className="text-white font-black text-[20px] leading-tight">{lesson.title}</h1>
              {lesson.description && (
                <p className="text-white/70 text-[12px] mt-0.5">{lesson.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-white/70 text-[12px] font-medium">
              {items.length} level{items.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setModal({ type: 'add' })}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-red-600 font-bold text-[13px] hover:bg-red-50 transition-colors shadow-lg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Add Level
            </button>
          </div>
        </div>
      </div>

      {/* ── Items list ── */}
      {items.length === 0 ? (
        <Empty message="No levels yet. Click 'Add Level' to create the first one." />
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <SubitemRow
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              onEdit={s => setModal({ type: 'edit', data: s })}
              onDelete={id => setDelId(id)}
              onMove={handleMove}
            />
          ))}
        </div>
      )}

      {modal && (
        <SubitemModal
          item={modal.type === 'edit' ? modal.data : null}
          lessonId={lessonId}
          courseId={courseId}
          nextOrder={items.length}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Level"
          message="Are you sure you want to delete this level? This cannot be undone."
          onConfirm={handleDelete}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
