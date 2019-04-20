// 导出一个已经配置好的axios
import axios from 'axios'

// 全局使用 必须依赖  Vue  在main.js中使用
// baseURL 配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 导出
export default axios
