import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'
import istanbulPlugin from 'vite-plugin-istanbul'
import canyonVitePlugin from '@canyonjs/vite-plugin'

const isProduction = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  base: isProduction ? '/micro-app-2/' : '/',
  plugins: [
    react(),
    qiankun('micro-app-2', { useDevMode: true }),
    ...(isProduction
      ? [
          istanbulPlugin({
            forceBuildInstrument: true,
          }),
          canyonVitePlugin(),
        ]
      : []),
  ],
  server: {
    port: 7102,
    cors: true,
    origin: 'http://localhost:7102',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
