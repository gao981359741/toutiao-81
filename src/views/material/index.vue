<template>
<!-- 素材管理    基本的页面结构 -->
  <el-card>
      <!-- 面包屑组件 -->
      <bread-crumb slot="header">
         <template slot="title">素材管理</template>
      </bread-crumb>

        <el-tabs v-model="activeName"  @tab-click="changeTab">
          <el-tab-pane label="全部素材" name="all">
              <div class="img-list">
              <!-- 全部素材内容   利用v-for遍历-->
            <el-card class='img-card' v-for="item in list" :key="item.id">
              <img :src="item.url" alt="">
                <!--放置el-row而不放div是为了方便布局  -->
              <el-row class='operate' type='flex' align="middle" justify="space-around" >
                        <i class='el-icon-star-on'></i>
                        <i class='el-icon-delete-solid'></i>
              </el-row>
            </el-card>
             </div>
          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect">
              <!-- 收藏素材内容 -->
                 <div class="img-list">
                <!-- v-for -->
                 <el-card class='img-card' v-for="item in list" :key="item.id">
                     <img :src="item.url" alt="">
                 </el-card>
              </div>

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
    // 切换全部/收藏
    changeTab () {
      this.getAllMaterial()
    },

    // 获取全部素材
    getAllMaterial () {
      this.$axios({
        url: '/user/images',
        // Query数据写在params中     collect:flase查所有
        params: { collect: this.activeName === 'collect' }
      }).then(result => {
        this.list = result.data.results
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
  .img-list{
    display: flex;
    flex-wrap: wrap; //换行
    .img-card{
       width: 200px;
      height:240px;
      margin: 20px 50px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      .operate {
             width: 100%;
             font-size:20px;
             position: absolute;
             bottom: 0;
             left:0;
             background-color: #f4f5f6;
             height:30px;
         }
    }
  }

</style>
