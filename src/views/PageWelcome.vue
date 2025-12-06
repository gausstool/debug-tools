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