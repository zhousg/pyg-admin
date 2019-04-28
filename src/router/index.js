import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import Users from '@/components/users/Users'
import Rights from '@/components/auth/Rights'
import Roles from '@/components/auth/Roles'
import Categories from '@/components/goods/Categories'
import Params from '@/components/goods/Params'
import Goods from '@/components/goods/Goods'
import GoodsAdd from '@/components/goods/Goods-Add'
import Orders from '@/components/orders/Orders'
import Reports from '@/components/reports/Reports'

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
        {path: '/welcome', name: 'welcome', component: Welcome},
        {path: '/users', name: 'users', component: Users},
        {path: '/rights', name: 'rights', component: Rights},
        {path: '/roles', name: 'roles', component: Roles},
        {path: '/categories', name: 'categories', component: Categories},
        {path: '/params', name: 'params', component: Params},
        {path: '/goods', name: 'goods', component: Goods},
        {path: '/goods/add', name: 'goodsadd', component: GoodsAdd},
        {path: '/orders', name: 'orders', component: Orders},
        {path: '/reports', name: 'reports', component: Reports}
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
