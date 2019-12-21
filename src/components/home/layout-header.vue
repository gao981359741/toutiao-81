<template>
  <!-- 头部导航    justify左右对齐方式    align上下对齐方式-->
  <el-row type="flex" class="layout-header" justify="space-between" align="middle">
      <!-- 左侧 -->
      <el-col class='left' :span="10">
          <!-- 左侧图标 -->
          <i class='el-icon-s-unfold'></i>
          <span class='title'>江苏传智播客教育科技股份有限公司</span>
      </el-col>
       <!-- 右侧 -->
      <el-col class='right' :span="4">
          <el-row type='flex' justify="end" align="middle">
            <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">

             <!-- 下拉菜单 -->
             <!-- EelementUI用了@command这个方法  所以这里也调用了 -->
             <el-dropdown @command="handle">
                 <span>{{userInfo.name}}
                     <i class="el-icon-arrow-down el-icon--right"></i>
                 </span>

                 <!-- 下拉菜单  具名插槽 -->
                 <el-dropdown-menu slot="dropdown">
                     <!-- 下拉内容 -->
                    <!-- command区分菜单的点击项 -->
                      <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                      <el-dropdown-item command='git'>Git地址</el-dropdown-item>
                      <el-dropdown-item command='lgout'>退出</el-dropdown-item>
                 </el-dropdown-menu>
            </el-dropdown>
          </el-row>
      </el-col>

  </el-row>
</template>

<script>

export default {
  data () {
    // 返回值 是对象形式
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/avatar.jpg') // 先把地址转换成变量
    }
  },
  // 生命周期  钩子函数   创建
  created () {
    // 获取令牌
    // let token = window.localStorage.getItem('user-token')
    // 查询数据
    this.$axios({
      url: '/user/profile'
      // 传递headers参数
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then(result => {
      console.log(result)
      // 返回一个对象   它里面有一个data，data里面还有一个data 才是我们需要的数据
      this.userInfo = result.data.data// 获取用户个人信息
    })
  },
  methods: {
    handle (command) {
      if (command === 'lgout') {
        // 退出当前页面到登录页面  并删除用户令牌
        window.localStorage.removeItem('user-token')
        // 回到登录页面
        this.$router.push('/login')
      } else if (command === 'git') {
        // 否则跳转到这个页面
        window.location.href = 'https://www.baidu.com/'
      }
    }
  }

}
</script>

<style lang='less' spoced>
 .layout-header {
      height:60px;
      .left {
          font-size: 18px;
          .title {
              margin-left:4px;
              color: #2c3e50;
              font-size:16px;
          }
      }
      .right {
          img {
              width:40px;
              height: 40px;
              border-radius: 20px;
              margin-right:5px;
          }
      }
  }

</style>
