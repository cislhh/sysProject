<template>
  <div class="sale">
    <left></left>
    <right></right>
  </div>
</template>

<script>
import left from "./specialBuy_left";
import right from "./specialBuy_right";
export default {
  data() {
    return {};
  },
  components: {
    left,
    right
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>