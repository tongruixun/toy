import React from 'react';
import posts from "@/db/data.json";
import SubNav from '../subNav'
import Tags from "../tags";
import styles from './index.less'

function Sidebar() {
    const tagList = () => posts.map(({data: {tags}}) => tags);
    return <div className={styles.sidebar}>
        <SubNav />
        <Tags tagList={tagList()} />
    </div>
}

export default Sidebar;