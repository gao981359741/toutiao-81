<template>
  <!-- 左侧导航 -->
  <div class="layout-aside">
    <!-- logo -->
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <!-- logo下的整体 -->
    <el-menu>
      <!-- 导航组件 -->
      <!-- 第一行 -->
      <el-menu-item>首页</el-menu-item>
      <!-- 第二行 -->
      <el-submenu
        style="width:231px"
        background-color="#353b4e"
        text-color="#adafb5"
        active-text-color="#ffd04b"
      >
        <span slot="title">内容管理</span>
        <el-menu-item>发布文章</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
      <!-- 第三行 -->
      <el-submenu>
        <span slot="title">粉丝管理</span>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
      </el-submenu>
      <!-- 最后一行 -->
      <el-menu-item>账户信息</el-menu-item>
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
