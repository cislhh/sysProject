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

/*======================商品规格接口==============================*/
//商品规格总数（用于计算分页）
export function getspecsCount(){
    return http.get("/api/specscount")
}
//商品规格列表接口（分页）
export function getspecsList(params){
    return http.get("/api/specslist",{params})
}
//商品规格添加接口
export function getspecsAdd(data){
    return http.post("/api/specsadd",data)
}
//商品规格获取（一条）
export function getspecsInfo(params){
    return http.get("/api/specsinfo",{
        params
    })
}
//商品规格修改
export function getspecsEdit(data){
    return http.post("/api/specsedit",data)
}
//商品规格删除
export function getspecsDelete(id){
    return http.post("/api/specsdelete",id)
}

/* ============== 商品管理接口  ================== */
//封装一个商品管理列表接口(分页)
export function getgoodsList(params){
    return http.get('/api/goodslist',{
        params
    })   
}
//封装一个商品管理添加接口
export function getgoodsAdd(data){
    return http.post('/api/goodsadd',data)   
}
//封装一个商品管理获取（一条）接口
export function getgoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })   
}
//封装一个商品管理修改接口
export function getgoodsEdit(data){
    return http.post('/api/goodsedit',data)   
}
//封装一个商品管理删除接口
export function getgoodsDelete(data){
    return http.post('/api/goodsdelete',data)   
}

//商品管理总数（用于计算分页）
export function getgoodsCount(){
    return http.get('/api/goodscount')   
}

/* ============== 会员管理接口  ================== */
//封装一个会员管理列表接口
export function getmemberList(){
    return http.get('/api/memberlist')   
}

//封装一个会员管理获取（一条）接口
export function getmemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })   
}
//封装一个会员管理修改接口
export function getmemberEdit(data){
    return http.post('/api/memberedit',data)   
}

/* ============== 轮播图管理接口  ================== */
//封装一个轮播图管理列表接口
export function getbannerList(){
    return http.get('/api/bannerlist')   
}
//封装一个轮播图管理添加接口
export function getbannerAdd(data){
    return http.post('/api/banneradd',data)   
}
//封装一个轮播图管理获取（一条）接口
export function getbannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })   
}
//封装一个轮播图管理修改接口
export function getbannerEdit(data){
    return http.post('/api/banneredit',data)   
}
//封装一个轮播图管理删除接口
export function getbannerDelete(data){
    return http.post('/api/bannerdelete',data)   
}


/* ============== 限时秒杀管理接口  ================== */
//封装一个限时秒杀管理列表接口
export function getseckList(){
    return http.get('/api/secklist')   
}
//封装一个限时秒杀管理添加接口
export function getseckAdd(data){
    return http.post('/api/seckadd',data)   
}
//封装一个限时秒杀管理获取（一条）接口
export function getseckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })   
}
//封装一个限时秒杀管理修改接口
export function getseckEdit(data){
    return http.post('/api/seckedit',data)   
}
//封装一个限时秒杀管理删除接口
export function getseckDelete(data){
    return http.post('/api/seckdelete',data)   
}

