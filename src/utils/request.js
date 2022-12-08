import axios from "axios";

//创建新axios实例
const request = axios.create({
    //后台请求基础地址
    baseURL: 'http://geek.itheima.net/v1_0'
})

//对后台数据的返回做简化
request.interceptors.response.use((res) => {
    //直接返回data给页面
    return res.data
})

export default request
