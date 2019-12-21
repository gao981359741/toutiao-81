<template>
  <!-- 卡片组件 -->
  <el-card>
<!-- 调用面包屑 -->
<bread-crumb slot="header">
 <template slot="title">评论列表</template>
</bread-crumb>
  <!-- body内容 -->
       <el-table>
   <!-- 列组件 label 表头-->
         <el-table-column  width="600" label="标题"></el-table-column>
         <el-table-column label="评论状态"></el-table-column>
         <el-table-column label="总评论数"></el-table-column>
         <el-table-column label="粉丝评论数"></el-table-column>
         <el-table-column label="操作"></el-table-column>
       </el-table>
 </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
