<template>
  <div class="myBanner">
    <div class="banner">
      <a href="#" v-for="item in bannerList" :key="item.id">
        <img :src=item.imgUrl alt />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList:[{
          id:1,
          imgUrl:require("../assets/images/index_images/banner.jpg")
      },
      {
          id:2,
          imgUrl:require("../assets/images/index_images/banner.jpg")
      },
      {
          id:3,
          imgUrl:require("../assets/images/index_images/banner.jpg")
      }]
    };
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>