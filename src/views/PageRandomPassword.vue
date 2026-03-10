<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label>字符类型</label>
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
          :class="{ clickable: result }"
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
import { ref, computed } from 'vue';
import { randomString } from '@/domain/transform/modules/random/random-password';

const length = ref(16);
const result = ref('');

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
    result.value = randomString(length.value, chars.value);
  } catch (error) {
    result.value = error instanceof Error ? error.message : '生成失败';
  }
}

function resetForm() {
  length.value = 12;
  charTypes.value = {
    numeric: true,
    lowercase: true,
    uppercase: true,
    special: false,
  };
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
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.form-item label {
  color: #ffffff;
  font-size: 12px;
  min-width: 120px;
  padding-top: 5px;
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

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  padding: 5px 0;
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
