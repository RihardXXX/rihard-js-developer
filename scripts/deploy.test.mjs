import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { chmod, copyFile, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

const FAKE_NUXT = `#!/usr/bin/env node
import { appendFileSync } from 'node:fs'
appendFileSync(process.env.DEPLOY_TEST_LOG, \`nuxt \${process.argv.slice(2).join(' ')}\\n\`)
process.exit(Number(process.env.FAKE_NUXT_EXIT ?? 0))
`
const FAKE_DEPLOY = `import { appendFileSync } from 'node:fs'
appendFileSync(process.env.DEPLOY_TEST_LOG, 'deploy\\n')
`

const execFileP = (file, args, options) =>
  new Promise((resolve) => {
    execFile(file, args, options, (error, stdout, stderr) => {
      resolve({ code: error ? error.code : 0, out: `${stdout}${stderr}` })
    })
  })

// Временный проект: настоящий package.json, фиктивные nuxt и deploy.mjs.
// Настоящие generate, deploy.mjs и git push не запускаются.
const withProject = async (fn) => {
  const dir = await mkdtemp(join(tmpdir(), 'deploy-'))
  try {
    const bin = join(dir, 'node_modules', '.bin')
    await mkdir(bin, { recursive: true })
    await mkdir(join(dir, 'scripts'))
    await copyFile(join(root, 'package.json'), join(dir, 'package.json'))
    const nuxt = join(dir, 'fake-nuxt.mjs')
    await writeFile(nuxt, FAKE_NUXT)
    await chmod(nuxt, 0o755)
    await symlink(nuxt, join(bin, 'nuxt'))
    await symlink(join(root, 'node_modules', 'npm-run-all', 'bin', 'npm-run-all', 'index.js'), join(bin, 'npm-run-all'))
    await writeFile(join(dir, 'scripts', 'deploy.mjs'), FAKE_DEPLOY)
    const log = join(dir, 'calls.log')
    await fn(dir, log)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

const runScript = (dir, log, name, extraEnv = {}) =>
  execFileP('npm', ['run', name], {
    cwd: dir,
    env: {
      ...process.env,
      DEPLOY_TEST_LOG: log,
      npm_config_ignore_scripts: 'false',
      npm_config_loglevel: 'notice',
      npm_config_update_notifier: 'false',
      ...extraEnv,
    },
  })

const readLog = async (log) => {
  try {
    return (await readFile(log, 'utf8')).split('\n').filter(Boolean)
  } catch {
    return []
  }
}

test('deploy.mjs исполняемый и с шебангом', async () => {
  const { out } = await execFileP('git', ['ls-files', '-s', 'scripts/deploy.mjs'], { cwd: root })
  assert.ok(out.startsWith('100755 '), `deploy.mjs должен храниться в git с режимом 100755, сейчас: ${out.trim()}`)
  const first = (await readFile(join(root, 'scripts', 'deploy.mjs'), 'utf8')).split('\n')[0]
  assert.equal(first, '#!/usr/bin/env node', 'первая строка deploy.mjs должна быть шебангом node')
})

test('npm run deploy:app: generate один раз, затем deploy', () =>
  withProject(async (dir, log) => {
    const { code, out } = await runScript(dir, log, 'deploy:app')
    assert.equal(code, 0, `deploy:app должен завершаться кодом 0, вывод: ${out}`)
    assert.deepEqual(await readLog(log), ['nuxt generate', 'deploy'], 'при деплое сайт должен собираться один раз, затем идёт deploy')
    const banners = out.match(/^> nuxt generate$/gm) ?? []
    assert.equal(banners.length, 1, `в логе деплоя строка "> nuxt generate" должна быть одна, вывод: ${out}`)
  }))

test('npm run deploy как раньше: generate, затем deploy', () =>
  withProject(async (dir, log) => {
    const { code, out } = await runScript(dir, log, 'deploy')
    assert.equal(code, 0, `npm run deploy должен завершаться кодом 0, вывод: ${out}`)
    assert.deepEqual(await readLog(log), ['nuxt generate', 'deploy'], 'ручной деплой должен собирать сайт один раз и выкладывать')
  }))

test('упавший generate останавливает deploy:app', () =>
  withProject(async (dir, log) => {
    const { code, out } = await runScript(dir, log, 'deploy:app', { FAKE_NUXT_EXIT: '1' })
    assert.notEqual(code, 0, `при ошибке generate деплой должен завершаться ненулевым кодом, вывод: ${out}`)
    assert.deepEqual(await readLog(log), ['nuxt generate'], 'после упавшего generate deploy.mjs запускаться не должен')
  }))
