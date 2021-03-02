import React from 'react';

import Countdown from "./countdown";
import Clock from "./clock";
import styles from './index.less'

function Calendar() {
    return <div className={styles.calendar} >
                <Clock />
                <Countdown />
        </div>
}

export default Calendar;