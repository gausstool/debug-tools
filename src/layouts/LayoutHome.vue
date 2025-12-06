<template>
  <div class="layout-home">
    <div class="home-container">
      <div class="home-header">
        <MacIconButton></MacIconButton>
        <a href="https://github.com/gausstool/debug-tools">Github</a>
      </div>
      <div class="home-main">
        <div class="menu-container">
          <div class="g-menu second-level">
            <template v-for="item in tools" :key="item.value">
              <div v-if="item.space" class="g-menu-item is-space"></div>
              <div
                v-else
                class="g-menu-item"
                :class="{ 'is-active': item.value === route.name }"
                @click="onRadioClick(item)"
              >
                <span class="icon">{{ item.icon }}</span>
                <span class="label">{{ item.label }}</span>
              </div>
            </template>
          </div>
        </div>
        <div class="tool-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITool, tools } from '@/domain/transform';
import { useRoute, useRouter } from 'vue-router';
import { useToolsStore } from '@/store';
import { EnumTools } from '@/domain/transform/types';
import MacIconButton from '@/components/MacIconButton.vue';

const { addRecentTool } = useToolsStore();
const route = useRoute();
const router = useRouter();
const onRadioClick = async (tool: ITool) => {
  if (tool.value === route.name) {
    return;
  }
  if (tool.order !== 0) {
    addRecentTool(tool.value as EnumTools);
  }
  router.push({ name: tool.value });
};
</script>

<style lang="scss">
.layout-home {
  position: relative;

  .layout-console {
    height: 100%;
  }

  .layout-no-console {
    height: 100%;
  }
}
</style>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  background-color: #272822;
  overflow: hidden;
  box-shadow: 1px 1px 10px #1e1e1e;
  overflow: hidden;
}

.home-header {
  font-family: monospace;
  padding: 0 12px;
  line-height: 30px;
  height: 30px;
  color: #cccccc;
  background-color: #1e1e1e;
  display: flex;
  justify-content: space-between;
}

.home-main {
  flex: 1;
  height: calc(100% - 30px);
  display: flex;
}

.menu-container {
  width: 150px;
  height: 100%;
  .icon {
    display: inline-block;
    font-size: 14px;
    width: 24px;
  }
}
.tool-container {
  height: 100%;
  width: calc(100% - 150px);
}
</style>
