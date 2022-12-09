import request from "@/utils/request";

export const getUserAction = (payload) => {
    return async (dispatch, getState) => {
        const {data} = await request.get('/v1_0/user/profile')
        console.log(data)
        dispatch({type: 'user/get', user: data})
    }
}
