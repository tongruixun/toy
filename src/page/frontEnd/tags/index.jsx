import React from 'react';
import {AnCard} from '@/components';
import {Link} from "react-router-dom";
import styles from './index.less';

function Tags(props) {


    const renderTag = (tagList) => {
        return tagList.map((item, index) => {
            if(!item) return null;

            return <div key={index} className={styles.tagItem}>
                <Link to={`/frontEnd/tag/${item}`}>{item}</Link>
            </div>
        })
    }

    return <AnCard >
        <div className={styles.tags}>
            <div className={styles.tagsHeader}>
                <span className='iconfont icon-tags' />&ensp;<span className={styles.tagsTitle}>文章标签</span>
            </div>
            <div className={styles.items}>
                {renderTag(props.tagList)}
            </div>
        </div>
    </AnCard>
}

export default Tags;