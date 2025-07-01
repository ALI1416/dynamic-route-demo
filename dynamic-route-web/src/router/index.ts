import {createRouter, createWebHistory} from 'vue-router'
import {baseUrl, webTitle} from '@/stores/constant.ts'

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/Home.vue')
    },
    {
      path: '/user',
      name: 'User',
      children: [
        {
          path: 'login',
          name: 'User.Login',
          meta: {
            title: '登录'
          },
          component: () => import('@/views/user/Login.vue')
        },
        {
          path: 'register',
          name: 'User.Register',
          meta: {
            title: '注册'
          },
          component: () => import('@/views/user/Register.vue')
        },
        {
          path: 'info',
          name: 'User.Info',
          meta: {
            title: '个人信息'
          },
          component: () => import('@/views/user/Info.vue')
        },
        {
          path: 'changePassword',
          name: 'User.ChangePassword',
          meta: {
            title: '修改密码'
          },
          component: () => import('@/views/user/ChangePassword.vue')
        },
      ]
    },
    {
      path: '/:path(.*)*',
      name: 'NotFound',
      meta: {
        title: '页面找不到'
      },
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string ?? webTitle
  next()
})

export default router
