import React, {useEffect, useState} from 'react';
import {renderTime, getRemainingDate} from "@/util/util";


import Countdown from "./countdown";
import Clock from "./clock";
import styles from './index.less'

const newItems = [{title: '示例', endDate: '2021-3-4'}];
function Calendar() {

    const [curTime, setCurTime] = useState(() => renderTime());
    const [countdowns, setCountdowns] = useState(() => getRemainingDate(newItems));

    useEffect(() => {
        let timer = setInterval(() => {
            setCurTime(renderTime());
            setCountdowns(getRemainingDate(newItems));
        }, 1000)
        return () => clearInterval(timer);
    }, [])

    return <div className={styles.calendar} >
                <Clock curTime={curTime}/>
                <Countdown countdowns={countdowns}/>
        </div>
}

export default Calendar;