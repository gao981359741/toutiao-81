<template>
  <div class="login">
    <!-- 放入卡片组件 -->
    <el-card class="login-card">
      <!-- 黑马logo -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 下面的登录表单 -->
      <el-form style="margin-top:20px">
        <!-- 表单域  er-from-item-->
        <el-form-item>
          <!-- 放置具体的组件  登录手机号-->
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <el-input style="width:63%" placeholder="请输入验证码"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录 -->
         <el-form-item>
             <el-button style="width:100%" type="primary">登录</el-button>
         </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
