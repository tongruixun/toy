import React, {useEffect} from 'react';
import Sidebar from "./sidebar";
import styles from './index.less'
import {NavLink} from "react-router-dom";

function FrontEnd(props) {

    return (
        <div className={styles.wrap}>
            <div className={styles.head}>
                <div>
                    <NavLink activeClassName="selected" to='/frontEnd'>文章首页</NavLink>
                </div>
                <div>html</div>
                <div>js</div>
                <div>css</div>
            </div>
            <div className={styles.contain}>
                <div className={styles.main}>
                    {
                        props.children
                    }
                </div>
                <Sidebar />
            </div>
        </div>
    )
}
export default FrontEnd;