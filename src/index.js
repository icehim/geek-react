// 入口

import React from 'react';
import ReactDOM from 'react-dom/client';
//引入antd组件库样式
import 'antd/dist/reset.css'
//全局样式
import '@/index.scss';

import App from './App';
// 集成store
import {Provider} from "react-redux";
import store from "@/store";
import {ConfigProvider} from "antd";
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';

console.log(process.env)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App/>
        </ConfigProvider>
    </Provider>
);

