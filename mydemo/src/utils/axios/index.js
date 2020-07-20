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

/*======================管理员接口==============================*/
//管理员总数（用于计算分页）
export function getuserCount(){
    return http.get("/api/usercount")
}
//管理员列表接口（分页）
export function getuserList(params){
    return http.get("/api/userlist",{params})
}
//管理员添加接口
export function getuserAdd(data){
    return http.post("/api/useradd",data)
}
//管理员获取（一条）
export function getuserInfo(params){
    return http.get("/api/userinfo",{
        params
    })
}
//管理员修改
export function getuserEdit(data){
    return http.post("/api/useredit",data)
}
//管理员删除
export function getuserDelete(id){
    return http.post("/api/userdelete",id)
}
//管理员登录
export function getuserLogin(data){
    return http.post("/api/userlogin",data)
}

/*======================商品分类接口==============================*/
//商品分类列表接口
export function getcateList(params){
    return http.get("/api/catelist",{
        params
    })
}
//商品分类添加接口
export function getcateAdd(data){
    return http.post("/api/cateadd",data)
}
//商品分类获取（一条）
export function getcateInfo(params){
    return http.get("/api/cateinfo",{
        params
    })
}
//商品分类修改
export function getcateEdit(data){
    return http.post("/api/cateedit",data)
}
//商品分类删除
export function getcateDelete(id){
    return http.post("/api/catedelete",id)
}