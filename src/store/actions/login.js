import {setToken} from "@/utils/auth";
import request from "@/utils/request";

export const loginAction = (values) => {
    return async (dispatch) => {
        /*
        * 登录action:
        * 1.调用后台接口发请求，获取token
        * 2.使用dispatch存储token:1.redux存储(内存) 2.本地也存一份(持久化)
        * */
        const {data: {token}} = await request.post('/authorizations', values)

        console.log(token)
        dispatch({type: 'login/token', token})
        // localStorage.setItem('geek-token', token)
        setToken(token)

    }

}
