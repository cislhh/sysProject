<template>
  <div class="bg-login">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm login"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userInfo.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="userInfo.pass" show-password clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        pass: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        pass: [
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
          if (this.userInfo.name == "admin" && this.userInfo.pass == "123456") {
            //登录成功跳转到home页面
            this.$message.success("登陆成功");
            this.$router.push("/home");
          } else {
            this.$message.error("用户名或者密码错误");
          }
        } else {
          this.$message.error("请正确输入信息");
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
