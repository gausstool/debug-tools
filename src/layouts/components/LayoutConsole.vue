<template>
  <div class="layout-console">
    <router-view></router-view>
    <div id="console-container"></div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';
import editorConsoleInstance from '@/editor/console';

onMounted(() => {
  const $parent = document.getElementById('console-container') as HTMLElement;
  editorConsoleInstance.mount($parent);
});

onBeforeUnmount(() => {
  editorConsoleInstance.unmount();
});
</script>