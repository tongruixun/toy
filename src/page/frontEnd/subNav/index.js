import React from 'react';
import styles from './index.less'

function SubNav(props) {
    const {subNav} = props;
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