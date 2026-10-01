import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Clock, Star } from 'lucide-react'
import { formatPrice, lessonCount, type Course } from '../data/mock'
import { CourseCover, LevelBadge } from './ui'

export default function CourseCard({ course }: { course: Course }) {
  const discount = Math.round((1 - course.price / course.oldPrice) * 100)
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-ink-200/70 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift hover:ring-brand-200"
    >
      <div className="relative p-2.5 pb-0">
        <CourseCover course={course} className="h-48 rounded-[22px]" iconClassName="group-hover:scale-110 group-hover:-rotate-6" />
        <div className="absolute left-5 top-5 flex gap-2">
          <LevelBadge level={course.level} className="bg-white/95 ring-white/0 shadow-sm backdrop-blur" />
        </div>
        <span className="absolute right-5 top-5 rounded-full bg-ink-900/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">−{discount}%</span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-5">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-ink-700">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          {course.rating.toFixed(1).replace('.', ',')}
          <span className="font-normal text-ink-400">· {course.students.toLocaleString('ru-RU')} учеников</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand-700">
          {course.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{course.tagline}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-700">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4 text-brand-500" /> {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-4 text-brand-500" /> {lessonCount(course)} уроков
          </span>
        </div>
        <div className="flex-1" />
        <div className="mt-6 flex items-end justify-between border-t border-dashed border-ink-200 pt-5">
          <div>
            <div className="text-sm text-ink-400 line-through">{formatPrice(course.oldPrice)}</div>
            <div className="font-display text-[22px] font-semibold tracking-tight">{formatPrice(course.price)}</div>
          </div>
          <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-glow">
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </Link>
  )
}
