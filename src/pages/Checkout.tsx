import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  LoaderCircle,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react'
import { formatPrice, getCourse, lessonCount, tariffPrice, tariffs, type Tariff } from '../data/mock'
import { CourseCover, LevelBadge, cn } from '../components/ui'
import { useStore } from '../lib/store'
import NotFound from './NotFound'

const onlyDigits = (v: string) => v.replace(/\D/g, '')
const fmtCard = (v: string) => onlyDigits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
const fmtExp = (v: string) => {
  const d = onlyDigits(v).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'card' | 'exp' | 'cvc' | 'holder', string>>

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-xl bg-brand-600 font-display text-sm font-semibold text-white">{n}</span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Field({ label, error, children, className }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn('block', className)}>
      <span className="label">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  )
}

export default function Checkout() {
  const { slug } = useParams()
  const course = getCourse(slug)
  const { user, login, purchase } = useStore()

  const [tariffId, setTariffId] = useState<Tariff['id']>('mentor')
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: '',
    card: '',
    exp: '',
    cvc: '',
    holder: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'paying' | 'done'>('idle')

  if (!course) return <NotFound />

  const tariff = tariffs.find((t) => t.id === tariffId)!
  const price = tariffPrice(course.price, tariff.factor)
  const oldPrice = tariffPrice(course.oldPrice, tariff.factor)

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value
    if (k === 'card') v = fmtCard(v)
    if (k === 'exp') v = fmtExp(v)
    if (k === 'cvc') v = onlyDigits(v).slice(0, 3)
    if (k === 'holder') v = v.toUpperCase().replace(/[^A-Z\s]/g, '')
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const fillDemo = () => {
    setForm({
      name: form.name || 'Алина Воронцова',
      email: form.email || 'alina.vorontsova@demo-mail.ru',
      phone: '+7 900 123-45-67',
      card: '4242 4242 4242 4242',
      exp: '12/29',
      cvc: '123',
      holder: 'ALINA VORONTSOVA',
    })
    setErrors({})
  }

  const validate = () => {
    const e: Errors = {}
    if (form.name.trim().length < 2) e.name = 'Укажите имя'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Проверьте адрес почты'
    if (onlyDigits(form.phone).length < 10) e.phone = 'Нужен номер телефона'
    if (onlyDigits(form.card).length !== 16) e.card = '16 цифр номера карты'
    const [mm, yy] = form.exp.split('/').map(Number)
    if (!mm || mm > 12 || !yy || yy < 26) e.exp = 'Неверный срок'
    if (form.cvc.length !== 3) e.cvc = '3 цифры'
    if (form.holder.trim().length < 3) e.holder = 'Как на карте'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const pay = (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('paying')
    // Имитация запроса к платёжному шлюзу
    setTimeout(() => {
      purchase(course.slug)
      if (!user) login({ name: form.name.trim(), email: form.email.trim() })
      setStatus('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2000)
  }

  if (status === 'done') {
    return (
      <div className="container-x py-16 lg:py-24">
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[40px] bg-white p-8 text-center shadow-lift ring-1 ring-ink-200/70 sm:p-14">
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-mint-100 to-transparent" />
          <svg className="pointer-events-none absolute inset-x-0 top-0 h-56 w-full" viewBox="0 0 600 220" fill="none">
            {Array.from({ length: 26 }).map((_, i) => {
              const x = (i * 97) % 600
              const y = (i * 53) % 180 + 10
              const c = ['#7433f0', '#35d3a6', '#fbbf24', '#f472b6', '#a283ff'][i % 5]
              return i % 2 ? (
                <rect key={i} x={x} y={y} width="10" height="5" rx="2" fill={c} transform={`rotate(${i * 23} ${x} ${y})`} opacity="0.8" />
              ) : (
                <circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.7" />
              )
            })}
          </svg>
          <div className="relative">
            <div className="mx-auto grid size-24 animate-fade-up place-items-center rounded-full bg-mint-400 shadow-[0_20px_40px_-12px_rgba(18,185,141,0.6)]">
              <Check className="size-12 text-white" strokeWidth={3} />
            </div>
            <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Доступ открыт!</h1>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-500">
              Оплата прошла успешно. Письмо с доступом и чеком отправлено на почту <b className="text-ink-900">{form.email}</b>
            </p>
            <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-3xl bg-ink-50 p-4 text-left ring-1 ring-ink-200/60">
              <CourseCover course={course} size="sm" className="size-16 shrink-0 rounded-2xl" />
              <div className="min-w-0 flex-1">
                <div className="font-bold">{course.title}</div>
                <div className="text-sm text-ink-500">Тариф «{tariff.name}» · {formatPrice(price)}</div>
              </div>
              <Mail className="size-5 shrink-0 text-mint-600" />
            </div>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to={`/lesson/${course.slug}/${course.modules[0].lessons[0].id}`} className="btn-primary">
                Начать первый урок <ArrowRight className="size-5" />
              </Link>
              <Link to="/cabinet" className="btn-ghost">
                Перейти в кабинет
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const paying = status === 'paying'
  const cardDigits = onlyDigits(form.card).padEnd(16, '•')

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container-x relative pb-16 pt-8">
        <Link to={`/courses/${course.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-brand-700">
          <ArrowLeft className="size-4" /> Вернуться к курсу
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-[44px]">Оформление заказа</h1>
          <button type="button" onClick={fillDemo} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 transition hover:bg-brand-50">
            <Wand2 className="size-4" /> Заполнить тестовыми данными
          </button>
        </div>

        <form onSubmit={pay} noValidate className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="space-y-6">
            <Step n={1} title="Выберите тариф">
              <div className="grid gap-4 md:grid-cols-3">
                {tariffs.map((t) => {
                  const active = t.id === tariffId
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTariffId(t.id)}
                      className={cn(
                        'relative flex cursor-pointer flex-col rounded-3xl p-5 text-left ring-2 transition-all duration-300',
                        active ? 'bg-brand-50/60 ring-brand-500 shadow-lift' : 'bg-white ring-ink-200/80 hover:ring-brand-200',
                      )}
                    >
                      {t.popular && (
                        <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-mint-400 px-2.5 py-1 text-[11px] font-bold text-ink-900">
                          <Sparkles className="size-3" /> Популярный
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{t.name}</span>
                        <span className={cn('grid size-6 place-items-center rounded-full ring-2 transition', active ? 'bg-brand-600 ring-brand-600' : 'ring-ink-200')}>
                          {active && <Check className="size-3.5 text-white" strokeWidth={3} />}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-snug text-ink-500">{t.description}</p>
                      <div className="mt-4 font-display text-2xl font-semibold tracking-tight">{formatPrice(tariffPrice(course.price, t.factor))}</div>
                      <ul className="mt-4 space-y-2 border-t border-ink-100 pt-4">
                        {t.features.map((f) => (
                          <li key={f} className="flex gap-2 text-[13px] leading-snug text-ink-700">
                            <Check className={cn('mt-0.5 size-3.5 shrink-0', active ? 'text-brand-600' : 'text-mint-600')} strokeWidth={3} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  )
                })}
              </div>
            </Step>

            <Step n={2} title="Данные ученика">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Имя и фамилия" error={errors.name}>
                  <input className="input" placeholder="Алина Воронцова" value={form.name} onChange={set('name')} />
                </Field>
                <Field label="Телефон" error={errors.phone}>
                  <input className="input" placeholder="+7 900 000-00-00" inputMode="tel" value={form.phone} onChange={set('phone')} />
                </Field>
                <Field label="Электронная почта" error={errors.email} className="sm:col-span-2">
                  <input className="input" type="email" placeholder="you@mail.ru" value={form.email} onChange={set('email')} />
                  <span className="mt-1.5 block text-xs text-ink-400">На этот адрес придёт доступ к курсу и чек</span>
                </Field>
              </div>
            </Step>

            <Step n={3} title="Оплата картой">
              <div className="grid items-start gap-8 md:grid-cols-[300px_1fr]">
                {/* превью карты */}
                <div className="relative aspect-[1.586] overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-brand-900 to-brand-700 p-5 text-white shadow-lift">
                  <div className="absolute -right-10 -top-10 size-40 rounded-full bg-brand-500/40 blur-2xl" />
                  <div className="absolute -bottom-12 -left-6 size-36 rounded-full bg-mint-400/30 blur-2xl" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <svg viewBox="0 0 40 30" className="h-7 w-9">
                        <rect width="40" height="30" rx="6" fill="#f5d27a" />
                        <path d="M0 10h13M0 20h13M27 10h13M27 20h13M13 0v30M27 0v30" stroke="#c9a54a" strokeWidth="1.5" />
                      </svg>
                      <span className="text-xs font-semibold tracking-widest text-white/70">ДЕМО-КАРТА</span>
                    </div>
                    <div className="font-mono text-[17px] tracking-[0.12em]">{cardDigits.replace(/(.{4})/g, '$1 ').trim()}</div>
                    <div className="flex items-end justify-between text-[11px]">
                      <div>
                        <div className="text-white/50">Владелец</div>
                        <div className="mt-0.5 font-semibold tracking-wider">{form.holder || 'ИМЯ ФАМИЛИЯ'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/50">Срок</div>
                        <div className="mt-0.5 font-semibold">{form.exp || 'ММ/ГГ'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Номер карты" error={errors.card} className="col-span-2">
                    <div className="relative">
                      <input className="input pl-12" placeholder="0000 0000 0000 0000" inputMode="numeric" value={form.card} onChange={set('card')} />
                      <CreditCard className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-400" />
                    </div>
                  </Field>
                  <Field label="Срок действия" error={errors.exp}>
                    <input className="input" placeholder="ММ/ГГ" inputMode="numeric" value={form.exp} onChange={set('exp')} />
                  </Field>
                  <Field label="CVC" error={errors.cvc}>
                    <input className="input" placeholder="•••" type="password" inputMode="numeric" value={form.cvc} onChange={set('cvc')} />
                  </Field>
                  <Field label="Имя владельца" error={errors.holder} className="col-span-2">
                    <input className="input" placeholder="ALINA VORONTSOVA" value={form.holder} onChange={set('holder')} />
                  </Field>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-ink-50 px-4 py-3 text-[13px] text-ink-500">
                <Lock className="size-4 text-mint-600" /> Это демо: реальные платежи не проводятся, данные карты никуда не отправляются.
              </div>
            </Step>
          </div>

          {/* Итог */}
          <aside>
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-[32px] bg-white p-6 shadow-lift ring-1 ring-ink-200/70 sm:p-7">
                <div className="flex items-center gap-4">
                  <CourseCover course={course} size="sm" className="size-16 shrink-0 rounded-2xl" />
                  <div className="min-w-0">
                    <div className="font-bold leading-snug">{course.title}</div>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-ink-500">
                      <LevelBadge level={course.level} /> {lessonCount(course)} уроков
                    </div>
                  </div>
                </div>
                <dl className="mt-6 space-y-3 border-t border-ink-100 pt-6 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="text-ink-500">Тариф</dt>
                    <dd className="font-semibold">{tariff.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-500">Стоимость</dt>
                    <dd className="text-ink-400 line-through">{formatPrice(oldPrice)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-500">Скидка потока</dt>
                    <dd className="font-semibold text-mint-600">−{formatPrice(oldPrice - price)}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex items-end justify-between border-t border-dashed border-ink-200 pt-6">
                  <span className="font-semibold">Итого</span>
                  <span className="font-display text-3xl font-semibold tracking-tight">{formatPrice(price)}</span>
                </div>
                <button type="submit" disabled={paying} className="btn-primary mt-6 w-full py-4! text-base">
                  {paying ? (
                    <>
                      <LoaderCircle className="size-5 animate-spin" /> Проводим оплату…
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" /> Оплатить {formatPrice(price)}
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-xs leading-relaxed text-ink-400">Нажимая «Оплатить», вы соглашаетесь с условиями вымышленной оферты</p>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-mint-50 p-4 text-sm text-mint-700 ring-1 ring-mint-100">
                <ShieldCheck className="size-6 shrink-0" />
                <span>
                  <b>Гарантия возврата.</b> Если курс не подойдёт — вернём деньги в течение 14 дней.
                </span>
              </div>
            </div>
          </aside>
        </form>
      </div>

      {/* Лоадер оплаты */}
      {paying && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-ink-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm animate-fade-up rounded-[32px] bg-white p-10 text-center shadow-lift">
            <div className="relative mx-auto size-20">
              <div className="absolute inset-0 rounded-full border-[5px] border-brand-100" />
              <div className="absolute inset-0 animate-spin rounded-full border-[5px] border-transparent border-t-brand-600" />
              <CreditCard className="absolute inset-0 m-auto size-8 text-brand-600" />
            </div>
            <h3 className="mt-6 text-xl font-bold">Проводим оплату</h3>
            <p className="mt-2 text-sm text-ink-500">Связываемся с банком. Не закрывайте страницу…</p>
          </div>
        </div>
      )}
    </div>
  )
}
