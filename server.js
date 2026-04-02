const express = require('express')
const path = require('path')

const app = express()
const port = Number(process.env.PORT || 8080)

const rootDir = __dirname
const mainDist = path.join(rootDir, 'main', 'dist')
const app1Dist = path.join(rootDir, 'micro-app-1', 'dist')
const app2Dist = path.join(rootDir, 'micro-app-2', 'dist')

app.use('/micro-app-1', express.static(app1Dist))
app.use('/micro-app-2', express.static(app2Dist))
app.use(express.static(mainDist))

app.get(/^\/micro-app-1(?:\/.*)?$/, (_, res) => {
  res.sendFile(path.join(app1Dist, 'index.html'))
})

app.get(/^\/micro-app-2(?:\/.*)?$/, (_, res) => {
  res.sendFile(path.join(app2Dist, 'index.html'))
})

app.use((_, res) => {
  res.sendFile(path.join(mainDist, 'index.html'))
})

app.listen(port, () => {
  console.log(`Local static server started: http://localhost:${port}`)
})
