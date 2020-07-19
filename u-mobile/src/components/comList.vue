<template>
  <div class="myList">
    <div class="com" id="comList">
      <div class="com_nav wrap">
        <ul class="clearfix">
          <li
            :class="[num==titleIndex?'active':'']"
            v-for="(item,titleIndex) in comTile"
            @click="touchNow(titleIndex)"
           :key="titleIndex">{{item}}</li>
        </ul>
      </div>
      <div class="com_list wrap">
        <a class="list" v-for="(item,comIndex) in comArr[0].comList" :key="comIndex">
          <img :src=item.imgUrl alt />
          <div class="msg">
            <h4>{{item.com_title}}</h4>
            <p class="price">￥{{item.com_price}}</p>
            <p class="num">已售{{item.com_num}}件</p>
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
export default {
  data() {
    return {
      num: 0,
      comTile: ["热门推荐", "发现好货", "只看专场", "只看商品"],
      comArr: [
        {
          comList: [
            {
              imgUrl: require("../assets/images/index_images/shop_4.jpg"),
              com_title: "雅诗兰黛染发膏30ml",
              com_price: "23.00",
              com_num: "10"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_5.jpg"),
              com_title: "毛巾",
              com_price: "12.00",
              com_num: "8450"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_4.jpg"),
              com_title: "雅诗兰黛染发膏1200ml",
              com_price: "13.00",
              com_num: "80"
            }
          ]
        }
      ],
      comAll: [
        {
          comList: [
            {
              imgUrl: require("../assets/images/index_images/shop_4.jpg"),
              com_title: "雅诗兰黛染发膏30ml",
              com_price: "23.00",
              com_num: "10"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_5.jpg"),
              com_title: "毛巾",
              com_price: "12.00",
              com_num: "8450"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_4.jpg"),
              com_title: "雅诗兰黛染发膏1200ml",
              com_price: "13.00",
              com_num: "80"
            }
          ]
        },
        {
          comList: [
            {
              imgUrl: require("../assets/images/index_images/shop_5.jpg"),
              com_title: "毛巾",
              com_price: "12.00",
              com_num: "8450"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_4.jpg"),
              com_title: "雅诗兰黛染发膏30ml",
              com_price: "23.00",
              com_num: "10"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_4.jpg"),
              com_title: "雅诗兰黛染发膏1200ml",
              com_price: "13.00",
              com_num: "80"
            }
          ]
        },
        {
          comList: [
            {
              imgUrl: require("../assets/images/index_images/shop_4.jpg"),
              com_title: "雅诗兰黛染发膏30ml",
              com_price: "23.00",
              com_num: "10"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_5.jpg"),
              com_title: "毛巾",
              com_price: "12.00",
              com_num: "8450"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_5.jpg"),
              com_title: "毛巾",
              com_price: "12.00",
              com_num: "8450"
            }
          ]
        },
        {
          comList: [
            {
              imgUrl: require("../assets/images/index_images/shop_5.jpg"),
              com_title: "毛巾",
              com_price: "12.00",
              com_num: "8450"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_5.jpg"),
              com_title: "毛巾",
              com_price: "12.00",
              com_num: "8450"
            },
            {
              imgUrl: require("../assets/images/index_images/shop_5.jpg"),
              com_title: "毛巾",
              com_price: "12.00",
              com_num: "8450"
            }
          ]
        }
      ]
    };
  },

  methods: {
    touchNow(i) {
      this.num = i;
      // this.comArr.unshift(this.comAll[this.num])
      this.comArr.splice(0, 1, this.comAll[this.num]);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>