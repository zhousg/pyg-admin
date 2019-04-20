import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // 如是/根路径 重新到 /home
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 1. 如果现在 跳转是登录  放行
  if (to.path === '/login') return next()
  // 2. 如果现在 未登录（sessionStorage是否有token）  拦截到登录
  if (!sessionStorage.getItem('token')) return next('/login')
  // 3. 其他情况
  next()
})

export default router
