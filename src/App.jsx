import './App.scss';

//BrowserRouter(history),HashRouter(hash模式)
import {Router, Route, Switch, Redirect} from "react-router-dom";
//导入页面组件
// import Layout from "./pages/layout";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import NotFound from "@/pages/404";
//导入测试页面
import Test from "@/pages/test";

//导入鉴权组件
import AuthRoute from "@/components/auth";
import customHistory from "@/utils/history";

function App() {
    return (
        <Router history={customHistory}>
            <div className="app">
                {
                    /*配置路由规则=》一级路由
                    * 说明:配置子路由，去对应的父路由组件中配置
                    * */
                }
                <Switch>
                    <Redirect exact from='/' to='/home'/>
                    {/*<Route path='/home' component={Layout}/>*/}

                    <AuthRoute path='/home' component={Layout}/>

                    {/*<Route path='/home' render={() => {*/}
                    {/*     需求:根据是否有token,决定是否能访问某个页面*/}
                    {/*     1.有token,返回Layout组件*/}
                    {/*     2.没有token,使用Redirect组件重定向跳转到login登录页*/}
                    {/*     */}
                    {/*    if (!isAuth()) {*/}
                    {/*        //没有登录*/}
                    {/*        return <Redirect to='/login'/>*/}
                    {/*    }*/}
                    {/*    //已经登录=》正常显示页面*/}
                    {/*    return <Layout/>*/}
                    {/*}}/>*/}
                    <Route path='/login' component={Login}/>
                    <Route path='/test' component={Test}/>
                    {/*配置404=>必须放到最后*/}
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
