<template>
  <div class="page-welcome">
    <!-- 头部区域 -->
    <div class="welcome-header">
      <div class="welcome-title">
        <h1>调试工具箱</h1>
        <p class="subtitle">文本、URL、SQL、HTTP 等常用调试工具</p>
      </div>
    </div>
    <!-- 主要内容区域 -->
    <div class="welcome-content">
      <!-- 左侧快速开始区域 -->
      <div class="welcome-section">
        <h2 class="section-title">最近使用</h2>
        <div class="quick-actions">
          <div
            v-for="action in quickActions"
            :key="action.value"
            class="quick-action-item"
            @click="handleQuickAction(action)"
          >
            <div class="action-icon">{{ action.icon }}</div>
            <div class="action-content">
              <div class="action-title">{{ action.label }}</div>
              <div class="action-description">{{ action.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITool, tools } from '@/config';
import { useToolsStore } from '@/store';
import { EnumTools } from '@/types';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const { addRecentTool }  = useToolsStore();

const quickActions = computed(() => {
  const { recentTools }  = useToolsStore();
  const result: ITool[] = [];
  recentTools.forEach((tool) => {
    const toolConfig = tools.find((t) => t.value === tool);
    if (toolConfig) {
      result.push(toolConfig);
    }
  });
  return result;
})
const handleQuickAction = (action: ITool) => {
  if (action.order !== 0) {
    addRecentTool(action.value as EnumTools);
  }
  router.push({ name: action.value as string });
};
</script>

<style scoped>
.page-welcome {
  box-sizing: border-box;
  height: 100%;
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%);
  color: #cccccc;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
}

.welcome-header {
  text-align: center;
  margin-bottom: 20px;
}

.welcome-title h1 {
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  margin: 0;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1.1rem;
  color: #888888;
  margin: 0;
}

.welcome-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  flex: 1;
  margin: 0 auto;
  width: 100%;
}

.welcome-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 20px;
}

.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.quick-action-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.quick-action-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.action-icon {
  font-size: 1.5rem;
  margin-right: 16px;
  width: 40px;
  text-align: center;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.action-description {
  font-size: 0.9rem;
  color: #888888;
}

.tool-categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.category-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.category-icon {
  font-size: 1.5rem;
  margin-right: 12px;
  width: 32px;
  text-align: center;
}

.category-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2px;
}

.category-count {
  font-size: 0.8rem;
  color: #888888;
}

.welcome-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 40px;
  max-width: 1200px;
  margin: 40px auto 0;
  width: 100%;
}

.footer-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 12px 0;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  padding: 4px 0;
  font-size: 0.9rem;
  color: #888888;
}

.footer-section p {
  margin: 4px 0;
  font-size: 0.9rem;
  color: #888888;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .welcome-footer {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .tool-categories {
    grid-template-columns: 1fr;
  }

  .welcome-title h1 {
    font-size: 2rem;
  }
}
</style>
