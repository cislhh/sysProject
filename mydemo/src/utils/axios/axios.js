//引入axios的核心http库
import axios from "axios"

//重新创建自定义实例
//给axios实例添加自定义属性
let http = axios.create({
    // /api指的是http://localhost:3000地址重启，指向那个跨域
    baseURL:"/api"
})

//请求拦截

//响应拦截


//暴露http
export default http