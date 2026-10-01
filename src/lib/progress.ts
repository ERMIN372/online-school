import { allLessons, type Course } from '../data/mock'

export function courseProgress(course: Course, completed: string[] = []) {
  const lessons = allLessons(course)
  const done = lessons.filter((l) => completed.includes(l.id)).length
  const next = lessons.find((l) => !completed.includes(l.id)) ?? null
  return {
    total: lessons.length,
    done,
    percent: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
    next,
  }
}
