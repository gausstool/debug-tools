<template>
  <div class="page-editor-diff" id="editor-diff">
    <div ref="editor1Container" class="container"></div>
  </div>
</template>

<script setup lang="ts">
import localforage from 'localforage';
import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import {
  addCommandSave,
  createEditorDiff,
  createEditorModel,
} from '../domain/editor/editor';
import { EditorManager } from '@/domain/editor/editor-manager';

// 使用ref来存储编辑器实例
const editor1Container = ref<HTMLDivElement>();
const editor1 = shallowRef<any>(null);
const model1 = shallowRef<any>(null);
const model2 = shallowRef<any>(null);

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
const route = useRoute();

async function initEditors() {
  if (!editor1Container.value) {
    return;
  }
  // 异步创建编辑器模型和实例
  model1.value = await createEditorModel('', 'javascript');
  model2.value = await createEditorModel('', 'javascript');
  
  editor1.value = await createEditorDiff(editor1Container.value);
  
  editor1.value.setModel({
    original: model1.value,
    modified: model2.value,
  });
  
  // 添加保存命令
  await addCommandSave(editor1.value, async () => {
    await save();
  });
  // 添加编辑器到管理列表
  EditorManager.addEditor(editor1.value);
}

async function save() {
  const code1 = model1.value.getValue();
  const code2 = model2.value.getValue();
  await localforage.setItem(`debug-tools-${String(route.name)}`, { code1, code2 });
}

async function fetch() {
  const value: any = await localforage.getItem(`debug-tools-${String(route.name)}`);
  const { code1 = '', code2 = '' } = value || {};
  model1.value.setValue(code1 || code1Default);
  model2.value.setValue(code2 || code2Default);
}

onMounted(async () => {
  await initEditors();
  await fetch();
});

onUnmounted(() => {
  EditorManager.dispose();
});
</script>