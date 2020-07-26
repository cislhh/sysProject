<template>
  <div class="container" v-cloak>
    <my-header :titleName="title"></my-header>
    <section>
      <div class="comList" v-for="(item, index) in goodsList" :key="item.index">
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
              <img :src="$imgUrl + item.img" alt />
              <h4 class="title">{{ item.goodsname }}</h4>
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
        <form @click="to_end">去结算{{ allPrice.allNumber }}件</form>
      </div>
    </div>
  </div>
</template>

<script>
import { cartList, cartAdd, cartDelete } from "../../utils/axios";
import { mapGetters, mapActions } from "vuex";
import myHeader from "../titleHeader";
export default {
  data() {
    return {
      title: "购物车",
      checkAll: false,
      goodsList: []
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
    ...mapGetters(["getStateCartList"]),

    allPrice() {
      let sum = 0;
      let allNumber = 0;
      this.goodsList.filter((item, index, arr) => {
        if (item.checked == true) {
          allNumber += item.num;
          sum += item.num * item.price;
        }
      });
      return {
        sum,
        allNumber
      };
    },
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
    this.getActionCartList({ uid: this.getUid });
    this.getList();
  },
  methods: {
    ...mapActions(["getActionCartList"]),
    //获取购物车列表
    getList() {
      cartList({ uid: this.getUid }).then(res => {
        if (res.data.code == 200) {
          res.data.list.forEach(item => {
            item.checked = false;
          });
          this.goodsList = res.data.list;
        }
      });
    },
    del(n) {
      cartDelete({ id: this.getStateCartList[n].id }).then(res => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    //全选后，取消单个复选框的选中状态的同时取消全选状态
    choseAll() {
      this.goodsList.map((item, index) => {
        item.checked = this.checkAll;
      });
    },
    // 数量增加事件
    up(index) {
      this.goodsList[index].num++;
      // console.log(this.goodsList[index].num)
      //当数量变化后，重新提交数据
      this.addShop(index);
    },
    //数量减少事件
    down(index) {
      if (this.goodsList[index].num <= 0) {
        this.goodsList[index].num = 0;
        return;
      }
      this.goodsList[index].num--;
      // console.log(this.goodsList[index].num)
      //当数量变化后，重新提交数据
      this.addShop(index);
    },
    //购物车添加
    addShop(n) {
      cartAdd({
        uid: this.goodsList[n].uid,
        goodsid: this.goodsList[n].goodsid,
        num: this.goodsList[n].num
      }).then(res => {
        if (res.data.code == 200) {
          //再次载入当前数据
          // console.log(this.goodsList[n].num)
          this.getList();
          // console.log(this.goodsList[n].num)
        }
      });
    },
    //前往购物车结算页面
    to_end(){
      this.$router.push({
        path:"/shopCar_end"
      })
    }
  }
};
</script>

<style lang="" scoped>
@import "../../assets/css/shopCar(drop).css";
[v-clock] {
  display: none;
}
</style>
