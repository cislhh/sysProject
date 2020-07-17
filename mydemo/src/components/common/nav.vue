<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/user">用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/goods">商品管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        defaultActive:"/home"
    };
  },
  mounted(){
      //组件挂载，更改选中默认值
      this.defaultActive=this.$route.path
  }
};
</script>

<style lang="stylus" scoped>
.el-menu
    min-height 600px
</style>
