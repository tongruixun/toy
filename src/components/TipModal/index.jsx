import React from 'react';
import classNames from "classnames/bind";
import styles from './index.less'

const cxBind = classNames.bind(styles);

function TipModal({bool, children}) {

    return <div
        className={cxBind({tipModalWrapper: true, hidden: bool === 'hidden', active: bool === 'active'})}
    >
        {children}
    </div>
}

export default TipModal;