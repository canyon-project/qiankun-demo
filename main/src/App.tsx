import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onPathChange = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPathChange)
    return () => window.removeEventListener('popstate', onPathChange)
  }, [])

  return (
    <main className="shell">
      <h1>Vite + qiankun 微前端 Demo</h1>
      <p className="desc">主应用端口：7099，子应用端口：7101、7102</p>

      <nav className="menu">
        <a href="/">主应用首页</a>
        <a href="/app1">打开子应用 1</a>
        <a href="/app2">打开子应用 2</a>
      </nav>

      <p className="current-path">当前路径：{pathname}</p>

      <section id="subapp-container" className="subapp-container">
        {pathname === '/' && <p>请点击上方导航进入任一子应用。</p>}
      </section>
    </main>
  )
}

export default App
