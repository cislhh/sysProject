import http from './axios'

//轮播图接口
export function getBannerList(){
    return http.get("/api/getbanner")
}
//分类信息接口
export function getCateList(){
    return http.get("/api/getcate")
}
//分类信息树形接口
export function getCateTree(){
    return http.get("/api/getcatetree")
}
//商品信息(首页)接口
export function getIndexGoods(){
    return http.get("/api/getindexgoods")
}
//获取一个商品信息
export function getGoodsInfo(params){
    return http.get("/api/getgoodsinfo",{
        params
    })
}


//会员注册
export function userRegister(data){
    return http.post("/api/register",data)
}
//会员登录
export function userLogin(data){
    return http.post("/api/login",data)
}

//购物车列表
export function cartList(params){
    return http.get("/api/cartlist",{
        params
    })
}
//购物车添加
export function cartAdd(data){
    return http.post("/api/cartadd",data)
}
//购物车删除
export function cartDelete(data){
    return http.post("/api/cartdelete",data)
}

//获取限时秒杀信息(首页)
//秒杀 必须是当天：00：00 到23：59
export function getseckill() {
    return http.get('/api/getseckill')
  }