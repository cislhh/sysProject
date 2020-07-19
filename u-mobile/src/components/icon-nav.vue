<template>
  <div class="myIconnav">
    <div class="icon-nav">
            <div class="item" v-for="item in conNavList" :key="item.id">
                <a href="#">
                    <img :src=item.imgUrl alt="">
                    <p>
                        {{item.title}}
                    </p>
                </a>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conNavList:[{
          id:1,
          title:"限时抢购",
          imgUrl:require("../assets/images/index_images/icon_1.jpg")
      },
      {
          id:2,
          title:"积分商城",
          imgUrl:require("../assets/images/index_images/icon_2.jpg")
      },
      {
          id:3,
          title:"联系我们",
          imgUrl:require("../assets/images/index_images/icon_3.jpg")
      },
      {
          id:4,
          title:"商品分类",
          imgUrl:require("../assets/images/index_images/icon_4.jpg")
      }]
    };
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>