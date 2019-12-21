<template>
  <div class="login">
    <!-- 放入卡片组件 -->
    <el-card class="login-card">
      <!-- 黑马logo -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 下面的登录表单  给el-from绑定model属性   rules属性绑定验证规则对象-->
      <el-form ref="myForm" style="margin-top:20px"  :model="loginForm" :rules='loginRules'>
        <!-- 表单域  er-from-item-->
        <el-form-item prop="mobile">
          <!-- 放置具体的组件  登录手机号-->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input style="width:63%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录 -->
         <el-form-item >
             <!-- 注册点击事件 -->
             <el-button @click="submiteLogin" style="width:100%" type="primary">登录</el-button>
         </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // 第一步  在data中定义表单数据
  data () {
    return {
      // 定义表单数据对象

      loginForm: {
        // 手机号
        mobile: '',
        // 验证码
        code: '',
        // 是否勾选
        check: false
      },
      loginRules: {
        // 验证规则  key(字段名)：value(数组)
        // required：true--必须写
        // pattern正则表达式
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'
        }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/,
          message: '验证码格式不正确' }],
        // 自定义函数
        check: [{ validator: function (rule, value, callback) {
          // rule 当前的规则    可以忽略
          // value指我们要效验的字段的值
          if (value) {
            // 效验通过  执行callback
            callback()
          } else {
            // 认为不通过  并提示信息  固定写法
            callback(new Error('请同意协议'))
          }
        } }]

      }
    }
  },
  methods: {
    submiteLogin () {
      // el-form实例
      this.$refs.myForm.validate((isOK) => {
        // 认为前端效验登录表单成功  发送去登录请求地址
        if (isOK) {
          console.log('成功')

          this.$axios({
            url: '/authorizations', // 请求地址
            method: 'post', // 请求类型
            data: this.loginForm
            // 成功后进入then
          }).then(result => {
            // localStorage本地缓存  特点：关闭浏览器数据不会消失，除非手动删除数据
            window.localStorage.setItem('user-token', result.data.token)// 获取前端缓存令牌
            this.$router.push('/home')// 跳转到主页
            // 失败后进入catch
          }).catch(error => {
            console.log(error)
            // message是elementUI的方法
            this.$message({
              message: '您的手机号或验证码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
//如果需要在style里面用less方法写样式就需要加一个lang属性
//写上scoped属性，那么只对当前的组件样式产生作用
//原理：为当前的标签生成了  data-v随机数
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  background-size: cover; //自适应背景图片
  height: 100vh; //100vh相当于当前可视区域100%高度
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    height: 320px;
    width: 420px;
    .title {
      text-align: center;
      img {
        height: 30px;
      }
    }
  }
}
</style>
