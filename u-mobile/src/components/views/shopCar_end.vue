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
        <div class="com wrap" v-for="item in endList" :key="item.goodsid">
          <div class="msg">
            <img :src=$imgUrl+item.img alt="" />
            <p class="name">{{item.goodsname}}</p>
          </div>
          <div>
            <div class="price"><span>￥</span>{{item.price}}</div>
            <p class="endNum">购买数量：<span>{{item.num}}</span></p>
          </div>
          
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
          <p>￥{{endPrice}}</p>
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
          <p>实付金额：<span>￥{{endPrice}}</span></p>
        </div>
      </div>
      <div class="submit">
        <div class="wrap">
          <form>
            <input type="submit" value="提交订单" class="sub_post" @click="toHome"/>
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
      endList:[]
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
    },
    //总金额
    endPrice(){
        let num = 0;
        this.endList.map(item=>{
            num+=item.num*item.price
        })
        return num
    }
  },
  mounted() {
      //组件一加载就获取购物车传递过来的列表
      this.getCarList()
  },
  methods: {
      //获取session中储存的购物车列表信息
    getCarList(){
        let data = "";
        data = sessionStorage.getItem("userBuy")?JSON.parse(sessionStorage.getItem("userBuy")):"";
        this.endList = data;
    },

    toHome(){
        this.$router.push({
            path:"/content"
        })
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
