<template>
  <div class="left">
    <a href="#">
      <h3><img src="../assets/images/index_images/timer.jpg" />限时秒杀</h3>
      <p class="des">每天零点场 好货秒不停</p>
      <p class="time">
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="item">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="item">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="item">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
        <i>秒杀</i>
      </p>
      <img class="pic" src="../assets/images/index_images/shop_5.jpg" alt />
      <div class="price">
        ￥
        <span>14.8</span>
      </div>
    </a>
  </div>
</template>

<script>
// import { CountDown } from 'vant';
import { getseckill } from "../utils/axios";
export default {
  data() {
    return {
      time: 86399000,
      start: 0,
      end: 0,
      seckillList: []
    };
  },
  mounted() {
    this.Seckill();
  },
  methods: {
    Seckill() {
      getseckill().then(res => {
        if (res.data.code == 200) {
          this.start = new Date().getTime();
          this.end = res.data.list[0].endtime;
          this.time = this.end-this.start;
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
.item {
  display: inline-block;
  width: .35rem;
  margin-right: .05rem;
  color: #fff;
  font-size: .12rem;
  text-align: center;
  background-color: #333;
  border-radius: 0.05rem;
}
.colon {
    display: inline-block;
    color: #ee0a24;
  }
</style>
