import {createApp} from 'vue'
import App from '@/App.vue'
import {createPinia} from 'pinia'
import router from '@/router'

import '@/assets/css/base.css'
import '@/assets/fonts/fonts.css'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import localeData from 'dayjs/plugin/localeData'
import duration from 'dayjs/plugin/duration'

import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'

dayjs.locale('zh-cn')
dayjs.extend(localeData)
dayjs.extend(duration)

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
