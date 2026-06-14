import { useState, useCallback } from 'react'
import { PageHeader, ConfirmModal } from '../AdminUI'

const USERS_KEY = 'et_all_users'

const SAMPLE_USERS = [
  {
    phone: '+998 99 000 00 01',
    firstName: 'Alisher',
    lastName: 'Umarov',
    role: 'USER',
    lastLogin: '14.06.2026',
    isDemo: true,
  },
  {
    phone: '+998 90 000 00 02',
    firstName: 'Malika',
    lastName: 'Yusupova',
    role: 'USER',
    lastLogin: '13.06.2026',
    isDemo: true,
  },
]

const getUsers = () => {
  try {
    const list = JSON.parse(localStorage.getItem(USERS_KEY)) || []
    return list.length > 0 ? list : SAMPLE_USERS
  } catch { return SAMPLE_USERS }
}

function UserAvatar({ firstName, lastName }) {
  const initials = ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase() || '?'
  const colors = ['#dc2626', '#b91c1c', '#7f1d1d', '#ef4444', '#991b1b']
  const color  = colors[((firstName || '').charCodeAt(0) || 0) % colors.length]
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
      style={{ background: color }}
    >
      {initials}
    </div>
  )
}

export default function AdminUsers() {
  const [users,   setUsers]   = useState(getUsers)
  const [delIdx,  setDelIdx]  = useState(null)
  const [search,  setSearch]  = useState('')

  const refresh = useCallback(() => setUsers(getUsers()), [])

  const handleDelete = () => {
    const real = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const updated = real.filter((_, i) => i !== delIdx)
    localStorage.setItem(USERS_KEY, JSON.stringify(updated))
    setUsers(getUsers())
    setDelIdx(null)
  }

  const realUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  const isShowingDemo = realUsers.length === 0

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    return (
      (u.firstName || '').toLowerCase().includes(q) ||
      (u.lastName  || '').toLowerCase().includes(q) ||
      (u.phone     || '').includes(q)
    )
  })

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={
          isShowingDemo
            ? 'No real users yet — demo entries shown'
            : `${realUsers.length} registered user${realUsers.length !== 1 ? 's' : ''}`
        }
        action={
          <button
            onClick={refresh}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        }
      />

      {/* Search */}
      <div className="relative mb-5">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none">
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

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-gray-100 bg-gray-50">
          <div className="col-span-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</div>
          <div className="col-span-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:block">Phone</div>
          <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden md:block">Role</div>
          <div className="col-span-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Last Login</div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="#d1d5db" strokeWidth="2"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-sm text-gray-400 font-medium">No users found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((u, i) => (
              <div
                key={u.phone + i}
                className={`grid grid-cols-12 gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group items-center ${u.isDemo ? 'opacity-60' : ''}`}
              >
                {/* Name + avatar */}
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <UserAvatar firstName={u.firstName} lastName={u.lastName} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-[13px] text-gray-800 truncate">
                        {u.firstName || ''} {u.lastName || ''}
                      </span>
                      {u.isDemo && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-200 text-gray-400 flex-shrink-0">
                          Demo
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 sm:hidden mt-0.5">{u.phone}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-span-3 hidden sm:block">
                  <span className="text-[13px] text-gray-600 font-mono">{u.phone}</span>
                </div>

                {/* Role */}
                <div className="col-span-2 hidden md:block">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    u.role === 'SUPER_ADMIN'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {u.role === 'SUPER_ADMIN' ? 'Admin' : 'User'}
                  </span>
                </div>

                {/* Last login + delete */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <span className="text-[11px] text-gray-400">{u.lastLogin || '—'}</span>
                  {!u.isDemo && (
                    <button
                      onClick={() => setDelIdx(i)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 flex-shrink-0"
                      title="Delete"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {delIdx !== null && (
        <ConfirmModal
          title="Delete User"
          message={`Remove "${users[delIdx]?.firstName} ${users[delIdx]?.lastName}" from the list? This cannot be undone.`}
          onConfirm={handleDelete}
          onClose={() => setDelIdx(null)}
        />
      )}
    </div>
  )
}
