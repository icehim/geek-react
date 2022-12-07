// 入口

import React from 'react';
import ReactDOM from 'react-dom/client';
//引入antd组件库样式
import 'antd/dist/reset.css'
//全局样式
import '@/index.scss';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

