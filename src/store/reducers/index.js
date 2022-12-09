import {combineReducers} from "redux";
import {reducerLogin} from "@/store/reducers/login";
import {reducerUser} from "@/store/reducers/user";

const rootReducer = combineReducers({
    token: reducerLogin,
    user: reducerUser
})

export default rootReducer
