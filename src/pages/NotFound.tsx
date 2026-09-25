import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <div className="text-7xl">🧭</div>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">Страница не найдена</h1>
        <p className="mt-3 text-lg text-ink-500">Похоже, такой страницы нет. Вернёмся к курсам?</p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft className="size-5" /> На главную
        </Link>
      </div>
    </div>
  )
}
