import { useState, useEffect, useMemo } from 'react'
import { api } from '../adminData'
import {
  PageHeader, Field, Modal, ConfirmModal,
  btnPrimary, btnGhost, btnSm, btnSmDanger, inputCls, Empty,
} from '../AdminUI'

const genId = () => `u_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`

const SAMPLE_USERS = [
  {
    id: 'demo_1',
    phone: '+998 99 000 00 01',
    firstName: 'Alisher',
    lastName: 'Umarov',
    role: 'USER',
    isActive: true,
    isPaid: false,
    premium: false,
    lastLogin: '14.06.2026',
    createdAt: '01.06.2026',
    isDemo: true,
  },
  {
    id: 'demo_2',
    phone: '+998 90 000 00 02',
    firstName: 'Malika',
    lastName: 'Yusupova',
    role: 'USER',
    isActive: true,
    isPaid: true,
    premium: true,
    lastLogin: '13.06.2026',
    createdAt: '03.06.2026',
    isDemo: true,
  },
]

/* ─── Avatar ─── */
function UserAvatar({ firstName, lastName, size = 10 }) {
  const initials = ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase() || '?'
  const colors = ['#dc2626', '#b91c1c', '#7f1d1d', '#ef4444', '#991b1b']
  const color  = colors[((firstName || '').charCodeAt(0) || 0) % colors.length]
  return (
    <div
      className={`w-${size} h-${size} rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}
      style={{ background: color, minWidth: size * 4, minHeight: size * 4 }}
    >
      {initials}
    </div>
  )
}

/* ─── Toggle switch ─── */
function Toggle({ value, onChange, colorOn = 'bg-green-500', colorOff = 'bg-gray-200' }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${value ? colorOn : colorOff}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? 'left-[22px]' : 'left-0.5'}`}
      />
    </button>
  )
}

/* ─── User modal (add / edit) ─── */
function UserModal({ user, onSave, onClose }) {
  const isNew = !user
  const [form, setForm] = useState(
    user
      ? { ...user }
      : { id: genId(), firstName: '', lastName: '', phone: '', role: 'USER', isActive: true, isPaid: false, premium: false, createdAt: new Date().toLocaleDateString('ru-RU'), lastLogin: '—' }
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handlePhone = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 12)
    let formatted = ''
    if (digits.length > 0) {
      formatted = '+' + digits.slice(0, 3)
      if (digits.length > 3)  formatted += ' ' + digits.slice(3, 5)
      if (digits.length > 5)  formatted += ' ' + digits.slice(5, 8)
      if (digits.length > 8)  formatted += ' ' + digits.slice(8, 10)
      if (digits.length > 10) formatted += ' ' + digits.slice(10, 12)
    }
    set('phone', formatted)
  }

  const handlePaidChange = (v) => {
    setForm(f => ({ ...f, isPaid: v, premium: v ? true : f.premium }))
  }

  const valid = form.firstName.trim() && form.phone.trim()

  return (
    <Modal title={isNew ? 'Add User' : 'Edit User'} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="First Name *">
            <input value={form.firstName} onChange={e => set('firstName', e.target.value)}
              className={inputCls} placeholder="Alisher" autoFocus />
          </Field>
          <Field label="Last Name">
            <input value={form.lastName} onChange={e => set('lastName', e.target.value)}
              className={inputCls} placeholder="Umarov" />
          </Field>
        </div>

        <Field label="Phone *">
          <input value={form.phone} onChange={handlePhone} maxLength={17}
            className={inputCls} placeholder="+998 90 123 11 11" type="tel" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Role">
            <select value={form.role} onChange={e => set('role', e.target.value)} className={inputCls}>
              <option value="USER">User</option>
              <option value="SUPER_ADMIN">Admin</option>
            </select>
          </Field>
        </div>

        {/* Toggles */}
        <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Active</p>
              <p className="text-[11px] text-gray-400">User can log in and use the platform</p>
            </div>
            <Toggle value={form.isActive} onChange={v => set('isActive', v)} colorOn="bg-green-500" />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Payment</p>
              <p className="text-[11px] text-gray-400">User has made a payment</p>
            </div>
            <Toggle value={form.isPaid} onChange={handlePaidChange} colorOn="bg-blue-500" />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Premium Access</p>
              <p className="text-[11px] text-gray-400">Access to all premium lessons</p>
            </div>
            <Toggle value={form.premium} onChange={v => set('premium', v)} colorOn="bg-amber-500" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button onClick={() => valid && onSave(form)} className={btnPrimary} style={{ opacity: valid ? 1 : 0.5 }}>
          {isNew ? 'Add User' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

/* ─── Status badge ─── */
function Badge({ label, color }) {
  const map = {
    green:  'bg-green-100 text-green-700',
    red:    'bg-red-100 text-red-600',
    blue:   'bg-blue-100 text-blue-700',
    amber:  'bg-amber-100 text-amber-700',
    gray:   'bg-gray-100 text-gray-500',
  }
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${map[color] || map.gray}`}>
      {label}
    </span>
  )
}

/* ─── Main page ─── */
export default function AdminUsers() {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)
  const [delInfo, setDelInfo] = useState(null)
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('all')

  useEffect(() => {
    api.getUsers()
      .then(data => setUsers(data.length > 0 ? data : SAMPLE_USERS))
      .finally(() => setLoading(false))
  }, [])

  const isShowingDemo = users.length > 0 && users.every(u => u.isDemo)

  const refreshUsers = () =>
    api.getUsers().then(data => setUsers(data.length > 0 ? data : SAMPLE_USERS))

  const handleSave = async (form) => {
    if (isShowingDemo) {
      // First real user — just add
      await api.addUser(form)
    } else {
      const exists = users.some(u => u.id === form.id && !u.isDemo)
      if (exists) {
        await api.updateUser(form.id, form)
      } else {
        await api.addUser(form)
      }
    }
    await refreshUsers()
    setModal(null)
  }

  const handleDelete = async () => {
    if (isShowingDemo) { setDelInfo(null); return }
    await api.deleteUser(delInfo.user.id)
    await refreshUsers()
    setDelInfo(null)
  }

  const toggleField = async (userId, field) => {
    if (isShowingDemo) return
    const user = users.find(u => u.id === userId)
    if (!user) return
    let updated = { ...user }
    if (field === 'isPaid') {
      const newVal = !user.isPaid
      updated = { ...user, isPaid: newVal, premium: newVal ? true : user.premium }
    } else {
      updated = { ...user, [field]: !user[field] }
    }
    await api.updateUser(userId, updated)
    setUsers(prev => prev.map(u => u.id === userId ? updated : u))
  }

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    const matchSearch = (
      (u.firstName || '').toLowerCase().includes(q) ||
      (u.lastName  || '').toLowerCase().includes(q) ||
      (u.phone     || '').includes(q)
    )
    const matchFilter =
      filter === 'all'      ? true :
      filter === 'active'   ? u.isActive !== false :
      filter === 'inactive' ? u.isActive === false :
      filter === 'paid'     ? u.isPaid :
      filter === 'unpaid'   ? !u.isPaid :
      filter === 'premium'  ? u.premium :
      true
    return matchSearch && matchFilter
  })

  const realUsers = users.filter(u => !u.isDemo)

  const stats = {
    total:   realUsers.length || users.length,
    active:  users.filter(u => u.isActive !== false).length,
    paid:    users.filter(u => u.isPaid).length,
    premium: users.filter(u => u.premium).length,
  }

  const FILTERS = [
    { key: 'all',      label: 'All' },
    { key: 'active',   label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
    { key: 'paid',     label: 'Paid' },
    { key: 'unpaid',   label: 'Unpaid' },
    { key: 'premium',  label: 'Premium' },
  ]

  if (loading) return <div className="p-8 text-gray-400">Loading...</div>

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={isShowingDemo ? 'Demo data shown — no real users yet' : `${realUsers.length} registered user${realUsers.length !== 1 ? 's' : ''}`}
        action={
          <button onClick={() => setModal({ type: 'add' })} className={btnPrimary}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add User
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total',   value: stats.total,   color: 'text-gray-800' },
          { label: 'Active',  value: stats.active,  color: 'text-green-600' },
          { label: 'Paid',    value: stats.paid,    color: 'text-blue-600' },
          { label: 'Premium', value: stats.premium, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-black mt-0.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-2 rounded-xl text-[12px] font-semibold transition-colors ${
                filter === f.key
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="hidden lg:grid grid-cols-12 gap-2 px-5 py-3 border-b border-gray-100 bg-gray-50">
          <div className="col-span-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</div>
          <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone</div>
          <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</div>
          <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Payment</div>
          <div className="col-span-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Access</div>
          <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</div>
        </div>

        {filtered.length === 0 ? (
          <Empty message="No users found." />
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((u, i) => (
              <div
                key={u.id || i}
                className={`grid grid-cols-12 gap-2 px-5 py-3.5 hover:bg-gray-50 transition-colors group items-center ${u.isActive === false ? 'opacity-60' : ''} ${u.isDemo ? 'opacity-60' : ''}`}
              >
                {/* User */}
                <div className="col-span-6 lg:col-span-3 flex items-center gap-3 min-w-0">
                  <UserAvatar firstName={u.firstName} lastName={u.lastName} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-[13px] text-gray-800 truncate">
                        {u.firstName || ''} {u.lastName || ''}
                      </span>
                      {u.isDemo && <Badge label="Demo" color="gray" />}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 lg:hidden">{u.phone}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="hidden lg:block col-span-2">
                  <span className="text-[12px] text-gray-600 font-mono">{u.phone}</span>
                </div>

                {/* Status */}
                <div className="hidden lg:flex col-span-2 items-center gap-2">
                  <Toggle
                    value={u.isActive !== false}
                    onChange={() => !u.isDemo && toggleField(u.id, 'isActive')}
                    colorOn="bg-green-500"
                  />
                  <Badge
                    label={u.isActive !== false ? 'Active' : 'Inactive'}
                    color={u.isActive !== false ? 'green' : 'red'}
                  />
                </div>

                {/* Payment */}
                <div className="hidden lg:flex col-span-2 items-center gap-2">
                  <Toggle
                    value={!!u.isPaid}
                    onChange={() => !u.isDemo && toggleField(u.id, 'isPaid')}
                    colorOn="bg-blue-500"
                  />
                  <Badge label={u.isPaid ? 'Paid' : 'Unpaid'} color={u.isPaid ? 'blue' : 'gray'} />
                </div>

                {/* Premium */}
                <div className="hidden lg:flex col-span-1 items-center">
                  <Badge label={u.premium ? 'Premium' : 'Free'} color={u.premium ? 'amber' : 'gray'} />
                </div>

                {/* Actions */}
                <div className="col-span-6 lg:col-span-2 flex items-center justify-end gap-1.5">
                  {/* Mobile badges */}
                  <div className="flex gap-1 lg:hidden">
                    <Badge label={u.isActive !== false ? 'Active' : 'Off'} color={u.isActive !== false ? 'green' : 'red'} />
                    {u.premium && <Badge label="Premium" color="amber" />}
                  </div>

                  {!u.isDemo && (
                    <>
                      <button
                        onClick={() => setModal({ type: 'edit', user: u, idx: i })}
                        className={btnSm}
                        title="Edit"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => setDelInfo({ user: u, idx: i })}
                        className={btnSmDanger}
                        title="Delete"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal && (
        <UserModal
          user={modal.type === 'edit' ? modal.user : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {delInfo && (
        <ConfirmModal
          title="Delete User"
          message={`Remove "${delInfo.user.firstName} ${delInfo.user.lastName}" from the list? This cannot be undone.`}
          onConfirm={handleDelete}
          onClose={() => setDelInfo(null)}
        />
      )}
    </div>
  )
}
