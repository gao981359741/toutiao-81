// 引入
import layoutHeader from './home/layout-header'
import layoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor' // 引入了quill组件
import CoverImage from './publish/cover-image'
import selectImage from './publish/select-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导出
export default {
  // 里面有一个固定属性install
  install (Vue) {
    // 全局注册
    Vue.component('layout-header', layoutHeader)
    Vue.component('layout-aside', layoutAside)
    Vue.component('bread-crumb', BreadCrumb)// 面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
    Vue.component('cover-image', CoverImage) // 注册一个封面组件
    Vue.component('select-image', selectImage)// 注册一个弹层组件
  }
}
