import { EnumTools } from '@/domain/transform/types';
import localforage from 'localforage';
import { defineStore } from 'pinia';
import { onMounted, ref, unref } from 'vue';

function getJsonSafe<T>(json: string, defaultValue: T): T {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return defaultValue;
  }
}

const createDefaultTools = () => [
  EnumTools.TEXT_SIZE,
  EnumTools.TEXT_DIFF,
  EnumTools.URL_PARSE,
  EnumTools.URL_ENCODE,
  EnumTools.URL_DECODE,
];

export const useToolsStore = defineStore('tools', () => {
  const MAX_TOOLS = 8;
  const recentTools = ref<EnumTools[]>([]);

  function addRecentTool(tool: EnumTools) {
    // 如果已存在，先移除再放到最前
    if (recentTools.value.includes(tool)) {
      recentTools.value = recentTools.value.filter(t => t !== tool);
    } else if (recentTools.value.length >= MAX_TOOLS) {
      // 仅在新添加时才检查长度并移除最后一项
      recentTools.value.pop();
    }
    recentTools.value.unshift(tool);
    // 持久化到本地
    localforage.setItem('debug-tools', JSON.stringify(unref(recentTools)));
  }

  onMounted(() => {
    localforage.getItem('debug-tools').then(list => {
      recentTools.value = getJsonSafe(list as string, []) || [];
      if (recentTools.value.length === 0) {
        recentTools.value.push(...createDefaultTools());
      }
    });
  });
  return { recentTools, addRecentTool };
});
