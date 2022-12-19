import {Link, useHistory} from "react-router-dom";
import styles from './index.module.scss'
import {useEffect, useRef, useState} from "react";

function NotFound() {
    /*
    * 实现倒计时:
    * 1.定义倒计时秒数的状态数据
    * 2.使用setInterval定时器方法，每隔1s执行减1（开启一次）
    * 3.判断倒计时秒数===0的时候，跳转回首页
    * */
    const history = useHistory()
    const [count, setCount] = useState(10)
    //存储定时器ID
    const timerId = useRef(0)

    // componentDidMount(只执行一次)
    useEffect(() => {
        timerId.current = setInterval(() => {
            setCount(count => count - 1)
        }, 1000)
        // 这个返回的函数，会在组件销毁的后执行=》componentWillUnmount
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
        if (count === 0) {
            history.push('/home')
        }
    }, [count, history])


    return (
        <div className={styles.root}>
            <h1>对不起，您访问的页面不存在~</h1>
            <p className='back'>
                将在 {count} 秒后，返回首页（或者：点击立即返回
                <Link to="/home">首页</Link>）
            </p>
            <hr/>
        </div>
    );
}

export default NotFound;
