// 对axios进行封装
import axios from 'axios'// 引入axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 赋值黑马头条的默认地址
// 请求拦截器  固定写法
axios.interceptors.request.use(function (config) {
  // 执行请求ok
  // 获取token
  let token = window.localStorage.getItem('user-token')
  // config是axios的所有配置项   统一注入token
  config.headers.Authorization = `Bearer ${token}`
  // 返回的config就会作为新的请求选项去进行请求
  return config
}, function () {

})
