import { useState } from 'react'
import { PageHeader, Field, Modal, ConfirmModal, btnPrimary, btnGhost, btnSm, btnSmDanger, inputCls, Empty } from '../AdminUI'
import { PLATFORMS, PLATFORM_LIST, getSocials } from '../../socials'
import { genId } from '../adminData'

const SOCIALS_KEY = 'et_admin_socials'

const saveSocials = (list) => {
  try { localStorage.setItem(SOCIALS_KEY, JSON.stringify(list)) } catch {}
}

const EMPTY_FORM = { id: '', platform: 'telegram', label: '', url: '' }

/* ── Platform icon ── */
function PlatformIcon({ platform, size = 20, color = '#dc2626' }) {
  const p = PLATFORMS[platform] || PLATFORMS.other
  if (p.stroke) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d={p.path} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d={p.path}/>
    </svg>
  )
}

/* ── Add/Edit modal ── */
function SocialModal({ social, onSave, onClose }) {
  const isNew = !social
  const [form, setForm] = useState(
    social ? { ...social } : { ...EMPTY_FORM, id: genId() }
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handlePlatformChange = (pid) => {
    const p = PLATFORMS[pid]
    set('platform', pid)
    if (!form.label || PLATFORM_LIST.find(x => x.label === form.label)) {
      setForm(f => ({ ...f, platform: pid, label: p?.label || '' }))
    } else {
      set('platform', pid)
    }
  }

  return (
    <Modal title={isNew ? 'Add Social Link' : 'Edit Social Link'} onClose={onClose}>
      <div className="space-y-4">

        {/* Platform select */}
        <Field label="Platform">
          <div className="grid grid-cols-4 gap-2">
            {PLATFORM_LIST.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePlatformChange(p.id)}
                className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border-2 transition-all text-[10px] font-semibold ${
                  form.platform === p.id
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-200 hover:border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <PlatformIcon platform={p.id} size={18} color={form.platform === p.id ? '#dc2626' : '#9ca3af'} />
                {p.label.split('/')[0].trim()}
              </button>
            ))}
          </div>
        </Field>

        {/* Label */}
        <Field label="Display Label" hint="Name shown in footer (e.g. Telegram, My TikTok)">
          <input
            value={form.label}
            onChange={e => set('label', e.target.value)}
            className={inputCls}
            placeholder={PLATFORMS[form.platform]?.label || 'Label'}
          />
        </Field>

        {/* URL */}
        <Field label="URL">
          <input
            value={form.url}
            onChange={e => set('url', e.target.value)}
            className={inputCls}
            placeholder="https://t.me/teacher_tolib"
            type="url"
          />
        </Field>

        {/* Preview */}
        {(form.label || form.url) && (
          <div className="rounded-xl p-3 bg-gray-50 border border-gray-200">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Footer Preview</p>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white border border-red-100 w-fit">
              <PlatformIcon platform={form.platform} size={16} />
              <span className="text-xs font-semibold text-red-600">{form.label || PLATFORMS[form.platform]?.label}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button
          onClick={() => { if (form.label.trim() && form.url.trim()) onSave(form) }}
          className={btnPrimary}
          disabled={!form.label.trim() || !form.url.trim()}
        >
          {isNew ? 'Add Link' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

/* ── Social card ── */
function SocialCard({ s, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col gap-3">
      {/* Icon + label */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-red-50 border border-red-100">
          <PlatformIcon platform={s.platform} size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[14px] text-gray-800">{s.label}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 truncate">{s.url}</p>
        </div>
      </div>

      {/* Footer preview */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-red-100 bg-red-50/40">
        <PlatformIcon platform={s.platform} size={14} />
        <span className="text-[11px] font-semibold text-red-600">{s.label}</span>
        <span className="text-[9px] text-gray-400 ml-auto uppercase tracking-wider">Footer</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={() => onEdit(s)} className={btnSm + ' flex-1 justify-center'}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
        <button onClick={() => onDelete(s.id)} className={btnSmDanger + ' flex-1 justify-center'}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}

export default function AdminSocials() {
  const [socials, setSocials] = useState(getSocials)
  const [modal,   setModal]   = useState(null)
  const [delId,   setDelId]   = useState(null)

  const persist = (updated) => { saveSocials(updated); setSocials(updated) }

  const handleSave = (form) => {
    const exists = socials.some(s => s.id === form.id)
    persist(exists ? socials.map(s => s.id === form.id ? form : s) : [...socials, form])
    setModal(null)
  }

  const handleDelete = () => {
    persist(socials.filter(s => s.id !== delId))
    setDelId(null)
  }

  return (
    <div>
      <PageHeader
        title="Social Links"
        subtitle={`${socials.length} link${socials.length !== 1 ? 's' : ''} · Shown in website footer`}
        action={
          <button onClick={() => setModal({ type: 'add' })} className={btnPrimary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Link
          </button>
        }
      />

      {socials.length === 0 ? (
        <Empty message="No social links yet. Click 'Add Link' to add the first one." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {socials.map(s => (
            <SocialCard
              key={s.id}
              s={s}
              onEdit={s => setModal({ type: 'edit', data: s })}
              onDelete={id => setDelId(id)}
            />
          ))}
        </div>
      )}

      {modal && (
        <SocialModal
          social={modal.type === 'edit' ? modal.data : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Social Link"
          message="Remove this social link from the footer? This cannot be undone."
          onConfirm={handleDelete}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
