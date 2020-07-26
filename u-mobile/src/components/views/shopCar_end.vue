<template>
  <div class="container" v-cloak>
    <my-header :titleName="title"></my-header>
    <section>
      <div class="address">
        <div class="wrap">
          <p class="people">收货人：{{getnickname}}<span>10000000000</span></p>
          <p class="ads">
            <span>收货地址：</span>
            <span>北京市海淀区银泉路清林怨6号楼中共教育优就业总部3层</span>
          </p>
          <!-- <img src="images/index_images/arrow.jpg" alt="" /> -->
          <img src="../../assets/images/index_images/arrow.jpg" alt="" />
        </div>
      </div>
      <div class="coms">
        <div class="com wrap">
          <div class="msg">
            <img src="../../assets/images/index_images/shop_4.jpg" alt="" />
            <p class="name">雅诗兰黛护肤霜</p>
            <p class="size">规格：50g</p>
          </div>
          <div class="price"><span>￥</span>120.00</div>
        </div>
        <div class="num wrap">
          <p>购买数量：</p>
          <form>
            <input type="button" value="-" class="btn_add" />
            <input type="text" value="1" class="txt_text" />
            <input type="button" value="+" class="btn_cut" />
          </form>
        </div>
        <div class="post wrap">
          <p>配送方式</p>
          <p>xx快递</p>
        </div>
      </div>
      <div class="price-down">
        <div class="ticket wrap">
          <p>优惠券</p>
          <p>无可用</p>
        </div>
        <div class="point wrap">
          <p>使用积分</p>
          <div>
            <form>
              <input type="text" placeholder="输入积分" class="txt_point" />
              <input type="button" value="使用" class="btn_use" />
            </form>
            <p>可用<span>50</span>积分</p>
          </div>
        </div>
      </div>
      <div class="end">
        <div class="end_price wrap">
          <p>商品金额</p>
          <p>￥68.00</p>
        </div>
        <div class="end_psot wrap">
          <p>运费</p>
          <p>+￥0.00</p>
        </div>
        <div class="end_ticket wrap">
          <p>优惠券</p>
          <p>-￥0.00</p>
        </div>
        <div class="end_svip wrap">
          <p>会员优惠</p>
          <p>-￥0.00</p>
        </div>
        <div class="end_point wrap">
          <p>积分抵扣</p>
          <p>-￥0.00</p>
        </div>
      </div>
      <div class="finalPrice">
        <div class="wrap">
          <p>实付金额：<span>￥68.00</span></p>
        </div>
      </div>
      <div class="submit">
        <div class="wrap">
          <form>
            <input type="submit" value="提交订单" class="sub_post" />
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import myHeader from "../titleHeader";
export default {
  data() {
    return {
      title: "确认订单",
    };
  },
  components: {
    myHeader
  },
  computed: {
    //封装获取uid
    getnickname() {
      let data = "";
      data = sessionStorage.getItem("userInfo")
        ? JSON.parse(sessionStorage.getItem("userInfo"))
        : "";
      return data.nickname;
    }
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/shopCar_end.css";
[v-clock] {
  display: none;
}
</style>
