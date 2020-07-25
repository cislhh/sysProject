export default{
    //触发修改state
    reqBannerList(state,payload){
        state.bannerList=payload
    },
    //触发修改state
    reqCateList(state,payload){
        state.cateList=payload
    },
    //触发修改state
    reqCateTreeList(state,payload){
        state.catetreeList=payload
    },
    //触发修改state
    reqIndexGoodsList(state,payload){
        state.indexGoodsList=payload
    },
    //触发修改state
    reqIndexGoodsInfo(state,payload){
        state.goodsInfo=payload
    },
    //触发修改state
    reqCartList(state,payload){
        state.cartList=payload
    },
    
}