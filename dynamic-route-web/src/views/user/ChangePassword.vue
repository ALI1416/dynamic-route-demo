<script setup lang="ts">
import {reactive, ref, type Ref} from 'vue'
import {ElMessageBox, type FormInstance, type FormRules, type ValidateFieldsError} from 'element-plus'
import useValidateErrorDialog from '@/components/dialog/useValidateErrorDialog.ts'
import {updatePassword, type UpdatePasswordRequest} from '@/network/api/user.ts'
import type {InternalRuleItem, Value} from 'async-validator/dist-types/interface'

type UpdatePasswordForm = UpdatePasswordRequest & {
  /**
   * 确认密码
   */
  passwordConfirm: string
}

const updatePasswordData: Ref<UpdatePasswordForm> = ref({
  password: '',
  newPassword: '',
  passwordConfirm: '',
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<UpdatePasswordForm>>({
  password: [
    {required: true, message: '旧密码不能为空', trigger: 'blur'},
  ],
  newPassword: [
    {required: true, message: '新密码不能为空', trigger: 'blur'},
  ],
  passwordConfirm: [
    {required: true, validator: passwordConfirm, trigger: 'blur'}
  ]
})

function passwordConfirm(rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) {
  if (value === '') {
    callback('确认密码不能为空')
  } else if (value !== updatePasswordData.value.newPassword) {
    callback('新密码与确认新密码不一致')
  } else {
    callback()
  }
}

const passwordFormItem: Ref<HTMLElement | undefined> = ref()

async function updatePasswordClick() {
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
  updatePassword(updatePasswordData.value).then(res => {
    if (res.ok) {
      if (res.data) {
        ElMessageBox.alert('修改密码成功', '修改密码成功', {
          confirmButtonText: '好的',
          callback() {
            updatePasswordData.value = {
              password: '',
              newPassword: '',
              passwordConfirm: '',
            }
          }
        })
      } else {
        ElMessageBox.alert('未知错误', '修改密码失败', {
          confirmButtonText: '好的',
        })
      }
    } else {
      ElMessageBox.alert(res.message, '修改密码失败', {
        confirmButtonText: '好的',
        callback() {
          passwordFormItem.value?.focus()
        },
      })
    }
  })
}
</script>

<template>
  <h3>修改密码</h3>
  <el-form
      label-width="auto"
      style="max-width: 300px"
      :rules="rules"
      ref="ruleFormRef"
      :model="updatePasswordData"
  >
    <el-form-item
        label="旧密码"
        prop="password"
    >
      <el-input
          v-model="updatePasswordData.password"
          placeholder="请输入旧密码"
          type="password"
          show-password
          ref="passwordFormItem"
      />
    </el-form-item>
    <el-form-item
        label="新密码"
        prop="newPassword"
    >
      <el-input
          v-model="updatePasswordData.newPassword"
          placeholder="请输入信密码"
          type="password"
          show-password
      />
    </el-form-item>
    <el-form-item
        label="确认密码"
        prop="passwordConfirm"
    >
      <el-input
          v-model="updatePasswordData.passwordConfirm"
          placeholder="请输入确认密码"
          type="password"
          show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updatePasswordClick">修改密码</el-button>
    </el-form-item>
  </el-form>
</template>
