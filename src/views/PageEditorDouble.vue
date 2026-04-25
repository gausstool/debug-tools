<template>
  <div class="page-editor-double" id="editor-double">
    <div ref="editor1Container" class="container"></div>
    <div ref="editor2Container" class="container"></div>
  </div>
</template>

<script lang="ts" setup>
import localforage from 'localforage';
import { onMounted, onUnmounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { addCommandSave, createEditorInstance, createEditorState } from '@/domain/editor/codemirror-editor';
import { EditorManager } from '@/domain/editor/codemirror-editor-manager';
import { processContent } from '@/domain/transform/modules';
import { EnumTools } from '@/domain/transform/types';
import { EditorView } from '@codemirror/view';

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

const codeBase64Encode = `测试一下，你好世界 空格`;
const codeBase64UrlSafeEncode = `测试一下，你好世界 空格`;
const codeBase64Decode = `5rWL6K+V5LiA5LiL77yM5L2g5aW95LiW55WMIOepuuagvA==`;

const codeUrlEncode = `http://example.com/?q=中文 测试`;
const codeUrlDecode = `http://example.com/?q=%E4%B8%AD%E6%96%87%20%E6%B5%8B%E8%AF%95`;
const codeUrlParamsEncode = `中文 测试`;
const codeUrlParamsDecode = `%E4%B8%AD%E6%96%87%20%E6%B5%8B%E8%AF%95`;

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

const codeSemiSplit = `localhost;127.*;10.*;192.168.*`
const codeCommaSPlit = `a,b,c`;
const codeLineSplit = `a
b
c
d
e
f`;

const codeSrt = `1
00:00:01,000 --> 00:00:04,000
Hello world，这是第一行
这是同一字幕的第二行

2
00:00:05,000 --> 00:00:08,000
第二段字幕
包含两行内容

3
00:00:10,000 --> 00:00:12,500
最后一段`;

const codeCss = `.a {
  color: red;
  font-size: 16px;
}

.a .b {
  color: blue;
  font-size: 14px;
}

.a .b .c {
  color: green;
  font-size: 12px;
}

.a .b .c.is-active{
  color: yellow;
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
  const code1 = editor1? editor1.state.doc.toString() : '';
  const key = `debug-tools-${String(route.name)}`;
  await localforage.setItem(key, code1);
}

async function fetch() {
  const key = `code-tools-${String(route.name)}`;
  const value = await localforage.getItem(key) as string;

  if (route.name == EnumTools.SQL_FORMAT || route.name == EnumTools.SQL_COMPRESS) {
    currentLanguage1 = 'sql';
    currentLanguage2 = 'sql';
  } else if (route.name == EnumTools.TEXT_SIZE) {
    currentLanguage1 = 'text';
    currentLanguage2 = 'javascript';
  } else if (route.name == EnumTools.TEXT_SORT) {
    currentLanguage1 = 'text';
    currentLanguage2 = 'text';
  } else if (route.name == EnumTools.CSS_TO_SASS) {
    currentLanguage1 = 'css';
    currentLanguage2 = 'sass';
  } else if (route.name == EnumTools.CSS_TO_SCSS) {
    currentLanguage1 = 'css';
    currentLanguage2 = 'scss';
  }

  // 设置默认值
  let defaultValue = '';
  if (route.name == EnumTools.TEXT_SIZE) {
    defaultValue = value || codeSize;
  } else if (route.name == EnumTools.TEXT_SORT) {
    defaultValue = value || codeTextSort;
  } else if (route.name == EnumTools.URL_PARSE) {
    defaultValue = window.location.href;
  } else if (route.name == EnumTools.BASE64_ENCODE) {
    defaultValue = codeBase64Encode;
  } else if (route.name == EnumTools.BASE64_URL_SAFE_ENCODE) {
    defaultValue = codeBase64UrlSafeEncode;
  } else if (route.name == EnumTools.BASE64_DECODE) {
    defaultValue = codeBase64Decode;
  } else if (route.name == EnumTools.URL_ENCODE) {
    defaultValue = codeUrlEncode;
  } else if (route.name == EnumTools.URL_DECODE) {
    defaultValue = codeUrlDecode;
  } else if (route.name == EnumTools.URL_COMPONENT_ENCODE) {
    defaultValue = codeUrlParamsEncode;
  } else if (route.name == EnumTools.URL_COMPONENT_DECODE) {
    defaultValue = codeUrlParamsDecode;
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
  } else if (route.name == EnumTools.TEXT_SPLIT_BY_SEMI) {
    defaultValue = codeSemiSplit;
  } else if (route.name == EnumTools.TEXT_SPLIT_BY_COMMA) {
    defaultValue = codeCommaSPlit;
  } else if (route.name == EnumTools.TEXT_SPLIT_BY_LINE) {
    defaultValue = codeLineSplit;
  } else if (route.name == EnumTools.TEXT_SRT_PLAIN) {
    defaultValue = codeSrt;
  } else if (route.name == EnumTools.CSS_TO_SASS) {
    defaultValue = codeCss;
  } else if (route.name == EnumTools.CSS_TO_SCSS) {
    defaultValue = codeCss;
  } 

  if (editor1) {
    const newState = await createEditorState(defaultValue, currentLanguage1, { onchange: excute});
    editor1.setState(newState)
  }
}

async function excute() {
  if (!editor1) return;
  const value1 = editor1.state.doc.toString();
  const type = route.name as EnumTools;
  try {
    const value2 = await processContent(value1, type);
    const newState = await createEditorState(value2, currentLanguage2);
    editor2?.setState(newState);
  } catch (error: any) {
    const newState = await createEditorState(error.message, currentLanguage2);
    editor2?.setState(newState);
  }
}

onMounted(async () => {
  const state1 = await createEditorState('', currentLanguage1, { onchange: excute });
  const state2 = await createEditorState('', currentLanguage2);
  if (!editor1Container.value || !editor2Container.value) return;
  editor1 = createEditorInstance(editor1Container.value, state1);
  editor2 = createEditorInstance(editor2Container.value, state2);
  EditorManager.addEditor(editor1);
  EditorManager.addEditor(editor2);
  await fetch();
  excute();
  addCommandSave(editor1, async () => {
    save();
    excute();
  });
});

watch(route, async () => {
  await fetch();
  excute();
});

onUnmounted(() => {
  EditorManager.dispose();
});
</script>
