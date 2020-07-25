export default{
    //菜单
    getStateBannerList(state){
        return state.bannerList
    },
    //分类信息首页
    getStateCateList(state){
        return state.cateList
    },
    //获取信息树形
    getStateCateTreeList(state){
        return state.catetreeList
    },
    //商品信息(首页)
    getStateIndexGoodsList(state){
        return state.indexGoodsList
    },
    //获取一个商品信息
    getStateGoodsInfo(state){
        return state.goodsInfo
    },
    
}