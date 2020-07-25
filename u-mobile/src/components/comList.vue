<template>
  <div class="myList">
    <div class="com" id="comList">
      <div class="com_nav wrap">
        <ul class="clearfix">
          <li
            :class="[num == titleIndex ? 'active' : '']"
            v-for="(item, titleIndex) in comTile"
            @click="touchNow(titleIndex)"
            :key="titleIndex"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="com_list wrap">
        <a class="list" v-for="item in comArr" :key="item.id" @click="toComMsg(item.id)">
          <img :src="$imgUrl + item.img" alt />
          <div class="msg">
            <h4>{{ item.goodsname }}</h4>
            <p class="price">￥{{ item.price }}</p>
            <p class="num">已售{{ item.market_price }}件</p>
            <form>
              <input type="button" value="立即抢购" class="btn" />
            </form>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndexGoods } from "../utils/axios";
// import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      num: 0,
      comTile: ["热门推荐", "发现好货", "只看专场"],
      comArr: []
    };
  },
  computed: {
    // ...mapGetters(["getStateIndexGoodsList"])
  },
  mounted() {
    // this.getActionIndexGoodsList();
    this.touchNow(this.num);
  },
  methods: {
    // ...mapActions(["getActionIndexGoodsList"]),
    touchNow(i) {
      this.num = i;
      // this.comArr = this.getStateIndexGoodsList[this.num].content;
      getIndexGoods().then(res=>{
        if(res.data.code==200){
          this.comArr = res.data.list[this.num].content;
        }
      })
    },
    toComMsg(id){
      this.$router.push({
        path:"/comMsg",
        query:{
          id
        }
      })
    }
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>
