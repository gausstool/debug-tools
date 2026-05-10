<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label class="form-item-label">随机种子</label>
        <div class="form-item-content">
          <input type="text" v-model="inputString" placeholder="输入任意字符串作为随机种子" />
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">最小端口</label>
        <div class="form-item-content">
          <input type="number" v-model="minPort" min="1" max="65535" />
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">最大端口</label>
        <div class="form-item-content">
          <input type="number" v-model="maxPort" min="1" max="65535" />
        </div>
      </div>
      <ResultTextarea v-model="generatedPort" />
      <div>
        <button class="g-button" @click="generatePort">生成</button>
        <button class="g-button" @click="resetForm">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { randomPort } from '@/domain/transform/modules/random/random-port';
import ResultTextarea from '@/components/ResultTextarea.vue';

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

.form-item-content > input,
.form-item-content > select,
.form-item-content > .checkbox-group,
.form-item-content > .radio-group {
  width: 100%;
}

.form-item input {
  outline: none;
  border: none;
  background-color: #3c3c3c;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 3px;
  flex: 1;
  height: 28px;
  box-sizing: border-box;
}

.form-item textarea {
  outline: none;
  border: none;
  background-color: #3c3c3c;
  color: #ffffff;
  padding: 0;
  border-radius: 3px;
  flex: 1;
  font-family: inherit;
  resize: vertical;
}

.form-item input:read-only,
.form-item textarea:read-only {
  background-color: #2a2a2a;
  color: #888888;
}

.form-item input.clickable,
.form-item textarea.clickable {
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-item input.clickable:hover,
.form-item textarea.clickable:hover {
  background-color: #3a3a3a;
}

.g-button {
  margin-right: 10px;
}
</style>