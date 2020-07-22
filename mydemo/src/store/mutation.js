export default{
    //触发修改state
    reqMenuList(state,payload){
        state.menuList=payload
    },
    //触发修改state
    reqRoleList(state,payload){
        state.roleList=payload
    },
    //触发修改state
    reqUserList(state,payload){
        state.userList=payload
    },
    //触发修改state
    reqCateList(state,payload){
        state.cateList=payload
    },
    //触发修改state
    reqSpecsList(state,payload){
        state.specsList=payload
    },
    reqGoodsList(state,payload){
        state.goodsList = payload
    },
    reqMemberList(state,payload){
        state.memberList = payload
    },
    reqBannerList(state,payload){
        state.bannerList = payload
    },
    reqSeckList(state,payload){
        state.seckList = payload
    },
}