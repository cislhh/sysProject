<template>
  <div>
    <transition enter-active-class="animate__animated animate__bounceInRight">
      <!-- 定义二级路由出口 -->
    <router-view></router-view>
    </transition>
    <footer class="footer">
      <div>
        <router-link activeClass="active" to="/content" class="icon">
          <span class="iconfont icon-zhuye"></span>
          <p>首页</p>
        </router-link>
        <router-link activeClass="active" to="/shopCar" class="icon">
          <span class="iconfont icon-gouwuchezhengpin"></span>
          <p>购物车</p>
        </router-link>
        <router-link activeClass="active" to="/my" class="icon">
          <span class="iconfont icon-tubiaozhizuomoban"></span>
          <p>我的</p>
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
};
</script>

<style lang="" scoped>
@import "../../assets/css/footer.css";
.active {
  color: orangered !important;
}

</style>