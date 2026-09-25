// Все данные в проекте выдуманные. Любые совпадения случайны.

export type Level = 'Начальный' | 'Средний' | 'Продвинутый'

export type IconName =
  | 'python'
  | 'frontend'
  | 'react'
  | 'data'
  | 'backend'
  | 'algo'

export interface Lesson {
  id: string
  title: string
  duration: string
  kind: 'video' | 'practice' | 'test'
}

export interface Module {
  title: string
  description: string
  lessons: Lesson[]
}

export interface Course {
  slug: string
  title: string
  tagline: string
  description: string[]
  level: Level
  duration: string
  hoursPerWeek: string
  price: number
  oldPrice: number
  rating: number
  students: number
  icon: IconName
  gradient: string
  accent: string
  tags: string[]
  teacherId: string
  outcomes: { title: string; text: string }[]
  skills: string[]
  modules: Module[]
  codeSample: { file: string; lines: string[] }
  startDate: string
}

export interface Teacher {
  id: string
  name: string
  role: string
  company: string
  experience: string
  bio: string
  initials: string
  gradient: string
  students: number
  rating: number
}

export interface Review {
  id: string
  name: string
  role: string
  course: string
  text: string
  rating: number
  initials: string
  gradient: string
}

export interface Tariff {
  id: 'self' | 'mentor' | 'premium'
  name: string
  description: string
  factor: number
  features: string[]
  popular?: boolean
}

export type HomeworkStatus = 'review' | 'accepted' | 'rework'

export interface Homework {
  id: string
  courseSlug: string
  lessonId: string
  title: string
  submitted: string
  status: HomeworkStatus
  reviewer: string
  comment: string
  score?: number
}

export interface Certificate {
  id: string
  number: string
  title: string
  issued: string
  hours: number
  gradient: string
}

/* ---------- helpers ---------- */

const mod = (
  n: number,
  title: string,
  description: string,
  lessons: [string, string, Lesson['kind']?][],
): Module => ({
  title,
  description,
  lessons: lessons.map(([t, d, k], i) => ({
    id: `m${n}-l${i + 1}`,
    title: t,
    duration: d,
    kind: k ?? 'video',
  })),
})

/* ---------- преподаватели ---------- */

export const teachers: Teacher[] = [
  {
    id: 'orlova',
    name: 'Мария Орлова',
    role: 'Senior Python-разработчик',
    company: 'студия «Северный ветер»',
    experience: '9 лет в разработке',
    bio: 'Строила backend для логистических сервисов, теперь учит писать код, за который не стыдно на ревью.',
    initials: 'МО',
    gradient: 'from-violet-500 to-fuchsia-400',
    students: 3120,
    rating: 4.9,
  },
  {
    id: 'lebedev',
    name: 'Артём Лебедев-Райский',
    role: 'Lead Frontend-инженер',
    company: 'агентство «Пиксель и Ко»',
    experience: '11 лет в вебе',
    bio: 'Собрал больше сорока интерфейсов для финтеха и медиа. Фанат доступности и быстрых страниц.',
    initials: 'АЛ',
    gradient: 'from-emerald-400 to-teal-500',
    students: 4280,
    rating: 4.9,
  },
  {
    id: 'sokolova',
    name: 'Дарина Соколова',
    role: 'Руководитель аналитики',
    company: 'маркетплейс «Лавка Плюс»',
    experience: '7 лет в данных',
    bio: 'Превращает таблицы в решения. Учит задавать данным правильные вопросы и не бояться SQL.',
    initials: 'ДС',
    gradient: 'from-amber-400 to-rose-400',
    students: 2650,
    rating: 4.8,
  },
  {
    id: 'kim',
    name: 'Руслан Ким',
    role: 'Staff-инженер, Go и распределённые системы',
    company: 'облачная платформа «Нимбус»',
    experience: '12 лет в backend',
    bio: 'Проектирует сервисы под миллионы запросов. Любит объяснять сложное на схемах и котиках.',
    initials: 'РК',
    gradient: 'from-sky-400 to-indigo-500',
    students: 1890,
    rating: 5.0,
  },
]

/* ---------- курсы ---------- */

export const courses: Course[] = [
  {
    slug: 'python-start',
    title: 'Python с нуля',
    tagline: 'Первый язык, который действительно понятен',
    description: [
      'Курс для тех, кто никогда не программировал. Начнём с переменных и условий, а закончим собственным Telegram-подобным ботом и парсером данных.',
      'Каждый урок — короткое видео, конспект и практическая задача с автопроверкой. Раз в неделю — живой разбор с наставником.',
    ],
    level: 'Начальный',
    duration: '3 месяца',
    hoursPerWeek: '6–8 ч в неделю',
    price: 24900,
    oldPrice: 34900,
    rating: 4.9,
    students: 2140,
    icon: 'python',
    gradient: 'from-violet-600 via-violet-500 to-fuchsia-400',
    accent: '#7C3AED',
    tags: ['Python', 'Git', 'Боты'],
    teacherId: 'orlova',
    startDate: '6 октября',
    skills: ['Синтаксис Python', 'ООП', 'Работа с файлами', 'HTTP-запросы', 'Git', 'Тестирование'],
    outcomes: [
      { title: 'Уверенная база', text: 'Поймёте, как устроены программы, и сможете писать скрипты для своих задач.' },
      { title: '3 проекта в портфолио', text: 'Бот-помощник, парсер цен и консольная игра с сохранениями.' },
      { title: 'Привычки разработчика', text: 'Git, код-ревью, чистый код и чтение документации.' },
      { title: 'Сертификат', text: 'Именной электронный сертификат с уникальным номером.' },
    ],
    modules: [
      mod(1, 'Знакомство с Python', 'Устанавливаем окружение и пишем первую программу.', [
        ['Как компьютер выполняет код', '12 мин'],
        ['Переменные и типы данных', '18 мин'],
        ['Ввод, вывод и f-строки', '15 мин'],
        ['Практика: калькулятор чаевых', '25 мин', 'practice'],
      ]),
      mod(2, 'Условия и циклы', 'Учим программу принимать решения и повторять действия.', [
        ['Условные операторы', '16 мин'],
        ['Циклы for и while', '20 мин'],
        ['Практика: угадай число', '30 мин', 'practice'],
        ['Тест по модулю', '10 мин', 'test'],
      ]),
      mod(3, 'Коллекции и функции', 'Списки, словари и собственные функции.', [
        ['Списки и срезы', '19 мин'],
        ['Словари и множества', '17 мин'],
        ['Функции и аргументы', '22 мин'],
        ['Практика: список покупок', '35 мин', 'practice'],
      ]),
      mod(4, 'Объектно-ориентированное программирование', 'Классы, объекты и наследование на живых примерах.', [
        ['Классы и объекты', '21 мин'],
        ['Наследование', '18 мин'],
        ['Практика: библиотека книг', '40 мин', 'practice'],
      ]),
      mod(5, 'Работа с сетью и данными', 'Запросы к API, JSON и парсинг.', [
        ['HTTP и формат JSON', '16 мин'],
        ['Парсим страницу с ценами', '28 мин'],
        ['Практика: трекер цен', '45 мин', 'practice'],
      ]),
      mod(6, 'Финальный проект', 'Собираем бота-помощника и защищаем проект.', [
        ['Проектирование бота', '20 мин'],
        ['Сборка и тестирование', '35 мин', 'practice'],
        ['Защита проекта', '15 мин', 'test'],
      ]),
    ],
    codeSample: {
      file: 'tips.py',
      lines: [
        'def calc_tips(bill: float, percent: int = 10) -> float:',
        '    """Считает чаевые и округляет до рубля."""',
        '    return round(bill * percent / 100)',
        '',
        'total = float(input("Сумма счёта: "))',
        'print(f"Чаевые: {calc_tips(total)} ₽")',
      ],
    },
  },
  {
    slug: 'frontend',
    title: 'Фронтенд-разработчик',
    tagline: 'От первой вёрстки до SPA на React',
    description: [
      'Большая профессия для тех, кто хочет делать интерфейсы. Вёрстка, JavaScript, React и работа в команде — всё, что нужно для первой работы.',
      'Вы соберёте 5 проектов, пройдёте тренировочные собеседования и получите помощь с резюме от карьерного консультанта.',
    ],
    level: 'Начальный',
    duration: '6 месяцев',
    hoursPerWeek: '10–12 ч в неделю',
    price: 59900,
    oldPrice: 79900,
    rating: 4.9,
    students: 3480,
    icon: 'frontend',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    accent: '#14B88C',
    tags: ['HTML/CSS', 'JavaScript', 'React'],
    teacherId: 'lebedev',
    startDate: '13 октября',
    skills: ['Семантический HTML', 'Flexbox и Grid', 'JavaScript ES2024', 'React', 'Git', 'Адаптивная вёрстка'],
    outcomes: [
      { title: 'Профессия с нуля', text: 'Освоите полный цикл: от макета до опубликованного приложения.' },
      { title: '5 проектов', text: 'Лендинг, интернет-магазин, дашборд, SPA и командный проект.' },
      { title: 'Карьерный трек', text: 'Резюме, портфолио, пробные собеседования и разбор тестовых.' },
      { title: 'Сертификат', text: 'Документ о прохождении с перечнем освоенных навыков.' },
    ],
    modules: [
      mod(1, 'HTML и CSS', 'Семантика, каскад и современная раскладка.', [
        ['Как работает браузер', '14 мин'],
        ['Семантическая разметка', '18 мин'],
        ['Flexbox на практике', '24 мин'],
        ['CSS Grid и адаптивность', '26 мин'],
        ['Практика: лендинг кофейни', '60 мин', 'practice'],
      ]),
      mod(2, 'JavaScript', 'Язык веба от переменных до асинхронности.', [
        ['Переменные и типы', '17 мин'],
        ['Функции и замыкания', '23 мин'],
        ['Работа с DOM', '21 мин'],
        ['Промисы и async/await', '25 мин'],
        ['Практика: todo-лист', '50 мин', 'practice'],
      ]),
      mod(3, 'Инструменты разработчика', 'Git, npm, сборщики и DevTools.', [
        ['Git и ветвление', '22 мин'],
        ['npm и сборка проекта', '16 мин'],
        ['Отладка в DevTools', '18 мин'],
      ]),
      mod(4, 'React', 'Компоненты, состояние и роутинг.', [
        ['Компоненты и пропсы', '20 мин'],
        ['Состояние и хуки', '26 мин'],
        ['Роутинг в SPA', '19 мин'],
        ['Практика: каталог товаров', '70 мин', 'practice'],
      ]),
      mod(5, 'Командный проект', 'Работа по задачам, код-ревью и релиз.', [
        ['Процессы в команде', '15 мин'],
        ['Спринт и код-ревью', '40 мин', 'practice'],
        ['Защита проекта', '20 мин', 'test'],
      ]),
    ],
    codeSample: {
      file: 'Card.tsx',
      lines: [
        'export function Card({ title, price }: Props) {',
        '  const [liked, setLiked] = useState(false)',
        '  return (',
        '    <article className="card">',
        '      <h3>{title}</h3>',
        '      <button onClick={() => setLiked(!liked)}>♥</button>',
        '    </article>',
        '  )',
        '}',
      ],
    },
  },
  {
    slug: 'react-typescript',
    title: 'React и TypeScript',
    tagline: 'Прокачка для тех, кто уже пишет на JS',
    description: [
      'Курс для фронтендеров с базовым опытом. Разберём типизацию, архитектуру приложений, работу с сервером и производительность.',
      'Финальный проект — дашборд с авторизацией, графиками и тестами, который не стыдно показать на собеседовании.',
    ],
    level: 'Средний',
    duration: '4 месяца',
    hoursPerWeek: '8–10 ч в неделю',
    price: 42900,
    oldPrice: 54900,
    rating: 4.8,
    students: 1320,
    icon: 'react',
    gradient: 'from-sky-400 via-indigo-400 to-violet-500',
    accent: '#6366F1',
    tags: ['TypeScript', 'React', 'Тесты'],
    teacherId: 'lebedev',
    startDate: '20 октября',
    skills: ['TypeScript', 'React Hooks', 'Управление состоянием', 'Тестирование', 'Производительность'],
    outcomes: [
      { title: 'Строгая типизация', text: 'Научитесь описывать данные так, чтобы ошибки ловились до запуска.' },
      { title: 'Архитектура', text: 'Поймёте, как раскладывать большое приложение по слоям.' },
      { title: 'Проект-дашборд', text: 'Полноценное SPA с авторизацией, графиками и тестами.' },
      { title: 'Сертификат', text: 'Подтверждение уровня Middle-ready для работодателя.' },
    ],
    modules: [
      mod(1, 'TypeScript на практике', 'Типы, дженерики и утилиты.', [
        ['Базовые и составные типы', '20 мин'],
        ['Дженерики без боли', '24 мин'],
        ['Utility types', '18 мин'],
      ]),
      mod(2, 'Продвинутый React', 'Хуки, контекст и паттерны.', [
        ['Собственные хуки', '22 мин'],
        ['Context и композиция', '19 мин'],
        ['Практика: форма с валидацией', '45 мин', 'practice'],
      ]),
      mod(3, 'Данные и сервер', 'Запросы, кэширование, ошибки.', [
        ['Работа с REST API', '21 мин'],
        ['Кэширование запросов', '23 мин'],
        ['Обработка ошибок', '15 мин'],
      ]),
      mod(4, 'Качество кода', 'Тесты и производительность.', [
        ['Юнит-тесты компонентов', '26 мин'],
        ['Профилирование React', '20 мин'],
        ['Финальный проект', '90 мин', 'practice'],
      ]),
    ],
    codeSample: {
      file: 'useFetch.ts',
      lines: [
        'export function useFetch<T>(url: string) {',
        '  const [data, setData] = useState<T | null>(null)',
        '  useEffect(() => {',
        '    fetch(url).then(r => r.json()).then(setData)',
        '  }, [url])',
        '  return data',
        '}',
      ],
    },
  },
  {
    slug: 'data-analyst',
    title: 'Аналитик данных',
    tagline: 'SQL, Python и дашборды для бизнеса',
    description: [
      'Научитесь находить в данных ответы на вопросы бизнеса. SQL-запросы, анализ в Python, визуализация и A/B-тесты на реальных датасетах выдуманного маркетплейса.',
      'Подходит новичкам: математика объясняется по ходу курса, без сухой теории.',
    ],
    level: 'Средний',
    duration: '5 месяцев',
    hoursPerWeek: '8–10 ч в неделю',
    price: 47900,
    oldPrice: 62900,
    rating: 4.9,
    students: 1760,
    icon: 'data',
    gradient: 'from-amber-300 via-orange-400 to-rose-400',
    accent: '#F97316',
    tags: ['SQL', 'Pandas', 'Дашборды'],
    teacherId: 'sokolova',
    startDate: '9 октября',
    skills: ['SQL', 'Pandas', 'Статистика', 'A/B-тесты', 'Визуализация', 'Метрики продукта'],
    outcomes: [
      { title: 'SQL уверенно', text: 'Джойны, оконные функции и оптимизация запросов.' },
      { title: 'Аналитика в Python', text: 'Pandas, графики и воспроизводимые отчёты.' },
      { title: 'Продуктовое мышление', text: 'Метрики, воронки, когорты и A/B-тесты.' },
      { title: 'Сертификат', text: 'Именной сертификат и 4 кейса в портфолио.' },
    ],
    modules: [
      mod(1, 'Основы SQL', 'Выборки, фильтры и агрегаты.', [
        ['Реляционные базы данных', '15 мин'],
        ['SELECT, WHERE, ORDER BY', '19 мин'],
        ['GROUP BY и агрегаты', '21 мин'],
        ['Практика: отчёт по продажам', '40 мин', 'practice'],
      ]),
      mod(2, 'Продвинутый SQL', 'Джойны, подзапросы, окна.', [
        ['JOIN всех видов', '24 мин'],
        ['Оконные функции', '26 мин'],
        ['Тест по модулю', '15 мин', 'test'],
      ]),
      mod(3, 'Python для анализа', 'Pandas и визуализация.', [
        ['Pandas: DataFrame', '22 мин'],
        ['Очистка данных', '20 мин'],
        ['Графики, которые понятны', '18 мин'],
      ]),
      mod(4, 'Продуктовая аналитика', 'Метрики и эксперименты.', [
        ['Метрики и воронки', '19 мин'],
        ['Когортный анализ', '23 мин'],
        ['A/B-тесты', '27 мин'],
        ['Финальный кейс', '90 мин', 'practice'],
      ]),
    ],
    codeSample: {
      file: 'orders.sql',
      lines: [
        'SELECT city,',
        '       COUNT(*)          AS orders,',
        '       ROUND(AVG(total)) AS avg_check',
        'FROM orders',
        "WHERE created_at >= '2026-09-01'",
        'GROUP BY city',
        'ORDER BY orders DESC;',
      ],
    },
  },
  {
    slug: 'go-backend',
    title: 'Бэкенд на Go',
    tagline: 'Быстрые и надёжные сервисы',
    description: [
      'Курс для разработчиков, которые хотят писать высоконагруженный backend. Конкурентность, базы данных, очереди и деплой в контейнерах.',
      'Итог — микросервис с REST API, очередью задач и мониторингом, собранный по промышленным стандартам.',
    ],
    level: 'Продвинутый',
    duration: '5 месяцев',
    hoursPerWeek: '10 ч в неделю',
    price: 64900,
    oldPrice: 82900,
    rating: 5.0,
    students: 740,
    icon: 'backend',
    gradient: 'from-cyan-400 via-sky-500 to-indigo-600',
    accent: '#0EA5E9',
    tags: ['Go', 'PostgreSQL', 'Docker'],
    teacherId: 'kim',
    startDate: '27 октября',
    skills: ['Go', 'Горутины и каналы', 'PostgreSQL', 'REST и gRPC', 'Docker', 'Observability'],
    outcomes: [
      { title: 'Конкурентность', text: 'Горутины, каналы и паттерны без гонок данных.' },
      { title: 'Промышленный код', text: 'Структура проекта, тесты, линтеры и CI.' },
      { title: 'Микросервис', text: 'Сервис с API, очередями и мониторингом в портфолио.' },
      { title: 'Сертификат', text: 'Сертификат уровня Advanced.' },
    ],
    modules: [
      mod(1, 'Язык Go', 'Синтаксис, типы и интерфейсы.', [
        ['Почему Go', '12 мин'],
        ['Структуры и интерфейсы', '24 мин'],
        ['Обработка ошибок', '18 мин'],
      ]),
      mod(2, 'Конкурентность', 'Горутины, каналы, синхронизация.', [
        ['Горутины', '20 мин'],
        ['Каналы и select', '25 мин'],
        ['Практика: воркер-пул', '50 мин', 'practice'],
      ]),
      mod(3, 'Сервисы и данные', 'HTTP, базы данных, очереди.', [
        ['HTTP-сервер', '22 мин'],
        ['PostgreSQL и миграции', '26 мин'],
        ['Очереди сообщений', '24 мин'],
      ]),
      mod(4, 'В продакшен', 'Контейнеры, метрики, деплой.', [
        ['Docker для Go', '19 мин'],
        ['Метрики и логи', '21 мин'],
        ['Финальный проект', '120 мин', 'practice'],
      ]),
    ],
    codeSample: {
      file: 'worker.go',
      lines: [
        'func worker(jobs <-chan Job, out chan<- Result) {',
        '    for j := range jobs {',
        '        out <- process(j)',
        '    }',
        '}',
      ],
    },
  },
  {
    slug: 'algorithms',
    title: 'Алгоритмы для собеседований',
    tagline: 'Решайте задачи уверенно и быстро',
    description: [
      'Интенсив для тех, кто готовится к техническим собеседованиям. 120 задач, разобранных по паттернам: два указателя, скользящее окно, графы, динамика.',
      'Еженедельные mock-интервью с обратной связью от практикующих инженеров.',
    ],
    level: 'Продвинутый',
    duration: '2 месяца',
    hoursPerWeek: '6 ч в неделю',
    price: 29900,
    oldPrice: 39900,
    rating: 4.8,
    students: 980,
    icon: 'algo',
    gradient: 'from-fuchsia-500 via-purple-500 to-indigo-500',
    accent: '#A855F7',
    tags: ['Алгоритмы', 'Big O', 'Mock-интервью'],
    teacherId: 'kim',
    startDate: '1 октября',
    skills: ['Сложность алгоритмов', 'Структуры данных', 'Графы', 'Динамическое программирование'],
    outcomes: [
      { title: '120 задач', text: 'Разобранных по паттернам, а не заученных наизусть.' },
      { title: 'Mock-интервью', text: '6 тренировочных собеседований с разбором.' },
      { title: 'Спокойствие', text: 'Понятная стратегия решения любой новой задачи.' },
      { title: 'Сертификат', text: 'Подтверждение прохождения интенсива.' },
    ],
    modules: [
      mod(1, 'Сложность и базовые структуры', 'Big O, массивы, хеш-таблицы.', [
        ['Оценка сложности', '16 мин'],
        ['Хеш-таблицы', '18 мин'],
        ['Практика: 15 задач', '90 мин', 'practice'],
      ]),
      mod(2, 'Паттерны', 'Два указателя, окно, бинарный поиск.', [
        ['Два указателя', '20 мин'],
        ['Скользящее окно', '22 мин'],
        ['Бинарный поиск', '19 мин'],
      ]),
      mod(3, 'Графы и динамика', 'BFS, DFS и DP.', [
        ['Обходы графов', '25 мин'],
        ['Динамическое программирование', '30 мин'],
        ['Mock-интервью', '60 мин', 'test'],
      ]),
    ],
    codeSample: {
      file: 'two_sum.py',
      lines: [
        'def two_sum(nums, target):',
        '    seen = {}',
        '    for i, n in enumerate(nums):',
        '        if target - n in seen:',
        '            return seen[target - n], i',
        '        seen[n] = i',
      ],
    },
  },
]

/* ---------- отзывы ---------- */

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Кирилл Звягин',
    role: 'Junior Frontend в студии «Облачко»',
    course: 'Фронтенд-разработчик',
    text: 'Пришёл из логистики без опыта. Через полгода — первый оффер. Больше всего помогли ревью домашек: наставник разбирал каждую строчку и объяснял «почему», а не «как».',
    rating: 5,
    initials: 'КЗ',
    gradient: 'from-violet-500 to-fuchsia-400',
  },
  {
    id: 'r2',
    name: 'Ольга Прохорова',
    role: 'Аналитик в сервисе «Полка»',
    course: 'Аналитик данных',
    text: 'Боялась математики, а оказалось, что всё объясняют на примерах из жизни. Финальный кейс с когортами показала на собеседовании — это и решило дело.',
    rating: 5,
    initials: 'ОП',
    gradient: 'from-amber-400 to-rose-400',
  },
  {
    id: 'r3',
    name: 'Тимур Абдуллаев',
    role: 'Студент 2 курса',
    course: 'Python с нуля',
    text: 'Короткие уроки идеально ложатся между парами. Бот, которого я собрал на курсе, теперь напоминает всей группе о дедлайнах.',
    rating: 5,
    initials: 'ТА',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'r4',
    name: 'Вера Никитина',
    role: 'Middle Go-разработчик',
    course: 'Бэкенд на Go',
    text: 'Сложно, но очень честно. Никакой воды: только то, что реально пригождается в продакшене. Раздел про конкурентность — лучший, что я видела.',
    rating: 5,
    initials: 'ВН',
    gradient: 'from-sky-400 to-indigo-500',
  },
  {
    id: 'r5',
    name: 'Степан Белов',
    role: 'Frontend в агентстве «Квадрат»',
    course: 'React и TypeScript',
    text: 'Наконец-то понял дженерики. После курса переписал рабочий проект на TypeScript, и число багов на проде заметно упало.',
    rating: 4,
    initials: 'СБ',
    gradient: 'from-fuchsia-500 to-purple-500',
  },
  {
    id: 'r6',
    name: 'Анна Мельник',
    role: 'Прошла собеседование в «Нимбус Лабс»',
    course: 'Алгоритмы для собеседований',
    text: 'Mock-интервью сняли весь стресс. На реальном собеседовании узнала паттерн с первой минуты и спокойно дорешала задачу.',
    rating: 5,
    initials: 'АМ',
    gradient: 'from-teal-400 to-cyan-500',
  },
]

/* ---------- FAQ ---------- */

export const faq: { q: string; a: string }[] = [
  {
    q: 'Подойдёт ли курс, если я никогда не программировал?',
    a: 'Да. Курсы уровня «Начальный» рассчитаны на полный ноль: начинаем с установки программ и объясняем каждый термин. Нужны только компьютер и 6–8 часов в неделю.',
  },
  {
    q: 'Как проходит обучение?',
    a: 'Вы смотрите короткие видеоуроки, читаете конспекты и выполняете домашние задания. Наставник проверяет работы в течение 24 часов, а раз в неделю проходят живые разборы.',
  },
  {
    q: 'Можно ли вернуть деньги?',
    a: 'Да. В первые 14 дней мы вернём полную стоимость без вопросов. Позже — пропорционально непройденной части курса.',
  },
  {
    q: 'Есть ли рассрочка?',
    a: 'Можно оплатить курс частями на 6, 12 или 24 месяца без переплаты. Оформление занимает пару минут прямо на странице оплаты.',
  },
  {
    q: 'Что будет, если я не успеваю?',
    a: 'Доступ к материалам остаётся навсегда. Можно поставить обучение на паузу до 3 месяцев или перейти в следующий поток.',
  },
  {
    q: 'Помогаете ли вы с трудоустройством?',
    a: 'Карьерный центр помогает с резюме и портфолио, проводит тренировочные собеседования и делится вакансиями от компаний-партнёров.',
  },
]

/* ---------- тарифы ---------- */

export const tariffs: Tariff[] = [
  {
    id: 'self',
    name: 'Самостоятельный',
    description: 'Для тех, кто любит учиться в своём темпе',
    factor: 0.7,
    features: ['Все видеоуроки и конспекты', 'Автопроверка задач', 'Общий чат потока', 'Сертификат'],
  },
  {
    id: 'mentor',
    name: 'С наставником',
    description: 'Оптимальный баланс поддержки и свободы',
    factor: 1,
    popular: true,
    features: [
      'Всё из «Самостоятельного»',
      'Ревью домашек за 24 часа',
      'Еженедельные живые разборы',
      'Помощь с портфолио',
    ],
  },
  {
    id: 'premium',
    name: 'Премиум',
    description: 'Максимум внимания и карьерный трек',
    factor: 1.6,
    features: [
      'Всё из «С наставником»',
      '8 личных созвонов с ментором',
      'Пробные собеседования',
      'Гарантия стажировки у партнёров',
    ],
  },
]

export const tariffPrice = (base: number, factor: number) =>
  Math.round((base * factor) / 1000) * 1000 - 100

/* ---------- личный кабинет ---------- */

export const demoUser = {
  name: 'Алина Воронцова',
  email: 'alina.vorontsova@demo-mail.ru',
  initials: 'АВ',
}

// Курсы, купленные в демо-аккаунте по умолчанию
export const demoPurchased = ['python-start', 'frontend', 'data-analyst']

// Пройденные уроки в демо-аккаунте по умолчанию
export const demoCompleted: Record<string, string[]> = {
  'python-start': [
    'm1-l1', 'm1-l2', 'm1-l3', 'm1-l4',
    'm2-l1', 'm2-l2', 'm2-l3', 'm2-l4',
    'm3-l1', 'm3-l2', 'm3-l3', 'm3-l4',
    'm4-l1',
  ],
  frontend: ['m1-l1', 'm1-l2', 'm1-l3', 'm1-l4', 'm1-l5', 'm2-l1', 'm2-l2'],
  'data-analyst': [
    'm1-l1', 'm1-l2', 'm1-l3', 'm1-l4',
    'm2-l1', 'm2-l2', 'm2-l3',
    'm3-l1', 'm3-l2', 'm3-l3',
    'm4-l1', 'm4-l2', 'm4-l3', 'm4-l4',
  ],
}

export const homeworks: Homework[] = [
  {
    id: 'hw1',
    courseSlug: 'python-start',
    lessonId: 'm3-l4',
    title: 'Список покупок с сохранением в файл',
    submitted: '23 сентября',
    status: 'review',
    reviewer: 'Мария Орлова',
    comment: 'Работа в очереди на проверку. Обычно отвечаем в течение 24 часов.',
  },
  {
    id: 'hw2',
    courseSlug: 'frontend',
    lessonId: 'm1-l5',
    title: 'Лендинг кофейни «Зерно и пар»',
    submitted: '19 сентября',
    status: 'rework',
    reviewer: 'Артём Лебедев-Райский',
    comment: 'Отличная сетка! Поправь контраст кнопок и добавь alt у декоративных элементов.',
    score: 72,
  },
  {
    id: 'hw3',
    courseSlug: 'python-start',
    lessonId: 'm2-l3',
    title: 'Игра «Угадай число»',
    submitted: '12 сентября',
    status: 'accepted',
    reviewer: 'Мария Орлова',
    comment: 'Чисто и понятно. Особенно понравилась обработка некорректного ввода.',
    score: 96,
  },
  {
    id: 'hw4',
    courseSlug: 'data-analyst',
    lessonId: 'm4-l4',
    title: 'Финальный кейс: когорты маркетплейса',
    submitted: '5 сентября',
    status: 'accepted',
    reviewer: 'Дарина Соколова',
    comment: 'Сильные выводы и аккуратные графики. Готово к портфолио.',
    score: 100,
  },
  {
    id: 'hw5',
    courseSlug: 'python-start',
    lessonId: 'm1-l4',
    title: 'Калькулятор чаевых',
    submitted: '28 августа',
    status: 'accepted',
    reviewer: 'Мария Орлова',
    comment: 'Хорошо! В следующий раз вынеси логику в функцию.',
    score: 90,
  },
]

export const certificates: Certificate[] = [
  {
    id: 'c1',
    number: 'КС-2026-04817',
    title: 'Аналитик данных',
    issued: '8 сентября 2026',
    hours: 160,
    gradient: 'from-amber-300 via-orange-400 to-rose-400',
  },
  {
    id: 'c2',
    number: 'КС-2026-02291',
    title: 'Git и командная работа',
    issued: '14 июня 2026',
    hours: 24,
    gradient: 'from-violet-600 via-violet-500 to-fuchsia-400',
  },
]

export const schedule = [
  { day: 'Пн', date: '29 сен', title: 'Живой разбор: ООП в Python', time: '19:00', course: 'python-start' },
  { day: 'Ср', date: '1 окт', title: 'Q&A с наставником по JavaScript', time: '20:00', course: 'frontend' },
  { day: 'Пт', date: '3 окт', title: 'Карьерный вебинар: первое резюме', time: '18:30', course: 'frontend' },
]

export const stats = [
  { value: '14 800+', label: 'выпускников' },
  { value: '4,9', label: 'средняя оценка курсов' },
  { value: '87%', label: 'нашли работу за полгода' },
  { value: '24 ч', label: 'на проверку домашки' },
]

/* ---------- утилиты ---------- */

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('ru-RU').format(n).replace(/ /g, ' ') + ' ₽'

export const getCourse = (slug?: string) => courses.find((c) => c.slug === slug)
export const getTeacher = (id: string) => teachers.find((t) => t.id === id)!

export const allLessons = (course: Course) =>
  course.modules.flatMap((m, mi) => m.lessons.map((l) => ({ ...l, moduleIndex: mi, moduleTitle: m.title })))

export const lessonCount = (course: Course) => allLessons(course).length

export const plural = (n: number, forms: [string, string, string]) => {
  const n10 = n % 10
  const n100 = n % 100
  if (n10 === 1 && n100 !== 11) return forms[0]
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1]
  return forms[2]
}
