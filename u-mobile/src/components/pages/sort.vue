<template>
  <div class="container">
    <my-header :titleName="title"></my-header>
    <section class="com">
      <div class="lists">
        <van-sidebar v-model="$route.query.index">
          <van-sidebar-item
            :title="item.catename"
            v-for="(item, index) in getStateCateList"
            :key="item.id"
            v-model="$route.query.fid"
            :to = "{path: '/sort',query: {
                catename:item.catename,
                index
            }}"
            @click="getgoodsList(index)"
          />
        </van-sidebar>
      </div>
      <div class="coms">
        <div class="top">
          <h5>{{ $route.query.catename }}</h5>
          <a href="#">更多</a>
        </div>
        <div class="body">
          <div class="com_list" v-for="(item, index) in listArr" :key="item.id">
            <img :src="$imgUrl + item.img" />
            <p>{{ item.catename }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import myHeader from "../titleHeader";
import { getCateTree } from "../../utils/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      fid: "",
      title: "商品分类",
      listArr: []
    };
  },
  components: {
    myHeader
  },
  computed: {
    ...mapGetters(["getStateCateList", "getStateCateTreeList"])
  },
  mounted() {
    this.getActionCateList();
    this.getActionCateTreeList();
    let _this = this
    this.getgoodsList(_this.$route.query.index);
    // console.log(this.getStateCateList)
  },

  methods: {
    ...mapActions(["getActionCateList", "getActionCateTreeList"]),
  //获取二级列表
    getgoodsList(e) {
      // console.log(this.getStateCateTreeList[e].children)
      // this.listArr = this.getStateCateTreeList[e].children;
      getCateTree().then(res => {
        if (res.data.code == 200) {
          this.listArr = res.data.list[e].children;
          // console.log(res.data.list[e].children)
        }
      });
    },

  }
};
</script>

<style lang="" scoped>
@import "../../assets/css/sort.css";
</style>
