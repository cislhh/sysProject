<template>
  <div class="bg-login">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm login"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" show-password clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getuserLogin } from "../../utils/axios";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调取登录接口
          getuserLogin(this.userInfo).then(res => {
            // console.log(res,"返回信息")
            if (res.data.code == 200) {
              //登录成功跳转到home页面
              this.$message.success(res.data.msg);
              //把登录信息存储到本地存储中
              sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl'
.bg-login
    width 100vw
    height 100vh
    background $bgColorFirst

    .login
        background $bgColorDefault
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        padding 50px
        width 400px
        height 200px
        border-radius 15px
</style>
