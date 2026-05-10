<template>
  <div class="form-item">
    <label class="form-item-label">生成结果</label>
    <div class="form-item-content">
      <div class="result-wrapper">
      <textarea
        :value="modelValue"
        readonly
        @click="handleCopy"
        :title="modelValue ? '点击复制到剪贴板' : ''"
        :class="{ clickable: modelValue }"
        rows="10"
      ></textarea>
      <span v-if="copyMessage" class="copy-message">{{ copyMessage }}</span>
    </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{
  modelValue: string;
}>();

const copyMessage = ref('');

async function handleCopy() {
  const value = (document.activeElement as HTMLTextAreaElement)?.value;
  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    copyMessage.value = '已复制';
    setTimeout(() => { copyMessage.value = ''; }, 1500);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = value;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      copyMessage.value = '已复制';
      setTimeout(() => { copyMessage.value = ''; }, 1500);
    } catch (err) {
      console.error('复制失败:', err);
    }
    document.body.removeChild(textArea);
  }
}
</script>

<style lang="scss" scoped>
.form-item {
  min-height: 32px;
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.form-item-label {
  color: #ffffff;
  font-size: 12px;
  min-width: 120px;
  padding-top: 5px;
}

.form-item-content {
  flex: 1;
}

.form-item-content > .result-wrapper {
  width: 100%;
}

.result-wrapper {
  flex: 1;
  position: relative;
}

.result-wrapper textarea {
  width: 100%;
  outline: none;
  border: none;
  background-color: #2a2a2a;
  color: #aaaaaa;
  padding: 10px;
  border-radius: 3px;
  flex: 1;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
}

.result-wrapper textarea.clickable {
  cursor: pointer;
  transition: background-color 0.2s;
  color: #cccccc;
}

.result-wrapper textarea.clickable:hover {
  background-color: #3a3a3a;
}

.copy-message {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #4caf50;
  font-size: 12px;
  pointer-events: none;
}
</style>