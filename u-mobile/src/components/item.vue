<template>
  <div class="myHeader">
    <header class="header">
      <div class="wrap">
        <h1>
          <a href="#">
            <img :src="imgLogo" alt />
          </a>
        </h1>
        <input type="text" placeholder="寻找商品" />
        <div class="points">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgLogo: require("../assets/images/index_images/logo.jpg")
    };
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>