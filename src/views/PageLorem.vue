<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label class="form-item-label">段落数量</label>
        <div class="form-item-content">
          <input type="number" v-model="paragraphs" min="1" max="32" />
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">每段句子数</label>
        <div class="form-item-content">
          <input type="number" v-model="sentencesPerParagraph" min="1" max="32" />
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">每句单词数</label>
        <div class="form-item-content">
          <input type="number" v-model="wordsPerSentence" min="1" max="32" />
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">
          <input type="checkbox" v-model="startWithClassic" />
          从"Lorem ipsum..."开始
        </label>
      </div>
      <ResultTextarea v-model="result" />
      <div>
        <button class="g-button" @click="generateLorem">生成</button>
        <button class="g-button" @click="resetForm">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { generateLorem as genLorem } from '@/domain/transform/modules/random/random-lorem';
import ResultTextarea from '@/components/ResultTextarea.vue';

const paragraphs = ref(1);
const sentencesPerParagraph = ref(3);
const wordsPerSentence = ref(8);
const startWithClassic = ref(false);
const result = ref('');

function generateLorem() {
  try {
    const text = genLorem({
      paragraphs: paragraphs.value,
      sentencesPerParagraph: sentencesPerParagraph.value,
      wordsPerSentence: wordsPerSentence.value,
      startWithClassic: startWithClassic.value,
    });
    result.value = text;
  } catch (error) {
    result.value = error instanceof Error ? error.message : '生成失败';
  }
}

function resetForm() {
  paragraphs.value = 1;
  sentencesPerParagraph.value = 3;
  wordsPerSentence.value = 8;
  startWithClassic.value = false;
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
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.form-item-label input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
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

.form-item input[type='number'] {
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

.form-item textarea:read-only {
  background-color: #2a2a2a;
  color: #888888;
}

.form-item textarea.clickable {
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-item textarea.clickable:hover {
  background-color: #3a3a3a;
}

.g-button {
  margin-right: 10px;
}
</style>