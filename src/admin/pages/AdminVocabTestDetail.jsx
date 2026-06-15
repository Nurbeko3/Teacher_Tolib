import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../adminData'
import {
  getVocabTopics, saveVocabTopics, deleteVocabTopic,
  getVocabQuestions, saveVocabQuestion, deleteVocabQuestion, countVocabQuestions,
  genVocabId,
} from '../vocabData'
import {
  Field, Modal, ConfirmModal,
  btnPrimary, btnGhost, btnSm, btnSmDanger, inputCls, textareaCls, Empty,
} from '../AdminUI'

/* ══════════════════════════════════════
   QUESTION EDITOR MODAL
══════════════════════════════════════ */
function QuestionModal({ question, topicId, onSave, onClose }) {
  const isNew = !question
  const [form, setForm] = useState(
    question
      ? { ...question, options: question.options.map(o => ({ ...o })) }
      : {
          id: genVocabId(), topicId,
          text: '',
          options: [
            { id: genVocabId(), text: '', isCorrect: true },
            { id: genVocabId(), text: '', isCorrect: false },
            { id: genVocabId(), text: '', isCorrect: false },
            { id: genVocabId(), text: '', isCorrect: false },
          ],
          order: 0,
        }
  )

  const setOption = (idx, key, val) =>
    setForm(f => ({ ...f, options: f.options.map((o, i) => i === idx ? { ...o, [key]: val } : o) }))

  const setCorrect = (idx) =>
    setForm(f => ({ ...f, options: f.options.map((o, i) => ({ ...o, isCorrect: i === idx })) }))

  const addOption = () => {
    if (form.options.length >= 6) return
    setForm(f => ({ ...f, options: [...f.options, { id: genVocabId(), text: '', isCorrect: false }] }))
  }

  const removeOption = (idx) => {
    if (form.options.length <= 2) return
    setForm(f => {
      const opts = f.options.filter((_, i) => i !== idx)
      if (!opts.some(o => o.isCorrect) && opts.length) opts[0].isCorrect = true
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
            placeholder="e.g. What is the meaning of 'cat'?"
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
                <button
                  onClick={() => setCorrect(i)}
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    opt.isCorrect ? 'border-red-500 bg-red-500' : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  {opt.isCorrect && <div className="w-2 h-2 rounded-full bg-white" />}
                </button>
                <span className="text-[11px] font-black text-gray-400 w-4 flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <input
                  value={opt.text}
                  onChange={e => setOption(i, 'text', e.target.value)}
                  className={inputCls + ' flex-1'}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                />
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
   QUESTIONS LIST MODAL (for a topic)
══════════════════════════════════════ */
function QuestionsListModal({ topic, onClose }) {
  const [questions, setQuestions] = useState(() => getVocabQuestions(topic.id))
  const [qModal, setQModal] = useState(null)
  const [delId,  setDelId]  = useState(null)

  const refresh = () => setQuestions(getVocabQuestions(topic.id))

  const handleSave = (q) => {
    q.order = questions.findIndex(x => x.id === q.id) >= 0
      ? questions.findIndex(x => x.id === q.id)
      : questions.length
    saveVocabQuestion(q)
    refresh()
    setQModal(null)
  }

  const handleDelete = () => {
    deleteVocabQuestion(delId)
    refresh()
    setDelId(null)
  }

  return (
    <>
      <Modal title={`Questions — ${topic.emoji} ${topic.label}`} onClose={onClose} wide>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12px] text-gray-400">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
          <button onClick={() => setQModal({ type: 'add' })} className={btnPrimary}>
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
                    <div
                      key={opt.id}
                      className={`flex items-center gap-2 px-2 py-1 rounded-lg text-[12px] ${
                        opt.isCorrect ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-500'
                      }`}
                    >
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
          topicId={topic.id}
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
   TOPIC ADD/EDIT MODAL
══════════════════════════════════════ */
function TopicModal({ topic, lessonId, nextOrder, onSave, onClose }) {
  const isNew = !topic
  const [form, setForm] = useState(
    topic
      ? { ...topic }
      : { id: genVocabId(), lessonId, emoji: '📝', label: '', order: nextOrder }
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const EMOJI_SUGGESTIONS = ['📝','🐶','🏫','🎓','✈️','🍔','👨‍⚕️','💼','🏠','👕','🛍','⚽','💻','🌍','🎬','🚗','🎵','🏔️','🌺','🍎','🏋️','📚','🎨','🏖️']

  return (
    <Modal title={isNew ? 'Add Topic' : 'Edit Topic'} onClose={onClose}>
      <div className="space-y-4">
        <Field label="Emoji *">
          <div className="flex gap-2 flex-wrap mb-2">
            {EMOJI_SUGGESTIONS.map(e => (
              <button
                key={e}
                onClick={() => set('emoji', e)}
                className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border-2 transition-all ${
                  form.emoji === e ? 'border-red-500 bg-red-50 scale-110' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <input
            value={form.emoji}
            onChange={e => set('emoji', e.target.value)}
            className={inputCls}
            placeholder="Or type any emoji..."
            maxLength={8}
          />
        </Field>

        <Field label="Topic Name *">
          <input
            value={form.label}
            onChange={e => set('label', e.target.value)}
            className={inputCls}
            placeholder="e.g. Animals"
            autoFocus
          />
        </Field>

        {(form.emoji || form.label) && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Preview</p>
            <div className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-white border border-gray-200">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
                {form.emoji || '📝'}
              </div>
              <span className="flex-1 font-bold text-[15px]" style={{ color: '#dc2626' }}>
                {form.label || 'Topic Name'}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={onClose} className={btnGhost}>Cancel</button>
        <button
          onClick={() => { if (form.label.trim() && form.emoji.trim()) onSave(form) }}
          className={btnPrimary}
          disabled={!form.label.trim() || !form.emoji.trim()}
        >
          {isNew ? 'Add Topic' : 'Save Changes'}
        </button>
      </div>
    </Modal>
  )
}

/* ══════════════════════════════════════
   TOPIC ROW
══════════════════════════════════════ */
function TopicRow({ topic, index, total, onEdit, onDelete, onQuestions, onMove }) {
  const qCount = countVocabQuestions(topic.id)
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-gray-200 hover:border-red-100 hover:bg-red-50/20 transition-colors group shadow-sm">
      {/* Emoji */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
        style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}
      >
        {topic.emoji}
      </div>

      {/* Label */}
      <span className="flex-1 font-bold text-[14px]" style={{ color: '#dc2626' }}>{topic.label}</span>

      {/* Questions button */}
      <button
        onClick={() => onQuestions(topic)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 text-[11px] font-semibold transition-colors flex-shrink-0"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Q&amp;A {qCount > 0 && <span className="font-black text-red-500">({qCount})</span>}
      </button>

      {/* Reorder */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <button
          onClick={() => onMove(topic.id, 'up')}
          disabled={index === 0}
          className="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M18 15l-6-6-6 6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => onMove(topic.id, 'down')}
          disabled={index === total - 1}
          className="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Edit / Delete */}
      <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(topic)}
          className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => onDelete(topic.id)}
          className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function AdminVocabTestDetail() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()

  const course = db.getCourses().find(c => c.id === courseId)
  const lesson = db.getLessons().find(l => l.id === lessonId)

  const [topics,      setTopics]      = useState(() => getVocabTopics(lessonId))
  const [topicModal,  setTopicModal]  = useState(null)
  const [qModal,      setQModal]      = useState(null)
  const [delId,       setDelId]       = useState(null)

  if (!course || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-400 font-medium mb-3">Section not found.</p>
        <button onClick={() => navigate(-1)} className={btnPrimary}>Go Back</button>
      </div>
    )
  }

  const persistTopics = (updated) => {
    updated.forEach((t, i) => { t.order = i })
    saveVocabTopics(lessonId, updated)
    setTopics(updated)
  }

  const handleSaveTopic = (form) => {
    const exists = topics.some(t => t.id === form.id)
    const updated = exists
      ? topics.map(t => t.id === form.id ? form : t)
      : [...topics, { ...form, order: topics.length }]
    persistTopics(updated)
    setTopicModal(null)
  }

  const handleDeleteTopic = () => {
    deleteVocabTopic(delId)
    setTopics(topics.filter(t => t.id !== delId))
    setDelId(null)
  }

  const handleMove = (id, dir) => {
    const arr = [...topics]
    const idx = arr.findIndex(t => t.id === id)
    if (dir === 'up' && idx > 0) [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
    else if (dir === 'down' && idx < arr.length - 1) [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
    persistTopics(arr)
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
              <p className="text-white/70 text-[12px] mt-0.5">Manage vocabulary topics and their questions</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-white/70 text-[12px] font-medium">{topics.length} topic{topics.length !== 1 ? 's' : ''}</span>
            <button
              onClick={() => setTopicModal({ type: 'add' })}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-red-600 font-bold text-[13px] hover:bg-red-50 transition-colors shadow-lg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Add Topic
            </button>
          </div>
        </div>
      </div>

      {/* Topics list */}
      {topics.length === 0 ? (
        <Empty message="No topics yet. Click 'Add Topic' to create the first one." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {topics.map((topic, i) => (
            <TopicRow
              key={topic.id}
              topic={topic}
              index={i}
              total={topics.length}
              onEdit={t => setTopicModal({ type: 'edit', data: t })}
              onDelete={id => setDelId(id)}
              onQuestions={t => setQModal(t)}
              onMove={handleMove}
            />
          ))}
        </div>
      )}

      {topicModal && (
        <TopicModal
          topic={topicModal.type === 'edit' ? topicModal.data : null}
          lessonId={lessonId}
          nextOrder={topics.length}
          onSave={handleSaveTopic}
          onClose={() => setTopicModal(null)}
        />
      )}

      {qModal && (
        <QuestionsListModal
          topic={qModal}
          onClose={() => setQModal(null)}
        />
      )}

      {delId && (
        <ConfirmModal
          title="Delete Topic"
          message="This will also delete all questions in this topic. Cannot be undone."
          onConfirm={handleDeleteTopic}
          onClose={() => setDelId(null)}
        />
      )}
    </div>
  )
}
