<script setup lang="ts">
import {reactive, ref, type Ref} from 'vue'
import {ElMessageBox, type FormInstance, type FormRules, type ValidateFieldsError} from 'element-plus'
import {useRouter} from 'vue-router'
import useValidateErrorDialog from '@/components/dialog/useValidateErrorDialog.ts'
import {type LoginRequest, register} from '@/network/api/user.ts'
import type {InternalRuleItem, Value} from 'async-validator/dist-types/interface'

const router = useRouter()

type RegisterForm = LoginRequest & {
  /**
   * 确认密码
   */
  passwordConfirm: string
}

const registerData: Ref<RegisterForm> = ref({
  account: '',
  password: '',
  passwordConfirm: '',
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RegisterForm>>({
  account: [
    {required: true, message: '账号不能为空', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
  ],
  passwordConfirm: [
    {required: true, validator: passwordConfirm, trigger: 'blur'}
  ]
})

function passwordConfirm(rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) {
  if (value === '') {
    callback('确认密码不能为空')
  } else if (value !== registerData.value.password) {
    callback('密码与确认密码不一致')
  } else {
    callback()
  }
}

const accountFormItem: Ref<HTMLElement | undefined> = ref()

async function registerClick() {
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
  register(registerData.value).then(res => {
    if (res.ok) {
      if (res.data) {
        ElMessageBox.alert(`注册成功，您的账号为 ${registerData.value.account} ，ID为 ${res.data}`, '注册成功', {
          confirmButtonText: '登录',
          callback() {
            router.push('/user/login')
          },
        })
      } else {
        ElMessageBox.alert('未知错误', '注册失败', {
          confirmButtonText: '好的',
          callback() {
            accountFormItem.value?.focus()
          },
        })
      }
    } else {
      ElMessageBox.alert(res.message, '注册失败', {
        confirmButtonText: '好的',
        callback() {
          accountFormItem.value?.focus()
        },
      })
    }
  })
}
</script>

<template>
  <h3>注册</h3>
  <el-form
      label-width="auto"
      style="max-width: 300px"
      :rules="rules"
      ref="ruleFormRef"
      :model="registerData"
  >
    <el-form-item
        label="账号"
        prop="account"
    >
      <el-input
          v-model="registerData.account"
          placeholder="请输入账号"
          ref="accountFormItem"
      />
    </el-form-item>
    <el-form-item
        label="密码"
        prop="password"
    >
      <el-input
          v-model="registerData.password"
          placeholder="请输入密码"
          type="password"
          show-password
      />
    </el-form-item>
    <el-form-item
        label="确认密码"
        prop="passwordConfirm"
    >
      <el-input
          v-model="registerData.passwordConfirm"
          placeholder="请输入确认密码"
          type="password"
          show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="registerClick">注册</el-button>
    </el-form-item>
  </el-form>
</template>
