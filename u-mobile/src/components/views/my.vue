<template>
  <div class="container">
    <my-header :titleName="title"></my-header>

    <section class="mySelf">
            <div class="wrap">
                <div class="msg clearfix">
                    <img src="../../assets/images/index_images/myself.jpg" alt="">
                    <p class="name">悠朔</p>
                    <p class="level">V1</p>
                </div>
                <form>
                    <input type="button" value="每日签到" class="btn_day">
                </form>
            </div>
        </section>
        <nav class="menu">
            <div class="wrap">
                <div>
                    <img src="../../assets/images/index_images/icon_tel.jpg" alt="">
                    <p>全部订单</p>
                </div>
                <div>
                    <img src="../../assets/images/index_images/icon_money.jpg" alt="">
                    <p>待付款</p>
                </div>
                <div>
                    <img src="../../assets/images/index_images/icon_car.jpg" alt="">
                    <p>待收货</p>
                </div>
            </div>
        </nav>
        <section class="myList">
            <div>
                <a href="#" class="wrap">
                    <i>
                        <img src="../../assets/images/index_images/icon_myAddress.jpg" alt="">
                    </i>
                    <span>地址管理</span>
                    <img src="../../assets/images/index_images/arrow.jpg" class="arrow" alt="">
                </a>
            </div>
            <div>
                <a href="#" class="wrap">
                    <i>
                        <img src="../../assets/images/index_images/icon_myMoney.jpg" alt="">
                    </i>
                    <span>我的钱包</span>
                    <img src="../../assets/images/index_images/arrow.jpg" class="arrow" alt="">
                </a>
            </div>
            <div>
                <a href="#" class="wrap">
                    <i>
                        <img src="../../assets/images/index_images/icon_myTicket.jpg" alt="">
                    </i>
                    <span>我的优惠券</span>
                    <img src="../../assets/images/index_images/arrow.jpg" class="arrow" alt="">
                </a>
            </div>
            <div>
                <a href="#" class="wrap">
                    <i>
                        <img src="../../assets/images/index_images/icon_myCode.jpg" alt="">
                    </i>
                    <span>我的二维码</span>
                    <img src="../../assets/images/index_images/arrow.jpg" class="arrow" alt="">
                </a>
            </div>
            <div>
                <a href="#" class="wrap">
                    <i>
                        <img src="../../assets/images/index_images/icon_myPointer.jpg" alt="">
                    </i>
                    <span>我的小伙伴</span>
                    <img src="../../assets/images/index_images/arrow.jpg" class="arrow" alt="">
                </a>
            </div>
        </section>
  </div>
</template>

<script>
import myHeader from "../titleHeader";
export default {
  data() {
    return {
      title:"我的主页",
    };
  },
  components: {
    myHeader
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/mySelf.css";
</style>
