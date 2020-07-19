<template>
  <div class="myHeader">
    <header class="header">
      <div class="wrap">
        <h1>
          <a >
            <img :src="imgLogo" alt />
          </a>
        </h1>
        <input type="text" placeholder="寻找商品" v-model="queryList" @keyup.enter="goqueryList(queryList)"/>
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
      queryList:"",
      imgLogo: require("../assets/images/index_images/logo.jpg")
    };
  },
  methods: {
    goqueryList(pl){
      this.$router.push({
        path:"/queryList",
        query:{
          pl
        }
      })
    }
  },
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>