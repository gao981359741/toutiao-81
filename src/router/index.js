import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'// 登录后页面的组件
import Login from '../views/login'// 登录页面的组件
import Home2 from '../views/home/home'// 默认背景的组件

Vue.use(VueRouter)

const routes = [
  // 强制跳转到主页
  {
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: Home,
    // 二级路由组件
    children: [{
      path: '', // 二级路由什么都不写  作为显示组件
      component: Home2
    }, {
      // 二级路由表
      path: 'comment',
      component: () => import('../views/comment')// 按需加载
    }, {
      path: 'material', // 素材列表
      component: () => import('../views/material')
    }]

  }, {
    // 登陆页
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
