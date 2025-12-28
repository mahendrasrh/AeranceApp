import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /\.(js|jsx)$/,
  },
})