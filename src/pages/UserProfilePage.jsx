import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import { api } from '../api'
import en from '../locales/en'
import uz from '../locales/uz'
import ru from '../locales/ru'

const locales = { en, uz, ru }

const copy = {
  uz: { title: 'Mening profilim', sub: 'Shaxsiy ma’lumotlaringizni yangilang', first: 'Ism', last: 'Familiya', level: 'Daraja', phone: 'Telefon raqam', locked: 'Telefon raqam ro‘yxatdan o‘tish uchun ishlatilgani sababli o‘zgartirilmaydi.', save: 'Saqlash', saved: 'Profil muvaffaqiyatli yangilandi.' },
  en: { title: 'My profile', sub: 'Update your personal information', first: 'First name', last: 'Last name', level: 'Level', phone: 'Phone number', locked: 'The phone number cannot be changed because it is your unique login.', save: 'Save changes', saved: 'Profile updated successfully.' },
  ru: { title: 'Мой профиль', sub: 'Обновите личные данные', first: 'Имя', last: 'Фамилия', level: 'Уровень', phone: 'Номер телефона', locked: 'Номер нельзя изменить: это ваш уникальный логин.', save: 'Сохранить', saved: 'Профиль успешно обновлён.' },
}

export default function UserProfilePage({ user, onUserUpdate, dark, lang }) {
  const t = copy[lang] || copy.uz
  const levelOptions = (locales[lang] || locales.uz).login.levels
  const [form, setForm] = useState({ firstName: user.firstName || '', lastName: user.lastName || '', level: user.level || '' })
  const [status, setStatus] = useState({ loading: false, error: '', success: '' })
  const field = 'w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/30 ' + (dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900')

  const save = async (event) => {
    event.preventDefault()
    setStatus({ loading: true, error: '', success: '' })
    try {
      const updated = await api.updateOwnProfile(user.id, form)
      onUserUpdate(updated)
      setStatus({ loading: false, error: '', success: t.saved })
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' })
    }
  }

  return (
    <PageLayout dark={dark} lang={lang} backPath="/">
      <main className="w-full max-w-2xl mx-auto px-4 py-10">
        <div className={`rounded-3xl border p-6 sm:p-8 shadow-xl ${dark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/95 border-red-100'}`}>
          <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl font-black mb-5">
            {(form.firstName || 'U').charAt(0).toUpperCase()}
          </div>
          <h1 className={`text-2xl font-black ${dark ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
          <p className="text-gray-500 mt-1 mb-7">{t.sub}</p>
          <form onSubmit={save} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-sm font-semibold text-gray-500">{t.first}<input className={`${field} mt-2`} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required /></label>
              <label className="text-sm font-semibold text-gray-500">{t.last}<input className={`${field} mt-2`} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required /></label>
            </div>
            <label className="block text-sm font-semibold text-gray-500">
              {t.level}
              <div className="relative mt-2">
                <select
                  className={`${field} appearance-none cursor-pointer pr-11`}
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  required
                >
                  {Object.entries(levelOptions).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </label>
            <label className="block text-sm font-semibold text-gray-500">{t.phone}<input className={`${field} mt-2 opacity-65 cursor-not-allowed`} value={user.phone || ''} readOnly disabled /></label>
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-xl p-3">{t.locked}</p>
            {status.error && <p className="text-sm text-red-600">{status.error}</p>}
            {status.success && <p className="text-sm text-green-600">{status.success}</p>}
            <button disabled={status.loading} className="w-full rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 transition-colors">{status.loading ? '...' : t.save}</button>
          </form>
        </div>
      </main>
    </PageLayout>
  )
}
