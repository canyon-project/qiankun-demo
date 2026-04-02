#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const targetDir = path.join(root, '.canyon_output')

async function pathExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function moveFileSafe(src, desiredDest) {
  let dest = desiredDest
  const ext = path.extname(desiredDest)
  const base = path.basename(desiredDest, ext)
  const dir = path.dirname(desiredDest)

  let i = 1
  while (await pathExists(dest)) {
    dest = path.join(dir, `${base}-${i}${ext}`)
    i += 1
  }

  await fs.rename(src, dest)
  console.log(`${path.relative(root, src)} -> ${path.relative(root, dest)}`)
}

async function collectFromCanyonOutput(canyonOutputDir) {
  const entries = await fs.readdir(canyonOutputDir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue
    const src = path.join(canyonOutputDir, entry.name)
    const dest = path.join(targetDir, entry.name)
    await moveFileSafe(src, dest)
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const fullPath = path.join(dir, entry.name)
    if (entry.name === '.git' || entry.name === 'node_modules') continue

    // Skip root/.canyon_output itself to avoid re-processing destination files.
    if (entry.name === '.canyon_output' && dir === root) continue

    if (entry.name === '.canyon_output') {
      await collectFromCanyonOutput(fullPath)
      continue
    }

    await walk(fullPath)
  }
}

async function main() {
  await fs.mkdir(targetDir, { recursive: true })
  await walk(root)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
