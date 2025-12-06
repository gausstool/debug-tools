<template>
  <div class="page-editor-double" id="editor-double">
    <div ref="editor1Container" class="container"></div>
    <div ref="editor2Container" class="container"></div>
  </div>
</template>

<script lang="ts" setup>
import localforage from 'localforage';
import { onMounted, onUnmounted, watch, ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { addCommandSave, createEditorInstance, createEditorModel } from '@/domain/editor/editor';
import { processContent } from '@/domain/transform/modules';
import { EnumTools } from '@/domain/transform/types';
import { EditorManager } from '@/domain/editor/editor-manager';

// 使用ref来存储编辑器实例
const editor1Container = ref<HTMLDivElement>();
const editor2Container = ref<HTMLDivElement>();
const editor1 = shallowRef<any>(null);
const editor2 = shallowRef<any>(null);
const model1 = shallowRef<any>(null);
const model2 = shallowRef<any>(null);

const codeSize = `计算字符串所占的内存字节数，
使用 UTF-8 和 UTF-16 的编码方式计算。
UTF-8 和 UTF-16 都是 Unicode 标准的字符编码方案，
但它们的设计选择导致了截然不同的特性和适用场景。
  - UTF-8 使用 1 到 4 个字节 的变长编码来表示一个字符。核心特点：向后兼容 ASCII。
  - UTF-16 使用 2 或 4 个字节 的变长编码来表示一个字符。核心特点：表示非 ASCII 字符通常只需要 2 个字节。
对于 CJK 文本（中文/日文/韩文），UTF-8 通常需要 3 个字节来表示一个字符，而 UTF-16 通常只需要 2 个字节。
对于英文文本，UTF-8 通常需要只需要 1 个字节，而 UTF-16 通常需要 2 个字节来表示一个字符。
因此，在英文文本中，UTF-8 通常是更节省空间的选择，而在 CJK 文本中，UTF-16 通常是更节省空间的选择。
由于 UTF-8 兼容 ASCII，因此在绝大多数现代应用中，UTF-8 是默认选择。`;

const codeTextSort = `3. 按字典序排序
1. 对文本进行排序
2. 每行一个字符串
`;

const codeBase64Encode = `你好世界`;
const codeBase64Decode = `5L2g5aW95LiW55WM`;
const codeUrlEncode = `你好世界`;
const codeUrlDecode = `%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C`;
const codeCspParse = `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.example.com; style-src 'self' fonts.example.com; img-src 'self' data: example.com; font-src 'self' data: fonts.example.com; form-action 'self'`;
const codeCspUnparse = `{
  "default-src": ["'self'"],
  "script-src": ["'self'","'unsafe-inline'", "'unsafe-eval'", "cdn.example.com"],
  "style-src": ["'self'", "fonts.example.com"],
  "img-src": ["'self'", "data:", "example.com"],
  "font-src": ["'self'", "data:", "fonts.example.com"],
  "form-action": ["'self'"]
}`;

const codeHttpCacheAnalyze = `Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Cache-Control: max-age=604800`;

const codeHttpCorsAnalyze = `Content-Type: application/json
Content-Length: 123
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: X-Custom-Header, X-Another-Header
Access-Control-Max-Age: 86400`;

const codeSqlFormat = `SELECT id, name, email, created_at FROM users WHERE status = 'active' AND created_at > '2023-01-01' ORDER BY created_at DESC LIMIT 10;`;

const codeSqlCompress = `SELECT 
  id, 
  name, 
  email, 
  created_at 
FROM 
  users 
WHERE 
  status = 'active' 
  AND created_at > '2023-01-01' 
ORDER BY 
  created_at DESC 
LIMIT 10;`;

const route = useRoute();

async function save() {
  const code1 = model1.value.getValue();
  const key = `debug-tools-${String(route.name)}`;
  await localforage.setItem(key, code1);
}

async function initEditors() {
  if (!editor1Container.value || !editor2Container.value) {
    return;
  }
  // 异步创建编辑器模型和实例
  model1.value = await createEditorModel('', 'javascript');
  model2.value = await createEditorModel('', 'javascript');
  editor1.value = await createEditorInstance(editor1Container.value, model1.value);
  editor2.value = await createEditorInstance(editor2Container.value, model2.value, { readOnly: true }); // 第二个编辑器为只读

  // 添加保存命令
  await addCommandSave(editor1.value, async () => {
    await save();
  });

  // 设置内容变化监听器
  editor1.value.onDidChangeModelContent(() => {
    excute();
  });

  // 添加编辑器到管理列表
  EditorManager.addEditor(editor1.value);
  EditorManager.addEditor(editor2.value);
}

async function fetch() {
  const key = `code-tools-${String(route.name)}`;
  const value = await localforage.getItem(key);
  // 根据路由类型设置模型语言
  let model1Language = 'javascript';
  let model2Language = 'javascript';

  if (route.name == EnumTools.SQL_FORMAT || route.name == EnumTools.SQL_COMPRESS) {
    model1Language = 'sql';
    model2Language = 'sql';
  } else if (route.name == EnumTools.TEXT_SIZE) {
    model1Language = 'text';
    model2Language = 'javascript';
  } else if (route.name == EnumTools.TEXT_SORT) {
    model1Language = 'text';
    model2Language = 'text';
  }

  // 重新创建模型
  model1.value = await createEditorModel('', model1Language);
  model2.value = await createEditorModel('', model2Language);

  editor1.value.setModel(model1.value);
  editor2.value.setModel(model2.value);

  // 设置默认值
  let defaultValue = '';
  if (route.name == EnumTools.TEXT_SIZE) {
    defaultValue = codeSize;
  } else if (route.name == EnumTools.TEXT_SORT) {
    defaultValue = codeTextSort;
  } else if (route.name == EnumTools.URL_PARSE) {
    defaultValue = window.location.href;
  } else if (route.name == EnumTools.BASE64_ENCODE) {
    defaultValue = codeBase64Encode;
  } else if (route.name == EnumTools.BASE64_DECODE) {
    defaultValue = codeBase64Decode;
  } else if (route.name == EnumTools.URL_ENCODE) {
    defaultValue = codeUrlEncode;
  } else if (route.name == EnumTools.URL_DECODE) {
    defaultValue = codeUrlDecode;
  } else if (route.name == EnumTools.CSP_PARSE) {
    defaultValue = codeCspParse;
  } else if (route.name == EnumTools.CSP_UNPARSE) {
    defaultValue = codeCspUnparse;
  } else if (route.name == EnumTools.HTTP_CACHE_ANALYZE) {
    defaultValue = codeHttpCacheAnalyze;
  } else if (route.name == EnumTools.HTTP_CORS_ANALYZE) {
    defaultValue = codeHttpCorsAnalyze;
  } else if (route.name == EnumTools.SQL_FORMAT) {
    defaultValue = codeSqlFormat;
  } else if (route.name == EnumTools.SQL_COMPRESS) {
    defaultValue = codeSqlCompress;
  }

  model1.value.setValue((value as string) || defaultValue);
  excute();
}

async function excute() {
  const value1 = editor1.value.getValue();
  const type = route.name as EnumTools; // 默认类型为 text-size
  try {
    const [value] = await processContent(value1, type);
    model2.value.setValue(value);
  } catch (error: any) {
    editor2.value.setValue(error.message);
  }
}

onMounted(async () => {
  // 初始化编辑器
  await initEditors();

  // 加载数据
  await fetch();
});

watch(route, async () => {
  await fetch();
});

onUnmounted(() => {
  EditorManager.dispose();
});
</script>
