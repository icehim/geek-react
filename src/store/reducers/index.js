import {combineReducers} from "redux";
import {reducerLogin} from "@/store/reducers/login";
import {reducerUser} from "@/store/reducers/user";
import {reducerArticle} from "@/store/reducers/article";

const rootReducer = combineReducers({
    token: reducerLogin,
    user: reducerUser,
    article: reducerArticle
})

export default rootReducer
