<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label>随机种子</label>
        <input type="text" v-model="inputString" placeholder="输入任意字符串作为随机种子" />
      </div>
      <div class="form-item">
        <label>最小端口</label>
        <input type="number" v-model="minPort" min="1" max="65535" />
      </div>
      <div class="form-item">
        <label>最大端口</label>
        <input type="number" v-model="maxPort" min="1" max="65535" />
      </div>
      <div class="form-item">
        <label>生成结果</label>
        <input 
          type="text" 
          v-model="generatedPort" 
          readonly 
          @click="copyToClipboard"
          :title="generatedPort ? '点击复制到剪贴板' : ''"
          :class="{ 'clickable': generatedPort }"
        />
      </div>
      <div>
        <button class="g-button" @click="generatePort">生成端口</button>
        <button class="g-button" @click="resetForm">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { randomPort } from '@/domain/transform/modules/random/random-port';

const inputString = ref('');
const minPort = ref(1025);
const maxPort = ref(65535);
const generatedPort = ref('');

function generatePort() {
  try {
    const port = randomPort(inputString.value, minPort.value, maxPort.value);
    generatedPort.value = port.toString();
  } catch (error) {
    generatedPort.value = error instanceof Error ? error.message : '生成失败';
  }
}

function resetForm() {
  inputString.value = '';
  minPort.value = 1025;
  maxPort.value = 65535;
  generatedPort.value = '';
}

async function copyToClipboard() {
  if (!generatedPort.value) return;
  
  try {
    await navigator.clipboard.writeText(generatedPort.value);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = generatedPort.value;
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

.g-button {
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
}
</style>