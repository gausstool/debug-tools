import { EnumTools } from './types';
import PageRegExp from './views/PageRegExp.vue';
const EditorDiff = () => import('@/views/PageEditorDiff.vue');
const EditorDouble = () => import('@/views/PageEditorDouble.vue');
const PageWelcome = () => import('@/views/PageWelcome.vue');

export interface ITool {
  icon?: string;
  label: string; // 显示的名称
  value: EnumTools | string;
  component: any; // 对应的组件
  order: number; // 排序顺序
  space?: boolean;
  description?: string;
}

export const tools: ITool[] = [
  // 欢迎页面
  { icon: '👋', label: '欢迎', value: 'welcome', component: PageWelcome, order: 0 },
  {
    label: '文本 相关工具',
    value: '',
    component: EditorDouble,
    order: 1,
    space: true,
  },
  {
    icon: '🔀',
    label: 'TEXT 对比',
    value: EnumTools.TEXT_DIFF,
    component: EditorDiff,
    order: 2,
    description: '对比两个文本字符串的差异',
  },
  {
    icon: '🔍',
    label: 'TEXT 排序',
    value: EnumTools.TEXT_SORT,
    component: EditorDouble,
    order: 3,
    description: '对文本字符串进行排序',
  },
  {
    icon: '📐',
    label: 'TEXT 大小',
    value: EnumTools.TEXT_SIZE,
    component: EditorDouble,
    order: 4,
    description: '计算文本字符串的字节大小',
  },
  {
    icon: '🔍',
    label: '正则表达式',
    value: EnumTools.REGEX_TEST,
    component: PageRegExp,
    order: 5,
    description: '测试正则表达式对文本字符串的匹配情况',
  },
  {
    icon: '🔗',
    label: 'URL 解析',
    value: EnumTools.URL_PARSE,
    component: EditorDouble,
    order: 101,
    description: '解析 URL 字符串，提取协议、主机、端口、路径等信息',
  },
  {
    icon: '🌍',
    label: 'URL 编码',
    value: EnumTools.URL_ENCODE,
    component: EditorDouble,
    order: 102,
    description: '对 URL 字符串进行编码，替换特殊字符',
  },
  {
    icon: '🌎',
    label: 'URL 解码',
    value: EnumTools.URL_DECODE,
    component: EditorDouble,
    order: 103,
    description: '对 URL 字符串进行解码，恢复特殊字符',
  },
  {
    icon: '🔡',
    label: 'Base64 编码',
    value: EnumTools.BASE64_ENCODE,
    component: EditorDouble,
    order: 201,
    description: '对文本字符串进行 Base64 编码',
  },
  {
    icon: '🔠',
    label: 'Base64 解码',
    value: EnumTools.BASE64_DECODE,
    component: EditorDouble,
    order: 202,
    description: '对 Base64 编码的字符串进行解码',
  },
  {
    label: '请求相关工具',
    value: '',
    component: EditorDouble,
    order: 400,
    space: true,
  },
  {
    icon: '🛡️',
    label: 'CSP 解析',
    value: EnumTools.CSP_PARSE,
    component: EditorDouble,
    order: 401,
    description: '解析 CSP 字符串，提取指令和值',
  },
  {
    icon: '🛡️',
    label: 'CSP 逆解析',
    value: EnumTools.CSP_UNPARSE,
    component: EditorDouble,
    order: 402,
    description: '将 CSP 指令和值转换为字符串',
  },
  {
    icon: '🌐',
    label: 'HTTP 缓存解读',
    value: EnumTools.HTTP_CACHE_ANALYZE,
    component: EditorDouble,
    order: 403,
    description: '解读 HTTP 缓存控制头，提取缓存策略',
  },
  {
    icon: '🌐',
    label: 'HTTP 跨域解读',
    value: EnumTools.HTTP_CORS_ANALYZE,
    component: EditorDouble,
    order: 404,
    description: '解读 HTTP 跨域资源共享头，提取允许的来源',
  },
  {
    label: 'SQL 相关工具',
    value: '',
    component: EditorDouble,
    order: 500,
    space: true,
  },
  {
    icon: '⛃',
    label: 'SQL 压缩',
    value: EnumTools.SQL_COMPRESS,
    component: EditorDouble,
    order: 501,
    description: '压缩 SQL 语句，移除空格和注释',
  },
  {
    icon: '⛁',
    label: 'SQL 格式化',
    value: EnumTools.SQL_FORMAT,
    component: EditorDouble,
    order: 502,
    description: '格式化 SQL 语句，添加换行和缩进',
  },
].sort((a, b) => a.order - b.order);

// 按功能分类的工具配置
export const toolCategories = {
  textTools: tools.filter(tool => tool.order >= 100 && tool.order < 200),
  jsonTools: tools.filter(tool => tool.order >= 200 && tool.order < 300),
  sqlTools: tools.filter(tool => tool.order >= 300 && tool.order < 400),
};

// 导出默认路由配置
export const defaultTool = 'welcome';
