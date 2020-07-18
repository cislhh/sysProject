//这是接口集合模块，所有接口放在这里管理
import http from './axios'

/*======================菜单接口==============================*/
//菜单列表接口
export function getMenuList(params){
    return http.get("/api/menulist",{
        params
    })
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

/*======================角色接口==============================*/
//角色列表接口
export function getRoleList(){
    return http.get("/api/rolelist")
}
//角色添加接口
export function getRoleAdd(data){
    return http.post("/api/roleadd",data)
}
//角色获取（一条）
export function getRoleInfo(params){
    return http.get("/api/roleinfo",{
        params
    })
}
//角色修改
export function getRoleEdit(data){
    return http.post("/api/roleedit",data)
}
//角色删除
export function getRoleDelete(id){
    return http.post("/api/roledelete",id)
}