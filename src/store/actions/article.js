import request from "@/utils/request";

export const getChannelAction = () => {
    return async (dispatch) => {
        const {data: {channels}} = await request.get('/v1_0/channels')
        dispatch({type: 'article/channel', list: channels})
    }
}
