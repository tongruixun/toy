import React from 'react';
import styles from './index.less';

function Clock({curTime}) {

    return <div className={styles.bgImg}>
        <div className={styles.clock}>
            <span/>
            <span/>
            <span/>
            <span/>
            <div className={styles.main}>
                <div className={styles.time}>{curTime[3]}</div>
                <div className={styles.date}>
                    <div>{`${curTime[0]}年${curTime[1]}月${curTime[2]}日`}</div>
                    <div>{curTime[4]}</div>
                </div>
            </div>
        </div>
    </div>
}

export default Clock;