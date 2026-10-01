import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { demoCompleted, demoPurchased } from '../data/mock'

// Имитация бэкенда: всё состояние хранится в localStorage браузера.

export interface User {
  name: string
  email: string
}

interface State {
  user: User | null
  purchased: string[]
  completed: Record<string, string[]>
}

interface Store extends State {
  login: (user: User) => void
  logout: () => void
  purchase: (slug: string) => void
  toggleLesson: (slug: string, lessonId: string) => void
  isCompleted: (slug: string, lessonId: string) => boolean
  resetDemo: () => void
}

const KEY = 'kodstart-demo-v1'

const initialState: State = {
  user: null,
  purchased: demoPurchased,
  completed: demoCompleted,
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initialState, ...JSON.parse(raw) }
  } catch {
    /* localStorage недоступен — работаем в памяти */
  }
  return initialState
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state])

  const login = useCallback((user: User) => setState((s) => ({ ...s, user })), [])
  const logout = useCallback(() => setState((s) => ({ ...s, user: null })), [])

  const purchase = useCallback(
    (slug: string) =>
      setState((s) => (s.purchased.includes(slug) ? s : { ...s, purchased: [slug, ...s.purchased] })),
    [],
  )

  const toggleLesson = useCallback(
    (slug: string, lessonId: string) =>
      setState((s) => {
        const list = s.completed[slug] ?? []
        const next = list.includes(lessonId) ? list.filter((id) => id !== lessonId) : [...list, lessonId]
        return { ...s, completed: { ...s.completed, [slug]: next } }
      }),
    [],
  )

  const isCompleted = useCallback(
    (slug: string, lessonId: string) => (state.completed[slug] ?? []).includes(lessonId),
    [state.completed],
  )

  const resetDemo = useCallback(() => setState((s) => ({ ...initialState, user: s.user })), [])

  const value = useMemo(
    () => ({ ...state, login, logout, purchase, toggleLesson, isCompleted, resetDemo }),
    [state, login, logout, purchase, toggleLesson, isCompleted, resetDemo],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore вне StoreProvider')
  return ctx
}
