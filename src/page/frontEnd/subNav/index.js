import React from 'react';
import config from '@/db/config.json';
import styles from './index.less'

function SubNav() {
    const {subNav} = config;
    return <div className={styles.subNav}>
        {
            Object.keys(subNav).map((key, index) =>(
                <a key={index} target='_blank' href={subNav[key]?subNav[key] : '#' }>
                    <span className={`iconfont icon-${key}`}/>
                </a>
            ))
        }
    </div>
}

export default SubNav;