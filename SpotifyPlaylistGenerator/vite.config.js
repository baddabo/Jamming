import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true // This makes it listen on all interfaces including http://http://127.0.0.1:5173/
  }
})
