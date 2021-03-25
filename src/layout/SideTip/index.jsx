import React, {useState} from 'react';
import {TipModal} from "@/components"

import classNames from "classnames/bind";
import styles from './index.less'

const cxBind = classNames.bind(styles);

function SideTip({children, tipLabel = "boom", style = {}, onClick}) {

    const [sideTip, setSideTip] = useState('');

    function handleClick() {
        if(onClick) {
            onClick()
        } else {
            setSideTip(sideTip === '' || sideTip === 'hidden' ? 'active' : 'hidden')
        }
    }

    return (
        <div
            style={{right: 40, bottom: 40, ...style}}
            className={cxBind({sideTip: true, sideTipActive: sideTip === 'active'})}
        >
            <TipModal bool={sideTip}>
                {children}
            </TipModal>
            <button
                data-label={tipLabel}
                className={styles.btn}
                onClick={handleClick}
            />
            {/*<button className={styles.close}/>*/}
        </div>
    )
}

export default SideTip;