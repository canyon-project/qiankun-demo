import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'
import './index.css'
import App from './App.tsx'

type MountProps = {
  container?: Element
  basename?: string
}

let root: ReturnType<typeof createRoot> | null = null

function render(props: MountProps = {}) {
  const { container, basename = '/' } = props
  const appContainer = container
    ? (container.querySelector('#root') as HTMLElement)
    : document.getElementById('root')

  if (!appContainer) {
    return
  }

  root = createRoot(appContainer)
  root.render(
    <StrictMode>
      <App basename={basename} />
    </StrictMode>,
  )
}

renderWithQiankun({
  mount(props) {
    render(props as MountProps)
  },
  bootstrap() {},
  update() {},
  unmount() {
    root?.unmount()
    root = null
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
