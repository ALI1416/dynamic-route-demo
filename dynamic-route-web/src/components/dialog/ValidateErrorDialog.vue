<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps<{
  tableData: string[]
}>()

const dialogVisible = ref(true)

const tableDataFix = props.tableData.map((value) => {
  return {value}
})
</script>

<template>
  <el-dialog
      title="校验错误"
      width="300"
      v-model="dialogVisible"
  >
    <el-table
        stripe
        :show-header="false"
        border
        :data="tableDataFix"
    >
      <el-table-column prop="value"/>
    </el-table>
    <template #footer>
      <el-button
          type="primary"
          @click="dialogVisible=false"
      >好的
      </el-button>
    </template>
  </el-dialog>
</template>
