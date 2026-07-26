import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ConfirmModal } from './AdminUI'

const NAV = [
  {
    id: 'courses',
    path: '/admin/courses',
    label: 'Courses',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    path: '/admin/profile',
    label: 'Profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'donate',
    path: '/admin/donate',
    label: 'Donate',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'results',
    path: '/admin/results',
    label: 'Student Results',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'testimonials',
    path: '/admin/testimonials',
    label: 'Testimonials',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'users',
    path: '/admin/users',
    label: 'Users',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'socials',
    path: '/admin/socials',
    label: 'Socials',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function SidebarNav({ onClose, onLogoutClick }) {
  return (
    <div className="flex flex-col h-full bg-slate-900">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-700/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Teacher Tolib</p>
            <p className="text-slate-400 text-[11px] font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer: logout */}
      <div className="px-3 pb-4 pt-2 border-t border-slate-700/50 flex-shrink-0">
        <button
          onClick={onLogoutClick}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-all duration-150"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const navigate = useNavigate()

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false)
    setLoggingOut(true)
    setTimeout(() => {
      onLogout()
      navigate('/', { replace: true })
    }, 1200)
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">

      {/* Logout confirm modal */}
      {showLogoutModal && (
        <ConfirmModal
          title="Chiqishni tasdiqlang"
          message="Admin paneldan chiqmoqchimisiz? Barcha saqlangan ma'lumotlar saqlanib qoladi."
          onConfirm={handleLogoutConfirm}
          onClose={() => setShowLogoutModal(false)}
        />
      )}

      {/* Loading overlay */}
      {loggingOut && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center mb-4 shadow-lg shadow-red-900/50">
            <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-white font-semibold text-sm">Chiqilmoqda...</p>
        </div>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar — fixed height, independent scroll */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:flex-shrink-0 h-full overflow-y-auto">
        <SidebarNav onClose={() => {}} onLogoutClick={() => setShowLogoutModal(true)} />
      </aside>

      {/* Mobile Sidebar — overlay drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarNav onClose={() => setSidebarOpen(false)} onLogoutClick={() => { setSidebarOpen(false); setShowLogoutModal(true) }} />
      </aside>

      {/* Main area — independently scrollable */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

        {/* Mobile top bar */}
        <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 h-14 flex items-center gap-3 lg:hidden shadow-sm z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Open menu"
          >
            <span className="block w-5 h-0.5 bg-gray-600 rounded-full" />
            <span className="block w-5 h-0.5 bg-gray-600 rounded-full" />
            <span className="block w-5 h-0.5 bg-gray-600 rounded-full" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm">Admin Panel</span>
          </div>
        </header>

        {/* Page content — scrolls independently from sidebar */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
