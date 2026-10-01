import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Cabinet from './pages/Cabinet'
import LessonPage from './pages/LessonPage'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses/:slug" element={<CoursePage />} />
          <Route path="checkout/:slug" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="cabinet/*" element={<Cabinet />} />
        <Route path="lesson/:slug/:lessonId" element={<LessonPage />} />
      </Routes>
    </>
  )
}
