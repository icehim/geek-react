import axios from "axios";
import store from "@/store";

//创建新axios实例
const request = axios.create({
    //后台请求基础地址
    baseURL: 'http://geek.itheima.net'
})
//请求拦截器
request.interceptors.request.use((config) => {
    //获取token
    const {token} = store.getState()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//响应拦截器
//对后台数据的返回做简化
request.interceptors.response.use((res) => {
    //直接返回data给页面
    return res.data
})

export default request
