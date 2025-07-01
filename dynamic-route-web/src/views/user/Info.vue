<script setup lang="ts">
import {type Ref, ref} from 'vue'
import type {UserInfo} from '@/network/api/user.ts'
import {userInfo} from '@/stores/user.ts'

const infoData: Ref<UserInfo> = ref(userInfo.value)

function updateClick() {

}
</script>

<template>
  <h3>个人信息</h3>
  <el-form label-width="auto" style="max-width: 300px">
    <el-form-item label="ID">
      <el-input
          v-model="infoData.id"
      />
    </el-form-item>
    <el-form-item label="账号">
      <el-input
          v-model="infoData.account"
          placeholder="请输入账号"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateClick">修改</el-button>
    </el-form-item>
  </el-form>
</template>
