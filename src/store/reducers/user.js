const initialState = {}

export const reducerUser = (state = initialState, action) => {
    //存储登陆人信息
    if (action.type === 'user/get') {
        return action.user
    }
    //删除登陆人信息
    if (action.type === 'user/del') {
        return {}
    }
    return state
}
