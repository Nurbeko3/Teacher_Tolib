import { useState, useEffect } from 'react'
import { api, genId } from '../adminData'
import {
  PageHeader, Field, Modal, ConfirmModal,
  btnPrimary, btnGhost, inputCls, textareaCls, ImageUploader,
} from '../AdminUI'

const EMPTY_FORM = { id: '', name: '', role: '', quote: '', rating: 5, image: null }

/* ── Star rating picker ── */
function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={n <= value ? '#f59e0b' : '#e5e7eb'}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      ))}
    </div>
  )
}

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

/* ── Testimonial card ── */
function TestimonialCard({ item, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col">
      <Stars count={item.rating || 5} />
      <p className="text-[13px] text-gray-600 leading-relaxed mt-2.5 flex-1 line-clamp-4">"{item.quote}"</p>
      <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-gray-100">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
        ) : (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-[12px]"
            style={{ background: 'linear-gradient(135deg,#b91c1c,#ef4444)' }}>
            {(item.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[13px] text-gray-800 truncate">{item.name}</p>
          <p className="text-[11px] text-gray-400 truncate">{item.role}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={() => onEdit(item)} className="flex-1 py-1.5 rounded-lg text-[12px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className="flex-1 py-1.5 rounded-lg text-[12px] font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition-colors">
          Delete
        </button>
      </div>
    </div>
  )
}

/* ── Add / edit modal ── */
function TestimonialModal({ item, onSave, onClose }) {
  const isNew = !item
  const [form, setForm] = useState(item ? { ...item } : { ...EMPTY_FORM, id: genId() })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const valid = form.name.trim() && form.quote.trim()

  return (
    <Modal title={isNew ? 'Add Testimonial' : 'Edit Testimonial'} onClose={onClose} wide>
      <div className="space-y-4">
        <ImageUploader value={form.image} onChange={(v) => set('image', v)} label="Student Photo (optional)" size={72} round />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Student Name *">
            <input value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} placeholder="e.g. Sevinch A." autoFocus />
          </Field>
          <Field label="Role / Course">
            <input value={form.role} onChange={(e) => set('role', e.target.value)} className={inputCls} placeholder="e.g. IELTS Student" />
          </Field>
        </div>

        <Field label="Quote *">
          <textarea
            value={form.quote} onChange={(e) => set('quote', e.target.value)}
            rows={3} className={textareaCls} placeholder="What the student said..."
          />
        </Field>

        <Field label="Rating">
          <StarPicker value={form.rating || 5} onChange={(v) => set('rating', v)} />
        </Field>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button onClick={() => valid && onSave(form)} className={btnPrimary} style={{ opacity: valid ? 1 : 0.5 }}>
          {isNew ? 'Add Testimonial' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

export default function AdminTestimonials() {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)
  const [delId,   setDelId]   = useState(null)

  const refresh = () => api.getTestimonials().then(setItems)

  useEffect(() => {
    refresh().finally(() => setLoading(false))
  }, [])

  const handleSave = async (form) => {
    const exists = items.some((i) => i.id === form.id)
    if (exists) await api.updateTestimonial(form.id, form)
    else await api.addTestimonial(form)
    await refresh()
    setModal(null)
  }

  const handleDelete = async () => {
    await api.deleteTestimonial(delId)
    await refresh()
    setDelId(null)
  }

  if (loading) return <div className="p-8 text-gray-400">Loading...</div>

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle={
          items.length
            ? `${items.length} testimonial${items.length !== 1 ? 's' : ''} · Shown on the landing page`
            : 'No testimonials yet — add your first one'
        }
        action={
          <button onClick={() => setModal({ type: 'add' })} className={btnPrimary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Testimonial
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <TestimonialCard
            key={item.id}
            item={item}
            onEdit={(i) => setModal({ type: 'edit', data: i })}
            onDelete={(id) => setDelId(id)}
          />
        ))}
      </div>

      {modal && (
        <TestimonialModal
          item={modal.type === 'edit' ? modal.data : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Testimonial"
          message="Are you sure you want to delete this testimonial? This cannot be undone."
          onConfirm={handleDelete}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
