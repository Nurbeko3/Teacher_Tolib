import { useState, useEffect } from 'react'
import { api } from '../adminData'
import { PageHeader, Field, inputCls, textareaCls, btnPrimary, ConfirmModal } from '../AdminUI'

const CARD_TYPES = ['Uzcard', 'Humo', 'Visa', 'Mastercard']

const DEFAULT_DONATE = {
  cardNumber: '5614 6818 1203 4217',
  cardHolder: 'TEACHER TOLIB',
  cardType: 'Uzcard',
  message: 'Your support helps create new lessons and materials for students.',
}

const SAMPLE_DONATIONS = [
  {
    id: 'demo_1',
    name: 'Alisher Umarov',
    amount: '50 000',
    message: "Teacher Tolib, katta rahmat! Saboqlaringiz tufayli IELTS 7.0 oldim.",
    date: '14.06.2026',
    isDemo: true,
  },
]

function formatCardNumber(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

/* ── Live card visual ── */
function CardVisual({ cardNumber, cardHolder, cardType }) {
  return (
    <div
      className="rounded-2xl p-5 text-white relative overflow-hidden select-none h-full min-h-[168px] flex flex-col justify-between"
      style={{ background: 'linear-gradient(135deg,#7f1d1d,#b91c1c 50%,#dc2626)', boxShadow: '0 12px 32px rgba(185,28,28,0.4)' }}
    >
      <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full opacity-[0.12]" style={{ border: '28px solid white' }} />
      <div className="absolute top-8 -right-2 w-20 h-20 rounded-full opacity-[0.07]" style={{ border: '18px solid white' }} />

      {/* Chip */}
      <div className="w-9 h-[26px] rounded-md relative z-10"
        style={{ background: 'linear-gradient(135deg,#fde68a,#f59e0b)', boxShadow: '0 2px 8px rgba(245,158,11,0.5)' }} />

      <div className="relative z-10">
        {/* Card number */}
        <p className="font-black text-[15px] sm:text-[18px] tracking-widest leading-none mb-4 whitespace-nowrap overflow-hidden">
          {cardNumber || '•••• •••• •••• ••••'}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/50 text-[8px] uppercase tracking-[0.15em]">Card Holder</p>
            <p className="font-black text-[13px] mt-0.5 tracking-widest"
              style={{
                background: 'linear-gradient(90deg,#fde68a,#ffffff 35%,#fbbf24 55%,#ffffff 70%,#fde68a)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'teacherShine 2.2s linear infinite',
              }}>
              {cardHolder || 'CARD HOLDER'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-[8px] uppercase tracking-[0.15em]">Type</p>
            <p className="text-white font-bold text-[13px] mt-0.5">{cardType || 'Uzcard'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Donor avatar ── */
function DonorAvatar({ name }) {
  const initials = (name || '?').trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['#dc2626', '#b91c1c', '#7f1d1d', '#ef4444', '#991b1b']
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
      style={{ background: colors[(name || '').charCodeAt(0) % colors.length] }}>
      {initials}
    </div>
  )
}

/* ── Single donation row ── */
function DonationRow({ d, onDelete }) {
  return (
    <div className={`flex items-start gap-3 px-5 py-3.5 transition-colors group ${d.isDemo ? 'bg-gray-50/60' : 'hover:bg-gray-50'}`}>
      <DonorAvatar name={d.name} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[13px] text-gray-800">{d.name}</span>
            {d.isDemo && (
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-200 text-gray-400">
                Demo
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {d.amount && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-600">
                {d.amount} so'm
              </span>
            )}
            {d.date && <span className="text-[10px] text-gray-400">{d.date}</span>}
          </div>
        </div>
        {d.message && (
          <p className="text-[12px] text-gray-500 mt-0.5 leading-snug line-clamp-2 italic">"{d.message}"</p>
        )}
      </div>
      {!d.isDemo && (
        <button
          onClick={() => onDelete(d.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 mt-0.5"
          title="Delete"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default function AdminDonate() {
  const [form,      setForm]      = useState(DEFAULT_DONATE)
  const [loading,   setLoading]   = useState(true)
  const [saved,     setSaved]     = useState(false)
  const [copied,    setCopied]    = useState(false)
  const [donations, setDonations] = useState(SAMPLE_DONATIONS)
  const [delId,     setDelId]     = useState(null)

  const refreshDonations = () =>
    api.getDonations().then(data => setDonations(data.length > 0 ? data : SAMPLE_DONATIONS))

  useEffect(() => {
    api.getDonate()
      .then(data => setForm({ ...DEFAULT_DONATE, ...data }))
      .finally(() => setLoading(false))
    refreshDonations()
  }, [])

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const handleCardInput = (e) => set('cardNumber', formatCardNumber(e.target.value))

  const handleSave = () => {
    api.saveDonate(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const copyCard = () => {
    navigator.clipboard?.writeText(form.cardNumber.replace(/\s/g, '')).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeleteDonation = async () => {
    await api.deleteDonation(delId)
    await refreshDonations()
    setDelId(null)
  }

  if (loading) return <div className="p-8 text-gray-400">Loading...</div>

  return (
    <div>
      <PageHeader
        title="Donate Settings"
        subtitle="Manage your payment card and see received donations"
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
              Save Changes
            </button>
          </div>
        }
      />

      {/* ── Top row: Card preview · Card details · Message ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* 1. Live Card Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Live Card Preview</p>
          <div className="flex-1">
            <CardVisual
              cardNumber={form.cardNumber}
              cardHolder={form.cardHolder}
              cardType={form.cardType}
            />
          </div>
        </div>

        {/* 2. Card Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-700">Card Details</h2>

          <Field label="Card Number" hint="Auto-formatted · 16 digits">
            <div className="relative">
              <input
                value={form.cardNumber}
                onChange={handleCardInput}
                className={inputCls}
                placeholder="5614 6818 1203 4217"
                maxLength={19}
              />
              <button
                onClick={copyCard}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-red-600 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Card Holder">
              <input
                value={form.cardHolder}
                onChange={(e) => set('cardHolder', e.target.value)}
                className={inputCls}
                placeholder="TEACHER TOLIB"
              />
            </Field>
            <Field label="Card Type">
              <select value={form.cardType} onChange={(e) => set('cardType', e.target.value)} className={inputCls}>
                {CARD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
          </div>
        </div>

        {/* 3. Donation Message */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-gray-700">Donation Message</h2>
          <Field label="Motivation Text" hint="Shown to visitors on the Donate page">
            <textarea
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              rows={6}
              className={textareaCls}
              placeholder="Your support helps create new lessons and materials for students."
            />
          </Field>
        </div>
      </div>

      {/* ── Bottom: Received Donations (full width) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-800">Received Donations</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {donations[0]?.isDemo
                ? 'No real donations yet — demo entry shown below'
                : `${donations.length} donation${donations.length !== 1 ? 's' : ''} received`}
            </p>
          </div>
          <button
            onClick={refreshDonations}
            className="text-xs text-red-600 hover:text-red-700 font-medium px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {donations.map((d) => (
            <DonationRow key={d.id} d={d} onDelete={setDelId} />
          ))}
        </div>
      </div>

      {delId !== null && (
        <ConfirmModal
          title="Delete Donation"
          message={`Remove donation from "${donations.find(d => d.id === delId)?.name}"? This cannot be undone.`}
          onConfirm={handleDeleteDonation}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
