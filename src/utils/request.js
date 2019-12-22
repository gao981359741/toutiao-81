// 对axios进行封装
import axios from 'axios'// 引入axios
import router from '../router'
import { Message } from 'element-ui'// 引入提示信息对象
// 赋值黑马头条的默认地址

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器  固定写法
axios.interceptors.request.use(function (config) {
  // 执行请求ok
  // 获取token
  let token = window.localStorage.getItem('user-token')
  // config是axios的所有配置项   统一注入token  注入请求参数
  config.headers.Authorization = `Bearer ${token}`
  // 返回的config就会作为新的请求选项去进行请求
  return config
}, function () {

})
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 成功时执行
  return response.data ? response.data : {}
  // 失败时执行这个函数
}, function (error) {
  // 获取状态码  根据状态码情况进行相应的提示或者操作
  let status = error.response.status// 获取状态码，根据状态码提示信息
  let message = ''// 提示信息
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      // 如果同样的状态码 但是不同意思 => 需要通过 请求地址来判断是哪个的响应  请求地址 + 状态码 一起来判断 怎么处理
      // resfehtoken 过期 强制跳转到登录页 resfehtoken => 是用来换取 token的
      // this.$router => 路由实例对象
      router.push('/login')
      break
    case 401:
      // token过期
      router.push('/login') // 强制回登录
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 提示消息
  // 想让错误拦截器的内容继续进入到以后的catch中 而不进入then
  return Promise.reject(error)
})
export default axios
