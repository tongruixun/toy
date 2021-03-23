import React, {useState} from 'react';
import {TipModal} from "@/components"

import classNames from "classnames/bind";
import styles from './index.less'

const cxBind = classNames.bind(styles);

function SideTip({children, tipLabel = "boom", option = {}}) {

    const [sideTip, setSideTip] = useState('');

    return (
        <div
            style={{right: option.right || 40, bottom: option.bottom || 40}}
            className={cxBind({sideTip: true, sideTipActive: sideTip === 'active'})}
        >
            <TipModal bool={sideTip}>
                {children}
            </TipModal>
            <button
                data-label={tipLabel}
                className={styles.btn}
                onClick={() => {
                    setSideTip(sideTip === '' || sideTip === 'hidden' ? 'active' : 'hidden')
                }}
            />
            <button className={styles.close}/>
        </div>
    )
}

export default SideTip;