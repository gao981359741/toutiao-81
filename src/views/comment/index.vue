<template>
  <!-- 卡片组件 -->
  <el-card>
    <!-- 调用面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- body内容    :data='list'模仿element-ui里的table表格  -->
    <el-table :data="list">
      <!-- 列组件 label 表头-->
      <el-table-column prop="title" width="200" label="标题"></el-table-column>
      <!-- 由于评论状态无法显示  把布尔值转换成能显示的
      formatter是组件中列的属性，后面跟方法，所以在methods中定义一个方法-->
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!--    作用域插槽  row column $index-->
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 创建一个请求后台数据的方法
    getComment () {
      // axios默认是get类型  所以当method是get类型时，可以不写
      // query也就是查询参数也叫路由参数 地址参数 get参数   一般给params
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results // 获取当前列表数据中本身的data
      })
    },
    // 定义一个布尔值转化方法
    formatterBool (row, column, cellValue, index) {
      // row  当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index  当前下标
      // 必须有返回值
      return cellValue ? '正常' : '关闭'
    }
  },
  // 创建
  created () {
    // 调用请求数据的方法
    this.getComment()
  }
}
</script>

<style>
</style>
