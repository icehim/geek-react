import React from 'react';

function Cards(props) {
    //props.children 获取组件下的jsx结构(html)=>虚拟dom
    console.log(props, props.children);
    return (
        <div>
            <h1>{props.title}</h1>
            <div className="box">
                card
                {props.children}
            </div>
        </div>
    );
}

export default Cards;
