import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import istanbulPlugin from 'vite-plugin-istanbul'
import canyonVitePlugin from '@canyonjs/vite-plugin'

const isProduction = process.env.NODE_ENV === 'production'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
    port: 7099,
  },
})
