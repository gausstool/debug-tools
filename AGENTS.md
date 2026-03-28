# AGENTS.md

## 项目包管理器

本项目使用 **pnpm** 作为包管理器。

---

## 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm lint

# 代码检查并自动修复
pnpm lint:fix
```

**注意**: 本项目目前没有配置测试框架，无测试命令。

---

## 项目技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router
- **编辑器组件**: CodeMirror 6
- **UI组件**: Element Plus
- **包管理器**: pnpm

---

## 代码风格规范

### 格式化

- 使用 **Prettier** 进行代码格式化
- 配置: `.prettierrc`
  - 缩进: 2 空格
  - 行宽: 120 字符
  - 单引号
  - 分号: 启用
  - 箭头函数参数: 省略不必要的括号

### 代码检查

- 使用 **ESLint** (flat config)
- 配置文件: `eslint.config.mjs`
- 规则:
  - TypeScript: `no-explicit-any` 关闭
  - `no-useless-escape` 关闭
  - 缩进: 2 空格 (warn)

### TypeScript 配置

- `tsconfig.json`:
  - `strict: true`
  - `moduleResolution: Node`
  - 路径别名: `@/*` -> `src/*`

### 命名规范

- **文件命名**: kebab-case (如 `page-welcome.vue`, `router-index.ts`)
- **组件命名**: PascalCase (如 `LayoutHome.vue`, `PageRandomPassword.vue`)
- **变量/函数**: camelCase
- **常量**: UPPER_SNAKE_CASE
- **枚举**: EnumXxx (PascalCase with Enum prefix)
- **接口/类型**: Ixxx 或 PascalCase

### Import 规范

```typescript
// 1. Vue 内置 (vue)
import { ref, computed, onMounted } from 'vue';

// 2. 项目内部 (相对路径)
import LayoutHome from '@/layouts/LayoutHome.vue';
import { useToolsStore } from '@/store';

// 3. 第三方库
import { createRouter } from 'vue-router';
import localforage from 'localforage';

// 4. CSS/SCSS
import 'nprogress/nprogress.css';
```

### Vue 组件规范

- 使用 `<script lang="ts" setup>` 语法
- 组件顺序: template -> script -> style
- Props 使用类型声明
- 优先使用 Composition API

```vue
<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps<{
  title: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update', value: string): void;
}>();
</script>
```

### 样式规范

- 使用 `<style lang="scss" scoped>`
- CSS 类名: kebab-case
- 避免全局样式污染，使用 scoped
- 颜色使用 Hex 格式

### Error Handling

- 使用 try-catch 处理可能抛出的异常
- 错误信息使用中文
- console.error 用于记录错误
- 用户可见的错误信息应友好提示

```typescript
try {
  const result = JSON.parse(jsonString);
} catch (error) {
  console.error('Error parsing JSON:', error);
  return defaultValue;
}
```

### 路由配置

- 使用懒加载: `() => import('@/views/PageXxx.vue')`
- 路由守卫使用中文注释
- meta 用于存储页面元信息

---

## 目录结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── domain/          # 业务逻辑
│   └── transform/   # 转换工具
├── layouts/         # 布局组件
├── router/          # 路由配置
├── store/           # Pinia 状态管理
├── styles/          # 全局样式
├── utils/           # 工具函数
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.ts          # 入口文件
```

---

## 开发注意事项

1. **路径别名**: 使用 `@/` 代替 `../../`
2. **组件懒加载**: 路由组件使用懒加载以优化性能
3. **类型安全**: 尽量避免使用 `any`，使用具体类型
4. **CSS Scoped**: 组件样式必须使用 scoped
5. **提交前检查**: 运行 `pnpm lint` 确保代码质量
