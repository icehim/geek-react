import axios from "axios";

export const loginAction = (values) => {
    return async (dispatch, getState) => {
        /*
        * 登录action:
        * 1.调用后台接口发请求，获取token
        * 2.使用dispatch存储token
        * */
        const {data: {data: {token}}} = await axios.post('http://geek.itheima.net/v1_0/authorizations', values)
        console.log(token)
        dispatch({type: 'login/token', token})
    }

}
