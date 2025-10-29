<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import loader from '@monaco-editor/loader';
import { R } from '~/utils/course/ramda-config';
import { S } from '~/utils/course/sanctuary-config';

const props = defineProps(['device'])

const INITIAL_CODE = `// === Подключена библиотека Ramda JS и Sanctuary JS ===
// обращаться R.add(1, 2) или S.add (1) (2)
// начните писать код
// console.log(S.add (1) (2)) // 3
`
const code = ref(INITIAL_CODE);
const output = ref('');
const editor = ref(null)
const editorInstance = ref(null); // сюда сохраним экземпляр редактора
const isDarkTheme = ref(true);
const monacoRef = ref(null)

// настройка ide для мобилки и десктопа
const ideConfigBase = {
  value: code.value,
  language: 'javascript',
  fontSize: 18,
  minimap: { enabled: false },
  automaticLayout: true,
  glyphMargin: false,       // ❌ убирает margin слева
  lineDecorationsWidth: 0,  // ❌ убирает любые отступы
}

const mobileConfig = {
  lineNumbersMinChars: 1,
  fontSize: 16,
};

const initialThemeIde = () => {
  const currentTheme = localStorage.getItem('theme');

  if (!currentTheme) {
    return;
  }

  if (['dark-theme'].includes(currentTheme)) {
    isDarkTheme.value = true
  } else {
    isDarkTheme.value = false
  }
}

// Загружаем Monaco Editor только на клиенте
onMounted(() => {
  // инициализация сохраненный темы
  initialThemeIde()

  const editorConfig = {
    ...ideConfigBase,
    ...(props.device.mobile ? mobileConfig : {}),
    theme: isDarkTheme.value ? 'vs-dark' : 'vs-light',
  }

  loader.init()
    .then(monaco => {        // чтобы тему менять
        monacoRef.value = monaco.editor
        // после инициализации ide устаналиваем в него конфиг
        editorInstance.value = monaco.editor.create(editor.value, editorConfig);

        editorInstance.value.onDidChangeModelContent(() => {
          code.value = editorInstance.value.getValue();
        });
      });
});

onBeforeUnmount(() => {
  // корректно уничтожаем редактор при размонтировании компонента
  if (editorInstance.value) {
    // console.log(editorInstance.value)
    // editorInstance.value.dispose();
    editorInstance.value = null
  }
});

// toNormalizeOutput :: * -> *
const toNormalizeOutput = (item) => {
  if (typeof item === 'string') {
    return item;
  }

  try {
    return JSON.stringify(item, null, 2);
  } catch {
    return String(item);
  }
}

// runCode :: * -> *
const runCode = () => {
  // сбрасываем строку результатов
  output.value = '';
  // массив логов результатов
  const logs = [];

  // кастомные объект функций
  // который будет результаты из замыканий функции
  // собирать в массив логов
  const customConsole = {
    // то есть внутри функций подменяем
    // console.log
    log: (...args) => logs.push(...args),
    error: (...args) => logs.push('ERROR: ' + args.join(' ')),
    warn: (...args) => logs.push('WARN: ' + args.join(' ')),
  };



  try {
    // создаем функцию конструктор
    // в качестве первого аргумента выступает console
    // его мы подменяем на наш кастомный объект
    // которые будет результаты собирать
    // eslint-disable-next-line no-new-func
    new Function(
      'console', // аргумент функции
      'R', // аргумент функции
      'S', // аргумент функции
      code.value // тело функции
    )(
      customConsole, // запуск функции с 3 аргументами
      R,
      S,
    );

    // Форматируем каждый элемент вывода
    const formattedLogs = logs.map(toNormalizeOutput);

    // Объединяем вывод строкой, без []
    output.value = formattedLogs.join('\n');
  } catch (e) {
    output.value = 'Error: ' + e.message;
  }
};

// resetInput :: * -> *
const resetInput = () => {
  code.value = INITIAL_CODE
  editorInstance.value.setValue(INITIAL_CODE)
}

// clearInput :: * -> *
const clearInput = () => {
  code.value = ''
  editorInstance.value.setValue('')
}

// clearOutput :: * -> *
const clearOutput = () => {
  output.value = ''
}

// toggleTheme :: * -> *
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  monacoRef.value?.setTheme(isDarkTheme.value ? 'vs-dark' : 'vs-light');
};

</script>

<template>

<div :class="$style.modalMain">
  <h6>
    Интерпретатор
  </h6>

    <div :class="$style.wrapperBtn">
      <button :class="$style.btnStart" @click="clearInput">clear input</button>
      <button :class="$style.btnStart" @click="resetInput">reset input</button>
        <button :class="$style.btnStart" @click="toggleTheme">
          {{ isDarkTheme ? '🌙 Dark' : '☀️ Light' }}
        </button>
    </div>
    <hr>
    <!-- <textarea v-model="code" :class="$style.input"></textarea> -->
    <div ref="editor" :class="$style.input"></div>
    <hr>
    <div :class="$style.wrapperBtn">
      <button :class="$style.btnStart" @click="runCode">Run</button>
      <button :class="$style.btnStart" @click="clearOutput">clear output</button>
    </div>
    <pre :class="$style.output">{{ output }}</pre>
</div>

</template>

<style lang="scss" module>

.modalMain {
  width: 100%;
  height: calc(100vh - 62px);
  position: fixed;
  top: 62px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1111;
  background-color: var(--background-color);
  border: 2px solid var(--text-color);
  border-radius: 6px 6px 0 0;
  padding: 10px;
  color: var(--text-color);
  overflow: auto;
}

.wrapperBtn {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.btnStart {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid var(--text-color);
  border-radius: 5px;
}

.input {
  /* overflow: hidden; */
  /* padding: 10px; */
  width: 100%;
  height: 50vh;
  /* height: auto; */
  border: 1px solid var(--text-color);
  font-size: 18px;
}

.output {
  padding: 10px;
  min-height: 40px;
  width: 100%;
  max-height: 10vh;
  border: 1px solid var(--text-color);
  /* text-align: center; */
  font-size: 20px;
  overflow: auto;
}

h6 {
  text-align: center;
  margin: 10px;
}

</style>


