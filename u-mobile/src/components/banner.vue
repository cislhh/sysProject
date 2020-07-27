<template>
  <div class="myBanner">
    <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <a v-for="item in bannerList" :key="item.id">
        <van-swipe-item>
          <img :src="item.imgUrl" class="imgUrl">
        </van-swipe-item>
      </a>
    </van-swipe> -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item ref="bw" class="bannerW"  v-for="item in bannerList" :key="item.id">
        <a>
          <img :src="$imgUrl+item.img" class="imgUrl" />
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {getBannerList} from '../utils/axios'
// import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
      wd:"3.75rem",
      bannerList: [],
    };
  },
  computed: {
    // ...mapGetters(["getStateBannerList"])
  },
  mounted() {
    // this.getActionBannerList();
    this.getBanner();
  },
  methods: {
    // ...mapActions(["getActionBannerList"]),
    getBanner(){
      getBannerList().then(res=>{
        this.bannerList = res.data.list
      })
    }
  },
};
</script>

<style scoped>
@import "../assets/css/index.css";
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 0.2rem;
  line-height: 1.5rem;  /* background-color: #39a9ed; */
}
.imgUrl {
  width: 7.5rem;
  height: 2.91rem;
}


</style>
