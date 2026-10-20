#!/usr/bin/env node
// Publish the prerendered site (.output/public) to the gh-pages branch that
// GitHub Pages serves for rihard-developer.ru. Run after `nuxt generate`.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = fileURLToPath(new URL('../.output/public', import.meta.url))
const REPO = 'git@github.com:RihardXXX/rihard-js-developer.git'
const BRANCH = 'gh-pages'
const GIT_DIR = join(DIR, '.git')

const git = (...args) => execFileSync('git', ['-C', DIR, ...args], { stdio: 'inherit' })

if (!existsSync(join(DIR, 'index.html'))) {
  console.error('✗ .output/public/index.html not found — run `npm run generate` first.')
  process.exit(1)
}

// Fresh throwaway repo inside the build output, force-pushed to gh-pages.
await rm(GIT_DIR, { recursive: true, force: true })
try {
  git('init', '-q')
  git('checkout', '-q', '-B', BRANCH)
  git('add', '-A')
  git(
    '-c', 'user.email=deploy@local',
    '-c', 'user.name=deploy',
    'commit', '-q', '-m', `deploy: ${new Date().toISOString().replace(/\.\d+Z$/, 'Z')}`,
  )
  git('push', '-f', REPO, BRANCH)
} finally {
  await rm(GIT_DIR, { recursive: true, force: true })
}

console.log(`✓ Deployed to ${BRANCH} → https://rihard-developer.ru`)
