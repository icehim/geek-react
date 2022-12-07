import './App.scss';

//BrowserRouter(history),HashRouter(hash模式)
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
//导入页面组件
// import Layout from "./pages/layout";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import NotFound from "@/pages/404";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                {/*配置路由规则*/}
                <Switch>
                    <Redirect exact from='/' to='/home'/>
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
