<template>
  <div class="container">
    <my-header></my-header>
    <my-nav></my-nav>
    <my-banner></my-banner>
    <my-iconnav></my-iconnav>
    <my-special></my-special>

    <my-list></my-list>
    <my-index></my-index>
  </div>
</template>

<script>
import myHeader from "../header";
import myNav from "../pages/nav";
import myBanner from "../banner";
import myIconnav from "../icon-nav";
import myList from "../comList";
import mySpecial from "../specialBuy";
import myIndex from "../pages/index";
export default {
  data() {
    return {};
  },
  //注册组件
  components: {
    myHeader,
    myNav,
    myBanner,
    myIconnav,
    myList,
    mySpecial,
    myIndex
  }
};
</script>

<style scoped>
@import "../../assets/css/index.css";
</style>
