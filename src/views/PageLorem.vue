<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label>段落数量</label>
        <input type="number" v-model="paragraphs" min="1" max="32" />
      </div>
      <div class="form-item">
        <label>每段句子数</label>
        <input type="number" v-model="sentencesPerParagraph" min="1" max="32" />
      </div>
      <div class="form-item">
        <label>每句单词数</label>
        <input type="number" v-model="wordsPerSentence" min="1" max="32" />
      </div>
      <div class="form-item">
        <label>生成结果</label>
        <textarea
          v-model="result"
          readonly
          @click="copyToClipboard"
          :title="result ? '点击复制到剪贴板' : ''"
          :class="{ clickable: result }"
          rows="6"
        ></textarea>
      </div>
      <div>
        <button class="g-button" @click="generateLorem">生成文本</button>
        <button class="g-button" @click="resetForm">重置</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { generateLorem as genLorem } from '@/domain/transform/modules/random/random-lorem';

const paragraphs = ref(1);
const sentencesPerParagraph = ref(3);
const wordsPerSentence = ref(8);
const result = ref('');

function generateLorem() {
  try {
    const text = genLorem({
      paragraphs: paragraphs.value,
      sentencesPerParagraph: sentencesPerParagraph.value,
      wordsPerSentence: wordsPerSentence.value,
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

.form-item input[type='number'],
.form-item textarea {
  outline: none;
  border: none;
  background-color: #3c3c3c;
  color: #ffffff;
  padding: 5px 10px;
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