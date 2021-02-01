import React from 'react';
import posts from "@/db/data.json";
import Tags from "../tags";
import {AnSearch} from '@/components'
import styles from './index.less'

function Sidebar() {
    const tagList = () => posts.map(({data: {tags}}) => tags);
    return <div className={styles.sidebar}>
        <AnSearch />
        <Tags tagList={tagList()} />
    </div>
}

export default Sidebar;