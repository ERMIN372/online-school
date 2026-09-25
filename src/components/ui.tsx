import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Atom,
  Binary,
  ChartColumn,
  ChevronDown,
  PanelsTopLeft,
  Server,
  Star,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import type { Course, IconName, Level } from '../data/mock'

export const courseIcons: Record<IconName, LucideIcon> = {
  python: Terminal,
  frontend: PanelsTopLeft,
  react: Atom,
  data: ChartColumn,
  backend: Server,
  algo: Binary,
}

export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ')
}

/* ---------- Логотип ---------- */

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5">
      <span className="relative grid size-10 place-items-center rounded-[14px] bg-gradient-to-br from-brand-500 to-brand-800 shadow-glow transition-transform duration-300 group-hover:rotate-[-6deg]">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7 3 12l5 5M16 7l5 5-5 5" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-mint-400 ring-2 ring-white" />
      </span>
      <span className={cn('font-display text-[19px] font-semibold tracking-tight', light ? 'text-white' : 'text-ink-900')}>
        Код<span className="text-brand-600">Старт</span>
      </span>
    </Link>
  )
}

/* ---------- Обложка курса ---------- */

export function CourseCover({
  course,
  size = 'md',
  className,
  iconClassName,
}: {
  course: Course
  size?: 'sm' | 'md' | 'lg'
  className?: string
  iconClassName?: string
}) {
  const Icon = courseIcons[course.icon]
  const iconBox = size === 'lg' ? 'size-24 rounded-[28px]' : size === 'sm' ? 'size-9 rounded-xl' : 'size-16 rounded-3xl'
  const iconSize = size === 'lg' ? 'size-11' : size === 'sm' ? 'size-5' : 'size-8'
  return (
    <div className={cn('relative overflow-hidden bg-gradient-to-br', course.gradient, className)}>
      <div className="bg-dots absolute inset-0 opacity-60" />
      <svg className="absolute -right-10 -top-10 size-56 text-white/15" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="24" />
        <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg className="absolute -bottom-8 -left-6 size-40 text-white/10" viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="80" rx="22" fill="currentColor" transform="rotate(18 50 50)" />
      </svg>
      <div className="relative flex h-full items-center justify-center">
        <div className={cn('grid place-items-center bg-white/20 ring-1 ring-white/40 backdrop-blur-md shadow-[0_12px_30px_-8px_rgba(0,0,0,0.25)] transition-transform duration-500', iconBox, iconClassName)}>
          <Icon className={cn('text-white', iconSize)} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  )
}

/* ---------- Мелочи ---------- */

const levelStyle: Record<Level, string> = {
  Начальный: 'bg-mint-50 text-mint-700 ring-mint-200',
  Средний: 'bg-brand-50 text-brand-700 ring-brand-200',
  Продвинутый: 'bg-amber-50 text-amber-700 ring-amber-200',
}

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  const bars = level === 'Начальный' ? 1 : level === 'Средний' ? 2 : 3
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1', levelStyle[level], className)}>
      <span className="flex items-end gap-[2px]">
        {[1, 2, 3].map((b) => (
          <span key={b} className={cn('w-[3px] rounded-full bg-current', b <= bars ? 'opacity-100' : 'opacity-25')} style={{ height: 3 + b * 3 }} />
        ))}
      </span>
      {level}
    </span>
  )
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('inline-flex gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn('size-4', i <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'fill-ink-200 text-ink-200')} />
      ))}
    </span>
  )
}

export function Avatar({ initials, gradient, className }: { initials: string; gradient: string; className?: string }) {
  return (
    <span className={cn('grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-bold text-white', gradient, className ?? 'size-11 text-sm')}>
      {initials}
    </span>
  )
}

export function Progress({ value, className, tone = 'brand' }: { value: number; className?: string; tone?: 'brand' | 'mint' }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-ink-100', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-700',
          tone === 'brand' ? 'bg-gradient-to-r from-brand-500 to-brand-400' : 'bg-gradient-to-r from-mint-500 to-mint-300',
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

/* ---------- Аккордеон ---------- */

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  aside,
  index,
}: {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  aside?: ReactNode
  index?: number
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={cn('rounded-3xl bg-white ring-1 transition-all duration-300', open ? 'ring-brand-200 shadow-lift' : 'ring-ink-200/80 hover:ring-brand-200')}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
        aria-expanded={open}
      >
        {index !== undefined && (
          <span className={cn('grid size-10 shrink-0 place-items-center rounded-2xl font-display text-sm font-semibold transition-colors', open ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700')}>
            {String(index).padStart(2, '0')}
          </span>
        )}
        <span className="min-w-0 flex-1 text-[17px] font-semibold leading-snug">{title}</span>
        {aside && <span className="hidden shrink-0 text-sm text-ink-500 sm:block">{aside}</span>}
        <span className={cn('grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300', open ? 'rotate-180 bg-brand-600 text-white' : 'bg-ink-100 text-ink-700')}>
          <ChevronDown className="size-4" />
        </span>
      </button>
      <div className={cn('grid transition-all duration-300 ease-out', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
        <div className="overflow-hidden">
          <div className="px-5 pb-6 sm:px-7">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow?: string; title: ReactNode; text?: string; center?: boolean }) {
  return (
    <div className={cn('max-w-2xl', center && 'mx-auto text-center')}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="title-section mt-5">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-ink-500">{text}</p>}
    </div>
  )
}
