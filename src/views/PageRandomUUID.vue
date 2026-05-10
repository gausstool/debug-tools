<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label class="form-item-label">UUID 版本</label>
        <div class="form-item-content">
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
      </div>
      <div class="form-item" v-if="needsNamespace">
        <label class="form-item-label">Namespace</label>
        <div class="form-item-content">
          <input type="text" v-model="namespace" placeholder="请输入 namespace" />
        </div>
      </div>
      <div class="form-item" v-if="needsNamespace">
        <label class="form-item-label">Name</label>
        <div class="form-item-content">
          <input type="text" v-model="name" placeholder="请输入 name" />
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">生成数量</label>
        <div class="form-item-content">
          <input type="number" v-model="count" min="1" max="100" />
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">选项</label>
        <div class="form-item-content">
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="includeDashes" />
              <span>包含 "-" 符号</span>
            </label>
          </div>
        </div>
      </div>
      <ResultTextarea v-model="result" />
      <div>
        <button class="g-button" @click="generateUUIDs">生成</button>
        <button class="g-button" @click="resetForm">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { generateUUID, type UUIDVersion } from '@/domain/transform/modules/random/random-uuid';
import ResultTextarea from '@/components/ResultTextarea.vue';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

const selectedVersion = ref<UUIDVersion>('v4');
const namespace = ref('');
const name = ref('');
const count = ref(1);
const includeDashes = ref(true);
const result = ref('');

watch(count, (val) => { count.value = clamp(val, 1, 100); });

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

.form-item select,
.form-item input[type='number'],
.form-item input[type='text'] {
  outline: none;
  border: none;
  background-color: #3c3c3c;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 3px;
  flex: 1;
  font-family: 'Courier New', monospace;
  height: 28px;
  box-sizing: border-box;
}

.form-item select {
  cursor: pointer;
}

.form-item textarea {
  outline: none;
  border: none;
  background-color: #3c3c3c;
  color: #ffffff;
  padding: 0;
  border-radius: 3px;
  flex: 1;
  font-family: 'Courier New', monospace;
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

.result-wrapper {
  flex: 1;
  position: relative;
}

.result-wrapper textarea {
  width: 100%;
}

.copy-message {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #4caf50;
  font-size: 12px;
  pointer-events: none;
}

.g-button {
  margin-right: 10px;
}
</style>
