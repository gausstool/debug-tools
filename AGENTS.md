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

---

## 发布流程

### 1. 正式版本发布

```bash
# 1. 更新 package.json 中的版本号 (如 1.6.0)
# 2. 提交更改
git add package.json
git commit -m "chore: 发布 v1.6.0"

# 3. 推送代码和 tag
git push origin develop
git tag v1.6.0
git push origin v1.6.0
```

### 2. Beta 版本发布

```bash
# 1. 更新 package.json 中的版本号 (如 1.6.0.beta.9)
# 2. 提交更改
git add package.json
git commit -m "chore: 升级至 v1.6.0.beta.9"

# 3. 推送代码和 tag
git push origin develop
git tag v1.6.0.beta.9
git push origin v1.6.0.beta.9
```

### 3. 删除远程 Tag（如需撤回）

```bash
git push origin :refs/tags/v1.6.0
```

### 4. GitHub Release

Tag 推送后，在 GitHub 手动创建 Release：
https://github.com/gausstool/debug-tools/releases/new?tag=v1.6.0