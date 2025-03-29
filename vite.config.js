// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/maiWordle/',  // ⚠️ 注意加斜杠
  plugins: [vue()]
})