<template>
  <div class="nginx-log-parser">
    <div class="nginx-log-parser-container">
      <div>
        <input
          style="display: none"
          ref="inputRef"
          type="file"
          id="nginx-log-file"
          accept=".log"
          @change="onFileChange"
        />
        <button class="button" @click="onClick">选择文件</button>
      </div>
      <div class="nginx-log-parser-result" v-if="tableData.length">
        <div class="table-content">
          <table>
            <tbody>
              <tr>
                <th>索引</th>
                <th v-for="prop in tableHead" :key="prop">{{ prop }}</th>
              </tr>
              <tr v-for="(item, index) in tableDataPaged" :key="index">
                <td>{{ index }}</td>
                <td v-for="prop in tableHead" :key="prop">{{ item[prop] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <el-pagination background layout="prev, pager, next" @update:page-size="onPageSizeChange" @update:current-page="onPageCurrentChange" :total="pager.total" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { ElPagination } from 'element-plus';
import { NginxLogParser } from '@/domain/transform/modules/http/nginx-log-parse';
const parser = new NginxLogParser(
  '$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"',
);
const inputRef = ref();
const tableData = ref([] as Record<string, string>[]);
const tableHead = ref([] as string[]);

const pager = reactive({
  current: 1,
  size: 20,
  total: 0,
});

const onPageCurrentChange = (val: number) => {
  pager.current = val;
};

const onPageSizeChange = (val: number) => {
  pager.current = 1;
  pager.size = val;
};

const tableDataPaged = computed(() => {
  const start = (pager.current - 1) * pager.size;
  const end = start + pager.size;
  return tableData.value.slice(start, end);
});

const onClick = () => {
  inputRef.value.click();
};

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) {
    const file = target.files[0];
    readFile(file);
  }
};

const readFile = (file: File) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const log = reader.result as string;
    const lines = log.split('\n');
    const rows = lines
      .map(line => {
        return parser.parse(line);
      })
      .filter(item => item !== null);
    tableData.value = rows;
    tableHead.value = Object.keys(rows[0]);
    pager.total = rows.length;
  };
};
</script>
<style lang="scss" scoped>
.nginx-log-parser {
  padding: 20px;
  padding-top: 0px;
  background-color: #1e1e1e;
  height: 100%;
}

.nginx-log-parser-container {
  padding: 20px;
  height: 100%;
  background-color: #272727;
  .button {
    border: 1px solid #424242;
    border-radius: 2px;
    background-color: #424242;
    padding: 4px 8px;
    color: #fff;
    cursor: pointer;
  }
  .button:hover {
    background-color: #484848;
  }
}

.nginx-log-parser-result {
  padding-top: 20px;
  .table-content {
    width: 100%;
    overflow-x: auto;
  }
  table {
    padding: 10px;
    color: #d4d4d4;
    border-radius: 0px;
    background-color: #1e1e1e;
    font-family: Consolas, 'Courier New', monospace;
    font-size: 14px;
    th,
    td {
      white-space: nowrap;
      text-align: left;
      padding: 5px;
      min-width: 100px;
    }
  }
  .table-footer {
    padding-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
