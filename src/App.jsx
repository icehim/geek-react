import './App.scss';

//BrowserRouter(history),HashRouter(hash模式)
import {BrowserRouter, Route, Switch} from "react-router-dom";
//导入页面组件
import NotFound from "./pages/404";
import Login from "./pages/login";
import Layout from "./pages/layout";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                {/*配置路由规则*/}
                <Switch>
                    <Route path='/home' component={Layout}/>
                    <Route path='/login' component={Login}/>
                    {/*配置404=>必须放到最后*/}
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
