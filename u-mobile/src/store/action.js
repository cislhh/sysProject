import {
  getBannerList,
  getCateList,
  getCateTree,
  getIndexGoods,
  getGoodsInfo,
  cartList,
} from "../utils/axios";
export default {
  //封装轮播图获取列表
  getActionBannerList({ commit }) {
    getBannerList().then(res => {
      if (res.data.code == 200) {
        let list = [];
        list = res.data.list == null ? [] : res.data.list;
        commit("reqBannerList", list);
      }
    });
  },
  //封装轮播图获取列表
  getActionCateList({ commit }) {
    getCateList().then(res => {
      if (res.data.code == 200) {
        let list = [];
        list = res.data.list == null ? [] : res.data.list;
        commit("reqCateList", list);
      }
    });
  },
  //封装信息树形获取列表
  getActionCateTreeList({ commit }) {
    getCateTree().then(res => {
      if (res.data.code == 200) {
        // console.log(res)
        let list = [];
        list = res.data.list == null ? [] : res.data.list;
        commit("reqCateTreeList", list);
      }
    });
  },
  //封装商品信息(首页)
  getActionIndexGoodsList({ commit }) {
    getIndexGoods().then(res => {
      if (res.data.code == 200) {
        let list = [];
        list = res.data.list == null ? [] : res.data.list;
        commit("reqIndexGoodsList", list);
        // console.log(list)
      }
    });
  },
  //获取一个商品信息
  getActionGoodsInfo({ commit },id) {
    getGoodsInfo(id).then(res => {
      if (res.data.code == 200) {
        let list = [];
        list = res.data.list == null ? [] : res.data.list;
        commit("reqIndexGoodsInfo", list);
        // console.log(list)
      }
    });
  },
  //获取一个购物车列表
  getActionCartList({ commit },uid) {
    cartList(uid).then(res => {
      if (res.data.code == 200) {
        let list = [];
        list = res.data.list == null ? [] : res.data.list;
        commit("reqCartList", list);
      }
    });
  }
};
