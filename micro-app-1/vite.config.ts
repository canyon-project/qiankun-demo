import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'
import istanbulPlugin from 'vite-plugin-istanbul'
import canyonVitePlugin from '@canyonjs/vite-plugin'
import path from 'node:path'

const isProduction = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  base: isProduction ? '/micro-app-1/' : '/',
  plugins: [
    react(),
    qiankun('micro-app-1', { useDevMode: true }),
    ...(isProduction
      ? [
          istanbulPlugin({
            forceBuildInstrument: true,
          }),
          canyonVitePlugin({
            ci: true,
            instrumentCwd: path.resolve('..')
          }),
        ]
      : []),
  ],
  server: {
    port: 7101,
    cors: true,
    origin: 'http://localhost:7101',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
