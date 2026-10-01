import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  ClipboardCheck,
  Clock,
  FileText,
  Lightbulb,
  Lock,
  Maximize,
  Pause,
  Play,
  Settings2,
  TriangleAlert,
  Volume2,
} from 'lucide-react'
import { allLessons, getCourse, getTeacher, type Course } from '../data/mock'
import { courseProgress } from '../lib/progress'
import { useStore } from '../lib/store'
import { Avatar, CourseCover, Logo, Progress, cn } from '../components/ui'
import NotFound from './NotFound'

const kindIcon = { video: Play, practice: ClipboardCheck, test: FileText }

function VideoPlaceholder({ course, title, duration }: { course: Course; title: string; duration: string }) {
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const total = parseInt(duration) * 60 || 900

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setTime((s) => (s + 7 >= total ? total : s + 7)), 250)
    return () => clearInterval(t)
  }, [playing, total])

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  const pct = (time / total) * 100

  return (
    <div className={cn('group relative aspect-video overflow-hidden rounded-[28px] bg-gradient-to-br shadow-lift', course.gradient)}>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-ink-900/20" />
      <div className="bg-dots absolute inset-0 opacity-40" />
      <svg className="absolute -right-20 -top-20 size-[420px] text-white/10" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="30" />
        <circle cx="100" cy="100" r="98" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg className="absolute -bottom-16 -left-10 size-72 text-white/10" viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="80" rx="24" fill="currentColor" transform="rotate(20 50 50)" />
      </svg>

      {/* «кадр» урока */}
      <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur sm:left-8 sm:top-8">
        <span className={cn('size-2 rounded-full', playing ? 'animate-pulse bg-rose-400' : 'bg-white/70')} /> {playing ? 'Воспроизведение' : 'Видеоурок'}
      </div>
      <div className="absolute bottom-24 left-6 right-6 hidden text-white sm:left-8 sm:block">
        <div className="text-sm font-medium text-white/70">{course.title}</div>
        <div className="mt-1 max-w-xl font-display text-2xl font-semibold leading-tight tracking-tight lg:text-3xl">{title}</div>
      </div>

      <button
        onClick={() => setPlaying(!playing)}
        className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-brand-700 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-110 sm:size-24"
        aria-label={playing ? 'Пауза' : 'Смотреть'}
      >
        {!playing && <span className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.2s]" />}
        {playing ? <Pause className="relative size-8 fill-current" /> : <Play className="relative ml-1 size-9 fill-current" />}
      </button>

      {/* панель плеера */}
      <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-ink-900/55 px-4 py-3 text-white ring-1 ring-white/10 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-mint-400 transition-[width] duration-200" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2.5 flex items-center gap-4 text-xs">
          <button onClick={() => setPlaying(!playing)} className="cursor-pointer" aria-label="Пуск/пауза">
            {playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
          </button>
          <Volume2 className="size-4" />
          <span className="font-mono text-white/80">
            {fmt(time)} / {fmt(total)}
          </span>
          <span className="ml-auto rounded-md bg-white/15 px-1.5 py-0.5 font-semibold">1080p</span>
          <Settings2 className="size-4" />
          <Maximize className="size-4" />
        </div>
      </div>
    </div>
  )
}

export default function LessonPage() {
  const { slug, lessonId } = useParams()
  const course = getCourse(slug)
  const { purchased, completed, toggleLesson } = useStore()
  if (!course) return <NotFound />

  const lessons = allLessons(course)
  const idx = lessons.findIndex((l) => l.id === lessonId)
  if (idx === -1) return <NotFound />

  const lesson = lessons[idx]
  const prev = lessons[idx - 1]
  const next = lessons[idx + 1]
  const owned = purchased.includes(course.slug)
  const isFree = (id: string) => id === lessons[0].id
  const canView = owned || isFree(lesson.id)
  const done = (completed[course.slug] ?? []).includes(lesson.id)
  const progress = courseProgress(course, completed[course.slug])
  const teacher = getTeacher(course.teacherId)

  return (
    <div className="min-h-screen bg-ink-50/70">
      {/* Верхняя панель */}
      <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/85 backdrop-blur-xl">
        <div className="flex h-[72px] items-center gap-4 px-4 sm:px-8">
          <div className="hidden sm:block">
            <Logo />
          </div>
          <span className="hidden h-8 w-px bg-ink-200 sm:block" />
          <Link to={owned ? '/cabinet' : `/courses/${course.slug}`} className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-ink-700 hover:text-brand-700">
            <ArrowLeft className="size-4" /> <span className="max-w-[40vw] truncate">{owned ? 'В кабинет' : course.title}</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden w-56 md:block">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="font-semibold text-ink-700">{course.title}</span>
                <span className="font-bold text-brand-700">{progress.percent}%</span>
              </div>
              <Progress value={progress.percent} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1560px] gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:py-10">
        <div className="min-w-0">
          {canView ? (
            <VideoPlaceholder key={lesson.id} course={course} title={lesson.title} duration={lesson.duration} />
          ) : (
            <div className={cn('relative grid aspect-video place-items-center overflow-hidden rounded-[28px] bg-gradient-to-br', course.gradient)}>
              <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" />
              <div className="relative px-6 text-center text-white">
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  <Lock className="size-7" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold">Урок доступен после покупки</h2>
                <p className="mt-2 text-white/70">Первый урок курса — бесплатный.</p>
                <Link to={`/checkout/${course.slug}`} className="btn-mint mt-6">
                  Купить курс <ArrowRight className="size-5" />
                </Link>
              </div>
            </div>
          )}

          {/* Заголовок и действие */}
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm font-semibold text-brand-700">
                Модуль {lesson.moduleIndex + 1} · Урок {idx + 1} из {lessons.length}
              </div>
              <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{lesson.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" /> {lesson.duration}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Avatar initials={teacher.initials} gradient={teacher.gradient} className="size-6 text-[9px]" /> {teacher.name}
                </span>
              </div>
            </div>
            {canView && (
              <button
                onClick={() => toggleLesson(course.slug, lesson.id)}
                className={cn(
                  'btn shrink-0',
                  done ? 'bg-mint-100 text-mint-700 ring-1 ring-mint-200 hover:bg-mint-200' : 'bg-brand-600 text-white shadow-glow hover:-translate-y-0.5 hover:bg-brand-700',
                )}
              >
                {done ? (
                  <>
                    <CircleCheck className="size-5" /> Урок пройден
                  </>
                ) : (
                  <>
                    <Check className="size-5" /> Отметить пройденным
                  </>
                )}
              </button>
            )}
          </div>

          {/* Конспект */}
          {canView && (
            <article className="card mt-8 p-6 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-50">
                  <FileText className="size-5 text-brand-600" />
                </span>
                <h2 className="text-xl font-bold">Конспект урока</h2>
              </div>
              <div className="mt-6 max-w-3xl space-y-5 text-[17px] leading-[1.75] text-ink-700">
                <p>
                  В этом уроке разбираем тему <b className="text-ink-900">«{lesson.title}»</b> — одну из ключевых в модуле «{lesson.moduleTitle}». Посмотрите видео целиком,
                  а затем вернитесь к конспекту: здесь собраны главные мысли и пример кода, к которому удобно возвращаться.
                </p>
                <h3 className="pt-2 font-display text-xl font-semibold text-ink-900">Главное из урока</h3>
                <ul className="space-y-3">
                  {[
                    'Сначала сформулируйте задачу словами — и только потом переходите к коду.',
                    'Двигайтесь маленькими шагами: запускайте программу после каждого изменения.',
                    'Называйте переменные и функции так, чтобы из имени был понятен смысл.',
                    'Сообщение об ошибке — это подсказка. Читайте его внимательно, начиная с последней строки.',
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint-100">
                        <Check className="size-3 text-mint-700" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <h3 className="pt-2 font-display text-xl font-semibold text-ink-900">Пример кода</h3>
                <div className="overflow-hidden rounded-2xl bg-ink-900">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                    <span className="size-2.5 rounded-full bg-rose-400" />
                    <span className="size-2.5 rounded-full bg-amber-300" />
                    <span className="size-2.5 rounded-full bg-mint-400" />
                    <span className="ml-2 font-mono text-xs text-white/50">{course.codeSample.file}</span>
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
                <div className="flex gap-4 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200/70">
                  <TriangleAlert className="mt-1 size-5 shrink-0 text-amber-600" />
                  <div>
                    <div className="font-bold text-ink-900">Частая ошибка</div>
                    <p className="mt-1 text-[15px] leading-relaxed">
                      Пытаться написать всё решение сразу. Разбейте задачу на 2–3 шага и проверяйте каждый — так вы найдёте ошибку за минуту, а не за час.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100">
                  <Lightbulb className="mt-1 size-5 shrink-0 text-brand-600" />
                  <div>
                    <div className="font-bold text-ink-900">Мини-задание</div>
                    <p className="mt-1 text-[15px] leading-relaxed">
                      Измените пример так, чтобы программа работала с другими входными данными, и добавьте проверку некорректного ввода. Решение прикрепите в разделе
                      «Домашние задания».
                    </p>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Навигация */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link to={`/lesson/${course.slug}/${prev.id}`} className="group card flex items-center gap-4 p-5 transition hover:shadow-lift">
                <span className="grid size-11 place-items-center rounded-2xl bg-ink-50 transition group-hover:bg-brand-600 group-hover:text-white">
                  <ArrowLeft className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs text-ink-400">Предыдущий урок</div>
                  <div className="truncate font-semibold">{prev.title}</div>
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/lesson/${course.slug}/${next.id}`} className="group card flex items-center justify-end gap-4 p-5 text-right transition hover:shadow-lift">
                <div className="min-w-0">
                  <div className="text-xs text-ink-400">Следующий урок</div>
                  <div className="truncate font-semibold">{next.title}</div>
                </div>
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                  <ArrowRight className="size-5" />
                </span>
              </Link>
            )}
          </div>
          <p className="mt-10 text-center text-xs text-ink-400">Демо-проект</p>
        </div>

        {/* Программа курса */}
        <aside className="lg:sticky lg:top-[104px] lg:self-start">
          <div className="card overflow-hidden">
            <div className="flex items-center gap-4 border-b border-ink-100 p-5">
              <CourseCover course={course} size="sm" className="size-14 shrink-0 rounded-2xl" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-bold">{course.title}</div>
                <div className="mt-1.5 flex items-center gap-2">
                  <Progress value={progress.percent} className="h-1.5" />
                  <span className="text-xs font-bold text-brand-700">{progress.percent}%</span>
                </div>
              </div>
            </div>
            <div className="max-h-[calc(100vh-240px)] overflow-y-auto p-3">
              {course.modules.map((m, mi) => (
                <div key={m.title} className="mb-2">
                  <div className="px-3 pb-2 pt-3 text-xs font-bold uppercase tracking-wider text-ink-400">
                    Модуль {mi + 1}. {m.title}
                  </div>
                  {m.lessons.map((l) => {
                    const active = l.id === lesson.id
                    const isDone = (completed[course.slug] ?? []).includes(l.id)
                    const locked = !owned && !isFree(l.id)
                    const Icon = kindIcon[l.kind]
                    return (
                      <Link
                        key={l.id}
                        to={`/lesson/${course.slug}/${l.id}`}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition',
                          active ? 'bg-brand-600 text-white shadow-glow' : 'hover:bg-ink-50',
                        )}
                      >
                        <span
                          className={cn(
                            'grid size-7 shrink-0 place-items-center rounded-full',
                            active ? 'bg-white/20' : isDone ? 'bg-mint-100 text-mint-700' : 'bg-ink-100 text-ink-500',
                          )}
                        >
                          {locked ? <Lock className="size-3.5" /> : isDone ? <Check className="size-3.5" strokeWidth={3} /> : <Icon className="size-3.5" />}
                        </span>
                        <span className={cn('min-w-0 flex-1 truncate', !active && locked && 'text-ink-400', active && 'font-semibold')}>{l.title}</span>
                        <span className={cn('text-xs', active ? 'text-white/70' : 'text-ink-400')}>{l.duration}</span>
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
