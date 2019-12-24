<template>
  <!-- 素材管理    基本的页面结构 -->
  <el-card v-loading="loading">
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传按钮 -->
    <el-row type="flex" justify="end">
      <!--  http-request 默认的上传行为，可自定义上传的实现
      show-file-list是否显示上传文件列表-->
      <el-upload action :http-request="uploadImg" :show-file-list="false">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <!-- 全部素材内容   利用v-for遍历-->
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <!--放置el-row而不放div是为了方便布局  -->
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <!-- 收藏   利用v-bind:style  根据收藏状态决定收藏图标的颜色  注册点击事件 -->
              <i
                @click="collectOrCancel(item)"
                :style="{color:item.is_collected?'red':''}"
                class="el-icon-star-on"
              ></i>
              <!-- 删除图标及点击事件   不需要状态所以只传id-->
              <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="收藏素材" name="collect">
        <!-- 收藏素材内容 -->
        <div class="img-list">
          <!-- v-for -->
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 定义一个进度条
      // 默认选中全部
      activeName: 'all',
      list: [], // 接收全部数据
      // 分页
      page: {
        // 专门放置分页数据
        total: 0, // 数据总条数
        pageSize: 9, // 默认每页10条
        currentPage: 1 // 当前页码 默认第一页
      }
    }
  },
  methods: {
    // 删除方法 接收id
    delMaterial (id) {
      // this.$confirm是element-ui里面的一个提示方法  只有点击了确定才会执行then
      this.$confirm('您确定要删除该素材吗').then(() => {
        // 调用删除接口
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          // 重新加载数据
          this.getAllMaterial()
        })
      })
    },
    // 收藏或者取消收藏
    collectOrCancel (row) {
      // 调用收藏或者取消收藏接口
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected // 状态取反  收藏到取消   或者  取消到收藏
        }
      }).then(() => {
        // 当成功时进入then,并且重新加载数据   这里不写result是因为不需要返回结果
        this.getAllMaterial()
      })
    },
    //   上传图片
    uploadImg (params) {
      this.loading = true // 打开进度条
      let form = new FormData()
      // params.file  是formDate类型
      // form.append添加参数
      form.append('image', params.file) // 添加文件到formData
      // 调接口
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: form // formData数据
      }).then(result => {
        //   说明已经上传成功了一张图片
        this.loading = false // 关闭进度条
        this.getAllMaterial()
      })
    },
    changePage (newPage) {
      //  修改当前页码   得到最新页码
      this.page.currentPage = newPage
      this.getAllMaterial()
    },
    // 切换全部/收藏
    changeTab (newPage) {
      // 当切换全部/收藏是，页面应该应该回到第一页   如果不重置第一页 就会直接去找不到对应页码
      this.page.currentPage = 1
      this.getAllMaterial()
    },

    // 获取全部素材
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        // Query数据写在params中     collect:flase查所有
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage, // 当前页码
          per_page: this.page.pageSize
        } // 每页多少条
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取总条数
      })
    }
  },
  created () {
    // 查看全部数据
    this.getAllMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap; //换行
  .img-card {
    width: 200px;
    height: 240px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      width: 100%;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #f4f5f6;
      height: 30px;
      i {
        //鼠标移入后鼠标图标变成小手图标
        cursor: pointer;
      }
    }
  }
}
</style>
