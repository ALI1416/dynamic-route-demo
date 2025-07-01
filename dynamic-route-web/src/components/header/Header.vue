<script setup lang="ts">
import {useRouter} from 'vue-router'
import {cleanLocalStorageToken, cleanUserInfo, userInfo} from '@/stores/user.ts'
import {logout} from '@/network/api/user.ts'
import {ElMessage} from 'element-plus'

const router = useRouter()

function logoutClick() {
  logout().then(() => {
    cleanLocalStorageToken()
    cleanUserInfo()
    router.push('/')
  })
}
</script>

<template>
  <el-button type="default" @click="router.push('/')">首页</el-button>
  <template v-if="userInfo.id">
    <span>&emsp;ID[{{ userInfo.id }}]&emsp;</span>
    <span>用户名[{{ userInfo.name }}]&emsp;</span>
    <span>账号[{{ userInfo.account }}]&emsp;</span>
    <span>token[{{ userInfo.token }}]&emsp;</span>
    <el-button type="primary" @click="router.push('/user/info')">个人信息</el-button>
    <el-button type="warning" @click="router.push('/user/changePassword')">修改密码</el-button>
    <el-popconfirm
        title="确定注销账号吗？"
        @confirm="logoutClick"
    >
      <template #reference>
        <el-button type="danger">注销</el-button>
      </template>
    </el-popconfirm>
  </template>
  <template v-else>
    <span>&emsp;未登录&emsp;</span>
    <el-button type="primary" @click="router.push('/user/login')">登录</el-button>
    <el-button type="success" @click="router.push('/user/register')">注册</el-button>
    <el-button type="warning" @click="ElMessage('找回密码')">找回密码</el-button>
  </template>
</template>
