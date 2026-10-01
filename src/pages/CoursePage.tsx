import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  Clock,
  FileText,
  Infinity as InfinityIcon,
  ShieldCheck,
  Star,
  Timer,
  Users,
} from 'lucide-react'
import { formatPrice, getCourse, getTeacher, lessonCount, plural } from '../data/mock'
import { AccordionItem, Avatar, CourseCover, LevelBadge, cn } from '../components/ui'
import { useStore } from '../lib/store'
import NotFound from './NotFound'

const kindIcon = { video: CirclePlay, practice: ClipboardCheck, test: FileText }
const kindLabel = { video: 'Видео', practice: 'Практика', test: 'Тест' }

export default function CoursePage() {
  const { slug } = useParams()
  const course = getCourse(slug)
  const { purchased } = useStore()
  if (!course) return <NotFound />

  const teacher = getTeacher(course.teacherId)
  const owned = purchased.includes(course.slug)
  const discount = Math.round((1 - course.price / course.oldPrice) * 100)
  const total = lessonCount(course)
  const firstLesson = course.modules[0].lessons[0].id

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-gradient-to-b from-brand-50 via-brand-50/40 to-white" />
      <div className="bg-grid noise-mask pointer-events-none absolute inset-x-0 top-0 h-[620px]" />

      <div className="container-x relative grid gap-10 pb-16 pt-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
        {/* Левая колонка */}
        <div className="min-w-0">
          <nav className="flex items-center gap-1.5 text-sm text-ink-500">
            <Link to="/" className="hover:text-brand-700">
              Главная
            </Link>
            <ChevronRight className="size-4" />
            <Link to="/" state={{ scrollTo: 'courses' }} className="hover:text-brand-700">
              Курсы
            </Link>
            <ChevronRight className="size-4" />
            <span className="text-ink-900">{course.title}</span>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LevelBadge level={course.level} />
            {course.tags.map((t) => (
              <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-700 ring-1 ring-ink-200">
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[60px]">{course.title}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-500">{course.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Star className="size-5 fill-amber-400 text-amber-400" /> {course.rating.toFixed(1).replace('.', ',')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink-500">
              <Users className="size-5 text-ink-400" /> {course.students.toLocaleString('ru-RU')} учеников
            </span>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Clock, label: 'Длительность', value: course.duration },
              { icon: BookOpen, label: 'Уроков', value: `${total} ${plural(total, ['урок', 'урока', 'уроков'])}` },
              { icon: Timer, label: 'Нагрузка', value: course.hoursPerWeek },
              { icon: CalendarDays, label: 'Старт', value: course.startDate },
            ].map((m) => (
              <div key={m.label} className="rounded-3xl bg-white/80 p-5 ring-1 ring-ink-200/70 backdrop-blur">
                <m.icon className="size-5 text-brand-600" />
                <div className="mt-4 text-xs font-medium text-ink-400">{m.label}</div>
                <div className="mt-1 font-bold">{m.value}</div>
              </div>
            ))}
          </div>

          {/* О курсе */}
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">О курсе</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-ink-700">
              {course.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl bg-ink-900 ring-1 ring-ink-900">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-mint-400" />
                <span className="ml-2 font-mono text-xs text-white/50">{course.codeSample.file}</span>
                <span className="ml-auto text-xs text-white/40">пример из курса</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[14px] leading-7 text-mint-200">
                {course.codeSample.lines.map((l, i) => (
                  <div key={i}>
                    <span className="mr-5 inline-block w-4 select-none text-right text-white/25">{i + 1}</span>
                    {l}
                  </div>
                ))}
              </pre>
            </div>
          </section>

          {/* Что получит ученик */}
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Что вы получите</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {course.outcomes.map((o, i) => (
                <div key={o.title} className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className={cn('grid size-11 place-items-center rounded-2xl text-lg', i % 2 ? 'bg-mint-100' : 'bg-brand-100')}>
                    {['🧠', '🗂️', '🛠️', '🏆'][i]}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{o.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{o.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {course.skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-mint-50 px-3.5 py-2 text-sm font-semibold text-mint-700 ring-1 ring-mint-100">
                  <Check className="size-4" /> {s}
                </span>
              ))}
            </div>
          </section>

          {/* Программа */}
          <section className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Программа курса</h2>
              <span className="text-[15px] text-ink-500">
                {course.modules.length} модулей · {total} уроков
              </span>
            </div>
            <div className="mt-7 space-y-3">
              {course.modules.map((m, i) => (
                <AccordionItem key={m.title} index={i + 1} title={m.title} defaultOpen={i === 0} aside={`${m.lessons.length} ${plural(m.lessons.length, ['урок', 'урока', 'уроков'])}`}>
                  <p className="mb-4 text-[15px] text-ink-500 sm:pl-14">{m.description}</p>
                  <ul className="divide-y divide-ink-100 rounded-2xl bg-ink-50/70 ring-1 ring-ink-100 sm:ml-14">
                    {m.lessons.map((l) => {
                      const Icon = kindIcon[l.kind]
                      return (
                        <li key={l.id} className="flex items-center gap-3 px-4 py-3.5 text-[15px]">
                          <Icon className={cn('size-5 shrink-0', l.kind === 'video' ? 'text-brand-500' : l.kind === 'practice' ? 'text-mint-600' : 'text-amber-500')} />
                          <span className="min-w-0 flex-1">{l.title}</span>
                          <span className="hidden rounded-full bg-white px-2 py-0.5 text-xs font-medium text-ink-500 ring-1 ring-ink-200 sm:inline">{kindLabel[l.kind]}</span>
                          <span className="w-14 text-right text-sm text-ink-400">{l.duration}</span>
                        </li>
                      )
                    })}
                  </ul>
                </AccordionItem>
              ))}
            </div>
          </section>

          {/* Преподаватель */}
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Преподаватель</h2>
            <div className="card mt-7 flex flex-col gap-6 p-7 sm:flex-row sm:items-center">
              <Avatar initials={teacher.initials} gradient={teacher.gradient} className="size-24 font-display text-2xl" />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{teacher.name}</h3>
                <p className="mt-1 font-medium text-brand-700">
                  {teacher.role}, {teacher.company}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{teacher.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-ink-50 px-3 py-1 font-medium ring-1 ring-ink-200">{teacher.experience}</span>
                  <span className="rounded-full bg-ink-50 px-3 py-1 font-medium ring-1 ring-ink-200">{teacher.students.toLocaleString('ru-RU')} учеников</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700 ring-1 ring-amber-200">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" /> {teacher.rating.toFixed(1).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Правая колонка — цена */}
        <aside className="lg:pt-14">
          <div className="lg:sticky lg:top-24">
            <div className="rounded-[32px] bg-white p-3 shadow-lift ring-1 ring-ink-200/70">
              <CourseCover course={course} size="lg" className="h-52 rounded-[24px]" />
              <div className="p-5 pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-lg text-ink-400 line-through">{formatPrice(course.oldPrice)}</span>
                  <span className="rounded-full bg-mint-100 px-2.5 py-1 text-xs font-bold text-mint-700">−{discount}%</span>
                </div>
                <div className="mt-1 font-display text-[40px] font-semibold leading-tight tracking-tight">{formatPrice(course.price)}</div>
                <p className="mt-1 text-sm text-ink-500">
                  или <b className="text-ink-900">{formatPrice(Math.round(course.price / 12 / 10) * 10)}</b> / мес в рассрочку на 12 месяцев
                </p>

                {owned ? (
                  <>
                    <div className="mt-6 flex items-center gap-2 rounded-2xl bg-mint-50 px-4 py-3 text-sm font-semibold text-mint-700 ring-1 ring-mint-100">
                      <Check className="size-5" /> Курс уже в вашем кабинете
                    </div>
                    <Link to={`/lesson/${course.slug}/${firstLesson}`} className="btn-primary mt-3 w-full py-4! text-base">
                      Перейти к обучению <ArrowRight className="size-5" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={`/checkout/${course.slug}`} className="btn-primary mt-6 w-full py-4! text-base">
                      Купить курс <ArrowRight className="size-5" />
                    </Link>
                    <Link to={`/lesson/${course.slug}/${firstLesson}`} className="btn-ghost mt-3 w-full">
                      <CirclePlay className="size-5 text-brand-600" /> Смотреть бесплатный урок
                    </Link>
                  </>
                )}

                <ul className="mt-6 space-y-3 border-t border-ink-100 pt-6 text-[15px]">
                  {[
                    { icon: ShieldCheck, text: 'Вернём деньги в течение 14 дней' },
                    { icon: InfinityIcon, text: 'Доступ к материалам навсегда' },
                    { icon: Award, text: 'Именной сертификат' },
                  ].map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-ink-700">
                      <span className="grid size-8 place-items-center rounded-xl bg-brand-50">
                        <f.icon className="size-4 text-brand-600" />
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-3xl bg-ink-50 p-4 text-sm text-ink-500 ring-1 ring-ink-200/60">
              <span className="text-2xl">🔥</span>
              <span>
                Осталось <b className="text-ink-900">12 мест</b> в потоке со стартом {course.startDate}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
