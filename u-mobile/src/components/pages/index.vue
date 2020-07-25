<template>
  <div>
    <transition enter-active-class="animate__animated animate__bounceInRight">
      <!-- 定义二级路由出口 -->
      <router-view></router-view>
    </transition>
    <footer class="footer">
      <van-tabbar route>
        <van-tabbar-item class="icon"  to="/content">
          <span class="iconfont icon-zhuye"></span>
          <p>首页</p>
        </van-tabbar-item>
        <van-tabbar-item class="icon"  to="/shopCar">
          <span class="iconfont icon-gouwuchezhengpin"></span>
          <p>购物车</p>
        </van-tabbar-item>
        <van-tabbar-item class="icon"   to="/my">
          <span class="iconfont icon-tubiaozhizuomoban"></span>
          <p>我的</p>
        </van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="" scoped>
@import "../../assets/css/footer.css";
.active {
  color: orangered !important;
}
</style>
