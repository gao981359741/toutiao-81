<template>
<!-- 因为用了elementUI，所以用他的标签 -->
<!-- 放置一个最外面的容器 -->
<el-container>
  <!-- 先左右布局  再把右边做上下布局-->
  <!-- 左侧 -->
<el-aside style="background-color:#353b4e;height:100vh;width:230px">
<layout-aside></layout-aside>
</el-aside>
<el-container>
    <el-header>
        头部
      </el-header>
        <!-- 主要区域 -->
      <el-main>
        主要区域
      </el-main>
</el-container>
</el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside' // 引入
// 导出
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
