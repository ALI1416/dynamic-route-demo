<script setup lang="ts">
import {reactive, ref, type Ref} from 'vue'
import {login, type LoginRequest} from '@/network/api/user.ts'
import {setLocalStorageToken, userInfo} from '@/stores/user.ts'
import {ElMessage, ElNotification, type FormInstance, type FormRules, type ValidateFieldsError} from 'element-plus'
import {useRouter} from 'vue-router'
import useValidateErrorDialog from '@/components/dialog/useValidateErrorDialog.ts'

const router = useRouter()

const loginData: Ref<LoginRequest> = ref({
  account: '',
  password: '',
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<LoginRequest>>({
  account: [
    {required: true, message: '账号不能为空', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
  ],
})

const passwordFormItem: Ref<HTMLElement | undefined> = ref()

const loginError = ref(false)
const loginErrorIsDisable = ref(false)
const loginErrorMessage = ref('')

async function loginClick() {
  let ruleOk = true
  await ruleFormRef.value?.validate((isValid: boolean, invalidFields: ValidateFieldsError) => {
    ruleOk = isValid
    if (!isValid) {
      useValidateErrorDialog(invalidFields)
    }
  })
  if (!ruleOk) {
    return
  }
  login(loginData.value).then(res => {
    if (res.ok) {
      userInfo.value = res.data
      setLocalStorageToken(res.data.token)
      ElNotification({
        title: '登录成功',
        type: 'success'
      })
      router.push('/')
    } else {
      loginError.value = true
      if (res.code === 1003) {
        loginErrorIsDisable.value = true
        loginErrorMessage.value = '账号已被禁用'
      } else {
        loginErrorIsDisable.value = false
        loginErrorMessage.value = res.message
      }
    }
  })
}

function reLogin() {
  loginError.value = false
  passwordFormItem.value?.focus()
}

function unDisable() {
  loginError.value = false
  ElMessage('申请解除禁用')
}

function findPassword() {
  loginError.value = false
  ElMessage('找回密码')
}
</script>

<template>
  <h3>登录</h3>
  <el-form
      label-width="auto"
      style="max-width: 300px"
      :rules="rules"
      ref="ruleFormRef"
      :model="loginData"
  >
    <el-form-item
        label="账号"
        prop="account"
    >
      <el-input
          v-model="loginData.account"
          placeholder="请输入账号"
      />
    </el-form-item>
    <el-form-item
        label="密码"
        prop="password"
    >
      <el-input
          v-model="loginData.password"
          placeholder="请输入密码"
          type="password"
          show-password
          ref="passwordFormItem"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="loginClick">登录</el-button>
    </el-form-item>
  </el-form>
  <!-- 登录失败 -->
  <el-dialog
      v-model="loginError"
      title="登录失败"
      width="300"
      :before-close="reLogin"
  >
    <span>{{ loginErrorMessage }}</span>
    <template #footer>
      <el-button v-if="loginErrorIsDisable" type="warning" @click="unDisable">申请解除禁用</el-button>
      <template v-else>
        <el-button type="warning" @click="findPassword">找回密码</el-button>
        <el-button type="primary" @click="reLogin">重新输入</el-button>
      </template>
    </template>
  </el-dialog>
</template>
