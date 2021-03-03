import React, {useEffect} from 'react';
import Sidebar from "./sidebar";
import styles from './index.less'
import {NavLink} from "react-router-dom";
import {config} from "@/db";
import SubNav from "./subNav";

function FrontEnd(props) {

    return (
        <div className={styles.wrap}>
            <div className={styles.head}>
                <header></header>
                <SubNav subNav={config.subNav} />
                {/*<div>*/}
                {/*    <NavLink activeClassName="selected" to='/frontEnd'>文章首页</NavLink>*/}
                {/*</div>*/}
            </div>
            <div className={styles.contain}>
                <div className={styles.main}>
                    {
                        props.children
                    }
                </div>
                {/*<Sidebar />*/}
            </div>
        </div>
    )
}
export default FrontEnd;