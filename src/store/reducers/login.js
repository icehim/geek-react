//只存储token
const initialState = localStorage.getItem('geek-token') || ''

export const reducerLogin = (state = initialState, action) => {
    if (action.type === 'login/token') {
        return action.token
    }
    return state
}
