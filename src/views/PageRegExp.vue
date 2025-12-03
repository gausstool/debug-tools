<template>
  <div class="page-regexp">
    <div class="regexp-container">
      <div class="regexp-input">
        <input type="text" v-model="regExp" placeholder="请输入正则表达式" />
      </div>
      <div class="regexp-input">
        <textarea v-model="input" placeholder="请输入待匹配文本" rows="8"></textarea>
      </div>
      <div class="regexp-result">
        <table>
          <tbody>
            <tr>
              <th>索引</th>
              <th>匹配项</th>
            </tr>
            <tr v-for="(item, index) in result" :key="index">
              <td>{{ index }}</td>
              <td>{{ item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { regexMatch } from '@/transform/modules/regexp';
import { ref, computed } from 'vue';
const regExp = ref('(\\w+)(\\d+)');
const input = ref('abc123abc');
const result = computed(() => regexMatch(regExp.value, input.value));
</script>

<style lang="scss" scoped>
.page-regexp {
  padding: 20px;
  background-color: #1e1e1e;
  height: 100%;
}

.regexp-container {
  padding: 20px;
  height: calc(100% - 140px);
  background-color: #272727;
}

.regexp-input {
  margin-bottom: 20px;
  display: flex;
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 0px;
    outline: none;
    color: #d4d4d4;
    border: none;
    background-color: #1e1e1e;
    resize: none;
    font-family: Consolas, 'Courier New', monospace;
    font-size: 14px;
    border: 1px solid #272727;
    &:focus {
      border: 1px solid #424242;
    }
  }
}
.regexp-result {
  table {
    width: 100%;
    padding: 10px;
    color: #d4d4d4;
    border-radius: 0px;
    background-color: #1e1e1e;
    font-family: Consolas, 'Courier New', monospace;
    font-size: 14px;
    th,
    td {
      text-align: left;
      padding: 5px;
      width: 50%;
    }
  }
}
</style>
