<template>
  <div id="app">
    <!-- <my-con></my-con> -->
      <router-view></router-view>
  </div>
</template>

<script>
//引入组件

import myCon from "./components/views/content";

export default {
  data() {
    return {};
  },
  //注册组件
  components: {
    myCon
  }
};
</script>

<style scoped></style>
