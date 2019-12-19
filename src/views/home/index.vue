<template>
<!-- 因为用了elementUI，所以用他的标签 -->
<!-- 放置一个最外面的容器 -->
<el-container>
  <!-- 先左右布局  再把右边做上下布局-->
<el-aside>左侧</el-aside>
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
export default {

}
</script>

<style>

</style>
