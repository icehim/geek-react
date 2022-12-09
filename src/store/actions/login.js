import {delToken, setToken} from "@/utils/auth";
import request from "@/utils/request";

//登录
export const loginAction = (values) => {
    return async (dispatch) => {
        /*
        * 登录action:
        * 1.调用后台接口发请求，获取token
        * 2.使用dispatch存储token:1.redux存储(内存) 2.本地也存一份(持久化)
        * */
        const {data: {token}} = await request.post('/v1_0/authorizations', values)
        dispatch({type: 'login/token', token})
        // localStorage.setItem('geek-token', token)
        setToken(token)
    }
}

//退出
export const logoutAction = () => {
    return async (dispatch) => {
        /*
        * 1.删除token(本地)
        * 2.删除登陆人信息user
        * 3.发请求退出(没有)
        * */
        dispatch({type: 'login/delToken'})
        delToken()
        dispatch({type: 'user/del'})
    }
}
