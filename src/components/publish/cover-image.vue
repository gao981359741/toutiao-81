<template>
  <div class='cover-image'>
      <!-- 根据封面的images长度 进行渲染 一个或者3个或者不渲染   当点击事件发生时弹层显示-->
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class='cover-item'>
         <!-- <img src="../../assets/img/pic_bg.png" alt=""> -->
         <img :src="item?item:defaultImg" alt="">
      </div>
      <!-- 生成的元素在body上  用visible控制  显示为true   隐藏为flase
      @close相当于一个点击事件 -->
      <el-dialog @close='closeDialog' :visible="dialogVisible">
        <!-- 放置选择素材组件 -->
        <!-- 监听谁的事件 就在谁的标签上写监听 -->
        <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性  props只能读，不能改
  data () {
    return {
      dialogVisible: false, // 控制弹层隐藏或显示的变量
      defaultImg: require('../../assets/img/pic_bg.png')// 将图片变成变量
    }
  },
  methods: {
    // 接收方法
    receiveImg (img) {
      // 接收数据之后 发现 list为props数据 要想修改需要再次传递  子传父
      // this.selectIndex拿到下标
      this.$emit('clickOneImg', img, this.selectIndex) // 再次触发一个自定义事件
      this.closeDialog()
    },
    // 弹层显示  传下标  根据点击触发的下标来确定更换的是哪张图片
    openDialog (index) {
      this.selectIndex = index// 记住点击的下标
      this.dialogVisible = true// 点击事件发生时弹层显示
    },
    // 弹层隐藏
    closeDialog () {
      this.dialogVisible = false// 点击事件发生时弹层隐藏
    }
  }

}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin:20px 0;
    margin-left: 100px;
     .cover-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 10px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
