import React, {useState} from 'react';
import classNames from "classnames/bind";
import styles from './index.less';
const cxBind = classNames.bind(styles);

function AnSearch() {
    const [focus, setFocus] = useState(false);
    return <div>
        <div className={cxBind({search: true, isActive: focus})}>
            <svg version="1.1" viewBox="0 0 142.358 24.582">
                <path id="search-path" fill="none" d="M131.597,14.529c-1.487,1.487-3.542,2.407-5.811,2.407
        c-4.539,0-8.218-3.679-8.218-8.218s3.679-8.218,8.218-8.218c4.539,0,8.218,3.679,8.218,8.218
        C134.004,10.987,133.084,13.042,131.597,14.529c0,0,9.554,9.554,9.554,9.554H0"/>
            </svg>
            <label htmlFor="search" className={styles.searchLabel}/>
            <input
                onFocus={() => {
                    setFocus(true)
                }}
                onBlur={() => {
                    setFocus(false)
                }}
                id="search"
                autoComplete="off"
                className={styles.inputLabel}
            />
        </div>
    </div>
}

export default AnSearch;