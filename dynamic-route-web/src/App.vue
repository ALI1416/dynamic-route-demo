<script setup lang="ts">
import {zhCn} from 'element-plus/es/locale/index'
import Header from '@/components/header/Header.vue'
import {onMounted} from 'vue'
import {getUserInfo} from '@/network/api/user.ts'
import {cleanLocalStorageToken, cleanUserInfo, getLocalStorageToken, userInfo} from '@/stores/user.ts'
import {ElMessageBox, ElNotification} from 'element-plus'
import {useRouter} from 'vue-router'

const router = useRouter()

onMounted(() => {
  let token = getLocalStorageToken()
  if (token) {
    userInfo.value.token = token
    getUserInfo().then(res => {
      if (res.ok) {
        userInfo.value = res.data
        userInfo.value.token = token
        ElNotification({
          title: '自动登录成功',
          type: 'success'
        })
      }
      if (res.code === 1001) {
        ElMessageBox.confirm('请重新登录', '自动登录失败', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          router.push('/user/login')
        }).catch(() => {
          ElNotification({
            title: '取消登录',
            type: 'error'
          })
        })
        cleanLocalStorageToken()
        cleanUserInfo()
      }
    })
  }
})
</script>

<template>
  <!-- ElementPlus国际化：中文 -->
  <el-config-provider
      :locale="zhCn"
  >
    <Header/>
    <div>
      <router-view/>
    </div>
  </el-config-provider>
</template>

<style scoped>

</style>
