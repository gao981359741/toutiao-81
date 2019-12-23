<template>
<!-- 素材管理    基本的页面结构 -->
  <el-card>
      <!-- 面包屑组件 -->
      <bread-crumb slot="header">
         <template slot="title">素材管理</template>
      </bread-crumb>

        <el-tabs v-model="activeName">
          <el-tab-pane label="全部素材" name="all">
              <!-- 全部素材内容 -->
            {{list}}
          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect">
              <!-- 收藏素材内容 -->
          </el-tab-pane>

      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 默认选中全部
      activeName: 'all',
      list: []// 接收全部数据
    }
  },
  methods: {
    // 获取全部素材
    getAllMaterial () {
      this.$axios({
        url: '/user/image',
        // Query数据写在params中
        params: { collect: false }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getAllMaterial()
  }
}
</script>

<style>
</style>
