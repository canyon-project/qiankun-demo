import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'

type AppProps = {
  basename: string
}

function App({ basename }: AppProps) {
  return (
    <BrowserRouter basename={basename}>
      <div className="app">
        <h2>子应用 1</h2>
        <p>这是一个独立 SPA，也可以被 qiankun 主应用挂载。</p>
        <nav className="menu">
          <Link to="/">首页</Link>
          <Link to="/about">关于</Link>
        </nav>
        <Routes>
          <Route path="/" element={<div className="panel">子应用 1 - 首页内容</div>} />
          <Route
            path="/about"
            element={<div className="panel">子应用 1 - About 页面（前端路由）</div>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
