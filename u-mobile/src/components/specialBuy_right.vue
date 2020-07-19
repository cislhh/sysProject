<template>
  <div class="right">
    <div class="top">
      <a href="#" class="new">
        <h4>品牌上新</h4>
        <span>折</span>
        <p>每日9点 抢大牌</p>
        <img src="../assets/images/index_images/brand.jpg" alt />
        <img :src=imgUrl_zk alt class="right_img" />
      </a>
    </div>
    <div class="under">
      <a href="#" class="dayTen">
        <h4>每日十件</h4>
        <p>只为你选好货</p>
        <img :src=imgUrl_gd alt />
      </a>
      <a href="#" class="pinA">
        <h4>拼啊</h4>
        <p>超级好价拼团</p>
        <img :src=imgUrl_pt alt />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl_zk:require("../assets/images/index_images/shop_1.jpg"),
      imgUrl_gd:require("../assets/images/index_images/shop_2.jpg"),
      imgUrl_pt:require("../assets/images/index_images/shop_3.jpg")
    };
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>