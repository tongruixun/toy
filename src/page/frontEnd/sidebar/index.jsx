import React from 'react';
import {tags, config} from "@/db";
import SubNav from '../subNav'
import Tags from "../tags";
import styles from './index.less'

function Sidebar() {
    return <div className={styles.sidebar}>
        <SubNav subNav={config.subNav} />
        <Tags tagList={tags} />
    </div>
}

export default Sidebar;