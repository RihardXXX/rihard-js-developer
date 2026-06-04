<script setup lang="ts">
import loader from '@monaco-editor/loader'
import * as R from 'ramda'
import { create, env } from 'sanctuary'

// Minimal structural types (monaco-editor itself is loaded at runtime via CDN).
interface MonacoEditorInstance {
  getValue(): string
  setValue(value: string): void
  onDidChangeModelContent(cb: () => void): void
  dispose(): void
}
interface MonacoEditorApi {
  create(el: HTMLElement, options: Record<string, unknown>): MonacoEditorInstance
  setTheme(name: string): void
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

// checkTypes off in the browser: Sanctuary's type-checker pulls Node's `util`,
// and we want fast, dependency-light evaluation.
const S = create({ checkTypes: false, env })

const { t } = useI18n()
const { theme } = useTheme()

const libs = ref<Lib[]>([
  { alias: 'R', pkg: 'ramda', mod: R, docs: docsUrl('ramda') },
  { alias: 'S', pkg: 'sanctuary', mod: S, docs: docsUrl('sanctuary') },
])

const quickAdd: { alias: string; pkg: string }[] = [
  { alias: '_', pkg: 'lodash' },
  { alias: 'dfns', pkg: 'date-fns' },
  { alias: 'rx', pkg: 'rxjs' },
  { alias: 'z', pkg: 'zod' },
]

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
    const mod = (await import(/* @vite-ignore */ `https://esm.sh/${pkg}`)) as Record<
      string,
      unknown
    >
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

const editorEl = ref<HTMLElement | null>(null)
const output = ref('')
const code = ref(INITIAL_CODE)

let editorInstance: MonacoEditorInstance | null = null
let monacoEditorApi: MonacoEditorApi | null = null

const monacoTheme = () => (theme.value === 'dark' ? 'vs-dark' : 'vs-light')

onMounted(() => {
  loader.init().then((monaco) => {
    monacoEditorApi = monaco.editor as unknown as MonacoEditorApi
    if (!editorEl.value) return
    editorInstance = monacoEditorApi.create(editorEl.value, {
      value: INITIAL_CODE,
      language: 'javascript',
      theme: monacoTheme(),
      fontSize: 15,
      minimap: { enabled: false },
      automaticLayout: true,
      scrollBeyondLastLine: false,
      padding: { top: 14, bottom: 14 },
      tabSize: 2,
    })
    editorInstance.onDidChangeModelContent(() => {
      code.value = editorInstance?.getValue() ?? ''
    })
  })
})

watch(theme, () => monacoEditorApi?.setTheme(monacoTheme()))

onBeforeUnmount(() => {
  editorInstance?.dispose()
  editorInstance = null
})

const normalize = (item: unknown): string => {
  if (typeof item === 'string') return item
  try {
    return JSON.stringify(item, null, 2)
  } catch {
    return String(item)
  }
}

const run = () => {
  const logs: unknown[] = []
  const sandboxConsole = {
    log: (...a: unknown[]) => logs.push(...a),
    error: (...a: unknown[]) => logs.push('ERROR: ' + a.join(' ')),
    warn: (...a: unknown[]) => logs.push('WARN: ' + a.join(' ')),
  }
  try {
    const aliases = libs.value.map((l) => l.alias)
    const mods = libs.value.map((l) => l.mod)
    // Runs the user's own code in the page context with the chosen libs injected.
    // eslint-disable-next-line no-new-func
    new Function('console', ...aliases, code.value)(sandboxConsole, ...mods)
    output.value = logs.map(normalize).join('\n')
  } catch (e) {
    output.value = 'Error: ' + (e instanceof Error ? e.message : String(e))
  }
}

const reset = () => {
  editorInstance?.setValue(INITIAL_CODE)
  output.value = ''
}
const clearAll = () => {
  editorInstance?.setValue('')
  output.value = ''
}
</script>

<template>
  <div class="playground">
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

    <div ref="editorEl" class="playground__editor" />

    <div class="playground__output">
      <span class="playground__output-label">{{ t('course.output') }}</span>
      <pre class="playground__pre">{{ output || '—' }}</pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.playground {
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
    height: clamp(28rem, 42vh, 52rem);
    width: 100%;
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
