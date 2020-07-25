<template>
  <div class="container" v-cloak>
    <my-header :titleName="title"></my-header>
    <section>
      <div class="comList" v-for="(item, index) in goodsList" :key="item.id">
        <div class="wrap">
          <form>
            <input
              type="checkbox"
              name="check"
              value="123"
              class="check"
              v-model="item.checked"
            />
            <!-- <span></span> -->
            <div class="msg">
              <img :src="item.img" alt />
              <h4 class="title">{{ item.name }}</h4>
              <p class="size">{{ item.size }}</p>
              <p class="price">￥{{ item.price }}</p>
            </div>
            <div class="btn_num">
              <input type="button" value="-" @click="down(index)" />
              <input type="text" v-model="item.num" />
              <input type="button" value="+" @click="up(index)" />
            </div>
            <input
              type="button"
              value="删除"
              class="btn_delete"
              @click="del(index)"
            />
          </form>
        </div>
      </div>
    </section>
    <div class="close">
      <div class="msg">
        <form>
          <input
            type="checkbox"
            name="allCheck"
            id="allCheck"
            class="allCheck"
            v-model="checkAll"
            @change="choseAll"
          />
          <span>全选</span>
        </form>
        <div class="msg_final">
          <p class="allPrice">
            总计：
            <span>{{ allPrice.sum.toFixed(2) }}</span>
          </p>
          <p class="cutPrice">
            <span>不含运费</span>，已优惠
            <span>￥0.00</span>
          </p>
        </div>
      </div>
      <div class="end">
        <!-- 去结算({{allNum}}件) -->
        <form>去结算{{ allPrice.allNumber }}件</form>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from "../titleHeader";
export default {
  data() {
    return {
      title:"购物车",
      checkAll: false,
      goodsList: [
        {
          id: 1,
          name: "大衣",
          img: require("../../assets/images/index_images/shop_1.jpg"),
          price: 998,
          num: 10,
          size: "珍珠白",
          checked: true
        },
        {
          id: 2,
          name: "夹克",
          img: require("../../assets/images/index_images/shop_2.jpg"),
          price: 98,
          num: 1,
          size: "钢琴黑",
          checked: false
        },
        {
          id: 3,
          name: "手巾",
          img: require("../../assets/images/index_images/shop_3.jpg"),
          price: 88,
          num: 7,
          size: "粉嫩红",
          checked: false
        }
      ]
    };
  },
  components: {
    myHeader
  },
  watch: {
    // 单选判断
    // 判断一下选中的数据的长度是否等于总数据的长度
    goodsList: {
      handler(val) {
        this.checkAll = this.goodsList.every(item => item.checked);
      },
      deep: true
    }
  },
  computed: {
    allPrice() {
      let sum = 0;
      let allNumber = 0;
      this.goodsList.filter((item,index,arr)=>{
        if(item.checked==true){
          allNumber+=item.num;
          sum+=item.num*item.price;
        }
      })
      return {
        sum,
        allNumber
      };
    },
  },

  methods: {
    del(n) {
      this.goodsList.splice(n, 1);
    },
    //全选后，取消单个复选框的选中状态的同时取消全选状态
    choseAll() {
      this.goodsList.map((item, index) => {
        item.checked = this.checkAll;
      });
    },

    //数量减少事件
    up(index) {
      this.goodsList[index].num++;
    },
    // 数量增加事件
    down(index) {
      if (this.goodsList[index].num <= 0) {
        this.goodsList[index].num = 0;
        return;
      }
      this.goodsList[index].num--;
    }
  }
};
</script>

<style lang="" scoped>

@import "../../assets/css/shopCar(drop).css";
[v-clock]{
  display: none;
}
</style>
