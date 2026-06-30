<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="tool-links">
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="tool-link-item"
        >
          <div class="tool-link-icon">{{ link.icon }}</div>
          <div class="tool-link-content">
            <div class="tool-link-title">{{ link.title }}</div>
            <div class="tool-link-desc">{{ link.desc }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Link {
  icon: string
  title: string
  url: string
  desc: string
}

const links: Link[] = [
  { icon: '🌳', title: 'AST Explorer', url: 'https://astexplorer.net/', desc: 'AST 在线解析与探索工具' },
  { icon: '🔍', title: 'Regex101', url: 'https://regex101.com/', desc: '正则表达式在线测试与调试' },
  { icon: '📄', title: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com/', desc: '免费在线REST API 模拟服务' },
  { icon: '🌐', title: 'Can I Use', url: 'https://caniuse.com/', desc: '浏览器兼容性查询' },
  { icon: '📦', title: 'BundlePhobia', url: 'https://bundlephobia.com/', desc: 'npm 包体积分析' },
  { icon: '🔧', title: 'Transform Tools', url: 'https://transform.tools/', desc: '代码格式转换（JSON / GraphQL / Markdown 等）' },
  { icon: '🎨', title: 'Code Beautify', url: 'https://codebeautify.org/', desc: '代码美化、格式化与转换' },
  { icon: '📝', title: 'Carbon', url: 'https://carbon.now.sh/', desc: '代码片段生成美观截图' },
  { icon: '📐', title: 'DevDocs', url: 'https://devdocs.io/', desc: 'API 文档聚合查询' },
  { icon: '⚡', title: 'JSBench', url: 'https://jsbench.me/', desc: 'JavaScript 性能基准测试' },
  { icon: '🧪', title: 'CodeSandbox', url: 'https://codesandbox.io/', desc: '在线代码沙盒与原型开发' },
  { icon: '🧰', title: 'IT Tools', url: 'https://it-tools.tech/', desc: '开发工具集合（编码/加密/格式转换等）' },
]
</script>

<style lang="scss" scoped>
.page-layout {
  padding: 20px;
  padding-top: 0;
  background-color: #1e1e1e;
  height: 100%;
}

.page-container {
  padding: 20px;
  height: 100%;
  background-color: #272727;
}

.tool-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tool-link-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #1e1e1e;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
}

.tool-link-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.tool-link-content {
  flex: 1;
  min-width: 0;
}

.tool-link-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.tool-link-desc {
  color: #888;
  font-size: 12px;
}
</style>
