import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, genId } from '../adminData'
import {
  Field, Modal, ConfirmModal,
  btnPrimary, btnGhost, btnSm, btnSmDanger, inputCls, textareaCls, Empty,
} from '../AdminUI'

/* ══════════════════════════════════════
   QUESTION EDITOR MODAL
══════════════════════════════════════ */
function QuestionModal({ question, unitId, onSave, onClose }) {
  const isNew = !question
  const [form, setForm] = useState(
    question
      ? { ...question, options: question.options.map(o => ({ ...o })) }
      : {
          id: genId(), unitId,
          text: '',
          options: [
            { id: genId(), text: '', isCorrect: true },
            { id: genId(), text: '', isCorrect: false },
            { id: genId(), text: '', isCorrect: false },
            { id: genId(), text: '', isCorrect: false },
          ],
          order: 0,
        }
  )

  const setOption = (idx, key, val) =>
    setForm(f => ({ ...f, options: f.options.map((o, i) => i === idx ? { ...o, [key]: val } : o) }))

  const setCorrect = (idx) =>
    setForm(f => ({
      ...f,
      options: f.options.map((o, i) => ({ ...o, isCorrect: i === idx })),
    }))

  const addOption = () => {
    if (form.options.length >= 6) return
    setForm(f => ({ ...f, options: [...f.options, { id: genId(), text: '', isCorrect: false }] }))
  }

  const removeOption = (idx) => {
    if (form.options.length <= 2) return
    setForm(f => {
      const opts = f.options.filter((_, i) => i !== idx)
      const hasCorrect = opts.some(o => o.isCorrect)
      if (!hasCorrect && opts.length) opts[0].isCorrect = true
      return { ...f, options: opts }
    })
  }

  const valid = form.text.trim() && form.options.filter(o => o.text.trim()).length >= 2 && form.options.some(o => o.isCorrect)

  return (
    <Modal title={isNew ? 'Add Question' : 'Edit Question'} onClose={onClose} wide>
      <div className="space-y-4">
        <Field label="Question *">
          <textarea
            value={form.text}
            onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
            rows={3}
            className={textareaCls}
            placeholder="e.g. Which sentence is grammatically correct?"
            autoFocus
          />
        </Field>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Answer Options <span className="text-gray-400 font-normal">(select correct one)</span>
            </label>
            {form.options.length < 6 && (
              <button onClick={addOption} className="text-[11px] text-red-500 hover:text-red-700 font-semibold">
                + Add option
              </button>
            )}
          </div>
          <div className="space-y-2">
            {form.options.map((opt, i) => (
              <div key={opt.id} className="flex items-center gap-2">
                {/* Correct radio */}
                <button
                  onClick={() => setCorrect(i)}
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    opt.isCorrect ? 'border-red-500 bg-red-500' : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  {opt.isCorrect && <div className="w-2 h-2 rounded-full bg-white" />}
                </button>

                {/* Option letter */}
                <span className="text-[11px] font-black text-gray-400 w-4 flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>

                {/* Text */}
                <input
                  value={opt.text}
                  onChange={e => setOption(i, 'text', e.target.value)}
                  className={inputCls + ' flex-1'}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                />

                {/* Remove */}
                {form.options.length > 2 && (
                  <button
                    onClick={() => removeOption(i)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          {!valid && form.text && (
            <p className="text-[11px] text-amber-500 mt-2">Fill at least 2 options and mark one as correct.</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button onClick={() => valid && onSave(form)} className={btnPrimary} disabled={!valid}>
          {isNew ? 'Add Question' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

/* ══════════════════════════════════════
   QUESTIONS LIST MODAL (for a unit)
══════════════════════════════════════ */
function QuestionsListModal({ unit, onClose, onChange }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [qModal, setQModal] = useState(null)
  const [delId,  setDelId]  = useState(null)

  const refresh = () => api.getGrammarQuestionsByUnit(unit.id).then(setQuestions)

  useEffect(() => { refresh().finally(() => setLoading(false)) }, [unit.id])

  const handleSave = async (q) => {
    const exists = questions.some(x => x.id === q.id)
    q.order = exists ? questions.findIndex(x => x.id === q.id) : questions.length
    if (exists) await api.updateGrammarQuestion(q.id, q)
    else await api.addGrammarQuestion(q)
    await refresh()
    onChange?.()
    setQModal(null)
  }

  const handleDelete = async () => {
    await api.deleteGrammarQuestion(delId)
    await refresh()
    onChange?.()
    setDelId(null)
  }

  if (loading) {
    return (
      <Modal title={`Questions — ${unit.title}`} onClose={onClose}>
        <div className="py-10 text-center text-gray-400 text-[13px]">Loading...</div>
      </Modal>
    )
  }

  return (
    <>
      <Modal
        title={`Questions — ${unit.title}`}
        onClose={onClose}
        wide
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12px] text-gray-400">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
          <button
            onClick={() => setQModal({ type: 'add' })}
            className={btnPrimary}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Add Question
          </button>
        </div>

        {questions.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-[13px]">
            No questions yet. Click "Add Question" to start.
          </div>
        ) : (
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            {questions.map((q, i) => (
              <div key={q.id} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[11px] font-black text-gray-400 flex-shrink-0 mt-0.5">Q{i + 1}</span>
                  <p className="text-[13px] font-semibold text-gray-800 flex-1 leading-snug">{q.text}</p>
                </div>
                <div className="ml-5 space-y-1 mb-3">
                  {q.options.map((opt, oi) => (
                    <div key={opt.id} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-[12px] ${opt.isCorrect ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-500'}`}>
                      <span className="font-black">{String.fromCharCode(65 + oi)}.</span>
                      <span>{opt.text}</span>
                      {opt.isCorrect && (
                        <svg className="ml-auto flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 ml-5">
                  <button onClick={() => setQModal({ type: 'edit', data: q })} className={btnSm}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit
                  </button>
                  <button onClick={() => setDelId(q.id)} className={btnSmDanger}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className={btnGhost}>Close</button>
        </div>
      </Modal>

      {qModal && (
        <QuestionModal
          question={qModal.type === 'edit' ? qModal.data : null}
          unitId={unit.id}
          onSave={handleSave}
          onClose={() => setQModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Question"
          message="Remove this question permanently?"
          onConfirm={handleDelete}
          onClose={() => setDelId(null)}
        />
      )}
    </>
  )
}

/* ══════════════════════════════════════
   UNIT ROW
══════════════════════════════════════ */
function UnitRow({ unit, qCount, onEdit, onDelete, onQuestions }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-gray-100 hover:border-red-100 hover:bg-red-50/20 transition-colors group">
      {/* Icon */}
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${unit.isPaid ? 'bg-amber-50' : 'bg-red-50'}`}>
        {unit.isPaid ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#d97706" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <span className="text-[13px] font-semibold text-gray-700">{unit.title}</span>
        <span className="text-[11px] text-gray-400 ml-2">{unit.subtitle}</span>
      </div>

      {unit.isPaid && (
        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex-shrink-0">PAID</span>
      )}

      {/* Questions button */}
      <button
        onClick={() => onQuestions(unit)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 text-[11px] font-semibold transition-colors flex-shrink-0"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Q&amp;A {qCount > 0 && <span className="font-black text-red-500">({qCount})</span>}
      </button>

      {/* Edit/Delete */}
      <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(unit)}
          className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button onClick={() => onDelete(unit.id)}
          className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 transition-colors">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   UNIT ADD/EDIT MODAL
══════════════════════════════════════ */
function UnitModal({ unit, level, lessonId, nextOrder, onSave, onClose }) {
  const isNew = !unit
  const [form, setForm] = useState(
    unit
      ? { ...unit }
      : { id: genId(), levelId: level.id, lessonId, title: `Unit ${nextOrder + 1}`, subtitle: `${level.badge} — ${level.title}`, isPaid: false, order: nextOrder }
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <Modal title={isNew ? 'Add Unit' : 'Edit Unit'} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Unit Title *">
            <input value={form.title} onChange={e => set('title', e.target.value)}
              className={inputCls} placeholder="Unit 1" autoFocus />
          </Field>
          <Field label="Subtitle">
            <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)}
              className={inputCls} placeholder={`${level.badge} — ${level.title}`} />
          </Field>
        </div>

        <Field label="Access Type">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => set('isPaid', false)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-[13px] font-bold transition-all ${
                !form.isPaid ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Free
            </button>
            <button
              onClick={() => set('isPaid', true)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-[13px] font-bold transition-all ${
                form.isPaid ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Paid
            </button>
          </div>
        </Field>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button onClick={() => { if (form.title.trim()) onSave(form) }} className={btnPrimary}>
          {isNew ? 'Add Unit' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

/* ══════════════════════════════════════
   LEVEL ACCORDION
══════════════════════════════════════ */
function LevelAccordion({ level, units, questionCounts, isOpen, onToggle, onEditLevel, onDeleteLevel, onUnitsChange, onQuestionsChange }) {
  const [unitModal, setUnitModal] = useState(null)
  const [qModal, setQModal]       = useState(null)
  const [delUnit, setDelUnit]     = useState(null)

  const free = units.filter(u => !u.isPaid).length
  const paid = units.filter(u => u.isPaid).length

  const handleSaveUnit = async (form) => {
    const exists = units.some(u => u.id === form.id)
    if (exists) await api.updateGrammarUnit(form.id, form)
    else await api.addGrammarUnit({ ...form, order: units.length })
    await onUnitsChange()
    setUnitModal(null)
  }

  const handleDeleteUnit = async () => {
    await api.deleteGrammarUnit(delUnit)
    await onUnitsChange()
    setDelUnit(null)
  }

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Level header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#b91c1c,#ef4444)', boxShadow: '0 3px 10px rgba(220,38,38,0.25)' }}>
          <span className="text-white font-black text-[12px]">{level.badge}</span>
        </div>

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800 text-[14px]">{level.badge}</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">{level.title}</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">{free} free · {paid} paid</p>
        </div>

        {/* Level actions */}
        <div className="flex gap-1 mr-2" onClick={e => e.stopPropagation()}>
          <button onClick={() => onEditLevel(level)}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => onDeleteLevel(level.id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 transition-colors">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Chevron */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Units list */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-3 space-y-2">
          {units.length === 0 ? (
            <p className="text-[12px] text-gray-400 text-center py-3">No units yet.</p>
          ) : (
            units.map(unit => (
              <UnitRow
                key={unit.id}
                unit={unit}
                qCount={questionCounts[unit.id] || 0}
                onEdit={u => setUnitModal({ type: 'edit', data: u })}
                onDelete={id => setDelUnit(id)}
                onQuestions={u => setQModal(u)}
              />
            ))
          )}

          <button
            onClick={() => setUnitModal({ type: 'add' })}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50/40 text-gray-400 hover:text-red-500 text-[12px] font-semibold transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Unit
          </button>
        </div>
      )}

      {unitModal && (
        <UnitModal
          unit={unitModal.type === 'edit' ? unitModal.data : null}
          level={level}
          lessonId={level.lessonId}
          nextOrder={units.length}
          onSave={handleSaveUnit}
          onClose={() => setUnitModal(null)}
        />
      )}

      {qModal && (
        <QuestionsListModal
          unit={qModal}
          onClose={() => setQModal(null)}
          onChange={onQuestionsChange}
        />
      )}

      {delUnit && (
        <ConfirmModal
          title="Delete Unit"
          message="This will also delete all questions in this unit."
          onConfirm={handleDeleteUnit}
          onClose={() => setDelUnit(null)}
        />
      )}
    </div>
  )
}

/* ══════════════════════════════════════
   LEVEL ADD/EDIT MODAL
══════════════════════════════════════ */
function LevelModal({ level, lessonId, nextOrder, onSave, onClose }) {
  const isNew = !level
  const [form, setForm] = useState(
    level
      ? { ...level }
      : { id: genId(), lessonId, badge: '', title: '', isPaid: false, order: nextOrder }
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <Modal title={isNew ? 'Add Level' : 'Edit Level'} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Badge *" hint="e.g. A1">
            <input value={form.badge} onChange={e => set('badge', e.target.value)}
              className={inputCls} placeholder="A1" autoFocus maxLength={3} />
          </Field>
          <div className="col-span-2">
            <Field label="Level Name *">
              <input value={form.title} onChange={e => set('title', e.target.value)}
                className={inputCls} placeholder="Beginner" />
            </Field>
          </div>
        </div>

        <Field label="Access Type">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => set('isPaid', false)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-[13px] font-bold transition-all ${
                !form.isPaid ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Free
            </button>
            <button
              onClick={() => set('isPaid', true)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-[13px] font-bold transition-all ${
                form.isPaid ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Paid
            </button>
          </div>
        </Field>
      </div>
      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button
          onClick={() => { if (form.badge.trim() && form.title.trim()) onSave(form) }}
          className={btnPrimary}
          disabled={!form.badge.trim() || !form.title.trim()}
        >
          {isNew ? 'Add Level' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function AdminTopicGrammarDetail() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()

  const [course,     setCourse]     = useState(null)
  const [lesson,     setLesson]     = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [levels,     setLevels]     = useState([])
  const [units,      setUnits]      = useState([])
  const [questions,  setQuestions]  = useState([])
  const [openLevel,  setOpenLevel]  = useState(null)
  const [levelModal, setLevelModal] = useState(null)
  const [delLevel,   setDelLevel]   = useState(null)

  const refreshUnits = () => api.getGrammarUnitsByLesson(lessonId).then(setUnits)
  const refreshQuestions = () => api.getGrammarQuestions().then(setQuestions)
  const refreshLevels = () =>
    api.getGrammarLevelsByLesson(lessonId).then((data) => {
      setLevels(data)
      setOpenLevel((prev) => prev ?? data[0]?.id ?? null)
    })

  useEffect(() => {
    Promise.all([
      api.getCourses(),
      api.getLessons(),
      api.getGrammarLevelsByLesson(lessonId),
      api.getGrammarUnitsByLesson(lessonId),
      api.getGrammarQuestions(),
    ])
      .then(([courses, lessons, levelsData, unitsData, questionsData]) => {
        setCourse(courses.find(c => c.id === courseId) || null)
        setLesson(lessons.find(l => l.id === lessonId) || null)
        setLevels(levelsData)
        setUnits(unitsData)
        setQuestions(questionsData)
        setOpenLevel(levelsData[0]?.id || null)
      })
      .finally(() => setLoading(false))
  }, [courseId, lessonId])

  if (loading) return <div className="p-8 text-gray-400">Loading...</div>

  if (!course || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-400 font-medium mb-3">Section not found.</p>
        <button onClick={() => navigate(-1)} className={btnPrimary}>Go Back</button>
      </div>
    )
  }

  const questionCounts = questions.reduce((acc, q) => {
    acc[q.unitId] = (acc[q.unitId] || 0) + 1
    return acc
  }, {})

  const handleSaveLevel = async (form) => {
    const exists = levels.some(l => l.id === form.id)
    if (exists) await api.updateGrammarLevel(form.id, form)
    else await api.addGrammarLevel({ ...form, order: levels.length })
    await refreshLevels()
    setLevelModal(null)
  }

  const handleDeleteLevel = async () => {
    await api.deleteGrammarLevel(delLevel)
    await Promise.all([refreshLevels(), refreshUnits(), refreshQuestions()])
    setDelLevel(null)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-gray-400 mb-5 flex-wrap">
        <button onClick={() => navigate('/admin/courses')} className="hover:text-red-600 transition-colors font-medium">
          Courses
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <button onClick={() => navigate(`/admin/courses/${courseId}`)} className="hover:text-red-600 transition-colors font-medium">
          {course.title}
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-gray-700 font-semibold">{lesson.title}</span>
      </nav>

      {/* Banner */}
      <div className="rounded-2xl overflow-hidden mb-6 relative" style={{ background: course.gradient }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.1]" style={{ border: '30px solid white' }} />
        <div className="relative z-10 px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/admin/courses/${courseId}`)}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-0.5">{course.title}</p>
              <h1 className="text-white font-black text-[20px] leading-tight">{lesson.title}</h1>
              <p className="text-white/70 text-[12px] mt-0.5">Select a level and unit to take the test</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-white/70 text-[12px] font-medium">{levels.length} levels</span>
            <button
              onClick={() => setLevelModal({ type: 'add' })}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-red-600 font-bold text-[13px] hover:bg-red-50 transition-colors shadow-lg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Add Level
            </button>
          </div>
        </div>
      </div>

      {/* Levels accordion */}
      {levels.length === 0 ? (
        <Empty message="No levels yet. Click 'Add Level' to create the first one." />
      ) : (
        <div className="flex flex-col gap-3">
          {levels.map(level => (
            <LevelAccordion
              key={level.id}
              level={level}
              units={units.filter(u => u.levelId === level.id)}
              questionCounts={questionCounts}
              isOpen={openLevel === level.id}
              onToggle={() => setOpenLevel(openLevel === level.id ? null : level.id)}
              onEditLevel={l => setLevelModal({ type: 'edit', data: l })}
              onDeleteLevel={id => setDelLevel(id)}
              onUnitsChange={refreshUnits}
              onQuestionsChange={refreshQuestions}
            />
          ))}
        </div>
      )}

      {levelModal && (
        <LevelModal
          level={levelModal.type === 'edit' ? levelModal.data : null}
          lessonId={lessonId}
          nextOrder={levels.length}
          onSave={handleSaveLevel}
          onClose={() => setLevelModal(null)}
        />
      )}

      {delLevel && (
        <ConfirmModal
          title="Delete Level"
          message="This will also delete all units and questions inside this level."
          onConfirm={handleDeleteLevel}
          onClose={() => setDelLevel(null)}
        />
      )}
    </div>
  )
}
