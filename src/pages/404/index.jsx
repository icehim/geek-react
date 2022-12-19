import {Link} from "react-router-dom";
import styles from './index.module.scss'

function NotFound() {
    return (
        <div className={styles.root}>
            <h1>对不起，您访问的页面不存在~</h1>
            <p className='back'>
                将在 {10} 秒后，返回首页（或者：点击立即返回
                <Link to="/home">首页</Link>）
            </p>
        </div>
    );
}

export default NotFound;
