<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label class="form-item-label">进制选择</label>
        <div class="form-item-content">
          <div class="radio-group">
            <label class="radio-label" v-for="base in supportedBases" :key="base">
              <input type="radio" v-model="selectedBase" :value="base" />
              <span>{{ base }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">字符长度</label>
        <div class="form-item-content">
          <input type="number" v-model="length" min="1" max="1000" />
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">批量生成</label>
        <div class="form-item-content">
          <input type="number" v-model="batchCount" min="1" max="100" />
        </div>
      </div>
      <ResultTextarea v-model="result" />
      <div>
        <button class="g-button" @click="generateString">生成</button>
        <button class="g-button" @click="resetForm">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { randomNBase, getSupportedBases } from '@/domain/transform/modules/random/random-n-base';
import ResultTextarea from '@/components/ResultTextarea.vue';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

const supportedBases = getSupportedBases();
const selectedBase = ref(16);
const length = ref(32);
const batchCount = ref(1);
const result = ref('');

watch(length, (val) => { length.value = clamp(val, 1, 1000); });
watch(batchCount, (val) => { batchCount.value = clamp(val, 1, 100); });

function generateString() {
  try {
    const results: string[] = [];
    for (let i = 0; i < batchCount.value; i++) {
      results.push(randomNBase(selectedBase.value, length.value));
    }
    result.value = results.join('\n');
  } catch (error) {
    result.value = error instanceof Error ? error.message : '生成失败';
  }
}

function resetForm() {
  selectedBase.value = 16;
  length.value = 32;
  batchCount.value = 1;
  result.value = '';
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

.radio-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
  height: 28px;
}

.form-item .radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  min-width: 40px;
  height: 28px;
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
