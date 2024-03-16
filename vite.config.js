import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/dapi': {
        target: 'https://www.swiggy.com',
        changeOrigin: true,
        pathRewrite: { '^/dapi': '/dapi' },
      },
    },
  }
})
