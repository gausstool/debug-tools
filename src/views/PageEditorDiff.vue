<template>
  <div class="page-editor-diff" id="editor-diff">
    <div ref="diffEditorContainer" class="container"></div>
  </div>
</template>

<script setup lang="ts">
import localforage from 'localforage';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { addCommandSaveDiff, createDiffEditorInstance, createDiffEditorState } from '@/domain/editor/codemirror-editor-diff';
import { EditorManager } from '@/domain/editor/codemirror-editor-manager';
import { MergeView } from '@codemirror/merge';

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

const diffEditorContainer = ref<HTMLDivElement>();
let diffEditor: MergeView | null = null;
let currentLanguage = 'javascript';

const route = useRoute();

async function save() {
  const code1 = diffEditor ? diffEditor.a.state.doc.toString() : '';
  const code2 = diffEditor ? diffEditor.b.state.doc.toString() : '';
  await localforage.setItem(`debug-tools-${String(route.name)}`, { code1, code2 });
}

async function fetch() {
  const value: any = await localforage.getItem(`debug-tools-${String(route.name)}`);
  const { code1 = '', code2 = '' } = value || {};
  if (diffEditor) {
    const transactionA = diffEditor.a.state.update({
      changes: {
        from: 0,
        to: diffEditor.a.state.doc.length,
        insert: code1 || code1Default
      }
    });
    diffEditor.a.dispatch(transactionA);
    
    const transactionB = diffEditor.b.state.update({
      changes: {
        from: 0,
        to: diffEditor.b.state.doc.length,
        insert: code2 || code2Default
      }
    });
    diffEditor.b.dispatch(transactionB);
  }
}

onMounted(async () => {
  const states = await createDiffEditorState('', '', currentLanguage);
  if (!diffEditorContainer.value) return;
  diffEditor = createDiffEditorInstance(diffEditorContainer.value, states.original, states.modified);
  EditorManager.addEditor(diffEditor);
  await fetch();
  addCommandSaveDiff(diffEditor, async () => {
    save();
  });
});

onUnmounted(() => {
  EditorManager.dispose();
});
</script>
