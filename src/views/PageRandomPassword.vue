<template>
  <div class="page-layout">
    <div class="page-container">
      <div class="form-item">
        <label>密码长度</label>
        <input type="number" v-model="length" />
      </div>
      <div class="form-item">
        <label>生成密码</label>
        <input type="text" v-model="password" />
      </div>
      <div>
        <button class="g-button" @click="generatePassword">生成密码</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const length = ref(12);
const password = ref('');
import { randomPassword } from '@/domain/transform/modules/random/random-password';

function generatePassword() {
  password.value = randomPassword(length.value);
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
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-item label {
  color: #ffffff;
  font-size: 12px;
}

.form-item input {
  outline: none;
  border: none;
}
</style>
