import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base должен совпадать с именем репозитория для GitHub Pages
export default defineConfig({
  base: '/online-school/',
  plugins: [react(), tailwindcss()],
})
