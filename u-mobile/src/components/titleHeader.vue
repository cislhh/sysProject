<template>
  <div>
    <header class="header">
      <div class="wrap"  >
        <i @click='goHome'>
          <img
            src="../assets/images/index_images/icon_back.jpg"
            alt
            class="icon_back"
          />
        </i>
        <h4>{{titleName}}</h4>
        <i>
          <img
            src="../assets/images/index_images/icon_more.jpg"
            alt
            class="icon_more"
          />
        </i>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  props:["titleName"],
  methods: {
    goHome(){
      this.$router.replace("/content")
    }
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/head.css";
</style>
