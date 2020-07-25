//引入axios的核心http库
import axios from "axios"

//重新创建自定义实例
//给axios实例添加自定义属性
let http = axios.create({
    // /api指的是http://localhost:3000地址重启，指向那个跨域
    baseURL:"/api"
})

//请求拦截
http.interceptors.request.use((config)=>{
    //这是axios的拦截器
    //在请求头中携带token,这是一个全局拦截，是接口就拦截
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    config.headers.authorization=userInfo?userInfo.token:[];
    // console.log(config,"配置");
    return config
})

//响应拦截
http.interceptors.response.use((res)=>{
    if(res.data.code==403){
        router.push('/login')
    }
    return res
})

//暴露http
export default http