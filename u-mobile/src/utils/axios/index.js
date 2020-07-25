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