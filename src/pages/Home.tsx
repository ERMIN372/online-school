import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  CirclePlay,
  ClipboardCheck,
  Headphones,
  MessageCircle,
  Quote,
  Rocket,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { courses, faq, reviews, stats, teachers, type Level } from '../data/mock'
import CourseCard from '../components/CourseCard'
import { AccordionItem, Avatar, SectionHeading, Stars, cn } from '../components/ui'

/* ---------- Hero ---------- */

function HeroArt() {
  const code = [
    [['kw', 'def '], ['fn', 'hello'], ['p', '(name: '], ['ty', 'str'], ['p', '):']],
    [['p', '    '], ['kw', 'return '], ['st', 'f"Привет, {name}! 👋"']],
    [],
    [['cm', '# твоя первая программа']],
    [['fn', 'print'], ['p', '(hello('], ['st', '"Код Старт"'], ['p', '))']],
  ]
  const color: Record<string, string> = {
    kw: 'text-fuchsia-300',
    fn: 'text-mint-300',
    p: 'text-white/85',
    ty: 'text-sky-300',
    st: 'text-amber-200',
    cm: 'text-white/40 italic',
  }
  return (
    <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[600px]">
      {/* свечения */}
      <div className="absolute left-[8%] top-[6%] size-[70%] rounded-full bg-brand-400/40 blur-[90px]" />
      <div className="absolute bottom-[4%] right-[2%] size-[48%] rounded-full bg-mint-300/50 blur-[80px]" />

      {/* большая фиолетовая плита */}
      <div className="absolute inset-x-[6%] bottom-[8%] top-[10%] rotate-[-4deg] rounded-[44px] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 shadow-[0_40px_80px_-30px_rgba(99,34,214,0.6)]">
        <div className="bg-dots absolute inset-0 rounded-[44px] opacity-40" />
        <svg className="absolute -right-6 -top-6 size-40 text-white/15" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="12" />
        </svg>
      </div>

      {/* окно редактора */}
      <div className="absolute left-[10%] right-[4%] top-[20%] animate-float-slow rounded-[26px] bg-ink-900/95 p-5 shadow-[0_30px_60px_-20px_rgba(22,17,43,0.6)] ring-1 ring-white/10 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-rose-400" />
          <span className="size-3 rounded-full bg-amber-300" />
          <span className="size-3 rounded-full bg-mint-400" />
          <span className="ml-3 rounded-lg bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/60">lesson_01.py</span>
        </div>
        <pre className="mt-5 overflow-hidden font-mono text-[13px] leading-7 sm:text-[14px]">
          {code.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-4 select-none text-right text-white/25">{i + 1}</span>
              <span>
                {line.map(([t, v], j) => (
                  <span key={j} className={color[t]}>
                    {v}
                  </span>
                ))}
                {i === 4 && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-mint-300" />}
              </span>
            </div>
          ))}
        </pre>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 font-mono text-[12px] text-mint-300 ring-1 ring-white/10">
          <span className="text-white/40">›</span> Привет, Код Старт! 👋
        </div>
      </div>

      {/* карточка прогресса */}
      <div className="absolute -left-2 top-[4%] animate-float rounded-3xl bg-white p-4 pr-6 shadow-lift ring-1 ring-ink-200/60 sm:left-0">
        <div className="flex items-center gap-3">
          <div className="relative size-14">
            <svg viewBox="0 0 36 36" className="size-14 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#ede8ff" strokeWidth="4" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#7433f0" strokeWidth="4" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="30" />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[13px] font-bold">68%</span>
          </div>
          <div>
            <div className="text-xs font-medium text-ink-400">Мой прогресс</div>
            <div className="text-[15px] font-bold">Python с нуля</div>
          </div>
        </div>
      </div>

      {/* домашка принята */}
      <div className="absolute bottom-[3%] left-[2%] animate-float-slow rounded-3xl bg-white p-4 shadow-lift ring-1 ring-ink-200/60 [animation-delay:1.2s]">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-mint-100 text-mint-700">
            <BadgeCheck className="size-6" />
          </span>
          <div>
            <div className="text-[15px] font-bold">Домашка принята</div>
            <div className="text-xs text-ink-500">Оценка наставника · 96 / 100</div>
          </div>
        </div>
      </div>

      {/* сообщение наставника */}
      <div className="absolute bottom-[16%] right-0 hidden max-w-[230px] animate-float rounded-3xl rounded-br-md bg-white p-4 shadow-lift ring-1 ring-ink-200/60 [animation-delay:2s] sm:block">
        <div className="flex items-center gap-2">
          <Avatar initials="МО" gradient="from-violet-500 to-fuchsia-400" className="size-7 text-[10px]" />
          <span className="text-xs font-bold">Мария, наставник</span>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-ink-700">Отличное решение! Попробуй вынести логику в функцию 🚀</p>
      </div>

      {/* эмодзи-стикер */}
      <div className="absolute right-[6%] top-[2%] grid size-16 rotate-12 animate-float place-items-center rounded-2xl bg-mint-300 text-3xl shadow-lift [animation-delay:0.6s]">
        🎓
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid noise-mask pointer-events-none absolute inset-0" />
      <div className="container-x relative grid items-center gap-14 pb-20 pt-10 lg:min-h-[760px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:pb-24 lg:pt-6">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <Sparkles className="size-4" /> Новый поток стартует 6 октября
          </span>
          <h1 className="mt-7 font-display text-[28px] font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[38px] xl:text-[48px] 2xl:text-[52px]">
            Научим <span className="relative text-brand-600 sm:whitespace-nowrap">
              программировать
              <svg className="absolute -bottom-2 left-0 w-full text-mint-400" viewBox="0 0 300 12" preserveAspectRatio="none" fill="none">
                <path d="M2 9C60 3 140 2 298 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>{' '}
            с нуля до <br className="hidden lg:block" />
            первой работы
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-500 sm:text-xl">
            Короткие уроки, живые наставники и реальные проекты в портфолио. Учитесь в своём темпе — мы рядом на каждом шаге.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary px-8! py-4! text-base">
              Выбрать курс <ArrowRight className="size-5" />
            </button>
            <Link to="/lesson/python-start/m1-l1" className="btn-ghost px-7! py-4! text-base">
              <CirclePlay className="size-5 text-brand-600" /> Бесплатный урок
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <div className="flex -space-x-3">
              {reviews.slice(0, 4).map((r) => (
                <Avatar key={r.id} initials={r.initials} gradient={r.gradient} className="size-11 text-xs ring-4 ring-white" />
              ))}
              <span className="grid size-11 place-items-center rounded-full bg-ink-900 text-[11px] font-bold text-white ring-4 ring-white">+14k</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Stars value={5} />
                <span className="font-bold">4,9</span>
              </div>
              <div className="mt-0.5 text-sm text-ink-500">по отзывам 14 800 выпускников</div>
            </div>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  )
}

function StatsStrip() {
  return (
    <section className="container-x">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[32px] bg-ink-200/70 ring-1 ring-ink-200/70 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-6 py-8 sm:px-10">
            <div className="font-display text-3xl font-semibold tracking-tight text-brand-700 sm:text-[40px]">{s.value}</div>
            <div className="mt-2 text-[15px] text-ink-500">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Каталог ---------- */

function Catalog() {
  const levels: ('Все' | Level)[] = ['Все', 'Начальный', 'Средний', 'Продвинутый']
  const [level, setLevel] = useState<(typeof levels)[number]>('Все')
  const list = useMemo(() => (level === 'Все' ? courses : courses.filter((c) => c.level === level)), [level])
  return (
    <section id="courses" className="container-x scroll-mt-24 py-24 lg:py-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Каталог" title="6 курсов, чтобы начать карьеру в IT" text="Выберите направление — поможем пройти его до конца и собрать портфолио." />
        <div className="flex flex-wrap gap-2 rounded-full bg-ink-50 p-1.5 ring-1 ring-ink-200/70">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                'cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                level === l ? 'bg-white text-brand-700 shadow-soft ring-1 ring-ink-200/60' : 'text-ink-500 hover:text-ink-900',
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {list.map((c, i) => (
          <div key={c.slug} className="h-full animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <CourseCard course={c} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Как проходит обучение ---------- */

function HowItWorks() {
  const steps = [
    { icon: CirclePlay, title: 'Короткие видео', text: 'Уроки по 15–25 минут: удобно смотреть в дороге и между делами.' },
    { icon: ClipboardCheck, title: 'Практика после урока', text: 'Каждая тема закрепляется задачей с автопроверкой.' },
    { icon: MessageCircle, title: 'Ревью наставника', text: 'Разбор домашки в течение 24 часов с комментариями по коду.' },
    { icon: Rocket, title: 'Проекты и карьера', text: 'Портфолио, резюме и тренировочные собеседования.' },
  ]
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 text-white lg:py-28">
      <div className="absolute -left-40 top-0 size-[520px] rounded-full bg-brand-600/40 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 size-[420px] rounded-full bg-mint-500/25 blur-[120px]" />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-mint-300 ring-1 ring-white/15">
            Как проходит обучение
          </span>
          <h2 className="title-section mt-5">Учиться легко, когда рядом команда</h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="group rounded-[28px] bg-white/[0.06] p-7 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
                  <s.icon className="size-6" />
                </span>
                <span className="font-display text-sm text-white/30">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Преподаватели ---------- */

function Teachers() {
  return (
    <section id="teachers" className="container-x scroll-mt-24 py-24 lg:py-32">
      <SectionHeading eyebrow="Преподаватели" title="Учат практики, а не теоретики" text="Все наставники — действующие разработчики и аналитики с опытом от 7 лет." />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teachers.map((t) => (
          <article key={t.id} className="group card overflow-hidden p-2.5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
            <div className={cn('relative grid h-56 place-items-center overflow-hidden rounded-[22px] bg-gradient-to-br', t.gradient)}>
              <div className="bg-dots absolute inset-0 opacity-50" />
              <svg className="absolute bottom-0 left-1/2 w-[80%] -translate-x-1/2 text-white/25" viewBox="0 0 200 110" fill="currentColor">
                <circle cx="100" cy="44" r="34" />
                <path d="M20 110c0-44 36-62 80-62s80 18 80 62z" />
              </svg>
              <span className="relative grid size-24 place-items-center rounded-full bg-white/25 font-display text-3xl font-semibold text-white ring-4 ring-white/40 backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                {t.initials}
              </span>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink-900">
                <Star className="size-3.5 fill-amber-400 text-amber-400" /> {t.rating.toFixed(1).replace('.', ',')}
              </span>
            </div>
            <div className="p-4 pt-5">
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-700">{t.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{t.bio}</p>
              <div className="mt-5 flex items-center gap-4 border-t border-ink-100 pt-4 text-xs font-medium text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4 text-mint-600" /> {t.students.toLocaleString('ru-RU')}
                </span>
                <span>{t.experience}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Отзывы ---------- */

function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-gradient-to-b from-brand-50/70 to-white py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Отзывы" title="Истории наших выпускников" />
          <div className="flex items-center gap-4 rounded-3xl bg-white p-4 pr-6 shadow-soft ring-1 ring-ink-200/60">
            <span className="grid size-14 place-items-center rounded-2xl bg-amber-50 text-2xl">⭐</span>
            <div>
              <div className="font-display text-2xl font-semibold">4,9 из 5</div>
              <div className="text-sm text-ink-500">2 380 отзывов за 2026 год</div>
            </div>
          </div>
        </div>
        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {reviews.map((r) => (
            <figure key={r.id} className="card break-inside-avoid p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <Stars value={r.rating} />
                <Quote className="size-7 fill-brand-100 text-brand-100" />
              </div>
              <blockquote className="mt-5 text-[16px] leading-relaxed text-ink-700">«{r.text}»</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar initials={r.initials} gradient={r.gradient} />
                <div>
                  <div className="font-bold">{r.name}</div>
                  <div className="text-sm text-ink-500">{r.role}</div>
                </div>
              </figcaption>
              <div className="mt-5 inline-flex rounded-full bg-mint-50 px-3 py-1 text-xs font-semibold text-mint-700 ring-1 ring-mint-100">Курс «{r.course}»</div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

function Faq() {
  return (
    <section id="faq" className="container-x scroll-mt-24 py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title="Частые вопросы" text="Не нашли ответ? Напишите нам — отвечаем в течение 10 минут." />
          <div className="mt-10 overflow-hidden rounded-[28px] bg-gradient-to-br from-mint-300 to-mint-400 p-7">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-white/60">
                <Headphones className="size-7 text-mint-700" />
              </span>
              <div>
                <div className="text-lg font-bold text-ink-900">Бесплатная консультация</div>
                <div className="text-sm text-ink-700">Поможем выбрать курс под ваши цели</div>
              </div>
            </div>
            <button className="btn mt-6 w-full bg-ink-900 text-white hover:-translate-y-0.5 hover:bg-ink-700">Записаться на звонок</button>
          </div>
        </div>
        <div className="space-y-4">
          {faq.map((f, i) => (
            <AccordionItem key={f.q} title={f.q} defaultOpen={i === 0}>
              <p className="text-[16px] leading-relaxed text-ink-500">{f.a}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section className="container-x pb-16">
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-8 py-16 text-white sm:px-14 lg:py-20">
        <div className="bg-dots absolute inset-0 opacity-30" />
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-mint-400/30 blur-[90px]" />
        <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-[44px]">Первый урок — бесплатно</h2>
            <p className="mt-4 text-lg text-white/75">Попробуйте формат без регистрации и оплаты. Понравится — продолжите с того же места.</p>
          </div>
          <Link to="/lesson/python-start/m1-l1" className="btn-mint px-8! py-4! text-base">
            Начать учиться <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const location = useLocation()
  useEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
  }, [location.state])

  return (
    <>
      <Hero />
      <StatsStrip />
      <Catalog />
      <HowItWorks />
      <Teachers />
      <Reviews />
      <Faq />
      <CtaBanner />
    </>
  )
}
