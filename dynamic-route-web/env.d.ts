/// <reference types="vite/client" />
// https://cn.vitejs.dev/guide/env-and-mode.html

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  /**
   * 网站标题
   */
  readonly VITE_WEB_TITLE: string
  /**
   * API URL
   */
  readonly VITE_API_URL: string
  /**
   * token键
   */
  readonly VITE_TOKEN_KEY: string
}
