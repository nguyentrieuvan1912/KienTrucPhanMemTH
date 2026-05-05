import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Hoặc điền chính xác '172.16.32.163'
    port: 8085,
    strictPort: true,
  }
})