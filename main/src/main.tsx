import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerMicroApps, start } from 'qiankun'
import './index.css'
import App from './App.tsx'

const app1Entry = import.meta.env.DEV
  ? 'http://localhost:7101'
  : import.meta.env.VITE_MICRO_APP_1_ENTRY || '/micro-app-1/'
const app2Entry = import.meta.env.DEV
  ? 'http://localhost:7102'
  : import.meta.env.VITE_MICRO_APP_2_ENTRY || '/micro-app-2/'

registerMicroApps([
  {
    name: 'micro-app-1',
    entry: app1Entry,
    container: '#subapp-container',
    activeRule: '/app1',
    props: {
      basename: '/app1',
    },
  },
  {
    name: 'micro-app-2',
    entry: app2Entry,
    container: '#subapp-container',
    activeRule: '/app2',
    props: {
      basename: '/app2',
    },
  },
])

start({
  prefetch: false,
  sandbox: {
    strictStyleIsolation: false,
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
