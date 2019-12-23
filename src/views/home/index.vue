<template>
  <!-- 因为用了elementUI，所以用他的标签 -->
  <!-- 放置一个最外面的容器 -->
  <el-container>
    <!-- 先左右布局  再把右边做上下布局-->
    <!-- 左侧 -->
    <el-aside style="background-color:#353b4e;min-height:100vh;width:230px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- 右侧上部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main style="padding:0px">
        <!-- 添加二级路由 -->
        <router-view class="View"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

// 导出
export default {
  components: {

  }
}
</script>

<style lang='less' scoped>
.View{
  min-height: 100vh;
  width: 100%;
  // overflow: hidden;
}
</style>
