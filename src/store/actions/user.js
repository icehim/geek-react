import request from "@/utils/request";

export const getUserAction = () => {
    return async (dispatch) => {
        const {data} = await request.get('/v1_0/user/profile')
        dispatch({type: 'user/get', user: data})
    }
}
