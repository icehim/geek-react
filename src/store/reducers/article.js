const initialState = {
    //文章频道列表数据
    channels: []
}

export const reducerArticle = (state = initialState, action) => {
    if (action.type === 'article/channel') {
        return {
            ...state,
            channels: action.list
        }
    }
    return state
}
