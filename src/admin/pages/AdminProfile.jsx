import { useState } from 'react'
import { db } from '../adminData'
import { PageHeader, Field, inputCls, textareaCls, btnPrimary, ImageUploader } from '../AdminUI'

const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const IELTS_BANDS = ['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0']

export default function AdminProfile() {
  const [form, setForm]   = useState(db.getProfile)
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSave = () => {
    db.saveProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Edit teacher information shown on the public site"
        action={
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Saved!
              </span>
            )}
            <button onClick={handleSave} className={btnPrimary}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Save Profile
            </button>
          </div>
        }
      />

      {/* Row 1: Photo + Basic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

        {/* Profile Photo */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Profile Photo</h2>
          <div className="flex-1 flex flex-col items-center justify-center py-4">
            <ImageUploader
              value={form.image}
              onChange={(v) => set('image', v)}
              label="Teacher Photo"
              size={100}
              round
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-700">Basic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <input
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className={inputCls}
                placeholder="Teacher Tolib"
              />
            </Field>
            <Field label="Role / Title">
              <input
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                className={inputCls}
                placeholder="English Teacher · IELTS Coach"
              />
            </Field>
          </div>

          <Field label="Bio">
            <textarea
              value={form.bio}
              onChange={(e) => set('bio', e.target.value)}
              rows={5}
              className={textareaCls}
              placeholder="Brief biography shown on the About page..."
            />
          </Field>
        </div>
      </div>

      {/* Row 2: Qualifications + Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Qualifications */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-700">Qualifications</h2>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Experience (years)">
              <input
                type="number" min="0" max="50"
                value={form.experience}
                onChange={(e) => set('experience', e.target.value)}
                className={inputCls}
                placeholder="6"
              />
            </Field>
            <Field label="IELTS Band">
              <select value={form.ieltsScore} onChange={(e) => set('ieltsScore', e.target.value)} className={inputCls}>
                {IELTS_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="CEFR Level">
              <select value={form.cefrLevel} onChange={(e) => set('cefrLevel', e.target.value)} className={inputCls}>
                {CEFR.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-700">Contact Information</h2>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone Number">
              <input
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className={inputCls}
                placeholder="+998 99 123 45 67"
              />
            </Field>
            <Field label="Telegram">
              <input
                value={form.telegram}
                onChange={(e) => set('telegram', e.target.value)}
                className={inputCls}
                placeholder="@teacher_tolib"
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  )
}
