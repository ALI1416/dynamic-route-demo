import {defineStore} from 'pinia'
import {type Ref, ref} from 'vue'
import {tokenKey} from '@/stores/constant.ts'
import {type UserInfo} from '@/network/api/user.ts'

/**
 * 用户
 */
export const useUserStore = defineStore('user', () => {

})

/**
 * 用户信息
 */
const userInfo: Ref<UserInfo> = ref(getEmptyUserInfo())

/**
 * 获取空的用户信息
 */
function getEmptyUserInfo(): UserInfo {
  return {
    id: '',
    account: '',
    name: '',
    token: '',
    isDelete: false,
    createId: '',
    createTime: '',
  }
}

/**
 * 清空用户信息
 */
function cleanUserInfo() {
  userInfo.value = getEmptyUserInfo()
}

/**
 * 获取本地储存token
 */
function getLocalStorageToken(): string {
  return localStorage[tokenKey]
}

/**
 * 设置本地储存token
 */
function setLocalStorageToken(token: string) {
  localStorage[tokenKey] = token
}

/**
 * 清空本地储存token
 */
function cleanLocalStorageToken() {
  localStorage.removeItem(tokenKey)
}

export {
  userInfo,
  cleanUserInfo,
  getLocalStorageToken,
  setLocalStorageToken,
  cleanLocalStorageToken,
}
