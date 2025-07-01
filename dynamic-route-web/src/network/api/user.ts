import {api, type ApiResponse} from '@/network/http.ts'

/**
 * 用户
 */
const PREFIX = 'user/'

/**
 * 用户信息
 */
type UserInfo = {
  /**
   * id
   */
  id: string,
  /**
   * 账号
   */
  account: string,
  /**
   * 用户名
   */
  name: string,
  /**
   * token
   */
  token: string,
  /**
   * 已删除
   */
  isDelete: boolean,
  /**
   * 创建者id
   */
  createId: string,
  /**
   * 创建时间
   */
  createTime: string,
}

/**
 * 获取用户信息
 */
function getUserInfo(): Promise<ApiResponse<UserInfo>> {
  return api({
    url: PREFIX + 'get'
  }, false)
}

/**
 * 登录请求
 */
type LoginRequest = {
  /**
   * 账号
   */
  account: string,
  /**
   * 密码
   */
  password: string,
}

/**
 * 登录
 */
function login(request: LoginRequest): Promise<ApiResponse<UserInfo>> {
  return api({
    url: PREFIX + 'login',
    method: 'post',
    data: request
  }, false)
}

/**
 * 注销
 */
function logout() {
  return api({
    url: PREFIX + 'logout',
  })
}

/**
 * 注册
 */
function register(request: LoginRequest): Promise<ApiResponse<string>> {
  return api({
    url: PREFIX + 'register',
    method: 'post',
    data: request
  }, false)
}


/**
 * 修改密码请求
 */
type UpdatePasswordRequest = {
  /**
   * 密码
   */
  password: string,
  /**
   * 新密码
   */
  newPassword: string,
}

/**
 * 修改密码
 */
function updatePassword(request: UpdatePasswordRequest): Promise<ApiResponse<boolean>> {
  return api({
    url: PREFIX + 'updatePassword',
    method: 'patch',
    data: request
  }, false)
}

export {
  type UserInfo,
  getUserInfo,
  type LoginRequest,
  login,
  logout,
  register,
  type UpdatePasswordRequest,
  updatePassword,
}
