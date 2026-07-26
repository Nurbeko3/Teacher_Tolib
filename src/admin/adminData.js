export { api } from '../api'
export const genId = () => `item_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
