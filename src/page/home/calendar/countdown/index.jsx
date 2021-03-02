import React from 'react';
import {getRemainingDate} from "@/util/util";
import styles from './index.less';

function Countdown() {

    const countdowns = getRemainingDate();
    return <div>
        {
            countdowns.map(({title, remainingDaysInYear,  endTime} ,index) => {
                return <div key={index} className={styles.countdown}>
                        <div className={styles.info}>
                            <strong className={styles.text}>距离 <span className={styles.title}>{title}</span> 还有</strong>
                            <em className={styles.endTime}>{endTime.date}&ensp;{endTime.week}</em>
                        </div>
                        <div className={styles.remaining}>{remainingDaysInYear}<sup className={styles.sup}>days</sup></div>
                    </div>
            })
        }

    </div>
}

export default Countdown;