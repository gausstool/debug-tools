<template>
  <div class="page-editor-diff" id="editor-diff">
    <div ref="editor1Container" class="container"></div>
    <div ref="editor2Container" class="container"></div>
  </div>
</template>

<script setup lang="ts">
import localforage from 'localforage';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { EditorView } from '@codemirror/view';
import { addCommandSave, createEditorInstance, createEditorState } from '@/domain/editor/codemirror-editor';
import { EditorManager } from '@/domain/editor/codemirror-editor-manager';

const code1Default = `// 粘贴需要进行比对的代码
void main() {
  printf("hello, world");
}
`;

const code2Default = `// 粘贴需要进行比对的代码
function main() { 
  console.log("Hello World!"); 
}
`;

// 使用ref来存储编辑器实例
const editor1Container = ref<HTMLDivElement>();
const editor2Container = ref<HTMLDivElement>();
let editor1: EditorView | null = null;
let editor2: EditorView | null = null;
let currentLanguage1 = 'javascript';
let currentLanguage2 = 'javascript';

const route = useRoute();

async function save() {
  const code1 = editor1 ? editor1.state.doc.toString() : '';
  const code2 = editor2 ? editor2.state.doc.toString() : '';
  await localforage.setItem(`debug-tools-${String(route.name)}`, { code1, code2 });
}

async function fetch() {
  const value: any = await localforage.getItem(`debug-tools-${String(route.name)}`);
  const { code1 = '', code2 = '' } = value || {};
  if (editor1) {
    const newState = await createEditorState(code1 || code1Default, currentLanguage1);
    editor1.setState(newState)
  }
  if (editor2) {
    const newState = await createEditorState(code2 || code2Default, currentLanguage2);
    editor2.setState(newState)
  }
}

onMounted(async () => {
  const state1 = await createEditorState('', currentLanguage1);
  const state2 = await createEditorState('', currentLanguage2);
  if (!editor1Container.value || !editor2Container.value) return;
  editor1 = createEditorInstance(editor1Container.value, state1);
  editor2 = createEditorInstance(editor2Container.value, state2);
  EditorManager.addEditor(editor1);
  EditorManager.addEditor(editor2);
  await fetch();
  addCommandSave(editor1, async () => {
    save();
  });
});

onUnmounted(() => {
  EditorManager.dispose();
});
</script>
