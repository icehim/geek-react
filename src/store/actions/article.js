import request from "@/utils/request";

//获取频道
export const getChannelAction = () => {
    return async (dispatch) => {
        const {data: {channels}} = await request.get('/v1_0/channels')
        dispatch({type: 'article/channel', list: channels})
    }
}
//根据过滤条件获取文章列表
export const getArticleAction = (payload) => {
    return async (dispatch) => {
        const {data: {page, per_page, results, total_count}} = await request.get('/v1_0/mp/articles', {params: payload})
        const datas = {
            page,//当前页面
            pageSIze: per_page,//每页多少条数据
            list: results,// 列表
            total: total_count//文章数据的总数
        }
        dispatch({type: 'article/list', datas})

    }
}
