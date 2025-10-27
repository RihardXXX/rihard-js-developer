<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import loader from '@monaco-editor/loader';

const INITIAL_CODE = '// начините писать код'

const code = ref(INITIAL_CODE);

const output = ref('');
const editor = ref(null)

const editorInstance = ref(null); // сюда сохраним экземпляр редактора

// Загружаем Monaco Editor только на клиенте
onMounted(() => {
  loader.init()
    .then(monaco => {
        editorInstance.value = monaco.editor.create(editor.value, {
          value: code.value,
          language: 'javascript',
          theme: 'vs-dark',
          fontSize: 18,
          minimap: { enabled: false },
          // automaticLayout: true,
          // lineNumbers: 'off',       // ❌ убирает номера строк
          glyphMargin: false,       // ❌ убирает margin слева
          // folding: false,           // ❌ убирает стрелки сворачивания
          lineDecorationsWidth: 0,  // ❌ убирает любые отступы
        });

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
    log: (...args) => logs.push(args.join(' ')),
    error: (...args) => logs.push('ERROR: ' + args.join(' ')),
    warn: (...args) => logs.push('WARN: ' + args.join(' ')),
  };

  try {
    // создаем функцию конструктор
    // в качестве первого аргумента выступает console
    // его мы подменяем на наш кастомный объект
    // которые будет результаты собирать
    // eslint-disable-next-line no-new-func
    new Function('console', code.value)(customConsole);

    console.log(112, logs)
    output.value = logs.join('\n').trim();
  } catch (e) {
    output.value = 'Error: ' + e.message;
  }
};

// clearInput :: * -> *
const clearInput = () => {
  code.value = INITIAL_CODE
  editorInstance.value.setValue(INITIAL_CODE)
}

// clearOutput :: * -> *
const clearOutput = () => {
  output.value = ''
}

const changeContent = (code) => {
  console.log(112, code)
}

</script>

<template>

<div :class="$style.modalMain">
  <h6>
    Интерпретатор
  </h6>

    <div :class="$style.wrapperBtn">
      <button :class="$style.btnStart" @click="clearInput">clear input</button>
    </div>
    <hr>
    <!-- <textarea v-model="code" :class="$style.input"></textarea> -->
    <div ref="editor" :class="$style.input" @change="changeContent"></div>
    <hr>
    <div :class="$style.wrapperBtn">
      <button :class="$style.btnStart" @click="runCode">Run</button>
      <button :class="$style.btnStart" @click="clearOutput">clear output</button>
    </div>
    <pre :class="$style.output">
        {{ output }}
    </pre>
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
  overflow: hidden;
  padding: 10px;
  width: 100%;
  height: 50vh;
  /* height: auto; */
  border: 1px solid var(--text-color);
  font-size: 18px;
}

.output {
  padding: 10px;
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


