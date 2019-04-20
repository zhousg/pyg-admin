import Vue from 'vue'
import App from './App'
import router from './router'

/* 依赖全局样式文件 */
import './assets/css/global.css'
/* 依赖字体图标css */
import './assets/fonts/iconfont.css'

/* 依赖配置好的axios */
import axios from './http'

/* 依赖element-ui */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {size: 'small'})

Vue.prototype.$http = axios
/* 控制台的日志更详细一些 true  */
Vue.config.productionTip = false
/* 入口文件作用：导入其他依赖 */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
