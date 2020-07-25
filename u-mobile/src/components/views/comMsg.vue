<template>
  <div class="container">
    <my-header :titleName="title"></my-header>
    <div class="banner">
      <img
        :src="$imgUrl + item.img"
        v-for="item in getStateGoodsInfo"
        :key="item.id"
      />
    </div>
    <div class="comTitle">
      <div class="wrap">
        <p class="name" v-if="getStateGoodsInfo[0]">
          {{ getStateGoodsInfo[0].goodsname }}
        </p>
        <p class="price" v-if="getStateGoodsInfo[0]">
          ￥{{ getStateGoodsInfo[0].price }}
          <span>(此价格不与套装优惠同时享受)</span>
        </p>
      </div>
    </div>
    <div class="comMenu">
      <div class="activity wrap">
        <p>促销:<span>满减</span>满2件9折；3件8折</p>
        <a href="#"><img src="images/index_images/arrow.jpg" alt=""/></a>
      </div>
      <div class="number wrap">
        <p>购买数量</p>
        <form>
          <van-stepper v-model="value" />
        </form>
      </div>
      <div class="size wrap">
        <div>
          <p class="size_title">商品属性</p>
          <p class="size_num">
            规格
            <span v-for="item in getStateGoodsInfo" :key="item.id">{{
              item.specsattr
            }}</span>
          </p>
        </div>
        <img src="images/index_images/arrow.jpg" alt="" />
      </div>
    </div>
    <div class="comMsg">
      <p class="wrap">商品详情</p>
      <img src="../../assets/images/index_images/banner_2.jpg" alt="" />
      <img src="../../assets/images/index_images/banner_3.jpg" alt="" />
      <img src="../../assets/images/index_images/banner_4.jpg" alt="" />
    </div>
    <div class="comAssess">
      <p class="title wrap">
        商品评价
      </p>
      <div class="user wrap">
        <p class="userName" v-if="getStateGoodsInfo[0]">
          {{ getStateGoodsInfo[0].goodsname }}
        </p>
        <p
          class="userMsg"
          v-if="getStateGoodsInfo[0]"
          v-html="getStateGoodsInfo[0].description"
        ></p>
        <div class="userImg">
          <img src="../../assets/images/index_images/user_1.jpg" alt="" />
          <img src="../../assets/images/index_images/user_2.jpg" alt="" />
          <img src="../../assets/images/index_images/user_3.jpg" alt="" />
        </div>
        <p class="userTime">2020-01-13</p>
      </div>
      <div class="more wrap">
        <p>共<span>1000+</span>条评论</p>
        <a href="#">查看更多</a>
      </div>
    </div>
    <footer class="footer">
      <van-goods-action>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          badge=""
          :to="{
            path: '/shopCar'
          }"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addShop"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import myHeader from "../titleHeader";
import { mapGetters, mapActions } from "vuex";
import { cartAdd, cartDelete } from "../../utils/axios";
import { Notify } from 'vant';
export default {
  data() {
    return {
      title: "商品详情",
      listArr: [],
      value: 1
    };
  },
  components: {
    myHeader
  },
  computed: {
    ...mapGetters(["getStateGoodsInfo"]),
    //封装获取uid
    getUid() {
      let data = "";
      data = sessionStorage.getItem("userInfo")
        ? JSON.parse(sessionStorage.getItem("userInfo"))
        : "";
      return data.uid;
    }
  },
  mounted() {
    this.getActionGoodsInfo({ id: this.$route.query.id });
  },
  methods: {
    ...mapActions(["getActionGoodsInfo"]),
    //购物车添加
    addShop() {
      cartAdd({
        uid: this.getUid,
        goodsid: this.getStateGoodsInfo[0].id,
        num: this.value
      }).then(res => {
        if (res.data.code == 200) {
          Notify({ type: "success", message: "购物车添加成功" });
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
@import "../../assets/css/comMsg.css";
</style>
