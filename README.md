# Код Старт — демо онлайн-школы программирования

Демо-проект для портфолио: платформа вымышленной онлайн-школы «Код Старт».
Бэкенда нет — все данные фейковые (`src/data/mock.ts`), авторизация, оплата и прогресс
имитируются на фронте (React state + `localStorage`).

**Стек:** Vite · React · TypeScript · Tailwind CSS v4 · react-router-dom (HashRouter) · lucide-react.
Картинок по ссылкам нет: только CSS-градиенты, inline-SVG, иконки и эмодзи. Шрифты (Manrope, Unbounded) подключены локально через `@fontsource`.

## Запуск локально

Нужен Node.js 20+ (проверено на 22).

```bash
npm install        # установить зависимости
npm run dev        # dev-сервер: http://localhost:5173/online-school/
npm run build      # проверка типов + production-сборка в dist/
npm run preview    # предпросмотр сборки: http://localhost:4173/online-school/
```

## Деплой на GitHub Pages

Автодеплой настроен в `.github/workflows/deploy.yml`: при каждом пуше в `main` GitHub Actions
собирает проект и публикует `dist/` через `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`.

Один раз включите Pages в репозитории:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Запушьте изменения в `main` (или запустите workflow вручную во вкладке **Actions**).
3. Сайт будет доступен по адресу: https://ERMIN372.github.io/online-school/

> Если переименуете репозиторий, поменяйте `base` в `vite.config.ts` на `'/<новое-имя>/'`.

Роутинг сделан на `HashRouter` (адреса вида `/#/cabinet`): GitHub Pages не умеет серверный роутинг,
а с хешем обновление страницы на любом маршруте не даёт 404.

## Страницы

| Страница | Адрес |
|---|---|
| Главная | `#/` |
| Страница курса | `#/courses/python-start` (также `frontend`, `react-typescript`, `data-analyst`, `go-backend`, `algorithms`) |
| Оплата | `#/checkout/frontend` |
| Вход | `#/login` |
| Личный кабинет | `#/cabinet`, `#/cabinet/courses`, `#/cabinet/homework`, `#/cabinet/certificates` |
| Урок | `#/lesson/python-start/m4-l2` |

## Демо-сценарий

- **Вход:** на `#/login` демо-данные уже заполнены — нажмите «Войти». Кабинет без входа редиректит на логин.
- **Оплата:** на странице оформления есть кнопка «Заполнить тестовыми данными». После «Оплатить» — лоадер 2 секунды и экран успеха; курс появляется в кабинете. Реальные платежи не проводятся.
- **Уроки:** «Отметить пройденным» обновляет прогресс курса в кабинете. Первый урок каждого курса открыт бесплатно.
- **Сброс:** в кабинете внизу бокового меню есть «Сброс демо» — возвращает исходный прогресс.

## Структура

```
src/
  data/mock.ts          # все фейковые данные: курсы, преподаватели, отзывы, FAQ, тарифы, ДЗ
  lib/store.tsx         # имитация бэкенда: пользователь, покупки, прогресс (localStorage)
  lib/progress.ts       # расчёт прогресса и следующего урока
  components/           # Layout (шапка/футер), CourseCard, UI-примитивы
  pages/                # Home, CoursePage, Checkout, Login, Cabinet, LessonPage, NotFound
```

Все имена, компании и адреса вымышлены. Демо-проект.
