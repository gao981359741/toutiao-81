// 引入
import layoutHeader from './home/layout-header'
import layoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
// 导出
export default {
  // 里面有一个固定属性install
  install (Vue) {
    // 全局注册
    Vue.component('layout-header', layoutHeader)
    Vue.component('layout-aside', layoutAside)
    Vue.component('bread-crumb', BreadCrumb)// 面包屑组件
  }
}
