import React from 'react';
//普通写法
// import './index.module.scss'
// 样式模块发写法(推荐)=>style对象，包含新生成的全局唯一的类名(文件名+类名+hash值)
import style from './index.module.scss'
import Child from "@/pages/test/components/child";

//react样式冲突:同名样式
// 总结:样式会互相覆盖(子组件导入和父组件样式导入的顺序有关=》后导入的会覆盖先导入的 )
function Test() {
    return (
        <div>
            <h2 className={style.red}>
                Test
            </h2>
            <p className={style.borders}>border</p>
            <p className={[style.fontBlue, style.borders].join(' ')}>蓝色字</p>
            <p className={`${style.fontBlue} ${style.borders}`}>蓝色字3</p>
            {/*全局类名*/}
            <p className='green'>全局的1</p>
            <p className='pink fonts'>全局的2</p>
            <hr/>
            <Child/>
        </div>
    );
}

export default Test;
