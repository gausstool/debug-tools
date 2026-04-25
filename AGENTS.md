# AGENTS.md

## 开发命令

```bash
pnpm dev        # 启动开发服务器
pnpm build      # 构建生产版本 (先 tsc --noEmit 检查，再 vite build)
pnpm preview    # 预览构建结果
pnpm lint       # 代码检查
pnpm lint:fix   # 代码检查并自动修复
```

**注意**: 项目未配置测试框架，无测试命令。

---

## 目录结构

```
src/
├── domain/transform/   # 转换工具模块 (CSS/SQL/YAML/JSON 转换)
├── views/              # 页面组件 (PageXxx.vue)
├── components/         # 公共组件
├── layouts/            # 布局组件
├── router/             # 路由配置
├── store/              # Pinia 状态管理
└── utils/              # 工具函数
```

---

## 关键约束

- **包管理器**: pnpm (非 npm/yarn)
- **路径别名**: `@/*` -> `src/*`
- **文件命名**: 页面/组件 `PageXxx.vue`, `LayoutXxx.vue`; 其他 `kebab-case.ts`
- **提交前**: 运行 `pnpm lint`
- **TypeScript**: `strict: true`