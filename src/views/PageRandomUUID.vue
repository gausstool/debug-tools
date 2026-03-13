<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label>UUID 版本</label>
        <select v-model="selectedVersion" @change="handleVersionChange">
          <option value="v1">UUID v1 (基于时间和MAC地址)</option>
          <option value="v2">UUID v2 (基于DCE安全)</option>
          <option value="v3">UUID v3 (基于MD5命名空间)</option>
          <option value="v4">UUID v4 (随机生成)</option>
          <option value="v5">UUID v5 (基于SHA-1命名空间)</option>
          <option value="v6">UUID v6 (基于时间排序)</option>
          <option value="v7">UUID v7 (基于时间排序)</option>
        </select>
      </div>
      <div class="form-item" v-if="needsNamespace">
        <label>Namespace</label>
        <input type="text" v-model="namespace" placeholder="请输入 namespace" />
      </div>
      <div class="form-item" v-if="needsNamespace">
        <label>Name</label>
        <input type="text" v-model="name" placeholder="请输入 name" />
      </div>
      <div class="form-item">
        <label>生成数量</label>
        <input type="number" v-model="count" min="1" max="100" />
      </div>
      <div class="form-item">
        <label>选项</label>
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="includeDashes" />
            <span>包含 "-" 符号</span>
          </label>
        </div>
      </div>
      <div class="form-item">
        <label>生成结果</label>
        <textarea
          v-model="result"
          readonly
          @click="copyToClipboard"
          :title="result ? '点击复制到剪贴板' : ''"
          :class="{ clickable: result }"
          rows="10"
        ></textarea>
      </div>
      <div>
        <button class="g-button" @click="generateUUIDs">生成 UUID</button>
        <button class="g-button" @click="resetForm">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { generateUUID, type UUIDVersion } from '@/domain/transform/modules/random/random-uuid';

const selectedVersion = ref<UUIDVersion>('v4');
const namespace = ref('');
const name = ref('');
const count = ref(1);
const includeDashes = ref(true);
const result = ref('');

const needsNamespace = computed(() => {
  return selectedVersion.value === 'v3' || selectedVersion.value === 'v5';
});

function handleVersionChange() {
  if (!needsNamespace.value) {
    namespace.value = '';
    name.value = '';
  }
}

async function generateUUIDs() {
  try {
    const uuids: string[] = [];
    for (let i = 0; i < count.value; i++) {
      const uuid = await generateUUID(
        selectedVersion.value,
        namespace.value || undefined,
        name.value || undefined,
        includeDashes.value
      );
      uuids.push(uuid);
    }
    result.value = uuids.join('\n');
  } catch (error) {
    result.value = error instanceof Error ? error.message : '生成失败';
  }
}

function resetForm() {
  selectedVersion.value = 'v4';
  namespace.value = '';
  name.value = '';
  count.value = 1;
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
  align-items: flex-start;
  gap: 10px;
}

.form-item label {
  color: #ffffff;
  font-size: 12px;
  min-width: 120px;
  padding-top: 5px;
}

.form-item select,
.form-item input[type='number'],
.form-item input[type='text'],
.form-item textarea {
  outline: none;
  border: none;
  background-color: #3c3c3c;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 3px;
  flex: 1;
  font-family: 'Courier New', monospace;
}

.form-item select {
  cursor: pointer;
}

.form-item textarea {
  resize: vertical;
  min-height: 200px;
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
