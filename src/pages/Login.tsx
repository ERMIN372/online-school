import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, LoaderCircle, Sparkles } from 'lucide-react'
import { demoUser } from '../data/mock'
import { useStore } from '../lib/store'

export default function Login() {
  const { login } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/cabinet'

  const [email, setEmail] = useState(demoUser.email)
  const [password, setPassword] = useState('demo12345')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Проверьте адрес почты')
    if (password.length < 6) return setError('Пароль — минимум 6 символов')
    setError('')
    setLoading(true)
    // Имитация запроса авторизации
    setTimeout(() => {
      const name = email === demoUser.email ? demoUser.name : email.split('@')[0]
      login({ name, email })
      navigate(from, { replace: true })
    }, 900)
  }

  return (
    <div className="container-x grid items-center gap-12 py-12 lg:min-h-[720px] lg:grid-cols-2 lg:py-16">
      <div className="relative hidden h-full min-h-[560px] overflow-hidden rounded-[40px] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="bg-dots absolute inset-0 opacity-30" />
        <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-mint-400/30 blur-[90px]" />
        <span className="relative inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/20">
          <Sparkles className="size-4 text-mint-300" /> С возвращением!
        </span>
        <div className="relative">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight">Продолжайте с того места, где остановились</h2>
          <p className="mt-4 max-w-md text-lg text-white/70">Прогресс, домашние задания и сертификаты — всё в одном кабинете.</p>
        </div>
        <div className="relative grid grid-cols-3 gap-3">
          {[
            ['🔥', '12 дней', 'учёбы подряд'],
            ['✅', '34 урока', 'пройдено'],
            ['🏆', '2', 'сертификата'],
          ].map(([e, v, l]) => (
            <div key={l} className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
              <div className="text-2xl">{e}</div>
              <div className="mt-3 font-bold">{v}</div>
              <div className="text-sm text-white/60">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-md">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Вход в кабинет</h1>
        <p className="mt-3 text-ink-500">Демо-доступ уже заполнен — просто нажмите «Войти».</p>
        <form onSubmit={submit} className="mt-10 space-y-5" noValidate>
          <label className="block">
            <span className="label">Электронная почта</span>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block">
            <span className="label">Пароль</span>
            <div className="relative">
              <input className="input pr-12" type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-ink-400 hover:text-brand-700" aria-label="Показать пароль">
                {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </label>
          {error && <p className="text-sm font-medium text-rose-500">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-4! text-base">
            {loading ? <LoaderCircle className="size-5 animate-spin" /> : <>Войти <ArrowRight className="size-5" /></>}
          </button>
        </form>
        <div className="mt-8 rounded-3xl bg-ink-50 p-5 text-sm text-ink-500 ring-1 ring-ink-200/60">
          🔐 Авторизация имитируется: данные сохраняются только в вашем браузере (localStorage).
        </div>
      </div>
    </div>
  )
}
