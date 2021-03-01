import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {renderTime} from "@/util/util";
import styles from './index.less';

const dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(dayOfYear)

// 年周数
const isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear');
const isLeapYear = require('dayjs/plugin/isLeapYear');
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

function Countdown() {

    const [curTime, setCurTime] = useState(() => renderTime());

    useEffect(() => {
        let timer = setInterval(() => setCurTime(renderTime()), 1000)
        return () => clearInterval(timer);
    }, [])

    return <div className={styles.countdown}>
        <div>
            <div className={styles.time}>{curTime[3]}</div>
            <div className={styles.date}>
                <div>{`${curTime[0]}年${curTime[1]}月${curTime[2]}日`}</div>
                <div>{curTime[4]}</div>
            </div>
        </div>
    </div>
}

export default Countdown;