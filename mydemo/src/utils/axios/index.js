//这是接口集合模块，所有接口放在这里管理
import http from './axios'

//菜单列表接口
export function getMenuList(){
    return http.get("/api/menulist")
}
//菜单添加接口
export function getMenuAdd(data){
    return http.post("/api/menuadd",data)
}
//菜单获取（一条）
export function getMenuInfo(params){
    return http.get("/api/menuinfo",{
        params
    })
}
//菜单修改
export function getMenuEdit(data){
    return http.post("/api/menuedit",data)
}
//菜单删除
export function getMenuDelete(id){
    return http.post("/api/menudelete",id)
}