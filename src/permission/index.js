// 权限拦截  导航守卫   也就是当从登录页到主页查看令牌是否正确
import router from '../router'// 引入router

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to即将进入的目标   路由对象
  // from 当导航正要离开的路由
  // next 回调函数
  // startsWith以什么为起始的
  if (to.path.startsWith('/home')) {
    // 进行权限判断
    // 查看token令牌密码
    let token = window.localStorage.getItem('user-token')
    // 如果token令牌密码正确直接放过
    if (token) {
      next()
      // 否则直接跳转到登录页面
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
