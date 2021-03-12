import React from 'react';
import styles from './index.less'
import {config} from "@/db";
import RainCanvas from "./components/RainCanvas";
import Tags from './components/tags'
import SubNav from "./components/subNav";

function FrontEnd(props) {

    return (
        <div className={styles.wrap}>
            <div className={styles.head}>
                <RainCanvas />
                <SubNav subNav={config.subNav}/>
                <Tags />
            </div>
            <div className={styles.contain}>
                <div className={styles.main}>
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    )
}

export default FrontEnd;