<template>
  <!-- slot具名插槽 -->
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 label-width-->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:50px"
      label-width="100px"
    >
      <!-- 固定的prop属性 -->
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:40%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor style="height:400px;" v-model="formData.content" type="textarea" :rows="4"></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top:100px">
        <!-- 单选组  v-model="封面类型" -->
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 放置一个封面组件  父组件  => 子组件 props -->
      <cover-image @clickOneImg="receiveImg" :list="formData.cover.images"></cover-image>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- @事件名="方法" =>有默认参数 => 方法()  => 方法() =>一个参数都没有 -->
        <el-button @click="publishArticle()" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义一个channels 接收频道
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 存储的图片的地址
        },
        channel_id: null // 频道id
      },
      // 校验规则对象 min  max
      publishRules: {
        title: [
          { required: true, message: '标题内容不能为空' },
          {
            min: 5,
            max: 30,
            message: '标题长度需要在5到30字符之间'
          }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  // 监测   $route
  watch: {
    $route: function (to, from) {
      // Object.keys将对象中的属性抽出来形成一个数组
      this.getArticleById(to.params.articleId) // 重新拉取数据
      if (Object.keys(to.params).length) {
        //  有参数  => 修改
      } else {
        // 没有参数  => 发布 // 没有参数  => 发布
        this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, //   封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          }
        }
      }
    }
    // 监控type  type一变化就会触发函数,直接默认图片为空，会影响添加图片，所以不用此方法   并把里面的执行代码放到changeType中               嵌套对象中的值   0或-1无图
    // 'formData.cover.type': function (params) {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']// 单图
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']// 三图
    //   }
    // }
  },
  methods: {
    // 接收地址，接收下标
    receiveImg (img, index) {
      //  接收到数据之后 修改 images数组 =>但是images是个数组  ['','','']
      // 有地址 有索引 能不能改images
      // this.formData.cover.images[index] = img // 直接修改数据 是不可以的!
      // Vue响应式原理 响应式数据 => 数据发生变化(要能被Vue监控到) => 视图变化
      // 数组 => 新数组  =>就会触发响应式视图更新 => push/pop/shift/unshift/slice
      //   完整写法  把新数组赋值给原来的数组
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (i === index) {
      //     return img
      //   }
      //   return item
      // })
      // 简写
      this.formData.cover.images = this.formData.cover.images.map((item, i) =>
        i === index ? img : item
      )
    },
    // 切换类型时触发  点击事件
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三图
      }
    },
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    }, // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          // 可以去进行 发布接口调用
          console.log('校验成功')
          let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
          this.$axios({
            // 根据有无articleId判断是添加还是修改及路径
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : `/articles`,
            params: { draft }, // query参数
            data: this.formData
          }).then(result => {
            // 新增成功 => 应该去内容列表
            this.$router.push('/home/articles') // 回到内容列表
          })
        }
      })
    },
    // 获取文章详情通过id
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
    // 获取id 判断有无id  有id 就是修改 没id就是发布
    // 解构赋值
    let { articleId } = this.$route.params // 回去动态路由参数 articleId已经是字符串
    articleId && this.getArticleById(articleId) // 获取文章数据
  }
}
</script>

<style>
</style>
