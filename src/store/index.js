import {legacy_createStore as createStore, applyMiddleware} from "redux";
// composeWithDevTools 配合redux插件(开发环境)
// import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "@/store/reducers";

// import { composeWithDevTools } from 'redux-devtools-extension'

let middlewares

if (process.env.NODE_ENV === 'production') {
    // 生产环境，只启用 thunk 中间件
    middlewares = applyMiddleware(thunk)
} else {
    // 开发环境
    const {composeWithDevTools} = require('redux-devtools-extension')
    middlewares = composeWithDevTools(applyMiddleware(thunk))
}

const store = createStore(reducer, middlewares)
export default store
