import { useMemo, useState, type ReactNode } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  CalendarDays,
  CircleCheck,
  CirclePlay,
  Clock,
  Download,
  Flame,
  GraduationCap,
  Hourglass,
  LayoutDashboard,
  LogOut,
  NotebookPen,
  RefreshCcw,
  RotateCcw,
  Search,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import {
  certificates as mockCertificates,
  courses,
  getCourse,
  getTeacher,
  homeworks,
  schedule,
  type Certificate,
  type Course,
  type Homework,
  type HomeworkStatus,
} from '../data/mock'
import { courseProgress } from '../lib/progress'
import { useStore } from '../lib/store'
import { Avatar, CourseCover, LevelBadge, Logo, Progress, cn } from '../components/ui'

/* ---------- общие данные кабинета ---------- */

function useCabinetData() {
  const { purchased, completed } = useStore()
  return useMemo(() => {
    const my = purchased
      .map((s) => getCourse(s))
      .filter((c): c is Course => Boolean(c))
      .map((c) => ({ course: c, ...courseProgress(c, completed[c.slug]) }))
    const active = my.filter((m) => m.percent < 100)
    const next = active[0] ?? null
    const totalDone = my.reduce((a, m) => a + m.done, 0)
    const certificates: Certificate[] = [
      ...my
        .filter((m) => m.percent === 100 && !mockCertificates.some((c) => c.title === m.course.title))
        .map((m, i) => ({
          id: `auto-${m.course.slug}`,
          number: `КС-2026-${String(7310 + i * 131).padStart(5, '0')}`,
          title: m.course.title,
          issued: 'сегодня',
          hours: 120,
          gradient: m.course.gradient,
        })),
      ...mockCertificates,
    ]
    return { my, active, next, totalDone, certificates }
  }, [purchased, completed])
}

/* ---------- статусы домашек ---------- */

const hwStatus: Record<HomeworkStatus, { label: string; icon: LucideIcon; cls: string }> = {
  review: { label: 'На проверке', icon: Hourglass, cls: 'bg-amber-50 text-amber-700 ring-amber-200' },
  accepted: { label: 'Принято', icon: CircleCheck, cls: 'bg-mint-50 text-mint-700 ring-mint-200' },
  rework: { label: 'Нужна доработка', icon: RefreshCcw, cls: 'bg-rose-50 text-rose-600 ring-rose-200' },
}

function StatusBadge({ status }: { status: HomeworkStatus }) {
  const s = hwStatus[status]
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1', s.cls)}>
      <s.icon className="size-3.5" /> {s.label}
    </span>
  )
}

function HomeworkRow({ hw, detailed = false }: { hw: Homework; detailed?: boolean }) {
  const course = getCourse(hw.courseSlug)!
  return (
    <div className="group flex flex-col gap-4 rounded-3xl p-4 transition hover:bg-ink-50 sm:flex-row sm:items-center">
      <CourseCover course={course} size="sm" className="size-12 shrink-0 rounded-2xl" />
      <div className="min-w-0 flex-1">
        <Link to={`/lesson/${hw.courseSlug}/${hw.lessonId}`} className="font-bold leading-snug transition group-hover:text-brand-700">
          {hw.title}
        </Link>
        <div className="mt-0.5 text-sm text-ink-500">
          {course.title} · сдано {hw.submitted}
        </div>
        {detailed && (
          <p className="mt-3 rounded-2xl bg-white p-3 text-sm leading-relaxed text-ink-700 ring-1 ring-ink-200/70">
            <b>{hw.reviewer}:</b> {hw.comment}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
        <StatusBadge status={hw.status} />
        {hw.score !== undefined && <span className="text-sm font-semibold text-ink-500">{hw.score} / 100</span>}
      </div>
    </div>
  )
}

/* ---------- карточки ---------- */

function NextLessonCard() {
  const { next } = useCabinetData()
  if (!next || !next.next) {
    return (
      <div className="card flex flex-col items-start justify-center p-8">
        <div className="text-4xl">🎉</div>
        <h3 className="mt-4 text-xl font-bold">Все курсы пройдены!</h3>
        <Link to="/" className="btn-primary mt-6">
          Выбрать новый курс
        </Link>
      </div>
    )
  }
  const { course, next: lesson, percent } = next
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-7 text-white shadow-lift sm:p-9">
      <div className="bg-dots absolute inset-0 opacity-25" />
      <div className="absolute -right-16 -top-16 size-72 rounded-full bg-mint-400/25 blur-[70px]" />
      <svg className="absolute -bottom-10 right-10 hidden size-64 text-white/10 md:block" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="14" />
      </svg>
      <div className="relative flex h-full flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider ring-1 ring-white/20">
          <CirclePlay className="size-4 text-mint-300" /> Следующий урок
        </span>
        <div className="mt-6 text-sm font-medium text-white/60">
          {course.title} · Модуль {lesson.moduleIndex + 1}. {lesson.moduleTitle}
        </div>
        <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[32px]">{lesson.title}</h2>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" /> {lesson.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-4" /> Видео + конспект
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-xs">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-white/60">Прогресс курса</span>
              <span className="font-bold">{percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-mint-400" style={{ width: `${percent}%` }} />
            </div>
          </div>
          <Link to={`/lesson/${course.slug}/${lesson.id}`} className="btn-mint shrink-0">
            Продолжить <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function MyCourseCard({ item }: { item: ReturnType<typeof useCabinetData>['my'][number] }) {
  const { course, percent, done, total, next } = item
  const finished = percent === 100
  return (
    <div className="group card flex flex-col overflow-hidden p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <CourseCover course={course} className="h-32 rounded-[22px]" iconClassName="group-hover:scale-110" />
        {finished && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-mint-700">
            <Trophy className="size-3.5" /> Пройден
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 pt-5">
        <div className="flex items-center justify-between gap-2">
          <LevelBadge level={course.level} />
          <span className="text-xs font-medium text-ink-400">{getTeacher(course.teacherId).name}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug">{course.title}</h3>
        <div className="mt-4 flex items-baseline justify-between text-sm">
          <span className="text-ink-500">
            {done} из {total} уроков
          </span>
          <span className={cn('font-display font-semibold', finished ? 'text-mint-600' : 'text-brand-700')}>{percent}%</span>
        </div>
        <Progress value={percent} tone={finished ? 'mint' : 'brand'} className="mt-2" />
        <div className="flex-1" />
        {finished ? (
          <Link to="/cabinet/certificates" className="btn-ghost mt-5 w-full py-3! text-sm">
            <Award className="size-4 text-mint-600" /> Сертификат
          </Link>
        ) : (
          <Link to={`/lesson/${course.slug}/${next!.id}`} className="btn mt-5 w-full bg-brand-50 py-3! text-sm text-brand-700 hover:bg-brand-600 hover:text-white">
            Продолжить <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

function CertificateCard({ c }: { c: Certificate }) {
  const { user } = useStore()
  return (
    <div className="group card overflow-hidden p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-white to-brand-50 p-6 ring-1 ring-ink-200/70">
        <div className={cn('absolute inset-y-0 left-0 w-2 bg-gradient-to-b', c.gradient)} />
        <svg className="absolute -right-8 -top-8 size-40 text-brand-100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">Сертификат</div>
            <div className="mt-1 text-xs text-ink-400">№ {c.number}</div>
          </div>
          <div className={cn('grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br text-2xl shadow-lg ring-4 ring-white', c.gradient)}>🏅</div>
        </div>
        <div className="relative mt-6 text-xs text-ink-400">Подтверждает, что</div>
        <div className="relative font-display text-lg font-semibold">{user?.name ?? 'Ученик'}</div>
        <div className="relative mt-2 text-xs text-ink-400">успешно прошёл(ла) курс</div>
        <div className="relative text-lg font-bold text-brand-700">«{c.title}»</div>
        <div className="relative mt-6 flex items-end justify-between text-xs text-ink-500">
          <span>
            {c.hours} академических часов
            <br />
            Выдан {c.issued}
          </span>
          <svg viewBox="0 0 90 30" className="h-8 w-24 text-ink-700" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 22c8-14 12-16 14-8s-2 12 4 4 10-14 13-6-1 10 6 4 8-8 14-6 10 2 16-2" />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <span className="text-sm font-semibold">{c.title}</span>
        <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-2 text-xs font-bold text-brand-700 transition hover:bg-brand-600 hover:text-white">
          <Download className="size-3.5" /> PDF
        </button>
      </div>
    </div>
  )
}

function Panel({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn('card p-5 sm:p-7', className)}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

const MoreLink = ({ to }: { to: string }) => (
  <Link to={to} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900">
    Все <ArrowRight className="size-4" />
  </Link>
)

/* ---------- разделы ---------- */

function Overview() {
  const { my, totalDone, certificates } = useCabinetData()
  const statCards = [
    { icon: Flame, value: '12 дней', label: 'учёбы подряд', cls: 'bg-amber-50 text-amber-600' },
    { icon: CircleCheck, value: String(totalDone), label: 'уроков пройдено', cls: 'bg-mint-50 text-mint-600' },
    { icon: Trophy, value: String(certificates.length), label: 'сертификата', cls: 'bg-brand-50 text-brand-600' },
  ]
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <NextLessonCard />
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {statCards.map((s) => (
            <div key={s.label} className="card flex items-center gap-4 p-5">
              <span className={cn('grid size-12 place-items-center rounded-2xl', s.cls)}>
                <s.icon className="size-6" />
              </span>
              <div>
                <div className="font-display text-2xl font-semibold tracking-tight">{s.value}</div>
                <div className="text-sm text-ink-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Panel title="Мои курсы" action={<MoreLink to="/cabinet/courses" />}>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {my.slice(0, 3).map((m) => (
            <MyCourseCard key={m.course.slug} item={m} />
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel title="Домашние задания" action={<MoreLink to="/cabinet/homework" />}>
          <div className="-mx-4 -my-2">
            {homeworks.slice(0, 4).map((hw) => (
              <HomeworkRow key={hw.id} hw={hw} />
            ))}
          </div>
        </Panel>
        <div className="space-y-6">
          <Panel title="Ближайшие события">
            <ul className="space-y-3">
              {schedule.map((s) => (
                <li key={s.title} className="flex items-center gap-4 rounded-2xl bg-ink-50 p-3 ring-1 ring-ink-100">
                  <div className="grid w-14 shrink-0 place-items-center rounded-xl bg-white py-2 text-center ring-1 ring-ink-200/70">
                    <span className="text-[11px] font-bold uppercase text-brand-600">{s.day}</span>
                    <span className="text-xs font-semibold">{s.date}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold leading-snug">{s.title}</div>
                    <div className="mt-0.5 text-xs text-ink-500">в {s.time} по Москве</div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Сертификаты" action={<MoreLink to="/cabinet/certificates" />}>
            <ul className="space-y-3">
              {certificates.map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <span className={cn('grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-lg', c.gradient)}>🏅</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold">{c.title}</div>
                    <div className="text-xs text-ink-500">№ {c.number}</div>
                  </div>
                  <button className="grid size-9 cursor-pointer place-items-center rounded-xl bg-ink-50 text-ink-500 transition hover:bg-brand-600 hover:text-white" aria-label="Скачать">
                    <Download className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function MyCourses() {
  const { my } = useCabinetData()
  const { purchased } = useStore()
  const more = courses.filter((c) => !purchased.includes(c.slug)).slice(0, 3)
  return (
    <div className="space-y-10">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {my.map((m) => (
          <MyCourseCard key={m.course.slug} item={m} />
        ))}
      </div>
      {more.length > 0 && (
        <div>
          <h2 className="text-lg font-bold">Может быть интересно</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {more.map((c) => (
              <Link key={c.slug} to={`/courses/${c.slug}`} className="group card flex items-center gap-4 p-3 transition hover:shadow-lift">
                <CourseCover course={c} size="sm" className="size-16 shrink-0 rounded-2xl" />
                <div className="min-w-0">
                  <div className="font-bold leading-snug group-hover:text-brand-700">{c.title}</div>
                  <div className="text-sm text-ink-500">{c.duration}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function HomeworkPage() {
  const [filter, setFilter] = useState<'all' | HomeworkStatus>('all')
  const list = filter === 'all' ? homeworks : homeworks.filter((h) => h.status === filter)
  const tabs: { id: 'all' | HomeworkStatus; label: string }[] = [
    { id: 'all', label: 'Все' },
    { id: 'review', label: 'На проверке' },
    { id: 'rework', label: 'Нужна доработка' },
    { id: 'accepted', label: 'Принято' },
  ]
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const count = t.id === 'all' ? homeworks.length : homeworks.filter((h) => h.status === t.id).length
          return (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition',
                filter === t.id ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-ink-700 ring-ink-200 hover:ring-brand-300',
              )}
            >
              {t.label}
              <span className={cn('rounded-full px-1.5 text-xs', filter === t.id ? 'bg-white/20' : 'bg-ink-100')}>{count}</span>
            </button>
          )
        })}
      </div>
      <div className="card divide-y divide-ink-100 p-3 sm:p-4">
        {list.map((hw) => (
          <HomeworkRow key={hw.id} hw={hw} detailed />
        ))}
      </div>
    </div>
  )
}

function Certificates() {
  const { certificates, active } = useCabinetData()
  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((c) => (
          <CertificateCard key={c.id} c={c} />
        ))}
      </div>
      {active.length > 0 && (
        <div>
          <h2 className="text-lg font-bold">Следующие сертификаты</h2>
          <p className="mt-1 text-sm text-ink-500">Сертификат выдаётся автоматически, когда пройдены все уроки курса.</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {active.map(({ course, percent, done, total, next }) => (
              <div key={course.slug} className="card flex items-center gap-5 p-5">
                <div className="relative size-20 shrink-0">
                  <svg viewBox="0 0 36 36" className="size-20 -rotate-90">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#ede8ff" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#7433f0" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="94.25" strokeDashoffset={94.25 * (1 - percent / 100)} />
                  </svg>
                  <span className="absolute inset-0 grid place-items-center text-2xl grayscale-[0.6]">🏅</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold leading-snug">{course.title}</div>
                  <div className="mt-1 text-sm text-ink-500">
                    Осталось {total - done} из {total} уроков · {percent}%
                  </div>
                  {next && (
                    <Link to={`/lesson/${course.slug}/${next.id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900">
                      Продолжить <ArrowRight className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- каркас ---------- */

const menu = [
  { to: '/cabinet', label: 'Обзор', icon: LayoutDashboard, end: true, title: 'Привет' },
  { to: '/cabinet/courses', label: 'Мои курсы', icon: GraduationCap, title: 'Мои курсы' },
  { to: '/cabinet/homework', label: 'Домашние задания', icon: NotebookPen, title: 'Домашние задания' },
  { to: '/cabinet/certificates', label: 'Сертификаты', icon: Award, title: 'Сертификаты' },
]

export default function Cabinet() {
  const { user, logout, resetDemo } = useStore()
  const { pathname } = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: pathname }} />

  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
  const current = menu.find((m) => (m.end ? pathname === m.to : pathname.startsWith(m.to))) ?? menu[0]
  const reviewCount = homeworks.filter((h) => h.status !== 'accepted').length

  return (
    <div className="min-h-screen bg-ink-50/70 lg:flex">
      {/* Боковое меню */}
      <aside className="border-b border-ink-200/70 bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[288px] lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:px-7 lg:py-7">
          <Logo />
          <button onClick={logout} className="grid size-10 cursor-pointer place-items-center rounded-xl text-ink-500 hover:bg-ink-50 lg:hidden" aria-label="Выйти">
            <LogOut className="size-5" />
          </button>
        </div>
        <div className="mx-5 mb-4 hidden items-center gap-3 rounded-3xl bg-ink-50 p-3 ring-1 ring-ink-200/60 lg:mx-5 lg:flex">
          <Avatar initials={initials} gradient="from-brand-500 to-fuchsia-400" />
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{user.name}</div>
            <div className="truncate text-xs text-ink-500">{user.email}</div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3 lg:flex-col lg:px-5 lg:pb-0">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.end}
              className={({ isActive }) =>
                cn(
                  'group flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-semibold transition-all',
                  isActive ? 'bg-brand-600 text-white shadow-glow' : 'text-ink-700 hover:bg-brand-50 hover:text-brand-700',
                )
              }
            >
              <m.icon className="size-5" />
              {m.label}
              {m.to === '/cabinet/homework' && (
                <span className="ml-auto rounded-full bg-mint-400 px-2 py-0.5 text-[11px] font-bold text-ink-900">{reviewCount}</span>
              )}
            </NavLink>
          ))}
          <Link to="/" className="flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-semibold text-ink-700 transition hover:bg-brand-50 hover:text-brand-700">
            <BookOpen className="size-5" /> Каталог курсов
          </Link>
        </nav>
        <div className="mt-auto hidden p-5 lg:block">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-mint-300 to-mint-400 p-5">
            <div className="text-2xl">🎁</div>
            <div className="mt-2 font-bold text-ink-900">Приведи друга</div>
            <p className="mt-1 text-sm text-ink-700">Скидка 20% вам обоим на следующий курс</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={resetDemo} className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-semibold text-ink-500 ring-1 ring-ink-200 transition hover:text-brand-700 hover:ring-brand-300" title="Вернуть демо-прогресс">
              <RotateCcw className="size-4" /> Сброс демо
            </button>
            <button onClick={logout} className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-semibold text-ink-500 ring-1 ring-ink-200 transition hover:text-rose-600 hover:ring-rose-200">
              <LogOut className="size-4" /> Выйти
            </button>
          </div>
        </div>
      </aside>

      {/* Контент */}
      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-4 px-5 pb-2 pt-6 sm:px-8 lg:px-10 lg:pt-9">
          <div>
            <div className="flex items-center gap-2 text-sm text-ink-500">
              <CalendarDays className="size-4" /> четверг, 25 сентября
            </div>
            <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight sm:text-[32px]">
              {current.end ? `Привет, ${user.name.split(' ')[0]}! 👋` : current.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
              <input className="w-72 rounded-2xl bg-white py-3 pl-11 pr-4 text-sm ring-1 ring-ink-200 outline-none transition placeholder:text-ink-400 focus:ring-2 focus:ring-brand-400" placeholder="Поиск по урокам" />
            </div>
            <button className="relative grid size-11 cursor-pointer place-items-center rounded-2xl bg-white ring-1 ring-ink-200 transition hover:ring-brand-300" aria-label="Уведомления">
              <Bell className="size-5" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <Avatar initials={initials} gradient="from-brand-500 to-fuchsia-400" className="size-11 text-sm lg:hidden" />
          </div>
        </header>
        <main className="px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="homework" element={<HomeworkPage />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="*" element={<Navigate to="/cabinet" replace />} />
          </Routes>
          <p className="mt-10 text-center text-xs text-ink-400">Демо-проект</p>
        </main>
      </div>
    </div>
  )
}
