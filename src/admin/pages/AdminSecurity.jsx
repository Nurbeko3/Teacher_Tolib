import { useState } from 'react'
import { api } from '../../api'

export default function AdminSecurity({ user, onAdminUpdate }) {
  const [form, setForm] = useState({ phone: user.phone || '+998', currentPassword: '', newPassword: '', confirmPassword: '' })
  const [status, setStatus] = useState({ loading: false, error: '', success: '' })
  const input = 'w-full mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100'

  const save = async (event) => {
    event.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      setStatus({ loading: false, error: 'Yangi parollar bir xil emas.', success: '' })
      return
    }
    setStatus({ loading: true, error: '', success: '' })
    try {
      const result = await api.updateAdminCredentials({
        phone: form.phone,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      onAdminUpdate(result.user)
      setForm((current) => ({ ...current, phone: result.user.phone, currentPassword: '', newPassword: '', confirmPassword: '' }))
      setStatus({ loading: false, error: '', success: 'Admin login ma’lumotlari yangilandi.' })
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' })
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-black text-gray-900">Login & Security</h1>
      <p className="text-gray-500 mt-1 mb-7">Admin telefon raqami va parolini xavfsiz yangilang.</p>
      <form onSubmit={save} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <label className="block text-sm font-semibold text-gray-600">Admin telefon raqami<input className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></label>
        <label className="block text-sm font-semibold text-gray-600">Joriy parol<input type="password" className={input} value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} required autoComplete="current-password" /></label>
        <label className="block text-sm font-semibold text-gray-600">Yangi parol <span className="font-normal text-gray-400">(o‘zgartirmasangiz bo‘sh qoldiring)</span><input type="password" minLength={8} className={input} value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} autoComplete="new-password" /></label>
        <label className="block text-sm font-semibold text-gray-600">Yangi parolni tasdiqlash<input type="password" className={input} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} autoComplete="new-password" /></label>
        {status.error && <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{status.error}</p>}
        {status.success && <p className="text-sm text-green-700 bg-green-50 rounded-xl p-3">{status.success}</p>}
        <button disabled={status.loading} className="rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-6 py-3 transition-colors">{status.loading ? 'Saqlanmoqda...' : 'Ma’lumotlarni yangilash'}</button>
      </form>
    </div>
  )
}
