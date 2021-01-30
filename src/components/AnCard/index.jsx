import React from 'react';
import styles from './index.less'

function AnCard({children}) {
    return <div className={styles.wrap}>{children}</div>
}

export default AnCard;