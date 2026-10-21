import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  PROGRESS_KEY,
  emptyProgress,
  isOtherVersion,
  parseProgress,
  readCount,
  resumeFrom,
  withLast,
  withRead,
} from '../app/utils/course-progress.ts'

const AT = '2026-10-21T10:00:00.000Z'
const SLUGS = ['one', 'two', 'three', 'four']
const EMPTY = { v: 1, read: {} }

// Замороженный вход: функция, которая его меняет, падает с TypeError (модули ESM строгие).
const deepFreeze = (value) => {
  if (typeof value === 'object' && value !== null) Object.values(value).forEach(deepFreeze)
  return Object.freeze(value)
}
const progress = (read, last) => deepFreeze(last === undefined ? { v: 1, read } : { v: 1, read, last })
const readAll = (slugs) => Object.fromEntries(slugs.map((slug) => [slug, AT]))

test('ключ хранилища — course-progress', () => {
  assert.equal(PROGRESS_KEY, 'course-progress')
})

test('emptyProgress: версия 1 без отметок, каждый раз новый объект', () => {
  assert.deepEqual(emptyProgress(), EMPTY)
  assert.notEqual(emptyProgress(), emptyProgress())
  assert.notEqual(emptyProgress().read, emptyProgress().read)
})

for (const [name, raw] of [
  ['ключа нет', null],
  ['пустая строка', ''],
  ['не JSON', 'not json'],
  ['JSON null', 'null'],
  ['число', '42'],
  ['строка', '"course"'],
  ['массив', '[]'],
  ['без версии', '{"read":{}}'],
  ['другая версия', '{"v":2,"read":{"one":"2026-10-21T10:00:00.000Z"}}'],
  ['версия строкой', '{"v":"1","read":{}}'],
  ['без read', '{"v":1}'],
  ['read — null', '{"v":1,"read":null}'],
  ['read — массив', '{"v":1,"read":["one"]}'],
  ['read — строка', '{"v":1,"read":"one"}'],
]) {
  test(`parseProgress: ${name} — прогресса нет`, () => {
    assert.deepEqual(parseProgress(raw), EMPTY)
  })
}

test('parseProgress: корректное значение возвращается как есть', () => {
  const value = { v: 1, read: { one: AT, three: '2026-10-22T08:30:00.000Z' }, last: 'three' }
  assert.deepEqual(parseProgress(JSON.stringify(value)), value)
  assert.deepEqual(parseProgress(JSON.stringify(EMPTY)), EMPTY)
})

test('parseProgress: записи с датой не строкой отбрасываются, остальные остаются', () => {
  const raw = JSON.stringify({ v: 1, read: { one: AT, two: 1, three: null, four: {}, five: [AT], six: true }, last: 'one' })
  assert.deepEqual(parseProgress(raw), { v: 1, read: { one: AT }, last: 'one' })
})

test('parseProgress: last не строкой отбрасывается, отметки остаются', () => {
  for (const last of [5, null, {}, ['one'], true]) {
    assert.deepEqual(parseProgress(JSON.stringify({ v: 1, read: { one: AT }, last })), { v: 1, read: { one: AT } })
  }
})

test('parseProgress: лишние поля не переносятся', () => {
  assert.deepEqual(parseProgress(JSON.stringify({ v: 1, read: {}, extra: 'x' })), EMPTY)
})

test('parseProgress: slug "__proto__" не подменяет прототип', () => {
  const { read } = parseProgress(`{"v":1,"read":{"__proto__":"${AT}","one":"${AT}"}}`)
  assert.equal(Object.getPrototypeOf(read), Object.prototype)
  assert.equal(read.one, AT)
})

test('isOtherVersion: объект JSON с v не 1 — чужая версия, поверх неё не пишем', () => {
  for (const raw of ['{"v":2,"read":{"x":"2026-10-21T10:00:00.000Z"},"extra":1}', '{"v":"1","read":{}}', '{"v":0}', '{"v":null}']) {
    assert.equal(isOtherVersion(raw), true, raw)
  }
})

test('isOtherVersion: ключа нет, мусор и версия 1, даже битая, — писать можно', () => {
  for (const raw of [null, '', 'not json', 'null', '42', '"course"', '[]', '{"read":{}}', '{"v":1,"read":{}}', '{"v":1,"read":null}']) {
    assert.equal(isOtherVersion(raw), false, String(raw))
  }
})

test('withRead: ставит отметку с датой, вход не меняется', () => {
  const before = progress({ one: AT }, 'one')
  const after = withRead(before, 'two', '2026-10-22T00:00:00.000Z')
  assert.deepEqual(after, { v: 1, read: { one: AT, two: '2026-10-22T00:00:00.000Z' }, last: 'one' })
  assert.deepEqual(before, { v: 1, read: { one: AT }, last: 'one' })
  assert.notEqual(after, before)
})

test('withRead: null снимает отметку, остальное остаётся, вход не меняется', () => {
  const before = progress({ one: AT, two: AT }, 'two')
  const after = withRead(before, 'one', null)
  assert.deepEqual(after, { v: 1, read: { two: AT }, last: 'two' })
  assert.deepEqual(before, { v: 1, read: { one: AT, two: AT }, last: 'two' })
})

test('withRead: снять отметку с непрочитанного урока — значение то же', () => {
  assert.deepEqual(withRead(progress({ one: AT }), 'two', null), { v: 1, read: { one: AT } })
})

test('withLast: запоминает урок, отметки остаются, вход не меняется', () => {
  const before = progress({ one: AT }, 'one')
  const after = withLast(before, 'three')
  assert.deepEqual(after, { v: 1, read: { one: AT }, last: 'three' })
  assert.deepEqual(before, { v: 1, read: { one: AT }, last: 'one' })
  assert.notEqual(after, before)
})

test('readCount: считает только уроки курса', () => {
  assert.equal(readCount(progress({}), SLUGS), 0)
  assert.equal(readCount(progress({ one: AT, three: AT }), SLUGS), 2)
  assert.equal(readCount(progress({ one: AT, removed: AT, nope: AT }), SLUGS), 1)
})

test('readCount: незнакомые slug не поднимают счётчик выше числа уроков', () => {
  const read = { ...readAll(SLUGS), ...readAll(Array.from({ length: 40 }, (_, i) => `unknown-${i}`)) }
  assert.equal(readCount(progress(read), SLUGS), SLUGS.length)
})

test('readCount: slug из цепочки прототипов не считается', () => {
  assert.equal(readCount(progress({}), ['toString', 'constructor', 'hasOwnProperty']), 0)
})

test('resumeFrom: пусто — начать с первого урока', () => {
  assert.deepEqual(resumeFrom(progress({}), SLUGS), { kind: 'start', slug: 'one' })
})

test('resumeFrom: отметки только у незнакомых slug и незнакомый last — начать с первого урока', () => {
  assert.deepEqual(resumeFrom(progress({ removed: AT }, 'removed'), SLUGS), { kind: 'start', slug: 'one' })
})

test('resumeFrom: последний открытый урок не прочитан — продолжить его', () => {
  assert.deepEqual(resumeFrom(progress({}, 'three'), SLUGS), { kind: 'continue', slug: 'three' })
  assert.deepEqual(resumeFrom(progress({ one: AT, four: AT }, 'two'), SLUGS), { kind: 'continue', slug: 'two' })
})

test('resumeFrom: последний открытый урок прочитан — следующий непрочитанный после него', () => {
  assert.deepEqual(resumeFrom(progress({ one: AT, two: AT }, 'two'), SLUGS), { kind: 'continue', slug: 'three' })
  assert.deepEqual(resumeFrom(progress({ two: AT, three: AT }, 'two'), SLUGS), { kind: 'continue', slug: 'four' })
})

test('resumeFrom: после последнего открытого всё прочитано — первый непрочитанный с начала', () => {
  assert.deepEqual(resumeFrom(progress({ one: AT, three: AT, four: AT }, 'three'), SLUGS), { kind: 'continue', slug: 'two' })
})

test('resumeFrom: last нет или он незнакомый — первый непрочитанный', () => {
  assert.deepEqual(resumeFrom(progress({ one: AT, two: AT }), SLUGS), { kind: 'continue', slug: 'three' })
  assert.deepEqual(resumeFrom(progress({ one: AT, three: AT }, 'removed'), SLUGS), { kind: 'continue', slug: 'two' })
})

test('resumeFrom: всё прочитано — продолжать нечего', () => {
  assert.equal(resumeFrom(progress(readAll(SLUGS), 'four'), SLUGS), null)
  assert.equal(resumeFrom(progress(readAll(SLUGS)), SLUGS), null)
  assert.equal(resumeFrom(progress(readAll(SLUGS), 'two'), SLUGS), null)
})

test('resumeFrom: уроков нет — продолжать нечего', () => {
  assert.equal(resumeFrom(progress({}), []), null)
})
