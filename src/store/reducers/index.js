import {combineReducers} from "redux";
import {reducerLogin} from "@/store/reducers/login";

const rootReducer = combineReducers({
    token: reducerLogin
})

export default rootReducer
