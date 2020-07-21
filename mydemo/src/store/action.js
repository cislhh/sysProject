import {
  getMenuList,
  getRoleList,
  getuserList,
  getcateList,
  getspecsList,
  getgoodsList
} from '../utils/axios'
export default {
  //封装一个获取菜单列表
  getActionMenuList({
    commit
  }) {
    getMenuList({
        istree: 1
      })
      .then(res => {
        if (res.data.code == 200) {
          commit("reqMenuList", res.data.list)
        }
      })
  },
  //封装一个获取角色列表
  getActionRoleList({
    commit
  }) {
    getRoleList()
      .then(res => {
        if (res.data.code == 200) {
          commit("reqRoleList", res.data.list)
        }
      })
  },
  //封装一个获取管理员列表
  getActionUserList({
    commit
  }, pageInfo) {
    getuserList(pageInfo)
      .then(res => {
        // console.log(res)
        if (res.data.code == 200) {
          //针对返回的结果进行转化，目的是为了转换null
          let list = [];
          list = res.data.list == null ? [] : res.data.list;
          commit("reqUserList", list)
        }
      })
  },
  //封装一个商品分类列表
  getActionCateList({
    commit
  }) {
    getcateList({
        istree: 1
      })
      .then(res => {
        if (res.data.code == 200) {
          commit("reqCateList", res.data.list)
        }
      })
  },
  //封装一个获取管理员列表
  getActionSpecsList({
    commit
  }, pageInfo) {
    getspecsList(pageInfo)
      .then(res => {
        // console.log(res)
        if (res.data.code == 200) {
          //针对返回的结果进行转化，目的是为了转换null
          let list = [];
          list = res.data.list == null ? [] : res.data.list;
          commit("reqSpecsList", list)
        }
      })
  },
  //封装一个获取商品管理列表
  getActionGoodsList({
    commit
  }, pageInfo) {
    getgoodsList(pageInfo)
      .then(res => {
        if (res.data.code == 200) {
          //针对返回的结果进行转化，目的就是转化null
          let list = []
          list = res.data.list == null ? [] : res.data.list
          commit('reqGoodsList', list)
        }
      })
  },
}
