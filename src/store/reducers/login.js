//只存储token
import {getToken} from "@/utils/auth";

const initialState = getToken() || ''

export const reducerLogin = (state = initialState, action) => {
    //存token
    if (action.type === 'login/token') {
        return action.token
    }
    //删token
    if (action.type === 'login.delToken') {
        return ''
    }
    return state
}
