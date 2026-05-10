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
        <label class="form-item-label">开头选项</label>
        <div class="form-item-content">
          <label class="checkbox-label">
            <input type="checkbox" v-model="startWithClassic" />
            从"Lorem ipsum..."开始
          </label>
        </div>
      </div>
      <div class="form-item">
        <label class="form-item-label">输出格式</label>
        <div class="form-item-content">
          <label class="radio-label">
            <input type="radio" v-model="outputFormat" value="paragraph" />
            段落
          </label>
          <label class="radio-label">
            <input type="radio" v-model="outputFormat" value="list" />
            列表
          </label>
        </div>
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
import { ref, watch } from 'vue';
import { generateLorem as genLorem } from '@/domain/transform/modules/random/random-lorem';
import ResultTextarea from '@/components/ResultTextarea.vue';

const outputFormat = ref<'paragraph' | 'list'>('paragraph');
const paragraphs = ref(1);
const sentencesPerParagraph = ref(3);
const wordsPerSentence = ref(8);
const startWithClassic = ref(true);
const result = ref('');

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

watch(paragraphs, (val) => { paragraphs.value = clamp(val, 1, 32); });
watch(sentencesPerParagraph, (val) => { sentencesPerParagraph.value = clamp(val, 1, 32); });
watch(wordsPerSentence, (val) => { wordsPerSentence.value = clamp(val, 1, 32); });

function generateLorem() {
  try {
    const text = genLorem({
      outputFormat: outputFormat.value,
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
  outputFormat.value = 'paragraph';
  paragraphs.value = 1;
  sentencesPerParagraph.value = 3;
  wordsPerSentence.value = 8;
  startWithClassic.value = true;
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

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  cursor: pointer;
  font-size: 12px;
}

.checkbox-label input[type='checkbox'] {
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

.form-item-content > select {
  outline: none;
  border: none;
  background-color: #3c3c3c;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 3px;
  height: 28px;
  box-sizing: border-box;
}

.radio-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  cursor: pointer;
  font-size: 12px;
  margin-right: 15px;
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