const KEYS = {
  levels:    'et_grammar_levels',
  units:     'et_grammar_units',
  questions: 'et_grammar_questions',
}

const read = (key, def) => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : def } catch { return def }
}
const write = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

export const genId = () => `g_${Date.now()}_${Math.random().toString(36).slice(2,6)}`

const LEVEL_DEFS = [
  { badge: 'A1', title: 'Beginner' },
  { badge: 'A2', title: 'Elementary' },
  { badge: 'B1', title: 'Intermediate' },
  { badge: 'B2', title: 'Upper Intermediate' },
  { badge: 'C1', title: 'Advanced' },
  { badge: 'C2', title: 'Proficient' },
]

const buildDefaultLevels = (lessonId) =>
  LEVEL_DEFS.map((d, i) => ({ id: `tg_${lessonId}_${d.badge.toLowerCase()}`, lessonId, ...d, order: i }))

const buildDefaultUnits = (levels) =>
  levels.flatMap(lv =>
    Array.from({ length: 6 }, (_, i) => ({
      id: `${lv.id}_u${i + 1}`,
      levelId: lv.id,
      lessonId: lv.lessonId,
      title: `Unit ${i + 1}`,
      subtitle: `${lv.badge} — ${lv.title}`,
      isPaid: i >= 3,
      order: i,
    }))
  )

/* ─── Levels ─── */
export const getLevels = (lessonId) => {
  const all = read(KEYS.levels, null)
  if (all) return all.filter(l => l.lessonId === lessonId).sort((a, b) => a.order - b.order)
  const defaults = buildDefaultLevels(lessonId)
  write(KEYS.levels, defaults)
  const units = buildDefaultUnits(defaults)
  write(KEYS.units, units)
  return defaults
}

export const saveLevels = (lessonId, updated) => {
  const all = read(KEYS.levels, [])
  const others = all.filter(l => l.lessonId !== lessonId)
  write(KEYS.levels, [...others, ...updated])
}

export const deleteLevel = (levelId) => {
  const levels = read(KEYS.levels, [])
  write(KEYS.levels, levels.filter(l => l.id !== levelId))
  const units = read(KEYS.units, []).filter(u => u.levelId !== levelId)
  const unitIds = new Set(read(KEYS.units, []).filter(u => u.levelId === levelId).map(u => u.id))
  write(KEYS.units, units)
  const questions = read(KEYS.questions, []).filter(q => !unitIds.has(q.unitId))
  write(KEYS.questions, questions)
}

/* ─── Units ─── */
export const getUnits = (levelId) => {
  const all = read(KEYS.units, [])
  return all.filter(u => u.levelId === levelId).sort((a, b) => a.order - b.order)
}

export const saveUnits = (levelId, updated) => {
  const all = read(KEYS.units, [])
  const others = all.filter(u => u.levelId !== levelId)
  write(KEYS.units, [...others, ...updated])
}

export const deleteUnit = (unitId) => {
  const units = read(KEYS.units, [])
  write(KEYS.units, units.filter(u => u.id !== unitId))
  write(KEYS.questions, read(KEYS.questions, []).filter(q => q.unitId !== unitId))
}

export const countUnits = (levelId) => {
  const all = read(KEYS.units, [])
  const units = all.filter(u => u.levelId === levelId)
  return { free: units.filter(u => !u.isPaid).length, paid: units.filter(u => u.isPaid).length }
}

/* ─── Questions ─── */
export const getQuestions = (unitId) => {
  const all = read(KEYS.questions, [])
  return all.filter(q => q.unitId === unitId).sort((a, b) => a.order - b.order)
}

export const saveQuestion = (q) => {
  const all = read(KEYS.questions, [])
  const idx = all.findIndex(x => x.id === q.id)
  if (idx >= 0) all[idx] = q
  else all.push(q)
  write(KEYS.questions, all)
}

export const deleteQuestion = (questionId) => {
  write(KEYS.questions, read(KEYS.questions, []).filter(q => q.id !== questionId))
}

export const countQuestions = (unitId) =>
  read(KEYS.questions, []).filter(q => q.unitId === unitId).length
