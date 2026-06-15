import { useState } from 'react'
import { db, genId } from '../adminData'
import {
  PageHeader, Field, Modal, ConfirmModal,
  btnPrimary, btnGhost, inputCls, textareaCls, ImageUploader,
} from '../AdminUI'

const BANDS = ['', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0']

const EMPTY_FORM = {
  id: '', name: '', overall: '', listening: '',
  reading: '', writing: '', speaking: '', comment: '', image: null,
}

const n = (v) => parseFloat(v) || 0

/* ── IELTS cert placeholder (same as public page) ── */
function CertPlaceholder({ name }) {
  const initials = (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="rounded-xl overflow-hidden relative bg-gray-50 border border-gray-200" style={{ minHeight: 130 }}>
      <div className="flex items-center justify-between px-3 pt-2.5 pb-2 border-b border-gray-200">
        <span className="font-black text-[12px] tracking-widest text-red-600">IELTS</span>
        <div className="w-7 h-9 rounded bg-gray-200 flex items-center justify-center">
          <span className="text-[8px] font-bold text-gray-400">{initials}</span>
        </div>
      </div>
      <div className="px-3 py-2 flex flex-col gap-1.5">
        {[80, 60, 72, 50, 68, 55].map((w, i) => (
          <div key={i} style={{ height: 4, background: i % 2 === 0 ? '#e5e7eb' : '#ececec', borderRadius: 3, width: `${w}%` }} />
        ))}
      </div>
      <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ border: '1.5px solid rgba(220,38,38,0.4)', background: 'rgba(220,38,38,0.06)' }}>
        <span className="text-[5.5px] font-black leading-none text-center text-red-600">IELTS{'\n'}TRF</span>
      </div>
    </div>
  )
}

/* ── Sub-score mini chip ── */
function SubChip({ label, value }) {
  return (
    <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-white border border-red-100">
      <span className="font-bold text-[10px] text-red-600">{label}</span>
      <span className="font-bold text-[10px] text-red-700">{value || '—'}</span>
    </div>
  )
}

/* ── Student card (matches public ResultsPage style) ── */
function StudentCard({ r, onEdit, onDelete }) {
  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-[#fecaca] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col">
      {/* Cert */}
      <div className="p-3 pb-0">
        <CertPlaceholder name={r.name} />
      </div>

      <div className="px-3 pt-3 pb-2 flex-1 flex flex-col">
        {/* Name + photo */}
        <div className="flex items-center gap-2 mb-1.5">
          {r.image ? (
            <img src={r.image} alt={r.name} className="w-8 h-8 rounded-full object-cover border-2 border-red-100 flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xs"
              style={{ background: 'linear-gradient(135deg,#b91c1c,#ef4444)' }}>
              {(r.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          )}
          <p className="font-extrabold text-[13px] leading-tight text-red-600 flex-1 min-w-0 truncate">{r.name}</p>
        </div>

        {/* Offline badge */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-3 self-start"
          style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
          <span className="text-[8.5px] font-black tracking-widest text-red-600">OFFLINE</span>
        </div>

        {/* Overall score */}
        <div className="rounded-2xl py-3 text-center mb-3"
          style={{ background: 'linear-gradient(135deg,#b91c1c,#dc2626)', boxShadow: '0 4px 14px rgba(185,28,28,0.35)' }}>
          <p className="text-white/70 text-[8px] font-black uppercase tracking-wide mb-0.5">Overall Band</p>
          <p className="text-white font-black text-[32px] leading-none">{n(r.overall).toFixed(1)}</p>
        </div>

        {/* Sub-scores */}
        <div className="grid grid-cols-2 gap-1 mb-3">
          <SubChip label="Listening" value={r.listening} />
          <SubChip label="Reading"   value={r.reading}   />
          <SubChip label="Writing"   value={r.writing}   />
          <SubChip label="Speaking"  value={r.speaking}  />
        </div>

        {/* Comment */}
        {r.comment && (
          <div className="rounded-xl px-3 py-2 mb-3 flex-1" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
            <div className="flex items-center gap-1 mb-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[8.5px] font-black uppercase tracking-wide text-amber-600">Teacher's Comment</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">{r.comment}</p>
          </div>
        )}
      </div>

      {/* Edit / Delete */}
      <div className="flex gap-2 px-3 pb-3">
        <button
          onClick={() => onEdit(r)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(r.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}


/* ── Add / Edit modal ── */
function ScoreSelect({ value, onChange, label }) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {BANDS.map((b) => <option key={b} value={b}>{b || '—'}</option>)}
      </select>
    </Field>
  )
}

function ResultModal({ result, onSave, onClose }) {
  const isNew = !result
  const [form, setForm] = useState(result ? { ...result } : { ...EMPTY_FORM, id: genId() })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <Modal title={isNew ? 'Add Student Result' : 'Edit Result'} onClose={onClose} wide>
      <div className="space-y-4">
        <ImageUploader value={form.image} onChange={(v) => set('image', v)} label="Student Photo" size={72} round />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Student Name *">
            <input value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} placeholder="Full name" autoFocus />
          </Field>
          <ScoreSelect value={form.overall} onChange={(v) => set('overall', v)} label="Overall Band *" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <ScoreSelect value={form.listening} onChange={(v) => set('listening', v)} label="Listening" />
          <ScoreSelect value={form.reading}   onChange={(v) => set('reading',   v)} label="Reading"   />
          <ScoreSelect value={form.writing}   onChange={(v) => set('writing',   v)} label="Writing"   />
          <ScoreSelect value={form.speaking}  onChange={(v) => set('speaking',  v)} label="Speaking"  />
        </div>

        <Field label="Description / Comment">
          <textarea
            value={form.comment} onChange={(e) => set('comment', e.target.value)}
            rows={3} className={textareaCls} placeholder="Student achievement or feedback..."
          />
        </Field>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button
          onClick={() => { if (form.name.trim() && form.overall) onSave(form) }}
          className={btnPrimary}
        >
          {isNew ? 'Add Result' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

export default function AdminResults() {
  const [results, setResults] = useState(db.getResults)
  const [modal,   setModal]   = useState(null)
  const [delId,   setDelId]   = useState(null)

  const persist = (updated) => { db.saveResults(updated); setResults(updated) }

  const handleSave = (form) => {
    const exists = results.some((r) => r.id === form.id)
    persist(exists ? results.map((r) => (r.id === form.id ? form : r)) : [...results, form])
    setModal(null)
  }

  const handleDelete = () => {
    persist(results.filter((r) => r.id !== delId))
    setDelId(null)
  }

  return (
    <div>
      <PageHeader
        title="Student Results"
        subtitle={
          results.length
            ? `${results.length} student${results.length !== 1 ? 's' : ''} · Published on Results page`
            : 'No results yet — add your first student'
        }
        action={
          <button onClick={() => setModal({ type: 'add' })} className={btnPrimary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Result
          </button>
        }
      />


      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {results.map((r) => (
          <StudentCard
            key={r.id}
            r={r}
            onEdit={(r) => setModal({ type: 'edit', data: r })}
            onDelete={(id) => setDelId(id)}
          />
        ))}
      </div>

      {modal && (
        <ResultModal
          result={modal.type === 'edit' ? modal.data : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Result"
          message="Are you sure you want to delete this student result? This cannot be undone."
          onConfirm={handleDelete}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
