import axios from 'axios'

let http = axios.create({
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
export default http