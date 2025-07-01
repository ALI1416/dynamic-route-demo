import axios, {type AxiosError, type AxiosRequestConfig, type AxiosResponse} from 'axios'
import {ElNotification} from 'element-plus'
import {userInfo} from '@/stores/user.ts'
import {apiUrl, baseUrl, tokenKey} from '@/stores/constant.ts'

/**
 * API响应
 */
type ApiResponse<T = any> = {
  /**
   * 是否成功(状态码为0时成功)
   */
  ok: boolean,
  /**
   * 状态码
   */
  code: number,
  /**
   * 详细信息
   */
  message: string,
  /**
   * 数据
   */
  data: T,
}

/**
 * API请求
 * @param config 配置
 * @param rejectNotOk 拒绝API返回非成功状态
 * @return rejectNotOk<br>
 * true Promise ApiResponse.data<br>
 * false Promise ApiResponse
 */
function api(config: AxiosRequestConfig, rejectNotOk: boolean = true): Promise<any> {
  return createApi(rejectNotOk)(config)
}

/**
 * 创建API请求实例
 * @param rejectNotOk 拒绝API返回非成功状态
 */
function createApi(rejectNotOk: boolean) {
  const instance = axios.create({
    baseURL: apiUrl
  })
  instance.interceptors.request.use(config => {
    // 添加token
    let token = userInfo.value.token
    if (token) {
      config.headers[tokenKey] = token
    }
    return config
  })
  instance.interceptors.response.use((res: AxiosResponse<ApiResponse>) => {
    if (rejectNotOk) {
      if (res.data.ok) {
        return res.data.data
      } else {
        ElNotification({
          title: '接口调用异常',
          message: res.data.message,
          type: 'error'
        })
        return Promise.reject(new Error(res.data.message))
      }
    } else {
      return res.data
    }
  }, (error: AxiosError) => {
    ElNotification({
      title: '接口调用失败',
      message: error.message,
      type: 'error'
    })
    return Promise.reject(new Error(error.message))
  })
  return instance
}

/**
 * 本地请求
 * @param url URL
 * @param params 参数
 * @return Promise any
 */
function local(url: string, params?: any): Promise<any> {
  return createLocal()({
    url,
    params
  })
}

/**
 * 创建本地请求实例
 */
function createLocal() {
  const instance = axios.create({
    baseURL: baseUrl
  })
  instance.interceptors.request.use(config => {
    return config
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, (error: AxiosError) => {
    ElNotification({
      title: '接口调用失败',
      message: error.message,
      type: 'error'
    })
    return Promise.reject(new Error(error.message))
  })
  return instance
}

export {
  type ApiResponse,
  api,
  local,
}
