import {Layout, Menu, Popconfirm} from 'antd'
import {HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined} from '@ant-design/icons'
// 导入组件样式
import styles from './index.module.scss'
//导入三个子路由页面
import Home from "@/pages/home";
import Article from "@/pages/article";
import Publish from "@/pages/publish";
import {Route, Link} from "react-router-dom";

//结构Layout组件上的静态属性=》函数组件
const {Header, Sider} = Layout

const Layouts = () => {
    return (
        <Layout className={styles.root}>
            {/*顶部通栏*/}
            <Header className="header">
                {/*左侧:系统logo*/}
                <div className="logo"/>
                {/* 右侧：用户信息 */}
                <div className="user-info">
                    <span className="user-name">user.name</span>
                    <span className="user-logout"><Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                    <LogoutOutlined/> 退出</Popconfirm>
                </span>
                </div>
            </Header>
            {/*左侧:菜单*/}
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item icon={<HomeOutlined/>} key="1">
                            <Link to='/home'>数据概览</Link>
                        </Menu.Item>
                        <Menu.Item icon={<DiffOutlined/>} key="2">
                            <Link to='/home/article'>内容管理</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined/>} key="3">
                            <Link to='/home/publish'>发布文章</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                {/*右侧：内容*/}
                <Layout className="layout-content" style={{padding: 20}}>
                    {/*配置子路由*/}
                    <Route exact path='/home' component={Home}/>
                    <Route path='/home/article' component={Article}/>
                    <Route path='/home/publish' component={Publish}/>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Layouts
