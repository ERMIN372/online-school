import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Logo, cn } from './ui'
import { useStore } from '../lib/store'
import { courses } from '../data/mock'

const nav = [
  { id: 'courses', label: 'Курсы' },
  { id: 'teachers', label: 'Преподаватели' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'faq', label: 'Вопросы' },
]

export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (id: string) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }
}

function Header() {
  const { user } = useStore()
  const go = useSectionNav()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/80 shadow-[0_1px_0_rgba(22,17,43,0.06)] backdrop-blur-xl' : 'bg-white/0',
      )}
    >
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="cursor-pointer rounded-full px-4 py-2 text-[15px] font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link to="/cabinet" className="group flex items-center gap-3 rounded-full py-1 pl-1 pr-4 ring-1 ring-ink-200 transition hover:ring-brand-300">
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-400 text-xs font-bold text-white">
                {user.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')
                  .slice(0, 2)}
              </span>
              <span className="text-sm font-semibold group-hover:text-brand-700">Мой кабинет</span>
            </Link>
          ) : (
            <Link to="/login" className="rounded-full px-4 py-2 text-[15px] font-semibold text-ink-700 transition hover:text-brand-700">
              Войти
            </Link>
          )}
          <button onClick={() => go('courses')} className="btn-primary rounded-full! px-5! py-2.5! text-sm">
            Выбрать курс <ArrowRight className="size-4" />
          </button>
        </div>
        <button className="grid size-11 cursor-pointer place-items-center rounded-2xl ring-1 ring-ink-200 lg:hidden" onClick={() => setOpen(!open)} aria-label="Меню">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="container-x animate-fade-up pb-6 lg:hidden">
          <div className="card flex flex-col gap-1 p-3">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  setOpen(false)
                  go(n.id)
                }}
                className="cursor-pointer rounded-2xl px-4 py-3 text-left font-medium hover:bg-brand-50"
              >
                {n.label}
              </button>
            ))}
            <Link onClick={() => setOpen(false)} to={user ? '/cabinet' : '/login'} className="btn-primary mt-2">
              {user ? 'Мой кабинет' : 'Войти'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  const go = useSectionNav()
  return (
    <footer className="mt-10 border-t border-ink-100 bg-ink-50/60">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-500">
            Онлайн-школа программирования. Учим с нуля до первой работы в IT — бережно, честно и с живыми наставниками.
          </p>
          <div className="mt-6 flex gap-2 text-xl">
            {['💬', '📺', '✈️'].map((e) => (
              <span key={e} className="grid size-11 place-items-center rounded-2xl bg-white ring-1 ring-ink-200 transition hover:-translate-y-0.5 hover:ring-brand-300">
                {e}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-ink-400">Курсы</h4>
          <ul className="mt-5 space-y-3 text-[15px]">
            {courses.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link to={`/courses/${c.slug}`} className="text-ink-700 transition hover:text-brand-700">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-ink-400">Школа</h4>
          <ul className="mt-5 space-y-3 text-[15px]">
            {nav.map((n) => (
              <li key={n.id}>
                <button onClick={() => go(n.id)} className="cursor-pointer text-ink-700 transition hover:text-brand-700">
                  {n.label}
                </button>
              </li>
            ))}
            <li>
              <Link to="/cabinet" className="text-ink-700 transition hover:text-brand-700">
                Личный кабинет
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-ink-400">Контакты</h4>
          <ul className="mt-5 space-y-3 text-[15px] text-ink-700">
            <li>8 800 000-00-00</li>
            <li>hello@kodstart-demo.ru</li>
            <li className="text-ink-500">г. Светлогорск-на-Неве, ул. Кленовая, 12</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-100">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <span>© 2026 «Код Старт». Все данные вымышлены.</span>
          <span>Демо-проект</span>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
