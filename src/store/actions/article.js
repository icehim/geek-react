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
            list: results.map(item => ({
                ...item,
                //处理cover字段为图片地址，作为列表的封面图
                cover: item.cover.images[0]
            })),// 列表
            total: total_count//文章数据的总数
        }
        dispatch({type: 'article/list', datas})

    }
}

//删除文章
/**
 *
 * @param id    文章ID
 * @param filters   过滤条件
 * @returns {(function(*): Promise<void>)|*}
 */
export const delArticleAction = (id, filters) => {
    return async (dispatch) => {
        /*
        * 1.调用接口删除文章(数据库)
        * 2.重新获取文章列表数据
        * */
        await request.delete(`/v1_0/mp/articles/${id}`)
        //怎么刷新文章列表数据？重新分发获取文章列表数据action
        dispatch(getArticleAction(filters))
    }
}

/**
 *
 * @param data 新增文章参数
 * @returns {(function(): Promise<*>)|*}
 */
export const addArticleAction = (data) => {
    return async () => {
        //说明:后期区分是否是草稿：1.发布文章(不是草稿) 2.存入草稿
        await request.post(`/v1_0/mp/articles?draft=false`, data)
    }
}
