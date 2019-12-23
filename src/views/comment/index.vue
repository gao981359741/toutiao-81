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
          <!-- 注册点击事件  传递参数  相当于把数据传过来 -->
          <el-button
            type="text"
            size="small"
            @click="openOrClose(obj.row)"
          >{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
    },
    // 打开或者关闭评论
    openOrClose (row) {
      // 当前评论状态
      let mess = row.comment_status ? '打开' : '关闭'
      // $confirm 确定时  进入then 取消时进入catch
      this.$confirm(`您是否确定要${mess}评论吗`).then(result => {
        // 用户确定要调用接口
        // 地址参数/query参数/url参数/路由参数 => 可以在params中写 也可以直接拼接到url地址上
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            // 对象装换成字符串
            article_id: row.id.toString()
          },
          // 请求体放在data中
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          // 打开或者关闭评论成功之后
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment() // 重新请求列表
        })
      })
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
