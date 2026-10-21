import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { createPlaygroundRunner, formatValue } from '../app/utils/playground-runner.ts'

// Библиотеки песочницы берём из node_modules проекта, как их берёт CoursePlayground.client.vue
const require = createRequire(import.meta.url)
const R = require('ramda')
const sanctuary = require('sanctuary')
const S = sanctuary.create({ checkTypes: false, env: sanctuary.env })
const LIBS = [
  { alias: 'R', mod: R },
  { alias: 'S', mod: S },
]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Раннер, который запоминает всё, что отдал наружу: last — то, что сейчас видит читатель.
const start = () => {
  const outputs = []
  const runner = createPlaygroundRunner((text) => outputs.push(text))
  return {
    runner,
    run: (code, libs = LIBS) => runner.run(code, libs),
    outputs,
    last: () => outputs.at(-1),
  }
}

// ---------- синхронный вывод: как было до переноса ----------

test('каждый аргумент console.log — отдельная строка, объекты — JSON с отступом 2', () => {
  const p = start()
  p.run("console.log('a', {x: 1})")
  assert.equal(p.last(), 'a\n{\n  "x": 1\n}')
})

test('R и S доступны в коде', () => {
  const p = start()
  p.run('console.log(R.add(1, 2), S.add (1) (2))')
  assert.equal(p.last(), '3\n3')
})

test('синхронное исключение: вывод ровно Error: <message>', () => {
  const p = start()
  p.run("console.log('a'); throw new Error('boom')")
  assert.equal(p.last(), 'Error: boom')
})

test('пустой код: пустой вывод (шаблон покажет «—»)', () => {
  const p = start()
  p.run('')
  assert.equal(p.last(), '')
})

test('console.error и console.warn с префиксами', () => {
  const p = start()
  p.run("console.error('x'); console.warn('y', 1)")
  assert.equal(p.last(), 'ERROR: x\nWARN: y 1')
})

test('clear() отдаёт пустой вывод', () => {
  const p = start()
  p.run("console.log('a')")
  p.runner.clear()
  assert.equal(p.last(), '')
})

// ---------- асинхронный вывод (находка 24) ----------

test('вывод из .then и setTimeout не теряется', async () => {
  const p = start()
  p.run('Promise.resolve(1).then(console.log); setTimeout(() => console.log(2), 0)')
  await wait(30)
  assert.equal(p.last(), '1\n2')
})

test('исключение в колбэке setTimeout даёт строку Error: <message>', async () => {
  const p = start()
  p.run("console.log('a'); setTimeout(() => { throw new Error('boom') }, 0)")
  await wait(30)
  assert.equal(p.last(), 'a\nError: boom')
})

// ---------- устаревший вывод ----------
// Старый запуск пишет позже нового, иначе наивная починка (свой массив строк на запуск) прошла бы.

const noOld = (outputs) =>
  assert.ok(!outputs.some((text) => text.includes('old')), `в песочницу попал вывод прошлого запуска: ${JSON.stringify(outputs)}`)

test('таймер прошлого запуска не пишет в новый', async () => {
  const p = start()
  p.run("setTimeout(() => console.log('old'), 20)")
  p.run("console.log('new'); setTimeout(() => console.log('new async'), 0)")
  await wait(50)
  assert.equal(p.last(), 'new\nnew async')
  noOld(p.outputs)
})

test('цепочка микрозадач прошлого запуска не пишет в новый', async () => {
  const p = start()
  p.run("(async () => { for (let i = 0; i < 1000; i++) await null; console.log('old') })()")
  p.run("Promise.resolve().then(() => console.log('new'))")
  await wait(30)
  assert.equal(p.last(), 'new')
  noOld(p.outputs)
})

test('после clear() («Сброс», «Очистить») таймер прошлого запуска не пишет', async () => {
  const p = start()
  p.run("setTimeout(() => console.log('tick'), 0); setTimeout(() => console.log('old'), 20)")
  await wait(10)
  assert.equal(p.last(), 'tick')
  p.runner.clear()
  await wait(40)
  assert.equal(p.last(), '')
  noOld(p.outputs)
})

test('setInterval останавливается после clear()', async () => {
  const p = start()
  // probe виден коду как библиотека: по нему видно, что интервал действительно остановлен
  const probe = { hits: 0, id: undefined }
  try {
    p.run('probe.id = setInterval(() => { probe.hits++; console.log(probe.hits) }, 5)', [
      ...LIBS,
      { alias: 'probe', mod: probe },
    ])
    await wait(30)
    assert.ok(probe.hits > 0, 'интервал не сработал')
    assert.notEqual(p.last(), '', 'вывод интервала не дошёл до песочницы')
    p.runner.clear()
    const hits = probe.hits
    const emitted = p.outputs.length
    await wait(30)
    assert.equal(probe.hits, hits, 'интервал продолжает работать после clear()')
    assert.equal(p.outputs.length, emitted, 'интервал пишет после clear()')
  } finally {
    clearInterval(probe.id)
  }
})

test('таймер, заведённый из .then прошлого запуска после clear(), не запускается', async () => {
  const p = start()
  const probe = { hits: 0, id: undefined }
  try {
    p.run('Promise.resolve().then(() => { probe.id = setInterval(() => probe.hits++, 5) })', [
      ...LIBS,
      { alias: 'probe', mod: probe },
    ])
    p.runner.clear()
    await wait(30)
    assert.equal(probe.hits, 0, 'интервал из закрытого запуска работает после clear()')
  } finally {
    clearInterval(probe.id)
  }
})

// ---------- производительность вывода ----------

test('синхронный вывод отдаётся наружу один раз, а не на каждую строку', () => {
  const p = start()
  p.run('for (let i = 0; i < 1000; i++) console.log(i)')
  assert.equal(p.outputs.length, 1, `onOutput вызван ${p.outputs.length} раз`)
  assert.equal(p.last().split('\n').length, 1000)
})

test('асинхронные строки одной микрозадачи сводятся в один вывод', async () => {
  const p = start()
  p.run("setTimeout(() => { for (let i = 0; i < 100; i++) console.log(i) }, 0)")
  await wait(30)
  assert.equal(p.outputs.length, 2, `ожидали синхронный вывод и один асинхронный, было ${p.outputs.length}`)
  assert.equal(p.last().split('\n').length, 100)
})

// ---------- форматирование значений (находка 25) ----------

test('NaN и Infinity печатаются как есть, а не null', () => {
  const p = start()
  p.run('console.log(0 / 0, [NaN, -Infinity])')
  assert.equal(p.last(), 'NaN\n[\n  "NaN",\n  "-Infinity"\n]')
})

test('console.log(функция) даёт непустую строку', () => {
  const p = start()
  p.run('console.log(R.add(1))')
  assert.ok(p.last().length > 0, 'функция напечатана пустой строкой')
})

test('Maybe из Sanctuary печатается как Just (1) и Nothing', () => {
  const p = start()
  p.run('console.log(S.Just(1), S.Nothing)')
  assert.equal(p.last(), 'Just (1)\nNothing')
})

test('undefined печатается как undefined', () => {
  const p = start()
  p.run('console.log(undefined)')
  assert.equal(p.last(), 'undefined')
})

test('formatValue: имя функции или (anonymous)', () => {
  assert.equal(formatValue(function inc() {}), '[Function: inc]')
  assert.equal(formatValue(() => {}), '[Function (anonymous)]')
})

test('formatValue: функции и значения Sanctuary внутри объекта', () => {
  assert.equal(
    formatValue({ m: S.Just(1), f: function inc() {} }),
    '{\n  "m": "Just (1)",\n  "f": "[Function: inc]"\n}',
  )
})
