import { useState, useEffect } from 'react'
import { api, genId } from '../adminData'
import {
  PageHeader, Field, Modal, ConfirmModal, Empty,
  btnPrimary, btnGhost, inputCls, textareaCls,
} from '../AdminUI'
import { extractYouTubeId, getYouTubeThumbnail } from '../../utils/youtube'

const CATEGORIES = [
  { id: 'listening', label: 'Listening' },
  { id: 'reading',   label: 'Reading' },
  { id: 'writing',   label: 'Writing' },
  { id: 'speaking',  label: 'Speaking' },
]

const EMPTY_FORM = { id: '', category: 'listening', title: '', description: '', youtubeUrl: '', order: 0 }

/* ── Video card ── */
function VideoCard({ item, onEdit, onDelete }) {
  const videoId = extractYouTubeId(item.youtubeUrl)
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="aspect-video bg-gray-100 relative">
        {videoId ? (
          <img src={getYouTubeThumbnail(videoId)} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-medium">Noto'g'ri havola</div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="9,7 18,12 9,17" /></svg>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[13px] font-bold text-gray-800 line-clamp-2 flex-1">{item.title}</p>
        {item.description && <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">{item.description}</p>}
        <div className="flex gap-2 mt-3">
          <button onClick={() => onEdit(item)} className="flex-1 py-1.5 rounded-lg text-[12px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
            Edit
          </button>
          <button onClick={() => onDelete(item.id)} className="flex-1 py-1.5 rounded-lg text-[12px] font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Add / edit modal ── */
function VideoLessonModal({ item, defaultCategory, onSave, onClose }) {
  const isNew = !item
  const [form, setForm] = useState(item ? { ...item } : { ...EMPTY_FORM, id: genId(), category: defaultCategory })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const videoId = extractYouTubeId(form.youtubeUrl)
  const valid = form.title.trim() && videoId

  return (
    <Modal title={isNew ? 'Add Video Lesson' : 'Edit Video Lesson'} onClose={onClose} wide>
      <div className="space-y-4">
        <Field label="Category *">
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </Field>

        <Field label="Title *">
          <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} placeholder="e.g. IELTS Listening — Part 1 Tips" autoFocus />
        </Field>

        <Field label="Description">
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} className={textareaCls} placeholder="Short description of the video (optional)" />
        </Field>

        <Field label="YouTube URL *" hint="Paste any YouTube link — watch, share, or youtu.be link all work">
          <input value={form.youtubeUrl} onChange={(e) => set('youtubeUrl', e.target.value)} className={inputCls} placeholder="https://www.youtube.com/watch?v=..." />
        </Field>

        {form.youtubeUrl && (
          videoId ? (
            <img src={getYouTubeThumbnail(videoId)} alt="preview" className="w-full aspect-video object-cover rounded-xl border border-gray-200" />
          ) : (
            <p className="text-[12px] text-red-500">Bu havoladan video ID topilmadi — to'g'ri YouTube linkini kiriting.</p>
          )
        )}

        <Field label="Order" hint="Lower numbers appear first">
          <input type="number" value={form.order} onChange={(e) => set('order', Number(e.target.value))} className={inputCls} />
        </Field>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button onClick={() => valid && onSave(form)} className={btnPrimary} style={{ opacity: valid ? 1 : 0.5 }}>
          {isNew ? 'Add Video' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

export default function AdminVideoLessons() {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [tab,     setTab]     = useState('listening')
  const [modal,   setModal]   = useState(null)
  const [delId,   setDelId]   = useState(null)

  const refresh = () => api.getVideoLessons().then(setItems)

  useEffect(() => {
    refresh().finally(() => setLoading(false))
  }, [])

  const handleSave = async (form) => {
    const exists = items.some((i) => i.id === form.id)
    if (exists) await api.updateVideoLesson(form.id, form)
    else await api.addVideoLesson(form)
    await refresh()
    setModal(null)
  }

  const handleDelete = async () => {
    await api.deleteVideoLesson(delId)
    await refresh()
    setDelId(null)
  }

  if (loading) return <div className="p-8 text-gray-400">Loading...</div>

  const filtered = items.filter((i) => i.category === tab)

  return (
    <div>
      <PageHeader
        title="Video Lessons"
        subtitle={`${items.length} video${items.length !== 1 ? 's' : ''} · Shown on the IELTS video-lessons pages`}
        action={
          <button onClick={() => setModal({ type: 'add' })} className={btnPrimary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Video
          </button>
        }
      />

      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => {
          const count = items.filter((i) => i.category === c.id).length
          return (
            <button
              key={c.id}
              onClick={() => setTab(c.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                tab === c.id ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.label} <span className="opacity-70">({count})</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <Empty message={`No videos in ${CATEGORIES.find((c) => c.id === tab)?.label} yet — add your first one`} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
              onEdit={(i) => setModal({ type: 'edit', data: i })}
              onDelete={(id) => setDelId(id)}
            />
          ))}
        </div>
      )}

      {modal && (
        <VideoLessonModal
          item={modal.type === 'edit' ? modal.data : null}
          defaultCategory={tab}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Video Lesson"
          message="Are you sure you want to delete this video? This cannot be undone."
          onConfirm={handleDelete}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
