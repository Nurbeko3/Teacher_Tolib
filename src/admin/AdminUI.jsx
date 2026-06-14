import { useEffect, useRef } from 'react'

/* ── Button classes ── */
export const btnPrimary   = 'inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors duration-150 active:scale-[0.97]'
export const btnGhost     = 'inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors duration-150 active:scale-[0.97]'
export const btnDanger    = 'inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-xl border border-red-200 transition-colors duration-150 active:scale-[0.97]'
export const btnSm        = 'inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors duration-150'
export const btnSmDanger  = 'inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg border border-red-100 transition-colors duration-150'
export const inputCls     = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-150'
export const textareaCls  = `${inputCls} resize-none`

/* ── Field wrapper ── */
export function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

/* ── Modal ── */
export function Modal({ title, onClose, children, wide }) {
  const backdropRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto`}
        style={{ animation: 'modalSlideIn 0.2s ease' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-base">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}

/* ── Confirm dialog ── */
export function ConfirmModal({ title, message, onConfirm, onClose }) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="text-gray-600 text-sm mb-5">{message}</p>
      <div className="flex gap-2 justify-end">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button onClick={onConfirm} className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors duration-150">
          Delete
        </button>
      </div>
    </Modal>
  )
}

/* ── Page header ── */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* ── Empty state ── */
export function Empty({ message }) {
  return (
    <div className="py-16 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="9" y="3" width="6" height="4" rx="1" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-gray-400 text-sm font-medium">{message}</p>
    </div>
  )
}

/* ── Image uploader ── */
export function ImageUploader({ value, onChange, label = 'Photo', size = 80, round }) {
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target.result)
    reader.readAsDataURL(file)
  }

  const shapeClass = round ? 'rounded-full' : 'rounded-2xl'

  return (
    <div className="flex items-center gap-4">
      <div
        className={`${shapeClass} overflow-hidden flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 hover:border-red-400 transition-colors cursor-pointer flex-shrink-0`}
        style={{ width: size, height: size }}
        onClick={() => fileRef.current?.click()}
      >
        {value ? (
          <img src={value} alt="preview" className={`${shapeClass} w-full h-full object-cover`} />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="#9ca3af" strokeWidth="2"/>
          </svg>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1">{label}</p>
        <button onClick={() => fileRef.current?.click()} className={btnSm}>
          {value ? 'Change Image' : 'Upload Image'}
        </button>
        {value && (
          <button onClick={() => onChange(null)} className="ml-2 text-xs text-red-500 hover:underline">
            Remove
          </button>
        )}
        <p className="text-[10px] text-gray-400 mt-1">JPG, PNG up to 2MB</p>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}
