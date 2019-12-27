<template>
  <!-- 左侧导航 -->
  <div class="layout-aside">
    <!-- logo -->
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <!-- logo下的整体 -->
    <!-- router开启路由  完整写法  :router='true'  -->
    <el-menu router style="width:231px"
        background-color="#353b4e"
        text-color="#adafb5"
        active-text-color="#ffd04b">
      <!-- 导航组件 -->
      <!-- 第一行 -->
      <!-- index相当于path作为跳转地址   类似于router-link下的to -->
      <el-menu-item index='/home'>首页</el-menu-item>
      <!-- 第二行   为了是这个和下面的有区别，随意给了一个index-->
      <el-submenu index="1">

        <span slot="title">内容管理</span>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <!-- 第三行 -->
      <el-submenu index="2">
        <span slot="title">粉丝管理</span>
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <!-- 最后一行 -->
      <el-menu-item index="/home/account">账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
//lang='less'指当前可以写less格式的样式  scoped：指这里设置的样式只能在当前使用
.layout-aside {
  width: 230px;
  overflow: hidden;

  .title {
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
}
</style>
