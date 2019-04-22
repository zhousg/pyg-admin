import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // 如是/根路径 重定向到 /home
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      // 二级路由配置  将会在home组件下使用
      children: [
        {path: '/welcome', name: 'welcome', component: Welcome}
      ]
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
