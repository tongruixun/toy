import React from 'react';
import Sidebar from "./sidebar";
import styles from './index.less'

function FrontEnd(props) {

    return (
        <div className={styles.wrap}>
            <div className={styles.main}>
                {
                    props.children
                }
            </div>
            <Sidebar />
        </div>
    )
}
export default FrontEnd;