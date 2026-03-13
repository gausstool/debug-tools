<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label>进制选择</label>
        <div class="radio-group">
          <label class="radio-label" v-for="base in supportedBases" :key="base">
            <input type="radio" v-model="selectedBase" :value="base" />
            <span>{{ base }}</span>
          </label>
        </div>
      </div>
      <div class="form-item">
        <label>字符长度</label>
        <input type="number" v-model="length" min="1" max="1000" />
      </div>
      <div class="form-item">
        <label>生成结果</label>
        <input
          type="text"
          v-model="result"
          readonly
          @click="copyToClipboard"
          :title="result ? '点击复制到剪贴板' : ''"
          :class="{ 'clickable': result }"
        />
      </div>
      <div>
        <button class="g-button" @click="generateString">生成字符</button>
        <button class="g-button" @click="resetForm">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { randomNBase, getSupportedBases } from '@/domain/transform/modules/random/random-n-base';

const supportedBases = getSupportedBases();
const selectedBase = ref(16);
const length = ref(32);
const result = ref('');

function generateString() {
  try {
    result.value = randomNBase(selectedBase.value, length.value);
  } catch (error) {
    result.value = error instanceof Error ? error.message : '生成失败';
  }
}

function resetForm() {
  selectedBase.value = 16;
  length.value = 32;
  result.value = '';
}

async function copyToClipboard() {
  if (!result.value) return;

  try {
    await navigator.clipboard.writeText(result.value);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = result.value;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('复制失败:', err);
    }
    document.body.removeChild(textArea);
  }
}
</script>

<style lang="scss" scoped>
.page-layout {
  padding: 20px;
  padding-top: 0px;
  background-color: #1e1e1e;
  height: 100%;
}

.page-container {
  padding: 20px;
  height: 100%;
  background-color: #272727;
}

.form-item {
  min-height: 32px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-item label {
  color: #ffffff;
  font-size: 12px;
  min-width: 120px;
}

.form-item input {
  outline: none;
  border: none;
  background-color: #3c3c3c;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 3px;
  flex: 1;
}

.form-item input:read-only {
  background-color: #2a2a2a;
  color: #888888;
}

.form-item input.clickable {
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-item input.clickable:hover {
  background-color: #3a3a3a;
}

.radio-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.form-item .radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  min-width: 40px;
}

.radio-label input[type='radio'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #007acc;
  margin: 0;
}

.radio-label span {
  user-select: none;
}

.g-button {
  margin-right: 10px;
}
</style>
