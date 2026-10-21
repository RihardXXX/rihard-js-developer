<script setup lang="ts">
import { createPlaygroundRunner } from '~/utils/playground-runner'

// Minimal structural types (monaco-editor itself is loaded at runtime via CDN).
interface MonacoEditorInstance {
  getValue(): string
  setValue(value: string): void
  onDidChangeModelContent(cb: () => void): void
  getModel(): { getPositionAt(offset: number): unknown } | null
  setPosition(position: unknown): void
  focus(): void
  dispose(): void
}
interface MonacoEditorApi {
  create(el: HTMLElement, options: Record<string, unknown>): MonacoEditorInstance
  setTheme(name: string): void
}
// sanctuary ships without types
interface SanctuaryModule {
  create(options: { checkTypes: boolean; env: unknown }): unknown
  env: unknown
}

interface Lib {
  alias: string
  pkg: string
  mod: unknown
  docs: string
}

const DOCS: Record<string, string> = {
  ramda: 'https://ramdajs.com/docs/',
  sanctuary: 'https://sanctuary.js.org/',
  lodash: 'https://lodash.com/docs',
  'date-fns': 'https://date-fns.org/docs/Getting-Started',
  rxjs: 'https://rxjs.dev/guide/overview',
  zod: 'https://zod.dev/',
}
const docsUrl = (pkg: string): string =>
  DOCS[pkg] ?? `https://www.npmjs.com/package/${pkg}`

const { t } = useI18n()
const { theme } = useTheme()

// R and S arrive with the first run: ramda and sanctuary stay out of the page's JS.
const libs = ref<Lib[]>([
  { alias: 'R', pkg: 'ramda', mod: null, docs: docsUrl('ramda') },
  { alias: 'S', pkg: 'sanctuary', mod: null, docs: docsUrl('sanctuary') },
])

let baseLibs: Promise<void> | null = null
const loadBaseLibs = () =>
  (baseLibs ??= Promise.all([import('ramda'), import('sanctuary')]).then(
    ([R, sanctuary]) => {
      const { create, env } = (sanctuary as { default: SanctuaryModule }).default
      // checkTypes off in the browser: Sanctuary's type-checker pulls Node's `util`,
      // and we want fast, dependency-light evaluation.
      const mods: Record<string, unknown> = { ramda: R, sanctuary: create({ checkTypes: false, env }) }
      for (const lib of libs.value) if (lib.mod === null && lib.pkg in mods) lib.mod = mods[lib.pkg]
    },
    (e: unknown) => {
      baseLibs = null
      throw e
    },
  ))

const quickAdd: { alias: string; pkg: string }[] = [
  { alias: '_', pkg: 'lodash' },
  { alias: 'dfns', pkg: 'date-fns' },
  { alias: 'rx', pkg: 'rxjs' },
  { alias: 'z', pkg: 'zod' },
]

// esm.sh runs UMD packages (lodash, ...) as CommonJS. With Monaco's AMD loader on the
// page their UMD header finds `define.amd`, registers through define() and leaves
// module.exports, our default export, empty. define is hidden while an import runs.
let importing = 0
let amdDefine: unknown
const importFromEsmSh = async (pkg: string): Promise<Record<string, unknown>> => {
  const win = globalThis as { define?: unknown }
  // Monaco's loader declares `var define`: the global can't be deleted, only overwritten.
  if (importing++ === 0) {
    amdDefine = win.define
    if (amdDefine !== undefined) win.define = undefined
  }
  try {
    return (await import(/* @vite-ignore */ `https://esm.sh/${pkg}`)) as Record<string, unknown>
  } finally {
    if (--importing === 0 && amdDefine !== undefined) win.define = amdDefine
  }
}

const showAdd = ref(false)
const newAlias = ref('')
const newPkg = ref('')
const loadingLib = ref(false)
const libError = ref('')

const addLib = async (alias: string, pkg: string) => {
  alias = alias.trim()
  pkg = pkg.trim()
  if (!alias || !pkg) return
  if (libs.value.some((l) => l.alias === alias)) {
    libError.value = t('course.libExists', { alias })
    return
  }
  loadingLib.value = true
  libError.value = ''
  try {
    const mod = await importFromEsmSh(pkg)
    libs.value.push({ alias, pkg, mod: mod.default ?? mod, docs: docsUrl(pkg) })
    newAlias.value = ''
    newPkg.value = ''
    showAdd.value = false
  } catch {
    libError.value = t('course.libFailed', { pkg })
  } finally {
    loadingLib.value = false
  }
}

const removeLib = (alias: string) => {
  libs.value = libs.value.filter((l) => l.alias !== alias)
}

const INITIAL_CODE = `// Доступные библиотеки — в чипах выше. Добавляй свои кнопкой «+».
// Available libraries are shown above. Add your own with "+".
console.log(R.add(1, 2))            // 3
console.log(S.add (1) (2))          // 3

const inc = R.add(1)
console.log(R.map(inc, [1, 2, 3]))  // [2, 3, 4]
`

const rootEl = ref<HTMLElement | null>(null)
const monacoEl = ref<HTMLElement | null>(null)
const textareaEl = ref<HTMLTextAreaElement | null>(null)
const output = ref('')
// The editor's text: the textarea's model, then Monaco's once it is loaded.
const code = ref(INITIAL_CODE)
const monacoReady = ref(false)
// id of the lesson block the current code was opened from: "Back to the example"
const backId = ref<string | null>(null)
const runner = createPlaygroundRunner((text) => {
  output.value = text
})

let editorInstance: MonacoEditorInstance | null = null
let monacoEditorApi: MonacoEditorApi | null = null

const monacoTheme = () => (theme.value === 'dark' ? 'vs-dark' : 'vs-light')

// Until the first use (focus or click in the editor, Run, Open in playground) the editor
// is the server-rendered textarea; Monaco then takes its place with its text, caret and focus.
let monaco: Promise<void> | null = null
const loadMonaco = () =>
  (monaco ??= import('@monaco-editor/loader')
    .then(({ default: loader }) => loader.init())
    .then((m) => {
      monacoEditorApi = m.editor as unknown as MonacoEditorApi
      if (!monacoEl.value) return
      const area = textareaEl.value
      const focused = area !== null && document.activeElement === area
      const editor = monacoEditorApi.create(monacoEl.value, {
        value: code.value,
        language: 'javascript',
        theme: monacoTheme(),
        ariaLabel: t('course.editorLabel'),
        fontSize: 15,
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        padding: { top: 14, bottom: 14 },
        tabSize: 2,
      })
      editor.onDidChangeModelContent(() => {
        code.value = editor.getValue()
      })
      editorInstance = editor
      monacoReady.value = true
      if (area && focused) {
        const position = editor.getModel()?.getPositionAt(area.selectionStart)
        if (position) editor.setPosition(position)
        editor.focus()
      }
    })
    // CDN unreachable: the textarea stays the editor (the loader keeps its failure, no retry).
    .catch(() => {}))

// Touch screens keep the textarea: Monaco is heavy there and edits poorly with a finger.
const upgradeEditor = () => {
  if (window.matchMedia('(pointer: fine)').matches) loadMonaco()
}

watch(theme, () => monacoEditorApi?.setTheme(monacoTheme()))

onBeforeUnmount(() => {
  runner.clear()
  editorInstance?.dispose()
  editorInstance = null
})

// Bumped by Run, Reset, Clear and Open: a run still waiting for R and S is dropped
// once something newer has happened.
let runId = 0
const run = async () => {
  upgradeEditor()
  const id = ++runId
  try {
    await loadBaseLibs()
  } catch {
    if (id !== runId) return
    runner.clear()
    output.value = t('course.libFailed', { pkg: 'ramda, sanctuary' })
    return
  }
  if (id === runId) runner.run(code.value, libs.value)
}

const setCode = (value: string) => {
  code.value = value
  editorInstance?.setValue(value)
}

const focusEditor = () => {
  if (editorInstance) return editorInstance.focus()
  textareaEl.value?.setSelectionRange(0, 0)
  textareaEl.value?.focus({ preventScroll: true })
}

// "Open in playground" from a lesson block: the code goes into the editor, the page
// scrolls up here and the reader can type at once; a link leads back to the block.
const { request } = usePlaygroundBridge()
watch(request, async (opened) => {
  if (!opened) return
  runId++
  setCode(opened.code)
  backId.value = opened.fromId
  upgradeEditor()
  await nextTick()
  focusEditor()
  // Instant: Monaco arriving in the middle of a smooth scroll takes focus and stops it halfway.
  rootEl.value?.scrollIntoView({ block: 'start', behavior: 'instant' })
})

const reset = () => {
  runId++
  setCode(INITIAL_CODE)
  backId.value = null
  runner.clear()
}
const clearAll = () => {
  runId++
  setCode('')
  backId.value = null
  runner.clear()
}
</script>

<template>
  <div ref="rootEl" class="playground">
    <div class="libs">
      <span class="libs__label">{{ t('course.libraries') }}</span>
      <ul class="libs__list">
        <li v-for="lib in libs" :key="lib.alias" class="libchip">
          <code class="libchip__alias">{{ lib.alias }}</code>
          <a
            class="libchip__pkg"
            :href="lib.docs"
            target="_blank"
            rel="noopener noreferrer"
            :title="t('course.docs')"
          >{{ lib.pkg }} ↗</a>
          <button
            class="libchip__x"
            type="button"
            :aria-label="t('course.removeLib', { alias: lib.alias })"
            @click="removeLib(lib.alias)"
          >
            ×
          </button>
        </li>
      </ul>
      <button class="libs__add" type="button" @click="showAdd = !showAdd">
        + {{ t('course.addLib') }}
      </button>
    </div>

    <div v-if="showAdd" class="addform">
      <div class="addform__row">
        <input
          v-model="newAlias"
          class="addform__input addform__input--alias"
          :placeholder="t('course.alias')"
          spellcheck="false"
        />
        <input
          v-model="newPkg"
          class="addform__input"
          :placeholder="t('course.package')"
          spellcheck="false"
          @keyup.enter="addLib(newAlias, newPkg)"
        />
        <button
          class="addform__btn"
          type="button"
          :disabled="loadingLib"
          @click="addLib(newAlias, newPkg)"
        >
          {{ loadingLib ? t('course.loading') : t('course.add') }}
        </button>
      </div>
      <div class="addform__quick">
        <button
          v-for="q in quickAdd"
          :key="q.pkg"
          class="addform__chip"
          type="button"
          @click="addLib(q.alias, q.pkg)"
        >
          {{ q.alias }} · {{ q.pkg }}
        </button>
      </div>
      <p class="addform__hint">{{ t('course.cdnHint') }}</p>
      <p v-if="libError" class="addform__error">{{ libError }}</p>
    </div>

    <div class="playground__bar">
      <span class="playground__title">playground</span>
      <div class="playground__actions">
        <button class="playground__btn" type="button" @click="reset">{{ t('course.reset') }}</button>
        <button class="playground__btn" type="button" @click="clearAll">{{ t('course.clear') }}</button>
        <button class="playground__btn playground__btn--run" type="button" @click="run">
          ▶ {{ t('course.run') }}
        </button>
      </div>
    </div>

    <div class="playground__editor">
      <div ref="monacoEl" class="playground__monaco" />
      <textarea
        v-if="!monacoReady"
        ref="textareaEl"
        v-model="code"
        class="playground__textarea"
        :aria-label="t('course.editorLabel')"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        wrap="off"
        @focus="upgradeEditor"
      />
    </div>

    <a v-if="backId" class="playground__back" :href="`#${backId}`">← {{ t('course.backToExample') }}</a>

    <div class="playground__output">
      <span class="playground__output-label">{{ t('course.output') }}</span>
      <pre class="playground__pre">{{ output || '—' }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.playground {
  // "Open in playground" scrolls here: the top stays below the fixed header
  scroll-margin-top: $header-height;
  border: 1px solid var(--code-border);
  border-radius: 1.4rem;
  overflow: hidden;
  background-color: var(--code-bg);
  box-shadow: 0 30px 60px -45px rgba(0, 0, 0, 0.6);
}

.libs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem 1rem;
  padding: 1.2rem 1.4rem;
  border-bottom: 1px solid var(--code-border);
  background-color: var(--surface);

  &__label {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  &__add {
    padding: 0.5rem 1rem;
    border-radius: 0.7rem;
    border: 1px dashed var(--border);
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-muted);
    transition:
      color $transition,
      border-color $transition;

    &:hover {
      color: var(--accent);
      border-color: var(--accent);
    }
  }
}

.libchip {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.4rem 0.4rem 0.9rem;
  border-radius: 0.7rem;
  border: 1px solid var(--border);
  background-color: var(--bg);
  font-size: 1.3rem;

  &__alias {
    font-family: $mono-font;
    font-weight: 700;
    color: var(--accent);
  }

  &__pkg {
    color: var(--text-muted);
  }

  &__x {
    display: grid;
    place-items: center;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    font-size: 1.6rem;
    line-height: 1;
    color: var(--text-muted);
    transition:
      background-color $transition,
      color $transition;

    &:hover {
      background-color: color-mix(in srgb, $red 18%, transparent);
      color: $red;
    }
  }
}

.addform {
  padding: 1.4rem;
  border-bottom: 1px solid var(--code-border);
  background-color: var(--surface);

  &__row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  &__input {
    flex: 1 1 18rem;
    min-width: 0;
    padding: 0.9rem 1.2rem;
    border-radius: 0.8rem;
    border: 1px solid var(--border);
    background-color: var(--bg);
    color: var(--text-color);
    font-size: 1.4rem;
    font-family: $mono-font;

    &--alias {
      flex: 0 1 9rem;
    }

    &:focus-visible {
      outline: none;
      border-color: var(--accent);
    }
  }

  &__btn {
    padding: 0.9rem 1.6rem;
    border-radius: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: $white;
    background: linear-gradient(135deg, $green, $green-bright);

    &:disabled {
      opacity: 0.6;
      cursor: progress;
    }
  }

  &__quick {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1rem;
  }

  &__chip {
    padding: 0.4rem 0.9rem;
    border-radius: 0.6rem;
    border: 1px solid var(--border);
    font-size: 1.25rem;
    font-family: $mono-font;
    color: var(--text-muted);

    &:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
  }

  &__hint {
    margin-top: 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    color: var(--text-muted);
  }

  &__error {
    margin-top: 0.6rem;
    font-size: 1.3rem;
    color: $red;
  }
}

.playground {
  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;
    padding: 1rem 1.4rem;
    border-bottom: 1px solid var(--code-border);
    background-color: var(--surface);
  }

  &__title {
    font-family: $mono-font;
    font-size: 1.3rem;
    color: var(--text-muted);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  &__btn {
    padding: 0.7rem 1.2rem;
    border-radius: 0.8rem;
    border: 1px solid var(--border);
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-color);
    transition:
      background-color $transition,
      border-color $transition,
      color $transition;

    &:hover {
      border-color: var(--accent);
    }

    &--run {
      color: $white;
      border-color: transparent;
      background: linear-gradient(135deg, $green, $green-bright);
    }
  }

  &__editor {
    position: relative;
    height: clamp(28rem, 42vh, 52rem);
    width: 100%;
  }

  &__monaco {
    position: absolute;
    inset: 0;
  }

  // Same box as Monaco, so nothing moves when Monaco replaces it; drawn above
  // the Monaco container while that one is being created.
  &__textarea {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 1.4rem;
    border: 0;
    resize: none;
    overflow: auto;
    white-space: pre;
    tab-size: 2;
    font-family: $mono-font;
    font-size: 1.5rem;
    line-height: 1.5;
    color: var(--code-text);
    background-color: var(--code-bg);

    // .playground clips its overflow: keep the focus ring inside
    &:focus-visible {
      outline-offset: -2px;
    }
  }

  &__back {
    display: block;
    padding: 1rem 1.4rem;
    border-top: 1px solid var(--code-border);
    background-color: var(--surface);
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--accent);
  }

  &__output {
    border-top: 1px solid var(--code-border);
    padding: 1.2rem 1.4rem;
    background-color: var(--surface);
  }

  &__output-label {
    display: block;
    margin-bottom: 0.6rem;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
  }

  &__pre {
    margin: 0;
    max-height: 18vh;
    overflow: auto;
    font-family: $mono-font;
    font-size: 1.4rem;
    line-height: 1.5;
    color: var(--code-text);
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style>
