<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label class="form-item-label">字符类型</label>
        <div class="form-item-content">
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="charTypes.numeric" />
              <span>普通数字 (0-9)</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="charTypes.lowercase" />
              <span>小写字母 (a-z)</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="charTypes.uppercase" />
              <span>大写字母 (A-Z)</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="charTypes.special" />
              <span>特殊符号 (!@#$...)</span>
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
import { ref, computed, watch } from 'vue';
import { randomString } from '@/domain/transform/modules/random/random-password';
import ResultTextarea from '@/components/ResultTextarea.vue';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

const length = ref(16);
const batchCount = ref(1);
const result = ref('');

watch(length, (val) => { length.value = clamp(val, 1, 1000); });
watch(batchCount, (val) => { batchCount.value = clamp(val, 1, 100); });

const charTypes = ref({
  numeric: true,
  lowercase: true,
  uppercase: true,
  special: false,
});

const charSets = {
  numeric: '0123456789',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

const chars = computed(() => {
  let result = '';
  if (charTypes.value.numeric) result += charSets.numeric;
  if (charTypes.value.lowercase) result += charSets.lowercase;
  if (charTypes.value.uppercase) result += charSets.uppercase;
  if (charTypes.value.special) result += charSets.special;
  return result;
});

function generateString() {
  try {
    if (!chars.value) {
      result.value = '请至少选择一种字符类型';
      return;
    }
    const results: string[] = [];
    for (let i = 0; i < batchCount.value; i++) {
      results.push(randomString(length.value, chars.value));
    }
    result.value = results.join('\n');
  } catch (error) {
    result.value = error instanceof Error ? error.message : '生成失败';
  }
}

function resetForm() {
  length.value = 16;
  batchCount.value = 1;
  charTypes.value = {
    numeric: true,
    lowercase: true,
    uppercase: true,
    special: false,
  };
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

.form-item input[type='number'],
.form-item input[type='text'] {
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

.checkbox-group {
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex: 1;
  align-items: center;
  height: 28px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  height: 28px;
}

.checkbox-label input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #007acc;
}

.checkbox-label span {
  user-select: none;
}

.g-button {
  margin-right: 10px;
}
</style>
